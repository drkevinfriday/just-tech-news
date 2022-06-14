const express = require('express');
const routes =require('./routes')
const sequalize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extened: true}))


// turn on  routes

app.use(routes);


//turn on connection to db and server
sequalize.sync({force:false}).then(()=>{
    app.listen(PORT,() =>console.log('Now Listening'))
})