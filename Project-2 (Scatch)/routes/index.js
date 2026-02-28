const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get("/",function(req,res){
    let error = req.flash("error"); 
    res.render("index", {error , loggedin : false});
});

router.get("/shop", isLoggedIn, async function(req,res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", {products , success});
});

router.get("/cart", isLoggedIn, async function(req,res){
    let user = await userModel.findOne({email : req.user.email}).populate("cart");
    const firstCartItem = user && user.cart && user.cart.length ? user.cart[0] : null;
    const bill = firstCartItem ? (Number(firstCartItem.price) - Number(firstCartItem.discount)) : 0;
    res.render("cart",{user, bill});
});


router.get("/addtocart/:productid", isLoggedIn, async function(req,res){
    try {
        let user = await userModel.findOne({email : req.user.email});
        if (!user) {
            req.flash("error", "user not found");
            return res.redirect("/");
        }

        user.cart.push(req.params.productid);
        await user.save();
        req.flash("success", "Product added to cart successfully");
        return res.redirect("/shop");
    } catch (err) {
        req.flash("error", "unable to add product to cart");
        return res.redirect("/shop");
    }
});

router.get("/logout", isLoggedIn, async function(req,res){
    res.redirect("/users/logout");
});


module.exports = router;
