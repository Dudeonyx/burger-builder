(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{20:function(e,t,n){"use strict";function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(u){a=!0,o=u}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(t,"a",function(){return r})},81:function(e,t,n){e.exports={Button:"Button_Button__DihEC",Success:"Button_Success__3XjCn",Danger:"Button_Danger__2DsKv"}},85:function(e,t,n){"use strict";n.r(t);var r=n(20),a=n(0),o=n.n(a);function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=n(81),u=n.n(l),i=o.a.forwardRef(function(e,t){var n=e.children,r=e.className,a=e.type,l=c(e,["children","className","type"]);return o.a.createElement("button",Object.assign({className:[r,u.a.Button,u.a[a]].join(" ")},l,{ref:t}),n)});t.default=function(e){var t=Object.entries(e.ingredients).map(function(e){var t=Object(r.a)(e,2),n=t[0],a=t[1];return o.a.createElement("li",{style:{textTransform:"capitalize"},key:n},"".concat(n,": ").concat(a))});return console.log("[OrderSummary]"),o.a.createElement(o.a.Fragment,null,o.a.createElement("h3",{style:{fontWeight:"bold"}},"Order Summary"),o.a.createElement("ul",{style:{}},t),o.a.createElement("p",{style:{fontWeight:"bold"}},"Total Cost: $",e.price.toFixed(2)),o.a.createElement("p",null,"Proceed to Checkout?"),o.a.createElement("div",null,o.a.createElement(i,{onClick:e.purchaseCancel,type:"Danger"},"CANCEL"),o.a.createElement(i,{onClick:e.purchaseContinue,type:"Success"},"ORDER")))}}}]);
//# sourceMappingURL=5.53b51d7a.chunk.js.map