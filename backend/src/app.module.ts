import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { SongModule } from './song/song.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from 'src/middleware/auth.middleware'
import { UserModule } from './user/user.module';

@Module({
  imports: [EventModule, SongModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes('*');
  }
}
