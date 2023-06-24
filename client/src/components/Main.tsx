import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import MyAppContext  from './common/AppContext';
import AdminMain from "./Admin";
import PublicMain from './Public';
import InvestorMain  from './Investor';


 
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
            <Route path="/admin/*" element={<AdminMain />} />
            <Route path="/investor/*" element={<InvestorMain />} />
            <Route path="/*" element={<PublicMain />} />
          </Routes>
      </div>
    );

}

