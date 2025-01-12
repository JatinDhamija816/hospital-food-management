import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  deletePantryStaff,
  getIndividualPantryStaffMember,
} from "../../utils/pantryApi";
import { PantryStaffContext } from "../../contexts/PantryStaffContext";

const AllPantryStaff = () => {
  const navigate = useNavigate();
  const { setIndividualPantryStaff, pantryStaff, setRefreshPantryStaff } =
    useContext(PantryStaffContext);

  const handleEditMember = async (pantryStaffId) => {
    try {
      const res = await getIndividualPantryStaffMember(pantryStaffId);
      if (res.success) {
        setIndividualPantryStaff(res.staff);
        await setRefreshPantryStaff(true);
        navigate("/edit-pantry-staff");
      }
    } catch (error) {
      console.error("Error fetching pantry staff member:", error);
    }
  };

  const handleDelete = async (pantryStaffId) => {
    try {
      const res = await deletePantryStaff(pantryStaffId);
      if (res.success) {
        await setRefreshPantryStaff(true);
      }
    } catch (error) {
      console.error("Error deleting pantry staff member:", error);
    }
  };
  return (
    <div className="w-full justify-center mt-5">
      {pantryStaff.map((staff) => (
        <div key={staff._id} className="shadow-md rounded-lg p-5 m-4">
          <h2 className="text-xl font-bold">{staff.name}</h2>
          <p>
            <strong>Email:</strong> {staff.email}
          </p>
          <p>
            <strong>Contact:</strong> {staff.contactInfo}
          </p>
          <p>
            <strong>Location:</strong> {staff.location}
          </p>
          <p>
            <strong>Status:</strong> {staff.status}
          </p>

          {staff.assignedTask && (
            <div className="mt-3">
              {staff.assignedTask.patientDetails && (
                <div className="mt-2">
                  <div className="md:flex justify-between">
                    <div>
                      <h3 className="font-semibold">Assigned Tasks:</h3>{" "}
                      <p>
                        <strong>Meal</strong> {staff.assignedTask.mealType}
                      </p>
                      <p>
                        <strong>Meal Ingredients</strong>{" "}
                        {staff.assignedTask.mealDetails.ingredients}
                      </p>
                      <p>
                        <strong>Meal Instructions</strong>{" "}
                        {staff.assignedTask.mealDetails.instructions}
                      </p>
                      <p>
                        <strong>Preparation Status:</strong>{" "}
                        {staff.assignedTask.preparationStatus}
                      </p>
                    </div>
                    <div className="mr-10">
                      <h4 className="font-semibold text-lg">
                        Patient Details:
                      </h4>
                      <p>
                        <strong>Name:</strong>{" "}
                        {staff.assignedTask.patientDetails.name}
                      </p>
                      <p>
                        <strong>Age:</strong>{" "}
                        {staff.assignedTask.patientDetails.age}
                      </p>
                      <p>
                        <strong>Disease:</strong>{" "}
                        {staff.assignedTask.patientDetails.disease}
                      </p>
                      <p>
                        <strong>Allergies:</strong>{" "}
                        {staff.assignedTask.patientDetails.allergies}
                      </p>
                      <p>
                        <strong>Room:</strong>{" "}
                        {staff.assignedTask.patientDetails.room},
                        <strong> Bed:</strong>{" "}
                        {staff.assignedTask.patientDetails.bed},
                        <strong> Floor:</strong>{" "}
                        {staff.assignedTask.patientDetails.floor}
                      </p>
                      <p>
                        <strong>Contact:</strong>{" "}
                        {staff.assignedTask.patientDetails.contact}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-5 flex justify-end space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEditMember(staff._id)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(staff._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPantryStaff;
