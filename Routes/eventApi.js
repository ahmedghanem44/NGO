const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const event = require('../Models/event');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/findAll',function(req,res){
    event.find(function(err,events){
        if(err) return err;
        res.json(events);
    })
});

router.get('/find/:id',function(req,res){
    event.findById(req.params.id,function(err,event){
        if(err) return err;
        res.json(event);
    })
});

router.post('/add',function(req,res){
    event.create(req.body,function(err,event){
        if(err) return err;
        res.json(event);
    })
});

router.delete('/delete/:id',function(req,res){
    event.findByIdAndRemove(req.params.id,function(err,event){
        if(err) return err;
        res.json(event);
    })
});

router.put('/update/:id',function(req,res){
    event.findByIdAndUpdate(req.params.id , req.body,function(err,event){
        if(err) return err;
        res.json(event);
    })
});

module.exports = router;
