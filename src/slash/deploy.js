require("dotenv").config();
const { REST, Routes } = require("discord.js");
const slashCommands = require("../commands/slash/cmds");

async function main() {
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;
  const guildId = process.env.DISCORD_GUILD_ID; // optional, instant update

  if (!token) throw new Error("Missing DISCORD_TOKEN in env.");
  if (!clientId) throw new Error("Missing DISCORD_CLIENT_ID in env.");

  const body = slashCommands.map((cmd) => cmd.data.toJSON());

  const rest = new REST({ version: "10" }).setToken(token);

  if (guildId) {
    // Guild commands update instantly - best while developing/testing.
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body,
    });
    console.log(
      `Deployed ${body.length} slash command(s) to guild ${guildId}.`,
    );
  } else {
    // Global commands can take up to ~1 hour to propagate to all servers.
    await rest.put(Routes.applicationCommands(clientId), { body });
    console.log(`Deployed ${body.length} global slash command(s).`);
  }
}

main().catch((error) => {
  console.error("[Slash Deploy Error]", error);
  process.exit(1);
});