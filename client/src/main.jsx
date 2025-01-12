import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext.jsx";
import { PatientsProvider } from "./contexts/PatientsContext.jsx";
import { PantryStaffProvider } from "./contexts/PantryStaffContext.jsx";
import { RidersProvider } from "./contexts/RidersContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminProvider>
      <PatientsProvider>
        <PantryStaffProvider>
          <RidersProvider>
            <App />
          </RidersProvider>
        </PantryStaffProvider>
      </PatientsProvider>
    </AdminProvider>
  </BrowserRouter>
);
