const express = require("express");
const router = express.Router();

let orders = require("./data");

// GET /orders - add a new order
router.get("/", (req, res) => {
  res.json(orders);
});

// POST /orders - add a new order
router.post("/", express.json(), (req, res) => {
  const newOrder = req.body;
  newOrder.id = orders.length + 1;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// PUT /orders/:id - update order
router.put("/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));

  if (!order) return res.status(404).json({ error: "Order not found" });

  const { item } = req.body;

  if (!item) return res.status(400).json({ error: "Item name is required" });

  order.item = item;

  res.status(200).json(order);
});

// DELETE /orders/:id - delete an order
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = orders.findIndex((o) => o.id === id);

    if (index === -1) return res.status(404).json({error: "Order not found"});

    orders.splice(index, 1);

    res.status(200).json({message: `Order with id:${id} has been deleted`});
})

module.exports = router;
