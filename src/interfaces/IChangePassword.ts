import { IToken } from "./IToken";

export interface IChangePassword extends IToken {
    oldPassword: string;
    password: string;
    repeatPassword: string;
}
