const express = require('express')
const { getAllProducts,
    createProduct,
    updateProducts,
    deleteProducts,
    getProductDetails,
    createProductsReview,
    deleteProductReviews,
    getProductReviews,
    getAllAdminProducts} = require('../controllers/productControllers')

const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")
const router = express.Router()

router.route('/products').get( getAllProducts);
router.route('/products/:id').get(getProductDetails);

router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),createProduct);

router.route('/admin/products/:id')
.put(isAuthenticatedUser,authorizeRoles('admin'),updateProducts)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProducts);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'),getAllAdminProducts);

router.route('/reviews')
.put(isAuthenticatedUser,createProductsReview)
.delete(isAuthenticatedUser,deleteProductReviews)

router
  .route("/reviews")
  .get(getProductReviews)

module.exports = router