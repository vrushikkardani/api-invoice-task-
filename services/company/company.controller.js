//const { commonResponse } = require("../../helper");
const Service = require('./company.services');
const guard = require("../../helper/guards");
const _ = require('lodash');
const moment = require('moment');
 const { commonResponse, commonFunctions, nodemailer } = require("../../helper");

module.exports = {

    /**
     * Add
     */
     create:async(req,res,next) => {
        try {
            if (req.files != undefined && req.files.image != undefined && req.files.image2 != undefined) {
                req.body.image =  "/user-profile/" + req.files.image[0].filename;
                req.body.image2 =  "/user-profile/" + req.files.image2[0].filename;
            }
            req.body.dob = moment(req.body.dob,'DD/MM/YYYY').format("YYYY-MM-DD");
            let data = await Service.save(req.body);
            if(data){
                return commonResponse.success(res, "COMPANY_DETAILS_SAVE", 200, data, 'Success');
            }else{
                return commonResponse.customResponse(res, "SERVER_ERROR", 400, {}, 'Something went wrong, Please try again');
            }
        } catch (error) {
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {},error.message);
        }
        
    },

    /**
     * Get
     */
     get:async(req,res,next) =>{
        try {
            let data = await Service.get();
            if(data){
                return commonResponse.success(res, "COMPANY_DETAILS_GET", 200, data, 'Success');
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
        try {
            if (req.files != undefined && req.files.image != undefined && req.files.image2 != undefined) {
                req.body.image =   req.files.image[0].filename;
                req.body.image2 =   req.files.image2[0].filename;
            }
            let update = await Service.update(req.params.id,req.body);
            if(update){
                return commonResponse.success(res, "COMPANY_DETAILS_GET", 200, update, 'Success');
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
                return commonResponse.success(res, "COMPANY_DETAILS_DELETE", 200, data, 'Successfully deleted');
            }else{
                return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 400, {});
            }
        } catch (error) {
            console.log("COMPANY_DETAILS_DELETE -> ", error);
            return commonResponse.CustomError(res, "DEFAULT_INTERNAL_SERVER_ERROR", 500, {},error.message);
        }
    },

}