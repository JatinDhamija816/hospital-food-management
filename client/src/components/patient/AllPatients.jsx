import { useContext } from "react";
import { deletePatient, getIndividualPatient } from "../../utils/patientApi";
import { useNavigate } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";

const AllPatients = () => {
  const navigate = useNavigate();
  const { setIndividualPatient, patients, loading, setRefreshPatient } =
    useContext(PatientsContext);

  const patientFields = ["contact", "age", "disease"];
  const mealTimes = ["evening", "morning", "night"];

  const handleEditPatient = async (patientId) => {
    try {
      const res = await getIndividualPatient(patientId);
      if (res.success) {
        setIndividualPatient(res.patient);
        await setRefreshPatient(true);
        navigate("/edit-patient");
      }
    } catch (error) {
      console.error("Error edit patients:", error);
    }
  };

  const handleEditDietChart = async (patientId) => {
    try {
      const res = await getIndividualPatient(patientId);
      if (res.success) {
        setIndividualPatient(res.patient.dietChart);
        await setRefreshPatient(true);
        navigate("/edit-diet-chart");
      }
    } catch (error) {
      console.error("Error edit diet chart:", error);
    }
  };

  const handleDelete = async (patientId) => {
    try {
      const res = await deletePatient(patientId);
      if (res.success) {
        await setRefreshPatient(true);
      }
    } catch (error) {
      console.error("Error delete patients:", error);
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
          <h2 className="text-xl font-bold capitalize">{patient.name}</h2>

          {Object.entries(patient)
            .filter((key) => patientFields.includes(key[0]))
            .map((field) => (
              <div key={field}>
                <p>
                  <span className="capitalize font-medium">{field[0]}: </span>
                  {field[1]}
                </p>
              </div>
            ))}

          {patient.allergies && (
            <p>
              <span className="capitalize font-medium">Allergies: </span>{" "}
              {patient.allergies}
            </p>
          )}

          <div className="mt-3">
            {(patient?.dietChart?.morning ||
              patient?.dietChart?.lunch ||
              patient?.dietChart?.dinner) && (
              <h3 className="font-bold mb-2">Meals:</h3>
            )}
            <div className="space-y-3 md:space-y-0 md:flex md:space-x-3 ">
              {Object.keys(patient.dietChart)
                .filter((mealTime) => mealTimes.includes(mealTime))
                .map((mealTime) => (
                  <div key={mealTime} className="flex space-x-2">
                    <div className="p-2 border rounded-lg shadow">
                      <h4 className="font-semibold capitalize text-lg">
                        {mealTime}
                      </h4>
                      {patient.dietChart[mealTime].ingredients && (
                        <p>
                          <span className="font-medium">Ingredients:</span>{" "}
                          {patient.dietChart[mealTime].ingredients}
                        </p>
                      )}
                      {patient.dietChart[mealTime].instructions && (
                        <p>
                          <span className="font-medium">Instructions: </span>
                          {patient.dietChart[mealTime].instructions}
                        </p>
                      )}
                    </div>
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
