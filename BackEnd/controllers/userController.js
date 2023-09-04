const user = require('../models/userModels')
const ErrorHandeler = require('../utils/errorHandeler')
const catchAsyncError = require('../middleware/catchAsyncError')
const sendToken = require("../utils/sendToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require('cloudinary')

//Resister ouer user 

exports.registerUser = catchAsyncError(async (req, res, next) => {
  console.log(typeof req.body.avatar)
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  })
  const { name, password, email } = req.body
  console.log(name)
  const userRegistered = await user.create({
    name,
    password,
    email,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  })

  console.log(userRegistered)

  sendToken(userRegistered, 201, res)

})


/// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandeler("Please Enter Email & Password", 400));
  }

  const userDetails = await user.findOne({ email }).select("+password");

  if (!userDetails) {
    return next(new ErrorHandeler("Invalid email or password", 401));
  }

  const isPasswordMatched = await userDetails.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandeler("Invalid email or password", 401));
  }

  sendToken(userDetails, 200, res);
});


//logOut

exports.logOutUser = catchAsyncError(async (req, res, next) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: "logged Out"
  })
})

// forgot password 

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const userDetails = await user.findOne({ email: req.body.email })

  if (!userDetails) {
    return next(new ErrorHandeler("user not found", 404))
  }

  // Forgot Password//get reset token

  const resetToken = userDetails.getRessetPasswordToken()

  await userDetails.save({ validateBeforeSave: false })

  // console.log(user)

  // const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
  const resetPasswordUrl = `${req.protocol}://http://localhost:3001/password/reset/${resetToken}`

  console.log(resetPasswordUrl)
  const message = `your password token is :- \n\n ${resetPasswordUrl} 
    \n\nif you have not requested this mail then please ignore`

  try {
    await sendEmail({
      email: userDetails.email,
      subject: `Ecommerce Password Recovery`,
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to ${userDetails.email} successfully`
    })
  } catch (error) {
    userDetails.ressetPasswordToken = undefined
    userDetails.resetPasswordExpire = undefined
    await userDetails.save({ validateBeforeSave: false })

    return next(new ErrorHandeler(error.message), 500)

  }

})

// Reset Password

exports.restPassword = catchAsyncError(async (req, res, next) => {

  const resetPasswordToken = crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex")

  const userDetails = await user.findOne({ resetPasswordToken, resetPasswordExpaire: { $gt: Date.now() } })


  if (!userDetails) {
    return next(new ErrorHandeler("Reset Password Token is invalid or has been expired",
      400))
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandeler("Password does not password", 400));
  }

  userDetails.password = req.body.newPassword
  userDetails.resetPasswordToken = undefined;
  userDetails.resetPasswordExpaire = undefined;
  await userDetails.save({ validateBeforeSave: false })

  sendToken(userDetails, 200, res)

})


// get user details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const userDetails = await user.findById(req.user.id)

  res.status(200).json({
    success: true,
    userDetails
  })

})



// Update user details
exports.updateUserDetails = catchAsyncError(async (req, res, next) => {

  const newUserDetails = {
    email: req.body.email,
    name: req.body.name,
  }

  if (req.body.avatar != "") {
    const userDetails = await user.findById(req.user.id)

    const imageId = userDetails.avatar.public_id

    await cloudinary.v2.uploader.destroy(imageId)

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });


    newUserDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }



  const userDetails = await user.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })



  res.status(200).json({
    success: true,
  })

})


//Update password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const oldPassword = req.body.oldPassword
  const userDetails = await user.findById(req.user.id).select("+password")
  // console.log(userDetails)
  const isPasswordMatched = await userDetails.comparePassword(oldPassword);
  const passwordDontMatch = req.body.newPassword !== req.body.confirmPassword
  if (!isPasswordMatched) {
    return next(new ErrorHandeler("wrong password", 400))
  }

  if (passwordDontMatch) {
    return next(new ErrorHandeler("password does not match", 400))
  }

  userDetails.password = req.body.newPassword
  await userDetails.save()


  sendToken(userDetails, 200, res)


})


// get all user -- admin

exports.getAllUserDetails = catchAsyncError(async (req, res, next) => {
  const allUserDetails = await user.find()

  res.status(200).json({
    success: true,
    allUserDetails
  })
})
// get single user -- admin

exports.getsingleUserDetails = catchAsyncError(async (req, res, next) => {
  const singleUserDetails = await user.findById(req.params.id)
  if (!singleUserDetails) {
    return next(new ErrorHandeler("wrong id", 400))
  }

  res.status(200).json({
    success: true,
    singleUserDetails
  })
})

// update user role -- admin
exports.updateUserDetailsAdmin = catchAsyncError(async (req, res, next) => {
console.log(req.body)
  const userData = {
    email: req.body.email,
    name: req.body.name,
    role: req.body.role
  }

  await user.findByIdAndUpdate(req.params.id, userData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })



  res.status(200).json({
    success: true,
  })

})

// delete user details -- admin
exports.deleteUserDetails = catchAsyncError(async (req, res, next) => {

  const userDetails = await user.findById(req.params.id)

  if (!userDetails) {
    return next(new ErrorHandeler('not found', 404))
  }
  console.log(userDetails)
  const imageId = userDetails.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.deleteOne({ _id: req.params.id })

  res.status(200).json({
    success: true,
    message: `user deleted successfuly`
  })

})



