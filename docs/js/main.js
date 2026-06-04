// @ts-nocheck
(function () {
    "use strict";

    var reduceMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var LOADER_MS = reduceMotion ? 0 : 2400;
    var LOADER_CHAR_DELAY_MS = 90;
    var LOADER_TEXT = "WEDDING INVITATION";
    var HERO_INTRO_MS = reduceMotion ? 0 : 6200;
    var LOADER_FADE_MS = reduceMotion ? 0 : 1200;
    var HERO_LEAD_MS = reduceMotion ? 0 : 500;

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    function initLoaderTypewriter() {
        var el = document.getElementById("dearLoaderText");
        if (!el) {
            return;
        }
        el.textContent = "";
        el.setAttribute("aria-label", LOADER_TEXT);
        if (reduceMotion) {
            el.textContent = LOADER_TEXT;
            return;
        }
        var chars = LOADER_TEXT.split("");
        var charLen = chars.length;
        for (var i = 0; i < (charLen); i++) {
            var ch = chars[i];
            var span = document.createElement("span");
            span.className = "dear-loader__char";
            if (ch === " ") {
                span.className += " dear-loader__char--space";
                span.textContent = "\u00a0";
            } else {
                span.textContent = ch;
            }
            span.style.setProperty("--char-delay", i * LOADER_CHAR_DELAY_MS + "ms");
            el.appendChild(span);
        }
    }

    function markPageReady() {
        document.body.classList.add("is-loaded");
        document.body.dispatchEvent(new CustomEvent("dear:ready"));
    }

    function initLoader() {
        var loader = document.getElementById("dear-loader");
        initLoaderTypewriter();
        if (!loader) {
            markPageReady();
            return;
        }
        window.setTimeout(markPageReady, Math.max(0, LOADER_MS - HERO_LEAD_MS));
        window.setTimeout(function () {
            loader.classList.add("is-hidden");
            window.setTimeout(function () {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, LOADER_FADE_MS);
        }, LOADER_MS);
    }

    function revealHeroSlide(hero, slide) {
        if (!hero || !slide) {
            return;
        }
        slide.classList.remove("is-active");
        if (reduceMotion) {
            slide.classList.add("is-active");
            return;
        }
        hero.classList.add("is-intro");
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
                slide.classList.add("is-active");
            });
        });
    }

    function initHeroSlider() {
        var root = document.getElementById("dearHeroSlides");
        var hero = document.querySelector(".dear-hero");
        if (!root || !hero) {
            return;
        }
        var slides = root.querySelectorAll(".dear-hero__slide:not(.dear-hero__slide--fallback)");
        var fallback = root.querySelector(".dear-hero__slide--fallback");
        slides.forEach(function (slide) {
            slide.classList.remove("is-active");
        });
        if (fallback) {
            fallback.classList.remove("is-active");
        }
        if (!slides.length) {
            if (fallback) {
                revealHeroSlide(hero, fallback);
            }
            return;
        }
        slides.forEach(function (slide) {
            var img = slide.querySelector("img");
            if (!img) {
                slide.classList.add("is-broken");
                return;
            }
            function markBroken() {
                slide.classList.add("is-broken");
            }
            img.addEventListener("error", markBroken);
            if (img.complete && img.naturalHeight === 0) {
                markBroken();
            }
        });
        var visible = Array.prototype.filter.call(slides, function (s) {
            return !s.classList.contains("is-broken");
        });
        if (!visible.length) {
            if (fallback) {
                revealHeroSlide(hero, fallback);
            }
            return;
        }
        var interval = parseInt(root.getAttribute("data-interval") || "6000", 10);
        var index = 0;
        revealHeroSlide(hero, visible[0]);
        if (visible.length === 1 || reduceMotion) {
            window.setTimeout(function () {
                hero.classList.remove("is-intro");
            }, HERO_INTRO_MS);
            return;
        }
        window.setTimeout(function () {
            hero.classList.remove("is-intro");
            window.setInterval(function () {
                visible[index].classList.remove("is-active");
                index = (index + 1) % visible.length;
                visible[index].classList.add("is-active");
            }, Math.max(4000, interval));
        }, HERO_INTRO_MS);
    }

    function initReveal() {
        var nodes = document.querySelectorAll(".reveal");
        if (!nodes.length) {
            return;
        }
        if (reduceMotion || typeof IntersectionObserver === "undefined") {
            nodes.forEach(function (el) {
                el.classList.add("is-visible");
            });
            return;
        }
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        nodes.forEach(function (el) {
            observer.observe(el);
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function (e) {
                var id = link.getAttribute("href");
                if (!id || id === "#") {
                    return;
                }
                var target = document.querySelector(id);
                if (!target) {
                    return;
                }
                e.preventDefault();
                var nav = document.getElementById("dearNav");
                var offset = nav ? nav.offsetHeight : 0;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
                window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
                closeNav();
            });
        });
    }

    function initNav() {
        var toggle = document.getElementById("dearNavToggle");
        var menu = document.getElementById("dearNavMenu");
        var nav = document.getElementById("dearNav");
        if (!toggle || !menu || !nav) {
            return;
        }
        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
        window.addEventListener("scroll", function () {
            nav.classList.toggle("is-scrolled", (window.scrollY > 48));
        }, { passive: true });
    }

    function closeNav() {
        var nav = document.getElementById("dearNav");
        var toggle = document.getElementById("dearNavToggle");
        if (nav) {
            nav.classList.remove("is-open");
        }
        if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
        }
    }

    function initImages() {
        document.querySelectorAll(".dear-img").forEach(function (img) {
            img.addEventListener("error", function () {
                img.classList.add("dear-img--missing");
            });
        });
    }

    function initParallax() {
        if (reduceMotion) {
            return;
        }
        var photos = document.querySelectorAll("[data-parallax] img:not(.dear-img--missing)");
        if (!photos.length) {
            return;
        }
        function onScroll() {
            photos.forEach(function (img) {
                var wrap = img.closest("[data-parallax]");
                if (!wrap) {
                    return;
                }
                var rect = wrap.getBoundingClientRect();
                var vh = window.innerHeight;
                if ((rect.bottom < 0) || (rect.top > vh)) {
                    return;
                }
                var p = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
                img.style.transform = "translate3d(0, " + (p * 18).toFixed(1) + "px, 0) scale(1.06)";
            });
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    function initCountdown() {
        var section = document.getElementById("countdown");
        if (!section) {
            return;
        }
        var targetIso = section.getAttribute("data-countdown-target");
        var grid = document.getElementById("dearCountdown");
        if (!targetIso || !grid) {
            return;
        }
        var target = Date.parse(targetIso);
        if (Number.isNaN(target)) {
            return;
        }
        var units = {
            days: grid.querySelector('[data-unit="days"]'),
            hours: grid.querySelector('[data-unit="hours"]'),
            minutes: grid.querySelector('[data-unit="minutes"]'),
            seconds: grid.querySelector('[data-unit="seconds"]')
        };

        function pad(n) {
            return (n < 10) ? ("0" + n) : String(n);
        }

        function tick() {
            var diff = Math.max(0, target - Date.now());
            var sec = Math.floor(diff / 1000);
            var days = Math.floor(sec / 86400);
            sec -= days * 86400;
            var hours = Math.floor(sec / 3600);
            sec -= hours * 3600;
            var minutes = Math.floor(sec / 60);
            var seconds = sec - minutes * 60;
            if (units.days) {
                units.days.textContent = String(days);
            }
            if (units.hours) {
                units.hours.textContent = pad(hours);
            }
            if (units.minutes) {
                units.minutes.textContent = pad(minutes);
            }
            if (units.seconds) {
                units.seconds.textContent = pad(seconds);
            }
        }
        tick();
        window.setInterval(tick, 1000);
    }

    function bootstrap() {
        initLoader();
        initImages();
        initReveal();
        initNav();
        initSmoothScroll();
        initCountdown();
        document.body.addEventListener("dear:ready", initHeroSlider, { once: true });
        window.setTimeout(initParallax, LOADER_MS + LOADER_FADE_MS + 100);
    }

    ready(bootstrap);
}());
