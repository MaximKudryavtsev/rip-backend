import { IResponseErrorMessage, IResponseSuccessMessage } from "../interfaces";
import { APIError } from "../errors";

export { Response } from "express";

export class Controller {
    protected getSuccessMessage(data?: any): IResponseSuccessMessage {
        return {
            success: true,
            data
        };
    }

    protected getErrorMessage(error?: APIError): IResponseErrorMessage {
        return {
            success: false,
            error: error.getError()
        };
    }
}
