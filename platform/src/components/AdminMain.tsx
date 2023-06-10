import React, { useState, useContext } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import $ from 'jquery';
import axios from 'axios';
import SideBar from './admin/sidebar';

import Dashboard from "./admin/Dashboard";
import Update from "./admin/management/Update";
import UpdateNew from "./admin/management/Update-New";
import Items from "./admin/test/Items";
import AppContext from './common/AppContext';
import Accounts from './admin/management/Accounts';
import AccountsView from "./admin/management/AccountsView.js";
import SendEmail from "./admin/Inbox/SendEmail.js"
import Inbox from "./admin/Inbox/Inbox.js"
import ViewInbox from "./admin/Inbox/ViewInbox.js"

import Test from './admin/test/Example2';


export default function Main() {

    const appContext = useContext(AppContext);
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

    async function Logout() {
        appContext.globalSetJwtToken( "" ); 
        navigate('/', { replace: true })
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

            /*axios.interceptors.response.use(
                config => {
                return config
                },
                error => {
                return Promise.reject(error);
                }
            );*/            
        }        


        return () => {
            //alert("Bye");
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
                        <li className="nav-item">
                            <h3>Dashboard</h3>
                        </li>
                    </ul>
       
                    <ul className=" navbar-nav  float-right">
                        <li>
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
                                        <Route path="/update" element={<Update />} />    
                                        <Route path="/addNewUpdate" element={<UpdateNew />} />
                                        <Route path="/accounts" element={<Accounts />} />     
                                        <Route path="/viewaccounts" element={<AccountsView />} />
                                        <Route path="/items" element={<Items />} /> 
                                        <Route path="/test" element={<Test />} /> 
                                        <Route path="/sendemail" element={<SendEmail />} />
                                        <Route path="/inbox" element={<Inbox />} />
                                        <Route path="/viewinbox" element={<ViewInbox />} />
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
