import express from "express";
import { Db } from "mongodb";
import { createTodoRouter } from "./routes/todos";

export function createApp(db: Db) {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/todos", createTodoRouter(db));

  return app;
}
