import { useLocation } from "react-router";
import useAuth from "../../Hooks/UseAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../../Components/Loading/Loading";
import Forbidden from "../../Components/Forbidden/Forbidden";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }


  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }


  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoutes;
