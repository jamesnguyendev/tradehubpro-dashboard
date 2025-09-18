import { model, models, Schema } from "mongoose";

const ProfitSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    masterId: { type: Number, required: true },
    profit: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "profit",
  },
);

const Master = models.Profit || model("Profit", ProfitSchema);

export default Master;
