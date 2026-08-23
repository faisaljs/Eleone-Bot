const fs = require("fs");
const path = require("path");

const ROOT = __dirname;

const FOOTER = `

/**
 * Project: Eleone Bot
 * Author: faisalg1t (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisalg1t
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */
`;

function processDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Skip dependencies and Git files
      if (["node_modules", ".git"].includes(file.name)) continue;

      processDirectory(fullPath);
      continue;
    }

    if (!file.name.endsWith(".js")) continue;

    let content = fs.readFileSync(fullPath, "utf8");

    // Prevent duplicate footer
    if (content.includes("© 2026 Eleone Hub. All rights reserved.")) {
      console.log(`Skipped: ${fullPath}`);
      continue;
    }

    // Remove trailing whitespace/newlines, then append footer
    content = content.trimEnd() + FOOTER + "\n";

    fs.writeFileSync(fullPath, content, "utf8");

    console.log(`Updated: ${fullPath}`);
  }
}

processDirectory(ROOT);

console.log("\nDone!");