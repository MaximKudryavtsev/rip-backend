import { IResponseErrorMessage, IResponseSuccessMessage } from "../interfaces";
import { APIError } from "../errors";
import { DataBase } from "../service";
import { TokenService } from "../service/TokenService";
import { Redis } from "../service/Redis";
import { FileService } from "../service/FileService";
export { Response } from "express";

export class Controller {
    protected readonly database = new DataBase();
    protected readonly tokenService = new TokenService();
    protected readonly redis = new Redis();
    protected readonly fileService = new FileService();

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
