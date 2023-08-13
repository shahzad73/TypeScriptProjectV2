import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Pagination, Form } from 'semantic-ui-react'
import moment from 'moment';
import Loading from "../../common/loading"
import commons from '../../common/Commons'
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";


export default function InvestorList(props) {

  const [usersList, setUsersList] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [countries, setCountries] = useState([]);  
  const [contactModelShow, setContactModelShow] = useState(false);
  const [DOBDate, setDOBDate] = useState("");
  const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState(false);
  const [showSavingUserLoading, setShowSavingUserLoading] = useState(false); 

  const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

  const [profileErrorMessages, setProfileErrorMessages] = useState("");

  React.useEffect(() => {

    axios.get( "/common/getCountries", {}).then(response => {
        setCountries(response.data);        
        getPageData(0);
    }).catch(function(error) {
        console.log(error);
    });

  }, []);

  const onFormSubmit = (data) => {    

    if(DOBDate != "" && DOBDate != null)
        data.DOB =  new Date(  moment(DOBDate).format('YYYY-MM-DD')  ) 

    setShowSavingUserLoading(true);
    axios.post("/accounts/holders/saveNewHolders", data).then(response => {
        setShowSavingUserLoading(false);

        if(response.data.status == -1) {
            setProfileErrorMessages(  commons.getDBErrorMessagesText(response.data.error) )                
        }
        else if(response.data.status === 2 ) {
            setEmailAlreadyExistsError(true);
        } else {
            setContactModelShow(false);           
            alert("Refresh Page going to refresh page");
            getPageData(0);
        } 

    }).catch(function(error) {
        console.log(error);
    });
  }

  const openNewUser = () => {
    reset({});
    setEmailAlreadyExistsError(false);
    setContactModelShow(true);
  }

  const handlePageChange = (event, data) => {        
    getPageData(data.activePage - 1);
  }

  function getPageData(page) {

        setShowLoading(true);
        axios.get(
            "/accounts/holders/getHolders",
            { params: {page: page, size: commons.getPaginationSize()} })
        .then(response => {
            setTotalPages ( commons.calculateTotalPages ( response.data.count ) );
            setUsersList(response.data.data);
            setShowLoading(false);
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
                            <h5> <img src="/img/company.png" width="33px"/> &nbsp; List of Holders</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                        </div>
                        <div className="col-xl-2">
                            <Button color="vk" onClick={openNewUser} size='tiny'>Add New User</Button>
                        </div>
                    </div>
                </div>      

                <div className="card-block table-border-style">

                {usersList && usersList.map( data => 

                      <span>                                        
                          <div className="row">
                              <div className="col-xl-3"> 
                                  {data.firstname} {data.lastname}
                              </div>
                              <div className="col-xl-3">
                                  {data.email}
                              </div>
                              <div className="col-xl-3">
                                  {data.country}
                              </div>                              
                              <div className="col-xl-3">
                                    <Link to="/admin/issuer/investorView" state = {{id: data.ID}} >
                                        <Button color="vk" size='tiny'>View &nbsp; / &nbsp; Edit</Button> 
                                    </Link>
                              </div>                                                            
                          </div>                                      
                          <br />
                      </span>

                )}

                </div>

                { totalPages > 1 &&
                    <Pagination 
                        defaultActivePage={1} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange}
                    />
                }

                { showLoading && ( <Loading message="Loading Company Information" /> ) }
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
                                                Email Address
                                                <Form.Field>
                                                    <input type="text" className="form-control" placeholder="Enter Email Address" 
                                                        id="email"  
                                                        name="email"
                                                        {...register("email", { required: true, minLength:4, maxLength: 200 })}
                                                        />
                                                </Form.Field>
                                                {errors.email && <p className="ErrorLabel">Please enter email address</p>}
                                                {emailAlreadyExistsError && <p className="ErrorLabel">Email is taken. Try another one</p>}
                                            </div>
                                    </div>
                                </div>

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
                    <br /><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button color="vk" type='submit'  size='tiny'>Save</Button>   
                    &nbsp;&nbsp;              
                    <Button color="red" type='button' size='tiny' onClick={() => setContactModelShow(false)}>Close</Button>
                </Modal.Footer>

            </Form>
        </Modal>


    </div>
  )

}