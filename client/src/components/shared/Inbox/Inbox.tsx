import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button, Label } from 'semantic-ui-react'
import Moment from 'moment';


export default function Inbox(props: any) {
    interface Inbox {
        ID: number;
        Title: string;
        isResponded: number;
        DateEmail: Date
      }

      const inboxDataSet2: Inbox[] = [
        // Your inbox data objects here
      ];


  const [inboxDataSet, setInboxDataSet] = useState(inboxDataSet2);

  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const [deleteRecordID, setDeleteRecordID] = useState(0);


  
  React.useEffect(() => {
      //alert("This is where you initialization code is execute");

      axios.get("/accounts/others/inbox").then(response => {
        setInboxDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


const deleteRecord = (id: React.SetStateAction<number>) => () => {
    setDeleteRecordID(id);
    setDeleteModelShow(true);
}


function handleDeleteModelEvent() {
    setDeleteModelShow(false);

    axios.get("/accounts/others/deleteInbox?id=" + deleteRecordID).then(response => {
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
                            <h5><img width="30px" src="/img/emailclosed.jpg"></img> &nbsp;  My Inbox</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                        </div>
                        <div className="col-xl-2">
                            <Link to="/admin/issuer/sendemail" > <Button color="vk" size='tiny'>Email to Admin</Button> </Link>
                        </div>
                    </div>
                </div>      


                <div className="card-block table-border-style">

                        {inboxDataSet.map(inbox => {
                            return (
                                <span>
                                    <div className="row">
                                        <div className="col-xl-8">                                            
                                            <img src="/img/delete.png" className="listIconImage" onClick={deleteRecord(inbox.ID)}/>                                                                                          
                                            &nbsp; &nbsp;       
                                            {inbox.Title}
                                            {inbox.isResponded === 0 && 
                                                <span>
                                                &nbsp; &nbsp; 
                                                <Label color='red' size="tiny" horizontal>
                                                Not Responded
                                                </Label></span>
                                            }                                               
                                        </div>
                                        <div className="col-xl-2">
                                            {Moment(inbox.DateEmail).format('DD MMM-YYYY')} 
                                        </div>
                                        <div className="col-xl-2">                                        
                                            <Link to="/admin/issuer/viewinbox" 
                                                state = {{id: inbox.ID, update: 1}} >
                                            <Button color="vk" size='tiny'>View</Button> </Link>
                                        </div>
                                    </div>
                                    <br />
                                </span>
                            );
                        })}

                </div>
            </div>
        </div>

        <Modal  show={deleteModelShow} onHide={() => setDeleteModelShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <br />
                Do you want to delete this record ?
                <br /><br />
            </Modal.Body>
            <Modal.Footer>
            <Button color="vk" size="tiny" onClick={() => setDeleteModelShow(false)}>Close</Button>
            <Button color="red" size="tiny" onClick={handleDeleteModelEvent}>Delete</Button>
            </Modal.Footer>
        </Modal>


    </div>

  );

}