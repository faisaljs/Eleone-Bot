const { createClient } = require("@supabase/supabase-js");
const { loadConfig } = require("../config");

const cfg = loadConfig();

const supabase = createClient(cfg.supabase.url, cfg.supabase.key, {
  auth: { persistSession: false },
  global: {
    headers: {
      "x-application-name": "eleone-bot",
    },
  },
});

module.exports = { supabase };

/*
 * Project: Eleone Bot
 * Author: faisaljs (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisaljs
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

