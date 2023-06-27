import { Card } from "./card.interface";

export interface DraftInfo {
  cardsPerPlayer: number;
  minPlayers: number;
  maxPlayers: number;
  picksBeforeRefresh: number;
}

export interface DraftPick {
  cards: Card[];
  possibleArrangements: Card[][];
  remainingPicks: number;
}
