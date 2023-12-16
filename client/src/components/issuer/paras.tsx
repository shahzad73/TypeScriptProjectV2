import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../common/loading"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomTextEditor from "../common/CustomTextEditor"
import commons from "../common/Commons"
import { IParagraphs } from '../entities/Paragraphs';

export default function ProfileContacts(params: any) {
    const [recordID, setRecordID] = useState(0);

    const [paramgraphDataSet, setParamgraphDataSet] = useState([] as IParagraphs[]);  
    const [formParagraphData, updateFormParagraphData] = React.useState({id: 0, title: "", details: "", recordID: 0, type: 0 });
    const [showParagraphLoading, setShowParagraphLoading] = useState(false); 
    const [paragraphModelShow, setParagraphModelShow] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");        
    const [deleteRecordID, setDeleteRecordID] = useState(0);
    const [deleteModelShow, setDeleteModelShow] = useState(false);
    const [operation, setOperation] = useState(0); 
    const [currentEditID, setCurrentEditID] = useState(0); 
    const [typePara, setTypePara] = useState(0); 
    const [caption, setCaption] = useState("");
    const [sectionHelperText, ssetSectionHelperText] = useState("");
    const [icon, setIcon] = useState("");        
    

    const [viewModelShow, setViewModelShow] = useState(false);

    const [htmlText, setHtmlText] = useState("");
    function textEditorTextChangeEvent(data: any) {
        setHtmlText(data)
    }
    const handleParagraphChange = (e: any) => {
        updateFormParagraphData({
            ...formParagraphData,
            [e.target.name]: e.target.value
        });
    };
    const addParagraphDataForm = (e: any) => {
        
        if(htmlText.length > 4000) {
            setErrorMessage("Details cannot be greater than 4000 characters");
            return;
        }
        if(htmlText.length < 5) {
            setErrorMessage("Please enter some details");
            return;
        }        
        if(formParagraphData.title.length < 5) {
            setErrorMessage("Please enter title");
            return;
        }        


        formParagraphData.details = htmlText;
        formParagraphData.recordID = recordID;
        formParagraphData.type = typePara;
        var link = "/accounts/company/addParamgraph";
        if(operation == 1) {
            link = "/accounts/company/updateParamgraph";
            formParagraphData.id = currentEditID;
        }

        e.preventDefault()
        setShowParagraphLoading(true);

        axios.post(link, formParagraphData).then(response => {
            setShowParagraphLoading(false);

            if(response.data.status == -1) {
                setErrorMessage(  commons.getDBErrorMessagesText(response.data.error)  )
            } else {
                setParamgraphDataSet( response.data );
                setParagraphModelShow(false);
            }

        }).catch(function(error) {
            console.log(error);
        });
    };
    function openEditParagraph() {
        updateFormParagraphData({
            title: "",
            details: "",
            id: 0, 
            recordID: 0, 
            type: 0
        });
        setOperation(0);   
        setHtmlText("");     
        setErrorMessage("");
        setParagraphModelShow(true);
    }
    function closePargraphModelShow() {      
        setParagraphModelShow(false);
    }  
    const deleteRecord = (id: number) => () => {
        setDeleteRecordID(id);
        setDeleteModelShow(true);
    }
    function handleDeleteModelEvent() {
        setDeleteModelShow(false);
        setShowParagraphLoading(true);
        axios.get("/accounts/company/deleteParagraph?id=" + deleteRecordID + "&recordID=" + recordID ).then(response => {
            setShowParagraphLoading(false);
            setParamgraphDataSet( response.data );
        }).catch(function(error) {
            console.log(error);
        });
    }  
    const editPara = (id: number, op: number) => () => {
        setShowParagraphLoading(true);
        setErrorMessage("");
        axios.get("/accounts/company/getParaData?id=" + id).then(response => {
            setShowParagraphLoading(false);
            updateFormParagraphData({
                title: response.data.title,
                details: response.data.details,
                id: 0, 
                recordID: 0, 
                type: 0
            })
            if(op == 1) {
                setOperation(1);            
                setCurrentEditID(id);
                setParagraphModelShow(true);
            } else if(op == 2) {
                setViewModelShow(true);
            }

        }).catch(function(error) {
            console.log(error);
        });
    }

    React.useEffect(() => {
        const id = params.id;
        setRecordID(params.id);
        setTypePara(params.typePara)
        setShowParagraphLoading(true);
        setCaption(params.caption);
        ssetSectionHelperText(params.sectionHelperText);
        setIcon("/img/" + params.icon);

        axios.get("/accounts/company/getcompanyparagraphs?id=" + id + "&type=" + params.typePara).then(response => {
            setShowParagraphLoading(false);
            setParamgraphDataSet( response.data );
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
                            <div className="col-xl-10">
                                <h5><img src={icon} width="28px"/> &nbsp; {caption} </h5>
                                <span className="d-block m-t-5">{sectionHelperText}</span>
                            </div>
                            <div className="col-xl-2">
                                <Button onClick={openEditParagraph} color="vk" size='tiny'>Add Paragraph</Button>
                            </div>
                        </div>
                    </div>

                    <div className="card-block table-border-style">
                        {paramgraphDataSet.map( (data: IParagraphs) => {
                            return (
                                <span>                               
                                    <div className="row">   
                                        <div className="col-xl-2">  
                                                <img src="/img/view.png" onClick={editPara(data.id, 2)} style={{width: "25px"}} ></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;                                         
                                                <img src="/img/edit.png" onClick={editPara(data.id, 1)} className="listIconImage"></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;                                               
                                                <img src="/img/delete.png" className="listIconImage" onClick={deleteRecord(data.id)}></img>
                                        </div>
                                        <div className="col-xl-8"> {data.title}</div>
                                        <div className="col-xl-1">
                                                <img src="/img/up.png" className="listIconImage" ></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <img src="/img/down.png" className="listIconImage" ></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                    </div>
                                </span>
                            )
                        })}
                        { showParagraphLoading && ( <Loading message="Saving Paragraph Information" /> ) }
                    </div>
                </div>
            </div>

            <Modal size="xl" show={paragraphModelShow} onHide={() => setParagraphModelShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title><img src="/img/paragraph.png" width="23px" /> &nbsp;  Add / Edit Company Paragraph</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />

                    <div>
                        <div className="row">
                                <span className="ErrorLabel">{errorMessage}</span>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            Enter Paragraph Title 
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="title"  
                                                    name="title"
                                                    maxLength={800}
                                                    value={formParagraphData.title}
                                                    onChange={handleParagraphChange}
                                                />   
                                            </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <CustomTextEditor                                                 
                                                defaultHTML={formParagraphData.details}  
                                                onChange={textEditorTextChangeEvent} 
                                                height="100px" 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>
                        </div>
                    </div>

                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="vk" size="tiny" onClick={addParagraphDataForm}>Save</Button>
                &nbsp;&nbsp;
                <Button color="red"  size="tiny" onClick={() => closePargraphModelShow()}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal  show={deleteModelShow} onHide={() => setDeleteModelShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    Do you want to delete this record ?
                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="vk" size="tiny" onClick={() => handleDeleteModelEvent()}>Yes</Button>
                &nbsp;
                <Button color="red" size="tiny" onClick={() =>  setDeleteModelShow(false) }>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal  size="xl" show={viewModelShow} onHide={() => setViewModelShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title><img src="/img/paragraph.png" width="23px" /> &nbsp; Paragraph Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <span style={{"fontSize":"25px"}}>{formParagraphData.title}</span>
                    <br /><br />
                    <span dangerouslySetInnerHTML={   {__html: formParagraphData.details}    }></span>                      
                    <br /><br />                    
                </Modal.Body>
                <Modal.Footer>
                <Button color="red" size="tiny" onClick={() =>  setViewModelShow(false) }>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );

}



