import { createReducer, on } from "@ngrx/store";

import { Player } from "../interfaces/player.interface";

import * as actions from "./draft-setup.actions";

export interface DraftSetupState {
  settingUpDraft: boolean,
  ownsDraft: boolean,
  draftId: string,
  players: Player[],
}

export const initialState = {
  settingUpDraft: false,
  ownsDraft: false,
} as DraftSetupState;

export const draftSetupReducer = createReducer(
  initialState,

  on(actions.openCreateDraftMenu, (state) => ({ ...state, settingUpDraft: true })),
  on(actions.closeCreateDraftMenu, (state) => ({ ...state, settingUpDraft: false })),

  on(actions.createNewDraft, (state) => ({ ...state, settingUpDraft: false })),
  on(actions.createNewDraftSuccess, (state, action) => ({ ...state, ownsDraft: true, draftId: action.draft.draftId })),
  on(actions.createNewDraftFailure, (state) => ({ ...state, ownsDraft: false })),

  on(actions.joinExistingDraft, (state) => ({ ...state, settingUpDraft: false, ownsDraft: false })),
  on(actions.joinExistingDraftSuccess, (state, action) => ({ ...state, draftId: action.draft.draftId })),
  on(actions.joinExistingDraftFailure, (state) => ({ ...state })),

  on(actions.getPlayerList, (state, action) => ({ ...state, players: action.players })),
);
