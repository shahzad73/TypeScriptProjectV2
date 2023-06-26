import React, { useState, useContext } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Dashboard from "./investor/Dashboard";


export default function Investor() {

    React.useEffect(() => {
        return () => {

        };
    }, []);


    return (
        <div className="pcoded-main-container">
                <div className="pcoded-wrapper">
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">

                            <div className="main-body">
                                <div className="page-wrapper">
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                    </Routes>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
    );

}
