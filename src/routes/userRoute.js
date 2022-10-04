const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

router.get("/", async (req, res) => {
  const file = await fs.readFile("./src/database/users.json");
  await delay(2000);
  res.json(JSON.parse(file));
});
router.post("/", async (req, res) => {
  console.log(req.body);
  if (!req.body || !req.body.name || !req.body.email) {
    res.status(421).json({
      message: "Не вірний реквест",
    });
    return;
  }
  const file = await fs.readFile("./src/database/users.json");
  const usersParsed = JSON.parse(file);
  const newUser = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    isActive: true,
  };
  usersParsed.users.push(newUser);
  await delay(2000);
  await fs.writeFile("./src/database/users.json", JSON.stringify(usersParsed));
  res.json(usersParsed);
});

router.delete("/:id", async (req, res) => {
  const file = await fs.readFile("./src/database/users.json");
  const usersParsed = JSON.parse(file);
  usersParsed.users = usersParsed.users.filter(
    (item) => item.id !== +req.params.id
  );
  await delay(2000);
  await fs.writeFile("./src/database/users.json", JSON.stringify(usersParsed));
  res.json(usersParsed);
});

router.put("/:id", async (req, res) => {
  if (!req.body) {
    res.status(421).json({
      message: "Не вірний реквест",
    });
    return;
  }
  const file = await fs.readFile("./src/database/users.json");
  const usersParsed = JSON.parse(file);
  const currentItem = usersParsed.users.find(
    (item) => item.id === +req.params.id
  );
  if (req.body.name) {
    currentItem.name = req.body.name;
  }
  if (req.body.email) {
    currentItem.email = req.body.email;
  }
  if (req.body.isActive) {
    currentItem.isActive = req.body.isActive;
  }
  await delay(2000);
  await fs.writeFile("./src/database/users.json", JSON.stringify(usersParsed));
  res.json(currentItem);
});

module.exports = router;
