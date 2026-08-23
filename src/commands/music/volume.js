module.exports = {
  name: "volume",
  aliases: ["vol"],
  description: "Set player volume (1-100).",
  usage: "volume <1-100>",
  async execute({ bot, message, args, reply }) {
    const value = Number(args[0]);
    if (!Number.isInteger(value) || value < 1 || value > 100) {
      await reply({
        title: "Invalid Volume",
        description: "Volume must be an integer 1-100.",
      });
      return;
    }

    const ok = await bot.music.setVolume(message.guild.id, value);
    if (!ok) {
      await reply({ title: "Idle", description: "No active player." });
      return;
    }

    await reply({
      title: "Volume Updated",
      description: `Volume set to **${value}%**.`,
    });
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

