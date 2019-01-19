import { APIError } from "./APIError";

export interface IErrors {
    UserWithThisLoginAlreadyExist: APIError;
    UserWithThisEmailAlreadyExist: APIError;
    WrongConfirmationCode: APIError;
    PasswordInvalid: APIError;
    PasswordAreNotEquals: APIError;
    UserWithThisEmailNotRegistered: APIError;
    WrongPassword: APIError;
    UserNotConfirmed: APIError;
    EnteredCurrentLogin: APIError;
    EnteredCurrentEmail: APIError;
    CurrentPasswordInvalid: APIError;
    EnteredCurrentPassword: APIError;
    NotYourEmail: APIError;
    WrongCommendId: APIError;
    DiaryAlreadyExist: APIError;
    NotYourDiary: APIError;
    DiaryNotExist: APIError;
    RecordAlreadyExist: APIError;
    RecordNotExist: APIError;
}
