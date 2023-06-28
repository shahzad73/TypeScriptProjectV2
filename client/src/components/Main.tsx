import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import MyAppContext  from './common/AppContext';
import Admin from "./Admin";
import Public from './Public';


export default function Main() {

  const appContext = useContext(MyAppContext);

  React.useEffect(() => {

      return () => {

      };
  }, []);

    return (
      <div>
          <Routes>
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/*" element={<Public />} />
          </Routes>
      </div>
    );

}

