import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button, Label, Pagination } from 'semantic-ui-react'
import commons from '../../common/Commons'
import { useLocation } from  "react-router-dom";



export default function TokenHolders(props) {

    const [searchParameters, setSearchParameters] = useState({
        txtFirstNameSearch: '',
        txtLastNameSearch: '',
        countryIDSearch: -1
    });

  const [totalPages, setTotalPages] = useState(0);
  const [tokensList, setTokensList] = useState([]);  
  const [tokenInfo, setTokenInfo] = useState([]);    
  const location = useLocation();  
  const [countries, setCountries] = useState([]); 


  React.useEffect(() => {

    axios.get( "/common/getCountries", {}).then(response => {
        response.data.unshift ( {id: -1, country: ''} );
        setCountries(response.data);        

        axios.get("/accounts/token/gettoken",  { params: {id: location.state.id} }
        ).then(response => {
            setTokenInfo( response.data );
            getPageData(0);
        }).catch(function(error) {
            console.log(error);
        });          
    

    }).catch(function(error) {
        console.log(error);
    });
    

  }, []);

  
  const handlePageChange = (event, data) => {        
    getPageData(data.activePage - 1);
  };    


  function getPageData(page) {
    
    axios.get("/accounts/token/tokenholders",
    { params: {tokenid: location.state.id,  page: page, size: commons.getPaginationSize()} }
    ).then(response => {

        setTokensList(  response.data.tokenUserList  );
        setTotalPages ( commons.calculateTotalPages ( response.data.tokenUserListCount ) );

    }).catch(function(error) {
        console.log(error);
    });      

    return () => {

    };

  }


  const resetSearchCriteria = () => {
    setSearchParameters({
          txtFirstNameSearch: '',
          txtLastNameSearch: '',
          countryIDSearch: -1
    });

    getPageZeroWithSearch();
  }


  const getPageZeroWithSearch = () => {    
    //setActivePageNumber(1);    // set semantic page control active page property to 1 
    getPageData(0);            // and in API 0 is the first page
 }


  const handleChangeSearch = event => {
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
                            <h5><img width="30px" src="/img/emailclosed.jpg"></img> &nbsp;  Token Holders</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                        </div>
                        <div className="col-xl-2">
                            <Link to="/admin/issuer/sendemail" > <Button color="vk" size='tiny'>Email to Admin</Button> </Link>
                        </div>
                    </div>
                </div>      


                <div className="card-block table-border-style">

                        <div className="row">
                            <div className="col-md-2">
                                <b>Title</b>
                            </div>
                            <div className="col-md-6">
                                {tokenInfo.Title}
                            </div>                            
                        </div>


                        <div className="row">
                            <div className="col-md-2">
                                <b>Details</b>
                            </div>
                            <div className="col-md-6">
                                {tokenInfo.Details}
                            </div>                            
                        </div>

                        <br /><br />

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
                                    {countries && countries.map( data => 
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


                        {tokensList && tokensList.map(dat =>                                    
                            <span>
                                <br />
                                <div className="row">
                                    <div className="col-xl-7">
                                        {dat.firstname} {dat.lastname}
                                    </div>
                                    <div className="col-xl-3">
                                        <Link to="/admin/issuer/tokenview" state = {{id: dat.id}}> 
                                        <Button color="vk" size='tiny'>Info</Button> </Link>
                                    </div>
                                </div>
                            </span> 
                        )}


                        <br />

                        {
                            totalPages > 1
                            &&
                            <Pagination 
                                defaultActivePage={1} 
                                totalPages={totalPages} 
                                onPageChange={handlePageChange}
                            />     
                        }

                </div>
            </div>
        </div>


    </div>

  );

}