(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{146:function(e,t,n){"use strict";var a=n(33),l=n(12),r=n(0),c=n.n(r),i=Object(l.a)("div",{target:"e1ivm3gi0"})({name:"1tqz5ya",styles:"text-align:center;div{display:flex;flex-flow:column;align-items:center;}ul{text-align:left;}"});t.a=function(e){var t=e.ingredients,n=e.totalCost,l=e.totalCostPrefix,r=e.title,o=Object.entries(t).map(function(e){var t=Object(a.a)(e,2),n=t[0],l=t[1];return c.a.createElement("li",{style:{textTransform:"capitalize"},key:n},c.a.createElement("span",{style:{display:"inline-block",minWidth:"3.7em"}},n,":")," ".concat(l))});return c.a.createElement(i,null,r?c.a.createElement("h3",{style:{fontWeight:"bold"}},r):null,c.a.createElement("div",null,c.a.createElement("ul",null,o)),l?c.a.createElement("p",{style:{fontWeight:"bold"}},l," $",n):null)}},157:function(e,t,n){"use strict";n.r(t);var a=n(33),l=n(0),r=n.n(l),c=n(40),i=n(146);t.default=function(e){var t=e.totalCost,n=e.ingredients,l=e.purchaseCancel,o=e.purchaseContinue,s=e.isAuth;Object.entries(n).map(function(e){var t=Object(a.a)(e,2),n=t[0],l=t[1];return r.a.createElement("li",{style:{textTransform:"capitalize"},key:n},"".concat(n,": ").concat(l))});return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,Object.assign({ingredients:n,totalCost:t},{title:"Order Summary",totalCostPrefix:"Total Cost:"})),r.a.createElement("p",null,"Proceed to Checkout?"),r.a.createElement("div",null,r.a.createElement(c.a,{onClick:l,btnType:"Danger"},"CANCEL"),r.a.createElement(c.a,{onClick:o,btnType:"Success"},s?"ORDER":"SIGN UP/IN TO CONTINUE")))}}}]);
//# sourceMappingURL=OrderSummary.8acaa7b0.chunk.js.map