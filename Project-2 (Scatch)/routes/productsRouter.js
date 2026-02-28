const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');

router.post("/create", upload.single("image"), async function(req,res){
    try {
        let {name,price,discount,bgcolor,panelcolor,textcolor} = req.body;

        if (!req.file) {
            req.flash("success", "Please select a product image");
            return res.redirect("/owners/admin");
        }

        let product = await productModel.create({
            image : req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelColor: panelcolor,
            textColor: textcolor
        });

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");

    } catch (err) {
        res.status(500).send("something went wrong: " + err.message);
    }
});

module.exports = router;
