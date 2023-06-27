import { TestBed } from "@angular/core/testing";
import { Action } from "@ngrx/store";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from "rxjs";

import { NewDraftRequest } from "../interfaces/draft-request.interface";
import { NewPlayerRequest, NewPlayerResponse } from "../interfaces/player.interface";
import { createNewDraft } from "./draft-setup.actions";
import { PlayerService } from "../services/player.service";
import { DraftService } from "../services/draft.service";
import { DraftSetupEffects } from "./draft-setup.effects";
import { DraftGatewayService } from "../services/draft-gateway.service";
import * as actions from "./draft-setup.actions";
import { DraftResponse } from "../interfaces/draft-response.interface";

describe('DraftSetupEffects', () => {
  let createNewPlayerSpy: jasmine.Spy;
  let createNewDraftSpy: jasmine.Spy;
  let joinExistingDraftSpy: jasmine.Spy;
  let localStorageSpy: jasmine.Spy;

  const mockPlayerService = {
    createNewPlayer: jasmine.createSpy(),
  };
  const mockDraftService = {
    createNewDraft: jasmine.createSpy(),
    joinExistingDraft: jasmine.createSpy(),
  };

  let actions$ = new Observable<Action>();
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
        {
          provide: DraftGatewayService,
          useValue: {},
        }
      ],
    });

    createNewPlayerSpy = mockPlayerService.createNewPlayer;
    createNewDraftSpy = mockDraftService.createNewDraft;
    joinExistingDraftSpy = mockDraftService.joinExistingDraft;
    localStorageSpy = spyOn(window.localStorage, 'setItem').and.callThrough();

    effects = TestBed.inject(DraftSetupEffects);
  });

  afterEach(() => {
    createNewPlayerSpy.calls.reset();
    createNewDraftSpy.calls.reset();
    joinExistingDraftSpy.calls.reset();
    localStorageSpy.calls.reset();
  });

  describe('createNewDraft$', () => {
    const playerRequest: NewPlayerRequest = { name: 'playerName' };
    const playerResponse: NewPlayerResponse = { accessToken: 'accessToken' } as NewPlayerResponse;
    const draftRequest: NewDraftRequest = { draftId: 'draftId' } as NewDraftRequest;
    const draftResponse: DraftResponse = { draftId: 'draftId' };

    it('should create new draft', (done) => {
      actions$ = of({ type: createNewDraft.type, playerRequest, draftRequest });
  
      createNewPlayerSpy.and.returnValue(of(playerResponse));
      createNewDraftSpy.and.returnValue(of(draftResponse));
  
      effects.createNewDraft$.subscribe((action) => {
        expect(createNewPlayerSpy).toHaveBeenCalledOnceWith(playerRequest);
        expect(createNewDraftSpy).toHaveBeenCalledOnceWith(draftRequest);
        expect(localStorageSpy).toHaveBeenCalledOnceWith('access-token', 'accessToken');
        expect(action).toEqual({ type: actions.createNewDraftSuccess.type, draft: draftResponse });
        done();
      });
    });

    it('should catch error in player service', (done) => {
      actions$ = of({ type: createNewDraft.type, playerRequest, draftRequest });

      createNewPlayerSpy.and.throwError(new Error('oof'));
  
      effects.createNewDraft$.subscribe((action) => {
        expect(action).toEqual({ type: actions.createNewDraftFailure.type });
        done();
      });
    });
    
    it('should catch error in draft service', (done) => {
      actions$ = of({ type: createNewDraft.type, playerRequest, draftRequest });

      createNewDraftSpy.and.throwError(new Error('oof'));
  
      effects.createNewDraft$.subscribe((action) => {
        expect(action).toEqual({ type: actions.createNewDraftFailure.type });
        done();
      });
    });

    it('should catch error in localstorage', (done) => {
      actions$ = of({ type: createNewDraft.type, playerRequest, draftRequest });

      localStorageSpy.and.throwError(new Error('oof'));
  
      effects.createNewDraft$.subscribe((action) => {
        expect(action).toEqual({ type: actions.createNewDraftFailure.type });
        done();
      });
    });
  });

  describe('joinExistingDraft$', () => {
    const playerRequest: NewPlayerRequest = { name: 'playerName' };
    const playerResponse: NewPlayerResponse = { accessToken: 'accessToken' } as NewPlayerResponse;
    const draftId = 'draftId';
    const draftResponse: DraftResponse = { draftId };

    it('should join existing draft', (done) => {
      actions$ = of({ type: actions.joinExistingDraft.type, playerRequest, draftId });
  
      createNewPlayerSpy.and.returnValue(of(playerResponse));
      joinExistingDraftSpy.and.returnValue(of(draftResponse));
  
      effects.joinExistingDraft$.subscribe((action) => {
        expect(createNewPlayerSpy).toHaveBeenCalledOnceWith(playerRequest);
        expect(joinExistingDraftSpy).toHaveBeenCalledOnceWith(draftId);
        expect(localStorageSpy).toHaveBeenCalledOnceWith('access-token', 'accessToken');
        expect(action).toEqual({ type: actions.joinExistingDraftSuccess.type, draft: draftResponse });
        done();
      });
    });

    it('should catch error in player service', (done) => {
      actions$ = of({ type: actions.joinExistingDraft.type, playerRequest, draftId });

      createNewPlayerSpy.and.throwError(new Error('oof'));
  
      effects.joinExistingDraft$.subscribe((action) => {
        expect(action).toEqual({ type: actions.joinExistingDraftFailure.type });
        done();
      });
    });
    
    it('should catch error in draft service', (done) => {
      actions$ = of({ type: actions.joinExistingDraft.type, playerRequest, draftId });

      joinExistingDraftSpy.and.throwError(new Error('oof'));
  
      effects.joinExistingDraft$.subscribe((action) => {
        expect(action).toEqual({ type: actions.joinExistingDraftFailure.type });
        done();
      });
    });

    it('should catch error in localstorage', (done) => {
      actions$ = of({ type: actions.joinExistingDraft.type, playerRequest, draftId });

      localStorageSpy.and.throwError(new Error('oof'));
  
      effects.joinExistingDraft$.subscribe((action) => {
        expect(action).toEqual({ type: actions.joinExistingDraftFailure.type });
        done();
      });
    });
  });
});
