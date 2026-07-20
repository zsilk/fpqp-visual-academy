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
  ["exam-skills.html","🎯 Exam Skills"],["study-plan.html","🗓️ 30-Day Plan"],["whats-new.html","✨ 2026 Updates"]
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
        if(answered===cfg.questions.length) finish();
      });
      btns.push(b); card.appendChild(b);
    });
    card.appendChild(fb);
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

document.addEventListener("DOMContentLoaded", ()=>{ buildNav(); buildQuiz(); hubProgress(); plan(); });
})();
