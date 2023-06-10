import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../../common/loading';
import CustomTextEditor from "../../common/CustomTextEditor"


export default function SendEmail() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();    
    const [showLoading, setShowLoading] = useState(false);
    const [htmlText, setHtmlText] = useState("");
    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        setShowLoading(true);

        data.details = htmlText;

        axios.post("/platform/others/sendEmail", data).then(response => {
            setShowLoading(false);
           if(response.data.status == 0) {
                alert("Error sending email. Please contact administrator")
           } else {
                alert("Email send")
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
                                                <label>Receiver Email Address</label>
                                                <Form.Field>
                                                    <input type="text" className="form-control" placeholder="Email Address" 
                                                        id="TITLE"  
                                                        name="TITLE"
                                                        defaultValue={inputs.email}
                                                        {...register("email", { required: true, maxLength: 100 })}
                                                        />
                                                </Form.Field>
                                                {errors.TITLE && <p>Please enter receiver email</p>}
                                            </div>

                                            <div className="form-group">
                                                <label>Title</label>
                                                <Form.Field>
                                                    <input type="text" className="form-control" placeholder="Enter Title" 
                                                        id="TITLE"  
                                                        name="TITLE"
                                                        defaultValue={inputs.TITLE}
                                                        {...register("TITLE", { required: true, maxLength: 100 })}
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
                                        <Button  color="red" size="tiny"  onClick={cancel}>Cancel</Button> 
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

        </div>
    );

}
