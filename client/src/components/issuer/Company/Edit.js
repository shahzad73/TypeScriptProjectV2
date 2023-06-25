import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CompanyInfo from "./CompanyInfo";
import Paras from "../paras";
import Contacts from "../Contacts"
import Documents from "../documents";
import Addresses from "../Addresses";

export default function EditCompany(props) {
    const [companyID, setCompanyID] = useState(0);
    const location = useLocation();

    React.useEffect((props) => {
        const id = location.state.id;
        setCompanyID(id);

        return () => {
            //alert("This is where when control is being transferred to another page");
        };

    }, []);


    return (
        <div>
            <CompanyInfo id={location.state.id}></CompanyInfo>

            <Paras 
                id={location.state.id} 
                typePara="1"
                caption="List of Company paragraphs"                
                sectionHelperText="Please set company paragraphs"                
                icon = "document.png"                
            ></Paras>
            <Contacts 
                id={location.state.id} 
                contactType="1"
                caption="List of Company Contacts" 
                sectionHelperText="Set your company contacts"                
                icon = "contacts.png"                 
            ></Contacts> 
            <Addresses 
                id={location.state.id}
                addressType="2"
                caption="Company addresses" 
                sectionHelperText="you can add companies addresses here Addresses "                
                icon = "address.png" 
            ></Addresses>            
            <Documents 
                id={location.state.id} 
                caption="List of Company Document"
                typeDocuments="1"
                destination="2"
                buttonCaption="Upload Document"
                icon = "document.png"
                uploadDialogMessage="Upload Document"
                sectionHelperText="Please uplaod documents for uploading in cloud"
            ></Documents>
            <Documents 
                id={location.state.id} 
                caption="List of Company Images"
                typeDocuments="2"
                destination="2"                
                buttonCaption="Upload Image"   
                icon = "image.png"           
                uploadDialogMessage="Upload Image"                  
                sectionHelperText="Please uplaod images for uploading"                
            ></Documents>
        </div>
    );

}
