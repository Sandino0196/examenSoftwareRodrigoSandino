var ObjectID = require('mongodb').ObjectID;

module.exports = (db)=>{
  var lib = {};
  var empColl = db.collection('employees');

  lib.getEmployees = (handler)=>{
    // implementar
    // obtener todos los documentos
    empColl.find({}).toArray(handler);
  }

  lib.getEmployeesById = (id, handler) => {
    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
    var query = {"_id": new ObjectID(id)};
    var projection = { "email": 1, "phone": 1, "age":1, "name":1};
    empColl.findOne(
      query,
      {"projection":projection},
      (err, doc)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, doc);
      }
    )
  }

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    var query = {"company":company};
    var projection = { "name": 1, "email": 1, "company":1};
    empColl.findOne(
      query,
      {"projection":projection},
      (err, user)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, user);
      }
    )
  }

  lib.getEmployeesByTag = (tag, handler) => {
    //implementar
    // obtener todos los documentos que contenga
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    var query = {"tag":tag};
    var projection = { "name": 1, "email": 1, "tags":1};
    empColl.findOne(
      query,
      {"projection":projection},
      (err, user)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, user);
      }
    )
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
  }

  lib.removeEmployee = (id, handler) => {
    //Implementar
    //Se requiere eliminar un documento de la colección
    var query = {"_id": new ObjectID(id)};
    empColl.deleteOne(
      query,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    var query = {$inc: {"age":ageDelta}};
    empColl.update(
      {},
      query,
      {"multi":true},
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );
  }
  
  return lib;
}
