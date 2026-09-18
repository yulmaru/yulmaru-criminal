const bookingButtons = document.querySelectorAll(".mobile-reserve, .quick-reserve, .mobile-chat, .quick-chat");
const bookingMenus = document.querySelectorAll(".mobile-booking-menu, .quick-booking-menu, .mobile-chat-menu, .quick-chat-menu");

document.querySelectorAll(".mobile-booking-menu, .quick-booking-menu").forEach(menu => {
  menu.querySelectorAll("a").forEach(link => {
    if (link.textContent.trim() === "서면") link.remove();
  });
  const count = menu.querySelectorAll("a").length;
  if (count) menu.style.gridTemplateColumns = `repeat(${count}, minmax(0, 1fr))`;
});

function menuFor(button) {
  return document.getElementById(button.getAttribute("aria-controls"));
}

function closeBookingMenus({ restoreFocus = false } = {}) {
  bookingButtons.forEach(button => {
    const menu = menuFor(button);
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (restoreFocus) button.focus();
  });
}

bookingButtons.forEach(button => {
  button.addEventListener("click", event => {
    event.stopPropagation();
    const menu = menuFor(button);
    if (!menu) return;
    const willOpen = menu.hidden;
    closeBookingMenus();
    menu.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

bookingMenus.forEach(menu => {
  menu.addEventListener("click", event => {
    event.stopPropagation();
    if (event.target.closest("a")) closeBookingMenus();
  });
});

document.addEventListener("click", () => closeBookingMenus());
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeBookingMenus({ restoreFocus: true });
});
