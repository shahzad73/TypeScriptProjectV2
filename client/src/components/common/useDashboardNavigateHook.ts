// useNavigateHook.ts
import { useNavigate } from 'react-router-dom';
import MyAppContext  from './AppContext';
import { useContext } from 'react';

export const useDashboardNavigateHook = () => {
  const navigate = useNavigate();
  const appContext = useContext(MyAppContext);

  const useDashboardNavigate = (dashboard: number, specificPage: string) => {
      appContext.setCurrentSideMenu(dashboard);

      var link = "";

      if( dashboard === 1 ) 
          link = '/admin/share';       
      else if( dashboard === 2 ) 
          link = '/admin/issuer'; 
      else if( dashboard === 3 ) 
          link = '/admin/holder';

      // if move to specific page
      if(specificPage != "")
          link = `${link}/${specificPage}`;

      navigate(link, { replace: true });    
  };
 
  return useDashboardNavigate;
};

