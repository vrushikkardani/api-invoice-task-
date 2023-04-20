const { commonResponse } = require('../../helper');
const UsersModel = require('./users.model');
const otpGenerator = require('otp-generator');

/*
*  Check Email Exist
*/
exports.is_exist = async (reqBody) => {
    return await UsersModel.findOne({email: reqBody.email}).lean();
};

/*
*  Check Query
*/
exports.checkQuery = async (query) => {
    return await UsersModel.findOne(query).lean();
};

/*
*  Find By Array Of Numbers
*/
exports.findByArrayOfNumbers = async (phone_numbers) => {
    return await UsersModel.find({phone_number: { $in: phone_numbers}}).select('phone_number role').lean();
};

/*
*  Get By Id
*/
exports.get = async (id) => {
    return await UsersModel.findOne({ _id: id }).lean();
};

/*
*  Add New User
*/
exports.save = async (reqBody) => {
    if(reqBody.long && reqBody.lat){
        reqBody.location = {
            type: "Point",
            coordinates: [reqBody.long, reqBody.lat],
        }
    }
    const newUser = new UsersModel(reqBody)
    return await newUser.save();
};

/*
*  Add Guest Tenant
*/
exports.saveGuestTenant = async (guestTenant) => {
    let user = {
        role: 'tenant',
        register_type: 'guest',
        phone_number : guestTenant.phone_number,
        first_name : guestTenant.name.split(' ').slice(0, -1).join(' '),
        last_name : guestTenant.name.split(' ').slice(-1).join(' '),
    };
    const newGuestTenant = new UsersModel(user);
    return await newGuestTenant.save();
};

/*
*  Update User
*/
exports.update = async (id, reqBody) => {
    let updateUserData = await UsersModel.findOneAndUpdate({ _id: id }, {$set:reqBody}, {new: true,}).lean();
    return updateUserData;
};

/*
*  List
*/
exports.list = async (query) => {
    if(!query.role || query.role == ''){
        query.role = {$ne : 'admin'};
    }
    return await UsersModel.find(query).sort({created_at : -1}).lean();
};
/** 
 *Get
*/
exports.get =async() => {
    return await UsersModel.find({}).sort({created_at: -1}).lean();
};

/** 
 *update
*/
exports.update =async(id,reqBody) => {
    return await UsersModel.findByIdAndUpdate({ _id: id }, {$set:reqBody}, {new: true}).lean();
}

/*
*  Delete
*/
exports.delete = async (id) => {

    return await UsersModel.removeOne({_id:id}); 

};