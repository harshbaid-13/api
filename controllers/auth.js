import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register=(req,res)=>{

    //check existing user
    const q = "SELECT * FROM users WHERE email=? OR username=?"

    console.log(q);
    console.log(req.body);


    db.query(q, [req.body.email , req.body.username] , (err,data)=>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists!");

        //hash the pw and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q="INSERT INTO users ( `username`,`email`,`password` ) VALUES (?)";
        const values=[
            req.body.username,
            req.body.email,
            hash,
        ];

        db.query(q,[values],(err,data)=>{
            console.log(data);
            if(err) return res.json(err);
            return res.status(200).json("User has been created");
        });
    });
};

const login=(req,res)=>{
    //check user
    const q="Select * from users where username=?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password); 

        if(!isPasswordCorrect)  return res.status(404).json("Incorrect Username or Password!!");
 
        const token= jwt.sign({id: data[0].id },"jwtkey");
        
        const {password, ...other} = data[0]

        res
        .cookie("access_token",token,{
            httpOnly : true
        })
        .status(200)
        .json(other); 
});
};

const logout=(req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out");
};

export { register , login , logout }  ; 