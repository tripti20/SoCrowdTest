import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketioService} from "../socketio.service";

@Component({
  selector: 'app-tab-layout',
  templateUrl: './tab-layout.component.html',
  styleUrls: ['./tab-layout.component.scss']
})
export class TabLayoutComponent implements OnInit, OnDestroy {

  messageList: string[] = [];
  receivedMessages: string[] = []
  listOfGames: string[] = []

  constructor(
    private socketService: SocketioService
  ) { }

  parseJsonData(json: string) {
    return JSON.parse(JSON.stringify(json)); //object to string to json
  }


  ngOnInit(): void {
    this.socketService.getNewMessage().subscribe((message: string) => {
      //save to master list
      this.messageList.push(message);

      //prepare data for live update section
      //convert to json
      const msg = JSON.parse(JSON.stringify(message))
      const type = msg.type
      if (typeof type !== "undefined" && (type === 'gameStart' || type === 'extraTime' || type === 'score' || type === 'gameEnd')) {
        this.receivedMessages.unshift(JSON.stringify(msg))
      }

      //prepare data for live games section
      if(typeof this.messageList[1] !== 'undefined' && this.messageList.length <= 2) {
        const listOfAllGames = this.messageList.at(1)
        const games: string[] = JSON.parse(JSON.stringify(listOfAllGames))

        let onGoingGames = games.filter((game) => this.parseJsonData(game).isStarted === true && this.parseJsonData(game).isEnded === false);
        onGoingGames = onGoingGames.sort((a, b) => {
          const dateA = new Date(this.parseJsonData(a).startTime);
          const dateB = new Date(this.parseJsonData(b).startTime);
          return dateA.getTime() - dateB.getTime();
        });


        let endedGames = games.filter((game) => this.parseJsonData(game).isStarted === true && this.parseJsonData(game).isEnded === true);
        endedGames = endedGames.sort((a, b) => {
          const dateA = new Date(this.parseJsonData(a).startTime);
          const dateB = new Date(this.parseJsonData(b).startTime);
          return dateB.getTime() - dateA.getTime();
        });

        let gamesNotStarted = games.filter((game) => this.parseJsonData(game).isStarted === false && this.parseJsonData(game).isEnded === false);
        gamesNotStarted = gamesNotStarted.sort((a, b) => {
          const dateA = new Date(this.parseJsonData(a).startTime);
          const dateB = new Date(this.parseJsonData(b).startTime);
          return dateA.getTime() - dateB.getTime();
        });

        this.listOfGames = onGoingGames.concat(endedGames, gamesNotStarted)
      }
    })

    this.socketService.getGamesList().subscribe((message: string) => {
      if (message.length !== 0) {
        const games: string[] = JSON.parse(JSON.stringify(message))

        let onGoingGames = games.filter((game) => this.parseJsonData(game).isStarted === true && this.parseJsonData(game).isEnded === false);
        onGoingGames = onGoingGames.sort((a, b) => {
          const dateA = new Date(this.parseJsonData(a).startTime);
          const dateB = new Date(this.parseJsonData(b).startTime);
          return dateA.getTime() - dateB.getTime();
        });


        let endedGames = games.filter((game) => this.parseJsonData(game).isStarted === true && this.parseJsonData(game).isEnded === true);
        endedGames = endedGames.sort((a, b) => {
          const dateA = new Date(this.parseJsonData(a).startTime);
          const dateB = new Date(this.parseJsonData(b).startTime);
          return dateB.getTime() - dateA.getTime();
        });

        let gamesNotStarted = games.filter((game) => this.parseJsonData(game).isStarted === false && this.parseJsonData(game).isEnded === false);
        gamesNotStarted = gamesNotStarted.sort((a, b) => {
          const dateA = new Date(this.parseJsonData(a).startTime);
          const dateB = new Date(this.parseJsonData(b).startTime);
          return dateA.getTime() - dateB.getTime();
        });

        //this.listOfGames = onGoingGames.concat(endedGames, gamesNotStarted)
        this.listOfGames = onGoingGames.concat(endedGames, gamesNotStarted)
        console.log(this.listOfGames)
      }
    })
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
