import { Component, OnInit} from '@angular/core';
import { AppService } from "./app.service";
import { ISocketMessage } from "./interfaces/iSocketMessage";
import {SocketioService} from "./socketio.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  public title: string = 'frontend';

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit() {
    /*this.appService.getHelloMessage().subscribe((payload) => {
      this.helloMessage = payload.message;
    })*/
  }

}
