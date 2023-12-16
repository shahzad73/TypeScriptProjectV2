import React, { useState, useContext } from "react";
import axios from 'axios';
import { Button, Form, Pagination, PaginationProps } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import commons from '../../common/Commons'
import { useLocation } from  "react-router-dom";
import { IToken } from "../../entities/Token";
import { ICompany } from "../../entities/Company";

export default function TokenList() {
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [contactModelShow, setContactModelShow] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");
    const [companiesList, setCompaniesList] = useState([] as ICompany[]);
    const [tokenList, setTokenList] = useState([] as IToken[]);    
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();      


    React.useEffect(() => {
        //alert(location.state.type);
        getPageData(0)
        return () => {
            //alert("Bye");
        };
    }, []);

    const handlePageChange = (
        event:  React.MouseEvent<HTMLAnchorElement>, 
        data: PaginationProps
    ) => {
        getPageData(data.activePage? - 1 : 0);
    };    

    function getPageData(page: number) {
        axios.get("/accounts/token/token",
        { params: {page: page, size: commons.getPaginationSize()} }).then(response => {
            response.data.company.unshift({id:-1, Title:"<No Company>"});
            setCompaniesList(  response.data.company  );
            setTokenList(  response.data.token  );
            setTotalPages ( commons.calculateTotalPages ( response.data.tokenRecordCount ) );
        }).catch(function(error) {
            console.log(error);
        });
    }
    const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
        axios.post("/accounts/token/addtoken", data).then(response => {
            response.data.company.unshift({id:-1, Title:"<No Company>"});            
            setCompaniesList(  response.data.company  );
            setTokenList(  response.data.token  );
            setContactModelShow(false);
        }).catch(function(error) {
            console.log(error);
        });
    }

    const newToken = () => {
        reset();
        setContactModelShow(true);
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
                                        <h5><img src="/img/token.png" width="33px"/> &nbsp; Tokens List</h5>
                                    </div>
                                    <div className="col-xl-2">
                                        <Button color="vk" onClick={newToken} size='tiny'>New Token</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-block table-border-style">

                                {tokenList && tokenList.map((dat: IToken) =>                                    
                                    <span>
                                        <br />
                                        <div className="row">
                                            <div className="col-xl-2"> 
                                                    <img src="/img/edit.png" className="listIconImage"  ></img>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <img src="/img/delete.png" className="listIconImage" ></img>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </div>
                                            <div className="col-xl-6">
                                                {dat.title}
                                            </div>
                                            <div className="col-xl-4">

                                                {dat.isDeployed ? (<span></span>) : ( 
                                                    <span>
                                                        <Link to="/admin/issuer/tokendeploy" state = {{id: dat.id}}> 
                                                        <Button color="vk" size='tiny'>Deploy</Button> </Link>    
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </span>
                                                ) }

                                                {dat.isDeployed ? ( 
                                                    <span>
                                                        <Link to="/admin/issuer/tokencap" state = {{id: dat.id}}> 
                                                        <Button color="vk" size='tiny'>CAP Table</Button> </Link>                                                        
                                                    </span>
                                                ) : (<span></span>) }


                                                <Link to="/admin/issuer/tokenview" state = {{id: dat.id}}> 
                                                <Button color="vk" size='tiny'>Info</Button> </Link>

                                                <Link to="/admin/issuer/tokenholders" state = {{id: dat.id}}> 
                                                <Button color="vk" size='tiny'>Holders</Button> </Link>    
                                                                                           
                                            </div>
                                        </div>
                                    </span> 
                                )}

                                <br />

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

            <Modal size="lg" show={contactModelShow} onHide={() => setContactModelShow(false)}>
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <Modal.Header closeButton>
                    <Modal.Title><img src="/img/token.png" width="33px"/> &nbsp; Add New Token</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >
                        <br />
                        <div>
                            <div className="row">

                            <span className="ErrorLabel">{errorMessages}</span>

                                <div className="row">
                                    <div className="col-md-2"> Title </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            <Form.Field>
                                                <input type="text" className="form-control" placeholder="Enter Title" 
                                                    id="title"  
                                                    {...register("title", { required: true, minLength:5, maxLength: 100 })}    
                                                />   
                                            </Form.Field>
                                            {errors.title && <p className="ErrorLabel">Title is required (min 5, max 100 characters) </p>}
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-2"> Company </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                                <Form.Field>
                                                    <select 
                                                    id="companyID"  
                                                    {...register("companyID")} 
                                                    className="form-control form-select">
                                                        { companiesList && companiesList.map( (dat: ICompany) =>
                                                            <option value={dat.id}> {dat.title} </option>
                                                        )}
                                                    </select>
                                                </Form.Field>
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-md-2"> Details </div>
                                    <div className="col-md-10">
                                        <div className="form-group">
                                            <Form.Field>
                                                <textarea  className="form-control" placeholder="Enter Title" 
                                                    id="details"  
                                                    {...register("details", { required: true, minLength:5, maxLength: 100 })}
                                                />   
                                            </Form.Field>
                                            {errors.details && <p className="ErrorLabel">Details is required (min 5, max 100 characters) </p>}
                                        </div>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div>

                            </div>
                        </div>
                        <br /><br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button color="vk" type="submit" size="tiny">Save</Button>
                    &nbsp;&nbsp;
                    <Button color="red" type="button" size="tiny" onClick={() => setContactModelShow(false)}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );

}