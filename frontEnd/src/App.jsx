import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { AuthWrapper } from "./assets/wrapper/AuthWrapper";
import DashboardLayout from "./components/dashboard/assets/DashboardLayout";
import RoleWrapper from "./assets/wrapper/RoleWrapper";
import Not_found from "./assets/errors/404";
import FilieresList from "./components/dashboard/common/filiere/liste/FilieresList";
import AjouterFiliere from "./components/dashboard/common/filiere/ajouter/AjouterFiliere";
import ModifierFiliere from "./components/dashboard/common/filiere/modifier/ModifierFiliere";
import GroupesList from "./components/dashboard/common/groupe/liste/GroupesList";
import AjouterGroupe from "./components/dashboard/common/groupe/ajouter/AjouterGroupe";
import ModifierGroupe from "./components/dashboard/common/groupe/modifier/ModifierGroupe";
import StagiairesList from "./components/dashboard/common/stagiaire/liste/StagiairesList";
import AjouterStagiaire from "./components/dashboard/common/stagiaire/ajouter/AjouterStagiaire";
import ModifierStagiaire from "./components/dashboard/common/stagiaire/modifier/ModifierStagiaire";
import Profile from "./components/dashboard/common/profile/Profile";
import AbsencesList from "./components/dashboard/stagiaire/absences/liste/AbsencesList";
import FormateurGroupesList from "./components/dashboard/formateur/groupe/liste/FormateurGroupesList";
import FormateurList from "./components/dashboard/common/formateur/liste/FormateurList";
import AjouterFormateur from "./components/dashboard/common/formateur/ajouter/AjouterFormateur";
import ModifierFormateur from "./components/dashboard/common/formateur/modifer/modiferFormateur";
import DemandeAuthList from "./components/dashboard/stagiaire/demande_autorisation/liste/DemandeAuthList";
import AjouterDemandeAuth from "./components/dashboard/stagiaire/demande_autorisation/ajouter/AjouterDemandeAuth";
import ModifierDemande from "./components/dashboard/stagiaire/demande_autorisation/modifier/ModifierDemande";
import AvertissementsList from "./components/dashboard/stagiaire/avertissement/liste/AvertissementsList";
import FormateurStagiairesList from "./components/dashboard/formateur/stagiaires/liste/FormateurStagiairesList";
import JustificationList from "./components/dashboard/stagiaire/justification/liste/JustificationList";
import AjouterJustification from "./components/dashboard/stagiaire/justification/ajouter/AjouterJustification";
import ModifierJustification from "./components/dashboard/stagiaire/justification/modifier/ModifierJustification";
import SurveillantsList from "./components/dashboard/admin/surveillant/liste/SurveillantsList";
import AjouterSurveillant from "./components/dashboard/admin/surveillant/ajouter/AjouterSurveillant";
import ModifierSurveillant from "./components/dashboard/admin/surveillant/modifier/ModifierSurveillant";
import AjouterAbsence from "./components/dashboard/formateur/absences/ajouter/AjouterAbsence";
import FormateurAbsencesList from "./components/dashboard/formateur/absences/liste/FormateurAbsencesList";
import FormateurDemandesList from "./components/dashboard/formateur/demandes/liste/FormateurDemandesList";
import SurveillantAbsencesList from "./components/dashboard/surveillant/absences/liste/SurveillantAbsencesList";
import SurveillantAuthList from "./components/dashboard/surveillant/authorisation/list/SurveillantAuthList";
import StagiaireDashboard from "./components/dashboard/stagiaire/StagiaireDashboard";
import SurveillantDashboard from "./components/dashboard/surveillant/SurveillantDashboard";
function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="" element={<RoleWrapper role="admin" />}>
            <Route path="/admin" element={<DashboardLayout role="admin" />}>
              <Route index element={<h1>Tableau de Bord Admin</h1>} />
              <Route path="filieres">
                <Route index element={<FilieresList />} />
                <Route path="ajouter" element={<AjouterFiliere />} />
                <Route path=":id/modifier" element={<ModifierFiliere />} />
              </Route>
              <Route path="groupes">
                <Route index element={<GroupesList />} />
                <Route path="ajouter" element={<AjouterGroupe />} />
                <Route path=":id/modifier" element={<ModifierGroupe />} />
              </Route>
              <Route path="stagiaires">
                <Route index element={<StagiairesList />} />
                <Route path="ajouter" element={<AjouterStagiaire />} />
                <Route path=":id/modifier" element={<ModifierStagiaire />} />
              </Route>
              <Route path="formateurs">
                <Route index element={<FormateurList />} />
                <Route path="ajouter" element={<AjouterFormateur />} />
                <Route path=":id/modifier" element={<ModifierFormateur />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="surveillants">
                <Route index element={<SurveillantsList />} />
                <Route path="ajouter" element={<AjouterSurveillant />} />
                <Route path=":id/modifier" element={<ModifierSurveillant />} />
              </Route>
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>

          <Route path="" element={<RoleWrapper role="stagiaire" />}>
            <Route
              path="/stagiaire"
              element={<DashboardLayout role="stagiaire" />}
            >
              <Route index element={<StagiaireDashboard />} />
              <Route path="absences" element={<AbsencesList />} />
              <Route path="demandes" element={<DemandeAuthList />} />
              <Route path="avertissements" element={<AvertissementsList />} />
              <Route path="demandes/ajouter" element={<AjouterDemandeAuth />} />
              <Route
                path="demandes/:id/modifier"
                element={<ModifierDemande />}
              />
              <Route path="justifications" element={<JustificationList />} />
              <Route
                path="justifications/ajouter"
                element={<AjouterJustification />}
              />
              <Route
                path="justifications/:id/modifier"
                element={<ModifierJustification />}
              />
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
              <Route
                path="stagiaires"
                element={<FormateurStagiairesList />}
              />{" "}
              <Route path="absences">
                <Route index element={<FormateurAbsencesList />} />
                <Route path="ajouter" element={<AjouterAbsence />} />
              </Route>
              <Route path="demandes" element={<FormateurDemandesList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Not_found />} />
            </Route>
          </Route>

          <Route path="" element={<RoleWrapper role="surveillant" />}>
            <Route
              path="/surveillant"
              element={<DashboardLayout role="surveillant" />}
            >
              <Route index element={<SurveillantDashboard />} />
              <Route path="filieres">
                <Route index element={<FilieresList />} />
                <Route path="ajouter" element={<AjouterFiliere />} />
                <Route path=":id/modifier" element={<ModifierFiliere />} />
              </Route>
              <Route path="groupes">
                <Route index element={<GroupesList />} />
                <Route path="ajouter" element={<AjouterGroupe />} />
                <Route path=":id/modifier" element={<ModifierGroupe />} />
              </Route>
              <Route path="stagiaires">
                <Route index element={<StagiairesList />} />
                <Route path="ajouter" element={<AjouterStagiaire />} />
                <Route path=":id/modifier" element={<ModifierStagiaire />} />
              </Route>
              <Route path="absences">
                <Route index element={<SurveillantAbsencesList />} />
              </Route>
              <Route path="demandes">
                <Route index element={<SurveillantAuthList />} />
              </Route>

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
