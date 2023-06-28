import React from "react";
import { useDashboardNavigateHook } from "../common/useDashboardNavigateHook";

export default function SwitchTo() {
    const dashboardNavigationhook = useDashboardNavigateHook();

    function switchInvestorDashboard() {
        dashboardNavigationhook(3, "")
    }

    function switchIssuerDashboard() {
        dashboardNavigationhook(2, "")      
    }

     
    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };
    }, []);


    return (
        <div className="row">            
            <span onClick = {switchInvestorDashboard} >
                Switch to Holder
            </span>
            <br /><br />
            <span onClick = {switchIssuerDashboard} >
                Switch to Issuer
            </span>
        </div>
    );

}

