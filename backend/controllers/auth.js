const USER = require('../models/user');
const BUSINESS = require('../models/business');
const bcrypt = require('bcryptjs');
const { setUser } = require('../services/auth');

async function handleUserSignup(req,res){
    try{
        const {firstName, lastName, email, number, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        await USER.create({firstName,lastName,email,number,password: hashedPassword}).then(()=>{
            return res.status(200).json({status:"User created successfully"});
        });
    }catch(error){
        return res.status(404).json({status:"Email/Number already in use."});
    }
}

async function handleUserLogin(req,res){
    try{
        const {email,password} = req.body;
        const user = await USER.findOne({email});
        if (!user){
            return res.status(404).json({status:"User not found."});
        }
        const isPassword = bcrypt.compareSync(password,user.password);
        if(!isPassword){
            return res.status(401).json({status:"Incorrect password"});
        }
        const token = setUser(user);
        res.cookie("token",token);
        return res.status(200).json({status:true});
    }catch(error){
        return res.status(409).json({Error: error});
    }
}

async function handleBusinessSignup(req,res){
    try{
        const {name,email,password,phone,PAN} = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        await BUSINESS.create({name,email,password:hashedPassword,phone,PAN}).then(()=>{
            return res.status(200).json({status:"User created successfully"});
        });
    }catch(error){
        return res.status(409).json({Error: error});
    }
}

async function handleBusinessLogin(req,res){
    try{
        const {email,password} = req.body;
        const business = await BUSINESS.findOne({email});
        if (!business){
            return res.status(404).json({status:"User not found."});
        }
        const isPassword = bcrypt.compareSync(password,business.password);
        if (!isPassword){
            return res.status(401),json({status:"Incorrect Password"});
        }
        const token = setUser(business);
        res.cookie("token",token);
        return res.status(200).json({status:true});
    }catch(error){
        return res.status(409).json({Error: error});
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleBusinessSignup,
    handleBusinessLogin,
};