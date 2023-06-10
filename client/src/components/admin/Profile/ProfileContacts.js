import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import { useForm } from "react-hook-form";
import commons from "../../common/commons";

export default function ProfileContacts() {

    // confirmation Button 
    const [confirmationMessage, setConfirmationMessage] = React.useState("");    
    const [confirmationModelShow, setConfirmationModelShow] = React.useState(false);        
    const [conformationOption, setConformationOption] = React.useState({});                
    function confirmationOK() {
        if(conformationOption.option == 1) {
            setShowContactLoading(true);
            axios.post("/accounts/backend/deleteContact", {id: conformationOption.id}).then(response => {
                setUserContacts ( response.data.userContacts )
                setShowContactLoading(false);
            }).catch(function(error) {
                console.log(error);
            });            
        }

        setConfirmationModelShow(false);
    }

    const [profileErrorMessages, setProfileErrorMessages] = useState("");    
    // Contacts information
    const [userContacts, setUserContacts] = useState([]); 
    const [operation, setOperation] = useState(0);        
    const [mobileTypes, setMobileTypes] = useState([]);        
    const [contactModelShow, setContactModelShow] = useState(false);
    const [showContactLoading, setShowContactLoading] = useState(false);         
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    function openEditContact() {
        setOperation(1);
        setProfileErrorMessages("")
        reset({});
        setContactModelShow(true);
    }
    const deleteContactDataForm = value => () => {

        setConformationOption({
            "option": 1,
            id: value
        })
        setConfirmationMessage("Are you sure you want to delete ?");
        setConfirmationModelShow(true);
    };
    const editContactDataForm = value => () => {
        setShowContactLoading(true);
        setProfileErrorMessages("")
        axios.get("/accounts/backend/getContactRecord?id=" + value, {}).then(response => {
            reset(response.data);
            setShowContactLoading(false);
            setContactModelShow(true);    
            setOperation(2);        
        }).catch(function(error) {
            console.log(error);
        });
    }
    const onFormSubmit = (data) => {
        setContactModelShow(false);
        setShowContactLoading(true);

        var link = "/accounts/backend/addContact";
        if( operation == 2 )
            link = "/accounts/backend/editContact";

        axios.post(link, data).then(response => {

            if(response.data.status === -1) {
                setProfileErrorMessages(  commons.getDBErrorMessagesText(response.data.error)   );
            } else {
                setUserContacts ( response.data.userContacts );
                reset();
                setShowContactLoading(false);
            }

        }).catch(function(error) {
            console.log(error);
        });                
    }

    React.useEffect(() => {
        axios.get("/accounts/backend/getProfileContacts").then(response => {
            setUserContacts ( response.data.userContacts );
            setMobileTypes ( response.data.mobileTypes );            
        }).catch(function(error) {
            console.log(error);
        });   

        return () => {
          
        };
    }, []);

    return (  
        <div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                            <div className='card-header header-color'>
                                <div className="row">
                                    <div className="col-10">
                                        <h5> <img src="/img/contacts.png" height="25px"></img> &nbsp; My Contacts</h5>
                                        <span className="d-block m-t-5">Your contact list including phone numbers, fax numbers etc.</span>
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
                                            <div className="col-xl-4">
                                                <img src="/img/edit.png" className="listIconImage" onClick={editContactDataForm(dat.id)}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img src="/img/delete.png" className="listIconImage" onClick={deleteContactDataForm(dat.id)}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                {dat.title}
                                            </div>                                            
                                            <div className="col-xl-8">
                                                {dat.contact}
                                            </div>                                        
                                        </div>
                                        <br />
                                    </span> 
                                )}

                                {userContacts.length == 0 && <span>No records found </span>}

                            </div>
                            
                        { showContactLoading && ( <Loading message="Updating Contact" /> ) }
                    </div>
                </div>
            </div>

            <Modal size="lg" show={contactModelShow} onHide={() => setContactModelShow(false)}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>

                    <Modal.Header closeButton>
                    <Modal.Title> <img src="/img/contacts.png" height="30px"></img> &nbsp; Add / Edit Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />
                            <div>
                                <div className="row">

                                        <span className="ErrorLabel">{profileErrorMessages}</span>

                                        <div className="row">
                                            <div className="col-md-2"> Contact </div>
                                            <div className="col-md-10">
                                                <div className="form-group">
                                                    
                                                    <Form.Field>
                                                        <input type="text" className="form-control" placeholder="Enter Title" 
                                                            id="contact"  
                                                            name="contact"
                                                            {...register("contact", { required: true, minLength: 5, maxLength: 100 })}                                                        
                                                        />   
                                                    </Form.Field>
                                                    {errors.contact && <p className="ErrorLabel">Contact is required (min 5, max 100 characters)</p>}
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

                                </div>
                            </div>
                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="vk" size="tiny" type="submit">Save</Button>
                    &nbsp;&nbsp;
                    <Button color="red" size="tiny" type="button" onClick={() => setContactModelShow(false)}>Close</Button>
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