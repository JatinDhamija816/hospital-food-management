import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDietChart } from "../../utils/patientApi";
import { PatientsContext } from "../../contexts/PatientsContext";

const EditDietChart = () => {
  const { individualPatient, setIndividualPatient, setRefreshPatient } =
    useContext(PatientsContext);
  const navigate = useNavigate();

  const [dietChart, setDietChart] = useState([]);

  useEffect(() => {
    if (individualPatient?.dietChart?.meals) {
      setDietChart(individualPatient.dietChart.meals);
    }
  }, [individualPatient]);

  const handleDietChartChange = (index, field, value) => {
    const updatedChart = [...dietChart];
    updatedChart[index][field] = value;
    setDietChart(updatedChart);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateDietChart(individualPatient._id, {
        meals: dietChart,
      });
      if (res.success) {
        alert("Diet Chart updated successfully!");
        navigate("/all-patients");
      } else {
        alert(res.response.data.message);
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    } finally {
      setIndividualPatient({});
      setRefreshPatient(true);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg px-8 py-6 shadow-lg rounded-lg bg-white"
      >
        <h3 className="text-2xl font-bold text-center mb-6">Edit Diet Chart</h3>

        {dietChart.map((meal, index) => (
          <div key={meal._id} className="mb-6 border-b pb-4">
            <h4 className="text-lg font-semibold mb-2">{meal.type} Meal</h4>

            <div className="mb-4">
              <label htmlFor={`ingredients-${index}`} className="label">
                Ingredients
              </label>
              <input
                type="text"
                id={`ingredients-${index}`}
                value={meal.ingredients.join(", ")}
                onChange={(e) =>
                  handleDietChartChange(
                    index,
                    "ingredients",
                    e.target.value.split(",")
                  )
                }
                className="input"
              />
            </div>

            <div className="mb-4">
              <label htmlFor={`instructions-${index}`} className="label">
                Instructions
              </label>
              <input
                type="text"
                id={`instructions-${index}`}
                value={meal.instructions}
                onChange={(e) =>
                  handleDietChartChange(index, "instructions", e.target.value)
                }
                className="input"
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Diet Chart
        </button>
      </form>
    </div>
  );
};

export default EditDietChart;
