import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { authRoute } from "./modules/auth/auth.route";
const app = express();

const corsOption = {
  origin: [],
  optionsSuccessStatus: 200,
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
