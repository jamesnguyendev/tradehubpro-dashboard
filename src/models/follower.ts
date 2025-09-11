import { model, models, Schema } from "mongoose";

const FollowerSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    masterId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "follower",
  },
);

const Follower = models.Follower || model("Follower", FollowerSchema);

export default Follower;
