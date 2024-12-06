const express = require("express");
const { createFruit, getAllFruits, updateFruit, deleteFruit  } = require("./db");
const app = express();


app.use(express.json());

// GET all fruits
app.get("/", async (req, res) => {
	const result = await getAllFruits();  // Call the getAllFruits function

  if (result.success) {
    res.status(200).json({
      message: result.message,
      fruits: result.fruits
    });
  } else {
    res.status(404).json({
      message: result.message
    });
  }
})

// CREATE fruits
app.post('/create-fruit', async (req, res) => {
  const fruit = req.body; // Assumes the body contains a fruit object
  const result = await createFruit(fruit);
  res.json(result);
});

// UPDATE fruit
app.put('/update-fruit/:name', async (req, res) => {
  const { name } = req.params;
  const updatedFruit = req.body; // Assumes the body contains the updated fruit data
  const result = await updateFruit(name, updatedFruit);
  res.json(result);
});

// DELETE fruit
app.delete('/delete-fruit/:name', async (req, res) => {
  const { name } = req.params;
  const result = await deleteFruit(name);
  res.json(result);
});

app.listen(8000, () => {
	console.log("server running at http://localhost:8000");
})