const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');
const randomString = require('random-string');
const nodemailer = require('nodemailer');

const Adult = require('../models/adult');
const {tks, email, pemail, urlEnv} = require('../config/config');

mongoose.connect('mongodb://localhost:27017/stint');
mongoose.Promise= global.Promise;

// ROUTES GO HERE

// Register
router.post('/register', [
    check('name')
        .escape()
        .trim()
        .exists(),
    check('email')
        .isEmail()
        .matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)        
        .escape()
        .trim()
        .exists(),
    check('password')
        .escape()
        .trim()
        .exists(),
    check('pin')
        .escape()
        .trim()
        .exists()
        
], (req, res) => {
    // check validity of values
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // there are some validation errors
        //return res.status(400).json({errors: 'Something went wrong, check your input'});
        return res.status(400).json({errors: 'Something went wrong, check your input'});
    }
    // hash password before saving
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync( (req.body.password).toLowerCase(), salt);
    const vhash = randomString({length: 20});
    // create a Adult User
    const adult = new Adult({
        "name": req.body.name,
        "email": req.body.email.toLowerCase(),
        "password": hash,
        "pin": req.body.pin,
        'verifyHash': vhash
    });
    adult.save( (err, result) => {
        if (err) {
            return res.status(500).json({error: 'Could not Register You. Try again.'})
        }
        // NODE MAILER - send a verification email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: email,
                pass: pemail
            }
        });
        // setting up the data to send off
        //#TODO - change localhost url in html to reflect production email
        const mailOptions = {
            from: `"Edwin at Stint" <${email}> `,
            to: req.body.email,
            subject: "Stint Needs Email Verification",
            html: "<h2>Hey " + req.body.name + "</h2><h3>Thank you for registering to Sting</h3><p>For sercurity reasons, we need to verify that you are the person/entitfy that just registered with us. </p><p>Please click on the link below to complete verification</p><br><a href='" + urlEnv+"api/register/" + result._id+"/" + vhash + "'>VERIFY HERE</a>"
        };
        // send mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return console.log("nodemailer", err);
            
            return res.status(200).json({
                adult: result,
                verified: false 
            }); 
        });
    })

})

//router.get('/users', (req, res) => {
    // User.find()
    //     .then(data => {
    //         res.status(201).json({datum: data});
    //     });
    //
//})

module.exports = router;