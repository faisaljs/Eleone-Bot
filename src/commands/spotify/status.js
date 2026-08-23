const {
  getSpotifyProfile,
  hasSpotifyFeatureAccess,
} = require("../../spotify/service");

module.exports = {
  name: "spstatus",
  aliases: ["spotifystatus"],
  description: "Show your connected Spotify profile status.",
  usage: "spstatus",
  async execute({ message, reply }) {
    const [access, profile] = await Promise.all([
      hasSpotifyFeatureAccess(message.author.id),
      getSpotifyProfile(message.author.id),
    ]);

    await reply({
      title: "Spotify Status",
      fields: [
        { name: "Premium Access", value: access ? "Enabled" : "Disabled" },
        { name: "Connected", value: profile ? "Yes" : "No" },
        {
          name: "Profile",
          value: profile
            ? `[${profile.display_name}](${profile.profile_url})`
            : "Not connected",
        },
      ],
      image: profile?.avatar_url || undefined,
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

