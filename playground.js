const faceRecognition = require("./Services/Face/face");


faceRecognition.personGroupTrainingStatus({
    subscriptionKey : "7f0e6b0318d4435881cf7852d1ff4315",
    personGroupId : "tjbotpersongroup"
}).then((msg)=>{
    console.log(msg.status);
})