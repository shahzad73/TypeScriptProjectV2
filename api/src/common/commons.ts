import fs from "fs";
import { s3DeleteFile } from "../common/s3";
import { params } from "../entity/params";
import Public_Enums_Constants from "./Public_Enums_Constants"

async function deleteFileFromuploadedLocation(file:string, destination:string) {

    if(destination == Public_Enums_Constants.SERVER_FILE_DESTINATION.Server_Public_Folder ) {
        fs.unlink(__dirname + "/../../public/files/" + file, async function() {
            return;
        })
    } else if(destination == Public_Enums_Constants.SERVER_FILE_DESTINATION.AWS_Bucket_Public) {
        try {
            const data = await params.findOne ({where: { param: "AWS_Cloud_Public_Folder" }});
            if(data != null)
                await s3DeleteFile(file, data.strValue); 
            else
                throw new Error("AWS Public folder setting not found in params table");                
        } catch (e:any) {
            throw new Error(e.message);
        }
    } else if(destination == Public_Enums_Constants.SERVER_FILE_DESTINATION.AWS_Bucker_Private) {
        const data = await params.findOne ({where: { param: "AWS_Cloud_Private_Folder" }});
        if(data != null)
            await s3DeleteFile(file, data.strValue); 
        else
            throw new Error("AWS Public folder setting not found in params table");           
    } else
        return;

}

export {
    deleteFileFromuploadedLocation
}
