const router = require("express").Router();
const controller = require('./users.controller');
const { guard } = require('../../helper');
const multerSetting = require("../../helper/multer").userImageUpload;

/*
 *  Register New User
 */
router.post(
    "/register",
    multerSetting,
    controller.register
);

/*
 *  Login
 */
// router.post(
//     "/login",
//     controller.login
// );

// /*
//  *  Resend verification Link
//  */
// router.post(
//     "/resend-verification-otp",
//     controller.resendVerificationOTP
// );

// /*
//  *  Verify User Account
//  */
// router.post(
//     "/verify-user",
//     controller.verifyUser
// );

// /*
//  *  Forgot password
//  */
// router.post(
//     "/forgot-password",
//     controller.forgotPassword
// );

// /*
//  *  Reset password
//  */
// router.post(
//     "/reset-password",
//     controller.resetPassword
// );

// /*
//  *  Update Profile
//  */
// router.post(
//     "/update",
//     multerSetting,
//     guard.isAuthorized(['admin', 'user']),
//     controller.update
// );
  
// /*
//  *  Change Password
//  */
// router.post(
//     "/change-password",
//     guard.isAuthorized(['admin', 'user']),
//     controller.changePassword
// );

// /*
//  *  Get Profile
//  */
router.get(
    "/",
    controller.get
);


// /*
//  *  Get Profile
//  */
// router.get(
//     "/get/:id",
//     guard.isAuthorized(['admin', 'user']),
//     controller.getUser
// );

// /*
//  *  logout
//  */
// router.post(
//     "/logout",
//     guard.isAuthorized(['admin', 'user']),
//     controller.logout
// );

// /*
//  *  Get user list
//  */
// router.get(
//     "/list",
//     // guard.isAuthorized(['admin', 'user']),
//     controller.userList
// );

// /*
//  *  Get user list
//  */
// router.post(
//     "/contact-us",
//     guard.isAuthorized(['admin','user']),
//     controller.contactUs
// );
 
router.put(
    "/:id",
    // multerSetting,
    //guard.isAuthorized(['admin']),
    controller.update
);

/*
 *  Delete  
 */
router.delete(
    "/:id",
    //guard.isAuthorized(['admin']),
    controller.delete
);


module.exports = router;