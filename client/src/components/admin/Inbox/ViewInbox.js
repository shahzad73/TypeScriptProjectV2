import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";


export default function ViewInbox(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const [emailData, setEmailData] = useState({});
    const [showResposeSection, setShowResposeSection] = useState(false);    


    function cancel() {
        navigate('/adminmain/inbox', { replace: true })
    } 

    React.useEffect(() => {   
        
            const id = location.state.id;

            axios.get("/accounts/others/detailsEmail?id=" + id).then(response => {  
                setEmailData( response.data );

                if(  response.data.isResponded === 0  ) {
                    setShowResposeSection(false);
                } else
                    setShowResposeSection(true);

            }).catch(function(error) {
                console.log(error);
            });     

        return () => {
            //alert("This is where when control is being transferred to another page");
        };

    }, []);


    return (

        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5><img width="30px" src="/img/emailclosed.jpg"></img> &nbsp;  View Inbox</h5>
                        <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                    </div>
                    <div className="card-block table-border-style">

                        <span style={{"font-size": "22px"}}> {emailData.Title} </span>
                        <br /><br />
                        <div  dangerouslySetInnerHTML={   {__html: emailData.Details}    }></div>
                        <br /><br /><br /><br />

                        <h4>Admin Response</h4>
                        { showResposeSection && (
                            <span>
                                <div  dangerouslySetInnerHTML={   {__html: emailData.Response}    }></div>
                                <br /><br />
                            </span>
                        )}

                        { !showResposeSection && (                    
                            <span> Not yet responded 
                            <br /><br />                            
                            </span>
                        )}

                        <Button color="vk" size="tiny" onClick={cancel}>Back</Button> 

                    </div>
                </div>
            </div>
        </div>

    );

}