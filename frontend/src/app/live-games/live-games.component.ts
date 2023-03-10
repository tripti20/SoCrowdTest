import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {data} from "autoprefixer";

@Component({
  selector: 'app-live-games',
  templateUrl: './live-games.component.html',
  styleUrls: ['./live-games.component.scss']
})
export class LiveGamesComponent implements OnInit, OnDestroy {

  @Input() data: string[] = [];

  constructor() { }

  parseJsonData(json: string) {
    return JSON.parse(JSON.stringify(json)); //object to string to json
  }

  calculateInGameTime(startDate : string) {
    const currentTime = new Date();
    const startTime = new Date(startDate);

    const diffInMs = Math.abs(currentTime.getTime() - startTime.getTime()); // Get difference in milliseconds

    // Convert milliseconds to minutes
    return Math.floor(diffInMs / (1000 * 60))
  }

  calculateTotalGameTime(startDate : string, currentDate : string) {
    const currentTime = new Date(currentDate);
    const startTime = new Date(startDate);

    const diffInMs = Math.abs(currentTime.getTime() - startTime.getTime()); // Get difference in milliseconds

    // Convert milliseconds to minutes
    return Math.floor(diffInMs / (1000 * 60))
  }

  ngOnInit(): void {
   //console.log(data)
  }

  ngOnDestroy() {

  }
}
