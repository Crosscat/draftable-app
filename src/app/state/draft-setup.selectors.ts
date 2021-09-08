import { createSelector } from "@ngrx/store";

import { AppState, getAppState } from ".";
import { DraftSetupState } from "./draft-setup.reducer";

export const getDraftSetupState = createSelector(
  getAppState,
  (state: AppState) => state.draftSetup,
);

export const isSettingUpDraft = createSelector(
  getDraftSetupState,
  (state: DraftSetupState) => state.settingUpDraft,
);

export const getPlayers = createSelector(
  getDraftSetupState,
  (state: DraftSetupState) => state.players,
);
