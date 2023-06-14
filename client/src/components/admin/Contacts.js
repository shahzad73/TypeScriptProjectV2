import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../common/loading"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from "react-hook-form";
import commons from "../common/commons";


export default function ProfileContacts(params) {

    // confirmation Button 
    const [confirmationMessage, setConfirmationMessage] = React.useState("");    
    const [confirmationModelShow, setConfirmationModelShow] = React.useState(false);        
    const [conformationOption, setConformationOption] = React.useState({});                
    function confirmationOK() {
        setConfirmationModelShow(false);
        setShowContactLoading(true);
        axios.post("/accounts/company/deleteContact", {id: conformationOption.id, recordID: recordID, type: contactType }).then(response => {
            setUserContacts ( response.data.userContacts )
            setShowContactLoading(false);
        }).catch(function(error) {
            console.log(error);
        });
    }

    // Contacts information
    const [recordID, setRecordID] = useState(0);    
    const [userContacts, setUserContacts] = useState([]);    
    const [mobileTypes, setMobileTypes] = useState([]);        
    const [contactModelShow, setContactModelShow] = useState(false);
    const [showContactLoading, setShowContactLoading] = useState(false);         
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [operation, setOperation] = useState(0);        
    const [editID, setEditID] = useState(0);      
    const [errorMessages, setErrorMessages] = useState("");
    const [contactType, setContactType] = useState(0);        
    const [caption, setCaption] = useState("");
    const [sectionHelperText, ssetSectionHelperText] = useState("");
    const [icon, setIcon] = useState("");        
        
    function openEditContact() {
        reset({"nameOfPerson": "", "contact": ""});
        setOperation(0);
        setErrorMessages("");
        setContactModelShow(true);
        reset({});
    }

     

    const deleteContactDataForm = value => () => {
        setConfirmationMessage("Are you sure you want to delete ?");
        setConformationOption({ id: value });
        setConfirmationModelShow(true);
    };

    const onFormSubmit = (data) => {
        setShowContactLoading(true);

        data.recordID = recordID;
        data.type = contactType
        var link = "/accounts/company/addContact";
        if(operation == 1) {
            data.id = editID;
            link =  "/accounts/company/editCompanyContact";
        }

        axios.post(link, data).then(response => {
            if(response.data.status == -1) {
                setErrorMessages(  commons.getDBErrorMessagesText(response.data.error) );
                setShowContactLoading(false);
            } else {
                setContactModelShow(false);
                setUserContacts ( response.data.userContacts );
                setShowContactLoading(false);
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    const openEditButton = value => () => {
        setOperation(1);
        setEditID(value);
        setErrorMessages("");
        axios.get(`/accounts/company/getCompanyContact?id=${value}&recordID=${recordID}`).then(response => {
            reset(response.data);
            setContactModelShow(true);
        }).catch(function(error) {
            console.log(error);
        });
    }

    React.useEffect(() => {
        setRecordID(params.id);
        setContactType(params.contactType);
        setCaption(params.caption);
        ssetSectionHelperText(params.sectionHelperText);
        setIcon("/img/" + params.icon);

        axios.get("/accounts/company/getdetails?id=" + params.id + "&type=" + params.contactType).then(response => {
            setMobileTypes ( response.data.mobileTypes );        
            setUserContacts ( response.data.userContacts );
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
          
        };
    }, []);

    return (  
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-10">
                                    <h5><img src={icon} width="28px"/> &nbsp; {caption} </h5>
                                    <span className="d-block m-t-5">{sectionHelperText}</span>                                    
                                </div> 
                                <div className="col-2">
                                    <Button onClick={openEditContact} color="vk" size='tiny'>New Contact</Button>
                                </div>                                
                            </div>   
                        </div>
                        <div className="card-block table-border-style">

                            {userContacts && userContacts.map(dat =>                                    
                                <span>
                                    <div className="row">
                                        <div className="col-xl-2"> 
                                                <img src="/img/edit.png" className="listIconImage" onClick={openEditButton(dat.id)} ></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img src="/img/delete.png" className="listIconImage" onClick={deleteContactDataForm(dat.id)}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                        <div className="col-xl-2">
                                            {dat.title}
                                        </div>                                            
                                        <div className="col-xl-4">
                                            {dat.contact}
                                        </div>
                                        <div className="col-xl-4">
                                            {dat.nameOfPerson}
                                        </div>
                                    </div>
                                    <br />
                                </span> 
                            )}

                        </div>
                        
                    { showContactLoading && ( <Loading message="Updating Contact" /> ) }
                </div>
            </div>

            <Modal size="lg" show={contactModelShow} onHide={() => setContactModelShow(false)}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <Modal.Header closeButton>
                    <Modal.Title><img src="/img/contacts.png" width="33px"/> &nbsp;   Add / Edit Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />
                        <div>
                            <div className="row">

                            <span className="ErrorLabel">{errorMessages}</span>
                            
                                <div className="row">
                                    <div className="col-md-2"> Person Name </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="nameOfPerson"  
                                                    name="nameOfPerson"
                                                    {...register("nameOfPerson", { required: true, minLength:5, maxLength: 100 })}    
                                                />   
                                            </Form.Field>
                                            {errors.nameOfPerson && <p className="ErrorLabel">Person Name is required (min 5, max 100 characters) </p>}
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-2"> Type </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                                <Form.Field>
                                                    <select 
                                                    id="contactTypeID"  
                                                    name="contactTypeID"
                                                    {...register("contactTypeID")} 
                                                    className="form-control form-select">
                                                        { mobileTypes && mobileTypes.map(dat =>
                                                            <option value={dat.id} label={dat.title} />
                                                        )}
                                                    </select>
                                                </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-2"> Contact </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="contact"  
                                                    name="contact"
                                                    {...register("contact", { required: true, minLength:5, maxLength: 100 })}
                                                />   
                                            </Form.Field>
                                            {errors.contact && <p className="ErrorLabel">contact is required (min 5, max 100 characters) </p>}
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                            </div>
                        </div>
                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="vk" type="submit" size="tiny">Save</Button>
                    &nbsp;&nbsp;
                    <Button color="red" type="button" size="tiny" onClick={() => setContactModelShow(false)}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal size="me" show={confirmationModelShow} onHide={() => setConfirmationModelShow(false)}>

                <Modal.Header closeButton>
                <Modal.Title> <img src="/img/messagebox.png" width="25px"></img> Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />
                    
                    <div className="row">
                        <div className="col-md-12">
                            {confirmationMessage}
                        </div>
                    </div>

                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="vk" size="tiny" onClick={confirmationOK}>Yes</Button>
                &nbsp;&nbsp;
                <Button color="red" size="tiny" onClick={() => setConfirmationModelShow(false)}>Close</Button>
                </Modal.Footer>

            </Modal>            
        </div>
    );

}

