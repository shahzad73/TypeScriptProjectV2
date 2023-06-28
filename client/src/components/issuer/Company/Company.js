import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Pagination } from 'semantic-ui-react';
import commons from '../../common/Commons'


export default function Company() {
    const [companyDataSet, setCompanyDataSet] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    React.useEffect(() => {
        getPageData(0);

        return () => {
            //alert("Bye");
        };
    }, []);


    const handlePageChange = (event, data) => {        
        getPageData(data.activePage - 1);
    };


    function getPageData(page) {

        axios.get(
            "/accounts/company/companies",
            { params: {page: page, size: commons.getPaginationSize()} }).then(response => {
            setTotalPages ( commons.calculateTotalPages ( response.data.count ) );
            setCompanyDataSet(response.data.data);
        }).catch(function(error) {
            console.log(error);
        });

    }

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
                                            <Link to="/admin/issuer/addcompany" state = {{update: 0}}> <Button color="vk" size='tiny'>New Company</Button> </Link>
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
                                                    <Link to="/admin/issuer/editcompany" 
                                                        state = {{id: data.id, update: 1}} >
                                                    <Button color="vk" size='tiny'>View &nbsp; / &nbsp; Edit</Button> </Link>
                                                </div>
                                            </div>                                      
                                            <br />
                                        </span>
                                    )}

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

                </div>                            

        </div>
    );

}