import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IHelloMessage } from "./interfaces/iHelloMessage";
import { ISocketMessage } from "./interfaces/iSocketMessage";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl: string = 'http://localhost:3007/'

  constructor(
    private httpClient: HttpClient
  ) { }

  public getHelloMessage(): Observable<IHelloMessage> {
    return <Observable<IHelloMessage>> this.httpClient.get(this.apiUrl)
  }

  public subscribeToLiveScoreData() { }
}
