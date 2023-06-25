import React, { useState, useContext } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Dashboard from "./issuer/Dashboard";
import Profile from "./issuer/Profile/Profile";
import Items from "./issuer/test/Items";
import MyAppContext from './common/AppContext';
import SideBar from './issuer/sidebar';
import Test from './issuer/test/Example2';
import $ from 'jquery';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import SendEmail from "./issuer/Inbox/SendEmail.js"
import Inbox from "./issuer/Inbox/Inbox"
import ViewInbox from "./issuer/Inbox/ViewInbox"
import Company from "./issuer/Company/Company.js"
import AddCompany from "./issuer/Company/Add.js"
import EditCompany from "./issuer/Company/Edit.js"
import Token from "./issuer/Token/Token"
import ViewToken from "./issuer/Token/View"

import InvestorList from "./issuer/investor/list"
import { Label } from "semantic-ui-react";



export default function Issuer() {

    const appContext = useContext(MyAppContext);
    const navigate = useNavigate();
    const [floatNAVBar, setFloatNAVBar] = useState(true);


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
        navigate('/admin/issuer/profile', { replace: true })
    };


    axios.defaults.baseURL = 'http://localhost:7000'; 
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
                         <SideBar />
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
                            <h3>Issuer Dashboard</h3>
                        </li>
                        <li className="nav-item dropdown">
                            <Link to={`/admin/investor`}>
                                <span className="pcoded-mtext">
                                    <Label color='red' size="medium" horizontal>
                                            Switch to Investor
                                    </Label>
                                </span>                               
                            </Link>                          
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

            <div className="pcoded-main-container">
                <div className="pcoded-wrapper">
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">

                            <div className="main-body">
                                <div className="page-wrapper">
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/items" element={<Items />} /> 
                                        <Route path="/test" element={<Test />} /> 
                                        <Route path="/profile" element={<Profile />} />   
                                        <Route path="/sendemail" element={<SendEmail />} />
                                        <Route path="/inbox" element={<Inbox />} />
                                        <Route path="/viewinbox" element={<ViewInbox />} />   
                                        <Route path="/company" element={<Company />} />   
                                        <Route path="/addcompany" element={<AddCompany />} />  
                                        <Route path="/editcompany" element={<EditCompany />} />
                                        <Route path="/token" element={<Token />} />     
                                        <Route path="/tokenview" element={<ViewToken />} />

                                        <Route path="/investorList" element={<InvestorList />} />
                                    </Routes>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
