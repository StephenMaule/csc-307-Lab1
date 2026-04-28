import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userServices from "./services/user-service.js";

const { MONGO_CONNECTION_STRING } = process.env;

console.log("MONGO STRING:", MONGO_CONNECTION_STRING);

mongoose.set("debug", true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING + "users")
  .catch(err => console.log("MongoDB connection failed:", err));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  try {
    const user = await userServices.addUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const { name, job } = req.query;
    const users = await userServices.getUsers(name, job);
    res.json({ users_list: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:id", (req, res) => {
  userServices.findUserById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).send("Not found");
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

app.delete("/users/:id", (req, res) => {
  deleteUser(req.params.id)
    .then(() => {
      res.status(200).send("Deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting user");
    });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

