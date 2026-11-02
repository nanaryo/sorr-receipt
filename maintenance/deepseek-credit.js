// Observed balance changes and saved tracker activity are independent measurements.
function deepseekCreditActivity(rows,connections,now=Date.now()){
 const ids=new Set(connections.filter(c=>{try{return new URL(c.baseUrl).hostname==='api.deepseek.com'}catch{return false}}).map(c=>c.id));
 const date=new Date(now),day=new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime(),month=new Date(date.getFullYear(),date.getMonth(),1).getTime();
 const result={today:{n:0,tokens:0},month:{n:0,tokens:0}};
 for(const r of rows){const at=Date.parse(r.hour+':00:00Z');if(!ids.has(r.connectionId)||!Number.isFinite(at)||at<month||at>now)continue;
  for(const k of at>=day?['today','month']:['month']){result[k].n+=Math.max(0,Number(r.n)||0);result[k].tokens+=Math.max(0,Number(r.tokens)||0)}
 }
 return result;
}
function deepseekCreditMoney(value,currency){
 if(value>0&&value<0.000001)return '<'+currency+'0.000001';
 return currency+Number(value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:6});
}
function deepseekCreditActivityHTML(){
 if(!trackerUsage.loaded&&!trackerUsage.error)return '<p class="mlh-cr-tag">트래커 사용 기록을 읽는 중이에요.</p>';
 if(trackerUsage.error)return '<p class="mlh-cr-tag">트래커 사용 기록 조회 실패 · 사용하지 않았다는 뜻은 아니에요.</p>';
 const a=deepseekCreditActivity(trackerUsage.rows,data.conns||[]);
 return `<div class="sorr-ds-activity"><b>딥시크 트래커 사용 기록</b><div class="mlh-rc-line"><span>오늘 실행</span><i></i><b>${a.today.n}회</b><em>${kTok(a.today.tokens)} 토큰</em></div><div class="mlh-rc-line"><span>이번 달 실행</span><i></i><b>${a.month.n}회</b><em>${kTok(a.month.tokens)} 토큰</em></div><p class="mlh-cr-tag">공식 딥시크 연결의 커스텀 트래커 저장 기록 · 현재 연결 설정 기준${trackerUsage.partial?' · 일부 기록만 조회됨':''}<br>실행 횟수·토큰과 잔액 차감액은 별도예요. 다른 기능의 호출은 이 횟수에 포함하지 않아요.</p></div>`;
}
