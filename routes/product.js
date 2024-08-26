const express = require('express');
const Product = require('../Models/Product');
const Review = require('../Models/Review');
const router = express.Router(); //mini instance of express
const {IsLoggedIN,ValidateProduct,IsSeller,isAuthor} = require('../middleware')

 router.get('/products',async(req,res)=>{
  try {
    let products = await Product.find({});
     res.render('products/index',{products});
  } catch (error) {
    res.status(500).render('error',{err : error.message})
    
  }
})
// add a form to get new product
router.get('/products/new',IsLoggedIN,IsSeller,(req,res)=>{
  try {
    res.render('products/new');
  } catch (error) {
    res.status(500).redirect('error',{err : error.message})
  }
})
//actually adding the product to the product page
router.post('/products',IsLoggedIN,ValidateProduct,async(req,res)=>{
  try {
    let {name,img,price,desc} = req.body;
    await Product.create({name,img,price,desc,author:req.user._id});
    req.flash('msg','New Product Added!')
    res.redirect('/products')
  } catch (e) {
    res.status(500).render('error',{err : e.message})
  }
})

//to show the one product that user clicks
router.get("/products/:id",IsLoggedIN, async (req, res) => {
  try {
    // console.log(req.params)
    let {id} = req.params;
    let FoundProduct =  await Product.findById(id).populate('reviews') //database k saare function ek promise return karte h isliye async await use krte h hum
    res.render('products/show',{FoundProduct , msg:req.flash('success')})
  } catch (error) {
    res.status(500).render('error',{err : error.message})
  }
})

//route to edit a product
router.get('/products/:id/edit',IsLoggedIN,async(req,res)=>{
  try {  
    let {id} = req.params;
    let FoundProduct =  await Product.findById(id);
    res.render('products/edit',{FoundProduct})
  } catch (error) {
    res.status(500).render('error',{err : error.message})
  }

})
//actually update the editied product in database or show screen
router.patch('/products/:id', IsLoggedIN,ValidateProduct,async(req,res)=>{
  try {
    let {id} = req.params;
    let {name,img,price,desc} = req.body;
    await Product.findByIdAndUpdate(id,{name, img, price , desc})
    req.flash('success','edited product succesfully');
    res.redirect(`/products/${id}`);
  } catch (error) {
    res.status(500).render('error',{err : error.message})
  }


})
// delete a product
router.delete('/products/:id',IsLoggedIN,isAuthor,async(req,res)=>{
  try {
    let {id} = req.params;
   let product = await Product.findById(id);
   //for(let id of product.reviews){  this is for normal but we use middleware of mongoose that use in production use
  //   await Review.findByIdAndDelete(id);
  //  }
    await Product.findByIdAndDelete(id);
    req.flash('success',' Product deleted successfully')

    res.redirect('/products')
  } catch (error) {
    res.status(500).render('error',{err : error.message})
  }
})



module.exports = router;