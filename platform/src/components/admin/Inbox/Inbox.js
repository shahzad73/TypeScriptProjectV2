import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import Moment from 'moment';

export default function Inbox(props) {
  const [inboxDataSet, setInboxDataSet] = useState([]);

  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const [deleteRecordID, setDeleteRecordID] = useState(0);

  const handleDeleteModelClose = () => setDeleteModelShow(false);  

  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");

      axios.get("/platform/others/getAllInbox").then(response => {
        setInboxDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


  var deleteRecord = id => () => {
    setDeleteRecordID(id);
    setDeleteModelShow(true);
}


function handleDeleteModelEvent() {
    setDeleteModelShow(false);

    axios.get("/platform/others/deleteInbox?id=" + deleteRecordID).then(response => {
        setInboxDataSet(response.data);
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
                                <h5><img width="30px" src="/img/emailclosed.jpg"></img> &nbsp;  My Inbox 1</h5>
                                <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                            </div>
                            <div className="col-xl-2">
                                <Link to="/platformmain/sendemail" > <Button color="vk" size='tiny'>Compose</Button> </Link>
                            </div>
                    </div>
                </div>
                <div className="card-block">


                                {inboxDataSet.map(inbox => {
                                    return (

                                        <span>                                        
                                            <div className="row">
    
                                                <div className="col-xl-1">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <img src="/img/delete.png" width="22px" className="listIconImage" onClick={deleteRecord(inbox.ID)}></img>
                                                </div>

                                                <div className="col-xl-7">
                                                        {inbox.isResponded === 0 && 
                                                            <span>
                                                                <span className="ErrorLabel"> New </span> &nbsp; &nbsp;
                                                            </span>
                                                        }                 

                                                        {inbox.Title}
                                                </div>

                                                <div className="col-xl-2">
                                                        {Moment(inbox.DateEmail).format('DD MMM-YYYY')}
                                                </div>

                                                <div className="col-xl-2">
                                                        <Link to="/platformmain/viewinbox" state = {{id: inbox.ID, update: 1}} >
                                                            <Button color="vk" size='tiny'>View</Button>
                                                        </Link>
                                                </div>
                                            
                                            </div>

                                            <br />
                                        </span>
                                        
                                    );
                                })}



                </div>
            </div>
        </div>


        <Modal  show={deleteModelShow} onHide={handleDeleteModelClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        Do you want to delete this record id {deleteRecordID} ?
                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="vk"  size="tiny" onClick={handleDeleteModelClose}>
                        Close
                    </Button>
                    <Button color="red" size="tiny" onClick={handleDeleteModelEvent}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>


    </div>

  );

}