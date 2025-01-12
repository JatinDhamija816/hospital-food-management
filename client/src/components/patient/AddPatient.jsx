import { useContext, useState } from "react";
import { addPatient } from "../../utils/patientApi";
import { useNavigate } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";

const AddPatient = () => {
  const navigate = useNavigate();
  const { setRefreshPatient } = useContext(PatientsContext);
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
    dietChart: {
      morning: {
        ingredients: "",
        instructions: "",
      },
      evening: {
        ingredients: "",
        instructions: "",
      },
      night: {
        ingredients: "",
        instructions: "",
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [meal, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        dietChart: {
          ...prevData.dietChart,
          [meal]: {
            ...prevData.dietChart[meal],
            [field]: value,
          },
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addPatient(formData);

      if (res.success) {
        alert(res.message);
        setRefreshPatient(true);
        navigate("/all-patients");
      } else {
        alert(res.response.data.message);
      }
    } catch (error) {
      alert("Something went wrong");
      throw new error();
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 py-6 shadow-lg rounded-lg "
      >
        <h3 className="text-2xl font-bold text-center mb-6 ">
          Add Patient with Diet Chart
        </h3>
        <h4 className="text-xl font-bold text-center mb-6 ">Patient Details</h4>
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

        <h3 className="text-2xl font-bold text-center mb-6 ">Diet Chart</h3>
        <div className="mb-4 space-y-2">
          <h5 className="text-xl font-bold">Morning</h5>
          <label htmlFor="morning.ingredients" className="label">
            Ingredients
          </label>
          <input
            type="text"
            name="morning.ingredients"
            placeholder="Ingredients"
            value={formData.dietChart.morning.ingredients}
            onChange={handleInputChange}
            className="input"
          />
          <label htmlFor="morning.instructions" className="label">
            Instructions
          </label>
          <input
            type="text"
            name="morning.instructions"
            placeholder="Instructions"
            value={formData.dietChart.morning.instructions}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="mb-4 space-y-2">
          <h5 className="text-xl font-bold">Evening</h5>
          <label htmlFor="morning.ingredients" className="label">
            Ingredients
          </label>
          <input
            type="text"
            name="evening.ingredients"
            placeholder="Ingredients"
            value={formData.dietChart.evening.ingredients}
            onChange={handleInputChange}
            className="input"
          />
          <label htmlFor="morning.instructions" className="label">
            Instructions
          </label>
          <input
            type="text"
            name="evening.instructions"
            placeholder="Instructions"
            value={formData.dietChart.evening.instructions}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="mb-4 space-y-2">
          <h5 className="text-xl font-bold">Night</h5>
          <label htmlFor="morning.ingredients" className="label">
            Ingredients
          </label>
          <input
            type="text"
            name="night.ingredients"
            placeholder="Ingredients"
            value={formData.dietChart.night.ingredients}
            onChange={handleInputChange}
            className="input"
          />
          <label htmlFor="morning.instructions" className="label">
            Instructions
          </label>
          <input
            type="text"
            name="night.instructions"
            placeholder="Instructions"
            value={formData.dietChart.night.instructions}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <button className="formSubmitBtn" type="submit">
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
