// All calendar dates use UTC so NanoGPT's date-only usage rows retain their meaning.
const usageCalendarState={offset:0,selected:new Date().toISOString().slice(0,10)};
function receiptCalendarDays(){
 const days={},coverage=[];
 const dayOf=at=>new Date(at).toISOString().slice(0,10);
 function add(day,site,model,cost,n=0,tokens=0,source='site'){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(day))return;
  const d=days[day]||(days[day]={amount:0,priced:false,estimated:false,unknown:false,n:0,tokens:0,items:[]});
  const known=typeof cost==='number'&&Number.isFinite(cost)&&cost>=0;
  if(known){d.amount+=cost;d.priced=true}else d.unknown=true;
  d.estimated||=source==='chat';d.n+=n;d.tokens+=tokens;
  let item=d.items.find(x=>x.site===site&&x.model===model&&x.source===source);
  if(!item){item={site,model,source,amount:0,priced:false,n:0,tokens:0};d.items.push(item)}
  if(known){item.amount+=cost;item.priced=true}item.n+=n;item.tokens+=tokens;
 }
 for(const group of linkGroups(wid())){
  const summary=linkSummary(group),seen=new Set(),name=group.key==='default'?'LinkAPI · 공유 계정':'LinkAPI · '+group.key;
  for(const r of summary.records){if(!Number.isFinite(r.at))continue;const day=dayOf(r.at);seen.add(day);add(day,name,r.model,r.usd,1)}
  if(seen.size)coverage.push({days:seen,hit:m=>group.members.some(w=>relayMatcher(w)(m))});
 }
 const nanoSeen=new Set();
 for(const w of wid()){
  if(w.kind!=='credit')continue;
  if(w.mode==='nano'&&w.last?.nu){
   const identity=String(w.key||w.conn||w.id);if(nanoSeen.has(identity))continue;nanoSeen.add(identity);
   const seen=new Set();
   for(const [day,models] of Object.entries(w.last.nu.days||{}))for(const [model,r] of Object.entries(models)){
    seen.add(day);add(day,w.name||'NanoGPT',model,Number.isFinite(r.c)?r.c:null,Number(r.n)||0,(Number(r.i)||0)+(Number(r.o)||0)+(Number(r.th)||0));
   }
   coverage.push({days:seen,hit:m=>apProv(m)==='nanogpt'});
  }else if(w.mode==='relay'&&!isLinkCard(w)&&w.last?.src==='logs'){
   const seen=new Set();for(const [at,cost,model] of relayLogStore(w).rows){if(!Number.isFinite(at))continue;const day=dayOf(at);seen.add(day);add(day,w.name||hostOf(w.url),model,toUSD(cost,w.cur==='CNY'?'CNY':'USD'),1)}
   coverage.push({days:seen,hit:relayMatcher(w)});
  }
 }
 for(const [hour,models] of Object.entries(ap.hours)){
  const at=Date.parse(hour+':00:00');if(!Number.isFinite(at))continue;const day=dayOf(at);
  for(const [model,r] of Object.entries(models)){
   if(coverage.some(c=>c.days.has(day)&&c.hit(model)))continue;
   add(day,PROV_NAME[apProv(model)]||'사용자 지정 연결',apModelName(model),apCost(model,r[0],r[1],r[2]),r[2],r[0]+r[1],'chat');
  }
 }
 for(const r of trackerUsage.rows){
  const at=Date.parse(r.hour+':00:00Z');if(!Number.isFinite(at))continue;
  add(dayOf(at),'보조 작업 · 커스텀 트래커',(r.model||'모델 미확인')+' (현재 연결 기준)',null,Number(r.n)||0,Number(r.tokens)||0,'activity');
 }
 return days;
}
function usageCalendarHTML(){
 const now=new Date(),month=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()+usageCalendarState.offset,1)),ym=month.toISOString().slice(0,7),today=now.toISOString().slice(0,10);
 const days=receiptCalendarDays(),count=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth()+1,0)).getUTCDate();
 const values=Object.entries(days).filter(([day])=>day.startsWith(ym)&&day<=today),total=values.reduce((s,[,d])=>s+d.amount,0),max=Math.max(0,...values.map(([,d])=>d.amount));
 const hasAmount=values.some(([,d])=>d.priced),estimated=values.some(([,d])=>d.estimated);
 const currency=apw().disp==='USD'?'USD':'KRW',money=v=>fmtCur(fromUSD(v,currency),currency);
 if(!usageCalendarState.selected.startsWith(ym))usageCalendarState.selected=ym+'-01';
 const cells=Array.from({length:month.getUTCDay()},()=>'<span class="sorr-cal-blank" aria-hidden="true"></span>');
 for(let n=1;n<=count;n++){
  const day=ym+'-'+String(n).padStart(2,'0'),d=days[day],future=day>today,level=d?.priced&&max>0?Math.ceil(d.amount/max*4):0;
  const text=future?'—':d?.priced?(d.estimated?'≈ ':'')+money(d.amount):d?'금액 미확인':'기록 없음';
  cells.push(`<button type="button" class="sorr-cal-day" data-usage-day="${day}" data-heat="${level}" aria-pressed="${usageCalendarState.selected===day}" aria-label="${day} ${esc(text)}${d?.unknown?' · 미확인 금액 있음':''}" ${future?'disabled':''}><span>${n}${day===today?'<small>오늘</small>':''}</span><b>${esc(text)}</b>${d?.unknown?'<i title="사용 기록은 있지만 금액을 확인하지 못한 항목이 있어요">미확인</i>':''}</button>`);
 }
 const selected=days[usageCalendarState.selected];
 const detail=selected?selected.items.map(x=>`<div class="sorr-cal-detail-row"><span><b>${esc(x.site)}</b><small>${esc(x.model)} · ${x.n}회${x.tokens?' · '+kTok(x.tokens)+' 토큰':''}</small></span><strong>${x.priced?(x.source==='chat'?'≈ ':'')+money(x.amount):'금액 미확인'}</strong></div>`).join(''):'<p class="mlh-empty">조회된 일별 기록이 없어요. 사용액이 0원이라는 뜻은 아니에요.</p>';
 return `<section class="mlh-card sorr-usage-calendar" aria-label="사용액 달력"><div class="mlh-card-head"><h2 class="mlh-card-title">사용액 달력</h2><div class="sorr-cal-nav"><button data-usage-month="-1" aria-label="이전 달" ${usageCalendarState.offset<=-2?'disabled':''}>‹</button><b>${month.getUTCFullYear()}년 ${month.getUTCMonth()+1}월</b><button data-usage-month="1" aria-label="다음 달" ${usageCalendarState.offset>=0?'disabled':''}>›</button><button data-usage-current>이번 달</button></div></div><div class="sorr-cal-body"><div class="sorr-cal-summary"><span>조회된 일별 금액 합계 <b>${hasAmount?(estimated?"≈ ":"")+money(total):values.length?"금액 미확인":"기록 없음"}</b></span><small>UTC 기준 · 한국시간 오전 9시에 하루 시작</small></div><div class="sorr-cal-week" aria-hidden="true">${['일','월','화','수','목','금','토'].map(x=>'<span>'+x+'</span>').join('')}</div><div class="sorr-cal-grid">${cells.join('')}</div><div class="sorr-cal-detail" aria-live="polite"><h3>${esc(usageCalendarState.selected)} 사용 내역</h3>${detail}</div><p class="mlh-cr-tag">날짜를 눌러 내역을 확인하세요. 서비스 사용 로그를 우선하며 채팅 계산값은 ≈로 표시해요. 일별 금액을 알 수 없는 잔액 차감분·보조 작업 비용은 합계에서 제외돼요. 과거 날짜는 조회된 기록 범위에 따라 일부만 보일 수 있어요.</p></div></section>`;
}
function usageCalendarAction(t){
 const a=t.closest('[data-usage-day],[data-usage-month],[data-usage-current]');if(!a)return false;
 if(a.hasAttribute('data-usage-day'))usageCalendarState.selected=a.dataset.usageDay;
 else if(a.hasAttribute('data-usage-current')){usageCalendarState.offset=0;usageCalendarState.selected=new Date().toISOString().slice(0,10)}
 else usageCalendarState.offset=Math.max(-2,Math.min(0,usageCalendarState.offset+Number(a.dataset.usageMonth)));
 const focus=a.hasAttribute('data-usage-day')?'[data-usage-day="'+a.dataset.usageDay+'"]':a.hasAttribute('data-usage-current')?'[data-usage-current]':'[data-usage-month="'+a.dataset.usageMonth+'"]';
 render();root?.querySelector(focus)?.focus();return true;
}
