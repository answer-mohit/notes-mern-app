const router=require('express').Router();
const noteModel=require('../models/notesModel');
const auth=require('../middleware/auth');

router.post("/add",auth,async(req,res)=>{
    const {title,body}=req.body;
try {
    const saveNotes=new noteModel({title,body});
    await saveNotes.save();
res.status(201).send('your data saved');
} catch (error) {
    res.status(401).send(error);
    console.log(error);
}
});

router.get('/',auth,async(req,res)=>{
try {
    const exitnote=await noteModel.find();
    res.status(201).send(exitnote);
    // console.log(exitnote);
} catch (error) {
    console.log(error);
    res.status(401).send(error)
}
});

//specific notes item
router.get("/detail/:id",auth,async(req,res)=>{
    const {id}=req.params;
    try {
        const SingleNote= await noteModel.findById(id);
        res.status(201).send(SingleNote);
      
    } catch (error) {
        console.log(error);
    res.status(401).send(error)
    }
})
router.put("/update/:id",auth,async(req,res)=>{
const {id}=req.params;
try {
    const savedNote=await noteModel.findByIdAndUpdate(id,req.body);
    const repeatNote=await savedNote.save();
    res.status(201).send('data updated');
    // console.log(repeatNote)
} catch (error) {
    console.log(error)
    res.status(401).send(error);
}
});

router.delete("/delete/:id",auth,async(req,res)=>{
    const id=req.params.id;
    try {
        const deleteNote= await noteModel.findByIdAndDelete(id);
        res.status(201).send('data deleted');
// console.log(deleteNote);
        
    } catch (error) {
        console.log(error);
        res.status(401).send('data not deleted');
    }
});






module.exports=router;