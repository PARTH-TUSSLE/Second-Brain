import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { ContentModel, main, userModel } from "./db.js";
import { UserMiddleware } from "./middleware.js";

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

app.post("/api/v1/content", UserMiddleware, async (req, res) => {

const { link, title } = req.body;

try {
  const Content = await ContentModel.create({
    title,
    link,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.json({
    msg: "Content added successfully!",
    Content
  })

} catch (error) {
  res.status(500).json({
    msg: "Some error occured!",
  });
}

});

app.get("/api/v1/content",UserMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;

  try {
      const Content = await ContentModel.find({
        userId: userId,
      }).populate("userId", "username")

      res.status(200).json({
        Content
      })

  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong!"
    })
  }

  
});

app.delete("/api/v1/content",UserMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  try {
    const deletedContent = await ContentModel.deleteMany({
      _id: contentId,
      //@ts-ignore
      userId: req.userId,
    });

    res.json({
      msg: "Content deleted successfully! ",
      deletedContent
    })

  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong!"
    })
  }
});

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

