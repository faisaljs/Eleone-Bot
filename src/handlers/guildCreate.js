const { ensureGuild } = require("../database/guildConfig");

function registerGuildCreateHandler(bot) {
  bot.client.on("guildCreate", async (guild) => {
    await ensureGuild(guild.id).catch((err) => {
      console.error("[guildCreate ensureGuild]", err);
    });
  });
}

module.exports = { registerGuildCreateHandler };

/*
 * Project: Eleone Bot
 * Author: faisaljs (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisaljs
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

