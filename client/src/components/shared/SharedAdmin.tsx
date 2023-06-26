import React, { useContext } from "react";
import MyAppContext  from '../common/AppContext';
import { Routes, Route } from "react-router-dom";

import Profile from "./Profile/Profile";
import SwitchTo  from './SwitchTo';


export default function ShareAdmin() {

    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };
    }, []);


    return (
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">

                      <div className="main-body">

                            <Routes>
                                <Route path="/" element={<SwitchTo />} />
                                <Route path="/profile" element={<Profile />} />   
                            </Routes>

                      </div>
                    
                </div>
              </div>
          </div>
        </div>
    );

}

