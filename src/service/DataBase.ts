import * as mongoose from "mongoose";
import { Connection, Model, Schema, Document } from "mongoose";
import { DBConfig } from "../config";

export class DataBase {
    connect(): void {
        this.getConnection().once("open", () => {
           console.log("Database connected");
        });
    }

    getModel(name: string, schema: Schema, collection?: string): Model<Document> {
        return this.getConnection().model(name, schema, collection);
    }

    private getConnection(): Connection {
        return mongoose.createConnection(DBConfig.URL, {useNewUrlParser: true});
    }

}
