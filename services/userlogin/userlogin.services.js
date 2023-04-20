const { commonResponse } = require('../../helper');
const UsersModel = require('../users/users.model');

/*
*  Get By Id
*/
exports.get = async (id) => {
    return await UsersModel.findOne({ _id: id }).lean();
};


/*
*  Dashboard Counts
*/
 
/* 
* Delete User By Id
*/
exports.delete = async(id) => {
    return await UsersModel.removeOne({ _id: id },{new: true}).lean();
}

