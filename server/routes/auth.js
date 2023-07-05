import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
  let collection = await db.collection("users");
  const submitted_username = req.body.username;
  const submitted_password = req.body.password;

  try {
    const user = await collection.findOne({ username: submitted_username });

    if (user) {
      bcrypt.compare(
        submitted_password,
        user.hashed_password,
        (err, result) => {
          if (result) {
            res.send({ status: true,"user":user }).status(200);
            return;
          } else {
            res.send({ status: false });
          }
        }
      );
    }
  } catch (error) {
    res.send(error);
  }
});

export default router;
