var Gpio = require('onoff').Gpio,
button = new Gpio(4, 'in', 'both');
const PiCamera = require("pi-camera");
const {detectFaceAndIdentify} = require("./FacialRecognition");
const faceRecognitionApi = require("./Services/Face/face");
const db = require("./Database/db.json");
var flag = true;
var cameraProps = null;

var options = {
    subscriptionKey : db.subscriptionKey.key1,
    personGroupId : "tjbotpersongroup"
}

button.watch(function(err, value) {
    //Capturing the image from the Raspicamera. 
    cameraProps = {
        mode: 'photo',
        output: `../photos/CapturedPhotos/${new Date().getTime()}.jpg`,
        width: 640,
        height: 480,
        nopreview: false,
        timeout : 1000
    }
    const Pic = new PiCamera(cameraProps);

    if(value === 1) {
        if(flag){
            flag = false;  
            Pic.snap().then((res)=>{                
                console.log("Picture Captured");
                FacialRecognition();
                flag = true;
            }).catch((err)=>{
                console.log(err);
            })
        } else {
            console.log("Please Wait..!!, Facial Recognition process is still running")
        }
    }
});


function FacialRecognition(){
    faceRecognitionApi.personGroupTrainingStatus(options)
    .then((msg)=>{
        if(msg.status === "succeeded"){
            detectFaceAndIdentify({url : cameraProps.output});
        } else {
            console.log("Person Group is not trained");
        }
    }).catch((err)=>{
        console.log(err);
    })
}

