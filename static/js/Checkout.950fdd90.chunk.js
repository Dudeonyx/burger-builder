(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{126:function(t,e,n){"use strict";var r=n(26),o=n(14),a=n(0),c=n.n(a),i=Object(o.a)("div",{target:"e1ivm3gi0"})({name:"1tqz5ya",styles:"text-align:center;div{display:flex;flex-flow:column;align-items:center;}ul{text-align:left;}"});e.a=function(t){var e=t.ingredients,n=t.totalCost,o=t.totalCostPrefix,a=t.title,u=Object.entries(e).map(function(t){var e=Object(r.a)(t,2),n=e[0],o=e[1];return c.a.createElement("li",{style:{textTransform:"capitalize"},key:n},c.a.createElement("span",{style:{display:"inline-block",minWidth:"3.7em"}},n,":")," ".concat(o))});return c.a.createElement(i,null,a?c.a.createElement("h3",{style:{fontWeight:"bold"}},a):null,c.a.createElement("div",null,c.a.createElement("ul",null,u)),o?c.a.createElement("p",{style:{fontWeight:"bold"}},o," $",n):null)}},140:function(t,e,n){"use strict";n.r(e);var r=n(15),o=n(10),a=n(17),c=n(16),i=n(18),u=n(0),s=n.n(u),l=n(135),p=n(1),h=n.n(p),f=n(9),m=n.n(f),b=n(3),d=n.n(b),y=n(30),g=n(52),j=n.n(g),O={},v=0,E=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"/"===t?t:function(t){var e=t,n=O[e]||(O[e]={});if(n[t])return n[t];var r=j.a.compile(t);return v<1e4&&(n[t]=r,v++),r}(t)(e,{pretty:!0})},C=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};var k=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}(this,t.apply(this,arguments))}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.isStatic=function(){return this.context.router&&this.context.router.staticContext},e.prototype.componentWillMount=function(){d()(this.context.router,"You should not use <Redirect> outside a <Router>"),this.isStatic()&&this.perform()},e.prototype.componentDidMount=function(){this.isStatic()||this.perform()},e.prototype.componentDidUpdate=function(t){var e=Object(y.b)(t.to),n=Object(y.b)(this.props.to);Object(y.c)(e,n)?m()(!1,"You tried to redirect to the same route you're currently on: \""+n.pathname+n.search+'"'):this.perform()},e.prototype.computeTo=function(t){var e=t.computedMatch,n=t.to;return e?"string"===typeof n?E(n,e.params):C({},n,{pathname:E(n.pathname,e.params)}):n},e.prototype.perform=function(){var t=this.context.router.history,e=this.props.push,n=this.computeTo(this.props);e?t.push(n):t.replace(n)},e.prototype.render=function(){return null},e}(s.a.Component);k.propTypes={computedMatch:h.a.object,push:h.a.bool,from:h.a.string,to:h.a.oneOfType([h.a.string,h.a.object]).isRequired},k.defaultProps={push:!1},k.contextTypes={router:h.a.shape({history:h.a.shape({push:h.a.func.isRequired,replace:h.a.func.isRequired}).isRequired,staticContext:h.a.object}).isRequired};var w=k,x=n(14),T=n(11),P=n(126),R=n(28),q=Object(u.lazy)(function(){return n.e(6).then(n.bind(null,139))}),S=Object(x.a)("div",{target:"eoarnrp0"})({name:"1f1hjw7",styles:"text-align:center;margin:auto;"}),W=function(t){var e=t.ingredients,n=t.totalCost,r=t.checkoutCancel,o=t.checkoutContinue,a=t.purchasable;return s.a.createElement(S,null,s.a.createElement("h3",null,"We Hope You'll Enjoy This"),s.a.createElement(u.Suspense,{fallback:s.a.createElement(T.a,null)},s.a.createElement(q,{ingredients:e})),s.a.createElement(P.a,Object.assign({ingredients:e,totalCost:n},{totalCostPrefix:"The total cost of your order is"})),s.a.createElement("div",null,s.a.createElement(R.a,{btnType:"Danger",onClick:r},"CANCEL"),s.a.createElement(R.a,{disabled:!a,btnType:"Success",onClick:o},"CONTINUE")))},z=n(27),M=n(36),_=n(32),D=Object(u.lazy)(function(){return n.e(5).then(n.bind(null,145))}),N=Object(_.a)(D),Y=function(t){function e(){var t,o;Object(r.a)(this,e);for(var i=arguments.length,u=new Array(i),s=0;s<i;s++)u[s]=arguments[s];return(o=Object(a.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(u)))).checkoutCancel=function(){o.props.history.goBack()},o.checkoutContinue=function(){setTimeout(function(){return n.e(1).then(n.bind(null,143))},2e3),o.props.history.push(o.props.match.path+"/contact-data")},o}return Object(i.a)(e,t),Object(o.a)(e,[{key:"render",value:function(){return s.a.createElement("div",null,this.props.ingredients&&this.props.totalPrice?s.a.createElement(s.a.Fragment,null,s.a.createElement(l.a,{path:this.props.match.path+"/contact-data",render:function(t){return N(t)}}),s.a.createElement(W,{ingredients:this.props.ingredients,totalCost:this.props.totalPrice,checkoutCancel:this.checkoutCancel,checkoutContinue:this.checkoutContinue,purchasable:this.props.purchaseable})):s.a.createElement(w,{to:"/"}))}}]),e}(u.Component),A=Object(z.b)(function(t){return{ingredients:Object(M.i)(t),totalPrice:Object(M.d)(t),purchaseable:Object(M.c)(t)}},null);e.default=A(Y)}},0,[6,5]]);
//# sourceMappingURL=Checkout.950fdd90.chunk.js.map