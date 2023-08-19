import React, { useState, useContext } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button, Label, Form } from 'semantic-ui-react'
import Moment from 'moment';
import AppContext from '../../../common/AppContext';
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from 'moment';

import Loading from "../../../common/loading"
import { useForm } from "react-hook-form";


export default function Profile(props) {
  const location = useLocation();
  const [profileDataSet, setProfileDataSet] = useState([]);
  const [contactModelShow, setContactModelShow] = useState(false);
  const [DOBDate, setDOBDate] = useState("");
  const [showSavingUserLoading, setShowSavingUserLoading] = useState(false); 

  const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

  const [countries, setCountries] = useState([]);  


  React.useEffect((props) => {

      axios.get( "/common/getCountries", {}).then(response => {
        setCountries(response.data);        
        getProfileInfo();
      }).catch(function(error) {
            console.log(error);
      });


      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


    function getProfileInfo() {
        const id = location.state.id;

        axios.get("/accounts/holders/getInvestor?id=" + id).then(response => {
            setProfileDataSet( response.data.data );

            if(response.data.data.DOB != "" && response.data.data.DOB != null)
                setDOBDate( new Date(response.data.data.DOB ) )

            reset(response.data.data);
        }).catch(function(error) {
            console.log(error);
        });        
    }


    function openEditProfile() {
        setContactModelShow(true);
    }


    const onFormSubmit = (data) => {    

        delete data.country;
        delete data.issuerCanEditProfile;

        if(DOBDate != "" && DOBDate != null)
            data.DOB =  new Date(  moment(DOBDate).format('YYYY-MM-DD')  ) 

        setShowSavingUserLoading(true);
        axios.post("/accounts/holders/updateHolders", data).then(response => {
            setShowSavingUserLoading(false);
            setContactModelShow(false);
            getProfileInfo();
        }).catch(function(error) {
            console.log(error);
        });
        
    }



  return (

    <div className="row">
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-xl-10">
                            <h5><img width="30px" src="/img/emailclosed.jpg"></img> &nbsp;  Holder View</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                        </div>
                        <div className="col-xl-2">
                            { profileDataSet.issuerCanEditProfile == 1 && 
                                (<span>
                                    <Button onClick={openEditProfile} color="vk" size='tiny'>Edit</Button> 
                                </span>)
                            }
                        </div>
                    </div>
                </div>


                <div className="card-block table-border-style">

                    {profileDataSet.firstname} {profileDataSet.lastname} 
                    <br />
                    {profileDataSet.email}
                    <br />
                    {profileDataSet.country}

                </div>
            </div>
        </div>



        <Modal size="xl" show={contactModelShow} onHide={() => setContactModelShow(false)}>
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
                                                    name="firstname"
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
                                                    name="lastname"
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
                                                <label>Select Date of Birth</label>
                                                    <DatePicker 
                                                        id="DOBSelection"
                                                        placeholderText="Select Date"
                                                        dateFormat="MMMM d, yyyy"
                                                        yearDropdownItemNumber={80}
                                                        selected={DOBDate}
                                                        onChange={(date) => setDOBDate(  date  )} />
                                            </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Country
                                            <Form.Field>
                                                <select 
                                                className="form-control form-select"
                                                id="countryid"  
                                                name="countryid"                                                
                                                {...register("countryid", { maxLength: 100 })}>
                                                    {countries && countries.map( data => 
                                                        <option value={data.id}>{data.country}</option>
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
                                                    name="PassportNumber"
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
                                                    name="NationalID"
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
                                                name="MaritalStatus"                                                
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
                                                    name="Occupation"
                                                    {...register("Occupation", { maxLength: 100 })}
                                                    />
                                            </Form.Field>
                                            {errors.Occupation && <p className="ErrorLabel">Occupation should be less than 100 character</p>}
                                        </div>

                                    </div>
                                </div>

                        </div>
                    </div>
                    { showSavingUserLoading && ( <Loading message="Saving new User" /> ) }
                </Modal.Body>
                <Modal.Footer>
                    <Button color="vk" type='submit'  size='tiny'>Save</Button>   
                    &nbsp;&nbsp;              
                    <Button color="red" type='button' size='tiny' onClick={() => setContactModelShow(false)}>Close</Button>
                </Modal.Footer>

            </Form>
        </Modal>



    </div>

  );

}
