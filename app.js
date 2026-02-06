const express = require("express");
const app = express();
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const messages = [
  { text: "Hi there!", user: "Amando", added: new Date(), id: 0 },
  { text: "Hello World!", user: "Charles", added: new Date(), id: 1 },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
    id: messages.length,
  });
  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const message = messages[req.params.id];
  if (message) {
    res.render("detail", { message: message });
  } else {
    res.status(404).send("Message not found");
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
