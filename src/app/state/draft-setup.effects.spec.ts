import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from "rxjs";
import { TestScheduler } from "rxjs/testing";

import { NewDraftRequest } from "../interfaces/draft-request.interface";
import { NewPlayerRequest } from "../interfaces/player.interface";
import { createNewDraft } from "./draft-setup.actions";
import { PlayerService } from "../services/player.service";
import { DraftService } from "../services/draft.service";
import { DraftSetupEffects } from "./draft-setup.effects";

describe('DraftSetupEffects', () => {
  const mockPlayerService = {
    createNewPlayer: jasmine.createSpy(),
  };
  const mockDraftService = {
    createNewDraft: jasmine.createSpy(),
  };

  let actions$ = new Observable<Action>();
  let testScheduler: TestScheduler;
  let effects: DraftSetupEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DraftSetupEffects,
        provideMockActions(() => actions$),
        {
          provide: PlayerService,
          useValue: mockPlayerService,
        },
        {
          provide: DraftService,
          useValue: mockDraftService,
        },
      ],
    });

    effects = TestBed.inject(DraftSetupEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should get access token from player service', () => {
    const playerRequest: NewPlayerRequest = {
      name: 'x',
    };
    const draftRequest: NewDraftRequest = {
      draftId: 'y',
    } as NewDraftRequest;

    actions$ = of({ type: createNewDraft.type, playerRequest, draftRequest });

    mockPlayerService.createNewPlayer.and.returnValue(of({}))
    mockDraftService.createNewDraft.and.returnValue(of({}))

    effects.createNewDraft$.subscribe();

    expect(mockPlayerService.createNewPlayer).toHaveBeenCalled();
    expect(mockDraftService.createNewDraft).toHaveBeenCalled();
  });
});
