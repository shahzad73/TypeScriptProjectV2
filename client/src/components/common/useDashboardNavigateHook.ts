// useNavigateHook.ts
import { useNavigate } from 'react-router-dom';
import MyAppContext  from './AppContext';
import { useContext } from 'react';

import Public_Enums_Constants from "./Public_Enums_Constants";

export const useDashboardNavigateHook = () => {
  const navigate = useNavigate();
  const appContext = useContext(MyAppContext);

  const useDashboardNavigate = (dashboard: number, specificPage: string) => {
      appContext.setCurrentSideMenu(dashboard);

      var link = "";

      if( dashboard === Public_Enums_Constants.DASHBOARD.Shared ) 
          link = '/admin/share';       
      else if( dashboard === Public_Enums_Constants.DASHBOARD.Issuer ) 
          link = '/admin/issuer'; 
      else if( dashboard === Public_Enums_Constants.DASHBOARD.Holder ) 
          link = '/admin/holder';

      // if move to specific page
      if(specificPage != "")
          link = `${link}/${specificPage}`;

      navigate(link, { replace: true });    
  };
 
  return useDashboardNavigate;
};

