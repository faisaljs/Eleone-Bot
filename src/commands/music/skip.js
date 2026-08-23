module.exports = {
  name: "skip",
  aliases: ["next"],
  description: "Skip current track.",
  usage: "skip",
  async execute({ bot, message, reply }) {
    const ok = await bot.music.skip(message.guild.id);
    if (!ok) {
      await reply({
        title: "Nothing Playing",
        description: "No current track.",
      });
      return;
    }

    await reply({ title: "Skipped", description: "Moved to next track." });
  },
};

/**
 * Project: Eleone Bot
 * Author: faisalg1t (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisalg1t
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

