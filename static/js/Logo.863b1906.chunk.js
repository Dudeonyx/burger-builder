(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),u=n(69),o=n(106),c=n(110),l=n.n(c),i=n(111),s=n.n(i),v=n(112),f=n.n(v);t.default=function(e){var t=e.link,n=e.height,c=void 0===n?"":n,i=e.HQ;return void 0!==i&&i?a.a.createElement(r.Suspense,{fallback:a.a.createElement(u.a,{to:t,className:f.a.Logo,style:{height:c}},a.a.createElement("img",{src:l.a,alt:"A Burger Logo"}))},a.a.createElement(u.a,{to:t,className:f.a.Logo,style:{height:c}},a.a.createElement(o.Img,{src:s.a,alt:"A Burger Logo"}))):a.a.createElement(u.a,{to:t,className:f.a.Logo,style:{height:c}},a.a.createElement("img",{src:l.a,alt:"A Burger Logo"}))}},106:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Img=t.ImgResource=void 0;var r,a=n(0),u=(r=a)&&r.__esModule?r:{default:r},o=n(107);var c=t.ImgResource=(0,o.createResource)(function(e){return new Promise(function(t,n){var r=new Image;r.src=e,r.onload=t,r.onerror=n})});t.Img=function(e){return c.read(e.src),u.default.createElement("img",e)}},107:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createResource=void 0;var r=n(108),a=void 0;r.unstable_createResource&&(t.createResource=a=r.unstable_createResource),t.createResource=a},108:function(e,t,n){"use strict";e.exports=n(109)},109:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(13),u=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;function o(e,t){var n=u.currentDispatcher;if(null===n)throw Error("react-cache: read and preload may only be called from within a component's render. They are not supported in event handlers or lifecycle methods.");return n.readContext(e,t)}function c(e){return e}var l=function(e){function t(){!1===c&&o>r&&(c=!0,a.unstable_scheduleCallback(n))}function n(){c=!1;var e=r;if(null!==u)for(var t=u.previous;o>e&&null!==t;){var n=t.onDelete,a=t.previous;t.onDelete=null,t.previous=t.next=null,t===u?u=t=null:(u.previous=a,a.next=u,t=a),--o,n()}}var r=500,u=null,o=0,c=!1;return{add:function(e,t){return e={value:e,onDelete:t,next:null,previous:null},null===u?e.previous=e.next=e:((t=u.previous).next=e,e.previous=t,u.previous=e,e.next=u),u=e,o+=1,e},update:function(e,t){e.value=t},access:function(e){var n=e.next;if(null!==n){var r=u;if(u!==e){var a=e.previous;a.next=n,n.previous=a,(n=r.previous).next=e,e.previous=n,r.previous=e,e.next=r,u=e}}return t(),e.value},setLimit:function(e){r=e,t()}}}(),i=new Map,s=r.createContext(null);function v(e,t,n,r){var a=i.get(e);void 0===a&&(a=new Map,i.set(e,a));var u=a.get(r);if(void 0===u){(t=t(n)).then(function(e){if(0===o.status){var t=o;t.status=1,t.value=e}},function(e){if(0===o.status){var t=o;t.status=2,t.value=e}});var o={status:0,value:t};return e=l.add(o,function(e,t){var n=i.get(e);void 0!==n&&(n.delete(t),0===n.size&&i.delete(e))}.bind(null,e,r)),a.set(r,e),o}return l.access(u)}t.unstable_createResource=function(e,t){var n=void 0!==t?t:c,r={read:function(t){o(s);var a=n(t);switch((t=v(r,e,t,a)).status){case 0:throw t.value;case 1:return t.value;case 2:throw t.value}},preload:function(t){o(s);var a=n(t);v(r,e,t,a)}};return r},t.unstable_setGlobalCacheLimit=function(e){l.setLimit(e)}},110:function(e,t){e.exports="data:image/png;base64,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"},111:function(e,t,n){e.exports=n.p+"static/media/26.1 burger-logo.png.b8503d26.png"},112:function(e,t,n){e.exports={Logo:"Logo_Logo__1TE_7"}}}]);
//# sourceMappingURL=Logo.863b1906.chunk.js.map