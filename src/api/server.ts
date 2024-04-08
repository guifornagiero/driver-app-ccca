import express, { Express, Request, Response } from "express";
import { Config, getConfig } from "./config/config";
import router from "./routes/routes";

const app: Express = express();
app.use(express.json());

const configuration: Config = getConfig();

app.use(router);

app.get("/", (req: Request, res: Response) => {
    res.send({ message: "Working! 😁" });
});

app.listen(configuration.port, () => {
    console.log(`Listening server in port ${configuration.port} 🚀`);
});