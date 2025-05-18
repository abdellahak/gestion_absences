import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { AuthWrapper } from "./assets/wrapper/AuthWrapper";
import DashboardLayout from "./components/dashboard/assets/DashboardLayout";
import RoleWrapper from "./assets/wrapper/RoleWrapper";
import Not_found from "./assets/errors/404";
import FilieresList from "./components/dashboard/admin/filiere/liste/FilieresList";
import AjouterFiliere from "./components/dashboard/admin/filiere/ajouter/AjouterFiliere";
import ModifierFiliere from "./components/dashboard/admin/filiere/modifier/ModifierFiliere";
import GroupesList from "./components/dashboard/admin/groupe/liste/GroupesList";
import AjouterGroupe from "./components/dashboard/admin/groupe/ajouter/AjouterGroupe";
import ModifierGroupe from "./components/dashboard/admin/groupe/modifier/ModifierGroupe";
import StagiairesList from "./components/dashboard/admin/stagiaire/liste/StagiairesList";
import AjouterStagiaire from "./components/dashboard/admin/stagiaire/ajouter/AjouterStagiaire";
import ModifierStagiaire from "./components/dashboard/admin/stagiaire/modifier/ModifierStagiaire";
import Profile from "./components/dashboard/common/profile/Profile";
import FormateurGroupesList from "./components/dashboard/formateur/groupe/liste/FormateurGroupesList";
import FormateurList from "./components/dashboard/admin/formateur/liste/FormateurList";
import AjouterFormateur from "./components/dashboard/admin/formateur/ajouter/AjouterFormateur";
import ModifierFormateur from "./components/dashboard/admin/formateur/modifer/modiferFormateur";
import FormateurStagiairesList from "./components/dashboard/formateur/stagiaires/liste/FormateurStagiairesList";

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
              <Route path="groupes" >
                <Route index element={<GroupesList/>} />
                <Route path="ajouter" element={<AjouterGroupe/>} />
                <Route path=":id/modifier" element={<ModifierGroupe/>} />
              </Route>
              <Route path="stagiaires" >
                <Route index element={<StagiairesList/>} />
                <Route path="ajouter" element={<AjouterStagiaire/>} />
                <Route path=":id/modifier" element={<ModifierStagiaire/>} />
              </Route>
              <Route path="formateurs" >
                <Route index element={<FormateurList/>} />
                <Route path="ajouter" element={<AjouterFormateur/>} />
                <Route path=":id/modifier" element={<ModifierFormateur/>} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>

          <Route path="" element={<RoleWrapper role="stagiaire" />}>
            <Route
              path="/stagiaire"
              element={<DashboardLayout role="stagiaire" />}
            >
              <Route index element={<h1>Tableau de Bord Stagiaire</h1>} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>

          <Route path="" element={<RoleWrapper role="formateur" />}>
            <Route
              path="/formateur"
              element={<DashboardLayout role="formateur" />}
            >
              <Route index element={<h1>Tableau de Bord Formateur</h1>} />
              <Route path="groupes" element={<FormateurGroupesList />} />
              <Route path="stagiaires" element={<FormateurStagiairesList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>

          <Route path="" element={<RoleWrapper role="surveillant" />}>
            <Route
              path="/surveillant"
              element={<DashboardLayout role="surveillant" />}
            >
              <Route index element={<h1>Tableau de Bord Surveillant</h1>} />
              <Route path="profile" element={<Profile />} />
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
