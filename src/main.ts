import "./style.css";

const header = document.querySelector<HTMLElement>(".masthead");
if (header) {
  const onScroll = () =>
    header.classList.toggle("scrolled", window.scrollY > 16);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
