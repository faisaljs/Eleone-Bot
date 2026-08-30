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

/*
 * Project: Eleone Bot
 * Author: faisaljs (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisaljs
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

