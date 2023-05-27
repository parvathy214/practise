const express = require('express');
const SignupData= require('../model/signup')
const bookdata = require('../model/book')
var router = express.Router();
var jwt = require('jsonwebtoken');



function verifyToken(req,res,next){
    try {
        console.log(req.headers.authorization)
        if(!req.headers.authorization) throw('unauthorized auth')
        let token=req.headers.authorization.split(' ')[1] 
        console.log(token)
        if(!token) throw('unauthorized jwt')
        let payload=jwt.verify(token,'ilikeapples13')
        if(!payload) throw('unauthorized payload') 
    //    res.status(200).send(payload) 
        next()    
    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
  
  }

router.get('/books',async(req,res)=>{
    try {
        const books = await bookdata.find();
        res.json({data:books,message:'success'}).status(200)
        
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})
router.get('/single/:id',async(req,res)=>{
    console.log('edit reached backend')
    try {
        let id = req.params.id;
        let book = await bookdata.findById({_id:id})
        res.send(book);

    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})

router.post('/add',verifyToken  ,async(req,res)=>{
    try {
        
        const book = req.body;
        const newbook = new bookdata(book)
        await newbook.save();
        res.json({ message: 'Data saved successfully' }).status(201)

        
    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})

router.put('/edit/:id',  verifyToken, async(req,res)=>{
    try {
        console.log('data reached backend edit')
        let id = req.params.id;
        let book = req.body;
        const upbook = await bookdata.findByIdAndUpdate({_id:id},{$set:book})
        res.json({message :'Data updated succesfully'}).status(200)

    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})

router.delete('/delete/:id', verifyToken, async(req,res)=>{
    try {
        let id = req.params.id;
    await bookdata.findByIdAndDelete({_id:id});
    res.json({message :'Data deleted succesfully'}).status(200)

    } catch (error) {
        console.log(error)
        res.json({message:error}).status(400)
    }
})


module.exports=router