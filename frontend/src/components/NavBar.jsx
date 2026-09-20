import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
export default function NavBar(){
 const {user,logout}=useAuth();
 return <nav className="nav"><Link className="brand" to="/">GiftLink</Link><div className="nav-links">
 <Link to="/gifts">Browse</Link>{user?<><Link to="/profile">Profile</Link><button className="link-button" onClick={logout}>Logout</button></>:<><Link to="/login">Login</Link><Link className="small-cta" to="/register">Get Started</Link></>}</div></nav>
}
