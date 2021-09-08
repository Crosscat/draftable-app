import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Config } from "../../config";
import { NewPlayerRequest, NewPlayerResponse } from "../interfaces/player.interface";

@Injectable()
export class PlayerService {
  constructor(
    private readonly config: Config,
    private readonly httpClient: HttpClient,
  ) { }

  public createNewPlayer(request: NewPlayerRequest): Observable<NewPlayerResponse> {
    return this.httpClient.post<NewPlayerResponse>(`${this.config.serviceUrl}/player`, request);
  }
}
