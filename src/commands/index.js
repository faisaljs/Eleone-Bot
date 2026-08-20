const fs = require("node:fs");
const path = require("node:path");

function collectJsFiles(rootDir) {
    if (!fs.existsSync(rootDir)) return [];

    const out = [];
    const entries = fs.readdirSync(rootDir, { withFileTypes: true });

    for (const entry of entries) {
        const full = path.join(rootDir, entry.name);

        if (entry.isDirectory()) {
            out.push(...collectJsFiles(full));
            continue;
        }

        if (!entry.isFile()) continue;
        if (!entry.name.endsWith(".js")) continue;
        if (entry.name === "index.js") continue;

        out.push(full);
    }

    return out;
}

function isCommandModule(mod) {
    return Boolean(
        mod &&
        typeof mod === "object" &&
        typeof mod.name === "string" &&
        mod.name.trim().length > 0 &&
        typeof mod.execute === "function"
    );
}

function loadCommands() {
    const files = collectJsFiles(__dirname);
    const commands = [];

    for (const file of files) {
        try {
            const mod = require(file);

            if (isCommandModule(mod)) {
                commands.push(mod);
            }
        } catch (error) {
            console.error(`Failed to load command: ${file}`);
            console.error(error);
        }
    }

    return commands;
}

module.exports = { loadCommands };