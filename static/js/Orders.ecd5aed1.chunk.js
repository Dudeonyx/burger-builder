(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{133:function(e,t,n){"use strict";n.r(t);var r=n(7),a=n.n(r),i=n(12),c=n(0),o=n.n(c),s=n(6),l=n(3),u=n(37),d=Object(l.a)("div",{target:"eshyh3g0"})({name:"1jvrp2x",styles:"&{text-align:center;padding:10px;box-sizing:border-box;box-shadow:0px 0px 10px 1px rgba(0,0,0,0.658);margin:15px;border-radius:10px;display:flex;flex-flow:row wrap;justify-content:center;}.Breakdown{text-transform:capitalize;flex:0.4 0.02 42%;margin:5px 5px;padding:1px;border:1px solid rgba(0,0,0,0.226);border-radius:10px;box-shadow:0 0 4px 1px rgba(0,0,0,0.459);background-color:rgba(169,169,169,0.13);}h4,h5{flex:1 1 100%;}p{flex:1 1 100%;margin:5px 0;@media (min-width:500px){.Breakdown{flex:0.4 0.02 4.95rem;}}}"}),f=function(e){var t=e.ingredients,n=e.totalPrice,r=e.name,a=e.id,i=Object(c.useMemo)(function(){return Object.entries(t).map(function(e){var t=Object(s.a)(e,2),n=t[0],r=t[1];return o.a.createElement("span",{className:"Breakdown",key:a+n+r},n," - ",r,o.a.createElement("br",null),r*u.a[n]>0?o.a.createElement(o.a.Fragment,null,"$",(r*u.a[n]).toFixed(2)):o.a.createElement(o.a.Fragment,null,"N/A"))})},[t,a]);return o.a.createElement(d,null,o.a.createElement("h4",null,"Name: ".concat(r)),i,o.a.createElement("p",null,"Base Cost: $",u.a.base.toFixed(2)),o.a.createElement("h5",null,"Total Cost: $",n))},b=n(22),p=n(15),m=n(91),g=n(80),h=n(25),x=n(18),O=n(17),w=n(13),v=Object(l.a)("div",{target:"ebo8hal0"})("&{position:relative;transition:max-height 0.5s ease;max-height:",function(e){return e.wrapperHeight},"px;transform-origin:top;overflow:hidden;width:100%;}& > .Bouncing{transition:transform 0.5s ease-out;}& > .Background{opacity:",function(e){return e.bgOpacity},";position:absolute;width:100%;height:100%;z-index:-1;display:flex;flex-direction:row;justify-content:flex-end;align-items:center;padding-right:16px;color:white;background-color:#663bb7;box-sizing:border-box;}& > .ListItem{transform:translateX(",function(e){return e.listTransform},"px);opacity:",function(e){return e.listOpacity},";width:100%;align-items:center;box-sizing:border-box;background-color:#fff;height:100%;display:flex;}"),E={leftX:0,bgOpacity:"0",maxHeight:"10000",listElClasses:"ListItem"},j=Object(w.b)({initialState:E,cases:{setLeftX:function(e,t){e.leftX=t},updateOpacity:function(e){var t=+(Math.abs(e.leftX)/100).toFixed(2);t<1&&t.toString()!==e.bgOpacity?e.bgOpacity=t.toString():t>=1&&(e.bgOpacity="1")},setMaxHeight:function(e,t){e.maxHeight=t},setListElClasses:function(e,t){e.listElClasses=t}}}),k=j.reducer,y=j.actions,L=function(e){var t=e.children,n=e.threshold,r=void 0===n?.35:n,a=e.onSwipe,i=Object(c.useReducer)(k,E),l=Object(s.a)(i,2),u=l[0],d=u.leftX,f=u.bgOpacity,b=u.listElClasses,p=u.maxHeight,m=l[1],g=Object(c.useRef)(0),h=Object(c.useRef)(d);h.current=d;var x=Object(c.useRef)(!1),O=Object(c.useRef)(null),w=Object(c.useCallback)(function(e){g.current=e,x.current=!0,m(y.setListElClasses("ListItem"))},[]),j=Object(c.useCallback)(function(e){var t=e.clientX-g.current;t<0&&m(y.setLeftX(t)),m(y.updateOpacity())},[]),L=Object(c.useCallback)(function(e){var t=e.targetTouches[0].clientX-g.current;t<0&&m(y.setLeftX(t)),m(y.updateOpacity())},[]),C=Object(c.useCallback)(function(e){w(e.clientX),window.addEventListener("mousemove",j)},[w,j]),X=Object(c.useCallback)(function(e){var t=e.targetTouches[0];w(t.clientX),window.addEventListener("touchmove",L)},[w,L]),B=Object(c.useCallback)(function(){if(x.current){if(x.current=!1,null===O.current)throw new Error("listElement ref is `null`");h.current<-1*O.current.offsetWidth*r?(m(y.setLeftX(-1*O.current.offsetWidth*2)),a(),m(y.setMaxHeight("0"))):(m(y.setLeftX(0)),m(y.updateOpacity())),m(y.setListElClasses("ListItem Bouncing"))}},[r,a]),M=Object(c.useCallback)(function(){window.removeEventListener("mousemove",j),B()},[j,B]),H=Object(c.useCallback)(function(){window.removeEventListener("touchmove",L),B()},[L,B]);return Object(c.useEffect)(function(){return window.addEventListener("mouseup",M),window.addEventListener("touchend",H),function(){window.removeEventListener("mouseup",M),window.removeEventListener("touchend",H)}},[M,H]),o.a.createElement(v,{bgOpacity:f,listTransform:d,listOpacity:1.8-+f,wrapperHeight:p},o.a.createElement("div",{className:"Background"},o.a.createElement("span",null,"Delete")),o.a.createElement("div",{className:b,ref:O,onMouseDown:C,onTouchMove:X},t))},C=function(){},X={fetchOrders:O.e},B=Object(x.b)(function(e){return{formattedOrders:Object(h.c)(e),loading:Object(h.q)(e),error:Object(h.p)(e),errorMessage:Object(h.d)(e),token:Object(h.i)(e),userId:Object(h.k)(e)}},X);t.default=B(Object(m.a)(function(e){Object(c.useEffect)(function(){Object(i.a)(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.fetchOrders(e.token,e.userId);case 3:t.next=8;break;case 5:t.prev=5,t.t0=t.catch(0),console.error("[fetchOrders(Orders)]",t.t0);case 8:return t.prev=8,n.e(0).then(n.bind(null,132)),t.finish(8);case 11:case"end":return t.stop()}},t,this,[[0,5,8,11]])}))()},[e.fetchOrders,e.token,e.userId]);var t=e.errorMessage?o.a.createElement("div",null,o.a.createElement("p",null,e.errorMessage)):e.loading?o.a.createElement(p.a,null):e.formattedOrders.length>0?e.formattedOrders.map(function(e,t,n){return o.a.createElement("div",{className:"OrderWrapper",key:e.id},o.a.createElement(L,{onSwipe:C},o.a.createElement(f,e)))}):o.a.createElement("div",null,o.a.createElement("p",null,"Your order history is blank."));return o.a.createElement(g.a,null,o.a.createElement("h3",null,"Here Are Your Orders"),o.a.createElement("div",{className:"OrderBox"},t))},b.a))}}]);
//# sourceMappingURL=Orders.ecd5aed1.chunk.js.map