const { buildContainerMessage } = require("../components/containerBuilder");

/**
 * Turns a ChatInputCommandInteraction into the same shape prefix command
 * `execute({ bot, message, args, reply })` handlers already expect, so a
 * slash command can call straight into existing command logic instead of
 * duplicating it.
 */
async function createInteractionContext(bot, interaction, args) {
  if (!interaction.deferred && !interaction.replied) {
    await interaction.deferReply().catch(() => null);
  }

  let member = interaction.member || null;
  if (interaction.guild && (!member || typeof member.permissions === "string")) {
    member = await interaction.guild.members
      .fetch(interaction.user.id)
      .catch(() => member);
  }

  const send = async (payload) => {
    const rendered =
      payload && (payload.components || payload.flags)
        ? payload
        : buildContainerMessage(payload);

    if (interaction.deferred || interaction.replied) {
      return interaction.editReply(rendered).catch(() =>
        interaction.followUp(rendered).catch(() => null),
      );
    }
    return interaction.reply(rendered).catch(() => null);
  };

  const message = {
    guild: interaction.guild,
    guildId: interaction.guildId,
    channelId: interaction.channelId,
    author: interaction.user,
    member,
    content: "",
    mentions: { users: new Map() },
    // Some command modules call message.reply(...) directly with a raw
    // Components V2 payload (buttons etc.) instead of using the reply()
    // helper below - support both.
    reply: (payload) => send(payload),
  };

  const reply = (payload) => send(payload);

  return { message, args, reply };
}

module.exports = { createInteractionContext };

/*
 * Project: Eleone Bot
 * Author: faisaljs (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisaljs
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

