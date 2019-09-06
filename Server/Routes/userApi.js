const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../Models/user');
// const add = require('./addressApi');

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
                street : req.body.street,
                zipCode : req.body.zipCode,
                city : req.body.city,
                state : req.body.state,
                country : req.body.country,
                urbanization: req.body.urbanization,
                address : req.body.address,
                cma : req.body.cma,
                isAdmin : req.body.isAdmin,
                // userName : req.body.userName,
                password : hashedPassword,
                cart : req.body.cart,
                donations : req.body.donations
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
    user.findOne({email: req.body.email}).then(function(u){
        // compare the password submitted (after hashing) to the database hashed password
        // the callback function will execute and return an error or true after comparison 
        bcrypt.compare(req.body.password,u.password,function(err,same){
            if(err){
                // if there is error while comapring return "Unauthorized access 401" and display the message
                return res.status(401).json({incorrect :'The password does not match the database'});
            }
            // if(isSamePasswod) ,which means the password matches, generate a new token
            if(same){
                // the token will be generated using email and id as payload ( cannot understand 'secret')
                const JWTtoken = jwt.sign({
                    email: u.email
                },
                'secret',
                {
                    expiresIn: '10m'
                });
                let checkAdmin = u.isAdmin;
                // return 200 OK and display message and return the JWT token created
                return res.status(200).json({success:'JWT has been created' , token: JWTtoken , isAdmin: checkAdmin,
                                    firstName: u.firstName,lastName: u.lastName , user : u });
            }else if(!same){
                return res.status(401).json({failed: u.password});
            }
            // in case the password does not match (isSamePassword = false) or no error (!err) occured while comparison 
            return res.status(401).json({failed: 'Unauthorized Access'});
        })
    }).catch(error=>{
        res.status(500).json({error: err});
    })
});


/** Create posts protected route */
//To create a post, the user needs to be authenticated first. A token is sent to post create route. 
//Pass verifyToken method as the second argument. 
//In jwt.verify method accepts a token from req.token and same secret key. 
//In the callback method err, and authData parameters are passed. If there is an error, status 403 is sent back. 
//Otherwise, a new post is created and the message with authData is sent to the client.
router.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                msg: "A new post is created",
                authData
            });
        }
    });
 });

 /** verifyToken method - this method verifies token */
//Verify token method is added to authenticate token. 
//This method accepts, req, res and next parameters. 
//The request header’s authorization key contains token and is assigned to a constant bearerHeader.
//Authorization token has a format as bearer <authorizatin_key>. Split the string with space. 
//Token is assigned to a constant bearerHeader. Assign token to req.token. 
//next() middleware method is called. If the header is undefined then a 403 status is returned to the client.
function verifyToken(req, res, next){
    //Request header with authorization key
    const bearerHeader = req.headers['authorization']; 
    //Check if there is  a header
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        //Get Token arrray by spliting
        const bearerToken = bearer[1];
        req.token = bearerToken;
        //call next middleware
        next();
    }
    else{
        res.sendStatus(403);
    }
 }


// find user by id (for internal user)
router.get('/find/:id',function(req,res){
    user.findById(req.params.id , function(err,user){
        if(err) return err;
        res.json(user);
    })
});

// find by email using POST
router.post('/findEmail',function(req,res){
    user.findOne({ email : req.body.email } , function(err,user){
        if(err) return err;
        res.json(user);
    })
});


// find by email using GET
router.get('/find/:email',function(req,res){
    user.findOne( req.body.email, function(err,user){
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

