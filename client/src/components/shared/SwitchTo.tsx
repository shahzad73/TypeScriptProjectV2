import React, { useContext } from "react";
import MyAppContext  from '../common/AppContext';
import { useNavigate } from "react-router-dom";



export default function SwitchTo() {

    const appContext = useContext(MyAppContext);
    const navigate = useNavigate();

    function switchInvestorDashboard() {
        appContext.setCurrentSideMenu(3);
        navigate('/admin/investor', { replace: true })
    }

    function switchIssuerDashboard() {
        appContext.setCurrentSideMenu(2);
        navigate('/admin/issuer', { replace: true })        
    }


    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };
    }, []);


    return (
        <div className="row">



            <span onClick = {switchInvestorDashboard} >
                Switch to Investor
            </span>
            <br /><br />
            <span onClick = {switchIssuerDashboard} >
                Switch to Issuer
            </span>
        </div>
    );

}

