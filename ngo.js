const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const db = 'mongodb://localhost:27017/ngo';

const donations = require('./Routes/donationApi');
const carts = require('./Routes/cartApi');
const addresses = require('./Routes/addressApi');
const events = require('./Routes/eventApi');
const users = require('./Routes/userApi');

app.use('/donations',donations);
app.use('/cart',carts);
app.use('/address',addresses);
app.use('/events',events);
app.use('/users',users);

mongoose.connect(db,err=>{
    if(err){
        console.log('Error!' + err)
    }else{
        console.log('Connected to mongodb')
    }
});

app.get('/',(req,res)=>{
    res.send('Default Route')
});

app.listen(port,() => console.log('Lisenting to port '+port));