const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cart = require('../Models/cart');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/findAll',function(req,res){
    cart.find(function(err,carts){
        if(err) return err;
        res.json(carts);
    }).populate('user event')
});

router.get('/find/:id', function(req,res){
    cart.findById(req.params.id , function(err,cart){
        if(err) return err;
        res.json(cart);
    })
});

router.post('/add' , function(req,res){
    cart.create(req.body , function(err, cart){
        if(err) return err;
        res.json(cart);
    })
});


router.put('/update/:id' , function(req,res){
    cart.findByIdAndUpdate(req.params.id , req.body ,  function(err,cart){
        if(err) return err;
        res.json(cart);
    })
});

router.delete('/delete/:id' , function(req,res){
    cart.findByIdAndRemove(req.params.id , function(err,cart){
        if(err) return err;
        res.json(cart);
    })
});

router.get('/findbyuser/:userid',function(req,res){
    cart.find({user:{_id: req.params.userid}},function(err,cart){
        if(err) return err;
        res.json(cart);
    }).populate('user event')
});

router.delete('/deleteusercart/:userid',function(req,res){
    cart.deleteMany({user:{_id: req.params.userid}},function(err,cart){
        if(err) return err;
        res.json(cart);
    })
});


module.exports = router;