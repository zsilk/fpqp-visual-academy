/* FPQP Visual Academy — access gate.
   Flow: pick user (Bluffman / Rhaley) → enter PIN.
   10 wrong PIN attempts locks the gate for 15 minutes.
   Loaded synchronously in <head> so content never flashes before auth. */
(function(){
"use strict";
var PIN = "2026";
var USERS = ["Bluffman","Rhaley"];
var MAX_FAILS = 10;
var LOCK_MS = 15*60*1000;

function readJSON(k){ try{ return JSON.parse(localStorage.getItem(k)) || null; }catch(e){ return null; } }
function writeJSON(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

var auth = readJSON("fpqpAuth");
if(auth && auth.user && USERS.indexOf(auth.user)>=0){
  window.FPQP_USER = auth.user;
  return; // already unlocked on this device
}

document.documentElement.classList.add("fpqp-locked");
window.FPQP_USER = null;

document.addEventListener("DOMContentLoaded", function(){
  var scrim = document.createElement("div");
  scrim.className = "gate-scrim";
  document.body.appendChild(scrim);
  var chosen = null;

  function lockState(){
    var l = readJSON("fpqpGateLock") || {fails:0, until:0};
    if(l.until && Date.now() >= l.until){ l = {fails:0, until:0}; writeJSON("fpqpGateLock", l); }
    return l;
  }

  function renderUsers(){
    scrim.innerHTML =
      '<div class="gate-card" role="dialog" aria-modal="true" aria-label="Sign in">'+
      '<div class="gate-emoji">🎓</div><h2>FPQP® Visual Academy</h2>'+
      '<p>Who’s studying today?</p><div class="gate-users">'+
      USERS.map(function(u){ return '<button type="button" class="gate-user" data-u="'+u+'">'+(u==="Bluffman"?"🦉":"🦊")+'<span>'+u+'</span></button>'; }).join("")+
      '</div><p class="gate-note">Each of you has your own saved progress.</p></div>';
    scrim.querySelectorAll(".gate-user").forEach(function(b){
      b.addEventListener("click", function(){ chosen = b.getAttribute("data-u"); renderPin(); });
    });
  }

  function renderPin(msg){
    var l = lockState();
    if(l.until && Date.now() < l.until){ renderLocked(); return; }
    var left = MAX_FAILS - l.fails;
    scrim.innerHTML =
      '<div class="gate-card" role="dialog" aria-modal="true" aria-label="Enter PIN">'+
      '<div class="gate-emoji">'+(chosen==="Bluffman"?"🦉":"🦊")+'</div><h2>Hi, '+chosen+'!</h2>'+
      '<p>Enter the study PIN to unlock the site.</p>'+
      '<form class="gate-form"><input class="gate-pin" type="password" inputmode="numeric" autocomplete="off" maxlength="8" aria-label="PIN" placeholder="••••">'+
      '<button class="gate-go" type="submit">Unlock</button></form>'+
      (msg ? '<p class="gate-err">'+msg+'</p>' : '')+
      (l.fails>0 ? '<p class="gate-note">'+left+' attempt'+(left===1?'':'s')+' left before a 15-minute timeout.</p>' : '')+
      '<button type="button" class="gate-back">← Not '+chosen+'?</button></div>';
    var input = scrim.querySelector(".gate-pin");
    input.focus();
    scrim.querySelector(".gate-back").addEventListener("click", renderUsers);
    scrim.querySelector(".gate-form").addEventListener("submit", function(e){
      e.preventDefault();
      var l2 = lockState();
      if(l2.until && Date.now() < l2.until){ renderLocked(); return; }
      if(input.value === PIN){
        writeJSON("fpqpGateLock", {fails:0, until:0});
        writeJSON("fpqpAuth", {user: chosen, ts: Date.now()});
        window.FPQP_USER = chosen;
        document.documentElement.classList.remove("fpqp-locked");
        scrim.remove();
        document.dispatchEvent(new CustomEvent("fpqp:unlocked", {detail:{user: chosen}}));
      } else {
        l2.fails++;
        if(l2.fails >= MAX_FAILS){ l2.until = Date.now() + LOCK_MS; writeJSON("fpqpGateLock", l2); renderLocked(); }
        else { writeJSON("fpqpGateLock", l2); renderPin("That’s not it — try again."); }
      }
    });
  }

  function renderLocked(){
    var l = lockState();
    if(!l.until || Date.now() >= l.until){ renderPin(); return; }
    scrim.innerHTML =
      '<div class="gate-card" role="dialog" aria-modal="true" aria-label="Locked">'+
      '<div class="gate-emoji">⏳</div><h2>Too many tries</h2>'+
      '<p>The gate is locked for a bit. Come back in <b class="gate-timer"></b>.</p></div>';
    var timer = scrim.querySelector(".gate-timer");
    function tick(){
      var ms = l.until - Date.now();
      if(ms <= 0){ clearInterval(iv); writeJSON("fpqpGateLock", {fails:0, until:0}); chosen ? renderPin() : renderUsers(); return; }
      var m = Math.floor(ms/60000), s = Math.floor((ms%60000)/1000);
      timer.textContent = m+":"+(s<10?"0":"")+s;
    }
    var iv = setInterval(tick, 500); tick();
  }

  var l0 = lockState();
  if(l0.until && Date.now() < l0.until) renderLocked(); else renderUsers();
});

/* Switch-user helper (used by the 👤 chip app.js renders in the nav) */
window.fpqpSignOut = function(){
  try{ localStorage.removeItem("fpqpAuth"); }catch(e){}
  location.reload();
};
})();
