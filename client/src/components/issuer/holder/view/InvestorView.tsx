import React from "react";
import Profile from "./profile";
import InvestorTokens from "./token";

export default function InvestorView() {

    React.useEffect(() => {
        return () => {
            //alert("Bye");
        };
    }, []);

  return (  

    <div>
        <Profile></Profile>
        <InvestorTokens></InvestorTokens>
    </div>  

  );    
}

