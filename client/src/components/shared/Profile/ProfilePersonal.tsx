import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import Loading from "../../common/loading"
import DatePicker from "react-datepicker";
import moment from "moment";
import commons from "../../common/Commons";

import { IUsers } from '../../entities/Users';
import { ICountry } from '../../entities/Country';

export default function ProfilePersonal() {

    // Profile related data
    const [data, setData] = useState({} as IUsers);
    const [profileErrorMessages, setProfileErrorMessages] = useState("");  
    const [country, setCountry] = useState("");      
    const [apiOperationMessage, setApiOperationMessage] = useState("Loading Profile ...");      
    const [showLoading, setShowLoading] = useState(true);
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [DOBDate, setDOBDate] = useState("");
    const [countries, setCountries] = useState([] as ICountry[]);    
    const [profileModelShow, setProfileModelShow] = useState(false); 
    const onFormSubmit = (data: any) => {
        setApiOperationMessage("Saving Profile");        
        setShowLoading(true);
        setProfileModelShow(false);
        
        if(DOBDate != "" && DOBDate != null)
            data.DOB =  new Date(  moment(DOBDate).format('YYYY-MM-DD')  ) 
        
        axios.post("/accounts/backend/setProfile", data).then(response => {
            setApiOperationMessage("");
            setShowLoading(false);
            if(response.data.status == -1) {
                setProfileErrorMessages(  commons.getDBErrorMessagesText(response.data.error)   );
            } else {
                setData( response.data.user )
                setCountry( response.data.country )
            }

            setShowLoading(false);

        }).catch(function(error) {
            console.log(error);
        });
    }
    function openEditProfile() {
        if(data.dob != "" && data.dob != null)
            setDOBDate( data.dob )
        reset(data);
        setProfileModelShow(true)
    }


    React.useEffect(() => {
        setApiOperationMessage("Loading Profile");


        axios.get("/accounts/backend/getProfilePersonal").then(response => {
            setApiOperationMessage("");
            setData( response.data.user );
            setCountry( response.data.country )
            setShowLoading(false);
        }).catch(function(error) {
            console.log(error);
        });         


        axios.get("/common/getCountries").then(response => {
            setCountries( response.data );
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
            //alert("Bye");
        };
    }, []);

    return (  
        <div>
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-10">
                                    <h5><img src="/img/profile.png" height="26px;" /> &nbsp; My Profile</h5>
                                    <span className="d-block m-t-5">Basic information about <code> my profile</code></span>
                                </div>
                                <div className="col-2">
                                    <Button onClick={openEditProfile} color="vk" size='tiny'>Edit</Button>
                                </div>                                
                            </div>
                        </div>
                        <div className="card-block table-border-style">

                            <span className="ErrorLabel">{profileErrorMessages}</span>

                            <div className="row">
                                <div className="col-2">
                                    <span className="CaptionLabel">Profile ID</span>
                                </div>
                                <div className="col-4">
                                    {data.id}                                 
                                </div>

                                <div className="col-2">
                                    <span className="CaptionLabel">Email</span>
                                </div>
                                <div className="col-4">
                                    {data.email} 
                                </div>
                            </div>

                            <br />
                            <div className="row">
                                <div className="col-2">
                                    <span className="CaptionLabel">Name</span>
                                </div>
                                <div className="col-4">
                                    {data.firstname} {data.lastname}                            
                                </div>
                                <div className="col-2">
                                    <span className="CaptionLabel">Date of Birth</span>
                                </div>
                                <div className="col-4">
                                    {data.dob}                              
                                </div>                                
                            </div>

                            <br />
                            <div className="row">
                                <div className="col-2">
                                    <span className="CaptionLabel">Passport Number</span>
                                </div>
                                <div className="col-4">
                                    {data.passportNumber}                                  
                                </div>

                                <div className="col-2">
                                    <span className="CaptionLabel">National ID</span>
                                </div>
                                <div className="col-4">
                                    {data.nationalId}                              
                                </div>
                            </div>

                            <br />
                            <div className="row">
                                <div className="col-2">
                                    <span className="CaptionLabel">Marital Status</span>
                                </div>
                                <div className="col-4">
                                    {data.maritalStatus}                                  
                                </div>

                                <div className="col-2">
                                    <span className="CaptionLabel">Occupation</span>
                                </div>
                                <div className="col-4">
                                    <span className="DataLabel"> {data.occupation} </span>                             
                                </div>
                            </div>

                            <br />
                            <div className="row">
                                <div className="col-2">
                                    <span className="CaptionLabel">Country</span>
                                </div>
                                <div className="col-4">
                                    {country}                                  
                                </div>

                            </div>


                            { showLoading && ( <Loading message={apiOperationMessage} /> ) }

                        </div>
                </div>
            </div>
        </div>


        <Modal size="xl" show={profileModelShow} onHide={() => setProfileModelShow(false)}>
            <Form onSubmit={handleSubmit(onFormSubmit)}>

                <Modal.Header closeButton>
                <Modal.Title> <img src="/img/profile.png" height="26px;" /> &nbsp; Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <br />
                    
                    <div>
                        <div className="row">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            First Name
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="firstname"  
                                                    {...register("firstname", { required: true, minLength:4, maxLength: 200 })}
                                                    />
                                            </Form.Field>
                                            {errors.firstname && <p className="ErrorLabel">Please enter last name (min 4, max 200 characters)</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Last Name
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="lastname"  
                                                    {...register("lastname", { required: true, minLength:4, maxLength: 200 })}
                                                    />
                                            </Form.Field>
                                            {errors.lastname && <p className="ErrorLabel">Please enter last name  (min 4, max 200 characters)</p>}
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Select Date</label>
                                                    <DatePicker 
                                                        id="DOBSelection"
                                                        placeholderText="Select Date"
                                                        dateFormat="MMMM d, yyyy"
                                                        yearDropdownItemNumber={80}
                                                        selected={new Date(DOBDate)}
                                                        onChange={(date: Date) => setDOBDate(  date.toString()  )} />
                                            </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Select Country
                                            <Form.Field>
                                                <select 
                                                id="countryid"  
                                                {...register("countryid", { maxLength: 100 })}                                                
                                                className="form-control form-select">
                                                    { countries && countries.map((dat: ICountry) =>
                                                        <option value={dat.id}> {dat.country} </option>
                                                    )}
                                                </select>
                                            </Form.Field>
                                        </div>
                                    </div>                                      
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Passport Number
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Passport Number" 
                                                    id="PassportNumber"  
                                                    {...register("PassportNumber", { maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                            {errors.PassportNumber && <p className="ErrorLabel">Passport Number should be less than 100 character</p>}
                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="form-group">
                                            National ID
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Last Name" 
                                                    id="NationalID"  
                                                    {...register("NationalID", { maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                            {errors.NationalID && <p className="ErrorLabel">National ID should be less than 100 character</p>}
                                        </div>

                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Marital Status
                                            <Form.Field>
                                                <select 
                                                className="form-control form-select"
                                                id="MaritalStatus"  
                                                {...register("MaritalStatus", { maxLength: 100 })}>
                                                    <option value="Single">Single</option>
                                                    <option value="Married">Married</option>
                                                </select>
                                            </Form.Field>
                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="form-group">
                                            Occupation
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Occupation" 
                                                    id="Occupation"  
                                                    {...register("Occupation", { maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                            {errors.Occupation && <p className="ErrorLabel">Occupation should be less than 100 character</p>}
                                        </div>

                                    </div>
                                </div>


                        </div>
                    </div>

                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                <Button color="vk" type='submit'  size='tiny'>Save</Button>   
                &nbsp;&nbsp;              
                <Button color="red" type='button' size='tiny' onClick={() => setProfileModelShow(false)}>Close</Button>
                </Modal.Footer>

            </Form>
        </Modal>

        </div>
    );

}