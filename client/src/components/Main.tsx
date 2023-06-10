import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import AdminMain from "./AdminMain";
import PublicMain from './PublicMain';
import MyAppContext  from './common/AppContext';


export default function Main() {

    const { 
      count, 
      tickCounter,
            
      s3DocumentBaseURL
    } = useContext(MyAppContext);


    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };
    }, []);


    return (  
      <div>
        <Routes>
            <Route path="/adminmain/*" element={<AdminMain />} />
            <Route path="/*" element={<PublicMain />} />
          </Routes>
      </div>
    );

}