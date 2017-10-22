
const {detectFaceAndIdentify} = require("./Index");
const faceRecognitionApi = require("./Services/Face/face");

function FacialRecognition(){
    faceRecognitionApi.personGroupTrainingStatus()
    .then((msg)=>{        
        if(msg.status === "succeeded"){
            detectFaceAndIdentify("./photos/TestPhotos/identify_rajan.jpg");
        } else {
            console.log("Person Group is not trained");
        }
    }).catch((err)=>{
        console.log(err);
    })
}

FacialRecognition();