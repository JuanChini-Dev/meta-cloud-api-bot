const axios = require("axios");
const config = require("../config/config");

exports.sendInfoOptions = async (phoneNumber) => {
  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: "Elige la información que necesitas:" },
      action: {
        buttons: [
          { type: "reply", reply: { id: "info_perito", title: "Perito" } },
          { type: "reply", reply: { id: "info_tecnicatura", title: "Tecnicatura" } }
        ]
      }
    }
  };

  await sendMessage(data);
};

exports.handleButtonReply = async (buttonId, phoneNumber) => {
  let messageText;
  if (buttonId === "info_perito") {
    messageText = "El Perito es un profesional encargado de...";
  } else if (buttonId === "info_tecnicatura") {
    messageText = "La Tecnicatura es un programa educativo que...";
  }

  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "text",
    text: { body: messageText }
  };

  await sendMessage(data);
};

const sendMessage = async (data) => {
  const url = `https://graph.facebook.com/v20.0/${config.phoneNumberID}/messages`;
  const headers = {
    Authorization: `Bearer ${config.accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log("Mensaje enviado:", response.data);
  } catch (error) {
    console.error("Error al enviar el mensaje:", error.response ? error.response.data : error.message);
  }
};
