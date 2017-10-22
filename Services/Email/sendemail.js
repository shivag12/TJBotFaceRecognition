const sgMail = require("@sendgrid/mail");
//const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const APIKEY = {
    SENDGRID_API_KEY : "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"
}

const sendEmail = (options) => {
    
    sgMail.setApiKey(APIKEY.SENDGRID_API_KEY);    

    const msg = {
        to : options.to ,
        from : options.from,
        cc : options.cc,
        bcc : options.bcc,
        subject : options.subject ,
        text : options.text,
        templateId : options.templateId,
        substitutions : options.substitutions
    };
    
    return sgMail.send(msg).then((msg)=>{
        return msg ;
    }).catch((err)=>{
        return err ;
    })
}

module.exports = {
    sendEmail
}