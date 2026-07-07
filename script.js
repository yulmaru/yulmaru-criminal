const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const contactForm = document.querySelector("[data-contact-form]");
const typedText = document.querySelector("[data-typed-text]");

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

if (typedText) {
  const phrases = [
    "부산 형사사건\n첫 조사 전부터\n진술 방향과\n증거 확보까지\n변호인이 함께\n신속히 대응합니다",
    "부산 형사사건\n구속영장 청구 전\n체포와 압수수색\n위험을 점검하고\n방어 자료를\n빠르게 준비합니다",
    "부산 형사사건\n경찰조사 출석 전\n예상 질문과 답변\n불리한 진술까지\n먼저 정리해\n동행 대응합니다",
    "부산 형사사건\n불송치와 기소유예\n가능성을 높이도록\n사실관계와 증거\n양형 자료까지\n전략적으로 준비합니다",
  ];
  const phraseDuration = 9000;
  const typingSpeed = 58;
  let phraseIndex = 0;
  let letterIndex = 0;
  let typingTimer;
  let phraseTimer;

  const typeHeroText = () => {
    const phrase = phrases[phraseIndex];
    typedText.textContent = phrase.slice(0, letterIndex);

    if (letterIndex < phrase.length) {
      letterIndex += 1;
      typingTimer = window.setTimeout(typeHeroText, typingSpeed);
    }
  };

  const showNextPhrase = () => {
    window.clearTimeout(typingTimer);
    phraseIndex = (phraseIndex + 1) % phrases.length;
    letterIndex = 0;
    typeHeroText();
  };

  typeHeroText();
  phraseTimer = window.setInterval(showNextPhrase, phraseDuration);
}
