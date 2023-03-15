const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
userRoutes.route("/user").get(function (req, res) {
  let db_connect = dbo.getDb("wsdb");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

userRoutes.route("/event").get(function (req, res) {
  let db_connect = dbo.getDb("wsdb");
  db_connect
    .collection("events")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
userRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDb("wsdb");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you get a single record by id
userRoutes.route("/viewAvailability/:id").get(function (req, res) {
  let db_connect = dbo.getDb("wsdb");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

userRoutes.route("/event/:id").get(function (req, res) {
  let db_connect = dbo.getDb("wsdb");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("events").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
userRoutes.route("/user/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    password: req.body.password,
    almaMater: req.body.almaMater,
    date: req.body.date,
    type: req.body.type,
    assignmentCount: req.body.assignmentCount,
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

userRoutes.route("/event/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    institution: req.body.institution,
    city: req.body.city,
    state: req.body.state,
    type: req.body.type,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    eventPriority: req.body.eventPriority,
    available: req.body.available,
    assignment: req.body.assignment,
  };
  db_connect.collection("events").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
userRoutes.route("/updateUser/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      password: req.body.password,
      almaMater: req.body.almaMater,
      date: req.body.date,
      type: req.body.type,
      city: req.body.city,
      state: req.body.state,
      assignmentCount: req.body.assignmentCount,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

userRoutes.route("/updateEvent/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      institution: req.body.institution,
      city: req.body.city,
      state: req.body.state,
      type: req.body.type,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      eventPriority: req.body.eventPriority,
      assignment: req.body.assignment,
    },
  };
  db_connect
    .collection("events")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
userRoutes.route("/event/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("events").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

// This section will help you delete a record
userRoutes.route("/user/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = userRoutes;
