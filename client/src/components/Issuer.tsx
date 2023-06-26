import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./issuer/Dashboard";
import Items from "./issuer/test/Items";
import Test from './issuer/test/Example2';
import $ from 'jquery';

import SendEmail from "./issuer/Inbox/SendEmail.js"
import Inbox from "./issuer/Inbox/Inbox"
import ViewInbox from "./issuer/Inbox/ViewInbox"
import Company from "./issuer/Company/Company.js"
import AddCompany from "./issuer/Company/Add.js"
import EditCompany from "./issuer/Company/Edit.js"
import Token from "./issuer/Token/Token"
import ViewToken from "./issuer/Token/View"

import InvestorList from "./issuer/investor/list"



export default function Issuer() {

    React.useEffect(() => {
        return () => {

        };
    }, []);


    return (
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
    );

}
