const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function(req,res){
    try {
        let {fullname, email ,password} = req.body;

        let user = await userModel.findOne({email});
        if(user) {
            req.flash("error", "user with this email already exists");
            return res.redirect("/");
        }
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt,async function(err, hash) {
                if(err){
                    req.flash("error", "error while hashing the password");
                    return res.redirect("/");
                }
                else{
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    
                    let token = generateToken(user);
                    res.cookie("token", token);
                    return res.redirect("/shop");


                }
            });
        });
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/");
    }
};


module.exports.loginUser = async function(req,res){
    try {
        let {email,password} = req.body;

        let user = await userModel.findOne({email: email});
        if(!user) {
            req.flash("error", "user with this email does not exist");
            return res.redirect("/");
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                req.flash("error", "something went wrong");
                return res.redirect("/");
            }

            if(result){
                let token = generateToken(user);
                res.cookie("token", token);
                return res.redirect("/shop");
            }
            else{
                req.flash("error", "invalid credentials");
                return res.redirect("/");
            }
        });
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/");
    }
};

module.exports.logoutUser = function(req,res){
    res.clearCookie("token");
    res.redirect("/");
};
