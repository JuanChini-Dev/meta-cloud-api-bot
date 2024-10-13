const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const messageController = require("./controllers/messageController");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas para manejar los webhooks
app.post("/webhook", messageController.handleWebhook);
app.get("/webhook", messageController.verifyWebhook);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
