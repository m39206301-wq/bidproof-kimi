/* ========== 数据层：全部素材取自 zhaobiao_PRD 仓库实验（真实招标文件解析 + 合成企业） ========== */

const ENTERPRISES = {
  A: {
    key:"A", name:"澄明数智", full:"北京澄明数智科技有限公司", avatar:"澄",
    size:78, region:"京津冀 / 远程", contracts:"50–500 万", shape:"软件开发 / 应用运维",
    tag:"示例企业",
    stats:{ certs:6, people:24, cases:9, taboo:4 },
    cards:[
      { name:"证照资质", ico:"证", items:[
        { t:"ISO/IEC 27001 信息安全管理体系", s:"有效", dir:"pos", src:"证书编号 CN24/30718 · 有效期至 2027-03", ev:"CERT-27001" },
        { t:"高新技术企业证书", s:"有效", dir:"pos", src:"有效期至 2026-11", ev:"CERT-HTE" },
        { t:"ITSS 运维能力成熟度三级", s:"未持有", dir:"neg", src:"负向证据 · 查询核验 2026-07", ev:"A-D04-ITSS-NEG" },
        { t:"中小企业声明", s:"可出具", dir:"pos", src:"符合工信部中小企业划型标准", ev:"A-D04-SME-01" },
      ]},
      { name:"人员团队", ico:"人", items:[
        { t:"可投入开发与运维工程师 24 人", s:"在职", dir:"pos", src:"社保清单核验 2026-06", ev:"PER-ROSTER" },
        { t:"高级信息系统项目管理师 1 名（拟派 PM）", s:"证书+社保+同类项目证明齐", dir:"pos", src:"参与 2024 一体化政务平台升级", ev:"A-D04-PM-01" },
        { t:"高处作业 / 电工双证人员", s:"无", dir:"neg", src:"人员台账确认", ev:"NEG-FIELD-CERT" },
      ]},
      { name:"业绩案例", ico:"绩", items:[
        { t:"2024 一体化政务服务平台升级", s:"合同+验收齐 · 强相关", dir:"pos", src:"合同额 320 万", ev:"A-D04-CASE-01" },
        { t:"2023 数据交换平台建设", s:"合同+验收齐 · 数据/API 相似", dir:"pos", src:"合同额 185 万", ev:"A-D04-CASE-02" },
        { t:"2025 政务门户与统一身份运维", s:"弱相关（运维类）", dir:"unk", src:"按开发类案例计分存疑", ev:"A-D04-CASE-03" },
      ]},
      { name:"产品与方案", ico:"品", items:[
        { t:"Java/Spring 政务 Web 系统定制开发", s:"强", dir:"pos", src:"能力卡 · 技术负责人确认", ev:"CAP-DEV-01" },
        { t:"数据交换 / API 集成", s:"强", dir:"pos", src:"能力卡", ev:"CAP-DATA-01" },
        { t:"云迁移与基础环境实施", s:"具备", dir:"pos", src:"能力卡", ev:"CAP-CLOUD-01" },
        { t:"AI / 大模型行业应用", s:"无已证实案例", dir:"neg", src:"负向证据", ev:"NEG-AI" },
      ]},
      { name:"交付能力", ico:"付", items:[
        { t:"10 人项目组成建制作战（8–12 月排期）", s:"可锁定", dir:"pos", src:"交付负责人批准", ev:"A-D04-TEAM-10" },
        { t:"上海阶段驻场（调研/安装/试运行/验收）", s:"可承诺", dir:"pos", src:"差旅预算已测算", ev:"A-D04-ONSITE-01" },
        { t:"7×24 现场值守 / 异地长期驻场", s:"不可承诺", dir:"neg", src:"经营红线", ev:"NEG-ONSITE" },
      ]},
      { name:"禁区与红线", ico:"禁", items:[
        { t:"弱电 / 高空 / 现场资产运维", s:"排除", dir:"neg", src:"企业战略边界", ev:"NEG-CONSTRUCT" },
        { t:"全部验收后 100% 付款", s:"拒绝", dir:"neg", src:"财务红线", ev:"NEG-PAYMENT" },
        { t:"既有通用组件知识产权整体转让", s:"不接受", dir:"neg", src:"法务红线", ev:"NEG-IP" },
        { t:"大型硬件集成总包", s:"排除", dir:"neg", src:"企业战略边界", ev:"NEG-HW" },
      ]},
    ]
  },
  B: {
    key:"B", name:"中原安维", full:"郑州中原安维系统工程有限公司", avatar:"安",
    size:168, region:"河南及多省现场组", contracts:"50–1,200 万", shape:"现场运维 / 软硬件集成",
    tag:"对照企业",
    stats:{ certs:11, people:96, cases:21, taboo:3 },
    cards:[
      { name:"证照资质", ico:"证", items:[
        { t:"ITSS / CCRC / CS3", s:"均持有", dir:"pos", src:"证书核验有效", ev:"B-CERTS" },
        { t:"ISO 27001 / 9001 / 20000", s:"有效", dir:"pos", src:"体系证书齐", ev:"B-ISO" },
      ]},
      { name:"人员团队", ico:"人", items:[
        { t:"高处作业+电工双证人员 6 名", s:"在职可锁", dir:"pos", src:"证书+社保齐", ev:"B-PER-DUAL-01" },
        { t:"7×24 现场值守（最多 30 人）", s:"可承诺", dir:"pos", src:"多省现场组", ev:"B-CAP-FIELD-01" },
      ]},
      { name:"业绩案例", ico:"绩", items:[
        { t:"2025 渔政信息化运维同类项目", s:"合同+验收齐", dir:"pos", src:"同类案例", ev:"B-CASE-FISH-2025" },
      ]},
      { name:"禁区与红线", ico:"禁", items:[
        { t:"大型定制软件开发", s:"战略排除（仅小改）", dir:"neg", src:"企业战略边界", ev:"B-NEG-DEV" },
        { t:"AI / 大模型项目", s:"排除", dir:"neg", src:"无能力证据", ev:"B-NEG-AI" },
        { t:"验收后 100% 付款（≤500 万现场项目除外）", s:"有条件接受", dir:"unk", src:"财务规则", ev:"B-PAY-RULE" },
      ]},
    ]
  },
  C: {
    key:"C", name:"钱塘智航", full:"杭州钱塘智航数据科技有限公司", avatar:"杭",
    size:52, region:"杭甬沪 / 远程", contracts:"80–400 万", shape:"AI / 数据产品",
    tag:"对照企业",
    stats:{ certs:4, people:18, cases:7, taboo:4 },
    cards:[
      { name:"产品与方案", ico:"品", items:[
        { t:"AI 智能体 / 海事 AIS 数据产品", s:"强", dir:"pos", src:"自有 IP", ev:"C-CAP-AI-01" },
        { t:"定制软件开发", s:"强", dir:"pos", src:"能力卡", ev:"C-CAP-DEV-01" },
      ]},
      { name:"业绩案例", ico:"绩", items:[
        { t:"2025 海事智能体项目", s:"合同+验收齐", dir:"pos", src:"同类案例", ev:"C-CASE-MARITIME-2025" },
        { t:"2024 数据平台 / 2023 政务开发", s:"合同+验收齐", dir:"pos", src:"案例组", ev:"C-CASE-DATA-2024" },
      ]},
      { name:"禁区与红线", ico:"禁", items:[
        { t:"高空 / 电工 / 现场资产运维", s:"无能力", dir:"neg", src:"人员台账", ev:"C-NEG-HW" },
        { t:"验收后 100% 付款", s:"拒绝", dir:"neg", src:"财务红线", ev:"C-NEG-PAY" },
        { t:"ITSS 三级", s:"未持有", dir:"neg", src:"负向证据", ev:"C-NEG-ITSS" },
      ]},
    ]
  }
};

/* ---------- 项目雷达 ---------- */
const PROJECTS = [
  {
    id:"D04", name:"上海市“一网统管”城市运行案件管理模块升级开发项目",
    buyer:"上海市某区城市运行管理中心", budget:"165 万", deadline:"2026-08-15 截止",
    region:"上海", type:"定制开发", fileState:"完整文件已确认", packages:"单包件",
    decisions:{ A:{v:"cond",t:"Conditional Bid v1.0"}, B:{v:"fail",t:"No-Bid（战略排除）"}, C:{v:"cond",t:"Bid · 竞争风险"} },
    strip:"6 类要求已解析 · 硬条件 8 项 · 当前 5 个 Unknown 待回传"
  },
  {
    id:"D02", name:"枞阳县渔政信息化系统运维服务项目",
    buyer:"枞阳县农业农村局", budget:"98 万/年", deadline:"2026-08-02 截止",
    region:"安徽铜陵", type:"运维服务", fileState:"完整文件已确认", packages:"单包件",
    decisions:{ A:{v:"fail",t:"No-Bid · 4 个阻断项"}, B:{v:"pass",t:"Bid（同类交付）"}, C:{v:"fail",t:"No-Bid · 3 个阻断项"} },
    strip:"标题与“应用运维”高度相似 —— 但完整文件显示现场/高空/电力硬要求"
  },
  {
    id:"D10", name:"浙江海事 AI 智能体与 AIS 数据应用建设项目",
    buyer:"浙江海事局某分支局", budget:"260 万", deadline:"澄清中",
    region:"浙江杭州", type:"AI / 数据", fileState:"缺完整评分与付款条款", packages:"待确认",
    decisions:{ A:{v:"unknown",t:"Conditional No-Bid"}, B:{v:"fail",t:"No-Bid"}, C:{v:"cond",t:"Conditional Bid"} },
    strip:"仅有公告与需求公示 · 首要任务：取得并解析完整采购文件"
  },
  {
    id:"D07", name:"某区政务大厅排队叫号系统年度运维",
    buyer:"某区政务服务办", budget:"45 万", deadline:"2026-08-20 截止",
    region:"北京", type:"运维服务", fileState:"仅公告", packages:"待确认",
    decisions:{ A:{v:"unknown",t:"候选 · 需完整文件"}, B:{v:"unknown",t:"候选 · 需完整文件"}, C:{v:"unknown",t:"候选 · 需完整文件"} },
    strip:"公告级信号不足以决策 · 导入完整文件后方可解析"
  },
];

/* ---------- D04 要求清单（企业 A 视角，v1.0） ---------- */
const D04_REQUIREMENTS = [
  { id:"D04-Q01.1", title:"中小企业声明：本项目专门面向中小企业采购", type:"资格", hard:true, status:"pass",
    quote:"本项目专门面向中小企业采购，投标人须提供《中小企业声明函》。",
    src:"采购文件 · 第一章 投标人须知 1.3 · 第 4 页", ev:["A-D04-SME-01"], note:"企业规模 78 人，符合划型标准。" },
  { id:"D04-Q01.2", title:"不接受联合体投标", type:"资格", hard:true, status:"pass",
    quote:"本项目不接受联合体投标。", src:"第一章 1.4 · 第 4 页", ev:["A-D04-SME-01"], note:"以澄明数智独立投标。" },
  { id:"D04-T01.1", title:"案件相关功能模块升级（Java 技术栈）", type:"技术", hard:true, status:"pass",
    quote:"在现有城市运行案件管理模块基础上完成升级改造，兼容既有 Java/Spring 技术体系。",
    src:"第三章 采购需求 3.1 · 第 11 页", ev:["CAP-DEV-01","A-D04-CASE-01"], note:"与既有能力直接对应。" },
  { id:"D04-T01.2", title:"多网格数据配置与协同", type:"技术", hard:true, status:"pass",
    quote:"支持多网格主数据管理、网格间关系配置与协同处置流转。",
    src:"第三章 3.2 · 第 12 页", ev:["CAP-DATA-01"], note:"2023 数据交换平台案例提供方法支撑。" },
  { id:"D04-T01.5", title:"密码应用适配", type:"技术", hard:false, status:"pass",
    quote:"完成与采购人既有密码应用能力的对接适配与联调整改。",
    src:"第三章 3.5 · 第 14 页", ev:["CAP-SEC-01"], note:"仅承诺适配/联调/整改配合，不声称法定测评资质（见 W1 警告）。" },
  { id:"D04-M01", title:"四个关键阶段赴上海现场服务", type:"交付", hard:true, status:"unknown",
    quote:"调研、安装部署、试运行、验收四个阶段，项目经理及关键人员须到场服务。",
    src:"第三章 4.2 · 第 18 页", ev:[], note:"待交付负责人确认阶段驻场计划；非全年长期驻场。" },
  { id:"D04-S02.1", title:"项目团队不少于 10 人并锁定名单", type:"评分", hard:true, status:"unknown",
    quote:"提供不少于 10 人的项目团队名单、劳动合同与社保证明。",
    src:"第四章 评分办法 S02 · 第 22 页", ev:[], note:"需锁定 10 人名单并核验 8–12 月排期。" },
  { id:"D04-S02.2", title:"项目经理资质（高级证书+同类经验）", type:"评分", hard:false, status:"unknown",
    quote:"项目经理具备信息系统项目管理师（高级）且有同类项目经验的，可得关键配置分。",
    src:"第四章 S02 · 第 22 页", ev:[], note:"拟派 PM 证据包待组卷：学历/证书/社保/项目证明。" },
  { id:"D04-S03.1", title:"ISO/IEC 27001 认证", type:"评分", hard:false, status:"pass",
    quote:"具有有效的 ISO/IEC 27001 信息安全管理体系认证。",
    src:"第四章 S03 · 第 23 页", ev:["CERT-27001"], note:"有效期至 2027-03，覆盖履约期。" },
  { id:"D04-S03.2", title:"ITSS 运维能力成熟度三级", type:"评分", hard:false, status:"fail_soft",
    quote:"具有 ITSS 三级及以上认证的，得相应分值。",
    src:"第四章 S03 · 第 23 页", ev:["A-D04-ITSS-NEG"], note:"企业明确未持有：记为 Known loss，不构成废标，禁止写成“具备”。" },
  { id:"D04-S03.3", title:"同类项目案例（最多 4 个）", type:"评分", hard:false, status:"unknown",
    quote:"提供近三年同类软件开发项目案例，最多计 4 个。",
    src:"第四章 S03 · 第 23 页", ev:[], note:"现有 2 个强相关 + 1 个弱相关；不得虚构第 4 个。" },
  { id:"D04-B01", title:"付款 30/50/20，无投标保证金", type:"商务", hard:true, status:"pass",
    quote:"合同签订后付 30%，上线试运行后付 50%，验收合格后付 20%；本项目不收取投标保证金。",
    src:"第五章 合同条款 5.2 · 第 27 页", ev:["A-D04-FIN-01"], note:"现金流与毛利底线经财务测算通过。" },
  { id:"D04-B02.1", title:"定制源码与项目成果 IP 交付", type:"商务", hard:true, status:"unknown",
    quote:"项目定制开发源码、文档与成果知识产权归采购人所有。",
    src:"第五章 5.4 · 第 28 页", ev:[], note:"待法务审查：通用组件权利边界须在合同保留，禁止模糊承诺。" },
  { id:"D04-B03", title:"2026-12-31 前完成验收", type:"商务", hard:true, status:"pass",
    quote:"全部工作须于 2026 年 12 月 31 日前完成并通过验收。",
    src:"第三章 4.1 · 第 17 页", ev:["A-D04-DELIVERY-01"], note:"五里程碑倒排，预留整改窗口。" },
  { id:"D04-F01", title:"全册签章、有效期与人员一致性", type:"格式", hard:true, status:"unknown",
    quote:"资格证明文件须加盖公章且在有效期内；人员不得跨项目重复承诺。",
    src:"第六章 投标文件格式 · 第 31 页", ev:[], note:"导出前全册一致性检查，属 Gate 项。" },
];

/* ---------- D02 要求（三企业对照） ---------- */
const D02_REQUIREMENTS = [
  { id:"D02-T01/T02", title:"17 处以上高位资源运维（塔点/网络/电力）", type:"技术", hard:true,
    quote:"对全县 17 处以上渔政高位视频监控资源（含铁塔点位、传输网络、电力供应）提供运行维护。",
    src:"采购需求 2.1–2.2 · 第 6 页",
    byEnt:{ A:{s:"fail",note:"企业明确排除弱电/高空/现场资产运维（NEG-CONSTRUCT）"},
            B:{s:"pass",note:"B-CAP-FIELD-01 覆盖塔点、网络与电力运维"},
            C:{s:"fail",note:"无现场运维体系（C-NEG-HW）"} } },
  { id:"D02-S02", title:"高处作业+电工双证人员（关键得分项）", type:"评分", hard:true,
    quote:"拟派人员中具备高处作业证与电工证的，每名得关键分值。",
    src:"评分办法 S02 · 第 15 页",
    byEnt:{ A:{s:"fail",note:"无此类人员证据"},
            B:{s:"pass",note:"B-PER-DUAL-01：双证人员 6 名"},
            C:{s:"fail",note:"无此类人员证据"} } },
  { id:"D02-T03", title:"37 路视频点位、10 分钟到场确认", type:"技术", hard:true,
    quote:"37 路视频监控点位故障须 10 分钟内响应确认，含跨点位现场处置。",
    src:"采购需求 2.3 · 第 7 页",
    byEnt:{ A:{s:"fail",note:"无跨点位现场服务网络"},
            B:{s:"pass",note:"B-CASE-FISH-2025 同类交付在运"},
            C:{s:"fail",note:"无跨点位现场服务网络"} } },
  { id:"D02-B01", title:"服务期满验收后 100% 付款", type:"商务", hard:true,
    quote:"服务期结束并通过年度验收后，一次性支付合同全款。",
    src:"合同条款 4.1 · 第 19 页",
    byEnt:{ A:{s:"fail",note:"财务红线：明确拒绝全部验收后付款（NEG-PAYMENT）"},
            B:{s:"pass",note:"财务规则允许 ≤500 万现场项目验收后付款（有账期）"},
            C:{s:"fail",note:"财务红线：明确拒绝（C-NEG-PAY）"} } },
];
