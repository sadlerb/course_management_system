import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("courses");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});
// Get course by role
router.get("/department/:department/role/:role", async (req, res) => {
  const role = req.params.role;
  const department = req.params.department;
  let collection = await db.collection("courses");
  let results = [];
  if (role === "admin") {
    results = await collection.find({}).toArray();
  } else {
    results = await collection.find({ department: department }).toArray();
  }
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
    externalLink: req.body.externalLink,
    tags: req.body.tags,
    department: req.body.department,
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
      externalLink: req.body.externalLink,
      tags: req.body.tags,
      rating: req.body.rating,
      comments: req.body.comments,
      department: req.body.department,
    },
  };

  let collection = await db.collection("courses");
  const result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

router.patch("/:id/comment", async (req, res) => {
  // Add new comment to comments array in document
  const query = { _id: new ObjectId(req.params.id) };
  req.body.user_id = new ObjectId(req.body.user_id);
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
router.patch("/:id/comment/:userId", async (req, res) => {
  // update existing comment with new data
  const courseID = new ObjectId(req.params.id);
  const userID = new ObjectId(req.params.userId) ;

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
    const update = await collection.updateOne(
      { _id: courseID, "comments.user_id": userID },
      { $set: { "comments.$.time_taken": req.body.time_taken,"comments.$.user_rating":req.body.user_rating,"comments.$.user_comment":req.body.user_comment } }
      );
      
    const result = await collection.updateOne({_id:courseID}, updateCourseRatings);
    res.send(result).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

router.delete("/", async (req, res) => {
  var ids = [];

  req.body.forEach((element) => {
    ids.push(new ObjectId(element));
  });

  const query = { _id: { $in: ids } };
  try {
    let collection = await db.collection("courses");
    const result = await collection.deleteMany(query);
    res.send(result).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

export default router;
