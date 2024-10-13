exports.formatPhoneNumber = (phoneNumber) => {
    // Formato de 549 -> 54 y ajuste de área
    if (phoneNumber.startsWith("549")) {
      phoneNumber = "54" + phoneNumber.slice(3); // Elimina el '9' después del código de país
      phoneNumber = phoneNumber.slice(0, 5) + "15" + phoneNumber.slice(5); // Insertar '1' después del código de área
    }
    return phoneNumber;
  };
  