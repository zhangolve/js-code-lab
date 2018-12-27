const nodemailer = require('nodemailer');
const redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);    
const gmailKey = 'gmail';


nodemailer.createTestAccount(async () => {
    let auth = await getAsync(gmailKey);
    auth = JSON.parse(auth);
    console.log(auth);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,//465,
        secure: false, // true for 465, false for other ports
        auth: {
            user: auth.user,// "zhangolve@gmail.com", // generated ethereal user
            pass: auth.pass // generated ethereal password
        }
    });

    let mailOptions = {
        from: '"zhangolve 👻" <zhangolve@gmail.com>', // sender address
        to: '1262010981@qq.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
});

nodemailer.createTestAccount();