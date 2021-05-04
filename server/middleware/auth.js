require('dotenv').config();
const jwt=require('jsonwebtoken');

function auth(req,res,next){
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(402).send('Unauthorized!');
        }
//verified the token

const verified=jwt.verify(token,process.env.SECRET_KEY);
console.log(req.user);
req.user=verified.user
// res.send(res);
next();

    } catch (error) {
    console.log(error)
        res.status(402).send('Unauthorized!');
        // res.send(res);
    }
}
module.exports=auth;