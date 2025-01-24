import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPantryStaff } from "../../utils/pantryApi";
import { PantryStaffContext } from "../../contexts/PantryStaffContext";

const AddPantryStaff = () => {
  const navigate = useNavigate();
  const { setRefreshPantryStaff } = useContext(PantryStaffContext);

  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    location: "",
    email: "",
    password: "",
  });

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
      const res = await addPantryStaff(formData);

      if (res.success) {
        alert(res.message);
        setRefreshPantryStaff(true);
        alert("Pantry Staff Added Success ,  Refersh Page");
        navigate("/all-pantry-staff");
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Something went wrong");
      console.error("Error add pantry staff", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 py-6 shadow-lg rounded-lg "
      >
        <h3 className="text-2xl font-bold text-center mb-6 ">
          Add Pantry Staff Member
        </h3>
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
          <label htmlFor="contactInfo" className="label">
            Contact Info
          </label>
          <input
            type="number"
            name="contactInfo"
            placeholder="Contact Info"
            value={formData.contactInfo}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="label">
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        <button className="formSubmitBtn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPantryStaff;
