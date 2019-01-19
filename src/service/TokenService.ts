import * as jsonwebtoken from "jsonwebtoken";
import { ITokenData } from "../interfaces/";
import { get } from "lodash";
import * as CryptoJS from "crypto-js";

export class TokenService {
    private readonly secret = process.env.TOKEN_SECRET;
    private readonly algorithm = process.env.TOKEN_ALGORITHM;
    private token = "";

    setToken(data: ITokenData): void {
        const token = jsonwebtoken.sign(data, this.secret, {algorithm: this.algorithm});
        this.token = this.cryptToken(token);
    }

    getToken(): string {
        return this.token;
    }

    getUserIdByToken(token: string): any {
        let data: any = "";
        const decryptedToken = this.decryptToken(token);
        jsonwebtoken.verify(token, this.secret, {algorithms: [this.algorithm]}, () => {
            data = jsonwebtoken.decode(decryptedToken, {complete: true});
        });
        const payload = get(data, "payload");
        return get(payload, "userId");
    }

    private cryptToken(token: string): string {
        return CryptoJS.AES.encrypt(token, process.env.SECRET_TOKEN).toString();
    }

    private decryptToken(cryptedToken: string): string {
        const bytes = CryptoJS.AES.decrypt(cryptedToken, process.env.SECRET_TOKEN);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
