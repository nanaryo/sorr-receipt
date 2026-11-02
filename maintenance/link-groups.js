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
