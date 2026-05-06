const institutions=[
{id:1,name:"海城区安心养老中心",distanceNum:1.8,distance:"1.8公里",type:"医疗护理",priceNum:3200,price:"3200元/月起",score:4.8,beds:"剩余床位12张",address:"北海市海城区社区服务片区",phone:"0779-8888888",qualification:"民政备案机构",services:["生活照料","医疗护理","康复训练","营养餐食"],intro:"位置便利，适合需要日常照护、医疗协助和家属频繁探视的老人。",reviews:["环境安静，护理人员沟通及时。","距离较近，探视方便。"]},
{id:2,name:"银湾长者照护院",distanceNum:3.2,distance:"3.2公里",type:"康复照护",priceNum:2800,price:"2800元/月起",score:4.6,beds:"剩余床位8张",address:"北海市银海区便民服务圈",phone:"0779-6666666",qualification:"社区合作服务机构",services:["康复护理","日间照料","心理陪伴","文化活动"],intro:"主打康复照护与长者陪伴，适合轻度护理和短期康复需求。",reviews:["康复服务细，预约流程清楚。","活动较多，适合能自理老人。"]},
{id:3,name:"社区嵌入式养老驿站",distanceNum:.9,distance:"0.9公里",type:"价格适中",priceNum:2200,price:"2200元/月起",score:4.5,beds:"剩余床位5张",address:"北海市社区综合服务中心旁",phone:"0779-5555555",qualification:"社区嵌入式养老服务点",services:["日间照料","助餐服务","上门护理","紧急联系"],intro:"以就近养老、社区对接为特点，适合希望离家近、探视方便的家庭。",reviews:["离家近，日间照料方便。","价格适中，适合短期体验。"]},
{id:4,name:"康乐颐养护理中心",distanceNum:4.6,distance:"4.6公里",type:"医疗护理",priceNum:3900,price:"3900元/月起",score:4.9,beds:"剩余床位6张",address:"北海市医疗协作服务区",phone:"0779-3333333",qualification:"医养结合服务机构",services:["慢病护理","医疗协作","康复训练","营养评估"],intro:"适合对医疗护理、慢病管理和康复训练有较高需求的老人。",reviews:["医疗协作资源较好。","价格略高，但服务完整。"]},
{id:5,name:"海湾社区养老服务站",distanceNum:2.7,distance:"2.7公里",type:"社区养老",priceNum:2600,price:"2600元/月起",score:4.4,beds:"剩余床位9张",address:"北海市海湾社区服务中心",phone:"0779-2222222",qualification:"社区养老服务站",services:["助餐服务","日间照料","文化活动","上门探访"],intro:"更偏向社区养老与日间照料，适合轻度照护与就近服务需求。",reviews:["社区服务方便。","老人参加活动比较方便。"]}
];

const services=[
{icon:"🍱",name:"助餐服务",desc:"为老人提供营养餐食、送餐到家等服务。"},
{icon:"🛁",name:"助浴服务",desc:"协助行动不便老人完成安全洗浴。"},
{icon:"🧹",name:"家政清洁",desc:"提供基础居家清洁、整理和陪护支持。"},
{icon:"💊",name:"用药提醒",desc:"帮助家属记录老人用药时间和注意事项。"},
{icon:"🩺",name:"上门护理",desc:"提供基础护理、健康观察与护理记录。"},
{icon:"🚗",name:"陪诊服务",desc:"协助老人就医、取药、复诊和检查。"}
];

const news=[
["如何判断养老院是否正规？","重点查看民政备案、经营资质、收费公示、护理人员配置和安全管理。"],
["为什么距离是选择养老院的重要因素？","距离近可以降低探视成本，也能让家属更及时地处理突发情况。"],
["长辈模式应该解决什么问题？","核心是大字体、高对比、少层级、强反馈和紧急联系入口。"],
["入住前沟通清单","建议提前询问床位、费用、护理等级、餐食、医保、探视规则等内容。"]
];

let selectedRole="家属用户",currentFilter="全部",currentSort="distance",currentDetail=null,lastDetailId=1;
let favorites=[],compareIds=[],orders=[];

function goPage(id){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.getElementById(id).classList.add("active");
 const hidden=["splash","role","onboarding","login","detail","gallery","map","search","appointment","success","review","policy","emergency","orders","settings","orgApply","orgConsole","orgInfo","orgOrders","prototypeGuide","serviceApply","services","compare"];
 document.getElementById("tabbar").style.display=hidden.includes(id)?"none":"grid";
}
function nav(id,el){goPage(id);document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));el.classList.add("active")}
function selectRole(role){selectedRole=role;document.getElementById("roleText").textContent=role;if(role==="老年用户"&&!document.body.classList.contains("elder"))toggleElder();goPage("onboarding")}
function loginSubmit(e){e.preventDefault();toast("登录成功");goPage("home")}
function guestEnter(){toast("已进入游客体验模式");goPage("home")}
function toggleElder(){document.body.classList.toggle("elder");let on=document.body.classList.contains("elder");let sw=document.getElementById("elderSwitch");if(sw)sw.checked=on;toast(on?"已开启长辈模式":"已切换普通模式")}
function toggleElderBySwitch(){document.body.classList.toggle("elder",document.getElementById("elderSwitch").checked);toast(document.body.classList.contains("elder")?"已开启长辈模式":"已切换普通模式")}
function toggleContrast(){document.body.classList.toggle("contrast",document.getElementById("contrastSwitch").checked);toast(document.body.classList.contains("contrast")?"已开启高对比显示":"已关闭高对比显示")}
function card(item){return `<article class="inst-card" onclick="openDetail(${item.id})"><div class="card-top"><div><h3>${item.name}</h3><p class="meta">📍 ${item.distance}　⭐ ${item.score}　${item.price}</p></div><span class="badge">${item.type}</span></div><p>${item.intro}</p><div class="tags">${item.services.map(s=>`<span>${s}</span>`).join("")}</div><p class="meta">${item.beds}｜${item.qualification}</p><div class="actions"><button class="outline" onclick="event.stopPropagation();addCompare(${item.id})">加入对比</button><button class="primary" onclick="event.stopPropagation();openAppointment(${item.id})">预约参观</button></div></article>`}
function dataList(){
 let kw=(document.getElementById("listSearch")?.value||"").trim();
 let data=institutions.filter(i=>{
  let m=!kw||i.name.includes(kw)||i.type.includes(kw)||i.services.join("").includes(kw);
  let f=true;if(currentFilter==="3公里内")f=i.distanceNum<=3;else if(currentFilter==="5公里内")f=i.distanceNum<=5;else if(currentFilter!=="全部")f=i.type===currentFilter;
  return m&&f;
 });
 data.sort((a,b)=>currentSort==="score"?b.score-a.score:currentSort==="price"?a.priceNum-b.priceNum:a.distanceNum-b.distanceNum);
 return data;
}
function renderList(){let el=document.getElementById("institutionList");if(!el)return;let data=dataList();el.innerHTML=data.length?data.map(card).join(""):`<div class="card"><h3>暂无匹配结果</h3><p>可以减少筛选条件或切换为全部。</p></div>`}
function renderRecommend(){document.getElementById("recommend").innerHTML=institutions.slice(0,2).map(card).join("")}
function setFilter(v,el){currentFilter=v;document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));if(el)el.classList.add("active");renderList()}
function sortBy(v){currentSort=v;renderList();toast(v==="distance"?"已按距离排序":v==="score"?"已按评分排序":"已按价格排序")}
function goNearby(v){currentFilter=v;goPage("nearby");document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("active",c.dataset.filter===v));renderList()}
function homeSearchJump(){let v=document.getElementById("homeSearch").value.trim();if(v.length>=2){goPage("nearby");document.getElementById("listSearch").value=v;currentFilter="全部";renderList()}}
function applyAdvancedSearch(){let type=document.getElementById("advType").value;let dist=document.getElementById("advDistance").value;let key=document.getElementById("advKeyword").value;currentFilter=type!=="全部"?type:dist;goPage("nearby");document.getElementById("listSearch").value=key;renderList();toast("已生成高级筛选结果")}
function modalFilter(v){closeModal("filterModal");goNearby(v)}
function openDetail(id){currentDetail=institutions.find(i=>i.id===id);lastDetailId=id;let i=currentDetail;document.getElementById("favBtn").textContent=favorites.includes(id)?"已收藏":"收藏";document.getElementById("detailBox").innerHTML=`<div class="detail-hero" onclick="goPage('gallery')">🏡</div><article class="card"><h2>${i.name}</h2><p>${i.intro}</p><div class="info-row"><span>距离</span><strong>${i.distance}</strong></div><div class="info-row"><span>评分</span><strong>${i.score}</strong></div><div class="info-row"><span>收费</span><strong>${i.price}</strong></div><div class="info-row"><span>床位</span><strong>${i.beds}</strong></div><div class="info-row"><span>资质</span><strong>${i.qualification}</strong></div><div class="info-row"><span>地址</span><strong>${i.address}</strong></div><div class="info-row"><span>电话</span><strong>${i.phone}</strong></div></article><article class="card"><h3>服务内容</h3><div class="tags">${i.services.map(s=>`<span>${s}</span>`).join("")}</div></article><article class="card"><h3>入住流程</h3><ol class="timeline"><li>线上查看机构信息</li><li>提交咨询或预约</li><li>线下参观考察</li><li>确认护理等级与收费</li><li>签订入住协议</li></ol></article><article class="card"><h3>用户评价</h3>${i.reviews.map(r=>`<div class="review">⭐ ${r}</div>`).join("")}</article><div class="actions"><button class="outline" onclick="openChat('${i.name}')">在线咨询</button><button class="primary" onclick="openAppointment(${i.id})">预约参观</button></div>`;goPage("detail")}
function toggleFavorite(){if(!currentDetail)return;let id=currentDetail.id;if(favorites.includes(id)){favorites=favorites.filter(x=>x!==id);toast("已取消收藏")}else{favorites.push(id);toast("已加入收藏")}updateCounts();document.getElementById("favBtn").textContent=favorites.includes(id)?"已收藏":"收藏"}
function showFavorites(){goPage("nearby");let data=institutions.filter(i=>favorites.includes(i.id));document.getElementById("institutionList").innerHTML=data.length?data.map(card).join(""):`<div class="card"><h3>暂无收藏</h3><p>可在机构详情页点击收藏。</p></div>`}
function addCompare(id){if(!compareIds.includes(id))compareIds.push(id);if(compareIds.length<2){toast("已加入对比，请再选择一个机构");return}renderCompare();goPage("compare")}
function renderCompare(){let data=institutions.filter(i=>compareIds.includes(i.id));document.getElementById("compareBox").innerHTML=data.length?`<div class="compare-table"><table><tr><th>项目</th>${data.map(i=>`<th>${i.name}</th>`).join("")}</tr><tr><td>距离</td>${data.map(i=>`<td>${i.distance}</td>`).join("")}</tr><tr><td>评分</td>${data.map(i=>`<td>${i.score}</td>`).join("")}</tr><tr><td>价格</td>${data.map(i=>`<td>${i.price}</td>`).join("")}</tr><tr><td>床位</td>${data.map(i=>`<td>${i.beds}</td>`).join("")}</tr><tr><td>类型</td>${data.map(i=>`<td>${i.type}</td>`).join("")}</tr></table></div><button class="primary" onclick="compareIds=[];renderCompare();toast('已清空对比')">清空对比</button>`:`<div class="card"><h3>暂无对比机构</h3><p>请在附近养老院列表中点击“加入对比”。</p></div>`}
function openAppointment(id){let i=institutions.find(x=>x.id===id)||currentDetail||institutions[0];lastDetailId=i.id;document.getElementById("appointOrg").value=i.name;goPage("appointment")}
function submitAppointment(e){e.preventDefault();orders.unshift({type:"预约参观",org:document.getElementById("appointOrg").value,time:"明天 09:00-10:00",status:"待确认"});updateCounts();renderOrders();document.getElementById("successTitle").textContent="预约提交成功";document.getElementById("successText").textContent="机构工作人员会尽快与您联系，可在我的预约中查看进度。";goPage("success")}
function renderOrders(){let el=document.getElementById("orderList");if(!el)return;el.innerHTML=orders.length?orders.map((o,idx)=>`<article class="card"><h3>${o.org}</h3><p>类型：${o.type}</p><p>时间：${o.time}</p><p>状态：${o.status}</p><button class="primary" onclick="toast('已提醒机构尽快确认')">催确认</button><button class="ghost" onclick="goPage('review')">去评价</button></article>`).join(""):`<div class="card"><h3>暂无记录</h3><p>可在机构详情页提交预约，或在服务分类中提交服务申请。</p></div>`}
function renderServices(){document.getElementById("serviceList").innerHTML=services.map(s=>`<div class="service-item"><b>${s.icon}</b><div><h3>${s.name}</h3><p>${s.desc}</p></div><button onclick="applyService('${s.name}')">申请</button></div>`).join("")}
function applyService(name){document.getElementById("serviceName").value=name;goPage("serviceApply")}
function submitService(e){e.preventDefault();orders.unshift({type:"服务申请",org:document.getElementById("serviceName").value,time:"今日提交",status:"待派单"});updateCounts();renderOrders();document.getElementById("successTitle").textContent="服务申请成功";document.getElementById("successText").textContent="平台会根据服务类型为您对接附近服务方。";goPage("success")}
function submitReview(e){e.preventDefault();toast("评价已提交，感谢反馈");goPage("orders")}
function renderNews(){document.getElementById("newsList").innerHTML=news.map(n=>`<article class="article" onclick="openArticle('${n[0]}')"><h3>${n[0]}</h3><p>${n[1]}</p></article>`).join("")}
function openArticle(t){toast("打开文章："+t)}
function renderChats(){document.getElementById("chatList").innerHTML=institutions.slice(0,4).map(i=>`<div class="chat-item" onclick="openChat('${i.name}')"><div class="chat-avatar">🏡</div><div><h3>${i.name}</h3><p>您好，可咨询床位、收费、护理和预约参观。</p></div></div>`).join("")}
function openChat(name){document.getElementById("chatTitle").textContent=name;document.getElementById("chatBox").innerHTML=`<div class="bubble left">您好，这里是${name}，请问需要了解哪方面信息？</div><div class="bubble right">我想了解床位、收费和预约参观。</div><div class="bubble left">目前可预约明天或后天参观，收费和护理等级可到院详细说明。</div>`;goPage("chat")}
function sendChat(){let v=document.getElementById("chatInput").value.trim();if(!v)return;document.getElementById("chatBox").innerHTML+=`<div class="bubble right">${v}</div><div class="bubble left">已收到，我们会尽快为您解答。</div>`;document.getElementById("chatInput").value="";toast("消息已发送")}
function submitOrgApply(e){e.preventDefault();toast("入驻申请已提交");goPage("mine")}
function saveOrgInfo(e){e.preventDefault();toast("机构信息已保存");goPage("orgConsole")}
function updateCounts(){let oc=document.getElementById("orderCount"),fc=document.getElementById("favCount");if(oc)oc.textContent=orders.length;if(fc)fc.textContent=favorites.length}
function openModal(id){document.getElementById(id).classList.add("show")}
function closeModal(id){document.getElementById(id).classList.remove("show")}
function toast(t){let el=document.getElementById("toast");el.textContent=t;el.classList.add("show");let voice=document.getElementById("voiceSwitch");if(voice&&voice.checked){}setTimeout(()=>el.classList.remove("show"),1900)}
renderRecommend();renderList();renderCompare();renderServices();renderNews();renderChats();renderOrders();updateCounts();
