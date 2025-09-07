import mongoose, { Schema, Model } from "mongoose";
import "dotenv/config";

export const main = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables");
  }
  await mongoose.connect(process.env.MONGO_URL);
};

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model("User", UserSchema);

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export const TagModel = mongoose.model("Tag", TagSchema);

const ContentSchema = new Schema({
  title: { type: String },
  link: { type: String },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const LinkSchema = new Schema({
  hash: { type: String },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
});

export const LinkModel = mongoose.model("Link", LinkSchema);

export const ContentModel = mongoose.model("Content", ContentSchema);
