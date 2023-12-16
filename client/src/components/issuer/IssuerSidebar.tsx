import React from "react";
import {
  Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function IssuerSidebar() {
  const navigate = useNavigate();

  React.useEffect(() => {
      return () => {
          //alert("Bye");
      };
  }, []);


  const redirectToTokenListing = (type: string) => {
    alert(type)
    navigate("/admin/issuer/setToken", {state:{type: type}});
  }


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
                        

            <li data-username="" className="nav-item" onClick={ () => redirectToTokenListing("ICO") }>
                <Link to={''}>
                    <span className="pcoded-micon">
                        <i className="feather icon-monitor"></i>
                    </span>
                    <span className="pcoded-mtext">
                        ICO / ERC20 Tokens
                    </span>
                </Link>
            </li>  


            <li data-username="" className="nav-item" onClick={ () => redirectToTokenListing("Security") } >
                <Link to="">
                    <span className="pcoded-micon">
                        <i className="feather icon-monitor"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Security Tokens
                    </span>
                </Link>
            </li>  


            <li data-username="" className="nav-item" onClick={ () => redirectToTokenListing("NFT") }>
                <Link to={""}>
                    <span className="pcoded-micon">
                        <i className="feather icon-monitor"></i>
                    </span>
                    <span className="pcoded-mtext">
                        NFT
                    </span>
                </Link>
            </li>  


            <li data-username="" className="nav-item" >
                <Link to={`/admin/issuer/investorList`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-cloud-snow"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Holders
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