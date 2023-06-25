import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Documents from "../documents";
import Paras from "../paras";
import Contacts from "../Contacts"


export default function Dashboard() {
    const location = useLocation();
    const [tokenID, setTokenID] = useState("");
    const [tokenRecord, setTokenRecord] = useState([]);    

    React.useEffect(() => {
        setTokenID( location.state.id );

        axios.get("/accounts/token/gettoken?id=" + location.state.id).then(response => {
            setTokenRecord(response.data);
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
            //alert("Bye");
        };
    }, []);

    const backList = () => {

    }

    return (          
        <div>

            <div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-xl-10">
                                        <h5><img src="/img/token.png" width="33px"/> &nbsp; Tokens List</h5>
                                    </div>
                                    <div className="col-xl-2">
                                    <Link to="/adminmain/token" 
                                    > <Button color="vk" size='tiny'>Back to Token List</Button> </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-block table-border-style">

                                    {tokenRecord.Title}
                                    <br />
                                    {tokenRecord.Details}
                                    <br />
                                    {tokenRecord.isdeloyed && (
                                        <span>Yes deployed </span>
                                    )}

                                    {!tokenRecord.isdeloyed && (
                                        <span>No deployed </span>
                                    )}

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Paras 
                id={location.state.id} 
                typePara="2"
                caption="List of Token Paragraphs" 
                sectionHelperText="Set your token Paragraphs"                
                icon = "contacts.png"                                                 
            ></Paras>
            <Contacts 
                id={location.state.id} 
                contactType="2"
                caption="List of Token Contacts" 
                sectionHelperText="Set your token contacts"                
                icon = "contacts.png"                                 
            ></Contacts>
            <Documents 
                id={location.state.id} 
                caption="List of Token Document"
                typeDocuments="3"
                destination="2"
                buttonCaption="Upload Document"
                icon = "document.png"
                uploadDialogMessage="Upload Document"
                sectionHelperText="Please uplaod documents for uploading in cloud"
            ></Documents>

            <Documents 
                id={location.state.id} 
                caption="List of Company Images"
                typeDocuments="4"
                destination="2"                
                buttonCaption="Upload Image"   
                icon = "image.png"           
                uploadDialogMessage="Upload Image"                  
                sectionHelperText="Please uplaod images for uploading"                
            ></Documents>

        </div>
    );

}