import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Player } from "../interfaces/player.interface";
import { DraftSetupState } from '../state/draft-setup.reducer';
import { getDraftSetupState, getPlayers } from '../state/draft-setup.selectors';
import { startDraft } from '../state/draft-setup.actions';

@Component({
  selector: 'app-draft-waiting',
  templateUrl: './draft-waiting.component.html',
  styleUrls: ['./draft-waiting.component.css']
})
export class DraftWaitingComponent implements OnInit {

  public players$: Observable<string[]> = of([]);
  public ownsDraft = false;

  constructor(
    private store: Store<DraftSetupState>,
  ) { }

  ngOnInit(): void {
    this.players$ = this.store.select(getPlayers).pipe(
      map((players: Player[]) => players.map((player: Player) => player.name)),
    );

    this.store.select(getDraftSetupState).subscribe((state: DraftSetupState) => {
      this.ownsDraft = state.ownsDraft;
    });
  }

  public startDraft() {
    if (!this.ownsDraft) return;

    this.store.dispatch(startDraft());
  }
}
