import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ContentModel, LinkModel, main, userModel, } from "./db.js";
import { TagModel } from "./db.js";
import { UserMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import cors from "cors"; 

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Chal hatt behen ki lodi");
});

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
      user: signedUpUser,
    });
  } catch (err) {
    res.status(411).json({
      msg: "User already exists!",
    });
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
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_TOKEN!
      );

      res.json({
        msg: "User signedIn successfully!",
        token: token
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

app.post("/api/v1/content", UserMiddleware, async (req, res) => {
  const { link, title, tags } = req.body;

  try {
    let tagIds = [];
    if (Array.isArray(tags)) {
      for (const tagName of tags) {
        let tagDoc = await TagModel.findOne({ name: tagName });
        if (!tagDoc) {
          tagDoc = await TagModel.create({ name: tagName });
        }
        tagIds.push(tagDoc._id);
      }
    }

    const Content = await ContentModel.create({
      title,
      link,
      //@ts-ignore
      userId: req.userId,
      tags: tagIds,
    });

    res.json({
      msg: "Content added successfully!",
      Content,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Some error occured!",
    });
  }
});

app.get("/api/v1/content", UserMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;

  try {
    const Content = await ContentModel.find({
      userId: userId,
    }).populate("userId", "username");

    res.status(200).json({
      Content,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong!",
    });
  }
});

app.delete("/api/v1/content", UserMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  try {
    const deletedContent = await ContentModel.deleteMany({
      _id: contentId,
      //@ts-ignore
      userId: req.userId,
    });

    res.json({
      msg: "Content deleted successfully! ",
      deletedContent,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong!",
    });
  }
});

app.post("/api/v1/brain/share", UserMiddleware, async (req, res) => {
  const { share } = req.body;
  const hash = random(10);

  if (share) {
    const existingLink = await LinkModel.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.json({
        hash: existingLink.hash
      });
      return;
    }
    await LinkModel.create({
      hash: hash,
      //@ts-ignore
      userId: req.userId,
    });

    res.json({
      hash: `/share/${hash}`,
      msg: "Shared link updated!",
    });
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.userId,
    });

    res.json({
      msg: "Deleted the shared link!",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      msg: "Sorry, incorrect inputs!",
    });
    return;
  }

  //userId

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await userModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(404).json({
      msg: "User not found!",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

main()
  .then((res) => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
