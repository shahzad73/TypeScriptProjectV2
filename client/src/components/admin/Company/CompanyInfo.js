import React, { useState, useContext } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import { useForm } from "react-hook-form";
import commons from "../../common/commons";
import AppContext from '../../common/AppContext';

export default function ProfileContacts(params) {
    const countries = commons.getCountryNamesJSON();
    const appContext = useContext(AppContext);
    
    const [companyID, setCompanyID] = useState(0);
    const [companyDataSet, setCompanyDataSet] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [contactModelShow, setContactModelShow] = useState(false);
    const [profileErrorMessages, setProfileErrorMessages] = useState("");
    const [imageDialog, setImageDialog] = useState(false);
    const [companyLogo, setCompanyLogo] = useState("");;

    React.useEffect(() => {
        const id = params.id;
        setCompanyID(id);
        setShowLoading(true);

        axios.get("/accounts/company/getcompanydetails?id=" + id).then(response => {
            setShowLoading(false);
            setCompanyLogo(appContext.s3DocumentBaseURL +  response.data.mainImage );
            setCompanyDataSet(response.data);
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
            
        };
    }, []);

    const [percent, setPercent] = useState(0); 
    const companyInfoUploadEvent = (data) =>  {
        if(data.status == 0) {
            alert("Some issues uploading file. please try again")
        } else {
            setShowLoading(true);
            axios.post("/accounts/backend/updateImageRecord", {targetID: 1, image:data.file, id:companyID}).then(response => {
                setImageDialog(false);
                setShowLoading(false);
                setCompanyLogo(appContext.s3DocumentBaseURL +  data.file )
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    const onFormSubmit = (data) => {
        delete( data.mainImage );
        delete( data.mainImageCaption );
        delete( data.userid );

        setShowLoading(true);
        axios.post("/accounts/company/updatecompanydetails", data).then(response => {
            if(response.data.status == -1) {
                setShowLoading(false);
                setProfileErrorMessages(  commons.getDBErrorMessagesText(response.data.error) );
            } else {
                setProfileErrorMessages("")
                setContactModelShow(false);
                setShowLoading(false);
                setCompanyDataSet(response.data);
            }
        }).catch(function(error) {
            console.log(error);
        });
    }   

    const openEditInfo = () => {
        setProfileErrorMessages("")
        reset(companyDataSet);
        setContactModelShow(true);
    }

    return (  
        <div className="row">
            <div className="col-xl-12">
                <div className="card">

                    <div className="card-header">
                        <div className="row">
                            <div className="col-xl-10">
                                <h5> <img src="/img/company.png" width="33px"/> &nbsp; Company Information</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Button color="vk" onClick={openEditInfo} size='tiny'>Edit</Button>
                                &nbsp; &nbsp;
                                <Button color="vk" onClick={() => setImageDialog(true)} size='tiny'>Logo</Button> 
                            </div>
                        </div>
                    </div>      

                    <div className="card-block table-border-style">
                        <div className="row">
                            <div className="col-xl-9">
                                {companyDataSet.title}
                                <br />
                                {companyDataSet.country}
                                <br />
                                {companyDataSet.details}
                            </div>
                            <div className="col-xl-3">                                                                
                                <img src={companyLogo} width="150px" ></img>
                            </div>
                        </div>
                    </div>

                    { showLoading && ( <Loading message="Loading Company Information" /> ) }
                </div>
            </div>


            <Modal size="lg" show={imageDialog} onHide={() => setImageDialog(false)}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>

                    <Modal.Header closeButton>
                    <Modal.Title> <img src="/img/image.png" width="33px"/>  &nbsp; Upload Company Logo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />
                            <div>
                                <div className="row">

                                        <div className="row">
                                            <div className="col-xl-10">
                                                <input type="file" 
                                                    id="documentFileUploadFileInput"
                                                    style={{ 
                                                        'border': '0px',
                                                        'font-size':'14px',
                                                        'padding': '0px'
                                                    }} 
                                                    onChange={commons.setUploadFilesSelectionEvent} 
                                                />
                                            </div>
                                            <div className="col-xl-2">
                                                <Button type="button" color="vk" size="tiny" onClick={ () => commons.uploadFile("accounts/backend/uploadfile", "documentFileUploadFileInput", 2, setPercent, companyInfoUploadEvent) }>Upload</Button> 
                                            </div>
                                        </div> 

                                        <div className="row">
                                            <div className="col-xl-6">
                                                <br />
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
                            </div>
                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="red" size="tiny" type="button" onClick={() => setImageDialog(false)}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal size="lg" show={contactModelShow} onHide={() => setContactModelShow(false)}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>

                    <Modal.Header closeButton>
                    <Modal.Title> <img src="/img/company.png" width="33px"/>  &nbsp; Edit Company Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />
                            <div>
                                <div className="row">

                                        <span className="ErrorLabel">{profileErrorMessages}</span>

                                        <div className="row">
                                            <div className="col-md-2"> Title </div>
                                            <div className="col-md-10">
                                                <div className="form-group">
                                                    
                                                    <Form.Field>
                                                        <input type="text" className="form-control" placeholder="Enter Title" 
                                                            id="title"  
                                                            name="title"
                                                            {...register("title", { required: true, minLength:5, maxLength: 500 })}                                                        
                                                        />   
                                                    </Form.Field>
                                                    {errors.title && <p className="ErrorLabel">Please enter title (min 5, max 500 characters)</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-1"></div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-2"> Country </div>
                                            <div className="col-md-6">
                                                    <div className="form-group">
                                                        <Form.Field>
                                                            <select 
                                                            id="country"  
                                                            name="country"
                                                            {...register("country", { required: true, maxLength: 100 })}                              
                                                            className="form-control form-select">
                                                                { countries && countries.map(dat =>
                                                                    <option value={dat} label={dat} />
                                                                )}
                                                            </select>
                                                        </Form.Field>
                                                </div>
                                            </div>
                                        </div>
                                        

                                        <div className="row">
                                            <div className="col-md-2"> Details </div>
                                            <div className="col-md-10">
                                                <div className="form-group">
                                                    
                                                    <Form.Field>
                                                        <textarea className="form-control" placeholder="Enter Title" 
                                                            id="details"  
                                                            name="details"
                                                            {...register("details", { required: true, minLength:5, maxLength: 1000 })}                                                        
                                                        />   
                                                    </Form.Field>
                                                    {errors.details && <p className="ErrorLabel">Please enter details  (min 5, max 1000 characters)</p>}
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

        </div>

    );

}