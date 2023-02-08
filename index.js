require('dotenv').config()
const express = require('express');
const app = express();
const Port = process.env.PORT || 3000;
const path = require('path')
const Razorpay = require('razorpay')
const cors = require('cors')


app.set('view engine','ejs')
app.set('views',"views")
app.use(express.json())
app.use(cors())

var instance = new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
});

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/thank',(req,res)=>{
    res.render('thank');
})
app.post('/payment', (req, res) => {
    const amount = req.body.amount;

    var options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
   let order =  instance.orders.create(options, function (err, order) {
        console.log(order);
    });

    res.status(201).json({
        success:true,
        order,
        amount
       
    })
})

app.listen(Port, () => {
    console.log(`Server Started Successfully at ${Port}`);
})