import { useEffect, useState } from "react";
import { mealStatusUpdate, pantryStaffDashboard } from "../../utils/pantryApi";

const PantryStaffDashboard = () => {
  const [pantryStaff, setPantryStaff] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await pantryStaffDashboard();
      if (res.success) {
        setPantryStaff(res.data);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const res = await mealStatusUpdate();
      if (res.success) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-medium">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Pantry Staff Dashboard
      </h2>

      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Patient Details</h3>
        <p className=" ">
          <strong>Name:</strong> {pantryStaff.patientDetails?.name}
        </p>
        <p className=" ">
          <strong>Age:</strong> {pantryStaff.patientDetails?.age}
        </p>
        <p className=" ">
          <strong>Disease:</strong> {pantryStaff.patientDetails?.disease}
        </p>
        <p className=" ">
          <strong>Room:</strong> {pantryStaff.patientDetails?.room}
        </p>
        <p className=" ">
          <strong>Bed:</strong> {pantryStaff.patientDetails?.bed}
        </p>
        <p className=" ">
          <strong>Floor:</strong> {pantryStaff.patientDetails?.floor}
        </p>
        <p className=" ">
          <strong>Contact:</strong> {pantryStaff.patientDetails?.contact}
        </p>
      </div>

      <div className="p-4 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Meal Details</h3>
        <p className=" ">
          <strong>Meal Type:</strong> {pantryStaff.mealDetails?.mealType}
        </p>
        <p className=" ">
          <strong>Ingredients:</strong>{" "}
          {pantryStaff.mealDetails?.ingredients?.join(", ")}
        </p>
        <p className=" ">
          <strong>Instructions:</strong> {pantryStaff.mealDetails?.instructions}
        </p>
        <p className=" ">
          <strong>Status:</strong> {pantryStaff.status}
        </p>

        <button
          className={`mt-4 px-4 py-2 rounded-lg text-white font-medium ${
            pantryStaff.status === "Pending"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : pantryStaff.status === "In-Progress"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 cursor-not-allowed"
          }`}
          onClick={handleStatusUpdate}
          disabled={pantryStaff.status === "Cooked"}
        >
          {pantryStaff.status === "Pending"
            ? "Mark as In-Progress"
            : pantryStaff.status === "In-Progress"
            ? "Mark as Cooked"
            : "Already Cooked"}
        </button>
      </div>
    </div>
  );
};

export default PantryStaffDashboard;
