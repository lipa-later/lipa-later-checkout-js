!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.lipalater=t():e.lipalater=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,o)=>{for(var i in o)e.o(o,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{openModal:()=>r});const o=["delivery_option","facility_plan","item_brand","item_code","item_decription","item_type","item_value","preferred_option","store_key"];function i(e,t){const o=document.createElement("input");return o.type="hidden",o.name=e,o.value=t,o}function n(e){return!e}function r(e){const{orderDetails:t,api_key:r,onFail:l,onSuccess:a}=e;if(n(r))throw"api_key missing. Please provide an api_key";if(n(t))throw"orderDetails missing. Please provide the orderDetails object";t.items.map((e=>{const t=Object.keys(e);let i=o.filter((e=>!t.includes(e)));if(i.length>0)throw`One of the object(s) is missing the ${i} property`}));const c=function(){const e=document.createElement("div");return e.className="lipa-later-checkout__overlay",e.style.position="fixed",e.style.width="100%",e.style.height="100%",e.style.top="0",e.style.left="0",e.style.right="0",e.style.bottom="0",e.style.backgroundColor="#f0f4f8",e}(),d=function(){const e=document.createElement("iframe");return e.id="lipa-later-checkout",e.name="lipa-later-checkout",e.width="100%",e.height="100%",e}();c.appendChild(d);const s=document.getElementsByTagName("script"),p=s[s.length-1];p.parentNode.insertBefore(c,p.nextSibling),function(e,t){const o=e.items,n=document.createElement("form");n.id="lipa-later-item-data",n.method="post",n.target="lipa-later-checkout",n.action="http://localhost:3000";const r=i("order_id",e.order_id),l=i("api_key",t);n.appendChild(r),n.appendChild(l),o.map(((e,t)=>{for(const[o,r]of Object.entries(e)){const e=i(o+(t+1),r);n.appendChild(e)}})),document.body.appendChild(n),n.submit()}(t,r)}return"undefined"!=typeof window&&window.addEventListener("message",(e=>{"http://localhost:3000"!==e.origin?console.error(e.origin," is an invalid origin"):document.querySelector(".lipa-later-checkout__overlay").remove()}),!1),t})()}));