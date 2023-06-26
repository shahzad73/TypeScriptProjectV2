import React from "react";
import {
  Link
} from "react-router-dom";

export default function IssuerSidebar() {

  React.useEffect(() => {
      return () => {
          //alert("Bye");
      };
  }, []);


  return (  
    <div>
        <ul className="nav pcoded-inner-navbar">
            <li data-username="" className="nav-item">
                <Link to={`/admin/issuer`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-alert-triangle"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Dashboard
                    </span> 
                </Link>
            </li>


            <li data-username="" className="nav-item">
                <Link to={`/admin/issuer/company`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-cloud-snow"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Companies
                    </span>
                </Link>
            </li>  
                        

            <li data-username="" className="nav-item">
                <Link to={`/admin/issuer/token`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-monitor"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Security Tokens
                    </span>
                </Link>
            </li>  


            <li data-username="" className="nav-item">
                <Link to={`/admin/issuer/token`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-monitor"></i>
                    </span>
                    <span className="pcoded-mtext">
                        NFT
                    </span>
                </Link>
            </li>  


            <li data-username="" className="nav-item">
                <Link to={`/admin/issuer/token`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-monitor"></i>
                    </span>
                    <span className="pcoded-mtext">
                        ICO / ERC20 Tokens
                    </span>
                </Link>
            </li>  


            <li data-username="" className="nav-item">
                <Link to={`/admin/issuer/investorList`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-cloud-snow"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Investors
                    </span>
                </Link>
            </li>  


            <li data-username="" className="nav-item">
                <Link to={`/admin/issuer/inbox`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-file-text"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Inbox
                    </span>
                </Link>
            </li>  
                                    


            <li data-username="" className="nav-item">
                <Link to={`/admin/issuer/test`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-cloud-snow"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Test
                    </span>
                </Link>
            </li>  



        </ul>
    </div>
  );

}