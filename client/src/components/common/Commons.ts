import axios from 'axios';
import { AxiosResponse, AxiosProgressEvent } from 'axios';
import { useDashboardNavigateHook } from './useDashboardNavigateHook';

const uploadFilesArray: Record<string, any> = {};
type SetStateFunction<T> = (newValue: T | ((prevValue: T) => T)) => void;
interface MyJsonResponse {
    status: number;
    file: string;
}
type JsonFunction = (json: MyJsonResponse) => void;

const PaginationSize :number = 4;
const LinkToAPIServer: string = "http://localhost:7000";


const Commons = {

    getDBErrorMessagesText: function(errors: any[]) {
        var objErrors = "";
        errors.forEach(obj=>{
            for (var name in obj.constraints) {
                objErrors = objErrors + "  " + obj.constraints[name];
            }                                           
        })
        return objErrors;
    },

    getCountryNamesJSON: function(): string[] {
        return [
            "Pakistan",
            "India",
            "Swisszerland"
        ]
    },

    setUploadFilesSelectionEvent(event: React.ChangeEvent<HTMLInputElement> ) {
        //uploadFilesArray[event.target.id] = event.target.files?[0]
        uploadFilesArray[event.target.id] = event.target.files ? event.target.files[0] : undefined;
    },

    calculateTotalPages(value: number) {
        if(value == 0)
            return 0;
        
        var quotient = Math.floor(value / PaginationSize);
        const remainder = value % PaginationSize;
        if(remainder > 0)
            quotient++;

        return quotient;
    },

    getPaginationSize() {
        return PaginationSize;
    },

    getLinkToAPIServer() {
        return LinkToAPIServer;
    },

    uploadFile: function( 
        url: string, 
        fileID: string, 
        fileDestination: number, 
        updatePercentage: SetStateFunction<number>,
        documentFilesUploadedEvent: JsonFunction
    ) {
        let formData = new FormData();
        //const [formData, setFormData] = useState<FormData>(new FormData());

        formData.append("file", uploadFilesArray[fileID]);

        return axios.post(url + "?destination=" + fileDestination, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: function(progressEvent: AxiosProgressEvent) {
                const ttt = progressEvent.total;
                if(ttt != null) {
                    const p = Math.round(
                    (100 * progressEvent.loaded) / ttt
                    );
                    updatePercentage(p);
                } else
                    updatePercentage(0);
            },
        }).then((data) => {
            delete( uploadFilesArray[fileID] );
            documentFilesUploadedEvent({"status": 1, "file":data.data.fileName });            
            updatePercentage(0);
        }).catch((err) => {
            documentFilesUploadedEvent({"status": 0, "file":"" });  
            updatePercentage(0);
        });
    }

}


export default Commons;