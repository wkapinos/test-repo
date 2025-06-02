(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();const s="https://wpfanzxyqjyvhcqmdshx.supabase.co",c="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZmFuenh5cWp5dmhjcW1kc2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjU1MjAsImV4cCI6MjA2MzI0MTUyMH0.9tSxGFxw52Xkmqq-7FxSLAN0_I3eBkec4mfEG5RffL4";async function u(){try{const e=await fetch(`${s}/rest/v1/Articles`,{method:"GET",headers:{"Content-Type":"application/json",apikey:c}});if(!e.ok){const r=await e.json();throw console.error("Błąd HTTP podczas pobierania artykułów:",e.status,e.statusText,r),new Error(`Błąd pobierania danych: ${e.statusText||"Nieznany błąd"}`)}return await e.json()}catch(e){return console.error("Wystąpił błąd podczas wykonywania zapytania:",e),null}}async function l(e){try{const t=await fetch(`${s}/rest/v1/Articles`,{method:"POST",headers:{"Content-Type":"application/json",apikey:c,Prefer:"return=minimal"},body:JSON.stringify(e)});if(!t.ok){const r=await t.json();throw console.error("Błąd podczas tworzenia artykułu:",t.status,t.statusText,r),new Error(`Błąd tworzenia artykułu: ${t.statusText||"Nieznany błąd"}`)}return!0}catch(t){throw console.error("Wystąpił błąd podczas tworzenia artykułu:",t),t}}function d(e){let t='<table class="table table-striped table-bordered">';return t+="<tr><th>Tytuł</th><th>Podtytuł</th><th>Autor</th><th>Data utworzenia</th><th>Treść</th></tr>",e.forEach(r=>{const n=new Date(r.created_at).toLocaleDateString("pl-PL");t+=`<tr>
            <td>${r.title}</td>
            <td>${r.subtitle}</td>
            <td>${r.author}</td>
            <td>${n}</td>
            <td>${r.content}</td>
        </tr>`}),t+="</table>",t}function p(){return`
        <div class="form-container">
            <h2>Dodaj nowy artykuł</h2>
            <form id="articleForm">
                <div class="form-group">
                    <label for="title">Tytuł:</label>
                    <input type="text" id="title" name="title" required>
                </div>
                
                <div class="form-group">
                    <label for="subtitle">Podtytuł:</label>
                    <input type="text" id="subtitle" name="subtitle" required>
                </div>
                
                <div class="form-group">
                    <label for="author">Autor:</label>
                    <input type="text" id="author" name="author" required>
                </div>
                
                <div class="form-group">
                    <label for="content">Treść:</label>
                    <textarea id="content" name="content" rows="5" required></textarea>
                </div>
                
                <button type="submit" class="submit-btn">Dodaj artykuł</button>
            </form>
            <div id="message"></div>
        </div>
    `}async function y(e){e.preventDefault();const t=e.target,r=new FormData(t),n=document.getElementById("message"),o={title:r.get("title"),subtitle:r.get("subtitle"),author:r.get("author"),content:r.get("content")};try{n.innerHTML='<p class="loading">Dodawanie artykułu...</p>',await l(o),n.innerHTML='<p class="success">Artykuł został dodany pomyślnie!</p>',t.reset(),setTimeout(async()=>{await f(),n.innerHTML=""},2e3)}catch(a){n.innerHTML=`<p class="error">Błąd: ${a.message}</p>`}}async function f(){const e=await u();if(e){const t=d(e);document.querySelector("#articles-container").innerHTML=t}}async function m(){const e=await u();if(e){const t=d(e),r=p();document.querySelector("#app").innerHTML=`
            <div id="articles-container">${t}</div>
            ${r}
        `,document.getElementById("articleForm").addEventListener("submit",y)}else document.querySelector("#app").innerHTML="<p>Błąd podczas ładowania artykułów.</p>"}m();
