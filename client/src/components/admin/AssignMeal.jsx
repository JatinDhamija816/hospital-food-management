import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PantryStaffContext } from "../../contexts/PantryStaffContext";
import { PatientsContext } from "../../contexts/PatientsContext";
import { RidersContext } from "../../contexts/RidersContext";
import { assignMealToStaff } from "../../utils/adminApi";

const AssignMeal = () => {
  const navigate = useNavigate();
  const { pantryStaff } = useContext(PantryStaffContext);
  const { patients } = useContext(PatientsContext);
  const { riders } = useContext(RidersContext);

  const [selectedPantryStaff, setSelectedPantryStaff] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedRider, setSelectedRider] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPantryStaff || !selectedMeal || !selectedRider) {
      alert("Please select pantry staff, a rider, and a patient meal.");
      return;
    }

    const { patientId, mealType } = JSON.parse(selectedMeal);
    setIsLoading(true);

    try {
      const res = await assignMealToStaff({
        pantryStaffId: selectedPantryStaff,
        riderId: selectedRider,
        patientId,
        mealType,
      });

      if (res.success) {
        alert("Meal assigned successfully!");
        setSelectedPantryStaff("");
        setSelectedMeal("");
        setSelectedRider("");
        navigate("/");
      } else {
        alert(res.message || "Error assigning meal.");
      }
    } catch (error) {
      console.error("Error assigning meal:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 py-6 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Assign Meal to Pantry Staff
        </h2>

        <div className="mb-4">
          <label htmlFor="pantryStaff" className="label">
            Select Pantry Staff:
          </label>
          <select
            name="pantryStaff"
            className="input"
            value={selectedPantryStaff}
            onChange={(e) => setSelectedPantryStaff(e.target.value)}
          >
            <option value="">-- Select Pantry Staff --</option>
            {pantryStaff
              .filter((staff) => staff.status === "Free")
              .map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name} ({staff.status})
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="rider" className="label">
            Select Rider:
          </label>
          <select
            name="rider"
            className="input"
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
          >
            <option value="">-- Select Rider --</option>
            {riders
              .filter((rider) => rider.status === "Free")
              .map((rider) => (
                <option key={rider._id} value={rider._id}>
                  {rider.name} ({rider.status})
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="patient" className="label">
            Select Patient Meal:
          </label>
          <select
            name="patient"
            className="input"
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
          >
            <option value="">-- Select Patient Meal --</option>
            {patients.map((patient) =>
              patient.dietChart.meals.map((meal) => (
                <option
                  key={`${patient._id}-${meal.type}`}
                  value={JSON.stringify({
                    patientId: patient._id,
                    mealType: meal.type,
                  })}
                >
                  {`${patient.name}, ${patient.disease}, ${meal.type}`}
                </option>
              ))
            )}
          </select>
        </div>

        <button type="submit" className="formSubmitBtn" disabled={isLoading}>
          {isLoading ? "Assigning..." : "Assign Meal"}
        </button>
      </form>
    </div>
  );
};

export default AssignMeal;
