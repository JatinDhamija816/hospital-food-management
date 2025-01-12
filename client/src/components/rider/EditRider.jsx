import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RidersContext } from "../../contexts/RidersContext";
import { updateRider } from "../../utils/riderApi";

const EditRider = () => {
  const { individualRider, setIndividualRider } = useContext(RidersContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactInfo: "",
  });

  useEffect(() => {
    if (individualRider) {
      setFormData({
        name: individualRider.name || "",
        contactInfo: individualRider.contactInfo || "",
        email: individualRider.email || "",
      });
    }
  }, [individualRider]);

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
      const res = await updateRider(individualRider._id, formData);
      if (res.success) {
        alert("Rider updated successfully!");
        navigate("/all-riders");
        setIndividualRider({});
      } else {
        alert(res.response.data.message);
      }
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8 py-6 shadow-lg rounded-lg"
      >
        <h3 className="text-2xl font-bold text-center mb-6">Edit Rider</h3>

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

        <button className="formSubmitBtn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditRider;
