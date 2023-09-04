const express = require("express")
const { registerUser, 
    loginUser, 
    logOutUser, 
    forgotPassword,
    restPassword,
    getUserDetails,
    updateUserDetails,
    updatePassword,
    getAllUserDetails,
    getsingleUserDetails,
    deleteUserDetails,
    updateUserDetailsAdmin} = require("../controllers/userController")

const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forget").post(forgotPassword)
router.route("/password/reset/:token").put(restPassword)
router.route("/logout").get(logOutUser)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/me/update").put(isAuthenticatedUser,updateUserDetails)
router.route("/me/update/password").put(isAuthenticatedUser,updatePassword)


router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles('admin'),getAllUserDetails)
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles('admin'),getsingleUserDetails,)
router.route("/admin/user/:id")
.put(isAuthenticatedUser,authorizeRoles('admin'),updateUserDetailsAdmin)
.delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUserDetails,)

module.exports = router