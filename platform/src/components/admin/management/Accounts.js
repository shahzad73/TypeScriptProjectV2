import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

export default function Home(props) {
  const [updateDataSet, setUpdateDataSet] = useState([]);

  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");

      axios.get("/platform/backend/getAllAccounts").then(response => {
        setUpdateDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


  return (

    <div className="row">
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header">
                    <h5> <img src="/img/accounts.png" width="30px"></img> &nbsp; List of Accounts</h5>
                    <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                </div>
                <div className="card-block table-border-style">

                        {updateDataSet.map(update => {
                            return (
                                <span>                                        
                                    <div className="row">

                                        <div className="col-xl-3">
                                            {update.email}
                                        </div>                                            
                                        
                                        <div className="col-xl-6">                                            
                                            {update.firstname} {update.lastname}
                                        </div>

                                        <div className="col-xl-3">                                            
                                            <Link to="/platformmain/viewaccounts" 
                                                state = {{id: update.ID, update: 1}} >
                                            <Button color="vk" size='tiny'>View</Button> </Link>
                                            &nbsp;
                                            <Button color="vk" size='tiny'>Send Email</Button>
                                        </div>

                                    </div>
                                    <br />
                                </span>
                            );
                        })}


                </div>
            </div>
        </div>
    </div>

  );

}