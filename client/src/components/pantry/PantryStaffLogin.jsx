import { useContext, useState } from "react";
import { FaEye, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { pantryStaffLogin } from "../../utils/pantryApi";
import { PantryStaffContext } from "../../contexts/PantryStaffContext";

const PantryStaffLogin = () => {
  const navigate = useNavigate();
  const { setIsPantryStaffLoggedIn } = useContext(PantryStaffContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await pantryStaffLogin(user);

      if (res.success) {
        alert(res.message);
        setIsPantryStaffLoggedIn(true);
        navigate("/");
      } else {
        alert(res.message);
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
        <h2 className="text-2xl font-bold text-center mb-6">
          Pantry Staff Login
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="input"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="passwordInput"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer"
            >
              {showPassword ? <FaRegEye /> : <FaEye />}
            </div>
          </div>
        </div>

        <button type="submit" className="formSubmitBtn mt-5">
          Login
        </button>
      </form>
    </div>
  );
};

export default PantryStaffLogin;
