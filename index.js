const express = require('express');
const userRoutes = require('./routers/users_routes')
const app = express();
const mongoose = require('./config/database_connection');
require('dotenv').config();

mongoose();
app.use(express.json());

app.use('/',userRoutes)

app.listen(1000,()=>{
    console.log("server-listen 5000")
})