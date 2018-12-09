(window.webpackJsonp=window.webpackJsonp||[]).push([[4,9],{137:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(5),l=n(8),c=n(7),i=n(9),o=n(0),u=n.n(o),s=n(132),d=n(52),m=n(56),p=n(76),h=n.n(p),f=n(15),b=Object(o.lazy)(function(){return n.e(2).then(n.bind(null,130))}),E=function(e){var t=e.ingredients,n=e.totalCost,a=e.checkoutCancel,r=e.checkoutContinue,l=e.purchasable;return u.a.createElement("div",{className:h.a.CheckoutSummary},u.a.createElement("h3",null,"We Hope You'll Enjoy This"),u.a.createElement(o.Suspense,{fallback:u.a.createElement(f.a,null)},u.a.createElement(b,{ingredients:t})),u.a.createElement(m.a,Object.assign({ingredients:t,totalCost:n},{totalCostPrefix:"The total cost of your order is"})),u.a.createElement("div",null,u.a.createElement(d.a,{btnType:"Danger",onClick:a},"CANCEL"),u.a.createElement(d.a,{disabled:!l,btnType:"Success",onClick:r},"CONTINUE")))},v=n(46),y=n(78),_=n.n(y),g=n(59),O=n.n(g),C=n(53),j=n(60);function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){Object(j.a)(e,t,n[t])})}return e}var x=n(61),S=n(82),w=n.n(S),D=n(47),P=n(51),N=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(l.a)(this,Object(c.a)(t).call(this,e))).componentDidMount=function(){},n.cancel=function(e){e.preventDefault(),n.props.history.goBack()},n.submit=function(){var e=Object(x.a)(O.a.mark(function e(t){var a,r,l,c,i,o,u;return O.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.currentTarget.form||!t.currentTarget.form.reportValidity()){e.next=19;break}return e.prev=1,t.preventDefault(),n.setState({loading:!0}),a=t.currentTarget.form,r=a.name.value,l=a.delivery_method.value,console.log(r,l),c=k({},n.state.customer,{name:r}),i=k({},n.state,{customer:c,deliveryMethod:l,ingredients:n.props.ingredients,price:n.props.totalPrice,date:Date()}),i.loading,o=Object(C.a)(i,["loading"]),e.next=10,P.a.post("/orders.json",o);case 10:u=e.sent,console.log(u),n.setState(function(){return{loading:!1}},function(){return n.props.history.push("/all-orders")}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(1),console.log(e.t0),n.setState({loading:!1});case 19:case"end":return e.stop()}},e,this,[[1,15]])}));return function(t){return e.apply(this,arguments)}}(),n.state={customer:{name:"OnyekaChukwu",address:{street:"Adjenughure Street",city:"Effural",state:"Selta",country:"Nier"},phone:"123-255-8416",email:"test@testing.on"},deliveryMethod:"cheapest",loading:!1},n}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.state.loading?u.a.createElement(f.a,null):u.a.createElement("form",{action:"",id:"order_form"},u.a.createElement("h3",null,"Enter Your Contact Details to Complete Your Order."),u.a.createElement("div",null,u.a.createElement("label",{htmlFor:"name_id"},"Name:"),u.a.createElement("input",{id:"name_id",type:"text",name:"name",placeholder:"Name",required:!0})),u.a.createElement("fieldset",null,u.a.createElement("legend",null,"Address"),u.a.createElement("div",null,u.a.createElement("label",{htmlFor:"street_id"},"Street: "),u.a.createElement("input",{id:"street_id",type:"street-address",name:"street",placeholder:"Street"})),u.a.createElement("div",null,u.a.createElement("label",{htmlFor:"city_id"},"City: "),u.a.createElement("input",{id:"city_id",type:"text",name:"city",placeholder:"City"})),u.a.createElement("div",null,u.a.createElement("label",{htmlFor:"state_id"},"State: "),u.a.createElement("input",{id:"state_id",type:"text",name:"state",placeholder:"State"})),u.a.createElement("div",null,u.a.createElement("label",{htmlFor:"country_id"},"Country: "),u.a.createElement("input",{id:"country_id",type:"country-name",name:"country",placeholder:"Country"}))),u.a.createElement("fieldset",null,u.a.createElement("legend",null,"Contact"),u.a.createElement("div",null,u.a.createElement("label",{htmlFor:"phone_id"},"Phone No.: "),u.a.createElement("input",{id:"phone_id",type:"tel",name:"phone",placeholder:"Phone"})),u.a.createElement("div",null,u.a.createElement("label",{htmlFor:"email_id"},"Email: "),u.a.createElement("input",{id:"email_id",type:"email",name:"email",placeholder:"Email Address"}))),u.a.createElement("fieldset",null,u.a.createElement("legend",null,"Delivery Method"),u.a.createElement("div",null,u.a.createElement("input",{id:"cheapest_id",type:"radio",name:"delivery_method",value:"cheapest"}),u.a.createElement("label",{htmlFor:"cheapest_id"},"Cheapest")),u.a.createElement("div",null,u.a.createElement("input",{id:"cheap_id",type:"radio",name:"delivery_method",value:"cheap"}),u.a.createElement("label",{htmlFor:"cheap_id"},"Cheap")),u.a.createElement("div",null,u.a.createElement("input",{id:"expensive_id",type:"radio",name:"delivery_method",value:"expensive",defaultChecked:!0}),u.a.createElement("label",{htmlFor:"expensive_id"},"Expensive")),u.a.createElement("div",null,u.a.createElement("input",{id:"very-expensive_id",type:"radio",name:"delivery_method",value:"very expensive"}),u.a.createElement("label",{htmlFor:"very-expensive_id"},"Very Expensive"))),u.a.createElement("div",null,u.a.createElement(d.a,{type:"reset",children:"CANCEL",onClick:this.cancel,btnType:"Danger"}),u.a.createElement(d.a,{type:"submit",children:"ORDER",onClick:this.submit,btnType:"Success"})));return u.a.createElement("div",{className:w.a.ContactData},u.a.createElement(D.Modal,{show:!0,hider:this.cancel},e))}}]),t}(o.Component),T=n(67),F=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(l.a)(this,Object(c.a)(t).call(this,e))).componentDidMount=function(){var e=new URLSearchParams(n.props.location.search),t={};e.forEach(function(e,n){return t[n]=+e});var a=Object(v.b)(t),r=Object(T.a)(t);n.setState({ingredients:t,purchasable:r,totalPrice:a})},n.checkoutCancel=function(){n.props.history.goBack()},n.checkoutContinue=function(){n.props.history.push(n.props.match.path+"/contact-data")},n.state={ingredients:null,purchasable:!1,totalPrice:null},n}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:_.a.Checkout},u.a.createElement(s.a,{path:this.props.match.path+"/contact-data",render:function(t){return e.state.ingredients&&e.state.totalPrice?u.a.createElement(N,Object.assign({},t,{ingredients:e.state.ingredients,totalPrice:e.state.totalPrice})):null}}),this.state.ingredients&&this.state.totalPrice?u.a.createElement(u.a.Fragment,null,u.a.createElement(E,{ingredients:this.state.ingredients,totalCost:this.state.totalPrice,checkoutCancel:this.checkoutCancel,checkoutContinue:this.checkoutContinue,purchasable:this.state.purchasable})):null)}}]),t}(o.Component);t.default=F},46:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return l});var a=n(45),r={salad:.5,cheese:.6,bacon:.8,meat:1.4,base:4};function l(e){return(Object.entries(e).map(function(e){var t=Object(a.a)(e,2),n=t[0],l=t[1];return r[n]*l}).reduce(function(e,t){return e+t},0)+r.base).toFixed(2)}},47:function(e,t,n){"use strict";n.r(t),n.d(t,"Modal",function(){return o});var a=n(0),r=n.n(a),l=n(62),c=n.n(l),i=n(48),o=function(e){var t=e.children,n=e.show,a=void 0!==n&&n,l=e.hider,o=a?{maxWidth:"100%",opacity:1,visibility:"unset"}:{maxWidth:"0%",opacity:0,transform:"translate(-50%, -200%)",visibility:"hidden"};return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,{show:a,hider:l}),r.a.createElement("div",{className:c.a.Modal,style:o},t))};t.default=r.a.memo(o)},48:function(e,t,n){"use strict";var a=n(0),r=n.n(a),l=n(49),c=n.n(l);t.a=function(e){var t=e.show,n=e.hider;return t?r.a.createElement("div",{className:c.a.Backdrop,onClick:n}):null}},49:function(e,t,n){e.exports={Backdrop:"Backdrop_Backdrop__2dJeJ"}},51:function(e,t,n){"use strict";var a=n(64),r=n.n(a).a.create({baseURL:"https://react-burger-builder-8d6de.firebaseio.com/"});t.a=r},52:function(e,t,n){"use strict";var a=n(53),r=n(0),l=n.n(r),c=n(54),i=n.n(c),o=l.a.forwardRef(function(e,t){var n=e.children,r=e.className,c=e.btnType,o=void 0===c?"":c,u=Object(a.a)(e,["children","className","btnType"]);return l.a.createElement("button",Object.assign({className:[r,i.a.Button,i.a[o]].join(" ")},u,{ref:t}),n)});t.a=o},53:function(e,t,n){"use strict";function a(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}n.d(t,"a",function(){return a})},54:function(e,t,n){e.exports={Button:"Button_Button__DihEC",Success:"Button_Success__3XjCn",Danger:"Button_Danger__2DsKv"}},56:function(e,t,n){"use strict";var a=n(45),r=n(0),l=n.n(r),c=n(57),i=n.n(c);t.a=function(e){var t=e.ingredients,n=e.totalCost,r=e.totalCostPrefix,c=e.title,o=Object.entries(t).map(function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];return l.a.createElement("li",{style:{textTransform:"capitalize"},key:n},l.a.createElement("span",{style:{display:"inline-block",minWidth:"3.7em"}},n,":")," ".concat(r))});return l.a.createElement("div",{className:i.a.OrderText},c?l.a.createElement("h3",{style:{fontWeight:"bold"}},c):null,l.a.createElement("div",null,l.a.createElement("ul",null,o)),r?l.a.createElement("p",{style:{fontWeight:"bold"}},r," $",n):null)}},57:function(e,t,n){e.exports={OrderText:"OrderText_OrderText__3ZKBI"}},60:function(e,t,n){"use strict";function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",function(){return a})},62:function(e,t,n){e.exports={Modal:"Modal_Modal__3JiWW",Hide:"Modal_Hide__3ufiz"}},67:function(e,t,n){"use strict";function a(e){return Object.values(e).some(function(e){return 0!==e})}n.d(t,"a",function(){return a})},76:function(e,t,n){e.exports={CheckoutSummary:"CheckoutSummary_CheckoutSummary__3N_ia"}},78:function(e,t,n){},82:function(e,t,n){e.exports={ContactData:"ContactData_ContactData__3EeV3"}}}]);
//# sourceMappingURL=Checkout.55d23e92.chunk.js.map