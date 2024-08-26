const Product = require('./Models/Product');
const {productSchema,reviewSchema} = require('./schema')

const ValidateProduct = (req,res,next)=>{
    const {name,img,price,desc} = req.body
    const {error} = productSchema.validate({name,img,price,desc});
    if(error){
       return  res.render('error');
    }
    next();
}
const ValidateReview = (req,res,next)=>{
    const {rating,comment} = req.body;
    const {error} =  reviewSchema.validate({rating,comment});
    if(error){
        return res.render('error');
    }
    next();
}

const IsLoggedIN = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','Please login first');
        return  res.redirect('/login');
       
    }
    next();
}
const IsSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error','sorry you are not  authorized to perform this action');
        return  res.redirect('/products');
    }else if(req.user.role !== 'seller'){
        req.flash('error','sorry you are not authorized to perform this action');
        return  res.redirect('/products');
    }
    next();
}

const isAuthor = async(req,res,next)=>{
    let {id} = req.params;
   let product =  await Product.findById(id);
   if(!product.author.equals(req.user._id)){
    req.flash('error','sorry you are not authorized to perform this action');
    return  res.redirect('/products');
   }
   next();
}

module.exports = {isAuthor,IsSeller,IsLoggedIN,ValidateProduct,ValidateReview};