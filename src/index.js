require("dotenv").config();
const { EleoneBot } = require("./bot");

(async () => {
  const bot = new EleoneBot();
  await bot.start();
})();
