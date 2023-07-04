import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("departments");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("departments");
  let query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result) {
    res.send("Not Found").status(404);
  } else {
    res.send(result).status(200);
  }
});

router.post("/", async (req, res) => {
  let newDocument = {
    title: req.body.title,
  };

  let collection = await db.collection("departments");
  const result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      title: req.body.title,
    },
  };

  let collection = await db.collection("departments");
  const result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

router.delete("/", async (req, res) => {
  var ids = [];
  req.body.forEach((element) => {
    ids.push(new ObjectId(element));
  });

  const query = { _id: { $in: ids } };
  try {
    let collection = await db.collection("departments");
    const result = await collection.deleteMany(query);
    res.send(result).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

export default router;
