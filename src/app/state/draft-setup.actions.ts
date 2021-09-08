import { createAction, props } from "@ngrx/store";

import { NewDraftRequest } from "../interfaces/draft-request.interface";
import { DraftResponse } from "../interfaces/draft-response.interface";
import { NewPlayerRequest, Player } from "../interfaces/player.interface";

export const openCreateDraftMenu = createAction('[Draft Setup Component] Open Create Draft Menu');
export const closeCreateDraftMenu = createAction('[Draft Setup Component] Close Create Draft Menu');

export const createNewDraft = createAction('[Draft Setup Component] Create New Draft', props<{ playerRequest: NewPlayerRequest, draftRequest: NewDraftRequest }>());
export const createNewDraftSuccess = createAction('[Draft Service] Create New Draft Success', props<{ draft: DraftResponse }>());
export const createNewDraftFailure = createAction('[Draft Service] Create New Draft Failure');

export const joinExistingDraft = createAction('[Draft Setup Component] Join Existing Draft', props<{ playerRequest: NewPlayerRequest, draftId: string }>());
export const joinExistingDraftSuccess = createAction('[Draft Service] Join Existing Draft Success', props<{ draft: DraftResponse }>());
export const joinExistingDraftFailure = createAction('[Draft Service] Join Existing Draft Failure');

export const getPlayerList = createAction('[Draft Setup Service] Get Player List', props<{ players: Player[] }>());

export const startDraft = createAction('[Draft Setup Component] Start Draft');
