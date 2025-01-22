import { useContext } from "react";
import { deletePatient, getIndividualPatient } from "../../utils/patientApi";
import { useNavigate } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";

const AllPatients = () => {
  const navigate = useNavigate();
  const { setIndividualPatient, patients, loading, setRefreshPatient } =
    useContext(PatientsContext);

  const handleEditPatient = async (patientId) => {
    try {
      const res = await getIndividualPatient(patientId);
      if (res.success) {
        setIndividualPatient(res.patient);
        await setRefreshPatient(true);
        navigate("/edit-patient");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleEditDietChart = async (patientId) => {
    try {
      const res = await getIndividualPatient(patientId);
      if (res.success) {
        setIndividualPatient(res.patient);
        await setRefreshPatient(true);
        navigate("/edit-diet-chart");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleDelete = async (patientId) => {
    try {
      const res = await deletePatient(patientId);
      if (res.success) {
        await setRefreshPatient(true);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center mt-10">Loading...</div>
    );

  return (
    <div className="w-full justify-center mt-5">
      {patients.map((patient) => (
        <div key={patient._id} className="shadow-md rounded-lg p-5 m-4">
          <h2 className="text-xl font-bold">{patient.name}</h2>
          <p className="">Contact: {patient.contact}</p>
          <p className="">Age: {patient.age}</p>
          <p className="">Disease: {patient.disease}</p>
          <p className="">Allergies: {patient.allergies}</p>

          <div className="mt-3">
            <h3 className="font-semibold">Meals:</h3>
            <div className="flex space-x-2">
              {patient.dietChart?.meals?.map((meal) => (
                <div key={meal._id} className="p-2 border rounded-lg shadow">
                  <h4 className="font-semibold capitalize">{meal.type}</h4>
                  <p>Ingredients: {meal.ingredients.join(", ")}</p>
                  <p>Instructions: {meal.instructions}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEditPatient(patient._id)}
            >
              Edit Patient
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEditDietChart(patient._id)}
            >
              Edit Diet Chart
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(patient._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPatients;
