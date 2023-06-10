import React, { useState, useContext } from "react";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Home from "./public/Home";
import AppContext from './common/AppContext';
import MenuBar from './public/menubar';
import Footer from './public/footer';
import Login from './public/Login';


export default function PublicMain() {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(appContext.jwtToken == "") {
            navigate('/', { replace: true })
        }    

        return () => {
            // alert("Bye");
        };
    }, []);

    return (
        <div>
            <MenuBar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />  
            </Routes>

            <Footer />
        </div>
    );

}
