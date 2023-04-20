const passport = require("passport");
const userloginService = require('./userlogin.services');
const { usersServices } = require('../users');
const guard = require("../../helper/guards");
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");


module.exports = {

    /*
    *  Login Admin
    */
    login: async (req, res, next) => {
        try{
            passport.authenticate("admin", async function (err, user, info) {
                if (err) {
                    var err = err;
                    err.status = 400;
                    return next(err);
                }
                if (info) {
                    var err = new Error("Missing_Credentials");
                    err.status = 400;
                    return next(err);
                }
                if (user) {
                    let userResponse = await userloginService.get(user.id);
                    const token = await guard.createToken(user, userResponse.role);
                    userResponse.token = token.token;
                    // return commonResponse.success(res, "LOGIN_SUCCESS", 200);
                    return commonResponse.success(res, "LOGIN_SUCCESS", 200, userResponse);
                } else {
                    return commonResponse.customResponse(res, "ADMIN_NOT_FOUND", 400, {}, "Admin not found");
                }
            })(req, res, next);
        } catch (error) {
            console.log("Create User -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {},error.message);
        }
    },

    


}