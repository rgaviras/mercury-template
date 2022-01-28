(self.webpackChunkmercury_template=self.webpackChunkmercury_template||[]).push([[773],{80:function(t,e,o){"use strict";o.d(e,{XL:function(){return U}});o(160);o(606);function r(t,e,o,n,i,a){if(i-n<=o)return;const l=n+i>>1;s(t,e,l,n,i,a%2),r(t,e,o,n,l-1,a+1),r(t,e,o,l+1,i,a+1)}function s(t,e,o,r,i,a){for(;i>r;){if(i-r>600){const n=i-r+1,l=o-r+1,h=Math.log(n),p=.5*Math.exp(2*h/3),c=.5*Math.sqrt(h*p*(n-p)/n)*(l-n/2<0?-1:1);s(t,e,o,Math.max(r,Math.floor(o-l*p/n+c)),Math.min(i,Math.floor(o+(n-l)*p/n+c)),a)}const l=e[2*o+a];let h=r,p=i;for(n(t,e,r,o),e[2*i+a]>l&&n(t,e,r,i);h<p;){for(n(t,e,h,p),h++,p--;e[2*h+a]<l;)h++;for(;e[2*p+a]>l;)p--}e[2*r+a]===l?n(t,e,r,p):(p++,n(t,e,p,i)),p<=o&&(r=p+1),o<=p&&(i=p-1)}}function n(t,e,o,r){i(t,o,r),i(e,2*o,2*r),i(e,2*o+1,2*r+1)}function i(t,e,o){const r=t[e];t[e]=t[o],t[o]=r}function a(t,e,o,r){const s=t-o,n=e-r;return s*s+n*n}const l=t=>t[0],h=t=>t[1];class p{constructor(t,e=l,o=h,s=64,n=Float64Array){this.nodeSize=s,this.points=t;const i=t.length<65536?Uint16Array:Uint32Array,a=this.ids=new i(t.length),p=this.coords=new n(2*t.length);for(let r=0;r<t.length;r++)a[r]=r,p[2*r]=e(t[r]),p[2*r+1]=o(t[r]);r(a,p,s,0,a.length-1,0)}range(t,e,o,r){return function(t,e,o,r,s,n,i){const a=[0,t.length-1,0],l=[];let h,p;for(;a.length;){const c=a.pop(),u=a.pop(),g=a.pop();if(u-g<=i){for(let i=g;i<=u;i++)h=e[2*i],p=e[2*i+1],h>=o&&h<=s&&p>=r&&p<=n&&l.push(t[i]);continue}const d=Math.floor((g+u)/2);h=e[2*d],p=e[2*d+1],h>=o&&h<=s&&p>=r&&p<=n&&l.push(t[d]);const m=(c+1)%2;(0===c?o<=h:r<=p)&&(a.push(g),a.push(d-1),a.push(m)),(0===c?s>=h:n>=p)&&(a.push(d+1),a.push(u),a.push(m))}return l}(this.ids,this.coords,t,e,o,r,this.nodeSize)}within(t,e,o){return function(t,e,o,r,s,n){const i=[0,t.length-1,0],l=[],h=s*s;for(;i.length;){const p=i.pop(),c=i.pop(),u=i.pop();if(c-u<=n){for(let s=u;s<=c;s++)a(e[2*s],e[2*s+1],o,r)<=h&&l.push(t[s]);continue}const g=Math.floor((u+c)/2),d=e[2*g],m=e[2*g+1];a(d,m,o,r)<=h&&l.push(t[g]);const f=(p+1)%2;(0===p?o-s<=d:r-s<=m)&&(i.push(u),i.push(g-1),i.push(f)),(0===p?o+s>=d:r+s>=m)&&(i.push(g+1),i.push(c),i.push(f))}return l}(this.ids,this.coords,t,e,o,this.nodeSize)}}const c={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:t=>t},u=Math.fround||(g=new Float32Array(1),t=>(g[0]=+t,g[0]));var g;class d{constructor(t){this.options=w(Object.create(c),t),this.trees=new Array(this.options.maxZoom+1)}load(t){const{log:e,minZoom:o,maxZoom:r,nodeSize:s}=this.options;e&&console.time("total time");const n=`prepare ${t.length} points`;e&&console.time(n),this.points=t;let i=[];for(let e=0;e<t.length;e++)t[e].geometry&&i.push(f(t[e],e));this.trees[r+1]=new p(i,x,E,s,Float32Array),e&&console.timeEnd(n);for(let t=r;t>=o;t--){const o=+Date.now();i=this._cluster(i,t),this.trees[t]=new p(i,x,E,s,Float32Array),e&&console.log("z%d: %d clusters in %dms",t,i.length,+Date.now()-o)}return e&&console.timeEnd("total time"),this}getClusters(t,e){let o=((t[0]+180)%360+360)%360-180;const r=Math.max(-90,Math.min(90,t[1]));let s=180===t[2]?180:((t[2]+180)%360+360)%360-180;const n=Math.max(-90,Math.min(90,t[3]));if(t[2]-t[0]>=360)o=-180,s=180;else if(o>s){const t=this.getClusters([o,r,180,n],e),i=this.getClusters([-180,r,s,n],e);return t.concat(i)}const i=this.trees[this._limitZoom(e)],a=i.range(v(o),M(n),v(s),M(r)),l=[];for(const t of a){const e=i.points[t];l.push(e.numPoints?_(e):this.points[e.index])}return l}getChildren(t){const e=this._getOriginId(t),o=this._getOriginZoom(t),r="No cluster with the specified id.",s=this.trees[o];if(!s)throw new Error(r);const n=s.points[e];if(!n)throw new Error(r);const i=this.options.radius/(this.options.extent*Math.pow(2,o-1)),a=s.within(n.x,n.y,i),l=[];for(const e of a){const o=s.points[e];o.parentId===t&&l.push(o.numPoints?_(o):this.points[o.index])}if(0===l.length)throw new Error(r);return l}getLeaves(t,e,o){e=e||10,o=o||0;const r=[];return this._appendLeaves(r,t,e,o,0),r}getTile(t,e,o){const r=this.trees[this._limitZoom(t)],s=Math.pow(2,t),{extent:n,radius:i}=this.options,a=i/n,l=(o-a)/s,h=(o+1+a)/s,p={features:[]};return this._addTileFeatures(r.range((e-a)/s,l,(e+1+a)/s,h),r.points,e,o,s,p),0===e&&this._addTileFeatures(r.range(1-a/s,l,1,h),r.points,s,o,s,p),e===s-1&&this._addTileFeatures(r.range(0,l,a/s,h),r.points,-1,o,s,p),p.features.length?p:null}getClusterExpansionZoom(t){let e=this._getOriginZoom(t)-1;for(;e<=this.options.maxZoom;){const o=this.getChildren(t);if(e++,1!==o.length)break;t=o[0].properties.cluster_id}return e}_appendLeaves(t,e,o,r,s){const n=this.getChildren(e);for(const e of n){const n=e.properties;if(n&&n.cluster?s+n.point_count<=r?s+=n.point_count:s=this._appendLeaves(t,n.cluster_id,o,r,s):s<r?s++:t.push(e),t.length===o)break}return s}_addTileFeatures(t,e,o,r,s,n){for(const i of t){const t=e[i],a=t.numPoints;let l,h,p;if(a)l=y(t),h=t.x,p=t.y;else{const e=this.points[t.index];l=e.properties,h=v(e.geometry.coordinates[0]),p=M(e.geometry.coordinates[1])}const c={type:1,geometry:[[Math.round(this.options.extent*(h*s-o)),Math.round(this.options.extent*(p*s-r))]],tags:l};let u;a?u=t.id:this.options.generateId?u=t.index:this.points[t.index].id&&(u=this.points[t.index].id),void 0!==u&&(c.id=u),n.features.push(c)}}_limitZoom(t){return Math.max(this.options.minZoom,Math.min(+t,this.options.maxZoom+1))}_cluster(t,e){const o=[],{radius:r,extent:s,reduce:n,minPoints:i}=this.options,a=r/(s*Math.pow(2,e));for(let r=0;r<t.length;r++){const s=t[r];if(s.zoom<=e)continue;s.zoom=e;const l=this.trees[e+1],h=l.within(s.x,s.y,a),p=s.numPoints||1;let c=p;for(const t of h){const o=l.points[t];o.zoom>e&&(c+=o.numPoints||1)}if(c>p&&c>=i){let t=s.x*p,i=s.y*p,a=n&&p>1?this._map(s,!0):null;const u=(r<<5)+(e+1)+this.points.length;for(const o of h){const r=l.points[o];if(r.zoom<=e)continue;r.zoom=e;const h=r.numPoints||1;t+=r.x*h,i+=r.y*h,r.parentId=u,n&&(a||(a=this._map(s,!0)),n(a,this._map(r)))}s.parentId=u,o.push(m(t/c,i/c,u,c,a))}else if(o.push(s),c>1)for(const t of h){const r=l.points[t];r.zoom<=e||(r.zoom=e,o.push(r))}}return o}_getOriginId(t){return t-this.points.length>>5}_getOriginZoom(t){return(t-this.points.length)%32}_map(t,e){if(t.numPoints)return e?w({},t.properties):t.properties;const o=this.points[t.index].properties,r=this.options.map(o);return e&&r===o?w({},r):r}}function m(t,e,o,r,s){return{x:u(t),y:u(e),zoom:1/0,id:o,parentId:-1,numPoints:r,properties:s}}function f(t,e){const[o,r]=t.geometry.coordinates;return{x:u(v(o)),y:u(M(r)),zoom:1/0,index:e,parentId:-1}}function _(t){return{type:"Feature",id:t.id,properties:y(t),geometry:{type:"Point",coordinates:[(e=t.x,360*(e-.5)),k(t.y)]}};var e}function y(t){const e=t.numPoints,o=e>=1e4?`${Math.round(e/1e3)}k`:e>=1e3?Math.round(e/100)/10+"k":e;return w(w({},t.properties),{cluster:!0,cluster_id:t.id,point_count:e,point_count_abbreviated:o})}function v(t){return t/360+.5}function M(t){const e=Math.sin(t*Math.PI/180),o=.5-.25*Math.log((1+e)/(1-e))/Math.PI;return o<0?0:o>1?1:o}function k(t){const e=(180-360*t)*Math.PI/180;return 360*Math.atan(Math.exp(e))/Math.PI-90}function w(t,e){for(const o in e)t[o]=e[o];return t}function x(t){return t.x}function E(t){return t.y}var C=o(991),D=o.n(C);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function P(t,e){var o={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(o[r[s]]=t[r[s]])}return o}class I{constructor({markers:t,position:e}){this.markers=t,e&&(e instanceof google.maps.LatLng?this._position=e:this._position=new google.maps.LatLng(e))}get bounds(){if(0!==this.markers.length||this._position)return this.markers.reduce(((t,e)=>t.extend(e.getPosition())),new google.maps.LatLngBounds(this._position,this._position))}get position(){return this._position||this.bounds.getCenter()}get count(){return this.markers.filter((t=>t.getVisible())).length}push(t){this.markers.push(t)}delete(){this.marker&&(this.marker.setMap(null),delete this.marker),this.markers.length=0}}class O{constructor({maxZoom:t=16}){this.maxZoom=t}noop({markers:t}){return b(t)}}const b=t=>t.map((t=>new I({position:t.getPosition(),markers:[t]})));class G extends O{constructor(t){var{maxZoom:e,radius:o=60}=t,r=P(t,["maxZoom","radius"]);super({maxZoom:e}),this.superCluster=new d(Object.assign({maxZoom:this.maxZoom,radius:o},r)),this.state={zoom:null}}calculate(t){let e=!1;if(!D()(t.markers,this.markers)){e=!0,this.markers=[...t.markers];const o=this.markers.map((t=>({type:"Feature",geometry:{type:"Point",coordinates:[t.getPosition().lng(),t.getPosition().lat()]},properties:{marker:t}})));this.superCluster.load(o)}const o={zoom:t.map.getZoom()};return e||this.state.zoom>this.maxZoom&&o.zoom>this.maxZoom||(e=e||!D()(this.state,o)),this.state=o,e&&(this.clusters=this.cluster(t)),{clusters:this.clusters,changed:e}}cluster({map:t}){return this.superCluster.getClusters([-180,-90,180,90],Math.round(t.getZoom())).map(this.transformCluster.bind(this))}transformCluster({geometry:{coordinates:[t,e]},properties:o}){if(o.cluster)return new I({markers:this.superCluster.getLeaves(o.cluster_id,1/0).map((t=>t.properties.marker)),position:new google.maps.LatLng({lat:e,lng:t})});{const t=o.marker;return new I({markers:[t],position:t.getPosition()})}}}class L{constructor(t,e){this.markers={sum:t.length};const o=e.map((t=>t.count)),r=o.reduce(((t,e)=>t+e),0);this.clusters={count:e.length,markers:{mean:r/e.length,sum:r,min:Math.min(...o),max:Math.max(...o)}}}}class A{render({count:t,position:e},o){const r=t>Math.max(10,o.clusters.markers.mean)?"#ff0000":"#0000ff",s=window.btoa(`\n  <svg fill="${r}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">\n    <circle cx="120" cy="120" opacity=".6" r="70" />\n    <circle cx="120" cy="120" opacity=".3" r="90" />\n    <circle cx="120" cy="120" opacity=".2" r="110" />\n  </svg>`);return new google.maps.Marker({position:e,icon:{url:`data:image/svg+xml;base64,${s}`,scaledSize:new google.maps.Size(45,45)},label:{text:String(t),color:"rgba(255,255,255,0.9)",fontSize:"12px"},title:`Cluster of ${t} markers`,zIndex:Number(google.maps.Marker.MAX_ZINDEX)+t})}}class S{constructor(){!function(t,e){for(let o in e.prototype)t.prototype[o]=e.prototype[o]}(S,google.maps.OverlayView)}}var T;!function(t){t.CLUSTERING_BEGIN="clusteringbegin",t.CLUSTERING_END="clusteringend",t.CLUSTER_CLICK="click"}(T||(T={}));const B=(t,e,o)=>{o.fitBounds(e.bounds)};class U extends S{constructor({map:t,markers:e=[],algorithm:o=new G({}),renderer:r=new A,onClusterClick:s=B}){super(),this.markers=[...e],this.clusters=[],this.algorithm=o,this.renderer=r,this.onClusterClick=s,t&&this.setMap(t)}addMarker(t,e){this.markers.includes(t)||(this.markers.push(t),e||this.render())}addMarkers(t,e){t.forEach((t=>{this.addMarker(t,!0)})),e||this.render()}removeMarker(t,e){const o=this.markers.indexOf(t);return-1!==o&&(t.setMap(null),this.markers.splice(o,1),e||this.render(),!0)}removeMarkers(t,e){let o=!1;return t.forEach((t=>{o=this.removeMarker(t,!0)||o})),o&&!e&&this.render(),o}clearMarkers(t){this.markers.length=0,t||this.render()}render(){const t=this.getMap();if(t instanceof google.maps.Map&&this.getProjection()){google.maps.event.trigger(this,T.CLUSTERING_BEGIN,this);const{clusters:e,changed:o}=this.algorithm.calculate({markers:this.markers,map:t,mapCanvasProjection:this.getProjection()});(o||null==o)&&(this.reset(),this.clusters=e,this.renderClusters()),google.maps.event.trigger(this,T.CLUSTERING_END,this)}}onAdd(){this.idleListener=this.getMap().addListener("idle",this.render.bind(this)),this.render()}onRemove(){google.maps.event.removeListener(this.idleListener),this.reset()}reset(){this.markers.forEach((t=>t.setMap(null))),this.clusters.forEach((t=>t.delete())),this.clusters=[]}renderClusters(){const t=new L(this.markers,this.clusters),e=this.getMap();this.clusters.forEach((o=>{1===o.markers.length?o.marker=o.markers[0]:(o.marker=this.renderer.render(o,t),this.onClusterClick&&o.marker.addListener("click",(t=>{google.maps.event.trigger(this,T.CLUSTER_CLICK,o),this.onClusterClick(t,o,e)}))),o.marker.setMap(e)}))}}},317:function(t){function e(t,e,o,r){this.dataset=[],this.epsilon=1,this.minPts=2,this.distance=this._euclideanDistance,this.clusters=[],this.noise=[],this._visited=[],this._assigned=[],this._datasetLength=0,this._init(t,e,o,r)}e.prototype.run=function(t,e,o,r){this._init(t,e,o,r);for(var s=0;s<this._datasetLength;s++)if(1!==this._visited[s]){this._visited[s]=1;var n=this._regionQuery(s);if(n.length<this.minPts)this.noise.push(s);else{var i=this.clusters.length;this.clusters.push([]),this._addToCluster(s,i),this._expandCluster(i,n)}}return this.clusters},e.prototype._init=function(t,e,o,r){if(t){if(!(t instanceof Array))throw Error("Dataset must be of type array, "+typeof t+" given");this.dataset=t,this.clusters=[],this.noise=[],this._datasetLength=t.length,this._visited=new Array(this._datasetLength),this._assigned=new Array(this._datasetLength)}e&&(this.epsilon=e),o&&(this.minPts=o),r&&(this.distance=r)},e.prototype._expandCluster=function(t,e){for(var o=0;o<e.length;o++){var r=e[o];if(1!==this._visited[r]){this._visited[r]=1;var s=this._regionQuery(r);s.length>=this.minPts&&(e=this._mergeArrays(e,s))}1!==this._assigned[r]&&this._addToCluster(r,t)}},e.prototype._addToCluster=function(t,e){this.clusters[e].push(t),this._assigned[t]=1},e.prototype._regionQuery=function(t){for(var e=[],o=0;o<this._datasetLength;o++){this.distance(this.dataset[t],this.dataset[o])<this.epsilon&&e.push(o)}return e},e.prototype._mergeArrays=function(t,e){for(var o=e.length,r=0;r<o;r++){var s=e[r];t.indexOf(s)<0&&t.push(s)}return t},e.prototype._euclideanDistance=function(t,e){for(var o=0,r=Math.min(t.length,e.length);r--;)o+=(t[r]-e[r])*(t[r]-e[r]);return Math.sqrt(o)},t.exports&&(t.exports=e)},781:function(t){function e(t,e,o){this.k=3,this.dataset=[],this.assignments=[],this.centroids=[],this.init(t,e,o)}e.prototype.init=function(t,e,o){this.assignments=[],this.centroids=[],void 0!==t&&(this.dataset=t),void 0!==e&&(this.k=e),void 0!==o&&(this.distance=o)},e.prototype.run=function(t,e){this.init(t,e);for(var o=this.dataset.length,r=0;r<this.k;r++)this.centroids[r]=this.randomCentroid();for(var s=!0;s;){s=this.assign();for(var n=0;n<this.k;n++){for(var i=new Array(p),a=0,l=0;l<p;l++)i[l]=0;for(var h=0;h<o;h++){var p=this.dataset[h].length;if(n===this.assignments[h]){for(l=0;l<p;l++)i[l]+=this.dataset[h][l];a++}}if(a>0){for(l=0;l<p;l++)i[l]/=a;this.centroids[n]=i}else this.centroids[n]=this.randomCentroid(),s=!0}}return this.getClusters()},e.prototype.randomCentroid=function(){var t,e,o=this.dataset.length-1;do{e=Math.round(Math.random()*o),t=this.dataset[e]}while(this.centroids.indexOf(t)>=0);return t},e.prototype.assign=function(){for(var t,e=!1,o=this.dataset.length,r=0;r<o;r++)(t=this.argmin(this.dataset[r],this.centroids,this.distance))!=this.assignments[r]&&(this.assignments[r]=t,e=!0);return e},e.prototype.getClusters=function(){for(var t,e=new Array(this.k),o=0;o<this.assignments.length;o++)void 0===e[t=this.assignments[o]]&&(e[t]=[]),e[t].push(o);return e},e.prototype.argmin=function(t,e,o){for(var r,s=Number.MAX_VALUE,n=0,i=e.length,a=0;a<i;a++)(r=o(t,e[a]))<s&&(s=r,n=a);return n},e.prototype.distance=function(t,e){for(var o=0,r=Math.min(t.length,e.length);r--;){var s=t[r]-e[r];o+=s*s}return Math.sqrt(o)},t.exports&&(t.exports=e)},763:function(t,e,o){if(t.exports)var r=o(985);function s(t,e,o,r){this.epsilon=1,this.minPts=1,this.distance=this._euclideanDistance,this._reachability=[],this._processed=[],this._coreDistance=0,this._orderedList=[],this._init(t,e,o,r)}s.prototype.run=function(t,e,o,s){this._init(t,e,o,s);for(var n=0,i=this.dataset.length;n<i;n++)if(1!==this._processed[n]){this._processed[n]=1,this.clusters.push([n]);var a=this.clusters.length-1;this._orderedList.push(n);var l=new r(null,null,"asc"),h=this._regionQuery(n);void 0!==this._distanceToCore(n)&&(this._updateQueue(n,h,l),this._expandCluster(a,l))}return this.clusters},s.prototype.getReachabilityPlot=function(){for(var t=[],e=0,o=this._orderedList.length;e<o;e++){var r=this._orderedList[e],s=this._reachability[r];t.push([r,s])}return t},s.prototype._init=function(t,e,o,r){if(t){if(!(t instanceof Array))throw Error("Dataset must be of type array, "+typeof t+" given");this.dataset=t,this.clusters=[],this._reachability=new Array(this.dataset.length),this._processed=new Array(this.dataset.length),this._coreDistance=0,this._orderedList=[]}e&&(this.epsilon=e),o&&(this.minPts=o),r&&(this.distance=r)},s.prototype._updateQueue=function(t,e,o){var r=this;this._coreDistance=this._distanceToCore(t),e.forEach((function(e){if(void 0===r._processed[e]){var s=r.distance(r.dataset[t],r.dataset[e]),n=Math.max(r._coreDistance,s);void 0===r._reachability[e]?(r._reachability[e]=n,o.insert(e,n)):n<r._reachability[e]&&(r._reachability[e]=n,o.remove(e),o.insert(e,n))}}))},s.prototype._expandCluster=function(t,e){for(var o=e.getElements(),r=0,s=o.length;r<s;r++){var n=o[r];if(void 0===this._processed[n]){var i=this._regionQuery(n);this._processed[n]=1,this.clusters[t].push(n),this._orderedList.push(n),void 0!==this._distanceToCore(n)&&(this._updateQueue(n,i,e),this._expandCluster(t,e))}}},s.prototype._distanceToCore=function(t){for(var e=this.epsilon,o=0;o<e;o++){if(this._regionQuery(t,o).length>=this.minPts)return o}},s.prototype._regionQuery=function(t,e){e=e||this.epsilon;for(var o=[],r=0,s=this.dataset.length;r<s;r++)this.distance(this.dataset[t],this.dataset[r])<e&&o.push(r);return o},s.prototype._euclideanDistance=function(t,e){for(var o=0,r=Math.min(t.length,e.length);r--;)o+=(t[r]-e[r])*(t[r]-e[r]);return Math.sqrt(o)},t.exports&&(t.exports=s)},985:function(t){function e(t,e,o){this._queue=[],this._priorities=[],this._sorting="desc",this._init(t,e,o)}e.prototype.insert=function(t,e){for(var o=this._queue.length,r=o;r--;){var s=this._priorities[r];"desc"===this._sorting?e>s&&(o=r):e<s&&(o=r)}this._insertAt(t,e,o)},e.prototype.remove=function(t){for(var e=this._queue.length;e--;){if(t===this._queue[e]){this._queue.splice(e,1),this._priorities.splice(e,1);break}}},e.prototype.forEach=function(t){this._queue.forEach(t)},e.prototype.getElements=function(){return this._queue},e.prototype.getElementPriority=function(t){return this._priorities[t]},e.prototype.getPriorities=function(){return this._priorities},e.prototype.getElementsWithPriorities=function(){for(var t=[],e=0,o=this._queue.length;e<o;e++)t.push([this._queue[e],this._priorities[e]]);return t},e.prototype._init=function(t,e,o){if(t&&e){if(this._queue=[],this._priorities=[],t.length!==e.length)throw new Error("Arrays must have the same length");for(var r=0;r<t.length;r++)this.insert(t[r],e[r])}o&&(this._sorting=o)},e.prototype._insertAt=function(t,e,o){this._queue.length===o?(this._queue.push(t),this._priorities.push(e)):(this._queue.splice(o,0,t),this._priorities.splice(o,0,e))},t.exports&&(t.exports=e)},606:function(t,e,o){t.exports&&(t.exports={DBSCAN:o(317),KMEANS:o(781),OPTICS:o(763),PriorityQueue:o(985)})},991:function(t){"use strict";t.exports=function t(e,o){if(e===o)return!0;if(e&&o&&"object"==typeof e&&"object"==typeof o){if(e.constructor!==o.constructor)return!1;var r,s,n;if(Array.isArray(e)){if((r=e.length)!=o.length)return!1;for(s=r;0!=s--;)if(!t(e[s],o[s]))return!1;return!0}if(e instanceof Map&&o instanceof Map){if(e.size!==o.size)return!1;for(s of e.entries())if(!o.has(s[0]))return!1;for(s of e.entries())if(!t(s[1],o.get(s[0])))return!1;return!0}if(e instanceof Set&&o instanceof Set){if(e.size!==o.size)return!1;for(s of e.entries())if(!o.has(s[0]))return!1;return!0}if(ArrayBuffer.isView(e)&&ArrayBuffer.isView(o)){if((r=e.length)!=o.length)return!1;for(s=r;0!=s--;)if(e[s]!==o[s])return!1;return!0}if(e.constructor===RegExp)return e.source===o.source&&e.flags===o.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===o.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===o.toString();if((r=(n=Object.keys(e)).length)!==Object.keys(o).length)return!1;for(s=r;0!=s--;)if(!Object.prototype.hasOwnProperty.call(o,n[s]))return!1;for(s=r;0!=s--;){var i=n[s];if(!t(e[i],o[i]))return!1}return!0}return e!=e&&o!=o}},697:function(t){"use strict";t.exports={eudist:function(t,e,o){for(var r=t.length,s=0,n=0;n<r;n++){var i=(t[n]||0)-(e[n]||0);s+=i*i}return o?Math.sqrt(s):s},mandist:function(t,e,o){for(var r=t.length,s=0,n=0;n<r;n++)s+=Math.abs((t[n]||0)-(e[n]||0));return o?Math.sqrt(s):s},dist:function(t,e,o){var r=Math.abs(t-e);return o?r:r*r}}},35:function(t,e,o){"use strict";var r=o(697),s=r.eudist,n=r.dist;t.exports={kmrand:function(t,e){for(var o={},r=[],s=e<<2,n=t.length,i=t[0].length>0;r.length<e&&s-- >0;){var a=t[Math.floor(Math.random()*n)],l=i?a.join("_"):""+a;o[l]||(o[l]=!0,r.push(a))}if(r.length<e)throw new Error("Error initializating clusters");return r},kmpp:function(t,e){var o=t[0].length?s:n,r=[],i=t.length,a=t[0].length>0,l=t[Math.floor(Math.random()*i)];a&&l.join("_");for(r.push(l);r.length<e;){for(var h=[],p=r.length,c=0,u=[],g=0;g<i;g++){for(var d=1/0,m=0;m<p;m++){var f=o(t[g],r[m]);f<=d&&(d=f)}h[g]=d}for(var _=0;_<i;_++)c+=h[_];for(var y=0;y<i;y++)u[y]={i:y,v:t[y],pr:h[y]/c,cs:0};u.sort((function(t,e){return t.pr-e.pr})),u[0].cs=u[0].pr;for(var v=1;v<i;v++)u[v].cs=u[v-1].cs+u[v].pr;for(var M=Math.random(),k=0;k<i-1&&u[k++].cs<M;);r.push(u[k-1].v)}return r}}},160:function(t,e,o){"use strict";var r=o(697),s=o(35),n=r.eudist,i=(r.mandist,r.dist,s.kmrand),a=s.kmpp;function l(t,e,o){o=o||[];for(var r=0;r<t;r++)o[r]=e;return o}t.exports=function(t,e,o,r){var s=[],h=[],p=[],c=[],u=!1,g=r||1e4,d=t.length,m=t[0].length,f=m>0,_=[];if(o)s="kmrand"==o?i(t,e):"kmpp"==o?a(t,e):o;else for(var y={};s.length<e;){var v=Math.floor(Math.random()*d);y[v]||(y[v]=!0,s.push(t[v]))}do{l(e,0,_);for(var M=0;M<d;M++){for(var k=1/0,w=0,x=0;x<e;x++){(c=f?n(t[M],s[x]):Math.abs(t[M]-s[x]))<=k&&(k=c,w=x)}p[M]=w,_[w]++}for(var E=[],C=(h=[],0);C<e;C++)E[C]=f?l(m,0,E[C]):0,h[C]=s[C];if(f){for(var D=0;D<e;D++)s[D]=[];for(var P=0;P<d;P++)for(var I=E[p[P]],O=t[P],b=0;b<m;b++)I[b]+=O[b];u=!0;for(var G=0;G<e;G++){for(var L=s[G],A=E[G],S=h[G],T=_[G],B=0;B<m;B++)L[B]=A[B]/T||0;if(u)for(var U=0;U<m;U++)if(S[U]!=L[U]){u=!1;break}}}else{for(var z=0;z<d;z++){E[p[z]]+=t[z]}for(var W=0;W<e;W++)s[W]=E[W]/_[W]||0;u=!0;for(var Z=0;Z<e;Z++)if(h[Z]!=s[Z]){u=!1;break}}u=u||--g<=0}while(!u);return{it:1e4-g,k:e,idxs:p,centroids:s}}},742:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{showMarkers:function(){return showMarkers},showGeoJson:function(){return showGeoJson},initGoogleMaps:function(){return initGoogleMaps},init:function(){return init}});var tinycolor2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(621),tinycolor2__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(tinycolor2__WEBPACK_IMPORTED_MODULE_0__),_googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(80),jQ,DEBUG,m_maps={},m_mapData=[],m_mapStyle=[],m_apiKey,m_googleGeocoder=null,m_googleApiLoaded=!1;function getPuempel(t){return{path:"M0-37.06c-5.53 0-10 4.15-10 9.26 0 7.4 8 9.26 10 27.8 2-18.54 10-20.4 10-27.8 0-5.1-4.47-9.26-10-9.26zm.08 7a2.9 2.9 0 0 1 2.9 2.9 2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9z",scale:1,fillOpacity:1,fillColor:t,strokeColor:""+tinycolor2__WEBPACK_IMPORTED_MODULE_0___default()(t).darken(20),strokeWeight:1}}function getFeatureGraphic(){return getPuempel(Mercury.getThemeJSON("map-color[2]","#000000"))}function getCenterPointGraphic(){const t=Mercury.getThemeJSON("map-color[3]","#000000");return{path:"M2,8a6,6 0 1,0 12,0a6,6 0 1,0 -12,0",scale:1,fillColor:tinycolor2__WEBPACK_IMPORTED_MODULE_0___default()(t).darken(20).toString(),fillOpacity:1,strokeWeight:2,strokeColor:t.toString(),strokeOpacity:1}}function getClusterGraphic(){return{render:function({count:t,position:e},o){const r=Mercury.getThemeJSON("map-color[1]","#000000"),s=tinycolor2__WEBPACK_IMPORTED_MODULE_0___default()(r),n=tinycolor2__WEBPACK_IMPORTED_MODULE_0___default()(r).darken(20),i=s.isLight()?tinycolor2__WEBPACK_IMPORTED_MODULE_0___default()(r).darken(70):tinycolor2__WEBPACK_IMPORTED_MODULE_0___default()(r).lighten(70),a=window.btoa(`\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">\n        <circle cx="25" cy="25" r="20" stroke="${n}" stroke-width="2" fill="${r}"/>    \n      </svg>`);return new google.maps.Marker({position:e,icon:{url:`data:image/svg+xml;base64,${a}`,scaledSize:new google.maps.Size(60,60)},label:{text:String(t),color:i.toString(),fontSize:"12px",fontWeight:"bold"},zIndex:Number(google.maps.Marker.MAX_ZINDEX)+t})}}}function showInfo(t,e){DEBUG&&console.info("GoogleMap showInfo() called with map id: "+t+" info id: "+e);for(var o=m_maps[t],r=o.infoWindows,s=0;s<r.length;s++)s!=e?r[s].close():("true"==r[s].geocode&&(DEBUG&&console.info("showInfo() geocode lookup for "+t),getGeocode(r[s]),r[s].geocode="false"),r[s].open(o,r[s].marker))}function hideAllInfo(t){DEBUG&&console.info("GoogleMap hideAllInfo() called with map id: "+t);for(var e=m_maps[t].infoWindows,o=0;o<e.length;o++)e[o].close()}function setInfo(t,e,o){DEBUG&&console.info("GoogleMap setInfo() geocode lookup returned status "+e);var r="";e==google.maps.GeocoderStatus.OK?t[0]&&(r=formatGeocode(t[0])):console.warn("GoogleMap GeoCoder returned error status '"+e+"' for coordinates "+o.marker.position);var s=o.getContent();s=s.replace("<div class='geoAdr'></div>",r),o.setContent(s)}function formatGeocode(t){for(var e="",o="",r="",s="",n=!1,i=0;i<t.address_components.length;i++){var a=String(t.address_components[i].types);""==e&&-1!=a.indexOf("route")&&(e=t.address_components[i].long_name,n=!0),-1!=a.indexOf("street_number")&&(o=t.address_components[i].long_name,n=!0),-1!=a.indexOf("postal_code")&&(r=t.address_components[i].long_name,n=!0),""==s&&-1!=a.indexOf("locality")&&(s=t.address_components[i].long_name,n=!0)}return 1==n?e+" "+o+"<br/>"+r+" "+s:t.formatted_address}function getGeocode(t){null==m_googleGeocoder&&(m_googleGeocoder=new google.maps.Geocoder),m_googleGeocoder.geocode({latLng:t.marker.position},(function(e,o){setInfo(e,o,t)}))}function loadGoogleApi(){if(!m_googleApiLoaded){var t=Mercury.getInfo("locale"),e="";null!=m_apiKey&&(e="&key="+m_apiKey);var o="";Mercury.isOnlineProject()||(o="&libraries=places"),DEBUG&&console.info("GoogleMap API key: "+(""==e?"(undefined)":e));let r=jQ.loadScript("https://maps.google.com/maps/api/js?callback=GoogleMap.initGoogleMaps&language="+t+o+e,{},DEBUG);return m_googleApiLoaded=!0,r}initGoogleMaps()}function showMarkers(t,e){DEBUG&&console.info("GoogleMap showMapMarkers() called with map id: "+t);var o=m_maps[t];if(o){var r=o.markers,s=decodeURIComponent(e);hideAllInfo(t);for(var n=0;n<r.length;n++)r[n].group==s||"showall"==s?r[n].setVisible(!0):r[n].setVisible(!1)}}function showSingleMap(mapData){var mapId=mapData.id;DEBUG&&console.info("GoogleMap initializing map: "+mapId);var mapOptions={zoom:parseInt(mapData.zoom),styles:m_mapStyle,scrollwheel:!1,mapTypeId:eval("google.maps.MapTypeId."+mapData.type),streetViewControl:!1,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,mapTypeIds:new Array(google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.TERRAIN)},center:new google.maps.LatLng(mapData.centerLat,mapData.centerLng),maxZoom:18},map=new google.maps.Map(document.getElementById(mapId),mapOptions);google.maps.event.addListener(map,"click",(function(t){this.setOptions({scrollwheel:!0})}));var markers=[],infoWindows=[],groups={},groupsFound=0;if(void 0!==mapData.markers)for(var p=0;p<mapData.markers.length;p++){var point=mapData.markers[p],group=point.group;if("centerpoint"===group)DEBUG&&console.info("OSM new center point added."),groups[group]=getCenterPointGraphic();else if(void 0===groups[group]){var color=Mercury.getThemeJSON("map-color["+groupsFound+++"]","#ffffff");DEBUG&&console.info("GoogleMap new marker group added: "+group+" with color: "+color),groups[group]=getPuempel(color)}var marker=new google.maps.Marker({position:new google.maps.LatLng(point.lat,point.lng),map:map,title:point.title,group:group,icon:groups[group],info:point.info,index:p,mapId:mapId,geocode:point.geocode});markers.push(marker);var infoWindow=new google.maps.InfoWindow({content:marker.info,marker:marker,geocode:point.geocode,index:p});infoWindows.push(infoWindow),DEBUG&&console.info("GoogleMap attaching Event lister: "+p+" to map id "+mapId),"centerpoint"!==group&&marker.addListener("click",(function(){showInfo(this.mapId,this.index)}))}var map={id:mapId,map:map,markers:markers,infoWindows:infoWindows};m_maps[mapId]=map}function showGeoJson(t,e){let o;DEBUG&&console.info("Google update markers for map with id: "+t);try{o=m_maps[t].map}catch(t){}if(!o)return;const r=e.features||[],s=[],n={lat:null,lng:null},i={lat:null,lng:null};let a,l=function(t){let e=t[1],o=t[0];(null===n.lat||n.lat<e)&&(n.lat=e),(null===n.lng||n.lng<o)&&(n.lng=o),(null===i.lat||i.lat>e)&&(i.lat=e),(null===i.lng||i.lng>o)&&(i.lng=o)};for(let e of m_mapData)e.id===t&&e.markers&&e.markers.length>0&&(a=e);a&&l([o.getCenter().lng(),o.getCenter().lat()]);const h=new Map;for(let e=0;e<r.length;e++){const n=r[e],i=n.geometry.coordinates;l(i);const a=n.properties.info,p=new google.maps.Marker({position:new google.maps.LatLng(i[1],i[0]),map:o,icon:getFeatureGraphic(),zIndex:e});s.push(p);const c=new google.maps.InfoWindow({content:a,marker:p,zIndex:e}),u=i.join(",");if(h.has(u)){let t=c.getContent()+"<hr>";t+=h.get(u)[h.get(u).length-1].getContent(),c.setContent(t),h.get(u).push(c)}else h.set(u,[c]);p.addListener("click",(function(e){m_maps[t].infoWindow&&m_maps[t].infoWindow.close(),c.open(o,p),m_maps[t].infoWindow=c}))}new _googlemaps_markerclusterer__WEBPACK_IMPORTED_MODULE_1__.XL({markers:s,map:o,renderer:getClusterGraphic()});if(n.lat){const t=new google.maps.LatLngBounds;t.extend(n),t.extend(i),o.fitBounds(t)}}function initGoogleMaps(){DEBUG&&console.info("GoogleMap initGoogleMaps() called with data for "+m_mapData.length+" maps!");for(var t=0;t<m_mapData.length;t++)m_mapData[t].showPlaceholder||showSingleMap(m_mapData[t])}function showMap(t){DEBUG&&console.log("GoogleMap show map with id: "+t.currentTarget.id);for(var e=t.currentTarget,o=0;o<m_mapData.length;o++)m_mapData[o].id==e.id&&(m_mapData[o].showPlaceholder=!1,showSingleMap(m_mapData[o]))}function init(t,e){jQ=t,DEBUG=e,m_apiKey=Mercury.getInfo("googleApiKey"),DEBUG&&(console.info("GoogleMap.init()"),null!=m_apiKey?console.info("GoogleMap API key is: "+Mercury.getInfo("googleApiKey")):console.info("GoogleMap API key not set - Google maps not activated"));var o=jQ(".map-google .mapwindow");if(DEBUG&&console.info("GoogleMap.init() .map-google elements found: "+o.length),o.length>0&&null!=m_apiKey){if(PrivacyPolicy.cookiesAcceptedExternal())return m_mapStyle=Mercury.getThemeJSON("map-style",[]),o.each((function(){var t=jQ(this);if(void 0!==t.data("map")){var e=t.data("map");"string"==typeof e&&(e=JSON.parse(e)),e.id=t.attr("id"),e.showPlaceholder=Mercury.initPlaceholder(t,showMap),DEBUG&&console.info("GoogleMap found with id: "+e.id),m_mapData.push(e),e.showPlaceholder||t.removeClass("placeholder")}})),loadGoogleApi();DEBUG&&console.info("External cookies not accepted by the user - Google maps are disabled!")}}}}]);
//# sourceMappingURL=mercury-map-google.js.map