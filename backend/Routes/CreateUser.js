const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body,validationResult} = require('express-validator');

//to generate json web token at the time of login
const jwt = require("jsonwebtoken");
//to require store the encrypted form of the password in the database
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#";

//post request
router.post("/createuser",
[body('email','Incorrect Email format!!').isEmail(),
body('name').isLength({min:5}),
body('password','Choose your password of atleast 5 characters').isLength({min:5})]

,async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errorss:errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)

    try{
       await User.create({
            name:req.body.name,
            password:secPassword,
            email: req.body.email,
            location:req.body.location 
        })
    res.json({success:true});
    
    }catch(error){
        console.log(error);
        res.json({success:false});
    }
})

router.post("/loginuser",[
body('email').isEmail(),
body('password','incorrect password').isLength({min:5})]
,async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){//if error arrayis not empty
        return res.status(400).json({errorss:errors.array()});
    }
   
    let email = req.body.email;
   
    try{
    let userData = await User.findOne({email});
    
    if(!userData){//account nhi hai iss credentials ka
        return res.status(400).json({errors:"Try logging with correct credentials"});
    }
//compare the entered password with the already saved encrypted password if there's a match
    // await bcrypt.compare(req.body.password,userData.password,function(err,result){
    //     if(err){
    //         console.log(err);
    //         return res.status(400).json({errors:"Try logging with correct credentials"});;
    //     }

    //     if(result){
    //         const data = { 
    //             user:{
    //                 id:userData.id
    //             }
    //         }
    //         const authToken = jwt.sign(data,jwtSecret)
    //         return res.json({success:true,authToken:authToken});
    //     }else{
    //         return res.status(400).json({errors:"Try logging with correct credentials"});
    //     }
    // },function(progress){
    //     console.log('Comparison progress:', progress);
    // });

    const pwdCompare = bcrypt.compare(req.body.password,userData.password);

    //password match nhi kra
    if(!pwdCompare){
        return res.status(400).json({errors:"Try logging with correct credentials"});     
    }
        const data = { 
            user:{
                id:userData.id
                }
        }

        const authToken = jwt.sign(data,jwtSecret)
        //data is payload, jwtsecret is secret  
        return res.json({success:true,authToken:authToken});

    }catch(error){
        console.log(error);
        res.json({success:false});
    }
})

module.exports = router;
