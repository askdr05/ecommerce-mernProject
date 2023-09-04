const product = require('../models/productModels')
const ErrorHandeler = require('../utils/errorHandeler')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')
// create product -- admin

exports.createProduct = catchAsyncError(async (req, res, next) => {

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const newProduct = await product.create(req.body)

  res.status(201).json({
    success: true,
    newProduct
  })

})


//get all products
exports.getAllProducts = catchAsyncError(async (req, res,next) => {
  // return next(new ErrorHandeler('not found', 404))
  const resultPerPage = 5
  // console.log(req.query)

  const productCount = await product.countDocuments()

  const apiFeature = new ApiFeatures(product.find(), req.query)
    .search().searchByCategory().filter().pagination(resultPerPage)

  const allProducts = await apiFeature.query

  res.status(200).json({
    massage: "roote is working fine",
    allProducts,
    productCount,
    resultPerPage
  })


})

// get product details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {

  const productDetails = await product.findById(req.params.id)

  if (!productDetails) {
    return next(new ErrorHandeler('not found', 404))

  }

  res.status(200).json({
    success: true,
    productDetails
  })

}
)


// update product -- admin

exports.updateProducts = catchAsyncError(async (req, res, next) => {

  const Product = await product.findById(req.params.id)

  if (!Product) {
    return next(new ErrorHandeler('not found', 404))
  }
  
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < Product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(Product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  productUpdated = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    message:"product updated",
    productUpdated
  })


})


// delete product-- admin

exports.deleteProducts = catchAsyncError(async (req, res, next) => {
 console.log(req.params.id)
  const Product = await product.findById(req.params.id)

  if (!Product) {
    return next(new ErrorHandeler('not found', 404))
  }

   // Deleting Images From Cloudinary
   for (let i = 0; i < Product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(Product.images[i].public_id);
  }

  ProductDeleted = await product.findByIdAndDelete(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    message:"product deleted"
  })

})

/// create new review
exports.createProductsReview = catchAsyncError(async (req, res, next) => {

  const { rating, comment, productId } = req.body

  const review =
  {
    user: req.user.id,
    name: req.user.name, 
    rating: Number(rating),
    comment: comment
  }

  const productDetails = await product.findById(productId)
  console.log(productDetails)

  const isReviewed   = productDetails.reviews.find((rev) => {
    return rev.user.toString() === req.user._id.toString()
  })
  console.log(isReviewed)

  if (isReviewed) {
    isReviewed.rating = rating
    isReviewed.comment=comment
  }
  else {
    productDetails.reviews.push(review)
    productDetails.numOfReviews = productDetails.reviews.length
  }

  let totalRating = 0
  productDetails.reviews.forEach(
    (rev) => {
      totalRating += rev.rating
    }
  )

  productDetails.ratings = productDetails.reviews.length===0?0:totalRating / productDetails.reviews.length

  await productDetails.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
  })

})

// get all reviews of a product  

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const productDetails =  await product.findById(req.query.id);

  if (!productDetails) {
    return next(new ErrorHandeler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: productDetails.reviews,
  });
});

// delete review
exports.deleteProductReviews = catchAsyncError(async(req,res,next)=>{
  const productDetails = await product.findById(req.query.productId)
  if(!productDetails){
    return next(new ErrorHandeler("product not found",404))
  }
  // console.log(productDetails)
  
  const reviews = productDetails.reviews.filter(
    (rev)=>{
     return  rev._id.toString()!== req.query.id.toString()
    }
  )
  console.log(reviews.length) 

  let totalRating = 0
  reviews.forEach(
    (rev) => {
      totalRating += rev.rating
    }
  )

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = totalRating / reviews.length;
  }
  const numOfReviews = reviews.length

  
  productDetails.ratings=ratings
  productDetails.numOfReviews=numOfReviews
  productDetails.reviews=reviews
  await productDetails.save(
    { validateBeforeSave: false }
  )
  console.log(productDetails.reviews)
  
  // let ratings = 0;

  // if (reviews.length === 0) {
  //   ratings = 0;
  // } else {
  //   ratings = totalRating  / reviews.length;
  // }
  // const numOfReviews = reviews.length

  // await product.findByIdAndUpdate(req.query.productId,
  //   {
  //     reviews,
  //     ratings,
  //     numOfReviews
  //   },   
  //   {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   }
  // )
    

  res.status(200).json({
    success:true,
  })
})



//get all products admin
exports.getAllAdminProducts = catchAsyncError(async (req, res,next) => {
  const Products = await product.find();

  res.status(200).json({
    success: true,
    Products,
  });


})