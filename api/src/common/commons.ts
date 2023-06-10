import fs from "fs";
import { s3DeleteFile } from "../common/s3";

async function deleteFileFromuploadedLocation(file:string, destination:number) {

    if(destination == 1) {
        fs.unlink(__dirname + "/../../public/files/" + file, async function() {
            return;
        })
    } else if(destination == 2) {
        try {
            await s3DeleteFile(file, "inftmaker");            
        } catch (e:any) {
            throw new Error(e.message);
        }
    } else if(destination == 3) {
        await s3DeleteFile(file, "inftmaker");
        return;
    } else
        return;

}


export {
    deleteFileFromuploadedLocation
}