(function () {
  const root = document.querySelector("[data-command-app]");
  if (!root) return;

  const searchInput = root.querySelector("[data-search]");
  const categorySelect = root.querySelector("[data-category]");
  const premiumToggle = root.querySelector("[data-premium-toggle]");
  const resetBtn = root.querySelector("[data-reset]");
  const chipWrap = root.querySelector("[data-category-chips]");
  const listWrap = root.querySelector("[data-command-list]");
  const countNode = root.querySelector("[data-count]");
  const pagerNode = root.querySelector("[data-page]");
  const prevBtn = root.querySelector("[data-prev]");
  const nextBtn = root.querySelector("[data-next]");

  if (countNode) countNode.setAttribute("aria-live", "polite");

  const state = {
    all: [],
    categories: [],
    category: "all",
    query: "",
    premiumOnly: false,
    page: 1,
    pageSize: 10,
  };

  function tierClass(value) {
    return String(value || "free").toLowerCase() === "premium"
      ? "premium"
      : "free";
  }

  function badgeLabel(value) {
    return tierClass(value) === "premium" ? "Premium" : "Free";
  }

  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (ch) {
      return (
        {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[ch] || ch
      );
    });
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  // -----------------------------
  // URL <-> state sync, so a search/filter combination can be
  // shared or bookmarked (?q=play&cat=music&premium=1&page=2).
  // -----------------------------

  function readStateFromUrl() {
    const params = new URLSearchParams(location.search);
    state.query = params.get("q") || "";
    state.category = params.get("cat") || "all";
    state.premiumOnly = params.get("premium") === "1";
    const page = Number(params.get("page"));
    state.page = Number.isFinite(page) && page > 0 ? page : 1;
  }

  function writeStateToUrl() {
    const params = new URLSearchParams();
    if (state.query) params.set("q", state.query);
    if (state.category !== "all") params.set("cat", state.category);
    if (state.premiumOnly) params.set("premium", "1");
    if (state.page > 1) params.set("page", String(state.page));

    const qs = params.toString();
    const next = location.pathname + (qs ? "?" + qs : "");
    history.replaceState(null, "", next);
  }

  function applyFilters() {
    const q = normalize(state.query);

    return state.all.filter(function (cmd) {
      const byCategory =
        state.category === "all" || cmd.category === state.category;
      const byPremium = !state.premiumOnly || tierClass(cmd.tier) === "premium";
      const haystack = [
        cmd.name,
        cmd.usage,
        cmd.description,
        (cmd.aliases || []).join(" "),
      ]
        .map(normalize)
        .join(" | ");
      const byQuery = !q || haystack.includes(q);
      return byCategory && byPremium && byQuery;
    });
  }

  function commandHTML(cmd) {
    const aliases =
      cmd.aliases && cmd.aliases.length
        ? cmd.aliases
            .map(function (a) {
              return "<span>" + escapeHtml(a) + "</span>";
            })
            .join("")
        : "<span>no aliases</span>";

    return [
      '<article class="command-card reveal is-visible">',
      '  <div class="command-head">',
      '    <h3 class="command-name">' + escapeHtml(cmd.name) + "</h3>",
      '    <span class="command-tier-wrap">',
      '      <span class="command-tier ' +
        tierClass(cmd.tier) +
        '">' +
        badgeLabel(cmd.tier) +
        "</span>",
      "    </span>",
      "  </div>",
      '  <p class="command-desc">' + escapeHtml(cmd.description) + "</p>",
      '  <div class="command-usage-row">',
      '    <code class="command-usage">' + escapeHtml(cmd.usage) + "</code>",
      '    <button type="button" class="command-copy" data-copy-usage="' +
        escapeAttr(cmd.usage) +
        '" aria-label="Copy usage for ' +
        escapeAttr(cmd.name) +
        '">',
      '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
      "    </button>",
      "  </div>",
      '  <div class="command-tags">' + aliases + "</div>",
      "</article>",
    ].join("\n");
  }

  function skeletonHTML() {
    let out = "";
    for (let i = 0; i < 4; i++) {
      out +=
        '<div class="command-skeleton" aria-hidden="true">' +
        '<div class="skeleton-line w-40"></div>' +
        '<div class="skeleton-line w-90"></div>' +
        '<div class="skeleton-line w-60"></div>' +
        "</div>";
    }
    return out;
  }

  function emptyStateHTML() {
    return [
      '<div class="command-empty">',
      '  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path><path d="M8 11h6"></path></svg>',
      '  <p class="command-desc">No commands match those filters.</p>',
      '  <button type="button" class="btn btn-secondary" data-empty-reset style="margin-top:.7rem;">Reset filters</button>',
      "</div>",
    ].join("\n");
  }

  function renderChips() {
    if (!chipWrap) return;
    chipWrap.innerHTML = "";

    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.textContent = "All";
    allButton.className = state.category === "all" ? "active" : "";
    allButton.setAttribute("aria-pressed", String(state.category === "all"));
    allButton.addEventListener("click", function () {
      state.category = "all";
      state.page = 1;
      categorySelect.value = "all";
      render();
    });
    chipWrap.appendChild(allButton);

    state.categories.forEach(function (cat) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = cat.label;
      const isActive = state.category === cat.id;
      if (isActive) btn.classList.add("active");
      btn.setAttribute("aria-pressed", String(isActive));
      btn.addEventListener("click", function () {
        state.category = cat.id;
        state.page = 1;
        categorySelect.value = cat.id;
        render();
      });
      chipWrap.appendChild(btn);
    });
  }

  function render() {
    const filtered = applyFilters();
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * state.pageSize;
    const pageItems = filtered.slice(start, start + state.pageSize);

    listWrap.innerHTML = pageItems.length
      ? pageItems.map(commandHTML).join("\n")
      : emptyStateHTML();

    countNode.textContent = filtered.length + " command(s) matched";
    pagerNode.textContent = "Page " + state.page + " / " + totalPages;
    prevBtn.disabled = state.page <= 1;
    nextBtn.disabled = state.page >= totalPages;

    renderChips();
    writeStateToUrl();
  }

  function fillCategorySelect() {
    categorySelect.innerHTML = "";
    const optAll = document.createElement("option");
    optAll.value = "all";
    optAll.textContent = "All categories";
    categorySelect.appendChild(optAll);

    state.categories.forEach(function (cat) {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.label;
      categorySelect.appendChild(option);
    });

    categorySelect.value = state.category;
  }

  function debounce(fn, wait) {
    let timer = null;
    return function () {
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(null, args);
      }, wait);
    };
  }

  function resetFilters() {
    state.category = "all";
    state.query = "";
    state.premiumOnly = false;
    state.page = 1;

    searchInput.value = "";
    categorySelect.value = "all";
    premiumToggle.classList.remove("active");
    premiumToggle.setAttribute("aria-pressed", "false");
    premiumToggle.textContent = "Premium Only";

    render();
  }

  function boot(data) {
    state.all = Array.isArray(data.commands) ? data.commands : [];
    state.categories = Array.isArray(data.categories) ? data.categories : [];

    readStateFromUrl();

    // A category or page from the URL might not exist in the loaded
    // data (stale link) — fall back to sane defaults instead of
    // silently rendering an empty page.
    const validCategory =
      state.category === "all" ||
      state.categories.some(function (c) {
        return c.id === state.category;
      });
    if (!validCategory) state.category = "all";

    fillCategorySelect();
    searchInput.value = state.query;
    premiumToggle.classList.toggle("active", state.premiumOnly);
    premiumToggle.setAttribute("aria-pressed", String(state.premiumOnly));
    premiumToggle.textContent = state.premiumOnly
      ? "Premium: ON"
      : "Premium Only";

    render();

    const debouncedSearch = debounce(function (value) {
      state.query = value;
      state.page = 1;
      render();
    }, 180);

    searchInput.addEventListener("input", function (e) {
      debouncedSearch(e.target.value || "");
    });

    categorySelect.addEventListener("change", function (e) {
      state.category = e.target.value;
      state.page = 1;
      render();
    });

    premiumToggle.addEventListener("click", function () {
      state.premiumOnly = !state.premiumOnly;
      premiumToggle.classList.toggle("active", state.premiumOnly);
      premiumToggle.setAttribute("aria-pressed", String(state.premiumOnly));
      premiumToggle.textContent = state.premiumOnly
        ? "Premium: ON"
        : "Premium Only";
      state.page = 1;
      render();
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", resetFilters);
    }

    prevBtn.addEventListener("click", function () {
      if (state.page > 1) {
        state.page -= 1;
        render();
      }
    });

    nextBtn.addEventListener("click", function () {
      state.page += 1;
      render();
    });

    // Copy-to-clipboard + "reset filters" from the empty state,
    // handled via delegation since cards re-render on every filter.
    listWrap.addEventListener("click", function (e) {
      const copyBtn = e.target.closest("[data-copy-usage]");
      if (copyBtn) {
        const text = copyBtn.getAttribute("data-copy-usage") || "";
        if (window.Eleone && window.Eleone.copyText) {
          window.Eleone.copyText(text)
            .then(function () {
              if (window.Eleone.toast) window.Eleone.toast("Copied: " + text);
            })
            .catch(function () {
              if (window.Eleone.toast)
                window.Eleone.toast(
                  "Couldn't copy — select and copy manually.",
                );
            });
        }
        return;
      }

      if (e.target.closest("[data-empty-reset]")) {
        resetFilters();
      }
    });

    // "/" focuses the search box, unless the user is already typing
    // somewhere else on the page.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "/") return;
      const active = document.activeElement;
      const isTyping =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable);
      if (isTyping) return;

      e.preventDefault();
      searchInput.focus();
    });
  }

  listWrap.innerHTML = skeletonHTML();
  countNode.textContent = "Loading commands…";

  fetch("assets/data/commands.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Request failed: " + res.status);
      return res.json();
    })
    .then(boot)
    .catch(function () {
      listWrap.innerHTML =
        '<div class="command-card"><p class="command-desc">Unable to load the command catalog. Check your connection and reload the page.</p></div>';
      countNode.textContent = "0 command(s) matched";
      pagerNode.textContent = "Page 1 / 1";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
    });
})();

/*
 * Project: Eleone Bot
 * Author: faisaljs (Faisal)
 * Organization: Eleone Hub
 * GitHub: https://github.com/faisaljs
 * License: Custom
 * © 2026 Eleone Hub. All rights reserved.
 */

