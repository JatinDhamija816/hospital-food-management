import { Schema, model } from "mongoose";

const DietChartSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    morning: {
      ingredients: {
        type: String,
        trim: true,
      },
      instructions: {
        type: String,
        trim: true,
      },
    },
    evening: {
      ingredients: {
        type: String,
        trim: true,
      },
      instructions: {
        type: String,
        trim: true,
      },
    },
    night: {
      ingredients: {
        type: String,
        trim: true,
      },
      instructions: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const DietChart = model("DietChart", DietChartSchema);

export default DietChart;
