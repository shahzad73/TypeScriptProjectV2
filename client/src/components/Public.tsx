import React, { useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./public/Home";
import MenuBar from './public/menubar';
import Contact from "./public/Contact";
import AppContext from './common/AppContext';
import Footer from './public/footer';
import Login from './public/Login';
import Register from './public/Register';
import RecoverPassword from './public/RecoverPassword';
import About from './public/About';
import Services from './public/Services';
import VerifyPassword from './public/VerifyRegister';

export default function Public() {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();


    React.useEffect(() => {
        if(appContext.jwtToken == "") {
            navigate('/', { replace: true })
            appContext.setDashboardHomeLink(false);
        } else {
            appContext.setDashboardHomeLink(true);
        }

        return () => {
            //alert("Bye");
        };
    }, []);

    return (
        <div>
            <MenuBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />       
                <Route path="/login" element={<Login />} />  
                <Route path="/signup" element={<Register />} />  
                <Route path="/recoverpassword" element={<RecoverPassword />} /> 
                <Route path="/about" element={<About />} />                  
                <Route path="/service" element={<Services />} />                                  
                <Route path="/verifyaccount" element={<VerifyPassword />} />                                                  
            </Routes>

            <Footer />
        </div>
    );

}
