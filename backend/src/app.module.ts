import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import { NotificationsService } from './notifications/notifications.service';
import { GamesService } from './games/games.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway, NotificationsService, GamesService],
})
export class AppModule {}
