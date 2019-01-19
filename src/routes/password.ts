import * as express from "express";
export const router = express.Router();
import { Request } from "express";
import { Response } from "express";
import { EHTTPStatus } from "../config/EHTTPStatus";
import { UserController } from "../controller";

const controller = new UserController();

enum Actions {
    CHANGE = "/change",
    FORGOT = "/forgot"
}

router.put(Actions.CHANGE, (async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(EHTTPStatus.NOT_FOUND);
    }
    const data = req.body;
    await controller.changePassword(data, res);
}));

router.put(Actions.FORGOT, (async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(EHTTPStatus.NOT_FOUND);
    }
    const email = req.body.email;
    await controller.forgotPassword(email, res);
}));

export const password = router;
