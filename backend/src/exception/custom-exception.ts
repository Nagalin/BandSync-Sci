import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
    constructor(message: string = 'unauthorized access') {
        super(message, HttpStatus.UNAUTHORIZED)
     }
}

export class ForbiddenException extends HttpException {
    constructor(message: string = 'forbidden access') {
        super(message, HttpStatus.FORBIDDEN)
     }
}