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
  res.status(200).json(users);
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

// 7 & 8
const products = [
  { id: 1, name: 'Penna', price: 10 },
  { id: 2, name: 'Blyertspenna', price: 500 },
  { id: 3, name: 'Rice', price: 25 },
  { id: 4, name: 'Potatoes', price: 5 },
  { id: 5, name: 'Oranges', price: 1200 },
  { id: 6, name: 'Apples', price: 80 }
];

// if you type http://localhost:8000/api/products?sort=name the list of products will change based on name or price
app.get("/api/products", (req, res) => {
  const { sort } = req.query;

  console.log("Sort by:", sort);

  let sortedProducts = [...products]; // clones the array so the original doesn't get modified

  if (sort === 'name') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'price') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  
  res.status(200).json(sortedProducts);
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) return res.status(404).json({ error: "Product not found" });

  res.status(200).json(product);
})

// 9. add a new product to the product list
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) 
    return res.status(400).json({ error: "name is required" });

  const newProduct = { 
    id: Date.now(), // quick was to generate a somewhat unique ID
    name,
    price
  };

  // push to the correct array
  products.push(newProduct);

  // 201 = created
  res.status(201).json(newProduct); 
});

// start and listen to server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
