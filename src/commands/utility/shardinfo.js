const { buildUtilityPayload } = require("./card");
const { emoji } = require("../../config/emoji");

module.exports = {
  name: "shardinfo",
  aliases: ["shard"],
  description: "Show shard and gateway details.",
  usage: "shardinfo",
  async execute({ bot, message }) {
    const shardId = message.guild?.shardId ?? 0;
    const wsPing = Number(bot.client.ws.ping || 0);
    const shards = bot.client.ws.shards?.size || 1;

    await message.reply(
      buildUtilityPayload({
        bot,
        title: `${emoji.shard} Shard Info`,
        summary: "Gateway shard runtime details.",
        details: [
          `**Current Shard ID:** ${shardId}`,
          `**Total Local Shards:** ${shards}`,
          `**Gateway Ping:** ${wsPing}ms`,
          `**Status:** ${wsPing < 120 ? "Excellent" : wsPing < 250 ? "Stable" : "Slow"}`,
        ],
        footer: "Eleone Shard Monitor",
      }),
    );
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

