import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDietChart } from "../../utils/patientApi";
import { PatientsContext } from "../../contexts/PatientsContext";

const EditDietChart = () => {
  const {
    individualPatient,
    setIndividualPatient,
    setRefreshPatient,
    loading,
    setLoading,
  } = useContext(PatientsContext);
  const navigate = useNavigate();

  const [dietChart, setDietChart] = useState({
    morning: { ingredients: "", instructions: "" },
    evening: { ingredients: "", instructions: "" },
    night: { ingredients: "", instructions: "" },
  });

  const mealTimes = ["morning", "evening", "night"];

  useEffect(() => {
    if (individualPatient) {
      const { morning, evening, night } = individualPatient;
      setDietChart({
        morning: { ...morning },
        evening: { ...evening },
        night: { ...night },
      });
    }
  }, [individualPatient, setDietChart]);

  const handleDietChartChange = (e) => {
    const { name, value } = e.target;
    const [mealTime, field] = name.split(".");
    setDietChart((prevData) => ({
      ...prevData,
      [mealTime]: { ...prevData[mealTime], [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateDietChart(individualPatient.patientId, dietChart);
      if (res.success) {
        alert("Diet Chart updated successfully!");
        navigate("/all-patients");
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error(`Error While Edit Diet Chart `, error);
    } finally {
      setIndividualPatient({});
      setRefreshPatient(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg px-8 py-6 shadow-lg rounded-lg bg-white"
      >
        <h3 className="text-2xl font-bold text-center mb-6">Edit Diet Chart</h3>
        {mealTimes.map((mealTime) => (
          <div key={mealTime} className="mb-6 border-b pb-4">
            <h4 className="text-lg font-semibold mb-2 capitalize">
              {mealTime}
            </h4>

            <div className="mb-4">
              <label htmlFor={`${mealTime}.ingredients`} className="label">
                Ingredients
              </label>
              <input
                name={`${mealTime}.ingredients`}
                type="text"
                id={`${mealTime}.ingredients`}
                value={dietChart[mealTime].ingredients}
                onChange={handleDietChartChange}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label htmlFor={`${mealTime}.instructions`} className="label">
                Instructions
              </label>
              <input
                name={`${mealTime}.instructions`}
                type="text"
                id={`${mealTime}.instructions`}
                value={dietChart[mealTime].instructions}
                onChange={handleDietChartChange}
                className="input"
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          {loading ? "Updating" : "Update Diet Chart"}
        </button>
      </form>
    </div>
  );
};

export default EditDietChart;
