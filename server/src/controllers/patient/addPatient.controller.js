import DietChart from "../../models/dietChart.model.js";
import Patient from "../../models/patient.model.js";

const addPatient = async (req, res) => {
  try {
    const { patient, dietChart } = req.body.patientData;

    const {
      name,
      disease,
      allergies,
      room,
      bed,
      floor,
      age,
      contact,
      emergencyContact,
    } = patient;

    if (
      !name ||
      !disease ||
      !room ||
      !bed ||
      !floor ||
      !age ||
      !contact ||
      !emergencyContact
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required patient fields",
      });
    }

    if (contact.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Contact number must be 10 digit",
      });
    }

    if (emergencyContact.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Emergency Contact number must be 10 digit",
      });
    }

    const { morning, lunch, night } = dietChart || {};

    const formattedDietChart = {};
    if (morning && morning.ingredients?.trim()) {
      formattedDietChart.morning = morning;
    }
    if (lunch && lunch.ingredients?.trim()) {
      formattedDietChart.lunch = lunch;
    }
    if (night && night.ingredients?.trim()) {
      formattedDietChart.night = night;
    }

    const newPatient = new Patient({
      name,
      disease,
      allergies,
      room,
      bed,
      floor,
      age,
      contact,
      emergencyContact,
    });

    const savedPatient = await newPatient.save();

    const newDietChart = new DietChart({
      patientId: savedPatient._id,
      ...formattedDietChart,
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

export default addPatient;
