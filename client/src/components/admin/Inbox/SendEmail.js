import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../../common/loading';
import commons from "../../common/commons";
import Modal from "react-bootstrap/Modal";
import CustomTextEditor from "../../common/CustomTextEditor"


export default function SendEmail() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();    
    const [showLoading, setShowLoading] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");    
    const [textBoxErrorMessage, setTextBoxErrorMessage] = useState("");

    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();


    const [htmlText, setHtmlText] = useState("");
    function textEditorTextChangeEvent(data) {
        setHtmlText(data)
    }

    const onFormSubmit = (data) => {

        var tmp = htmlText;
        tmp = tmp.replace(/<[^>]*>?/gm, '');

        if(htmlText.length < 100) {
            setTextBoxErrorMessage("Please enter your email or email should have more than 100 characters");
            return;
        }
        if(htmlText.length > 8000) {
            setTextBoxErrorMessage("Email is too long, please enter less than 8000 characters");            
            return;
        }

        setShowLoading(true);
        data.Details = htmlText;

        axios.post("/accounts/others/sendEmail", data).then(response => {
            setShowLoading(false);
            if(response.data.id == -1) {
                setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                setShowErrorMessage(1)
            } else                
                navigate('/adminmain/inbox', { replace: true });

        }).catch(function(error) {
            console.log(error);
        });

    }

    function cancel() {
        navigate('/adminmain/inbox', { replace: true })
    } 

    function handleCloseErrorMessage() {
        setShowErrorMessage(0)
    }    

    React.useEffect(() => {

        return () => {
            //alert("Bye");
        };
    }, []);


    return (          
        <div>

                <div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5><img width="30px" src="/img/emailclosed.jpg"></img> &nbsp;  Send Email</h5>
                                </div>
                                <div className="card-block table-border-style">

                                    <Form onSubmit={handleSubmit(onFormSubmit)}>

                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <Form.Field>
                                                        <input type="text" className="form-control" placeholder="Enter Title" 
                                                            id="Title"  
                                                            name="Title"
                                                            defaultValue={inputs.Title}
                                                            {...register("Title", { required: true, maxLength: 100 })}
                                                            />
                                                    </Form.Field>
                                                    {errors.Title && <p className="ErrorLabel" >Please enter title</p>}
                                                </div>
                                                
                                                <br />
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <CustomTextEditor                                                 
                                                                defaultHTML={""}  
                                                                onChange={textEditorTextChangeEvent} 
                                                                height="100px" 
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1"></div>
                                                </div>     
                                                <p className="ErrorLabel" >{textBoxErrorMessage}</p>                                         

                                            </div>
                                        </div>
                                        {showLoading}

                                        { !showLoading && (
                                            <span><br />
                                            <Button color="vk" size="tiny" type='submit'>Send</Button> 
                                            &nbsp;&nbsp;&nbsp; 
                                            <Button color="red" size="tiny" type="button" onClick={cancel}>Cancel</Button> 
                                            <br /></span>
                                            )
                                        }
                                        
                                        { showLoading && ( <Loading message="Sending Email" /> ) }

                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>         



            <Modal  show={showErrorMessage} onHide={handleCloseErrorMessage}>
                <Modal.Header closeButton>
                <Modal.Title>Update Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    Errors occurred on server while adding new record
                    <br /><br />
                    {errorMessage}                      
                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button positive onClick={handleCloseErrorMessage}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>                                   

        </div>
    );

}
