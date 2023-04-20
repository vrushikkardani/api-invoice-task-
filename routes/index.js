const { usersRoutes } = require('../services/users');
const { userloginRoutes } = require('../services/userlogin');
const { customersRoutes } = require('../services/customers');
const { companyRoutes } = require('../services/company');
const { invoiceRoutes } = require('../services/invoice');



const initialize = (app) => {
  app.use("/api/users", usersRoutes);

  app.use("/api/userlogin", userloginRoutes);
  app.use("/api/customers", customersRoutes);
  app.use("/api/company", companyRoutes);
  app.use("/api/invoice", invoiceRoutes);



  app.use("/authError", (req, res, next) => {
    return next(new Error("DEFAULT_AUTH"));
  });

  app.get("/ping", (req, res) => {
    res.status(200).send({
      success: true,
      statusCode: 200,
    });
  });
};

module.exports = { initialize };
