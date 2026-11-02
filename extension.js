((extensionApi)=>{
"use strict";

// Adapted from the owner's installed, disabled Mallang receipt extension.
// Original source stays outside this package. Only this shadow view is mounted.
const RECEIPT_STORAGE_ID = extensionApi.extension.id;
const RECEIPT_CSS = ":host{display:block;color:var(--foreground,#28252b);font:14px/1.6 system-ui,-apple-system,\"Noto Sans KR\",sans-serif}\n.sorr-link-profiles,.sorr-link-balance{margin-top:18px;padding-top:14px;border-top:1px solid var(--hair)}summary{cursor:pointer;font-size:12px;font-weight:600}.sorr-link-key-profile{margin-top:12px}.sorr-link-key-profile .mlh-cr-big,.sorr-link-key-profile .mlh-cr-won,.sorr-link-key-profile label:has([data-cr=rbal]){display:none}.sorr-link-key-profile .mlh-card{box-shadow:none;border-radius:12px}.sorr-link-key-profile .mlh-cr-brand{display:none}.sorr-link-key-profile .mlh-cr{padding-top:8px}.sorr-link-balance label{margin:10px 0}\n*{box-sizing:border-box}.receipt-scope{--ink:var(--foreground,#28252b);--ink-2:var(--foreground,#433e48);--mut:var(--muted-foreground,#7d7581);--page:var(--background,#faf8f9);--card:var(--card,#fff);--card-2:var(--muted,#f3eff2);--hair:var(--border,#e8dfe5);--line:var(--border,#d8cbd4);--fill:#a04d73;--on-fill:#fff;--serif:system-ui,sans-serif;--mono:ui-monospace,monospace;--ok:#579378;--brass:#a04d73;padding:28px 24px 60px}\n.mlh-root{max-width:1200px;margin:auto;color:var(--ink);font:inherit}.mlh-receipt-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:24px;flex-wrap:wrap}.mlh-receipt-heading strong{font-size:25px;letter-spacing:-.04em}.mlh-receipt-grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:22px;align-items:start}.mlh-slot{min-width:0}.mlh-slot:first-child{grid-row:span 4}.mlh-card{border:1px solid var(--hair);border-radius:18px;background:var(--card);overflow:hidden;box-shadow:0 3px 16px #36213205}.mlh-card-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;gap:10px;border-bottom:1px solid var(--hair)}.mlh-card-title{font-size:14px;margin:0;font-weight:650}\nbutton,input,select,textarea{font:inherit;color:inherit}button{cursor:pointer;touch-action:manipulation}button:disabled{opacity:.5;cursor:wait}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #b1678a;outline-offset:2px}button{background:var(--card);border:1px solid var(--hair);border-radius:9px;padding:7px 11px;min-height:36px}.mlh-link{border:0;background:transparent;padding:4px 6px;color:#a05277}.mlh-input{background:var(--page);border:1px solid var(--hair);border-radius:8px;padding:9px 10px;width:100%;min-width:0}input[type=checkbox]{width:auto}input[type=password]{font-family:var(--mono)}label{display:block;font-size:12px;color:var(--mut)}select{max-width:100%;min-width:0}.mlh-empty,.mlh-rc-note,.mlh-cr-sub,.mlh-cr-foot,.mlh-wxhint{font-size:12px;color:var(--mut);overflow-wrap:anywhere;padding:12px 0}.mlh-perr{color:#ba4d65}.mlh-pfoot{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}.mlh-pedit,.mlh-wedit,.mlh-rc-edit,.mlh-cre{padding:18px 22px;border-bottom:1px solid var(--hair);background:var(--page)}.mlh-pedit label,.mlh-wedit label{margin:10px 0 5px}.mlh-pedit p{font-size:12px}.mlh-chips{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0}.mlh-chip{font-size:11px;min-height:32px}.mlh-chip[aria-pressed=true],button[aria-pressed=true]{background:#f4e6ed;color:#8e4566;border-color:#d9b5c7}\n.mlh-rc{padding:24px}.mlh-rc-head{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-family:var(--mono);font-size:10px;letter-spacing:.1em}.mlh-rc-head em{color:var(--mut);font-style:normal}.mlh-rc-big{display:flex;flex-direction:column;align-items:center;padding:32px 0 28px;gap:8px}.mlh-rc-big>span{font-size:11px;letter-spacing:.18em;color:var(--mut)}.mlh-rc-big>b{font:600 clamp(30px,4vw,44px)/1.25 var(--mono);letter-spacing:-.06em}.mlh-rc-big>em{font-size:12px;font-style:normal;color:var(--mut)}.mlh-rc-cut{border-top:1px dashed var(--line);margin:18px 0}.mlh-rc-line{display:flex;align-items:baseline;gap:8px;padding:8px 0;font-size:12px;flex-wrap:wrap}.mlh-rc-line>i{flex:1;border-bottom:1px dotted var(--hair)}.mlh-rc-line>b{font-family:var(--mono);font-size:12px}.mlh-rc-line>em{font-style:normal;color:var(--mut);font-size:10px}.mlh-rc-line u{text-decoration:none;color:#9c5578}.mlh-rc-sub{font-size:10px;letter-spacing:.1em;color:var(--mut);margin:14px 0 6px}.mlh-rc-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:20px;font-size:11px;color:var(--mut)}.mlh-rc-models,.mlh-rc-items{overflow-wrap:anywhere}.mlh-rc-site{padding:12px 0;border-top:1px solid var(--hair)}.mlh-rc-sitehead{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px}.mlh-rc-prices{display:grid;gap:9px}.mlh-rc-prow{display:grid;grid-template-columns:minmax(90px,1fr) repeat(3,minmax(0,70px));gap:5px;align-items:center;font-size:11px}.mlh-rc-prow input{width:100%;min-width:0;padding:6px;font-size:11px}.mlh-rc-mul{display:flex;gap:6px;align-items:center}.mlh-rc-mul input{width:65px}\n.mlh-cr{padding:22px}.mlh-cr-brand{display:flex;align-items:center;gap:10px;margin-bottom:18px}.mlh-cr-brand>span{flex:1;display:flex;flex-direction:column;min-width:0}.mlh-cr-brand b{font-size:14px;overflow-wrap:anywhere}.mlh-cr-brand em{font-size:10px;font-style:normal;color:var(--mut)}.mlh-cr-big b{font:600 30px/1.4 var(--mono);letter-spacing:-.05em}.mlh-cr-big span{font-size:12px;color:var(--mut);margin-left:7px}.mlh-cr-won{font-size:12px;color:var(--mut);margin-top:5px}.mlh-cr-bar{height:5px;background:var(--card-2);border-radius:20px;margin:18px 0;overflow:hidden}.mlh-cr-bar i{display:block;height:100%;background:#b17390}.mlh-cr-foot{border-top:1px solid var(--hair);margin-top:15px}.mlh-cr-ico{width:29px;height:29px;border-radius:9px;background:#edd5e1;display:block}.mlh-wxset{margin:10px 0}.mlh-ptl{display:block;margin-bottom:5px}.mlh-wxrow,.mlh-pgrid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.mlh-dialog{background:var(--card);color:var(--ink);border:1px solid var(--hair);border-radius:12px;padding:20px;max-width:95%}\n.mlh-ptools{padding:18px 22px;border-bottom:1px solid var(--hair);background:var(--page);overflow-wrap:anywhere}.mlh-rc-prices>label{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,76px) minmax(0,76px);gap:6px;align-items:center}.mlh-rc-prices>label.is-call{grid-template-columns:minmax(0,1fr) minmax(0,95px)}.mlh-rc-prices>label>span{overflow-wrap:anywhere}.mlh-cr-tag{font-size:11px;color:var(--mut);overflow-wrap:anywhere;margin:8px 0}.mlh-ptools textarea{width:100%;max-width:100%}.mlh-ptools small{overflow-wrap:anywhere}.mlh-wxset>span{line-height:1.5}.mlh-ptools>div{max-width:100%}\n[data-theme=dark]{--fill:#dc9fbd;--brass:#dc9fbd}.receipt-scope[data-theme=dark]{--page:var(--background,#151318);--card:var(--card,#211d24);--card-2:#302833;--ink:var(--foreground,#eee6ed);--mut:var(--muted-foreground,#aca0ae);--hair:var(--border,#3e3442);--line:#57465b}\n@media(max-width:700px){.receipt-scope{padding:22px 14px 50px}.mlh-receipt-grid{grid-template-columns:minmax(0,1fr);gap:16px}.mlh-slot:first-child{grid-row:auto}.mlh-receipt-heading strong{font-size:21px}.mlh-rc,.mlh-cr{padding:20px}.mlh-card-head{padding:16px 20px}.mlh-rc-prow{grid-template-columns:minmax(75px,1fr) repeat(3,minmax(0,60px))}.mlh-receipt-heading button{min-height:42px}}\n";
function mountReceipt(host) {
  const realDocument=globalThis.document;
  const shadow=host.shadowRoot;
  shadow.innerHTML='';
  const style=realDocument.createElement('style');style.textContent=RECEIPT_CSS;
  const scope=realDocument.createElement('div');scope.className='receipt-scope';
  const page=realDocument.createElement('div');page.dataset.component='HomeBrowserHub.HomePage';
  scope.append(page);shadow.append(style,scope);
  let disposed=false;
  const abort=new AbortController(),timeouts=new Set(),intervals=new Set(),frames=new Set(),cleanup=[];
  const setTimeout=(fn,ms,...args)=>{const id=globalThis.setTimeout(()=>{timeouts.delete(id);if(!disposed)fn(...args)},ms);timeouts.add(id);return id};
  const clearTimeout=id=>{globalThis.clearTimeout(id);timeouts.delete(id)};
  const setInterval=(fn,ms)=>{const id=globalThis.setInterval(()=>{if(!disposed)fn()},ms);intervals.add(id);return id};
  const clearInterval=id=>{globalThis.clearInterval(id);intervals.delete(id)};
  const requestAnimationFrame=fn=>{const id=globalThis.requestAnimationFrame(t=>{frames.delete(id);if(!disposed)fn(t)});frames.add(id);return id};
  const cancelAnimationFrame=id=>{globalThis.cancelAnimationFrame(id);frames.delete(id)};
  const localStorage={
    getItem:k=>globalThis.localStorage.getItem(k==='marinara_admin_secret'?k:'sorr-receipt:'+k),
    setItem:(k,v)=>globalThis.localStorage.setItem('sorr-receipt:'+k,v),
    removeItem:k=>globalThis.localStorage.removeItem('sorr-receipt:'+k),
  };
  const document={
    body:scope,head:scope,documentElement:scope,scrollingElement:scope,
    querySelector:s=>scope.querySelector(s),querySelectorAll:s=>scope.querySelectorAll(s),
    createElement:(...a)=>realDocument.createElement(...a),createTextNode:(...a)=>realDocument.createTextNode(...a),
    createDocumentFragment:()=>realDocument.createDocumentFragment(),
    getElementById:id=>scope.querySelector('#'+CSS.escape(id)),
    addEventListener:(...a)=>shadow.addEventListener(...a),removeEventListener:(...a)=>shadow.removeEventListener(...a),
    get activeElement(){return shadow.activeElement},get visibilityState(){return realDocument.visibilityState},
  };
  const fetch=async(input,init={})=>{
    if(disposed)throw new DOMException('Receipt view closed','AbortError');
    const url=new URL(typeof input==='string'?input:input.url,location.href);
    if(url.origin===location.origin&&/^\/api\/generate(?:\/|$)/.test(url.pathname))throw Error('Generation is not a receipt action');
    const signal=init.signal?AbortSignal.any([abort.signal,init.signal]):abort.signal;
    return globalThis.fetch(input,{...init,signal});
  };
  async function storageApi(method,body){
    const secret=globalThis.localStorage.getItem('marinara_admin_secret');
    const r=await fetch('/api/personal-extensions/'+encodeURIComponent(RECEIPT_STORAGE_ID)+'/storage',{
      method,credentials:'same-origin',headers:{'Content-Type':'application/json','x-marinara-csrf':'1',...(secret?{'X-Admin-Secret':secret}:{})},
      body:body===undefined?undefined:JSON.stringify(body),
    });
    if(!r.ok)throw Error('Receipt settings HTTP '+r.status);
    return r.json();
  }
  const marinara={storage:{
    async get(){const r=await storageApi('GET');const v=r.value||{};return {mallangHome:v.receiptPrefs||{},mallangExt:v.receiptExtra||{days:{}}}},
    async patch(v){const next={};if(v.mallangHome)next.receiptPrefs=v.mallangHome;if(v.mallangExt)next.receiptExtra=v.mallangExt;return storageApi('PATCH',next)},
  },onCleanup:fn=>cleanup.push(fn)};
  function syncTheme(){scope.dataset.theme=realDocument.documentElement.getAttribute('data-theme')||
    (realDocument.documentElement.classList.contains('dark')?'dark':'light')}
  syncTheme();
  const themeObserver=new MutationObserver(syncTheme);themeObserver.observe(realDocument.documentElement,{attributes:true,attributeFilter:['class','data-theme']});
  cleanup.push(()=>themeObserver.disconnect());
function localizeReceiptUI(root){
  if(!root)return;
  const copy={"Edit": "설정", "Done": "완료", "Delete": "삭제", "Remove": "제거", "Cancel": "취소", "Yes, delete": "삭제하기", "Turn off": "영수증 숨기기", "Type": "서비스 종류", "Name": "표시 이름", "Currency": "통화", "Count": "집계 범위", "Relay API": "중계 API · LinkAPI 등", "Google Cloud": "Google Cloud", "Show in": "표시 통화", "₩ won": "₩ 원화", "$ dollar": "$ 달러", "Price list": "요금표", "Official": "공식 API 요금", "TODAY": "오늘 사용액", "Today": "오늘", "This month": "이번 달", "Month-end est.": "월말 예상 사용액", "Replies today": "오늘 응답 수", "from day 3": "매월 3일부터 표시", "no requests yet": "아직 사용 기록이 없어요", "BY SITE · MONTH (today)": "서비스별 이번 달 사용액 · 괄호는 오늘", "TOP MODELS IN CHATS · MONTH": "이번 달 채팅에서 많이 쓴 모델", "SUBSCRIPTIONS · USED (flat fee, not in the total)": "구독 사용량 · 정액제이므로 금액 합계에서 제외", "Show less": "접기", "Count again": "사용량 새로고침", "Check now": "잔액 새로고침", "Checking…": "조회 중…", "loading…": "불러오는 중…", "auto": "자동", "in": "입력", "out": "출력", "per call": "요청당", "FREE TRIAL": "무료 크레딧", "BALANCE · SUBSCRIPTION": "충전 잔액 · 구독", "BALANCE · API.DEEPSEEK.COM": "DeepSeek 계정 잔액", "CREDITS · OPENROUTER.AI": "OpenRouter 크레딧", "OAuth client ID": "OAuth 클라이언트 ID", "Project ID": "프로젝트 ID", "Expires on": "만료일", "Vertex only": "Vertex만", "All Google": "Google 전체", "Site address": "서비스 주소", "Access token (optional — some sites block it in the browser)": "계정 접근 토큰 · 선택 사항, 일부 사이트는 브라우저 조회를 제한해요", "User ID — shown on the same page": "사용자 ID · 토큰과 같은 계정 페이지에서 확인", "API keys — every key you use with this site, separated by spaces": "이 서비스에서 사용하는 API 키 · 여러 개면 공백으로 구분", "Price multiplier for estimates (LinkAPI: 1.6 · not for per-call or -r models)": "추정 요금 배율 · 기존 LinkAPI 기본값 1.6, 요청당 요금·-r 모델 제외", "Balance now — as shown on the site (then it counts down by itself)": "현재 잔액 · 사이트에 표시된 값을 입력하면 이후 사용액을 차감해요", "Marinara connections for this site (the receipt uses the site's own total for them)": "이 서비스에 연결된 마리나라 연결 · 해당 연결은 사이트 집계 사용액을 적용", "Works with sites built on One API / New API. Checks every 30 min or with ↻.": "One API / New API 기반 서비스용입니다. 30분마다 또는 ↻ 버튼으로 조회해요.", "Console delay (hours) — the console balance is usually ~24h behind": "콘솔 반영 지연 시간 · 시간 단위, 기본값 24", "Count Vertex with Google (optional) — sign-in": "Google 모니터링으로 Vertex 사용량 조회 · 선택 사항", "…or a service account key file": "또는 서비스 계정 키 파일 사용", "Paste the service account key (.json) here": "서비스 계정 키 파일(.json)의 내용을 붙여 넣으세요", "Each time you enter the balance, it starts counting again from now. Costs use the prices on the API receipt.": "잔액을 다시 입력하면 그 시점을 기준으로 집계를 시작해요. 비용은 영수증에 설정한 단가로 계산합니다.", "Tap Edit and enter your remaining credit ☁": "설정에서 현재 남은 크레딧을 입력해 주세요.", "Tap Edit and add the site and key ✦": "설정에서 서비스 주소와 API 키를 입력해 주세요.", "Add your key in Edit to see the balance ✦": "설정에서 API 키를 입력하면 잔액을 조회할 수 있어요.", "Leave empty to use today's rate (checked once a day).": "비워 두면 하루 한 번 조회한 환율을 사용해요.", "Prices per 1M tokens (in / out) — by site": "서비스별 100만 토큰당 요금 · 입력 / 출력", "₩ per $1": "1달러당 원화", "₩ per CN¥1": "1위안당 원화", "Models show up here after your first reply ♡": "응답 기록이 생기면 여기에 모델별 단가 설정이 표시돼요.", "This is Vertex too — already in Google's count (✓G)": "이 서비스도 Vertex 사용량에 포함 · Google 집계와 중복 제외", "Grey numbers are the defaults: official prices (Oct 2026) or the LinkAPI list, already multiplied by × (not for per-call models or names ending in -r). Numbers you type are used as they are.": "회색 값은 기존 확장의 기본 요금표입니다. 배율이 반영되며 요청당 요금·-r 모델은 제외해요. 직접 입력한 단가는 추가 배율 없이 적용됩니다.", "Vertex uses Google's own count when the Google Cloud card is connected; relay sites use the site's own spending when its card has a connection picked. Everything else counts chat replies and rerolls in Marinara.": "Google Cloud를 연결하면 Vertex는 Google 집계를 사용해요. 중계 서비스 연결을 지정하면 사이트 사용액을 적용하고, 나머지는 마리나라 응답·재생성 기록으로 계산해요.", "Turn off the receipt?": "이 영수증 카드를 숨길까요?", "Delete this credit widget?": "이 크레딧 카드를 삭제할까요?", "✦ ✓G = counted by Google · ✓site = the site's own total ✦": "✓G: Google 집계 · ✓site: 서비스 자체 집계", "API key — from platform.deepseek.com → API keys (one is enough: the balance belongs to the account)": "DeepSeek API 키 · platform.deepseek.com에서 발급, 계정 잔액이므로 키 하나면 충분해요", "DeepSeek shows the balance only. Today and this month are counted from how much the balance goes down, so they start counting from the first check. Checks every 30 min or with ↻.": "DeepSeek는 잔액을 조회해요. 오늘·이번 달 사용액은 첫 조회 이후 잔액 감소분으로 집계합니다. 30분마다 또는 ↻ 버튼으로 갱신해요.", "API keys — every OpenRouter key you use, separated by spaces": "사용 중인 OpenRouter API 키 · 여러 개면 공백으로 구분", "Management key (optional) — only for the account balance": "관리 키 · 선택 사항, 계정 전체 잔액 조회용", "…or type the balance shown on OpenRouter once (then it counts down by itself)": "또는 OpenRouter에 표시된 현재 잔액 입력 · 이후 사용액을 차감해요", "Today and this month come from each key's own usage numbers (UTC days). Checks every 30 min or with ↻.": "오늘·이번 달 사용액은 키별 사용량을 합산해요. UTC 날짜 기준이며 30분마다 또는 ↻ 버튼으로 갱신합니다.", "API keys — every NanoGPT key you use (agents too), separated by spaces. The first one is used for the balance.": "사용 중인 NanoGPT API 키 · 에이전트용도 포함해 공백으로 구분, 첫 키로 잔액 조회", "Subscription — read through this connection": "구독 사용량을 조회할 마리나라 연결", "The subscription is read through Marinara, so no key is needed for it.": "구독 정보는 마리나라 연결을 통해 읽으므로 별도 API 키가 필요하지 않아요.", "The site didn't allow a lookup from the browser": "브라우저에서 서비스 사용량을 조회하지 못했어요.", "The key was refused (check it in Edit)": "키 인증에 실패했어요. 설정에서 확인해 주세요.", "The subscription couldn't be read": "구독 정보를 읽지 못했어요.", "your NanoGPT keys": "NanoGPT API 키 입력", "the long token from your account page": "계정 페이지의 접근 토큰 입력", "no NanoGPT connection": "NanoGPT 연결 없음", "no connection uses this address yet": "이 주소를 사용하는 연결이 없어요", "match by site address": "서비스 주소로 연결 찾기", "typed balance, counting down by what your keys spend": "입력한 잔액에서 키 사용액을 차감한 값", "For the account balance add a management key in Edit, or type the balance shown on OpenRouter once.": "계정 잔액을 보려면 설정에서 관리 키를 추가하거나 OpenRouter 잔액을 직접 입력해 주세요.", "Enter the balance shown on the site in Edit once — it will go down by what your keys spend.": "설정에서 사이트 잔액을 한 번 입력하면 이후 키 사용액을 차감해요.", "This doesn't look like a service account key file": "서비스 계정 키 파일 형식인지 확인해 주세요.", "Paste the whole .json file (it starts with {)": "{로 시작하는 JSON 파일 내용 전체를 붙여 넣어 주세요."};
  function translate(text){
    const v=text.trim();if(!v)return text;
    let t=copy[v];
    if(t===undefined){
      t=v.replace(/^checked\s+(.+)$/,'최근 확인: $1').replace(/^reading\s+(.+)$/,'사용량 읽는 중: $1')
        .replace(/^Show all (\d+)$/,'전체 $1개 보기').replace(/^TODAY · EVERY MODEL \((\d+)\)$/,'오늘 사용한 모델 · $1개')
        .replace(/^(\d+) calls?$/,'$1회').replace(/^Auto —\s*/,'자동 — ')
        .replace(/^Allowed origin for the client ID:/,'클라이언트 ID에 등록할 허용 출처:')
        .replace(/^Remaining now (.+) — total minus used, from the Cloud console$/,'현재 남은 크레딧 $1 · Cloud 콘솔의 잔액')
        .replace(/^Total credit (.+)$/,'전체 크레딧 $1')
        .replace(/^Exchange rate · updated (.+)$/,'환율 · 기준일 $1').replace(/^Exchange rate · loading…$/,'환율 불러오는 중…')
        .replace(/^Couldn't read usage: /,'사용량을 읽지 못했어요: ')
        .replace(/^✎ no price yet: (.+) — add it in Edit$/,'✎ 단가 미설정: $1 · 설정에서 입력해 주세요.')
        .replace(/^e\.g\. /,'예: ')
        .replace(/ — counting since /,' · 집계 시작: ').replace(/^from the balance going down/,'잔액 감소분으로 집계').replace(/ · includes agents and extensions$/,' · 에이전트·확장 사용 포함')
        .replace(/^Expires /,'만료일: ').replace(/ · expired$/,' · 만료됨')
        .replace(/ · today$/,' · 오늘').replace(/ · this week$/,' · 이번 주');
      const month=t.match(/^([A-Z]{3}) (\d{4}) · ALL SITES$/);if(month){const m=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'].indexOf(month[1])+1;if(m)t=month[2]+'년 '+m+'월 · 전체 서비스'}
      if(t.startsWith('자동 — ')){t=t.replace('no connection uses this address yet','이 주소를 사용하는 연결 없음').replace('no NanoGPT connection','NanoGPT 연결 없음').replace('match by site address','서비스 주소로 연결 찾기').replace(/(\d+) NanoGPT connections?/,'NanoGPT 연결 $1개').replace(/(\d+) connections? use /,'연결 $1개 · ')}
    }
    return text.replace(v,t);
  }
  const walker=realDocument.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
  while(node=walker.nextNode()){
    if(node.parentElement?.closest('script,style,textarea,.mlh-cr-brand b,.mlh-rc-prices label > span'))continue;
    const next=translate(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;
  }
  for(const el of root.querySelectorAll('[title],[aria-label],[placeholder]'))for(const attr of ['title','aria-label','placeholder']){
    const value=el.getAttribute(attr);if(value){const next=translate(value);if(next!==value)el.setAttribute(attr,next)}
  }
}

  // Legacy code sees only the isolated document facade above.
  
  "use strict";
  /* ══════════════════════════════════════════════════════════
   *  말랑 홈 (공유판) v1.36.1 · Celestial Editorial
   *  마리나라 기본 홈(HomeBrowserHub.HomePage) 안에 새 홈을 그리고
   *  기본 내용은 숨긴다. 기본 홈의 버튼(새 채팅·최근 채팅 카드)은
   *  DOM에 그대로 남겨 두고 대신 눌러 주는 방식이라 앱 기능을 건드리지 않는다.
   * ══════════════════════════════════════════════════════════ */
  const REFRESH_MS = 60000;      // 홈이 보이는 동안 데이터 새로고침 주기
  const ACT_LIMIT = 8;           // 최근 활동 개수
  const ASL_URL = "https://aistupidlevel.info/api/v1/models?period=latest&sortBy=combined";
  const ASL_SITE = "https://aistupidlevel.info";
  const IGX_API = "https://rs.igx.kr/api/v2";      // IGX Radiosonde: 키 없는 공개 API, 5분 단위 측정
  const IGX_SITE = "https://rs.igx.kr";
  const IGX_EVERY = 10 * 60000;                     // 실시간 점수 갱신 주기(홈이 보일 때만)
  const HOME_SEL = '[data-component="HomeBrowserHub.HomePage"]';
  const HEARTS2 = `<svg class="mlh-hearts2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13" shape-rendering="crispEdges"><rect x="9" y="0" width="2" height="1" fill="#e0705c"/><rect x="12" y="0" width="2" height="1" fill="#e0705c"/><rect x="8" y="1" width="1" height="1" fill="#e0705c"/><rect x="9" y="1" width="1" height="1" fill="#ffffff"/><rect x="10" y="1" width="1" height="1" fill="#ff9a85"/><rect x="11" y="1" width="1" height="1" fill="#e0705c"/><rect x="12" y="1" width="2" height="1" fill="#ff9a85"/><rect x="14" y="1" width="1" height="1" fill="#e0705c"/><rect x="8" y="2" width="1" height="1" fill="#e0705c"/><rect x="9" y="2" width="5" height="1" fill="#ff9a85"/><rect x="14" y="2" width="1" height="1" fill="#e0705c"/><rect x="9" y="3" width="1" height="1" fill="#e0705c"/><rect x="10" y="3" width="3" height="1" fill="#ff9a85"/><rect x="13" y="3" width="1" height="1" fill="#e0705c"/><rect x="10" y="4" width="1" height="1" fill="#e0705c"/><rect x="11" y="4" width="1" height="1" fill="#ff9a85"/><rect x="12" y="4" width="1" height="1" fill="#e0705c"/><rect x="11" y="5" width="1" height="1" fill="#e0705c"/><rect x="1" y="5" width="3" height="1" fill="#e0705c"/><rect x="5" y="5" width="3" height="1" fill="#e0705c"/><rect x="0" y="6" width="1" height="1" fill="#e0705c"/><rect x="1" y="6" width="1" height="1" fill="#ffaf99"/><rect x="2" y="6" width="1" height="1" fill="#ffffff"/><rect x="3" y="6" width="1" height="1" fill="#ffaf99"/><rect x="4" y="6" width="1" height="1" fill="#e0705c"/><rect x="5" y="6" width="3" height="1" fill="#ffaf99"/><rect x="8" y="6" width="1" height="1" fill="#e0705c"/><rect x="0" y="7" width="1" height="1" fill="#e0705c"/><rect x="1" y="7" width="1" height="1" fill="#ffffff"/><rect x="2" y="7" width="6" height="1" fill="#ffaf99"/><rect x="8" y="7" width="1" height="1" fill="#e0705c"/><rect x="0" y="8" width="1" height="1" fill="#e0705c"/><rect x="1" y="8" width="7" height="1" fill="#ffaf99"/><rect x="8" y="8" width="1" height="1" fill="#e0705c"/><rect x="1" y="9" width="1" height="1" fill="#e0705c"/><rect x="2" y="9" width="5" height="1" fill="#ffaf99"/><rect x="7" y="9" width="1" height="1" fill="#e0705c"/><rect x="2" y="10" width="1" height="1" fill="#e0705c"/><rect x="3" y="10" width="3" height="1" fill="#ffaf99"/><rect x="6" y="10" width="1" height="1" fill="#e0705c"/><rect x="3" y="11" width="1" height="1" fill="#e0705c"/><rect x="4" y="11" width="1" height="1" fill="#ffaf99"/><rect x="5" y="11" width="1" height="1" fill="#e0705c"/><rect x="4" y="12" width="1" height="1" fill="#e0705c"/></svg>`;
  const MASC_BUNNY = `<img class="mlh-masc" src="data:image/png;base64,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" alt="" draggable="false">`;  // 말랑 갤 마스코트 (토끼)
  const MASC_BEAVER = `<img class="mlh-masc" src="data:image/png;base64,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" alt="" draggable="false">`;  // 말랑 갤 마스코트 (비버)

  const cleanups = [];
  const listen = (t, type, fn, opt) => { t.addEventListener(type, fn, opt); cleanups.push(() => t.removeEventListener(type, fn, opt)); };
  const store = typeof marinara !== "undefined" ? marinara.storage : null;
  /* 1.19: 기기에 명조체가 없어도(iOS 등) 실제로 명조가 보이도록 웹폰트를 직접 불러온다 */

  let prefs = {
    memo: "", memos: null, memoCur: "", memoArchive: [], shortcuts: [], actTab: "all",  // memo는 옛 단일 메모(자동 이전)
    connOrder: [], connHidden: [], connAsl: {}, connIgx: {},  // 연결 순서·숨김·점수 모델 수동 지정
    scoreSrc: "igx", igx: null,                   // 점수 출처: igx | asl | both · IGX 캐시 {at, ids, data}
    aslKey: "", aslUrl: "", aslHours: 3, asl: null,  // AI Stupid Level 키·서버 프록시 주소·갱신 주기·캐시 {at, rows}
    wid: [], cal: [],                              // 사진·달력 위젯 / 달력 일정 {id, d:"YYYY-MM-DD", t:"HH:MM", text}
  };
  let nativeView = false;        // 이번 세션에서 '기본 홈 보기'를 눌렀는지
  let root = null, backBtn = null, lastLoad = 0, loading = false, editingShorts = false, editingConns = false;
  let data = { feed: [], chars: new Map(), acts: [], conns: [], index: [], counts: {}, ok: true };
  let searchQ = "";

  /* ── 유틸 ── */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const truthy = (v) => v === true || v === "true";
  function headers() {
    try { const s = localStorage.getItem("marinara_admin_secret")?.trim(); return s ? { "X-Admin-Secret": s } : {}; } catch { return {}; }
  }
  async function api(path) {
    const r = await fetch("/api" + path, { credentials: "same-origin", headers: headers() });
    if (!r.ok) throw new Error(path + " " + r.status);
    const j = await r.json();
    return Array.isArray(j?.items) ? j.items : j;
  }
  function ago(iso) {
    const t = Date.parse(iso || "");
    if (!t) return "";
    const m = Math.max(0, Math.round((Date.now() - t) / 60000));
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.round(h / 24);
    if (d < 30) return `${d}d ago`;
    return new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  function charName(row) {
    try { const d = typeof row.data === "string" ? JSON.parse(row.data) : row.data; return d?.name || row.comment || "Untitled"; } catch { return row.comment || "Untitled"; }
  }
  function cleanPreview(text) {
    return String(text || "")
      .replace(/§[^§\n]{0,200}§/g, " ")        // §RP|…§ 상태줄
      .replace(/〔[^〕\n]{0,200}〕/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/[*_`#>]+/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  const MODE = { conversation: ["CHAT", "💬"], roleplay: ["RP", "🎭"], game: ["GAME", "🎮"] };
  const KIND_EN = { 캐릭터: "Character", 로어북: "Lorebook", 프리셋: "Preset", 페르소나: "Persona" };

  /* ── 저장 ── */
  // 1.17.2: 설정을 못 읽었으면(서버 재시작·429 등) 빈 값으로 덮어쓰지 않는다
  let mlhPrefsLoaded = !store;
  async function loadPrefs() {
    for (let mlhTry = 0; mlhTry < 4 && !mlhPrefsLoaded; mlhTry++) {
      try { const v = (await store?.get()) || {}; if (v.mallangHome) prefs = { ...prefs, ...v.mallangHome }; mlhPrefsLoaded = true; }
      catch { await new Promise((r) => setTimeout(r, 1500 * (mlhTry + 1))); }
    }
    if (!mlhPrefsLoaded) console.warn("[말랑 홈] 설정을 못 읽어서, 이번엔 저장하지 않아요 (새로고침하면 다시 읽어요)");
  }
  let saveTimer = 0;
  function savePrefs(showSaved) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      if (!mlhPrefsLoaded) return; // 1.17.2: 못 읽은 상태로는 저장 안 함
      try { await store?.patch({ mallangHome: prefs }); } catch { /* 무시 */ }
      if (showSaved) { const el = root?.querySelector(".mlh-saved"); if (el) el.textContent = "saved ♡"; }
    }, 500);
  }

  /* ── 데이터 ── */
  async function loadData(force) {
    if (loading || (!force && Date.now() - lastLoad < REFRESH_MS)) return;
    loading = true;
    try {
      const conns = await api("/connections");
      data.conns = Array.isArray(conns) ? conns : [];
      lastLoad = Date.now();
      apScan(false); crAuto();
    } catch (e) { console.warn("[영수증] 연결 목록을 읽지 못했어", e); }
    finally { loading = false; render(); }
  }

  /* ── AI Stupid Level 점수 ──
   * 공개 데이터 API(키 필요). 무료 키는 하루 10회라 기본 3시간 주기,
   * Pro 키면 1시간. 홈이 보일 때만, 캐시가 오래됐을 때만 부른다. */
  const asl = { busy: false, err: "", retryAt: 0 };
  function aslStale() {
    const at = prefs.asl?.at || 0;
    return Date.now() - at > (Number(prefs.aslHours) || 3) * 3600000;
  }
  async function loadAsl(force) {
    if (!useAsl()) return;  // 공유판: ASL 안 씀
    const key = String(prefs.aslKey || "").trim();
    const proxy = String(prefs.aslUrl || "").trim();
    if (!useAsl() || (!key && !proxy) || asl.busy) return;
    if (force) { if (Date.now() - (prefs.asl?.at || 0) < 60000) return; }
    else if (!aslStale() || Date.now() < asl.retryAt) return;
    asl.busy = true; render();
    try {
      const url = proxy ? (/[?]/.test(proxy) ? proxy : proxy.replace(/\/+$/, "") + "/models?period=latest&sortBy=combined") : ASL_URL;
      const sameOrigin = new URL(url, location.href).origin === location.origin;
      const r = await fetch(url, {
        mode: "cors",
        credentials: sameOrigin ? "same-origin" : "omit",
        headers: key && !proxy ? { Authorization: "Bearer " + key } : {},
      });
      if (r.status === 429) {
        const t = new Date(); t.setUTCHours(24, 0, 0, 0);
        asl.retryAt = t.getTime(); asl.err = "오늘 호출 한도를 다 썼어요 (한국 시간 오전 9시 초기화)";
      } else if (r.status === 401) {
        asl.retryAt = Date.now() + 6 * 3600000; asl.err = "API 키가 올바르지 않아요";
      } else if (!r.ok) {
        asl.retryAt = Date.now() + 30 * 60000; asl.err = `점수를 못 불러왔어요 (${r.status})`;
      } else {
        const ct = r.headers.get("content-type") || "";
        if (!/json/i.test(ct)) {
          asl.retryAt = Date.now() + 30 * 60000;
          asl.err = proxy ? `프록시 주소가 점수 대신 다른 페이지(${ct.split(";")[0] || "알 수 없음"})를 돌려줘요 — 서버 연결 확인 필요` : "점수 응답 형식이 달라요";
          return;
        }
        const j = await r.json();
        const rows = (j?.data || []).map((m) => ({
          id: String(m.id ?? ""), n: String(m.name || ""),
          s: typeof m.currentScore === "number" ? m.currentScore : m.score, t: m.trend || "",
        })).filter((x) => x.n && typeof x.s === "number");
        prefs.asl = { at: Date.now(), rows };
        asl.err = ""; asl.retryAt = 0;
        savePrefs();
      }
    } catch {
      asl.retryAt = Date.now() + 30 * 60000;
      asl.err = proxy ? "프록시 주소에 연결하지 못했어요" : "브라우저가 요청을 막았어요 (CORS) — 서버 프록시 주소를 넣어 주세요";
    } finally {
      asl.busy = false; render();
    }
  }
  const norm = (s) => String(s || "").toLowerCase().split("/").pop()
    .replace(/:.*$/, "").replace(/[._\s]+/g, "-")
    .replace(/-(preview|latest|exp|experimental)(?=-|$)/g, "")
    .replace(/-\d{4}-?\d{2}-?\d{2}$/, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
  // 모델 이름 짝 찾기: 같으면 바로, 아니면 앞부분이 같은 것 (내 이름이 더 길면 가장 긴 것, 사이트 이름이 더 길면 가장 짧은 것)
  const SAME_TAIL = /^(-(\d+|thinking|high|low|medium|beta|v\d+))+$/;
  function matchName(model, names, pin) {
    if (pin === "none") return null;
    if (pin) return pin;
    const m = norm(model);
    if (!m) return null;
    let best = null, bestLen = 0, loose = null, looseLen = Infinity;
    for (const name of names) {
      const n = norm(name);
      if (n === m) return name;
      // 남는 꼬리가 날짜·숫자·thinking 같은 변형일 때만 같은 모델로 봄 (flash ↔ flash-lite 같은 오매칭 방지)
      if (m.startsWith(n + "-") && SAME_TAIL.test(m.slice(n.length)) && n.length > bestLen) { best = name; bestLen = n.length; }
      if (n.startsWith(m + "-") && SAME_TAIL.test(n.slice(m.length)) && n.length < looseLen) { loose = name; looseLen = n.length; }
    }
    return best || loose;
  }
  function aslFor(c) {
    const rows = prefs.asl?.rows;
    if (!rows?.length) return null;
    const n = matchName(c.model, rows.map((r) => r.n), prefs.connAsl?.[c.id]);
    return n ? rows.find((r) => r.n === n) || null : null;
  }
  function igxFor(c) {
    const ids = prefs.igx?.ids;
    if (!ids?.length) return null;
    const pin = prefs.connIgx?.[c.id];
    let id = matchName(c.model, ids, pin);
    if (!(id && prefs.igx.data?.[id]) && pin !== "none" && !pin) { const g = igxGuess(c.model); if (g && prefs.igx.data?.[g]) id = g; }
    const d = id ? prefs.igx.data?.[id] : null;
    return d && typeof d.s === "number" ? { id, ...d } : null;
  }
  const useIgx = () => true;     // 공유판: 점수는 IGX 실시간만 (키 필요 없음)
  const useAsl = () => false;
  const STATE = { OPERATIONAL: "OK", DEGRADED: "Slow", IMPACTED: "Impacted", CRITICAL: "Critical", UNSTABLE: "Unstable", INACTIVE: "Idle" };

  /* ── IGX Radiosonde 실시간 점수 ──
   * 목록 1번 + 내 연결과 짝이 맞는 모델만 하나씩(0.4초 간격, 초당 3회 제한 안쪽).
   * 브라우저가 막으면 서버 프록시(/asl-proxy/igx/…)로 자동 우회. */
  const igx = { busy: false, err: "", retryAt: 0, via: "" };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function igxGet(path) {
    const relay = String(prefs.igxUrl || "").trim().replace(/\/+(?:models)?\/?(?:\?.*)?$/, "").replace(/\/+$/, "");   // /models를 붙여 넣어도 중계 기본 주소로 정규화
    const bases = relay && !/[?#]/.test(relay) ? [relay, IGX_API] : [IGX_API];
    if (igx.via && bases.includes(igx.via)) bases.sort((x, y) => (y === igx.via) - (x === igx.via));
    let last = null;
    for (const base of bases) {
      try {
        const same = new URL(base, location.href).origin === location.origin;
        const r = await fetch(base + path, { credentials: same ? "same-origin" : "omit", cache: "no-store" });
        if (!r.ok || !/json/i.test(r.headers.get("content-type") || "")) { last = new Error(`${base}${path}: HTTP ${r.status}, content-type=${r.headers.get("content-type") || "없음"}`); continue; }
        const j = await r.json();
        igx.via = base;
        return j;
      } catch (e) { last = e; }
    }
    throw last || new Error("fail");
  }
  // 공식 API 별명 → IGX 이름 (IGX에 그 이름이 없을 때만 씀 · 바뀌면 편집에서 직접 적으면 됨)
  const IGX_ALIAS = { "deepseek-flash": "deepseek-v4.1-flash" };
  const igxGuess = (model) => { const g = String(model || "").toLowerCase().split("/").pop().replace(/:.*$/, "").trim(); return IGX_ALIAS[g] || g || null; };
  async function loadIgx(force) {
    if (!useIgx() || igx.busy || !data.conns.length) return;
    const at = prefs.igx?.at || 0;
    if (force) { if (Date.now() - at < 60000) return; }
    else if (Date.now() - at < IGX_EVERY || Date.now() < igx.retryAt) return;
    igx.busy = true; render();
    try {
      const list = await igxGet("/models");
      // IGX /models 목록엔 사이트에 있는 모델이 다 실리지 않아서(예: gemini-3.8-flash),
      // 목록에서 못 찾으면 내 모델 이름 그대로(앞의 google/ 등 떼고) 한 번 물어봄 — 없으면 404라 건너뜀
      if (list?.success !== true || !Array.isArray(list?.data)) throw new Error("/models 응답 형식이 올바르지 않아");
      const listed = list.data.filter((x) => typeof x === "string");
      const ids = [...new Set([...listed, ...(prefs.igx?.extra || [])])];
      const hidden = new Set(prefs.connHidden || []);
      const want = new Set();
      for (const c of data.conns) {
        if (hidden.has(c.id)) continue;
        const pin = prefs.connIgx?.[c.id];
        const id = matchName(c.model, ids, pin) || (pin === "none" ? null : igxGuess(c.model));
        if (id) want.add(id);
      }
      const out = {};
      let n = 0;
      for (const id of want) {
        if (n++) await sleep(400);
        try {
          const d = (await igxGet("/simple/" + encodeURIComponent(id)))?.data;
          if (d && typeof d.score === "number") out[id] = { s: d.score, st: d.status || "", lat: d.latency, tps: d.tps, at: d.measuredAt };
        } catch { /* 한 모델 실패는 건너뜀 */ }
      }
      const extra = [...new Set([...(prefs.igx?.extra || []), ...Object.keys(out)])].filter((x) => !listed.includes(x)).slice(-60);
      prefs.igx = { at: Date.now(), ids: [...new Set([...listed, ...extra])], extra, data: out };
      igx.err = ""; igx.retryAt = 0;
      savePrefs();
    } catch (e) {
      const relay = String(prefs.igxUrl || "").trim();
      igx.retryAt = Date.now() + (relay ? 10 : 60) * 60000;
      igx.err = relay ? `중계 점수 조회 실패: ${String(e?.message || e).slice(0, 220)}` : "";   // 실제 실패 사유 표시
    } finally {
      igx.busy = false; render();
    }
  }
  const scoreCls = (s) => (s >= 80 ? "s-blue" : s >= 60 ? "s-yellow" : s >= 40 ? "s-orange" : "s-red");
  const TREND = { up: "↑", down: "↓" };

  /* ── 연결 순서·숨김 ── */
  function orderedConns() {
    const byId = new Map(data.conns.map((c) => [c.id, c]));
    if (!prefs.connOrder?.length) {
      const curId = data.feed[0]?.chat?.connectionId || "";
      return data.conns.slice().sort((x, y) => (y.id === curId) - (x.id === curId) || truthy(y.isDefault) - truthy(x.isDefault));
    }
    const ids = prefs.connOrder.filter((id) => byId.has(id));
    for (const c of data.conns) if (!ids.includes(c.id)) ids.push(c.id);
    return ids.map((id) => byId.get(id));
  }
  function moveConn(id, dir) {
    const ids = orderedConns().map((c) => c.id);
    const i = ids.indexOf(id), j = i + dir;
    if (i < 0 || j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    prefs.connOrder = ids;
  }

  /* ── 기본 홈 버튼 대신 누르기 ── */
  function home() { return document.querySelector(HOME_SEL); }
  function openChat(chat, index) {
    const h = home();
    const card = h?.querySelector(`[data-recent-chat-index="${index}"]`);
    if (card && (!chat.name || card.textContent.includes(chat.name))) { card.click(); return; }
    const side = document.querySelector(`[data-chat-id="${CSS.escape(chat.id)}"]`);
    if (side) { side.click(); return; }
    if (card) { card.click(); return; }
    alert("이 채팅은 왼쪽 채팅 목록에서 열어 주세요 ♡");
  }
  /* ── 상단 바 버튼 대신 누르기 (캐릭터·페르소나·로어북·프리셋·연결·설정·채팅 목록) ── */
  function topBtn(key) { return document.querySelector(`[data-topbar-hover-key="${key}"]`); }
  function openPanel(key) {
    const b = topBtn(key);
    if (!b) return false;
    if (b.getAttribute("aria-pressed") !== "true") b.click();
    return true;
  }
  const visibleInputs = () => [...document.querySelectorAll('input[type="text"], input[type="search"], input:not([type])')]
    .filter((i) => !root?.contains(i) && i.offsetParent !== null);
  function fillInput(inp, q) {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    set ? set.call(inp, q) : (inp.value = q);
    inp.dispatchEvent(new Event("input", { bubbles: true }));
    inp.focus();
  }
  function openPanelSearch(key, q) {
    const before = new Set(visibleInputs());
    if (!openPanel(key)) { alert("상단 바 버튼을 찾지 못했어요"); return; }
    let n = 0;
    const tick = () => {
      const found = visibleInputs().find((i) => !before.has(i) && /검색|search|찾/i.test(i.placeholder || ""))
        || visibleInputs().find((i) => /검색|search|찾/i.test(i.placeholder || "") && i.closest("[class*=panel], aside, [role=dialog]"));
      if (found) { fillInput(found, q); return; }
      if (++n < 15) setTimeout(tick, 100);
    };
    setTimeout(tick, 120);
  }
  function openChatById(id, name) {
    const fi = data.feed.findIndex((f) => f.chat.id === id);
    if (fi >= 0) { openChat(data.feed[fi].chat, fi); return; }
    const side = () => document.querySelector(`[data-chat-id="${CSS.escape(id)}"]`);
    if (side()) { side().click(); return; }
    openPanelSearch("chats", name);
    let n = 0;
    const tick = () => { const el = side(); if (el) { el.click(); return; } if (++n < 20) setTimeout(tick, 120); };
    setTimeout(tick, 200);
  }
  function searchResults() {
    const q = searchQ.trim().toLowerCase();
    if (!q) return [];
    return data.index.filter((x) => x.name.toLowerCase().includes(q))
      .sort((a, b) => (a.name.toLowerCase().startsWith(q) ? 0 : 1) - (b.name.toLowerCase().startsWith(q) ? 0 : 1))
      .slice(0, 8);
  }
  function searchResHTML() {
    if (!searchQ.trim()) return "";
    const r = searchResults();
    if (!r.length) return `<div class="mlh-sres"><div class="mlh-empty">No results ♡</div></div>`;
    return `<div class="mlh-sres">${r.map((x, i) => `<button type="button" class="mlh-sitem" data-sr="${i}"><span class="mlh-skind" data-k="${x.k}">${esc(x.sub)}</span><span class="mlh-sname">${esc(x.name)}</span></button>`).join("")}</div>`;
  }
  function updateSearch() {
    const box = root?.querySelector(".mlh-sres-wrap");
    if (box) box.innerHTML = searchResHTML();
  }
  const RAIL = [["characters", "Chars"], ["personas", "Persona"], ["lorebooks", "Lore"], ["presets", "Preset"], ["connections", "LLM"], ["settings", "Settings"]];
  function railHTML() {
    return `<nav class="mlh-rail" aria-label="빠른 이동">${RAIL.map(([k, label]) => {
      return `<button type="button" class="mlh-railbtn" data-rail="${k}"><span class="mlh-railico" data-ri="${k}"></span><span class="mlh-raillbl">${label}</span></button>`;
    }).join("")}</nav>`;
  }
  function newChat(mode) {
    const btn = home()?.querySelector(`[data-home-chat-mode="${mode}"]`);
    if (btn) btn.click();
    else alert("기본 홈의 새 채팅 버튼을 찾지 못했어요. '기본 홈 보기'로 열어 주세요.");
  }

  /* ── 확장 바로가기: 화면에 떠 있는 확장 버튼 찾기 ── */
  function labelOf(el) {
    const raw = [el.getAttribute("data-dock-label"), el.getAttribute("aria-label"), el.getAttribute("title"), el.getAttribute("data-title"), el.textContent]
      .map((s) => String(s || "").replace(/\s+/g, " ").trim())
      .find((s) => s && s.length <= 40 && /[가-힣A-Za-z]/.test(s));
    return raw ? raw.replace(/\s*(열기|닫기|열기\/닫기|창 열기|패널 열기)$/g, "").slice(0, 24) : "";
  }
  function isLauncher(el) {
    if (!(el instanceof HTMLElement) || el.closest(".mlh-root, .mlh-back")) return false;
    if (el.dataset.dockManaged === "1") return true;
    if (el.closest("[data-dock-own]")) return false;
    const st = getComputedStyle(el);
    if (st.position !== "fixed" || st.display === "none" || st.visibility === "hidden") return false;
    const r = el.getBoundingClientRect();
    if (r.width < 24 || r.width > 96 || r.height < 24 || r.height > 96) return false;
    return el.tagName === "BUTTON" || el.tagName === "A" || el.getAttribute("role") === "button" || st.cursor === "pointer";
  }
  function launchers() {
    const out = new Map();
    for (const el of document.querySelectorAll('body > *, body > * > *, body > * > * > *, [data-dock-managed="1"]')) {
      if (!isLauncher(el)) continue;
      const label = labelOf(el);
      if (label && !out.has(label)) out.set(label, el);
    }
    return out;
  }
  function iconOf(el) {
    const g = el?.querySelector("svg, img");
    if (!g) return '<i class="mlh-pxi"></i>';
    const c = g.cloneNode(true);
    c.removeAttribute("id"); c.removeAttribute("class"); c.removeAttribute("style");
    return c.outerHTML;
  }
  function launch(label) {
    const el = launchers().get(label);
    if (!el) { alert(`'${label}' 확장 버튼을 찾지 못했어요. 확장이 켜져 있는지 확인해 주세요.`); return; }
    const o = { bubbles: true, cancelable: true, composed: true, view: window };
    try { el.dispatchEvent(new PointerEvent("pointerdown", { ...o, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: 1 })); } catch { /* 무시 */ }
    try { el.dispatchEvent(new MouseEvent("mousedown", { ...o, button: 0, buttons: 1 })); } catch { /* 무시 */ }
    try { el.dispatchEvent(new PointerEvent("pointerup", { ...o, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0 })); } catch { /* 무시 */ }
    try { el.dispatchEvent(new MouseEvent("mouseup", { ...o, button: 0 })); } catch { /* 무시 */ }
    el.click();
  }

  /* ── 누들·슬럽 같은 홈 브라우저 탭(다운로드한 인터페이스) ── */
  function browserTabs() {
    const list = document.querySelector('[data-component="HomeBrowserHub.TabList"]');
    if (!list) return [];
    return Array.from(list.querySelectorAll('[role="tab"][id^="marinara-home-tab-"]'))
      .filter((b) => !/-(home|professor)$/.test(b.id))
      .map((b) => ({
        id: b.id,
        label: (b.textContent || b.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim(),  // 탭에 보이는 이름 그대로
        icon: b.querySelector("img")?.getAttribute("src") || "",
        fresh: !!b.querySelector('[data-component$="RefreshBadge"]'),
      }))
      .filter((t) => t.label);
  }
  function openBrowserTab(id) {
    const b = document.getElementById(id);
    if (b) b.click();
    else alert("탭을 찾지 못했어요. 새로고침 후 다시 눌러 주세요.");
  }

  /* ── 그리기 ── */
  function dateLine() {
    const d = new Date();
    const day = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const time = d.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" });
    return `${day} · ${time}`;
  }
  function chatsHTML() {
    if (!data.feed.length) return `<div class="mlh-empty">No chats yet. Start a NEW STORY above ♡</div>`;
    return `<div class="mlh-chats">${data.feed.slice(0, 3).map(({ chat, latestMessage }, i) => {
      const c = data.chars.get(chat.characterIds?.[0]);
      const [modeLabel] = MODE[chat.mode] || ["CHAT"];
      const ava = c?.avatar
        ? `<img class="mlh-ava" src="${esc(c.avatar)}" alt="" loading="lazy">`
        : `<span class="mlh-ava">${esc((c?.name || chat.name || "?").slice(0, 1))}</span>`;
      const prev = cleanPreview(latestMessage?.content) || "No messages yet";
      return `<button type="button" class="mlh-chat" data-i="${i}"><span class="mlh-ava-wrap">${ava}<i class="mlh-online"></i></span><span class="mlh-chat-body">
        <span class="mlh-chat-top"><span class="mlh-chat-name">${esc(chat.name || c?.name || "Chat")}</span><span class="mlh-badge">${modeLabel}</span><span class="mlh-chat-ago">${esc(ago(latestMessage?.createdAt || chat.lastMessageAt || chat.updatedAt))}</span></span>
        <span class="mlh-chat-prev">${esc(prev)}</span>
      </span></button>`;
    }).join("")}</div>`;
  }
  function actsHTML() {
    const tab = prefs.actTab;
    const fold = prefs.actFold === true;
    const list = data.acts.filter((a) => tab === "all" || a.kind === tab).slice(0, fold ? 4 : ACT_LIMIT);
    const tabs = [["all", "ALL"], ["캐릭터", "CHAR"], ["로어북", "LORE"], ["프리셋", "PRESET"]]
      .map(([k, l]) => `<button type="button" data-tab="${k}" aria-pressed="${tab === k}">${l}</button>`).join("");
    const items = list.length
      ? `<ul class="mlh-acts">${list.map((a) => `<li class="mlh-act" data-k="${esc(a.kind)}"><span class="mlh-act-ico">${a.ico}</span>
          <span class="mlh-act-main"><span class="mlh-act-name">${esc(a.name)}</span><span class="mlh-act-sub">${KIND_EN[a.kind] || a.kind} · ${a.isNew ? "new" : "edited"}</span></span>
          <span class="mlh-act-time">${esc(ago(a.at))}</span></li>`).join("")}</ul>`
      : `<div class="mlh-empty">No recent activity.</div>`;
    return `<div class="mlh-card-head mlh-has-wb"><h2 class="mlh-card-title" data-ico="star">Recent Activity</h2><span class="mlh-tabs">${tabs}</span><span class="mlh-winbtns"><button type="button" class="mlh-wb" data-wb="min" data-act="act-fold" aria-pressed="${fold}" title="접기 (4개)" aria-label="접기"></button><button type="button" class="mlh-wb" data-wb="max" data-act="act-unfold" aria-pressed="${!fold}" title="펴기 (8개)" aria-label="펴기"></button><i class="mlh-wb" data-wb="x"></i></span></div>${items}`;
  }
  let openConn = null;           // 펼쳐 본 연결 id
  function aslFootHTML() {
    const lines = [];
    if (useIgx()) {
      const src = `<a href="${IGX_SITE}" target="_blank" rel="noopener">IGX Radiosonde</a>`;
      if (igx.busy && (prefs.igx?.at || String(prefs.igxUrl || "").trim())) lines.push(`Loading live scores… · ${src}`);
      else if (igx.err) lines.push(`${esc(igx.err)} · ${src}`);
      else if (prefs.igx?.at) lines.push(`LIVE ${src} · updated ${esc(ago(new Date(prefs.igx.at).toISOString()))}`);
    }
    if (useAsl()) {
      const src = `<a href="${ASL_SITE}" target="_blank" rel="noopener">AI Stupid Level</a>`;
      if (!String(prefs.aslKey || "").trim() && !String(prefs.aslUrl || "").trim()) lines.push(`Add a key or proxy in Edit to see ${src}`);
      else if (asl.busy) lines.push(`Loading ${src}…`);
      else if (asl.err) lines.push(`${esc(asl.err)} · ${src}`);
      else if (prefs.asl?.at) lines.push(`${prefs.scoreSrc === "both" ? "ASL" : "Score"} ${src} · updated ${esc(ago(new Date(prefs.asl.at).toISOString()))}`);
    }
    return lines.length ? `<div class="mlh-asl-foot">${lines.map((l) => `<div>${l}</div>`).join("")}</div>` : "";
  }
  function pillsHTML(c) {
    const both = false, out = [];
    if (useIgx()) {
      const g = igxFor(c);
      if (g) out.push(`<span class="mlh-score ${scoreCls(g.s)}" title="IGX LIVE · ${esc(g.id)} · ${esc(STATE[g.st] || g.st || "")}">${both ? "<b>LIVE</b>" : ""}${Math.round(g.s)}</span>`);
    }
    if (useAsl()) {
      const sc = aslFor(c);
      if (sc) out.push(`<span class="mlh-score ${scoreCls(sc.s)}" title="AI Stupid Level · ${esc(sc.n)}">${both ? "<b>ASL</b>" : ""}${Math.round(sc.s)}${TREND[sc.t] ? `<i>${TREND[sc.t]}</i>` : ""}</span>`);
    }
    return out.join("");
  }
  function scoreRowsHTML(c) {
    const rows = [];
    const g = useIgx() ? igxFor(c) : null;
    if (g) {
      const lat = typeof g.lat === "number" ? (g.lat >= 50 ? `${Math.round(g.lat)}ms` : `${g.lat.toFixed(2)}s`) : "-";
      rows.push(`<div class="mlh-conn-row"><span>Live status</span><span><a href="${IGX_SITE}" target="_blank" rel="noopener">${esc(STATE[g.st] || g.st || "-")} · ${Math.round(g.s)} pts</a></span></div>`);
      rows.push(`<div class="mlh-conn-row"><span>Latency · Speed</span><span>${esc(lat)} · ${typeof g.tps === "number" ? g.tps.toFixed(1) : "-"} tok/s</span></div>`);
    }
    const sc = useAsl() ? aslFor(c) : null;
    if (sc) rows.push(`<div class="mlh-conn-row"><span>ASL score</span><span><a href="${ASL_SITE}/models/${encodeURIComponent(sc.id)}" target="_blank" rel="noopener">${esc(sc.n)} · ${Math.round(sc.s)} pts${sc.t === "up" ? " ↑" : sc.t === "down" ? " ↓" : ""}</a></span></div>`);
    return rows.join("");
  }
  function connEditHTML() {
    const hidden = new Set(prefs.connHidden || []);
    const all = orderedConns();
    const list = [...all.filter((c) => !hidden.has(c.id)), ...all.filter((c) => hidden.has(c.id))];  // 숨긴 건 아래로
    const aslNames = useAsl() ? (prefs.asl?.rows || []).map((r) => r.n).sort((x, y) => x.localeCompare(y)) : [];
    const igxNames = useIgx() ? (prefs.igx?.ids || []).slice().sort((x, y) => x.localeCompare(y)) : [];
    const pick = (c, names, pins, label, attr) => {
      if (!names.length) return "";
      const pin = pins?.[c.id] || "";
      const auto = !pin ? matchName(c.model, names, null) : null;
      return `<select class="mlh-input mlh-cedit-asl" ${attr}="${esc(c.id)}" aria-label="${label} 점수 모델">
        <option value=""${!pin ? " selected" : ""}>${label}: auto${!pin ? (auto ? ` (${esc(auto)})` : " (not found)") : ""}</option>
        <option value="none"${pin === "none" ? " selected" : ""}>${label}: hide</option>
        ${names.map((n) => `<option value="${esc(n)}"${pin === n ? " selected" : ""}>${esc(n)}</option>`).join("")}</select>`;
    };
    const body = list.map((c) => `<div class="mlh-cedit-row${hidden.has(c.id) ? " is-hidden" : ""}" data-cid="${esc(c.id)}">
        <span class="mlh-cedit-handle" title="끌어서 순서 바꾸기" aria-label="끌어서 순서 바꾸기">⠿</span>
        <label class="mlh-cedit-main"><input type="checkbox" data-cshow="${esc(c.id)}" ${hidden.has(c.id) ? "" : "checked"}>
          <span class="mlh-cedit-txt"><span class="mlh-conn-name">${esc(c.name || "Connection")}</span><span class="mlh-conn-model">${esc(c.model || "")}</span></span></label>
        <input type="text" class="mlh-input mlh-cedit-asl" list="mlh-igx-ids" data-cigx="${esc(c.id)}" data-fk="cigx-${esc(c.id)}" value="${esc(prefs.connIgx?.[c.id] || "")}" placeholder="LIVE: auto${(() => { const a = matchName(c.model, igxNames, null) || (prefs.igx?.data?.[igxGuess(c.model)] ? igxGuess(c.model) : ""); return a ? ` (${esc(a)})` : " (not found)"; })()}" aria-label="IGX 모델 이름 (비우면 자동, none이면 안 보기)" autocomplete="off" spellcheck="false">${pick(c, aslNames, prefs.connAsl, "ASL", "data-casl")}
      </div>`).join("");
    const src = `<div class="mlh-asl-set"><div class="mlh-asl-set-title">실시간 점수 중계 주소 (선택)</div>
        <input type="text" class="mlh-input" data-fk="igxurl" data-igxurl placeholder="예: https://내이름.workers.dev" value="${esc(prefs.igxUrl || "")}" autocomplete="off" spellcheck="false">
        <div class="mlh-asl-hint">비워 두면 점수 없이 연결 목록만 보여요 · 넣는 법은 설명서 참고 ♡</div>
        ${igx.err ? `<div class="mlh-asl-hint is-err">${esc(igx.err)}</div>` : ""}</div>`;
    const set = !useAsl() ? src : src + `<div class="mlh-asl-set">
        <div class="mlh-asl-set-title">AI Stupid Level 점수</div>
        <input type="text" class="mlh-input" data-fk="aslurl" data-aslurl placeholder="서버 프록시 주소 (예: /asl-proxy)" value="${esc(prefs.aslUrl || "")}" autocomplete="off" spellcheck="false">
        <input type="password" class="mlh-input" data-fk="aslkey" data-aslkey placeholder="asl_live_… API 키 (프록시를 쓰면 비워 두기)" value="${esc(prefs.aslKey || "")}" autocomplete="off" spellcheck="false">
        <div class="mlh-asl-set-row">
          <select class="mlh-input" data-aslhours>
            <option value="3"${Number(prefs.aslHours) !== 1 ? " selected" : ""}>3시간마다 (무료 키)</option>
            <option value="1"${Number(prefs.aslHours) === 1 ? " selected" : ""}>1시간마다 (Pro 키)</option>
          </select>
          <button type="button" class="mlh-link" data-act="asl-now">지금 갱신</button>
        </div>
        <div class="mlh-asl-hint">키는 <a href="${ASL_SITE}/account/data-keys" target="_blank" rel="noopener">여기</a>에서 무료로 만들 수 있어요. 무료 키는 하루 10회까지라 3시간 주기를 써 주세요. 브라우저가 막으면 서버 프록시 주소를 위 칸에 넣어 주세요.</div>
        ${asl.err ? `<div class="mlh-asl-hint is-err">${esc(asl.err)}</div>` : ""}
      </div>`;
    return `<div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="signal">My LLMs</h2><button type="button" class="mlh-link" data-act="conns-done">Done</button></div>
      <div class="mlh-cedit">${body || `<div class="mlh-empty">No connections yet.</div>`}</div>${set}
      <datalist id="mlh-igx-ids"><option value="none">hide</option>${igxNames.map((n) => `<option value="${esc(n)}"></option>`).join("")}</datalist>`;
  }
  function connHTML() {
    if (editingConns) return connEditHTML();
    const chat = data.feed[0]?.chat;
    const curId = chat?.connectionId || "";
    const hidden = new Set(prefs.connHidden || []);
    const all = orderedConns();
    const conns = all.filter((c) => !hidden.has(c.id));
    const host = (u) => { try { return new URL(u).host; } catch { return u || "-"; } };
    const hid = all.length - conns.length;
    const head = `<div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="signal">My LLMs</h2><span class="mlh-count">${conns.length}${hid ? ` · hidden ${hid}` : ""}</span><button type="button" class="mlh-link" data-act="conns-edit">Edit</button></div>`;
    if (!all.length) return head + `<div class="mlh-empty">No connections yet.</div>`;
    const note = curId === "random" ? `<div class="mlh-empty" style="padding-top:0">Your latest chat uses a <b>random</b> connection.</div>` : "";
    const list = conns.length ? `<div class="mlh-conns">${conns.map((c) => {
      const tags = [c.id === curId ? "NOW" : "", truthy(c.isDefault) ? "DEFAULT" : "", truthy(c.useForRandom) ? "RANDOM" : ""].filter(Boolean)
        .map((t) => `<span class="mlh-badge">${t}</span>`).join("");
      const score = pillsHTML(c);
      const gv = useIgx() ? igxFor(c)?.s : (useAsl() ? aslFor(c)?.s : null);
      const gauge = gv != null ? `<span class="mlh-gauge ${scoreCls(gv)}" style="--v:${Math.max(0, Math.min(100, Math.round(gv)))}%" title="score ${Math.round(gv)}"><i></i></span>` : "";
      const open = openConn === c.id;
      const detail = open ? `<div class="mlh-conn-detail">
          <div class="mlh-conn-row"><span>Model</span><span>${esc(c.model || "-")}</span></div>
          <div class="mlh-conn-row"><span>Provider</span><span>${esc(c.provider || "-")}</span></div>
          ${c.baseUrl ? `<div class="mlh-conn-row"><span>Host</span><span>${esc(host(c.baseUrl))}</span></div>` : ""}
          ${c.maxContext ? `<div class="mlh-conn-row"><span>Context</span><span>${esc(Number(c.maxContext).toLocaleString("en-US"))}</span></div>` : ""}
          ${scoreRowsHTML(c)}
        </div>` : "";
      return `<div role="button" tabindex="0" aria-expanded="${open}" class="mlh-conn${open ? " is-open" : ""}${c.id === curId ? " is-cur" : ""}" data-conn="${esc(c.id)}">
          <span class="mlh-conn-top"><span class="mlh-conn-name">${esc(c.name || "Connection")}</span>${score}${tags}<span class="mlh-conn-caret">${open ? "▴" : "▾"}</span></span>
          <span class="mlh-conn-model">${esc(c.model || "")}</span>${gauge}${detail}</div>`;
    }).join("")}</div>` : `<div class="mlh-empty">All connections are hidden. Turn them back on in Edit.</div>`;
    return head + note + list + aslFootHTML();
  }
  /* ── 메모 여러 장 + 보관함 ── */
  const MEMO_MAX = 8;
  let memoView = "edit";
  const newMemoId = () => "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  function ensureMemos() {
    if (!Array.isArray(prefs.memos) || !prefs.memos.length) prefs.memos = [{ id: newMemoId(), text: prefs.memo || "", at: Date.now() }];
    if (!Array.isArray(prefs.memoArchive)) prefs.memoArchive = [];
    if (!prefs.memos.some((m) => m.id === prefs.memoCur)) prefs.memoCur = prefs.memos[0].id;
  }
  const curMemo = () => prefs.memos.find((m) => m.id === prefs.memoCur) || prefs.memos[0];
  const memoTitle = (t) => (String(t || "").split("\n").find((l) => l.trim()) || "").trim().slice(0, 10) || "New memo";
  function memoHTML() {
    ensureMemos();
    if (memoView === "archive") {
      const list = prefs.memoArchive.slice().sort((a, b) => (b.archivedAt || 0) - (a.archivedAt || 0));
      const body = list.length
        ? `<ul class="mlh-march">${list.map((m) => `<li>
            <div class="mlh-march-main"><b>${esc(memoTitle(m.text))}</b><span>${esc(String(m.text || "").replace(/\s+/g, " ").slice(0, 90))}</span><em>${esc(ago(new Date(m.archivedAt || m.at || Date.now()).toISOString()))} saved</em></div>
            <div class="mlh-march-act"><button type="button" class="mlh-link" data-mrestore="${esc(m.id)}">Restore</button><button type="button" class="mlh-link" data-mdel="${esc(m.id)}">Delete</button></div>
          </li>`).join("")}</ul>`
        : `<div class="mlh-empty">No saved memos yet.</div>`;
      return `<div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="pencil">Memo Archive</h2><button type="button" class="mlh-link" data-act="memo-back">Back</button></div>${body}`;
    }
    const cur = curMemo();
    const tabs = prefs.memos.map((m) => `<button type="button" class="mlh-mtab${m.id === cur.id ? " is-cur" : ""}" data-mtab="${esc(m.id)}">${esc(memoTitle(m.text))}</button>`).join("")
      + (prefs.memos.length < MEMO_MAX ? `<button type="button" class="mlh-mtab mlh-mtab-add" data-act="memo-new" title="New memo" aria-label="New memo">＋</button>` : "");
    const n = prefs.memoArchive.length;
    return `<div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="pencil">Memo</h2><span class="mlh-saved"></span><button type="button" class="mlh-link" data-act="memo-archive-view">Archive${n ? ` ${n}` : ""}</button></div>
      <div class="mlh-mtabs">${tabs}</div>
      <div class="mlh-memowrap"><textarea class="mlh-memo" data-fk="memo" placeholder="여기에 무엇이든 적어보세요.&#10;이 공간은, 당신의 작은 기록을 위한 곳이에요. ♡">${esc(cur.text)}</textarea></div>
      <div class="mlh-mfoot"><button type="button" class="mlh-link" data-act="memo-archive">SAVE ♡</button></div>`;
  }
  function memoAct(act, id) {
    ensureMemos();
    if (act === "memo-new") {
      if (prefs.memos.length >= MEMO_MAX) return;
      const m = { id: newMemoId(), text: "", at: Date.now() };
      prefs.memos.push(m); prefs.memoCur = m.id;
    } else if (act === "memo-archive") {
      const cur = curMemo();
      prefs.memos = prefs.memos.filter((m) => m.id !== cur.id);
      if (String(cur.text || "").trim()) prefs.memoArchive.push({ ...cur, archivedAt: Date.now() });   // 빈 메모는 그냥 닫기
      if (!prefs.memos.length) prefs.memos = [{ id: newMemoId(), text: "", at: Date.now() }];
      prefs.memoCur = prefs.memos[Math.max(0, prefs.memos.length - 1)].id;
    } else if (act === "memo-archive-view") memoView = "archive";
    else if (act === "memo-back") memoView = "edit";
    else if (act === "tab") prefs.memoCur = id;
    else if (act === "restore") {
      if (prefs.memos.length >= MEMO_MAX) { alert(`메모는 ${MEMO_MAX}장까지 펼쳐 둘 수 있어요. 하나를 보관한 뒤 꺼내 주세요.`); return; }
      const m = prefs.memoArchive.find((x) => x.id === id);
      if (!m) return;
      prefs.memoArchive = prefs.memoArchive.filter((x) => x.id !== id);
      const { archivedAt, ...rest } = m;
      prefs.memos.push(rest); prefs.memoCur = rest.id; memoView = "edit";
    } else if (act === "delete") {
      if (!confirm("이 메모를 완전히 지울까요? 되돌릴 수 없어요.")) return;
      prefs.memoArchive = prefs.memoArchive.filter((x) => x.id !== id);
    }
    savePrefs(); render();
    if (act === "memo-new") root?.querySelector(".mlh-memo")?.focus();
  }

  function playHTML() {
    const tabs = browserTabs();
    if (!tabs.length) return "";
    return `<section class="mlh-card"><div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="ribbon">Play</h2></div>
      <div class="mlh-shorts">${tabs.map((t) => `<button type="button" class="mlh-short" data-btab="${esc(t.id)}">
        ${t.fresh ? '<i class="mlh-dot" title="새 소식"></i>' : ""}<span class="mlh-short-ico">${t.icon ? `<img src="${esc(t.icon)}" alt="">` : '<i class="mlh-pxi"></i>'}</span>${esc(t.label)}</button>`).join("")}</div></section>`;
  }
  function shortsHTML() {
    const found = launchers();
    if (editingShorts) {
      const names = Array.from(new Set([...found.keys(), ...prefs.shortcuts]));
      const body = names.length
        ? `<div class="mlh-pick">${names.map((n) => `<label><input type="checkbox" data-pick="${esc(n)}" ${prefs.shortcuts.includes(n) ? "checked" : ""}>${esc(n)}${found.has(n) ? "" : " (not visible now)"}</label>`).join("")}</div>`
        : `<div class="mlh-empty">No extension buttons found on screen. Turn an extension on and try again.</div>`;
      return `<div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="ribbon">Shortcuts</h2><button type="button" class="mlh-link" data-act="shorts-done">Done</button></div>${body}`;
    }
    const tiles = prefs.shortcuts.length
      ? `<div class="mlh-shorts">${prefs.shortcuts.map((n) => `<button type="button" class="mlh-short" data-launch="${esc(n)}"><span class="mlh-short-ico">${iconOf(found.get(n))}</span>${esc(n)}</button>`).join("")}</div>`
      : `<div class="mlh-empty">Tap Edit to pick extensions for your home ♡</div>`;
    return `<div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="ribbon">Shortcuts</h2><button type="button" class="mlh-link" data-act="shorts-edit">Edit</button></div>${tiles}`;
  }


  /* ═══ 📷 사진(폴라로이드) · 📅 달력 위젯 ═══
     prefs.wid = [{ id, kind: "photo"|"cal", col: 0|1, slot: 0~3, … }]
     slot = 그 줄에서 위에 있는 기본 카드 수 (0 = 맨 위, 3 = 맨 아래)
     사진 파일은 서버 전체 갤러리(/api/global-gallery)의 「말랑 홈 사진」 폴더에 올리고, 여기엔 주소만 저장 */
  const WID_MAX_PHOTO = 8;
  const PHOTO_FOLDER = "말랑 홈 사진";
  const TAPES = ["coral", "peach", "mint", "butter", "none"];
  const TAPE_NAME = { coral: "Coral", peach: "Peach", mint: "Mint", butter: "Butter", none: "None" };
  let widEdit = null, widDel = null, padd = null;   // padd: { target: null|id, busy, err, gal: null|[] }
  let fileIn = null;
  const wid = () => (Array.isArray(prefs.wid) ? prefs.wid : (prefs.wid = []));
  const widById = (id) => wid().find((w) => w.id === id);
  const newWid = () => "w" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

  async function apiSend(path, opt = {}) {
    const r = await fetch("/api" + path, { credentials: "same-origin", ...opt, headers: { ...headers(), "x-marinara-csrf": "1", ...(opt.headers || {}) } });
    if (!r.ok) { let m = ""; try { m = (await r.json())?.error || ""; } catch { /* 무시 */ } throw new Error(m || `${path} ${r.status}`); }
    return r.status === 204 ? null : r.json();
  }
  async function photoFolder() {
    const list = await api("/global-gallery/folders");
    const f = (Array.isArray(list) ? list : []).find((x) => x?.name === PHOTO_FOLDER);
    if (f) return f.id;
    const made = await apiSend("/global-gallery/folders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: PHOTO_FOLDER }) });
    return made?.id || "";
  }
  /* 기기 사진 → 긴 변 1600px WebP(안 되면 JPG)로 줄여서 업로드 · 움짤 GIF는 그대로 */
  async function shrink(file) {
    if (file.type === "image/gif" && file.size < 8e6) return { blob: file, ext: ".gif" };
    let src;
    try { src = await createImageBitmap(file, { imageOrientation: "from-image" }); }
    catch {
      src = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error("이 사진 형식은 열 수 없어요")); i.src = URL.createObjectURL(file); });
    }
    const W = src.width, H = src.height, k = Math.min(1, 1600 / Math.max(W, H));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(W * k)); c.height = Math.max(1, Math.round(H * k));
    c.getContext("2d").drawImage(src, 0, 0, c.width, c.height);
    try { src.close?.(); } catch { /* 무시 */ }
    for (const type of ["image/webp", "image/jpeg"]) {
      const blob = await new Promise((r) => c.toBlob(r, type, 0.86));
      if (blob && blob.type === type) return { blob, ext: type === "image/webp" ? ".webp" : ".jpg", w: c.width, h: c.height };
    }
    throw new Error("사진을 줄이지 못했어요");
  }
  async function uploadPhoto(file) {
    if (!padd) return;
    padd.busy = "Resizing photo…"; padd.err = ""; render();
    try {
      const s = await shrink(file);
      padd.busy = "Uploading…"; render();
      const folderId = await photoFolder();
      const fd = new FormData();
      if (s.w) { fd.append("width", String(s.w)); fd.append("height", String(s.h)); }
      fd.append("prompt", "말랑 홈 사진 위젯");
      fd.append("file", s.blob, "mallang-home" + s.ext);
      const img = await apiSend(`/global-gallery/upload?folderId=${encodeURIComponent(folderId || "root")}`, { method: "POST", body: fd });
      placePhoto({ gid: img.id, url: img.url, own: true, ar: s.w && s.h ? +(s.w / s.h).toFixed(3) : (img.width && img.height ? +(img.width / img.height).toFixed(3) : 0) });
    } catch (err) {
      if (padd) { padd.busy = ""; padd.err = /404/.test(String(err?.message)) ? "This server has no gallery yet (update Mallangnara)" : "Upload failed: " + (err?.message || err); }
      render();
    }
  }
  async function loadGallery() {
    if (!padd) return;
    padd.gal = "loading"; render();
    try {
      const rows = await api("/global-gallery/");
      if (padd) padd.gal = (Array.isArray(rows) ? rows : []).filter((x) => x?.url).slice(0, 30);
    } catch (err) { if (padd) { padd.gal = null; padd.err = "Couldn't load gallery: " + (err?.message || err); } }
    render();
  }
  /* [개인 패치: 채팅 갤러리] */
  /* 롤플 방에서 생성된 이미지를 사진 위젯에 쓰기. 방마다 /api/gallery/:chatId 를 물어 합친다(서버에 통합 API는 없음).
     padd.cmode = "all" | 방 id · padd.galMsg = 진행 글 · padd.cgalAll = 받아 둔 전체 목록, padd.gal 은 그중 펼친 앞부분(「＋ More」로 80장씩 더)
     고른 사진은 own:false 라 지워지지 않는다(방을 지우면 사진도 같이 사라짐) */
  const CGAL_PAGE = 80, CGAL_PAR = 6, CGAL_THUMB = 320;
  let cgalSeq = 0;
  function cgalChats() {
    return data.index.filter((x) => x.k === "chat").slice().sort((a, b) => (Date.parse(b.at || "") || 0) - (Date.parse(a.at || "") || 0));
  }
  function cgalShow(n) {   // 받아 둔 목록에서 앞 n장만 격자에 올린다
    if (!padd || !Array.isArray(padd.cgalAll)) return;
    padd.cgalN = Math.min(Math.max(n | 0, CGAL_PAGE), padd.cgalAll.length);
    padd.gal = padd.cgalAll.slice(0, padd.cgalN);
  }
  async function loadChatGallery(mode) {
    if (!padd) return;
    const seq = ++cgalSeq;
    padd.cmode = mode || "all"; padd.gal = "loading"; padd.cgalAll = null; padd.err = ""; padd.galMsg = ""; render();
    try {
      let chats = cgalChats();
      if (!chats.length) {
        const rows = await api("/chats").catch(() => []);
        chats = (Array.isArray(rows) ? rows : []).map((c) => ({ k: "chat", id: c.id, name: c.name || "채팅", sub: (MODE[c.mode] || ["CHAT"])[0], at: c.updatedAt || "" }));
      }
      const targets = padd.cmode === "all" ? chats : chats.filter((c) => c.id === padd.cmode);
      const out = [], seen = new Set();
      let done = 0;
      const one = async (c) => {
        const rows = await api(`/gallery/${encodeURIComponent(c.id)}`).catch(() => []);
        for (const x of Array.isArray(rows) ? rows : []) {
          if (!x?.url || !x.id || seen.has(x.id)) continue;
          seen.add(x.id);
          out.push({ id: x.id, url: x.url, thumb: x.url + (x.url.includes("?") ? "&" : "?") + "w=" + CGAL_THUMB,
            width: x.width, height: x.height, at: x.createdAt || "", chat: c.name, prompt: String(x.prompt || "") });
        }
        done++;
      };
      for (let i = 0; i < targets.length; i += CGAL_PAR) {
        await Promise.all(targets.slice(i, i + CGAL_PAR).map(one));
        if (!padd || seq !== cgalSeq) return;
        if (targets.length > CGAL_PAR && done < targets.length) { padd.galMsg = `Loading chat images… ${done}/${targets.length} rooms`; render(); }
      }
      out.sort((a, b) => (Date.parse(b.at) || 0) - (Date.parse(a.at) || 0));
      padd.cgalAll = out; padd.galMsg = ""; cgalShow(CGAL_PAGE);
    } catch (err) { if (padd && seq === cgalSeq) { padd.gal = null; padd.cgalAll = null; padd.galMsg = ""; padd.err = "Couldn't load chat images: " + (err?.message || err); } }
    if (padd && seq === cgalSeq) render();
  }
  function placePhoto(img) {
    const t = padd?.target ? widById(padd.target) : null;
    if (t) {
      if (t.own && t.gid && t.gid !== img.gid) apiSend(`/global-gallery/${encodeURIComponent(t.gid)}`, { method: "DELETE" }).catch(() => {});
      Object.assign(t, { gid: img.gid, url: img.url, own: !!img.own, ar: img.ar || 0, fy: 50 });
    } else {
      wid().push({ id: newWid(), kind: "photo", col: 1, slot: 3, gid: img.gid, url: img.url, own: !!img.own, ar: img.ar || 0,
        pw: 100, ph: "m", al: "c", tilt: -1.5, tape: "coral", fy: 50, cap: "" });
      widEdit = wid()[wid().length - 1].id;
    }
    padd = null; savePrefs(); render();
  }
  function pickFile(target) {
    if (!fileIn) {
      fileIn = document.createElement("input");
      fileIn.type = "file"; fileIn.accept = "image/*"; fileIn.hidden = true;
      fileIn.addEventListener("change", () => { const f = fileIn.files?.[0]; fileIn.value = ""; if (f) uploadPhoto(f); });
      document.body.appendChild(fileIn);
      cleanups.push(() => { fileIn?.remove(); fileIn = null; });
    }
    padd = padd || { target, busy: "", err: "", gal: null };
    fileIn.click();
  }

  /* 줄 안 순서: 기본 카드(숫자)와 위젯을 한 줄로 펼쳐 놓고 옆 칸과 자리 바꾸기 */
  const COL_CARDS = 3;
  function colSeq(col) {
    const ws = wid().filter((w) => w.col === col), seq = [];
    for (let i = 0; i <= COL_CARDS; i++) {
      for (const w of ws) if (Math.min(Math.max(0, w.slot | 0), COL_CARDS) === i) seq.push(w);
      if (i < COL_CARDS) seq.push(i);
    }
    return seq;
  }
  function moveWid(id, dir) {
    const w = widById(id); if (!w) return;
    const seq = colSeq(w.col), i = seq.indexOf(w), j = i + dir;
    if (j < 0 || j >= seq.length) return;
    [seq[i], seq[j]] = [seq[j], seq[i]];
    let cards = 0; const order = [];
    for (const x of seq) { if (typeof x === "number") cards++; else { x.slot = cards; order.push(x); } }
    prefs.wid = [...wid().filter((x) => x.col !== w.col), ...order];
  }
  function colHTML(col, cards) {
    return colSeq(col).map((x) => (typeof x === "number" ? cards[x] : widHTML(x))).join("");
  }
  function moveTools(w) { return ""; }

  function chips(label, act, w, key, opts) {
    return `<div class="mlh-tabs"><span class="mlh-ptl">${label}</span>${opts.map(([v, t]) =>
      `<button type="button" data-wa="${act}" data-wid="${w.id}" data-v="${v}" aria-pressed="${String(w[key]) === String(v)}">${t}</button>`).join("")}</div>`;
  }
  function delTools(w, what) {
    return widDel === w.id
      ? `<div class="mlh-pdel">${what} <button type="button" class="mlh-link mlh-danger" data-wa="delok" data-wid="${w.id}">Yes, delete</button><button type="button" class="mlh-link" data-wa="delno" data-wid="${w.id}">Cancel</button></div>`
      : "";
  }
  function widHTML(w) {
    return w.kind === "cal" ? calHTML(w) : w.kind === "music" ? musicHTML(w) : w.kind === "weather" ? weatherHTML(w) : w.kind === "rcpt" ? rcptHTML(w) : w.kind === "credit" ? creditHTML(w) : photoHTML(w);
  }

  /* ── 📷 폴라로이드 ── */
  function photoHTML(w) {
    const ed = widEdit === w.id;
    const h = { s: "9.5rem", m: "14rem", l: "20rem" }[w.ph] || "";
    const st = `--pw:${[50, 75, 100].includes(w.pw) ? w.pw : 100}%;--tilt:${Number(w.tilt) || 0}deg;${h ? `--ph:${h};` : ""}--ar:${w.ar || 1};`;
    const tools = ed ? `<div class="mlh-ptools">
        ${moveTools(w)}
        ${chips("Width", "pw", w, "pw", [[50, "½"], [75, "¾"], [100, "Full"]])}
        ${w.pw < 100 ? chips("Align", "al", w, "al", [["l", "Left"], ["c", "Center"], ["r", "Right"]]) : ""}
        ${chips("Height", "ph", w, "ph", [["s", "Short"], ["m", "Mid"], ["l", "Tall"], ["o", "Original"]])}
        ${chips("Tilt", "tilt", w, "tilt", [[-3, "↶↶"], [-1.5, "↶"], [0, "Straight"], [1.5, "↷"], [3, "↷↷"]])}
        ${chips("Tape", "tape", w, "tape", TAPES.map((t) => [t, `<i class="mlh-tdot" data-t="${t}"></i>${TAPE_NAME[t]}`]))}
        ${w.ph !== "o" ? `<label class="mlh-prange"><span class="mlh-ptl">Focus</span><input type="range" min="0" max="100" value="${Number(w.fy ?? 50)}" data-wfy="${w.id}"><em>Top ↔ Bottom</em></label>` : ""}
        ${padd && padd.target === w.id ? paddHTML() : ""}
        <div class="mlh-pfoot">
          <button type="button" class="mlh-link" data-wa="replace" data-wid="${w.id}">Change photo</button>
          <button type="button" class="mlh-link" data-wa="del" data-wid="${w.id}">Delete</button>
          <button type="button" class="mlh-link mlh-strong" data-wa="done" data-wid="${w.id}">Done</button>
        </div>
        ${delTools(w, w.own ? "Delete this widget and its uploaded photo?" : "Delete this widget? (the gallery photo stays)")}
      </div>` : "";
    return `<section class="mlh-photo${ed ? " is-edit" : ""}" data-al="${w.pw < 100 ? w.al || "c" : "c"}" data-h="${w.ph || "m"}" style="${st}">
      <figure class="mlh-pol" data-tape="${TAPES.includes(w.tape) ? w.tape : "coral"}">
        <div class="mlh-bp-head"><span class="mlh-bp-brand"><b>MALLANG HOME</b><em>SPACE JOURNAL</em></span><span class="mlh-bp-to">✦ BOARDING PASS<br>TO A KINDER UNIVERSE</span></div>
        <div class="mlh-pol-img">${w.url ? `<img src="${esc(w.url)}" alt="" draggable="false" style="object-position:50% ${Number(w.fy ?? 50)}%">` : ""}</div>
        <figcaption><textarea class="mlh-pcap" data-fk="pcap-${w.id}" data-wcap="${w.id}" rows="1" maxlength="160" spellcheck="false" placeholder="a date or a little note ♡">${esc(w.cap || "")}</textarea></figcaption>
        ${bpStub(w)}
        <button type="button" class="mlh-pedit" data-wa="${ed ? "done" : "edit"}" data-wid="${w.id}" title="${ed ? "Close" : "Decorate"}" aria-label="Decorate">${ed ? "✓" : "✎"}</button>
      </figure>${tools}
    </section>`;
  }
  function bpStub(w) {
    const d = new Date(), seat = String(wid().filter((x) => x.kind === "photo").indexOf(w) + 1).padStart(2, "0") + "A";
    const date = `${d.getDate()} ${MON[d.getMonth()].toUpperCase()} ${d.getFullYear()}`;
    return `<div class="mlh-bp-stub"><span><em>FLIGHT</em>MH-${new Date(prefs.since || Date.now()).getFullYear()}</span><span><em>DATE</em>${date}</span><span><em>SEAT</em>${seat}</span></div>
        <div class="mlh-bp-code"><i class="mlh-barcode"></i><span>✦ &nbsp;SAME MOON,<br>DIFFERENT STORIES.</span></div>`;
  }
  function paddHTML() {
    const g = padd.gal;
    const cgalRest = Array.isArray(g) && Array.isArray(padd.cgalAll) ? padd.cgalAll.length - g.length : 0;
    const cgalMore = cgalRest > 0 ? `<button type="button" class="mlh-pgal-more" data-wa="cgalmore" title="Show ${Math.min(cgalRest, CGAL_PAGE)} more photos" style="font:inherit;font-size:.72rem;line-height:1.35;color:var(--ink);border:1px dashed var(--line);display:grid;place-items:center;text-align:center">＋ More<br><small>${g.length} / ${padd.cgalAll.length}</small></button>` : "";
    const gal = g === "loading" ? `<div class="mlh-empty">${esc(padd.galMsg || "Loading gallery…")}</div>`
      : Array.isArray(g) ? (g.length ? `<div class="mlh-pgal">${g.map((x, i) => `<button type="button" data-wa="galpick" data-v="${i}" title="${esc(x.chat ? x.chat + (x.prompt ? " · " + x.prompt.slice(0, 100) : "") : "Use this photo")}"><img src="${esc(x.thumb || x.url)}" alt="" loading="lazy"></button>`).join("")}${cgalMore}</div>` : `<div class="mlh-empty">${padd.cmode ? "No generated images here yet." : "The gallery is empty."}</div>`)
      : "";
    return `<div class="mlh-padd">
      <div class="mlh-padd-btns">
        <button type="button" data-wa="dev" ${padd.busy ? "disabled" : ""}>📱 From device</button>
        <button type="button" data-wa="gal" ${padd.busy ? "disabled" : ""}>🖼 From gallery</button>
        <button type="button" data-wa="cgal" ${padd.busy ? "disabled" : ""}>💬 From chats</button>
        <button type="button" class="mlh-link" data-wa="paddx">Close</button>
      </div>
      ${padd.cmode ? `<label class="mlh-wxset"><span class="mlh-ptl">Chat room</span><select class="mlh-input" data-cgalsel style="max-width:100%"><option value="all"${padd.cmode === "all" ? " selected" : ""}>All chats · newest first</option>${cgalChats().map((c) => `<option value="${esc(c.id)}"${padd.cmode === c.id ? " selected" : ""}>${esc(c.name)} · ${esc(c.sub)}</option>`).join("")}</select></label>` : ""}
      ${padd.busy ? `<div class="mlh-empty">${esc(padd.busy)}</div>` : ""}${padd.err ? `<div class="mlh-empty mlh-perr">${esc(padd.err)}</div>` : ""}
      ${gal}
      <div class="mlh-phint">Photos are resized to 1600px and saved in the server gallery folder 「${PHOTO_FOLDER}」, so they show on every device.</div>
    </div>`;
  }

  /* ── 🎵 음악 플레이어 (꾸밈용 · 내가 적은 노래 목록을 넘겨 보기) ── */
  let musPlay = false;
  const songsOf = (w) => String(w.songs || "").split("\n").map((x) => x.trim()).filter(Boolean);
  function musicHTML(w) {
    const ed = widEdit === w.id, list = songsOf(w), n = list.length;
    const cur = n ? list[((w.cur | 0) % n + n) % n] : "Add songs in Edit ♪";
    const [title, artist] = cur.split(/\s+-\s+/);
    return `<section class="mlh-card mlh-music">
      <div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="note">Mallang Player</h2><button type="button" class="mlh-link" data-wa="${ed ? "done" : "edit"}" data-wid="${w.id}">${ed ? "Done" : "Edit"}</button></div>
      ${ed ? `<div class="mlh-ptools">${moveTools(w)}
        <label class="mlh-mlist"><span class="mlh-ptl">Songs</span><textarea class="mlh-input" data-fk="songs-${w.id}" data-wsongs="${w.id}" rows="4" placeholder="one per line · Title - Artist">${esc(w.songs || "")}</textarea></label>
        <div class="mlh-pfoot"><button type="button" class="mlh-link" data-wa="del" data-wid="${w.id}">Turn off</button></div>${delTools(w, "Turn off the player?")}</div>` : ""}
      <div class="mlh-mscreen${musPlay ? " is-play" : ""}">
        <i class="mlh-vinyl" aria-hidden="true"></i><i class="mlh-mhp" data-s="headphones"></i>
        <div class="mlh-mtitle"><span>${esc(title || cur)}</span></div>
        <div class="mlh-martist">${esc(artist || "")}</div>
        <div class="mlh-eq"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </div>
      <div class="mlh-mbar${musPlay ? " is-play" : ""}"><i></i></div>
      <div class="mlh-mmeta"><span>SIDE A</span><span>${n ? `${((w.cur | 0) % n + n) % n + 1} / ${n}` : "—"}</span></div>
      <div class="mlh-mctl">
        <button type="button" data-mus="-1" data-wid="${w.id}" aria-label="Previous"><i data-s="prev"></i></button>
        <button type="button" class="mlh-mplay" data-mus="0" data-wid="${w.id}" aria-label="${musPlay ? "Pause" : "Play"}"><i data-s="${musPlay ? "pause" : "play"}"></i></button>
        <button type="button" data-mus="1" data-wid="${w.id}" aria-label="Next"><i data-s="next"></i></button>
      </div>
    </section>`;
  }

  /* ── 📅 달력 ── */
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let calView = null, calSel = null, evDraft = { t: "", x: "" };     // calView: "YYYY-MM", calSel: "YYYY-MM-DD"
  const pad2 = (n) => String(n).padStart(2, "0");
  const ymd = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const evs = () => (Array.isArray(prefs.cal) ? prefs.cal : (prefs.cal = []));
  /* 1.19: 그날의 달 모양 (0 삭 · 1~3 차오름 · 4 보름 · 5~7 기욺) — 평균 삭망월로 계산 */
  function moonPh(y, m, d) {
    const age = (((Date.UTC(y, m - 1, d, 12) - Date.UTC(2000, 0, 6, 18, 14)) / 86400000) % 29.530589 + 29.530589) % 29.530589;
    return Math.round(age / 29.530589 * 8) % 8;
  }
  function calHTML(w) {
    const ed = widEdit === w.id;
    const today = ymd(new Date());
    calSel = calSel || today;
    calView = calView || calSel.slice(0, 7);
    const [Y, M] = calView.split("-").map(Number);
    const first = new Date(Y, M - 1, 1), days = new Date(Y, M, 0).getDate(), lead = first.getDay();
    const has = new Map();
    for (const e of evs()) has.set(e.d, (has.get(e.d) || 0) + 1);
    let cells = "";
    for (let i = 0; i < lead; i++) cells += `<span class="mlh-cday is-out"></span>`;
    for (let d = 1; d <= days; d++) {
      const k = `${Y}-${pad2(M)}-${pad2(d)}`, dow = (lead + d - 1) % 7;
      cells += `<button type="button" class="mlh-cday${k === today ? " is-today" : ""}${k === calSel ? " is-sel" : ""}${has.has(k) ? " has-ev" : ""}${dow === 0 ? " is-sun" : dow === 6 ? " is-sat" : ""}" data-cday="${k}" data-ph="${moonPh(Y, M, d)}">${d}</button>`;
    }
    const sorted = evs().slice().sort((a, b) => (a.d + (a.t || "99")).localeCompare(b.d + (b.t || "99")));
    const dayList = sorted.filter((e) => e.d === calSel);
    const upcoming = sorted.filter((e) => e.d > calSel).slice(0, 4);
    const evRow = (e) => {
      const [, m, d] = e.d.split("-").map(Number);
      return `<li class="mlh-ev"><b class="mlh-evd"><span>${d}</span><em>${MON[m - 1]}</em></b><span class="mlh-evt"><span>${esc(e.text)}</span>${e.t ? `<em>${esc(e.t)}</em>` : ""}</span><button type="button" class="mlh-evx" data-evdel="${esc(e.id)}" title="Delete" aria-label="Delete">×</button></li>`;
    };
    const [sy, sm, sd] = calSel.split("-").map(Number);
    const wk = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(sy, sm - 1, sd).getDay()];
    return `<section class="mlh-card mlh-calcard">
      <div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="cal">Calendar</h2>
        <button type="button" class="mlh-link" data-wa="${ed ? "done" : "edit"}" data-wid="${w.id}">${ed ? "Done" : "Edit"}</button></div>
      ${ed ? `<div class="mlh-ptools">${moveTools(w)}<div class="mlh-pfoot"><button type="button" class="mlh-link" data-wa="del" data-wid="${w.id}">Turn off</button></div>${delTools(w, "Turn off the calendar? (your plans stay)")}</div>` : ""}
      <div class="mlh-cal">
        <div class="mlh-cmonth">
          <div class="mlh-cnav"><button type="button" data-cnav="-1" aria-label="Previous month">◀</button><b>${MON[M - 1]} ${Y}</b><button type="button" data-cnav="1" aria-label="Next month">▶</button></div>
          <div class="mlh-cgrid"><i class="is-sun">S</i><i>M</i><i>T</i><i>W</i><i>T</i><i>F</i><i class="is-sat">S</i>${cells}</div>
          ${calView !== today.slice(0, 7) || calSel !== today ? `<button type="button" class="mlh-link mlh-ctoday" data-cday="${today}">Today</button>` : ""}
        </div>
        <div class="mlh-cside">
          <div class="mlh-cdayhead">${wk}, ${MON[sm - 1]} ${sd}</div>
          ${dayList.length ? `<ul class="mlh-evs">${dayList.map(evRow).join("")}</ul>` : `<div class="mlh-empty">Nothing planned ♡</div>`}
          <div class="mlh-evadd">
            <input type="time" class="mlh-input mlh-evtime" data-fk="evtime" aria-label="Time (optional)" value="${esc(evDraft.t)}">
            <input type="text" class="mlh-input mlh-evtext" data-fk="evtext" maxlength="80" placeholder="Add a plan or a note" autocomplete="off" value="${esc(evDraft.x)}">
            <button type="button" data-evadd>ADD</button>
          </div>
          ${upcoming.length ? `<div class="mlh-cdayhead mlh-cup">Upcoming</div><ul class="mlh-evs">${upcoming.map(evRow).join("")}</ul>` : ""}
        </div>
      </div>
    </section>`;
  }
  function addEv() {
    const tx = root?.querySelector(".mlh-evtext"), tm = root?.querySelector(".mlh-evtime");
    const text = (tx?.value || "").trim();
    if (!text) { tx?.focus(); return; }
    evs().push({ id: newWid(), d: calSel, t: tm?.value || "", text });
    evDraft = { t: "", x: "" };
    if (evs().length > 300) prefs.cal = evs().sort((a, b) => a.d.localeCompare(b.d)).slice(-300);
    savePrefs(); render();
    root?.querySelector(".mlh-evtext")?.focus();
  }


  /* ── ☀ 날씨 + 캐릭터 한마디 ──
     날씨: Open-Meteo (키 없음) · 위치는 이름 검색 또는 📍 현재 위치
     한마디: 마리나라 연결(편집에서 고름)로 봇카드를 읽고 한두 문장 — 오전 9시·오후 6시 자동 + ↻ */
  const WX_CODE = {
    0: ["Clear", "맑음", "sun"], 1: ["Mostly clear", "대체로 맑음", "sun"], 2: ["Partly cloudy", "구름 조금", "pcloud"], 3: ["Cloudy", "흐림", "cloud"],
    45: ["Fog", "안개", "fog"], 48: ["Fog", "안개", "fog"], 51: ["Drizzle", "이슬비", "rain"], 53: ["Drizzle", "이슬비", "rain"], 55: ["Drizzle", "이슬비", "rain"],
    56: ["Freezing drizzle", "어는 이슬비", "rain"], 57: ["Freezing drizzle", "어는 이슬비", "rain"], 61: ["Light rain", "약한 비", "rain"], 63: ["Rain", "비", "rain"], 65: ["Heavy rain", "강한 비", "rain"],
    66: ["Freezing rain", "어는 비", "rain"], 67: ["Freezing rain", "어는 비", "rain"], 71: ["Light snow", "약한 눈", "snow"], 73: ["Snow", "눈", "snow"], 75: ["Heavy snow", "많은 눈", "snow"], 77: ["Snow grains", "싸락눈", "snow"],
    80: ["Showers", "소나기", "rain"], 81: ["Showers", "소나기", "rain"], 82: ["Heavy showers", "강한 소나기", "rain"], 85: ["Snow showers", "눈 소나기", "snow"], 86: ["Snow showers", "눈 소나기", "snow"],
    95: ["Thunderstorm", "뇌우", "storm"], 96: ["Thunderstorm", "뇌우·우박", "storm"], 99: ["Thunderstorm", "뇌우·우박", "storm"],
  };
  const wx = { busy: false, err: "", gen: new Set(), genErr: "", retryAt: 0, q: "", results: null, searching: false, idx: 0 };
  const wxp = () => (prefs.wxs && typeof prefs.wxs === "object" ? prefs.wxs : (prefs.wxs = { loc: null, data: null, conn: "", fix: "", slot: "", cm: {} }));
  async function wxLoad(force) {
    const s = wxp();
    if (!s.loc || wx.busy) return;
    if (!force && s.data && Date.now() - (s.data.at || 0) < 30 * 60000) return;
    wx.busy = true;
    try {
      const u = `https://api.open-meteo.com/v1/forecast?latitude=${s.loc.lat}&longitude=${s.loc.lon}&current=temperature_2m,apparent_temperature,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=1`;
      const r = await fetch(u, { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      s.data = { at: Date.now(), t: j.current?.temperature_2m, f: j.current?.apparent_temperature, code: j.current?.weather_code, day: j.current?.is_day,
        hi: j.daily?.temperature_2m_max?.[0], lo: j.daily?.temperature_2m_min?.[0], pop: j.daily?.precipitation_probability_max?.[0] };
      wx.err = ""; savePrefs();
    } catch (e) { wx.err = "Couldn't load the weather"; }
    finally { wx.busy = false; render(); }
  }
  // 서울 25개 구는 지명 사전에 없을 때가 많아서 내장 (구청 근처 좌표)
  const SEOUL_GU = { 종로구: [37.573, 126.979], 중구: [37.564, 126.997], 용산구: [37.532, 126.990], 성동구: [37.563, 127.037], 광진구: [37.538, 127.082], 동대문구: [37.574, 127.040], 중랑구: [37.606, 127.093], 성북구: [37.589, 127.017], 강북구: [37.640, 127.011], 도봉구: [37.669, 127.047], 노원구: [37.654, 127.056], 은평구: [37.603, 126.929], 서대문구: [37.579, 126.937], 마포구: [37.566, 126.902], 양천구: [37.517, 126.866], 강서구: [37.551, 126.850], 구로구: [37.495, 126.888], 금천구: [37.457, 126.895], 영등포구: [37.526, 126.896], 동작구: [37.512, 126.940], 관악구: [37.478, 126.951], 서초구: [37.484, 127.033], 강남구: [37.517, 127.047], 송파구: [37.515, 127.106], 강동구: [37.530, 127.124] };
  async function wxSearch() {
    const q = wx.q.trim(); if (!q) return;
    wx.searching = true; wx.results = null; render();
    const out = [];
    const add = (x) => { if (out.some((y) => (y.name === x.name && Math.abs(y.lat - x.lat) < 0.1 && Math.abs(y.lon - x.lon) < 0.1) || (Math.abs(y.lat - x.lat) < 0.005 && Math.abs(y.lon - x.lon) < 0.005))) return; out.push(x); };
    const bare = q.replace(/\s+/g, "").replace(/^서울(특별시|시)?/, "");
    for (const [n, [lat, lon]] of Object.entries(SEOUL_GU)) {
      if (bare && (n === bare || n.replace(/구$/, "") === bare.replace(/구$/, ""))) add({ name: n, sub: "서울특별시", lat, lon });
    }
    // ① OpenStreetMap(Nominatim) — 구·동·읍·면 같은 행정구역까지 찾음
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=jsonv2&accept-language=ko&limit=6`);
      if (r.ok) for (const x of await r.json()) {
        const parts = String(x.display_name || "").split(",").map((v) => v.trim()).filter(Boolean);
        add({ name: x.name || parts[0] || q, sub: parts.slice(1, 4).join(" · "), lat: +(+x.lat).toFixed(4), lon: +(+x.lon).toFixed(4) });
      }
    } catch { /* 무시 */ }
    // ② Open-Meteo 지명 사전 — 도시·마을 이름
    try {
      const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=ko&format=json`);
      const j = await r.json();
      for (const x of j.results || []) add({ name: x.name, sub: [x.admin2, x.admin1, x.country].filter(Boolean).join(" · "), lat: +x.latitude.toFixed(4), lon: +x.longitude.toFixed(4) });
    } catch { /* 무시 */ }
    wx.results = out.slice(0, 8);
    wx.searching = false; render();
  }
  function wxHere() {
    if (!navigator.geolocation) { wx.err = "This browser can't share location"; render(); return; }
    wx.err = "Finding you…"; render();
    navigator.geolocation.getCurrentPosition((p) => {
      wxSetLoc({ name: "My location", lat: +p.coords.latitude.toFixed(3), lon: +p.coords.longitude.toFixed(3) });
    }, () => { wx.err = "Location permission was denied"; render(); }, { timeout: 15000, maximumAge: 3600000 });
  }
  function wxSetLoc(loc) { const s = wxp(); s.loc = loc; s.data = null; s.slot = ""; wx.results = null; wx.err = ""; savePrefs(); render(); wxLoad(true); }
  const wxSlotNow = () => {
    const d = new Date(), h = d.getHours();
    if (h < 9) { const y = new Date(d.getTime() - 86400000); return `${ymd(y)}-pm`; }
    return `${ymd(d)}-${h >= 18 ? "pm" : "am"}`;
  };
  function wxSpeakers() {
    const s = wxp(), out = [];
    if (s.fix && data.chars.get(s.fix)) return [{ charId: s.fix, chat: null }];
    for (const { chat, latestMessage } of data.feed || []) {
      const id = chat.characterIds?.[0];
      if (!id || !data.chars.get(id) || out.some((x) => x.charId === id)) continue;
      out.push({ charId: id, chat, last: latestMessage });
      if (out.length >= 3) break;
    }
    return out;
  }
  function cardText(row) {
    let d = row?.data;
    try { if (typeof d === "string") d = JSON.parse(d); } catch { d = {}; }
    d = d?.data && typeof d.data === "object" ? d.data : (d || {});
    const pick = (k, n) => String(d[k] || "").replace(/\{\{char\}\}/gi, d.name || "").trim().slice(0, n);
    return [["Name", pick("name", 80)], ["Description", pick("description", 2200)], ["Personality", pick("personality", 600)], ["Scenario", pick("scenario", 500)], ["Example dialogue", pick("mes_example", 800)]]
      .filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  }
  async function wxComment(sp) {
    const s = wxp(), w = s.data;
    if (!s.conn || !w || wx.gen.has(sp.charId)) return false;
    wx.gen.add(sp.charId); render();
    try {
      let row = data.chars.get(sp.charId)?.row;
      if (!row?.data || String(row.data).length < 40) row = await api("/characters/" + encodeURIComponent(sp.charId)).catch(() => row);
      const name = data.chars.get(sp.charId)?.name || "Character";
      const [, ko] = WX_CODE[w.code] || ["", "알 수 없음"];
      const now = new Date(), part = now.getHours() < 12 ? "morning" : now.getHours() < 18 ? "afternoon" : "evening";
      const last = sp.last ? cleanPreview(sp.last.content).slice(0, 300) : "";
      const sys = `You are ${name}. Stay fully in character.\n\n[Character card]\n${cardText(row) || name}`;
      const usr = `It's ${part} (${now.toLocaleString("ko-KR")}). Weather near the user (${s.loc?.name || ""}): ${ko}, ${Math.round(w.t)}°C (feels ${Math.round(w.f)}°C), high ${Math.round(w.hi)}°C / low ${Math.round(w.lo)}°C, chance of rain ${w.pop ?? 0}%.\n` +
        (last ? `Latest line from your recent chat with the user (for mood only): "${last}"\n` : "") +
        `Write ONE short message (1–2 sentences) to the user about today's weather, in Korean, in ${name}'s own voice, speech style and relationship with the user. Weave in one natural, practical tip (clothes, umbrella, etc.) if it fits. Output only the message — no narration, no name label, no quotes.`;
      const ask = async (maxTokens) => {
        const r = await fetch("/api/generate/raw", { method: "POST", credentials: "same-origin", headers: { ...headers(), "Content-Type": "application/json", "x-marinara-csrf": "1" },
          body: JSON.stringify({ connectionId: s.conn, messages: [{ role: "system", content: sys }, { role: "user", content: usr }], parameters: { maxTokens, temperature: 0.9 }, streaming: false }) });
        const j = await r.json().catch(() => ({}));
        const t = String(j.content || "").replace(/<think>[\s\S]*?<\/think>/g, "").trim().replace(/^["'“”]+|["'“”]+$/g, "").trim();
        if (!r.ok || !t) throw new Error(j.error || r.status);
        return t;
      };
      const whole = (t) => /[.!?。！？~…♡♥♪)\]」』"'”’>\u2026]$|[요다죠네까야지어아해게래걸데군나니라자봐줘워요]$/.test(t.replace(/[\s\p{Extended_Pictographic}\uFE0F]+$/u, ""));
      let text = await ask(4096);
      if (!whole(text)) { try { const t2 = await ask(8192); if (whole(t2) || t2.length > text.length) text = t2; } catch {} }
      if (!whole(text)) { const m = text.match(/^[\s\S]*[.!?。！？~…♡♥)」』”]/); if (m && m[0].length > 12) text = m[0]; }
      s.cm = { ...(s.cm || {}), [sp.charId]: { text: text.slice(0, 400), at: Date.now(), name } };
      wx.genErr = ""; savePrefs(); return true;
    } catch (e) { wx.genErr = "Couldn't write a comment: " + (e?.message || e); return false; }
    finally { wx.gen.delete(sp.charId); render(); }
  }
  async function wxAuto() {
    const s = wxp();
    if (!wid().some((x) => x.kind === "weather") || !s.loc) return;
    await wxLoad(false);
    const slot = wxSlotNow();
    if (!s.conn || !s.data || s.slot === slot || Date.now() < wx.retryAt || wx.gen.size) return;
    const sps = wxSpeakers(); if (!sps.length) return;
    let ok = 0;
    for (const sp of sps) { if (await wxComment(sp)) ok++; }
    if (ok) { s.slot = slot; savePrefs(); } else wx.retryAt = Date.now() + 15 * 60000;
    render();
  }
  function weatherHTML(w) {
    const ed = widEdit === w.id, s = wxp(), d = s.data;
    const [en, , ico0] = d ? (WX_CODE[d.code] || ["—", "", "cloud"]) : ["", "", "sun"];
    const night = !!d && !d.day;
    const ico = night && ico0 === "sun" ? "night" : night && ico0 === "pcloud" ? "ncloud" : ico0;
    const sps = wxSpeakers();
    wx.idx = Math.min(wx.idx, Math.max(0, sps.length - 1));
    const sp = sps[wx.idx], cm = sp ? s.cm?.[sp.charId] : null, ch = sp ? data.chars.get(sp.charId) : null;
    const conns = (data.conns || []);
    const charOpts = [...data.chars.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name));
    const tools = ed ? `<div class="mlh-ptools">${moveTools(w)}
        <div class="mlh-wxset"><span class="mlh-ptl">Location</span>
          <div class="mlh-wxrow"><input class="mlh-input" data-fk="wxq" data-wxq placeholder="e.g. 종로구, Seoul, Busan" value="${esc(wx.q)}" autocomplete="off"><button type="button" class="mlh-link mlh-strong" data-wxa="search">Search</button><button type="button" class="mlh-link" data-wxa="here">📍 Here</button></div>
          ${wx.searching ? `<div class="mlh-empty">Searching…</div>` : Array.isArray(wx.results) ? (wx.results.length ? `<div class="mlh-wxres">${wx.results.map((x, i) => `<button type="button" data-wxpick="${i}"><b>${esc(x.name)}</b><em>${esc(x.sub)}</em></button>`).join("")}</div>` : `<div class="mlh-empty">No match — try another spelling (English works too).</div>`) : ""}
          ${s.loc ? `<div class="mlh-empty">Now: <b>${esc(s.loc.name)}</b></div>` : ""}
        </div>
        <label class="mlh-wxset"><span class="mlh-ptl">Who talks</span><select class="mlh-input" data-wxfix><option value="">Recent chats (rotate)</option>${charOpts.map(([id, c]) => `<option value="${esc(id)}"${s.fix === id ? " selected" : ""}>${esc(c.name)}</option>`).join("")}</select></label>
        <label class="mlh-wxset"><span class="mlh-ptl">API</span><select class="mlh-input" data-wxconn><option value="">— pick a connection —</option>${conns.map((c) => `<option value="${esc(c.id)}"${s.conn === c.id ? " selected" : ""}>${esc(c.name || c.model || c.id)}</option>`).join("")}</select></label>
        <div class="mlh-empty">Comments refresh at 9 AM and 6 PM, or with ↻.</div>
        <div class="mlh-pfoot"><button type="button" class="mlh-link" data-wa="del" data-wid="${w.id}">Turn off</button></div>${delTools(w, "Turn off the weather?")}</div>` : "";
    const top = !s.loc ? `<div class="mlh-empty">Tap Edit and pick a location ☀</div>`
      : !d ? `<div class="mlh-empty">${esc(wx.err || "Loading weather…")}</div>`
      : `<div class="mlh-wxtop${night ? " is-night" : ""}"><div class="mlh-wxmain"><div class="mlh-wxt"><b>${Math.round(d.t * 10) / 10}°</b><span>${esc(en)}</span></div>
          <div class="mlh-wxsub">Feels ${Math.round(d.f)}° · H ${Math.round(d.hi)}° · L ${Math.round(d.lo)}° · Rain ${d.pop ?? 0}%</div>
          <div class="mlh-wxloc">${esc(s.loc.name)}</div></div><i class="mlh-wxico" data-s="wx-${ico}"></i></div>`;
    const busy = sp && wx.gen.has(sp.charId);
    const say = !s.loc ? "" : `<div class="mlh-wxsay">
        <div class="mlh-wxsay-head">${ch?.avatar ? `<img class="mlh-ava" src="${esc(ch.avatar)}" alt="">` : ""}<b>${esc(ch?.name || "")}</b><em>${cm ? esc(new Date(cm.at).toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })) : ""}</em>
          ${sps.length > 1 ? `<span class="mlh-wxnav"><button type="button" data-wxa="prev" aria-label="Previous">‹</button>${wx.idx + 1}/${sps.length}<button type="button" data-wxa="next" aria-label="Next">›</button></span>` : ""}
          <button type="button" class="mlh-wxre" data-wxa="re" title="New comment" aria-label="New comment"${busy ? " disabled" : ""}>↻</button></div>
        <div class="mlh-wxtext">${busy ? `<span class="mlh-wxdots">writing<i>.</i><i>.</i><i>.</i></span>` : cm ? esc(cm.text) : !s.conn ? "Pick an API in Edit so they can talk ♡" : !sp ? "No characters to talk yet." : "Tap ↻ to hear from them ♡"}</div>
        ${wx.genErr ? `<div class="mlh-empty mlh-perr">${esc(wx.genErr)}</div>` : ""}
      </div>`;
    return `<section class="mlh-card mlh-wxcard">
      <div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="${d ? "wx-" + ico : "sun"}">Weather</h2><button type="button" class="mlh-link" data-wa="${ed ? "done" : "edit"}" data-wid="${w.id}">${ed ? "Done" : "Edit"}</button></div>
      ${tools}${top}${say}</section>`;
  }
  function wxClick(t) {
    const pk = t.closest("[data-wxpick]");
    if (pk) { const x = wx.results?.[Number(pk.dataset.wxpick)]; if (x) wxSetLoc({ name: x.name, lat: x.lat, lon: x.lon }); return true; }
    const b = t.closest("[data-wxa]"); if (!b) return false;
    const a = b.dataset.wxa, sps = wxSpeakers();
    if (a === "search") wxSearch();
    else if (a === "here") wxHere();
    else if (a === "prev" || a === "next") { wx.idx = (wx.idx + (a === "next" ? 1 : -1) + sps.length) % Math.max(1, sps.length); render(); }
    else if (a === "re") { const sp = sps[wx.idx]; if (sp) { wxLoad(false).then(() => wxComment(sp)); } }
    return true;
  }


  /* ── 🧾 API 영수증 + 💳 크레딧(구글 클라우드 · 중계 API 잔액) ──
     영수증: 채팅 메시지(리롤 포함)에 마리나라가 적어 둔 토큰 수를 모아서, 내가 적은 모델 단가로 금액 계산
     크레딧: 구글 클라우드 = 내가 적은 잔액 − 그 뒤로 구글 모델에 쓴 예상 금액 / 중계 API = 키로 잔액 조회 */
  const AP_PAGE = 100, AP_DAYS_MAX = 92, AP_STALE = 10 * 60000, CR_MAX = 10;
  const SEP = "␟";
  // price: "사이트␟모델" → [입력, 출력] (그 사이트 통화, 100만 토큰당) · 옛 키("모델"만)는 달러로 모든 사이트에
  // siteCur: 사이트별 단가 통화 · disp: 영수증 표시 통화 · fx/fxc: 손으로 적은 환율(비우면 매일 받아 온 환율)
  const apw = () => {
    const p = prefs.apiw && typeof prefs.apiw === "object" ? prefs.apiw : (prefs.apiw = {});
    if (!p.price || typeof p.price !== "object") p.price = {};
    if (!p.siteCur || typeof p.siteCur !== "object") p.siteCur = {};
    if (!p.disp) p.disp = "KRW";
    if (p.fxv !== 2) { p.fxv = 2; if (Number(p.fx) === 1400) p.fx = ""; if (Number(p.fxc) === 195) p.fxc = ""; }
    return p;
  };
  /* ── 💱 환율: 하루 한 번 (open.er-api.com → 안 되면 frankfurter) ── */
  const fxs = { busy: false };
  async function fxLoad(force) {
    const P = apw(), r = P.rates;
    if (fxs.busy || (!force && r && r.day === ymd(new Date()))) return;
    fxs.busy = true;
    try {
      let k = 0, c = 0;
      try { const j = await getJ("https://open.er-api.com/v6/latest/USD"); k = Number(j.rates?.KRW); c = Number(j.rates?.CNY); } catch {}
      if (!(k > 0 && c > 0)) { const j = await getJ("https://api.frankfurter.app/latest?from=USD&to=KRW,CNY"); k = Number(j.rates?.KRW); c = Number(j.rates?.CNY); }
      if (k > 0 && c > 0) { P.rates = { day: ymd(new Date()), at: Date.now(), KRW: k, CNY: c }; savePrefs(); render(); }
    } catch { /* 다음에 */ } finally { fxs.busy = false; }
  }
  const usdKrw = () => { const P = apw(); return Number(P.fx) > 0 ? Number(P.fx) : Number(P.rates?.KRW) || 1400; };
  const cnyKrw = () => { const P = apw(); return Number(P.fxc) > 0 ? Number(P.fxc) : P.rates?.KRW && P.rates?.CNY ? P.rates.KRW / P.rates.CNY : 195; };
  const toUSD = (v, cur) => cur === "KRW" ? v / usdKrw() : cur === "CNY" ? v * cnyKrw() / usdKrw() : v;
  const fromUSD = (v, cur) => cur === "KRW" ? v * usdKrw() : cur === "CNY" ? v * usdKrw() / cnyKrw() : v;
  const CUR_SYM = { USD: "$", KRW: "₩", CNY: "CN¥" };
  const fmtCur = (v, cur) => v > 0 && v < (cur === "KRW" ? 0.5 : 0.0005) ? "<" + (cur === "KRW" ? "₩1" : (CUR_SYM[cur] || "$") + "0.001") : cur === "KRW" ? "₩" + Math.round(v).toLocaleString("ko-KR") : (CUR_SYM[cur] || "$") + (v >= 100 ? v.toFixed(0) : v >= 1 ? v.toFixed(2) : v.toFixed(3));

  /* ── 기본 단가 (공식 가격, 100만 토큰당 $) — 2026-10 기준 · 사이트마다 고쳐 적으면 그게 우선 ── */
  const DEF_PRICES = [
    [/opus.?5.?5|opus-5-5/i, [4, 20]], [/opus.?5\b|opus-5(?!\.)/i, [5, 25]], [/opus/i, [5, 25]],
    [/sonnet.?5/i, [2, 10]], [/sonnet/i, [3, 15]],
    [/haiku.?5/i, [0.1, 0.5]], [/haiku/i, [1, 5]],
    [/fable|mythos/i, [10, 50]],
    [/argon/i, () => Date.now() < Date.parse("2026-12-01T00:00:00-08:00") ? [2, 10] : [4, 20]],
    [/gemini.?3\.[678].?flash(?!.?lite)/i, () => Date.now() < Date.parse("2027-01-01T00:00:00-08:00") ? [0.75, 3.75] : [1.5, 7.5]],
    [/gemini.?3\.5.?flash.?lite/i, [0.3, 2.5]], [/gemini.?3\.1.?flash.?lite/i, [0.25, 1.5]],
    [/gemini.?3\.\d.?pro/i, [2, 12]], [/gemini.?2\.5.?pro/i, [1.25, 10]], [/gemini.?2\.5.?flash.?lite/i, [0.1, 0.4]], [/gemini.?2\.5.?flash/i, [0.3, 2.5]],
    [/gemma/i, [0.15, 0.6]],
    [/glm.?[\d.]*.?flash/i, [0.15, 0.5]], [/glm/i, [1.4, 4.4]],
    [/deepseek/i, [0.3, 1.2]],
    [/kimi|moonshot/i, [3, 15]],
  ];
  function defPrice(model) {
    for (const [re, v] of DEF_PRICES) if (re.test(model)) return typeof v === "function" ? v() : v;
    return null;
  }
  const PROV_NAME = { google_vertex: "Vertex AI", google: "Google AI Studio", anthropic: "Anthropic", claude_subscription: "Claude (subscription)", openai: "OpenAI-compatible", custom: "Custom", nanogpt: "NanoGPT", openrouter: "OpenRouter", deepseek: "DeepSeek", zai: "Z.ai", xai: "xAI", mistral: "Mistral", cohere: "Cohere", arli: "ArliAI" };
  // 사이트 이름: 그 공급자로 된 내 연결 이름을 붙여서 (예: "Custom · LinkAPI")
  function siteName(prov) {
    const names = (data.conns || []).filter((c) => c.provider === prov).map((c) => c.name).filter(Boolean);
    const base = PROV_NAME[prov] || prov || "Unknown";
    return names.length ? `${base} · ${names.slice(0, 2).join(", ")}${names.length > 2 ? "…" : ""}` : base;
  }
  const siteCur = (prov) => apw().siteCur[prov] || PRESETS[apw().sitePre?.[prov] || ""]?.cur || "USD";
  /* ── 링크API 가격표 (2026-11-01, 사이트 화면 기준 · CN¥) ──
     t: [입력, 출력] 100만 토큰당(적힌 값 — 실제는 사이트 곱하기 ×1.6, 이름 끝 -r은 그대로)
     c: 한 번 부를 때마다 고정 가격 ([次]·[SP]·[free]) — 곱하기 없음 */
  const LINK_T = {
    "claude-fable-5": [5, 25], "claude-fable-5-1": [5, 25], "claude-haiku-4-5-20251001": [0.5, 2.5], "claude-haiku-4-5-20251001-r": [0.5, 2.5], "claude-haiku-5-5": [0.14, 0.7],
    "claude-opus-4-5-20251101": [4, 20], "claude-opus-4-6": [2.5, 12.5], "claude-opus-4-6-max": [8, 40], "claude-opus-4-6-r": [2.5, 12.5], "claude-opus-4-6-thinking": [2.5, 12.5],
    "claude-opus-4-7": [2.5, 12.5], "claude-opus-4-7-r": [2.5, 12.5], "claude-opus-4-8": [2.5, 12.5], "claude-opus-4-8-r": [2.5, 12.5], "claude-opus-5": [2.5, 12.5], "claude-opus-5-r": [2.5, 12.5], "claude-opus-5-max": [8, 40],
    "claude-opus-5-5": [2, 10], "claude-opus-5-5-r": [2, 10], "claude-opus-5-5-max": [6.4, 32],
    "claude-sonnet-4-6": [1.5, 7.5], "claude-sonnet-4-6-r": [1.5, 7.5], "claude-sonnet-4-6-thinking": [1.5, 7.5], "claude-sonnet-5": [1, 5], "claude-sonnet-5-r": [1, 5], "claude-sonnet-5-5": [1, 5], "claude-sonnet-5-5-r": [1, 5],
    "codex-auto-review": [0.04, 0.24],
    "gemini-2.5-flash-r": [0.15, 1.25], "gemini-2.5-pro": [0.625, 5], "gemini-2.5-pro-r": [0.625, 5], "gemini-3-flash-preview": [0.25, 1.5], "gemini-3-flash-preview-r": [0.25, 1.5],
    "gemini-3-pro-image": [3.2, 192], "gemini-3-pro-preview": [1, 6], "gemini-3-pro-preview-r": [1, 6], "gemini-3.1-flash-image": [0.8, 96], "gemini-3.1-flash-image-preview": [0.8, 96],
    "gemini-3.1-flash-lite": [0.125, 0.75], "gemini-3.1-flash-lite-r": [0.125, 0.752], "gemini-3.1-flash-lite-preview": [0.4, 2.4], "gemini-3.1-pro-preview": [1, 6], "gemini-3.1-pro-preview-r": [1, 6],
    "gemini-3.5-flash": [0.75, 4.5], "gemini-3.5-flash-r": [0.75, 4.5], "gemini-3.5-flash-lite": [0.15, 1.25], "gemini-3.5-flash-lite-r": [0.15, 1.25],
    "gemini-3.6-flash": [0.375, 1.875], "gemini-3.6-flash-r": [0.375, 1.875], "gemini-3.7-flash": [0.375, 1.875], "gemini-3.7-flash-r": [0.375, 1.875], "gemini-3.8-flash": [0.375, 1.875], "gemini-3.8-flash-r": [0.375, 1.875],
    "gemini-4-argon": [1, 5], "gemini-4-argon-high": [1, 5], "gemini-4-argon-r": [1, 5],
    "glm-5.2": [3.2, 11.2], "glm-5.3": [3.2, 11.2], "glm-5.3-flash": [0.16, 0.56],
    "gpt-4.1": [1, 4], "gpt-4.1-mini": [0.2, 0.8], "gpt-4o": [1.25, 5], "gpt-4o-mini": [0.075, 0.3], "gpt-5": [2.375, 19], "gpt-5-mini": [0.125, 1], "gpt-5-nano": [0.095, 0.76],
    "gpt-5.1": [2.375, 19], "gpt-5.2": [3.325, 26.6], "gpt-5.3-codex": [3.325, 26.6], "gpt-5.4": [4.75, 28.5], "gpt-5.4-mini": [0.375, 2.25], "gpt-5.4-nano": [0.38, 2.375],
    "gpt-5.5": [4, 24], "gpt-5.5-pro": [96, 576], "gpt-5.6-luna": [0.04, 0.24], "gpt-5.6-sol": [0.8, 4],
  };
  const LINK_C = {
    "[次]claude-fable-5": 0.2, "[次]claude-fable-5-1": 0.2, "[次]claude-opus-4-5": 0.2, "[次]claude-opus-4-6": 0.2, "[次]claude-opus-4-6-thinking": 0.2, "[次]claude-opus-4-7": 0.2, "[次]claude-opus-4-7-thinking": 0.2,
    "[次]claude-opus-4-8": 0.2, "[次]claude-opus-5": 0.2, "[次]claude-opus-5-5": 0.2, "[次]claude-sonnet-4-6": 0.15, "[次]claude-sonnet-4-6-thinking": 0.15, "[次]claude-sonnet-5": 0.15,
    "[次]deepseek-v4-flash": 0.015, "[次]deepseek-v4-pro": 0.05, "[次]deepseek-v4.1-flash": 0.04,
    "[次]gemini-2.5-pro": 0.03, "[次]gemini-3-flash-preview": 0.015, "[次]gemini-3-pro-preview": 0.05, "[次]gemini-3.1-pro-preview": 0.05,
    "[次]gemini-3.5-flash": 0.02, "[次]gemini-3.6-flash": 0.02, "[次]gemini-3.7-flash": 0.02, "[次]gemini-3.8-flash": 0.02, "[次]gemini-4-argon": 0.05,
    "[次]glm-5.1": 0.03, "[次]glm-5.2": 0.03, "[次]glm-5.3": 0.05, "[次]glm-5.3-flash": 0.035, "[次]grok-4.5": 0.015, "[次]grok-4.6": 0.03, "[次]grok-4.7": 0.015,
    "[SP]claude-fable-5": 0.1, "[SP]claude-fable-5-1": 0.1, "[SP]claude-opus-4-6": 0.1, "[SP]claude-opus-4-7": 0.1, "[SP]claude-opus-4-8": 0.1, "[SP]claude-opus-5": 0.1, "[SP]claude-opus-5-5": 0.1,
    "[SP]claude-sonnet-4-6": 0.1, "[SP]claude-sonnet-5": 0.1, "[SP]deepseek-v4-flash": 0.015, "[SP]deepseek-v4-pro": 0.02, "[SP]deepseek-v4.1-flash": 0.03,
    "gemini-2.5-flash-image": 0.08, "gemini-3-pro-image-c": 0.18, "gemini-3-pro-image-preview": 0.35, "gemini-3.1-flash-image-c": 0.12, "gemini-3.1-flash-lite-image": 0.06,
  };
  const PRESETS = { linkapi: { cur: "CNY", mul: 1.6 } };
  const nm = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, "");
  const LINK_T2 = Object.fromEntries(Object.entries(LINK_T).map(([k, v]) => [nm(k), v]));
  const LINK_C2 = Object.fromEntries(Object.entries(LINK_C).map(([k, v]) => [nm(k), v]));
  const sitePre = (prov) => apw().sitePre?.[prov] || "";
  const siteMul = (prov) => { const v = apw().siteMul?.[prov]; return v === "" || v == null ? (PRESETS[sitePre(prov)]?.mul || 1) : Number(v) || 1; };
  const isCallName = (name) => /^\s*\[[^\]]+\]/.test(name);
  // 사이트 기본 단가 (그 사이트 통화) — {pin, pout, pcall, src} · 곱하기 적용(회당·-r 제외)
  function siteDefault(prov, name) {
    const pre = sitePre(prov), key = nm(name), mul = siteMul(prov), skipR = /-r$/i.test(name.trim());
    if (pre === "linkapi") {
      if (/^\[free\]/i.test(key)) return { pin: 0, pout: 0, pcall: 0, src: "pre" };
      if (LINK_C2[key] != null) return { pin: 0, pout: 0, pcall: LINK_C2[key], src: "pre" };
      if (LINK_T2[key]) { const m = skipR ? 1 : mul; return { pin: LINK_T2[key][0] * m, pout: LINK_T2[key][1] * m, pcall: 0, src: "pre" }; }
    }
    const d = defPrice(name.replace(/^\s*\[[^\]]+\]\s*/, ""));
    if (!d || isCallName(name)) return null;
    const c = siteCur(prov), m = skipR ? 1 : mul;
    return { pin: fromUSD(d[0], c) * m, pout: fromUSD(d[1], c) * m, pcall: 0, src: "def" };
  }


  const ap = { busy: false, err: "", at: 0, done: 0, todo: 0, from: "", hours: {}, cache: null, gm: null };
  const AP_LS = "mlh-api-usage-v3";
  function apCache() {
    if (ap.cache) return ap.cache;
    try { ap.cache = JSON.parse(localStorage.getItem(AP_LS) || "null"); } catch { ap.cache = null; }
    if (!ap.cache || typeof ap.cache !== "object" || !ap.cache.chats) ap.cache = { from: "", chats: {} };
    return ap.cache;
  }
  function apSaveCache() { try { localStorage.setItem(AP_LS, JSON.stringify(ap.cache)); } catch { /* 가득 참 · 사생활 모드 */ } }
  const hourKey = (t) => { const d = new Date(t); return `${ymd(d)}T${pad2(d.getHours())}`; };
  function apFrom() {
    const now = new Date(); let from = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    for (const w of wid()) if (w.kind === "credit" && (w.mode || "gc") === "gc" && w.at) from = Math.min(from, Date.parse(w.at) || from);
    from = Math.max(from, now.getTime() - AP_DAYS_MAX * 86400000);
    const d = new Date(from); d.setMinutes(0, 0, 0); return d.toISOString();
  }
  const parseX = (x) => { if (x && typeof x === "object") return x; try { return JSON.parse(x || "{}") || {}; } catch { return {}; } };
  async function apScanChat(c, fromMs) {
    const out = {}; let before = "", pages = 0;
    const add = (ex, ts) => {
      const t = Date.parse(ts || ""); if (!t || t < fromMs) return;
      const g = parseX(ex).generationInfo; if (!g || typeof g !== "object") return;
      // 구글(Gemini·Vertex)은 생각(추론) 토큰을 출력 토큰과 따로 알려 줌 → 요금은 출력으로 매겨지니 더해 줌
      // (OpenAI·Claude는 이미 출력 토큰 안에 들어 있어서 그대로)
      const th = Number(g.tokensReasoning) || 0, gg = /google|gemini|vertex/i.test(String(g.provider || ""));
      const p = Number(g.tokensPrompt) || 0, o = (Number(g.tokensCompletion) || 0) + (gg ? th : 0);
      if (!p && !o) return;
      const k = hourKey(t), m = `${g.provider || "?"}${SEP}${g.model || "unknown"}`;
      const h = out[k] || (out[k] = {}), r = h[m] || (h[m] = [0, 0, 0, 0]);
      r[0] += p; r[1] += o; r[2] += Math.max(1, Number(g.requestCount) || 1); r[3] = (r[3] || 0) + th;
    };
    while (pages++ < Math.ceil(8000 / AP_PAGE)) {
      const rows = await api(`/chats/${encodeURIComponent(c.id)}/messages?limit=${AP_PAGE}${before ? "&before=" + encodeURIComponent(before) : ""}`);
      if (!Array.isArray(rows) || !rows.length) break;
      for (const m of rows) {
        if (m.role === "user") continue;
        if (Number(m.swipeCount) > 1) {
          const sw = await api(`/chats/${encodeURIComponent(c.id)}/messages/${encodeURIComponent(m.id)}/swipes`).catch(() => null);
          if (Array.isArray(sw) && sw.length) { for (const x of sw) add(x.extra, x.createdAt || m.createdAt); continue; }
        }
        add(m.extra, m.createdAt);
      }
      // 브라우저가 화면을 그리고 입력을 처리할 기회를 준다.
      await new Promise((resolve) => setTimeout(resolve, 0));
      const first = rows[0];
      if (rows.length < AP_PAGE || Date.parse(first.createdAt || "") < fromMs) break;
      before = `${first.createdAt}|${encodeURIComponent(first.id)}`;
    }
    return out;
  }
  // Vertex: 구글 카드에 서비스 계정/로그인이 있으면 오늘·이번 달을 구글이 센 토큰으로
  async function apGoogle() {
    const w = wid().find((x) => x.kind === "credit" && x.mode === "gc" && hasG(x) && (x.sa || oValid(x)));
    if (!w) { ap.gm = null; return; }
    const now = new Date(), t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), m0 = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    try { ap.gm = { today: await gTokens(w, t0, Date.now()), month: await gTokens(w, m0, Date.now()), at: Date.now(), err: "" }; }
    catch (e) { ap.gm = { ...(ap.gm || {}), err: e?.message === "SIGNIN" ? "" : errText(e) }; }
  }
  /* ── 확장 프로그램이 부른 모델(/api/generate/raw) 엿보기 ──
     마리나라가 토큰 수를 돌려주지 않아서 주고받은 글자 수로 어림 (이 기기에서 홈이 켜져 있을 때만, 생각 토큰은 모름) */
  const EXT_LS = "mlh-ext-usage-v1";
  const estTok = (str) => { const t = String(str || ""); const ko = (t.match(/[\u3131-\u318e\uac00-\ud7a3\u3040-\u30ff\u4e00-\u9fff]/g) || []).length; return Math.ceil(ko * 1.1 + (t.length - ko) / 4); };
  // 서버(마리나라 확장 저장소)에 하루 단위로 모아 둠 → 모든 기기 공통. 저장할 때 서버 값을 다시 읽어 합쳐서 기기끼리 덮어쓰지 않게
  const ext = { cache: null, pending: {}, timer: 0, loaded: false };
  const extAddTo = (days, day, m, a) => { const D = days[day] || (days[day] = {}), r = D[m] || (D[m] = [0, 0, 0]); r[0] += a[0]; r[1] += a[1]; r[2] += a[2]; };
  async function extLoad() {
    if (ext.loaded) return; ext.loaded = true;
    try { const v = (await store?.get()) || {}; ext.cache = v.mallangExt && v.mallangExt.days ? v.mallangExt : { days: {} }; } catch { ext.cache = { days: {} }; ext.loaded = false; }
    // 예전(이 기기에만 저장) 기록 옮기기
    try { const old = JSON.parse(localStorage.getItem(EXT_LS) || "null"); if (old?.hours) { for (const [k, H] of Object.entries(old.hours)) for (const [m, r] of Object.entries(H)) { extAddTo(ext.pending, k.slice(0, 10), m, r); extAddTo(ext.cache.days, k.slice(0, 10), m, r); } localStorage.removeItem(EXT_LS); extFlushSoon(); } } catch {}
  }
  function extFlushSoon() { clearTimeout(ext.timer); ext.timer = setTimeout(extFlush, 15000); }
  async function extFlush() {
    if (!store || !Object.keys(ext.pending).length) return;
    const add = ext.pending; ext.pending = {};
    try {
      const v = (await store.get()) || {}, cur = v.mallangExt && v.mallangExt.days ? v.mallangExt : { days: {} };
      for (const [day, D] of Object.entries(add)) for (const [m, r] of Object.entries(D)) extAddTo(cur.days, day, m, r);
      const cut = ymd(new Date(Date.now() - 70 * 86400000)); for (const d of Object.keys(cur.days)) if (d < cut) delete cur.days[d];
      await store.patch({ mallangExt: cur }); ext.cache = cur;
    } catch { for (const [day, D] of Object.entries(add)) for (const [m, r] of Object.entries(D)) extAddTo(ext.pending, day, m, r); extFlushSoon(); }
  }
  cleanups.push(() => { clearTimeout(ext.timer); extFlush(); });
  function extAdd(prov, model, p, o) {
    const day = ymd(new Date()), m = `${prov || "?"}${SEP}${model || "unknown"}`;
    extAddTo(ext.pending, day, m, [p, o, 1]);
    if (ext.cache) extAddTo(ext.cache.days, day, m, [p, o, 1]);
    extFlushSoon();
  }
  // 영수증 계산용: 하루 묶음을 그날 0시 칸으로
  function extHours() {
    const out = {}, days = ext.cache?.days || {};
    for (const [d, D] of Object.entries(days)) { const H = out[d + "T00"] = {}; for (const [m, r] of Object.entries(D)) H[m] = [r[0], r[1], r[2], 0]; }
    if (!ext.cache) for (const [d, D] of Object.entries(ext.pending)) { const H = out[d + "T00"] || (out[d + "T00"] = {}); for (const [m, r] of Object.entries(D)) H[m] = [r[0], r[1], r[2], 0]; }
    return out;
  }
  // 진행률은 텍스트만 바꾸고, 완료 뒤에도 관련 카드만 갱신한다.
  function apPaint(progressOnly = false) {
    if (!root) return;
    const foot = root.querySelector(".mlh-rcptcard .mlh-rc-foot");
    if (foot) {
      const label = foot.querySelector("span"), button = foot.querySelector("[data-apre]");
      if (label) label.textContent = ap.busy ? `reading ${ap.done}/${ap.todo || "…"}` : `checked ${ap.at ? new Date(ap.at).toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" }) : "—"}`;
      if (button) button.disabled = ap.busy;
    }
    if (progressOnly || drag || adrag || arranging) return;
    if(wid().some(isLinkCard)){render();return;}
    for (const w of wid()) {
      if ((w.kind !== "rcpt" && w.kind !== "credit") || widEdit === w.id) continue;
      const slot = [...root.querySelectorAll(".mlh-slot[data-card]")].find((el) => el.dataset.card === String(w.id));
      const card = slot?.querySelector(":scope > .mlh-card");
      if (!card || card.contains(document.activeElement) && document.activeElement.matches("input, textarea, select")) continue;
      card.outerHTML = widHTML(w); localizeReceiptUI(root);
    }
  }
  async function apScan(force) {
    if (ap.busy || !wid().some((w) => w.kind === "rcpt" || w.kind === "credit")) return;
    if (!force && Date.now() - ap.at < AP_STALE) return;
    ap.busy = true; ap.err = ""; ap.done = 0; ap.todo = 0; apPaint(true);
    fxLoad(false);
    try {
      const from = apFrom(), fromMs = Date.parse(from), cache = apCache();
      if (cache.from !== from) { cache.from = from; cache.chats = {}; }
      const chats = (await api("/chats").catch(() => [])) || [];
      const live = chats.filter((c) => Date.parse(c.lastMessageAt || c.updatedAt || "") >= fromMs);
      const keep = {};
      const todo = live.filter((c) => { const k = `${c.lastMessageAt || ""}|${c.updatedAt || ""}`, hit = cache.chats[c.id]; if (hit && hit.k === k) { keep[c.id] = hit; return false; } return true; });
      ap.todo = todo.length;
      let i = 0;
      const worker = async () => {
        while (i < todo.length) {
          const c = todo[i++];
          try { keep[c.id] = { k: `${c.lastMessageAt || ""}|${c.updatedAt || ""}`, h: await apScanChat(c, fromMs) }; }
          catch { /* 이 방은 다음에 */ }
          ap.done++; if (ap.done % 4 === 0 || ap.done === ap.todo) apPaint(true);
        }
      };
      // iOS는 동시 처리량을 낮춰 메모리를 아끼고, 다른 기기는 기존 속도를 유지한다.
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      await Promise.all(Array.from({ length: ios ? 2 : 3 }, () => worker()));
      cache.chats = keep; apSaveCache();
      const hours = {};
      await extLoad();
      for (const { h } of [...Object.values(keep), { h: extHours() }]) for (const [k, ms] of Object.entries(h || {})) {
        const H = hours[k] || (hours[k] = {});
        for (const [m, r] of Object.entries(ms)) { const R = H[m] || (H[m] = [0, 0, 0, 0]); R[0] += r[0]; R[1] += r[1]; R[2] += r[2]; R[3] += r[3] || 0; }
      }
      ap.hours = hours; ap.from = from; ap.at = Date.now();
      if (wid().some((w) => w.kind === "rcpt")) await apGoogle();
    } catch (e) { ap.err = "Couldn't read usage: " + (e?.message || e); }
    finally { ap.busy = false; apPaint(); }
  }
  const apModelName = (m) => m.split(SEP)[1] || m;
  const apProv = (m) => m.includes(SEP) ? m.split(SEP)[0] : "";
  // 단가 찾기: 사이트별로 적은 값 → 옛 값(모델만, $) → 기본값($). 돌려주는 값은 $ 기준
  // 내가 적은 값은 그대로(곱하기 안 함) · [입력, 출력, 회당]
  function apPrice(m) {
    const P = apw(), prov = apProv(m), name = apModelName(m), own = P.price[prov + SEP + name], c = siteCur(prov);
    const has = (x) => x !== "" && x != null && Number(x) >= 0;
    if (own && (has(own[0]) || has(own[1]) || has(own[2]))) return { pin: toUSD(Number(own[0]) || 0, c), pout: toUSD(Number(own[1]) || 0, c), pcall: toUSD(Number(own[2]) || 0, c), src: "set" };
    const old = P.price[name];
    if (old && (Number(old[0]) > 0 || Number(old[1]) > 0)) return { pin: Number(old[0]) || 0, pout: Number(old[1]) || 0, pcall: 0, src: "set" };
    const rw = relayFor(m); if (rw) return { relay: rw, src: "relay" };
    const d = siteDefault(prov || "", name);
    return d ? { pin: toUSD(d.pin, c), pout: toUSD(d.pout, c), pcall: toUSD(d.pcall, c), src: d.src } : null;
  }
  function apCost(m, p, o, n = 0) {
    const pr = apPrice(m); if (!pr) return null;
    if (pr.relay) return toUSD(relayCost(pr.relay, m, p, o, n), pr.relay.cur === "CNY" ? "CNY" : "USD");
    return (p * pr.pin + o * pr.pout) / 1e6 + n * pr.pcall;
  }
  // 기간(시작 시각~) 합계 — filter(m)로 모델 거르기 · 금액은 $
  function apSum(fromMs, filter) {
    const tot = { n: 0, p: 0, o: 0, th: 0, cost: 0, unpriced: 0, models: {}, sites: {} };
    for (const [k, H] of Object.entries(ap.hours)) {
      if (Date.parse(k + ":00:00") < fromMs) continue;
      for (const [m, r] of Object.entries(H)) {
        if (filter && !filter(m)) continue;
        const c = apCost(m, r[0], r[1], r[2]), prov = apProv(m);
        tot.n += r[2]; tot.p += r[0]; tot.o += r[1]; tot.th += r[3] || 0;
        if (c == null) tot.unpriced += r[2]; else tot.cost += c;
        const name = apModelName(m), x = tot.models[name] || (tot.models[name] = { n: 0, p: 0, o: 0, cost: 0, priced: c != null });
        x.n += r[2]; x.p += r[0]; x.o += r[1]; if (c != null) x.cost += c; else x.priced = false;
        const S = tot.sites[prov] || (tot.sites[prov] = { n: 0, cost: 0, unpriced: 0 });
        S.n += r[2]; if (c == null) S.unpriced += r[2]; else S.cost += c;
      }
    }
    return tot;
  }
  const kTok = (n) => n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 0 : 1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(n >= 1e4 ? 0 : 1) + "k" : String(n | 0);
  const usd = (v) => "$" + (v >= 100 ? v.toFixed(0) : v >= 1 ? v.toFixed(2) : v.toFixed(3));
  const won = (v, rate) => rate > 0 ? "≈₩" + Math.round(v * rate).toLocaleString("ko-KR") : "";
  // 사이트별 모델 목록 (마리나라 기록 + 구글 모니터링 + 적어 둔 단가)
  function apSiteModels() {
    const by = {};
    const add = (prov, name) => (by[prov] || (by[prov] = new Set())).add(name);
    for (const H of Object.values(ap.hours)) for (const m of Object.keys(H)) add(apProv(m), apModelName(m));
    for (const k of Object.keys(apw().price)) if (k.includes(SEP)) add(apProv(k), apModelName(k));
    for (const w of wid()) if (w.kind === "credit" && w.mon) for (const m of Object.keys(monSum(w))) add("google_vertex", m);
    if (ap.gm?.month) for (const m of Object.keys(ap.gm.month)) add("google_vertex", m);
    return Object.entries(by).sort((a, b) => a[0].localeCompare(b[0])).map(([p, s]) => [p, [...s].sort()]);
  }
  const monCost = (T) => { let c = 0, un = 0; for (const [m, r] of Object.entries(T || {})) { const x = apCost("google_vertex" + SEP + m, r[0], r[1]); if (x == null) { if (r[0] + r[1]) un++; } else c += x; } return { c, un }; };

  // 영수증 합계: 사이트마다 가장 정확한 출처 하나만 (겹쳐 세지 않게)
  //  Vertex = 구글 모니터링(있으면) · 중계 사이트 = 그 사이트가 알려 준 사용액(연결을 골라 둔 경우) · 나머지 = 마리나라 기록 × 단가
  const hostOf = (u) => { try { return new URL(/^https?:/i.test(String(u)) ? u : "https://" + u).hostname.replace(/^(www|api)\./, ""); } catch { return ""; } };
  // 이 중계 카드에 해당하는 마리나라 연결들: 골라 둔 게 있으면 그것, 없으면 사이트 주소가 같은 연결 전부
  function relayConns(w) {
    const all = data.conns || [];
    if (w.conn) return all.filter((c) => c.id === w.conn);
    const h = hostOf(w.url); if (!h) return [];
    return all.filter((c) => hostOf(c.baseUrl || "") === h || String(c.baseUrl || "").includes(h));
  }
  // 중계 카드: 기록을 시작하기 전 몫을 마리나라 기록으로 (사이트 통화)
  async function relayQpu(w, base) {
    if (w.qpu?.at && Date.now() - w.qpu.at < 86400000) return w.qpu.v;
    let v = 500000;
    try { const st = (await getJ(base + "/api/status"))?.data || {}; v = Number(st.quota_per_unit) || v; const dt = String(st.quota_display_type || "").toUpperCase(); if (dt === "USD" && w.cur === "CNY" && Number(st.usd_exchange_rate) > 0) v = v / Number(st.usd_exchange_rate); } catch {}
    w.qpu = { at: Date.now(), v }; return v;
  }
  const relayLogKey = (w) => "mlh-relay-log-" + (hostOf(w.url) || "site") + "-" + w.id;
  function relayLogStore(w) {
    let st = null; try { st = JSON.parse(localStorage.getItem(relayLogKey(w)) || "null"); } catch {}
    if (!st || !Array.isArray(st.rows)) st = { rows: [], ids: {} };
    if (!st.ids) { st.ids = {}; }
    return st;
  }
  function relayLogSave(w, st) {
    const cut = Date.now() - 70 * 86400000;
    if (st.rows.some((r) => r[0] < cut)) st.rows = st.rows.filter((r) => r[0] >= cut);
    if (Object.keys(st.ids).length > st.rows.length * 2 + 2000) { st.ids = {}; }
    try { localStorage.setItem(relayLogKey(w), JSON.stringify(st)); } catch { try { st.ids = {}; st.rows = st.rows.slice(-20000); localStorage.setItem(relayLogKey(w), JSON.stringify(st)); } catch {} }
  }
  // 실시간 단가: New API /api/pricing → 100만 토큰당(사이트 단위) = model_ratio × 2, 출력 = × completion_ratio, 회당 = model_price
  async function relayPricing(w, base) {
    try {
      const j = await getJ(base + "/api/pricing");
      const list = Array.isArray(j?.data) ? j.data : Array.isArray(j?.data?.models) ? j.data.models : null;
      if (!list) throw new Error(j?.message || "no list");
      const qpu = await relayQpu(w, base), scale = 500000 / qpu, rows = {};
      for (const x of list) {
        const name = nm(x.model_name || x.model || ""); if (!name) continue;
        if (Number(x.quota_type) === 1) rows[name] = { c: (Number(x.model_price) || 0) * scale };
        else { const i = (Number(x.model_ratio) || 0) * 2 * scale; rows[name] = { t: [i, i * (Number(x.completion_ratio) || 1)] }; }
      }
      w.lp = { at: Date.now(), rows, n: Object.keys(rows).length, err: "" };
    } catch (e) { w.lp = { at: Date.now(), rows: w.lp?.rows || null, n: w.lp?.n || 0, err: errText(e) }; }
    savePrefs(); render();
  }
// Pure grouping helpers. Request IDs, not equal timestamps or costs, identify duplicate charges.
function isLinkCard(w){try{const h=new URL(w.url).hostname.toLowerCase();return w.kind==='credit'&&w.mode==='relay'&&/^(?:[a-z0-9-]+\.)*linkapi\.(?:ai|cc|pro)$/.test(h)}catch{return false}}
function linkGroupKey(w){return String(w.linkAccount||'default').trim()||'default'}
function linkGroups(cards){const groups=new Map();for(const w of cards)if(isLinkCard(w)){const k=linkGroupKey(w);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(w)}return [...groups].map(([key,members])=>({key,members}))}
function summarizeLinkGroup(members,readLog,convert,now=Date.now()){
 const candidates=members.filter(w=>w.last&&!w.last.err).sort((a,b)=>(b.last.at||0)-(a.last.at||0));
 const accounts=candidates.filter(w=>w.last.acct);const latest=accounts[0];
 const day=new Date(now);day.setHours(0,0,0,0);const month=new Date(now);month.setDate(1);month.setHours(0,0,0,0);
 const unique=new Map();let legacy=false,covered=false;
 for(const w of members){const cache=readLog(w);if(w.last?.src==='logs'&&cache?.linkSchema===2)covered=true;for(const row of cache?.rows||[]){if(!row[3]){legacy=true;continue}const id=String(row[3]);if(!unique.has(id))unique.set(id,{at:row[0],usd:convert(Number(row[1])||0,w.cur==='CNY'?'CNY':'USD'),model:row[2],id})}}
 const records=[...unique.values()];const since=t=>records.filter(r=>r.at>=t).reduce((sum,r)=>sum+r.usd,0);
 const known=x=>typeof x==='number'&&Number.isFinite(x)&&x>=0;
 let today=null,totalMonth=null,source='missing';
 if(latest&&known(latest.last.today)&&known(latest.last.month)){today=convert(latest.last.today,latest.cur==='CNY'?'CNY':'USD');totalMonth=convert(latest.last.month,latest.cur==='CNY'?'CNY':'USD');source='account'}
 else if(records.length||covered&&!legacy){today=since(day.getTime());totalMonth=since(month.getTime());source='logs'}
 else if(candidates.some(w=>known(w.last.today)&&known(w.last.month))){const w=candidates.find(w=>known(w.last.today)&&known(w.last.month));today=convert(w.last.today,w.cur==='CNY'?'CNY':'USD');totalMonth=convert(w.last.month,w.cur==='CNY'?'CNY':'USD');source='legacy-reference'}
 let balance=null,balanceSource='missing';
 const balanceCard=accounts.find(w=>known(w.last.rem))||candidates.find(w=>known(w.last.rem));
 if(balanceCard){balance=convert(balanceCard.last.rem,balanceCard.cur==='CNY'?'CNY':'USD');balanceSource=balanceCard.last.acct?'account':'legacy-reference'}
 return {today,month:totalMonth,source,balance,balanceSource,records,legacy,partial:(legacy||members.some(w=>w.last?.logCapped||w.last?.err||w.last?.src!=='logs'))&&source!=='account'};
}

function linkSummary(group){return summarizeLinkGroup(group.members,relayLogStore,toUSD)}
function linkBalance(group,s){
 const config=prefs.sorrLinkBalances?.[group.key];
 if(s.balanceSource==='account')return {value:s.balance,source:'계정 전체 잔액 · 한 번만 표시'};
 if(config&&Number.isFinite(config.amount)){
  const known=new Set(config.knownIds||[]);const spent=s.records.filter(r=>r.at>=config.at&&!known.has(r.id)).reduce((sum,r)=>sum+r.usd,0);
  return {value:Math.max(0,toUSD(config.amount,config.currency)-spent),source:'공유 기준 잔액 − 이후 조회된 사용 로그 · 추정'};
 }
 return {value:s.balance,source:s.balance===null?'현재 잔액을 입력해 주세요.':'기존 카드의 참고 잔액 · 아래에 공유 기준 잔액을 입력해 주세요.'};
}
function linkGroupHTML(group){
 const s=linkSummary(group),balance=linkBalance(group,s);const config=prefs.sorrLinkBalances?.[group.key];const cur=config?.currency||(group.members[0].cur==='CNY'?'CNY':'USD');
 const money=v=>v===null?'확인 전':fmtCur(fromUSD(v,cur),cur);const groupName=group.key==='default'?'LinkAPI · 공유 계정':'LinkAPI · '+group.key;
 return `<section class="mlh-card sorr-link-account" data-link-group="${esc(group.key)}"><div class="mlh-card-head"><h2 class="mlh-card-title">${esc(groupName)}</h2><button class="mlh-link" data-link-refresh="${esc(group.key)}">전체 조회</button></div><div class="mlh-cr"><div class="mlh-cr-big"><b>${money(balance.value)}</b></div><div class="mlh-cr-sub">${esc(balance.source)}</div><div class="mlh-rc-line"><span>오늘 사용액</span><i></i><b>${money(s.today)}</b></div><div class="mlh-rc-line"><span>이번 달 사용액</span><i></i><b>${money(s.month)}</b></div><p class="mlh-cr-tag">${s.source==='account'?'계정 집계 한 번만 반영':s.source==='logs'?'요청 ID로 중복 제거한 사용 로그':s.source==='legacy-reference'?'이전 대표 조회값 · 전체 조회 후 중복 제거 집계로 전환':'아직 조회된 사용량이 없어요.'}${s.partial?' · 조회 범위가 일부이거나 미조회 키가 있을 수 있어요.':''}</p><details class="sorr-link-balance"><summary>공유 잔액 기준 설정</summary><p class="mlh-empty">사이트에 표시된 계정 잔액을 한 번 입력하세요. 이후 조회된 사용액만 차감하며, 키별 잔액은 합산하지 않아요.</p><label>현재 계정 잔액<input class="mlh-input" type="number" min="0" step="any" data-shared-balance value="${config?esc(config.amount):''}" placeholder="사이트의 현재 잔액"></label><label>통화<select class="mlh-input" data-shared-currency><option value="CNY" ${cur==='CNY'?'selected':''}>CNY · 위안</option><option value="USD" ${cur==='USD'?'selected':''}>USD · 달러</option></select></label><button data-link-save="${esc(group.key)}">공유 잔액 저장</button></details><details class="sorr-link-profiles" ${group.members.some(w=>widEdit===w.id)?'open':''}><summary>키별 설정 · ${group.members.length}개 · 배율은 각각 유지</summary>${group.members.map(w=>`<div class="sorr-link-key-profile">${creditHTML(w).replace('<h2 class="mlh-card-title">크레딧 잔액</h2>','<h2 class="mlh-card-title">'+esc(w.name||'LinkAPI 키')+'</h2>')}</div>`).join('')}</details></div></section>`;
}
function receiptCardsHTML(cards){const groups=linkGroups(cards),seen=new Set();return cards.map(w=>{if(isLinkCard(w)){const key=linkGroupKey(w);if(seen.has(key))return '';seen.add(key);return `<div class="mlh-slot" data-card="link:${esc(key)}">${linkGroupHTML(groups.find(g=>g.key===key))}</div>`}return `<div class="mlh-slot" data-card="${esc(w.id)}">${widHTML(w)}</div>`}).join('')}
function linkGroupAction(t){
 const action=t.closest('[data-link-refresh],[data-link-save]');if(!action)return false;
 const key=action.dataset.linkRefresh??action.dataset.linkSave,group=linkGroups(wid()).find(g=>g.key===key);if(!group)return true;
 if(action.hasAttribute('data-link-refresh')){for(const w of group.members)void crLookup(w);return true}
 const card=action.closest('.sorr-link-account'),raw=card.querySelector('[data-shared-balance]').value,value=Number(raw);if(raw===''||!Number.isFinite(value)||value<0){card.querySelector('[data-shared-balance]').focus();return true}
 const s=linkSummary(group);prefs.sorrLinkBalances={...(prefs.sorrLinkBalances||{}),[key]:{amount:value,currency:card.querySelector('[data-shared-currency]').value,at:Date.now(),knownIds:s.records.map(r=>r.id)}};savePrefs();render();return true;
}

  let relayMemo = { key: "", list: [] };
  function relayFor(m) {
    const ws = wid().filter((x) => x.kind === "credit" && x.mode === "relay" && x.url);
    if (!ws.length) return null;
    const key = (data.conns || []).length + "|" + ws.map((x) => x.id + x.url + (x.conn || "")).join(",");
    if (relayMemo.key !== key) relayMemo = { key, list: ws.map((x) => [x, relayMatcher(x)]) };
    for (const [x, hit] of relayMemo.list) if (hit(m)) return x;
    return null;
  }
  // 이 사이트로 보낸 기록 고르기: 연결 종류 + 그 연결의 모델 이름 (연결에 모델이 없으면 종류만)
  function relayMatcher(w) {
    const cs = relayConns(w), pairs = new Set(), anyOf = new Set();
    for (const c of cs) { if (!c.provider) continue; if (c.model) pairs.add(c.provider + SEP + nm(c.model)); else anyOf.add(c.provider); }
    return (m) => pairs.has(apProv(m) + SEP + nm(apModelName(m))) || anyOf.has(apProv(m));
  }
  // 이 사이트 가격(사이트 통화): 내가 적은 값 → 사이트 가격표(링크API면 그 표 × 곱하기) → 공식 × 곱하기
  function relayCost(w, m, p, o, n) {
    const P = apw(), own = P.price[m];
    if (own && own.some((x) => x !== "" && x != null)) return fromUSD(apCost(m, p, o, n) || 0, w.cur === "CNY" ? "CNY" : "USD");
    const name = apModelName(m), key = nm(name), linky = /linkapi/i.test(hostOf(w.url)), mul = Number(w.mul) > 0 ? Number(w.mul) : linky ? 1.6 : 1, noMul = /-r$/i.test(name.trim());
    const cur = w.cur === "CNY" ? "CNY" : "USD";
    const live = w.lp?.rows?.[key];
    if (live) { if (live.c != null) return n * live.c; if (live.t) return (p * live.t[0] + o * live.t[1]) / 1e6 * (noMul ? 1 : mul); }
    if (linky) {
      if (/^\[free\]/i.test(key)) return 0;
      if (LINK_C2[key] != null) return n * LINK_C2[key];
      if (LINK_T2[key]) return (p * LINK_T2[key][0] + o * LINK_T2[key][1]) / 1e6 * (noMul ? 1 : mul);
    }
    const d = defPrice(name.replace(/^\s*\[[^\]]+\]\s*/, "")); if (!d) return 0;
    return fromUSD((p * d[0] + o * d[1]) / 1e6, cur) * (noMul ? 1 : mul);
  }
  function relayFill(w, from, to) {
    if (!(to > from)) return 0;
    const hit = relayMatcher(w); let v = 0;
    for (const [k, H] of Object.entries(ap.hours)) { const t = Date.parse(k + ":00:00"); if (t < from || t >= to) continue;
      for (const [m, r] of Object.entries(H)) if (hit(m)) v += relayCost(w, m, r[0], r[1], r[2]); }
    return v;
  }
  function relayPeriods(w) {
    const L = w.last; if (!L) return null;
    if (!L.trk) return { today: L.today, month: L.month };
    const now = new Date(), t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), m0 = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const ft = relayFill(w, t0, Math.max(t0, L.daySince || t0)), fm = relayFill(w, m0, Math.max(m0, L.monthSince || m0));
    return { today: L.today + ft, month: L.month + fm, ft, fm };
  }
  function vxMatcher() {
    const vx = (data.conns || []).filter((c) => c.provider !== "google_vertex" && /aiplatform\.googleapis\.com/i.test(String(c.baseUrl || "")));
    const pairs = new Set(vx.map((c) => c.provider + SEP + nm(c.model || ""))), anyP = new Set(vx.filter((c) => !c.model).map((c) => c.provider)), inVx = apw().inVx || {};
    return (m) => apProv(m) === "google_vertex" || pairs.has(apProv(m) + SEP + nm(apModelName(m))) || anyP.has(apProv(m)) || !!inVx[apProv(m)];
  }
  // 오늘 쓴 모델 전부: Vertex = 구글 집계 · 로그 있는 중계 사이트 = 사이트 로그 · 나머지 = 채팅 기록 (겹치지 않게)
  function apTodayModels() {
    const now = new Date(), t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), out = [];
    const gm = ap.gm?.today, vx = gm ? vxMatcher() : null;
    if (gm) for (const [m, r] of Object.entries(gm)) if (r[0] + r[1] > 0) out.push({ name: m, site: "Vertex AI", src: "G", cost: apCost("google_vertex" + SEP + m, r[0], r[1]), tok: r[0] + r[1] });
    const logged = [];
    for (const w of wid()) {
      if (w.kind !== "credit" || w.mode !== "relay" || isLinkCard(w) || w.last?.src !== "logs") continue;
      logged.push(w);
      const st = relayLogStore(w), by = {};
      for (const [t, q, mdl] of st.rows) if (t >= t0) { const x = by[mdl || "?"] || (by[mdl || "?"] = { q: 0, n: 0 }); x.q += q; x.n++; }
      for (const [mdl, x] of Object.entries(by)) out.push({ name: mdl, site: w.name || hostOf(w.url), src: "site", cost: toUSD(x.q, w.cur === "CNY" ? "CNY" : "USD"), n: x.n });
    }
    for(const g of linkGroups(wid())){const s=linkSummary(g);if(s.source!=='logs'&&s.source!=='account')continue;logged.push(...g.members);const by={};for(const r of s.records){if(r.at<t0)continue;const x=by[r.model||'?']||(by[r.model||'?']={cost:0,n:0});x.cost+=r.usd;x.n++;}for(const [name,x] of Object.entries(by))out.push({name,site:'LinkAPI · 공유 계정',src:'site',cost:x.cost,n:x.n});}
    const nanoW = wid().filter((x) => x.kind === "credit" && x.mode === "nano" && x.last?.nu);
    for (const w of nanoW) for (const [mdl, r] of Object.entries(w.last.nu.days[w.last.nu.today] || {})) out.push({ name: mdl, site: w.name || "NanoGPT", src: "site", cost: r.c, n: r.n, tok: r.i + r.o + r.th });
    const chat = {};
    for (const [k, H] of Object.entries(ap.hours)) { if (Date.parse(k + ":00:00") < t0) continue;
      for (const [m, r] of Object.entries(H)) {
        if (vx && vx(m)) continue;
        if (nanoW.length && apProv(m) === "nanogpt") continue;
        const rw = relayFor(m); if (rw && logged.includes(rw)) continue;
        const x = chat[m] || (chat[m] = { p: 0, o: 0, n: 0 }); x.p += r[0]; x.o += r[1]; x.n += r[2];
      } }
    for (const [m, x] of Object.entries(chat)) { const rw = relayFor(m); out.push({ name: apModelName(m), site: rw ? (rw.name || hostOf(rw.url)) : (PROV_NAME[apProv(m)] || apProv(m)), src: "chat", cost: apCost(m, x.p, x.o, x.n), n: x.n, tok: x.p + x.o }); }
    return out.sort((a, b) => (b.cost ?? -1) - (a.cost ?? -1));
  }
  function apTotals() {
    const now = new Date(), t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), m0 = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const T = apSum(t0), M = apSum(m0), rows = {};
    const relayHosts = new Set(wid().filter((x) => x.kind === "credit" && x.mode === "relay").map((x) => hostOf(x.url)).filter(Boolean));
    const shortName = (prov) => (data.conns || []).find((c) => c.provider === prov && !relayHosts.has(hostOf(c.baseUrl || "")))?.name || PROV_NAME[prov] || prov || "Other";
    const row = (prov) => rows[prov] || (rows[prov] = { prov, name: shortName(prov), t: 0, m: 0, src: "chat", tn: 0, mn: 0, un: 0 });
    for (const [p, s] of Object.entries(T.sites)) { const r = row(p); r.t = s.cost; r.tn = s.n; }
    for (const [p, s] of Object.entries(M.sites)) { const r = row(p); r.m = s.cost; r.mn = s.n; r.un = s.unpriced; }
    if (ap.gm?.month) {
      const r = row("google_vertex"), a = monCost(ap.gm.today), b = monCost(ap.gm.month); r.t = a.c; r.m = b.c; r.src = "google"; r.un = b.un; r.name = "Vertex AI";
      const vx = (data.conns || []).filter((c) => c.provider !== "google_vertex" && /aiplatform\.googleapis\.com|vertex/i.test(String(c.baseUrl || "") + " " + String(c.name || "")) && /aiplatform\.googleapis\.com/i.test(String(c.baseUrl || "")));
      const pairs = new Set(vx.map((c) => c.provider + SEP + nm(c.model || ""))), anyP = new Set(vx.filter((c) => !c.model).map((c) => c.provider));
      for (const [k, H] of Object.entries(ap.hours)) { const t = Date.parse(k + ":00:00"); if (t < m0) continue;
        for (const [m, x] of Object.entries(H)) { if (!(pairs.has(apProv(m) + SEP + nm(apModelName(m))) || anyP.has(apProv(m)))) continue; const R2 = rows[apProv(m)]; if (!R2 || apProv(m) === "google_vertex") continue; const c = apCost(m, x[0], x[1], x[2]) || 0; R2.m -= c; if (t >= t0) R2.t -= c; R2.mn -= x[2]; if (c === 0 && apCost(m, x[0], x[1], x[2]) == null) R2.un -= x[2]; } }
    }
    for (const w of wid()) {
      if (w.kind !== "credit" || w.mode !== "relay" || isLinkCard(w) || !w.last || !(w.last.acct || w.last.trk)) continue;
      if (!relayConns(w).length) continue;
      const cur = w.cur === "CNY" ? "CNY" : "USD", hit = relayMatcher(w), PR = relayPeriods(w) || {};
      // 이 사이트로 보낸 채팅 몫은 종류별 칸에서 빼고, 사이트가 센 금액으로 따로 한 줄
      const now = new Date(), t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), m0 = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      for (const [k, H] of Object.entries(ap.hours)) { const t = Date.parse(k + ":00:00"); if (t < m0) continue;
        for (const [m, r] of Object.entries(H)) { if (!hit(m)) continue; const c = apCost(m, r[0], r[1], r[2]) || 0, R2 = rows[apProv(m)]; if (!R2) continue; R2.m -= c; if (t >= t0) R2.t -= c; R2.mn -= r[2]; } }
      const r = row("relay:" + w.id);
      r.name = w.name || hostOf(w.url) || "Relay"; r.src = "site"; r.m = toUSD(PR.month || 0, cur); r.t = toUSD(PR.today || 0, cur);
    }
    const sharedGroups=linkGroups(wid()).map(g=>({...g,summary:linkSummary(g)})).filter(g=>g.summary.today!==null&&g.summary.month!==null);
    const removed=new Set();
    for(const g of sharedGroups){
      const matchers=g.members.map(relayMatcher);
      for(const [k,H] of Object.entries(ap.hours)){const stamp=Date.parse(k+":00:00");if(stamp<m0)continue;for(const [m,x] of Object.entries(H)){const key=k+'|'+m;if(removed.has(key)||!matchers.some(hit=>hit(m)))continue;removed.add(key);const r=rows[apProv(m)];if(!r)continue;const cost=apCost(m,x[0],x[1],x[2])||0;r.m-=cost;if(stamp>=t0)r.t-=cost;r.mn-=x[2];if(apCost(m,x[0],x[1],x[2])==null)r.un-=x[2];}}
      const r=row('link:'+g.key);r.name=g.key==='default'?'LinkAPI · 공유 계정':'LinkAPI · '+g.key;r.src='site';r.m=g.summary.month;r.t=g.summary.today;
    }
    for (const w of wid()) {
      if (w.kind !== "credit" || w.mode !== "nano" || !w.last || w.last.today == null) continue;
      delete rows["nanogpt"];
      const r = row("nano:" + w.id); r.name = w.name || "NanoGPT"; r.src = "site"; r.m = w.last.month || 0; r.t = w.last.today || 0;
    }
    for (const w of wid()) {
      if (w.kind !== "credit" || (w.mode !== "ds" && w.mode !== "or") || !w.last || w.last.today == null) continue;
      delete rows[w.mode === "ds" ? "deepseek" : "openrouter"];
      const r = row(w.mode + ":" + w.id); r.name = w.name || (w.mode === "ds" ? "DeepSeek" : "OpenRouter"); r.src = "site";
      const c = w.mode === "ds" && w.cur === "CNY" ? "CNY" : "USD"; r.m = toUSD(w.last.month || 0, c); r.t = toUSD(w.last.today || 0, c);
    }
    // 직접 표시한 "Vertex에 이미 포함" 사이트는 구글 모니터링이 있을 때 빼기
    if (ap.gm?.month) for (const [p, on] of Object.entries(apw().inVx || {})) if (on && p !== "google_vertex" && rows[p]) delete rows[p];
    for (const r of Object.values(rows)) { if (Math.abs(r.m) < 1e-9) r.m = 0; if (Math.abs(r.t) < 1e-9) r.t = 0; r.m = Math.max(0, r.m); r.t = Math.max(0, r.t); }
    const list = Object.values(rows).filter((r) => r.t || r.m || r.mn > 0 || r.src !== "chat").sort((a, b) => b.m - a.m);
    return { T, M, list, today: list.reduce((a, r) => a + r.t, 0), month: list.reduce((a, r) => a + r.m, 0), un: list.reduce((a, r) => a + r.un, 0) };
  }

  function rcptHTML(w) {
    const ed = widEdit === w.id, P = apw(), D = P.disp === "USD" ? "USD" : "KRW";
    const show = (vUSD) => fmtCur(fromUSD(vUSD, D), D), sub = (vUSD) => D === "KRW" ? usd(vUSD) : won(vUSD, usdKrw());
    const now = new Date(), y = now.getFullYear(), mo = now.getMonth(), m0 = new Date(y, mo, 1).getTime();
    const A = apTotals(), T = A.T, M = A.M;
    const dim = new Date(y, mo + 1, 0).getDate(), el = Math.max(1, (now.getTime() - m0) / 86400000);
    const est = A.month / el * dim;
    const top = Object.entries(M.models).sort((a, b) => (b[1].cost - a[1].cost) || (b[1].n - a[1].n)).slice(0, 5);
    const scanned = ap.at ? new Date(ap.at).toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" }) : "—";
    const R = P.rates;
    const priceRow = (prov, name) => {
      const key = prov + SEP + name, pr = P.price[key] || [], c = siteCur(prov), d = siteDefault(prov, name);
      const call = isCallName(name) || (d && d.pcall > 0) || (pr[2] !== "" && pr[2] != null);
      const f = (v) => String(+Number(v).toFixed(c === "KRW" ? 0 : 4));
      const inp = (i, ph) => `<input class="mlh-input" type="number" min="0" step="any" inputmode="decimal" data-fk="apr-${esc(key)}-${i}" data-apr="${esc(key)}" data-i="${i}" value="${pr[i] ?? ""}" placeholder="${ph}">`;
      return call ? `<label class="is-call"><span title="${esc(name)}">${esc(name)}</span>${inp(2, d ? f(d.pcall) + " /call" : "per call")}</label>`
        : `<label><span title="${esc(name)}">${esc(name)}</span>${inp(0, d ? f(d.pin) : "in")}${inp(1, d ? f(d.pout) : "out")}</label>`;
    };
    const sites = apSiteModels();
    const tools = ed ? `<div class="mlh-ptools">${moveTools(w)}
        ${chips("Show in", "apdisp", { id: w.id, disp: D }, "disp", [["KRW", "₩ won"], ["USD", "$ dollar"]])}
        <div class="mlh-wxset"><span class="mlh-ptl">Exchange rate · ${R ? `updated ${esc(R.day)}` : "loading…"}</span>
          <div class="mlh-rc-fx"><label>₩ per $1<input class="mlh-input" type="number" min="0" step="any" data-apfx="fx" value="${esc(P.fx ?? "")}" placeholder="${R ? Math.round(R.KRW * 100) / 100 : "auto"}"></label>
          <label>₩ per CN¥1<input class="mlh-input" type="number" min="0" step="any" data-apfx="fxc" value="${esc(P.fxc ?? "")}" placeholder="${R ? Math.round(R.KRW / R.CNY * 100) / 100 : "auto"}"></label></div>
          <div class="mlh-empty">Leave empty to use today's rate (checked once a day).</div></div>
        <div class="mlh-wxset"><span class="mlh-ptl">Prices per 1M tokens (in / out) — by site</span>
          ${sites.map(([prov, models]) => `<div class="mlh-rc-site"><div class="mlh-rc-sitehead"><b>${esc(siteName(prov))}</b>${chips("", "apscur", { id: w.id, cur: siteCur(prov) }, "cur", [["USD", "$"], ["CNY", "CN¥"], ["KRW", "₩"]]).replace(/data-wa="apscur"/g, `data-wa="apscur" data-prov="${esc(prov)}"`)}</div>
            <div class="mlh-rc-sitehead">${chips("Price list", "appre", { id: w.id, pre: sitePre(prov) }, "pre", [["", "Official"], ["linkapi", "LinkAPI"]]).replace(/data-wa="appre"/g, `data-wa="appre" data-prov="${esc(prov)}"`)}
              <label class="mlh-rc-mul">× <input class="mlh-input" type="number" min="0" step="any" data-apmul="${esc(prov)}" value="${esc(apw().siteMul?.[prov] ?? "")}" placeholder="${siteMul(prov)}"></label></div>
            ${prov !== "google_vertex" ? `<div class="mlh-rc-sitehead"><button type="button" class="mlh-link" data-wa="apinvx" data-wid="${w.id}" data-prov="${esc(prov)}" aria-pressed="${!!apw().inVx?.[prov]}">${apw().inVx?.[prov] ? "☑" : "☐"} This is Vertex too — already in Google's count (✓G)</button></div>` : ""}
            <div class="mlh-rc-prices">${models.map((m) => priceRow(prov, m)).join("")}</div></div>`).join("") || `<div class="mlh-empty">Models show up here after your first reply ♡</div>`}
          <div class="mlh-empty">Grey numbers are the defaults: official prices (Oct 2026) or the LinkAPI list, already multiplied by × (not for per-call models or names ending in -r). Numbers you type are used as they are.</div></div>
        <div class="mlh-empty">Vertex uses Google's own count when the Google Cloud card is connected; relay sites use the site's own spending when its card has a connection picked. Everything else counts chat replies and rerolls in Marinara.</div>
        <div class="mlh-pfoot"><button type="button" class="mlh-link" data-wa="del" data-wid="${w.id}">Turn off</button></div>${delTools(w, "Turn off the receipt?")}</div>` : "";
    const line = (a, b, c = "") => `<div class="mlh-rc-line"><span>${a}</span><i></i><b>${b}</b>${c ? `<em>${c}</em>` : ""}</div>`;
    const tag = { google: " ✓G", site: " ✓site", chat: "" };
    return `<section class="mlh-card mlh-rcptcard">
      <div class="mlh-card-head"><h2 class="mlh-card-title">사용량 영수증</h2><button type="button" class="mlh-link" data-wa="${ed ? "done" : "edit"}" data-wid="${w.id}">${ed ? "Done" : "Edit"}</button></div>
      ${tools}
      <div class="mlh-rc">
        <div class="mlh-rc-head"><b>SORR RECEIPT</b><em>${MON[mo].toUpperCase()} ${y} · ALL SITES</em></div>
        <div class="mlh-rc-big"><span>TODAY</span><b>${A.list.length ? show(A.today) : "—"}</b><em>${A.list.length ? sub(A.today) : "no requests yet"}</em></div>
        <div class="mlh-rc-cut"></div>
        ${line("This month", A.list.length ? show(A.month) : "—", A.list.length ? sub(A.month) : "")}
        ${A.month && el >= 3 ? line("Month-end est.", show(est), sub(est)) : A.month ? line("Month-end est.", "—", "from day 3") : ""}
        ${line("Replies today", T.n + "", `${kTok(T.p)}↑ ${kTok(T.o)}↓`)}
        ${A.list.length ? `<div class="mlh-rc-cut"></div><div class="mlh-rc-sub">BY SITE · MONTH (today)</div><div class="mlh-rc-items">${A.list.map((r) => line((tag[r.src] ? `<u>${tag[r.src].trim()}</u> ` : "") + esc(r.name), show(r.m), show(r.t))).join("")}</div>` : ""}
        ${(() => {
          // 구독은 정액이라 금액 합계에는 안 넣고, 얼마나 썼는지만 따로
          const subs = wid().filter((x) => x.kind === "credit" && x.mode === "nano" && x.last?.sub?.active===true);
          if (!subs.length) return "";
          const pc = (x) => { if (!x) return null; const lim = Number(x.lim) || (Number(x.used) + Number(x.rem)) || 0, used = Number(x.used) || 0; const p = x.pct != null ? Number(x.pct) * (Number(x.pct) <= 1 ? 100 : 1) : lim ? used / lim * 100 : 0; return { p: Math.round(Math.min(100, p)), used }; };
          return `<div class="mlh-rc-cut"></div><div class="mlh-rc-sub">SUBSCRIPTIONS · USED (flat fee, not in the total)</div><div class="mlh-rc-items">${subs.map((x) => { const S = x.last.sub, d = pc(S.d), wk = pc(S.wk), nmx = esc(x.name || "NanoGPT");
            const nu = x.last.nu, share = (win, fromDay) => {
              if (!nu || !win) return "";
              const lim = Number(win.lim) || (Number(win.used) + Number(win.rem)) || 0; if (!lim) return "";
              const by = {};
              for (const [day, D] of Object.entries(nu.days)) { if (day < fromDay) continue; for (const [mdl, r] of Object.entries(D)) if (!(r.c >= 0.0005)) { const v = r.i || (r.i + r.o + r.th); by[mdl] = by[mdl] || { v: 0, n: 0 }; by[mdl].v += v; by[mdl].n += r.n; } }
              return Object.entries(by).filter(([, x]) => x.v > 0 || x.n > 0).sort((a, b) => b[1].v - a[1].v).map(([mdl, x]) => { const p = x.v / lim * 100; return line(`<small>└ ${esc(mdl)}</small>`, x.v ? (p < 0.1 ? "<0.1%" : Math.round(p * 10) / 10 + "%") : "—", x.v ? kTok(x.v) + " in" : x.n + " calls"); }).join("");
            };
            const wkFrom = S.wk?.reset ? new Date(Number(S.wk.reset) - 7 * 86400000).toISOString().slice(0, 10) : "";
            return (d ? line(nmx + " · today", d.p + "%", kTok(d.used) + " tok") + share(S.d, nu?.today || "") : "") + (wk ? line(nmx + " · this week", wk.p + "%", kTok(wk.used) + " tok") + share(S.wk, wkFrom) : ""); }).join("")}</div>`;
        })()}
        ${(() => {
          const L = apTodayModels(); if (!L.length) return "";
          const lim = ap.allModels ? L.length : 10, tg = { G: "✓G", site: "✓site", chat: "" };
          return `<div class="mlh-rc-cut"></div><div class="mlh-rc-sub">TODAY · EVERY MODEL (${L.length})</div><div class="mlh-rc-items">${L.slice(0, lim).map((x) => line(`${tg[x.src] ? `<u>${tg[x.src]}</u> ` : ""}${esc(x.name)} <small>· ${esc(x.site)}</small>`, x.cost == null ? "?" : show(x.cost), x.n ? x.n + (x.n > 1 ? " calls" : " call") : kTok(x.tok || 0) + " tok")).join("")}</div>${L.length > 10 ? `<button type="button" class="mlh-link" data-apall>${ap.allModels ? "Show less" : `Show all ${L.length}`}</button>` : ""}`;
        })()}
        ${top.length ? `<div class="mlh-rc-cut"></div><div class="mlh-rc-sub">TOP MODELS IN CHATS · MONTH</div><div class="mlh-rc-items">${top.map(([m, x]) => line(esc(m), x.priced ? show(x.cost) : "?", `${x.n} calls`)).join("")}</div>` : ""}
        ${(() => { const miss = new Set(); for (const [n, x] of Object.entries(M.models)) if (!x.priced) miss.add(n); if (ap.gm?.month) for (const [m, r] of Object.entries(ap.gm.month)) if (r[0] + r[1] > 0 && apCost("google_vertex" + SEP + m, r[0], r[1]) == null) miss.add(m); return miss.size ? `<div class="mlh-rc-note">✎ no price yet: ${[...miss].slice(0, 6).map(esc).join(", ")}${miss.size > 6 ? "…" : ""} — add it in Edit</div>` : ""; })()}
        ${ap.err ? `<div class="mlh-empty mlh-perr">${esc(ap.err)}</div>` : ""}${ap.gm?.err ? `<div class="mlh-empty mlh-perr">Google: ${esc(ap.gm.err)}</div>` : ""}
        <div class="mlh-rc-foot"><i class="mlh-barcode"></i><span>${ap.busy ? `reading ${ap.done}/${ap.todo || "…"}` : `checked ${esc(scanned)}`}</span><button type="button" class="mlh-wxre" data-apre title="Count again" aria-label="Count again"${ap.busy ? " disabled" : ""}>↻</button></div>
        <div class="mlh-rc-thx">✦ ✓G = counted by Google · ✓site = the site's own total ✦</div>
      </div>
    </section>`;
  }

  /* 크레딧 — 종류 3가지
     gc   : 구글 클라우드. 내가 적은 잔액 − 그 뒤로 쓴 금액
            (서비스 계정을 넣으면 구글 모니터링이 센 Vertex 토큰 = 채팅·에이전트·확장·다른 기기 전부, 없으면 마리나라 채팅 기록)
     relay: One API / New API 기반 중계 사이트 — 키로 잔액 + 이번 달 쓴 금액
     nano : 나노지피티 — 충전 잔액(키) + 구독 사용량(마리나라 연결로 읽음, 키 필요 없음) */
  const crScopeOk = (w) => (m) => { const p = apProv(m).toLowerCase(); return (w.scope || "vertex") === "vertex" ? p.includes("vertex") : /google|gemini|vertex/.test(p); };
  const errText = (e) => {
    const m = String(e?.message || e);
    return /failed to fetch|load failed|networkerror/i.test(m) ? "The site didn't allow a lookup from the browser"
      : /^40[13]$/.test(m) ? "The key was refused (check it in Edit)" : m.slice(0, 160);
  };
  const getJ = (url, opt) => fetch(url, opt).then(async (r) => { if (!r.ok) { let t = ""; try { const j = await r.json(); t = j?.error?.message || j?.error_description || j?.message || ""; } catch {} throw new Error(t ? `${r.status} ${t}` : String(r.status)); } return r.json(); });

  /* 구글 서비스 계정 → 접근 토큰 (모니터링 읽기 전용) */
  const gTok = new Map();
  const b64u = (buf) => { let s = ""; for (const b of new Uint8Array(buf)) s += String.fromCharCode(b); return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
  async function gToken(sa) {
    const hit = gTok.get(sa.client_email); if (hit && hit.exp > Date.now() + 60000) return hit.tok;
    if (!globalThis.crypto?.subtle) throw new Error("This page isn't on https/localhost, so it can't sign in to Google here — open Mallang Home on your PC once");
    const now = Math.floor(Date.now() / 1000), enc = new TextEncoder();
    const head = b64u(enc.encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
    const claim = b64u(enc.encode(JSON.stringify({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/monitoring.read", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })));
    const der = Uint8Array.from(atob(String(sa.private_key).replace(/-----[^-]+-----/g, "").replace(/\s+/g, "")), (c) => c.charCodeAt(0));
    const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
    const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, enc.encode(head + "." + claim));
    const j = await getJ("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "grant_type=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") + "&assertion=" + head + "." + claim + "." + b64u(sig) });
    gTok.set(sa.client_email, { tok: j.access_token, exp: Date.now() + (Number(j.expires_in) || 3600) * 1000 });
    return j.access_token;
  }
  /* 열쇠 파일을 못 만드는 계정용: 구글 로그인(OAuth) 팝업으로 1시간짜리 토큰 받기 */
  const G_SCOPE = "https://www.googleapis.com/auth/monitoring.read";
  const hasG = (w) => !!(w.sa || (w.gcid && w.proj));
  const gProj = (w) => w.sa?.project_id || String(w.proj || "").trim();
  const oKey = (w) => "o:" + String(w.gcid || "").trim();
  const oValid = (w) => { const h = gTok.get(oKey(w)); return !!h && h.exp > Date.now() + 60000; };
  let gisP = null;
  function gisLoad() {
    if (globalThis.google?.accounts?.oauth2) return Promise.resolve();
    if (gisP) return gisP;
    gisP = new Promise((res, rej) => {
      const sc = document.createElement("script"); sc.src = "https://accounts.google.com/gsi/client"; sc.async = true;
      sc.onload = () => res(); sc.onerror = () => { gisP = null; rej(new Error("Couldn't load Google sign-in")); };
      document.head.appendChild(sc); cleanups.push(() => sc.remove());
    });
    return gisP;
  }
  // 반드시 클릭 안에서 바로 불러야 팝업이 안 막힘
  function gSignIn(w) {
    const cid = String(w.gcid || "").trim();
    if (!globalThis.google?.accounts?.oauth2) { w.mon = { ...(w.mon || {}), at: w.at, err: "Loading Google sign-in… tap ↻ again" }; gisLoad().then(render, (e) => { w.mon.err = errText(e); render(); }); render(); return; }
    const tc = google.accounts.oauth2.initTokenClient({ client_id: cid, scope: G_SCOPE,
      callback: (r) => {
        if (!r?.access_token) { w.mon = { ...(w.mon || {}), at: w.at, err: "Google sign-in was cancelled" }; render(); return; }
        gTok.set(oKey(w), { tok: r.access_token, exp: Date.now() + (Number(r.expires_in) || 3600) * 1000 });
        if (w.mon) w.mon.err = ""; crLookup(w);
      },
      error_callback: (e) => { w.mon = { ...(w.mon || {}), at: w.at, err: e?.type === "popup_closed" ? "Google sign-in was closed" : "Google sign-in: " + (e?.message || e?.type || "failed") }; render(); } });
    tc.requestAccessToken({ prompt: "" });
  }
  async function gAccess(w) {
    if (w.sa) return gToken(w.sa);
    const h = gTok.get(oKey(w)); if (h && h.exp > Date.now() + 60000) return h.tok;
    throw new Error("SIGNIN");
  }
  // [from, to] 동안 Vertex 모델별 입력·출력 토큰 합계 {model: [in, out]}
  async function gTokens(w, fromMs, toMs) {
    const sa = { project_id: gProj(w) };
    const tok = await gAccess(w), sec = Math.max(60, Math.ceil((toMs - fromMs) / 1000));
    const q = new URLSearchParams();
    q.set("filter", 'metric.type="aiplatform.googleapis.com/publisher/online_serving/token_count"');
    q.set("interval.startTime", new Date(toMs - sec * 1000).toISOString()); q.set("interval.endTime", new Date(toMs).toISOString());
    q.set("aggregation.alignmentPeriod", sec + "s"); q.set("aggregation.perSeriesAligner", "ALIGN_SUM"); q.set("aggregation.crossSeriesReducer", "REDUCE_SUM");
    q.append("aggregation.groupByFields", "resource.label.model_user_id"); q.append("aggregation.groupByFields", "metric.label.type");
    const out = {}; let page = "";
    for (let n = 0; n < 10; n++) {
      if (page) q.set("pageToken", page);
      const j = await getJ(`https://monitoring.googleapis.com/v3/projects/${encodeURIComponent(sa.project_id)}/timeSeries?${q}`, { headers: { Authorization: "Bearer " + tok } });
      for (const s of j.timeSeries || []) {
        const m = s.resource?.labels?.model_user_id || "unknown", t = String(s.metric?.labels?.type || "").toLowerCase();
        const v = (s.points || []).reduce((a, p) => a + (Number(p.value?.int64Value ?? p.value?.doubleValue) || 0), 0);
        const r = out[m] || (out[m] = [0, 0]); r[t.startsWith("in") ? 0 : 1] += v;
      }
      page = j.nextPageToken || ""; if (!page) break;
    }
    return out;
  }
  const addTok = (a, b) => { const o = { ...(a || {}) }; for (const [m, r] of Object.entries(b || {})) { const x = (o[m] || [0, 0]).slice(); x[0] += r[0]; x[1] += r[1]; o[m] = x; } return o; };
  // 모니터링 기록은 6주만 남아서, 일주일 넘게 지난 몫은 접어서(base) 보관
  async function gcMonLoad(w) {
    const at = Date.parse(w.at || ""); if (!hasG(w) || !at) return;
    const mon = w.mon && w.mon.at === w.at ? w.mon : (w.mon = { at: w.at, from: at, base: {}, live: {}, upd: 0 });
    const now = Date.now();
    if (now - mon.from > 7 * 86400000) { const cut = now - 86400000; mon.base = addTok(mon.base, await gTokens(w, mon.from, cut)); mon.from = cut; }
    mon.live = await gTokens(w, mon.from, now); mon.upd = now; mon.err = "";
  }
  const monSum = (w) => addTok(w.mon?.base, w.mon?.live);

  // 잔액이 줄어든 만큼 = 쓴 돈 (충전으로 늘면 기준점도 같이 올림) · 통화가 바뀌면 처음부터
  function balTrack(w, last, B, curKey) {
    const now = new Date(), day = ymd(now), ym = day.slice(0, 7);
    let T = w.ntrk; if (!T || T.cur !== curKey) T = w.ntrk = curKey ? { cur: curKey } : {};
    if (T.lastB != null && B > T.lastB + 0.005) { const up = B - T.lastB; if (T.d) T.d.b += up; if (T.m) T.m.b += up; }
    const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), m0 = new Date(now.getFullYear(), now.getMonth(), 1).getTime(), had = T.lastB != null;
    if (!T.d || T.d.k !== day) T.d = { k: day, b: had && T.lastAt < t0 ? T.lastB : B, since: had && T.lastAt < t0 ? t0 : Date.now() };
    if (!T.m || T.m.k !== ym) T.m = { k: ym, b: had && T.lastAt < m0 ? T.lastB : B, since: had && T.lastAt < m0 ? m0 : Date.now() };
    T.lastB = B; T.lastAt = Date.now();
    last.today = Math.max(0, T.d.b - B); last.month = Math.max(0, T.m.b - B); last.daySince = T.d.since; last.monthSince = T.m.since;
  }
  async function crLookup(w) {
    if (w.busy) return;
    w.busy = true; if(isLinkCard(w))w.sorrLinkRevision=2; render();
    try {
      if (w.mode === "gc") {
        if (!hasG(w)) return;
        try { await gcMonLoad(w); } catch (e) { const m = e?.message === "SIGNIN" ? "" : errText(e); if (w.mon) w.mon.err = m; else w.mon = { at: w.at, err: m }; }
        if (w.mon) w.mon.chk = Date.now();
        return;
      }
      if (w.mode === "ds") {
        const keys = String(w.key || "").split(/[\s,]+/).filter(Boolean);
        if (!keys.length) { w.last = { at: Date.now(), err: "Add your DeepSeek key in Edit" }; return; }
        const last = { at: Date.now() };
        try {
          const j = await getJ("https://api.deepseek.com/user/balance", { headers: { Authorization: "Bearer " + keys[0], Accept: "application/json" } });
          const infos = Array.isArray(j?.balance_infos) ? j.balance_infos : [];
          if (!infos.length) throw new Error("unexpected answer");
          const pick = infos.find((x) => x.currency === w.cur && w.curSet) || infos.find((x) => Number(x.total_balance) > 0) || infos[0];
          if (!w.curSet) w.cur = pick.currency === "USD" ? "USD" : "CNY";
          last.c = pick.currency === "USD" ? "USD" : "CNY";
          last.bal = Number(pick.total_balance); last.gr = Number(pick.granted_balance) || 0; last.tp = Number(pick.topped_up_balance) || 0; last.avail = j.is_available !== false;
          if (!(last.bal >= 0)) throw new Error("unexpected answer");
          balTrack(w, last, last.bal, last.c);
        } catch (e) { last.err = "Balance: " + errText(e) + (/fetch|network|failed/i.test(errText(e)) ? " — the browser may be blocked from reading it" : ""); }
        w.last = last; return;
      }
      if (w.mode === "or") {
        const keys = String(w.key || "").split(/[\s,]+/).filter(Boolean).slice(0, 12), mg = String(w.mgmt || "").trim();
        if (!keys.length && !mg) { w.last = { at: Date.now(), err: "Add your OpenRouter key in Edit" }; return; }
        const last = { at: Date.now(), keys: 0 };
        let td = 0, mo = 0, used = 0, lim = 0, limRem = 0, limN = 0; const errs = [];
        for (const k of keys) {
          try {
            const j = (await getJ("https://openrouter.ai/api/v1/key", { headers: { Authorization: "Bearer " + k } }))?.data;
            if (!j) throw new Error("unexpected answer");
            td += Number(j.usage_daily) || 0; mo += Number(j.usage_monthly) || 0; used += Number(j.usage) || 0; last.keys++;
            if (j.limit != null && j.limit_remaining != null) { lim += Number(j.limit) || 0; limRem += Number(j.limit_remaining) || 0; limN++; }
          } catch (e) { errs.push("Key: " + errText(e)); }
        }
        if (last.keys) { last.today = td; last.month = mo; last.used = used; }
        // 계정 잔액: 관리 키(없으면 첫 키)로 /credits → 안 되면 적어 둔 잔액에서 쓴 만큼 빼기 → 안 되면 키 한도
        const ck = mg ? [mg] : keys.slice(0, 1);
        for (const k of ck) {
          try { const c = (await getJ("https://openrouter.ai/api/v1/credits", { headers: { Authorization: "Bearer " + k } }))?.data; const a = Number(c?.total_credits), b = Number(c?.total_usage); if (a >= 0 && b >= 0) { last.bal = Math.max(0, a - b); last.total = a; last.balSrc = "credits"; if (!last.used) last.used = b; } } catch (e) { last.creditErr = errText(e); }
        }
        if (last.bal == null && w.rbal !== "" && w.rbal != null && last.used != null) {
          if (w.rbase == null) w.rbase = last.used;
          last.bal = Math.max(0, Number(w.rbal) - (last.used - (Number(w.rbase) || 0))); last.total = Number(w.rbal); last.balSrc = "typed";
        }
        if (last.bal == null && limN) { last.bal = limRem; last.total = lim; last.balSrc = "limit"; }
        if (!last.keys && !last.today && errs.length) last.err = errs[0];
        else if (errs.length) last.err = errs.join(" · ");
        w.last = last; return;
      }
      if (w.mode === "nano") {
        const last = { at: Date.now() };
        const nkeys = String(w.key || "").split(/[\s,]+/).filter(Boolean).slice(0, 12);
        // 키별 사용 내역 (날짜·모델별 요청·토큰·금액, UTC 날짜) — 이번 달 1일(UTC)부터
        if (nkeys.length) {
          try {
            const now = new Date(), iso = (d) => d.toISOString().slice(0, 10);
            const mFrom = iso(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))), wFrom = iso(new Date(Date.now() - 8 * 86400000)), to = iso(now);
            const from = wFrom < mFrom ? wFrom : mFrom;
            const days = {};
            for (const k of nkeys) {
              const j = await getJ(`https://api.nano-gpt.com/api/v1/usage?from=${from}&to=${to}&group_by=day,model`, { headers: { Authorization: "Bearer " + k } })
                .catch(() => getJ(`https://nano-gpt.com/api/v1/usage?from=${from}&to=${to}&group_by=day,model`, { headers: { Authorization: "Bearer " + k } }));
              for (const x of j.byDayModel || []) {
                const D = days[x.date] || (days[x.date] = {}), r = D[x.model] || (D[x.model] = { c: 0, n: 0, i: 0, o: 0, th: 0 });
                r.c += Number(x.netCostUsd ?? x.costUsd) || 0; r.n += Number(x.requests) || 0; r.i += Number(x.inputTokens) || 0; r.o += Number(x.outputTokens) || 0; r.th += Number(x.reasoningTokens) || 0;
              }
            }
            last.nu = { days, today: iso(now), month: mFrom, at: Date.now() };
          } catch (e) { last.errUse = "Usage: " + errText(e); }
        }
        if (w.key) {
          try { const j = await getJ("https://nano-gpt.com/api/check-balance", { method: "POST", headers: { "x-api-key": nkeys[0] || String(w.key).trim() } }); last.bal = Number(j.usd_balance); if (!(last.bal >= 0)) throw new Error("unexpected answer"); }
          catch (e) { last.err = "Balance: " + errText(e); }
        }
        // 구독: 골라 둔 연결, 없으면 나노지피티 연결을 차례로 시도
        const cand = w.conn ? [w.conn] : (data.conns || []).filter((c) => /nano/i.test(String(c.provider || ""))).map((c) => c.id);
        if (!cand.length && !w.subOff) last.errSub = "Subscription: no NanoGPT connection found in Marinara";
        if (cand.length) {
          try {
            let u = null, lastE = null;
            for (const id of cand) { try { u = await api(`/connections/${encodeURIComponent(id)}/subscription-usage`); if (u && (u.active != null || u.dailyInputTokens || u.weeklyInputTokens)) { last.subConn = id; break; } u = null; } catch (e) { lastE = e; } }
            if (!u) throw lastE || new Error("no subscription");
            const win = (x, lim) => x ? { used: x.used, rem: x.remaining, pct: x.percentUsed, reset: x.resetAt, lim } : null;
            last.sub = { active: !!u.active, state: u.state || "", d: win(u.dailyInputTokens, u.limits?.dailyInputTokens), wk: win(u.weeklyInputTokens, u.limits?.weeklyInputTokens), end: u.currentPeriodEnd || null };
          } catch (e) { last.errSub = "Subscription: " + errText(e); }
        }
        if (last.bal >= 0) balTrack(w, last, last.bal);
        if (last.nu) {
          let td = 0, mo = 0; for (const [d, D] of Object.entries(last.nu.days)) for (const r of Object.values(D)) { if (d >= (last.nu.month || "")) mo += r.c; if (d === last.nu.today) td += r.c; }
          last.today = td; last.month = mo; last.fromUsage = true;
        }
        w.last = last; return;
      }
      const base = String(w.url || "").trim().replace(/\/+$/, "").replace(/\/v1$/, ""), key = String(w.key || "").trim();
      const tok = String(w.tok || "").trim(), uid = String(w.uid || "").trim();
      if (!base || (!key && !tok)) { w.last = { at: Date.now(), err: "Add the site address and an access token (or key) in Edit" }; return; }
      // ① 계정 접근 토큰 (New API: 개인 설정 → 시스템 접근 토큰) — 계정 잔액과 기간별 사용액이 정확
      let acctErr = "";
      if (tok) {
        try {
          let qpu = 500000, mul = 1, cur = "USD";
          try { const st = (await getJ(base + "/api/status"))?.data || {}; qpu = Number(st.quota_per_unit) || qpu;
            const dt = String(st.quota_display_type || "").toUpperCase(); if (dt === "CNY") { cur = "CNY"; mul = Number(st.usd_exchange_rate) || 1; } } catch {}
          const conv = (q) => (Number(q) || 0) / qpu * mul;
          const h = { Authorization: "Bearer " + tok, ...(uid ? { "New-Api-User": uid } : {}) };
          const me = await getJ(base + "/api/user/self", { headers: h });
          if (me && me.success === false) throw new Error((me.message || "refused") + (uid ? "" : " — try adding your User ID"));
          const rem = conv(me.data?.quota), used = conv(me.data?.used_quota);
          const now = new Date(), sec = (t) => Math.floor(t / 1000);
          const stat = async (from) => { const j = await getJ(`${base}/api/log/self/stat?type=0&start_timestamp=${sec(from)}&end_timestamp=${sec(Date.now())}`, { headers: h }); if (j && j.success === false) throw new Error(j.message || "refused"); return conv(j.data?.quota); };
          let today = null, month = null;
          try { today = await stat(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()); month = await stat(new Date(now.getFullYear(), now.getMonth(), 1).getTime()); } catch {}
          if (!w.curSet) w.cur = cur;
          w.last = { at: Date.now(), total: rem + used, used, rem, month, today, acct: true };
          return;
        } catch (e) { acctErr = "Access token: " + errText(e); w.last = { at: Date.now(), err: acctErr }; if (!key) return; }
      }
      // ② API 키로: 키들이 지금까지 쓴 총액을 재서 기록 → 오늘·이번 달 = 지금 − 기준점, 잔액 = 적어 둔 잔액 − 그 뒤로 쓴 만큼
      try {
        const keys = key.split(/[\s,]+/).filter(Boolean).slice(0, 12), end = ymd(new Date(Date.now() + 86400000));
        let U = 0;
        for (const k of keys) {
          const u = await getJ(`${base}/v1/dashboard/billing/usage?start_date=2023-01-01&end_date=${end}`, { headers: { Authorization: "Bearer " + k } });
          const v = Number(u.total_usage) / 100; if (!(v >= 0)) throw new Error("unexpected answer"); U += v;
        }
        const now = new Date(), day = ymd(now), ym = day.slice(0, 7);
        const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(), m0 = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        const T = w.trk && w.trk.keys === keys.join(" ").length + ":" + keys.length ? w.trk : (w.trk = { keys: keys.join(" ").length + ":" + keys.length });
        const had = T.lastU != null;
        if (!T.d || T.d.k !== day) T.d = { k: day, u: had && T.lastAt < t0 ? T.lastU : U, since: had && T.lastAt < t0 ? t0 : Date.now() };
        if (!T.m || T.m.k !== ym) T.m = { k: ym, u: had && T.lastAt < m0 ? T.lastU : U, since: had && T.lastAt < m0 ? m0 : Date.now() };
        T.lastU = U; T.lastAt = Date.now();
        if (w.rbal !== "" && w.rbal != null && w.rbase == null) w.rbase = U;
        const rem = w.rbal !== "" && w.rbal != null ? Math.max(0, Number(w.rbal) - (U - (Number(w.rbase) || 0))) : null;
        let today = Math.max(0, U - T.d.u), month = Math.max(0, U - T.m.u), daySince = T.d.since, monthSince = T.m.since, src = "trk";
        // 키 사용 로그: 요청마다 시각·금액 (최근 1,000건씩) → 이 기기에 쌓아 두고 오늘·이번 달 계산
        let logInfo = "", logN = 0;
        try {
          const qpu = await relayQpu(w, base);
          const store = relayLogStore(w); if(isLinkCard(w)&&store.linkSchema!==2){store.legacyRows=store.rows;store.rows=[];store.ids={};delete store.first0;store.linkSchema=2;} const before = store.rows.length;
          let capped = false, okAny = false, lastErr = "";
          for (const k of keys) {
            let j = null;
            const tries = [...new Set([w.logWay, "hdr", "q", "qs"].filter(Boolean))];
            for (const way of tries) {
              try {
                const url = way === "hdr" ? `${base}/api/log/token` : `${base}/api/log/token?key=${encodeURIComponent(way === "qs" ? k.replace(/^sk-/, "") : k)}`;
                const r = await getJ(url, way === "hdr" ? { headers: { Authorization: "Bearer " + k } } : undefined);
                const rows = Array.isArray(r?.data) ? r.data : Array.isArray(r?.data?.items) ? r.data.items : Array.isArray(r?.data?.logs) ? r.data.logs : null;
                if (!r || r.success === false || !rows) throw new Error(r?.message || "no list");
                j = rows; w.logWay = way; break;
              } catch (e) { lastErr = errText(e); }
            }
            if (!j) continue;
            okAny = true; if (j.length >= 1000) capped = true;
            for (const r of j) {
              const t = (Number(r.created_at) || 0) * 1000; if (!t) continue;
              const id = String(r.id ?? `${r.created_at}:${r.quota}:${r.model_name}:${r.prompt_tokens}`);
              if (store.ids[id]) continue; store.ids[id] = 1;
              store.rows.push([t, (Number(r.quota) || 0) / qpu, String(r.model_name || ""),r.id==null?null:String(r.id)]);
            }
          }
          if (!okAny) throw new Error(lastErr || "no logs");
          relayLogSave(w, store);
          const first = store.rows.reduce((a, r) => Math.min(a, r[0]), Infinity);
          let td = 0, mo = 0;
          for (const [t, q] of store.rows) { if (t >= m0) mo += q; if (t >= t0) td += q; }
          // 1,000건 한도에 걸렸고 그보다 앞선 기록이 없으면, 그 앞은 채팅 기록으로 채움(아래 relayPeriods)
          const cover = store.first0 ? Math.min(store.first0, first) : first;
          today = td; month = mo; src = "logs";
          daySince = capped && cover > t0 ? cover : t0; monthSince = capped && cover > m0 ? cover : m0;
          if (!capped && first < Infinity) store.first0 = Math.min(store.first0 || first, m0);
          logN = store.rows.length; logInfo = `✓ usage log · ${logN.toLocaleString("en-US")} requests kept${store.rows.length > before ? ` (+${store.rows.length - before})` : ""}`;
          relayLogSave(w, store);
        } catch (e) { logInfo = "usage log: " + errText(e); }
        // 실시간 단가표 (6시간마다)
        if (!w.lp || Date.now() - (w.lp.at || 0) > 6 * 3600000) relayPricing(w, base).catch(() => {});
        w.last = { at: Date.now(), trk: true, src, logCapped:src==='logs'&&(daySince>t0||monthSince>m0), used: U, today, month, daySince, monthSince, rem, total: rem != null ? Number(w.rbal) : null, acctErr, logInfo };
      } catch (e) { w.last = { at: Date.now(), err: (acctErr ? acctErr + " · " : "") + "Key: " + errText(e) }; }
    } finally { w.busy = false; savePrefs(); render(); }
  }
  function crAuto() {
    if (wid().some((w) => w.kind === "credit" || w.kind === "rcpt")) fxLoad(false);
    if (wid().some((w) => w.kind === "credit" && w.mode === "gc" && !w.sa && w.gcid)) gisLoad().catch(() => {});
    for (const w of wid()) {
      if (w.kind !== "credit" || w.busy) continue;
      const ready = w.mode === "relay" ? w.url && (w.key || w.tok) : w.mode === "ds" || w.mode === "or" ? w.key || w.mgmt : w.mode === "nano" ? w.key || w.conn || (data.conns || []).some((c) => /nano/i.test(String(c.provider || ""))) : w.at && (w.sa || (hasG(w) && oValid(w)));
      const last = w.mode === "gc" ? w.mon?.chk || 0 : w.last?.at || 0;
      if (ready && (Date.now() - last > 30 * 60000 || isLinkCard(w)&&w.sorrLinkRevision!==2)) crLookup(w);
    }
  }
  const tm = (t) => new Date(t).toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" });
  function creditHTML(w) {
    w.mode = w.mode || "gc"; w.scope = w.scope || "vertex"; w.cur = w.cur || "USD"; w.gcur = w.gcur || "USD";
    const ed = widEdit === w.id, P = apw(), mode = w.mode;
    // 구글 콘솔이 원화로 보여 주면 원화로: 잔액·총액은 ₩, 사용 금액($ 단가)은 구글 환율로 바꿔서 뺌
    const KRW = mode === "gc" && w.gcur === "KRW";
    const gRate = Number(w.grate) || (KRW && Number(w.tot) > 1000 ? Number(w.tot) / 300 : usdKrw());
    const cur = KRW ? "₩" : (mode === "relay" || mode === "ds") && w.cur === "CNY" ? "CN¥" : "$", rate = KRW ? 0 : cur === "CN¥" ? cnyKrw() : usdKrw();
    const money = KRW ? (v) => "₩" + Math.round(v).toLocaleString("ko-KR") : (v) => cur + (v >= 1000 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2));
    const toG = (usdV) => KRW ? usdV * gRate : usdV;
    let total = 0, rem = null, sub = "", foot = "", warn = "", extra = "", err = "", chk = 0;
    if (mode === "gc") {
      total = Number(w.tot) || (KRW ? 0 : 300);
      if (w.at && Number(w.bal) >= 0 && w.bal !== "" && w.bal != null) {
        const since = new Date(w.at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric" });
        if (hasG(w) && w.mon && w.mon.at === w.at && w.mon.upd) {
          const T = monSum(w); let cost = 0, tin = 0, tout = 0; const nop = [];
          for (const [m, r] of Object.entries(T)) { tin += r[0]; tout += r[1]; const c = apCost("google_vertex" + SEP + m, r[0], r[1]); if (c == null) { if (r[0] + r[1] > 0) nop.push(m); } else cost += c; }
          rem = Math.max(0, Number(w.bal) - toG(cost));
          sub = `used since ${since}: ${money(toG(cost))} · ${kTok(tin)} ↑ ${kTok(tout)} ↓`;
          extra = `<div class="mlh-cr-tag">✓ counted by Google — chats, agents, extensions, every device</div>`;
          if (nop.length) warn = `✎ needs a price on the receipt: ${nop.map(esc).join(", ")}`;
        } else {
          const S = apSum(Date.parse(w.at) || 0, crScopeOk(w));
          rem = Math.max(0, Number(w.bal) - toG(S.cost));
          sub = `used since ${since}: ${money(toG(S.cost))} · ${S.n} req`;
          if (S.unpriced) warn = `✎ ${S.unpriced} request${S.unpriced > 1 ? "s" : ""} without a price — set prices on the receipt`;
          if (hasG(w)) extra = `<div class="mlh-cr-tag">${w.busy ? "asking Google…" : !w.sa && !oValid(w) ? "tap ↻ to sign in with Google and count everything — using chat records for now" : "Google count not loaded yet — using chat records"}</div>`;
        }
      }
      if (w.mon?.err) err = "Google: " + w.mon.err;
      chk = w.mon?.upd || 0;
      if (w.exp) { const dl = Math.ceil((new Date(w.exp + "T23:59:59").getTime() - Date.now()) / 86400000); foot = `Expires ${esc(w.exp)} · ${dl >= 0 ? "D-" + dl : "expired"}`; }
    } else if (mode === "ds") {
      const L = w.last || {};
      if (L.bal >= 0) { rem = L.bal; total = 0; sub = `granted ${money(L.gr || 0)} · topped up ${money(L.tp || 0)}${L.avail === false ? " · ⚠ balance too low to call" : ""}`; }
      if (L.today != null) {
        extra += `<div class="mlh-rc-line"><span>Today</span><i></i><b>${money(L.today)}</b><em>${won(L.today, rate)}</em></div><div class="mlh-rc-line"><span>This month</span><i></i><b>${money(L.month)}</b><em>${won(L.month, rate)}</em></div>`;
        const mstart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
        extra += `<div class="mlh-cr-tag">from the balance going down${L.monthSince > mstart + 60000 ? ` — counting since ${esc(new Date(L.monthSince).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }))}` : ""} · includes agents and extensions</div>`;
      }
      err = L.err || ""; chk = L.at || 0;
    } else if (mode === "or") {
      const L = w.last || {};
      if (L.bal != null) { rem = L.bal; total = L.total > 0 ? L.total : 0; sub = L.balSrc === "credits" ? `credits ${money(L.total)} · used ${money(L.used || 0)}` : L.balSrc === "typed" ? `typed balance, counting down by what your keys spend` : `key limit ${money(L.total)} (account balance needs a management key)`; }
      if (L.today != null) extra += `<div class="mlh-rc-line"><span>Today</span><i></i><b>${money(L.today)}</b><em>${won(L.today, rate)}</em></div><div class="mlh-rc-line"><span>This month</span><i></i><b>${money(L.month)}</b><em>${won(L.month, rate)}</em></div><div class="mlh-cr-tag">✓ from OpenRouter, ${L.keys} key${L.keys > 1 ? "s" : ""} · days and months in UTC (a day starts 9 AM KST)</div>`;
      if (L.bal == null && L.today != null) warn = "For the account balance add a management key in Edit, or type the balance shown on OpenRouter once.";
      err = L.err || ""; chk = L.at || 0;
    } else if (mode === "nano") {
      const L = w.last || {};
      if (L.bal >= 0) { rem = L.bal; total = 0; }
      const S = L.sub?.active===true?L.sub:null, bar = (x, label) => {
        if (!x) return "";
        const lim = Number(x.lim) || (Number(x.used) + Number(x.rem)) || 0, used = Number(x.used) || 0;
        const pct = x.pct != null ? Number(x.pct) * (Number(x.pct) <= 1 ? 100 : 1) : lim ? used / lim * 100 : 0;
        const left = Math.max(0, 100 - pct);
        return `<div class="mlh-cr-subq"><div><span>${label}</span><b>${Math.round(Math.min(100, pct))}% used · ${kTok(Number(x.rem) || Math.max(0, lim - used))} left</b><em>${x.reset ? "resets " + esc(new Date(Number(x.reset)).toLocaleString("en-US", { weekday: "short", hour: "numeric", minute: "2-digit" })) : ""}</em></div><div class="mlh-cr-bar"><i style="width:${left.toFixed(1)}%"></i></div></div>`;
      };
      if (L.today != null) {
        const st = (t) => new Date(t).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
        extra += `<div class="mlh-rc-line"><span>Today</span><i></i><b>${money(L.today)}</b><em>${won(L.today, rate)}</em></div><div class="mlh-rc-line"><span>This month</span><i></i><b>${money(L.month)}</b><em>${won(L.month, rate)}</em></div>`;
        if (L.fromUsage) extra += `<div class="mlh-cr-tag">✓ from NanoGPT's usage log (days in UTC — "today" starts 9 AM KST)</div>`;
        else if (L.monthSince > new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() + 60000) extra += `<div class="mlh-cr-tag">counting since ${esc(st(L.monthSince))} — from the balance going down</div>`;
      }
      if (S) extra += `<div class="mlh-cr-subs"><div class="mlh-ptl">Subscription · ${S.active ? "active" : esc(S.state || "inactive")}</div>${bar(S.d, "Today")}${bar(S.wk, "This week")}${S.end ? `<div class="mlh-cr-sub">renews ${esc(new Date(S.end).toLocaleDateString("en-US", { month: "short", day: "numeric" }))}</div>` : ""}</div>`;
      err = [L.err, L.errSub, L.errUse].filter(Boolean).join(" · ");
      chk = L.at || 0;
    } else if (w.last && w.last.trk) {
      const L = w.last, sinceTxt = (t) => new Date(t).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
      rem = L.rem; total = 0;
      sub = `keys used ${money(L.used)} in total${w.rbal !== "" && w.rbal != null ? ` · ${money(Math.max(0, L.used - (Number(w.rbase) || 0)))} since you entered the balance` : ""}`;
      const PR = relayPeriods(w);
      extra += `<div class="mlh-rc-line"><span>Today</span><i></i><b>${money(PR.today)}</b><em>${won(PR.today, rate)}</em></div>`;
      extra += `<div class="mlh-rc-line"><span>This month</span><i></i><b>${money(PR.month)}</b><em>${won(PR.month, rate)}</em></div>`;
      extra += `<div class="mlh-cr-tag">${L.src === "logs" ? (PR.fm > 0 ? `from the site's usage log · before ${esc(sinceTxt(L.monthSince))}: estimated from Marinara chats` : "✓ from the site's usage log") : PR.fm > 0 || PR.ft > 0 ? `before ${esc(sinceTxt(L.monthSince))}: estimated from Marinara chats · after: the site's own count` : `counting since ${esc(sinceTxt(L.monthSince))} (the site's own count)`}</div>`;
      extra += `<div class="mlh-cr-tag">${esc(L.logInfo || "")}${w.lp ? ` · ${w.lp.err ? "live prices: " + esc(w.lp.err) : `✓ live prices · ${w.lp.n} models`}` : ""}</div>`;
      if (rem == null) warn = "Enter the balance shown on the site in Edit once — it will go down by what your keys spend.";
      chk = L.at;
    } else if (w.last && !w.last.err && w.last.total >= 0) {
      total = w.last.total; rem = w.last.rem; sub = w.last.acct ? `used ${money(w.last.used)} in total` : `this key: used ${money(w.last.used)} of its ${money(w.last.total)} limit`;
      if (w.last.today != null) extra += `<div class="mlh-rc-line"><span>Today</span><i></i><b>${money(w.last.today)}</b><em>${won(w.last.today, rate)}</em></div>`;
      if (w.last.month != null) extra += `<div class="mlh-rc-line"><span>This month</span><i></i><b>${money(w.last.month)}</b><em>${won(w.last.month, rate)}</em></div>`;
      chk = w.last.at;
    } else { err = w.last?.err || ""; chk = w.last?.at || 0; }
    const pct = rem != null && total > 0 ? Math.max(0, Math.min(100, rem / total * 100)) : 0;
    const title = esc(w.name || (mode === "gc" ? "Google Cloud" : mode === "nano" ? "NanoGPT" : mode === "ds" ? "DeepSeek" : mode === "or" ? "OpenRouter" : "API Credit"));
    const tag = mode === "gc" ? `FREE TRIAL · ${KRW ? (Number(w.tot) ? money(Number(w.tot)) : "₩") : "$" + (Number(w.tot) || 300)}` : mode === "nano" ? (w.last?.sub?.active===true?"충전 잔액 · 활성 구독 별도 표시":"충전 잔액 · 종량제") : mode === "ds" ? "BALANCE · API.DEEPSEEK.COM" : mode === "or" ? "CREDITS · OPENROUTER.AI" : esc(String(w.url || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "RELAY API");
    const fld = (k, label, type, ph, ex = "") => `<label class="mlh-wxset"><span class="mlh-ptl">${label}</span><input class="mlh-input" type="${type}" data-fk="cr-${w.id}-${k}" data-cr="${k}" data-wid="${w.id}" value="${esc(w[k] ?? "")}" placeholder="${ph}" ${ex}></label>`;
    const nanoConns = (data.conns || []).filter((c) => /nano/i.test(String(c.provider || "")));
    const kinds = { gc: () => `${chips("Currency", "crgcur", w, "gcur", [["USD", "$"], ["KRW", "₩"]])}
          ${fld("bal", `Remaining now (${KRW ? "₩" : "$"}) — total minus used, from the Cloud console`, "number", KRW ? "e.g. 378023" : "e.g. 287.40", 'min="0" step="any" inputmode="decimal"')}
          ${fld("tot", `Total credit (${KRW ? "₩" : "$"})`, "number", KRW ? "e.g. 407626" : "300", 'min="0" step="any"')}
          ${fld("lag", "Console delay (hours) — the console balance is usually ~24h behind", "number", "24", 'min="0" max="72" step="1"')}
          ${KRW ? fld("grate", `₩ per $1 — Google's rate (empty = total ÷ 300 = ${Math.round(gRate * 100) / 100})`, "number", String(Math.round(gRate * 100) / 100), 'min="0" step="any"') : ""}
          ${fld("exp", "Expires on", "date", "", "")}
          <div class="mlh-wxset"><span class="mlh-ptl">Count Vertex with Google (optional) — sign-in</span></div>
          ${fld("gcid", "OAuth client ID", "text", "1234…apps.googleusercontent.com", 'autocomplete="off" spellcheck="false"')}
          ${fld("proj", "Project ID", "text", "e.g. concise-wharf-513208-j1", 'autocomplete="off" spellcheck="false"')}
          <div class="mlh-empty">Allowed origin for the client ID: <b>${esc(location.origin)}</b></div>
          <div class="mlh-wxset"><span class="mlh-ptl">…or a service account key file</span>
            ${w.sa ? `<div class="mlh-empty">✓ ${esc(w.sa.client_email)} · ${esc(w.sa.project_id)} <button type="button" class="mlh-link" data-wa="crsax" data-wid="${w.id}">Remove</button></div>`
              : `<textarea class="mlh-input" rows="3" data-cr="sa" data-wid="${w.id}" spellcheck="false" placeholder="Paste the service account key (.json) here"></textarea>`}
            ${w.saErr ? `<div class="mlh-empty mlh-perr">${esc(w.saErr)}</div>` : ""}
          </div>
          ${hasG(w) ? "" : chips("Count", "crscope", w, "scope", [["vertex", "Vertex only"], ["google", "All Google"]])}
          <div class="mlh-empty">Each time you enter the balance, it starts counting again from now. Costs use the prices on the API receipt.</div>`,
      relay: () => `${fld("linkAccount", "공유 계정 그룹 · 같은 계정 키는 같은 이름, 비우면 기본 계정", "text", "기본 계정")} ${fld("url", "Site address", "url", "https://api.linkapi.ai", 'autocomplete="off"')}
          ${fld("tok", "Access token (optional — some sites block it in the browser)", "password", "the long token from your account page", 'autocomplete="off"')}
          ${fld("uid", "User ID — shown on the same page", "text", "e.g. 1234", 'autocomplete="off" inputmode="numeric"')}
          ${fld("key", "API keys — every key you use with this site, separated by spaces", "password", "sk-aaa sk-bbb …", 'autocomplete="off"')}
          ${fld("mul", "Price multiplier for estimates (LinkAPI: 1.6 · not for per-call or -r models)", "number", /linkapi/i.test(hostOf(w.url)) ? "1.6" : "1", 'min="0" step="any"')}
          ${fld("rbal", "Balance now — as shown on the site (then it counts down by itself)", "number", "e.g. 97.62", 'min="0" step="any" inputmode="decimal"')}
          ${chips("Currency", "crcur", w, "cur", [["USD", "$"], ["CNY", "CN¥"]])}
          <label class="mlh-wxset"><span class="mlh-ptl">Marinara connections for this site (the receipt uses the site's own total for them)</span><select class="mlh-input" data-crconn="${w.id}"><option value="">Auto — ${(() => { const n = w.conn ? 0 : relayConns(w).length; return w.conn ? "match by site address" : n ? `${n} connection${n > 1 ? "s" : ""} use ${esc(hostOf(w.url))}` : "no connection uses this address yet"; })()}</option>${(data.conns || []).filter((c) => !/nano|google|anthropic|claude/i.test(String(c.provider || ""))).map((c) => `<option value="${esc(c.id)}"${w.conn === c.id ? " selected" : ""}>${esc(c.name || c.model || c.id)} · ${esc(c.provider)}</option>`).join("")}</select></label>
          <div class="mlh-empty">Works with sites built on One API / New API. Checks every 30 min or with ↻.</div>`,
      ds: () => `${fld("key", "API key — from platform.deepseek.com → API keys (one is enough: the balance belongs to the account)", "password", "sk-…", 'autocomplete="off"')}
          ${chips("Currency", "crcur", w, "cur", [["CNY", "CN¥"], ["USD", "$"]])}
          <div class="mlh-empty">DeepSeek shows the balance only. Today and this month are counted from how much the balance goes down, so they start counting from the first check. Checks every 30 min or with ↻.</div>`,
      or: () => `${fld("key", "API keys — every OpenRouter key you use, separated by spaces", "password", "sk-or-v1-…", 'autocomplete="off"')}
          ${fld("mgmt", "Management key (optional) — only for the account balance", "password", "sk-or-v1-… (Settings → Management keys)", 'autocomplete="off"')}
          ${fld("rbal", "…or type the balance shown on OpenRouter once (then it counts down by itself)", "number", "e.g. 12.50", 'min="0" step="any" inputmode="decimal"')}
          <div class="mlh-empty">Today and this month come from each key's own usage numbers (UTC days). Checks every 30 min or with ↻.</div>`,
      nano: () => `${fld("key", "API keys — every NanoGPT key you use (agents too), separated by spaces. The first one is used for the balance.", "password", "your NanoGPT keys", 'autocomplete="off"')}
          <label class="mlh-wxset"><span class="mlh-ptl">구독 중인 경우만 · 구독 조회 연결(선택)</span><select class="mlh-input" data-crconn="${w.id}"><option value="">Auto — ${nanoConns.length ? `${nanoConns.length} NanoGPT connection${nanoConns.length > 1 ? "s" : ""}` : "no NanoGPT connection"}</option>${nanoConns.map((c) => `<option value="${esc(c.id)}"${w.conn === c.id ? " selected" : ""}>${esc(c.name || c.model || c.id)}</option>`).join("")}</select></label>
          <div class="mlh-empty">충전식만 사용하면 구독 연결은 선택하지 않아도 돼요. 활성 구독이 확인될 때만 구독 사용량을 따로 표시합니다.</div>` };
    const tools = ed ? `<div class="mlh-ptools">${moveTools(w)}${chips("Type", "crmode", w, "mode", [["gc", "Google Cloud"], ["relay", "Relay API"], ["nano", "NanoGPT"], ["ds", "DeepSeek"], ["or", "OpenRouter"]])}
        ${fld("name", "Name", "text", title, 'maxlength="40"')}
        ${(kinds[mode] || kinds.gc)()}
        <div class="mlh-pfoot"><button type="button" class="mlh-link" data-wa="del" data-wid="${w.id}">Delete</button></div>${delTools(w, "Delete this credit widget?")}</div>` : "";
    const hint = mode === "gc" ? "Tap Edit and enter your remaining credit ☁" : w.busy ? "Checking…" : (mode === "nano" || mode === "ds" || mode === "or") ? (w.key ? "" : "Add your key in Edit to see the balance ✦") : "Tap Edit and add the site and key ✦";
    const body = rem == null ? (w.last?.keyOnly ? `<div class="mlh-cr-sub">${sub}</div>` : hint ? `<div class="mlh-empty">${esc(hint)}</div>` : "")
      : `<div class="mlh-cr-big"><b>${money(rem)}</b>${total > 0 ? `<span>/ ${money(total)}</span>` : ""}</div>
        ${rate > 0 ? `<div class="mlh-cr-won">${won(rem, rate)}</div>` : ""}
        ${total > 0 ? `<div class="mlh-cr-bar"><i style="width:${pct.toFixed(1)}%"></i></div>` : ""}
        ${sub ? `<div class="mlh-cr-sub">${sub}</div>` : ""}`;
    const canRe = mode !== "gc" || hasG(w);
    return `<section class="mlh-card mlh-crcard" data-mode="${mode}">
      <div class="mlh-card-head"><h2 class="mlh-card-title">크레딧 잔액</h2><button type="button" class="mlh-link" data-wa="${ed ? "done" : "edit"}" data-wid="${w.id}">${ed ? "Done" : "Edit"}</button></div>
      ${tools}
      <div class="mlh-cr">
        <div class="mlh-cr-brand"><i class="mlh-cr-ico" aria-hidden="true"></i><span><b>${title}</b><em>${tag}</em></span>${canRe ? `<button type="button" class="mlh-wxre" data-crre="${w.id}" title="Check now" aria-label="Check now"${w.busy ? " disabled" : ""}>↻</button>` : ""}</div>
        ${body}${extra}
        ${warn ? `<div class="mlh-rc-note">${warn}</div>` : ""}
        ${err ? `<div class="mlh-empty mlh-perr">${esc(err)}</div>` : ""}
        ${foot || chk ? `<div class="mlh-cr-foot">${[foot, chk ? "checked " + esc(tm(chk)) : ""].filter(Boolean).join(" · ")}</div>` : ""}
      </div>
    </section>`;
  }
  function apClick(t) {
    if (t.closest("[data-apre]")) { apScan(true); return true; }
    if (t.closest("[data-apall]")) { ap.allModels = !ap.allModels; render(); return true; }
    const cr = t.closest("[data-crre]"); if (cr) {
      const w = widById(cr.dataset.crre);
      if (w) { if (w.mon) w.mon.chk = 0; if (w.mode === "gc" && !w.sa && hasG(w) && !oValid(w)) gSignIn(w); else crLookup(w); }
      return true;
    }
    const b = t.closest("[data-wa]"); if (!b) return false;
    const a = b.dataset.wa, w = b.dataset.wid ? widById(b.dataset.wid) : null, v = b.dataset.v;
    if (a === "addrcpt") { startOpen = false; if (!wid().some((x) => x.kind === "rcpt")) { const m = { id: newWid(), kind: "rcpt", col: 1, slot: 9 }; wid().push(m); savePrefs(); apScan(true); } render(); return true; }
    if (a === "addcredit") { startOpen = false; if (wid().filter((x) => x.kind === "credit").length < CR_MAX) { const m = { id: newWid(), kind: "credit", col: 1, slot: 9, mode: "gc", tot: 300, scope: "vertex" }; wid().push(m); widEdit = m.id; savePrefs(); } render(); return true; }
    if (!w) return false;
    if (a === "crmode") { if (w.mode !== v) { w.mode = v; w.last = null; w.key = ""; w.mgmt = ""; w.rbal = ""; delete w.rbase; delete w.ntrk; delete w.curSet; w.cur = v === "ds" ? "CNY" : "USD"; } }
    else if (a === "crscope") w.scope = v;
    else if (a === "crcur") { w.cur = v; w.curSet = true; if (w.mode === "ds") { delete w.ntrk; w.last = null; savePrefs(); crLookup(w); } }
    else if (a === "apdisp") apw().disp = v;
    else if (a === "apscur") { const prov = b.dataset.prov; if (prov != null) apw().siteCur[prov] = v; }
    else if (a === "apinvx") { const prov = b.dataset.prov, P = apw(); if (prov != null) P.inVx = { ...(P.inVx || {}), [prov]: !P.inVx?.[prov] }; }
    else if (a === "appre") { const prov = b.dataset.prov, P = apw(); if (prov != null) { P.sitePre = { ...(P.sitePre || {}), [prov]: v }; if (PRESETS[v]) { P.siteCur[prov] = PRESETS[v].cur; } } }
    else if (a === "crgcur") { if (w.gcur !== v) { w.gcur = v; w.bal = ""; w.at = ""; w.tot = v === "KRW" ? "" : 300; delete w.mon; } }
    else if (a === "crsax") { delete w.sa; delete w.mon; w.saErr = ""; }
    else return false;
    savePrefs(); render(); crAuto(); return true;
  }
  function apChange(t) {
    if (t instanceof HTMLSelectElement && t.dataset.crconn) {
      const w = widById(t.dataset.crconn); if (w) { w.conn = t.value; savePrefs(); render(); crLookup(w); } return true;
    }
    if (t instanceof HTMLTextAreaElement && t.dataset.cr === "sa") {
      const w = widById(t.dataset.wid); if (!w) return true;
      try {
        const j = JSON.parse(t.value);
        if (!j.client_email || !j.private_key || !j.project_id) throw new Error("This doesn't look like a service account key file");
        w.sa = { client_email: j.client_email, private_key: j.private_key, project_id: j.project_id }; w.saErr = ""; delete w.mon;
      } catch (e) { w.saErr = /JSON/.test(String(e)) ? "Paste the whole .json file (it starts with {)" : String(e.message || e); }
      savePrefs(); render(); if (w.sa) crLookup(w); return true;
    }
    if (!(t instanceof HTMLInputElement)) return false;
    if (t.dataset.apr) {
      const P = apw(), m = t.dataset.apr, i = Number(t.dataset.i), pr = (P.price[m] || ["", "", ""]).slice();
      while (pr.length < 3) pr.push("");
      pr[i] = t.value === "" ? "" : Math.max(0, Number(t.value) || 0);
      if (pr.every((x) => x === "" || x == null)) delete P.price[m]; else P.price[m] = pr;
      savePrefs(); render(); return true;
    }
    if ("apmul" in t.dataset) { const P = apw(); P.siteMul = { ...(P.siteMul || {}), [t.dataset.apmul]: t.value === "" ? "" : Math.max(0, Number(t.value) || 0) }; savePrefs(); render(); return true; }
    if (t.dataset.apfx) { apw()[t.dataset.apfx] = Math.max(0, Number(t.value) || 0); savePrefs(); render(); return true; }
    if (t.dataset.cr) {
      const w = widById(t.dataset.wid); if (!w) return true;
      const k = t.dataset.cr, v = t.value.trim();
      // 콘솔 잔액은 하루쯤 늦게 깎이니, "지금 − 지연 시간" 시점의 잔액으로 보고 그 뒤 쓴 만큼 뺌
      if (k === "rbal") { w.rbal = v === "" ? "" : Math.max(0, Number(v) || 0); w.rbase = w.trk?.lastU ?? null; }
      else if (k === "bal") { const lag = w.lag === "" || w.lag == null ? 24 : Number(w.lag) || 0; w.bal = v === "" ? "" : Math.max(0, Number(v) || 0); w.at = v === "" ? "" : new Date(Date.now() - lag * 3600000).toISOString(); ap.at = 0; delete w.mon; }
      else if (k === "lag") { const old = w.lag === "" || w.lag == null ? 24 : Number(w.lag) || 0; w.lag = v === "" ? "" : Math.max(0, Math.min(72, Number(v) || 0)); const nw = w.lag === "" ? 24 : w.lag; if (w.at) { w.at = new Date(Date.parse(w.at) + (old - nw) * 3600000).toISOString(); delete w.mon; ap.at = 0; } }
      else if (k === "tot") w.tot = Math.max(0, Number(v) || 0) || (w.gcur === "KRW" ? "" : 300);
      else if (k === "grate") w.grate = v === "" ? "" : Math.max(0, Number(v) || 0);
      else w[k] = v.slice(0, k === "key" || k === "tok" ? 400 : 200);
      savePrefs(); render();
      if (k === "bal" || k === "lag") { apScan(true); if (hasG(w)) crLookup(w); }
      if (k === "gcid" || k === "proj") { delete w.mon; if (k === "gcid") gTok.delete(oKey(w)); if (w.gcid) gisLoad().catch(() => {}); }
      if ((w.mode === "relay" && (k === "url" || k === "key" || k === "tok" || k === "uid" || k === "rbal")) || ((w.mode === "nano" || w.mode === "ds") && k === "key") || (w.mode === "or" && (k === "key" || k === "mgmt" || k === "rbal"))) { if (k === "rbal") delete w.rbase; w.last = null; crLookup(w); }
      return true;
    }
    return false;
  }

  /* ── 위젯 이벤트 ── */
  function widClick(t) {
    if (wxClick(t) || apClick(t)) return true;
    const day = t.closest("[data-cday]");
    if (day) { calSel = day.dataset.cday; calView = calSel.slice(0, 7); render(); return true; }
    const nav = t.closest("[data-cnav]");
    if (nav) {
      const [y, m] = (calView || ymd(new Date()).slice(0, 7)).split("-").map(Number);
      const d = new Date(y, m - 1 + Number(nav.dataset.cnav), 1);
      calView = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`; render(); return true;
    }
    if (t.closest("[data-evadd]")) { addEv(); return true; }
    const mu = t.closest("[data-mus]");
    if (mu) {
      const w = widById(mu.dataset.wid), d = Number(mu.dataset.mus);
      if (w && d) { w.cur = (w.cur | 0) + d; savePrefs(); } else musPlay = !musPlay;
      render(); return true;
    }
    const ex = t.closest("[data-evdel]");
    if (ex) { prefs.cal = evs().filter((e) => e.id !== ex.dataset.evdel); savePrefs(); render(); return true; }
    const b = t.closest("[data-wa]");
    if (!b) return false;
    const a = b.dataset.wa, w = b.dataset.wid ? widById(b.dataset.wid) : null, v = b.dataset.v;
    if (a === "addphoto" || a === "addcal") startOpen = false;
    if (a === "addphoto") { if (wid().filter((x) => x.kind === "photo").length < WID_MAX_PHOTO) { padd = { target: null, busy: "", err: "", gal: null }; } render(); return true; }
    if (a === "start") { startOpen = !startOpen; render(); return true; }
    if (a === "addweather") { startOpen = false; if (!wid().some((x) => x.kind === "weather")) { const m = { id: newWid(), kind: "weather", col: 1, slot: 0 }; wid().push(m); widEdit = m.id; savePrefs(); } render(); return true; }
    if (a === "addmusic") { startOpen = false; if (!wid().some((x) => x.kind === "music")) { const m = { id: newWid(), kind: "music", col: 1, slot: 2, songs: "말랑 왈츠 - 토끼 오케스트라\n복숭아 우유 - 피치 밴드", cur: 0 }; wid().push(m); widEdit = m.id; savePrefs(); } render(); return true; }
    if (a === "addcal") { if (!wid().some((x) => x.kind === "cal")) { wid().push({ id: newWid(), kind: "cal", col: 0, slot: 1 }); savePrefs(); } render(); return true; }
    if (a === "dev") { pickFile(padd?.target ?? null); return true; }
    if (a === "gal") { if (padd) { padd.cmode = null; padd.cgalAll = null; padd.galMsg = ""; } loadGallery(); return true; }
    if (a === "cgal") { loadChatGallery(padd?.cmode || "all"); return true; }
    if (a === "cgalmore") {
      const box = b.closest(".mlh-pgal"), top = box ? box.scrollTop : 0;
      cgalShow((padd?.cgalN || 0) + CGAL_PAGE); render();
      const nb = root?.querySelector(".mlh-pgal"); if (nb && top) nb.scrollTop = top;
      return true;
    }
    if (a === "paddx") { padd = null; render(); return true; }
    if (a === "galpick") {
      const x = Array.isArray(padd?.gal) ? padd.gal[Number(v)] : null;
      if (x) placePhoto({ gid: x.id, url: x.url, own: false, ar: x.width && x.height ? +(x.width / x.height).toFixed(3) : 0 });
      return true;
    }
    if (!w) return true;
    if (a === "edit") { widEdit = w.id; widDel = null; }
    else if (a === "done") { widEdit = null; widDel = null; if (padd?.target === w.id) padd = null; }
    else if (a === "up" || a === "down") moveWid(w.id, a === "up" ? -1 : 1);
    else if (a === "col") { w.col = w.col ? 0 : 1; prefs.wid = [...wid().filter((x) => x !== w), w]; }
    else if (a === "pw") w.pw = Number(v);
    else if (a === "al" || a === "ph" || a === "tape") w[a] = v;
    else if (a === "tilt") w.tilt = Number(v);
    else if (a === "replace") padd = { target: w.id, busy: "", err: "", gal: null };
    else if (a === "del") widDel = w.id;
    else if (a === "delno") widDel = null;
    else if (a === "delok") {
      if (w.kind === "photo" && w.own && w.gid) apiSend(`/global-gallery/${encodeURIComponent(w.gid)}`, { method: "DELETE" }).catch(() => {});
      prefs.wid = wid().filter((x) => x !== w); widEdit = widDel = null;
    }
    savePrefs(); render();
    return true;
  }
  function widInput(t) {
    if (t instanceof HTMLTextAreaElement && t.dataset.wcap) {
      const w = widById(t.dataset.wcap); if (!w) return true;
      w.cap = t.value.slice(0, 160); fitCap(t); savePrefs(); return true;
    }
    if (t instanceof HTMLTextAreaElement && t.dataset.wsongs) {
      const w = widById(t.dataset.wsongs); if (w) { w.songs = t.value.slice(0, 2000); savePrefs(); } return true;
    }
    if (t instanceof HTMLInputElement && t.dataset.wfy) {
      const w = widById(t.dataset.wfy); if (!w) return true;
      w.fy = Number(t.value);
      const img = t.closest(".mlh-photo")?.querySelector(".mlh-pol-img img"); if (img) img.style.objectPosition = `50% ${w.fy}%`;
      savePrefs(); return true;
    }
    if (t instanceof HTMLInputElement && (t.classList.contains("mlh-evtext") || t.classList.contains("mlh-evtime"))) {
      evDraft = { t: root?.querySelector(".mlh-evtime")?.value || "", x: root?.querySelector(".mlh-evtext")?.value || "" }; return true;
    }
    return false;
  }
  function fitCap(t) { t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }
  /* ── 작업표시줄 + 시작 메뉴 (위젯 추가 · 기본 홈 보기) ── */
  let startOpen = false;
  const tclock = () => new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" });
  function widFoot() {
    const nP = wid().filter((x) => x.kind === "photo").length, hasCal = wid().some((x) => x.kind === "cal"), hasMus = wid().some((x) => x.kind === "music");
    const items = [
      nP < WID_MAX_PHOTO ? `<button type="button" data-wa="addphoto"><i data-s="camera"></i>Add Photo</button>` : "",
      hasCal ? "" : `<button type="button" data-wa="addcal"><i data-s="cal"></i>Add Calendar</button>`,
      hasMus ? "" : `<button type="button" data-wa="addmusic"><i data-s="headphones"></i>Add Player</button>`,
      wid().some((x) => x.kind === "weather") ? "" : `<button type="button" data-wa="addweather"><i data-s="wx-sun"></i>Add Weather</button>`,
      wid().some((x) => x.kind === "rcpt") ? "" : `<button type="button" data-wa="addrcpt"><i data-s="clip"></i>Add API Receipt</button>`,
      wid().filter((x) => x.kind === "credit").length >= CR_MAX ? "" : `<button type="button" data-wa="addcredit"><i data-s="star"></i>Add Credit</button>`,
      `<button type="button" data-act="arrange"><i data-s="clip"></i>${arranging ? "Stop arranging" : "Arrange widgets"}</button>`,
      `<button type="button" data-act="phone"><i data-s="crt"></i>Phone view: ${prefs.phone === "mini" ? "Mini PC" : "Stack"}</button>`,
      `<button type="button" data-act="playat"><i data-s="star"></i>Play menu: ${playAt() === "card" ? "Card" : "Top bar"}</button>`,
      `<button type="button" data-act="native"><i data-s="house"></i>Classic Home</button>`,
    ].join("");
    return `${padd && !padd.target ? `<section class="mlh-card mlh-paddcard"><div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="camera">Add Photo</h2></div>${paddHTML()}</section>` : ""}
      <div class="mlh-taskbar">
        <div class="mlh-startwrap">
          <button type="button" class="mlh-start" data-wa="start" aria-expanded="${startOpen}"><i data-s="heart"></i>START</button>
          ${startOpen ? `<div class="mlh-startmenu" role="menu"><div class="mlh-startside">MALLANG</div><div class="mlh-startlist">${items}${playAt() === "start" ? `<div class="mlh-start-play">${playItemsHTML()}</div>` : ""}</div></div>` : ""}
        </div>
        <span class="mlh-task is-on"><i data-s="bunny"></i>Mallang Home</span>
        <span class="mlh-tray"><i class="mlh-hearts"></i><span data-tclock>${esc(tclock())}</span></span>
      </div>`;
  }


  const STICKERS = `<div class="mlh-stk" aria-hidden="true">${[
    [50, 0.35, 4, 14], [1.1, 24, 8, 9], [98.9, 19, 4, 12], [0.9, 47, 4, 8], [99.1, 44, 8, 10], [1.2, 71, 8, 12], [98.8, 68, 4, 9], [1, 93, 4, 10], [99, 92, 8, 9], [33, 99.6, 8, 8], [67, 99.6, 4, 10],
  ].map(([x, y, k, sz], i) => `<i class="mlh-spark" data-k="${k}" style="left:${x}%;top:${y}%;--sz:${sz}px;--d:${(i % 5) * 0.7}s"></i>`).join("")}</div>`;
  const HELLO = () => `<section class="mlh-card mlh-hello"><i class="mlh-postmark" aria-hidden="true"></i>
            <div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="heart">Mallang Homepage</h2></div>
            <div class="mlh-browser">
              <span class="mlh-navbtns"><i class="mlh-nb" data-nb="back"></i><i class="mlh-nb" data-nb="fwd"></i><button type="button" class="mlh-nb" data-nb="home" data-act="refresh" title="Refresh" aria-label="Refresh"></button></span>
              <div class="mlh-search"><input type="search" class="mlh-input mlh-sinput" data-fk="search" placeholder="" aria-label="Search" value="${esc(searchQ)}" autocomplete="off" spellcheck="false"><div class="mlh-sres-wrap">${searchResHTML()}</div></div>
              <i class="mlh-nb" data-nb="star"></i>
            </div>
            <div class="mlh-date" data-clock>${esc(dateLine())}</div>
            <h1 class="mlh-greet">Who shall we <u>talk to</u> today?</h1>
            <div class="mlh-dialog">
              <div class="mlh-dialog-bar"><i class="mlh-hearts"></i><i class="mlh-x"></i></div>
              <div class="mlh-dialog-q">NEW STORY?</div>
              <div class="mlh-new">
                <button type="button" data-new="conversation"><i data-s="chat"></i><span>CHAT</span></button>
                <button type="button" data-new="roleplay"><i data-s="rp"></i><span>RP</span></button>
                <button type="button" data-new="game"><i data-s="game"></i><span>GAME</span></button>
              </div>
            </div>
          </section>`;

  /* ═══ 🏠 진짜 홈페이지 레이아웃 — 머리 배너 · 메뉴 탭 · 3단 · 자유 배치 · 꼬리말 ═══
     prefs.lay = { L:[카드id…], C:[…], R:[…] } — 기본 카드 + 위젯 id. ✥ Arrange에서 끌어 옮기거나 ◀▲▼▶ */
  const BUILTIN = ["profile", "hello", "chats", "acts", "conns", "memo", "shorts"];
  /* 1.19: 마리나라 홈 위쪽 줄(탭·북마크)을 숨기고 말랑 홈 안 메뉴로 — prefs.playAt: nav(기본) | card */
  const playAt = () => (prefs.playAt === "card" ? "card" : "nav");
  let playOpen = false;
  function bookmarks() {
    const hub = document.querySelector('[data-component="HomeBrowserHub"]');
    if (!hub) return [];
    const out = [], seen = new Set();
    for (const el of hub.querySelectorAll('nav:not(#marinara-mobile-bookmarks) :is(a, button)')) {
      if (el.closest(".mlh-root, [data-component='HomeBrowserHub.TabList']")) continue;
      const label = (el.textContent || el.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
      if (!label || seen.has(label)) continue;
      seen.add(label);
      out.push({ i: out.length, label, icon: el.querySelector("img")?.getAttribute("src") || "", el });
    }
    return out;
  }
  function playItemsHTML() {
    const tabs = browserTabs(), bm = bookmarks();
    const ico = (src) => `<span class="mlh-play-ico">${src ? `<img src="${esc(src)}" alt="">` : '<i class="mlh-pxi"></i>'}</span>`;
    const t = tabs.length ? `<div class="mlh-play-sec"><b>PLAY</b><div class="mlh-play-list">${tabs.map((x) => `<button type="button" class="mlh-play-item" data-btab="${esc(x.id)}">${x.fresh ? '<i class="mlh-dot"></i>' : ""}${ico(x.icon)}<span>${esc(x.label)}</span></button>`).join("")}</div></div>` : "";
    const b = bm.length ? `<div class="mlh-play-sec"><b>BOOKMARKS</b><div class="mlh-play-list">${bm.map((x) => `<button type="button" class="mlh-play-item" data-bmk="${x.i}">${ico(x.icon)}<span>${esc(x.label)}</span></button>`).join("")}</div></div>` : "";
    return t + b || `<div class="mlh-empty">No tabs or bookmarks yet.</div>`;
  }
  function playNavHTML() {
    if (playAt() !== "nav") return "";
    return `<div class="mlh-playwrap"><button type="button" class="mlh-play-btn" data-act="play-toggle" aria-expanded="${playOpen}"><i class="mlh-railico" data-ti="play"></i>Play <em>▾</em></button></div>`;
  }
  function playDropHTML() {
    return playAt() === "nav" && playOpen ? `<div class="mlh-play-anchor mlh-playwrap"><div class="mlh-play-drop" role="menu">${playItemsHTML()}</div></div>` : "";
  }
  function playCardHTML() {
    return `<section class="mlh-card mlh-playcard"><div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="star">Play</h2></div>${playItemsHTML()}</section>`;
  }
  const NAV = [["home", "Home"], ["chats", "Chats"], ["characters", "Characters"], ["personas", "Persona"], ["lorebooks", "Lore"], ["presets", "Presets"], ["connections", "LLMs"], ["settings", "Settings"]];
  let arranging = false, adrag = null;
  function layNorm() {
    const ws = wid(), ids = [...BUILTIN, ...(playAt() === "card" ? ["play"] : []), ...ws.map((w) => w.id)];
    let lay = prefs.lay && typeof prefs.lay === "object" ? prefs.lay : null;
    if (!lay) {
      const k = (kind) => ws.filter((w) => w.kind === kind).map((w) => w.id);
      lay = { L: ["profile", "memo", "shorts"], C: ["hello", ...k("cal"), "chats", "acts"], R: [...k("weather"), "conns", ...k("music"), ...k("photo")] };
    }
    const seen = new Set(), out = { L: [], C: [], R: [] };
    for (const c of ["L", "C", "R"]) for (const id of lay[c] || []) if (ids.includes(id) && !seen.has(id)) { seen.add(id); out[c].push(id); }
    for (const id of ids) if (!seen.has(id)) {
      const w = ws.find((x) => x.id === id);
      const col = !w ? (["profile", "memo", "shorts", "play"].includes(id) ? "L" : ["conns"].includes(id) ? "R" : "C") : w.kind === "cal" ? "C" : "R";
      if (w?.kind === "weather") out[col].unshift(id); else out[col].push(id);
    }
    prefs.lay = out; return out;
  }
  function layMove(id, dir) {
    const lay = layNorm(), cols = ["L", "C", "R"];
    const c = cols.find((k) => lay[k].includes(id)); if (!c) return;
    const i = lay[c].indexOf(id);
    if (dir === "up" && i > 0) [lay[c][i - 1], lay[c][i]] = [lay[c][i], lay[c][i - 1]];
    else if (dir === "down" && i < lay[c].length - 1) [lay[c][i + 1], lay[c][i]] = [lay[c][i], lay[c][i + 1]];
    else if (dir === "left" || dir === "right") {
      const n = cols[cols.indexOf(c) + (dir === "left" ? -1 : 1)]; if (!n) return;
      lay[c].splice(i, 1); lay[n].splice(Math.min(i, lay[n].length), 0, id);
    }
    savePrefs();
  }
  const GAPSTK = [["bow", "heart_s"], ["clip"], ["sparkle", "cherry"], ["pencil2"], ["heart_s", "sparkle"], ["flower"], ["bow"], ["cherry", "sparkle"]];
  /* 여백 스티커: 줄마다 남는 빈칸 크기를 재서 그만큼만 흩뿌림 (위젯 추가/삭제·접기 때마다 다시) */
  const FILLSTK = ["crt", "floppy", "cupcake", "bear", "sparkle", "heart_s", "flower", "strawberry", "cherry", "bow", "sparkle", "heart_s"];
  const hash = (n) => { n = Math.imul(n ^ (n >>> 15), 0x2c1b3c6d); n = Math.imul(n ^ (n >>> 12), 0x297a2d39); return ((n ^ (n >>> 15)) >>> 0) / 4294967296; };
  let fillRO = null;
  function fillOne(el) {
    const w = el.clientWidth, h = el.clientHeight, key = `${w}x${Math.round(h / 24)}`;
    if (el.dataset.k === key) return; el.dataset.k = key;
    const ci = "LCR".indexOf(el.parentElement?.dataset.col || "L"), out = [];
    const rows = Math.floor((h - 30) / 92), per = Math.max(1, Math.min(3, Math.floor(w / 105)));
    for (let r = 0; r < rows; r++) for (let c = 0; c < per; c++) {
      const sd = ci * 997 + r * 31 + c * 7 + 1;
      if (hash(sd) < 0.3) continue;
      const x = ((c + 0.2 + hash(sd + 3) * 0.6) / per) * 100;
      const y = 30 + r * 92 + hash(sd + 5) * 60;
      const k = FILLSTK[Math.floor(hash(sd + 9) * FILLSTK.length)];
      out.push(`<i data-s="${k}" style="left:${x.toFixed(1)}%;top:${Math.round(y)}px;--d:${(hash(sd + 11) * 4).toFixed(1)}s;--sc:${(1.3 + hash(sd + 13) * 0.5).toFixed(2)}"></i>`);
    }
    el.innerHTML = out.join("");
  }
  function fillStk() {
    if (!root) return;
    fillRO?.disconnect();
    const els = [...root.querySelectorAll(".mlh-fill")];
    els.forEach(fillOne);
    if (typeof ResizeObserver === "function") { fillRO = new ResizeObserver((es) => es.forEach((e) => fillOne(e.target))); els.forEach((el) => fillRO.observe(el)); }
  }
  function profileHTML() {
    const days = Math.max(1, Math.floor((Date.now() - (prefs.since || Date.now())) / 86400000) + 1);
    const pad = (n) => String(n).padStart(6, "0");
    return `<section class="mlh-card mlh-profile"><div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="heart">Welcome!</h2></div>
      <div class="mlh-pfbody"><div class="mlh-pftext">hi, friend ♡<br><span>welcome back to your little corner of the internet~</span></div></div>
      <div class="mlh-pfstats"><div><b>hit count</b><span class="mlh-counter">${pad(prefs.hits || 1)}</span></div><div><b>together</b><span class="mlh-counter">D+${days}</span></div></div>
      <button type="button" class="mlh-clap" data-act="clap">♡ clap for my site! <b>${prefs.claps || 0}</b></button></section>`;
  }
  function cardHTML(id) {
    if (id === "profile") return profileHTML();
    if (id === "hello") return HELLO();
    if (id === "chats") return `<section class="mlh-card" data-deco="ribbon"><div class="mlh-card-head"><h2 class="mlh-card-title" data-ico="chat">Messenger</h2><button type="button" class="mlh-link" data-act="refresh">Refresh</button></div>${chatsHTML()}</section>`;
    if (id === "acts") return `<section class="mlh-card" data-deco="star">${actsHTML()}</section>`;
    if (id === "conns") return `<section class="mlh-card" data-deco="heart">${connHTML()}</section>`;
    if (id === "memo") return `<section class="mlh-card mlh-memocard">${memoHTML()}</section>`;
    if (id === "play") return playAt() === "card" ? playCardHTML() : "";
    if (id === "shorts") return `<section class="mlh-card" data-deco="carrot">${shortsHTML()}</section>`;
    const w = widById(id); return w ? widHTML(w) : "";
  }
  const CARD_NAME = { profile: "Welcome", hello: "Homepage", chats: "Messenger", acts: "Recent Activity", conns: "My LLMs", memo: "Memo", shorts: "Shortcuts", play: "Play" };
  function slotHTML(id, col, i, n) {
    const w = widById(id), name = CARD_NAME[id] || ({ photo: "Photo", cal: "Calendar", music: "Player", weather: "Weather", rcpt: "API Receipt", credit: "Credit" })[w?.kind] || "Widget";
    const tools = arranging ? `<div class="mlh-grip" data-grip="${esc(id)}"><span class="mlh-grip-h">⠿ ${esc(name)}</span>
        <button type="button" data-mv="${esc(id)}" data-dir="left" ${col === "L" ? "disabled" : ""} aria-label="왼쪽 줄로">◀</button><button type="button" data-mv="${esc(id)}" data-dir="up" ${i === 0 ? "disabled" : ""} aria-label="위로">▲</button><button type="button" data-mv="${esc(id)}" data-dir="down" ${i === n - 1 ? "disabled" : ""} aria-label="아래로">▼</button><button type="button" data-mv="${esc(id)}" data-dir="right" ${col === "R" ? "disabled" : ""} aria-label="오른쪽 줄로">▶</button></div>` : "";
    return `<div class="mlh-slot" data-card="${esc(id)}">${tools}${cardHTML(id)}</div>`;
  }
  function colsHTML() {
    const lay = layNorm();
    return ["L", "C", "R"].map((c, ci) => `<div class="mlh-col3" data-col="${c}">${lay[c].map((id, i) => {
      const g = i ? `<div class="mlh-gapstk" aria-hidden="true">${(GAPSTK[(i * 3 + ci * 5) % GAPSTK.length]).map((k, j) => `<i data-s="${k}" style="left:${[12, 78, 46][(i + j + ci) % 3]}%;--d:${(i + j) * 0.6}s"></i>`).join("")}</div>` : "";
      return g + slotHTML(id, c, i, lay[c].length);
    }).join("")}<div class="mlh-fill" aria-hidden="true"></div></div>`).join("");
  }
  const ORBIT = `<svg class="mlh-bn-orbit" viewBox="0 0 520 240" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <ellipse cx="300" cy="118" rx="232" ry="58" transform="rotate(-12 300 118)" stroke-width=".8" opacity=".55"/>
        <ellipse cx="300" cy="118" rx="168" ry="40" transform="rotate(-12 300 118)" stroke-width=".6" opacity=".4" stroke-dasharray="2 4"/>
        <ellipse cx="300" cy="118" rx="290" ry="86" transform="rotate(-12 300 118)" stroke-width=".5" opacity=".28"/>
        <path d="M60 196 L520 30" stroke-width=".5" opacity=".22"/>
      </g>
      <g fill="currentColor">
        <circle cx="120" cy="150" r="2.4"/><circle cx="452" cy="64" r="1.8"/><circle cx="214" cy="68" r="1.2" opacity=".7"/>
        <circle cx="160" cy="44" r="1" opacity=".6"/><circle cx="246" cy="196" r="1" opacity=".6"/>
      </g>
      <g stroke="currentColor" stroke-width=".6" opacity=".55" fill="none"><path d="M214 68 L246 40 L292 52 L330 30"/><path d="M120 150 L158 136"/></g>
      <circle class="mlh-bn-planet" cx="158" cy="136" r="9"/>
    </svg>`;
  const SKY = `<svg class="mlh-bn-stars" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true"><g fill="currentColor">${
    [[38,30,1.1],[92,170,.8],[150,62,.7],[212,196,1],[268,24,.8],[318,118,.6],[352,184,.9],[402,40,.7],[436,206,.6],[478,96,.5],[540,30,.8],[596,190,.7],[640,70,.6],[690,206,.9],[720,22,.6],[768,150,.7],[812,40,.9],[858,196,.6],[902,112,.8],[948,28,.7],[976,170,.9],[24,108,.6],[180,128,.5],[560,140,.5],[740,96,.5],[880,70,.5]]
      .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g></svg>`;
  const SPARK = (x, y, k, sz) => `<i class="mlh-spark" data-k="${k}" style="left:${x}%;top:${y}%;--sz:${sz}px"></i>`;
  function headerHTML() {
    const song = (() => { const m = wid().find((x) => x.kind === "music"); const l = m ? songsOf(m) : []; return l.length ? l[((m.cur | 0) % l.length + l.length) % l.length].split(/\s+-\s+/)[0] : ""; })();
    const est = new Date(prefs.since || Date.now()).getFullYear();
    const no = String(prefs.hits || 1).padStart(4, "0");
    return `<div class="mlh-topline"><span>✦ MALLANG HOME · PERSONAL SPACE / EST. ${est}</span><span class="mlh-tl-c" aria-hidden="true"></span><span class="mlh-tl-r">NO. ${no} &nbsp;✦&nbsp; ${data.feed.length} CHATS${song ? ` &nbsp;♫&nbsp; ${esc(song)}` : ""}</span></div>
      <header class="mlh-banner">
        ${SKY}
        <div class="mlh-bn-moon" aria-hidden="true"></div>
        ${ORBIT}
        <div class="mlh-bn-moon2" aria-hidden="true"></div>
        ${SPARK(9, 74, 4, 16)}${SPARK(49.6, 9, 4, 18)}${SPARK(27, 24, 8, 9)}${SPARK(71, 70, 4, 10)}${SPARK(93, 86, 8, 12)}${SPARK(62, 18, 8, 7)}
        <div class="mlh-bn-side mlh-bn-l"><span>WELCOME ABOARD<br>THE LITTLE UNIVERSE<br>OF OUR OWN</span><em>✦ &nbsp;EST. ${est}</em></div>
        <div class="mlh-bn-title"><h1>말랑 홈</h1><p>작은 이야기들이 머무는 나만의 우주</p><em>MALLANG HOME</em></div>
        <div class="mlh-bn-side mlh-bn-r"><span>SPACE<br>JOURNAL</span><i></i><em>MOON<br>STARS<br>STORIES<br>AND<br>YOU</em></div>
      </header>
      <nav class="mlh-tabs3" aria-label="메뉴">${NAV.map(([k, l]) => `<button type="button" ${k === "home" ? 'class="is-on" data-act="refresh"' : `data-rail="${k}"`}><i class="mlh-railico" data-ri="${k === "chats" ? "characters" : k === "home" ? "settings" : k}" data-ti="${k}"></i>${l}</button>`).join("")}${playNavHTML()}</nav>${playDropHTML()}`;
  }
  function footHTML() {
    return `<footer class="mlh-sitefoot"><div class="mlh-badges"><span class="mlh-badge88">I ♡ RP</span><span class="mlh-badge88">MALANG<br>WEB RING</span><span class="mlh-badge88">BEST VIEW<br>ANY SIZE ♡</span><span class="mlh-badge88">MADE WITH<br>♡ &amp; PIXELS</span></div>
      <div class="mlh-copy">© ${new Date().getFullYear()} MALANG HOME ♡ made with too much love</div></footer>`;
  }
  /* ── 끌어서 옮기기 (✥ Arrange) ── */
  function arrDown(e) {
    const g = e.target instanceof Element ? e.target.closest(".mlh-grip-h") : null;
    if (!g || !arranging || !root?.contains(g)) return;
    const slot = g.closest(".mlh-slot"); if (!slot) return;
    e.preventDefault();
    const r = slot.getBoundingClientRect(), z = parseFloat(root.style.zoom) || 1;
    const wrap = document.createElement("div"); wrap.className = "mlh-root mlh-ghostwrap";
    Object.assign(wrap.style, { position: "fixed", left: "0", top: "0", width: r.width / z + "px", transformOrigin: "0 0", pointerEvents: "none", zIndex: 9999, padding: "0", maxWidth: "none" });
    const ghost = slot.cloneNode(true); ghost.classList.add("mlh-ghost"); wrap.appendChild(ghost); document.body.appendChild(wrap);
    const ph = document.createElement("div"); ph.className = "mlh-ph"; ph.style.height = Math.min(r.height / z, 160) + "px";
    slot.after(ph); slot.style.display = "none";
    adrag = { id: slot.dataset.card, slot, ghost: wrap, ph, dx: e.clientX - r.left, dy: e.clientY - r.top, z };
    const place = (x, y) => { wrap.style.transform = `translate(${x - adrag.dx}px, ${y - adrag.dy}px) scale(${z})`; };
    adrag.place = place; place(e.clientX, e.clientY);
    try { g.setPointerCapture(e.pointerId); } catch { /* 무시 */ }
  }
  function arrMove(e) {
    if (!adrag) return;
    e.preventDefault();
    adrag.place(e.clientX, e.clientY);
    const cols = [...root.querySelectorAll(".mlh-col3")];
    const col = cols.find((c) => { const r = c.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right; })
      || cols.reduce((a, c) => (Math.abs((c.getBoundingClientRect().left + c.getBoundingClientRect().right) / 2 - e.clientX) < Math.abs((a.getBoundingClientRect().left + a.getBoundingClientRect().right) / 2 - e.clientX) ? c : a));
    const slots = [...col.querySelectorAll(":scope > .mlh-slot")].filter((s) => s !== adrag.slot);
    const before = slots.find((s) => { const r = s.getBoundingClientRect(); return e.clientY < r.top + r.height / 2; });
    if (before) { const g = before.previousElementSibling?.classList.contains("mlh-gapstk") ? before.previousElementSibling : before; if (g.previousElementSibling !== adrag.ph) g.before(adrag.ph); }
    else { const cl = col.querySelector(":scope > .mlh-fill"); if (cl) { if (cl.previousElementSibling !== adrag.ph) cl.before(adrag.ph); } else if (col.lastElementChild !== adrag.ph) col.appendChild(adrag.ph); }
    const sc = scrollBox(); if (sc) { if (e.clientY < 60) sc.scrollTop -= 14; else if (e.clientY > innerHeight - 60) sc.scrollTop += 14; }
  }
  function arrUp() {
    if (!adrag) return;
    const { id, ph, ghost } = adrag; adrag = null;
    const col = ph.closest(".mlh-col3")?.dataset.col || "C";
    let idx = 0; for (let el = ph.previousElementSibling; el; el = el.previousElementSibling) if (el.classList.contains("mlh-slot") && el.dataset.card !== id) idx++;
    ghost.remove();
    const lay = layNorm(); for (const c of ["L", "C", "R"]) lay[c] = lay[c].filter((x) => x !== id);
    lay[col].splice(idx, 0, id); savePrefs(); render();
  }
  /* ── 폰: 세로 한 줄 대신 PC 화면을 그대로 줄여서 ── */
  const MINI_W = 860;
  function fitMini() {
    if (!root) return;
    const w = Math.min(root.parentElement?.clientWidth || innerWidth, innerWidth);
    const stack = w < 1080 && prefs.phone !== "mini";   // 1.21: 3단이 찌그러지기 전에 한 줄로(기본), 설정에서 Mini PC 선택 가능
    const mini = w < 1080 && !stack;
    root.classList.toggle("is-mini", mini);
    root.classList.toggle("is-stack", stack);
    root.style.zoom = mini ? String(Math.max(0.3, w / MINI_W)) : "";
  }

  function render() {
    if (!root || drag || adrag) return;   // 끄는 중엔 다시 그리지 않음
    const ae = document.activeElement;
    const fk = root.contains(ae) ? ae?.dataset?.fk : null;
    const sel = fk ? [ae.selectionStart, ae.selectionEnd] : null;
    // 다시 그려도 화면이 맨 위로 튀지 않게: 스크롤 위치와 방금 누른 버튼을 기억해 두었다가 되돌림
    const scr = [];
    for (let el = root.parentElement; el; el = el.parentElement) if (el.scrollTop > 0) scr.push([el, el.scrollTop]);
    const wY = window.scrollY;
    const btnKey = !fk && root.contains(ae) && ae instanceof HTMLElement && ae.matches("button[data-wa],button[data-cday],button[data-cnav],button[data-mus],button[data-wb],button[data-wxa]")
      ? ["wa", "wid", "v", "cday", "cnav", "mus", "wb", "wxa"].filter((k) => ae.dataset[k] != null).map((k) => `[data-${k}="${CSS.escape(ae.dataset[k])}"]`).join("") : "";
    const cards = wid().filter(w => w.kind === "rcpt" || w.kind === "credit");
    root.innerHTML = `<div class="mlh-receipt-heading"><strong>소르 영수증 · 크레딧</strong><div>${cards.some(w => w.kind === "rcpt") ? "" : '<button type="button" data-wa="addrcpt">영수증 추가</button>'}${cards.filter(w => w.kind === "credit").length < CR_MAX ? '<button type="button" data-wa="addcredit">＋ 크레딧 추가</button>' : ""}</div></div><div class="mlh-receipt-grid">${receiptCardsHTML(cards)}</div>`;
    localizeReceiptUI(root);
    fillStk();
    root.querySelectorAll(".mlh-pcap").forEach(fitCap);
    if (fk) {
      const t = root.querySelector(`[data-fk="${fk}"]`);
      if (t) { t.focus({ preventScroll: true }); try { t.setSelectionRange(sel[0], sel[1]); } catch { /* 무시 */ } }
    } else if (btnKey) {
      root.querySelector(btnKey)?.focus({ preventScroll: true });
    }
    const keep = () => {
      for (const [el, top] of scr) if (el.isConnected && Math.abs(el.scrollTop - top) > 2) el.scrollTop = top;
      if (Math.abs(window.scrollY - wY) > 2) window.scrollTo(window.scrollX, wY);
    };
    keep();
    if (scr.length || wY) {   // 폰(특히 iOS)은 한 박자 늦게 튀기도 해서 다음 두 프레임까지 한 번 더
      let n = 0, touched = false;
      const stop = () => { touched = true; };
      window.addEventListener("touchstart", stop, { once: true, passive: true });
      window.addEventListener("wheel", stop, { once: true, passive: true });
      const again = () => { if (!touched) keep(); if (++n < 3) requestAnimationFrame(again); else { window.removeEventListener("touchstart", stop); window.removeEventListener("wheel", stop); } };
      requestAnimationFrame(again);
    }
  }

  /* ── 이벤트 (위임) ── */
  function onClick(e) {
    const t = e.target instanceof Element ? e.target : null;
    if(t&&root?.contains(t)&&linkGroupAction(t))return;
    if (t && playOpen && !root?.contains(t)) { playOpen = false; render(); }
    if (!t || !root?.contains(t)) return;
    const chat = t.closest(".mlh-chat");
    if (chat) { const i = Number(chat.dataset.i); const item = data.feed[i]; if (item) openChat(item.chat, i); return; }
    const rail = t.closest("[data-rail]");
    if (rail) { openPanel(rail.dataset.rail); return; }
    const sr = t.closest("[data-sr]");
    if (sr) {
      const x = searchResults()[Number(sr.dataset.sr)];
      if (x) { if (x.k === "chat") openChatById(x.id, x.name); else openPanelSearch(x.k, x.name); }
      return;
    }
    if (startOpen && !t.closest(".mlh-startwrap")) { startOpen = false; render(); }
    if (playOpen && !t.closest(".mlh-playwrap")) { playOpen = false; if (!t.closest("[data-act],[data-wa],[data-btab],[data-bmk],[data-rail]")) render(); }
    const bk = t.closest("[data-bmk]");
    if (bk) { const x = bookmarks()[Number(bk.dataset.bmk)]; playOpen = false; startOpen = false; if (x) x.el.click(); return; }
    const lmv = t.closest("[data-mv]");
    if (lmv) { layMove(lmv.dataset.mv, lmv.dataset.dir); render(); return; }
    if (widClick(t)) return;
    const nw = t.closest("[data-new]");
    if (nw) { newChat(nw.dataset.new); return; }
    const tab = t.closest("[data-tab]");
    if (tab) { prefs.actTab = tab.dataset.tab; savePrefs(); render(); return; }
    const mt = t.closest("[data-mtab]");
    if (mt) { memoAct("tab", mt.dataset.mtab); return; }
    const mr = t.closest("[data-mrestore]");
    if (mr) { memoAct("restore", mr.dataset.mrestore); return; }
    const md = t.closest("[data-mdel]");
    if (md) { memoAct("delete", md.dataset.mdel); return; }
    const bt = t.closest("[data-btab]");
    if (bt) { playOpen = false; startOpen = false; openBrowserTab(bt.dataset.btab); return; }
    const ln = t.closest("[data-launch]");
    if (ln) { launch(ln.dataset.launch); return; }
    if (t.closest("a[href]")) return;         // 링크는 그대로 열기
    const mv = t.closest("[data-cmove]");
    if (mv) { moveConn(mv.dataset.cmove, Number(mv.dataset.dir)); savePrefs(); render(); return; }
    const cn = t.closest("[data-conn]");
    if (cn) { openConn = openConn === cn.dataset.conn ? null : cn.dataset.conn; render(); return; }
    const act = t.closest("[data-act]")?.dataset.act;
    if (act === "refresh") loadData(true);
    else if (act === "act-fold" || act === "act-unfold") { prefs.actFold = act === "act-fold"; savePrefs(); render(); }
    else if (act === "shorts-edit") { editingShorts = true; render(); }
    else if (act === "shorts-done") { editingShorts = false; savePrefs(); render(); }
    else if (act === "conns-edit") { editingConns = true; openConn = null; render(); }
    else if (act === "conns-done") { editingConns = false; savePrefs(); render(); loadAsl(false); loadIgx(false); }
    else if (act === "asl-now") { savePrefs(); loadAsl(true); }
    else if (act && act.startsWith("memo-")) memoAct(act);
    else if (act === "clap") { prefs.claps = (prefs.claps || 0) + 1; savePrefs(); const cb = t.closest(".mlh-clap"); const n = cb?.querySelector("b"); if (n) n.textContent = String(prefs.claps); cb?.classList.remove("is-pop"); void cb?.offsetWidth; cb?.classList.add("is-pop"); }
    else if (act === "arrange") { arranging = !arranging; startOpen = false; render(); }
    else if (act === "arrange-done") { arranging = false; savePrefs(); render(); }
    else if (act === "phone") { prefs.phone = prefs.phone === "mini" ? "stack" : "mini"; startOpen = false; savePrefs(); render(); }
    else if (act === "play-toggle") { playOpen = !playOpen; render(); }
    else if (act === "playat") { prefs.playAt = playAt() === "card" ? "nav" : "card"; playOpen = false; startOpen = false; savePrefs(); render(); }
    else if (act === "native") { nativeView = true; startOpen = false; sync(); }
  }
  function onChange(e) {
    const t = e.target;
    if (!(t instanceof Element) || !root?.contains(t)) return;
    if (t instanceof HTMLInputElement && t.dataset.cshow) {
      const id = t.dataset.cshow;
      const h = new Set(prefs.connHidden || []);
      if (t.checked) h.delete(id); else h.add(id);
      prefs.connHidden = [...h];
      const ids = orderedConns().map((c) => c.id);
      prefs.connOrder = [...ids.filter((x) => !h.has(x)), ...ids.filter((x) => h.has(x))];
      savePrefs(); render();
      return;
    }
    if (apChange(t)) return;
    if (t instanceof HTMLSelectElement && "cgalsel" in t.dataset) { loadChatGallery(t.value); return; }
    if (t instanceof HTMLSelectElement && "wxfix" in t.dataset) { wxp().fix = t.value; wx.idx = 0; savePrefs(); render(); return; }
    if (t instanceof HTMLSelectElement && "wxconn" in t.dataset) { wxp().conn = t.value; wx.retryAt = 0; savePrefs(); render(); wxAuto(); return; }
    if (t instanceof HTMLSelectElement && "ssrc" in t.dataset) {
      prefs.scoreSrc = ["igx", "asl", "both"].includes(t.value) ? t.value : "igx";
      savePrefs(); render(); loadIgx(true); loadAsl(false); return;
    }
    if ((t instanceof HTMLSelectElement || t instanceof HTMLInputElement) && t.dataset.cigx) {
      prefs.connIgx = { ...(prefs.connIgx || {}) };
      const v = t.value.trim();
      if (v) prefs.connIgx[t.dataset.cigx] = v; else delete prefs.connIgx[t.dataset.cigx];
      if (prefs.igx) prefs.igx.at = 0;       // 새 짝은 다음 갱신 때 바로 받아 오기
      savePrefs(); return;
    }
    if (t instanceof HTMLSelectElement && t.dataset.casl) {
      prefs.connAsl = { ...(prefs.connAsl || {}) };
      if (t.value) prefs.connAsl[t.dataset.casl] = t.value; else delete prefs.connAsl[t.dataset.casl];
      savePrefs(); return;
    }
    if (t instanceof HTMLSelectElement && "aslhours" in t.dataset) { prefs.aslHours = Number(t.value) || 3; savePrefs(); return; }
    if (!(t instanceof HTMLInputElement) || !t.dataset.pick) return;
    const n = t.dataset.pick;
    prefs.shortcuts = t.checked ? [...new Set([...prefs.shortcuts, n])] : prefs.shortcuts.filter((x) => x !== n);
  }
  function onInput(e) {
    const t = e.target;
    if (t instanceof Element && root?.contains(t) && widInput(t)) return;
    if (t instanceof HTMLInputElement && t.classList.contains("mlh-sinput") && root?.contains(t)) { searchQ = t.value; updateSearch(); return; }
    if (t instanceof HTMLInputElement && "wxq" in t.dataset && root?.contains(t)) { wx.q = t.value; return; }
    if (t instanceof HTMLInputElement && t.dataset.cigx && root?.contains(t)) {
      prefs.connIgx = { ...(prefs.connIgx || {}) };
      const v = t.value.trim();
      if (v) prefs.connIgx[t.dataset.cigx] = v; else delete prefs.connIgx[t.dataset.cigx];
      return;
    }
    if (t instanceof HTMLInputElement && "igxurl" in t.dataset && root?.contains(t)) {
      prefs.igxUrl = t.value.trim(); igx.err = ""; igx.retryAt = 0; if (prefs.igx) prefs.igx.at = 0; savePrefs(); return;
    }
    if (t instanceof HTMLInputElement && "aslkey" in t.dataset && root?.contains(t)) {
      prefs.aslKey = t.value.trim(); asl.err = ""; asl.retryAt = 0; savePrefs(); return;
    }
    if (!(t instanceof HTMLTextAreaElement) || !t.classList.contains("mlh-memo")) return;
    ensureMemos();
    const cur = curMemo();
    cur.text = t.value; cur.at = Date.now();
    const tab = root.querySelector(".mlh-mtab.is-cur"); if (tab) tab.textContent = memoTitle(cur.text);
    const s = root.querySelector(".mlh-saved"); if (s) s.textContent = "saving…";
    savePrefs(true);
  }

  /* ── 끌어서 순서 바꾸기 (마우스·터치 공통, 손잡이 ⠿) ── */
  let drag = null;
  function scrollBox() {
    return root?.closest('[data-component="HomeBrowserHub.Content"]') || document.scrollingElement;
  }
  function onPointerDown(e) {
    const h = e.target instanceof Element ? e.target.closest(".mlh-cedit-handle") : null;
    if (!h || !root?.contains(h) || (e.pointerType === "mouse" && e.button !== 0)) return;
    const row = h.closest(".mlh-cedit-row");
    if (!row) return;
    e.preventDefault();
    drag = { row, list: row.parentElement, pointerId: e.pointerId, y: e.clientY, raf: 0 };
    row.classList.add("is-drag");
    try { h.setPointerCapture(e.pointerId); } catch { /* 무시 */ }
  }
  function placeRow() {
    if (!drag) return;
    const { row, list, y } = drag;
    let before = null;
    for (const r of list.querySelectorAll(".mlh-cedit-row")) {
      if (r === row) continue;
      const b = r.getBoundingClientRect();
      if (y < b.top + b.height / 2) { before = r; break; }
    }
    if (before) { if (row.nextElementSibling !== before) list.insertBefore(row, before); }
    else if (list.lastElementChild !== row) list.appendChild(row);
    // 화면 끝 가까이 가면 자동 스크롤
    const box = scrollBox(), edge = 48;
    const top = box === document.scrollingElement ? 0 : box.getBoundingClientRect().top;
    const bottom = box === document.scrollingElement ? innerHeight : box.getBoundingClientRect().bottom;
    if (y < top + edge) box.scrollTop -= 10; else if (y > bottom - edge) box.scrollTop += 10;
  }
  function onPointerMove(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    e.preventDefault();
    drag.y = e.clientY;
    if (!drag.raf) drag.raf = requestAnimationFrame(() => { if (drag) { drag.raf = 0; placeRow(); } });
  }
  function onPointerUp(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    const ids = Array.from(drag.list.querySelectorAll(".mlh-cedit-row")).map((r) => r.dataset.cid);
    drag.row.classList.remove("is-drag");
    if (drag.raf) cancelAnimationFrame(drag.raf);
    drag = null;
    const hidden = new Set(prefs.connHidden || []);
    prefs.connOrder = [...ids.filter((x) => !hidden.has(x)), ...ids.filter((x) => hidden.has(x))];
    savePrefs(); render();
  }

  /* ── 다운로드한 인터페이스(누들·슬럽 등)가 못 뜰 때 원인 한 줄 진단 ──
   * 모듈을 실행하지 않고 내려받기만 확인하므로 앱 상태를 바꾸지 않는다. */
  const diagnosed = new WeakSet();
  async function diagnose(box) {
    diagnosed.add(box);
    const id = box.getAttribute("data-capability-package-id") || "";
    const line = document.createElement("div");
    line.className = "mlh-diag";
    line.textContent = "🐰 말랑 홈 진단 중…";
    (box.children[1] || box).appendChild(line);
    try {
      const inst = await api("/capability-packages/installed");
      const list = Array.isArray(inst) ? inst : inst?.packages || inst?.data || [];
      const item = list.find((x) => x?.id === id);
      const v = item?.version || "";
      const r = await fetch(`/api/capability-packages/${encodeURIComponent(id)}/client?v=${encodeURIComponent(v)}&mlhdiag=${Date.now()}`, {
        credentials: "same-origin", cache: "no-store", headers: headers(),
      });
      const body = await r.text();
      const reg = !!customElements.get("marinara-capability-" + id);
      line.textContent = `진단 · 설치 ${item ? "v" + v + (item.status ? " (" + item.status + ")" : "") : "목록에 없음"} · 모듈 응답 ${r.status} · ${(r.headers.get("content-type") || "-").split(";")[0]} · ${(body.length / 1024).toFixed(1)}KB · 등록 ${reg ? "됨" : "안 됨"} · 화면 ${location.protocol}`;
    } catch (e) {
      line.textContent = "진단 실패 · " + (e?.message || e);
    }
  }
  function scanFailures() {
    for (const box of document.querySelectorAll('[data-capability-client-state="error"][data-capability-package-id][role="alert"]')) {
      if (!diagnosed.has(box)) diagnose(box);
    }
  }

  /* ── 붙이기 / 떼기 ── */
  function sync() {
    const h = home();
    if (!h) { root = null; return; }
    if (!root || !root.isConnected || root.parentElement !== h) {
      root?.remove(); root = document.createElement("section");
      root.className = "mlh-root mlh-receipt-only";
      h.appendChild(root); render(); loadData(true);
    }
  }

  listen(document, "click", onClick, true);
  listen(document, "change", onChange, true);
  listen(document, "input", onInput, true);
  listen(document, "pointerdown", onPointerDown, true);
  listen(document, "pointerdown", arrDown, true);
  listen(document, "pointermove", arrMove, { capture: true, passive: false });
  listen(document, "pointerup", arrUp, true);
  listen(document, "pointercancel", arrUp, true);
  listen(document, "pointermove", onPointerMove, { capture: true, passive: false });
  listen(document, "pointerup", onPointerUp, true);
  listen(document, "pointercancel", onPointerUp, true);
  listen(document, "keydown", (e) => {
    const t = e.target;
    if ((e.key === "Enter" || e.key === " ") && t instanceof HTMLElement && t.matches(".mlh-root [data-conn]")) { e.preventDefault(); t.click(); }
    if (e.key === "Enter" && t instanceof HTMLInputElement && t.classList.contains("mlh-sinput")) {
      e.preventDefault(); root?.querySelector(".mlh-sitem")?.click();
    }
    if (e.key === "Enter" && !e.isComposing && t instanceof HTMLInputElement && t.classList.contains("mlh-evtext") && root?.contains(t)) { e.preventDefault(); addEv(); }
    if (e.key === "Enter" && !e.isComposing && t instanceof HTMLInputElement && "wxq" in t.dataset && root?.contains(t)) { e.preventDefault(); wxSearch(); }
    if (e.key === "Escape" && t instanceof HTMLInputElement && t.classList.contains("mlh-sinput")) { searchQ = ""; t.value = ""; updateSearch(); }
  }, true);

  let raf = 0;
  const mo = new MutationObserver(() => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; sync(); localizeReceiptUI(root); }); });
  mo.observe(document.body, { childList: true, subtree: true });
  cleanups.push(() => mo.disconnect());

  const tick = setInterval(() => {
    const clock = root?.querySelector("[data-clock]");
    if (clock) clock.textContent = dateLine();
    const tc = root?.querySelector("[data-tclock]"); if (tc) tc.textContent = tclock();
    if (root?.isConnected && document.visibilityState === "visible") { loadData(false); crAuto(); }
  }, 30000);
  cleanups.push(() => clearInterval(tick));


  loadPrefs().then(() => { if (disposed) return; if (!wid().some(w => w.kind === "rcpt")) { wid().push({id: newWid(), kind: "rcpt", col: 1, slot: 9}); savePrefs(); } sync(); });

  if (typeof marinara !== "undefined" && marinara.onCleanup) {
    marinara.onCleanup(() => {
      fillRO?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      for (const fn of cleanups.splice(0)) { try { fn(); } catch { /* 무시 */ } }
      
      root?.remove(); backBtn?.remove();
      root = backBtn = null;
    });
  }

  return ()=>{
    if(disposed)return;disposed=true;abort.abort();
    for(const fn of cleanup.splice(0)){try{fn()}catch{}}
    for(const id of timeouts)globalThis.clearTimeout(id);
    for(const id of intervals)globalThis.clearInterval(id);
    for(const id of frames)globalThis.cancelAnimationFrame(id);
    shadow.innerHTML='';
  };
}

  const id='sorr-receipt-tab',viewId='sorr-receipt-view';
  let button=null,panel=null,content=null,stop=null,active=false,raf=0,stopped=false;
  let nativeSelection=[],oldHidden=null;
  function close(){
    active=false;stop?.();stop=null;panel?.remove();panel=null;
    if(content){if(oldHidden===null)content.removeAttribute('data-sorr-receipt-hidden');else content.setAttribute('data-sorr-receipt-hidden',oldHidden)}
    content=null;
    for(const [el,value] of nativeSelection){if(el.isConnected){if(value===null)el.removeAttribute('aria-selected');else el.setAttribute('aria-selected',value)}}
    nativeSelection=[];button?.setAttribute('aria-selected','false');button?.setAttribute('tabindex','-1');
  }
  function open(){
    if(active){close();button?.focus();return}
    content=document.querySelector('[data-component="HomeBrowserHub.Content"]');
    if(!content)return;
    active=true;oldHidden=content.getAttribute('data-sorr-receipt-hidden');content.setAttribute('data-sorr-receipt-hidden',extensionApi.extension.id);
    nativeSelection=[...button.parentElement.querySelectorAll('[role=tab]')].filter(e=>e!==button).map(e=>[e,e.getAttribute('aria-selected')]);
    for(const [el] of nativeSelection)el.setAttribute('aria-selected','false');
    button.setAttribute('aria-selected','true');button.setAttribute('tabindex','0');
    panel=document.createElement('section');panel.id=viewId;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',id);panel.className='min-h-0 flex-1 overflow-y-auto';panel.attachShadow({mode:'open'});
    content.after(panel);stop=mountReceipt(panel);
  }
  function sync(){
    if(stopped)return;
    const gallery=document.getElementById('marinara-home-tab-home-gallery');
    const list=gallery?.closest('[data-component="HomeBrowserHub.TabList"]');
    if(!list){close();button?.remove();button=null;return}
    if(active&&(!content?.isConnected||!panel?.isConnected))close();
    if(!button?.isConnected){
      close();button=document.createElement('button');button.id=id;button.type='button';button.className=gallery.className;
      button.setAttribute('role','tab');button.setAttribute('aria-label','소르 영수증');button.setAttribute('title','소르 영수증');button.setAttribute('aria-controls',viewId);button.setAttribute('aria-selected','false');button.setAttribute('tabindex','-1');
      button.innerHTML='<span aria-hidden="true" style="font-size:16px">▤</span><span class="sorr-receipt-caption">소르 영수증</span>';
      button.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open()});
      button.addEventListener('keydown',e=>{if(e.key==='Escape'){close();gallery.focus()}else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const tabs=[...list.querySelectorAll('[role=tab]')];tabs[(tabs.indexOf(button)+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length]?.focus()}});
      gallery.after(button);
    }else if(button.previousElementSibling!==gallery)gallery.after(button);
  }
  const style=document.createElement('style');
  style.textContent='[data-sorr-receipt-hidden="'+CSS.escape(extensionApi.extension.id)+'"]{display:none!important}#'+id+'{display:inline-flex;align-items:center;gap:6px;min-height:36px}#'+id+'[aria-selected=true]{background:var(--background);color:var(--foreground)}@media(max-width:639px){#'+id+'{width:36px;flex:none}#'+id+' .sorr-receipt-caption{display:none}#'+id+'[aria-selected=true]{width:auto;flex:1;padding:0 8px}#'+id+'[aria-selected=true] .sorr-receipt-caption{display:inline}}';document.head.append(style);
  function nativeClick(e){const tab=e.target instanceof Element?e.target.closest('[role=tab]'):null;if(active&&tab&&tab!==button&&tab.closest('[data-component="HomeBrowserHub.TabList"]'))close()}
  document.addEventListener('click',nativeClick,true);
  const observer=new MutationObserver(()=>{if(!raf&&!stopped)raf=requestAnimationFrame(()=>{raf=0;sync()})});observer.observe(document.body,{subtree:true,childList:true});sync();
  extensionApi.onCleanup(()=>{stopped=true;observer.disconnect();if(raf)cancelAnimationFrame(raf);document.removeEventListener('click',nativeClick,true);close();button?.remove();style.remove()});

})(marinara);
