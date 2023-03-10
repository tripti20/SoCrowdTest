import { Game } from './Game';

export interface IGameUpdate {
  timestamp: Date;
  type: 'gameStart' | 'extraTime' | 'score' | 'gameEnd';
  gameState: Game;
}
