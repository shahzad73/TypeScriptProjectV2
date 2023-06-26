import React from "react";
import {
  Link
} from "react-router-dom";

export default function InvestorSidebar() {

  React.useEffect(() => {
      return () => {
          //alert("Bye");
      };
  }, []);


  return (  
    <div>
        <ul className="nav pcoded-inner-navbar">
            <li data-username="" className="nav-item">
                <Link to={`/admin/investor`}>
                    <span className="pcoded-micon">
                        <i className="feather icon-alert-triangle"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Dashboard
                    </span> 
                </Link>
            </li>
        </ul>
    </div>
  );

}