var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all**
      GET       /byid/:id**
      GET       /bycompany/:company**
      GET       /bytag/:tag**
      POST      /addtag/:id              tag
      DELETE    /delete/:id**
      POST      /makeolder**               age
   */

  router.get('/all', (req, res) => {
    empModel.getEmployees((err, users)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(users);
    });
  });

  return router;
}

router.get('/byid/:id',(req, res)=>{
    var id =  req.params.id ;
    empModel.getEmployeesById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
});

router.get('/bycompany/:company',(req, res)=>{
    var company =  req.params.id ;
    empModel.getEmployeesByCompany(company, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
});

router.get('/bytag/:tag',(req, res)=>{
    var tag =  req.params.id ;
    empModel.getEmployeesByTag(tag, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });
});

router.delete('/delete/:id', (req, res)=>{
  var id = req.params.id;
  empModel.removeEmployee(id, (err, deletedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(deletedDoc);
  });
});

router.post('/makeolder', (req, res)=>{
  var ageDelta = req.body;
  empModel.increaseAgeToAll(ageDelta, (err, addedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'error'});
    }
    return res.status(200).json(addedDoc);
    });
});

module.exports = initEmployee;
