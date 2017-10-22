const db = require("./db.json");
const fs = require("fs");

function createPerson(options,cb){
    const person = {
        name : options.name,
        personId : options.personId,
        personGroupId : options.personGroupId,
        userDate : options.userDate,
        persistedFace : []        
    }
    try {        
        db.persons.push(person);
        writeFile(db,(err)=>{
            if(err) throw new Error(err);
        })
    } catch (error) {
        cb(error)
    }    
}

function addPersonFace(options,cb){
    db.persons.forEach(function(element) {
        if(element.personId === options.personId){
            element.persistedFace.push(options.persistedFaceIds);
            writeFile(db,(err)=>{
                if(err) throw new Error(err);
            })
        }        
    });
}

/*
Finding name of the person
*/
function dbFindName(Id,cb){
    db.persons.forEach(function(element) {
        if(element.personId === Id){
            cb(element.name);
        }     
    });
}

function writeFile(updateDb,cb){
    try {
        fs.writeFile("./Database/db.json",JSON.stringify(updateDb,null,2),(err)=>{
            if(err) cb(err);
        })
    } catch (error) {
        cb(err);
    }
}

module.exports = {
    createPerson,
    addPersonFace,
    dbFindName
}