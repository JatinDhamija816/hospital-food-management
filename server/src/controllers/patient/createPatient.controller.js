import DietChart from "../../models/dietChart.model.js";
import Patient from "../../models/patient.model.js";

export const createPatientWithDietChart = async (req, res) => {
  try {
    const { patientData } = req.body;

    if (!patientData) {
      return res.status(400).json({
        success: false,
        message: "Patient details are required",
      });
    }

    const {
      name,
      disease,
      allergies,
      room,
      bed,
      floor,
      age,
      gender,
      contact,
      emergencyContact,
      dietChart,
    } = patientData;

    if (
      !name ||
      !disease ||
      !room ||
      !bed ||
      !floor ||
      !age ||
      !gender ||
      !contact ||
      !emergencyContact
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required patient fields",
      });
    }

    if (!dietChart) {
      return res.status(400).json({
        success: false,
        message: "Diet chart is required",
      });
    }

    const { morning, evening, night } = dietChart;

    const meals = [];
    if (morning && morning.ingredients && morning.ingredients.trim()) {
      meals.push({
        type: "Morning",
        ingredients: morning.ingredients,
        instructions: morning.instructions || "",
      });
    }
    if (evening && evening.ingredients && evening.ingredients.trim()) {
      meals.push({
        type: "Evening",
        ingredients: evening.ingredients,
        instructions: evening.instructions || "",
      });
    }
    if (night && night.ingredients && night.ingredients.trim()) {
      meals.push({
        type: "Night",
        ingredients: night.ingredients,
        instructions: night.instructions || "",
      });
    }

    if (meals.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one valid meal must be provided in the diet chart",
      });
    }

    const newPatient = new Patient({
      name,
      disease,
      allergies,
      room,
      bed,
      floor,
      age,
      gender,
      contact,
      emergencyContact,
    });

    const savedPatient = await newPatient.save();

    const newDietChart = new DietChart({
      patientId: savedPatient._id,
      meals,
    });

    const savedDietChart = await newDietChart.save();

    savedPatient.dietChart = savedDietChart._id;
    await savedPatient.save();

    return res.status(201).json({
      success: true,
      message: "Patient and diet chart created successfully",
      patient: savedPatient,
      dietChart: savedDietChart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
