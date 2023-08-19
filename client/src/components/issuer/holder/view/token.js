import React, { useState, useContext } from "react";
import Profile from "./profile";
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function InvestorTokens() {    
    const location = useLocation();
    const [tokenNotHolder, setTokenNotHolder] = useState([]);    
    const [tokenHolder, setTokenHolder] = useState([]);        

    React.useEffect(() => {

        getDBData();

        return () => {
            //alert("Bye");
        };
    }, []);


    const addToToken = (id) => {
        const userid = location.state.id;

        axios.post("/accounts/holders/setHolderToken?user", {userid: userid, tokenid: id }).then(response => {
            getDBData();
        }).catch(function(error) {
            console.log(error);
        }); 
    }


    function getDBData() {
        const id = location.state.id;

        axios.get("/accounts/holders/getInvestorTokensList?userid=" +id).then(response => {
            setTokenNotHolder(response.data.tokenNotHolder);
            setTokenHolder(response.data.tokenHolder);            
        }).catch(function(error) {
            console.log(error);
        });      

    }


  return (  

        <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-xl-10">
                                    <h5><img width="30px" src="/img/emailclosed.jpg"></img> &nbsp;  Investor Tokens View</h5>
                                    <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                </div>

                            </div>
                        </div>
            

                        <div className="card-block table-border-style">

                            { tokenNotHolder && <span>

                                <b>Investor not part of token</b>
                                <br />
                                { tokenNotHolder.map(data => 

                                        <span>                                        
                                            <div className="row">
                                                <div className="col-xl-5"> 
                                                    {data.title}                                                               
                                                </div>
                                                <div className="col-xl-2">
                                                    <Button  onClick={() => addToToken(data.id) } >
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>                                      
                                        </span>

                                )}
                            
                                </span>
                            }



                            { tokenHolder && <span>
                                    <br /><br />
                                    <b>Investor part of token</b>
                                    <br />
                                    { tokenHolder.map(data => 

                                            <span>                                        
                                                <div className="row">
                                                    <div className="col-xl-5"> 
                                                        {data.title}                                                               
                                                    </div>
                                                </div>                                      
                                            </span>

                                    )}

                                    </span>
                            }


                        </div>
                    </div>  
                </div>
            </div>

  );    
}

