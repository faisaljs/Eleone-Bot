const { buildUtilityPayload } = require("./card");

const WEBSITE_URL = "https://eleone.vercel.app/";

module.exports = {
    name: "website",
    aliases: ["site", "web"],
    description: "Open Eleone official website.",
    usage: "website",
    async execute({ bot, message }) {
        await message.reply(buildUtilityPayload({
            bot,
            title: "Eleone Website",
            summary: "Open Eleone official web panel to explore features, commands, and premium systems.",
            buttons: [
                {
                    label: "Open Website",
                    url: WEBSITE_URL,
                    emoji: process.env.UTILITY_WEBSITE_EMOJI || "??"
                }
            ],
            footer: "Eleone Web Access"
        }));
    }
};
