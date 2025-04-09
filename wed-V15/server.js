const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// database
let users = [
  { id: 1, name: "Rhi" },
  { id: 2, name: "Lou" },
  { id: 3, name: "Brö" },
];

// CRUD for users

// GET

// display something on the homepage
app.get("/", (req, res) => {
  res.send("Startsidan på servern");
});

// GET to retrieve all users
app.get("/api/users", (req, res) => {
  res.status(200).jsonp(users);
});

// GET to retrieve a specific user (with params)
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  res.status(200).json(user);
});

// POST

// create a new user
app.post("/api/users", (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "name is required" });

  const newUser = { id: Date.now(), name };

  users.push(newUser);

  res.status(200).json(newUser);
});

// PUT

// updates a user
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "name is required" });

  user.name = name;

  res.status(200).json(user);
});

// DELETE

// delete a user
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: "User not found" });

  users.splice(index, 1);

  res.status(200).json({ message: `User with id:${index} was deleted` });
});

// Easy exercises
// 1.
app.get("/api/welcome", (req, res) => {
  res.status(200).header("a greeting").json({ message: "Hello!" });
});

// 2.
app.get("/api/headers", (req, res) => {
  res.status(200).json(req.headers);
});

// 3.
app.get("/api/name", (req, res) => {
  res.status(200).json({ message: "Rhiannon" });
});

// 4.
app.get("/api/greet/:name", (req, res) => {
    res.json({message: `Hej ${req.params.name}!`});
});

// 5.
app.get("/api/greet", (req, res) => {
    const name = req.query.name || "world"; // fallback if no name is given
    res.status(200).json({message: `Hej, ${name}!`});
});

// Medium exercises
// 6. Update only the name of a user
app.patch("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const newName = req.body.name;

    // find user
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({message: "User not found"});
    }

    if (!newName) {
        return res.status(400).json({message: "Name is required"});
    }

    user.name = newName;

    res.status(200).json({message: "User updated", user});
});


// start and listen to server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
