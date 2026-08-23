const { PermissionsBitField } = require("discord.js");
const { buildUtilityPayload } = require("./card");
const { emoji } = require("../../config/emoji");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Get bot invite link.",
  usage: "invite",
  async execute({ bot, message }) {
    const clientId = bot.client.user?.id;
    const perms = new PermissionsBitField([
      PermissionsBitField.Flags.ViewChannel,
      PermissionsBitField.Flags.SendMessages,
      PermissionsBitField.Flags.Connect,
      PermissionsBitField.Flags.Speak,
      PermissionsBitField.Flags.UseExternalEmojis,
      PermissionsBitField.Flags.ReadMessageHistory,
      PermissionsBitField.Flags.ManageMessages,
    ]).bitfield.toString();

    const inviteUrl = clientId
      ? `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${perms}&scope=bot`
      : "https://discord.com/developers/applications";

    await message.reply(
      buildUtilityPayload({
        bot,
        title: `${emoji.bot} Invite Eleone`,
        summary: "Add Eleone to your server with recommended permissions.",
        details: [
          `**Client ID:** ${clientId || "Unknown"}`,
          `**Permissions:** ${perms}`,
        ],
        buttons: [
          {
            label: "Invite Bot",
            url: inviteUrl,
            emoji: emoji.bot,
          },
        ],
        footer: "Eleone Invite Panel",
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

