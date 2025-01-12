import { useState, useEffect, useContext } from "react";
import { updatePatient } from "../../utils/patientApi";
import { useNavigate } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";

const EditPatient = () => {
  const { individualPatient, setIndividualPatient, setRefreshPatient } =
    useContext(PatientsContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    disease: "",
    allergies: "",
    room: "",
    bed: "",
    floor: "",
    age: "",
    gender: "",
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
        gender: individualPatient.gender || "",
        contact: individualPatient.contact || "",
        emergencyContact: individualPatient.emergencyContact || "",
      });
    }
  }, [individualPatient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updatePatient(individualPatient._id, formData);
      if (res.success) {
        alert("Patient updated successfully!");
        setRefreshPatient(true);
        setIndividualPatient({});
        navigate("/all-patients");
      } else {
        alert(res.response.data.message);
        setRefreshPatient(true);
        setIndividualPatient({});
      }
    } catch (error) {
      alert("Something went wrong!");
      setRefreshPatient(true);
      setIndividualPatient({});
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 py-6 shadow-lg rounded-lg"
      >
        <h3 className="text-2xl font-bold text-center mb-6">Edit Patient</h3>

        <div className="mb-4">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="disease" className="label">
            Disease
          </label>
          <input
            type="text"
            name="disease"
            placeholder="Disease"
            value={formData.disease}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="allergies" className="label">
            Allergies
          </label>
          <input
            type="text"
            name="allergies"
            placeholder="Allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="room" className="label">
            Room Number
          </label>
          <input
            type="number"
            name="room"
            placeholder="Room Number"
            value={formData.room}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bed" className="label">
            Bed Number
          </label>
          <input
            type="number"
            name="bed"
            placeholder="Bed Number"
            value={formData.bed}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="floor" className="label">
            Floor Number
          </label>
          <input
            type="number"
            name="floor"
            placeholder="Floor Number"
            value={formData.floor}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="label">
            Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="label">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="input"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="label">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="emergencyContact" className="label">
            Emergency Contact
          </label>
          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>

        <button className="formSubmitBtn" type="submit">
          Update Patient
        </button>
      </form>
    </div>
  );
};

export default EditPatient;
