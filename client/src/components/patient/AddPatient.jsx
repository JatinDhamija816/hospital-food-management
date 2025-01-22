import { useContext, useState } from "react";
import { addPatient } from "../../utils/patientApi";
import { useNavigate } from "react-router-dom";
import { PatientsContext } from "../../contexts/PatientsContext";
import { patientFields } from "./constant";

const AddPatient = () => {
  const navigate = useNavigate();
  const { setRefreshPatient } = useContext(PatientsContext);

  const [patient, setPatient] = useState({
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
  const [dietChart, setDietChart] = useState({
    morning: {
      ingredients: "",
      instructions: "",
    },
    lunch: {
      ingredients: "",
      instructions: "",
    },
    night: {
      ingredients: "",
      instructions: "",
    },
  });

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;

    setPatient((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDietChartInputChange = (e) => {
    const { name, value } = e.target;

    const [meal, field] = name.split(".");
    setDietChart((prevData) => ({
      ...prevData,
      [meal]: {
        ...prevData[meal],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addPatient({ patient, dietChart });

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

        {patientFields.map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="label">
              {label}
            </label>
            <input
              type={type}
              name={name}
              placeholder={label}
              value={patient[name]}
              onChange={handlePatientInputChange}
              className="input"
              required
            />
          </div>
        ))}

        <h3 className="text-2xl font-bold text-center mb-6 ">Diet Chart</h3>

        <div className="mb-4 space-y-2">
          {["morning", "lunch", "night"].map((meal) => (
            <div className="mb-4 space-y-2" key={meal}>
              <h5 className="text-xl font-bold capitalize">{meal}</h5>
              {["ingredients", "instructions"].map((field) => (
                <div key={field}>
                  <label htmlFor={`${meal}.${field}`} className="label">
                    {`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  </label>
                  <input
                    type="text"
                    name={`${meal}.${field}`}
                    placeholder={field}
                    value={dietChart[meal][field]}
                    onChange={handleDietChartInputChange}
                    className="input"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="formSubmitBtn" type="submit">
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
