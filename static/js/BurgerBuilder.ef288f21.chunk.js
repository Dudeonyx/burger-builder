(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{131:function(e,t,n){"use strict";n.r(t);var a=n(23),r=n(97),i=n.n(r),s=n(98),c=n(7),u=n(6),l=n(9),o=n(8),h=n(10),d=n(50),p=n(0),f=n.n(p),b=n(47),g=n(27),m=n(11),v=n(52),j=n(46),O=n.e(8).then(n.bind(null,116)),w=Object(p.lazy)(function(){return n.e(1).then(n.bind(null,126))}),k=Object(p.lazy)(function(){return n.e(9).then(n.bind(null,127))}),E=Object(p.lazy)(function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,34))}),y=Object(p.lazy)(function(){return n.e(10).then(n.bind(null,125))}),S=function(e){function t(){var e,n;Object(c.a)(this,t);for(var r=arguments.length,u=new Array(r),h=0;h<r;h++)u[h]=arguments[h];return(n=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(u)))).state={ingredients:null,totalPrice:"4",purchasable:!1,purchasing:!1,loading:!1,orders:[],error:null},n.ingredientIncreaseHandler=function(){var e=Object(s.a)(i.a.mark(function e(t){var a,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.state.ingredients){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,O;case 4:a=e.sent.default,r=a(n.state,function(e){e.ingredients[t]+=1,e.totalPrice=Object(j.b)(e.ingredients),e.purchasable=Object(d.a)(e.ingredients)}),n.setState(r);case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.ingredientDecreaseHandler=function(){var e=Object(s.a)(i.a.mark(function e(t){var a,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n.state.ingredients){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,O;case 4:a=e.sent.default,r=a(n.state,function(e){e.ingredients[t]-=1,e.totalPrice=Object(j.b)(e.ingredients),e.purchasable=Object(d.a)(e.ingredients)}),n.setState(r);case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.purchaseStartHandler=function(){n.setState({purchasing:!0})},n.purchaseCancelHandler=function(){n.setState({purchasing:!1})},n.purchaseContinueHandler=function(){if(n.state.ingredients){var e=Object.entries(n.state.ingredients).map(function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];return"".concat(encodeURIComponent(n),"=").concat(r)}).join("&");n.props.history.push({pathname:"/checkout",search:"?"+e})}},n.fetchIngredients=Object(s.a)(i.a.mark(function e(){var t,a,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.setState({error:null}),e.prev=1,e.next=4,b.a.get("/ingredients.json");case 4:t=e.sent,a=t.data,r=Object(j.b)(a),n.setState({ingredients:a,purchasable:Object(d.a)(a),totalPrice:r}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),n.setState({error:e.t0});case 13:case"end":return e.stop()}},e,this,[[1,10]])})),n.offline=function(){n.setState({error:!1,ingredients:{bacon:0,cheese:0,meat:0,salad:0},totalPrice:"4"})},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.fetchIngredients()}},{key:"render",value:function(){var e=this.state.error?f.a.createElement(g.a,{retryHandler:this.fetchIngredients,mainMessage:"Ingredients Failed To Load. Please ",additionalMessage:f.a.createElement("span",{style:{color:"blue",cursor:"pointer"},onClick:this.offline},"work offline for now?")}):f.a.createElement(m.a,null),t=null;return this.state.ingredients&&(e=f.a.createElement(f.a.Fragment,null,f.a.createElement(f.a.Suspense,{fallback:f.a.createElement(m.a,null)},f.a.createElement(w,{ingredients:this.state.ingredients})),f.a.createElement(f.a.Suspense,{fallback:f.a.createElement(m.a,null)},f.a.createElement(k,{ingredients:this.state.ingredients,price:this.state.totalPrice,increase:this.ingredientIncreaseHandler,decrease:this.ingredientDecreaseHandler,purchasable:this.state.purchasable,purchaseStart:this.purchaseStartHandler}))),t=f.a.createElement(f.a.Suspense,{fallback:f.a.createElement(m.a,null)},f.a.createElement(y,{ingredients:this.state.ingredients,totalCost:this.state.totalPrice,purchaseCancel:this.purchaseCancelHandler,purchaseContinue:this.purchaseContinueHandler}))),this.state.loading&&(t=f.a.createElement(m.a,null)),f.a.createElement(f.a.Suspense,{fallback:f.a.createElement(m.a,null)},f.a.createElement(E,{show:this.state.purchasing,hider:this.purchaseCancelHandler},t),e)}}]),t}(p.Component);t.default=Object(v.a)(S,b.a)},97:function(e,t,n){e.exports=n(49)},98:function(e,t,n){"use strict";function a(e,t,n,a,r,i,s){try{var c=e[i](s),u=c.value}catch(l){return void n(l)}c.done?t(u):Promise.resolve(u).then(a,r)}function r(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var s=e.apply(t,n);function c(e){a(s,r,i,c,u,"next",e)}function u(e){a(s,r,i,c,u,"throw",e)}c(void 0)})}}n.d(t,"a",function(){return r})}},0,[0,7,9,1,8]]);
//# sourceMappingURL=BurgerBuilder.ef288f21.chunk.js.map