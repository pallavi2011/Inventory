const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

connectDB();
app.use(cors());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, OPTIONS');
    next();
});
app.get('/', (req, res) => res.send('Api running'))
app.use(express.json({ extended: false}));
app.use('/api/users', require('./routes/api/user'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/category', require('./routes/api/category'));
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))