const { Router } = require("express")
var nodemailer = require('nodemailer')

const router = Router()

router.post("/", async (req, res) => {
    console.log(req.body.from);
    console.log(req.body.to);
    console.log(req.body.subject);
    console.log(req.body.message);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tarikmusic111@gmail.com',
            pass: 'gpuywjsfbettqssp'
        }
    })
    // hetcimmuhi@gmail.com
    // tarikmusic111@gmail.com
    var mailOptions = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.message
        // ima i opcija slanja HTML-a 
        // html: '<h1>Hello</h1><p>This is html message</p>'
    }
    
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
            // res.status(200).send('email was successfuly send')
        } else {
            console.log('Email Sent: ' + info.response);
            // res.status(400).send('error occured!')
        }
    })

})



module.exports = router