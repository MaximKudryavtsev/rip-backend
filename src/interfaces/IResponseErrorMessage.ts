import { IAPIError } from "../errors/IAPIError";

export interface IResponseErrorMessage {
    success: boolean;
    error: IAPIError;
}
