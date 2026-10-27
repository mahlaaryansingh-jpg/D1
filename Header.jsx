import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="header">
      <Link to="/" className="logo">DEV@Deakin</Link>
      <Link to="/pricing" className="nav-button">Pricing</Link>
      <input className="search-box" type="text" placeholder="Search..." aria-label="Search" />
      <button className="nav-button" type="button" onClick={() => navigate(user ? "/" : "/login")}>Post</button>
      {!loading && (user ? (
        <>
          <span className="nav-user">{user.displayName || user.email}</span>
          <button className="nav-button" type="button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-button login-link">Login</Link>
          <Link to="/register" className="nav-button">Sign up</Link>
        </>
      ))}
    </header>
  );
}

export default Header;
