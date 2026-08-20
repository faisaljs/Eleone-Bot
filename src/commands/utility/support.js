const { buildUtilityPayload } = require("./card");
const { emoji } = require("../../config/emoji");

module.exports = {
  name: "support",
  aliases: ["supportserver"],
  description: "Get support links for Eleone.",
  usage: "support",
  async execute({ bot, message }) {
    const serverUrl =
      process.env.NO_PREFIX_CONTACT_DISCORD_URL ||
      "https://discord.gg/TGF3fCXtRm";
    const githubUrl =
      process.env.NO_PREFIX_CONTACT_GITHUB_URL ||
      "https://github.com/faisalg1t";
    const dmUrl = bot.config?.noPrefix?.ownerId
      ? `https://discord.com/users/${bot.config.noPrefix.ownerId}`
      : serverUrl;

    await message.reply(
      buildUtilityPayload({
        bot,
        title: `${emoji.support} Support`,
        summary: "Need help with setup, music issues, or premium features?",
        details: [
          "**Use the buttons below to contact support.**",
          "Fastest response is usually on Discord server.",
        ],
        buttons: [
          {
            label: "Discord",
            url: serverUrl,
            emoji: emoji.discord,
          },
          {
            label: "Github",
            url: githubUrl,
            emoji: emoji.github,
          },
          {
            label: "Direct DM",
            url: dmUrl,
            emoji: emoji.message,
          },
        ],
        footer: "Eleone Support Center",
      }),
    );
  },
};
