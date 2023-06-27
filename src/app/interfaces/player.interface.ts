export interface NewPlayerRequest {
  name: string;
}

export interface NewPlayerResponse {
  playerId: string;
  accessToken: string;
}

export interface Player {
  name: string;
  ownsDraft: boolean;
}
