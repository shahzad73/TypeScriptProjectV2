import React, { useState } from "react";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button, Label } from 'semantic-ui-react'
import Moment from 'moment';


export default function InvestorList(props: any) {
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




  React.useEffect(() => {
      //alert("This is where you initialization code is execute");

      /*axios.get("/accounts/others/inbox").then(response => {
        setInboxDataSet(response.data);
      }).catch(function(error) {
        console.log(error);
      });      

      return () => {
        //alert("This is where when control is being transferred to another page");
      };*/

  }, []);





  return (

    <div className="row">
        This is a file
    </div>

  );

}