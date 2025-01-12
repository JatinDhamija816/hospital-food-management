import { Schema, model } from "mongoose";

const PantryStaffSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
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
      mealType: {
        type: String,
        enum: ["Morning", "Evening", "Night"],
      },
      mealDetails: {
        ingredients: {
          type: [String],
        },
        instructions: {
          type: String,
        },
      },
      patientDetails: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
      preparationStatus: {
        type: String,
        enum: ["Pending", "In-Progress", "Complete"],
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

const PantryStaff = model("PantryStaff", PantryStaffSchema);

export default PantryStaff;
