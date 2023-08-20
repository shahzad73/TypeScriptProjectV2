import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button, Label, Pagination } from 'semantic-ui-react'
import commons from '../../common/Commons'
import { useLocation } from  "react-router-dom";


export default function TokenHolders(props) {

  const [totalPages, setTotalPages] = useState(0);
  const [tokensList, setTokensList] = useState([]);  
  const [tokenInfo, setTokenInfo] = useState([]);    
  const location = useLocation();  
  

  React.useEffect(() => {

    axios.get("/accounts/token/gettoken",  { params: {id: location.state.id} }
    ).then(response => {
        setTokenInfo( response.data );
        getPageData(0);
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


                        <b>Title</b>  &nbsp;&nbsp;&nbsp; {tokenInfo.Title}
                        <br />
                        <b>Details</b>  &nbsp;&nbsp;&nbsp;  {tokenInfo.Details}
                        <br />

                        {tokensList && tokensList.map(dat =>                                    
                            <span>
                                <br />
                                <div className="row">
                                    <div className="col-xl-7">
                                        {dat.firstname}
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