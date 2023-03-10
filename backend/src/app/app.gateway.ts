import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { GamesService } from '../games/games.service';
import { Game } from '../games/Game';
import { IGameUpdate } from '../games/iGameUpdate';

@WebSocketGateway(3008, { transports: ['websocket'], cors: true })
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() private server;
  private clientList = [];

  constructor(private gamesService: GamesService) {}

  afterInit() {
    /**
     * broadcasts game-start events
     * loop through the list of games
     * check if a game has end or not
     * check if a game has started or not
     * check if a notification has already been sent out or not
     * send out a notification if the game has started, has not ended and a notification has not been sent out previously
     * mark that a notification has been sent out
     */
    const doGameStartEvents = () => {
      for (const game of this.gamesService.games.filter((game: Game) => {
        return !game.ended() && game.started() && !game.getStartNotified();
      })) {
        this.broadcast(<IGameUpdate>{
          type: 'gameStart',
          timestamp: new Date(),
          gameState: game,
        });
        game.setStartNotified(true);
      }
    };

    /**
     * generates and broadcasts in-game events
     * loop through the list of games
     * check if a game has ended or not and sent out a random update, if not.
     */
    const doGameEvents = () => {
      for (const game of this.gamesService.games.filter((game: Game) => {
        return game.isEnded == false && game.isStarted == true;
      })) {
        const randomUpdate = this.gamesService.generateRandomGameUpdate(game);

        if (randomUpdate) {
          this.broadcast(randomUpdate);
        }
      }
    };

    /**
     * broadcasts game-end events
     * loop through the list of games
     * check if a game has ended or not and if a notification has been send out if the game has ended
     * if a game has ended and a notification has not been sent out, send one
     * and set that a notification has been sent out so that we don't send out a notification for the same game.
     */
    const doGameEndEvents = () => {
      for (const game of this.gamesService.games.filter((game: Game) => {
        return game.ended() && !game.getEndNotified();
      })) {
        this.broadcast(<IGameUpdate>{
          type: 'gameEnd',
          timestamp: new Date(),
          gameState: game,
        });
        game.setEndNotified(true);
      }
    };

    /**
     * repeatedly send out the notifications at certain intervals
     * notification will not be sent out once every game has ended
     */
    setInterval(doGameStartEvents, 500);
    setInterval(doGameEndEvents, 500);
    setInterval(doGameEvents, 500);
  }

  /**
   * entry point for socket connection
   * send out a list of al the games when someone connects
   * @param client
   * @param args
   */
  handleConnection(client: any, ...args: any[]): any {
    this.clientList.push(client);
    client.join('scoreRoom');
    client.emit('scoreRoom', this.gamesService.games);
  }

  /**
   * reached when socket client disconnects
   * @param client
   */
  handleDisconnect(client: any): any {
    for (let i = 0; i < this.clientList.length; i++) {
      if (this.clientList[i] === client) {
        this.clientList.splice(i, 1);
        break;
      }
    }
    client.disconnect();
  }

  /**
   * sends a payload to all connected clients
   * @param payload
   * @private
   */
  private broadcast(payload: any) {
    for (const client of this.clientList) {
      client.emit('scoreRoom', payload);
      client.emit('gamesList', this.gamesService.games);
    }
  }
}
