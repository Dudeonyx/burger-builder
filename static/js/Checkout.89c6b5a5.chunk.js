(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{124:function(e,t,n){"use strict";var r=n(24),a=n(25),o=n(0),i=n.n(o),c=Object(a.a)("div",{target:"e1ivm3gi0"})({name:"1tqz5ya",styles:"text-align:center;div{display:flex;flex-flow:column;align-items:center;}ul{text-align:left;}"});t.a=function(e){var t=e.ingredients,n=e.totalCost,a=e.totalCostPrefix,o=e.title,s=Object.entries(t).map(function(e){var t=Object(r.a)(e,2),n=t[0],a=t[1];return i.a.createElement("li",{style:{textTransform:"capitalize"},key:n},i.a.createElement("span",{style:{display:"inline-block",minWidth:"3.7em"}},n,":")," ".concat(a))});return i.a.createElement(c,null,o?i.a.createElement("h3",{style:{fontWeight:"bold"}},o):null,i.a.createElement("div",null,i.a.createElement("ul",null,s)),a?i.a.createElement("p",{style:{fontWeight:"bold"}},a," $",n):null)}},137:function(e,t,n){"use strict";n.r(t);var r=n(12),a=n(9),o=n(14),i=n(13),c=n(15),s=n(0),l=n.n(s),u=n(133),p=n(1),h=n.n(p),m=n(7),f=n.n(m),d=n(2),b=n.n(d),y=n(28),g=n(51),v=n.n(g),E={},j=0,O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"/"===e?e:function(e){var t=e,n=E[t]||(E[t]={});if(n[e])return n[e];var r=v.a.compile(e);return j<1e4&&(n[e]=r,j++),r}(e)(t,{pretty:!0})},C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};var x=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,e.apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.isStatic=function(){return this.context.router&&this.context.router.staticContext},t.prototype.componentWillMount=function(){b()(this.context.router,"You should not use <Redirect> outside a <Router>"),this.isStatic()&&this.perform()},t.prototype.componentDidMount=function(){this.isStatic()||this.perform()},t.prototype.componentDidUpdate=function(e){var t=Object(y.b)(e.to),n=Object(y.b)(this.props.to);Object(y.c)(t,n)?f()(!1,"You tried to redirect to the same route you're currently on: \""+n.pathname+n.search+'"'):this.perform()},t.prototype.computeTo=function(e){var t=e.computedMatch,n=e.to;return t?"string"===typeof n?O(n,t.params):C({},n,{pathname:O(n.pathname,t.params)}):n},t.prototype.perform=function(){var e=this.context.router.history,t=this.props.push,n=this.computeTo(this.props);t?e.push(n):e.replace(n)},t.prototype.render=function(){return null},t}(l.a.Component);x.propTypes={computedMatch:h.a.object,push:h.a.bool,from:h.a.string,to:h.a.oneOfType([h.a.string,h.a.object]).isRequired},x.defaultProps={push:!1},x.contextTypes={router:h.a.shape({history:h.a.shape({push:h.a.func.isRequired,replace:h.a.func.isRequired}).isRequired,staticContext:h.a.object}).isRequired};var k=x,w=n(25),T=n(17),D=n(124),P=n(33),R=Object(s.lazy)(function(){return n.e(5).then(n.bind(null,138))}),S=Object(w.a)("div",{target:"eoarnrp0"})({name:"1f1hjw7",styles:"text-align:center;margin:auto;"}),q=function(e){var t=e.ingredients,n=e.totalCost,r=e.checkoutCancel,a=e.checkoutContinue,o=e.purchasable;return l.a.createElement(S,null,l.a.createElement("h3",null,"We Hope You'll Enjoy This"),l.a.createElement(s.Suspense,{fallback:l.a.createElement(T.a,null)},l.a.createElement(R,{ingredients:t})),l.a.createElement(D.a,Object.assign({ingredients:t,totalCost:n},{totalCostPrefix:"The total cost of your order is"})),l.a.createElement("div",null,l.a.createElement(P.a,{btnType:"Danger",onClick:r},"CANCEL"),l.a.createElement(P.a,{disabled:!o,btnType:"Success",onClick:a},"CONTINUE")))},A=n(19),I=n.n(A),M=n(26),W=n(35),F=n(4),Y=n(47),_=n(18),z=n(78),N=n(22),B=Object(w.a)("div",{target:"en184nl0"})({name:"jbhiue",styles:"margin:10px auto;text-align:center;form div{margin:4px 0;}form{box-sizing:border-box;border-radius:10px;background-color:rgba(255,255,255,0.842);}@media (min-width:550px){max-width:540px;}"}),J=n(46),L=n(20),U=n(62),H=function(e){function t(){var e,n;Object(r.a)(this,t);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(n=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(c)))).mapToInput=Object(U.a)(n.props.updateContactDataForm),n.cancel=function(e){e.preventDefault(),n.props.resetContactDataForm(),n.props.history.goBack()},n.submit=function(){var e=Object(M.a)(I.a.mark(function e(t){return I.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.currentTarget.form||!t.currentTarget.form.reportValidity()){e.next=13;break}if(e.prev=1,t.preventDefault(),n.props.ingredients){e.next=5;break}throw new Error("Empty Ingredients object!!!");case 5:return e.next=7,n.props.submitOrder(n.props.ingredients,n.props.totalPrice);case 7:n.props.history.push("/all-orders"),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.error(e.t0);case 13:case"end":return e.stop()}},e,this,[[1,10]])}));return function(t){return e.apply(this,arguments)}}(),n}return Object(c.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){var e=this.props.customer,t=e.name,n=e.city,r=e.country,a=e.deliveryMethod,o=e.email,i=e.phone,c=e.state,s=e.street,u=this.props.submitting?l.a.createElement(T.a,null):l.a.createElement("form",{id:"order_form"},l.a.createElement("h3",null,"Enter Your Contact Details to Complete Your Order."),[t,o,i].map(this.mapToInput),l.a.createElement("fieldset",null,l.a.createElement("legend",null,"Address"),[s,n,c,r].map(this.mapToInput)),l.a.createElement("fieldset",null,l.a.createElement("legend",null,"Delivery Method"),[a].map(this.mapToInput)),l.a.createElement("div",null,l.a.createElement(P.a,{type:"reset",children:"CANCEL",onClick:this.cancel,btnType:"Danger"}),l.a.createElement(P.a,{type:"submit",children:"ORDER",onClick:this.submit,btnType:"Success"})));return l.a.createElement(B,null,l.a.createElement(W.a,{show:!0,hider:this.cancel,bgColor:"white",minWidth:650},u))}}]),t}(s.Component),V=Object(L.a)(J.d,J.h,J.e,J.c,function(e,t,n,r){return{customer:e,submitting:t,ingredients:n,totalPrice:r}}),$=Object(Y.b)(V,function(e){return Object(_.bindActionCreators)({updateContactDataForm:F.j,resetContactDataForm:F.h,submitOrder:F.i},e)})(Object(z.a)(H,N.a)),G=function(e){function t(){var e,a;Object(r.a)(this,t);for(var c=arguments.length,s=new Array(c),l=0;l<c;l++)s[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(s)))).checkoutCancel=function(){a.props.history.goBack()},a.checkoutContinue=function(){setTimeout(function(){return n.e(1).then(n.bind(null,139))},2e3),a.props.history.push(a.props.match.path+"/contact-data")},a}return Object(c.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,this.props.ingredients&&this.props.totalPrice?l.a.createElement(l.a.Fragment,null,l.a.createElement(u.a,{path:this.props.match.path+"/contact-data",component:$}),l.a.createElement(q,{ingredients:this.props.ingredients,totalCost:this.props.totalPrice,checkoutCancel:this.checkoutCancel,checkoutContinue:this.checkoutContinue,purchasable:this.props.purchaseable})):l.a.createElement(k,{to:"/"}))}}]),t}(s.Component),K=Object(L.a)(J.e,J.c,J.b,function(e,t,n){return{ingredients:e,totalPrice:t,purchaseable:n}}),Q=Object(Y.b)(K,null);t.default=Q(G)}},0,[5]]);
//# sourceMappingURL=Checkout.89c6b5a5.chunk.js.map