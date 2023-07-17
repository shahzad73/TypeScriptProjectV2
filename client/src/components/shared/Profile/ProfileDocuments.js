import React, { useState, useContext } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import Loading from "../../common/loading"
import commons from "../../common/Commons";
import Public_Enums_Constants from "../../common/PublicEnums";
import { useForm } from "react-hook-form";
import MyAppContext  from '../../common/AppContext';

export default function ProfileDocuments() {

    const [percent, setPercent] = useState(0); 
    const appContext = useContext(MyAppContext);

    const companyInfoUploadEvent = (data) =>  {
        setPercent(0);

        if(data.status == 0) {
            alert("Some issues uploading file. please try again")
        } else {
            axios.post("/accounts/backend/updateProfileImage", {pic:data.file}).then(response => {
                setImageDialog(false);
                setProfilePic( appContext.s3DocumentBaseURL +  data.file )
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    const [imageDialog, setImageDialog] = useState(false);
    const [profilePic, setProfilePic] = useState("");




    React.useEffect(() => {
        return () => {
            //alert("Bye");
        };
    }, []);


    return (  
        <div className="row">
            

            <div className="row">
                <div className="col-xl-12">
                    <div className="card">

                        <div className="card-header">
                            <div className="row">
                                <div className="col-xl-10">
                                    <h5> <img src="/img/company.png" width="33px"/> &nbsp; Profile Image</h5>
                                    <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                </div>
                                <div className="col-xl-2">
                                    <Button color="vk" onClick={() => setImageDialog(true)} size='tiny'>Logo</Button> 
                                </div>
                            </div>
                        </div>      


                        <div className="card-block table-border-style">
                            <div className="row">
                                <div className="col-xl-9">
                                    Profile Iamge
                                </div>
                                <div className="col-xl-3">                                                                
                                    <img src={profilePic} width="150px" ></img>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>



            <Modal size="lg" show={imageDialog} onHide={() => setImageDialog(false)}>

                    <Modal.Header closeButton>
                    <Modal.Title> <img src="/img/image.png" width="33px"/>  &nbsp; Upload Your Profile Image</Modal.Title>
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
                                                <Button type="button" color="vk" size="tiny" onClick={ () => commons.uploadFile("accounts/backend/uploadfile", "documentFileUploadFileInput", Public_Enums_Constants.SERVER_FILE_DESTINATION.AWS_Bucker_Private, setPercent, companyInfoUploadEvent) }>Upload</Button> 
                                            </div>
                                        </div> 

                                        <div className="row">
                                            <div className="col-xl-12">
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

            </Modal>

        </div>
    )
}
      