(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{20:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,c=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(u){a=!0,c=u}finally{try{r||null==l.return||l.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,"a",function(){return r})},83:function(e,t,n){e.exports={Button:"Button_Button__DihEC",Success:"Button_Success__3XjCn",Danger:"Button_Danger__2DsKv"}},88:function(e,t,n){"use strict";n.r(t);var r=n(20),a=n(0),c=n.n(a);function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=n(83),u=n.n(l),i=c.a.forwardRef(function(e,t){var n=e.children,r=e.className,a=e.type,l=o(e,["children","className","type"]);return c.a.createElement("button",Object.assign({className:[r,u.a.Button,u.a[a]].join(" ")},l,{ref:t}),n)});t.default=function(e){var t=Object.entries(e.ingredients).map(function(e){var t=Object(r.a)(e,2),n=t[0],a=t[1];return c.a.createElement("li",{style:{textTransform:"capitalize"},key:n},"".concat(n,": ").concat(a))});return c.a.createElement(c.a.Fragment,null,c.a.createElement("h3",{style:{fontWeight:"bold"}},"Order Summary"),c.a.createElement("ul",{style:{}},t),c.a.createElement("p",{style:{fontWeight:"bold"}},"Total Cost: $",e.price.toFixed(2)),c.a.createElement("p",null,"Proceed to Checkout?"),c.a.createElement("div",null,c.a.createElement(i,{onClick:e.purchaseCancel,type:"Danger"},"CANCEL"),c.a.createElement(i,{onClick:e.purchaseContinue,type:"Success"},"ORDER")))}}}]);
//# sourceMappingURL=OrderSummary.768eb969.chunk.js.map