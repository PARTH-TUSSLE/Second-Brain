import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { main, userModel } from "./db.js";

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chal hatt behen ki lodi")
})


app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  // zod validation, hash the password

  try { 

      const signedUpUser = await userModel.create({
        username: username,
        password: password,
      });  
        res.status(200).json({
          msg: "User signedUp successfully!",
          user: signedUpUser
        });
  } 
  catch (err) {
    res.status(411).json({
      msg: "User already exists!"
    })

  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  
try {
  const user = await userModel.findOne({
    username: username,
    password: password,
  });

  if (user) {

    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_TOKEN!);

    res.json({
      msg: "User signedIn successfully!",
      token: token,
      user: user,
    });
  } else {
    res.json({
      msg: "Invalid credentials!",
    });
  }
} catch (error) {
  res.status(500).json({ msg: "Server error", error });
}

});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

main()
  .then((res) => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server listening on port 3000!")
})

