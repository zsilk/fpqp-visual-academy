/* FPQP Visual Academy v1 — shared engine: nav, quizzes, progress, plan, encouragement */
(function(){
"use strict";
const LS = "fpqpAcademyV1";
const store = {
  read(){ try{ return JSON.parse(localStorage.getItem(LS)) || {}; }catch(e){ return {}; } },
  write(d){ localStorage.setItem(LS, JSON.stringify(d)); },
  get(k, fb){ const d = store.read(); return (k in d) ? d[k] : fb; },
  set(k, v){ const d = store.read(); d[k] = v; store.write(d); }
};
window.fpqpStore = store;

/* ---------- Nav ---------- */
const PAGES = [
  ["index.html","🏛️ Home"],
  ["module1.html","1"],["module2.html","2"],["module3.html","3"],["module4.html","4"],["module5.html","5"],
  ["module6.html","6"],["module7.html","7"],["module8.html","8"],["module9.html","9"],["module10.html","10"],
  ["concepts.html","🧭 Topics"],["number-bank.html","🔢 Numbers"],["flashcards.html","🃏 Flashcards"],
  ["exam-skills.html","🎯 Exam Skills"],["study-plan.html","🗓️ 30-Day Plan"]
];
function buildNav(){
  const here = location.pathname.split("/").pop() || "index.html";
  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.setAttribute("aria-label","Site");
  const inner = document.createElement("div");
  inner.className = "nav-inner";
  PAGES.forEach(([href,label],i)=>{
    const a = document.createElement("a");
    a.href = href; a.textContent = label;
    if(i===0){ const b=document.createElement("a"); b.href="index.html"; b.className="brand"; b.textContent="FPQP® Visual Academy"; inner.appendChild(b); }
    if(href===here) a.className="active";
    if(label.length<3) a.title = "Module "+label;
    inner.appendChild(a);
  });
  nav.appendChild(inner);
  document.body.prepend(nav);
}

/* ---------- Encouragement ---------- */
const CHEERS = [
  "Every question you try makes exam day easier. Keep going! 🌱",
  "You just got smarter. Seriously — that's how brains work. 🧠✨",
  "Wrong answers are practice, not failure. Champions miss questions too. 💪",
  "Small steps every day beat cramming every time. You're doing it right. 🐢🏆",
  "70% passes the real exam. You don't need perfect — you need steady. 🌟",
  "Look at you, studying like a future FPQP® professional! 🎓",
  "Your future clients are lucky already. Keep building. 🏗️",
  "Progress, not perfection. And you ARE progressing. 🚀"
];
let toastEl;
function toast(msg){
  if(!toastEl){ toastEl = document.createElement("div"); toastEl.id="toast"; toastEl.setAttribute("role","status"); document.body.appendChild(toastEl); }
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(()=>toastEl.classList.remove("show"), 3400);
}
window.fpqpToast = toast;
function confetti(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const bits = ["🎉","⭐","🎊","✨","💛","💜","🧡","💚"];
  for(let i=0;i<26;i++){
    const s = document.createElement("span");
    s.className="confetti"; s.textContent = bits[i%bits.length];
    s.style.left = Math.random()*100+"vw";
    s.style.animationDuration = (2.2+Math.random()*2)+"s";
    s.style.animationDelay = (Math.random()*0.7)+"s";
    document.body.appendChild(s);
    setTimeout(()=>s.remove(), 5200);
  }
}

/* ---------- Quiz engine ----------
   Page defines: window.QUIZ = { id:"m1", questions:[{q, opts:[..], a:indexOfCorrect, why}] }
   And includes: <div id="quiz"></div> */
function buildQuiz(){
  const cfg = window.QUIZ, host = document.getElementById("quiz");
  if(!cfg || !host) return;
  let answered = 0, correct = 0;
  cfg.questions.forEach((item, idx)=>{
    const card = document.createElement("div"); card.className="q-card";
    const num = document.createElement("div"); num.className="q-num"; num.textContent = "Question "+(idx+1)+" of "+cfg.questions.length;
    const qt = document.createElement("div"); qt.className="q-text"; qt.textContent = item.q;
    card.append(num, qt);
    const fb = document.createElement("div"); fb.className="q-feedback";
    const trap = document.createElement("div"); trap.className="q-trap";
    if(item.trap) trap.innerHTML = "🚫 <strong>Classic trap:</strong> "+item.trap;
    const btns = [];
    item.opts.forEach((opt, oi)=>{
      const b = document.createElement("button"); b.className="q-opt"; b.type="button";
      b.textContent = String.fromCharCode(65+oi)+". "+opt;
      b.addEventListener("click", ()=>{
        btns.forEach(x=>x.disabled=true);
        answered++;
        if(oi===item.a){
          correct++;
          b.classList.add("correct");
          fb.className="q-feedback show good";
          fb.textContent = "✅ Yes! "+item.why;
          toast(CHEERS[Math.floor(Math.random()*CHEERS.length)]);
        } else {
          b.classList.add("wrong");
          btns[item.a].classList.add("correct");
          fb.className="q-feedback show bad";
          fb.textContent = "💡 Not quite — the answer is "+String.fromCharCode(65+item.a)+". "+item.why+" (Missing one now means remembering it on exam day!)";
        }
        if(item.trap) trap.classList.add("show");
        if(answered===cfg.questions.length) finish();
      });
      btns.push(b); card.appendChild(b);
    });
    card.appendChild(fb);
    if(item.trap) card.appendChild(trap);
    host.appendChild(card);
  });
  const scoreBox = document.createElement("div"); scoreBox.className="quiz-score"; host.appendChild(scoreBox);
  function finish(){
    const pct = Math.round(100*correct/cfg.questions.length);
    const pass = pct>=70;
    scoreBox.className="quiz-score show";
    scoreBox.innerHTML = "";
    const big = document.createElement("div"); big.className="big"; big.textContent = correct+" / "+cfg.questions.length+" ("+pct+"%)";
    const msg = document.createElement("p");
    msg.textContent = pass
      ? "🎉 That's a passing score — the real exam needs 70%. You are SO ready to keep building on this!"
      : "🌱 You're "+(Math.ceil(cfg.questions.length*0.7)-correct)+" answer(s) from a passing score. Review the 💡 notes above and try again — repetition is exactly how this works. You've got this!";
    const retry = document.createElement("button"); retry.className="q-opt"; retry.style.textAlign="center"; retry.textContent="🔁 Try the quiz again";
    retry.addEventListener("click", ()=>location.reload());
    scoreBox.append(big, msg, retry);
    scoreBox.scrollIntoView({behavior:"smooth", block:"center"});
    if(pass) confetti();
    const scores = store.get("quizScores", {});
    if(!(cfg.id in scores) || pct > scores[cfg.id]) { scores[cfg.id]=pct; store.set("quizScores", scores); }
  }
}

/* ---------- Hub progress ---------- */
function hubProgress(){
  const bar = document.getElementById("hub-progress");
  if(!bar) return;
  const scores = store.get("quizScores", {});
  const passed = Object.values(scores).filter(v=>v>=70).length;
  const total = 10;
  bar.querySelector(".progress-fill").style.width = (passed/total*100)+"%";
  const lbl = document.getElementById("hub-progress-label");
  if(lbl) lbl.textContent = passed+" of "+total+" module quizzes passed";
  document.querySelectorAll("[data-mod]").forEach(t=>{
    const id = t.getAttribute("data-mod");
    const el = t.querySelector(".done");
    if(!el) return;
    if(scores[id]>=70){ el.textContent = "✅ Quiz passed — "+scores[id]+"%"; el.style.color="#059669"; }
    else if(id in scores){ el.textContent = "📈 Best so far: "+scores[id]+"% — keep going!"; el.style.color="#D97706"; }
    else { el.textContent = "🔓 Ready when you are"; el.style.color="#6B6584"; }
  });
}

/* ---------- 30-day plan ---------- */
function plan(){
  const host = document.getElementById("plan");
  if(!host) return;
  const done = store.get("planDone", {});
  const edits = store.get("planEdits", {});
  document.querySelectorAll(".day-card").forEach(card=>{
    const day = card.getAttribute("data-day");
    const cb = card.querySelector("input[type=checkbox]");
    const task = card.querySelector(".task");
    if(edits[day]) task.textContent = edits[day];
    if(done[day]){ cb.checked = true; card.classList.add("checked"); }
    cb.addEventListener("change", ()=>{
      const d = store.get("planDone", {});
      d[day] = cb.checked; store.set("planDone", d);
      card.classList.toggle("checked", cb.checked);
      if(cb.checked){
        const n = Object.values(d).filter(Boolean).length;
        toast(n===30 ? "🏆 ALL 30 DAYS DONE. Go pass that exam — you've earned it!" : "Day "+day+" complete! "+n+"/30 days done. "+CHEERS[Math.floor(Math.random()*CHEERS.length)]);
        if(n===30 || n%5===0) confetti();
        planMeter();
      } else planMeter();
    });
    task.addEventListener("blur", ()=>{
      const e = store.get("planEdits", {});
      e[day] = task.textContent.trim(); store.set("planEdits", e);
      toast("✏️ Saved your edit for Day "+day+".");
    });
  });
  planMeter();
  const reset = document.getElementById("plan-reset");
  if(reset) reset.addEventListener("click", ()=>{
    if(confirm("Reset all checkmarks and text edits for the 30-day plan?")){
      store.set("planDone", {}); store.set("planEdits", {}); location.reload();
    }
  });
}
function planMeter(){
  const m = document.getElementById("plan-meter");
  if(!m) return;
  const done = store.get("planDone", {});
  const n = Object.values(done).filter(Boolean).length;
  m.querySelector(".progress-fill").style.width = (n/30*100)+"%";
  const lbl = document.getElementById("plan-meter-label");
  if(lbl) lbl.textContent = n+" of 30 days complete"+(n>0 ? " — beautiful consistency! 🌟" : " — Day 1 is waiting for you 💛");
}

/* ---------- Color = topic legend (persistent) ---------- */
const TOPICS = [
  ["--m1","Financial planning process","module1.html"],
  ["--m2","Cash, debt & business","module2.html"],
  ["--m3","Time value of money","module3.html"],
  ["--m4","Property & casualty insurance","module4.html"],
  ["--m5","Life & health insurance","module5.html"],
  ["--m6","Investments","module6.html"],
  ["--m7","Retirement","module7.html"],
  ["--m8","Taxes","module8.html"],
  ["--m9","Estate planning","module9.html"],
  ["--m10","Case study & exam","module10.html"],
  ["--gold","Exam skills & toolkit","exam-skills.html"]
];
function buildLegend(){
  const cs = getComputedStyle(document.documentElement);
  const btn = document.createElement("button");
  btn.className="legend-toggle"; btn.type="button";
  btn.setAttribute("aria-expanded","false");
  btn.textContent="🎨 Color = topic";
  const panel = document.createElement("div");
  panel.className="legend-panel"; panel.setAttribute("role","dialog"); panel.setAttribute("aria-label","Color key");
  let html = '<h4>🎨 Color = topic</h4><p>Every topic keeps its color across the whole site — a built-in memory hook.</p><div class="legend-list">';
  TOPICS.forEach(([v,name,href])=>{
    const c = cs.getPropertyValue(v).trim();
    html += '<a class="legend-item" href="'+href+'"><span class="legend-swatch" style="background:'+c+'"></span>'+name+'</a>';
  });
  panel.innerHTML = html + '</div>';
  function close(){ panel.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }
  btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    const open = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", open?"true":"false");
  });
  document.addEventListener("click", (e)=>{ if(!panel.contains(e.target) && e.target!==btn) close(); });
  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") close(); });
  document.body.append(btn, panel);
}

/* ---------- Interactive step wheel ---------- */
const WHEELS = {
  planning:{ hub:"The 7-step planning process — click a step",
    steps:[
      ["🤝","1 · Understand circumstances","Meet the client. Gather facts (numbers) AND feelings (values, fears, dreams)."],
      ["🎯","2 · Identify & select goals","Turn “I want to be okay” into specific, prioritized, measurable goals."],
      ["🔎","3 · Analyze course & alternatives","Will the current path reach the goals? What else could work better?"],
      ["📋","4 · Develop recommendations","Choose specific actions, products, and strategies that fit THIS client."],
      ["🗣️","5 · Present recommendations","Explain clearly so the client truly understands and can decide."],
      ["🚀","6 · Implement","Do the things: open accounts, buy coverage, retitle assets, automate savings."],
      ["🔄","7 · Monitor & update","Life changes — so plans must too. Review and adjust on a schedule."]
    ]}
};
function buildWheels(){
  document.querySelectorAll("[data-wheel]").forEach(host=>{
    const cfg = WHEELS[host.getAttribute("data-wheel")];
    if(!cfg) return;
    const wheel = document.createElement("div"); wheel.className="wheel";
    const hub = document.createElement("div"); hub.className="wheel-hub";
    const hubSpan = document.createElement("span"); hubSpan.textContent = cfg.hub; hub.appendChild(hubSpan);
    wheel.appendChild(hub);
    const detail = document.createElement("div"); detail.className="wheel-detail";
    const nodes = [];
    const n = cfg.steps.length;
    cfg.steps.forEach((s,i)=>{
      const ang = (-90 + i*360/n) * Math.PI/180;
      const b = document.createElement("button"); b.type="button"; b.className="wheel-node";
      b.style.left = (50 + 40*Math.cos(ang))+"%";
      b.style.top  = (50 + 40*Math.sin(ang))+"%";
      b.textContent = i+1;
      b.setAttribute("aria-label", s[1].replace(/·/g,"—"));
      b.addEventListener("click", ()=>select(i));
      nodes.push(b); wheel.appendChild(b);
    });
    function select(i){
      nodes.forEach((x,j)=>x.classList.toggle("active", i===j));
      const s = cfg.steps[i];
      detail.innerHTML = "<h4>"+s[0]+" "+s[1]+"</h4><p>"+s[2]+"</p>";
    }
    host.classList.add("wheel-wrap");
    host.append(wheel, detail);
    select(0);
  });
}

/* ---------- Roth vs. Traditional decision tree ---------- */
const TREES = {
  roth:{ start:"q1", nodes:{
    q1:{q:"Do you expect your tax rate to be HIGHER in retirement than it is today?", yes:{r:"roth",note:"Pay the tax now at today's lower rate, then withdraw tax-free later."}, no:"q2"},
    q2:{q:"Do you expect your tax rate to be LOWER in retirement?", yes:{r:"trad",note:"Take the deduction now; defer the tax into your lower-rate years."}, no:"q3"},
    q3:{q:"Are you early in your career or in a relatively low tax bracket right now?", yes:{r:"roth",note:"Lock in low rates now and capture decades of tax-free growth."}, no:"q4"},
    q4:{q:"Do you want to avoid RMDs and leave tax-free money to your heirs?", yes:{r:"roth",note:"Roth IRAs (and Roth 401(k)s since 2024) have no lifetime RMDs."}, no:{r:"trad",note:"Take the deduction now and tax-diversify across account types."}}
  }}
};
function buildTrees(){
  document.querySelectorAll("[data-tree]").forEach(host=>{
    const cfg = TREES[host.getAttribute("data-tree")];
    if(!cfg) return;
    host.classList.add("tree");
    const path = document.createElement("div"); path.className="tree-path";
    const body = document.createElement("div");
    host.append(path, body);
    const crumbs = [];
    function render(key){
      const node = cfg.nodes[key];
      body.innerHTML = "";
      const q = document.createElement("p"); q.className="tree-q"; q.textContent = node.q;
      const choices = document.createElement("div"); choices.className="tree-choices";
      [["yes","✅ Yes"],["no","❌ No"]].forEach(([k,lbl])=>{
        const b = document.createElement("button"); b.type="button"; b.className="tree-btn"; b.textContent=lbl;
        b.addEventListener("click", ()=>{
          crumbs.push([node.q, lbl]); drawPath();
          const nxt = node[k];
          if(typeof nxt==="string") render(nxt); else result(nxt);
        });
        choices.appendChild(b);
      });
      body.append(q, choices);
    }
    function result(res){
      body.innerHTML = "";
      const isRoth = res.r==="roth";
      const wrap = document.createElement("div"); wrap.className="tree-result";
      wrap.innerHTML = "<div style='font-size:2.6rem'>"+(isRoth?"🍓":"🥔")+"</div>"+
        "<div class='verdict "+(isRoth?"roth":"trad")+"'>Lean "+(isRoth?"Roth":"Traditional")+"</div>"+
        "<p style='color:var(--ink-soft);max-width:460px;margin:0 auto'>"+res.note+"</p>";
      const restart = document.createElement("button"); restart.className="tree-restart"; restart.type="button";
      restart.textContent="↺ Start over";
      restart.addEventListener("click", start);
      wrap.appendChild(restart);
      body.appendChild(wrap);
    }
    function drawPath(){
      path.innerHTML = crumbs.map(c=>'<span class="tree-crumb">'+c[1]+'</span>').join("");
    }
    function start(){ crumbs.length=0; drawPath(); render(cfg.start); }
    start();
  });
}

/* ---------- Probate bypass map (hover / focus reveals route) ---------- */
const PROBATE = [
  ["🏦 Beneficiary forms","IRA · 401(k) · life insurance",true],
  ["👫 Joint tenancy (JTWROS)","with right of survivorship",true],
  ["📄 TOD / POD accounts","transfer-on-death titles",true],
  ["🏛️ Living-trust assets","the trust already owns them",true],
  ["🚗 Solely-owned property","car, home, accounts in your name only",false],
  ["📜 Anything left by the will","the will is the probate instruction sheet",false]
];
function buildProbate(){
  document.querySelectorAll("[data-probate]").forEach(host=>{
    host.classList.add("probate");
    host.innerHTML =
      '<div class="probate-legend"><span><b style="background:var(--m6)"></b>Skips probate → straight to heirs</span>'+
      '<span><b style="background:var(--m3)"></b>Goes through probate court first</span></div>';
    const grid = document.createElement("div"); grid.className="asset-grid";
    PROBATE.forEach(([name,sub,bypass])=>{
      const a = document.createElement("button"); a.type="button";
      a.className = "asset "+(bypass?"bypass":"probateb");
      a.innerHTML = '<span class="a-name">'+name+'</span><span class="a-sub">'+sub+'</span>'+
        '<span class="a-route">'+(bypass?"→ Straight to heirs 🎉":"→ Probate court first ⚖️")+'</span>';
      a.addEventListener("click", ()=>{
        const was = a.classList.contains("active");
        grid.querySelectorAll(".asset").forEach(x=>x.classList.remove("active"));
        if(!was) a.classList.add("active");
      });
      grid.appendChild(a);
    });
    host.appendChild(grid);
  });
}

/* ---------- Flip-card flashcards ---------- */
function buildFlashcards(){
  const host = document.querySelector("[data-flashcards]");
  if(!host || !window.FLASHCARDS) return;
  host.classList.add("deck");
  window.FLASHCARDS.forEach(fc=>{
    const card = document.createElement("button"); card.type="button"; card.className="flashcard";
    card.setAttribute("aria-pressed","false");
    if(fc.mod) card.style.cssText = "--accent:var("+fc.mod+");--accent-soft:var("+fc.mod+"s)";
    card.innerHTML =
      '<div class="flashcard-inner">'+
        '<div class="flashcard-face flashcard-front"><span class="fc-tag">'+(fc.tag||"Memory hook")+'</span>'+
          '<span class="fc-q">'+fc.q+'</span><span class="fc-hint">tap to flip 🔄</span></div>'+
        '<div class="flashcard-face flashcard-back"><span class="fc-a">'+fc.a+'</span></div>'+
      '</div>';
    card.addEventListener("click", ()=>{
      const f = card.classList.toggle("flipped");
      card.setAttribute("aria-pressed", f?"true":"false");
    });
    host.appendChild(card);
  });
}

/* ---------- Bar charts ---------- */
function buildBarCharts(){
  document.querySelectorAll(".barchart[data-bars]").forEach(host=>{
    let bars; try{ bars = JSON.parse(host.getAttribute("data-bars")); }catch(e){ return; }
    const max = Math.max(...bars.map(b=>b.value));
    host.innerHTML = "";
    const fills = [];
    bars.forEach(b=>{
      const row = document.createElement("div"); row.className="bar-row";
      const lbl = document.createElement("div"); lbl.className="bar-label"; lbl.textContent = b.label;
      const track = document.createElement("div"); track.className="bar-track";
      const fill = document.createElement("div"); fill.className="bar-fill";
      if(b.color) fill.style.background = "var("+b.color+")";
      fill.textContent = b.display || b.value;
      fill.setAttribute("role","img");
      fill.setAttribute("aria-label", b.label+": "+(b.display||b.value));
      track.appendChild(fill); row.append(lbl, track); host.appendChild(row);
      fills.push([fill, (b.value/max*100)]);
    });
    requestAnimationFrame(()=>fills.forEach(([f,w])=>f.style.width = Math.max(w,7)+"%"));
  });
}

/* ---------- Interactive marginal-bracket stack ---------- */
const BRACKETS_2026_SINGLE = [
  [0.10,0,12400,"#EA580C"],[0.12,12400,50400,"#F97316"],[0.22,50400,105700,"#FB923C"],
  [0.24,105700,201775,"#0284C7"],[0.32,201775,256225,"#7C3AED"],[0.35,256225,640600,"#9333EA"],
  [0.37,640600,Infinity,"#E11D48"]
];
function buildTaxStack(){
  const host = document.querySelector("[data-taxstack]");
  if(!host) return;
  host.classList.add("taxstack");
  host.innerHTML =
    '<div class="ts-control"><label for="ts-range">Taxable income: <span class="ts-income" id="ts-inc">$80,000</span></label>'+
    '<input type="range" id="ts-range" min="0" max="400000" step="1000" value="80000"></div>'+
    '<div class="ts-bars" id="ts-bars"></div>'+
    '<div class="ts-readout"><span>Marginal rate<b id="ts-marg">22%</b></span>'+
    '<span>Effective rate<b id="ts-eff">0%</b></span><span>Total tax<b id="ts-tax">$0</b></span></div>'+
    '<p class="src" style="margin-top:10px">Illustrative 2026 single-filer brackets — the point is how each slice is taxed at its own rate. Verify exact thresholds with the <a href="https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill">IRS 2026 tables</a>.</p>';
  const range = host.querySelector("#ts-range"), barsEl = host.querySelector("#ts-bars");
  const fmt = n=>"$"+Math.round(n).toLocaleString();
  function update(){
    const inc = +range.value;
    host.querySelector("#ts-inc").textContent = fmt(inc);
    let total = 0, marg = 0.10;
    barsEl.innerHTML = "";
    BRACKETS_2026_SINGLE.forEach(([rate,lo,hi,color])=>{
      if(inc<=lo) return;
      const inBand = Math.min(inc,hi) - lo;
      const tax = inBand*rate; total += tax; marg = rate;
      const band = document.createElement("div"); band.className="ts-band";
      band.style.background = color;
      band.style.height = Math.max(20, inBand/1400)+"px";
      band.innerHTML = '<span>'+Math.round(rate*100)+'% on '+fmt(inBand)+'</span><span class="ts-band-tax">'+fmt(tax)+'</span>';
      barsEl.appendChild(band);
    });
    host.querySelector("#ts-marg").textContent = Math.round(marg*100)+"%";
    host.querySelector("#ts-tax").textContent = fmt(total);
    host.querySelector("#ts-eff").textContent = inc>0 ? (total/inc*100).toFixed(1)+"%" : "0%";
  }
  range.addEventListener("input", update); update();
}

/* ---------- RMD birth-year number line ---------- */
const NUMLINES = {
  rmd:[["Born 1950 or earlier","72","(already applied)","--m5"],
       ["Born 1951–1959","73","RMDs start","--m7"],
       ["Born 1960 or later","75","from 2033","--m6"]]
};
function buildNumLines(){
  document.querySelectorAll("[data-numline]").forEach(host=>{
    const data = NUMLINES[host.getAttribute("data-numline")];
    if(!data) return;
    host.classList.add("numline");
    const cs = getComputedStyle(document.documentElement);
    const track = document.createElement("div"); track.className="numline-track";
    data.forEach(([born,age,cap,v])=>{
      const seg = document.createElement("div"); seg.className="numline-seg";
      seg.style.background = cs.getPropertyValue(v).trim();
      seg.innerHTML = '<div class="nl-born">'+born+'</div><div class="nl-age">age '+age+'</div><div class="nl-cap">'+cap+'</div>';
      track.appendChild(seg);
    });
    host.appendChild(track);
  });
}

/* ---------- Number Bank (filterable) ---------- */
function buildNumberBank(){
  const host = document.getElementById("number-bank");
  if(!host || !window.NUMBERS) return;
  const cs = getComputedStyle(document.documentElement);
  const topics = [...new Set(window.NUMBERS.map(n=>n.topic))];
  const controls = document.createElement("div"); controls.className="nb-controls";
  controls.innerHTML = '<input class="nb-search" type="search" placeholder="🔍 Search a number, rule, or age…" aria-label="Search numbers">'+
    '<div class="nb-chips"><button class="nb-chip active" data-t="all">All</button>'+
    topics.map(t=>'<button class="nb-chip" data-t="'+t+'">'+t+'</button>').join("")+'</div>';
  const list = document.createElement("div"); list.id="nb-list";
  host.append(controls, list);
  const search = controls.querySelector(".nb-search");
  let active = "all";
  function draw(){
    const q = search.value.trim().toLowerCase();
    list.innerHTML = "";
    let shown = 0;
    window.NUMBERS.forEach(n=>{
      if(active!=="all" && n.topic!==active) return;
      if(q && !(n.num+" "+n.name+" "+n.desc+" "+n.topic).toLowerCase().includes(q)) return;
      shown++;
      const c = cs.getPropertyValue(n.color||"--accent").trim();
      const item = document.createElement("div"); item.className="nb-item"; item.style.setProperty("--chip", c);
      item.innerHTML = '<div class="nb-num">'+n.num+'</div><div class="nb-name">'+n.name+
        ' <span class="nb-topic">'+n.topic+'</span></div><div class="nb-desc">'+n.desc+'</div>';
      list.appendChild(item);
    });
    if(!shown) list.innerHTML = '<p class="nb-empty">No matches — try another word. 🌱</p>';
  }
  search.addEventListener("input", draw);
  controls.querySelectorAll(".nb-chip").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      controls.querySelectorAll(".nb-chip").forEach(c=>c.classList.remove("active"));
      chip.classList.add("active"); active = chip.getAttribute("data-t"); draw();
    });
  });
  draw();
}

/* ---------- Concept index filter ---------- */
function conceptFilter(){
  const search = document.getElementById("concept-search");
  if(!search) return;
  const entries = [...document.querySelectorAll(".concept-entry")];
  search.addEventListener("input", ()=>{
    const q = search.value.trim().toLowerCase();
    entries.forEach(e=>{ e.style.display = e.textContent.toLowerCase().includes(q) ? "" : "none"; });
    document.querySelectorAll(".concept-group").forEach(g=>{
      const any = [...g.querySelectorAll(".concept-entry")].some(e=>e.style.display!=="none");
      g.style.display = any ? "" : "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  buildNav(); buildQuiz(); hubProgress(); plan();
  buildLegend(); buildWheels(); buildTrees(); buildProbate(); buildFlashcards();
  buildBarCharts(); buildTaxStack(); buildNumLines(); buildNumberBank(); conceptFilter();
});
})();
