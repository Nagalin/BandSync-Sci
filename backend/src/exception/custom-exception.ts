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

export class NotFoundException extends HttpException {
    constructor(message: string = 'not found') {
        super(message, HttpStatus.NOT_FOUND)
    }
}

export class ConflictException extends HttpException {
    constructor(message: string = 'conflict') {
        super(message, HttpStatus.CONFLICT)
    }
}
