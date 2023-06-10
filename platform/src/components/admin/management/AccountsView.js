import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import commons from "../../common/commons";
import Modal from "react-bootstrap/Modal";
import AppContext from '../../common/AppContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AccountsView(props) {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation()

    const [startDate, setStartDate] = useState("");

    const [accountData, setAccountData] = useState({});
    const [isUpdateOperation, setIsUpdateOperation] = useState(0);


    React.useEffect(() => {   
        setIsUpdateOperation (location.state.update);

        if(location.state.update == 1) {
            const id = location.state.id;
            axios.get("/platform/backend/getAccount?id=" + id).then(response => {
                setAccountData( response.data[0] );
            }).catch(function(error) {
                console.log(error);
            });     
        }

        return () => {
            //alert("This is where when control is being transferred to another page");
        };

    }, []);

    return (

        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h5><img src="/img/accounts.png" width="30px"></img> &nbsp;  Account Details</h5>
                        <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                    </div>
                    <div className="card-block table-border-style">

                        {accountData.firstname} {accountData.lastname}
                        <br /><br />
                        {accountData.email}

                    </div>
                </div>
            </div>
        </div>

    );

}