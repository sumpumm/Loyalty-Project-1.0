const { getUser } = require('../services/auth');

function checkUserAuth(){
    return async (req,res,next)=>{
        const userToken = req.cookies.token;
        if (!userToken) return res.json({status:"You need to login first"});
        const user = getUser(userToken);
        if(user===null) return res.json({status:"User not found"});
        req.user = user;
        next();
    }
}

module.exports = {
    checkUserAuth,
}