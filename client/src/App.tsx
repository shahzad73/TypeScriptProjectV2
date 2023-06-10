import Main from "./components/Main";
import React, { useState } from "react";
import MyAppContext  from './components/common/AppContext';
import './App.css';

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

    const [showDashboardHomeLink, setShowDashboardHomeLink] = useState(false);
    const setDashboardHomeLink = (val: boolean) => {
      setShowDashboardHomeLink(val)
    };

    const [loginUserName, setLoginUserName] = useState("");
    const setLoginedUsername = (val: string) => {
      setLoginUserName(val)
    };



    React.useEffect(() => {

        const JWTToken = localStorage.getItem("siteJWTTokenString");

        if( JWTToken != "" && JWTToken != null) {
           setDashboardHomeLink(true);
           globalSetJwtToken( JWTToken )
           const val1 = localStorage.getItem("siteUserName");
           if( val1 !== null )
             setLoginedUsername(  val1 );           
        }

        return () => {
          //alert("Bye");
        };
    
    }, []);


    return (
      <MyAppContext.Provider value={{
        count, 
        tickCounter,
  
        jwtToken,
        globalSetJwtToken,
  
        showDashboardHomeLink,
        setDashboardHomeLink,
  
        loginUserName,
        setLoginedUsername,
  
        s3DocumentBaseURL: "https://inftmaker.s3.amazonaws.com/"
      }}>
          <Main />
      </MyAppContext.Provider>    
    );

}















