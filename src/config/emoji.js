const emoji = {

    check: "✅",
    cross: "❌",
    info: "ℹ️",
    warn: "⚠️",
    error: "❗",
    success: "✅",
    settings: "⚙️",
    code: "💻",
    activity: "📊",

    play: "▶️",
    pause: "⏸️",
    resume: "▶️",
    skip: "⏭️",
    previous: "⏮️",
    stop: "⏹️",
    loop: "🔁",
    shuffle: "🔀",
    volume: "🔊",
    mute: "🔇",
    lyrics: "🎵",
    nowplaying: "🎶",
    queue: "📜",
    music: "🎵",
    duration: "⏱️",

    playButton: "▶️",
    pauseButton: "⏸️",
    skipButton: "⏭️",
    stopButton: "⏹️",
    loopButton: "🔁",
    shuffleButton: "🔀",

    playlist: "📋",
    playlistAdd: "➕",
    playlistRemove: "➖",
    playlistLoad: "📥",
    playlistSave: "💾",
    playlistShare: "🔗",

    favorite: "❤️",
    favoriteAdd: "💖",
    favoriteRemove: "💔",

    home: "🏠",
    previousPage: "◀️",
    nextPage: "▶️",
    firstPage: "⏪",
    lastPage: "⏩",
    back: "↩️",
    arrow: "➜",
    arrowUp: "⬆️",
    arrowDown: "⬇️",

    discord: "💬",
    server: "🏠",
    user: "👤",
    member: "👥",
    bot: "🤖",
    channel: "📢",
    voice: "🔊",
    text: "💬",

    website: "🌐",
    support: "🛠️",
    invite: "🔗",
    help: "❓",
    ping: "🏓",
    stats: "📊",
    uptime: "⏱️",
    system: "💻",
    database: "🗄️",

    premium: "👑",
    vote: "🗳️",
    token: "🎟️",
    redeem: "🎁",
    crown: "👑",

    spotify: "🎧",

    afk: "💤",

    // Filters
    filter: "🎛️",

    online: "🟢",
    idle: "🌙",
    dnd: "⛔",
    offline: "⚫",

    lock: "🔒",
    unlock: "🔓",
    permission: "🛡️",

    clock: "🕐",
    calendar: "📅",

    get(name, fallback = "") {
        return this[name] || fallback;
    }
};

module.exports = { emoji };