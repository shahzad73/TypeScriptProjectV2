import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button, Label } from 'semantic-ui-react'


export default function TokenHolders(props: any) {

  const [deleteModelShow, setDeleteModelShow] = useState(false);

  React.useEffect(() => {
      //alert("This is where you initialization code is execute");

      /*axios.get("/accounts/others/inbox").then(response => {
        setInboxDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {

      };*/

  }, []);


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

                    Page data

                </div>
            </div>
        </div>


    </div>

  );

}