(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{120:function(e,r,t){e.exports={BreadBottom:"BurgerIngredient_BreadBottom__1JbJF",BreadTop:"BurgerIngredient_BreadTop__3WGm9",Seeds1:"BurgerIngredient_Seeds1__wbLMI",Seeds2:"BurgerIngredient_Seeds2__3B0WI",Meat:"BurgerIngredient_Meat__1g-1z",Cheese:"BurgerIngredient_Cheese__1vrHG",Salad:"BurgerIngredient_Salad__Xz0zn",Bacon:"BurgerIngredient_Bacon__jKfEN"}},122:function(e,r,t){e.exports={Burger:"BurgerDisplay_Burger__ARHN3"}},131:function(e,r,t){"use strict";function a(e){return function(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.r(r);var n=t(44),c=t(0),o=t.n(c),i=t(120),d=t.n(i),s={bacon:o.a.createElement("div",{className:d.a.Bacon}),"bread-bottom":o.a.createElement("div",{className:d.a.BreadBottom}),"bread-top":o.a.createElement("div",{className:d.a.BreadTop},o.a.createElement("div",{className:d.a.Seeds1}),o.a.createElement("div",{className:d.a.Seeds2})),cheese:o.a.createElement("div",{className:d.a.Cheese}),meat:o.a.createElement("div",{className:d.a.Meat}),salad:o.a.createElement("div",{className:d.a.Salad})},u=function(e){var r=e.type;return s[r]||null},l=t(122),m=t.n(l),g=function(e,r){return Object.entries(r).map(function(r){var t=Object(n.a)(r,2),c=t[0],i=t[1];return a(Array(i)).map(function(r,t){return o.a.createElement(e,Object.assign({type:c},{key:c+(t+1)}))})}).reduce(function(e,r){return a(e).concat(a(r))},[])},_=o.a.memo(function(e){var r=g(u,e.ingredients);return 0===r.length&&(r=o.a.createElement("p",null,"Please start adding ingredients")),o.a.createElement("div",{className:m.a.Burger},o.a.createElement(u,{type:"bread-top"}),r,o.a.createElement(u,{type:"bread-bottom"}))});t.d(r,"default",function(){return _}),t.d(r,"jsxArrayFromObject",function(){return g})}}]);
//# sourceMappingURL=2.d9564cd9.chunk.js.map