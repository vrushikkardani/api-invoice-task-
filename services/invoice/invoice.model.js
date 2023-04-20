const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema (
    {
        
        Invoic_Number:{
            type:String,
            default:"",
        },
        Customer_Name:{
            type:String,
            default:"",
        },
        Date:{
            type:String,
            default:"",
        },
        CGST_Total:{
            type:String,
            default:"",
        },
        SGST_Total:{
            type:String,
            default:"",
        },
        IGST_Total:{
            type:String,
            default:"",
        },
        Grand_Total:{
            type:String,
            default:"",
        },
        InvoiceItem:{
            type:Array,
            default:"",
        }
        
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

InvoiceSchema.plugin(softDelete);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice