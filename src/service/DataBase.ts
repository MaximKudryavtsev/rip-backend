import * as mongoose from "mongoose";
import { Connection, Model, Schema, Document } from "mongoose";
import { DBConfig } from "../config";

export class DataBase {
    getConnection(): Connection {
        return mongoose.createConnection(DBConfig.URL, {useNewUrlParser: true});
    }

    getModel(name: string, schema: Schema, collection?: string): Model<Document> {
        return this.getConnection().model(name, schema, collection);
    }

}
