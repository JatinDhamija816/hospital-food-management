import { useState, useEffect, useContext } from "react";
import { updatePatient } from "../../utils/patientApi";
import { useNavigate } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";

const EditPatient = () => {
  const {
    individualPatient,
    setIndividualPatient,
    loading,
    setLoading,
    setRefreshPatient,
  } = useContext(PatientsContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    disease: "",
    allergies: "",
    room: "",
    bed: "",
    floor: "",
    age: "",
    contact: "",
    emergencyContact: "",
  });

  useEffect(() => {
    if (individualPatient) {
      setFormData({
        name: individualPatient.name || "",
        disease: individualPatient.disease || "",
        allergies: individualPatient.allergies || "",
        room: individualPatient.room || "",
        bed: individualPatient.bed || "",
        floor: individualPatient.floor || "",
        age: individualPatient.age || "",
        contact: individualPatient.contact || "",
        emergencyContact: individualPatient.emergencyContact || "",
      });
    }
  }, [individualPatient, setFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updatePatient(individualPatient._id, formData);
      if (res.success) {
        alert("Patient updated successfully!");
        navigate("/all-patients");
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Something went wrong while updating the patient!");
    } finally {
      setLoading(false);
      setRefreshPatient(true);
      setIndividualPatient({});
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 py-6 shadow-lg rounded-lg"
      >
        <h3 className="text-2xl font-bold text-center mb-6">Edit Patient</h3>

        {Object.keys(formData).map((key) => (
          <div className="mb-4" key={key}>
            <label htmlFor={key} className="label">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type={
                key === "age" || key.includes("Contact") ? "number" : "text"
              }
              name={key}
              placeholder={key.replace(/([A-Z])/g, " $1")}
              value={formData[key]}
              onChange={handleInputChange}
              className="input"
              required={key !== "allergies"}
            />
          </div>
        ))}
        <button className="formSubmitBtn" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Patient"}
        </button>
      </form>
    </div>
  );
};

export default EditPatient;
