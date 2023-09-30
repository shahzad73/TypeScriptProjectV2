import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./issuer/Dashboard";
import Items from "./issuer/test/Items";
import Test from './issuer/test/Example2';
import $ from 'jquery';

import SendEmail from "./shared/Inbox/SendEmail.js"
import ViewInbox from "./shared/Inbox/ViewInbox"
import Company from "./issuer/Company/Company.js"
import AddCompany from "./issuer/Company/Add.js"
import EditCompany from "./issuer/Company/Edit.js"
import TokenList from "./issuer/Token/TokenList"
import ViewToken from "./issuer/Token/View"
import TokenHolders from "./issuer/Token/TokenHolders"
import Deploy from "./issuer/Token/Deploy"
import CAP from "./issuer/Token/CAP"


import InvestorList from "./issuer/holder/list"
import InvestorView from "./issuer/holder/view/InvestorView"
 

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
                                        <Route path="/viewinbox" element={<ViewInbox />} />   
                                        <Route path="/company" element={<Company />} />   
                                        <Route path="/addcompany" element={<AddCompany />} />  
                                        <Route path="/editcompany" element={<EditCompany />} />
                                        <Route path="/token" element={<TokenList />} />     
                                        <Route path="/tokenview" element={<ViewToken />} />
                                        <Route path="/tokenholders" element={<TokenHolders />} />                                        
                                        <Route path="/tokendeploy" element={<Deploy />} />                                                                                
                                        <Route path="/tokencap" element={<CAP />} />                                                                                                                        

                                        <Route path="/investorList" element={<InvestorList />} />
                                        <Route path="/investorView" element={<InvestorView />} />
                                    </Routes>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
    );

}
