const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const contactForm = document.querySelector("[data-contact-form]");

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
  document.body.classList.toggle("has-floating-cta", window.scrollY > 520);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuButton.addEventListener("click", () => {
  mobilePanel.classList.toggle("is-open");
});

mobilePanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobilePanel.classList.remove("is-open");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name") || "고객";
  alert(`${name}님, 상담 신청이 접수되었습니다. 실제 배포 시 폼 전송 API 또는 카카오/문자 알림과 연결하세요.`);
  contactForm.reset();
});
