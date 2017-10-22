const faceRecognition = require("./Services/Face/face");
const yargs = require("yargs");
const dbfunctions = require("./Database/dbfunctions");

/*
Command line inputs
*/
yargs.command("CreatePerson","Create person to the TJBot user group",{
    name : {
        alias : "n",
        required : true,
        description : "Name of the person",
        string : true
    },
    PersonGroupId : {
        alias : "pgi",
        required : true,
        description : "Registered person Group Id",
        string : true
    },
    userData : {
        alias : "ud",
        required : false,
        description : "Information about the person",
        string : true
    }
})
.example("CreatePerson", "CreatePerson --pgi=TJBotUserGroup --n=xyz")
.command("AddPersonFace","Adding person face to the person in the TJBot user group",{  
    personGroupId : {
        alias : "pgi",
        required : true,
        description : "Registered person Group Id",
        string : true     
    },
    personId : {
        alias : "pid",
        description : "Target Person that the face is added to",
        required : true,
        string : true
    },
    URL : {
        alias : "u",
        required : true,
        description : "Face image URL or Path",
        string : true
    }
})
.example("AddPersonFace", "AddPersonFace --pgi=tjbotpersongroup --pid=123sdf123 --u=./photos/image.jpg")
.help("h")
.alias("h","help")
.argv;

const options = {
    personGroupId : yargs.argv.pgi,
    name : yargs.argv.n,
    userData : yargs.argv.ud,
    personId : yargs.argv.pid,
    url : yargs.argv.u    
}

options.subscriptionKey = "5726665aff4e4579a20e7109b1f4e297";

if(yargs.argv._[0] === "CreatePerson"){
    faceRecognition.createPerson(options)
    .then((msg)=>{
        //Storing the value in the database
        dbfunctions.createPerson({
            name : options.name,
            personGroupId : options.personGroupId,
            personId : msg.personId,
            userData : options.userData
        },(err)=>{
            if(err) throw new Error(err)
        })
        console.log(msg);
    }).catch((err)=>{
        console.log(err);
    })    
} else if (yargs.argv._[0] === "AddPersonFace") {
    faceRecognition.addPersonFace(options)
        .then((msg)=>{
            console.log(msg);
            return faceRecognition.trainPersonGroups(options)            
        }).then(()=>{
            //Storing the values in the database
            dbfunctions.addPersonFace({
                personId : options.personId,
                persistedFaceIds : msg.persistedFaceId
            })
        })
        .catch((err)=>{
            console.log(err);
        })
}
