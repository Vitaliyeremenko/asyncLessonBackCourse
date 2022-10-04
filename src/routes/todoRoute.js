const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

router.get("/", async (req, res) => {
  const file = await fs.readFile("./src/database/todos.json");
  await delay(2000);
  res.json(JSON.parse(file));
});
router.post("/", async (req, res) => {
  if (!req.body || !req.body.title) {
    res.status(421).json({
      message: "Не вірний реквест",
    });
    return;
  }
  const file = await fs.readFile("./src/database/todos.json");
  const todosParsed = JSON.parse(file);
  const newTodo = {
    id: Date.now(),
    title: req.body.title,
    isActive: true,
  };
  todosParsed.todos.push(newTodo);
  await delay(2000);
  await fs.writeFile("./src/database/todos.json", JSON.stringify(todosParsed));
  res.json(newTodo);
});

router.delete("/:id", async (req, res) => {
  const file = await fs.readFile("./src/database/todos.json");
  const todosParsed = JSON.parse(file);
  todosParsed.todos = todosParsed.todos.filter(
    (item) => item.id !== +req.params.id
  );
  await await fs.writeFile(
    "./src/database/todos.json",
    JSON.stringify(todosParsed)
  );
  await delay(2000);
  res.json(todosParsed);
});

router.put("/:id", async (req, res) => {
  if (!req.body) {
    res.status(421).json({
      message: "Не вірний реквест",
    });
    return;
  }
  const file = await fs.readFile("./src/database/todos.json");
  const todosParsed = JSON.parse(file);
  const currentItem = todosParsed.todos.find(
    (item) => item.id === +req.params.id
  );
  if (req.body.title) {
    currentItem.title = req.body.title;
  }
  if (req.body.isActive) {
    currentItem.isActive = req.body.isActive;
  }
  await delay(2000);
  await fs.writeFile("./src/database/todos.json", JSON.stringify(todosParsed));
  res.json(currentItem);
});

module.exports = router;
