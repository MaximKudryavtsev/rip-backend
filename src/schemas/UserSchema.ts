import { Schema } from "mongoose";

export const UserSchema = new Schema({
    login: {
        type: Schema.Types.String,
        isRequired: true
    },
    email: {
        type: Schema.Types.String,
        isRequired: true
    },
    password: {
        type: Schema.Types.String,
        isRequired: true
    },
    activationCode: {
        type: Schema.Types.String,
        isRequired: true
    },
    created: {
        type: Schema.Types.String,
        isRequired: true
    },
    avatar: {
        type: Schema.Types.String,
        isRequired: true
    },
}, {
    versionKey: false
});
