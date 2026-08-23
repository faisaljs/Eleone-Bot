const { SlashCommandBuilder } = require("discord.js");

/**
 * Each entry describes ONE slash command:
 *  - data:       SlashCommandBuilder -> what Discord shows in the UI
 *  - prefixName: which existing command in bot.commandMap actually runs
 *                (so we reuse all the logic in src/commands/**, no duplication)
 *  - buildArgs:  (interaction) => string[]  turns typed options into the
 *                same `args` array the prefix version's execute() expects
 *
 * To add a new slash command:
 *   1. Add a new entry below with a SlashCommandBuilder.
 *   2. Make sure `prefixName` matches an existing command's `.name`
 *      (see src/commands/**), OR write a fully custom `execute` (see the
 *      "ping" example) if you don't want to reuse a prefix command at all.
 *   3. Run `npm run deploy-commands` to push it to Discord.
 */
module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName("play")
      .setDescription("Play a song or add it to the queue")
      .addStringOption((opt) =>
        opt
          .setName("query")
          .setDescription("Song name, URL, or search term")
          .setRequired(true),
      ),
    prefixName: "play",
    buildArgs: (interaction) =>
      interaction.options.getString("query", true).split(/\s+/),
  },

  {
    data: new SlashCommandBuilder()
      .setName("skip")
      .setDescription("Skip the current track"),
    prefixName: "skip",
    buildArgs: () => [],
  },

  {
    data: new SlashCommandBuilder()
      .setName("pause")
      .setDescription("Pause playback"),
    prefixName: "pause",
    buildArgs: () => [],
  },

  {
    data: new SlashCommandBuilder()
      .setName("resume")
      .setDescription("Resume playback"),
    prefixName: "resume",
    buildArgs: () => [],
  },

  {
    data: new SlashCommandBuilder()
      .setName("stop")
      .setDescription("Stop playback and clear the queue"),
    prefixName: "stop",
    buildArgs: () => [],
  },

  {
    data: new SlashCommandBuilder()
      .setName("queue")
      .setDescription("Show the current queue"),
    prefixName: "queue",
    buildArgs: () => [],
  },

  {
    data: new SlashCommandBuilder()
      .setName("nowplaying")
      .setDescription("Show the currently playing track"),
    prefixName: "nowplaying",
    buildArgs: () => [],
  },

  {
    data: new SlashCommandBuilder()
      .setName("volume")
      .setDescription("Set playback volume")
      .addIntegerOption((opt) =>
        opt
          .setName("level")
          .setDescription("0-100")
          .setMinValue(0)
          .setMaxValue(100)
          .setRequired(true),
      ),
    prefixName: "volume",
    buildArgs: (interaction) => [
      String(interaction.options.getInteger("level", true)),
    ],
  },

  {
    data: new SlashCommandBuilder()
      .setName("vote")
      .setDescription("Sync your Top.gg vote for premium prefix/musicard"),
    prefixName: "vote",
    buildArgs: () => [],
  },

  {
    data: new SlashCommandBuilder()
      .setName("mypremium")
      .setDescription("Show your and this server's premium status"),
    prefixName: "mypremium",
    buildArgs: () => [],
  },

  {
    data: new SlashCommandBuilder()
      .setName("musicard")
      .setDescription("Set this server's musicard theme")
      .addStringOption((opt) =>
        opt
          .setName("theme")
          .setDescription("Card theme")
          .setRequired(true)
          .addChoices(
            { name: "ease", value: "ease" },
            { name: "glass", value: "glass" },
            { name: "neon", value: "neon" },
            { name: "sunset", value: "sunset" },
            { name: "ocean", value: "ocean" },
            { name: "mono", value: "mono" },
          ),
      ),
    prefixName: "mycard",
    buildArgs: (interaction) => [interaction.options.getString("theme", true)],
  },

  {
    data: new SlashCommandBuilder()
      .setName("stay247")
      .setDescription("Toggle 24/7 always-on voice mode")
      .addStringOption((opt) =>
        opt
          .setName("mode")
          .setDescription("on / off / status")
          .setRequired(true)
          .addChoices(
            { name: "on", value: "on" },
            { name: "off", value: "off" },
            { name: "status", value: "status" },
          ),
      ),
    prefixName: "247",
    buildArgs: (interaction) => [interaction.options.getString("mode", true)],
  },

  {
    data: new SlashCommandBuilder()
      .setName("help")
      .setDescription("Show all commands"),
    prefixName: "help",
    buildArgs: () => [],
  },

  // Example of a fully custom slash command that does NOT reuse a prefix
  // command at all - just give it its own `execute(interaction, bot)`.
  {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Check the bot's latency"),
    execute: async (interaction, bot) => {
      await interaction.reply(
        `Pong! Gateway latency: ${bot.client.ws.ping}ms`,
      );
    },
  },
];

/**
 * Project: Eleone Bot
 * Author: faisalg1t (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisalg1t
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

