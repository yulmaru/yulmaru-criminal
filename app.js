(()=>{'use strict';
const $=s=>document.querySelector(s),app=$('#app'),all=categories;
const siteBase=new URL('.',document.currentScript.src),localFile=location.protocol==='file:';
function localURL(path){const clean=path.replace(/^\/+/, '');return new URL(localFile&&(!clean||clean.endsWith('/'))?clean+'index.html':clean,siteBase).href}
function setView(html){carouselCleanup();document.body.style.overflow='';app.innerHTML=html.replace(/(src|href)="\/([^\"]*)"/g,(_,attr,path)=>`${attr}="${localURL(path)}"`)}
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ext=(u,t,cl='')=>`<a class="${cl}" href="${esc(u)}" target="_blank" rel="noopener noreferrer">${t}<span class="sr-only"> (새 창)</span></a>`;
const heading=(n,t,p='')=>`<div class="section-heading"><div><p class="eyebrow"><span class="section-index">${n.split(' / ')[0]}</span>${n.split(' / ')[1]||n}</p><h2>${t}</h2></div>${p?`<p>${p}</p>`:''}</div>`;
const icon=n=>`<i class="fa-solid fa-${n}" aria-hidden="true"></i>`;
const categoryIcon=id=>({traffic:'car-side',fraud:'wallet',sexual:'shield-halved',violence:'hand',property:'box-archive',general:'scale-balanced'}[id]||'file-lines');
const photo=id=>localURL('assets/editorial/'+id+'-guide.webp');
function resourceIcon(t){return /KICS|사건/.test(t)?'folder-open':/법령|법률/.test(t)?'scale-balanced':/피해|지원|1366/.test(t)?'shield-heart':/금융|더치트/.test(t)?'shield-halved':/등기|판매사업자/.test(t)?'building-columns':/유실물/.test(t)?'magnifying-glass':/신고/.test(t)?'bullhorn':'arrow-up-right-from-square'}
function resourceAction(t){return /신고/.test(t)?'신고 안내':/지원|1366|마약/.test(t)?'지원 안내':/법령|법률/.test(t)?'법률 확인':'사이트 열기'}
const brand='<span class="brand"><img class="brand-logo" src="/assets/yulmaru-logo.png" alt=""><span class="brand-copy"><strong>부산형사전문변호사</strong><small>법무법인 율마루</small></span></span>';
const cctvLabel=(i,name)=>`<span class="cctv-channel"><span class="cctv-dot" aria-hidden="true"></span>CCTV ${String(i+1).padStart(2,'0')}</span><span class="cctv-reconstructed">${name}</span>`;
const featuredVideos={"traffic":{"id":"uBPTNJJOeyU","title":"음주운전 2회 처벌 | 벌금·집행유예·실형, 어디까지 나올 수 있을까?","thumbnail":"https://i.ytimg.com/vi/uBPTNJJOeyU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAAckwjb-ZaRRf4tvyCcedbU47aBQ"},"fraud":{"id":"m9qkd7RkUrc","title":"사기 고소했는데 불송치? 이유 있습니다 사기죄 성립 요건과 고소 전 꼭 알아야 할 것들","thumbnail":"https://i.ytimg.com/vi/m9qkd7RkUrc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC0nJawFO1WkWfTds12vKYXtF5Lwg"},"sexual":{"id":"7VJ6loF3RWY","title":"성범죄 피해자도 변호사가 필요할까? 선임 기준 3가지","thumbnail":"https://i.ytimg.com/vi/7VJ6loF3RWY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB0UG7XdZwe3dCiSERVdSmeyeJYdw"},"property":{"id":"Vk5LR8W_eIg","title":"커피 세 잔에 550만 원? 빽다방 알바생 횡령 고소 사건의 충격적인 진실 | 횡령죄 vs 공갈죄 법적 분석","thumbnail":"https://i.ytimg.com/vi/Vk5LR8W_eIg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAhfrCcprAaiIOxarzVZDife0TyPA"},"general":{"id":"EwxjUq4FtXo","title":"경찰조사 받을 때 반드시 알아야 할 주의사항 8가지","thumbnail":"https://i.ytimg.com/vi/EwxjUq4FtXo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDmEqltTs5DMySfr4ZIlb2UvHKTSA"},"violence":{"id":"EwxjUq4FtXo","title":"경찰조사 받을 때 반드시 알아야 할 주의사항 8가지","thumbnail":"https://i.ytimg.com/vi/EwxjUq4FtXo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDmEqltTs5DMySfr4ZIlb2UvHKTSA"}};
const branches=[['부산 명지점','https://map.naver.com/p/entry/place/1189809417?placePath=/review/visitor'],['부산 서면점','https://map.naver.com/p/entry/place/1381643972?placePath=/review/visitor'],['경남 창원점','https://map.naver.com/p/entry/place/2023530761?placePath=/review/visitor']];
let category,type,region='전체',caseType='전체',firmField,firmLimit=3,branch='전체',reviewLimit=6;
function home(){document.title='형사 사건 가이드 | 법무법인 율마루';setView(`<main class="selection"><div class="selection-intro"><h1><mark>어떤 사건</mark>으로<br>고민하고 계신가요?</h1><p>해당하는 분야를 선택하세요.</p></div><nav class="six-grid" aria-label="사건 분야 선택">${all.map((c,i)=>`<a class="field-card" href="/${c.name}/" data-route><img src="/assets/${c.id}.webp" alt=""><div class="card-bottom"><div><h2>${c.name}</h2><p>${c.teaser}</p></div></div></a>`).join('')}</nav><div class="selection-note"></div></main>${siteFooterHTML}`)}
function page(c){const featured=featuredVideos[c.id],videoURL='https://www.youtube.com/watch?v='+featured.id;category=c;type=new URLSearchParams(location.search).get('type');if(!c.types.includes(type))type=c.types[0];region=caseType='전체';firmField=c.id;firmLimit=3;branch='전체';reviewLimit=6;document.title=`${c.name} 대응·지역 사건 | 법무법인 율마루`;
setView(`<a class="skip-link" href="#guide-section">본문으로 바로가기</a><header class="site-header"><a href="/" data-route aria-label="율마루 분야 선택">${brand}</a><nav class="header-nav" aria-label="분야 이동">${all.map(x=>`<a href="/${x.name}/" data-route ${x.id===c.id?'class="active" aria-current="page"':''}>${x.name}</a>`).join('')}</nav></header><main><section class="hero"><img class="hero-img" src="/assets/${c.id}.webp" alt="${c.name} 분야를 표현한 CCTV 시점의 AI 상황 이미지" fetchpriority="high"><div class="cctv-label hero-cctv-label">${cctvLabel(all.indexOf(c),c.name)}</div><div><p class="eyebrow">${c.en}</p><h1>${c.hero}</h1><p>${c.intro}</p></div></section><div class="content">
<section id="guide-section" class="section">${heading('01 / RESPONSE',c.id==='traffic'?'12대 중과실, 유형별로 살펴봅니다.':'나의 사건 유형부터 확인하세요.','유형을 선택하면 확인할 쟁점과 준비할 자료를 볼 수 있습니다.')}${c.notice?`<p class="category-notice">${c.notice}</p>`:''}<div class="subtype-layout"><div class="subtype-buttons" aria-label="세부 사건 유형">${c.types.map(t=>`<button class="subtype-button" data-type="${t}">${icon(categoryIcon(c.id))}<span class="subtype-name">${t}</span><span class="subtype-chevron">${icon('chevron-right')}</span></button>`).join('')}</div><div id="guide-content"></div></div></section>
<section id="regional-section" class="section">${heading('02 / LOCAL CASES',`<mark>우리 동네</mark> ${c.name}<br>어떻게 처리됐을까?`,'분야별 공개 사건 12건. 법원 자료와 선고 보도를 바탕으로 사건의 흐름과 판단을 요약했습니다.')}<div class="case-intro-banner"><img src="/assets/${c.id}.webp" alt="${c.name} 상황 재구성 이미지" loading="lazy"><div><span class="banner-kicker">공개 자료로 살펴보는 사건</span><h3>사건의 시작부터,<br>법원의 판단까지.</h3><p>사건 내용과 처리 결과를 구분해 확인하세요.</p></div><span class="image-caption">상황 재구성</span></div><div class="case-toolbar"><div class="region-buttons" aria-label="사건 지역 필터">${['전체','부산','울산','경남'].map(r=>`<button class="filter ${r==='전체'?'active':''}" data-region="${r}" aria-pressed="${r==='전체'}">${r}</button>`).join('')}</div><label class="type-select">사건 유형 <select id="case-type"><option>전체</option>${[...new Set(regionalCases.filter(r=>r.category===c.id).map(r=>r.type))].map(t=>`<option>${t}</option>`).join('')}</select></label><span id="case-count" aria-live="polite"></span></div><div class="regional-case-viewport"><button class="regional-case-nav regional-case-prev" type="button" data-case-scroll="prev" aria-label="이전 지역 사건" aria-controls="regional-cases"></button><div id="regional-cases" class="case-grid regional-case-track" tabindex="0" role="region" aria-label="지역 사건 가로 목록"></div><button class="regional-case-nav regional-case-next" type="button" data-case-scroll="next" aria-label="다음 지역 사건" aria-controls="regional-cases"></button></div><p class="case-note">공개 사건은 율마루의 수임 실적과 별도로 소개합니다. 발생지 미공개·온라인 사건은 재판지역을 명시했습니다. 결과는 출처의 심급 기준이며 확정 여부를 따로 확인하지 않은 사건도 포함합니다. 출처 확인: 2026.09.18.</p></section>
<section id="resource-section" class="section">${heading('03 / USEFUL LINKS','필요한 조회를 한곳에서.','선택한 기관 사이트가 새 창으로 열립니다. 필요한 인증은 해당 사이트에서 진행하세요.')}<div class="resource-grid">${resources[c.id].map(([t,p,u])=>ext(u,`<span class="resource-icon">${icon(resourceIcon(t))}</span><div class="resource-copy"><h3>${t}</h3><p>${p}</p><span class="resource-action">${resourceAction(t)} ${icon('arrow-up-right-from-square')}</span></div>`,'resource')).join('')}</div></section>
<section id="firm-section" class="section">${heading('04 / YULMARU CASES','율마루가 함께한 사건.','공식 홈페이지의 형사·음주운전·성범죄·마약 성공사례를 새롭게 구성했습니다.')}<div class="firm-feature"><img src="/assets/editorial/office-01.webp" alt="제공된 율마루 사무실 내부 사진" loading="lazy"><div><span class="banner-kicker">YULMARU CASE ARCHIVE</span><h3>기록에 남은 대응,<br>함께 확인하는 결과.</h3><p>율마루 공식 홈페이지의 성공사례를<br>분야와 처리 결과별로 살펴보세요.</p><span class="archive-count"><b>35</b> 공식 성공사례</span></div></div><div class="case-toolbar" aria-label="성공사례 분야 필터">${[{id:'all',name:'전체'},...all].map(x=>`<button class="filter ${x.id===c.id?'active':''}" data-firm="${x.id}" aria-pressed="${x.id===c.id}">${x.name}</button>`).join('')}</div><div id="firm-cases" class="case-grid"></div><div class="more-row"><p id="firm-count" aria-live="polite"></p><button id="firm-more" class="more-btn">성공사례 더 보기 ＋</button></div><p class="case-note">공식 성공사례에 기재된 결과입니다. 불송치·불기소·공소기각·무죄는 서로 다른 절차의 결과이며, 개별 사건의 결과가 다른 사건에도 보장되지는 않습니다.</p></section>
<section id="review-section" class="section">${heading('05 / VISITOR REVIEWS','상담을 마친 분들의 이야기.','기존 네이버 방문자 리뷰를 소개합니다. 여러 법률 분야의 상담 후기이며 모두 형사사건 후기인 것은 아닙니다.')}<div class="review-feature"><div><span class="naver-mark">N</span><p class="banner-kicker">VISITOR STORIES</p><h3>상담의 경험을<br>직접 남겨주셨습니다.</h3><p>제공된 네이버 방문자 리뷰<br><strong>514건</strong>을 소개합니다.</p></div><img src="/assets/editorial/office-02.webp" alt="제공된 율마루 사무실 내부 사진" loading="lazy"></div><div class="case-toolbar" aria-label="리뷰 지점 필터">${['전체',...branches.map(x=>x[0])].map(b=>`<button class="filter ${b==='전체'?'active':''}" data-branch="${b}" aria-pressed="${b==='전체'}">${b}</button>`).join('')}</div><div id="reviews" class="review-grid"></div><div class="more-row"><p id="review-count" aria-live="polite"></p><button id="review-more" class="more-btn">리뷰 더 보기 ＋</button></div><p class="case-note">기존 리뷰 데이터와 제공된 캡처 자료를 바탕으로 구성했습니다. 작성일이 없는 리뷰에 임의의 날짜를 붙이지 않았습니다. 네이버에서 원문과 최신 리뷰를 확인하세요.</p></section>
<section id="youtube-section" class="section">${heading('06 / YOUTUBE','법률 이야기, 영상으로 만나세요.')}<div class="youtube-panel"><a class="youtube-visual" href="${videoURL}" target="_blank" rel="noopener noreferrer" aria-label="${esc(featured.title)} 영상 보기 (새 창)"><img src="${esc(featured.thumbnail)}" alt="${esc(featured.title)} 영상 썸네일" loading="lazy"><span class="video-mark">${icon('play')}</span></a><div class="youtube-copy"><span class="channel-badge"><i class="fa-brands fa-youtube" aria-hidden="true"></i> YOUTUBE</span><h3>사건을 이해하는<br>또 하나의 방법.</h3><p>변호사가 전하는 법률 이야기와 사건별 쟁점을 공식 유튜브 채널에서 확인하세요.</p><p class="featured-video-title">${ext(videoURL,`${esc(featured.title)} ${icon('arrow-up-right-from-square')}`)}</p><div class="video-links">${ext('https://www.youtube.com/@yulmaru_g',`공식 채널 방문 ${icon('arrow-up-right-from-square')}`,'hero-btn')}${ext('https://www.youtube.com/@yulmaru_g/videos',`전체 영상 보기 ${icon('arrow-right')}`)}</div></div></div></section>
<section id="consult-section" class="consult-section"><div class="consult-copy"><p class="eyebrow">YOUR NEXT STEP</p><h2>사건의 시작부터,<br>율마루와 함께 확인하세요.</h2><p class="consult-description">구체적인 사건 경위를 들려주세요.</p><div class="consult-actions"><a class="consult-phone" href="tel:18006419">${icon('phone')} 1800-6419 ${icon('arrow-up-right-from-square')}</a>${ext('https://map.naver.com/p/search/법무법인율마루',`네이버 상담 예약 ${icon('calendar-check')}`,'consult-booking')}</div>${ext(localURL('tools/directions.html'),`오시는 길 ${icon('location-dot')}`,'consult-directions')}</div><img class="consult-photo" src="/assets/editorial/office-01.webp" alt="율마루 사무실" loading="lazy"></section></div></main>${siteFooterHTML}<dialog id="case-modal" class="modal" aria-labelledby="modal-title"><div class="modal-inner"><button class="modal-close" aria-label="상세보기 닫기">×</button><div id="modal-content"></div></div></dialog>`);
renderGuide();renderCases();initRegionalCarousel();renderFirm();renderReviews();$('#case-type').addEventListener('change',e=>{caseType=e.target.value;renderCases()});$('#case-modal').addEventListener('click',e=>{if(e.target===$('#case-modal'))$('#case-modal').close()})}
function renderGuide(){const [lead,issues,docs]=guides[type];document.querySelectorAll('[data-type]').forEach(b=>{b.classList.toggle('active',b.dataset.type===type);b.setAttribute('aria-pressed',b.dataset.type===type)});const related=regionalCases.filter(r=>r.category===category.id&&r.type===type);const law=category.id==='traffic'?'교통사고처리특례법':category.id==='sexual'?'성폭력범죄의처벌등에관한특례법':type==='스토킹'?'스토킹범죄의처벌등에관한법률':type==='군형사'?'군형법':'형법';$('#guide-content').innerHTML=`<article class="guide"><div class="guide-cover"><img src="${photo(category.id)}" alt="${category.name} 관련 기록과 자료를 준비하는 장면" loading="lazy"><span class="image-caption">자료 준비 상황 재구성</span><span class="guide-symbol">${icon(categoryIcon(category.id))}</span></div><div class="guide-body"><div class="guide-title"><div><p class="eyebrow">${category.name} · 유형별 대응</p><h3>${type}</h3></div><span class="type-number">${String(category.types.indexOf(type)+1).padStart(2,'0')}</span></div><p class="lead">${lead}</p><div class="response-flow" aria-label="대응 준비 흐름"><span><b>1</b> 기록 확인</span>${icon('chevron-right')}<span><b>2</b> 쟁점 정리</span>${icon('chevron-right')}<span><b>3</b> 대응 준비</span></div><div class="guide-columns"><div><h4><span class="heading-icon">${icon('magnifying-glass')}</span> 확인할 쟁점</h4><ul>${issues.map(t=>`<li>${t}</li>`).join('')}</ul></div><div><h4><span class="heading-icon">${icon('folder-open')}</span> 준비할 자료</h4><ul>${docs.map(t=>`<li>${t}</li>`).join('')}</ul></div></div>${ext('https://www.law.go.kr/법령/'+law,`${icon('scale-balanced')} 관련 법령 확인 ${icon('arrow-up-right-from-square')}`,'law-link')}<div class="guide-related">${related.length?`<p>${icon('file-lines')} 관련 공개 사건 <b>${related.length}건</b></p>${related.slice(0,2).map(r=>`<button data-case="${r.id}">${esc(r.title)} ${icon('arrow-right')}</button>`).join('')}<a href="#regional-section" data-related="${type}">이 유형의 사례 모두 보기 ${icon('arrow-down')}</a>`:'<p>관련 판단은 아래 공개 지역 사건 모음에서 확인하세요.</p>'}</div></div></article>`}
const casePhotos={"court-91":{"src":"assets/cases/court-91.webp","alt":"음주·무면허 오토바이, 횡단보도 보행자 충돌 관련 참고 이미지"},"court-97":{"src":"assets/cases/court-97.webp","alt":"무면허 사고 후 도주와 음주측정 거부 관련 참고 이미지"},"court-119":{"src":"assets/cases/court-119.webp","alt":"보호구역에서 갑자기 나타난 어린이와 충돌 관련 참고 이미지"},"court-244":{"src":"assets/cases/court-244.webp","alt":"자전거 횡단보도 사망사고 관련 참고 이미지"},"court-525":{"src":"assets/cases/court-525.webp","alt":"직진 신호에 좌회전, 오토바이 운전자 사망 관련 참고 이미지"},"court-616":{"src":"assets/cases/court-616.webp","alt":"보호구역 횡단보도 어린이 치상 관련 참고 이미지"},"court-623":{"src":"assets/cases/court-623.webp","alt":"음주 횡단보도 사망사고 후 도주 관련 참고 이미지"},"court-668":{"src":"assets/cases/court-668.webp","alt":"음주운전 중 중앙선 침범 관련 참고 이미지"},"court-797":{"src":"assets/cases/court-797.webp","alt":"신호위반 차량의 보행자 충격 관련 참고 이미지"},"court-1069":{"src":"assets/cases/court-1069.webp","alt":"술에 취한 자전거 운전자와 오토바이 충돌 관련 참고 이미지"},"court-45":{"src":"assets/cases/court-45.webp","alt":"사기 피해 해결을 미끼로 한 재차 편취 관련 참고 이미지"},"court-95":{"src":"assets/cases/court-95.webp","alt":"중고물품 사기·명의 도용 대출 관련 참고 이미지"},"court-98":{"src":"assets/cases/court-98.webp","alt":"게임 아이템 미배송과 음주운전 병합 관련 참고 이미지"},"court-521":{"src":"assets/cases/court-521.webp","alt":"매매·대여 명목 38억 원 편취 관련 참고 이미지"},"court-841":{"src":"assets/cases/court-841.webp","alt":"전세보증금을 1순위로 보장한다는 거짓말 관련 참고 이미지"},"court-1042":{"src":"assets/cases/court-1042.webp","alt":"다가구주택 보증금 돌려막기 관련 참고 이미지"},"court-1210":{"src":"assets/cases/court-1210.webp","alt":"반환이 어려운 주택의 임대차보증금 수령 관련 참고 이미지"},"court-1211":{"src":"assets/cases/court-1211.webp","alt":"신탁 담보와 보증금 사기, 문서 위조 관련 참고 이미지"},"court-31":{"src":"assets/cases/court-31.webp","alt":"성폭력에 저항한 피해자, 60년 만의 재심 무죄 관련 참고 이미지"},"court-512":{"src":"assets/cases/court-512.webp","alt":"버스에서 승객을 따라가 추행 관련 참고 이미지"},"court-629":{"src":"assets/cases/court-629.webp","alt":"야간 거리 추행, 항소심에서 판단 변경 관련 참고 이미지"},"court-538":{"src":"assets/cases/court-538.webp","alt":"구인광고로 만난 장애인 피해자 대상 성범죄 관련 참고 이미지"},"court-38":{"src":"assets/cases/court-38.webp","alt":"법원 사회복무요원 폭행치상 관련 참고 이미지"},"court-44":{"src":"assets/cases/court-44.webp","alt":"아버지 폭행치사 기소, 증명 부족 무죄 관련 참고 이미지"},"court-58":{"src":"assets/cases/court-58.webp","alt":"장애가 있는 조카 대상 반복 폭력 관련 참고 이미지"},"court-68":{"src":"assets/cases/court-68.webp","alt":"지하철역에서 흉기 휴대·협박 관련 참고 이미지"},"court-70":{"src":"assets/cases/court-70.webp","alt":"이별 이후 협박·손괴·스토킹 관련 참고 이미지"},"court-125":{"src":"assets/cases/court-125.webp","alt":"위험한 물건으로 전치 6주 상해 관련 참고 이미지"},"court-149":{"src":"assets/cases/court-149.webp","alt":"시비 끝에 칼을 겨눈 특수협박 관련 참고 이미지"},"court-497":{"src":"assets/cases/court-497.webp","alt":"이웃의 개 짖는 소리에 흉기로 위협 관련 참고 이미지"},"court-516":{"src":"assets/cases/court-516.webp","alt":"급여 정산 갈등 후 업주 협박 관련 참고 이미지"},"court-541":{"src":"assets/cases/court-541.webp","alt":"동거 상대 감금·폭행·협박 관련 참고 이미지"},"court-577":{"src":"assets/cases/court-577.webp","alt":"재떨이로 피해자 머리를 가격 관련 참고 이미지"},"court-1070":{"src":"assets/cases/court-1070.webp","alt":"전단지 배부자 제압, 정당방위 인정 관련 참고 이미지"},"court-27":{"src":"assets/cases/court-27.webp","alt":"절도 전력이 있는 사람의 사찰 재범 관련 참고 이미지"},"court-123":{"src":"assets/cases/court-123.webp","alt":"담보부동산 매각대금 미지급, 횡령 무죄 관련 참고 이미지"},"court-150":{"src":"assets/cases/court-150.webp","alt":"점포 침입 절도·손괴·방화미수 관련 참고 이미지"},"court-593":{"src":"assets/cases/court-593.webp","alt":"유령직원 등록으로 노무비 횡령 관련 참고 이미지"},"court-1041":{"src":"assets/cases/court-1041.webp","alt":"주사 포장지를 가져간 의사, 절도 무죄 관련 참고 이미지"},"court-1092":{"src":"assets/cases/court-1092.webp","alt":"주식계약서 위조와 회삿돈 유용 관련 참고 이미지"},"court-1183":{"src":"assets/cases/court-1183.webp","alt":"회사 자금 2억여 원을 유용한 경리 관련 참고 이미지"},"court-498":{"src":"assets/cases/court-498.webp","alt":"시승을 핑계로 오토바이를 가져간 절도 관련 참고 이미지"},"court-608":{"src":"assets/cases/court-608.webp","alt":"취객에게 아는 사람처럼 접근한 절도 관련 참고 이미지"},"court-610":{"src":"assets/cases/court-610.webp","alt":"사실혼 배우자의 재산 관리 중 횡령 관련 참고 이미지"},"court-848":{"src":"assets/cases/court-848.webp","alt":"어민회 자금을 개인 용도로 사용 관련 참고 이미지"},"court-1175":{"src":"assets/cases/court-1175.webp","alt":"출소 후 차량 등 반복 절도 관련 참고 이미지"},"court-25":{"src":"assets/cases/court-25.webp","alt":"관리사무소 반복 전화·욕설 관련 참고 이미지"},"court-85":{"src":"assets/cases/court-85.webp","alt":"한 달 미만에 1,138회 연락 관련 참고 이미지"},"court-134":{"src":"assets/cases/court-134.webp","alt":"영업 중인 상점에 ‘철거’ 표시 관련 참고 이미지"},"court-505":{"src":"assets/cases/court-505.webp","alt":"입주민 공익을 위한 비판, 무죄 관련 참고 이미지"},"court-533":{"src":"assets/cases/court-533.webp","alt":"블로그에 성폭력 가해자라는 허위 게시 관련 참고 이미지"},"court-553":{"src":"assets/cases/court-553.webp","alt":"허위 신고를 교사하고 재판에서 위증 관련 참고 이미지"},"court-571":{"src":"assets/cases/court-571.webp","alt":"민사분쟁에서 유리해지려는 허위 고소 관련 참고 이미지"},"court-1008":{"src":"assets/cases/court-1008.webp","alt":"마약류를 은닉해 전달한 ‘드라퍼’ 관련 참고 이미지"},"court-1213":{"src":"assets/cases/court-1213.webp","alt":"신고 출동 경찰관을 밀치고 폭행 관련 참고 이미지"},"court-526":{"src":"assets/cases/court-526.webp","alt":"화재·납치 거짓 신고로 긴급 출동 유발 관련 참고 이미지"},"court-515":{"src":"assets/cases/court-515.webp","alt":"거짓 112 신고와 거리의 소란 관련 참고 이미지"},"court-1194":{"src":"assets/cases/court-1194.webp","alt":"집행유예 중 다시 경찰관 폭행 관련 참고 이미지"},"news-0":{"src":"assets/cases/news-0.webp","alt":"제한속도 두 배의 오토바이 보행자 사망사고 관련 참고 이미지"},"news-1":{"src":"assets/cases/news-1.webp","alt":"과속 차량과 신호위반 오토바이 충돌, 무죄 관련 참고 이미지"},"news-2":{"src":"assets/cases/news-2.webp","alt":"존재하지 않는 쇼핑몰 운영을 빙자한 차용 사기 관련 참고 이미지"},"news-3":{"src":"assets/cases/news-3.webp","alt":"오피스텔 보증금 약 209억 원 편취 관련 참고 이미지"},"news-4":{"src":"assets/cases/news-4.webp","alt":"금감원 직원 사칭 현금 수거 관련 참고 이미지"},"news-5":{"src":"assets/cases/news-5.webp","alt":"게임 아이템 판매를 빙자한 반복 사기 관련 참고 이미지"},"news-6":{"src":"assets/cases/news-6.webp","alt":"여자화장실에서 약 30회 몰래 촬영 관련 참고 이미지"},"news-7":{"src":"assets/cases/news-7.webp","alt":"전직 경찰관의 여성 15명 불법촬영 관련 참고 이미지"},"news-8":{"src":"assets/cases/news-8.webp","alt":"촬영 미수 재판 중 화장실에서 다시 촬영 관련 참고 이미지"},"news-9":{"src":"assets/cases/news-9.webp","alt":"간호사 탈의실 촬영 시도, 침입죄 판단 관련 참고 이미지"},"news-10":{"src":"assets/cases/news-10.webp","alt":"군청 직원의 동료 강제추행 관련 참고 이미지"},"news-11":{"src":"assets/cases/news-11.webp","alt":"직원 강제추행 사건, 항소심 실형 유지 관련 참고 이미지"},"news-12":{"src":"assets/cases/news-12.webp","alt":"성별과 무관하게 판단한 유사강간 관련 참고 이미지"},"news-13":{"src":"assets/cases/news-13.webp","alt":"전 시의원 불법촬영, 1심 집행유예 후 검찰 항소 관련 참고 이미지"}};
function caseImage(r){const specific=casePhotos[r.id];if(specific)return {src:localURL(specific.src),alt:specific.alt};const subject=r.title+' '+r.facts;let asset,alt;if(r.category==='traffic'){const motorcycle=/오토바이|이륜차/.test(subject);asset=motorcycle?'assets/editorial/motorcycle-case.webp':'assets/traffic.webp';alt=motorcycle?'횡단보도 옆 오토바이 참고 이미지':'도로와 횡단보도 참고 이미지'}else if(r.category==='fraud'&&r.type==='전세 사기'){asset='assets/general.webp';alt='주거 건물 복도 참고 이미지'}else if(r.category==='violence'){asset='assets/violence.webp';alt='거리 상황 참고 이미지'}else{asset='assets/editorial/'+r.category+'-guide.webp';alt=all.find(c=>c.id===r.category).name+' 관련 자료 준비 참고 이미지'}return {src:localURL(asset),alt}}
function caseCover(r,modal=false){const image=caseImage(r);return `<figure class="${modal?'modal-case-cover':'case-cover'}"><img src="${image.src}" alt="${esc(image.alt)}" ${modal?'':'loading="lazy"'}>${modal?'':`<div class="case-image-badges"><span class="case-type">${icon(categoryIcon(r.category))}${esc(r.type)}</span><span class="region-tag">${esc(r.region)} · ${esc(r.stage)}</span></div>`}</figure>`}
const caseCard=r=>`<article class="case-card">${caseCover(r)}<h3>${esc(r.title)}</h3><div class="case-facts"><span class="small-label">사건의 시작</span><p>${esc(r.facts)}</p></div><div class="result-box case-outcome ${/무죄|불송치|불기소|공소기각/.test(r.result)?'case-outcome-clear':''} ${r.result.length>15?'case-outcome-medium':''} ${r.result.length>24?'case-outcome-long':''}"><span>${icon('gavel')} 공개된 처리 결과</span><strong class="case-result">${esc(r.result)}</strong></div><button class="case-more" data-case="${r.id}" aria-label="${esc(r.title)} 상세보기">자세히 보기 <span>${icon('arrow-right')}</span></button></article>`;
function renderCases(){const rows=regionalCases.filter(r=>r.category===category.id&&(region==='전체'||r.region===region)&&(caseType==='전체'||r.type===caseType));$('#regional-cases').innerHTML=rows.length?rows.map(caseCard).join(''):'<p class="empty">선택한 조건의 공개 사건이 없습니다. 다른 지역 또는 유형을 선택하세요.</p>';$('#case-count').textContent=`${rows.length} / 12건`;carouselReset()}
function renderFirm(){const rows=firmCases.filter(r=>firmField==='all'||r.field===firmField);$('#firm-cases').innerHTML=rows.slice(0,firmLimit).map(r=>`<article class="case-card firm-card"><div class="case-meta"><span class="firm-label"><img src="${localURL('assets/yulmaru-logo.png')}" alt="">율마루 성공사례</span><span class="region-tag">${esc(r.category)}</span></div><h3>${esc(r.title)}</h3><p>${esc(r.tag)}</p><div class="result-box"><span>${icon('circle-check')} 공식 게시물의 결과</span><strong class="case-result">${esc(r.result)}</strong></div><button class="case-more" data-firm-case="${r.id}" aria-label="${esc(r.title)} 성공사례 상세보기">대응과 결과 자세히 <span>${icon('arrow-right')}</span></button></article>`).join('')||'<p class="empty">공식 홈페이지에서 관련 성공사례를 확인하세요.</p>';$('#firm-count').textContent=`${Math.min(firmLimit,rows.length)} / ${rows.length}건 · 전체 수록 35건`;$('#firm-more').hidden=firmLimit>=rows.length}
function renderReviews(){const rows=reviews.filter(r=>branch==='전체'||r.branch===branch);$('#reviews').innerHTML=rows.slice(0,reviewLimit).map(r=>`<article class="review-card"><div class="review-source"><span class="naver-mark">N</span> 네이버 방문자 리뷰 <span class="review-quote" aria-hidden="true">“</span></div><p class="review-text">${esc(r.text.slice(0,170))}${r.text.length>170?'…':''}</p>${r.text.length>170?`<details class="review-full"><summary>후기 전체 읽기 ${icon('plus')}</summary><p>${esc(r.text)}</p></details>`:''}<div class="review-top"><span class="review-initial" aria-hidden="true">${esc(r.name[0]||'율')}</span><div><h3>${esc(r.name)}</h3><p>${esc(r.branch)}</p></div></div><div class="review-bottom"><span>${r.date&&r.date!=='네이버 방문자 리뷰'?esc(r.date):'작성일 미기재'}</span>${ext(r.source,`원문 확인 ${icon('arrow-up-right-from-square')}`)}</div></article>`).join('');$('#review-count').textContent=`${Math.min(reviewLimit,rows.length)} / ${rows.length}건 · 기존 리뷰 총 514건`;$('#review-more').hidden=reviewLimit>=rows.length}
function modal(r,firm=false){const d=$('#case-modal');$('#modal-content').innerHTML=firm?`<p class="eyebrow">율마루 성공사례 / ${esc(r.category)}</p><h2 id="modal-title">${esc(r.title)}</h2><strong class="modal-result">${esc(r.tag)}</strong><h3>원 게시물의 사건·대응·결과</h3><div class="firm-narrative">${r.paragraphs.map(t=>`<p>${esc(t)}</p>`).join('')}</div><h3>출처</h3>${ext(r.url,'율마루 공식 성공사례 원문 ↗')}<p class="modal-note">공식 게시물의 내용을 옮겨 구성했습니다. 법적 결과와 세부 조건은 원문을 확인하세요.</p>`:`${caseCover(r,true)}<p class="eyebrow">공개 지역 사건 / ${esc(r.type)}</p><h2 id="modal-title">${esc(r.title)}</h2><p class="modal-meta">${esc(r.source)} · ${esc(r.number||'사건번호 출처 참조')}<br>${esc(r.stage)} · ${esc(r.date||'선고일 출처 참조')}<br>지역: ${esc(r.region)} · 장소: ${esc(r.place)}</p><h3>어떤 일이 있었나요?</h3><p>${esc(r.facts)}</p><h3>어떻게 판단했나요?</h3><p>${esc(r.reason)}</p><h3>처리 결과</h3><strong class="modal-result">${esc(r.result)}</strong><h3>출처 확인</h3>${ext(r.url,`${esc(r.source)} 원문 ↗`)}${r.pdfUrl?`<br>${ext(r.pdfUrl,'법원이 공개한 판결문 PDF ↗')}`:''}<p class="modal-note">공개 자료를 요약한 사례이며 율마루 수임 사건으로 소개하지 않습니다. 선고와 확정판결은 다를 수 있으며 공개 출처에서 확정 여부를 따로 확인하지 않았습니다. 출처 확인일 ${r.verified}.</p>`;d.showModal();d.scrollTop=0;document.body.style.overflow='hidden';d.addEventListener('close',()=>document.body.style.overflow='',{once:true})}

// Drag inertia and navigation distances copied from the divorce site's success cases.
let carouselCleanup=()=>{},carouselReset=()=>{};
function initRegionalCarousel(){const track=$('#regional-cases'),viewport=track.parentElement;

  let pressed = false;
  let dragged = false;
  let startX = 0;
  let lastX = 0;
  let suppressCaseClick = false;
  let momentumFrame = 0;
  let lastFrameTime = 0;
  let velocity = 0;
  let dragHistory = [];

  const stopMomentum = () => {
    if (momentumFrame) cancelAnimationFrame(momentumFrame);
    momentumFrame = 0;
    velocity = 0;
    lastFrameTime = 0;
    track.style.scrollBehavior = "";
    track.style.scrollSnapType = "";
  };

  const applyMomentum = time => {
    if (!lastFrameTime) {
      lastFrameTime = time;
      momentumFrame = requestAnimationFrame(applyMomentum);
      return;
    }
    const deltaTime = Math.min(time - lastFrameTime, 32);
    lastFrameTime = time;
    const before = track.scrollLeft;
    track.scrollLeft += velocity * deltaTime;
    velocity *= Math.pow(.95, deltaTime / 16.67);
    const hitEdge = Math.abs(track.scrollLeft - before) < .5;
    if (Math.abs(velocity) < .01 || hitEdge) {
      stopMomentum();
      return;
    }
    momentumFrame = requestAnimationFrame(applyMomentum);
  };

  track.addEventListener("pointerdown", event => {
    if (event.button !== undefined && event.button !== 0) return;
    stopMomentum();
    pressed = true;
    dragged = false;
    suppressCaseClick = false;
    startX = lastX = event.clientX;
    dragHistory = [{ x: event.clientX, time: performance.now() }];
    track.classList.add("is-dragging");
  });

  track.addEventListener("pointermove", event => {
    if (!pressed) return;
    const now = performance.now();
    const distance = event.clientX - lastX;
    const totalDistance = event.clientX - startX;
    if (!dragged && Math.abs(totalDistance) > 12) {
      dragged = true;
      track.setPointerCapture?.(event.pointerId);
      track.style.scrollBehavior = "auto";
      track.style.scrollSnapType = "none";
    }
    if (!dragged) {
      lastX = event.clientX;
      return;
    }
    if (event.cancelable) event.preventDefault();
    track.scrollLeft -= distance;
    lastX = event.clientX;
    dragHistory.push({ x: event.clientX, time: now });
    while (dragHistory.length > 1 && now - dragHistory[0].time > 80) dragHistory.shift();
  });

  ["pointerup", "pointercancel"].forEach(type => track.addEventListener(type, event => {
    if (!pressed) return;
    pressed = false;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture?.(event.pointerId)) track.releasePointerCapture?.(event.pointerId);
    if (type === "pointerup" && dragged) {
      suppressCaseClick = true;
      const now = performance.now();
      const oldest = dragHistory[0] || { x: event.clientX, time: now };
      const elapsed = Math.max(now - oldest.time, 1);
      velocity = elapsed > 4 ? -(event.clientX - oldest.x) / elapsed : 0;
      velocity = Math.max(-2.8, Math.min(2.8, velocity));
      if (Math.abs(velocity) < .12) velocity = 0;
      lastFrameTime = 0;
      if (velocity) momentumFrame = requestAnimationFrame(applyMomentum);
      else stopMomentum();
      window.setTimeout(() => { suppressCaseClick = false; }, 80);
    } else stopMomentum();
    dragged = false;
    dragHistory = [];
  }));
  track.addEventListener("dragstart", event => event.preventDefault());
  track.addEventListener("click", event => {
    if (suppressCaseClick) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);

  const updateNav=()=>{const limit=Math.max(0,track.scrollWidth-track.clientWidth);viewport.querySelector('[data-case-scroll="prev"]').disabled=limit<=4||track.scrollLeft<=3;viewport.querySelector('[data-case-scroll="next"]').disabled=limit<=4||track.scrollLeft>=limit-3};
  const move=direction=>{stopMomentum();const limit=Math.max(0,track.scrollWidth-track.clientWidth),distance=Math.max(track.clientWidth*.78,260);track.scrollTo({left:Math.min(Math.max(track.scrollLeft+distance*direction,0),limit),behavior:'smooth'})};
  viewport.querySelectorAll('[data-case-scroll]').forEach(button=>button.addEventListener('click',()=>move(button.dataset.caseScroll==='prev'?-1:1)));
  track.addEventListener('keydown',event=>{if(event.target===track&&(event.key==='ArrowLeft'||event.key==='ArrowRight')){event.preventDefault();move(event.key==='ArrowLeft'?-1:1)}});
  track.addEventListener('scroll',updateNav,{passive:true});
  const resizeObserver=new ResizeObserver(updateNav);resizeObserver.observe(track);
  carouselReset=()=>{stopMomentum();pressed=dragged=suppressCaseClick=false;dragHistory=[];track.classList.remove('is-dragging');track.scrollTo({left:0,behavior:'instant'});updateNav()};
  carouselCleanup=()=>{stopMomentum();resizeObserver.disconnect();carouselReset=()=>{}};
  updateNav();
}

function route(){const relative=decodeURIComponent(location.pathname.slice(siteBase.pathname.length)),id=(relative.split('/').filter(Boolean)[0]||'').replace(/\.html$/, ''),c=all.find(c=>c.name===id||c.id===id);if(!localFile&&(c||relative==='index.html')){const next=new URL(c?c.name+'/':'',siteBase);next.search=location.search;next.hash=location.hash;if(location.pathname!==next.pathname)history.replaceState({},'',next.href)}c?page(c):home()}
document.addEventListener('click',e=>{const link=e.target.closest('[data-route]');if(link&&!localFile&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();history.pushState({},'',link.getAttribute('href'));route();scrollTo(0,0);return}const b=e.target.closest('button,a');if(!b)return;
if(b.dataset.type){type=b.dataset.type;const next=new URL(location.href);next.searchParams.set('type',type);next.hash='guide-section';history.replaceState({},'',next.href);renderGuide()}
else if(b.dataset.region){region=b.dataset.region;document.querySelectorAll('[data-region]').forEach(x=>{x.classList.toggle('active',x.dataset.region===region);x.setAttribute('aria-pressed',x.dataset.region===region)});renderCases()}
else if(b.dataset.case)modal(regionalCases.find(r=>r.id===b.dataset.case));else if(b.dataset.firmCase)modal(firmCases.find(r=>r.id===b.dataset.firmCase),true);
else if(b.dataset.firm){firmField=b.dataset.firm;firmLimit=3;document.querySelectorAll('[data-firm]').forEach(x=>{x.classList.toggle('active',x.dataset.firm===firmField);x.setAttribute('aria-pressed',x.dataset.firm===firmField)});renderFirm()}
else if(b.dataset.branch){branch=b.dataset.branch;reviewLimit=6;document.querySelectorAll('[data-branch]').forEach(x=>{x.classList.toggle('active',x.dataset.branch===branch);x.setAttribute('aria-pressed',x.dataset.branch===branch)});renderReviews()}
else if(b.dataset.related){caseType=b.dataset.related;$('#case-type').value=caseType;renderCases()}
else if(b.id==='firm-more'){firmLimit+=6;renderFirm()}else if(b.id==='review-more'){reviewLimit+=6;renderReviews()}else if(b.classList.contains('modal-close'))$('#case-modal').close()});
window.addEventListener('popstate',route);route();})();
