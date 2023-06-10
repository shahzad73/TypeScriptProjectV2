import React, { useContext, useState,  } from 'react';
import AppContext from '../common/AppContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
    Link
  } from "react-router-dom";


export default function Items() {
  const [inputs, setInputs] = useState([]);
  const [message, setMessage] = useState("");

  const appContext = useContext(AppContext);
  const navigate = useNavigate();  


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(inputs => ({...inputs, [name]: value}))
  }


  React.useEffect((props) => {

    return () => {
        //alert("Bye");
    };
    
  }, []);


  async function getJwt() {
      //const { data } = await axios.get(`/api/login?username=shahzad&password=aaa`);

      axios.post('http://localhost:7000/public/loginplatform', {
        email: inputs.email,
        password: inputs.password
      })
      .then(function (response) {
            if(response.data.status == 0) {
                setMessage("Login is not successful")
            } else {
                appContext.globalSetJwtToken( response.data.token );
                navigate('/platformmain', { replace: true })
            }
      })
      .catch(function (error) {
         alert ("Not successful");
      });

  };


  return (  

    <div className="auth-wrapper">
        <br /><br /><br /><br />
        <div className="auth-content">
            <div className="auth-bg">
                <span className="r"></span>
                <span className="r s"></span>
                <span className="r s"></span>
                <span className="r"></span>
            </div>
            <div className="card">
                <div className="card-body text-center">
                    <div className="mb-4">
                        <i className="feather icon-unlock auth-icon"></i>
                    </div>
                    <h3 className="mb-4">Login</h3>
                    <div className="input-group mb-3">
                        <input type="email" id="email" name="email" onChange={handleChange} className="form-control" placeholder="user" />
                    </div>
                    <div className="input-group mb-4">
                        <input type="password" id="password" name="password" onChange={handleChange} className="form-control" placeholder="password" />
                    </div>
                    <div className="form-group text-left">
                        <div className="checkbox checkbox-fill d-inline">
                            <input type="checkbox"  name="checkbox-fill-1" id="checkbox-fill-a1" checked="" />
                            <label for="checkbox-fill-a1" className="cr"> Save Details</label>
                        </div>
                    </div>
                    <button className="btn btn-primary shadow-2 mb-4" onClick={() => getJwt()} >Login</button>
                    <br />
                    <span style={{"color": "red"}}> {message} </span>
                    <br /><br />
                    <p className="mb-2 text-muted">Forgot password &nbsp;&nbsp; <Link to={`/recoverpassword`}>Recover</Link> </p>
                    <p className="mb-0 text-muted">Don’t have an account &nbsp;&nbsp;  <Link to={`/signup`}>Signup</Link> </p>
                </div>
            </div>
        </div>
    </div>

  );
}
