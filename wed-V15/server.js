const dotenv = require("dotenv");
const express = require('express');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;  

app.use(express.json());

let users = [
    {id: 1, name: "Rhi"},
    {id: 2, name: "Lou"},
    {id: 3, name: "Brö"}
];

app.get("/", (req, res) => {
    res.send("Startsidan på servern");
});

app.get("/api/users", (req, res) => {
    res.status(200).jsonp(users);
})

app.get("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) return res.status(404).json({error: "User not found"});

    res.status(200).json(user);
});

app.post("/api/users", (req, res) => {
    const {name} = req.body;

    if (!name) return res.status(400).json({error: "name is required"});

    const newUser = {id: Date.now(), name}

    users.push(newUser);

    res.status(200).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) return res.status(404).json({error: "User not found"});

    const {name} = req.body;

    if (!name) return res.status(400).json({error: "name is required"});

    user.name = name;

    res.status(200).json(user);
})

app.delete("/api/users/:id", (req, res) => {
    const index = users.findIndex((u) => u.id === parseInt(req.params.id)); 

    if (index === -1) return res.status(404).json({error: "User not found"});

    users.splice(index, 1);

    res.status(200).json({message: `User with id:${index} was deleted`});

})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})