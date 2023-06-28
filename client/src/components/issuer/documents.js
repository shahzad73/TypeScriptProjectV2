import React, { useState } from "react";
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import commons from "../common/Commons";
import Loading from "../common/loading"
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Documents(params) {

    const [documentModelShow, setDocumentModelShow] = useState(false);      
    const [errorMessages, setErrorMessages] = useState("");       
    const [showContactLoading, setShowContactLoading] = useState(false);              
    const [userDocuments, setUserDocuments] = useState([]); 
    const [confirmationModelShow, setConfirmationModelShow] = useState(0);      
    const [isEditMode, setIsEditMode] = useState(false);              

    const {register, handleSubmit, reset, formState: { errors }} = useForm();     
    const [isFileIsUploaded, setIsFileIsUploaded] = useState(false);
    const [uploadedFile, setUploadedFile] = useState("");
    const [percent, setPercent] = useState(0); 
    const documentFilesUploadedEvent1 = (data) => {
        if(data.status == 0) {
            alert("Some issues uploading file. please try again")
        } else {
            setUploadedFile( data.file );
            setIsFileIsUploaded(true);
        }
    }

    // Configurations 
    const [recordID, setRecordID] = useState(0);  
    const [deleteRecordID, setDeleteRecordID] = useState(0);    
    const [typeDocuments, setTypeDocuments] = useState(0);  
    const [caption, setCaption] = useState("");  
    const [destination, setDestination] = useState("");  
    const [buttonCaption, setButtonCaption] = useState("");         
    const [icon, setIcon] = useState("");             
    const [uploadDialogMessage, setUploadDialogMessage] = useState("");     
    const [sectionHelperText, setSectionHelperText] = useState("");         
    
    React.useEffect(() => {
        setRecordID(params.id);
        setTypeDocuments(params.typeDocuments);
        setCaption(params.caption);
        setDestination(params.destination);
        setButtonCaption(params.buttonCaption);
        setIcon("/img/" + params.icon);
        setUploadDialogMessage(params.uploadDialogMessage);
        setSectionHelperText(params.sectionHelperText)

        setShowContactLoading(true);       
        axios.get(`/accounts/backend/getDocuments?recordID=${params.id}&type=${params.typeDocuments}`).then(response => {
            setUserDocuments ( response.data );
            setShowContactLoading(false);
        }).catch(function(error) {
            console.log(error);
        });

        return () => {

        };
    }, []);

    var openDocumentUpload = () => {
        setIsEditMode(false);
        setIsFileIsUploaded(false);
        setPercent(0);
        setUploadedFile("");
        setDocumentModelShow(true);
    }

    const onFormSubmit = (data) => {
        setShowContactLoading(true);
        reset();
        data.document = uploadedFile;
        data.recordID = recordID;
        data.destination = destination;
        data.type = typeDocuments;

        var link = `/accounts/backend/saveDocument`;
        if(isEditMode == true)
            link = `/accounts/backend/updateDocument`;

        axios.post(link, data).then(response => {
            if(response.data.status == -1) {
                setErrorMessages(  commons.getDBErrorMessagesText(response.data.error) );
                setShowContactLoading(false);
            } else {
                setUserDocuments ( response.data );
                setShowContactLoading(false);
                setDocumentModelShow(false);
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    const closeUploadDialog = () => {
        if(isFileIsUploaded == true && isEditMode == false) {   
            setShowContactLoading(true);         
            axios.post(`/accounts/backend/deleteUploadedfile`, {filename: uploadedFile, destination: destination}).then(response => {
                setShowContactLoading(false);
                setDocumentModelShow(false);
            }).catch(function(error) {
                console.log(error);
            });
        } else 
            setDocumentModelShow(false);
    }

    const openDeleteDIalog = (id) => {
        setDeleteRecordID(id);
        setConfirmationModelShow(true);
    }

    const editDocumentDialog = (id) => {
        setShowContactLoading(true);  

        axios.get(`/accounts/backend/getDocument?id=${id}`).then(response => {
            reset(response.data);
            setShowContactLoading(false);  
            setIsEditMode(true);
            setIsFileIsUploaded(true);
            setPercent(0);
            setUploadedFile("");
            setDocumentModelShow(true);            
        }).catch(function(error) {
            console.log(error);
        });
    }

    const confirmationOK = () => {
        setShowContactLoading(true);  

        axios.get(`/accounts/backend/deleteDocuments?id=${deleteRecordID}&recordID=${recordID}&type=${typeDocuments}`).then(response => {
            setUserDocuments ( response.data );
            setShowContactLoading(false);
            setConfirmationModelShow(false);
        }).catch(function(error) {
            console.log(error);
        });
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
                                        <h5><img src={icon} width="35px"></img> &nbsp; {caption}</h5>
                                        <span className="d-block m-t-5">{sectionHelperText}</span>
                                    </div>
                                    <div className="col-xl-2">
                                        <Button color="vk" onClick={openDocumentUpload}  size='tiny'> {buttonCaption} </Button>
                                    </div>
                                </div>

                            </div>
                            <div className="card-block ">

                                {userDocuments.map(data => {
                                    return (
                                            <span>                               
                                                <div className="row">   
                                                    <div className="col-xl-2">  
                                                            <img src="/img/edit.png" onClick={()=> editDocumentDialog(data.id)}  className="listIconImage"></img>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <img src="/img/delete.png" onClick={() => openDeleteDIalog(data.id)} className="listIconImage" ></img>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;                                                                                             
                                                    </div>
                                                    <div className="col-xl-10"> {data.title}</div>
                                                </div>
                                                <br />                                     
                                            </span>
                                        )
                                    })}
                                { showContactLoading && ( <Loading message="Saving Document Information" /> ) }

                            </div>
                        </div>
                    </div>
                </div>
            </div>                            

            <Modal size="lg" show={documentModelShow} onHide={closeUploadDialog}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>                
                    <Modal.Header closeButton>
                    <Modal.Title><img src={icon} width="30px" /> &nbsp;  {uploadDialogMessage}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />

                        <div>
                            <div className="row">
                                <span className="ErrorLabel">{errorMessages}</span>

                                {!isFileIsUploaded && (
                                <div className="card-block table-border-style">
                                    <div className="row">
                                        <div className="col-xl-12">

                                            <div className="row">
                                                <div className="col-xl-10">
                                                    <input type="file" 
                                                        id="documentFileUploadFileInput"
                                                        style={{ 
                                                            'border': '0px',
                                                            'font-size':'18px',
                                                            'padding': '0px'
                                                        }} 
                                                        onChange={commons.setUploadFilesSelectionEvent} 
                                                    />
                                                </div>
                                                <div className="col-xl-2">
                                                    <Button type="button" color="vk" size="tiny" onClick={ () => commons.uploadFile("accounts/backend/uploadfile", "documentFileUploadFileInput", destination, setPercent, documentFilesUploadedEvent1) }>Upload</Button> 
                                                </div>
                                            </div>
                                            <br /><br />
                                            {(percent > 0) && (
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar progress-bar-info"
                                                        role="progressbar"
                                                        aria-valuenow="50"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{ width: percent + "%" }}>
                                                    {percent}% </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                                )}

                                {isFileIsUploaded && (
                                    <span>
                                            Please enter following information and click Save
                                            <br /><br />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">

                                                        Enter Document Title 
                                                        <Form.Field>
                                                            <input type="text" className="form-control" placeholder="Enter Title" 
                                                                id="title"  
                                                                name="title"
                                                                {...register("title", { required: true, minLength:5, maxLength: 800 })}
                                                            />   
                                                        </Form.Field>
                                                        {errors.title && <p className="ErrorLabel">Title is required (min 5, max 800 characters) </p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-1"></div>
                                            </div> 

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        Details
                                                        <Form.Field>
                                                            <textarea className="form-control" placeholder="Enter Title" 
                                                                id="description"  
                                                                name="description"
                                                                {...register("description", { required: true, minLength:5, maxLength: 4000 })}
                                                            />   
                                                        </Form.Field>
                                                        {errors.description && <p className="ErrorLabel">Description is required (min 5, max 4000 characters) </p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-1"></div>
                                            </div>
                                    
                                        { showContactLoading && ( <Loading message="Saving Document" /> ) }
                                    </span>                                    
                                )}
                            </div>
                        </div>

                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                    {isFileIsUploaded && (<Button color="vk" type="submit" size="tiny">Save</Button>)}
                    &nbsp;&nbsp;
                    <Button color="red" type="button" size="tiny" onClick={closeUploadDialog}>Close</Button>
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
                            Are you sure you want to delete ?
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