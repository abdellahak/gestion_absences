import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addAuth, removeAuth } from "../redux/slices/AuthSlice";
import Cookies from "js-cookie";
import Loading from "../loading/Loading";
import { setBearerToken } from "../api/axios";
import Auth from "../api/auth/Auth";
import { ToastWraper } from "../toast/Toast";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Pour utiliser l'authentification, le site doit être enveloppé avec AuthWrapper");
  }

  return context;
};

export const AuthWrapper = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const token = Cookies.get("token");

  const logout = () => {
    Cookies.remove("token");
    dispatch(removeAuth());
    navigate("/");
  };
  useEffect(() => {
    const checkToken = () => {
      if (!token && auth) {
        return logout();
      }
      if (pathname !== "/" && !token) {
        return navigate(`/?redirect=${encodeURIComponent(pathname)}`);
      }

      setBearerToken(token);
      setLoading(false);
    };

    checkToken();
  }, [pathname, token, auth]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    const getUser = async () => {
      const res = await Auth.user();
      if (res.success) {
        dispatch(addAuth(res.data));
      } else {
        logout();
      }
    };
    getUser();
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        auth: auth,
        logout: logout,
      }}
    >
      <div className="min-h-screen w-full relative h-dvh">
        {!loading ? (
          <ToastWraper>{children}</ToastWraper>
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
};
