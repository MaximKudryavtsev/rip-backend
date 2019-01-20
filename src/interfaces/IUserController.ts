import { IGettingUserData } from "./IGettingUserData";
import { Response } from "express";
import { ICheckEmail } from "./ICheckEmail";
import { ICheckLogin } from "./ICheckLogin";
import { ILoginData } from "./ILoginData";
import { IConfirmationData } from "./IConfirmationData";
import { IChangePassword } from "./IChangePassword";
import { IChangeLogin } from "./IChangeLogin";
import { IChangeEmail } from "./IChangeEmail";

export interface IUserController {
    registerUser(inputData: IGettingUserData, response: Response): Promise<void>;
    checkEmailExist(data: ICheckEmail, response: Response): Promise<void>;
    checkLoginExist(data: ICheckLogin, response: Response): Promise<void>;
    login(data: ILoginData, response: Response): Promise<void>;
    resendCode(email: string, response: Response): Promise<void>;
    confirmationCode(data: IConfirmationData, res: Response): Promise<void>;
    getUser(token: string, response: Response): Promise<void>;
    changeLogin(data: IChangeLogin, res: Response): Promise<void>;
    changeEmail(data: IChangeEmail, res: Response): Promise<void>;
    changePassword(data: IChangePassword, res: Response): Promise<void>;
    forgotPassword(email: string, res: Response): Promise<void>;
}
