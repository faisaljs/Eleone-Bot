const { buildUtilityPayload } = require("./card");
const { emoji } = require("../../config/emoji");

const WEBSITE_URL = "https://eleone.vercel.app/";

module.exports = {
  name: "website",
  aliases: ["site", "web"],
  description: "Open Eleone official website.",
  usage: "website",
  async execute({ bot, message }) {
    await message.reply(
      buildUtilityPayload({
        bot,
        title: `${emoji.web} Eleone Website`,
        summary:
          "Open Eleone official web panel to explore features, commands, and premium systems.",
        buttons: [
          {
            label: "Open Website",
            url: WEBSITE_URL,
            emoji: emoji.web,
          },
        ],
        footer: "Eleone Web Access",
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

