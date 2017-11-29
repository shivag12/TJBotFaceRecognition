const faceRecognitionApi = require("./Services/Face/face");
const dbFunctions = require("./Database/dbfunctions");
const {sendSMS} = require("./Services/SMS/sms");
const {sendEmail} = require("./Services/Email/sendemail");
const db = require("./Database/db.json");
var TJBot = require('tjbot');

var hardware = ['servo','speaker'];
var credentials = {
    text_to_speech: {
        username: '74798bd9-8a0f-4960-a8e1-1a7612a036b5',
        password: 'C5Dk2UD3WJaq'
    }

}


var configuration = {
    robot: {
        gender: 'female',
	name : 'watson'
    },
    speak: {
        language: 'en-US'
    }
};


var tj = new TJBot(hardware,configuration,credentials);

const emailOptions = {
    to : "gshiva5@live.com",
    from : "gshiva3m@gmail.com",    
    subject : "TJBot Alert : Unidentified person"
}

/*
Detect the face in the image and identify the person
*/
function detectFaceAndIdentify(url){
    tj.wave();
    var faceProps = {
        subscriptionKey : db.subscriptionKey.key1,
        personGroupId : "tjbotpersongroup",
        url : url
    }
    faceRecognitionApi.detectFace(faceProps)
    .then((res)=>{
        if(res.length !== 0){
            faceProps.faceIds = res[0].faceId;        
            return faceRecognitionApi.identifyFace(faceProps); 
        } else { 
            //Text to Speech -- Message 
	     tj.lowerArm();         
            console.log("Cannot recognize the face..");
	    tj.speak("Cannot recognize the face, Please smile when its taking a photo");
            return null;
        }        
    }).then((res)=>{ 
        if(res !== null){
            if(res[0].candidates.length !== 0){
                dbFunctions.dbFindName(res[0].candidates[0].personId,(name)=>{
                    //Text to Speech -- Message -- Led Green and ArmMovement (Up)
		    tj.armBack();
                    console.log(`Recognized person name : ${name}`);
		    tj.speak(`Hi ${name}, My name is T.J.Bot, how can I help you. The weather looks cloudy today and temperature is 22 degree celisus`);
                })
            } else {
                var message = "An unidentified person detected. Login to Admin console to authorize it";
		tj.lowerArm();
		tj.speak("An unidentified person detected. Login to Admin console to authorize it");
                sendNotifications(message);
            }
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

/*
Send notifications - SMS , Email. 
*/
function sendNotifications(msg){
    sendSMS({
        body : msg
    }).then(()=>{
        console.log("SMS Send successfully..");
    }).catch((err)=>{
        throw new Error(err);
    })
    emailOptions.text = msg;
    sendEmail(emailOptions).then((msg)=>{
        console.log("Email Sent successfully..!");
    }).catch((err)=>{
        throw new Error(err);
    })
    console.log("Sorry couldn't identify the person");
}


module.exports = {
    detectFaceAndIdentify
}








