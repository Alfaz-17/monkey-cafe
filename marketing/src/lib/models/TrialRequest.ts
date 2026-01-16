import mongoose, { Schema, model, models } from "mongoose";

const TrialRequestSchema = new Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "Restaurant name is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
    },
  },
  {
    timestamps: true,
  }
);

const TrialRequest = models.TrialRequest || model("TrialRequest", TrialRequestSchema);

export default TrialRequest;
