import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Ppf from './components/service/Ppf';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes> {/* Use Routes instead of Switch */}
                <Route path="/" element={
                    <div className="app relative bg-black">

                        <Navbar className="fixed top-0 w-full z-49" />
                        <div id="home" className="static z-5 px-8 pt-20 pb-20 lg:pt-20 md:pt-0">
                            <Home />
                        </div>
                        <div id="about" className="py-56 lg:py-64">
                            <About />
                        </div>
                        <div id="services" className="py-10">
                            <Services />
                        </div>
                        <div id="contact" className="py-10">
                            <Contact />
                        </div>
                    </div>
                } exact />
                <Route path="/Ppf" element={<Ppf />} />
            </Routes>
        </Router>
    );
};

export default App;
