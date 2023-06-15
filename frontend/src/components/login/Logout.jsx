import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

function Logout() {
  const { setUser } = useUser();
  const api = useApi();

  const handleLogout = () => {
    api.defaults.headers.authorization = `Bearer ${""}`;
    setUser(null);
    window.location.reload(false);
  };

  return (
    <div className="logoutButton">
      <Link to="/" onClick={handleLogout}>
        Déconnexion
      </Link>
    </div>
  );
}

export default Logout;
