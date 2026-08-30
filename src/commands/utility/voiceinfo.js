const { buildUtilityPayload } = require("./card");
const { emoji } = require("../../config/emoji");

module.exports = {
  name: "voiceinfo",
  aliases: ["vcinfo"],
  description: "Show voice connection and channel details.",
  usage: "voiceinfo",
  async execute({ bot, message, reply }) {
    const memberVoice = message.member?.voice?.channel;
    const state = bot.music.get(message.guild.id);
    const botVoice = state?.voiceChannelId
      ? await message.guild.channels
          .fetch(state.voiceChannelId)
          .catch(() => null)
      : null;

    if (!memberVoice && !botVoice) {
      await reply({
        title: `${emoji.voice} Voice Info`,
        description: "No active voice channel found.",
      });
      return;
    }

    await message.reply(
      buildUtilityPayload({
        bot,
        title: `${emoji.voice} Voice Info`,
        summary: "Current voice session details.",
        details: [
          `**Your Channel:** ${memberVoice ? `${memberVoice.name} (${memberVoice.id})` : "Not connected"}`,
          `**Bot Channel:** ${botVoice ? `${botVoice.name} (${botVoice.id})` : "Not connected"}`,
          `**Queue Length:** ${state ? state.queue.length : 0}`,
          `**Now Playing:** ${state?.current?.title || "Nothing"}`,
          `**Paused:** ${state?.isPaused ? "Yes" : "No"}`,
        ],
        footer: "Eleone Voice Diagnostics",
      }),
    );
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

