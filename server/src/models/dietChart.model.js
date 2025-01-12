import { Schema, model } from "mongoose";

const DietChartSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    meals: [
      {
        type: {
          type: String,
          enum: ["Morning", "Evening", "Night"],
        },
        ingredients: {
          type: [String],
        },
        instructions: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const DietChart = model("DietChart", DietChartSchema);

export default DietChart;
