import React from "react";
import {
  Link
} from "react-router-dom";

export default function Main() {

  React.useEffect(() => {
      return () => {
          //alert("Bye");
      };
  }, []);


  return (  
    <div>
        <ul class="nav pcoded-inner-navbar">
            <li data-username="" class="nav-item">
                <Link to={`/investor`} activeClassName="active">
                    <span class="pcoded-micon">
                        <i class="feather icon-alert-triangle"></i>
                    </span>
                    <span class="pcoded-mtext">
                        Dashboard
                    </span> 
                </Link>
            </li>
        </ul>
    </div>
  );

}