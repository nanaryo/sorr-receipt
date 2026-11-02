'use strict';
// Read-only companion: no prompts, outputs, keys or provider calls leave this module.
const path=require('node:path');
const {pathToFileURL}=require('node:url');
function aggregateTrackerUsage(runs,connections){
  const by=new Map();
  for(const r of runs){
    const at=Date.parse(r.createdAt);if(!Number.isFinite(at))continue;
    const c=connections.find(c=>c.id===r.connectionId);
    // Historical runs store total tokens but no historical model or input/output split.
    const model=c?.model||null,provider=c?.provider||null;
    const hour=new Date(at).toISOString().slice(0,13),key=JSON.stringify([hour,r.connectionId,model]);
    if(!by.has(key))by.set(key,{hour,connectionId:r.connectionId||null,model,provider,inferred:true,n:0,tokens:0,latest:0});
    const x=by.get(key);x.n++;x.tokens+=Math.max(0,Number(r.tokensUsed)||0);x.latest=Math.max(x.latest,at);
  }
  return [...by.values()];
}
exports.aggregateTrackerUsage=aggregateTrackerUsage;
exports.register=function(app,{serverDist,engine}){
  let cache=null;
  app.get('/receipt-usage',async(req,reply)=>{
    const from=String(req.query?.from||'');const since=Date.parse(from);
    if(!Number.isFinite(since)||since<Date.now()-70*86400000||since>Date.now())return reply.code(400).send({error:'Invalid usage period'});
    if(cache?.from===from&&Date.now()-cache.at<15000)return cache.value;
    const load=rel=>import(pathToFileURL(path.join(serverDist(),rel)).href);
    const [{getDB},{agentRuns,agentConfigs},{eq,and,gte,desc},e]=await Promise.all([load('db/connection.js'),load('db/schema/index.js'),load('db/file-query.js'),engine()]);
    const db=await getDB();
    const runs=await db.select({id:agentRuns.id,createdAt:agentRuns.createdAt,tokensUsed:agentRuns.tokensUsed,connectionId:agentConfigs.connectionId}).from(agentRuns).innerJoin(agentConfigs,eq(agentRuns.agentConfigId,agentConfigs.id)).where(and(eq(agentConfigs.type,'custom-tracker'),gte(agentRuns.createdAt,new Date(since).toISOString()))).orderBy(desc(agentRuns.createdAt)).limit(50001);
    const rows=aggregateTrackerUsage(runs.slice(0,50000),await e.connections.list());
    const value={source:'saved-custom-tracker-runs',at:Date.now(),from,partial:runs.length>50000,modelAttribution:'current-agent-connection',costAvailable:false,rows};
    cache={from,at:Date.now(),value};return value;
  });
};
