import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketioService} from "../socketio.service";

@Component({
  selector: 'app-live-games',
  templateUrl: './live-games.component.html',
  styleUrls: ['./live-games.component.scss']
})
export class LiveGamesComponent implements OnInit, OnDestroy {

  constructor(
    private socketService: SocketioService
  ) { }

  ngOnInit(): void {
    this.socketService.getNewMessage().subscribe((message: string) => {
      console.log(message)
    })
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
