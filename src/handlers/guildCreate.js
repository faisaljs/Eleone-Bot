const { ensureGuild } = require("../database/guildConfig");

function registerGuildCreateHandler(bot) {
  bot.client.on("guildCreate", async (guild) => {
    await ensureGuild(guild.id).catch((err) => {
      console.error("[guildCreate ensureGuild]", err);
    });
  });
}

module.exports = { registerGuildCreateHandler };

/**
 * Project: Eleone Bot
 * Author: faisalg1t (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisalg1t
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

