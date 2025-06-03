import { Module } from '@nestjs/common'
import { EventGateWay } from './event.gateway'

@Module({
  providers: [EventGateWay],
  exports: [EventGateWay],
})
export class WebsocketsModule {} 