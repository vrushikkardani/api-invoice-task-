const controller = require('./customers.controller');
const router = require("express").Router();
const { guard } = require('../../helper');
// const multerSetting = require("../../helper/multer").userImageUpload;

/*
 *  Add 
 */
router.post(
    "/",
    // multerSetting,
    //guard.isAuthorized(['admin']),
    controller.create
);

/*
 *  Get
 */
router.get(
    "/",
    controller.get
);

/*
 *  Get by id
 */
// router.get(
//     "/:id",
//     controller.getById
// );


/*
 *  Update 
 */
router.put(
    "/:id",
    // multerSetting,
    //guard.isAuthorized(['admin']),
    controller.update
);

/*
 *  Delete  
 */
router.delete(
    "/:id",
    //guard.isAuthorized(['admin']),
    controller.delete
);

module.exports = router