import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { DraftSetupEffects } from "./draft-setup.effects";
import { draftSetupReducer, DraftSetupState } from "./draft-setup.reducer";

export interface AppState {
  draftSetup: DraftSetupState,
}

export const reducers: ActionReducerMap<AppState> = {
  draftSetup: draftSetupReducer,
};

export const getAppState = createFeatureSelector<AppState>('draftable');

export const effects: any[] = [DraftSetupEffects];
