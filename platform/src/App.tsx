import Main from "./components/Main";
import React, { useState } from "react";
import AppContext from './components/common/AppContext';
import './App.css';
import MyAppContext  from './components/common/AppContext';

export default function App() {

    // declare all global state varibales here
    const [count, setCount] = useState(0);
    const tickCounter = () => {
        setCount(count + 1)
    };
    const [jwtToken, setJwtToken] = useState("");
    const globalSetJwtToken = (token: React.SetStateAction<string>) => {
      setJwtToken(token)
    };


    return (
      <MyAppContext.Provider value={{
        count, 
        tickCounter,
  
        jwtToken,
        globalSetJwtToken,
  
        s3DocumentBaseURL: "https://inftmaker.s3.amazonaws.com/"
      }}>
          <Main />
      </MyAppContext.Provider>    
    );

}