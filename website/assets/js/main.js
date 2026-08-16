(function () {
    var THEME_KEY = "eleone-theme";
    var root = document.documentElement;
    var prefersReducedMotion =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function getStoredTheme() {
        try {
            var value = localStorage.getItem(THEME_KEY);

            if (value === "dark" || value === "light") {
                return value;
            }
        } catch (err) {
            return null;
        }

        return null;
    }

    function getSystemTheme() {
        try {
            if (
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                return "dark";
            }
        } catch (err) {
            return "light";
        }

        return "light";
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (err) {
            // Ignore storage errors.
        }
    }

    function paintThemeButton(theme) {
        var next = theme === "dark" ? "Light Mode" : "Dark Mode";

        document
            .querySelectorAll("[data-theme-label]")
            .forEach(function (node) {
                node.textContent = next;
            });

        document
            .querySelectorAll("[data-theme-toggle]")
            .forEach(function (btn) {
                btn.setAttribute("aria-label", "Switch to " + next);
            });
    }

    function applyTheme(theme, persist) {
        var safe = theme === "dark" ? "dark" : "light";

        root.setAttribute("data-theme", safe);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute("content", safe === "dark" ? "#05070f" : "#eef1fb");
        }

        paintThemeButton(safe);

        if (persist) {
            setStoredTheme(safe);
        }
    }

    // -----------------------------
    // Theme
    // -----------------------------

    var initialTheme = getStoredTheme() || getSystemTheme();

    applyTheme(initialTheme, false);

    document
        .querySelectorAll("[data-theme-toggle]")
        .forEach(function (btn) {
            btn.addEventListener("click", function () {
                var current =
                    root.getAttribute("data-theme") === "dark"
                        ? "dark"
                        : "light";

                var next = current === "dark" ? "light" : "dark";

                applyTheme(next, true);
            });
        });

    // -----------------------------
    // Mobile Navigation
    // -----------------------------

    var navToggle = document.querySelector("[data-nav-toggle]");
    var navLinks = document.querySelector("[data-nav-links]");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");

            navToggle.setAttribute(
                "aria-expanded",
                String(navLinks.classList.contains("open"))
            );
        });

        navLinks.querySelectorAll("a").forEach(function (anchor) {
            anchor.addEventListener("click", function () {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && navLinks.classList.contains("open")) {
                navLinks.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.focus();
            }
        });
    }

    // -----------------------------
    // Active Navigation
    // Normalizes both clean URLs (/premium, served via vercel.json
    // rewrites) and direct static-file URLs (/premium.html, the case
    // on GitHub Pages/Netlify without a rewrite rule) to the same
    // key, so the nav highlights correctly under either hosting mode.
    // -----------------------------

    function normalizePath(raw) {
        var clean = (raw || "/").split("?")[0].split("#")[0];
        clean = clean.replace(/\/index\.html$/i, "/");
        clean = clean.replace(/\.html$/i, "");
        clean = clean.replace(/\/+$/, "");
        return clean === "" ? "/" : clean;
    }

    var currentPath = normalizePath(location.pathname);

    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
        var href = normalizePath(link.getAttribute("href") || "");

        if (href === currentPath) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // -----------------------------
    // Reveal Animations
    // -----------------------------

    var reveals = document.querySelectorAll(".reveal");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        reveals.forEach(function (node) {
            node.classList.add("is-visible");
        });
    } else {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.18
            }
        );

        reveals.forEach(function (node) {
            observer.observe(node);
        });
    }

    // -----------------------------
    // Counters
    // -----------------------------

    var counters = document.querySelectorAll("[data-counter]");

    counters.forEach(function (counter) {
        var target = Number(counter.getAttribute("data-counter"));

        if (!Number.isFinite(target) || target <= 0) {
            return;
        }

        if (prefersReducedMotion) {
            counter.textContent = target.toLocaleString("en-US");
            return;
        }

        var current = 0;

        var step = Math.max(
            1,
            Math.round(target / 65)
        );

        var tick = function () {
            current += step;

            if (current > target) {
                current = target;
            }

            counter.textContent = current.toLocaleString("en-US");

            if (current < target) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    });

    // -----------------------------
    // Current Year
    // -----------------------------

    var yearNode = document.querySelector("[data-year]");

    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }

    // -----------------------------
    // Text Rotator
    // -----------------------------

    var rotator = document.querySelector("[data-rotate]");

    if (rotator && !prefersReducedMotion) {
        var texts = (rotator.getAttribute("data-rotate") || "")
            .split("|")
            .map(function (x) {
                return x.trim();
            })
            .filter(Boolean);

        if (texts.length > 1) {
            var i = 0;

            setInterval(function () {
                i = (i + 1) % texts.length;

                rotator.textContent = texts[i];
            }, 2200);
        }
    }

    // -----------------------------
    // Scroll progress bar
    // -----------------------------

    var progressFill = document.querySelector("[data-scroll-progress]");

    if (progressFill) {
        var updateProgress = function () {
            var doc = document.documentElement;
            var scrollTop = doc.scrollTop || document.body.scrollTop;
            var height = doc.scrollHeight - doc.clientHeight;
            var pct = height > 0 ? (scrollTop / height) * 100 : 0;

            progressFill.style.width = pct + "%";
        };

        document.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);
        updateProgress();
    }

    // -----------------------------
    // Back to top
    // -----------------------------

    var backToTop = document.querySelector("[data-back-to-top]");

    if (backToTop) {
        var toggleBackToTop = function () {
            var doc = document.documentElement;
            var scrollTop = doc.scrollTop || document.body.scrollTop;

            backToTop.classList.toggle("is-visible", scrollTop > 480);
        };

        document.addEventListener("scroll", toggleBackToTop, { passive: true });
        toggleBackToTop();

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    }

    // -----------------------------
    // Shared toast + clipboard helper
    // Exposed on window so commands.js (and any future page script)
    // can surface consistent "Copied" feedback without duplicating
    // the toast markup/logic per page.
    // -----------------------------

    var toastStack = document.querySelector("[data-toast-stack]");

    function showToast(message) {
        if (!toastStack) return;

        var el = document.createElement("div");
        el.className = "toast";
        el.setAttribute("role", "status");
        el.textContent = message;
        toastStack.appendChild(el);

        requestAnimationFrame(function () {
            el.classList.add("is-visible");
        });

        setTimeout(function () {
            el.classList.remove("is-visible");
            setTimeout(function () {
                el.remove();
            }, 250);
        }, 1800);
    }

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }

        return new Promise(function (resolve, reject) {
            try {
                var temp = document.createElement("textarea");
                temp.value = text;
                temp.style.position = "fixed";
                temp.style.opacity = "0";
                document.body.appendChild(temp);
                temp.select();
                document.execCommand("copy");
                document.body.removeChild(temp);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    window.Eleone = window.Eleone || {};
    window.Eleone.toast = showToast;
    window.Eleone.copyText = copyText;
    window.Eleone.prefersReducedMotion = prefersReducedMotion;
})();
