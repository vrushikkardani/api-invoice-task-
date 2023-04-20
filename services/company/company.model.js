const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');
const validator = require('mongoose-validator');
const Schema = mongoose.Schema;

const CompanySchema = new Schema (
    {
        image:{
            type: String,
            required: false,
            default: ""
        },
        Company_Name: {
            type: String,
            default:"AAGITE TECHNOLOGIES PRIVATE LIMITED",
            
        },
        Address:{
            type:String,
            default:"411,Elite Business Park,Opp.High Court,Sola,Ahmedabad - 380060",
            
        },
        Mobile_No:{
            type:Number,
            default:"9427740740",
        },
        PAN_No:{
            type:String,
            default:"AAWCA07997P",
        },
        Email_Id:{
            type:String,
            default:"sales@aagitetech.com",
        },
        Bank_Name:{
            type:String,
            default:"ICICI BANK",
        },
        Account_No:{
            type:Number,
            default:"346305000980",
        },
        ContactPerson:{
            type:String,
            default:"Nikhil Manwar",
        },
        Phone_No:{
            type:Number,
            default:"",
        },
        GSTIN_No:{
            type:String,
            default:"24AAWCA0797P1ZR",
        },
        Website:{
            type:String,
            default:"www.aagitetech.com",
        },
        Branch_Name:{
            type:String,
            default:"Ghatlodiya",
        },
        IFSC_Code:{
            type:String,
            default:"ICIC0003463",
        },
        image2:{
            type: String,
            required: false,
            default: ""
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

CompanySchema.plugin(softDelete);

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company