import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './containers/home';
import About from './containers/about';
import Contact from './containers/contact';
import Projects from './containers/projects';
import Navbar from './components/navbar';
import ProjectDetails from "./containers/projectDetails";
import AdminPanel from './containers/AdminPanel';
import Login from './containers/Login';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
    const location = useLocation();  // Get current route

    // Hide Navbar on login and admin pages
    const hideNavbar = location.pathname.startsWith('/admin') || location.pathname === '/login';

    return (
        <div className="App">
            {!hideNavbar && <Navbar />}  {/* Conditionally render Navbar */}
            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/projects' element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login' element={<Login />} />

                <Route 
                    path='/admin/*' 
                    element={
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </div>
    );
}

function App() {
    return (
    
            <AppContent />
        
    );
}

export default App;
