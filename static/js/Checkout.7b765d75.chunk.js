(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{116:function(e,t,n){e.exports=n(68)},117:function(e,t,n){"use strict";function a(e,t,n,a,r,o,i){try{var c=e[o](i),s=c.value}catch(l){return void n(l)}c.done?t(s):Promise.resolve(s).then(a,r)}function r(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function c(e){a(i,r,o,c,s,"next",e)}function s(e){a(i,r,o,c,s,"throw",e)}c(void 0)})}}n.d(t,"a",function(){return r})},118:function(e,t,n){"use strict";var a=n(35),r=n(0),o=n.n(r),i=n(119),c=n.n(i);t.a=function(e){var t=e.ingredients,n=e.totalCost,r=e.totalCostPrefix,i=e.title,s=Object.entries(t).map(function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];return o.a.createElement("li",{style:{textTransform:"capitalize"},key:n},o.a.createElement("span",{style:{display:"inline-block",minWidth:"3.7em"}},n,":")," ".concat(r))});return o.a.createElement("div",{className:c.a.OrderText},i?o.a.createElement("h3",{style:{fontWeight:"bold"}},i):null,o.a.createElement("div",null,o.a.createElement("ul",null,s)),r?o.a.createElement("p",{style:{fontWeight:"bold"}},r," $",n):null)}},119:function(e,t,n){e.exports={OrderText:"OrderText_OrderText__3ZKBI"}},126:function(e,t,n){e.exports={CheckoutSummary:"CheckoutSummary_CheckoutSummary__3N_ia"}},139:function(e,t,n){"use strict";n.r(t);var a=n(8),r=n(6),o=n(10),i=n(9),c=n(11),s=n(0),l=n.n(s),u=n(135),d=n(1),p=n.n(d),h=n(5),b=n.n(h),m=n(2),f=n.n(m),y=n(20),v=n(43),g=n.n(v),O={},j=0,x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"/"===e?e:function(e){var t=e,n=O[t]||(O[t]={});if(n[e])return n[e];var a=g.a.compile(e);return j<1e4&&(n[e]=a,j++),a}(e)(t,{pretty:!0})},C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e};var k=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,e.apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.isStatic=function(){return this.context.router&&this.context.router.staticContext},t.prototype.componentWillMount=function(){f()(this.context.router,"You should not use <Redirect> outside a <Router>"),this.isStatic()&&this.perform()},t.prototype.componentDidMount=function(){this.isStatic()||this.perform()},t.prototype.componentDidUpdate=function(e){var t=Object(y.b)(e.to),n=Object(y.b)(this.props.to);Object(y.c)(t,n)?b()(!1,"You tried to redirect to the same route you're currently on: \""+n.pathname+n.search+'"'):this.perform()},t.prototype.computeTo=function(e){var t=e.computedMatch,n=e.to;return t?"string"===typeof n?x(n,t.params):C({},n,{pathname:x(n.pathname,t.params)}):n},t.prototype.perform=function(){var e=this.context.router.history,t=this.props.push,n=this.computeTo(this.props);t?e.push(n):e.replace(n)},t.prototype.render=function(){return null},t}(l.a.Component);k.propTypes={computedMatch:p.a.object,push:p.a.bool,from:p.a.string,to:p.a.oneOfType([p.a.string,p.a.object]).isRequired},k.defaultProps={push:!1},k.contextTypes={router:p.a.shape({history:p.a.shape({push:p.a.func.isRequired,replace:p.a.func.isRequired}).isRequired,staticContext:p.a.object}).isRequired};var E=k,S=n(67),w=n(118),_=n(126),T=n.n(_),M=n(12),P=Object(s.lazy)(function(){return n.e(0).then(n.bind(null,140))}),q=function(e){var t=e.ingredients,n=e.totalCost,a=e.checkoutCancel,r=e.checkoutContinue,o=e.purchasable;return l.a.createElement("div",{className:T.a.CheckoutSummary},l.a.createElement("h3",null,"We Hope You'll Enjoy This"),l.a.createElement(s.Suspense,{fallback:l.a.createElement(M.a,null)},l.a.createElement(P,{ingredients:t})),l.a.createElement(w.a,Object.assign({ingredients:t,totalCost:n},{totalCostPrefix:"The total cost of your order is"})),l.a.createElement("div",null,l.a.createElement(S.a,{btnType:"Danger",onClick:a},"CANCEL"),l.a.createElement(S.a,{disabled:!o,btnType:"Success",onClick:r},"CONTINUE")))},Y=n(116),D=n.n(Y),N=n(117),R=(n(16),n(27)),I=n(66),W=(R.b,{name:"pm02nw",styles:"*{box-sizing:border-box;}label{display:flex;justify-content:space-between;}label.radio{justify-content:center;}span{flex:2 1 5em;align-self:center;text-align:left;padding-left:1em;}input{flex:10 1 auto;background-color:rgba(255,255,255,0.74);border-radius:10px;padding:4px;outline:none;}.radio input{flex:0;}input:focus{background-color:rgb(255,255,255);border:2px solid rgb(255,166,0);}@media (max-width:400px){font-size:0.85em;}"}),z=function(e){var t=e.type,n=e.id,a=e.name,r=e.placeholder,o=e.onChange,i=e.value,c=e.label,s=e.defaultChecked,l=(e.checked,e.dataSet),u=e.required,d=null;switch(t){case"text":case"email":case"street-address":case"country-name":case"tel":d=Object(R.b)("div",{css:W},Object(R.b)("label",{htmlFor:n},Object(R.b)("span",null,c," "),Object(R.b)("input",{id:n,type:t,name:a,placeholder:r,onChange:o,value:i,"data-set":l,required:u})));break;case"radio":d=Object(R.b)("div",{css:W},Object(R.b)("label",{htmlFor:n,className:"radio"},Object(R.b)("input",{id:n,type:t,name:a,onChange:o,value:i,defaultChecked:s,"data-set":l})," ",Object(R.b)("span",null,c)))}return d},H=n(38),A=n(26),B=(R.b,{name:"jbhiue",styles:"margin:10px auto;text-align:center;form div{margin:4px 0;}form{box-sizing:border-box;border-radius:10px;background-color:rgba(255,255,255,0.842);}@media (min-width:550px){max-width:540px;}"}),F=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(o.a)(this,Object(i.a)(t).call(this,e))).formHandler=function(){var e=Object(N.a)(D.a.mark(function e(t){var a,r,o,i,c;return D.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=t.currentTarget.value,r=void 0===a?"":a,o=t.currentTarget.name,i=t.currentTarget.dataset.set,c=void 0===i?"":i,n.setState(Object(H.a)(function(e){e.customer[c]&&o in e.customer[c]?e.customer[c][o].value=r:console.error("".concat(o," not found in ").concat(c))}));case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),n.cancel=function(e){e.preventDefault(),n.props.history.goBack()},n.submit=function(){var e=Object(N.a)(D.a.mark(function e(t){var a,r,o,i,c,s;return D.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.currentTarget.form||!t.currentTarget.form.reportValidity()){e.next=17;break}return e.prev=1,t.preventDefault(),n.setState({loading:!0}),a=n.state.customer,r=a.deliveryMethod,o=a.basicInfo,i=a.address,c={basicInfo:{name:o.name.value,phone:o.phone.value,email:o.email.value},address:{street:i.street.value,city:i.city.value,state:i.state.value,country:i.country.value},deliveryMethod:r.deliveryMethod.value,ingredients:n.props.ingredients,price:n.props.totalPrice,date:Date()},e.next=8,I.a.post("/orders.json",c);case 8:s=e.sent,console.log(s),n.setState(function(){return{loading:!1}},function(){return n.props.history.push("/all-orders")}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),console.log(e.t0),n.setState({loading:!1});case 17:case"end":return e.stop()}},e,this,[[1,13]])}));return function(t){return e.apply(this,arguments)}}(),n.state={customer:{basicInfo:{name:{value:"",type:"text",placeholder:"Your Name",id:"name_id",name:"name",label:"Name:",dataSet:"basicInfo",required:!0},phone:{value:"",type:"tel",placeholder:"Your Phone no.",id:"phone_id",name:"phone",label:"Phone no.:",dataSet:"basicInfo",required:!0},email:{value:"",type:"email",placeholder:"Your Email",id:"email_id",name:"email",label:"Email:",dataSet:"basicInfo",required:!0}},address:{street:{value:"",type:"street-address",placeholder:"Your Street",id:"street_id",name:"street",label:"Street:",dataSet:"address",required:!0},city:{value:"",type:"text",placeholder:"Your City",id:"city_id",name:"city",label:"City:",dataSet:"address",required:!0},state:{value:"",type:"text",placeholder:"Your State/Province",id:"state_id",name:"state",label:"State/\nProvince:",dataSet:"address",required:!0},country:{value:"",type:"country-name",placeholder:"Your Country",id:"country_id",name:"country",label:"Country:",dataSet:"address",required:!0}},deliveryMethod:{deliveryMethod:{value:""},options:[{value:"cheapest",type:"radio",id:"cheapest_id",name:"deliveryMethod",label:"Cheapest",dataSet:"deliveryMethod"},{value:"cheap",type:"radio",id:"cheap_id",name:"deliveryMethod",label:"Cheap",dataSet:"deliveryMethod"},{value:"normal",type:"radio",id:"normal_id",name:"deliveryMethod",label:"Normal",defaultChecked:!0,dataSet:"deliveryMethod"},{value:"expensive",type:"radio",id:"expensive_id",name:"deliveryMethod",label:"Expensive",dataSet:"deliveryMethod"},{value:"very_expensive",type:"radio",id:"very_expensive_id",name:"deliveryMethod",label:"Very Expensive",dataSet:"deliveryMethod"}]}},loading:!1},n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.state.customer,n=t.address,a=t.deliveryMethod,r=t.basicInfo,o=this.state.loading?Object(R.b)(M.a,null):Object(R.b)("form",{id:"order_form"},Object(R.b)("h3",null,"Enter Your Contact Details to Complete Your Order."),Object.values(r).map(function(t){return Object(R.b)(z,Object.assign({},t,{onChange:e.formHandler,key:t.id}))}),Object(R.b)("fieldset",null,Object(R.b)("legend",null,"Address"),Object.values(n).map(function(t){return Object(R.b)(z,Object.assign({},t,{onChange:e.formHandler,key:t.id}))})),Object(R.b)("fieldset",null,Object(R.b)("legend",null,"Delivery Method"),a.options.map(function(t){return Object(R.b)(z,Object.assign({},t,{onChange:e.formHandler,key:t.id}))})),Object(R.b)("div",null,Object(R.b)(S.a,{type:"reset",children:"CANCEL",onClick:this.cancel,btnType:"Danger"}),Object(R.b)(S.a,{type:"submit",children:"ORDER",onClick:this.submit,btnType:"Success"})));return Object(R.b)("div",{css:B},Object(R.b)(A.a,{show:!0,hider:this.cancel,bgColor:"white",minWidth:650},o))}}]),t}(s.Component),J=n(69),L=n(19),U=n(17),V=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(o.a)(this,Object(i.a)(t).call(this,e))).componentDidMount=function(){if(n.props.ingredients){var e=Object(J.a)(n.props.ingredients);n.setState({purchasable:e})}},n.checkoutCancel=function(){n.props.history.goBack()},n.checkoutContinue=function(){n.props.history.push(n.props.match.path+"/contact-data")},n.state={purchasable:!1},n}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement(u.a,{path:this.props.match.path+"/contact-data",render:function(t){return e.props.ingredients&&e.props.totalPrice?l.a.createElement(F,Object.assign({},t,{ingredients:e.props.ingredients,totalPrice:e.props.totalPrice})):null}}),this.props.ingredients&&this.props.totalPrice?l.a.createElement(l.a.Fragment,null,l.a.createElement(q,{ingredients:this.props.ingredients,totalCost:this.props.totalPrice,checkoutCancel:this.checkoutCancel,checkoutContinue:this.checkoutContinue,purchasable:this.state.purchasable})):l.a.createElement(E,{to:"/"}))}}]),t}(s.Component);t.default=Object(U.b)(L.e)(V)}}]);
//# sourceMappingURL=Checkout.7b765d75.chunk.js.map