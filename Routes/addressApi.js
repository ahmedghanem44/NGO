const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const address = require('../Models/address');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/findAll',function(req,res){
    address.find(function(err,addresses){
        if(err) return err;
        res.json(addresses);
    })
});

router.get('/find/:id',function(req,res){
    address.findById(req.params.id,function(err,address){
        if(err) return err;
        res.json(address);
    })
});

router.post('/add',function(req,res){
    address.create(req.body,function(err,address){
        if(err) return err;
        res.json(address);
    })
});

router.delete('/delete/:id',function(req,res){
    address.findByIdAndRemove(req.params.id,function(err,address){
        if(err) return err;
        res.json(address);
    })
});

router.put('/update/:id',function(req,res){
    address.findByIdAndUpdate(req.params.id , req.body,function(err,address){
        if(err) return err;
        res.json(address);
    })
});

module.exports = router;
