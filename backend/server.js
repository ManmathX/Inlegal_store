const express = require('express');
const cors = require('cors');
const routes = require('./routes/user');
const route = require('./routes/post');
const productRoute = require('./routes/product');
const PORT = 3001;
const app = express()

app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173','http://localhost:3000'] }))
app.use('/post',route)
app.use('/user',routes)
app.use('/product', productRoute)
app.listen(PORT,()=>{
    console.log(`sever running on port ${PORT}`)
})
