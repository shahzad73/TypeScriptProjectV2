import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AppContext from '../common/AppContext';



export default function MenuBar() {
  const appContext = useContext(AppContext);

  React.useEffect(() => {
      return () => {
          //alert("Bye");
      };
  }, []);


  return (  
      <header id="header" className="fixed-top d-flex align-items-center">
          <div className="container d-flex align-items-center">

          <div className="logo me-auto">
              <h1><a href="/">iNFTMaker</a></h1>
          </div>

          <nav id="navbar" className="navbar order-last order-lg-0">
              <ul>
                <li><Link to={`/`}>Home</Link></li>
                <li><Link to={`/login`}>Login</Link></li>
                <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                    <ul>
                    <li><a href="#">Drop Down 1</a></li>
                    <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                        <ul>
                        <li><a href="#">Deep Drop Down 1111</a></li>
                        <li><a href="#">Deep Drop Down 2</a></li>
                        <li><a href="#">Deep Drop Down 3</a></li>
                        <li><a href="#">Deep Drop Down 4</a></li>
                        <li><a href="#">Deep Drop Down 5</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Drop Down 2</a></li>
                    <li><a href="#">Drop Down 3</a></li>
                    <li><a href="#">Drop Down 4</a></li>
                    </ul></li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <div className="header-social-links d-flex align-items-center">
              <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
              <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>

          </div>
      </header>
  );

}