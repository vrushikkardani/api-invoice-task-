const Model = require('./invoice.model');


/** 
 * add
*/
exports.add =async(reqBody) => {
    // let find = await Model.findOne().sort({ Invoice_No: -1 }).lean()
    // let unique;
    // if (find) {
    //     unique = find.Invoice_No + 1
    // } else {
    //     unique = 1
    // }
    // reqBody.Invoice_No = unique
    // reqBody.Total = parseInt(reqBody.Net_Amount)+ ((parseInt(reqBody.CGST)*parseInt(reqBody.Net_Amount))/100) + ((parseInt(reqBody.SGST)*parseInt(reqBody.Net_Amount))/100) + ((parseInt(reqBody.IGST)*parseInt(reqBody.Net_Amount))/100);
    return await Model(reqBody).save();
    
}


/** 
 *Get
*/
exports.get =async() => {
    return await Model.find({}).sort({created_at: -1}).lean();
}
/** 
 *Get by id
*/
exports.getById =async(id) => {
    return await Model.findOne({_id:id}).lean();
}

/** 
 *update
*/
exports.update =async(id,reqBody) => {
    return await Model.findByIdAndUpdate({ _id: id }, {$set:reqBody}, {new: true}).lean();
}

/*
*  Delete
*/
exports.delete = async (id) => {

    return await Model.removeOne({_id:id}); 

};
