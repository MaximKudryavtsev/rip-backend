import { Controller } from "./Controller";
import { ICheckEmail, ICheckLogin, IGettingUserData, IUserData } from "../interfaces";
import { isPasswordsValid } from "../helpers";
import { errorList } from "../errors";
import { Response } from "express";
import { User } from "../models/User";
import { Sender } from "../service/Sender";
import { DataBase, EModels } from "../service";
import { UserSchema } from "../schemas";
import { TFlagCheckEmail } from "../types";

export class UserController extends Controller {
    private readonly user = new User();
    private readonly sender = new Sender();
    private readonly database = new DataBase();
    private readonly userModel = this.database.getModel(EModels.USERS, UserSchema);

    async registerUser(inputData: IGettingUserData, response: Response): Promise<void> {
        if (!isPasswordsValid(inputData.password, inputData.repeatPassword)) {
            const error = errorList.PasswordAreNotEquals;
            response.send(error.getError());
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
}
