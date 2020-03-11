var express = require('express');
var router = express.Router();

// http://localhost:3000/api/employee/
function initApi(db){
  var employeeRoutes = require('./api/employee')(db);
  router.use('/employee', employeeRoutes);
  return router;
}

module.exports = initApi;
