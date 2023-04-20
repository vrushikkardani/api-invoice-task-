const passport = require("passport");
const Service = require('./users.services');
const guard = require("../../helper/guards");
const _ = require('lodash');
const moment = require('moment');
const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {

    /*
    *  Register New User
    */
    register: async (req, res, next) => {
        try {

            if (req.files != undefined && req.files.image != undefined) {
                req.body.image = process.env.DOMAIN_URL + "/user-profile/" + req.files.image[0].filename;
            }
            req.body.dob = moment(req.body.dob,'DD/MM/YYYY').format("YYYY-MM-DD");

            req.body.password = await commonFunctions.encryptStringCrypt( req.body.password );
            //req.body.otp = await commonFunctions.randomFourDigit();
            // req.body.otp = "1234";
            let isNumberExist = await Service.checkQuery({email: req.body.email});
            
            if (isNumberExist) {
                if(isNumberExist.register_type && isNumberExist.register_type == 'guest'){
                    req.body.register_type = 'user';
                    let updatedUser = await Service.update(isNumberExist._id, req.body);
                    return commonResponse.success(res, "USER_CREATED", 200, updatedUser, 'We have sent account verification OTP to your phone number, Please verify your account to continue');
                }else{
                    return next(new Error("EMAIL_EXIST"));
                }
            } 
            // req.body.otp_expire_time = Date.now();
            let user = await Service.save(req.body);
            if(user){
                 /* Send Account Verification Link */
                 let emailData = {
                    to: user.email,
                    subject: "WOW || Account Verification OTP",
                    text: `Your account verification Link Is ${user.otp}`,
                    html: `<h1> WOW </h1> <p>Your account verification OTP is :  ${user.otp}</b></p>`,
                 };
                nodemailer.sendMail(emailData);
                let getUser = await Service.get(user._id);
               return commonResponse.success(res, "USER_CREATED", 200, getUser, 'Register New User Successfully.');
            }else{
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, user, 'Something went wrong, Please try again');
            }
        } catch (error) {
            console.log("Create User -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {},error.message);
        }
    },


    get:async(req,res,next) =>{
        try {
            let data = await Service.get();
            if(data){
                return commonResponse.success(res, "USER_GET", 200, data, 'Success');
            }else{
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, 'Something went wrong, Please try again');
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {},error.message);
        }
    },
    /**
     * Update
     */
    update:async(req,res,next) => {
        let isNumberExist = await Service.checkQuery({email: req.body.email});
            
            if (isNumberExist) {
                if(isNumberExist.register_type && isNumberExist.register_type == 'guest'){
                    req.body.register_type = 'user';
                    let updatedUser = await Service.update(isNumberExist._id, req.body);
                    return commonResponse.success(res, "USER_CREATED", 200, updatedUser, 'We have sent account verification OTP to your phone number, Please verify your account to continue');
                }else{
                    return next(new Error("EMAIL_EXIST"));
                }
            } 
        try {
            let update = await Service.update(req.params.id,req.body);
            if(update){
                return commonResponse.success(res, "UPDATE_SUCCESSFULL", 200, update, 'Success');
            }else{
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, 'Something went wrong, Please try again');
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {},error.message);
        }
    },

    /**
     * Delete
     */
    delete: async (req, res) => {
        try {
            let data = await Service.delete(req.params.id);
            if(data){
                return commonResponse.success(res, "CUSTOMERS_DETAILS_DELETE", 200, data, 'Successfully deleted');
            }else{
                return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 400, {});
            }
        } catch (error) {
            console.log("CUSTOMERS_DETAILS_DELETE -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {},error.message);
        }
    }
}