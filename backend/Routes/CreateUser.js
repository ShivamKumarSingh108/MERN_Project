const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisEndtoEndYoutubeChannel$#"

router.post("/createuser", [
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    // body('text').isLength({ min: 3 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
  ],
    async (req, res) => {
      console.log(req);
      const errors = validationResult(req);
       console.log(errors)
      if (!errors.isEmpty()){
          return res.status(400).json({ errors: errors.array() });
        
      }
        
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);


      try{
          await User.create({
             name: req.body.name,
             email: req.body.email,
            //  location: req.body.location,.
            location: req.body.location,
            //  password: req.body.Password 
             password: secPassword 
           }).then(res.json({ success: true }))
        }   
        catch(error){
         console.log(error)
         res.json({sucess: false});
        }
             
    }
)





router.post('/loginuser', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    let email=req.body.email;
    try{
        let userData = await User.findOne({ email });

        if(!userData){
          return res.status(400).json({errors: "Try logging with correct credentials"})
        }
         const pwdCompare = await bcrypt.compare(req.body.password, userData.password)

        if(!pwdCompare){
          return res.status(400).json({errors: "Try logging with correct credentials"})
        }
         
        const data = {
            user:{
              id:userData.id
            }
        }
         
        const authToken = jwt.sign(data, jwtSecret)
        res.json({sucess: true, authToken:authToken});
      }catch(error){
       console.log(error)
       res.json({sucess: false});
      }
           
  }
)


module.exports = router