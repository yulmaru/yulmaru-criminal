(()=>{'use strict';
const base=new URL('.',document.currentScript.src);
const markup="<aside class=\"quick-menu\" aria-label=\"빠른 상담\">\n    <button class=\"quick-reserve\" type=\"button\" aria-expanded=\"false\" aria-controls=\"quick-booking-menu\"><i class=\"fa-solid fa-calendar-check\" aria-hidden=\"true\"></i><span>예약</span></button>\n    <button class=\"quick-chat\" type=\"button\" aria-expanded=\"false\" aria-controls=\"quick-chat-menu\"><i class=\"fa-solid fa-comments\" aria-hidden=\"true\"></i><span>채팅상담</span></button>\n    <a href=\"https://www.kics.go.kr/?menuCd=Main\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-solid fa-magnifying-glass\" aria-hidden=\"true\"></i><span>사건 조회</span></a>\n    <button type=\"button\" data-scroll-top ><b>↑</b><span>TOP</span></button>\n    <div class=\"quick-booking-menu\" id=\"quick-booking-menu\" aria-label=\"예약 지점 선택\" hidden>\n      <a href=\"https://booking.naver.com/booking/13/bizes/555238\" target=\"_blank\" rel=\"noopener noreferrer\">명지</a>\n      <a href=\"https://booking.naver.com/booking/6/bizes/990663\" target=\"_blank\" rel=\"noopener noreferrer\">센텀</a>\n      <a href=\"https://booking.naver.com/booking/6/bizes/1466063\" target=\"_blank\" rel=\"noopener noreferrer\">창원</a>\n    </div>\n    <div class=\"quick-chat-menu\" id=\"quick-chat-menu\" aria-label=\"채팅 상담 채널 선택\" hidden><a href=\"https://talk.naver.com/ct/wm8stnh\" target=\"_blank\" rel=\"noopener noreferrer\">네이버</a><a href=\"https://pf.kakao.com/_aCMxkxj/chat\" target=\"_blank\" rel=\"noopener noreferrer\">카톡</a></div>\n  </aside>\n\n  <nav class=\"mobile-bar\" aria-label=\"모바일 빠른 메뉴\">\n    <a href=\"/오시는길/\"><i class=\"fa-solid fa-location-dot\" aria-hidden=\"true\"></i><span>오시는 길</span></a>\n    <a href=\"https://www.kics.go.kr/?menuCd=Main\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"fa-solid fa-magnifying-glass\" aria-hidden=\"true\"></i><span>사건 조회</span></a>\n    <button class=\"mobile-reserve\" type=\"button\" aria-expanded=\"false\" aria-controls=\"mobile-booking-menu\"><i class=\"fa-solid fa-calendar-check\" aria-hidden=\"true\"></i><span>예약</span></button>\n    <a href=\"tel:1800-6419\"><i class=\"fa-solid fa-phone\" aria-hidden=\"true\"></i><span>전화</span></a>\n    <button class=\"mobile-chat\" type=\"button\" aria-expanded=\"false\" aria-controls=\"mobile-chat-menu\"><i class=\"fa-solid fa-comments\" aria-hidden=\"true\"></i><span>채팅상담</span></button>\n    <div class=\"mobile-booking-menu\" id=\"mobile-booking-menu\" aria-label=\"예약 지점 선택\" hidden>\n      <a href=\"https://booking.naver.com/booking/13/bizes/555238\" target=\"_blank\" rel=\"noopener noreferrer\">명지</a>\n      <a href=\"https://booking.naver.com/booking/6/bizes/990663\" target=\"_blank\" rel=\"noopener noreferrer\">센텀</a>\n      <a href=\"https://booking.naver.com/booking/6/bizes/1466063\" target=\"_blank\" rel=\"noopener noreferrer\">창원</a>\n    </div>\n    <div class=\"mobile-chat-menu\" id=\"mobile-chat-menu\" aria-label=\"채팅 상담 채널 선택\" hidden><a href=\"https://talk.naver.com/ct/wm8stnh\" target=\"_blank\" rel=\"noopener noreferrer\">네이버</a><a href=\"https://pf.kakao.com/_aCMxkxj/chat\" target=\"_blank\" rel=\"noopener noreferrer\">카톡</a></div>\n  </nav>";
document.body.insertAdjacentHTML('beforeend',markup.replace(/href="\/([^"]*)"/g,(_,p)=>`href="${new URL(p,base).href}"`));
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

document.querySelectorAll('[data-scroll-top]').forEach(button=>button.addEventListener('click',event=>{
  event.preventDefault(); closeBookingMenus();
  window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
})();
