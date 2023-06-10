import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'

export default function Company() {
    const [companyDataSet, setCompanyDataSet] = useState([]);

    React.useEffect(() => {
        axios.get("/accounts/company/companies").then(response => {
            setCompanyDataSet(response.data);
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
            //alert("Bye");
        };
    }, []);


    return (
        <div>

                <div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-header">

                                    <div className="row">
                                        <div className="col-xl-10">
                                            <h5><img src="/img/company.png" width="25px"></img> &nbsp; List of Companies</h5>
                                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                                        </div>
                                        <div className="col-xl-2">
                                            <Link to="/adminmain/addcompany" state = {{update: 0}}> <Button color="vk" size='tiny'>New Company</Button> </Link>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-block ">

                                    {companyDataSet && companyDataSet.map(data => 

                                        <span>                                        
                                            <div className="row">
                                                <div className="col-xl-5"> 
                                                    {data.title}                                                               
                                                </div>
                                                <div className="col-xl-5">
                                                    {data.country}
                                                </div>
                                                <div className="col-xl-2">
                                                    <Link to="/adminmain/editcompany" 
                                                        state = {{id: data.id, update: 1}} >
                                                    <Button color="vk" size='tiny'>View &nbsp; / &nbsp; Edit</Button> </Link>
                                                </div>
                                            </div>
                                            <br />
                                        </span>
                                            
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>                            

        </div>
    );

}