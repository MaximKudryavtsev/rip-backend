import { IGettingUserData } from "../interfaces/";
import { IUserData } from "../interfaces/";
import * as uuid from "uuid";
import * as CryptoJS from "crypto-js";

export class User {
    private static readonly activationCodeLength = 32;
    private userData: IUserData;

    setInitUser(inputData: IGettingUserData): void {
        this.userData = {
            login: inputData.login,
            email: inputData.email,
            password: this.cryptPassword(inputData.password),
            activationCode: this.getActivationCode(),
            avatar: "",
            created: new Date().getTime().toString(),
        };
    }

    getInitUser(): IUserData {
        return this.userData;
    }

    cryptPassword(password: string): string {
        return CryptoJS.SHA256(password).toString();
    }

    getActivationCode(): string {
        return uuid.v4().toString().substr(0, User.activationCodeLength);
    }

}
