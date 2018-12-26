(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,function(e,t,n){"use strict";var r={};n.r(r),n.d(r,"INCREASE_INGREDIENT",function(){return a}),n.d(r,"DECREASE_INGREDIENT",function(){return o}),n.d(r,"SET_INGREDIENTS",function(){return i}),n.d(r,"SET_INGREDIENTS_ERROR",function(){return c}),n.d(r,"BURGER_ORDER_SUCCESSFUL",function(){return u}),n.d(r,"BURGER_ORDER_FAILED",function(){return l}),n.d(r,"SET_BURGER_ORDER_SUBMITTING",function(){return s}),n.d(r,"SET_ORDERS",function(){return d}),n.d(r,"SET_ORDERS_LOADING",function(){return f}),n.d(r,"SET_ORDERS_ERROR",function(){return m}),n.d(r,"AUTH_START",function(){return p}),n.d(r,"AUTH_SUCCESS",function(){return h}),n.d(r,"AUTH_FAIL",function(){return g}),n.d(r,"AUTH_LOGOUT",function(){return E});var a="INCREASE_INGREDIENT",o="DECREASE_INGREDIENT",i="SET_INGREDIENTS",c="SET_INGREDIENTS_ERROR",u="BURGER_ORDER_SUCCESSFUL",l="BURGER_ORDER_FAILED",s="SET_BURGER_ORDER_SUBMITTING",d="SET_ORDERS",f="SET_ORDERS_LOADING",m="SET_ORDERS_ERROR",p="AUTH_START",h="AUTH_SUCCESS",g="AUTH_FAIL",E="AUTH_LOGOUT",b=n(7),v=n.n(b),O=n(20),R=n(21),y=function(e){return{type:r.INCREASE_INGREDIENT,payload:{igkey:e}}},w=function(e){return{type:r.DECREASE_INGREDIENT,payload:{igkey:e}}},S=function(e){return{type:r.SET_INGREDIENTS,payload:{ingredients:e}}},T=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return{type:r.SET_INGREDIENTS_ERROR,payload:{error:e}}},x=function(){return function(){var e=Object(O.a)(v.a.mark(function e(t){var n,r;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t(T(!1)),e.prev=1,e.next=4,R.a.get("/ingredients.json");case 4:n=e.sent,r=n.data,t(S(r)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t(T(!0));case 12:case"end":return e.stop()}},e,this,[[1,9]])}));return function(t){return e.apply(this,arguments)}}()},j=function(e){return function(){var t=Object(O.a)(v.a.mark(function t(n){var a,o;return v.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:r.SET_ORDERS_LOADING}),t.next=4,R.a.get("/orders.json"+(e?"?auth="+e:""));case 4:a=t.sent,o=a.data,n({type:r.SET_ORDERS,payload:{orders:o}}),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),n((i=t.t0,{type:r.SET_ORDERS_ERROR,payload:{error:i}})),console.error("[fetchOrders Action Error]",t.t0);case 13:case"end":return t.stop()}var i},t,this,[[0,9]])}));return function(e){return t.apply(this,arguments)}}()};function I(e,t,n){var r=e.deliveryMethod,a=e.name,o=e.city,i=e.country,c=e.email,u=e.phone,l=e.state,s=e.street;return{basicInfo:{name:a.value,phone:u.value,email:c.value},address:{street:s.value,city:o.value,state:l.value,country:i.value},deliveryMethod:r.value,ingredients:t,price:n,date:Date()}}var A=function(e,t){return{type:r.BURGER_ORDER_SUCCESSFUL,payload:{name:e,order:t}}},N=function(e,t,n,a){return function(){var o=Object(O.a)(v.a.mark(function o(i){var c,u,l;return v.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(o.prev=0,c=I(e,t,n),i({type:r.SET_BURGER_ORDER_SUBMITTING}),c){o.next=5;break}throw new Error("An error occurred while generating your order, pls try again");case 5:return o.next=7,R.a.post("/orders.json"+(a?"?auth="+a:""),c);case 7:u=o.sent,l=u.data.name,i(A(l,c)),o.next=16;break;case 12:o.prev=12,o.t0=o.catch(0),console.error("[submitOrder Action Error]",o.t0),i((s=o.t0,{type:r.BURGER_ORDER_FAILED,payload:{error:s}}));case 16:case"end":return o.stop()}var s},o,this,[[0,12]])}));return function(e){return o.apply(this,arguments)}}()},k=n(33),_=n.n(k),D=function(e){var t=e.displayName,n=e.idToken,a=e.localId;return{type:r.AUTH_SUCCESS,payload:{displayName:t,idToken:n,localId:a}}},U=function(e){return function(t){setTimeout(function(){t({type:r.AUTH_LOGOUT})},1e3*parseInt(e,10))}},C=function(e,t,n){return function(){var a=Object(O.a)(v.a.mark(function a(o){var i,c,u,l,s;return v.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,o({type:r.AUTH_START}),i={email:e,password:t,returnSecureToken:!0},c="".concat("https://www.googleapis.com/identitytoolkit/v3/relyingparty/").concat(n?"signupNewUser?key=":"verifyPassword?key=").concat("AIzaSyBwcMch0YFm-eOcVzSNj8ecthH2t4_72FA"),a.next=6,_.a.post(c,i);case 6:u=a.sent,l=u.data,s=l.expiresIn,o(D(l)),o(U(s)),console.log(u),a.next=18;break;case 14:a.prev=14,a.t0=a.catch(0),o((d=a.t0,{type:r.AUTH_FAIL,payload:{error:d}})),console.error("[authenticate Action Error]",a.t0);case 18:case"end":return a.stop()}var d},a,this,[[0,14]])}));return function(e){return a.apply(this,arguments)}}()};n.d(t,"c",function(){return x}),n.d(t,"g",function(){return S}),n.d(t,"e",function(){return w}),n.d(t,"f",function(){return y}),n.d(t,"d",function(){return j}),n.d(t,"h",function(){return N}),n.d(t,"b",function(){return C}),n.d(t,"a",function(){return r})},,,,,,,,,function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(73),i=n.n(o);t.a=function(){return a.a.createElement("div",{className:i.a.Loader},"Loading...")}},,,,,,,,,,function(e,t,n){"use strict";var r=n(33),a=n.n(r).a.create({baseURL:"https://react-burger-builder-8d6de.firebaseio.com/"});t.a=a},,,,,,,function(e,t,n){"use strict";var r=n(79),a=n(0),o=n.n(a),i=n(46),c=n.n(i),u=o.a.forwardRef(function(e,t){var n=e.children,a=e.className,i=e.btnType,u=void 0===i?"":i,l=Object(r.a)(e,["children","className","btnType"]);return o.a.createElement("button",Object.assign({className:[a,c.a.Button,c.a[u]].join(" ")},l,{ref:t}),n)});t.a=u},,,,function(e,t,n){"use strict";n.d(t,"a",function(){return i});var r=n(0),a=n.n(r),o=n(11),i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.a.createElement(o.a,null);return function(n){return a.a.createElement(r.Suspense,{fallback:t},a.a.createElement(e,n))}}},,,function(e,t,n){e.exports={Logo:"Logo_Logo__1_flk"}},function(e,t,n){"use strict";var r=n(25),a=n(39),o=n(41),i=n(26);n.d(t,"i",function(){return c}),n.d(t,"j",function(){return u}),n.d(t,"h",function(){return l}),n.d(t,"k",function(){return s}),n.d(t,"l",function(){return d}),n.d(t,"g",function(){return f}),n.d(t,"f",function(){return m}),n.d(t,"e",function(){return p}),n.d(t,"d",function(){return h}),n.d(t,"c",function(){return g}),n.d(t,"a",function(){return E}),n.d(t,"b",function(){return b});var c=function(e){return e.ings.ingredients},u=function(e){return e.ings.error},l=function(e){return e.cData.submitting},s=function(e){return e.ords.error},d=function(e){return e.ords.loading},f=function(e){return e.auth.idToken},m=function(e){return e.auth.error},p=function(e){return e.auth.authenticating},h=Object(r.a)(c,function(e){return Object(a.b)(e)}),g=Object(r.a)(c,function(e){return Object(o.a)(e)}),E=Object(r.a)(function(e){return e.ords.orders},function(e){return function(e){return e?Object.entries(e).reverse().slice().map(function(e){var t=Object(i.a)(e,2),n=t[0],r=t[1];return{id:n,name:r.basicInfo.name,ingredients:r.ingredients,totalPrice:r.price}}):[]}(e)}),b=Object(r.a)(s,function(e){return function(e){if(!e)return"";var t;switch(t=e.response?e.response.data.error.message?e.response.data.error.message:e.response.data.error:e.message){case"Permission denied":return"You are not logged in!";case"Network Error":case"Request failed with status code 401":return"A Network Error has Ocurred, please refresh the page";default:return t}}(e)})},,function(e,t,n){"use strict";var r=n(14),a=n(0),o=n.n(a),i=n(60),c=Object(r.a)("div",{target:"e1kwu7u0"})("position:fixed;z-index:500;width:90%;display:flex;flex-direction:column;align-items:center;text-align:center;padding:20px;max-height:99vh;background-color:#ddd66c;border-radius:10px;top:50%;left:50%;box-sizing:border-box;transition:all 0.3s ease-in-out;max-width:",function(e){return e.show?"100%":"0%"},";transform:",function(e){return e.show?"translate(-50%, -50%)":"translate(-50%, -150vh)"},";opacity:",function(e){return e.show?1:0},";visibility:",function(e){return e.show?"unset":"hidden"},";background-color:",function(e){return e.bgColor},";@media (min-width:",function(e){return e.minWidth||550},"px){width:70%;}@media (min-width:800px){width:580px;}");t.a=o.a.memo(function(e){var t=e.children,n=e.show,r=void 0!==n&&n,a=e.hider,u=e.bgColor,l=e.minWidth;return o.a.createElement(o.a.Fragment,null,o.a.createElement(i.a,{show:r,hider:a}),o.a.createElement(c,{show:r,bgColor:u,minWidth:l},t))})},function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"b",function(){return o});var r=n(26),a={salad:.5,cheese:.6,bacon:.8,meat:1.4,base:4};function o(e){return e?(Object.entries(e).map(function(e){var t=Object(r.a)(e,2),n=t[0],o=t[1];return a[n]*o}).reduce(function(e,t){return e+t},0)+a.base).toFixed(2):a.base.toFixed(2)}},,function(e,t,n){"use strict";function r(e){return!!e&&Object.values(e).some(function(e){return 0!==e})}n.d(t,"a",function(){return r})},,function(e,t,n){e.exports={NavigationItem:"NavigationItem_NavigationItem__385u5",active:"NavigationItem_active__216iX"}},function(e,t,n){e.exports={Toolbar:"Toolbar_Toolbar__3H-Vk",DesktopOnly:"Toolbar_DesktopOnly__1vq76"}},function(e,t){e.exports="data:image/png;base64,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"},function(e,t,n){e.exports={Button:"Button_Button__3pyql",Success:"Button_Success__28LNI",Danger:"Button_Danger__2wdxf"}},,,,,function(e,t,n){"use strict";var r=n(0),a=n.n(r),o={borderBottom:"1px solid lightblue",color:"lightblue",cursor:"pointer"};t.a=function(e){var t=e.retryHandler,n=e.additionalInfo,r=e.mainMessage,i=e.additionalMessage;return a.a.createElement("div",{style:{textAlign:"center"}},a.a.createElement("h3",{style:{textAlign:"center",textTransform:"capitalize"}},r||"An Error Has Occured, Please ",a.a.createElement("span",{onClick:t,style:o},"Retry"),".",a.a.createElement("br",null),i||null),n?a.a.createElement("div",{style:{textAlign:"center"}},a.a.createElement("h4",null,"Additional Error Info"),a.a.createElement("p",null,n)):null)}},,function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(24),i=n(70),c=n(45),u=n.n(c),l=n(71),s=n.n(l),d=n(35),f=n.n(d);t.a=function(e){var t=e.link,n=e.height,c=void 0===n?"":n,l=e.HQ;return void 0!==l&&l?a.a.createElement(r.Suspense,{fallback:a.a.createElement(o.a,{to:t,className:f.a.Logo,style:{height:c}},a.a.createElement("img",{src:u.a,alt:"A Burger Logo"}))},a.a.createElement(o.a,{to:t,className:f.a.Logo,style:{height:c}},a.a.createElement(i.Img,{src:s.a,alt:"A Burger Logo"}))):a.a.createElement(o.a,{to:t,className:f.a.Logo,style:{height:c}},a.a.createElement("img",{src:u.a,alt:"A Burger Logo"}))}},,,,,,,function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(74),i=n.n(o);t.a=function(e){var t=e.show,n=e.hider;return t?a.a.createElement("div",{className:i.a.Backdrop,onClick:n}):null}},,,function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return o});n(19);var r=n(14),a={name:"zepe9d",styles:"padding:10px;box-sizing:border-box;box-shadow:0px 0px 10px 3px rgba(0,0,0,0.658);margin:15px;border-radius:20px;display:flex;flex-flow:row wrap;justify-content:space-around;align-items:center;width:90%;min-height:65vh;@media (min-width:650px){max-width:600px;}"},o=Object(r.a)("div",{target:"e1sq8kwh0"})("&{display:flex;flex-flow:column;justify-content:space-around;align-items:center;width:100%;margin:10px 0;}.OrderBox{",a,";.OrderWrapper{flex:0.3 0.2 100%;}}")},function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=(n(19),n(14)),i={name:"1jelw4z",styles:"border:1px solid red;background-color:#fda49a;"},c={name:"1etxlvx",styles:'content:"\u2713";position:absolute;color:#26b72b;'},u={name:"1c6f874",styles:'content:"\u2716";position:absolute;color:#f00;'},l=Object(o.a)("div",{target:"ezwo2l80"})("&&&&&&{margin:5px;margin-top:0.9rem;display:flex;position:relative;}*::before,*::after,*{box-sizing:border-box;}label.txtLbl{font-size:0.7rem;position:absolute;top:-0.8rem;left:0.4rem;color:",function(e){return e.valid?"#228c1d":"red"},";font-weight:700;}label.radio{display:flex;justify-content:center;}span{flex:2 1 5em;align-self:center;text-align:left;padding-left:1em;}input + i::after{padding:6px;margin-left:-25px;",function(e){return e.valid?c:u},";}input{flex:10 1 auto;background-color:rgba(255,255,255,0.74);vertical-align:center;border-radius:10px;line-height:0.5em;padding:4px;outline:none;",function(e){return e.valid?null:i},";}input:focus{background-color:rgb(255,255,255);border:2px solid rgb(255,166,0);}.radio input{flex:0;vertical-align:unset;border-radius:unset;}@media (max-width:400px){font-size:0.85em;}"),s={pattern:"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",title:"Valid Email Address"},d=Object(r.memo)(function(e){var t=e.type,n=e.id,r=e.name,o=e.placeholder,i=e.onChange,c=e.value,u=e.label,d=e.dataSet,f=e.validation,m=(f=void 0===f?{required:!1}:f).required,p=void 0!==m&&m,h=e.validation,g=!0;switch(h&&!0===h.touched&&!h.valid&&(g=!1),e.type){case"text":case"email":case"street-address":case"country-name":case"tel":case"password":return a.a.createElement(l,{valid:g},a.a.createElement("label",{htmlFor:n,className:"txtLbl"},u),a.a.createElement("input",Object.assign({id:n,type:t,name:r,placeholder:o},"email"===t?s:null,{onChange:i,value:c,"data-set":d,required:p,minLength:h.minLength,maxLength:h.maxLength})),a.a.createElement("i",null));case"radio":var E=e.options?e.options.map(function(e){return a.a.createElement("label",{htmlFor:n,className:"radio",key:e.id},a.a.createElement("input",{id:e.id,type:t,name:r,onChange:i,value:e.value,checked:e.checked,defaultChecked:e.defaultChecked,"data-set":d})," ",a.a.createElement("span",null,e.label))}):null;return a.a.createElement(l,{valid:g,id:n},E);case"select":var b=e.options?e.options.map(function(e){return a.a.createElement("option",{key:e.id,id:e.id,value:e.value,"data-set":d,children:e.label})}):null;return a.a.createElement(a.a.Fragment,null,a.a.createElement("label",{htmlFor:n,className:"select",children:u}),a.a.createElement("select",{id:n,onChange:i,name:r,required:p,value:c},b));default:return null}});t.a=function(e){return function(t,n,a){return r.createElement(d,Object.assign({},t,{key:t.id,onChange:e}))}}},function(e,t,n){"use strict";var r=n(22),a=n(8),o=n(5);function i(e,t){var n=t.target,i=n.name,u=n.value;return i in e?Object(o.b)(e)?function(e,t,n){var r=e[t];return r.value=n,function(e,t){var n=c(e,t);e.valid=n,e.touched=!0}(r.validation,n),function(e,t){if("radio"===e.type)e.options.forEach(function(e){e.checked=e.value===t})}(r,n),e}(e,i,u):function(e,t,n){var o=Object(a.a)({},e[t]),i=function(e,t){var n=Object(a.a)({},e),r=c(n,t);return n.valid=r,n.touched=!0,n}(o.validation,n),u=function(e,t){if("radio"===e.type){var n=e.options.map(function(e){return e.value===t?Object(a.a)({},e,{checked:!0}):Object(a.a)({},e,{checked:!1})}),r=Object(a.a)({},e,{options:n});return r}return Object(a.a)({},e)}(o,n);return Object(a.a)({},e,Object(r.a)({},t,Object(a.a)({},u,{value:n,validation:i})))}(e,i,u):(console.error("".concat(i," not found in Form")),e)}function c(e,t){var n=!0;if(!e)return!0;if(e.required&&(n=""!==t.trim()&&n),e.minLength&&(n=t.length>=e.minLength&&n),e.maxLength&&(n=t.length<=e.maxLength&&n),e.isEmail){n=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(t)&&n}else if(e.isNumeric){n=/^\d+$/.test(t)&&n}return n}n.d(t,"a",function(){return i})},function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(136),i=n(43),c=n.n(i),u=function(e){var t=e.exact,n=e.link,r=e.linkName;return a.a.createElement("li",{className:c.a.NavigationItem},a.a.createElement(o.a,{to:n,exact:t,activeClassName:c.a.active},a.a.createElement("span",null,r)))},l=n(68),s=n.n(l),d=[{url:"/",name:"BurgerBuilder",exact:!0},{url:"/all-orders",name:"My Orders",exact:!0},{url:"/login",name:"Login/Sign Up",exact:!0}];t.a=function(){var e=d.map(function(e){var t=e.url,n=e.name,r=e.exact;return a.a.createElement(u,{key:n,link:t,linkName:n,exact:r})});return a.a.createElement("ul",{className:s.a.NavigationItems},e)}},,function(e,t,n){e.exports={NavigationItems:"NavigationItems_NavigationItems__1Rwc8"}},function(e,t,n){e.exports={DrawerToggle:"DrawerToggle_DrawerToggle__2Z6b8"}},,function(e,t,n){e.exports=n.p+"static/media/26.1 burger-logo.png.b8503d26.png"},function(e,t,n){e.exports={Main:"Layout_Main__3-BzM"}},function(e,t,n){e.exports={Loader:"Loader_Loader__3kuyS",load8:"Loader_load8__3gEy2"}},function(e,t,n){e.exports={Backdrop:"Backdrop_Backdrop__2e3tB"}},,,,,,function(e,t,n){"use strict";var r=n(15),a=n(10),o=n(17),i=n(16),c=n(18),u=n(0),l=n.n(u),s=n(38);t.a=function(e,t){return function(n){function u(){var e,t;Object(r.a)(this,u);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(t=Object(o.a)(this,(e=Object(i.a)(u)).call.apply(e,[this].concat(a)))).state={error:null},t.req=null,t.res=null,t.errorConfirmed=function(){t.setState({error:null})},t}return Object(c.a)(u,n),Object(a.a)(u,[{key:"componentWillMount",value:function(){var e=this;this.req=t.interceptors.request.use(function(t){return e.setState({error:null}),t},function(e){throw e}),this.res=t.interceptors.response.use(function(e){return e},function(t){throw e.setState({error:t}),t})}},{key:"componentWillUnmount",value:function(){null!==this.req&&t.interceptors.request.eject(this.req),null!==this.res&&t.interceptors.response.eject(this.res)}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,this.state.error?l.a.createElement(s.a,{show:!!this.state.error,hider:this.errorConfirmed},this.state.error.message):null,l.a.createElement(e,this.props))}}]),u}(u.Component)}},function(e,t,n){e.exports=n(125)},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(67),i=n.n(o),c=n(141),u=n(144),l=n(135),s=n(15),d=n(17),f=n(16),m=n(10),p=n(18),h=n(51),g=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(f.a)(t).call(this,e))).retry=function(){n.setState({error:null})},n.state={error:null},n}return Object(p.a)(t,e),Object(m.a)(t,null,[{key:"getDerivedStateFromError",value:function(e){return{error:e}}}]),Object(m.a)(t,[{key:"render",value:function(){return r.createElement(r.Fragment,null,this.state.error?r.createElement(h.a,{retryHandler:this.retry,additionalInfo:this.state.error.message}):this.props.children)}}]),t}(r.Component),E=n(66),b=n(69),v=n.n(b),O=function(e){var t=e.clicked;return a.a.createElement("div",{onClick:t,className:v.a.DrawerToggle},a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null))},R=n(44),y=n.n(R),w=n(53),S=function(e){var t=e.drawerToggler;return a.a.createElement("header",{className:y.a.Toolbar},a.a.createElement(O,{clicked:t}),a.a.createElement(w.a,{link:"/",HQ:!0}),a.a.createElement("nav",{className:y.a.DesktopOnly},a.a.createElement(E.a,null)))},T=n(72),x=n.n(T),j=Object(r.lazy)(function(){return n.e(4).then(n.bind(null,137))}),I=function(e){function t(){var e,n;Object(s.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(a)))).state={showSideDrawer:!1},n.hideSideDrawerHandler=function(){return n.setState({showSideDrawer:!1})},n.toggleSideDrawerHandler=function(){return n.setState(function(e){return{showSideDrawer:!e.showSideDrawer}})},n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(S,{drawerToggler:this.toggleSideDrawerHandler}),a.a.createElement(r.Suspense,{fallback:null},a.a.createElement(j,{open:this.state.showSideDrawer,hider:this.hideSideDrawerHandler})),a.a.createElement("main",{className:x.a.Main},this.props.children))}}]),t}(r.PureComponent),A=n(32),N=n(11),k=(n(39),n(41),n(21),n(80),n(28)),_=(n(61),n(38),n(65)),D=n(64),U=n(2),C=n(27),H=n(36),L=n(19),B=n(14),z=n(63),G={name:"f935yq",styles:"display:flex;flex-flow:column;"},F=Object(L.a)(G,";justify-content:center;align-items:center;"),M=Object(B.a)("div",{target:"e1qt8ym50"})(F," & > div{",z.b,";min-height:0px;p.info{font-variant:small-caps;font-weight:700;color:#476918bf;text-shadow:1px 1px 1px darkgreen;font-size:1.1rem;}p.error{flex:1 1 100%;text-align:center;font-variant:small-caps;font-weight:700;color:crimson;text-shadow:1px 1px 1px orange;font-size:1.1rem;}}form{width:90%;",G,";button{align-self:center;}@media (min-width:650px){width:550px;}}"),q=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(f.a)(t).call(this,e))).handleAuthFormChange=function(e){var t=Object(_.a)(n.state.authFormData,e);n.setState({authFormData:t})},n.switchAuthModeHandler=function(){n.setState(function(e){return{isSignUp:!e.isSignUp}})},n.submitHandler=function(e){e.preventDefault(),n.props.onAuth(n.state.authFormData.email.value,n.state.authFormData.password.value,n.state.isSignUp)},n.mapInputs=Object(D.a)(n.handleAuthFormChange),n.state={authFormData:{name:{value:"",type:"text",placeholder:"Your Name",id:"Auth_name_id",name:"name",label:"Name:",validation:{required:!0,valid:!1,touched:!1,minLength:5}},email:{value:"",type:"email",placeholder:"Your Email",id:"Auth_email_id",name:"email",label:"Email:",validation:{required:!0,valid:!1,touched:!1,minLength:5,isEmail:!0}},password:{value:"",type:"password",placeholder:"Password",id:"Auth_word_id",name:"password",label:"Password:",validation:{required:!0,valid:!1,touched:!1,minLength:6}}},isSignUp:!0},n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state.authFormData,t=(e.name,e.email),n=e.password,r=this.props.error?a.a.createElement("p",{className:"error"},this.props.error.response.data.error.message):null,o=this.props.authenticating?a.a.createElement(N.a,null):a.a.createElement(a.a.Fragment,null,r,a.a.createElement("p",{className:"info"},this.state.isSignUp?"SIGNUP":"LOGIN"),a.a.createElement("form",null,[t,n].map(this.mapInputs),a.a.createElement(k.a,{btnType:"Success",onClick:this.submitHandler},"SUBMIT")),a.a.createElement(k.a,{btnType:"Danger",onClick:this.switchAuthModeHandler},"SWITCH TO ",this.state.isSignUp?"LOGIN":"SIGNUP"));return a.a.createElement(M,null,a.a.createElement("div",null,o))}}]),t}(r.Component),Y={onAuth:U.b},W=Object(C.b)(function(e){return{authenticating:Object(H.e)(e),error:Object(H.f)(e)}},Y)(q),P=Object(r.lazy)(function(){return n.e(1).then(n.bind(null,143))}),X=Object(r.lazy)(function(){return n.e(2).then(n.bind(null,140))}),Z=Object(r.lazy)(function(){return n.e(3).then(n.bind(null,142))}),Q=Object(A.a)(Z),V=Object(A.a)(P),J=Object(A.a)(X),K=function(){return a.a.createElement(I,null,a.a.createElement(g,null,a.a.createElement(u.a,null,a.a.createElement(l.a,{path:"/",exact:!0,render:function(e){return Q(e)}}),a.a.createElement(l.a,{path:"/all-orders",exact:!0,render:function(e){return V(e)}}),a.a.createElement(l.a,{path:"/checkout",exact:!1,render:function(e){return J(e)}}),a.a.createElement(l.a,{path:"/login",exact:!1,component:W}))))};n(121),n(123),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var $=n(23);var ee=n(5),te=n(22),ne=n(8);var re=Object(ee.a)(function(e,t){switch(t.type){case U.a.INCREASE_INGREDIENT:n=e.ingredients,r=t.payload.igkey,function(e,t){return!!(e&&t in e&&"number"===typeof e[t])}(n,r)&&(Object(ee.b)(n)?n[r]+=1:Object(ne.a)({},n,Object(te.a)({},r,n[r]+1)));break;case U.a.DECREASE_INGREDIENT:!function(e,t){(function(e,t){return!!(e&&t in e&&"number"===typeof e[t]&&e[t]>0)})(e,t)&&(Object(ee.b)(e)?e[t]-=1:Object(ne.a)({},e,Object(te.a)({},t,e[t]+1)))}(e.ingredients,t.payload.igkey);break;case U.a.SET_INGREDIENTS:!function(e,t){e.error=!1;var n=function(e){return e?{salad:e.salad,bacon:e.bacon,cheese:e.cheese,meat:e.meat}:null}(t.payload.ingredients);e.ingredients=n}(e,t);break;case U.a.SET_INGREDIENTS_ERROR:e.error=t.payload.error;break;default:}var n,r},{ingredients:null,error:!1}),ae=Object(ee.a)(function(e,t){switch(t.type){case U.a.BURGER_ORDER_SUCCESSFUL:e.orders[t.payload.name]=t.payload.order,e.submitting=!1,e.error=!1;break;case U.a.BURGER_ORDER_FAILED:e.error=t.payload.error,e.submitting=!1;break;case U.a.SET_BURGER_ORDER_SUBMITTING:e.error=!1,e.submitting=!0;break;default:}},{error:!1,submitting:!1,orders:{}}),oe=n(76),ie=n(77),ce=Object(ee.a)(function(e,t){switch(t.type){case U.a.SET_ORDERS_ERROR:e.error=t.payload.error,e.loading=!1;break;case U.a.SET_ORDERS_LOADING:e.loading=!0,e.error=null;break;case U.a.SET_ORDERS:e.error=null,e.orders=t.payload.orders,e.loading=!1;break;default:}},{orders:null,loading:!1,error:null}),ue=Object(ee.a)(function(e,t){switch(t.type){case U.a.AUTH_START:e.authenticating=!0,e.error=!1;break;case U.a.AUTH_SUCCESS:e.authenticating=!1,e.error=!1,e.userId=t.payload.localId,e.idToken=t.payload.idToken;break;case U.a.AUTH_FAIL:e.authenticating=!1,e.error=t.payload.error;break;case U.a.AUTH_LOGOUT:e.idToken=null,e.userId=null,e.displayName=null;break;default:}},{authenticating:!1,error:!1,idToken:null,userId:null,displayName:null}),le=Object($.combineReducers)({ings:re,cData:ae,ords:ce,auth:ue}),se=Object($.createStore)(le,Object(oe.composeWithDevTools)(Object($.applyMiddleware)(ie.a))),de=a.a.createElement(C.a,{store:se},a.a.createElement(c.a,{basename:"/burger-builder"},a.a.createElement(K,null)));i.a.render(de,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[81,9,8]]]);
//# sourceMappingURL=main.ec67c200.chunk.js.map