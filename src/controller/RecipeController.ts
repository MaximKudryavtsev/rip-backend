import { EModels } from "../service";
import { CategorySchema } from "../schemas";
import { Request, Response } from "express";
import { Controller } from "./Controller";

export class RecipeController extends Controller {
    private readonly categoryModel = this.database.getModel(EModels.CATEGORIES, CategorySchema, EModels.CATEGORIES);

    async addRecipe(request: Request, response: Response): Promise<void> {
        this.fileService.addRecipe(request, response);
    }
}
