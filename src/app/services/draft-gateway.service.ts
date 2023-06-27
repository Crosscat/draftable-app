import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

import { Player } from "../interfaces/player.interface";

@Injectable({
  providedIn: 'root',
})
export class DraftGatewayService {
  public players$ = this.socket.fromEvent<Player[]>('players');

  constructor(private readonly socket: Socket) { }

  public joinDraft(draftId: string) {
    this.socket.emit('players', draftId);
  }
}
