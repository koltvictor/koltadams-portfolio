import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  // ── Nav scroll behavior ─────────────────────────────────────────
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ── Smooth scroll for internal links ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (!href) return;
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ── Fade-up observer ────────────────────────────────────────────
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  // Trigger hero elements immediately (already in view)
  document.querySelectorAll(".section-hero .fade-up").forEach((el) => {
    setTimeout(() => el.classList.add("visible"), 80);
  });

  // Observe everything else
  document
    .querySelectorAll(".fade-up:not(.section-hero .fade-up)")
    .forEach((el) => {
      fadeObserver.observe(el);
    });
});
