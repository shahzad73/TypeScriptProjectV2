import React, { useState } from "react";


interface AppContext {
  count: number;
  tickCounter: () => void;
  
  jwtToken: String;
  globalSetJwtToken: (token: string) => void;

  showDashboardHomeLink: boolean;
  setDashboardHomeLink: (value: boolean) => void;

  loginUserName: String;
  setLoginedUsername: (user: string) => void;

  s3DocumentBaseURL: String;
}



const MyAppContext = React.createContext<AppContext>({
  count: 0,
  tickCounter: () => {},
  
  jwtToken: "",
  globalSetJwtToken: (token: string) => {},

  showDashboardHomeLink: false,
  setDashboardHomeLink: (value: Boolean) => {},

  loginUserName: "",
  setLoginedUsername: (user: string) => {},

  s3DocumentBaseURL: "https://inftmaker.s3.amazonaws.com/"
});



export default MyAppContext;