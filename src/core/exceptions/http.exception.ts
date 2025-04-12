import {BaseException} from "./base.exception";

export class HttpException extends BaseException {
    constructor(
        message: string,
        public statusCode: number,
        code?: string,
        details?: any
    ) {
        super(message, code, details);
        this.name = "HttpException";
    }
}

export class BadRequestException extends HttpException {
    constructor(details?: any, message= "Bad request", code="BAD_REQUEST") {
        super(message, 400, code, details);
        this.name = "BadRequestException";
    }
}

export class UnauthorizedException extends HttpException {
    constructor(details?: any, message= "Unauthorized", code="UNAUTHORIZED") {
        super(message, 401, code, details);
        this.name = "UnauthorizedException";
    }
}

export class ForbiddenException extends HttpException {
    constructor(details?: any, message= "Forbidden", code="FORBIDDEN") {
        super(message, 403, code, details);
        this.name = "ForbiddenException";
    }
}

export class NotFoundException extends HttpException {
    constructor(details?: any, message= "Not found", code="NOT_FOUND") {
        super(message, 404, code, details);
        this.name = "NotFoundException";
    }
}

export class ConflictException extends HttpException {
    constructor(details?: any, message= "Conflict", code="ConflictException") {
        super(message, 409, code, details);
        this.name = "ConflictException";
    }
}

export class InternalServerErrorException extends HttpException {
    constructor(details?: any, message = "Internal Server Error", code="INTERNAL_SERVER_ERROR") {
        super(message, 500, code, details);
        this.name = "InternalServerErrorException";
    }
}

