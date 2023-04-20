const controller = require('./userlogin.controller');
const router = require("express").Router();
const { guard } = require('../../helper');

/*
 *  Login Admin
 */
router.post(
    "/login",
    controller.login
);

// /*
//  *  Login Admin
//  */
// router.post(
//     "/change-user-status/:id",
//     guard.isAuthorized(['admin']),
//     controller.changeUserStatus
// );


// /*
//  *  Dashboard
//  */
// router.get(
//     "/dashboard",
//     guard.isAuthorized(['admin']),
//     controller.dashboard
// );

// /*
//  *  Delete User By Id
//  */
// router.delete(
//     "/delete-user/:id",
//     guard.isAuthorized(['admin']),
//     controller.delete
// );

module.exports = router