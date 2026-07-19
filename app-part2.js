
/* ========== 5. 决策中心 ========== */
function vDecision(){
  markGuide("d02");
  const e=ENTERPRISES[state.ent];
  const open=D04_TASKS.filter(t=>!state.tasksDone[t.id]).length;
  const d04verdict = state.decisionV11
    ? `<span style="color:var(--pass)">Bid</span> <span class="badge badge-cond">with competitive risk</span>`
    : `<span style="color:var(--cond)">Conditional Bid</span>`;
  const d02d=PROJECTS.find(p=>p.id==="D02").decisions[state.ent];

  $("#content").innerHTML = `
  <div class="card decision-hero">
    <div class="decision-verdict">
      <div class="decision-label">D04 上海一网统管 × ${e.name} · 当前决策</div>
      <div class="decision-value">${state.ent==="A"?d04verdict:(state.ent==="B"?'<span style="color:var(--fail)">No-Bid</span> <span class="badge badge-fail">战略排除大型定制开发</span>':'<span style="color:var(--pass)">Bid</span> <span class="badge badge-cond">with competitive risk</span>')}</div>
      <div class="decision-version">${state.decisionV11?"决策版本 v1.1 · 补证后更新 · 审批人：投标负责人（模拟）":"决策版本 v1.0 · 依据：采购文件冻结版 v3 · 5 个 Unknown 未决"}</div>
      <div class="tally">
        <div class="tally-item tally-pass"><b>6</b>Pass</div>
        <div class="tally-item tally-unk"><b>${state.decisionV11?0:open}</b>Unknown</div>
        <div class="tally-item tally-fail"><b>1</b>Known loss</div>
      </div>
    </div>
    <div class="decision-actions">
      ${state.ent==="A" && !state.approvedV10 ? `<button class="btn-primary" onclick="approveV10()">批准 Conditional Bid v1.0</button>`:""}
      ${state.ent==="A" && state.approvedV10 && !state.decisionV11 ? `<button class="btn-accent" onclick="go('tasks')">去关闭 ${open} 个 Unknown 任务</button>`:""}
      ${state.decisionV11 ? `<button class="btn-primary" onclick="go('matrix')">进入响应矩阵 →</button>`:""}
      ${state.ent==="A" ? `<button class="btn-ghost" disabled title="无证据承诺已被系统拦截">生成「已具备 ITSS / 10 人已到位」✕ 已拦截</button>`:""}
    </div>
  </div>

  ${state.ent==="A" && !state.decisionV11 ? `
  <div class="callout callout-warn mt16"><b>Conditional 的含义：</b>硬 Unknown 未关闭前，决策上限只能是 Conditional——禁止对外承诺「已配置 10 人」「具备 ITSS」，禁止输出可提交初稿。把 5 个 Unknown 变成任务，是通往 Bid 的唯一路径。</div>`:""}
  ${state.decisionV11 ? `
  <div class="callout callout-ok mt16"><b>Bid v1.1 成立：</b>全部硬条件与经营红线闭合。ITSS 记为竞争性丢分（Known loss）而非废标；案例只计 2 强 1 弱，不虚构第 4 个。下游已授权：响应矩阵、证据包、内部样章——<b>仍不授权提交正式投标文件</b>。</div>`:""}

  <div class="grid grid-2 mt16">
    <div class="card card-pad">
      <div class="card-title">退出触发器（任一发生 → 重新评审甚至 No-Bid）</div>
      <ul class="exit-list mt16">
        <li>采购文件变更为 10 人长期现场而非阶段现场</li>
        <li>要求转让企业既有通用组件全部知识产权</li>
        <li>付款改为全部验收后支付</li>
        <li>A-D04-TEAM-10 关键人员发生排期冲突</li>
        <li>招标澄清新增企业未持有的法定资质</li>
      </ul>
    </div>
    <div class="card card-pad">
      <div class="card-title">反事实：换一家企业，结论就不同</div>
      <table class="cf-table mt16">
        <tr><th>项目</th><th>A 澄明数智</th><th>B 中原安维</th><th>C 钱塘智航</th></tr>
        <tr><td><b>D04</b> 一网统管开发</td><td>${state.decisionV11?'<span class="badge badge-pass">Bid v1.1</span>':'<span class="badge badge-cond">Conditional</span>'}</td><td><span class="badge badge-fail">No-Bid</span></td><td><span class="badge badge-pass">Bid·风险</span></td></tr>
        <tr><td><b>D02</b> 渔政运维</td><td><span class="badge badge-fail">No-Bid</span></td><td><span class="badge badge-pass">Bid</span></td><td><span class="badge badge-fail">No-Bid</span></td></tr>
        <tr><td><b>D10</b> 海事 AI 智能体</td><td><span class="badge badge-unknown">Cond. No-Bid</span></td><td><span class="badge badge-fail">No-Bid</span></td><td><span class="badge badge-cond">Cond. Bid</span></td></tr>
      </table>
      <div class="hint mt16">10 个深度项目中 9 个随企业画像产生不同结论 —— 所以系统拒绝给出「通用可投分数」。</div>
    </div>
  </div>

  <div class="card mt16">
    <div class="card-pad" style="border-bottom:1px solid var(--border-2);display:flex;justify-content:space-between;align-items:center">
      <div class="card-title">D02 枞阳渔政运维 × ${e.name} · ${d02d.t}</div>
      ${decisionBadge(d02d.v,d02d.t)}
    </div>
    <div class="card-pad">
      ${d02d.v==="fail" ? `
      <div class="callout callout-danger"><b>正确早停就是省钱。</b>4 个硬阻断项在文件解析后即触发 No-Bid：不创建 28 行响应矩阵、不组 10 人团队、不写技术/安全/质量章节、不动法务。相对 D04 主路径，避免的是一整套无效编标动作。</div>
      <div style="display:flex;gap:10px;margin-top:14px">
        <button class="btn-ghost" disabled title="No-Bid 项目已归档，写标动作默认关闭">一键写标（已禁用）</button>
        <button class="btn-ghost" onclick="state.reqProject='D02';go('requirements')">查看 4 个阻断项原文与反证</button>
        <button class="btn-ghost" onclick="switchEnt('B')">切换中原安维看反事实 →</button>
      </div>` : `
      <div class="callout callout-ok"><b>同一项目，对 ${e.name} 是优势标：</b>双证人员 6 名、同类案例在运、财务规则允许账期。Bid 之后仍需运营经理锁定 3 名双证人员——那是执行任务，不改变硬条件结论。</div>
      <div style="display:flex;gap:10px;margin-top:14px">
        <button class="btn-ghost" onclick="switchEnt('A')">切回澄明数智看 No-Bid →</button>
      </div>`}
    </div>
  </div>`;
}
function approveV10(){
  state.approvedV10=true; markGuide("d04");
  log("投标负责人批准 D04 决策 Conditional Bid v1.0（5 个 Unknown 转为证据任务）");
  toast("已批准 Conditional Bid v1.0 —— 现在去关闭 5 个 Unknown 任务，把决策推向 Bid v1.1");
  go("tasks");
}

/* ========== 6. 证据任务 ========== */
function vTasks(){
  const open=D04_TASKS.filter(t=>!state.tasksDone[t.id]).length;
  $("#content").innerHTML = `
  <div class="callout callout-info" style="margin-bottom:16px">Unknown 不会消失，只会被分派。每个任务都带<b>责任人、截止门槛与未关闭后果</b>；回传的证据经核验后，对应要求才会从 Unknown 转为 Pass（或如实记为 Known loss）。</div>
  <div class="card">
    <div class="card-pad" style="border-bottom:1px solid var(--border-2);display:flex;justify-content:space-between;align-items:center">
      <div class="card-title">D04 证据任务 · 剩余 ${open} / 5</div>
      ${open===0?'<span class="badge badge-pass">全部关闭</span>':'<span class="badge badge-unknown">进行中</span>'}
    </div>
    ${D04_TASKS.map(t=>`
    <div class="task-item ${state.tasksDone[t.id]?"done":""}">
      <div class="task-check" onclick="toggleTask('${t.id}')">${state.tasksDone[t.id]?"✓":""}</div>
      <div class="task-body">
        <div class="task-title">${t.title}</div>
        <div class="task-meta"><span>对应要求：${t.req}</span><span>责任人：${t.owner}</span><span>门槛：${t.due}</span><span style="color:var(--fail)">未关闭后果：${t.consequence}</span></div>
        <div class="task-ev">↩ 回传证据已核验：<b>${t.evBack.split("：")[0]}</b>　${t.evBack.split("：")[1]||""}</div>
      </div>
      ${state.tasksDone[t.id]?'':'<button class="btn-accent" onclick="toggleTask(\''+t.id+'\')">模拟证据回传</button>'}
    </div>`).join("")}
  </div>
  ${open===0?`<div class="callout callout-ok mt16"><b>全部 Unknown 已处理。</b>D04 决策已从 Conditional v1.0 更新为 <b>Bid v1.1（with competitive risk）</b>——ITSS 如实记为 Known loss，没有粉饰。响应矩阵与样章工作室现已完全解锁。</div>`:""}`;
}
function toggleTask(id){
  state.tasksDone[id]=!state.tasksDone[id];
  const t=D04_TASKS.find(x=>x.id===id);
  if(state.tasksDone[id]){
    log(`证据回传核验通过：${t.evBack.split("：")[0]}（对应 ${t.req}）`);
    const open=D04_TASKS.filter(x=>!state.tasksDone[x.id]).length;
    if(open===0 && !state.decisionV11){
      state.decisionV11=true; markGuide("tasks");
      log("D04 决策更新：Conditional Bid v1.0 → Bid v1.1 with competitive risk（ITSS 记 Known loss）");
      toast("5/5 Unknown 已关闭 —— 决策更新为 Bid v1.1，响应矩阵与样章已解锁");
    } else toast(`已回传：${t.title}（剩余 ${open} 项）`);
  }
  render();
}

/* ========== 7. 响应矩阵 ========== */
function vMatrix(){
  markGuide("matrix");
  const stName={ready:"Ready",draft:"Draft",loss:"Known loss",gate:"Gate"};
  const rows=D04_MATRIX.filter(r=>state.matrixFilter==="all"||r[5]===state.matrixFilter);
  const tally={ready:0,draft:0,loss:0,gate:0}; D04_MATRIX.forEach(r=>tally[r[5]]++);
  $("#content").innerHTML = `
  <div class="card">
    <div class="card-pad" style="border-bottom:1px solid var(--border-2)">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div class="card-title">D04-A 响应矩阵 v1.1 · 28/28 行绑定要求</div>
        <div class="matrix-filter">
          ${["all","ready","draft","loss","gate"].map(f=>`<button class="mf-btn ${state.matrixFilter===f?"active":""}" onclick="state.matrixFilter='${f}';render()">${f==="all"?"全部 28":stName[f]+" "+tally[f]}</button>`).join("")}
        </div>
      </div>
      <div class="hint" style="margin-top:8px">只有 Ready 或经批准的 Draft 可进入样章；Known loss 只进内部缺口视图；Gate 未签批则阻止导出。</div>
    </div>
    <div class="matrix-wrap">
      <table class="matrix-table">
        <tr><th>要求 ID</th><th>要求</th><th>类型</th><th>响应策略</th><th>企业证据</th><th>状态</th><th>负责人</th><th>章节</th></tr>
        ${rows.map(r=>`<tr>
          <td class="req-id" style="width:auto">${r[0]}</td><td><b>${r[1]}</b></td><td>${r[2]}</td>
          <td>${r[3]}</td><td><span class="ev-id">${r[4]}</span></td>
          <td><span class="st st-${r[5]}">${stName[r[5]]}</span></td><td>${r[6]}</td><td>${r[7]}</td>
        </tr>`).join("")}
      </table>
    </div>
  </div>
  <div class="callout callout-warn mt16"><b>注意第 23 行（ITSS）：</b>系统把它写成「Known loss / 缺口说明」而不是「具备」。丢 2 分不可怕，废标 + 信用惩戒才可怕——这就是证据约束写作的意义。</div>`;
}

/* ========== 8. 样章工作室 ========== */
function vChapter(){
  const doc = D04_CHAPTER.map(sec=>`
    <h4>${sec.h}</h4>
    ${(sec.paras||[]).map(p=>`<p>${renderChips(p)}</p>`).join("")}
    ${sec.list?`<ol>${sec.list.map(li=>`<li>${li}</li>`).join("")}</ol>`:""}
  `).join("");
  $("#content").innerHTML = `
  <div class="chapter-layout">
    <div class="chapter-doc">
      <h3>4 实施与质量保障方案（内部样章）</h3>
      ${doc}
      <p style="text-align:center;color:var(--faint);font-size:11px;margin-top:28px">—— 样章由响应矩阵驱动生成 · 每段携带 requirement_ids 与 evidence_ids · 不可直接提交 ——</p>
    </div>
    <div>
      <div class="card card-pad">
        <div class="card-title">写作约束（已强制执行）</div>
        <div class="mt16">
          ${[
            "只用了已批准的证据，未知项保留占位",
            "数字/日期/人名/证书从结构化证据复制，不改写",
            "阶段驻场没有被「润色」成全年驻场",
            "明确声明不具备法定测评资格，不偷换概念",
            "ITSS 缺口如实披露，未虚构第 4 个案例",
            "Unknown 被写成确定事实：0 处",
          ].map(x=>`<div class="constraint-item"><span class="constraint-ico">✓</span>${x}</div>`).join("")}
        </div>
      </div>
      <div class="callout callout-info mt16">点击正文中的 <span class="ev-chip">EVIDENCE-ID</span> 可查看证据卡——评审专家的每一处质疑，都能在一秒内回到原始材料。</div>
    </div>
  </div>`;
}
function renderChips(p){
  return p.replace(/§([A-Z0-9\-]+)/g,(m,id)=>`<span class="ev-chip" onclick="showEvidence('${id}')">${id}</span>`);
}
function showEvidence(id){
  const e=EVIDENCE[id]; if(!e) return;
  $("#drawerTitle").textContent=id;
  $("#drawerBody").innerHTML=`
    <div class="ev-card" style="margin-top:0">
      <div class="ev-card-head"><span class="ev-name">${e.name}</span><span class="cap-dot ${e.dir}" style="margin-top:2px"></span></div>
      <div class="ev-meta">${e.meta}</div>
    </div>
    <div class="callout callout-info mt16">证据类型：${e.dir==="pos"?"正向（具备）":e.dir==="neg"?"负向（明确不具备/禁区）":"待核验"}。负向证据优先于任何语义相似度。</div>
    <div class="hint mt16">生产版本中，此处展示原始文件页码、短引文与版本哈希，并记录每次引用行为。</div>`;
  $("#drawer").classList.add("on"); $("#drawerMask").classList.add("on");
}
function closeDrawer(){ $("#drawer").classList.remove("on"); $("#drawerMask").classList.remove("on"); }

/* ========== 9. 合规 Gate ========== */
function vGate(){
  const allItems=GATES.flatMap((g,gi)=>g.items.map((_,ii)=>gi+"-"+ii));
  const doneCount=allItems.filter(k=>state.gatesDone[k]).length;
  const allDone=doneCount===allItems.length;
  $("#content").innerHTML = `
  <div class="callout callout-warn" style="margin-bottom:16px"><b>「生成完成」不等于「可提交」。</b>四道 Gate 未关闭前，只能导出内部评审包；正式投标永远需要人来签字负责。</div>
  <div class="gate-grid">
    ${GATES.map((g,gi)=>{
      const closed=g.items.every((_,ii)=>state.gatesDone[gi+"-"+ii]);
      return `
      <div class="card gate-card">
        <div class="gate-head">
          <div class="gate-ico ${closed?"gate-closed":"gate-open"}">${closed?"✓":"●"}</div>
          <div><div class="gate-name">${g.id} ${g.name}</div><div class="gate-desc">${g.desc}</div></div>
          <div style="margin-left:auto">${closed?'<span class="badge badge-pass">已关闭</span>':'<span class="badge badge-unknown">待签批</span>'}</div>
        </div>
        <div class="gate-items">
          ${g.items.map((it,ii)=>`
          <div class="gate-item">
            <div class="task-check" style="width:18px;height:18px;border-radius:6px;font-size:10px;${state.gatesDone[gi+"-"+ii]?"background:var(--pass);border-color:var(--pass);color:#fff":""}" onclick="toggleGate(${gi},${ii})">${state.gatesDone[gi+"-"+ii]?"✓":""}</div>
            <span style="${state.gatesDone[gi+"-"+ii]?"text-decoration:line-through;color:var(--muted)":""}">${it}</span>
          </div>`).join("")}
        </div>
      </div>`;}).join("")}
  </div>
  <div class="card export-zone">
    <div class="card-title" style="justify-content:center">导出控制</div>
    <div class="hint" style="margin:8px 0 16px">Gate 关闭进度 ${doneCount}/${allItems.length}</div>
    <div style="display:flex;gap:12px;justify-content:center">
      <button class="btn-primary" ${allDone?"":"disabled"} onclick="exportPack()">导出内部评审包（含来源脚注）</button>
      <button class="btn-ghost" disabled title="任何状态下系统都不会开放此按钮">标记为「可提交」✕</button>
    </div>
    ${allDone?'<div class="callout callout-ok mt16" style="text-align:left"><b>四道 Gate 全部关闭。</b>内部评审包已可导出——它包含 28 行矩阵、证据链、样章与全部审计记录，供负责人、交付、财务、法务做最终人工决策。</div>':""}
  </div>
  <div class="card mt16">
    <div class="card-pad" style="border-bottom:1px solid var(--border-2)"><div class="card-title">审计日志（谁在何时对什么做了什么）</div></div>
    <div class="card-pad audit-list">
      ${[...state.audit].reverse().map(a=>`<div class="audit-item"><span class="audit-time">${a[0]}</span><span>${a[1]}</span></div>`).join("")}
    </div>
  </div>`;
  if(allDone) markGuide("gate");
}
function toggleGate(gi,ii){
  const k=gi+"-"+ii; state.gatesDone[k]=!state.gatesDone[k];
  if(state.gatesDone[k]) log(`人工签批：${GATES[gi].id} · ${GATES[gi].items[ii]}`);
  render();
}
function exportPack(){
  log("导出内部评审包（含 28 行矩阵 / 证据链 / 样章 / 审计记录）");
  toast("内部评审包已生成（演示）——正式提交仍需负责人、交付、财务、法务按最新文件签字");
}

/* ---------- 初始化 ---------- */
renderEntPills(); renderGuide(); go("workspace");
