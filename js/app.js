/* FPQP Visual Academy v2 — shared engine: nav, quizzes, progress, interactives,
   per-user cloud saves (Netlify Blobs), feedback, encouragement */
(function(){
"use strict";

/* ---------- Per-user store + cloud sync ----------
   Each user (Bluffman / Rhaley) gets their own localStorage bucket AND their
   own blob on the server. Every write is debounced up to /api/state so
   progress follows the user across devices; if the network or function is
   unavailable, everything still works locally and re-syncs next visit. */
const PIN_HEADER = { "x-fpqp-pin": "2026" };
const user = ()=> window.FPQP_USER || null;
const LS = ()=> "fpqpAcademyV2:" + (user()||"guest");

/* One-time migration: old shared v1 data becomes the first user's data. */
function migrateV1(){
  try{
    const old = localStorage.getItem("fpqpAcademyV1");
    if(old && user() && !localStorage.getItem(LS())){
      localStorage.setItem(LS(), old);
      localStorage.removeItem("fpqpAcademyV1");
    }
  }catch(e){}
}

const store = {
  read(){ try{ return JSON.parse(localStorage.getItem(LS())) || {}; }catch(e){ return {}; } },
  write(d){ d._updatedAt = Date.now(); try{ localStorage.setItem(LS(), JSON.stringify(d)); }catch(e){} scheduleSync(); },
  get(k, fb){ const d = store.read(); return (k in d) ? d[k] : fb; },
  set(k, v){ const d = store.read(); d[k] = v; store.write(d); }
};
window.fpqpStore = store;

/* Cloud sync */
let syncTimer = null, syncBadge = null;
function syncStatus(txt, cls){
  if(!syncBadge) return;
  syncBadge.textContent = txt;
  syncBadge.className = "sync-badge " + (cls||"");
}
function scheduleSync(){
  if(!user()) return;
  syncStatus("☁️ Saving…","busy");
  clearTimeout(syncTimer);
  syncTimer = setTimeout(pushState, 1500);
}
async function pushState(){
  if(!user()) return;
  const d = store.read();
  try{
    const res = await fetch("/api/state?user="+user().toLowerCase(), {
      method:"PUT", headers:{...PIN_HEADER, "content-type":"application/json"},
      body: JSON.stringify({ data:d, updatedAt: d._updatedAt || Date.now() })
    });
    if(res.status===409){ // another device saved something newer — adopt it
      const server = await res.json();
      if(server && server.data){ try{ localStorage.setItem(LS(), JSON.stringify(server.data)); }catch(e){} }
      syncStatus("☁️ Synced","ok");
      return;
    }
    if(!res.ok) throw new Error("HTTP "+res.status);
    syncStatus("☁️ Saved","ok");
  }catch(e){
    syncStatus("📴 Saved on this device","off");
  }
}
async function pullState(){
  if(!user()) return;
  try{
    const res = await fetch("/api/state?user="+user().toLowerCase(), { headers: PIN_HEADER });
    if(!res.ok) throw new Error("HTTP "+res.status);
    const server = await res.json();
    const local = store.read();
    const serverAt = Number(server && server.updatedAt) || 0;
    const localAt = Number(local._updatedAt) || 0;
    if(server && server.data && serverAt > localAt){
      try{ localStorage.setItem(LS(), JSON.stringify(server.data)); }catch(e){}
      document.dispatchEvent(new CustomEvent("fpqp:statechanged"));
    } else if(localAt > serverAt && Object.keys(local).length > 1){
      pushState(); // local is ahead (e.g. progress made while offline)
    }
    syncStatus("☁️ Synced","ok");
  }catch(e){
    syncStatus("📴 Offline — saving on this device","off");
  }
}

/* ---------- Nav (brand · Home · Modules ▾ · Toolkit ▾ · user) ---------- */
const PAGES = [
  ["index.html","🏛️ Home"],
  ["module1.html","1 · Planning","Module 1 — The Financial Planning Process"],
  ["module2.html","2 · Cash & Debt","Module 2 — Cash Management & the Use of Debt"],
  ["module3.html","3 · Time Value","Module 3 — The Time Value of Money"],
  ["module4.html","4 · Property Ins.","Module 4 — Insurance Basics & Property Insurance"],
  ["module5.html","5 · Life & Health","Module 5 — Life & Health Insurance"],
  ["module6.html","6 · Investments","Module 6 — Investment Basics & Strategies"],
  ["module7.html","7 · Retirement","Module 7 — Retirement Planning"],
  ["module8.html","8 · Taxes","Module 8 — Tax Implications of Financial Decisions"],
  ["module9.html","9 · Estate","Module 9 — Estate Planning Basics"],
  ["module10.html","10 · Case Study","Module 10 — Case Study & Exam Rehearsal"],
  ["concepts.html","🧭 Topics A–Z"],["number-bank.html","🔢 Number Bank"],["flashcards.html","🃏 Flashcards"],
  ["review.html","🔁 Rematch List"],["scenarios.html","🎬 Scenario Drills"],["formulas.html","📐 Formula Sheet"],
  ["exam-skills.html","🎯 Exam Skills"],["feedback-log.html","💬 Feedback Log"]
];
const NAV_MODULES = PAGES.slice(1,11), NAV_TOOLS = PAGES.slice(11);
function buildNav(){
  const here = location.pathname.split("/").pop() || "index.html";
  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.setAttribute("aria-label","Site");
  const inner = document.createElement("div");
  inner.className = "nav-inner";

  const brand = document.createElement("a");
  brand.href="index.html"; brand.className="brand"; brand.textContent="FPQP® Visual Academy";
  inner.appendChild(brand);

  const links = document.createElement("div");
  links.className = "nav-links";
  const home = document.createElement("a");
  home.href="index.html"; home.textContent="🏛️ Home";
  if(here==="index.html") home.className="active";
  links.appendChild(home);

  function dropdown(label, items, groupActive){
    const dd = document.createElement("div"); dd.className="nav-dd";
    const btn = document.createElement("button");
    btn.type="button"; btn.className="nav-dd-btn"+(groupActive?" active":"");
    btn.setAttribute("aria-expanded","false");
    btn.setAttribute("aria-haspopup","true");
    btn.innerHTML = label+' <span class="dd-caret" aria-hidden="true">▾</span>';
    const panel = document.createElement("div"); panel.className="nav-dd-panel";
    items.forEach(([href,lbl,title])=>{
      const a = document.createElement("a");
      a.href = href; a.textContent = title || lbl;
      if(href===here) a.className="active";
      panel.appendChild(a);
    });
    function close(){ dd.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      document.querySelectorAll(".nav-dd.open").forEach(d=>{ if(d!==dd){ d.classList.remove("open"); d.querySelector(".nav-dd-btn").setAttribute("aria-expanded","false"); } });
      const open = dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", open?"true":"false");
    });
    document.addEventListener("click", (e)=>{ if(!dd.contains(e.target)) close(); });
    document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") close(); });
    dd.append(btn, panel);
    return dd;
  }
  links.appendChild(dropdown("📚 Modules", NAV_MODULES, /^module\d+\.html$/.test(here)));
  links.appendChild(dropdown("🛠️ Toolkit", NAV_TOOLS, NAV_TOOLS.some(([h])=>h===here)));
  inner.appendChild(links);

  const right = document.createElement("span");
  right.className = "nav-right";
  const who = document.createElement("button");
  who.type="button"; who.className="user-chip";
  who.title="Switch user";
  who.innerHTML = (user()==="Bluffman"?"🦉 ":"🦊 ") + (user()||"?") + " <span>· switch</span>";
  who.addEventListener("click", ()=>{ if(confirm("Switch user? Your progress is saved.")) window.fpqpSignOut && window.fpqpSignOut(); });
  syncBadge = document.createElement("span");
  syncBadge.className = "sync-badge";
  right.append(who, syncBadge);

  const burger = document.createElement("button");
  burger.type="button"; burger.className="nav-burger";
  burger.setAttribute("aria-expanded","false");
  burger.setAttribute("aria-label","Menu");
  burger.innerHTML = "☰";
  burger.addEventListener("click", ()=>{
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open?"true":"false");
    burger.innerHTML = open ? "✕" : "☰";
  });

  inner.append(right, burger);
  nav.appendChild(inner);
  document.body.prepend(nav);
}

/* ---------- Page aids: reading progress, sticky chapter nav w/ scrollspy,
   back-to-top, auto prev/next module bar ---------- */
function buildPageAids(){
  const here = location.pathname.split("/").pop() || "index.html";

  // Thin reading-progress bar under the nav
  const prog = document.createElement("div");
  prog.className = "readbar"; prog.setAttribute("aria-hidden","true");
  document.body.appendChild(prog);
  function onScroll(){
    const h = document.documentElement;
    const max = h.scrollHeight - innerHeight;
    prog.style.width = (max>0 ? (h.scrollTop/max*100) : 0)+"%";
    top_.classList.toggle("show", h.scrollTop > 600);
  }

  // Back-to-top
  const top_ = document.createElement("button");
  top_.type="button"; top_.className="to-top"; top_.innerHTML="↑"; top_.title="Back to top";
  top_.setAttribute("aria-label","Back to top");
  top_.addEventListener("click", ()=>scrollTo({top:0, behavior:"smooth"}));
  document.body.appendChild(top_);
  addEventListener("scroll", onScroll, {passive:true}); onScroll();

  // Scrollspy on the chapter pill bar (module pages)
  const chnav = document.querySelector(".chapter-nav");
  if(chnav){
    const pills = [...chnav.querySelectorAll("a[href^='#']")];
    const targets = pills.map(a=>document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);
    if(targets.length && "IntersectionObserver" in window){
      const spy = new IntersectionObserver((entries)=>{
        entries.forEach(en=>{
          if(!en.isIntersecting) return;
          const id = en.target.id;
          pills.forEach(a=>a.classList.toggle("current", a.getAttribute("href")==="#"+id));
        });
      }, {rootMargin:"-15% 0px -75% 0px"});
      targets.forEach(t=>spy.observe(t));
    }
  }

  // Auto prev/next module bar at the end of module pages
  const m = here.match(/^module(\d+)\.html$/);
  const main = document.querySelector("main");
  if(m && main){
    const n = +m[1];
    const bar = document.createElement("div"); bar.className="modnav";
    const mk = (idx, dir)=>{
      const p = PAGES[idx];
      const a = document.createElement("a");
      a.href = p[0]; a.className = "modnav-card "+dir;
      a.innerHTML = '<span class="mn-dir">'+(dir==="prev"?"← Previous":"Next →")+'</span><span class="mn-title">'+(p[2]||p[1])+'</span>';
      return a;
    };
    if(n>1) bar.appendChild(mk(n-1,"prev"));
    if(n<10) bar.appendChild(mk(n+1,"next"));
    else { const a=document.createElement("a"); a.href="exam-skills.html"; a.className="modnav-card next";
      a.innerHTML='<span class="mn-dir">Next →</span><span class="mn-title">🎯 Exam Skills & final prep</span>'; bar.appendChild(a); }
    main.appendChild(bar);
  }
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

/* ---------- Feedback widget (every page) ----------
   Floating button → modal. Captures page + nearest section automatically,
   posts to /api/feedback; if that fails the report is queued locally and
   retried on the next page load, so nothing is ever lost. */
const FB_CATS = [["wrong","❌ Content is wrong"],["format","🧩 Formatting broken"],["idea","💡 Idea / request"],["other","💬 Something else"]];
function queuedFeedback(){ try{ return JSON.parse(localStorage.getItem("fpqpFbQueue")) || []; }catch(e){ return []; } }
function setQueue(q){ try{ localStorage.setItem("fpqpFbQueue", JSON.stringify(q)); }catch(e){} }
async function sendFeedback(entry){
  const res = await fetch("/api/feedback", {
    method:"POST", headers:{...PIN_HEADER, "content-type":"application/json"},
    body: JSON.stringify(entry)
  });
  if(!res.ok) throw new Error("HTTP "+res.status);
}
async function flushFeedbackQueue(){
  const q = queuedFeedback();
  if(!q.length) return;
  const remaining = [];
  for(const entry of q){
    try{ await sendFeedback(entry); }catch(e){ remaining.push(entry); }
  }
  setQueue(remaining);
  if(remaining.length < q.length) toast("📨 Sent "+(q.length-remaining.length)+" saved feedback report(s).");
}
function buildFeedback(){
  const btn = document.createElement("button");
  btn.className="fb-fab"; btn.type="button"; btn.textContent="💬 Feedback";
  btn.title="Spotted a mistake or broken layout? Tell us in 10 seconds.";
  document.body.appendChild(btn);
  btn.addEventListener("click", openModal);
  function pageSections(){
    return [...document.querySelectorAll("main h2")].map(h=>h.textContent.replace(/Flagged|Flag to review/g,"").trim()).filter(Boolean);
  }
  function openModal(){
    const scrim = document.createElement("div"); scrim.className="fb-scrim";
    const secs = pageSections();
    scrim.innerHTML =
      '<div class="fb-card" role="dialog" aria-modal="true" aria-label="Send feedback">'+
      '<h3>💬 Quick feedback</h3><p class="fb-sub">Wrong number? Broken layout? Two taps and it\'s reported.</p>'+
      '<div class="fb-cats">'+FB_CATS.map(([k,l],i)=>'<button type="button" class="fb-cat'+(i===0?" active":"")+'" data-k="'+k+'">'+l+'</button>').join("")+'</div>'+
      (secs.length ? '<label class="fb-lbl">Which section?<select class="fb-sec"><option value="">(whole page)</option>'+secs.map(s=>'<option>'+s.replace(/</g,"&lt;")+'</option>').join("")+'</select></label>' : '')+
      '<label class="fb-lbl">What\'s up?<textarea class="fb-msg" rows="4" placeholder="e.g. The 2026 IRA limit here looks wrong…"></textarea></label>'+
      '<div class="fb-actions"><button type="button" class="fb-cancel">Cancel</button><button type="button" class="fb-send">Send it 🚀</button></div></div>';
    document.body.appendChild(scrim);
    let cat = FB_CATS[0][0];
    scrim.querySelectorAll(".fb-cat").forEach(c=>c.addEventListener("click", ()=>{
      scrim.querySelectorAll(".fb-cat").forEach(x=>x.classList.remove("active"));
      c.classList.add("active"); cat = c.getAttribute("data-k");
    }));
    const close = ()=>scrim.remove();
    scrim.querySelector(".fb-cancel").addEventListener("click", close);
    scrim.addEventListener("click", e=>{ if(e.target===scrim) close(); });
    scrim.querySelector(".fb-msg").focus();
    scrim.querySelector(".fb-send").addEventListener("click", async ()=>{
      const msg = scrim.querySelector(".fb-msg").value.trim();
      if(!msg){ scrim.querySelector(".fb-msg").focus(); return; }
      const secEl = scrim.querySelector(".fb-sec");
      const entry = {
        user: user()||"?",
        page: location.pathname.split("/").pop() || "index.html",
        section: secEl ? secEl.value : "",
        category: cat, message: msg
      };
      close();
      try{ await sendFeedback(entry); toast("💛 Feedback sent — thank you! It really helps."); }
      catch(e){ setQueue([...queuedFeedback(), entry]); toast("📴 Offline — feedback saved; it'll send automatically next time."); }
    });
  }
}

/* ---------- Generic interactive engines (data-driven) ----------
   Pages declare data + a host element; the engine renders it. See docs/AUTHORING.md.
   1. Sorter   <div data-sorter="id"> + window.SORTERS  — sort items into buckets
   2. Matcher  <div data-match="id">  + window.MATCHERS — pair terms with definitions
   3. Order    <div data-order="id">  + window.ORDERS   — click steps in sequence
   4. Reveal   <div data-reveal="id"> + window.REVEALS  — prompt cards that flip open */
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function buildSorters(){
  document.querySelectorAll("[data-sorter]").forEach(host=>{
    const cfg = (window.SORTERS||{})[host.getAttribute("data-sorter")];
    if(!cfg) return;
    host.classList.add("sorter");
    let queue, idx, score;
    function start(){
      queue = shuffle(cfg.items); idx = 0; score = 0; render();
    }
    function render(){
      if(idx >= queue.length){
        const pct = Math.round(100*score/queue.length);
        host.innerHTML = '<div class="sorter-done"><div class="big">'+score+' / '+queue.length+'</div>'+
          '<p>'+(pct>=70?"🎉 You'd pass this one on the real exam!":"🌱 Run it again — repetition is the whole trick.")+'</p>'+
          '<button type="button" class="tree-restart">↺ Play again</button></div>';
        host.querySelector(".tree-restart").addEventListener("click", start);
        if(pct>=70) confetti();
        return;
      }
      const it = queue[idx];
      host.innerHTML =
        '<div class="sorter-status">Item '+(idx+1)+' of '+queue.length+' · Score '+score+'</div>'+
        '<div class="sorter-item">'+it.text+'</div>'+
        '<div class="sorter-fb"></div>'+
        '<div class="sorter-buckets">'+cfg.buckets.map(b=>
          '<button type="button" class="sorter-bucket" data-b="'+b.id+'"'+(b.color?' style="--bk:var('+b.color+')"':'')+'>'+b.label+'</button>').join("")+'</div>';
      const fb = host.querySelector(".sorter-fb");
      host.querySelectorAll(".sorter-bucket").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          if(fb.classList.contains("show")) return;
          const right = btn.getAttribute("data-b")===it.bucket;
          if(right) score++;
          const correct = cfg.buckets.find(b=>b.id===it.bucket);
          btn.classList.add(right?"right":"wrong");
          fb.className = "sorter-fb show "+(right?"good":"bad");
          fb.innerHTML = (right?"✅ Yes!":"💡 It's <b>"+correct.label+"</b>.")+(it.why?" "+it.why:"");
          setTimeout(()=>{ idx++; render(); }, right?900:2600);
        });
      });
    }
    start();
  });
}

function buildMatchers(){
  document.querySelectorAll("[data-match]").forEach(host=>{
    const cfg = (window.MATCHERS||{})[host.getAttribute("data-match")];
    if(!cfg) return;
    host.classList.add("matcher");
    function start(){
      const pairs = cfg.pairs.map((p,i)=>({i, term:p[0], def:p[1]}));
      const left = shuffle(pairs), right = shuffle(pairs);
      host.innerHTML = '<div class="match-cols"><div class="match-col">'+
        left.map(p=>'<button type="button" class="match-item" data-side="t" data-i="'+p.i+'">'+p.term+'</button>').join("")+
        '</div><div class="match-col">'+
        right.map(p=>'<button type="button" class="match-item" data-side="d" data-i="'+p.i+'">'+p.def+'</button>').join("")+
        '</div></div><div class="match-status"></div>';
      let sel = null, solved = 0;
      const status = host.querySelector(".match-status");
      host.querySelectorAll(".match-item").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          if(btn.classList.contains("solved")) return;
          if(sel === btn){ btn.classList.remove("sel"); sel = null; return; }
          if(sel && sel.getAttribute("data-side") !== btn.getAttribute("data-side")){
            if(sel.getAttribute("data-i") === btn.getAttribute("data-i")){
              sel.classList.add("solved"); btn.classList.add("solved");
              sel.classList.remove("sel"); sel = null; solved++;
              if(solved === cfg.pairs.length){
                status.innerHTML = '🎉 All matched! <button type="button" class="tree-restart">↺ Shuffle & replay</button>';
                status.querySelector(".tree-restart").addEventListener("click", start);
                confetti();
              }
            } else {
              btn.classList.add("shake"); sel.classList.add("shake");
              const a = sel; sel.classList.remove("sel"); sel = null;
              setTimeout(()=>{ btn.classList.remove("shake"); a.classList.remove("shake"); }, 450);
            }
          } else {
            if(sel) sel.classList.remove("sel");
            sel = btn; btn.classList.add("sel");
          }
        });
      });
    }
    start();
  });
}

function buildOrders(){
  document.querySelectorAll("[data-order]").forEach(host=>{
    const cfg = (window.ORDERS||{})[host.getAttribute("data-order")];
    if(!cfg) return;
    host.classList.add("orderer");
    function start(){
      const items = shuffle(cfg.steps.map((s,i)=>({s,i})));
      let next = 0, misses = 0;
      host.innerHTML = '<div class="order-status">Tap the steps in the right order — first step first.</div>'+
        '<div class="order-list">'+items.map(it=>'<button type="button" class="order-item" data-i="'+it.i+'">'+it.s+'</button>').join("")+'</div>'+
        '<div class="order-done"></div>';
      const status = host.querySelector(".order-status");
      host.querySelectorAll(".order-item").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          if(btn.classList.contains("placed")) return;
          if(+btn.getAttribute("data-i") === next){
            btn.classList.add("placed");
            btn.insertAdjacentHTML("afterbegin", '<span class="order-n">'+(next+1)+'</span>');
            next++;
            if(next === cfg.steps.length){
              const done = host.querySelector(".order-done");
              done.innerHTML = (misses===0?"🏆 Perfect, first try!":"🎉 Done — "+misses+" miss"+(misses===1?"":"es")+".")+
                ' <button type="button" class="tree-restart">↺ Replay</button>';
              done.querySelector(".tree-restart").addEventListener("click", start);
              if(misses===0) confetti();
            } else status.textContent = "✅ Step "+next+" locked in — what comes next?";
          } else {
            misses++;
            btn.classList.add("shake");
            status.textContent = "🤔 Not yet — that one comes later.";
            setTimeout(()=>btn.classList.remove("shake"), 450);
          }
        });
      });
    }
    start();
  });
}

function buildReveals(){
  document.querySelectorAll("[data-reveal]").forEach(host=>{
    const cfg = (window.REVEALS||{})[host.getAttribute("data-reveal")];
    if(!cfg) return;
    host.classList.add("revealgrid");
    if(cfg.cols) host.style.setProperty("--rv-cols", cfg.cols);
    cfg.items.forEach(it=>{
      const b = document.createElement("button");
      b.type="button"; b.className="reveal-card";
      b.innerHTML = '<span class="rv-front">'+it.front+'</span><span class="rv-back">'+it.back+'</span><span class="rv-hint">tap to reveal</span>';
      b.addEventListener("click", ()=>b.classList.toggle("open"));
      host.appendChild(b);
    });
  });
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
  let html = '<h4>🎨 Color = topic</h4><p>Every topic keeps its color across the whole site — a built-in memory hook. Each swatch is also numbered so color is never the only cue.</p><div class="legend-list">';
  TOPICS.forEach(([v,name,href],i)=>{
    const c = cs.getPropertyValue(v).trim();
    const badge = i<10 ? (i+1) : "★";
    html += '<a class="legend-item" href="'+href+'"><span class="legend-swatch" data-badge="'+badge+'" style="background:'+c+'"></span>'+name+'</a>';
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

/* ---------- Flip-card flashcards (collapsible, grouped by module) ---------- */
const MOD_NAMES = {
  "--m1":"Module 1 · Planning Process","--m2":"Module 2 · Cash & Debt","--m3":"Module 3 · Time Value of Money",
  "--m4":"Module 4 · Property Insurance","--m5":"Module 5 · Life & Health","--m6":"Module 6 · Investments",
  "--m7":"Module 7 · Retirement","--m8":"Module 8 · Taxes","--m9":"Module 9 · Estate","--m10":"Module 10 · Case Study",
  "--gold":"Exam Skills & Toolkit"
};
function makeFlashcard(fc, idx){
  const card = document.createElement("button"); card.type="button"; card.className="flashcard";
  card.setAttribute("aria-pressed","false");
  card.setAttribute("data-idx", idx);
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
  return card;
}
function buildFlashcards(){
  const host = document.querySelector("[data-flashcards]");
  if(!host || !window.FLASHCARDS) return;
  // Group cards by module, in first-seen order; each group is a collapsible
  // <details> so the deck never feels like an endless wall of cards.
  const groups = new Map();
  window.FLASHCARDS.forEach((fc,idx)=>{
    const key = fc.mod || "--gold";
    if(!groups.has(key)) groups.set(key, []);
    groups.get(key).push([fc,idx]);
  });
  let first = true;
  groups.forEach((cards, key)=>{
    const det = document.createElement("details");
    det.className = "fc-group";
    det.style.cssText = "--accent:var("+key+");--accent-soft:var("+key+"s)";
    if(first){ det.open = true; first = false; }
    const sum = document.createElement("summary");
    sum.innerHTML = '<span class="fcg-name">'+(MOD_NAMES[key]||"More cards")+'</span><span class="fcg-count">'+cards.length+' cards</span>';
    det.appendChild(sum);
    const deck = document.createElement("div"); deck.className="deck";
    cards.forEach(([fc,idx])=>{
      const card = makeFlashcard(fc, idx);
      const shell = document.createElement("div"); shell.className="fc-shell";
      shell.appendChild(card);
      deck.appendChild(shell);
    });
    det.appendChild(deck);
    host.appendChild(det);
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
    '<p class="src" style="margin-top:10px">Official 2026 single-filer brackets (per the CFFP course tax tables): 10% to $12,400 · 12% · 22% · 24% · 32% · 35% · 37% over $640,600. Note: exam windows through March 2026 provide the <em>2025</em> tables — confirm which year your exam window uses.</p>';
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

/* ---------- Small SVG icon set (sharper than emoji for UI controls) ---------- */
const ICONS = {
  flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4h13l-2 4 2 4H4"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  loop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>'
};

/* ---------- Section anchors + concept flagging ("Rematch" list) ---------- */
function slug(t){ return "sec-" + t.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g,"-"); }
const cleanLabel = (t)=> t.replace(/^[^A-Za-z0-9]+/,"").trim();
function enhanceHeadings(){
  const main = document.querySelector("main");
  if(!main) return;
  const page = location.pathname.split("/").pop() || "index.html";
  const flagged = store.get("flagged", {});
  main.querySelectorAll(":scope > h2").forEach(h=>{
    const text = h.textContent.trim();
    if(/self-quiz/i.test(text)) return; // skip the quiz heading
    if(!h.id) h.id = slug(text);
    h.classList.add("sec-head");
    const key = page + "#" + h.id;
    const anchor = document.createElement("a");
    anchor.className="sec-anchor"; anchor.href="#"+h.id; anchor.innerHTML=ICONS.link;
    anchor.setAttribute("aria-label","Link to this section");
    const flag = document.createElement("button");
    flag.type="button"; flag.className="flag-btn";
    const label = cleanLabel(text);
    function paint(on){ flag.classList.toggle("on", on); flag.innerHTML = ICONS.flag + (on?"<span>Flagged</span>":"<span>Flag to review</span>"); flag.setAttribute("aria-pressed", on?"true":"false"); }
    paint(!!flagged[key]);
    flag.addEventListener("click", ()=>{
      const f = store.get("flagged", {});
      if(f[key]){ delete f[key]; paint(false); toast("Removed from your Rematch list."); }
      else { f[key] = {label, href:key, page}; paint(true); toast("🔁 Added to your Rematch list — revisit it anytime."); }
      store.set("flagged", f);
    });
    h.append(anchor, flag);
  });
  // Scroll to a deep-linked section once ids exist.
  if(location.hash){
    const el = document.getElementById(location.hash.slice(1));
    if(el) requestAnimationFrame(()=>el.scrollIntoView({behavior:"smooth", block:"start"}));
  }
}

/* ---------- Module warm-up (myth vs. fact) ---------- */
const WARMUPS = {
  "module1.html":{claim:"A financial planner only has to act in your best interest when they're building a full financial plan.", fact:false, why:"CFP® professionals owe a fiduciary duty at ALL times when giving financial advice — not just during formal planning."},
  "module2.html":{claim:"A C corporation's profits can be taxed twice — once at the company, once at the shareholder.", fact:true, why:"That's the famous “double taxation” of C corps. S corps, LLCs, and partnerships are pass-through instead."},
  "module3.html":{claim:"Earning 8% a year, your money doubles in roughly 9 years.", fact:true, why:"Rule of 72: 72 ÷ 8 = 9 years. A shortcut the exam expects you to know cold."},
  "module4.html":{claim:"A standard homeowners policy covers flood damage.", fact:false, why:"Flood (and earthquake) are excluded from standard homeowners — they need separate policies. Classic exam trap."},
  "module5.html":{claim:"The HSA is the only account with a triple tax advantage.", fact:true, why:"Pre-tax in, tax-free growth, tax-free out for qualified medical costs. The exam loves this one."},
  "module6.html":{claim:"With enough diversification you can eliminate the risk of a market-wide crash.", fact:false, why:"Diversification removes unsystematic (company) risk. Systematic (market) risk stays — that's what beta measures."},
  "module7.html":{claim:"In 2026, you must start taking RMDs at age 70½.", fact:false, why:"SECURE 2.0 moved it to 73 (born 1951–1959) or 75 (born 1960+). 70½ is an outdated book number."},
  "module8.html":{claim:"Getting a raise into the 24% bracket taxes ALL your income at 24%.", fact:false, why:"Only the dollars inside the 24% band are taxed at 24%. Your effective rate stays lower — the staircase."},
  "module9.html":{claim:"Your will decides who inherits your 401(k).", fact:false, why:"A beneficiary designation OVERRIDES the will. An outdated form can send money to an ex-spouse."},
  "module10.html":{claim:"You need a perfect score to pass the FPQP® final exam.", fact:false, why:"You need 70% (53 of 75), you get 2 attempts, and 3 hours. You can miss 22 and still pass."}
};
function buildWarmups(){
  const page = location.pathname.split("/").pop() || "index.html";
  const w = WARMUPS[page];
  const main = document.querySelector("main");
  if(!w || !main) return;
  const box = document.createElement("div"); box.className="warmup";
  box.innerHTML = '<div class="wu-kick">⚡ 30-second warm-up</div>'+
    '<div class="wu-claim">Myth or fact? <em>“'+w.claim+'”</em></div>'+
    '<div class="wu-btns"><button class="wu-btn" data-v="myth" type="button">🚫 Myth</button>'+
    '<button class="wu-btn" data-v="fact" type="button">✅ Fact</button></div>'+
    '<div class="wu-reveal"></div>';
  const reveal = box.querySelector(".wu-reveal");
  box.querySelectorAll(".wu-btn").forEach(b=>{
    b.addEventListener("click", ()=>{
      const guess = b.getAttribute("data-v")==="fact";
      const right = guess===w.fact;
      const verdict = w.fact ? "Fact" : "Myth";
      reveal.className = "wu-reveal show";
      reveal.innerHTML = (right?"🎉 <strong>Nice — you got it.</strong> ":"💡 <strong>Good try.</strong> ")+
        `It's a <span class="wu-verdict ${w.fact?"fact":"myth"}">${verdict}</span>. `+w.why;
      box.querySelectorAll(".wu-btn").forEach(x=>x.disabled=true);
      if(right) toast(CHEERS[Math.floor(Math.random()*CHEERS.length)]);
    });
  });
  main.insertBefore(box, main.firstChild);
}

/* ---------- Plain-language ⇄ exam-precise toggle ---------- */
function buildModeToggle(){
  if(document.querySelector("[data-no-modetoggle]")) return;
  const btn = document.createElement("button");
  btn.className="mode-toggle"; btn.type="button";
  function paint(){ const plain = document.body.classList.contains("mode-plain");
    btn.textContent = plain ? "🎓 Switch to exam-precise" : "🧒 Explain it simply"; btn.setAttribute("aria-pressed", plain?"true":"false"); }
  if(store.get("modePlain", false)) document.body.classList.add("mode-plain");
  paint();
  btn.addEventListener("click", ()=>{
    const plain = document.body.classList.toggle("mode-plain");
    store.set("modePlain", plain); paint();
  });
  document.body.appendChild(btn);
}

/* ---------- Guided app tour ---------- */
const TOUR = [
  {emoji:"👋", title:"Welcome to your Visual Academy", text:"A 60-second tour of how everything works. You can skip anytime — nothing here is graded."},
  {emoji:"🧭", title:"Everything's in the top bar", text:"Ten module lessons plus study tools: Topics A–Z, the Number Bank, Flashcards, and more.", sel:".nav"},
  {emoji:"📚", title:"Start with a module", text:"Each lesson teaches through pictures and interactive diagrams, then ends with a self-quiz.", sel:".mod-tile"},
  {emoji:"⚡", title:"Warm up in 30 seconds", text:"Every module opens with a quick myth-or-fact so you start thinking before you read."},
  {emoji:"🔁", title:"Flag anything to revisit", text:"See the “Flag to review” button on each section? Tap it and that concept lands on your Rematch list.", sel:".flag-btn"},
  {emoji:"🎨", title:"Color = topic", text:"Every topic keeps its color site-wide — a built-in memory hook. Open the key any time.", sel:".legend-toggle"},
  {emoji:"🧒", title:"Too jargon-y? Flip to plain words", text:"This toggle adds plain-language explanations alongside the exam-precise wording.", sel:".mode-toggle"},
  {emoji:"💬", title:"See something wrong?", text:"Tap the Feedback button on any page — wrong number, broken layout, anything. It takes 10 seconds.", sel:".fb-fab"},
  {emoji:"🚀", title:"You're ready", text:"Pick Module 1 and go. Your progress saves automatically to your own profile — on any device. You've got this. 💛"}
];
let tourState = 0, tourEls = null;
function startTour(force){
  if(!force && store.get("tourSeen", false)) return;
  tourState = 0; renderTour();
}
function renderTour(){
  clearTourHighlight();
  let scrim = document.querySelector(".tour-scrim");
  if(!scrim){ scrim = document.createElement("div"); scrim.className="tour-scrim"; document.body.appendChild(scrim); }
  const s = TOUR[tourState];
  const dots = TOUR.map((_,i)=>'<span class="tour-dot'+(i===tourState?" on":"")+'"></span>').join("");
  scrim.innerHTML = '<div class="tour-card" role="dialog" aria-modal="true">'+
    '<div class="tour-emoji">'+s.emoji+'</div><h3>'+s.title+'</h3><p>'+s.text+'</p>'+
    '<div class="tour-dots">'+dots+'</div>'+
    '<div class="tour-actions"><button class="tour-skip" type="button">Skip tour</button><div>'+
    (tourState>0?'<button class="tour-back" type="button">Back</button> ':'')+
    '<button class="tour-next" type="button">'+(tourState===TOUR.length-1?"Done":"Next")+'</button></div></div></div>';
  if(s.sel){ const el = document.querySelector(s.sel); if(el){ el.classList.add("tour-highlight"); tourEls = el; el.scrollIntoView({behavior:"smooth", block:"center"}); } }
  scrim.querySelector(".tour-skip").onclick = endTour;
  scrim.querySelector(".tour-next").onclick = ()=>{ if(tourState===TOUR.length-1) endTour(); else { tourState++; renderTour(); } };
  const back = scrim.querySelector(".tour-back"); if(back) back.onclick = ()=>{ tourState--; renderTour(); };
}
function clearTourHighlight(){ if(tourEls){ tourEls.classList.remove("tour-highlight"); tourEls=null; } }
function endTour(){ clearTourHighlight(); const s=document.querySelector(".tour-scrim"); if(s) s.remove(); store.set("tourSeen", true); }
window.fpqpTour = ()=>startTour(true);

/* ---------- TVM calculator ---------- */
function buildTVM(){
  const host = document.querySelector("[data-tvm]");
  if(!host) return;
  host.classList.add("tvm");
  host.innerHTML =
    '<div class="tvm-grid">'+
    field("tvm-pv","Present value ($)","10000")+
    field("tvm-pmt","Payment / period ($)","200")+
    field("tvm-rate","Annual rate (%)","7")+
    field("tvm-years","Years","30")+
    '<div class="tvm-field"><label for="tvm-freq">Compounding</label><select id="tvm-freq"><option value="12">Monthly</option><option value="1">Annual</option><option value="4">Quarterly</option></select></div>'+
    '</div>'+
    '<div class="tvm-out"><div><span class="lbl">Future value</span><b id="tvm-fv">$0</b></div>'+
    '<div><span class="lbl">Total you put in</span><b id="tvm-in" style="color:var(--ink-soft)">$0</b></div>'+
    '<div><span class="lbl">Growth (Rule of 72: doubles in)</span><b id="tvm-dbl">–</b></div></div>'+
    '<p class="src" style="margin-top:10px">Assumes an ordinary annuity (payments at period end) and payments matching the compounding frequency.</p>';
  function field(id,label,val){ return '<div class="tvm-field"><label for="'+id+'">'+label+'</label><input id="'+id+'" type="number" value="'+val+'"></div>'; }
  const $ = (id)=>host.querySelector("#"+id);
  const fmt = (n)=>"$"+Math.round(n).toLocaleString();
  function calc(){
    const pv=+$("tvm-pv").value||0, pmt=+$("tvm-pmt").value||0, r=+$("tvm-rate").value||0, y=+$("tvm-years").value||0, f=+$("tvm-freq").value;
    const i=r/100/f, n=y*f;
    const fv = i===0 ? pv + pmt*n : pv*Math.pow(1+i,n) + pmt*((Math.pow(1+i,n)-1)/i);
    $("tvm-fv").textContent = fmt(fv);
    $("tvm-in").textContent = fmt(pv + pmt*n);
    $("tvm-dbl").textContent = r>0 ? (72/r).toFixed(1)+" yrs" : "–";
  }
  host.querySelectorAll("input,select").forEach(el=>el.addEventListener("input", calc));
  calc();
}

/* ---------- Term vs. whole life cost-over-time ---------- */
function buildLifeCompare(){
  const host = document.querySelector("[data-lifecompare]");
  if(!host) return;
  host.classList.add("lifecompare");
  const termMo=32, wholeMo=310, cashRate=0.55, termYears=20, W=680, H=240, pad=34, maxY=30;
  const maxCost = wholeMo*12*maxY;
  const x=(yr)=>pad + yr/maxY*(W-pad*2);
  const y=(v)=>H-pad - v/maxCost*(H-pad*2);
  function termCum(yr){ return termMo*12*Math.min(yr,termYears); }
  function wholeCum(yr){ return wholeMo*12*yr; }
  function cashVal(yr){ return wholeMo*12*yr*cashRate; }
  const line=(fn,color)=>{ let pts=""; for(let yr=0;yr<=maxY;yr++) pts+=x(yr).toFixed(0)+","+y(fn(yr)).toFixed(0)+" "; return '<polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="3"/>'; };
  host.innerHTML =
    '<div class="lc-legend"><span><b style="background:var(--m5)"></b>Term — cumulative premiums</span>'+
    '<span><b style="background:var(--m7)"></b>Whole — cumulative premiums</span>'+
    '<span><b style="background:var(--m6)"></b>Whole — cash value built</span></div>'+
    '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Term vs whole life cumulative cost over 30 years">'+
    '<line x1="'+pad+'" y1="'+(H-pad)+'" x2="'+(W-pad)+'" y2="'+(H-pad)+'" stroke="#ccc"/>'+
    line(termCum,"#E11D48")+line(wholeCum,"#7C3AED")+line(cashVal,"#059669")+
    '<line id="lc-marker" x1="'+x(20)+'" y1="'+pad+'" x2="'+x(20)+'" y2="'+(H-pad)+'" stroke="var(--ink-soft)" stroke-dasharray="4"/>'+
    '<text x="'+pad+'" y="'+(H-8)+'" font-size="11" fill="#6B6584">year 0</text>'+
    '<text x="'+(W-pad-30)+'" y="'+(H-8)+'" font-size="11" fill="#6B6584">year 30</text></svg>'+
    '<label style="font-size:13px;font-weight:700">Year: <span id="lc-yr">20</span></label>'+
    '<input id="lc-range" type="range" min="1" max="'+maxY+'" value="20" style="width:100%;accent-color:var(--m7)">'+
    '<div class="lc-readout"><span>Term paid so far<b style="color:var(--m5)" id="lc-term">$0</b></span>'+
    '<span>Whole paid so far<b style="color:var(--m7)" id="lc-whole">$0</b></span>'+
    '<span>Whole cash value<b style="color:var(--m6)" id="lc-cash">$0</b></span></div>'+
    '<p class="src" style="margin-top:8px">Illustrative only (term ≈$'+termMo+'/mo for '+termYears+' yrs; whole ≈$'+wholeMo+'/mo). Real quotes vary widely — the shape is the lesson: term is cheap but temporary; whole costs far more but is permanent and builds cash value.</p>';
  const fmt=(n)=>"$"+Math.round(n).toLocaleString();
  const range=host.querySelector("#lc-range");
  function upd(){ const yr=+range.value; host.querySelector("#lc-yr").textContent=yr;
    host.querySelector("#lc-marker").setAttribute("x1",x(yr)); host.querySelector("#lc-marker").setAttribute("x2",x(yr));
    host.querySelector("#lc-term").textContent=fmt(termCum(yr));
    host.querySelector("#lc-whole").textContent=fmt(wholeCum(yr));
    host.querySelector("#lc-cash").textContent=fmt(cashVal(yr)); }
  range.addEventListener("input", upd); upd();
}

/* ---------- Regulator map ("who regulates whom") ---------- */
const REGMAP = {
  pros:[
    ["Large investment adviser (RIA)","manages $100M+","sec"],
    ["Smaller investment adviser","state-registered","nasaa"],
    ["Broker-dealer & its reps","sells securities","finra"],
    ["Insurance agent","sells policies","naic"],
    ["CFP® professional","holds the CFP® mark","cfp"]
  ],
  regs:{ sec:["🦅 SEC","Federal securities regulator; enforces Reg BI"],
    finra:["🛡️ FINRA","Self-regulator for broker-dealers & reps"],
    nasaa:["🏠 State securities (NASAA)","Register smaller advisers; Series 65/66"],
    naic:["☂️ State insurance (NAIC)","Insurance is state-regulated"],
    cfp:["🎓 CFP Board","Enforces the CFP® Code & Standards"] }
};
function buildRegMap(){
  const host = document.querySelector("[data-regmap]");
  if(!host) return;
  host.classList.add("regmap");
  const pros = REGMAP.pros.map((p,i)=>'<button class="rm-item" data-reg="'+p[2]+'" type="button"><span class="rm-name">'+p[0]+'</span><span class="rm-sub">'+p[1]+'</span></button>').join("");
  const regs = Object.entries(REGMAP.regs).map(([k,v])=>'<div class="rm-item" data-key="'+k+'"><span class="rm-name">'+v[0]+'</span><span class="rm-sub">'+v[1]+'</span></div>').join("");
  host.innerHTML = '<div class="rm-col"><h4>Tap a professional…</h4>'+pros+'</div><div class="rm-col"><h4>…see who regulates them</h4>'+regs+'</div>';
  const regEls = [...host.querySelectorAll("[data-key]")];
  host.querySelectorAll(".rm-item[data-reg]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      host.querySelectorAll(".rm-item[data-reg]").forEach(b=>b.classList.remove("hit"));
      btn.classList.add("hit");
      const target = btn.getAttribute("data-reg");
      regEls.forEach(r=>{ const on = r.getAttribute("data-key")===target; r.classList.toggle("hit",on); r.classList.toggle("dim",!on); });
    });
  });
}

/* ---------- Flashcard marking + filters (extends buildFlashcards) ---------- */
function flashcardTools(){
  const host = document.querySelector("[data-flashcards]");
  if(!host || !window.FLASHCARDS) return;
  const marks = store.get("fcMarks", {});
  const tabs = document.createElement("div"); tabs.className="fc-tabs";
  tabs.innerHTML = [["all","All"],["review","🔁 Needs review"],["know","✅ Known"],["unmarked","◻️ Unmarked"]]
    .map(([k,l],i)=>'<button class="fc-tab'+(i===0?" active":"")+'" data-f="'+k+'" type="button">'+l+'</button>').join("");
  host.parentNode.insertBefore(tabs, host);
  host.querySelectorAll(".flashcard").forEach(card=>{
    const idx = +card.getAttribute("data-idx");
    const fc = window.FLASHCARDS[idx]; if(!fc) return;
    const id = fc.id || ("fc"+idx);
    if(marks[id]) card.setAttribute("data-state", marks[id].state);
    const shell = document.createElement("div"); shell.className="fc-mark";
    const know=document.createElement("button"); know.type="button"; know.className="know"; know.innerHTML="✅ I know it";
    const rev=document.createElement("button"); rev.type="button"; rev.className="review"; rev.innerHTML="🔁 Needs review";
    function paint(){ const st = card.getAttribute("data-state"); know.classList.toggle("on",st==="know"); rev.classList.toggle("on",st==="review"); }
    function set(state){ const m=store.get("fcMarks",{}); const cur=card.getAttribute("data-state");
      if(cur===state){ card.removeAttribute("data-state"); delete m[id]; }
      else { card.setAttribute("data-state",state); m[id]={state, q:fc.q}; }
      store.set("fcMarks",m); paint(); }
    know.addEventListener("click",(e)=>{e.stopPropagation(); set("know");});
    rev.addEventListener("click",(e)=>{e.stopPropagation(); set("review");});
    shell.append(know,rev); card.after(shell); paint();
  });
  tabs.querySelectorAll(".fc-tab").forEach(tab=>{
    tab.addEventListener("click", ()=>{
      tabs.querySelectorAll(".fc-tab").forEach(t=>t.classList.remove("active")); tab.classList.add("active");
      const f = tab.getAttribute("data-f");
      let shown=0;
      host.querySelectorAll(".flashcard").forEach(card=>{
        const st = card.getAttribute("data-state")||"unmarked";
        const on = f==="all" || (f==="unmarked"&&st==="unmarked") || st===f;
        const shell = card.closest(".fc-shell") || card;
        shell.style.display = on?"":"none";
        if(on) shown++;
      });
      // Update per-group counts and visibility; auto-open groups when filtering
      host.querySelectorAll(".fc-group").forEach(g=>{
        const visible = [...g.querySelectorAll(".fc-shell")].filter(s=>s.style.display!=="none").length;
        const cnt = g.querySelector(".fcg-count");
        if(cnt) cnt.textContent = visible+" card"+(visible===1?"":"s");
        g.style.display = visible ? "" : "none";
        if(f!=="all" && visible) g.open = true;
      });
      let empty = host.querySelector(".fc-empty");
      if(!shown){ if(!empty){ empty=document.createElement("p"); empty.className="fc-empty"; host.appendChild(empty);} empty.textContent="Nothing here yet — mark some cards to fill this view. 🌱"; }
      else if(empty) empty.remove();
    });
  });
}

/* ---------- Rematch / review page ---------- */
function buildReview(){
  const host = document.getElementById("rematch");
  if(!host) return;
  const flagged = store.get("flagged", {});
  const marks = store.get("fcMarks", {});
  const reviewCards = Object.entries(marks).filter(([,v])=>v.state==="review");
  const concepts = Object.entries(flagged);
  host.innerHTML = "";
  if(!concepts.length && !reviewCards.length){
    host.innerHTML = '<div class="rematch-empty"><p style="font-size:2.5rem;margin:0">🎯</p><h3>Your Rematch list is empty — for now.</h3>'+
      '<p>As you study, tap <strong>“Flag to review”</strong> on any section, or mark a flashcard <strong>“Needs review,”</strong> and it lands here so you can come back and beat it. 💪</p>'+
      '<p><a href="module1.html">Start with Module 1 →</a></p></div>';
    return;
  }
  if(concepts.length){
    const g = document.createElement("div"); g.className="rematch-group";
    g.innerHTML = '<h2>🔖 Flagged concepts <span style="font-size:14px;color:var(--ink-soft);font-weight:400">('+concepts.length+')</span></h2>';
    concepts.forEach(([key,v])=>{
      const row = document.createElement("div"); row.className="rematch-item";
      const pageLabel = v.page.replace(".html","").replace("module","Module ");
      row.innerHTML = '<a href="'+v.href+'">'+v.label+'</a><span class="ri-page">'+pageLabel+'</span><button class="ri-drop" title="Remove" aria-label="Remove">✕</button>';
      row.querySelector(".ri-drop").addEventListener("click", ()=>{ const f=store.get("flagged",{}); delete f[key]; store.set("flagged",f); buildReview(); });
      g.appendChild(row);
    });
    host.appendChild(g);
  }
  if(reviewCards.length){
    const g = document.createElement("div"); g.className="rematch-group";
    g.innerHTML = '<h2>🃏 Flashcards to review <span style="font-size:14px;color:var(--ink-soft);font-weight:400">('+reviewCards.length+')</span></h2>';
    reviewCards.forEach(([id,v])=>{
      const row = document.createElement("div"); row.className="rematch-item"; row.style.borderLeftColor="var(--m10)";
      row.innerHTML = '<a href="flashcards.html">'+v.q+'</a><span class="ri-page">Flashcards</span><button class="ri-drop" title="Remove" aria-label="Remove">✕</button>';
      row.querySelector(".ri-drop").addEventListener("click", ()=>{ const m=store.get("fcMarks",{}); delete m[id]; store.set("fcMarks",m); buildReview(); });
      g.appendChild(row);
    });
    host.appendChild(g);
  }
}

/* ---------- Scenario drills ---------- */
function buildScenarios(){
  const host = document.getElementById("scenarios");
  if(!host || !window.SCENARIOS) return;
  window.SCENARIOS.forEach((sc,si)=>{
    const wrap = document.createElement("div"); wrap.className="card"; wrap.style.margin="22px 0";
    wrap.innerHTML = '<h3 style="margin-top:0">'+sc.title+'</h3><p style="color:var(--ink-soft)">'+sc.intro+'</p>';
    const qhost = document.createElement("div"); qhost.className="quiz"; wrap.appendChild(qhost);
    sc.steps.forEach((item,qi)=>{
      const card=document.createElement("div"); card.className="q-card";
      card.innerHTML = '<div class="q-num">Step '+(qi+1)+' of '+sc.steps.length+'</div><div class="q-text">'+item.q+'</div>';
      const fb=document.createElement("div"); fb.className="q-feedback"; const btns=[];
      item.opts.forEach((opt,oi)=>{
        const b=document.createElement("button"); b.type="button"; b.className="q-opt"; b.textContent=String.fromCharCode(65+oi)+". "+opt;
        b.addEventListener("click", ()=>{ btns.forEach(x=>x.disabled=true);
          if(oi===item.a){ b.classList.add("correct"); fb.className="q-feedback show good"; fb.textContent="✅ "+item.why; toast(CHEERS[Math.floor(Math.random()*CHEERS.length)]); }
          else { b.classList.add("wrong"); btns[item.a].classList.add("correct"); fb.className="q-feedback show bad"; fb.textContent="💡 The stronger call is "+String.fromCharCode(65+item.a)+". "+item.why; } });
        btns.push(b); card.appendChild(b);
      });
      card.appendChild(fb); qhost.appendChild(card);
    });
    host.appendChild(wrap);
  });
}

function init(){
  migrateV1();
  buildNav(); buildQuiz(); hubProgress();
  buildLegend(); buildWheels(); buildTrees(); buildProbate(); buildFlashcards();
  buildBarCharts(); buildTaxStack(); buildNumLines(); buildNumberBank(); conceptFilter();
  buildWarmups(); enhanceHeadings(); buildModeToggle();
  buildTVM(); buildLifeCompare(); buildRegMap(); flashcardTools(); buildReview(); buildScenarios();
  buildSorters(); buildMatchers(); buildOrders(); buildReveals(); buildFeedback(); buildPageAids();
  addEventListener("beforeprint", ()=>document.querySelectorAll("details").forEach(d=>d.open=true));
  pullState(); flushFeedbackQueue();
  document.addEventListener("fpqp:statechanged", ()=>{ hubProgress(); buildReview(); });
  if((location.pathname.split("/").pop()||"index.html")==="index.html") startTour(false);
}
document.addEventListener("DOMContentLoaded", ()=>{
  // The gate (js/gate.js) may still be up; wait for it so saves land in the
  // right user's bucket.
  if(window.FPQP_USER) init();
  else document.addEventListener("fpqp:unlocked", init, {once:true});
});
})();
