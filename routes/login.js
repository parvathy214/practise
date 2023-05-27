const express= require('express');
const SignupData= require('../model/signup');
const bcrypt = require('bcryptjs')
var router = express.Router();

router.post('/signin', async (req, res) => {
    console.log('Data reached backend');
    try {
      const user = req.body;
      const newUser = new SignupData(user);
      console.log(newUser);
      await newUser.save();
      res.status(201).json({ message: 'User created' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  });
  var jwt = require('jsonwebtoken');
  router.post('/login',async(req,res)=>{
    console.log('Data reached login backend');

    try {
        const user = req.body;
        const verifyuser = await SignupData.findOne({email:user.email});
        console.log(verifyuser);
        if (verifyuser){
            if(verifyuser.password == user.password){
                console.log(user.password);

                let payload = { email:user.email,password:user.password}
                let token = jwt.sign(payload,'ilikeapples13')
                console.log(token)


                res.status(200).json({message:'login success',token:token});
            }
            else{
                res.status(401).json({message:'invalid'});
            }
        }      
        else{
                res.status(404).json({message:'not found'});

            }
        

    } catch (error) {
        res.status(500).json({message:'failes to login'})
    }
  })


module.exports = router;