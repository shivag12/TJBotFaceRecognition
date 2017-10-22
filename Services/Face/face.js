const fs = require("fs");
const axios = require("axios").default;

const URL = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";
const DETECT = "/detect";
const PERSONGROUPS = "/persongroups";
const TRAIN = "/train"
const IDENTIFY = "/identify";
const CONTENT_TYPE_JSON = "application/json";
const CONTENT_TYPE_OCTET = "application/octet-stream";

/*
Detecting Face in the image.
*/
function detectFace(options) {
    return new Promise((resolve,reject)=>{
        axios({
            method: "post",
            url: `${URL}${DETECT}?returnFaceId=true`,
            headers: {
                "Ocp-Apim-Subscription-Key": options.subscriptionKey,
                "Content-Type": CONTENT_TYPE_OCTET
            },
            data: fs.readFileSync(options.url)
        }).then((res) => {
            return resolve(res.data);
        }).catch((err) => {
            return reject(err.response);
        });
    })    
}
/*
Add person face to person group
*/
function addPersonFace(options){
    return new Promise((resolve,reject)=>{
        axios({
            method : "post",
            url : `${URL}${PERSONGROUPS}/${options.personGroupId}/persons/${options.personId}/persistedFaces`,
            headers : {
                "Content-Type" : CONTENT_TYPE_OCTET,
                "Ocp-Apim-Subscription-Key" : options.subscriptionKey
            },
            data : fs.readFileSync(options.url)
        }).then((res)=>{
            return resolve(res.data);
        }).catch((err)=>{
            return reject(err.response.data);
        })
    })   
} 

/*
Create a person in the person group.
*/
function createPerson(options){
    return new Promise((resolve,reject)=>{
        axios({
            method : "post",
            url : `${URL}${PERSONGROUPS}/${options.personGroupId}/persons`,
            headers : {
                "Content-Type" : CONTENT_TYPE_JSON,
                "Ocp-Apim-Subscription-key" : options.subscriptionKey
            },
            data : {
                "name" : options.name,
                "userData" : options.userData
            }
        }).then((res)=>{
            return resolve(res.data);
        }).catch((err)=>{
            return reject(err.response.data);
        })
    })   
}

/*
Training the Persongroups 
*/
function trainPersonGroups(options){
    return new Promise ((resolve,reject)=>{
        axios({
            method : "post",
            url : `${URL}${PERSONGROUPS}/${options.personGroupId}/${TRAIN}`,
            headers : {
                "Content-Type" : CONTENT_TYPE_JSON,
                "Ocp-Apim-Subscription-key" : options.subscriptionKey
            }
        }).then((res)=>{
            return resolve(res.data);
        }).catch((err)=>{
            return reject(err.response);
        })
    })
}

/*
Person Group Training Status 
*/
function personGroupTrainingStatus(options){
    return new Promise ((resolve,reject)=>{
        axios({
            method : "get",
            url : `${URL}${PERSONGROUPS}/${options.personGroupId}/training`,
            headers : {
                "Content-Type" : CONTENT_TYPE_JSON,
                "Ocp-Apim-Subscription-key" : options.subscriptionKey
            }
        }).then((res)=>{
            return resolve(res.data);
        }).catch((err)=>{
            return reject(err.response.data);
        })
    })
}

/*
Identify the face and return the presistedfaceid
*/
function identifyFace(options){
    return new Promise ((resolve,reject)=>{
        axios({
            method : "post",
            url : `${URL}${IDENTIFY}`,
            headers : {
                "Content-Type" : CONTENT_TYPE_JSON,
                "Ocp-Apim-Subscription-key" : options.subscriptionKey
            },
            data : {
                "personGroupId" : options.personGroupId,
                "faceIds": [options.faceIds],
                "maxNumofCandidatesReturned" : 1,
                "confidenceThreshold" : 0.5
            }
        }).then((res)=>{
            return resolve(res.data);
        }).catch((err)=>{
            return reject(err.response.data);
        })
    })
}


module.exports = {
    detectFace,
    addPersonFace,
    createPerson,
    trainPersonGroups,
    identifyFace,
    personGroupTrainingStatus
}



