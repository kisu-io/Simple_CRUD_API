const fs = require("fs");
const studentController = {};
const crypto = require("crypto");



// return list of students, allow search with age or name
studentController.limitStudent = (req, res, next) => {
    const queries = req.query;
    console.log(queries.limit);
    const fs = require('fs');
    let rawData = fs.readFileSync('db.json');
    let jsonData = JSON.parse(rawData);

    // const limit = jsonData.slice(start, end);
    // const {  name, age, limit } = queries;
    // const limitValue = queries.limit;
    // const start = 0;
    // const end = limitValue-1;

    let getData = {};
    if (queries.name === undefined && queries.age === undefined && queries.limit === undefined) {
      return res.status(200).send(jsonData);
    } else if (queries.name) {
      getData = jsonData.filter(value => {
        return value.name === queries.name;
      });
    } else if (queries.age) {
      getData = jsonData.filter(value => {
        return value.age === parseInt(queries.age);
      });
    } else if (queries.limit) {
        getData = jsonData.slice(0, parseInt(queries.limit));
        console.log(getData.length);
        return res.status(200).send(getData);
    } 
     return res.status(200).send(getData);
    };

    

    // create new student document with name and age with unique id. HINT: utilize generateRandomHexString()
 studentController.createStudentHandler = (req,res,next) => {
        console.log("creating a student");
        let newId = "";
        const generateRandomHexString = (len) => {
          return crypto
            .randomBytes(Math.ceil(len / 2))
            .toString("hex") 
            .slice(0, len)
            .toUpperCase(); 
        };
        newId = generateRandomHexString(10);
        
        const database = fs.readFileSync("db.json", "utf8");
        const jsObject = JSON.parse(database);
        const student = req.body;
        student.id = newId;
        console.log(student)
        jsObject.push(student)
        const jsonContent = JSON.stringify(jsObject)
        fs.writeFileSync("db.json", jsonContent);
        return res.status(200).send("sucess");

    }
  
// update student info {name, age}
studentController.updateStudentInfo = (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    try {  
      const database = fs.readFileSync("db.json", "utf8");
      let jsObject = JSON.parse(database);
      jsObject.forEach((item, index) => {
        if(item.id === id) {
          jsObject[index] = {...item, ...req.body}
        }
      })
      let JSONcontent = JSON.stringify(jsObject);
      fs.writeFileSync("db.json", JSONcontent);
      return res.status(200).send("success");

    } catch (error) {
      return next(error);
    }
  };
  

//delete matching student it
studentController.deleteMatchId = (req, res, next) => {
    console.log("trying to delete");
    const { id } = req.params;
    
    const database = fs.readFileSync("db.json", "utf8");
    const jsObject = JSON.parse(database);

    let result = jsObject.filter((e) => e.id !== id);
    console.log(result);
    const newData = JSON.stringify(result);
  
    fs.writeFileSync("db.json", newData);
    return res.send("success delete");
  };
  
  
  module.exports = studentController;
