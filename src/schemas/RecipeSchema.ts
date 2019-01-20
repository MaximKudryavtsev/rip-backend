import { Schema } from "mongoose";

export const RecipeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        isRequired: true
    },
    name: {
        type: Schema.Types.String,
        isRequired: true
    },
    description: {
        type: Schema.Types.String,
        isRequired: true
    },
    logo: {
        type: Schema.Types.String,
        isRequired: true
    },
    ingredients: {
        type: Schema.Types.String,
        isRequired: true
    },
});
