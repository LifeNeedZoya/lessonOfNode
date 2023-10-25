const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json()); // middleware

/// ugiin urt olj bn
app.get("/", (req, res) => {
  const content = fs.readFileSync("test.txt", { encoding: "utf-8" });
  const count = content.split("").length;
  res.send("Hello FROM Express Server - " + count);
});
// about page get huselteer ym garjin
app.get("/about", (req, res) => {
  res.status(200).json({
    name: "Naraa",
    age: 29,
    isVeried: true,
    score: [100, 102],
    address: {
      no: 100,
    },
  });
});

app.get("/wordCount", (req, res) => {
  const content = fs.readFileSync("test.txt", { encoding: "utf-8" });
  const count = content.split("").length;

  res.send("Count - " + count);
});

app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  console.log("UI", userId);
  const findUser = users.filter((user) => user.id === Number(userId));
  console.log("FU", findUser);
  if (findUser.length === 0) {
    res.status(404).json({ message: "Not Found" });
  } else {
    res.status(200).json({ message: "User is found", user: findUser[0] });
  }
});

app.get("/users", (req, res) => {
  const { users } = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  res.status(200).json({ message: "All user", users });
});

app.post("/users", (req, res) => {
  console.log("BODY", req.body);
  const { users } = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  const body = req.body;
  const newUser = {
    id: users.length + 1,
    username: body.username,
    password: body.password,
  };

  fs.appendFileSync("./users.json", `${newUser}`, (err) => {
    console.log("working Post request");
    if (err) {
      res.status(400).json(console.log("Error occured"));
    } else {
      res.status(200).json({ message: "All user", users: "" });
    }
  });
});

app.listen(8008, () => console.log("Server is listening at 8008 port"));
