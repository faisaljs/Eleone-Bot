require("dotenv").config();
const { EleoneBot } = require("./bot");

(async () => {
  const bot = new EleoneBot();
  await bot.start();
})();

/**
 * Project: Eleone Bot
 * Author: faisalg1t (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisalg1t
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

