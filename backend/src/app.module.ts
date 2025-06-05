import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { EventModule } from './events/event.module'
import { SongModule } from './songs/song.module'
import { AuthModule } from './auth/auth.module'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { UserModule } from './users/user.module'
import { PlayerModule } from './players/player.module'
import { WebsocketsModule } from './web-sockets/websockets.module'
import { NecordModule } from 'necord'
import { GatewayIntentBits, IntentsBitField } from 'discord.js'
import { AdminModule } from './admins/admin.module'
import { GoogleSheetsModule } from './google-sheets/google-sheets.module'

@Module({
  imports: [EventModule, SongModule, AuthModule, UserModule, PlayerModule, WebsocketsModule, AdminModule, GoogleSheetsModule,
    NecordModule.forRoot({
      token: process.env.DISCORD_BOT_TOKEN,
      intents: [IntentsBitField.Flags.Guilds, GatewayIntentBits.GuildMembers],
      development: [process.env.DISCORD_BOT_TOKEN],
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes('*')
  }
}
