import { APIError } from "./APIError";

export interface IErrors {
    UserWithThisLoginAlreadyExist: APIError;
    UserWithThisEmailAlreadyExist: APIError;
    WrongConfirmationCode: APIError;
    PasswordInvalid: APIError;
    PasswordAreNotEquals: APIError;
    UserWithThisEmailNotRegistered: APIError;
    WrongData: APIError;
    UserNotConfirmed: APIError;
    EnteredCurrentLogin: APIError;
    EnteredCurrentEmail: APIError;
    CurrentPasswordInvalid: APIError;
    EnteredCurrentPassword: APIError;
    NotYourEmail: APIError;
    WrongCommendId: APIError;
    WrongToken: APIError;
}
