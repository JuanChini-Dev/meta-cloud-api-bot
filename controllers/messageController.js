const messageService = require("../services/messageService");
const phoneHelper = require("../helpers/phoneHelper");

exports.handleWebhook = async (req, res) => {
  try {
    const messages = req.body.entry[0].changes[0].value.messages;
    if (!messages) return res.sendStatus(200); // No hay mensajes entrantes

    const message = messages[0];
    let phoneNumber = phoneHelper.formatPhoneNumber(message.from);
    const text = message.text ? message.text.body.toLowerCase() : null;

    if (text === "quiero info") {
      await messageService.sendInfoOptions(phoneNumber);
    } else if (
      message.type === "interactive" &&
      message.interactive.type === "button_reply"
    ) {
      await messageService.handleButtonReply(
        message.interactive.button_reply.id,
        phoneNumber
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en handleWebhook:", error);
    res.sendStatus(500);
  }
};

exports.verifyWebhook = (req, res) => {
  const verifyToken = process.env.VERIFY_TOKEN;
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === verifyToken
  ) {
    return res.status(200).send(req.query["hub.challenge"]);
  }
  res.sendStatus(400);
};
