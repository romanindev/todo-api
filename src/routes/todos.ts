import { Router } from "express";
import { Db, ObjectId } from "mongodb";

export function createTodoRouter(db: Db) {
  const router = Router();
  const collection = db.collection("todos");

  router.get("/", async (_req, res) => {
    const todos = await collection.find().sort({ _id: -1 }).toArray();
    res.json(todos);
  });

  router.post("/", async (req, res) => {
    const title = String(req.body?.title || "").trim();

    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const result = await collection.insertOne({
      title,
      completed: false,
      createdAt: new Date()
    });

    const todo = await collection.findOne({ _id: result.insertedId });
    res.status(201).json(todo);
  });

  router.patch("/:id/toggle", async (req, res) => {
    const id = req.params.id;

    let objectId: ObjectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      return res.status(400).json({ message: "invalid id" });
    }

    const existing = await collection.findOne({ _id: objectId });

    if (!existing) {
      return res.status(404).json({ message: "todo not found" });
    }

    await collection.updateOne(
      { _id: objectId },
      { $set: { completed: !existing.completed } }
    );

    const updated = await collection.findOne({ _id: objectId });
    res.json(updated);
  });

  return router;
}
