import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (!href) return;

      const target = document.querySelector(href);
      target?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Intersection Observer for fade-in elements
  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((el) => {
    fadeInObserver.observe(el);
  });

  // Metrics animation observer
  const metricsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          metricsObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px",
    }
  );

  setTimeout(() => {
    const metrics = document.querySelectorAll(".metric");
    metrics.forEach((metric) => {
      metricsObserver.observe(metric);
    });
  }, 100);
});
