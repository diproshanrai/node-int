const express = require("express");
const app = express();


let items = [];


app.use(express.json());

app.get("/item", (req, res) => {
  res.json(items); 
});

app.get("/", (req, res) => {
  res.send("welcome to H page");
});

app.post("/item", (req, res) => {
  const item = req.body;
  items.push(item); 
  res.status(201).json(item);
});

app.delete("/item/:itemid", (req, res) => {
  const index = parseInt(req.params.itemid, 10); // Parse the index from the URL
  if (index >= 0 && index < items.length) {
    const deletedItem = items.splice(index, 1); // Remove item from array
    res.json(deletedItem); // Respond with the deleted item
  } else {
    res.status(404).json({ error: "Item not found" }); // Item not found error
  }
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
