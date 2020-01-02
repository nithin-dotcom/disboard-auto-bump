"use strict";$(function(){window.disboard={},prepareNavbar(),prepareDropdown(),modal()}),window.prepareMuteServer=function(o,n){if(window.disboard.muteServerPrepared)return!1;window.disboard.muteServerPrepared=!0,n=n||"Unmute",$(".button-mute-server").click(function(e){e.preventDefault();var a=$(this).attr("data-server-id"),t=o+"/"+a;$.post(t).done(function(e){var t=$(".server-"+a);e.result&&(notie.alert({type:"success",text:e.message}),t.html('<div class="muted-successfully has-text-centered"><button class="button is-dark button-unmute-server" data-server-id="'+a+'">'+n+"</button></div>"))}).fail(function(e){notie.alert({type:"error",text:e.responseJSON.message})})}),$(document).on("click",".button-unmute-server",function(e){var t=$(this),a=t.attr("data-server-id"),n=o+"/"+a+"?unmute=1";$.post(n,function(e){t.hide(),notie.alert({type:"success",text:e.message})})})},window.prepareNavbar=function(){if(window.disboard.navbarPrepared)return!1;window.disboard.navbarPrepared=!0;function e(e){var t=$(e).scrollTop()/100;$("#header:not(.has-menu-opened)").css({background:"rgba(54, 62, 89,"+t+")","backdrop-filter":"blur("+t+"px)"})}$(document).scroll(function(){e(this)}).ready(function(){e(this)}),$(".navbar-burger").click(function(e){e.stopPropagation(),$(".navbar").toggleClass("has-menu-opened"),$(".navbar-menu").toggleClass("is-active")}),$(".navbar-menu").click(function(e){e.stopPropagation()}),$("html").click(function(){$(".navbar").removeClass("has-menu-opened"),$(".navbar-menu").removeClass("is-active")})};var modal=function(){$(".button-modal").click(function(){var e=$(this).data("target");$(e).addClass("is-active")}),$(".modal-close, .modal-background, .modal .button").not(".button[type=submit]").click(function(){$(".modal").removeClass("is-active")})};window.prepareDropdown=function(){$(document).click(function(){$(".dropdown").removeClass("is-active")}),$(".listing-card").on("mouseleave",function(e){$(this).find(".dropdown").removeClass("is-active")}),$(".dropdown:not(.is-hoverable)").click(function(e){e.stopPropagation(),$(this).toggleClass("is-active")})},window.prepareElasticText=function(){if(window.disboard.elasticTextPrepared)return!1;window.disboard.elasticTextPrepared=!0;for(var e=$(".is-elastic-text"),t=0,a=e.length;t<a;t++){var n=$(e[t]),o=n.height(),r=n.attr("data-et-max-height");if(r)var i=r;else i=240;o<240||n.addClass("long").attr("data-origin-height",n.height()).height(i).append($('       <div class="read-more" aria-label="Read more">         <button type="button">           <i class="icon icon-chevron-down"></i>           <i class="icon icon-chevron-up"></i>         </button>       </div>       ').click(function(){var e=$(this).parent(),t=e.attr("data-origin-height");e.hasClass("et-expanded")?e.height(i).removeClass("et-expanded"):e.height(t).addClass("et-expanded")}))}},window.prepareThumbs=function(i){$(".button-thumbs-up, .button-thumbs-down").click(function(e){if(e.originalEvent.isTrusted){var t=$(this),a=t.parent(),n=t.hasClass("button-thumbs-up"),o=t.data("id"),r=i+"/"+o;n||(r+="?like=0"),$.post(r,function(e){"delete"==e.result?a.removeClass("pressed"):(a.addClass("pressed"),a.find("button").removeClass("on"),t.addClass("on"))})}})},window.prepareSearch=function(n){var e=n.data("remote-url"),t=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.whitespace,queryTokenizer:Bloodhound.tokenizers.whitespace,remote:{url:e+"?q=%QUERY",wildcard:"%QUERY"}});n.typeahead({hint:!0,highlight:!0,minLength:2},{source:t,display:"name",templates:{suggestion:function(e){return'<div><span class="suggestion-name">'+e.name+'</span><span class="suggestion-count">('+e.count+")</span></div>"}}}),n.bind("typeahead:select",function(e,t){var a=t.name;$.ajax({method:"POST",url:"/log/search",data:{query:a,suggested:1}}).done(function(e){location.href="/servers/tag/"+a})}),$(".form-search").submit(function(e){e.preventDefault(),e.stopImmediatePropagation();var t=n.val(),a=this;$.ajax({method:"POST",url:"/log/search",data:{query:t}}).done(function(e){a.submit()})})},window.prepareShareButtons=function(){var t=$(".share-buttons");$(document).scroll(function(){!function(e){120<$(e).scrollTop()?t.addClass("scrolled"):t.removeClass("scrolled")}(this)})},window.prepareBumpButton=function(i,s){function d(e,t){var a=Math.floor(e%86400/3600),n=Math.floor(e%3600/60),o=Math.floor(e%60);a=a<10?"0"+a:a,n=n<10?"0"+n:n,o=o<10?"0"+o:o,t.text(a+":"+n+":"+o)}$(".button-bump").each(function(e,t){var a=(t=$(t)).attr("data-remaining");if(a){var n=t.find(".text"),o=n.attr("data-origin-text");t.attr("disabled",!0),d(a,n);var r=setInterval(function(){d(a-=1,n),a<=0&&(t.attr("disabled",!1),n.text(o),clearInterval(r))},1e3)}t.click(function(e){if(e.preventDefault(),true){var n=$(this);grecaptcha.execute(i,{action:"server/bump"}).then(function(e){var t=n.attr("href"),a=t+t.substring(0,t.indexOf("?"))+"?"+s+"="+e;location.href=a})}})})},window.logJoin=function(e){var t={};t=void 0!==window.disboard.joinLogParams?window.disboard.joinLogParams:{page:null,from:null,keyword:null};var a=e.attr("data-id"),n=e.attr("rank"),o=t.page,r=t.from,i=t.keyword,s={server_id:a,path:document.location.pathname,params:document.location.search,rank:n,page:o,from:r,keyword:i};$.ajax({method:"POST",url:"/log/join",data:s})},window.execCopy=function(e){var t=document.createElement("div");t.appendChild(document.createElement("pre")).textContent=e;var a=t.style;a.position="fixed",a.left="-100%",document.body.appendChild(t),document.getSelection().selectAllChildren(t);var n=document.execCommand("copy");return document.body.removeChild(t),n};!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.notie=t():e.notie=t()}(this,function(){return a={},s.m=n=[function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,i,t){"use strict";(function(e){var t,n,s,a,b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};a=function(){return a={},s.m=n=[function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});function s(){return new Promise(function(e){return setTimeout(e,0)})}function p(t){return new Promise(function(e){return setTimeout(e,1e3*t)})}function j(){document.activeElement&&document.activeElement.blur()}function N(){return"notie-"+"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}function a(){return U.transitionSelector+" "+U.transitionDuration+"s "+U.transitionCurve}function P(e){return 13===e.keyCode}function F(e){return 27===e.keyCode}function Y(e,t){e.classList.add(U.classes.container),e.style[t]="-10000px",document.body.appendChild(e),e.style[t]="-"+e.offsetHeight+"px",e.listener&&window.addEventListener("keydown",e.listener),s().then(function(){e.style.transition=a(),e.style[t]=0})}function _(e,t){var n=document.getElementById(e);n&&(n.style[t]="-"+n.offsetHeight+"px",n.listener&&window.removeEventListener("keydown",n.listener),p(U.transitionDuration).then(function(){n.parentNode&&n.parentNode.removeChild(n)}))}function z(e,t){var n=document.createElement("div");n.id=U.ids.overlay,n.classList.add(U.classes.overlay),n.classList.add(U.classes.backgroundOverlay),n.style.opacity=0,e&&U.overlayClickDismiss&&(n.onclick=function(){_(e.id,t),B()}),document.body.appendChild(n),s().then(function(){n.style.transition=a(),n.style.opacity=U.overlayOpacity})}function i(e,t,n){var s=e.text,a=e.submitText,i=void 0===a?"Submit":a,c=e.cancelText,o=void 0===c?"Cancel":c,r=e.submitCallback,l=e.cancelCallback,d=e.position,u=void 0===d?U.positions.input||u.top:d,p=function(e,t){var n={};for(var s in e)0<=t.indexOf(s)||Object.prototype.hasOwnProperty.call(e,s)&&(n[s]=e[s]);return n}(e,["text","submitText","cancelText","submitCallback","cancelCallback","position"]);j(),J();var f=document.createElement("div"),m=N();f.id=m;var v=document.createElement("div");v.classList.add(U.classes.textbox),v.classList.add(U.classes.backgroundInfo),v.innerHTML='<div class="'+U.classes.textboxInner+'">'+s+"</div>";var b=document.createElement("input");b.classList.add(U.classes.inputField),b.setAttribute("autocapitalize",p.autocapitalize||"none"),b.setAttribute("autocomplete",p.autocomplete||"off"),b.setAttribute("autocorrect",p.autocorrect||"off"),b.setAttribute("autofocus",p.autofocus||"true"),b.setAttribute("inputmode",p.inputmode||"verbatim"),b.setAttribute("max",p.max||""),b.setAttribute("maxlength",p.maxlength||""),b.setAttribute("min",p.min||""),b.setAttribute("minlength",p.minlength||""),b.setAttribute("placeholder",p.placeholder||""),b.setAttribute("spellcheck",p.spellcheck||"default"),b.setAttribute("step",p.step||"any"),b.setAttribute("type",p.type||"text"),b.value=p.value||"",p.allowed&&(b.oninput=function(){var e=void 0;if(Array.isArray(p.allowed)){for(var t="",n=p.allowed,s=0;s<n.length;s++)"an"===n[s]?t+="0-9a-zA-Z":"a"===n[s]?t+="a-zA-Z":"n"===n[s]&&(t+="0-9"),"s"===n[s]&&(t+=" ");e=new RegExp("[^"+t+"]","g")}else"object"===L(p.allowed)&&(e=p.allowed);b.value=b.value.replace(e,"")});var x=document.createElement("div");x.classList.add(U.classes.button),x.classList.add(U.classes.elementHalf),x.classList.add(U.classes.backgroundSuccess),x.innerHTML=i,x.onclick=function(){_(m,u),B(),r?r(b.value):t&&t(b.value)};var y=document.createElement("div");y.classList.add(U.classes.button),y.classList.add(U.classes.elementHalf),y.classList.add(U.classes.backgroundError),y.innerHTML=o,y.onclick=function(){_(m,u),B(),l?l(b.value):n&&n(b.value)},f.appendChild(v),f.appendChild(b),f.appendChild(x),f.appendChild(y),f.listener=function(e){P(e)?x.click():F(e)&&y.click()},Y(f,u),b.focus(),z(f,u)}var L="function"==typeof Symbol&&"symbol"===b(Symbol.iterator)?function(e){return void 0===e?"undefined":b(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":b(e)},c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},o="top",U={alertTime:3,dateMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],overlayClickDismiss:!0,overlayOpacity:.75,transitionCurve:"ease",transitionDuration:.3,transitionSelector:"all",classes:{container:"notie-container",textbox:"notie-textbox",textboxInner:"notie-textbox-inner",button:"notie-button",element:"notie-element",elementHalf:"notie-element-half",elementThird:"notie-element-third",overlay:"notie-overlay",backgroundSuccess:"notie-background-success",backgroundWarning:"notie-background-warning",backgroundError:"notie-background-error",backgroundInfo:"notie-background-info",backgroundNeutral:"notie-background-neutral",backgroundOverlay:"notie-background-overlay",alert:"notie-alert",inputField:"notie-input-field",selectChoiceRepeated:"notie-select-choice-repeated",dateSelectorInner:"notie-date-selector-inner",dateSelectorUp:"notie-date-selector-up"},ids:{overlay:"notie-overlay"},positions:{alert:o,force:o,confirm:o,input:o,select:"bottom",date:o}},r=t.setOptions=function(e){U=c({},U,e,{classes:c({},U.classes,e.classes),ids:c({},U.ids,e.ids),positions:c({},U.positions,e.positions)})},m={1:U.classes.backgroundSuccess,success:U.classes.backgroundSuccess,2:U.classes.backgroundWarning,warning:U.classes.backgroundWarning,3:U.classes.backgroundError,error:U.classes.backgroundError,4:U.classes.backgroundInfo,info:U.classes.backgroundInfo,5:U.classes.backgroundNeutral,neutral:U.classes.backgroundNeutral},B=function(){var e=document.getElementById(U.ids.overlay);e.style.opacity=0,p(U.transitionDuration).then(function(){e.parentNode&&e.parentNode.removeChild(e)})},J=t.hideAlerts=function(e){var t=document.getElementsByClassName(U.classes.alert);if(t.length){for(var n=0;n<t.length;n++){var s=t[n];_(s.id,s.position)}e&&p(U.transitionDuration).then(function(){return e()})}},l=t.alert=function(e){var t=e.type,n=void 0===t?4:t,s=e.text,a=e.time,i=void 0===a?U.alertTime:a,c=e.stay,o=void 0!==c&&c,r=e.position,l=void 0===r?U.positions.alert||l.top:r;j(),J();var d=document.createElement("div"),u=N();d.id=u,d.position=l,d.classList.add(U.classes.textbox),d.classList.add(m[n]),d.classList.add(U.classes.alert),d.innerHTML='<div class="'+U.classes.textboxInner+'">'+s+"</div>",d.onclick=function(){return _(u,l)},d.listener=function(e){(P(e)||F(e))&&J()},Y(d,l),i&&i<1&&(i=1),!o&&i&&p(i).then(function(){return _(u,l)})},d=t.force=function(e,t){var n=e.type,s=void 0===n?5:n,a=e.text,i=e.buttonText,c=void 0===i?"OK":i,o=e.callback,r=e.position,l=void 0===r?U.positions.force||l.top:r;j(),J();var d=document.createElement("div"),u=N();d.id=u;var p=document.createElement("div");p.classList.add(U.classes.textbox),p.classList.add(U.classes.backgroundInfo),p.innerHTML='<div class="'+U.classes.textboxInner+'">'+a+"</div>";var f=document.createElement("div");f.classList.add(U.classes.button),f.classList.add(m[s]),f.innerHTML=c,f.onclick=function(){_(u,l),B(),o?o():t&&t()},d.appendChild(p),d.appendChild(f),d.listener=function(e){P(e)&&f.click()},Y(d,l),z()},u=t.confirm=function(e,t,n){var s=e.text,a=e.submitText,i=void 0===a?"Yes":a,c=e.cancelText,o=void 0===c?"Cancel":c,r=e.submitCallback,l=e.cancelCallback,d=e.position,u=void 0===d?U.positions.confirm||u.top:d;j(),J();var p=document.createElement("div"),f=N();p.id=f;var m=document.createElement("div");m.classList.add(U.classes.textbox),m.classList.add(U.classes.backgroundInfo),m.innerHTML='<div class="'+U.classes.textboxInner+'">'+s+"</div>";var v=document.createElement("div");v.classList.add(U.classes.button),v.classList.add(U.classes.elementHalf),v.classList.add(U.classes.backgroundSuccess),v.innerHTML=i,v.onclick=function(){_(f,u),B(),r?r():t&&t()};var b=document.createElement("div");b.classList.add(U.classes.button),b.classList.add(U.classes.elementHalf),b.classList.add(U.classes.backgroundError),b.innerHTML=o,b.onclick=function(){_(f,u),B(),l?l():n&&n()},p.appendChild(m),p.appendChild(v),p.appendChild(b),p.listener=function(e){P(e)?v.click():F(e)&&b.click()},Y(p,u),z(p,u)};t.input=i;var f=t.select=function(e,t){var n=e.text,s=e.cancelText,a=void 0===s?"Cancel":s,i=e.cancelCallback,r=e.choices,c=e.position,l=void 0===c?U.positions.select||l.top:c;j(),J();var d=document.createElement("div"),u=N();d.id=u;var o=document.createElement("div");o.classList.add(U.classes.textbox),o.classList.add(U.classes.backgroundInfo),o.innerHTML='<div class="'+U.classes.textboxInner+'">'+n+"</div>",d.appendChild(o),r.forEach(function(e,t){var n=e.type,s=void 0===n?1:n,a=e.text,i=e.handler,c=document.createElement("div");c.classList.add(m[s]),c.classList.add(U.classes.button),c.classList.add(U.classes.selectChoice);var o=r[t+1];o&&!o.type&&(o.type=1),o&&o.type===s&&c.classList.add(U.classes.selectChoiceRepeated),c.innerHTML=a,c.onclick=function(){_(u,l),B(),i()},d.appendChild(c)});var p=document.createElement("div");p.classList.add(U.classes.backgroundNeutral),p.classList.add(U.classes.button),p.innerHTML=a,p.onclick=function(){_(u,l),B(),i?i():t&&t()},d.appendChild(p),d.listener=function(e){F(e)&&p.click()},Y(d,l),z(d,l)},v=t.date=function(e,t,n){var s=e.value,a=void 0===s?new Date:s,i=e.submitText,c=void 0===i?"OK":i,o=e.cancelText,r=void 0===o?"Cancel":o,l=e.submitCallback,d=e.cancelCallback,u=e.position,p=void 0===u?U.positions.date||p.top:u;j(),J();function f(e){L.innerHTML=U.dateMonths[e.getMonth()],g.innerHTML=e.getDate(),h.innerHTML=e.getFullYear()}function m(e){f(a)}function v(e){var t=new Date(a.getFullYear(),a.getMonth()+e+1,0).getDate();a.getDate()>t&&a.setDate(t),a.setMonth(a.getMonth()+e),f(a)}function b(e){a.setDate(a.getDate()+e),f(a)}function x(e){a.getFullYear()+e<0?a.setFullYear(0):a.setFullYear(a.getFullYear()+e),f(a)}var y="&#9662",L=document.createElement("div"),g=document.createElement("div"),h=document.createElement("div"),k=document.createElement("div"),C=N();k.id=C;var E=document.createElement("div");E.classList.add(U.classes.backgroundInfo);var T=document.createElement("div");T.classList.add(U.classes.dateSelectorInner);var M=document.createElement("div");M.classList.add(U.classes.button),M.classList.add(U.classes.elementThird),M.classList.add(U.classes.dateSelectorUp),M.innerHTML=y;var H=document.createElement("div");H.classList.add(U.classes.button),H.classList.add(U.classes.elementThird),H.classList.add(U.classes.dateSelectorUp),H.innerHTML=y;var S=document.createElement("div");S.classList.add(U.classes.button),S.classList.add(U.classes.elementThird),S.classList.add(U.classes.dateSelectorUp),S.innerHTML=y,L.classList.add(U.classes.element),L.classList.add(U.classes.elementThird),L.innerHTML=U.dateMonths[a.getMonth()],g.classList.add(U.classes.element),g.classList.add(U.classes.elementThird),g.setAttribute("contentEditable",!0),g.addEventListener("input",function(e){var t=new Date(a.getFullYear(),a.getMonth()+1,0).getDate(),n=e.target.textContent.replace(/^0+/,"").replace(/[^\d]/g,"").slice(0,2);Number(n)>t&&(n=t.toString()),e.target.textContent=n,Number(n)<1&&(n="1"),a.setDate(Number(n))}),g.addEventListener("blur",m),g.innerHTML=a.getDate(),h.classList.add(U.classes.element),h.classList.add(U.classes.elementThird),h.setAttribute("contentEditable",!0),h.addEventListener("input",function(e){var t=e.target.textContent.replace(/^0+/,"").replace(/[^\d]/g,"").slice(0,4);e.target.textContent=t,a.setFullYear(Number(t))}),h.addEventListener("blur",m),h.innerHTML=a.getFullYear();var w=document.createElement("div");w.classList.add(U.classes.button),w.classList.add(U.classes.elementThird),w.innerHTML=y;var O=document.createElement("div");O.classList.add(U.classes.button),O.classList.add(U.classes.elementThird),O.innerHTML=y;var A=document.createElement("div");A.classList.add(U.classes.button),A.classList.add(U.classes.elementThird),A.innerHTML=y,M.onclick=function(){return v(1)},H.onclick=function(){return b(1)},S.onclick=function(){return x(1)},w.onclick=function(){return v(-1)},O.onclick=function(){return b(-1)},A.onclick=function(){return x(-1)};var D=document.createElement("div");D.classList.add(U.classes.button),D.classList.add(U.classes.elementHalf),D.classList.add(U.classes.backgroundSuccess),D.innerHTML=c,D.onclick=function(){_(C,p),B(),l?l(a):t&&t(a)};var I=document.createElement("div");I.classList.add(U.classes.button),I.classList.add(U.classes.elementHalf),I.classList.add(U.classes.backgroundError),I.innerHTML=r,I.onclick=function(){_(C,p),B(),d?d(a):n&&n(a)},T.appendChild(M),T.appendChild(H),T.appendChild(S),T.appendChild(L),T.appendChild(g),T.appendChild(h),T.appendChild(w),T.appendChild(O),T.appendChild(A),E.appendChild(T),k.appendChild(E),k.appendChild(D),k.appendChild(I),k.listener=function(e){P(e)?D.click():F(e)&&I.click()},Y(k,p),z(k,p)};t.default={alert:l,force:d,confirm:u,input:i,select:f,date:v,setOptions:r,hideAlerts:J}}],s.c=a,s.i=function(e){return e},s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0);function s(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}var n,a},"object"===b(i)&&"object"===b(e)?e.exports=a():(n=[],void 0===(s="function"==typeof(t=a)?t.apply(i,n):t)||(e.exports=s))}).call(i,t(0)(e))}],s.c=a,s.i=function(e){return e},s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1);function s(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,s),t.l=!0,t.exports}var n,a});