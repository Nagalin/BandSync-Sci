import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { SongModule } from './song/song.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventModule, SongModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
