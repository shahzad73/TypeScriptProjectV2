import AWS from 'aws-sdk';
import { bool } from 'aws-sdk/clients/signer';
import fs from 'fs';
import { Exception } from 'handlebars';
import { json } from 'stream/consumers';

async function s3GetBucketsList(): Promise<any> {

    let promise = new Promise<any>((resolve, reject) => {
        const s3 = new AWS.S3({apiVersion: '2006-03-01'});

        s3.listBuckets((err: any, data: any) => {            
            if (err) {
                reject ("Error occurred in s3 getBucketsList - " + err.toString())
            } else
                resolve ( data.Buckets )
        })
    });

    return await promise;
}

async function s3UploadFile(fileName: string, filePath: string, bucket: string): Promise<string> {

    let promise = new Promise<any>((resolve, reject) => {

        const s3 = new AWS.S3({apiVersion: '2006-03-01'});
        const fileContent = fs.readFileSync(filePath + "/" +fileName);

        const params = {
            Bucket: bucket,
            Key: `${fileName}`,
            Body: fileContent
        }

        s3.upload(params, (err: any, data: any ) => {
            if (err) 
                reject(err)
            else 
                resolve( data.Location );
        })

    });

    return await promise;       

}

async function s3DeleteFile(fileName: string, bucket: string): Promise<void> {

    let promise = new Promise<any>(async (resolve, reject) => {


        const s3 = new AWS.S3({apiVersion: '2006-03-01'});

        const params = {
            Bucket: bucket,
            Key: fileName,
        };

        try {
            await s3.deleteObject(params);
            resolve("done");
        } catch (e:any) {
            console.log("first catch")
            reject("error");
        }

    });

    return await promise;  

}

// this will upload files to FileBase file service which is IPFS pinning service
// it also uses the AWS code base
async function s3UploadFileFileBase(fileName: string, filePath: string): Promise<string> {
    let promise = new Promise<any>(async (resolve, reject) => {

        const myPictureFile = fs.readFileSync("/home/shahzad/background.jpeg")
        
        const AWS = require('aws-sdk');

        const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            accessKeyId: '62D38ABC331888B0EF8F',
            secretAccessKey: '9Jd0aqwzymUMlwycoBuqrRE6u8xr3dSSoeOfWWVx',
            endpoint: 'https://s3.filebase.com',
            region: 'us-east-1',
            s3ForcePathStyle: true
        });

        const params = {
            Bucket: 'inftmaker',
            Key: 'testfile2.png',
            ContentType: 'image/png',
            Body: myPictureFile,
            ACL: 'public-read',
        };

        console.log("obj created")
        const request = s3.putObject(params);
        await request.send();
        console.log("file send")

        resolve( "success" );
    });

    return promise;
}

export {
    s3GetBucketsList,
    s3UploadFile,
    s3DeleteFile,
    s3UploadFileFileBase
}