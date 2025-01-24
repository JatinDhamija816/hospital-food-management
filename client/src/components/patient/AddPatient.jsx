import { useContext, useState } from "react";
import { addPatient } from "../../utils/patientApi";
import { useNavigate } from "react-router-dom";
import { patientFields } from "./patientConstant";
import { PatientsContext } from "../../contexts/PatientsContext";

const AddPatient = () => {
  const navigate = useNavigate();
  const { setRefreshPatient, loading, setLoading } =
    useContext(PatientsContext);

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
    evening: {
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
    setLoading(true);
    try {
      const res = await addPatient({ patient, dietChart });

      if (res.success) {
        alert(res.message);
        setRefreshPatient(true);
        navigate("/all-patients");
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Error while add patient:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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

        {patientFields.map(({ label, name, type, required }) => (
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
              required={required}
            />
          </div>
        ))}

        <h3 className="text-2xl font-bold text-center mb-6 ">Diet Chart</h3>

        <div className="mb-4 space-y-2">
          {["morning", "evening", "night"].map((meal) => (
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
          {loading ? "Wait..." : "Add Patient"}
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
