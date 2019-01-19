import { IErrors } from "./IErrors";
import { APIError } from "./APIError";
import { EHTTPStatus } from "../config/EHTTPStatus";

export const errorList: IErrors = {
    UserWithThisEmailAlreadyExist: new APIError({status: EHTTPStatus.BAD, code: 1, message: "Пользователь с таким e-mail уже зарегистрирован!"}),
    UserWithThisLoginAlreadyExist: new APIError({status: EHTTPStatus.BAD, code: 2, message: "Пользователь с таким логином уже зарегистрирован!"}),
    WrongConfirmationCode: new APIError({status: EHTTPStatus.BAD, code: 3, message: "Неверный код подтверждения"}),
    PasswordInvalid: new APIError({status: EHTTPStatus.BAD, code: 4, message: "Невалидный пароль!"}),
    PasswordAreNotEquals: new APIError({status: EHTTPStatus.BAD, code: 5, message: "Пароли не совпадают!"}),
    UserWithThisEmailNotRegistered: new APIError({status: EHTTPStatus.NOT_FOUND, code: 6, message: "Пользователь с таким e-mail не зарегистрирован!"}),
    WrongData: new APIError({status: EHTTPStatus.BAD, code: 7, message: "Введены неверные данные!"}),
    UserNotConfirmed: new APIError({status: EHTTPStatus.BAD, code: 8, message: "Пользователь не подтвержден!"}),
    EnteredCurrentLogin: new APIError({status: EHTTPStatus.BAD, code: 9, message: "Вы ввели текущий логин!"}),
    EnteredCurrentEmail: new APIError({status: EHTTPStatus.BAD, code: 10, message: "Вы ввели текущий e-mail!"}),
    CurrentPasswordInvalid: new APIError({status: EHTTPStatus.BAD, code: 11, message: "Вы ввели неверный пароль!"}),
    EnteredCurrentPassword: new APIError({status: EHTTPStatus.BAD, code: 12, message: "Вы ввели текущий пароль!"}),
    NotYourEmail: new APIError({status: EHTTPStatus.BAD, code: 13, message: "Это не ваш e-mail!"}),
    WrongToken: new APIError({status: EHTTPStatus.BAD, code: 14, message: "Неверный токен!"}),
    WrongCommendId: new APIError({status: EHTTPStatus.BAD, code: 15, message: "Неверный Id комментария!"}),
};
