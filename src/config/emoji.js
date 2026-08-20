const emoji = {
  bot: "<:icons8bot48:1539949694308974644>",
  dev: "<:icons8sourcecode48:1539955596650872862>",
  tech: "<:icons8tech48:1539956252388364398>",
  expire: "<:icons8expire48:1539957020302647448>",
  next: "<:icons8right48:1539951571167740035>",
  prev: "<:icons8sortleft48:1539951798368862249>",
  home: "<:icons8home48:1539950805551939625>",
  refresh: "<:icons8refresh48:1539960037403918397>",
  info: "<:icons8info48:1539945788795523083>",
  stats: "<:icons8combochart48:1539949388246417459>",
  wifi: "<:icons8wifi48:1539949203533463642>",
  shard: "<:icons8firealarm48:1539965541203320892>",
  support: "<:icons8support48:1539966252217532486>",
  discord: "<:icons8discord48:1539966700777115668>",
  github: "<:icons8github48:1539966672239337583>",
  message: "<:icons8message48:1539966863599992963>",
  svlist: "<:icons8list48:1539968254926131250>",
  system: "<:icons8system48:1539969550932779038>",
  clock: "<:icons8time48:1539952037641457716>",
  voice: "<:icons8audio48:1539970534597722162>",
  web: "<:icons8web48:1539949909283831889>",

  get(name, fallback = "") {
    return this[name] || fallback;
  },
};

module.exports = { emoji };
