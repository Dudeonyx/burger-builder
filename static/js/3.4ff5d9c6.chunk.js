(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{20:function(e,t,r){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,c=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(u){a=!0,c=u}finally{try{n||null==i.return||i.return()}finally{if(a)throw c}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}r.d(t,"a",function(){return n})},73:function(e,t,r){e.exports={Burger:"BurgerDisplay_Burger__ARHN3"}},75:function(e,t,r){e.exports={BreadBottom:"BurgerIngredient_BreadBottom__1JbJF",BreadTop:"BurgerIngredient_BreadTop__3WGm9",Seeds1:"BurgerIngredient_Seeds1__wbLMI",Seeds2:"BurgerIngredient_Seeds2__3B0WI",Meat:"BurgerIngredient_Meat__1g-1z",Cheese:"BurgerIngredient_Cheese__1vrHG",Salad:"BurgerIngredient_Salad__Xz0zn",Bacon:"BurgerIngredient_Bacon__jKfEN"}},84:function(e,t,r){"use strict";r.r(t);var n=r(26);function a(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var c=r(20),o=r(0),i=r.n(o),u=r(73),s=r.n(u),d=r(2),l=r(3),m=r(5),f=r(4),p=r(6),g=r(75),b=r.n(g),_=function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return{"bread-top":i.a.createElement("div",{className:b.a.BreadTop},i.a.createElement("div",{className:b.a.Seeds1}),i.a.createElement("div",{className:b.a.Seeds2})),"bread-bottom":i.a.createElement("div",{className:b.a.BreadBottom}),meat:i.a.createElement("div",{className:b.a.Meat}),cheese:i.a.createElement("div",{className:b.a.Cheese}),salad:i.a.createElement("div",{className:b.a.Salad}),bacon:i.a.createElement("div",{className:b.a.Bacon})}[this.props.type]||null}}]),t}(o.Component);r.d(t,"jsxArrayFromObject",function(){return y});var y=function(e,t,r){return Object.entries(e).map(function(e){var o=Object(c.a)(e,2),u=o[0],s=o[1];return a(Array(s)).map(function(e,a){var c=Object(n.a)({},r,u);return i.a.createElement(t,Object.assign({},c,{key:u+(a+1)}))})}).reduce(function(e,t){return a(e).concat(a(t))},[])};t.default=i.a.memo(function(e){var t=y(e.ingredients,_,"type");return 0===t.length&&(t=i.a.createElement("p",null,"Please start adding ingredients")),i.a.createElement("div",{className:s.a.Burger},i.a.createElement(_,{type:"bread-top"}),t,i.a.createElement(_,{type:"bread-bottom"}))})}}]);
//# sourceMappingURL=3.4ff5d9c6.chunk.js.map