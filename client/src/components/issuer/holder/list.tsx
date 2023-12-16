import React, { ChangeEvent, useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Pagination, Form, Icon, PaginationProps } from 'semantic-ui-react'
import moment from 'moment';
import Loading from "../../common/loading"
import commons from '../../common/Commons'
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { IUsers } from "../../entities/Users";
import { ICountry } from "../../entities/Country";

export default function InvestorList(props: any) {

  const [usersList, setUsersList] = useState([] as IUsers[]);

  const [totalPages, setTotalPages] = useState(0);
  const [activePageNumber, setActivePageNumber] = useState(1);

  const [showLoading, setShowLoading] = useState(false);
  const [countries, setCountries] = useState([] as ICountry[]);  
  const [contactModelShow, setContactModelShow] = useState(false);
  const [DOBDate, setDOBDate] = useState("");
  const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState(false);
  const [showSavingUserLoading, setShowSavingUserLoading] = useState(false); 

  const [searchParameters, setSearchParameters] = useState({
    txtFirstNameSearch: '',
    txtLastNameSearch: '',
    countryIDSearch: -1
  });

  const { register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useForm();

  const [profileErrorMessages, setProfileErrorMessages] = useState("");

  React.useEffect(() => {
 
    axios.get( "/common/getCountries", {}).then(response => {
        response.data.unshift ( {id: -1, country: ''} );
        setCountries(response.data);        
        getPageData(0);
    }).catch(function(error) {
        console.log(error);
    });

  }, []);

  const onFormSubmit: SubmitHandler<FieldValues> = (data) => {

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
    setDOBDate(new Date().toString())
    reset({});
    setEmailAlreadyExistsError(false);
    setContactModelShow(true);    
  }

  const handlePageChange = (
    event:  React.MouseEvent<HTMLAnchorElement>, 
    data: PaginationProps
  ) => {
        setActivePageNumber(data.activePage as number);
        getPageData(data.activePage as number - 1);
  }

  function getPageData(page: number) {

        setShowLoading(true);
        axios.get(
            "/accounts/holders/getHolders",
            { params: {page: page, size: commons.getPaginationSize(), searchParameters: searchParameters} })
        .then(response => {            
            setTotalPages ( commons.calculateTotalPages ( response.data.count ) );
            setUsersList(response.data.data);
            setShowLoading(false);
        }).catch(function(error) {
            console.log(error);
        });

  }

  const getPageZeroWithSearch = () => {    
     setActivePageNumber(1);    // set semantic page control active page property to 1 
     getPageData(0);            // and in API 0 is the first page
  }

  const resetSearchCriteria = () => {
      setSearchParameters({
            txtFirstNameSearch: '',
            txtLastNameSearch: '',
            countryIDSearch: -1
      });

      getPageZeroWithSearch();
  }


  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        const { name, value } = event.target;
        setSearchParameters((prevData) => ({
          ...prevData,
          [name]: value,
        }));        
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


                <div className="row">
                    <div className="col-md-6">
                        First Name
                            <input type="text" className="form-control" placeholder="Enter First Name" 
                                value={searchParameters.txtFirstNameSearch}
                                style={{ width:"85%" }}
                                id="txtFirstNameSearch"  
                                name="txtFirstNameSearch"
                                onChange={handleChangeSearch}
                            />
                    </div>                 
                    <div className="col-md-6">
                        Last Name
                            <input type="text" className="form-control" placeholder="Enter Last Name" 
                                value={searchParameters.txtLastNameSearch}
                                style={{ width:"85%" }}                            
                                id="txtLastNameSearch"  
                                name="txtLastNameSearch"
                                onChange={handleChangeSearch}
                            />
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-6">
                        Select Country
                        <select 
                            value={searchParameters.countryIDSearch}
                            style={{ width:"85%" }}         
                            className="form-control form-select"
                            id="countryIDSearch"  
                            name="countryIDSearch"
                            onChange={handleChangeSearch}
                        >
                            {countries && countries.map( (data: ICountry) => 
                                <option value={data.id}>{data.country}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <br />
                        <Button color="vk" onClick={getPageZeroWithSearch} size='tiny'>Search</Button>
                        <Button color="vk" onClick={resetSearchCriteria} size='tiny'>Reset</Button>
                    </div>
                </div>


                <hr /><br />

                {usersList && usersList.map( (data: IUsers) => 

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
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        activePage={activePageNumber}
                        totalPages={totalPages} 
                        onPageChange={handlePageChange}
                    />
                }

                { showLoading && ( <Loading message="Loading Company Information" /> ) }
            </div>
        </div>


        <Modal size="xl" show={contactModelShow} onHide={() => setContactModelShow(false)}>
            <Form onSubmit={handleSubmit(onFormSubmit)}>

                <Modal.Header>
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
                                                <label>Select Date of Birth</label>
                                                    <DatePicker 
                                                        id="DOBSelection"
                                                        placeholderText="Select Date"
                                                        dateFormat={"MMMM d, yyyy"}
                                                        yearDropdownItemNumber={80}
                                                        selected={new Date(DOBDate)}
                                                        onChange={(date: Date) => setDOBDate(  date.toString()  )} />
                                            </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            Country
                                            <Form.Field>
                                                <select 
                                                className="form-control form-select"
                                                id="countryid"  
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