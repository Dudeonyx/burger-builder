(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{126:function(e,r,t){e.exports={BreadBottom:"BurgerIngredient_BreadBottom__3fY1M",BreadTop:"BurgerIngredient_BreadTop__Td0dG",Seeds1:"BurgerIngredient_Seeds1__2l3Qa",Seeds2:"BurgerIngredient_Seeds2__toSs5",Meat:"BurgerIngredient_Meat__ddIbA",Cheese:"BurgerIngredient_Cheese__1pJ19",Salad:"BurgerIngredient_Salad__1t4Vd",Bacon:"BurgerIngredient_Bacon__cAFFM"}},128:function(e,r,t){e.exports={Burger:"BurgerDisplay_Burger__3yFAY"}},135:function(e,r,t){"use strict";function a(e){return function(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.r(r);var n=t(40),c=t(0),o=t.n(c),s=t(126),d=t.n(s),i=o.a.memo(function(e){return function(e){switch(e){case"bread-bottom":return o.a.createElement("div",{className:d.a.BreadBottom});case"bread-top":return o.a.createElement("div",{className:d.a.BreadTop},o.a.createElement("div",{className:d.a.Seeds1}),o.a.createElement("div",{className:d.a.Seeds2}));case"bacon":return o.a.createElement("div",{className:d.a.Bacon});case"cheese":return o.a.createElement("div",{className:d.a.Cheese});case"meat":return o.a.createElement("div",{className:d.a.Meat});case"salad":return o.a.createElement("div",{className:d.a.Salad});default:return null}}(e.type)}),u=t(128),l=t.n(u);t.d(r,"jsxArrayFromObject",function(){return m});var m=function(e,r){return Object.entries(r).map(function(r){var t=Object(n.a)(r,2),c=t[0],s=t[1];return a(Array(s)).map(function(r,t){return o.a.createElement(e,Object.assign({type:c},{key:c+(t+1)}))})}).reduce(function(e,r){return[].concat(a(e),a(r))},[])};r.default=o.a.memo(function(e){var r=m(i,e.ingredients);return 0===r.length&&(r=o.a.createElement("p",null,"Please start adding ingredients")),o.a.createElement("div",{className:l.a.Burger},o.a.createElement(i,{type:"bread-top"}),r,o.a.createElement(i,{type:"bread-bottom"}))})}}]);
//# sourceMappingURL=BurgerDisplay.dcc5a2a4.chunk.js.map