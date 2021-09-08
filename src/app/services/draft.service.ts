import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { Config } from '../../config';
import { NewDraftRequest } from "../interfaces/draft-request.interface";
import { DraftResponse } from '../interfaces/draft-response.interface';
import { Player } from '../interfaces/player.interface';

@Injectable()
export class DraftService {
  constructor(
    private readonly config: Config,
    private readonly httpClient: HttpClient,
    private readonly socket: Socket,
  ) { }

  public createNewDraft(draftRequest: NewDraftRequest): Observable<DraftResponse> {
    return this.httpClient.post<DraftResponse>(`${this.config.serviceUrl}/draft`, draftRequest, this.getOptions());
  }

  public joinExistingDraft(draftId: string): Observable<DraftResponse> {
    return this.httpClient.post<DraftResponse>(`${this.config.serviceUrl}/draft/${draftId}`, {}, this.getOptions());
  }

  private getOptions() {
    const auth = localStorage.getItem('access-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth}`,
    });

    return { headers }
  }
}
