import { Controller } from "./Controller";
import { IChangeLogin, IChangePassword, ICheckEmail, ICheckLogin, IConfirmationData, IGettingUserData, ILoginData, IUserData } from "../interfaces";
import { getAvatarLink, isPasswordsValid } from "../helpers";
import { errorList } from "../errors";
import { Response, Request } from "express";
import { User } from "../models/User";
import { Sender } from "../service/Sender";
import { EModels } from "../service";
import { UserSchema } from "../schemas";
import { get } from "lodash";
import { IUserController } from "../interfaces/IUserController";
import { IChangeEmail } from "../interfaces/IChangeEmail";

export class UserController extends Controller implements IUserController {
    private readonly user = new User();
    private readonly sender = new Sender();
    private readonly userModel = this.database.getModel(EModels.USERS, UserSchema);

    async registerUser(inputData: IGettingUserData, response: Response): Promise<void> {
        if (!isPasswordsValid(inputData.password, inputData.repeatPassword)) {
            response.json(this.getErrorMessage(errorList.PasswordAreNotEquals));
        } else {
            this.user.setInitUser(inputData);
            const data: IUserData = this.user.getInitUser();
            this.sender.setEmail(data.email);
            this.userModel.create(data).then(() => {
                this.sender.sendConfirmationLink(data.activationCode, data.login);
                response.json(this.getSuccessMessage());
            });
        }
    }

    async checkEmailExist(data: ICheckEmail, response: Response): Promise<void> {
        const user = await this.userModel.findOne({email: data.email});
        if (user) {
            if (data.flag === "reg") {
                response.json(this.getErrorMessage(errorList.UserWithThisEmailAlreadyExist));
            } else if (data.flag === "login") {
                response.json(this.getSuccessMessage());
            }
        } else {
            if (data.flag === "reg") {
                response.json(this.getSuccessMessage());
            } else if (data.flag === "login") {
                response.json(this.getErrorMessage(errorList.UserWithThisEmailNotRegistered));
            }
        }
    }

    async checkLoginExist(data: ICheckLogin, response: Response): Promise<void> {
        const user = await this.userModel.findOne({login: data.login});
        if (user) {
            if (data.flag === "reg") {
                response.json(this.getErrorMessage(errorList.UserWithThisLoginAlreadyExist));
            }
        } else {
            response.json(this.getSuccessMessage());
        }
    }

    async login(data: ILoginData, response: Response): Promise<void> {
        const password = await this.userModel.findOne({email: data.email, password: this.user.cryptPassword(data.password)});
        if (!password) {
            response.json(this.getErrorMessage(errorList.WrongData));
        } else if (get(password, "activationCode") !== "") {
            response.json(this.getErrorMessage(errorList.UserNotConfirmed));
        } else {
            const userId = get(password, "_id");
            this.tokenService.setToken({userId});
            const token = this.tokenService.getToken();
            response.send(this.getSuccessMessage(token));
        }
    }

    async resendCode(email: string, response: Response): Promise<void> {
        const user = await this.userModel.findOne({email});
        if (user) {
            const login = get(user, "login");
            const newCode = this.user.getActivationCode();
            this.sender.setEmail(email);
            this.userModel.findOneAndUpdate({email}, {activationCode: newCode}).then(() => {
                this.sender.sendConfirmationLink(newCode, login);
                response.json(this.getSuccessMessage());
            });
        } else {
            response.json(this.getErrorMessage(errorList.UserWithThisEmailNotRegistered));
        }
    }

    async confirmationCode(data: IConfirmationData, res: Response): Promise<void> {
        const oldData: IConfirmationData = {login: data.login, activationCode: data.activationCode};
        const newData: IConfirmationData = {login: data.login, activationCode: ""};
        return this.userModel.findOneAndUpdate(oldData, newData).then((response) => {
            if (!response) {
                res.json(this.getErrorMessage(errorList.WrongConfirmationCode));
            } else {
                res.json(this.getSuccessMessage());
            }
        });
    }

    async getUser(token: string, response: Response): Promise<void> {
        const userId = this.tokenService.getUserIdByToken(token);
        const data = await this.userModel.findById(userId);
        if (data) {
            let avatar = get(data, "avatar");
            if (!avatar) {
                avatar = "";
            } else {
                const id = get(data, "_id");
                avatar = getAvatarLink(id, avatar);
            }
            const user =  {
                _id: get(data, "_id"),
                login: get(data, "login"),
                email: get(data, "email"),
                created: get(data, "created"),
                avatar,
            };
            response.json(this.getSuccessMessage(user));
        } else {
            response.json(this.getErrorMessage(errorList.WrongToken));
        }
    }

    async changeLogin(data: IChangeLogin, res: Response): Promise<void> {
        const isLoginExist = await this.userModel.findOne({login: data.login});
        const userId = this.tokenService.getUserIdByToken(data.token);
        const currentLoginResponse = await this.userModel.findById(userId);
        const currentLogin = get(currentLoginResponse, "login");
        if (currentLogin === data.login) {
            res.json(this.getErrorMessage(errorList.EnteredCurrentLogin));
        } else if (isLoginExist) {
            res.json(this.getErrorMessage(errorList.UserWithThisLoginAlreadyExist));
        } else {
            const updateUser = await this.userModel.findByIdAndUpdate(userId, {login: data.login});
            if (updateUser) {
                res.json(this.getSuccessMessage());
            }
        }
    }

    async changeEmail(data: IChangeEmail, res: Response): Promise<void> {
        const isEmailExist = await this.userModel.findOne({email: data.email});
        const userId = this.tokenService.getUserIdByToken(data.token);
        const user = await this.userModel.findById(userId);
        const currentEmail = get(user, "email");
        const login = get(user, "login");
        if (currentEmail === data.email) {
            res.json(this.getErrorMessage(errorList.EnteredCurrentEmail));
        } else if (isEmailExist) {
            res.json(this.getErrorMessage(errorList.UserWithThisEmailAlreadyExist));
        } else {
            res.json(this.getSuccessMessage());
            const code = this.user.getActivationCode();
            await this.userModel.findByIdAndUpdate(userId, {activationCode: code, email: data.email});
            this.sender.setEmail(data.email);
            this.sender.sendConfirmationLink(code, login);
        }
    }

    async changePassword(data: IChangePassword, res: Response): Promise<void> {
        const userId = this.tokenService.getUserIdByToken(data.token);
        const user = await this.userModel.findById(userId);
        const currentPassword = get(user, "password");
        const cryptedNewPassword = this.user.cryptPassword(data.password);
        if (currentPassword !== this.user.cryptPassword(data.oldPassword)) {
            res.json(this.getErrorMessage(errorList.CurrentPasswordInvalid));
        } else if (currentPassword === this.user.cryptPassword(data.password)) {
            res.json(this.getErrorMessage(errorList.EnteredCurrentPassword));
        } else if (data.password !== data.repeatPassword) {
            res.json(this.getErrorMessage(errorList.PasswordAreNotEquals));
        } else {
            await this.userModel.findByIdAndUpdate(userId, {password: cryptedNewPassword});
            res.json(this.getSuccessMessage());
        }
    }

    async forgotPassword(email: string, res: Response): Promise<void> {
        const user = await this.userModel.findOne({email});
        if (!user) {
            res.json(this.getErrorMessage(errorList.UserWithThisEmailNotRegistered));
        } else {
            const newPassword = this.user.getActivationCode();
            const cryptedPassword = this.user.cryptPassword(newPassword);
            const login = get(user, "login");
            await this.userModel.findOneAndUpdate({email}, {password: cryptedPassword});
            this.sender.setEmail(email);
            this.sender.sendNewPassword(login, newPassword);
            res.json(this.getSuccessMessage());
        }
    }

    async uploadAvatar(request: Request, response: Response): Promise<void> {
        this.fileService.uploadAvatar(request, response);
    }

    async deleteAvatar(token: string, response: Response): Promise<void> {
        const userId = this.tokenService.getUserIdByToken(token);
        await this.fileService.deleteAvatar(userId, response);
        await this.userModel.findByIdAndUpdate(userId, {avatar: ""});
        response.json(this.getSuccessMessage());
    }
}
