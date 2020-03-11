var express = require('express');
var router = express.Router();

// http://localhost:3000/api/employees/
function initApi(db){
  var employeeRoutes = require('./api/employees')(db);
  router.use('/employees', employeeRoutes);
  return router;
}

module.exports = initApi;
