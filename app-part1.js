/* ========== 标策 BidProof · Kimi 版 — 交互逻辑 ========== */

const state = {
  ent: "A",
  view: "workspace",
  tasksDone: {},
  gatesDone: {},
  approvedV10: false,
  decisionV11: false,
  matrixFilter: "all",
  reqProject: "D04",
  selectedReq: null,
  guide: new Set(),
  audit: [...AUDIT_SEED],
};

const VIEW_TITLES = {
  workspace:"企业工作区", radar:"项目雷达", intake:"预筛与文件完整性",
  requirements:"要求解析与原文追溯", decision:"决策中心", tasks:"证据任务",
  matrix:"响应矩阵", chapter:"样章工作室", gate:"合规 Gate 与审计",
};

/* ---------- 工具 ---------- */
const $ = s => document.querySelector(s);
function now(){ const d=new Date(); return `${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; }
function log(text){ state.audit.push([now(), text]); if(state.view==="gate") render(); }
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("on"),3400); }
function statusBadge(s){
  return { pass:'<span class="badge badge-pass">Pass</span>',
           fail:'<span class="badge badge-fail">Fail</span>',
           unknown:'<span class="badge badge-unknown">Unknown</span>',
           fail_soft:'<span class="badge badge-loss">Known loss</span>',
           cond:'<span class="badge badge-cond">Conditional</span>' }[s] || "";
}
function decisionBadge(v,t){
  const cls={pass:"badge-pass",fail:"badge-fail",cond:"badge-cond",unknown:"badge-info"}[v];
  return `<span class="badge ${cls}">${t}</span>`;
}
function closeOnboarding(){ $("#onboarding").classList.add("hidden"); go("radar"); toast("已进入示例企业「澄明数智」——先看项目雷达：候选不等于推荐投标"); }
function markGuide(step){ if(!state.guide.has(step)){ state.guide.add(step); renderGuide(); } }
function renderGuide(){
  document.querySelectorAll("#guideList li").forEach(li=>li.classList.toggle("done", state.guide.has(li.dataset.step)));
  $("#guideProgress").textContent = `${state.guide.size}/6`;
  $("#guideBar").style.width = (state.guide.size/6*100)+"%";
}

/* ---------- 导航 ---------- */
function go(view){ state.view=view; document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===view)); $("#viewTitle").textContent=VIEW_TITLES[view]; render(); window.scrollTo({top:0}); }
document.querySelectorAll(".nav-item").forEach(n=>n.addEventListener("click",()=>go(n.dataset.view)));

/* ---------- 企业切换 ---------- */
function renderEntPills(){
  $("#entPills").innerHTML = Object.values(ENTERPRISES).map(e=>
    `<button class="es-pill ${state.ent===e.key?"active":""}" onclick="switchEnt('${e.key}')">${e.name}<span class="es-sub">${e.shape}</span></button>`).join("");
}
function switchEnt(k){
  state.ent=k; renderEntPills(); render();
  const e=ENTERPRISES[k];
  log(`切换企业画像为 ${e.full}`);
  toast(`已切换为「${e.name}」视角 —— 同一批招标项目，决策结论随企业证据实时变化`);
}

/* ---------- 视图渲染 ---------- */
function render(){
  ({workspace:vWorkspace, radar:vRadar, intake:vIntake, requirements:vRequirements,
    decision:vDecision, tasks:vTasks, matrix:vMatrix, chapter:vChapter, gate:vGate}[state.view])();
  renderNavBadges();
}
function renderNavBadges(){
  const open = D04_TASKS.filter(t=>!state.tasksDone[t.id]).length;
  const el=$("#navTaskCount"); el.textContent=open; el.classList.toggle("done", open===0);
  $("#navDotDecision").classList.toggle("on", open>0 && !state.decisionV11);
}

/* ========== 1. 企业工作区 ========== */
function vWorkspace(){
  const e=ENTERPRISES[state.ent];
  $("#content").innerHTML = `
  <div class="card ws-hero">
    <div class="ws-avatar">${e.avatar}</div>
    <div>
      <div class="ws-name">${e.full} ${e.tag==="示例企业"?'<span class="badge badge-cond">示例企业档案</span>':'<span class="badge badge-info">对照企业</span>'}</div>
      <div class="ws-meta">${e.size} 人 · ${e.shape} · ${e.region} · 合同区间 ${e.contracts}</div>
    </div>
    <div class="ws-stats">
      <div class="ws-stat"><b>${e.stats.certs}</b><span>证照资质</span></div>
      <div class="ws-stat"><b>${e.stats.people}</b><span>可用人员</span></div>
      <div class="ws-stat"><b>${e.stats.cases}</b><span>业绩案例</span></div>
      <div class="ws-stat"><b style="color:var(--fail)">${e.stats.taboo}</b><span>禁区红线</span></div>
    </div>
  </div>
  <div class="callout callout-info mt16">企业档案是全部决策的地基：<b>每条事实都带来源、有效期与责任人</b>；绿色为正向证据，红色为负向证据（禁区优先于任何相似度匹配），黄色为待核验。</div>
  <div class="grid grid-2 mt16">
    ${e.cards.map(card=>`
    <div class="card cap-card">
      <div class="cap-head"><div class="cap-name"><span class="cap-ico">${card.ico}</span>${card.name}</div><span class="hint">${card.items.length} 条</span></div>
      ${card.items.map(it=>`
      <div class="cap-item">
        <span class="cap-dot ${it.dir}"></span>
        <div class="cap-item-body">${it.t}
          <div class="cap-item-src">${it.s} · ${it.src}</div>
        </div>
        <span class="ev-id">${it.ev}</span>
      </div>`).join("")}
    </div>`).join("")}
  </div>
  <div class="footer-note">档案越完整，Unknown 越少，决策上限越高 —— 缺证据的要求永远不会被系统「脑补」成 Pass。</div>`;
}

/* ========== 2. 项目雷达 ========== */
function vRadar(){
  markGuide("radar");
  $("#content").innerHTML = `
  <div class="callout callout-warn radar-note"><b>候选 ≠ 推荐投标。</b>雷达只做发现与归档；只有经过完整文件解析与企业证据匹配，项目才能获得 Bid / Conditional / No-Bid 结论。标题看着再像，也不作数。</div>
  <div class="grid">
    ${PROJECTS.map(p=>{
      const d=p.decisions[state.ent];
      return `
      <div class="card proj-card" onclick="openProject('${p.id}')">
        <div class="proj-row">
          <div class="proj-main">
            <div class="proj-name">${p.name}</div>
            <div class="proj-meta"><span>${p.buyer}</span><span>${p.region}</span><span>${p.type}</span><span>${p.deadline}</span></div>
          </div>
          <div class="proj-right">
            <div class="proj-budget"><b>${p.budget}</b><span>${p.fileState}</span></div>
            ${decisionBadge(d.v,d.t)}
          </div>
        </div>
        <div class="proj-strip">⛉ ${p.strip}</div>
      </div>`;}).join("")}
  </div>
  <div class="footer-note">试试切换右上角企业画像：D02 对澄明数智是 No-Bid，对中原安维却是 Bid —— 不存在脱离企业的「项目好坏分」。</div>`;
}
function openProject(id){
  if(id==="D04"){ go("requirements"); state.reqProject="D04"; render(); }
  else if(id==="D02"){ go("decision"); markGuide("d02"); }
  else toast("该项目仅有公告/需求公示：已进入候选池，状态=「需完整文件」，取得完整采购文件后才能解析决策。");
}

/* ========== 3. 预筛与文件 ========== */
function vIntake(){
  $("#content").innerHTML = `
  <div class="grid grid-2">
    <div class="card">
      <div class="card-pad" style="border-bottom:1px solid var(--border-2)">
        <div class="card-title">D04 文件与版本管理</div>
        <div class="hint mt16">版本未确认前，系统不得输出确定性 Bid</div>
      </div>
      <div class="file-tree">
        ${[
          ["招标文件正文 v3","PDF · 118 页 · 采购人盖章版","a3f9…c21d","pass"],
          ["补遗公告 第 1 号","评分办法 S03 分值调整","7be2…90aa","pass"],
          ["补遗公告 第 2 号","完成期限明确为 2026-12-31","d417…f3b8","pass"],
          ["附件：合同条款模板","DOCX · 含 IP 与违约条款","9c0b…44e1","pass"],
          ["附件：现状系统接口说明","PDF · 扫描件 OCR","f62a…09c3","unknown"],
        ].map(f=>`<div class="file-item">
          <div class="file-ico">▤</div>
          <div class="file-name"><b>${f[0]}</b><span>${f[1]}</span></div>
          <span class="hash">${f[2]}</span>${f[3]==="pass"?'<span class="badge badge-pass">已确认</span>':'<span class="badge badge-unknown">复核中</span>'}
        </div>`).join("")}
      </div>
    </div>
    <div>
      <div class="card card-pad">
        <div class="card-title">包件与有效性</div>
        <table class="cf-table mt16">
          <tr><td style="width:110px" class="muted">包件</td><td>单包件，不允许分包响应</td></tr>
          <tr><td class="muted">当前有效版本</td><td>v3（含补遗 1/2）· 2026-07-15 冻结</td></tr>
          <tr><td class="muted">来源</td><td>上海政府采购网官方 URL + 用户上传原件，双向留存</td></tr>
          <tr><td class="muted">变更策略</td><td>文件实质变更 → 旧分析冻结，受影响要求重算，已批准决策回到 Needs Review</td></tr>
        </table>
      </div>
      <div class="callout callout-ok mt16"><b>G-File 文件门已通过：</b>完整文件、补遗与版本关系已确认，可以进入要求解析。若明天出现补遗 3 号，全部已批准结论将自动回炉复核。</div>
    </div>
  </div>`;
}

/* ========== 4. 要求解析 ========== */
function vRequirements(){
  const projTabs = `
    <div class="matrix-filter" style="margin-bottom:16px">
      <button class="mf-btn ${state.reqProject==="D04"?"active":""}" onclick="state.reqProject='D04';state.selectedReq=null;render()">D04 上海一网统管（15 项要求）</button>
      <button class="mf-btn ${state.reqProject==="D02"?"active":""}" onclick="state.reqProject='D02';state.selectedReq=null;render()">D02 枞阳渔政运维（4 项硬要求）</button>
    </div>`;
  if(state.reqProject==="D02"){ $("#content").innerHTML = projTabs + reqD02Html(); return; }

  const sel = state.selectedReq ?? D04_REQUIREMENTS[0].id;
  const r = D04_REQUIREMENTS.find(x=>x.id===sel);
  const counts = {pass:0,unknown:0,fail:0};
  D04_REQUIREMENTS.forEach(x=>{ if(x.status==="pass")counts.pass++; else if(x.status==="unknown")counts.unknown++; else counts.fail++; });

  $("#content").innerHTML = projTabs + `
  <div class="callout callout-info" style="margin-bottom:16px">每条要求都带<b>原文定位</b>与<b>企业证据</b>双向追溯。当前视角：${ENTERPRISES[state.ent].full}${state.ent!=="A"?"（演示数据以澄明数智为主案例，切换仅影响决策中心对照）":""}。</div>
  <div class="req-layout">
    <div class="card">
      <div class="card-pad" style="border-bottom:1px solid var(--border-2);display:flex;justify-content:space-between;align-items:center">
        <div class="card-title">要求清单</div>
        <div style="display:flex;gap:8px">
          <span class="badge badge-pass">Pass ${counts.pass}</span>
          <span class="badge badge-unknown">Unknown ${counts.unknown}</span>
          <span class="badge badge-loss">Known loss ${counts.fail}</span>
        </div>
      </div>
      ${D04_REQUIREMENTS.map(x=>`
      <div class="req-item ${x.id===sel?"selected":""}" onclick="state.selectedReq='${x.id}';render()">
        <div class="req-id">${x.id}</div>
        <div class="req-body">
          <div class="req-title">${x.title}</div>
          <div class="req-sub">${x.type} · ${x.src}</div>
        </div>
        <div class="req-right">${statusBadge(x.status)}${x.hard?'<span class="hard-tag">硬条件</span>':'<span class="soft-tag">评分项</span>'}</div>
      </div>`).join("")}
    </div>
    <div class="req-detail">
      <div class="card card-pad">
        <div class="card-title" style="font-size:14px">${r.id} ${statusBadge(r.status)}</div>
        <div style="margin:14px 0 8px" class="small muted">招标原文（可定位）</div>
        <div class="quote-box">${r.quote}<div class="quote-src">⛉ ${r.src} · 文件 v3 冻结版</div></div>
        <div style="margin:16px 0 8px" class="small muted">企业证据</div>
        ${r.ev.length ? r.ev.map(ev=>{const e=EVIDENCE[ev]; return e?`
          <div class="ev-card">
            <div class="ev-card-head"><span class="ev-name">${e.name}</span><span class="ev-id">${ev}</span></div>
            <div class="ev-meta">${e.meta}</div>
          </div>`:"";}).join("") :
          `<div class="callout callout-warn" style="margin-top:4px"><b>暂无有效证据。</b>该要求已进入 Unknown，系统不会替企业「编造」资质——可一键转为证据任务分派责任人。</div>`}
        <div class="callout ${r.status==="pass"?"callout-ok":r.status==="unknown"?"callout-warn":"callout-danger"} mt16">${r.note}</div>
        ${r.status==="unknown"?`<button class="btn-accent mt16" style="width:100%" onclick="go('tasks')">→ 转为证据任务（5 个待处理）</button>`:""}
      </div>
    </div>
  </div>`;
}
function reqD02Html(){
  return `
  <div class="callout callout-danger" style="margin-bottom:16px"><b>标题级相似 ≠ 可投。</b>D02 标题是「信息化系统运维」，与应用运维高度相似；但完整文件里的现场/高空/付款硬要求，对澄明数智是 4 个直接阻断项。</div>
  <div class="card">
    <div class="card-pad" style="border-bottom:1px solid var(--border-2)"><div class="card-title">同一要求 · 三个企业三个结论（当前：${ENTERPRISES[state.ent].name}）</div></div>
    <table class="cf-table">
      <tr><th style="width:30%">要求 / 原文</th><th>澄明数智 A</th><th>中原安维 B</th><th>钱塘智航 C</th></tr>
      ${D02_REQUIREMENTS.map(r=>`
      <tr>
        <td><b>${r.id}</b> ${r.title}
          <div class="quote-box" style="margin-top:8px">${r.quote}<div class="quote-src">⛉ ${r.src}</div></div>
        </td>
        ${["A","B","C"].map(k=>{const v=r.byEnt[k];return `<td style="${k===state.ent?'background:var(--accent-soft)':''}">${statusBadge(v.s)}<div class="small muted" style="margin-top:5px">${v.note}</div></td>`;}).join("")}
      </tr>`).join("")}
      <tr>
        <td><b>结论</b></td>
        <td style="${state.ent==='A'?'background:var(--accent-soft)':''}"><span class="badge badge-fail">No-Bid</span><div class="small muted" style="margin-top:5px">停止一切下游动作</div></td>
        <td style="${state.ent==='B'?'background:var(--accent-soft)':''}"><span class="badge badge-pass">Bid</span><div class="small muted" style="margin-top:5px">同类案例在运</div></td>
        <td style="${state.ent==='C'?'background:var(--accent-soft)':''}"><span class="badge badge-fail">No-Bid</span><div class="small muted" style="margin-top:5px">3 个阻断项</div></td>
      </tr>
    </table>
  </div>`;
}
