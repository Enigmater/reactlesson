import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";

import { AuthProvider } from './context/AuthContext';
import ScrollToTop from "./utils/scrollToTop"
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";

function App() {
  return (
		<div className="App">
			<AuthProvider>
				<Router>
					<ScrollToTop />
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/project/:id" element={<Project />} />
						<Route path="/contacts" element={<Contacts />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<PrivateRoute> <Profile/> </PrivateRoute>} />
						{/* Защищённый маршрут */}
		
					</Routes>
					<Footer />
				</Router>
			</AuthProvider>
		</div>
  );
}

export default App;
