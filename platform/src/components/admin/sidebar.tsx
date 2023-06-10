import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Main() {

  React.useEffect(() => {
      return () => {
          //alert("Bye");
      };
  }, []);


  return (  
    <div><nav>
        <ul className="nav pcoded-inner-navbar">
            <li data-username="" className="nav-item" >
                <NavLink to={`/platformmain`}>
                    <span className="pcoded-micon">
                        <i className="feather icon-file-text"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Dashboard
                    </span> 
                </NavLink>
            </li>

            <li data-username="" className="nav-item">
                <NavLink to={`/platformmain/update`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-file-text"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Update
                    </span>
                </NavLink>
            </li>

            <li data-username="" className="nav-item">
                <Link to={`/platformmain/accounts`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-file-text"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Accounts
                    </span>
                </Link>
            </li>


            <li data-username="" className="nav-item">
                <Link to={`/platformmain/sendemail`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-file-text"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Send Email
                    </span>
                </Link>
            </li>      


            <li data-username="" className="nav-item">
                <Link to={`/platformmain/inbox`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-file-text"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Inbox
                    </span>
                </Link>
            </li>              



            <li data-username="" className="nav-item">
                <Link to={`/platformmain/items`} >
                    <span className="pcoded-micon">
                        <i className="feather icon-file-text"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Items
                    </span>
                </Link>
            </li>  

            <li data-username="" className="nav-item">
                <Link to={`/platformmain/test`}>
                    <span className="pcoded-micon">
                        <i className="feather icon-file-text"></i>
                    </span>
                    <span className="pcoded-mtext">
                        Test
                    </span>
                </Link>
            </li>      
            

        </ul>
        </nav></div>
  );

}