const express = require("express");
const app = express();
const port = 1111;
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "voting_system",
});

app.get("/getparties", (req, res) => {
  db.query("SELECT Name,Votes FROM PARTY", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/check", (req, res) => {
  const username = req.body.username;

  db.query(
    "SELECT VoteDone from voters where UserName=?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        console.log(req.body);
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send([
            {
              VoteDone: 0,
            },
          ]);
        }
      }
    }
  );
});

app.post("/createuser", (req, res) => {
  const username = req.body.username;

  const password = req.body.password;

  db.query(
    " INSERT INTO voters (Username,Password,VoteDone) Values (?,?,?)",
    [username, password, 0],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Values Inserted");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;

  const password = req.body.password;

  db.query(
    " select * from voters where Username=? and password=?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Wrong Username or Password", VoteDone: 9 });
        }
      }
    }
  );
});

app.post("/votes", (req, res) => {
  const party = req.body.party;

  db.query(
    " update party set votes = votes +1 where Name=?",
    [party],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.affectedRows == 0) {
          res.send({ message: "Server Error" });
        } else {
          res.send({ message: "Voted Successfully" });
        }
      }
    }
  );
});

app.post("/votes2", (req, res) => {
  const username = req.body.username;

  db.query(
    "  update voters set VoteDone=? where Username=?;",
    [1, username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.affectedRows == 0) {
          res.send({ message: "Server Error" });
        } else {
          res.send({ message: "Voted Successfully" });
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
