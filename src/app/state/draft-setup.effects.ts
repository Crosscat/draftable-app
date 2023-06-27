import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";

import { DraftGatewayService } from "../services/draft-gateway.service";
import { DraftService } from "../services/draft.service";
import { PlayerService } from "../services/player.service";
import * as actions from "./draft-setup.actions";

@Injectable()
export class DraftSetupEffects {
  public createNewDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createNewDraft),
      mergeMap((action) => this.playerService.createNewPlayer(action.playerRequest).pipe(
        mergeMap((response) => {
          localStorage.setItem('access-token', response.accessToken);

          return this.draftService.createNewDraft(action.draftRequest).pipe(
            map((response) => ({ type: actions.createNewDraftSuccess.type, draft: response })),
          );
        }),
      )),
      catchError(() => of({ type: actions.createNewDraftFailure.type })),
    ));
    
  public joinExistingDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.joinExistingDraft),
      mergeMap((action) => this.playerService.createNewPlayer(action.playerRequest).pipe(
        mergeMap((response) => {
          localStorage.setItem('access-token', response.accessToken);

          return this.draftService.joinExistingDraft(action.draftId).pipe(
            map((response) => ({ type: actions.joinExistingDraftSuccess.type, draft: response })),
          );
        }),
      )),
      catchError(() => of({ type: actions.joinExistingDraftFailure.type })),
    ));

  public waitForDraftToBeginAsHost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        actions.createNewDraftSuccess,
        actions.joinExistingDraftSuccess,
      ),
      tap((action) => this.draftGatewayService.joinDraft(action.draft.draftId)),
      mergeMap(() => this.draftGatewayService.players$.pipe(
        map((players) => ({ type: actions.getPlayerList.type, players })),
      )),
      tap(() => this.router.navigate(['/draft/waiting'])),
    ));
  
  public constructor(
    private readonly actions$: Actions,
    private readonly draftService: DraftService,
    private readonly playerService: PlayerService,
    private readonly draftGatewayService: DraftGatewayService,
    private readonly router: Router,
  ) { }
}
