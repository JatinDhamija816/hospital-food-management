import { useContext, useState } from "react";
import { FaEye, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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
    <div>
      <nav className="w-full z-50 shadow flex justify-between items-center">
        <Link to={"/"}>
          <p className="text-xl font-bold text-black p-3">HFM</p>
        </Link>

        <div className="flex justify-center items-center">
          <div className="text-center rounded-lg p-2 mx-1 border">
            <Link to={"/admin-login"}>
              <button>Sign as Admin</button>
            </Link>
          </div>
          <div className="text-center rounded-lg p-2 mx-1 border">
            <Link to={"/rider-login"}>
              <button>Sign as Rider</button>
            </Link>
          </div>
        </div>
      </nav>
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
    </div>
  );
};

export default PantryStaffLogin;
