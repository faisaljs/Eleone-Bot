module.exports = {
  name: "pause",
  aliases: [],
  description: "Pause playback.",
  usage: "pause",
  async execute({ bot, message, reply }) {
    const ok = await bot.music.pause(message.guild.id);
    if (!ok) {
      await reply({
        title: "Nothing Playing",
        description: "No active track.",
      });
      return;
    }

    await reply({ title: "Paused", description: "Playback paused." });
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

