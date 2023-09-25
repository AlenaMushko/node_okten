import express from "express";
import { Request, Response } from "express";

import { usersRouter } from "./users";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5005;

app.use("/", usersRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
