const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const donation = require('../Models/donation');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/findAll',function(req,res){
    donation.find(function(err,donations){
        if(err) return err;
        res.json(donations);
    }).populate('user event')
});

router.get('/find/:id',function(req,res){
    donation.findById(req.params.id,function(err,donation){
        if(err) return err;
        res.json(donation);
    })
});

router.post('/add',function(req,res){
    donation.create(req.body,function(err,donation){
        if(err) return err;
        res.json(donation);
    })
});

router.delete('/delete/:id',function(req,res){
    donation.findByIdAndRemove(req.params.id,function(err,donation){
        if(err) return err;
        res.json(donation);
    })
});

router.put('/update/:id',function(req,res){
    donation.findByIdAndUpdate(req.params.id , req.body,function(err,donation){
        if(err) return err;
        res.json(donation);
    })
});

router.post('/savedonations',function(req,res){
    donation.insertMany(req.body,function(err,donations){
        if(err) return err;
        res.json(donations);
    })
});

module.exports = router;
