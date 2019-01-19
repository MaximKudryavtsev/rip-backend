import * as express from "express";
import { EHTTPStatus } from "../config/";
import { Response, Request } from "express";
import { UserController } from "../controller";

const router = express.Router();
const controller = new UserController();

enum Actions {
    ADD = "/add",
    AUTH = "/auth",
    GET = "/get"
}

router.post(Actions.ADD, (async (request: Request, response: Response) => {
    if (!request.body) {
        return response.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.registerUser(request.body, response);
}));

router.post(Actions.AUTH, (async (request: Request, response: Response) => {
    if (!request.body) {
        return response.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.login(request.body, response);
}));

router.post(Actions.GET, (async (request: Request, response: Response) => {
    if (!request.body) {
        return response.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.getUser(request.body.token, response);
}));

export const user = router;
