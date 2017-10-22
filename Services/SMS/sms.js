const twilio = require("twilio");

const applicationSid = "AC2f34e8828c13e832a242e3a1c265f025";
const authToken = "ecc36f87a72b3c43220bad96ec055b02";

var client = new twilio(applicationSid,authToken);

function sendSMS(options){
    return new Promise((resolve,reject)=>{
        client.messages.create({
            body : options.body,
            to : "+918105692902",
            from : "+16019120507"
        }).then((res)=>{
            resolve(res.sid);
        }).catch((err)=>{
            reject(err);
        })
    })    
}

module.exports = {
    sendSMS
}
