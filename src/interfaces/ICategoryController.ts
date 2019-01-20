import { Response } from "express";

export interface ICategoryController {
    getCategories(response: Response): Promise<void>;

}
