const Model = require('./company.model');

/** 
 * add
*/
exports.save =async(reqBody) => {
    if(reqBody.long && reqBody.lat){
        reqBody.location = {
            type: "Point",
            coordinates: [reqBody.long, reqBody.lat],
        }
    }
    const newModel = new Model(reqBody)
    return await newModel.save();
}

/** 
 *Get
*/
exports.get =async() => {
    return await Model.find({}).sort({created_at: -1}).lean();
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
