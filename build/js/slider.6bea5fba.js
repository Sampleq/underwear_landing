parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xStd":[function(require,module,exports) {
function e(e,o){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=t(e))||o&&e&&"number"==typeof e.length){n&&(e=n);var r=0,d=function(){};return{s:d,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:d}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,i=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,l=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw l}}}}function t(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var n=document.querySelectorAll(".slider__card"),r=document.querySelector(".slider__dots");function d(){for(var e=0;e<n.length/3;)r.insertAdjacentHTML("beforeend",'<div class="slider__dot"></div>'),e++,console.log(e);for(;e<n.length/2;)r.insertAdjacentHTML("beforeend",'<div class="slider__dot slider__dot_2card"></div>'),e++,console.log(e);for(;e<n.length;)r.insertAdjacentHTML("beforeend",'<div class="slider__dot slider__dot_1card"></div>'),e++,console.log(e)}d();var l=document.querySelector(".btn_arrow_l"),i=document.querySelector(".btn_arrow_r"),s=document.querySelector(".slider__cards-cont"),c=document.querySelector(".slider__wrapper"),a=document.querySelectorAll(".slider__dot");a[0].classList.add("slider__dot_active"),s.style.transition="0.3s",c.style.transition="0.3s";var _,u,f,v,h,w,y=0;function g(){_=window.innerWidth<375?32.4:window.innerWidth<425?37.8:40.8}function m(e){c.style.transform="translateX(-"+e*_+"rem)"}function S(){var t,o=e(a);try{for(o.s();!(t=o.n()).done;){t.value.classList.remove("slider__dot_active")}}catch(n){o.e(n)}finally{o.f()}}function A(){y--,window.innerWidth<825?y<0&&(y=n.length-1):window.innerWidth<1250?y<0&&(y=n.length-2):y<0&&(y=n.length-3),console.log(y),g(),m(y),S(),window.innerWidth<825?(a=r.querySelectorAll(".slider__dot"),console.log(a),a[y].classList.add("slider__dot_active")):window.innerWidth<1250?(a=r.querySelectorAll(".slider__dot:not(.slider__dot_1card)"),console.log(a),a[Math.floor(y/2)].classList.add("slider__dot_active")):(a=r.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)"),console.log(a),a[Math.round(y/3)].classList.add("slider__dot_active"))}function p(){y++,window.innerWidth<825?y>=n.length&&(y=0):window.innerWidth<1250?y>=n.length-1&&(y=0):y>=n.length-2&&(y=0),g(),m(y),S(),window.innerWidth<825?(a=r.querySelectorAll(".slider__dot"),console.log(a),a[y].classList.add("slider__dot_active")):window.innerWidth<1250?(a=r.querySelectorAll(".slider__dot:not(.slider__dot_1card)"),console.log(a),a[Math.floor(y/2)].classList.add("slider__dot_active")):(a=r.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)"),console.log(a),a[Math.round(y/3)].classList.add("slider__dot_active"))}function L(){S(),window.innerWidth<825?(a=r.querySelectorAll(".slider__dot"),console.log(a),a[y].classList.add("slider__dot_active")):window.innerWidth<1250?(a=r.querySelectorAll(".slider__dot:not(.slider__dot_1card)"),console.log(a),a[Math.floor(y/2)].classList.add("slider__dot_active")):(a=r.querySelectorAll(".slider__dot:not(.slider__dot_2card):not(.slider__dot_1card)"),console.log(a),a[Math.round(y/3)].classList.add("slider__dot_active")),a.forEach(function(e,t){e.onclick=function(){y=window.innerWidth<825?t:window.innerWidth<1250?2*t:3*t,g(),m(y),S(),a[t].classList.add("slider__dot_active")}})}function q(e){e.preventDefault(),f=e.clientX,console.log(f),console.log("distanceX = xEnd - xStart = "+(f-u)),h=f-u,console.log(h),h>10&&A(),h<-10&&p()}i.onclick=p,l.onclick=A,r.onmouseenter=L,r.ontouchstart=L,c.onmousedown=function(e){e.preventDefault(),u=e.clientX,console.log(u)},c.ontouchstart=function(e){e.preventDefault(),u=e.clientX,console.log(u)},c.addEventListener("mouseup",function(e){q(e)},{passive:!1}),c.addEventListener("touchstart",function(e){q(e)},{passive:!1}),c.addEventListener("touchmove",function(e){q(e)},{passive:!1});
},{}]},{},["xStd"], null)
//# sourceMappingURL=../js/slider.6bea5fba.js.map