import * as express from "express";
const router = express.Router();
import { Request } from "express";
import { Response } from "express";
import { EHTTPStatus } from "../config/";
import { IConfirmationData } from "../interfaces/";
import { UserController } from "../controller";

const controller = new UserController();

enum Actions {
    CONFIRM = "/confirmation/:login/:activationCode",
    RESEND = "/resend",
}

router.get(Actions.CONFIRM, async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(EHTTPStatus.NOT_FOUND);
    }
    const data: IConfirmationData = {
        login: req.params.login,
        activationCode: req.params.activationCode
    };
    await controller.confirmationCode(data, res);
});

router.put(Actions.RESEND, (async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.resendCode(req.body.email, res);
}));

export const code = router;
