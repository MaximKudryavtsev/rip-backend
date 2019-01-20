import { Schema } from "mongoose";

export const IngredientsSchema = new Schema({
    recipeId: {
        type: Schema.Types.ObjectId,
        isRequired: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        isRequired: true
    },
    ingredients: [{
        name: {
            type: Schema.Types.String,
            isRequired: true
        },
        weight: {
            type: Schema.Types.String,
            isRequired: true
        }
    }],
}, {
    versionKey: false
});
