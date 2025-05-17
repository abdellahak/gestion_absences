import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { AuthWrapper } from "./assets/wrapper/AuthWrapper";
import DashboardLayout from "./components/dashboard/assets/DashboardLayout";
import RoleWrapper from "./assets/wrapper/RoleWrapper";
import Not_found from "./assets/errors/404";
import FilieresList from "./components/dashboard/admin/filiere/liste/FilieresList";
import AjouterFiliere from "./components/dashboard/admin/filiere/ajouter/AjouterFiliere";
import ModifierFiliere from "./components/dashboard/admin/filiere/modifier/ModifierFiliere";

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="" element={<RoleWrapper role="admin" />}>
            <Route path="/admin" element={<DashboardLayout role="admin" />}>
              <Route index element={<h1>Tableau de Bord Admin</h1>} />
              <Route path="filieres" >
                <Route index element={<FilieresList/>} />
                <Route path="ajouter" element={<AjouterFiliere/>} />
                <Route path=":id/modifier" element={<ModifierFiliere/>} />
              </Route>
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>

          <Route path="" element={<RoleWrapper role="stagiaire" />}>
            <Route
              path="/stagiaire"
              element={<DashboardLayout role="stagiaire" />}
            >
              <Route index element={<h1>Tableau de Bord Stagiaire</h1>} />
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>

          <Route path="" element={<RoleWrapper role="formateur" />}>
            <Route
              path="/formateur"
              element={<DashboardLayout role="formateur" />}
            >
              <Route index element={<h1>Tableau de Bord Formateur</h1>} />
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>

          <Route path="" element={<RoleWrapper role="surveillant" />}>
            <Route
              path="/surveillant"
              element={<DashboardLayout role="surveillant" />}
            >
              <Route index element={<h1>Tableau de Bord Surveillant</h1>} />
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>
          <Route path="*" element={<Not_found className={"w-full h-full"} />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
