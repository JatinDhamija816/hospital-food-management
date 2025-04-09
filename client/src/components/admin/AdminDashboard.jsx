import { useEffect, useState } from "react";
import { fetchAllAssignMeal } from "../../utils/adminApi";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ mealType: "", status: "" });

  const fetchData = async () => {
    try {
      const response = await fetchAllAssignMeal();
      setData(response.dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredData = data.filter((item) => {
    return (
      (!filter.mealType || item.pantryStaff.mealType === filter.mealType) &&
      (!filter.status || item.pantryStaff.preparationStatus === filter.status)
    );
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        Assign Meal Dashboard
      </h2>

      <div className="flex justify-center space-x-4 mb-6">
        <select
          name="mealType"
          className="p-2 border border-gray-300 rounded-md"
          onChange={handleFilterChange}
        >
          <option value="">All Meal Types</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>
        <select
          name="status"
          className="p-2 border border-gray-300 rounded-md"
          onChange={handleFilterChange}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Complete">Complete</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
                            <th className="p-3 border border-gray-300">Doctor Name</th>
              <th className="p-3 border border-gray-300">Patient Name</th>
              <th className="p-3 border border-gray-300">Age</th>
              <th className="p-3 border border-gray-300">Disease</th>
              <th className="p-3 border border-gray-300">Room</th>
              <th className="p-3 border border-gray-300">Bed</th>
              <th className="p-3 border border-gray-300">Floor</th>
              <th className="p-3 border border-gray-300">Pantry Staff</th>
              <th className="p-3 border border-gray-300">Contact</th>
              <th className="p-3 border border-gray-300">Meal Type</th>
              <th className="p-3 border border-gray-300">Preparation Status</th>
              <th className="p-3 border border-gray-300">Rider Name</th>
              <th className="p-3 border border-gray-300">Rider Contact</th>
              <th className="p-3 border border-gray-300">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-gray-50">
                <td className="p-3 border border-gray-300">
                  {item.patient.name}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.patient.age}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.patient.disease}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.patient.room}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.patient.bed}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.patient.floor}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.pantryStaff.name}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.pantryStaff.contact}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.pantryStaff.mealType}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.pantryStaff.preparationStatus}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.rider.name}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.rider.contact}
                </td>
                <td className="p-3 border border-gray-300">
                  {item.rider.deliveryStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
