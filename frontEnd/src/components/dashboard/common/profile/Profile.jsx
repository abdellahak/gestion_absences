import { Link } from "react-router-dom";
import UserMetaCard from "./assets/UserMetaCard";
import { useAuth } from "../../../../assets/wrapper/AuthWrapper";
import EditUser from "./userForm/EditUser";

export default function Profile() {
  const { auth } = useAuth();
  return (
    <>
      <title>Profile Page</title>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800" x-text="pageName">
          Profile
        </h2>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user = {auth} />
          <EditUser />
        </div>
      </div>
    </>
  );
}
