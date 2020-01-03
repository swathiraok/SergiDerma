const nodemailer = require('nodemailer');
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
var passsowrd=s + decrypt.final('utf8');
console.log("password",passsowrd);

//console.log(mystr); //abc
//console.log('password',mykey.final('utf8'));


class Sender{
    constructor(mailTo, message) {
        //super();
        this.mailTo = mailTo;
        this.message = message;
      }
};

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 465,
    secure: true,
    service:'gmail',
    auth: {
        user: "pavitro.finch@gmail.com",
        //pass: "7795038340abcdef"
        pass: passsowrd
    }
});

let message = {
    from: 'pavitro.finch@gmail.com',
    to: 'finchProduct333@gmail.com',
   // to: mailTo,
    subject: 'Design Your Model S | Tesla',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
};

module.exports={Sender,transport,message};