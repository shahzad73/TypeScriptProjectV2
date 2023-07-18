import React, { useContext, useState } from "react";
import MyAppContext  from './common/AppContext';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import Issuer from "./Issuer";
import Holder  from './Holder';
import ShareAdmin from './AdminShared';

import SharedSidebar from './shared/SharedSidebar';
import IssuerSidebar from './issuer/IssuerSidebar';
import InvestorSidebar from './holders/InvestorSidebar';
import Commons from './common/Commons';
import Public_Enums_Constants from "./common/Public_Enums_Constants";


import $ from 'jquery';
import { Label } from "semantic-ui-react";

import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useDashboardNavigateHook } from "./common/useDashboardNavigateHook";


export default function Admin() {

    const appContext = useContext(MyAppContext);
    const navigate = useNavigate();

    const [floatNAVBar, setFloatNAVBar] = useState(true);

    const dashboardNavigationhook = useDashboardNavigateHook();


    function toggleNavbarFloat() {
        setFloatNAVBar( !floatNAVBar );
        if( floatNAVBar == true) {
            $("#navBarFloatNAV").addClass("navbar-collapsed");
            $("#mobile-collapse").addClass("on");            
        } else {
            $("#navBarFloatNAV").removeClass("navbar-collapsed");        
            $("#mobile-collapse").removeClass("on");            
        }
    }

    async function RedirectHomePage() {
        navigate('/', { replace: true })        
    }

    async function Logout() {
        appContext.globalSetJwtToken( "" );         
        localStorage.removeItem("siteJWTTokenString");
        navigate('/', { replace: true })
    };

    async function myProfile() {
        dashboardNavigationhook(Public_Enums_Constants.DASHBOARD.Shared, "profile");
    };

    function switchDashboard() {
        if(appContext.currentSideMenu === Public_Enums_Constants.DASHBOARD.Shared || appContext.currentSideMenu === Public_Enums_Constants.DASHBOARD.Holder ) {
            dashboardNavigationhook(Public_Enums_Constants.DASHBOARD.Issuer, "")
        } else if (appContext.currentSideMenu === Public_Enums_Constants.DASHBOARD.Issuer) {
            dashboardNavigationhook(Public_Enums_Constants.DASHBOARD.Holder, "")
        }                                    
    }


    axios.defaults.baseURL = Commons.getLinkToAPIServer();
    var interceptors: any;
    React.useEffect(() => {
        if(appContext.jwtToken == "") {
            navigate('/', { replace: true })
        }

        if( interceptors == null ) {
            interceptors = axios.interceptors.request.use( 
                function (req) {
                    if(appContext.jwtToken != "") {
                        req.headers.authorization = `Bearer ${appContext.jwtToken}`;
                    }

                    return req;
                },  
                function (error) {
                    return Promise.reject(error);
                }
            );        
            
        }

        return () => {
            axios.interceptors.request.eject(interceptors);
        };
    }, []);


    return (
      <div>
        <>
                <nav id="navBarFloatNAV" className="pcoded-navbar">
                    <div className="navbar-wrapper">
                        <div className="navbar-brand header-logo">
                            <a href="index.html" className="b-brand">
                                <div className="b-bg">
                                    <i className="feather icon-trending-up"></i>
                                </div>
                                <span className="b-title">iNFTMaker</span>
                            </a>
                            <a className="mobile-menu" style={{"cursor": "pointer"}} id="mobile-collapse" onClick={toggleNavbarFloat} ><span></span></a>
                        </div>
                        <div className="navbar-content scroll-div" style={{overflow: "auto"}}>
                            { appContext.currentSideMenu == 1 && <SharedSidebar /> }
                            { appContext.currentSideMenu == 2 && <IssuerSidebar /> }
                            { appContext.currentSideMenu == 3 && <InvestorSidebar /> }                                                        
                        </div>
                    </div>
                </nav>

                <header className="navbar pcoded-header navbar-expand-lg navbar-light">
                    <div className="m-header">
                        <a className="mobile-menu" id="mobile-collapse1" href="javascript:"><span></span></a>
                        <a href="index.html" className="b-brand">
                            <div className="b-bg">
                                <i className="feather icon-trending-up"></i>
                            </div>
                            <span className="b-title">Datta Able</span>
                        </a>
                    </div>
                    <a className="mobile-menu" id="mobile-header" href="javascript:">
                        <i className="feather icon-more-horizontal"></i>
                    </a>


                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                { appContext.currentSideMenu == 1 && <h3>Dashboard</h3> }
                                { appContext.currentSideMenu == 2 && <h3>Issuer Dashboard</h3> }
                                { appContext.currentSideMenu == 3 && <h3>HOlder Dashboard</h3> }
                            </li>
                            <li className="nav-item dropdown">
                                <span className="pcoded-mtext" onClick={switchDashboard}>
                                    <Label color='red' size="medium" horizontal>
                                            { appContext.currentSideMenu == 1 && <span>Switch to Issuer Dashboard</span> }
                                            { appContext.currentSideMenu == 2 && <span>Switch to Holder Dashboard</span> }
                                            { appContext.currentSideMenu == 3 && <span>Switch to Issuer Dashboard</span> }
                                    </Label>
                                </span>
                            </li>
                        </ul>

                        <ul className=" navbar-nav  float-right">
                            <li>
                                Welcome {appContext.loginUserName}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;                                                           
                                <span onClick={RedirectHomePage} style={{cursor: "pointer"}} >Home Page</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                <img src="/img/profile.png" height="26px;"  data-toggle="tooltip" data-placement="top" title="View my Profile" onClick={myProfile} style={{cursor: "pointer"}}/>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <img src="/img/logout.png" height="22px;"  data-toggle="tooltip" data-placement="top" title="Logout" onClick={Logout} style={{cursor: "pointer"}}/>
                            </li>                    
                        </ul>
                    </div>

                </header>

                <Routes>
                    <Route path="/share/*" element={<ShareAdmin />} />
                    <Route path="/issuer/*" element={<Issuer />} />
                    <Route path="/holder/*" element={<Holder />} />
                </Routes>

        </>

      </div>
    );

}

