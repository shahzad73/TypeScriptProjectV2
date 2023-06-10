import React, { useState } from "react";


interface AppContext {
  count: number;
  tickCounter: () => void;
  
  jwtToken: String;
  globalSetJwtToken: (token: string) => void;


  s3DocumentBaseURL: String;
}



const MyAppContext = React.createContext<AppContext>({
  count: 0,
  tickCounter: () => {},
  
  jwtToken: "",
  globalSetJwtToken: (token: string) => {},



  s3DocumentBaseURL: "https://inftmaker.s3.amazonaws.com/"
});



export default MyAppContext;