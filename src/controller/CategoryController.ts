import { DataBase, EModels } from "../service";
import { ERedisKeys, Redis } from "../service/Redis";
import { CategorySchema } from "../schemas";
import { isEmpty, isNil } from "lodash";
import { Response } from "express";
import { Controller } from "./Controller";

export class CategoryController extends Controller {
    private readonly database = new DataBase();
    private readonly redis = new Redis();
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
