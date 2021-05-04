require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();
require('./conn/db');
const cookieParser=require('cookie-parser');
const PORT=process.env.PORT||5000;

//use middleare 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({credentials:true}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('this is running');

});


app.use("/auth",require('./routers/userRouter'));
app.use("/notes",require('./routers/notesRouter'));
app.listen(PORT,()=>console.log('server is running'+ 5000));