import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Logger } from '@nestjs/common'

@WebSocketGateway({
  cors: {
    origin: '*'
  },
})

export class EventGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server
  private logger: Logger = new Logger('ChatGateway')

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('run-event')
  handleMessage(client: Socket): void {
    this.logger.log('event received')
    this.server.emit('run-event')
  }

  @SubscribeMessage('end-event')
  handleEndEvent(client: Socket): void {
    this.logger.log('end event received')
    this.server.emit('end-event')
  }
} 