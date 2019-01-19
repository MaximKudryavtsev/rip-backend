import { IResponseErrorMessage, IResponseSuccessMessage } from "../interfaces";
import { APIError, IAPIError } from "../errors";

export { Response } from "express";

export class Controller {
    protected getSuccesMessage(data: any): IResponseSuccessMessage {
        return {
            success: true,
            data
        };
    }

    protected getErrorMessage(error: APIError): IResponseErrorMessage {
        return {
            success: false,
            error: error.getError()
        };
    }
}
