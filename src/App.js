import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './containers/home';
import About from './containers/about';
import Contact from './containers/contact';
import Projects from './containers/projects';
import Navbar from './components/navbar';

function App() {
    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
        </div>
    );
}

export default App;
