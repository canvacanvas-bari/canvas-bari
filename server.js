const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// অর্ডার স্টোর করার জন্য মেমোরি অ্যারে
let orders = [];

// অর্ডার রিসিভ করার রুট
app.post('/order', (req, res) => {
    const newOrder = req.body;
    orders.push(newOrder);
    console.log("নতুন অর্ডার এসেছে:", newOrder);
    res.send(`
        <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
            <h2 style="color:green;">🎉 আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!</h2>
            <p>খুব শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।</p>
            <a href="/" style="background:#007bff; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">হোম পেজে ফিরে যান</a>
        </div>
    `);
});

// অ্যাডমিন প্যানেল (অর্ডার দেখার জন্য)
app.get('/admin/orders', (req, res) => {
    res.json(orders);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
