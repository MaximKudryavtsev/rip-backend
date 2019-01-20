import * as express from "express";
const router = express.Router();
import { Request, Response } from "express";
import { EHTTPStatus } from "../config/";
import { UserController } from "../controller";

const controller = new UserController();

enum Actions {
    CHECK = "/check/:login/:flag",
    CHANGE = "/change"
}

router.get(Actions.CHECK, async (request: Request, response: Response) => {
    if (!request.params) {
        return response.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.checkLoginExist(request.params, response);
});

router.put(Actions.CHANGE, (async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.changeLogin(req.body, res);
}));

export const login = router;
