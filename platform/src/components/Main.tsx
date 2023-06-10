import React from "react";
import { Route, Routes } from "react-router";
import AdminMain from "./AdminMain";
import PublicMain from './PublicMain';


export default function Main() {

    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };
    }, []);


    return (  
      <div>
          <Routes>
                <Route path="/platformmain/*" element={<AdminMain />} />
                <Route path="/*" element={<PublicMain />} />
          </Routes>
      </div>
    );

}