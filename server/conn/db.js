require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_DB,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('db connect')).catch((err)=>console.log(err));
