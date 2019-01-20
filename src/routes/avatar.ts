import * as express from "express";
const router = express.Router();
import { Request, Response } from "express";
import { EHTTPStatus } from "../config/";
import { UserController } from "../controller";

const controller = new UserController();

enum Actions {
    UPLOAD = "/upload",
    DELETE = "/delete",
    CHANGE = "/change"
}

router.post(Actions.UPLOAD, (async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.uploadAvatar(req, res);
}));

router.put(Actions.DELETE, (async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(EHTTPStatus.NOT_FOUND);
    }
    const  token = req.body.token;
    await controller.deleteAvatar(token, res);
}));

export const avatar = router;
