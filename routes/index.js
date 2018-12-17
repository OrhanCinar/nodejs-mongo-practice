var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/thelist", (req, res) => {

  const url = "mongodb://localhost:27017/mongosite";
  var client = new MongoClient(url);
  try {
    client.connect((err, client) => {
      if (err) {
        console.log(err);
      } else {
        console.log('connected');
      }

      const db = client.db('mongosite');

      const coll = db.collection('students');
      console.log(coll);

      coll.find().toArray(function (err, result) {
        if (err) {
          res.send(err);
        } else if (result.length) {
          res.render('studentlist', {
            "studentlist": result
          });
        } else {
          res.send('No document found');
        }
      });
    });
  } catch (error) {
    console.log(error.stack);
  }
  client.close();
})

router.get('/newstudent', (req, res) => {
  res.render('newstudent', { title: 'Add Student' });
})

router.post('/addstudent', (req, res) => {
  res.render('newstudent', { title: 'Add Student' });

  const url = "mongodb://localhost:27017/mongosite";
  var client = new MongoClient(url);

  try {
    client.connect((err, client) => {
      if (err) {
        console.log(err);
      } else {
        console.log('connected');
      }

      const db = client.db('mongosite');

      const coll = db.collection('students');

      var formData = { student: req.body.student };

      console.log(formData);

      coll.insertOne(formData, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(301, {Locaation: '/thelist'});
          res.end();
        }
      });
    });
  } catch (error) {
    console.log(error.stack);
  }
  //client.close();
})

module.exports = router;
