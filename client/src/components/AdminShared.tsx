import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "./shared/Profile/Profile";
import SwitchTo  from './shared/SwitchTo';
import Inbox from "./shared/Inbox/Inbox"

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
                                <Route path="/inbox" element={<Inbox />} />
                            </Routes>

                      </div>
                    
                </div>
              </div>
          </div>
        </div>
    );

}

