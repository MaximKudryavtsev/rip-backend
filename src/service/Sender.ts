import * as nodemailer from "nodemailer";
import { EmailConfig } from "../config/";
import { getHTMLRegistrationLetter } from "../helpers";

export class Sender {
    private static readonly transporter = nodemailer.createTransport({
        host: EmailConfig.host,
        port: EmailConfig.port,
        secure: EmailConfig.secure,
        auth: {
            user: EmailConfig.auth.user,
            pass: EmailConfig.auth.pass,
        }
    });
    private email: string;

    sendConfirmationLink(code: string, login: string): void {
        Sender.transporter.sendMail(this.getOptionsConfirmationCode(code, login),  ((err, info) => {
            console.log(info.response);
        }));
    }

    sendNewPassword(login: string, password: string): void {
        Sender.transporter.sendMail(this.getOptionsForgotPassword(login, password));
    }

    setEmail(email: string): void {
        this.email = email;
    }

    private getOptionsConfirmationCode(code: string, login: string): object {
        const link = `${process.env.FRONTEND_HOST}confirmation/${login}/${code}`;
        const html = getHTMLRegistrationLetter(login, link);
        return {
            from: `Кулинар ${EmailConfig.auth.user}`,
            to: this.email,
            subject: "Подтверждение e-mail",
            text: "Подтверждение e-mail",
            html
        };
    }

    private getOptionsForgotPassword(login: string, password: string): object {
        return {
            from: `Кулинар ${EmailConfig.auth.user}`,
            to: this.email,
            subject: "Новый пароль",
            text: "Новый пароль",
            html: `<div><b>${login}</b>, ваш новый пароль: ${password}</div>`
        };
    }
}
