import React, { Component } from "react";
import {
    Link
  } from "react-router-dom";

  import { Button, Form, Segment, Checkbox } from 'semantic-ui-react'

export default function RecoverPassword() {
    
  React.useEffect(() => {
      //alert("Hello");

      return () => {
          //alert("Bye");
      };

  }, []);


  return (  
        <div> 
            <br /><br /><br />

            <div className="row justify-content-md-center">
                <div className="col-1"></div>
                <div className="col-10">        
                    <img src="img/register-banner.jpg" width="100%" height="200px" />
                </div>
                <div className="col-1"></div>
            </div>

            
            <div className="row justify-content-md-center">
                <div className="col-1">
                </div>
                <div className="col-3">
                    <br /><br /><br /><br />
                    <img src="img/register.jpg" width="100%" />
                </div>
                <div className="col-5">
                    <br />
                    <div className="section-title">
                    <h2>Recover</h2>
                    <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fuga</p>
                    </div>

                    <Form>
                        <Form.Field>
                            <label>Enter Email Address</label>
                            <input placeholder='First Name' />
                        </Form.Field>
                        
                        <Button type='submit'>Submit</Button>
                    </Form>

                </div>
                <div className="col-3">
                </div>

            </div>


        </div> 
    );    

}    