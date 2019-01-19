import * as express from "express";
import { CategoryController } from "../controller/CategoryController";
import { EHTTPStatus } from "../config/";
import { Response, Request } from "express";

const router = express.Router();
const controller = new CategoryController();

enum Actions {
    GET = "/get"
}

router.get(Actions.GET, ((request: Request, response: Response) => {
    if (!request.body) {
        return response.status(EHTTPStatus.NOT_FOUND);
    }
    controller.getCategories(response);
}));

export const category = router;
