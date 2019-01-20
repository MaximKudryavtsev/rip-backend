import { EModels } from "../service";
import { ERedisKeys } from "../service/Redis";
import { CategorySchema } from "../schemas";
import { isEmpty, isNil } from "lodash";
import { Response } from "express";
import { Controller } from "./Controller";
import { ICategoryController } from "../interfaces";

export class CategoryController extends Controller implements ICategoryController {
    private readonly categoryModel = this.database.getModel(EModels.CATEGORIES, CategorySchema, EModels.CATEGORIES);

    async getCategories(response: Response): Promise<void> {
        const cached = JSON.parse(await this.redis.get(ERedisKeys.CATEGORIES));
        if (isEmpty(cached) || isNil(cached)) {
            const categories = await this.categoryModel.find();
            await this.redis.set(ERedisKeys.CATEGORIES, categories);
            response.json(this.getSuccessMessage(categories));
        } else {
            response.json(this.getSuccessMessage(cached));
        }
    }
}
