export class BaseException extends Error {
    constructor(
        message: string,
        public code?: string,
        public details?: any,
    ) {
        super(message);
        this.name = "BaseException"
    }
}