!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),body:document.querySelector("body")},e=null;t.start.addEventListener("click",function(a){a.target.disabled=!0,t.stop.disabled=!1,e=setInterval(function(){var e="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));t.body.style.backgroundColor=e},1e3)}),t.stop.addEventListener("click",function(a){a.target.disabled=!0,t.start.disabled=!1,clearInterval(e)})}();
//# sourceMappingURL=01-color-switcher.4e6e2fd7.js.map