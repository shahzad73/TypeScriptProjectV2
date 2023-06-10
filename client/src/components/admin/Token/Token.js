import React, { useState } from "react";
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [contactModelShow, setContactModelShow] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");
    const [companiesList, setCompaniesList] = useState([]);
    const [tokenList, setTokenList] = useState([]);    

    React.useEffect(() => {
        axios.get("/accounts/token/token").then(response => {
            response.data.company.unshift({id:-1, Title:"<No Company>"});
            setCompaniesList(  response.data.company  );
            setTokenList(  response.data.token  );
        }).catch(function(error) {
            console.log(error);
        });

        return () => {
            //alert("Bye");
        };
    }, []);


    const onFormSubmit = (data) => {
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

                                {tokenList && tokenList.map(dat =>                                    
                                    <span>
                                        <br />
                                        <div className="row">
                                            <div className="col-xl-2"> 
                                                    <img src="/img/edit.png" className="listIconImage"  ></img>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <img src="/img/delete.png" className="listIconImage" ></img>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </div>
                                            <div className="col-xl-8">
                                                {dat.title}
                                            </div>
                                            <div className="col-xl-2">
                                                <Link to="/adminmain/tokenview" 
                                                state = {{id: dat.id}}
                                                > <Button color="vk" size='tiny'>View</Button> </Link>
                                            </div>
                                        </div>
                                    </span> 
                                )}

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
                                                    name="title"
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
                                                    name="companyID"
                                                    {...register("companyID")} 
                                                    className="form-control form-select">
                                                        { companiesList && companiesList.map(dat =>
                                                            <option value={dat.id} label={dat.Title} />
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
                                                    name="details"
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