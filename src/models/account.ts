import { Schema, model, models } from "mongoose";

const AccountSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    verify: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "access_account",
  },
);

const Account = models.Account || model("Account", AccountSchema);

export default Account;
