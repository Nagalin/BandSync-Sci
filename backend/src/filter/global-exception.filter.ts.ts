import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common'
import {  Request, Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const logger = new Logger()
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()

        if(exception instanceof HttpException) {
            const status = exception.getStatus()

            logger.error(
                `${request.method} ${request.url} ${status} error: ${exception.message}`
            )
            response.status(status).json({
                statusCode: status,
                message: exception.message
            })

        } else {
            const status = HttpStatus.INTERNAL_SERVER_ERROR
            logger.error(
                `${request.method} ${request.url} ${status} error: ${exception}`
            )
            response.status(status).json({
                statusCode: status,
                message: 'Intenal server error'
            })


        }
      
    }
}