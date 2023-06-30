import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("courses");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("courses");
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
    externalLink: req.body.link,
    tags: req.body.tags,
    rating: 0,
    comments: [],
  };
  let collection = await db.collection("courses");
  const result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

router.put("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      title: req.body.title,
      externalLink: req.body.link,
      tags: req.body.tags,
      rating: req.body.rating,
      comments: req.body.comments,
    },
  };

  let collection = await db.collection("courses");
  const result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

router.put("/:id/comment", async (req, res) => {
  // Add new comment to comments array in document
  const query = { _id: new ObjectId(req.params.id) };
  const pushUpdateToArray = {
    $push: {
      comments: req.body,
    },
  };
  //Update new average for course
  const updateCourseRatings = [
    {
      $set: {
        rating: {
          $avg: "$comments.user_rating",
        },
      },
    },
  ];

  try {
    let collection = await db.collection("courses");
    await collection.updateOne(query, pushUpdateToArray);

    const result = await collection.updateOne(query, updateCourseRatings);
    res.send(result).status(200);
  
  } catch (error) {
    res.send(error).status(400);
  }
});

router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  let collection = await db.collection("courses");
  const result = await collection.deleteOne(query);

  res.send(result).status(200);
});

router.get("/test/test", async (req, res) => {
  let collection = await db.collection("courses");
  const query = { _id: new ObjectId("649dd06079f072f78d9d05fc") };
  const updateRatingsQuery = [
    {
      $set: {
        rating: {
          $avg: "$comments.user_rating",
        },
      },
    },
  ];
  const result = collection.updateOne(query, updateRatingsQuery);

  res.send(result);
});

export default router;