import React, { useState, useContext } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button, Label } from 'semantic-ui-react'
import Moment from 'moment';
import AppContext from '../../common/AppContext';
import { useLocation } from "react-router-dom";


export default function addToCompany(props: any) {
  const appContext = useContext(AppContext);
  const location = useLocation();

  React.useEffect(() => {
      const id = location.state.id;
      alert( id )

      
      /*axios.get("/accounts/others/inbox").then(response => {
        
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };*/

  }, []);


function handleDeleteModelEvent() {

    /*axios.get("/accounts/others/deleteInbox?id=" + deleteRecordID).then(response => {
        setInboxDataSet(response.data);
    }).catch(function(error) {
        console.log(error);
    });*/

}


  return (

    <div className="row">
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-xl-10">
                            <h5><img width="30px" src="/img/emailclosed.jpg"></img> &nbsp;  Holder View111</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                        </div>
                    </div>
                </div>      


                <div className="card-block table-border-style">

                    This is holder view details 

                </div>
            </div>
        </div>


    </div>

  );

}