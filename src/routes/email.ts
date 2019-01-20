import * as express from "express";
const router = express.Router();
import { Request, Response } from "express";
import { EHTTPStatus } from "../config/";
import { UserController } from "../controller";

const controller = new UserController();

enum Actions {
    CHECK = "/check/:email/:flag",
    CHANGE = "/change"
}

router.get(Actions.CHECK, async (request: Request, response: Response) => {
    if (!request.params) {
        return response.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.checkEmailExist(request.params, response);
});

router.put(Actions.CHANGE, (async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.changeEmail(req.body, res);
}));

export const email = router;
