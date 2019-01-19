import { Schema } from "mongoose";

export const CategorySchema = new Schema({
    link: {
        type: Schema.Types.String,
        isRequired: true
    },
    title: {
        type: Schema.Types.String,
        isRequired: true
    },
});
