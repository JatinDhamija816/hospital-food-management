import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRider, getIndividualRider } from "../../utils/riderApi";
import { RidersContext } from "../../contexts/RidersContext";

const AllRider = () => {
  const navigate = useNavigate();
  const { setIndividualRider, riders, setRefreshRider } =
    useContext(RidersContext);

  const handleEditMember = async (riderId) => {
    try {
      const res = await getIndividualRider(riderId);
      if (res.success) {
        setIndividualRider(res.rider);
        await setRefreshRider(true);
        navigate("/edit-rider");
      }
    } catch (error) {
      console.error("Error fetching rider:", error);
    }
  };

  const handleDelete = async (riderId) => {
    try {
      const res = await deleteRider(riderId);
      if (res.success) {
        await setRefreshRider(true);
      }
    } catch (error) {
      console.error("Error deleting rider:", error);
    }
  };
  return (
    <div className="w-full justify-center mt-5">
      {riders.map((rider) => (
        <div key={rider._id} className="shadow-md rounded-lg p-5 m-4">
          <h2 className="text-xl font-bold">{rider.name}</h2>
          <p>Email: {rider.email}</p>
          <p>Contact: {rider.contactInfo}</p>
          <p>Status: {rider.status}</p>

          <div className="mt-3">
            {rider.assignedTask?.patientDetails && (
              <>
                <h3 className="font-semibold">Assigned Task:</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Delivery Status: </strong>
                    {rider.assignedTask?.deliveryStatus}
                  </p>
                  <h4 className="font-semibold">Patient Info:</h4>
                  <ul>
                    <li>
                      <strong>Name: </strong>
                      {rider.assignedTask.patientDetails.name}
                    </li>
                    <li>
                      <strong>Bed Number: </strong>
                      {rider.assignedTask.patientDetails.bed}
                    </li>
                    <li>
                      <strong>Room: </strong>
                      {rider.assignedTask.patientDetails.room}
                    </li>
                    <li>
                      <strong>Floor Number: </strong>
                      {rider.assignedTask.patientDetails.flooe}
                    </li>
                    <li>
                      <strong>Contact: </strong>
                      {rider.assignedTask.patientDetails.contact}
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="mt-5 flex justify-end space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEditMember(rider._id)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(rider._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRider;
