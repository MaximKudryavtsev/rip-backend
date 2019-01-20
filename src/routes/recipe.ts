import * as express from "express";
import { CategoryController } from "../controller/CategoryController";
import { EHTTPStatus } from "../config/";
import { Response, Request } from "express";
import { RecipeController } from "../controller/RecipeController";

const router = express.Router();
const controller = new RecipeController();

enum Actions {
    CREATE = "/create"
}

router.post(Actions.CREATE, (async (request: Request, response: Response) => {
    if (!request.body) {
        return response.status(EHTTPStatus.NOT_FOUND);
    }
    await controller.addRecipe(request, response);
}));

export const recipe = router;
