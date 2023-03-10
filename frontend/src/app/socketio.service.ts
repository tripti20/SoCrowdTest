import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {environment} from "./environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket: Socket
  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT,  { transports: ["websocket"]});
  }

  public getNewMessage = () => {
    this.socket.on('scoreRoom', (message) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
