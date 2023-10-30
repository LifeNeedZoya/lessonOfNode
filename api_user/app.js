const express = require("express");
const fs = require("fs");
const app = express();
const { v4: uuidv4 } = require("uuid");

app.use(express.json()); // middleware

const PORT = 8000;
app.get("/", (req, res) => {
  res.status(200).json({ message: "success it is working" });
});

app.post("/api/users", (req, res) => {
  const newUser = { id: uuidv4(), ...req.body };

  const { users } = JSON.parse(
    fs.readFileSync("users.json", { encoding: "utf-8" })
  );
  users.push(newUser);
  console.log("user", users);

  fs.writeFileSync("users.json", JSON.stringify({ users }), {
    encoding: "utf-8",
  });
  res.status(201).json({ message: "post hiile  " });
});

app.put("/api/users/:id", (req, res) => {
  const { userId } = req.params;
  console.log("update user by id");

  res.status(200).json({ message: "success" });
});

app.delete("/api/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { users } = JSON.parse(
    fs.readFileSync("./users.json", { encoding: "utf8" })
  );
  console.log("Delete user by id");
  const index = users.findIndex((el) => el.id === userId);
  if (index < 0) {
    res.status(404).json({ message: "error " });
  } else {
    git;
    users.splice(index, 1);
    fs.writeFileSync("users.json", JSON.stringify({ users }), {
      encoding: "utf-8",
    });
    res.status(200).json({ message: "useriig ustaglaa " });
  }
});

app.listen(PORT, () => console.log("listening on 8000 port"));
