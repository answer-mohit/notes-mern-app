const mongoose=require('mongoose');
const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
});
const noteModel=mongoose.model("note",noteSchema);
module.exports=noteModel;