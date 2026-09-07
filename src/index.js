require("dotenv").config();

const http = require("http");
const { EleoneBot } = require("./bot");

const PORT = Number(process.env.PORT || 26403);

const bot = new EleoneBot();

const server = http.createServer((req, res) => {
  // Health check for Uptime Kuma
  if (req.url === "/health") {
    const isOnline =
      bot.client &&
      bot.client.isReady();

    res.setHeader("Content-Type", "application/json");

    if (isOnline) {
      res.writeHead(200);

      return res.end(
        JSON.stringify({
          status: "online",
          bot: bot.client.user?.tag || "Eleone Bot",
          uptime: Math.floor(process.uptime()),
        }),
      );
    }

    res.writeHead(503);

    return res.end(
      JSON.stringify({
        status: "offline",
        bot: "Eleone Bot",
      }),
    );
  }

  // Simple browser test
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    return res.end("Eleone Bot is running.");
  }

  res.writeHead(404, {
    "Content-Type": "text/plain",
  });

  res.end("Not Found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[WEB] Health server listening on port ${PORT}`);
});

(async () => {
  try {
    await bot.start();

    console.log(
      `[BOT] Logged in as ${bot.client.user?.tag || "Eleone Bot"}`,
    );
  } catch (error) {
    console.error("[BOT] Failed to start:", error);

    // If Discord login fails, health endpoint returns 503.
  }
})();

/*
 * Project: Eleone Bot
 * Author: faisaljs (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisaljs
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 * © 2026 Eleone Hub. All rights reserved.
 */
