const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../Models/user');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/findAll' , function(req,res){
    user.find(function(err,users){
        if(err) return err ;
        res.json(users);
    })
});


// singing up a new user account after filling the form ( like creating a new user)
router.post('/signup', function(req,res){
    // salt rounds set to zero to decrease the time needed to hash the code (but less secure) 
    var saltRounds= 0;
    // can be deleted
    console.log(req.body);
    // hashing the password submitted by the user to store the encrypted one in the database
    // the callback function will return either an error or the hashed (encrypted) password
    bcrypt.hash(req.body.password,saltRounds,function(err,hashedPassword){
        if(err){
            // The message will be displayed in case of error while hashing the password
            return res.status(500).json({error :"Issue with password hashing has been detected , please try again"});
        }else{
            // if hashing succeed , a new user will be created using the information sent in the request body
            const u = new user({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phone : req.body.phone,
                cma : req.body.cma,
                isAdmin : req.body.isAdmin,
                userName : req.body.userName,
                password : hashedPassword,
            });
            // save the newly created user and (then) return 200 OK status along with the message to confirm success
            u.save().then(function(result){
                console.log(result);
                res.status(200).json({success : 'A new user has been successfully signed up'});
            // catches error while saving the user in the database and diplay the message    
            }).catch(error =>{
                res.status(500).json({error:'Issue while saving the new user to database : failed to create a new user'})
            })
        }
    })
});

router.post('/signin',function(req,res){
    // find the user by his/her email
    // callback fundtion will get the result from the findOne if the user email is found in the database
    user.findOne(req.body.email).then(function(u){
        // compare the password submitted (after hashing) to the database hashed password
        // the callback function will execute and return an error or true after comparison 
        bcrypt.compare(req.body.password,u.password,function(err,isSamePassword){
            if(err){
                // if there is error while comapring return "Unauthorized access 401" and display the message
                return res.status(401).json({incorrect :'The password does not match the database'});
            }
            // if(isSamePasswod) ,which means the password matches, generate a new token
            if(isSamePassword){
                // the token will be generated using email and id as payload ( cannot understand 'secret')
                const JWTtoken = jwt.sign({
                    email: u.email,
                    id : u.id
                },
                'secret');
                // return 200 OK and display message and return the JWT token created
                return res.status(200).json({success:'JWT has been created' , token: JWTtoken });
            }
            // in case the password does not match (isSamePassword = false) or no error (!err) occured while comparison 
            return res.status(401).json({failed: 'Unauthorized Access'});
        })
    }).catch(error=>{
        res.status(500).json({error: err});
    })
});


// find user by id (for internal user)
router.get('/find/:id',function(req,res){
    user.findById(req.params.id , function(err,user){
        if(err) return err;
        res.json(user);
    })
});

// to delete an account using its id 
router.delete('/delete/:id', function(req,res){
    user.findByIdAndRemove(req.params.id , function(err,user){
        if (err) return err;
        res.json(user);
    })
});


// update a user ('new' option has been added and set to true to return the updated user not the old one)
router.put('/update/:id', function(req,res){
    user.findByIdAndUpdate(req.params.id , req.body,{new:true}, function(err,user){
        if (err) return err;
        res.json(user);
    })
});

module.exports = router;

