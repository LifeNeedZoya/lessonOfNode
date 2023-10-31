const express = require("express");
const fs = require("fs");
const app = express();
const { v4: uuidv4 } = require("uuid");

app.use(express.json()); // middleware

const PORT = 8000;
app.get("/api/users", (req, res) => {
  const { users } = JSON.parse(
    fs.readFileSync("users.json", { encoding: "utf-8" })
  );
  res.status(200).json({ message: "success", user: users });
});

app.get("/api/users/:userId", (req, res) => {
  console.log("get user by id");
  const { userId } = req.params;
  const { users } = JSON.parse(
    fs.readFileSync("users.json", { encoding: "utf8" })
  );

  const findUser = users.filter((user) => user.id === userId);
  if (findUser.length === 0) {
    res.status(400).json({ message: `${userId}-tai hereglegch oldsongui` });
  } else {
    res.status(200).json({ message: "success", user: findUser[0] });
  }
});

app.post("/api/users", (req, res) => {
  const newUser = { id: uuidv4(), ...req.body };

  const { users } = JSON.parse(
    fs.readFileSync("users.json", { encoding: "utf-8" })
  );
  const usersChangedData = users.push(newUser);
  console.log("user", users);

  fs.writeFileSync("users.json", JSON.stringify({ users }), {
    encoding: "utf-8",
  });
  res.status(200).json({ message: "post hiile  " });
});

app.put("/api/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { users } = JSON.parse(
    fs.readFileSync("users.json", { encoding: "utf8" })
  );
  console.log("change user name by id");
  let index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    res.status(400).json({ message: `${userId} тай хэрэглэгч олдсонгүй.` });
  } else {
    users[index] = { ...users[index], ...req.body };
    fs.writeFileSync("users.json", JSON.stringify({ users }), {
      encoding: "utf-8",
    });

    res.status(200).json({
      message: `${userId} тай хэрэглэгчийг шинэчиллээ.`,
      user: users[index],
    });
  }
});

app.delete("/api/users/:userId", (req, res) => {
  const { userId } = req.params;
  const { users } = JSON.parse(
    fs.readFileSync("./users.json", { encoding: "utf8" })
  );
  console.log("Delete user by id");
  const index = users.findIndex((el) => el.id === userId);
  if (index < 0) {
    res.status(404).json({ message: `${userId} oldsongui` });
  } else {
    users.splice(index, 1);
    fs.writeFileSync("users.json", JSON.stringify({ users }), {
      encoding: "utf-8",
    });
    res.status(200).json({ message: "useriig ustaglaa " });
  }
});
app.use((req, res) => {});

app.listen(PORT, () => console.log("listening on 8000 port"));
