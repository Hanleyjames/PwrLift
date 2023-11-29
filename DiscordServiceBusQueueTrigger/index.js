const axios = require('axios');
require('dotenv').config();
module.exports = async function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);
    var config = {
        method: "POST",
        url: `https://discord.com/api/${process.env.discordWebhookUrl || process.env["discordWebhookUrl"]}`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
            "content": `${mySbMsg}`
          }),
     };
    await axios(config)
    .then((response) => {
       console.log("Webhook delivered successfully");
       return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};