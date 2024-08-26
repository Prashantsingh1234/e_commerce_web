const express = require('express');
const Review = require('../Models/Review');
const Product = require('../Models/Product');
const router = express.Router(); //mini instance of express
const {ValidateReview} = require('../middleware')
 
 router.post('/products/:id/review',ValidateReview,async(req,res)=>{
     try{
          
          let {id} = req.params;
          let {rating,comment} = req.body;
          const product = await Product.findById(id);
          const review = new Review({rating,comment});
          product.reviews.push(review);
          await review.save();
          await product.save();
          req.flash('success','review added successfully')
          res.redirect(`/products/${id}`);
     }
     catch (error) {
          res.status(500).render('error',{err : error.message})
          
        }
 })
 



module.exports = router;