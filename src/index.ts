import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";

const app = express();
const server = http.createServer(app);
const jsonParser = bodyParser.urlencoded({extended: false});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, RESEND");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    next();
});

dotenv.config({path: ".env"});
app.use(jsonParser);

server.listen(process.env.PORT, () => {
    console.log("Server connected on", process.env.PORT);
});
