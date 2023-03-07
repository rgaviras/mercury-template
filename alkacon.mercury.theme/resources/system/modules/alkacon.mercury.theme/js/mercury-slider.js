"use strict";(self.webpackChunkmercury_template=self.webpackChunkmercury_template||[]).push([[108],{283:function(n,e,t){function r(n){return"number"==typeof n}function i(n){return"[object Object]"===Object.prototype.toString.call(n)}function o(n){return i(n)||function(n){return Array.isArray(n)}(n)}function a(n){return Math.abs(n)}function c(n){return n?n/a(n):0}function u(n,e){return a(n-e)}function s(n){return f(n).map(Number)}function l(n){return n[d(n)]}function d(n){return Math.max(0,n.length-1)}function f(n){return Object.keys(n)}function p(n,e){return[n,e].reduce((function(n,e){return f(e).forEach((function(t){var r=n[t],o=e[t],a=i(r)&&i(o);n[t]=a?p(r,o):o})),n}),{})}function g(n,e){var t=f(n),r=f(e);return t.length===r.length&&t.every((function(t){var r=n[t],i=e[t];return"function"==typeof r?"".concat(r)==="".concat(i):o(r)&&o(i)?g(r,i):r===i}))}function v(n,e){var t={start:function(){return 0},center:function(n){return i(n)/2},end:i};function i(n){return e-n}return{measure:function(i){return r(n)?e*Number(n):t[n](i)}}}function m(n,e){var t=a(n-e);function r(e){return e<n}function i(n){return n>e}function o(n){return r(n)||i(n)}return{length:t,max:e,min:n,constrain:function(t){return o(t)?r(t)?n:e:t},reachedAny:o,reachedMax:i,reachedMin:r,removeOffset:function(n){return t?n-t*Math.ceil((n-e)/t):n}}}function h(n,e,t){var r=m(0,n),i=r.min,o=r.constrain,c=n+1,u=s(e);function s(n){return t?a((c+n)%c):o(n)}function l(){return u}function d(n){return u=s(n),f}var f={add:function(n){return d(l()+n)},clone:function(){return h(n,l(),t)},get:l,set:d,min:i,max:n};return f}function y(){var n=[];var e={add:function(t,r,i,o){return void 0===o&&(o={passive:!0}),t.addEventListener(r,i,o),n.push((function(){return t.removeEventListener(r,i,o)})),e},removeAll:function(){return n=n.filter((function(n){return n()})),e}};return e}function x(n){var e=n;function t(n){return e/=n,o}function i(n){return r(n)?n:n.get()}var o={add:function(n){return e+=i(n),o},divide:t,get:function(){return e},multiply:function(n){return e*=n,o},normalize:function(){return 0!==e&&t(e),o},set:function(n){return e=i(n),o},subtract:function(n){return e-=i(n),o}};return o}function b(n,e,t,r,i,o,s,l,d,f,p,g,v,m,h,b){var S=n.cross,E=["INPUT","SELECT","TEXTAREA"],w={passive:!1},M=x(0),A=y(),L=y(),I=v.measure(20),k={mouse:300,touch:400},O={mouse:500,touch:600},T=h?5:16,N=1,P=0,z=0,B=!1,D=!1,V=!1,C=!1;function q(n){if(!((C=!i.isTouchEvent(n))&&0!==n.button||(e=n.target,a=e.nodeName||"",E.indexOf(a)>-1))){var e,a,c=u(r.get(),o.get())>=2,s=C||!c;B=!0,i.pointerDown(n),M.set(r),r.set(o),d.useBaseMass().useSpeed(80),function(){var n=C?document:t;L.add(n,"touchmove",H,w).add(n,"touchend",U).add(n,"mousemove",H,w).add(n,"mouseup",U)}(),P=i.readPoint(n),z=i.readPoint(n,S),g.emit("pointerDown"),s&&(V=!1)}}function H(n){if(!D&&!C){if(!n.cancelable)return U(n);var t=i.readPoint(n),o=i.readPoint(n,S),a=u(t,P),c=u(o,z);if(!(D=a>c)&&!V)return U(n)}var l=i.pointerMove(n);!V&&l&&(V=!0),s.start(),r.add(e.apply(l)),n.preventDefault()}function U(n){var t=f.byDistance(0,!1).index!==p.get(),o=i.pointerUp(n)*(h?O:k)[C?"mouse":"touch"],s=function(n,e){var t=p.clone().add(-1*c(n)),r=t.get()===p.min||t.get()===p.max,i=f.byDistance(n,!h).distance;return h||a(n)<I?i:!m&&r?.4*i:b&&e?.5*i:f.byIndex(t.get(),0).distance}(e.apply(o),t),v=function(n,e){if(0===n||0===e)return 0;if(a(n)<=a(e))return 0;var t=u(a(n),a(e));return a(t/n)}(o,s),y=u(r.get(),M.get())>=.5,x=t&&v>.75,S=a(o)<I,E=x?10:T,w=x?N+2.5*v:N;y&&!C&&(V=!0),D=!1,B=!1,L.removeAll(),d.useSpeed(S?9:E).useMass(w),l.distance(s,!h),C=!1,g.emit("pointerUp")}function R(n){V&&(n.stopPropagation(),n.preventDefault())}return{addActivationEvents:function(){var n=t;A.add(n,"dragstart",(function(n){return n.preventDefault()}),w).add(n,"touchmove",(function(){}),w).add(n,"touchend",(function(){})).add(n,"touchstart",q).add(n,"mousedown",q).add(n,"touchcancel",U).add(n,"contextmenu",U).add(n,"click",R,!0)},clickAllowed:function(){return!V},pointerDown:function(){return B},removeAllEvents:function(){A.removeAll(),L.removeAll()}}}function S(n,e,t){var r,i,o=(r=2,i=Math.pow(10,r),function(n){return Math.round(n*i)/i}),a=x(0),u=x(0),s=x(0),l=0,d=e,f=t;function p(n){return d=n,v}function g(n){return f=n,v}var v={direction:function(){return l},seek:function(e){s.set(e).subtract(n);var t,r,i,o,p=(t=s.get(),(i=0)+(t-(r=0))/(100-r)*(d-i));return l=c(s.get()),s.normalize().multiply(p).subtract(a),(o=s).divide(f),u.add(o),v},settle:function(e){var t=e.get()-n.get(),r=!o(t);return r&&n.set(e),r},update:function(){a.add(u),n.add(a),u.multiply(0)},useBaseMass:function(){return g(t)},useBaseSpeed:function(){return p(e)},useMass:g,useSpeed:p};return v}function E(n,e,t,r,i){var o=i.measure(10),c=i.measure(50),u=.85,s=!1;return{constrain:function(i){if(!s&&n.reachedAny(t.get())&&n.reachedAny(e.get())){var l=n.reachedMin(e.get())?"min":"max",d=a(n[l]-e.get()),f=t.get()-e.get(),p=Math.min(d/c,u);t.subtract(f*p),!i&&a(f)<o&&(t.set(n.constrain(t.get())),r.useSpeed(10).useMass(3))}},toggleActive:function(n){s=!n}}}function w(n,e,t,r){var i=m(-e+n,t[0]),o=t.map(i.constrain);return{snapsContained:function(){if(e<=n)return[i.max];if("keepSnaps"===r)return o;var t=function(){var n=o[0],e=l(o),t=o.lastIndexOf(n),r=o.indexOf(e)+1;return m(t,r)}(),a=t.min,c=t.max;return o.slice(a,c)}()}}function M(n,e,t,r){var i=m(e.min+.1,e.max+.1),o=i.reachedMin,a=i.reachedMax;return{loop:function(e){if(function(n){return 1===n?a(t.get()):-1===n&&o(t.get())}(e)){var i=n*(-1*e);r.forEach((function(n){return n.add(i)}))}}}}function A(n){var e=n.max,t=n.length;return{get:function(n){return(n-e)/-t}}}function L(n,e,t,r,i){var o=r.reachedAny,u=r.removeOffset,s=r.constrain;function l(n){return n.concat().sort((function(n,e){return a(n)-a(e)}))[0]}function d(e,r){var i=[e,e+t,e-t];return n?l(r?i.filter((function(n){return c(n)===r})):i):i[0]}return{byDistance:function(t,r){var c=i.get()+t,l=function(t){var r=n?u(t):s(t);return{index:e.map((function(n){return n-r})).map((function(n){return d(n,0)})).map((function(n,e){return{diff:n,index:e}})).sort((function(n,e){return a(n.diff)-a(e.diff)}))[0].index,distance:r}}(c),f=l.index,p=l.distance,g=!n&&o(c);return!r||g?{index:f,distance:t}:{index:f,distance:t+d(e[f]-p,0)}},byIndex:function(n,t){return{index:n,distance:d(e[n]-i.get(),t)}},shortcut:d}}function I(n,e,t){var r="x"===n.scroll?function(n){return"translate3d(".concat(n,"px,0px,0px)")}:function(n){return"translate3d(0px,".concat(n,"px,0px)")},i=t.style,o=!1;return{clear:function(){o||(i.transform="",t.getAttribute("style")||t.removeAttribute("style"))},to:function(n){o||(i.transform=r(e.apply(n.get())))},toggleActive:function(n){o=!n}}}function k(n,e,t,r,i,o,a,c,u){var l,d=s(i),f=s(i).reverse(),p=(l=o[0]-1,m(v(f,l),"end")).concat(function(){var n=t-o[0]-1,e=v(d,n);return m(e,"start")}());function g(n,e){return n.reduce((function(n,e){return n-i[e]}),e)}function v(n,e){return n.reduce((function(n,t){return g(n,e)>0?n.concat([t]):n}),[])}function m(t,i){var o="start"===i,s=o?-r:r,l=a.findSlideBounds([s]);return t.map((function(t){var i=o?0:-r,a=o?r:0,s=l.filter((function(n){return n.index===t}))[0][o?"end":"start"],d=x(-1),f=x(-1),p=I(n,e,u[t]);return{index:t,location:f,translate:p,target:function(){return d.set(c.get()>s?i:a)}}}))}return{canLoop:function(){return p.every((function(n){var e=n.index;return g(d.filter((function(n){return n!==e})),t)<=.1}))},clear:function(){p.forEach((function(n){return n.translate.clear()}))},loop:function(){p.forEach((function(n){var e=n.target,t=n.translate,r=n.location,i=e();i.get()!==r.get()&&(0===i.get()?t.clear():t.to(i),r.set(i))}))},loopPoints:p}}function O(n,e,t,r,i,o,a){var c=i.removeOffset,u=i.constrain,s=.5,l=o?[0,e,-e]:[0],d=f(l,a);function f(e,i){var o=e||l,a=function(n){var e=n||0;return t.map((function(n){return m(s,n-s).constrain(n*e)}))}(i);return o.reduce((function(e,i){var o=r.map((function(e,r){return{start:e-t[r]+a[r]+i,end:e+n-a[r]+i,index:r}}));return e.concat(o)}),[])}return{check:function(n,e){var t=o?c(n):u(n);return(e||d).reduce((function(n,e){var r=e.index,i=e.start,o=e.end;return!(-1!==n.indexOf(r))&&(i<t&&o>t)?n.concat([r]):n}),[])},findSlideBounds:f}}function T(n,e,t){var i=r(t);return{groupSlides:function(r){return i?function(n,e){return s(n).filter((function(n){return n%e==0})).map((function(t){return n.slice(t,t+e)}))}(r,t):function(t){return s(t).reduce((function(t,r){var i=e.slice(l(t),r+1).reduce((function(n,e){return n+e}),0);return!r||i>n?t.concat(r):t}),[]).map((function(n,e,r){return t.slice(n,r[e+1])}))}(r)}}}function N(n,e,t,r,i){var o=r.align,c=r.axis,u=r.direction,f=r.startIndex,p=r.inViewThreshold,g=r.loop,N=r.speed,P=r.dragFree,z=r.slidesToScroll,B=r.skipSnaps,D=r.containScroll,V=e.getBoundingClientRect(),C=t.map((function(n){return n.getBoundingClientRect()})),q=function(n){var e="rtl"===n?-1:1;return{apply:function(n){return n*e}}}(u),H=function(n,e){var t="y"===n?"y":"x";return{scroll:t,cross:"y"===n?"x":"y",startEdge:"y"===t?"top":"rtl"===e?"right":"left",endEdge:"y"===t?"bottom":"rtl"===e?"left":"right",measureSize:function(n){var e=n.width,r=n.height;return"x"===t?e:r}}}(c,u),U=H.measureSize(V),R=function(n){return{measure:function(e){return n*(e/100)}}}(U),F=v(o,U),j=!g&&""!==D,X=function(n,e,t,r,i){var o=n.measureSize,c=n.startEdge,u=n.endEdge,s=t[0]&&i,f=function(){if(!s)return 0;var n=t[0];return a(e[c]-n[c])}(),p=function(){if(!s)return 0;var n=window.getComputedStyle(l(r));return parseFloat(n.getPropertyValue("margin-".concat(u)))}(),g=t.map(o),v=t.map((function(n,e,t){var r=!e,i=e===d(t);return r?g[e]+f:i?g[e]+p:t[e+1][c]-n[c]})).map(a);return{slideSizes:g,slideSizesWithGaps:v}}(H,V,C,t,g||""!==D),_=X.slideSizes,J=X.slideSizesWithGaps,G=T(U,J,z),W=function(n,e,t,r,i,o,c){var u,s=n.startEdge,f=n.endEdge,p=o.groupSlides,g=p(r).map((function(n){return l(n)[f]-n[0][s]})).map(a).map(e.measure),v=r.map((function(n){return t[s]-n[s]})).map((function(n){return-a(n)})),m=(u=l(v)-l(i),p(v).map((function(n){return n[0]})).map((function(n,e,t){var r=!e,i=e===d(t);return c&&r?0:c&&i?u:n+g[e]})));return{snaps:v,snapsAligned:m}}(H,F,V,C,J,G,j),$=W.snaps,Y=W.snapsAligned,K=-l($)+l(J),Q=w(U,K,Y,D).snapsContained,Z=j?Q:Y,nn=function(n,e,t){var r,i;return{limit:(r=e[0],i=l(e),m(t?r-n:i,r))}}(K,Z,g).limit,en=h(d(Z),f,g),tn=en.clone(),rn=s(t),on=function(n){var e=0;function t(n,t){return function(){n===!!e&&t()}}function r(){e=window.requestAnimationFrame(n)}return{proceed:t(!0,r),start:t(!1,r),stop:t(!0,(function(){window.cancelAnimationFrame(e),e=0}))}}((function(){g||gn.scrollBounds.constrain(gn.dragHandler.pointerDown()),gn.scrollBody.seek(un).update();var n=gn.scrollBody.settle(un);n&&!gn.dragHandler.pointerDown()&&(gn.animation.stop(),i.emit("settle")),n||i.emit("scroll"),g&&(gn.scrollLooper.loop(gn.scrollBody.direction()),gn.slideLooper.loop()),gn.translate.to(cn),gn.animation.proceed()})),an=Z[en.get()],cn=x(an),un=x(an),sn=S(cn,N,1),ln=L(g,Z,K,nn,un),dn=function(n,e,t,r,i,o){function a(r){var a=r.distance,c=r.index!==e.get();a&&(n.start(),i.add(a)),c&&(t.set(e.get()),e.set(r.index),o.emit("select"))}return{distance:function(n,e){a(r.byDistance(n,e))},index:function(n,t){var i=e.clone().set(n);a(r.byIndex(i.get(),t))}}}(on,en,tn,ln,un,i),fn=O(U,K,_,$,nn,g,p),pn=b(H,q,n,un,function(n){var e,t,r=170;function i(n){return"undefined"!=typeof TouchEvent&&n instanceof TouchEvent}function o(n){return n.timeStamp}function c(e,t){var r=t||n.scroll,o="client".concat("x"===r?"X":"Y");return(i(e)?e.touches[0]:e)[o]}return{isTouchEvent:i,pointerDown:function(n){return e=n,t=n,c(n)},pointerMove:function(n){var i=c(n)-c(t),a=o(n)-o(e)>r;return t=n,a&&(e=n),i},pointerUp:function(n){if(!e||!t)return 0;var i=c(t)-c(e),u=o(n)-o(e),s=o(n)-o(t)>r,l=i/u;return u&&!s&&a(l)>.1?l:0},readPoint:c}}(H),cn,on,dn,sn,ln,en,i,R,g,P,B),gn={containerRect:V,slideRects:C,animation:on,axis:H,direction:q,dragHandler:pn,eventStore:y(),percentOfView:R,index:en,indexPrevious:tn,limit:nn,location:cn,options:r,scrollBody:sn,scrollBounds:E(nn,cn,un,sn,R),scrollLooper:M(K,nn,cn,[cn,un]),scrollProgress:A(nn),scrollSnaps:Z,scrollTarget:ln,scrollTo:dn,slideLooper:k(H,q,U,K,J,Z,fn,cn,t),slidesToScroll:G,slidesInView:fn,slideIndexes:rn,target:un,translate:I(H,q,e)};return gn}t.r(e),t.d(e,{init:function(){return Q}});var P={align:"center",axis:"x",containScroll:"",direction:"ltr",slidesToScroll:1,breakpoints:{},dragFree:!1,draggable:!0,inViewThreshold:0,loop:!1,skipSnaps:!1,speed:10,startIndex:0,active:!0};function z(){function n(n,e){return p(n,e||{})}return{merge:n,areEqual:function(n,e){return JSON.stringify(f(n.breakpoints||{}))===JSON.stringify(f(e.breakpoints||{}))&&g(n,e)},atMedia:function(e){var t=e.breakpoints||{},r=f(t).filter((function(n){return window.matchMedia(n).matches})).map((function(n){return t[n]})).reduce((function(e,t){return n(e,t)}),{});return n(e,r)}}}function B(n,e,t){var r,i,o,a,c,u=y(),s=z(),l=function(){var n=z(),e=n.atMedia,t=n.areEqual,r=[],i=[];function o(n){var r=e(n.options);return function(){return!t(r,e(n.options))}}var a={init:function(n,t){return i=n.map(o),(r=n.filter((function(n){return e(n.options).active}))).forEach((function(n){return n.init(t)})),n.reduce((function(n,e){var t;return Object.assign(n,((t={})[e.name]=e,t))}),{})},destroy:function(){r=r.filter((function(n){return n.destroy()}))},haveChanged:function(){return i.some((function(n){return n()}))}};return a}(),d=function(){var n={};function e(e){return n[e]||[]}var t={emit:function(n){return e(n).forEach((function(e){return e(n)})),t},off:function(r,i){return n[r]=e(r).filter((function(n){return n!==i})),t},on:function(r,i){return n[r]=e(r).concat([i]),t}};return t}(),f=d.on,p=d.off,g=E,v=!1,m=s.merge(P,B.globalOptions),h=s.merge(m),x=[],b=0;function S(e,t){if(!v){var u,f;if(u="container"in n&&n.container,f="slides"in n&&n.slides,o="root"in n?n.root:n,a=u||o.children[0],c=f||[].slice.call(a.children),m=s.merge(m,e),h=s.atMedia(m),r=N(o,a,c,h,d),b=r.axis.measureSize(o.getBoundingClientRect()),!h.active)return w();if(r.translate.to(r.location),x=t||x,i=l.init(x,I),h.loop){if(!r.slideLooper.canLoop())return w(),S({loop:!1},t),void(m=s.merge(m,{loop:!0}));r.slideLooper.loop()}h.draggable&&a.offsetParent&&c.length&&r.dragHandler.addActivationEvents()}}function E(n,e){var t=L();w(),S(s.merge({startIndex:t},n),e),d.emit("reInit")}function w(){r.dragHandler.removeAllEvents(),r.animation.stop(),r.eventStore.removeAll(),r.translate.clear(),r.slideLooper.clear(),l.destroy()}function M(n){var e=r[n?"target":"location"].get(),t=h.loop?"removeOffset":"constrain";return r.slidesInView.check(r.limit[t](e))}function A(n,e,t){h.active&&!v&&(r.scrollBody.useBaseMass().useSpeed(e?100:h.speed),r.scrollTo.index(n,t||0))}function L(){return r.index.get()}var I={canScrollNext:function(){return r.index.clone().add(1).get()!==L()},canScrollPrev:function(){return r.index.clone().add(-1).get()!==L()},clickAllowed:function(){return r.dragHandler.clickAllowed()},containerNode:function(){return a},internalEngine:function(){return r},destroy:function(){v||(v=!0,u.removeAll(),w(),d.emit("destroy"))},off:p,on:f,plugins:function(){return i},previousScrollSnap:function(){return r.indexPrevious.get()},reInit:g,rootNode:function(){return o},scrollNext:function(n){A(r.index.clone().add(1).get(),!0===n,-1)},scrollPrev:function(n){A(r.index.clone().add(-1).get(),!0===n,1)},scrollProgress:function(){return r.scrollProgress.get(r.location.get())},scrollSnapList:function(){return r.scrollSnaps.map(r.scrollProgress.get)},scrollTo:A,selectedScrollSnap:L,slideNodes:function(){return c},slidesInView:M,slidesNotInView:function(n){var e=M(n);return r.slideIndexes.filter((function(n){return-1===e.indexOf(n)}))}};return S(e,t),u.add(window,"resize",(function(){var n=s.atMedia(m),e=!s.areEqual(n,h),t=r.axis.measureSize(o.getBoundingClientRect()),i=b!==t,a=l.haveChanged();(i||e||a)&&E(),d.emit("resize")})),setTimeout((function(){return d.emit("init")}),0),I}B.globalOptions=void 0,B.optionsHandler=z;var D={active:!0,breakpoints:{},selected:"is-selected",draggable:"is-draggable",dragging:"is-dragging"};function V(n,e){var t=n.classList;e&&t.contains(e)&&t.remove(e)}function C(n,e){var t=n.classList;e&&!t.contains(e)&&t.add(e)}function q(n){var e,t,r,i,o=B.optionsHandler(),a=o.merge(D,q.globalOptions),c=["select","pointerUp"],u=["pointerDown","pointerUp"];function s(n){"pointerDown"===n?C(r,e.dragging):V(r,e.dragging)}function l(){var n=t.slidesInView(!0);t.slidesNotInView(!0).forEach((function(n){return V(i[n],e.selected)})),n.forEach((function(n){return C(i[n],e.selected)}))}var d={name:"classNames",options:o.merge(a,n),init:function(n){t=n,e=o.atMedia(d.options),r=t.rootNode(),i=t.slideNodes(),t.internalEngine().options.draggable&&C(r,e.draggable),e.dragging&&u.forEach((function(n){return t.on(n,s)})),e.selected&&(c.forEach((function(n){return t.on(n,l)})),l())},destroy:function(){V(r,e.draggable),u.forEach((function(n){return t.off(n,s)})),c.forEach((function(n){return t.off(n,l)})),i.forEach((function(n){return V(n,e.selected)}))}};return d}q.globalOptions=void 0;const H=[1,20,14,11,7,6,4,4,2,2,1],U=(n,e,t,r,i)=>{t&&t.stop();let o=n.options.speed>90?n.options.speed:i||8;n.scrollBody.useSpeed(o).useMass((n=>n>9||n<1?1:H[n])(o)),n.scrollTo.index(e,r||0)},R=(n,e,t)=>{const r=n.index.clone().add(1);U(n,r.get(),e,-1,t)},F=(n,e,t,r)=>{n.addEventListener("click",(()=>{((n,e,t)=>{const r=n.index.clone().add(-1);U(n,r.get(),e,1,t)})(t.internalEngine(),r)}),!1),e.addEventListener("click",(()=>{R(t.internalEngine(),r)}),!1)},j=(n,e,t)=>{n.forEach(((n,r)=>{n.addEventListener("click",(()=>{U(e.internalEngine(),r,t)}),!1)}))},X=(n,e)=>{const t=n.innerHTML;let r="";const i=e.slideNodes().length;for(let n=0;n<i;n++)r+=t.replace("*slideIndex*",n+1).replace("*slideTotal*",i);return n.innerHTML=r,[].slice.call(n.querySelectorAll(".dot-btn"))},_=(n,e)=>()=>{const t=e.previousScrollSnap(),r=e.selectedScrollSnap();n[t].classList.remove("active"),n[t].setAttribute("tabindex","-1"),n[t].setAttribute("aria-selected",!1),n[r].classList.add("active"),n[r].setAttribute("tabindex","0"),n[r].setAttribute("aria-selected",!0)};const J=n=>{let e=Math.min(Math.max(n,0),1);return e-.001<0?e=0:e+.001>1&&(e=1),e},G=(n,e,t,r)=>{const i=J(1-Math.abs(n*r));t[e].style.transform=`scale(${i})`},W=(n,e,t,r)=>{const i=100*J(n*(-1/r));t[e].style.transform=`translateX(${i}%)`},$=(n,e,t)=>{const r=n.slideNodes().map((n=>n.querySelector(".slide-container")));return()=>{const i=(n=>{const e=n.internalEngine(),t=n.scrollProgress();return n.scrollSnapList().map(((r,i)=>{if(!n.slidesInView().includes(i))return 0;let o=r-t;return e.options.loop&&e.slideLooper.loopPoints.forEach((n=>{const e=n.target().get();if(i===n.index&&0!==e){const n=Math.sign(e);-1===n&&(o=r-(1+t)),1===n&&(o=r+(1-t))}})),o}))})(n);i.forEach(((n,i)=>{e(n,i,r,t)}))}},Y=(n,e,t)=>()=>{t&&t.stop(),e.classList.remove("all-in-view"),n.scrollTo(0,!0);const r=n.slidesNotInView().length;Mercury.debug()&&console.info("Slider.checkAutoplay() Slides not in view: "+r),r>0?(n.reInit({active:!0}),t&&t.play()):(e.classList.add("all-in-view"),n.reInit({active:!1}))};function K(n){const e=Date.now();n.forEach((n=>{const t=n.querySelector(".slider-box"),r=JSON.parse(t.dataset.slider),i=n.querySelectorAll(".slide-wrapper");var o=i.length;Mercury.debug()&&console.info("Slider.initEmblaSliders() Slides found: "+o),i.forEach((n=>{const t=null!=n.dataset.release?parseInt(n.dataset.release):Number.MIN_VALUE,r=null!=n.dataset.expiration?parseInt(n.dataset.expiration):Number.MAX_VALUE;(e<t||e>=r)&&o>1&&(Mercury.debug()&&console.info("Slider.initEmblaSliders() Slide removed - release="+t+" expiration="+r+" time="+e),n.parentNode.removeChild(n),o--)})),r.slides=o,Mercury.debug()&&console.info("Slider.initEmblaSliders() Slides valid: "+r.slides),r.slides<=1&&(r.draggable=!1,r.autoplay=!1,r.transition="direct");let a=0;if("timed"==r.transition){let n=Math.abs(e-parseInt(r.param));a=Math.floor(n/r.delay)%r.slides,Mercury.debug()&&console.info("Slider.initEmblaSliders() Timed slider - Showing slide: "+a+" of "+r.slides+" - Server time: "+r.param+" - Client time: "+e)}"fade"==r.transition&&(t.closest(".accordion .collapse")||t.closest(".tabs-parent"))&&(Mercury.debug()&&console.info("Slider.initEmblaSliders() Fade effect not supported in tabs or accordions, using 'direct' instead"),r.transition="direct",r.speed=100,t.classList.remove("tr-fade"),t.classList.add("tr-direct")),r.loop=!0,r.align="start",r.speed=r.speed||4,r.inViewThreshold="logo"==r.transition?.75:0,r.startIndex=a;let c=[q({selected:"slide-active",dragging:"is-dragging",draggable:""})];const u=r.autoplay?function(n){const e=B.optionsHandler();let t,r,i,o=0;function a(){o&&window.clearTimeout(o)}function c(){a(),o=window.setTimeout(l,t.delay)}function u(){r.off("pointerDown",i),t.stopOnInteraction||r.off("pointerUp",s),a(),o=0}function s(){o&&(a(),c())}function l(){R(r.internalEngine(),null,t.speed),c()}const d={name:"autoplayMod",options:e.merge({active:!0,breakpoints:{},delay:4e3,speed:4,stopOnInteraction:!1,stopOnMouseEnter:!1},n),init:function(n){Mercury.debug()&&console.info("Slider.init() AutoplayMod.init()"),r=n,t=e.atMedia(d.options),i=t.stopOnInteraction?u:a;const{eventStore:o}=r.internalEngine(),l=r.rootNode();r.on("pointerDown",i),t.stopOnInteraction||r.on("pointerUp",s),t.stopOnMouseEnter&&(o.add(l,"mouseenter",a),o.add(l,"mouseleave",s)),o.add(document,"visibilitychange",(()=>{if("hidden"===document.visibilityState)return a();s()})),o.add(window,"pagehide",(n=>{n.persisted&&a()})),c()},destroy:u,play:c,stop:a,reset:s};return d}({delay:r.delay,stopOnMouseEnter:r.pause,speed:r.speed}):null;null!=u&&c.push(u);const s=B({root:t,container:t.querySelector(".slide-definitions")},r,c);if(t.classList.add("slider-initialized"),r.arrows){const e=n.querySelector(".prev-btn"),t=n.querySelector(".next-btn");r.slides>1?F(e,t,s,u):(e.remove(),t.remove())}if(r.dots){const e=n.querySelector(".slider-dots");if(r.slides>1){const n=X(e,s),t=_(n,s);j(n,s,u),s.on("init",t).on("select",t)}else e.remove()}if("scale"==r.transition||"parallax"==r.transition){const n=r.param||("scale"==r.transition?2:.75),e=$(s,"scale"==r.transition?G:W,n);s.on("init",e).on("scroll",e)}else if("fade"==r.transition)s.on("init",(function(){t.classList.add("slider-initialized")})).on("reInit",(function(){t.classList.add("slider-initialized")})).on("resize",(function(){t.classList.remove("slider-initialized"),s.reInit()}));else if("logo"==r.transition){const n=Y(s,t,u);s.on("init",n).on("resize",n)}t.addEventListener("keydown",(n=>{switch(n.key){case"ArrowLeft":s.scrollPrev();break;case"ArrowRight":s.scrollNext()}})),Mercury.initTabAccordion(t,s.reInit)}))}function Q(){Mercury.debug()&&console.info("Slider.init()");let n=document.querySelectorAll(".use-embla-slider");Mercury.debug()&&console.info("Slider.init() .use-embla-slider elements found: "+n.length),n.length>0&&K(n)}}}]);
//# sourceMappingURL=mercury-slider.js.map