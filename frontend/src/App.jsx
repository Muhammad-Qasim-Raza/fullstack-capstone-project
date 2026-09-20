import {BrowserRouter,Routes,Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import GiftsPage from "./pages/GiftsPage";
import GiftDetailPage from "./pages/GiftDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
export default function App(){return <BrowserRouter><AuthProvider><NavBar/><Routes><Route path="/" element={<HomePage/>}/><Route path="/gifts" element={<GiftsPage/>}/><Route path="/gifts/:id" element={<GiftDetailPage/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/profile" element={<ProfilePage/>}/></Routes><footer>GiftLink • Share useful things. Reduce waste.</footer></AuthProvider></BrowserRouter>}
