import { useEffect, useState } from "react";
import { deliverStatusUpdate, riderDashboard } from "../../utils/riderApi";

const RiderDashboard = () => {
  const [pantryStaff, setPantryStaff] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await riderDashboard();
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

  const handleDeliveryStatusUpdate = async () => {
    try {
      const res = await deliverStatusUpdate();
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Rider Dashboard</h2>

      <div className="mb-6 p-6 bg-white border rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Patient Details
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Name:</strong> {pantryStaff.patientDetails?.name}
          </p>
          <p className="text-gray-700">
            <strong>Age:</strong> {pantryStaff.patientDetails?.age}
          </p>
          <p className="text-gray-700">
            <strong>Room:</strong> {pantryStaff.patientDetails?.room}
          </p>
          <p className="text-gray-700">
            <strong>Bed:</strong> {pantryStaff.patientDetails?.bed}
          </p>
          <p className="text-gray-700">
            <strong>Floor:</strong> {pantryStaff.patientDetails?.floor}
          </p>
          <p className="text-gray-700">
            <strong>Contact:</strong> {pantryStaff.patientDetails?.contact}
          </p>
        </div>
      </div>

      <div className="mb-6 p-6 bg-white border rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Meal Details
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Meal Type:</strong> {pantryStaff.mealDetails?.mealType}
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-white ${
                pantryStaff.status === "Pending"
                  ? "bg-yellow-500"
                  : pantryStaff.status === "In-Progress"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            >
              {pantryStaff.status}
            </span>
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Rider Details
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-white ${
                pantryStaff.rider?.status === "Busy"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {pantryStaff.rider?.status}
            </span>
          </p>
          <p className="text-gray-700">
            <strong>Delivery Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded-full text-white ${
                pantryStaff.rider?.deliverStatus === "Pending"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {pantryStaff.rider?.deliverStatus}
            </span>
          </p>
        </div>

        <button
          className={`mt-4 w-full py-2 rounded-lg text-white font-medium ${
            pantryStaff.rider?.deliverStatus === "Pending"
              ? "bg-blue-500 hover:bg-blue-600"
              : pantryStaff.rider?.deliverStatus === "Picked"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleDeliveryStatusUpdate}
          disabled={pantryStaff.rider?.deliverStatus === "Delivered"}
        >
          {pantryStaff.rider?.deliverStatus === "Pending"
            ? "Mark as Picked"
            : pantryStaff.rider?.deliverStatus === "Picked"
            ? "Mark as Delivered"
            : "Delivered"}
        </button>
      </div>
    </div>
  );
};

export default RiderDashboard;
