
var crypto = require('crypto');

/* encrypt dataa */
var pt = "7795038340abcdef";
var key = "abcdefghijklmnopqrstuvwx";
var encrypt = crypto.createCipheriv('des-ede3', key, "");
var theCipher = encrypt.update(pt, 'utf8', 'base64');
theCipher += encrypt.final('base64');
console.log("encrypt",theCipher);
//var theCipher = "ccZmMULq3tlzAY+iafZz+96xz+qFsAuGpEjhN7CckJTcdBT03fgobfSVGCGYzILyPNSA3e3msUqHUTCpv8kRnWvFdLv9c+GTEhg+Lj5dOThGDHtkQX2j5bd6Eubw9/l+Lcwj0PeyW0ZoVkB5Nnp1yCnmKAn2Euliq+IurgthT+wln6cQmTjXfL4IB5VxwUEb72FcbeiCfbKxa+MxxbcQTCpli3ErSptwdp9on2k87JTPFqyyMmMRFA9VgOXpHNe43IwFzME01DyHZ+Rp/eQguTmY9FtkFIZeD2e2nrbbDbW6tlk/KOtdhGVIlIGMPNS5m8LYqlrGZlJU3JythEy+J0z1wW1owjVe9Yto2OtUe8WeKI744enBKAX4FnD4My7+/XRjbF5kf6loT9lqeMCdXFb3LDej3GVcKWbJuZjXmD4=";

/* decrypt data */
var decrypt = crypto.createDecipheriv('des-ede3', key, "");
decrypt.setAutoPadding(false);
var s = decrypt.update('HSaMTCYkXKrUcHJS2hEKcRVAjW/hWAWj', 'base64', 'utf8');
var password=s + decrypt.final('utf8');
console.log("password",password);

var sender = 'pavitro.finch@gmail.com'   // The emailto use in sending the email(Change the @ symbol to %40 or do a url encoding )
//var password = '7795038340abcdef'  // password of the email to use

var nodeMailer = require("nodemailer");
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require ('path'); 
//const htm= require ('../template/sample.ejs')


//var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');
var transporter = nodeMailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 465,
    secure: true,
    service:'gmail',
    auth: {
        user: sender,
        pass: password
    }
});

// create template based sender function
// assumes text.{ext} and html.{ext} in template/directory
let template = new EmailTemplate(path.join(__dirname, 'template', 'sample.ejs'));
 var sendResetPasswordLink = transporter.templateSender(
    new EmailTemplate('./template/resetPassword'), {
        from: 'pavitro.finch@gmail.com',
    });


    // var sendResetPasswordLink = transporter.templateSender(
    //     new EmailTemplate(path.join(__dirname, 'template')));

exports.sendPasswordReset = function (email, username, name, tokenUrl,res) {
    sendResetPasswordLink({
        to: email,
        subject: 'Password Reset - YourDomain.com'
    }, {
        name: name,
        username: username,
        token: tokenUrl
    }, function (err, info) {
        if (err) {
            console.log(err)
            res.status(500).json(err);
            //info.json(err);
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
            res.status(200).json({message:"mail send successfully!"});
            //info.json("info");
        }
    });
};