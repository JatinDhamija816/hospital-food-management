import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "./contexts/AdminContext";
import { PantryStaffContext } from "./contexts/PantryStaffContext";
import { RidersContext } from "./contexts/RidersContext";
import LandingPage from "./components/LandingPage";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddPatient from "./components/patient/AddPatient";
import AllPatients from "./components/patient/AllPatients";
import EditPatient from "./components/patient/EditPatient";
import EditDietChart from "./components/patient/EditDietChart";
import AddPantryStaff from "./components/pantry/AddPantryStaff";
import AllPantryStaff from "./components/pantry/AllPatryStaff";
import EditPantryStaff from "./components/pantry/EditPantryStaff";
import AssignMeal from "./components/admin/AssignMeal";
import AddRider from "./components/rider/AddRider";
import AllRider from "./components/rider/AllRiders";
import EditRider from "./components/rider/EditRider";
import PantryStaffLogin from "./components/pantry/PantryStaffLogin";
import PantryStaffDashboard from "./components/pantry/PantryStaffDashboard";
import PantryNavbar from "./components/pantry/PantryNavbar";
import RiderNavbar from "./components/rider/RiderNavbar";
import RiderDashboard from "./components/rider/RiderDashboard";
import RiderLogin from "./components/rider/RiderLogin";

const App = () => {
  const { isAdminLoggedIn } = useContext(AdminContext);
  const { isPantryStaffLoggedIn } = useContext(PantryStaffContext);
  const { isRiderLoggedIn } = useContext(RidersContext);

  return (
    <div className="bg-white text-black">
      {isAdminLoggedIn && !isPantryStaffLoggedIn && !isRiderLoggedIn ? (
        <AdminNavbar />
      ) : null}
      {isPantryStaffLoggedIn && !isAdminLoggedIn && !isRiderLoggedIn ? (
        <PantryNavbar />
      ) : null}
      {isRiderLoggedIn && !isAdminLoggedIn && !isPantryStaffLoggedIn ? (
        <RiderNavbar />
      ) : null}

      <Routes>
        {isAdminLoggedIn && !isPantryStaffLoggedIn && !isRiderLoggedIn ? (
          <>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/all-patients" element={<AllPatients />} />
            <Route path="/edit-patient" element={<EditPatient />} />
            <Route path="/edit-diet-chart" element={<EditDietChart />} />
            <Route path="/add-pantry-staff" element={<AddPantryStaff />} />
            <Route path="/all-pantry-staff" element={<AllPantryStaff />} />
            <Route path="/edit-pantry-staff" element={<EditPantryStaff />} />
            <Route path="/assign-meal" element={<AssignMeal />} />
            <Route path="/add-rider" element={<AddRider />} />
            <Route path="/all-riders" element={<AllRider />} />
            <Route path="/edit-rider" element={<EditRider />} />
          </>
        ) : null}

        {isPantryStaffLoggedIn && !isAdminLoggedIn && !isRiderLoggedIn ? (
          <>
            <Route path="/" element={<PantryStaffDashboard />} />
          </>
        ) : null}

        {isRiderLoggedIn && !isAdminLoggedIn && !isPantryStaffLoggedIn ? (
          <>
            <Route path="/" element={<RiderDashboard />} />
          </>
        ) : null}

        {!isAdminLoggedIn && !isPantryStaffLoggedIn && !isRiderLoggedIn ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/pantry-staff-login" element={<PantryStaffLogin />} />
            <Route path="/rider-login" element={<RiderLogin />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
};

export default App;
