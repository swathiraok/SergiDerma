const express = require("express");
const router = express.Router();
var mail = require('../../Component/mailSenderWithTemp');
//var require = require('email-templates').EmailTemplate;
const {check, validationResult} = require('express-validator/check');
const { Sender,transport,message } = require('../../Component/emailSender');
const { handleError,ValidaError } = require('../../CenterErrorHandle/error')

//load patientBasicInfor model
const PatientBasicInfo = require("../../models/PatientBasicInformation");
const Patient = require("../../models/Patient");

const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const fieldEncryption = require('mongoose-field-encryption');




//@rounte POST api/mailSender
//@description send mailSender
// public access

router.post("/sendTo",async(req,res,next) =>{
    //var message=new Sender('pavitro.finch@gmail.com','hi')
    const email=req.query.to;
    const sub=req.query.status;
    console.log("param",email)
        switch(req.query.status){
            case 'Requested':
                console.log(req.query.status);
               //sendMethod(message);
               // sendMethod(message,res)
               var receiver = 'pavitro.finch@gmail.com';
               var username = 'theUsername';
               var name = 'theNameOfTheUser';
               var password = 'http://yourdomain.com/some-password-links';

               //encrypt searching
               const messageToSearchWith = new Patient({ email });
                     messageToSearchWith.encryptFieldsSync();
                     console.log("email",messageToSearchWith.email);
              await Patient.findOne({email:messageToSearchWith.email},function(err,info){
                   try {
                    if(err)
                    throw new ValidaError(500,err);
                    else
                    if(info==null)
                    throw new ValidaError(400,"Unable to find!!")
                    else
                    console.log("response",info);
                    mail.sendPasswordReset(email, username, name, password,res);
                   } catch (error) {
                       next(error);
                   } 
               });
                break;
            case 'Accepted':
                console.log(req.query.status);
                break;
            case 'Cancelled':
                console.log(req.query.status);
                break;
            case 'Confirmed':
                console.log(req.query.status);
                break;
            case 'Reschedule':
                console.log(req.query.status);
                break;
        }
    
});

/* 
 mail sending fuction
*/
function sendMethod(message,resp){
    transport.sendMail(message,(err,res) =>{
        if(err){
            console.log("error",err);
             return resp.status(500).send(err)
        }
        else
        {
            console.log("response",res)
             return resp.status(200).send({message:"mail send successfully.."})
        }
    });
}

module.exports=router;