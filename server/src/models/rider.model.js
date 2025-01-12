import { Schema, model } from "mongoose";

const RiderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contactInfo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    assignedTask: {
      patientDetails: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
      deliveryStatus: {
        type: String,
        enum: ["Pending", "Picked", "Delivered"],
        default: "Pending",
      },
    },
    status: {
      type: String,
      enum: ["Free", "Busy"],
      default: "Free",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Rider = model("Rider", RiderSchema);

export default Rider;
