const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const port = 5050;

// Set up default mongoose connection
const url = "mongodb+srv://alcircosas:arc0218@mongodb-api.vdy4e3t.mongodb.net/test";
const client = new MongoClient(url);

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

const dbName = "usls";
let db;
client
  .connect()
  .then(async () => {
    db = client.db(dbName);
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
    console.log("Unable to connect to Mongodb");
  });

app.get("/", (req, res) => {
  db.collection("students")
    .find({})
    .toArray()
    .then((records) => {
      return res.json(records);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ msg: "There was an error processing your query" });
    });
});

app.post("/", (req, res) => {
    console.log(req.body);
    const student_no = req.body.student_no;
    const name = req.body.name;
    db.collection("students")
      .insertOne({
        student_no,
        name
      })
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  }); 

  app.put("/:_id", (req, res) => {
    const student_no = req.body.student_no;
    const id = req.params._id;
    const name = req.body.name;
    db.collection("students")
      .updateOne(
        {
          _id: ObjectId(id)
        },
        {
          $set: {
            student_no,
            name
          }
        }
      )
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  });

  app.delete("/:_id", (req, res) => {
    const id = req.params._id;
    db.collection("students")
      .deleteOne(
        {
          _id: ObjectId(id)
        })
      .then((records) => {
        return res.json(records);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "There was an error processing your query" });
      });
  }); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});