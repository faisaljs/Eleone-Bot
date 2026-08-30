require("dotenv").config();
const { EleoneBot } = require("./bot");

(async () => {
  const bot = new EleoneBot();
  await bot.start();
})();

/*
 * Project: Eleone Bot
 * Author: faisaljs (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisaljs
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

