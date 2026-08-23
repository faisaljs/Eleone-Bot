const { formatUptime } = require("../../utils/format");
const { buildUtilityPayload } = require("./card");
const { emoji } = require("../../config/emoji");

module.exports = {
  name: "uptime",
  aliases: [],
  description: "Show bot uptime details.",
  usage: "uptime",
  async execute({ bot, message }) {
    const up = formatUptime(process.uptime() * 1000);
    await message.reply(
      buildUtilityPayload({
        bot,
        title: `${emoji.clock} Uptime`,
        summary: "Current runtime status for Eleone.",
        details: [
          `**Uptime:** ${up}`,
          `**Started:** <t:${Math.floor((Date.now() - process.uptime() * 1000) / 1000)}:F>`,
        ],
        footer: "Eleone Uptime Monitor",
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

