import express, { Express, Request, Response } from "express";

const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send({ message: "Working! 😁" });
})

app.listen(3000, () => {
    console.log("Listening server in port 3000 🚀");
});