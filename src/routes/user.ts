import * as express from "express";
import { EHTTPStatus } from "../config/";
import { Response, Request } from "express";
import { UserController } from "../controller";

const router = express.Router();
const controller = new UserController();

enum Actions {
    ADD = "/add"
}

router.post(Actions.ADD, ((request: Request, response: Response) => {
    if (!request.body) {
        return response.status(EHTTPStatus.NOT_FOUND);
    }
    controller.registerUser(request.body, response);
}));

export const user = router;
