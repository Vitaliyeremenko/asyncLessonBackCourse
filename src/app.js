const express = require("express");
const todos = require("./routes/todoRoute");
const users = require("./routes/userRoute");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/todos", todos);
app.use("/users", users);

app.get("/test", (req, res) => {
  res.send("Hello");
});
app.listen(4444, () => {
  console.log("Server is Listening on port 4444");
});
