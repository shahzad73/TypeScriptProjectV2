import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CompanyInfo from "./CompanyInfo";
import Paras from "../paras";
import Contacts from "../Contacts"
import Documents from "../../common/documents";
import Addresses from "../Addresses";
import Public_Enums_Constants from "../../common/PublicEnums";


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
                typePara = {Public_Enums_Constants.PARAGRAPH_TYPES.Company}
                caption="List of Company paragraphs"                
                sectionHelperText="Please set company paragraphs"                
                icon = "document.png"                
            ></Paras>
            <Contacts 
                id={location.state.id} 
                contactType = {Public_Enums_Constants.CONTACT_TYPES.Company}
                caption="List of Company Contacts" 
                sectionHelperText="Set your company contacts"                
                icon = "contacts.png"                 
            ></Contacts> 
            <Addresses 
                id={location.state.id}
                addressType = {Public_Enums_Constants.ADDRESS_TYPES.Company}
                caption="Company addresses" 
                sectionHelperText="you can add companies addresses here Addresses "                
                icon = "address.png" 
            ></Addresses>            
            <Documents 
                id={location.state.id} 
                caption="List of Company Document"
                typeDocuments={Public_Enums_Constants.DOCUMENT_TYPES.Company_Document}
                destination = {Public_Enums_Constants.SERVER_FILE_DESTINATION.AWS_Bucket_Public}
                buttonCaption="Upload Document"
                icon = "document.png"
                uploadDialogMessage="Upload Document"
                sectionHelperText="Please uplaod documents for uploading in cloud"
            ></Documents>
            <Documents 
                id={location.state.id} 
                caption="List of Company Images"
                typeDocuments={Public_Enums_Constants.DOCUMENT_TYPES.Company_Image}
                destination = {Public_Enums_Constants.SERVER_FILE_DESTINATION.AWS_Bucket_Public}                
                buttonCaption="Upload Image"   
                icon = "image.png"           
                uploadDialogMessage="Upload Image"                  
                sectionHelperText="Please uplaod images for uploading"                
            ></Documents>
        </div>
    );

}
