import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './containers/home';
import About from './containers/about';
import Contact from './containers/contact';
import Projects from './containers/projects';
import Navbar from './components/navbar';
import ProjectDetails from "./containers/projectDetails";
import AdminPanel from './containers/AdminPanel';
import Login from './containers/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './components/ErrorPage/ErrorPage';

function AppContent() {
    const location = useLocation();  
    const hideNavbar = location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/error';

    return (
        <div className="App">
            {!hideNavbar && <Navbar />}  
            
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
                <Route path="*" element={<Navigate to="/error" />} />
                <Route path="/error" element={<ErrorPage />} />
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
