import { model, models, Schema } from "mongoose";

const MasterSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    server: { type: String, required: true },
    period: { type: Number, required: true },
    percent: { type: Number, required: true },
    balance: { type: Number, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "master",
  },
);

const Master = models.Master || model("Master", MasterSchema);

export default Master;
