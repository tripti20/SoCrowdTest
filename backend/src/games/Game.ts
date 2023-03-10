export class Game {
  /* variables */
  public events: Array<any>;
  public awayTeamScore: number;
  public homeTeamScore: number;
  public endTime: Date;
  public maxEndTime: Date;
  public isStarted: boolean;
  public isEnded: boolean;
  private endNotified = false;
  private startNotified = false;

  /**
   * Create new games
   * Initialize scores for both time
   * Setup end time
   * @param id
   * @param homeTeam
   * @param awayTeam
   * @param startTime
   */
  constructor(
    public id: string,
    public homeTeam: string,
    public awayTeam: string,
    public startTime: Date,
  ) {
    this.homeTeamScore = 0;
    this.awayTeamScore = 0;
    this.endTime = this.addGameTime(90);
    this.maxEndTime = this.addGameTime(120);
    this.isStarted = this.started();
    this.isEnded = this.ended();
  }

  /**
   * checks if  game has ended
   * by checking if the current time is greeter than the end time of the gam
   */
  public ended(): boolean {
    return new Date() > this.endTime;
  }

  /**
   * checks if  game has started
   * by checking if the current time is greeter than the end time of the gam
   */
  public started(): boolean {
    return new Date() > this.startTime;
  }

  /**
   * @param minutes
   */
  public addGameTime(minutes: number): Date {
    return new Date(this.startTime.getTime() + minutes * 60000);
  }

  /**
   * checks if more extra can be added
   * a max of 30 mins can be added
   * @param minutes
   */
  public canAddExtraTime(minutes: number): boolean {
    const newEndTime = new Date(this.endTime.getTime() + minutes * 60000);
    return newEndTime < this.maxEndTime;
  }

  /**
   * @param minutes
   */
  public addExtraTime(minutes: number) {
    this.endTime = new Date(this.endTime.getTime() + minutes * 60000);
  }

  /**
   * set that an notification event has already been sent for an ended game
   * @param newValue
   */
  public setStartNotified(newValue: boolean): void {
    this.startNotified = newValue;
  }

  /**
   * check if a notification has been sent for an already ended game.
   */
  public getStartNotified(): boolean {
    return this.startNotified;
  }

  /**
   * set that an notification event has already been sent for an ended game
   * @param newValue
   */
  public setEndNotified(newValue: boolean): void {
    this.endNotified = newValue;
  }

  /**
   * check if a notification has been sent for an already ended game.
   */
  public getEndNotified(): boolean {
    return this.endNotified;
  }

  /**
   * increments goal count by 1 for either homeTeam or away team
   * @param homeTeam - if this is true it increments score for homeTeam
   */
  public markGoal(homeTeam: boolean): void {
    if (this.ended()) return;

    if (homeTeam === true) {
      this.homeTeamScore += 1;
    } else {
      this.awayTeamScore += 1;
    }
  }

  /**
   * gets the human-friendly version of the score
   */
  public getGameScore(): string {
    return this.homeTeamScore + ' - ' + this.awayTeamScore;
  }

  /**
   * generates a random 3 letter abbreviation that resembles a football team name
   */
  public static getRandomTeamAbbr(): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let abbr = '';
    for (let i = 0; i < 3; i++) {
      abbr += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return abbr.toUpperCase();
  }

  /**
   * generates a random start time for a game within given bounds
   */
  public static getRandomStartTime(): Date {
    const laterOrEarlier = Math.random() < 0.5;
    const randMinutes = Math.random() * 200;
    if (laterOrEarlier) {
      return new Date(Date.now() - randMinutes * 60000);
    }
    return new Date(Date.now() + randMinutes * 60000);
  }
}
