var Gpio = require('onoff').Gpio,
button = new Gpio(4, 'in', 'both');
const PiCamera = require("pi-camera");
const {detectFaceAndIdentify} = require("../Index");
const faceRecognitionApi = require("../Services/Face/face");
var flag = true;
var cameraProps = null;

button.watch(function(err, value) {
    //Capturing the image from the Raspicamera. 
    cameraProps = {
        mode: 'photo',
        output: `../photos/CapturedPhotos/${new Date().getTime()}.jpg`,
        width: 2592,
        height: 1944,
        nopreview: false,
        timeout : 1000
    }
    const Pic = new PiCamera(cameraProps);

    if(value === 1) {
        if(flag){
            flag = false;  
            Pic.snap().then((res)=>{
                flag = true;
                console.log("Picture Captured");
                FacialRecognition();
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
});


function FacialRecognition(){
    faceRecognitionApi.personGroupTrainingStatus()
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

