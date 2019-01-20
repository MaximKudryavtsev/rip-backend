import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
import { DataBase } from "./service";
import { Redis } from "./service/Redis";
import { EApiPaths, mediaPath } from "./config";
import { category, user, email, login, code, password } from "./routes";
import { avatar } from "./routes/avatar";

const app = express();
const server = http.createServer(app);
const jsonParser = bodyParser.urlencoded({extended: false});
const database = new DataBase();
const redis = new Redis();

database.connect();
redis.connect();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, RESEND");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    next();
});

dotenv.config({path: ".env"});
app.use(express.static(mediaPath));

app.use(jsonParser);
app.use(EApiPaths.CATEGORY, category);
app.use(EApiPaths.USER, user);
app.use(EApiPaths.EMAIL, email);
app.use(EApiPaths.LOGIN, login);
app.use(EApiPaths.CODE, code);
app.use(EApiPaths.PASSWORD, password);
app.use(EApiPaths.AVATAR, avatar);

server.listen(process.env.PORT, () => {
    console.log("Server connected on", process.env.PORT);
});
