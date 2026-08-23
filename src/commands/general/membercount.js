const { MessageFlags, GatewayIntentBits } = require("discord.js");
const { emoji } = require("../../config/emoji");

const COMPONENTS_V2_FLAG = MessageFlags?.IsComponentsV2 ?? 1 << 15;

function getEmoji(envName, fallback) {
  const value = String(process.env[envName] || "").trim();
  return value || fallback;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatValue(value) {
  if (value === null || value === undefined) return "N/A";
  if (typeof value === "number") return formatNumber(value);
  return String(value);
}

function buildLine(emoji, label, value) {
  return `${emoji} ${label}: ${formatValue(value)}`;
}

function countPresenceFromCache(guild, totalMembers) {
  const out = { online: 0, dnd: 0, idle: 0, offline: 0 };
  const presences = guild.presences?.cache;
  if (!presences || !presences.size) return null;

  for (const presence of presences.values()) {
    const status = presence?.status || "offline";
    if (status === "online") out.online += 1;
    else if (status === "dnd") out.dnd += 1;
    else if (status === "idle") out.idle += 1;
  }

  const active = out.online + out.dnd + out.idle;
  out.offline = Math.max(0, totalMembers - active);
  return out;
}

module.exports = {
  name: "membercount",
  aliases: ["mc", "memberstats", "members"],
  description: "Show detailed server member and presence statistics.",
  usage: "membercount",

  async execute({ bot, message, reply }) {
    const guild = message.guild;
    if (!guild) return;

    const members = guild.members.cache;
    const totalMembers = Number(guild.memberCount || members.size || 0);

    let totalBots = 0;
    for (const member of members.values()) {
      if (member.user?.bot) totalBots += 1;
    }

    const totalHumans = Math.max(0, totalMembers - totalBots);

    const hasPresenceIntent =
      bot.client.options?.intents?.has?.(GatewayIntentBits.GuildPresences) ??
      false;
    const livePresence = hasPresenceIntent
      ? countPresenceFromCache(guild, totalMembers)
      : null;

    const presence = livePresence || {
      online: null,
      dnd: null,
      idle: null,
      offline: null,
    };

    const guildIcon = guild.iconURL({ extension: "png", size: 1024 }) || null;
    const botAvatar =
      bot.client.user?.displayAvatarURL?.({ extension: "png", size: 1024 }) ||
      null;

    const countStatsText = [
      "**Count Stats**",
      "| " + buildLine(`${emoji.users}`, "Total Members", totalMembers),
      "| " + buildLine(`${emoji.user}`, "Total Humans", totalHumans),
      "| " + buildLine(`${emoji.bot}`, "Total Bots", totalBots),
    ].join("\n");

    const presenceStatsText = [
      "**Presence Stats**",
      "| " + buildLine(`${emoji.online}`, "Online", presence.online),
      "| " + buildLine(`${emoji.dnd}`, "DND", presence.dnd),
      "| " + buildLine(`${emoji.idle}`, "Idle", presence.idle),
      "| " + buildLine(`${emoji.offline}`, "Offline", presence.offline),
    ].join("\n");

    const warning = livePresence
      ? "-# Live member presence breakdown"
      : "-# Enable Presence Intent in Developer Portal and set ENABLE_GUILD_PRESENCES=true in .env for live status counts.";

    const headerBlock = botAvatar
      ? {
          type: 9,
          components: [{ type: 10, content: `**Guild:** ${guild.name}` }],
          accessory: {
            type: 11,
            media: { url: botAvatar },
          },
        }
      : { type: 10, content: `**Guild:** ${guild.name}` };

    const countBlock = guildIcon
      ? {
          type: 9,
          components: [{ type: 10, content: countStatsText }],
          accessory: {
            type: 11,
            media: { url: guildIcon },
          },
        }
      : { type: 10, content: countStatsText };

    const container = {
      flags: COMPONENTS_V2_FLAG,
      components: [
        {
          type: 17,
          components: [
            { type: 10, content: `## ${emoji.stats} Member Statistics` },
            { type: 14, divider: true, spacing: 1 },
            headerBlock,
            { type: 14, divider: true, spacing: 1 },
            countBlock,
            { type: 14, divider: true, spacing: 1 },
            { type: 10, content: presenceStatsText },
            { type: 14, divider: true, spacing: 1 },
            { type: 10, content: warning },
          ],
        },
      ],
    };

    await message.reply(container).catch(async () => {
      if (!reply) return;
      await reply({
        title: "Member Statistics",
        description: "Failed to send container block. Showing fallback stats.",
        fields: [
          { name: "Total Members", value: formatNumber(totalMembers) },
          { name: "Total Humans", value: formatNumber(totalHumans) },
          { name: "Total Bots", value: formatNumber(totalBots) },
          { name: "Online", value: formatValue(presence.online) },
          { name: "DND", value: formatValue(presence.dnd) },
          { name: "Idle", value: formatValue(presence.idle) },
          { name: "Offline", value: formatValue(presence.offline) },
        ],
      });
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

