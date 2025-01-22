import { Schema, model } from "mongoose";

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    disease: {
      type: String,
      required: true,
      trim: true,
    },
    allergies: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    room: {
      type: Number,
      required: true,
    },
    bed: {
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },

    contact: {
      type: Number,
      required: true,
    },
    emergencyContact: {
      type: Number,
      required: true,
    },
    dietChart: {
      type: Schema.Types.ObjectId,
      ref: "DietChart",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Patient = model("Patient", patientSchema);

export default Patient;
