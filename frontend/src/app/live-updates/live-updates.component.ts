import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketioService} from "../socketio.service";

@Component({
  selector: 'app-live-updates',
  templateUrl: './live-updates.component.html',
  styleUrls: ['./live-updates.component.scss'],
})
export class LiveUpdatesComponent implements OnInit, OnDestroy {
  messageList: string[] = [];
  receivedMessages: string[] = []

  constructor(
    private socketService: SocketioService
  ) { }

  parseJsonData(json: string) {
    return JSON.parse(json);
  }

  parseDate(strDate : string) {

    const date = new Date(strDate)

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  calculateInGameTime(startDate : string, currentDate : string) {
    const currentTime = new Date(currentDate);
    const startTime = new Date(startDate);

    const diffInMs = Math.abs(currentTime.getTime() - startTime.getTime()); // Get difference in milliseconds

    // Convert milliseconds to minutes
    return Math.floor(diffInMs / (1000 * 60))
  }

  ngOnInit(): void {
    this.socketService.getNewMessage().subscribe((message: string) => {
      //save to master list
      this.messageList.push(message);
      //convert to json
      const msg = JSON.parse(JSON.stringify(message))
      const type = msg.type
      if (typeof type !== "undefined" && (type === 'gameStart' || type === 'extraTime' || type === 'score' || type === 'gameEnd')) {
        this.receivedMessages.unshift(JSON.stringify(msg))
      }
    })
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
