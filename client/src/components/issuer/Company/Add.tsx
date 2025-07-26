import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import Loading from '../../common/loading';
import commons from "../../common/Commons"


export default function Company() {
    const location = useLocation();
    const navigate = useNavigate();      
    const [showLoading, setShowLoading] = useState(false);
    const [inputs, setInputs] = useState({details: ""});
    const countries = commons.getCountryNamesJSON();
    const [profileErrorMessages, setProfileErrorMessages] = useState("");

    const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

    React.useEffect(() => {
        if(location.state.update != 0) {
            alert( location.state.id );
        }

        const select2: HTMLSelectElement = document.getElementById('country') as HTMLSelectElement;
        if(select2 != null)
            setValue(  "country",  select2.options[select2.selectedIndex].value  );

        return () => {
            //alert("Bye");
        };
    }, []);


    function cancel() {
        navigate('/admin/issuer/company', { replace: true })
    } 

    const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
        setShowLoading(true);
        axios.post("/accounts/company/createcompany", data).then(response => {
            setShowLoading(false);
            if(response.data.status == -1) {
                setProfileErrorMessages(  commons.getDBErrorMessagesText(response.data.error) )                
            } else                
                navigate('/admin/issuer/company', { replace: true });

        }).catch(function(error) {
            console.log(error);
        });
    }

    const handleAddressChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(  e.target.name, e.target.value.trim()  );
    };


    return (          
        <div>

                <div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header" style={{"backgroundColor":"#F5F5F5"}}>
                                    <h5> <img src="/img/company.png" width="25px"></img> &nbsp;  Add / Edit Company</h5>
                                </div>
                                <div className="card-block table-border-style">
 
                                    <span className="ErrorLabel">{profileErrorMessages}</span>

                                    <Form onSubmit={handleSubmit(onFormSubmit)}>

                                            <div className="row">
                                                <div className="col-md-12">

                                                    <div className="form-group">
                                                        <label>Title</label>
                                                        <Form.Field>
                                                            <input type="text" className="form-control" placeholder="Enter Title" 
                                                                id="title"  
                                                                defaultValue={inputs.title}
                                                                {...register("title", { required: true, minLength:5, maxLength: 500 })}
                                                                />
                                                        </Form.Field>
                                                        {errors.title && <p className="ErrorLabel">Please enter title (min 5, max 500 characters)</p>}
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Details</label>
                                                        <Form.Field>
                                                            <textarea className="form-control" rows={3}
                                                                id="details"
                                                                {...register("details", { required: true, minLength:5, maxLength: 1000 })}
                                                                defaultValue={inputs.details}
                                                                placeholder="Describe your event!"
                                                            ></textarea>
                                                        </Form.Field>
                                                        {errors.details && <p className="ErrorLabel">Please enter details  (min 5, max 1000 characters)</p>}
                                                    </div>     

                                                    <div className="form-group">
                                                        <Form.Field>
                                                            <select 
                                                            id="country"  
                                                            name="country"
                                                            onChange={handleAddressChange}
                                                            className="form-control form-select">
                                                                { countries && countries.map(dat =>
                                                                    <option value={dat} label={dat} />
                                                                )}
                                                            </select>
                                                        </Form.Field>
                                                    </div>


                                                </div>
                                            </div>



                                            { !showLoading && (
                                                <span><br />
                                                <Button color="vk" size="tiny" type='submit'>Save</Button> 
                                                &nbsp;&nbsp;&nbsp; 
                                                <Button color="red"  size="tiny" onClick={cancel}>Cancel</Button> 
                                                <br /></span>
                                                )
                                            }

                                            { showLoading && ( <Loading message="Saving Company Information" /> ) }

                                    </Form>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>                            

        </div>
    );

}