import mongoose, { Schema, Model } from "mongoose";
import "dotenv/config";


export const main = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables");
  }
  await mongoose.connect(process.env.MONGO_URL);
}

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true },
  password:{ type: String, required: true }
})

export const userModel = mongoose.model("User", UserSchema);

const ContentSchema = new Schema({
  title: { type: String },
  link: { type: String },
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User"},
});

export const ContentModel = mongoose.model("Content", ContentSchema);