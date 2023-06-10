import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import commons from "../../common/commons";
import AppContext from '../../common/AppContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CustomTextEditor from "../../common/CustomTextEditor"



export default function Home(props) {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation()
    const [startDate, setStartDate] = useState("");
    const [inputs, setInputs] = useState({});
    const [isUpdateOperation, setIsUpdateOperation] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");        
    const [htmlText, setHtmlText] = useState("");
    const {register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();


    const onFormSubmit = (data) => {
        data.UpdateDate =  new Date(  moment(startDate).format('YYYY-MM-DD')  )         

        data.details = htmlText;

        if( isUpdateOperation == 0) {
            axios.post("/platform/backend/addNewUpdates", data).then(response => {
                if(response.data.status == -1) {                    
                    setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                } else 
                    navigate('/platformmain/update', { replace: true });                
            }).catch(function(error) {
                console.log(error);
            }); 
        } else {
            data.ID = inputs.ID;
            data.stoid = 0;

            axios.post("/platform/backend/updateUpdates", data).then(response => {
                if(response.data.status == -1) {
                    setErrorMessage(  commons.getDBErrorMessagesText(response.data.error) )
                } else                
                    navigate('/platformmain/update', { replace: true });
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    function cancel() {
        navigate('/platformmain/update', { replace: true })
    } 

    function textEditorTextChangeEvent(data) {
        setHtmlText(data)
    }

    React.useEffect(() => {   
        setIsUpdateOperation (location.state.update);

        if(location.state.update == 1) {
            const id = location.state.id;
            axios.get("/platform/backend/getUpdate?id=" + id).then(response => {
                setInputs( response.data[0] );   
                
                reset ({
                    "TITLE": response.data[0].TITLE,
                    //"details": response.data[0].details
                });
                setStartDate (  new Date(  moment(response.data[0].UpdateDate).format('MMMM DD, YYYY')  )  );
            }).catch(function(error) {
                console.log(error);
            });     
        }

        return () => {
            //alert("This is where when control is being transferred to another page");
        };

    }, []);

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5><img width="30px" src="/img/updates.png"></img> &nbsp; Add / Edit Update Record</h5>
                        <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                    </div>
                    <div className="card-block table-border-style">
                        <Form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="row">
                                <div className="col-md-12">

                                        <span className="ErrorLabel">{errorMessage}</span>

                                        <div className="form-group">
                                            <label>Title</label>
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="TITLE"  
                                                    name="TITLE"
                                                    defaultValue={inputs.TITLE}
                                                    {...register("TITLE", { required: true, minLength:10, maxLength: 250 })}
                                                    />
                                            </Form.Field>
                                            {errors.TITLE && <p className="ErrorLabel">Please enter title (min 10, max 250 characters)</p>}
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Select Date</label>
                                                        <DatePicker 
                                                            id="dateUpdate"  
                                                            placeholderText="Select Date"
                                                            dateFormat="MMMM d, yyyy"
                                                            yearDropdownItemNumber={80}
                                                            selected={startDate} 
                                                            onChange={(date) => setStartDate(  date  )} />
                                                </div>
                                            </div>
                                        </div>

                                        <br />
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
                            <br />
                            <Button color="vk" size="tiny" type='submit'>Save</Button> 
                            &nbsp;&nbsp;&nbsp; 
                            <Button color="red" type="button" size="tiny" onClick={cancel}>Cancel</Button> 

                        </Form>
                    </div>
                </div>
            </div>

        </div>
    );

}