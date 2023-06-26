import React from "react";
import ProfilePersonal from "./ProfilePersonal";
import ProfileContacts from "./ProfileContacts";
import Addresses from "../../issuer/Addresses";

export default function Profile() {

    React.useEffect(() => {
        return () => {
            //alert("Bye");
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

        <ProfilePersonal></ProfilePersonal>
        <ProfileContacts></ProfileContacts>
        <Addresses 
            id="-1"
            addressType="1"
            caption="I addresses" 
            sectionHelperText="you can add your addresses here Addresses "                
            icon = "address.png" 
        ></Addresses>
    </div>  

  );    
}

