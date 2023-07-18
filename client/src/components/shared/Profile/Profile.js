import React from "react";
import ProfilePersonal from "./ProfilePersonal";
import ProfileContacts from "./ProfileContacts";
import ProfileDocuments from "./ProfileDocuments";
import Addresses from "../../issuer/Addresses";
import Public_Enums_Constants from "../../common/Public_Enums_Constants";
import Documents from "../../common/documents";


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

        <ProfileDocuments></ProfileDocuments>
        <ProfilePersonal></ProfilePersonal>
        <ProfileContacts></ProfileContacts>
        <Addresses 
            id="-1"
            addressType = {Public_Enums_Constants.ADDRESS_TYPES.Profile}
            caption="List of Addresses" 
            sectionHelperText="you can add your addresses here Addresses "                
            icon = "address.png" 
        ></Addresses>
        <Documents 
            id="0"    // because type is Public_Enums_Constants.DOCUMENT_TYPES.Profile_Document so user id will be assiged on the server side
            caption="List of Profile Document"
            typeDocuments={Public_Enums_Constants.DOCUMENT_TYPES.Profile_Document}
            destination = {Public_Enums_Constants.SERVER_FILE_DESTINATION.AWS_Bucket_Public}
            buttonCaption="Upload Document"
            icon = "document.png"
            uploadDialogMessage="Upload Document"
            sectionHelperText="Please uplaod documents for uploading in cloud"
        ></Documents>        
    </div>  

  );    
}

