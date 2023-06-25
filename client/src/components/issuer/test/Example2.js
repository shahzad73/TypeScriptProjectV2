import React, { useContext, useState } from 'react';
import AppContext from '../../common/AppContext';
import {useNavigate} from "react-router-dom";

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Pagination from 'react-bootstrap/Pagination'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";


export default function Example() {

    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(true);
    const [alertButtonShow, setAlertButtonShow] = useState(true);
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      alert(JSON.stringify(inputs));
    }
  

    React.useEffect(() => {
        //alert ("loaded control")

        return () => {
            //alert("unloade controal")
        };
    }, []);
        

    return (    
        <div>

                <div className="row">
                <div className="col-md-6 col-xl-4">
                    <div className="card daily-sales">
                        <div className="card-block">
                            <h6 className="mb-4">Daily Sales</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">67%</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div className="card daily-sales">
                        <div className="card-block">
                            <h6 className="mb-4">Daily Sales</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">67%</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4">
                    <div className="card daily-sales">
                        <div className="card-block">
                            <h6 className="mb-4">Daily Sales</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$ 249.95</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">67%</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                </div>


                <div className="row">

                    <DropdownButton
                        alignRight
                        title="Dropdown right"
                        id="dropdown-menu-align-right"
                        >
                                <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                                <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                                <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
                    </DropdownButton>

                    <Alert variant="success">
                        <Alert.Heading>Hey, nice to see you</Alert.Heading>
                        <p>
                            Aww yeah, you successfully read this important alert message. This example
                            text is going to run a bit longer so that you can see how spacing within an
                            alert works with this kind of content.
                        </p>
                        <hr />
                        <p classNameName="mb-0">
                            Whenever you need to, be sure to use margin utilities to keep things nice
                            and tidy.
                        </p>
                    </Alert>


                    <Alert show={alertButtonShow} variant="danger">
                        <Alert.Heading>How's it going?!</Alert.Heading>
                        <p>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                        lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                        fermentum.
                        </p>
                        <hr />
                        <div classNameName="d-flex justify-content-end">
                        <Button onClick={() => setAlertButtonShow(false)} variant="outline-success">
                            Close me y'all!
                        </Button>
                        </div>
                    </Alert>

                    {!alertButtonShow && <Button onClick={() => setAlertButtonShow(true)}>Show Alert</Button>}


                    <br />
                                                            

                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>  



                    <Container>
                        <Row>
                        <Col sm={5}>

                        <>
                        {['top', 'right', 'bottom', 'left'].map((placement) => (
                            <OverlayTrigger
                            key={placement}
                            placement={placement}
                            overlay={
                                <Tooltip id={`tooltip-${placement}`}>
                                Tooltip on <strong>{placement}</strong>.
                                </Tooltip>
                            }
                            >
                            <Button variant="secondary">Tooltip on {placement}</Button>
                            </OverlayTrigger>
                        ))}
                    </>


                        </Col>
                        <Col sm={7}>
                        
                                


                            <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                <p>
                                Change this and that and try again. Duis mollis, est non commodo
                                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                                Cras mattis consectetur purus sit amet fermentum.
                                </p>
                            </Alert>

                            {!showAlert && <Button onClick={() => setShowAlert(true)}>Show Alert</Button>}
                                                                            


                        </Col>
                        </Row>
                        <Row>
                        <Col sm>
                            <Button variant="primary">
                                Profile <Badge bg="secondary">9</Badge>
                                <span classNameName="visually-hidden">unread messages</span>
                            </Button>
                        </Col>
                        <Col sm>bar</Col>
                        <Col sm>



                        <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>


                        </Col>
                        </Row>
                    </Container>



                </div>

                <ProgressBar now={60} />


                <br /><br /><br />

                <div>
                <Badge bg="primary">Primary</Badge> <Badge bg="secondary">Secondary</Badge>{' '}
                <Badge bg="success">Success</Badge> <Badge bg="danger">Danger</Badge>{' '}
                <Badge bg="warning" text="dark">
                Warning
                </Badge>{' '}
                <Badge bg="info">Info</Badge>{' '}
                <Badge bg="light" text="dark">
                Light
                </Badge>{' '}
                <Badge bg="dark">Dark</Badge>
                </div>


                <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>


                <>
                <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal  show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>


                <br /><br /><br />


                <div className="col-xl-8 col-md-6">
                <div className="card Recent-Users">
                    <div className="card-header">
                        <h5>Recent Users</h5>
                    </div>
                    <div className="card-block px-0 py-3">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <tbody>
                                    <tr className="unread">
                                        <td><img className="rounded-circle"  src="assets/images/user/avatar-1.jpg" alt="activity-user" /></td>
                                        <td>
                                            <h6 className="mb-1">Isabella Christensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fas fa-circle text-c-green f-10 m-r-15"></i>11 MAY 12:56</h6>
                                        </td>
                                            <td><a href="#!" className="label theme-bg2 text-white f-12">Reject</a><a href="#!" className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle"  src="assets/images/user/avatar-2.jpg" alt="activity-user" /></td>
                                        <td>
                                            <h6 className="mb-1">Mathilde Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fas fa-circle text-c-red f-10 m-r-15"></i>11 MAY 10:35</h6>
                                        </td>
                                        <td><a href="#!" className="label theme-bg2 text-white f-12">Reject</a><a href="#!" className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle"  src="assets/images/user/avatar-3.jpg" alt="activity-user" /></td>
                                        <td>
                                            <h6 className="mb-1">Karla Sorensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fas fa-circle text-c-green f-10 m-r-15"></i>9 MAY 17:38</h6>
                                        </td>
                                        <td><a href="#!" className="label theme-bg2 text-white f-12">Reject</a><a href="#!" className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle"  src="assets/images/user/avatar-1.jpg" alt="activity-user" /></td>
                                        <td>
                                            <h6 className="mb-1">Ida Jorgensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted f-w-300"><i className="fas fa-circle text-c-red f-10 m-r-15"></i>19 MAY 12:56</h6>
                                        </td>
                                        <td><a href="#!" className="label theme-bg2 text-white f-12">Reject</a><a href="#!" className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle"  src="assets/images/user/avatar-2.jpg" alt="activity-user" /></td>
                                        <td>
                                            <h6 className="mb-1">Albert Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fas fa-circle text-c-green f-10 m-r-15"></i>21 July 12:56</h6>
                                        </td>
                                        <td><a href="#!" className="label theme-bg2 text-white f-12">Reject</a><a href="#!" className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>                                                        
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>

                <div>
                <div className="col-xl-4 col-md-6">
                <div className="card card-event">
                <div className="card-block">
                    <div className="row align-items-center justify-content-center">
                        <div className="col">
                            <h5 className="m-0">Upcoming Event</h5>
                        </div>
                        <div className="col-auto">
                            <label className="label theme-bg2 text-white f-14 f-w-400 float-right">34%</label>
                        </div>
                    </div>
                    <h2 className="mt-3 f-w-300">45<sub className="text-muted f-14">Competitors</sub></h2>
                    <h6 className="text-muted mt-4 mb-0">You can participate in event </h6>
                    <i className="fab fa-angellist text-c-purple f-50"></i>
                </div>
                </div>
                <div className="card">
                <div className="card-block border-bottom">
                    <div className="row d-flex align-items-center">
                        <div className="col-auto">
                            <i className="feather icon-zap f-30 text-c-green"></i>
                        </div>
                        <div className="col">
                            <h3 className="f-w-300">235</h3>
                            <span className="d-block text-uppercase">TOTAL IDEAS</span>
                        </div>
                    </div>
                </div>
                <div className="card-block">
                    <div className="row d-flex align-items-center">
                        <div className="col-auto">
                            <i className="feather icon-map-pin f-30 text-c-blue"></i>
                        </div>
                        <div className="col">
                            <h3 className="f-w-300">26</h3>
                            <span className="d-block text-uppercase">TOTAL LOCATIONS</span>
                        </div>
                    </div>
                </div>
                </div>
                </div>                                        
                </div>


                <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Basic Table</h5>
                            <span className="d-block m-t-5">use className <code>table</code> inside table element</span>
                        </div>
                        <div className="card-block table-border-style">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            <th>Username</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                            <td>@mdo</td>
                                        </tr>                                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>


                <form onSubmit={handleSubmit}>
                <label>Enter your name:
                <input 
                    type="text" 
                    name="username" 
                    value={inputs.username || ""} 
                    onChange={handleChange}
                />
                </label>
                <label>Enter your age:
                    <input 
                    type="number" 
                    name="age" 
                    value={inputs.age || ""} 
                    onChange={handleChange}
                    />
                    </label>
                    <input type="submit" />
                </form>                  


        </div>
    );


}


