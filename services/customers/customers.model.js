const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const CustomersSchema = new Schema (
    {
        Customers_Name:{
            type:String,
            default:"",
        },
        Billing_Name:{
            type:String,
            default:"",
        },
        Address:{
            type:String,
            default:"",
        },
        Contact_No:{
            type:Number,
            default:"",
        },
        Email_Id:{
            type:String,
            default:"",
        },
        Gst_No:{
            type:String,
            default:"",
        },
        Pan_No:{
            type:String,
            default:"",
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

CustomersSchema.plugin(softDelete);

const customers = mongoose.model("customers", CustomersSchema);

module.exports = customers;