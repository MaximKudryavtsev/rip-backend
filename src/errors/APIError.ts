import { IAPIError } from "./IAPIError";

export class APIError {
    private readonly apiError: IAPIError;

    constructor(error: IAPIError) {
        this.apiError = error;
    }

    getError(): IAPIError {
        return this.apiError;
    }

    getStatus(): number {
        return this.apiError.status;
    }
}
