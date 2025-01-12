import { model } from "mongoose";
import { Schema } from "mongoose";

const AssignMealSchema = new Schema(
  {
    pantryStaffId: {
      type: Schema.Types.ObjectId,
      ref: "PantryStaff",
      required: true,
    },
    riderId: {
      type: Schema.Types.ObjectId,
      ref: "Rider",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    mealType: {
      type: String,
      enum: ["Morning", "Evening", "Night"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Cooked", "Picked", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AssignMeal = model("AssignMeal", AssignMealSchema);

export default AssignMeal;
