import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import MyAppContext  from './common/AppContext';
import Issuer from "./Issuer";
import Investor  from './Investor';
import SwitchTo  from './admin/SwitchTo';
 
export default function Admin() {

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
            <Route path="/" element={<SwitchTo />} />
            <Route path="/issuer/*" element={<Issuer />} />
            <Route path="/investor/*" element={<Investor />} />
          </Routes>
      </div>
    );

}

