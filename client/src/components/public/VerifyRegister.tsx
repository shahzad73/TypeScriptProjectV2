import React, { useState } from "react";
import { Button, Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import validator from "validator";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import commons from "../common/Commons";
import { useNavigate } from "react-router-dom";

export default function RecoverPassword() {
    // const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();    
    const { register, handleSubmit, formState: { errors } } = useForm();        

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");   
    const [showLoading, setShowLoading] = useState(false);     
    const navigate = useNavigate();
    

    const onFormSubmit = (data: any) => {

        if(!validator.isEmail(data.email)) {
            setErrorMessage("Email address is not correct");
            setShowErrorMessage(true);                  
            return;
        }

        setShowLoading(true);
        axios.post("/public/verifyregister", data).then(response => {
            if(response.data.id === -1) {
                setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                setShowErrorMessage(true);
                setShowLoading(false);
            } else {                
                setErrorMessage("Registration is successful. Please login now");
                setShowErrorMessage(true);
                navigate('/login', { replace: true });
            }
        }).catch(function(error) {
            setErrorMessage(  "Some network related error occurred. Please try again" )
            setShowErrorMessage(true)
        });         

    }


    function handleCloseErrorMessage() {
        setShowErrorMessage(false)
    }     


    React.useEffect(() => {
        //alert("Hello");

        return () => {
            //alert("Bye");
        };

    }, []);


    return (  
        <div> 
            <br /><br /><br />

            <div className="row justify-content-md-center">
                <div className="col-1" />
                <div className="col-10">        
                    <img src="img/register-banner.jpg" alt="banner" width="100%" height="200px" />
                </div>
                <div className="col-1"></div>
            </div>

            
            <div className="row justify-content-md-center">
                <div className="col-1">
                </div>
                <div className="col-3">
                    <br /><br /><br /><br />
                    <img src="img/register.jpg" alt="banner" width="100%" />
                </div>
                <div className="col-5">
                    <br />
                    <div className="section-title">
                    <h2>Verify New Account</h2>
                    <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fuga</p>
                    </div>

                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Form.Field>
                            <label>Enter Email Address</label>
                            <input 
                                placeholder='First Name' 
                                {...register("email", { required: true, maxLength: 150, minLength:5 })}
                            />
                        </Form.Field>
                        {errors.email && <p>Please enter Email with min 5 characters</p>}   


                        <br />                        
                        <Form.Field>
                            <label>Enter Password</label>
                            <input 
                                placeholder='Enter Password' 
                                {...register("password", { required: true, maxLength: 80, minLength:5 })}                                
                            />
                        </Form.Field>
                        {errors.password && <p>Please enter Password with min 5 characters</p>}   


                        <br />
                        <Form.Field>
                            <label>Enter Secret Code</label>
                            <input 
                                placeholder='Enter Secret Code' 
                                {...register("secret", { required: true, maxLength: 80, minLength:5 })}                                
                            />
                        </Form.Field>
                        {errors.secret && <p>Please enter Password with min 5 characters</p>}   

                        <br />
                        <Button positive type='submit'>Register</Button> 
                        {showLoading && ( <span><img alt="loading" src="/img/loadingdots2.gif" height="50px" /> Loading</span>  ) }

                    </Form>

                </div>
                <div className="col-3">
                </div>

            </div>


            <Modal show={showErrorMessage} onHide={handleCloseErrorMessage}>
                    <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
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