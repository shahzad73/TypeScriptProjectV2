import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import MyAppContext  from '../common/AppContext';
import Admin from "../Admin";
import Public from '../Public';
import { Link } from "react-router-dom";
import { Label } from "semantic-ui-react";



export default function SwitchTo() {

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

                            <Link to={`/admin/investor`}>
                                  Switch to Investor
                            </Link> 
                            <br /><br />
                            <Link to={`/admin/issuer`}>
                                  Switch to Admin
                            </Link> 


      </div>
    );

}

