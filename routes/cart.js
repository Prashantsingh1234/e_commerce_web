const express = require('express');
const Product = require('../Models/Product');
const User = require('../Models/User');
const router = express.Router(); //mini instance of express
const {IsLoggedIN} = require('../middleware')




//get all the product for the user
router.get('/user/cart',IsLoggedIN,async(req,res)=>{
   let user = await  User.findById(req.user._id).populate('cart');
   res.render('cart/cart',{user});
})




//actually adding the product to the cart
router.post('/user/:productId/add',IsLoggedIN, async(req, res) => {
   let {productId} = req.params;
   let userId = req.user._id;
   let product = await Product.findById(productId);
   let user = await User.findById(userId);
   user.cart.push(product);
   await user.save()
   res.redirect('/user/cart');
})




module.exports = router