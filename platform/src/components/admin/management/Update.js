import React, { useState } from "react";
import axios from 'axios';
import { Modal } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import Loading from '../../common/loading';



export default function Updates(props) {
  const [updateDataSet, setUpdateDataSet] = useState([]);
  const [deleteModelShow, setDeleteModelShow] = useState(false);
  const [deleteRecordID, setDeleteRecordID] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const handleDeleteModelClose = () => setDeleteModelShow(false);  
  
  const [updateModelShow, setUpdateModelShow] = useState(false);
  const [updateContents, setUpdateContents] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [UpdateDate, setUpdateDate] = useState("");  

  


  function handleDeleteModelEvent() {
      setDeleteModelShow(false);

      axios.get("/platform/backend/deleteUpdates?id=" + deleteRecordID).then(response => {
        setUpdateDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });
  }

  var deleteRecord = id => () => {
      setDeleteRecordID(id);
      setDeleteModelShow(true);
  }

  var showUpdatesContents = id => () => {

    axios.get("/platform/backend/getUpdate?id=" + id).then(response => {
        setUpdateContents(response.data[0].details);
        setUpdateTitle( response.data[0].TITLE )
        setUpdateDate(  response.data[0].UpdateDate  )
        setUpdateModelShow(true);
    }).catch(function(error) {
        console.log(error);
    }); 


  }

  var handleViewModelClose = () => {
    setUpdateModelShow(false);
 }


   

  React.useEffect((props) => {
      //alert("This is where you initialization code is execute");
        async function fetchEmployees() {
            axios.get("/platform/backend/getAllUpdates").then(response => {
                setUpdateDataSet(response.data);
                setShowLoading(false);
            }).catch(function(error) {
                console.log(error);
            });      
        }

        fetchEmployees();
      return () => {
        //alert("This is where when control is being transferred to another page");
      };

  }, []);


  return (

    <div className="row">
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header">

                    <div className="row">
                        <div className="col-xl-10">
                            <h5> <img width="30px" src="/img/updates.png"></img> &nbsp; LIst of Updates / News</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>                                
                        </div>
                        <div className="col-xl-2">
                            <Link to="/platformmain/addNewUpdate" 
                            state = {{update: 0}}> <Button color="vk" size='tiny'>Add New Update</Button> </Link>                            
                        </div>
                    </div>
                </div>

                <div className="card-block table-border-style">
                    
                        {showLoading && ( <Loading /> ) }

                        {updateDataSet.map(update => {
                            return (
                                <span>                                        
                                    <div className="row">

                                        <div className="col-xl-2">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="/img/delete.png" width="22px" className="listIconImage" onClick={deleteRecord(update.ID)}></img>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                                
                                            <Link to="/platformmain/addNewUpdate" state = {{id: update.ID, update: 1}} >
                                                <img src="/img/edit.png" width="22px" className="listIconImage"></img>
                                            </Link>
                                        </div>
                                        <div className="col-xl-8">                                        
                                            {update.TITLE}
                                        </div>
                                        <div className="col-xl-2">                                        
                                            <Button color="vk" size="tiny" onClick={showUpdatesContents(update.ID)}>View</Button> 
                                        </div>                                        
                                    </div>
                                    <br />
                                </span>
                            );
                        })}

                </div>

                <Modal  show={deleteModelShow} onHide={handleDeleteModelClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        Do you want to delete this update / news ?
                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="vk" size="tiny" onClick={handleDeleteModelClose}>
                        Close
                    </Button>
                    &nbsp;
                    <Button color="red" size="tiny" onClick={handleDeleteModelEvent}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>


                <Modal size="xl" show={updateModelShow} onHide={handleViewModelClose}>
                    <Modal.Header closeButton>
                    <Modal.Title><img width="30px" src="/img/updates.png"></img> &nbsp;  {updateTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-xl-10"></div>
                            <div className="col-xl-2">{UpdateDate}</div>                            
                        </div>
                                

                        <span dangerouslySetInnerHTML={   {__html: updateContents}    }></span>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="vk" size="tiny" onClick={handleViewModelClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>


            </div>
        </div>
    </div>

  );

}