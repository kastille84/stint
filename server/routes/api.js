const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const {check, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const randomString = require('random-string');
const nodemailer = require('nodemailer');

const Adult = require('../models/adult');
const Child = require('../models/child');
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
            html: "<h2>Hey " + req.body.name + "</h2><h3>Thank you for registering to Stint</h3><p>For sercurity reasons, we need to verify that you are the person/entitfy that just registered with us. </p><p>Please click on the link below to complete verification</p><br><a href='" + "http://localhost:3000/" +"signin/" + result._id+"/" + vhash + "'>VERIFY HERE</a>"
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
    // Register Verify
router.get('/register/:id/:vhash', (req, res) => {
    const id = req.params['id'];
    const vhash = req.params['vhash'];
    
    //query the ADULT collection for an id
    Adult.findByIdAndUpdate(id, {
        verified: true
    }).exec()
    .then(result => {
        return res.status(200).json({message: 'verified'});
    })
    .catch(err => {
        return res.status(500).json({error: 'could not verify'});
    })
});

// SIGNIN
router.post('/signin', [
    check('email')
        .isEmail()
        .trim()
        .escape()
        .exists(),
    check('password')
        .trim()
        .escape()
        .exists()
    ], (req, res) => {
        // validate values
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(500).json({message: 'Invalid Inputs'});
        }
        // check email, password credentials
        Adult.find({email: (req.body.email).toLowerCase()})
            .populate('children').exec()
            .then(adult => {
                // if adult hasn't been verified... don't go any further
                if (adult[0].verified === false) {
                    
                    return res.status(500).json({message: "We emailed you the verfication steps the finish setting up your account."})
                }
                //verified at this point
                bcrypt.compare((req.body.password).toLowerCase(), adult[0].password, (err, same) =>{
                    if (err) {
                        console.log('got hurr');
                        return res.status(500).json({message: 'Could not login. Try again later'});
                    }
                    if (same) {
                        // passwords match
                            // create token
                            const token = jwt.sign({id: adult[0]._id}, tks, {expiresIn: '2h'});
                            // send token & success message
                            // ALSO... send the adult data obj
                            return res.status(200).json({
                                token: token,
                                user: adult[0]
                            });
                    }else {
                        // not Email/Password Match
                        return res.status(500).json({message: 'Could not login. Try again later'});
                    }

                })
            })
            .catch(error => {
                // person does not exist on server
                return res.status(403).json({message: "Wrong email/password"});
            })
});

// pin submission
router.post('/pin-submit', [
        check('pin')
        .exists()
        .trim()
        .escape()
    ], (req, res) => {
    // validate values
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(500).json({message: 'Invalid Inputs'});
    }
    // 
    if (req.body.whoType === 'adult'){
        Adult.findOne({_id: req.body.whoId, pin: req.body.pin}).exec()
            .then(adult => {
                res.status(200).json({type: 'adult', _id: adult._id})
            })
            .catch(err =>{
                res.status(500).json({error: "Wrong Pin"})
            })
    }
    if (req.body.whoType === 'child') {
        Child.findOne({_id: req.body.whoId, pin: req.body.pin}).exec()
            .then(child => {
                res.status(200).json({type: 'child', _id: child._id})
            })
            .catch(err =>{
                res.status(500).json({error: "Wrong Pin"})
            })
    }


    
})

// ***  D A S H B O A R D 

    // addChild
router.post('/addChild', [
        check('name')
            .exists()
            .trim()
            .escape(),
        check('pin')
            .exists()
            .trim()
            .escape()
    ], (req, res) => {
    // check validity of values
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // there are some validation errors
        //return res.status(400).json({errors: 'Something went wrong, check your input'});
        return res.status(400).json({errors: 'Something went wrong, check your input'});
    }
    
    let childId = null;
    //empty ChoreSchedule Object
    const scheduleObj = {
        mon: {
            chores: [],// will hold list of {choreName: '', completed: false}
        },
        tue: {
            chores: [],
        },
        wed: {
            chores: [],
        },
        thu: {
            chores: [],
        },
        fri: {
            chores: [],
        },
        sat: {
            chores: [],
        },
        sun: {
            chores: [],
        },
    };
    // Child Schema, add child record
    Child.create({
        adultId: req.body.parentId,
        name: req.body.name,
        pin: req.body.pin,
        schedule: scheduleObj
    }, (err, child) =>{
        if (err){
            // could not add child to db
            res.status(500).json({message: 'Could not add child'})
        }
        // at this point, child has been created
        // Adult Schema, add a child to children array
        Adult.findById(req.body.adultId, (err, adult) => {
            if (err) {
                // adult doesn't exist
                res.status(500).json({message: 'No Adult'});
            }
            // updating children array
            let children = adult.children;
            children.push(child._id);
            adult.update({children: children}).exec()
                .then(result => {
                    res.status(200).json({child: child});
                }) 
                .catch(err =>{
                    res.status(500).json({message: "Could not update adult"})
                });

        })

    })   
});

// Edit Child
router.post('/editChild', [
        check('name')
            .exists()
            .trim()
            .escape(),
        check('pin')
            .exists()
            .trim()
            .escape()
    ],(req, res) => {
    // check validity of values
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // there are some validation errors
        return res.status(400).json({errors: 'Something went wrong, check your input'});
    }

    Child.findByIdAndUpdate(req.body.childId, {
        name: req.body.name,
        pin: req.body.pin
    }, {new: true}).exec()
        .then(child => {
            return res.status(200).json({child: child});
        })
        .catch(err =>{
            return res.status(500).json({err: 'No Child'})
        })
});

    // Get Family
router.get('/getfam/:id', (req, res) => {
    console.log('got here');
    const id = req.params._id;
    Adult.findById(id)
        .populate('children').exec()
        .then(fam => {
            return res.status(200).json({fam: fam});
        })
        .catch(err => {
            return res.status(500).json({err: err});
        })
});

//router.get('/users', (req, res) => {
    // User.find()
    //     .then(data => {
    //         res.status(201).json({datum: data});
    //     });
    //
//})

module.exports = router;