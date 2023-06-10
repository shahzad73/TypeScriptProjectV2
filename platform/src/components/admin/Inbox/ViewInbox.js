import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import commons from "../../common/commons";
import Modal from "react-bootstrap/Modal";
import AppContext from '../../common/AppContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Loading from '../../common/loading';
import CustomTextEditor from "../../common/CustomTextEditor"

 
export default function ViewInbox(props) {

    const navigate = useNavigate();
    const location = useLocation()

    const [emailData, setEmailData] = useState({});
    const [userData, setUserData] = useState({});    
    const [showResposeSection, setShowResposeSection] = useState(false);    
    const [htmlText, setHtmlText] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        setShowLoading(true);
        data.details = htmlText;
        data.userID = emailData.UserID;
        data.ID = emailData.ID;        
        setShowLoading(true);

        axios.post("/platform/others/respondEmail", data).then(response => {
            setShowLoading(false);

            if(response.data.status == 0) {
                alert("Error sending email. Please contact administrator")
            } else {
                navigate('/platformmain/inbox', { replace: true });
            }
        }).catch(function(error) {
            console.log(error);
        });

    }

    function cancel() {
        navigate('/platformmain/inbox', { replace: true })
    } 


    function textEditorTextChangeEvent(data) {
        setHtmlText(data)
    }    


    React.useEffect(() => {   
        
            const id = location.state.id;

            axios.get("/platform/others/getInboxDetails?id=" + id).then(response => {  
                response.data.email.RETitle = "RE: " + response.data.email.Title;
                setEmailData( response.data.email );
                setUserData ( response.data.user );

                reset ({
                    "Title": response.data.email.RETitle,
                });                

                if(  response.data.email.isResponded === 0  ) {
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

                        {userData.firstname} {userData.lastname}
                        <br />
                        {userData.email}

                        <br /><br />


                        {emailData.Title}
                        <br />
                        <span dangerouslySetInnerHTML={   {__html: emailData.Details}    }></span>                        
                        <br /><br />
                        <span dangerouslySetInnerHTML={   {__html: emailData.email}    }></span>                                                
                        <br />

                        { !showResposeSection && (
                            <span>
                                
                                <Form onSubmit={handleSubmit(onFormSubmit)}>

                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label>Title</label>
                                                <Form.Field>
                                                    <input type="text" className="form-control" placeholder="Enter Title" 
                                                        id="Title"  
                                                        name="Title"
                                                        defaultValue={emailData.RETitle}
                                                        {...register("Title", { required: true, maxLength: 500 })}
                                                        />
                                                </Form.Field>
                                                {errors.TITLE && <p>Please enter title</p>}
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <CustomTextEditor                                                 
                                                            defaultHTML={htmlText}  
                                                            onChange={textEditorTextChangeEvent} 
                                                            height="100px" 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-1"></div>
                                            </div>                                        

                                        </div>
                                    </div>
                                    {showLoading}

                                    { !showLoading && (
                                        <span><br />
                                        <Button color="vk" size="tiny" type='submit'>Send</Button> 
                                        &nbsp;&nbsp;&nbsp; 
                                        <Button color="red"  size="tiny"  onClick={cancel}>Back</Button> 
                                        <br /></span>
                                        )
                                    }
                                    
                                    { showLoading && ( <Loading message="Sending Email" /> ) }

                                </Form>


                            </span>
                        )}


                        { showResposeSection && (
                            <span>
                                <span dangerouslySetInnerHTML={   {__html: emailData.Response}    }></span>                                                                                
                                <br /> <br />
                                <Button  color="vk" size="tiny" onClick={cancel}>Back</Button> 
                            </span>
                        )}

                    </div>
                </div>
            </div>
        </div>

    );

}