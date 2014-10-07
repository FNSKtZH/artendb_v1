(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.4";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2),e=w.isFunction(t);return w.map(n,function(n){return(e?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t,r){return w.isEmpty(t)?r?null:[]:w[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.findWhere=function(n,t){return w.where(n,t,!0)},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var k=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=k(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index<t.index?-1:1}),"value")};var F=function(n,t,r,e){var u={},i=k(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return F(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return F(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i},w.bind=function(n,t){if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));var r=o.call(arguments,2);return function(){return n.apply(t,r.concat(o.call(arguments)))}},w.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},w.bindAll=function(n){var t=o.call(arguments,1);return 0===t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var I=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=I(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&I(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return I(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),"function"!=typeof/./&&(w.isFunction=function(n){return"function"==typeof n}),w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return n===void 0},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var M={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};M.unescape=w.invert(M.escape);var S={escape:RegExp("["+w.keys(M.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(M.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(S[n],function(t){return M[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),D.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=++N+"";return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,q={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},B=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){var e;r=w.defaults({},r,w.templateSettings);var u=RegExp([(r.escape||T).source,(r.interpolate||T).source,(r.evaluate||T).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(B,function(n){return"\\"+q[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,w);var c=function(n){return e.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},w.chain=function(n){return w(n).chain()};var D=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],D.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return D.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=" li:not(.divider):visible a",i=f.find("[role=menu]"+h+", [role=listbox]"+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu], [role=listbox]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);
/*!
 * typeahead.js 0.9.3
 * http://twitter.github.io/typeahead.js/
 * Copyright 2013 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a){var b="0.9.3",c={isMsie:function(){var a=/(msie) ([\w.]+)/i.exec(navigator.userAgent);return a?parseInt(a[2],10):!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},bind:a.proxy,bindAll:function(b){var c;for(var d in b)a.isFunction(c=b[d])&&(b[d]=a.proxy(c,b))},indexOf:function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1},each:a.each,map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,getUniqueId:function(){var a=0;return function(){return a++}}(),defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},tokenizeQuery:function(b){return a.trim(b).toLowerCase().split(/[\s]+/)},tokenizeText:function(b){return a.trim(b).toLowerCase().split(/[\s\-_]+/)},getProtocol:function(){return location.protocol},noop:function(){}},d=function(){var a=/\s+/;return{on:function(b,c){var d;if(!c)return this;for(this._callbacks=this._callbacks||{},b=b.split(a);d=b.shift();)this._callbacks[d]=this._callbacks[d]||[],this._callbacks[d].push(c);return this},trigger:function(b,c){var d,e;if(!this._callbacks)return this;for(b=b.split(a);d=b.shift();)if(e=this._callbacks[d])for(var f=0;f<e.length;f+=1)e[f].call(this,{type:d,data:c});return this}}}(),e=function(){function b(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d="typeahead:";return c.mixin(b.prototype,{trigger:function(a){var b=[].slice.call(arguments,1);this.$el.trigger(d+a,b)}}),b}(),f=function(){function a(a){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+this.prefix)}function b(){return(new Date).getTime()}function d(a){return JSON.stringify(c.isUndefined(a)?null:a)}function e(a){return JSON.parse(a)}var f,g;try{f=window.localStorage,f.setItem("~~~","!"),f.removeItem("~~~")}catch(h){f=null}return g=f&&window.JSON?{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},get:function(a){return this.isExpired(a)&&this.remove(a),e(f.getItem(this._prefix(a)))},set:function(a,e,g){return c.isNumber(g)?f.setItem(this._ttlKey(a),d(b()+g)):f.removeItem(this._ttlKey(a)),f.setItem(this._prefix(a),d(e))},remove:function(a){return f.removeItem(this._ttlKey(a)),f.removeItem(this._prefix(a)),this},clear:function(){var a,b,c=[],d=f.length;for(a=0;d>a;a++)(b=f.key(a)).match(this.keyMatcher)&&c.push(b.replace(this.keyMatcher,""));for(a=c.length;a--;)this.remove(c[a]);return this},isExpired:function(a){var d=e(f.getItem(this._ttlKey(a)));return c.isNumber(d)&&b()>d?!0:!1}}:{get:c.noop,set:c.noop,remove:c.noop,clear:c.noop,isExpired:c.noop},c.mixin(a.prototype,g),a}(),g=function(){function a(a){c.bindAll(this),a=a||{},this.sizeLimit=a.sizeLimit||10,this.cache={},this.cachedKeysByAge=[]}return c.mixin(a.prototype,{get:function(a){return this.cache[a]},set:function(a,b){var c;this.cachedKeysByAge.length===this.sizeLimit&&(c=this.cachedKeysByAge.shift(),delete this.cache[c]),this.cache[a]=b,this.cachedKeysByAge.push(a)}}),a}(),h=function(){function b(a){c.bindAll(this),a=c.isString(a)?{url:a}:a,i=i||new g,h=c.isNumber(a.maxParallelRequests)?a.maxParallelRequests:h||6,this.url=a.url,this.wildcard=a.wildcard||"%QUERY",this.filter=a.filter,this.replace=a.replace,this.ajaxSettings={type:"get",cache:a.cache,timeout:a.timeout,dataType:a.dataType||"json",beforeSend:a.beforeSend},this._get=(/^throttle$/i.test(a.rateLimitFn)?c.throttle:c.debounce)(this._get,a.rateLimitWait||300)}function d(){j++}function e(){j--}function f(){return h>j}var h,i,j=0,k={};return c.mixin(b.prototype,{_get:function(a,b){function c(c){var e=d.filter?d.filter(c):c;b&&b(e),i.set(a,c)}var d=this;f()?this._sendRequest(a).done(c):this.onDeckRequestArgs=[].slice.call(arguments,0)},_sendRequest:function(b){function c(){e(),k[b]=null,f.onDeckRequestArgs&&(f._get.apply(f,f.onDeckRequestArgs),f.onDeckRequestArgs=null)}var f=this,g=k[b];return g||(d(),g=k[b]=a.ajax(b,this.ajaxSettings).always(c)),g},get:function(a,b){var d,e,f=this,g=encodeURIComponent(a||"");return b=b||c.noop,d=this.replace?this.replace(this.url,g):this.url.replace(this.wildcard,g),(e=i.get(d))?c.defer(function(){b(f.filter?f.filter(e):e)}):this._get(d,b),!!e}}),b}(),i=function(){function d(b){c.bindAll(this),c.isString(b.template)&&!b.engine&&a.error("no template engine specified"),b.local||b.prefetch||b.remote||a.error("one of local, prefetch, or remote is required"),this.name=b.name||c.getUniqueId(),this.limit=b.limit||5,this.minLength=b.minLength||1,this.header=b.header,this.footer=b.footer,this.valueKey=b.valueKey||"value",this.template=e(b.template,b.engine,this.valueKey),this.local=b.local,this.prefetch=b.prefetch,this.remote=b.remote,this.itemHash={},this.adjacencyList={},this.storage=b.name?new f(b.name):null}function e(a,b,d){var e,f;return c.isFunction(a)?e=a:c.isString(a)?(f=b.compile(a),e=c.bind(f.render,f)):e=function(a){return"<p>"+a[d]+"</p>"},e}var g={thumbprint:"thumbprint",protocol:"protocol",itemHash:"itemHash",adjacencyList:"adjacencyList"};return c.mixin(d.prototype,{_processLocalData:function(a){this._mergeProcessedData(this._processData(a))},_loadPrefetchData:function(d){function e(a){var b=d.filter?d.filter(a):a,e=m._processData(b),f=e.itemHash,h=e.adjacencyList;m.storage&&(m.storage.set(g.itemHash,f,d.ttl),m.storage.set(g.adjacencyList,h,d.ttl),m.storage.set(g.thumbprint,n,d.ttl),m.storage.set(g.protocol,c.getProtocol(),d.ttl)),m._mergeProcessedData(e)}var f,h,i,j,k,l,m=this,n=b+(d.thumbprint||"");return this.storage&&(f=this.storage.get(g.thumbprint),h=this.storage.get(g.protocol),i=this.storage.get(g.itemHash),j=this.storage.get(g.adjacencyList)),k=f!==n||h!==c.getProtocol(),d=c.isString(d)?{url:d}:d,d.ttl=c.isNumber(d.ttl)?d.ttl:864e5,i&&j&&!k?(this._mergeProcessedData({itemHash:i,adjacencyList:j}),l=a.Deferred().resolve()):l=a.getJSON(d.url).done(e),l},_transformDatum:function(a){var b=c.isString(a)?a:a[this.valueKey],d=a.tokens||c.tokenizeText(b),e={value:b,tokens:d};return c.isString(a)?(e.datum={},e.datum[this.valueKey]=a):e.datum=a,e.tokens=c.filter(e.tokens,function(a){return!c.isBlankString(a)}),e.tokens=c.map(e.tokens,function(a){return a.toLowerCase()}),e},_processData:function(a){var b=this,d={},e={};return c.each(a,function(a,f){var g=b._transformDatum(f),h=c.getUniqueId(g.value);d[h]=g,c.each(g.tokens,function(a,b){var d=b.charAt(0),f=e[d]||(e[d]=[h]);!~c.indexOf(f,h)&&f.push(h)})}),{itemHash:d,adjacencyList:e}},_mergeProcessedData:function(a){var b=this;c.mixin(this.itemHash,a.itemHash),c.each(a.adjacencyList,function(a,c){var d=b.adjacencyList[a];b.adjacencyList[a]=d?d.concat(c):c})},_getLocalSuggestions:function(a){var b,d=this,e=[],f=[],g=[];return c.each(a,function(a,b){var d=b.charAt(0);!~c.indexOf(e,d)&&e.push(d)}),c.each(e,function(a,c){var e=d.adjacencyList[c];return e?(f.push(e),(!b||e.length<b.length)&&(b=e),void 0):!1}),f.length<e.length?[]:(c.each(b,function(b,e){var h,i,j=d.itemHash[e];h=c.every(f,function(a){return~c.indexOf(a,e)}),i=h&&c.every(a,function(a){return c.some(j.tokens,function(b){return 0===b.indexOf(a)})}),i&&g.push(j)}),g)},initialize:function(){var b;return this.local&&this._processLocalData(this.local),this.transport=this.remote?new h(this.remote):null,b=this.prefetch?this._loadPrefetchData(this.prefetch):a.Deferred().resolve(),this.local=this.prefetch=this.remote=null,this.initialize=function(){return b},b},getSuggestions:function(a,b){function d(a){f=f.slice(0),c.each(a,function(a,b){var d,e=g._transformDatum(b);return d=c.some(f,function(a){return e.value===a.value}),!d&&f.push(e),f.length<g.limit}),b&&b(f)}var e,f,g=this,h=!1;a.length<this.minLength||(e=c.tokenizeQuery(a),f=this._getLocalSuggestions(e).slice(0,this.limit),f.length<this.limit&&this.transport&&(h=this.transport.get(a,d)),!h&&b&&b(f))}}),d}(),j=function(){function b(b){var d=this;c.bindAll(this),this.specialKeyCodeMap={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},this.$hint=a(b.hint),this.$input=a(b.input).on("blur.tt",this._handleBlur).on("focus.tt",this._handleFocus).on("keydown.tt",this._handleSpecialKeyEvent),c.isMsie()?this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){d.specialKeyCodeMap[a.which||a.keyCode]||c.defer(d._compareQueryToInputValue)}):this.$input.on("input.tt",this._compareQueryToInputValue),this.query=this.$input.val(),this.$overflowHelper=e(this.$input)}function e(b){return a("<span></span>").css({position:"absolute",left:"-9999px",visibility:"hidden",whiteSpace:"nowrap",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function f(a,b){return a=(a||"").replace(/^\s*/g,"").replace(/\s{2,}/g," "),b=(b||"").replace(/^\s*/g,"").replace(/\s{2,}/g," "),a===b}return c.mixin(b.prototype,d,{_handleFocus:function(){this.trigger("focused")},_handleBlur:function(){this.trigger("blured")},_handleSpecialKeyEvent:function(a){var b=this.specialKeyCodeMap[a.which||a.keyCode];b&&this.trigger(b+"Keyed",a)},_compareQueryToInputValue:function(){var a=this.getInputValue(),b=f(this.query,a),c=b?this.query.length!==a.length:!1;c?this.trigger("whitespaceChanged",{value:this.query}):b||this.trigger("queryChanged",{value:this.query=a})},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$hint=this.$input=this.$overflowHelper=null},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(a){this.query=a},getInputValue:function(){return this.$input.val()},setInputValue:function(a,b){this.$input.val(a),!b&&this._compareQueryToInputValue()},getHintValue:function(){return this.$hint.val()},setHintValue:function(a){this.$hint.val(a)},getLanguageDirection:function(){return(this.$input.css("direction")||"ltr").toLowerCase()},isOverflow:function(){return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>this.$input.width()},isCursorAtEnd:function(){var a,b=this.$input.val().length,d=this.$input[0].selectionStart;return c.isNumber(d)?d===b:document.selection?(a=document.selection.createRange(),a.moveStart("character",-b),b===a.text.length):!0}}),b}(),k=function(){function b(b){c.bindAll(this),this.isOpen=!1,this.isEmpty=!0,this.isMouseOverDropdown=!1,this.$menu=a(b.menu).on("mouseenter.tt",this._handleMouseenter).on("mouseleave.tt",this._handleMouseleave).on("click.tt",".tt-suggestion",this._handleSelection).on("mouseover.tt",".tt-suggestion",this._handleMouseover)}function e(a){return a.data("suggestion")}var f={suggestionsList:'<span class="tt-suggestions"></span>'},g={suggestionsList:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"}};return c.mixin(b.prototype,d,{_handleMouseenter:function(){this.isMouseOverDropdown=!0},_handleMouseleave:function(){this.isMouseOverDropdown=!1},_handleMouseover:function(b){var c=a(b.currentTarget);this._getSuggestions().removeClass("tt-is-under-cursor"),c.addClass("tt-is-under-cursor")},_handleSelection:function(b){var c=a(b.currentTarget);this.trigger("suggestionSelected",e(c))},_show:function(){this.$menu.css("display","block")},_hide:function(){this.$menu.hide()},_moveCursor:function(a){var b,c,d,f;if(this.isVisible()){if(b=this._getSuggestions(),c=b.filter(".tt-is-under-cursor"),c.removeClass("tt-is-under-cursor"),d=b.index(c)+a,d=(d+1)%(b.length+1)-1,-1===d)return this.trigger("cursorRemoved"),void 0;-1>d&&(d=b.length-1),f=b.eq(d).addClass("tt-is-under-cursor"),this._ensureVisibility(f),this.trigger("cursorMoved",e(f))}},_getSuggestions:function(){return this.$menu.find(".tt-suggestions > .tt-suggestion")},_ensureVisibility:function(a){var b=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10),c=this.$menu.scrollTop(),d=a.position().top,e=d+a.outerHeight(!0);0>d?this.$menu.scrollTop(c+d):e>b&&this.$menu.scrollTop(c+(e-b))},destroy:function(){this.$menu.off(".tt"),this.$menu=null},isVisible:function(){return this.isOpen&&!this.isEmpty},closeUnlessMouseIsOverDropdown:function(){this.isMouseOverDropdown||this.close()},close:function(){this.isOpen&&(this.isOpen=!1,this.isMouseOverDropdown=!1,this._hide(),this.$menu.find(".tt-suggestions > .tt-suggestion").removeClass("tt-is-under-cursor"),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,!this.isEmpty&&this._show(),this.trigger("opened"))},setLanguageDirection:function(a){var b={left:"0",right:"auto"},c={left:"auto",right:" 0"};"ltr"===a?this.$menu.css(b):this.$menu.css(c)},moveCursorUp:function(){this._moveCursor(-1)},moveCursorDown:function(){this._moveCursor(1)},getSuggestionUnderCursor:function(){var a=this._getSuggestions().filter(".tt-is-under-cursor").first();return a.length>0?e(a):null},getFirstSuggestion:function(){var a=this._getSuggestions().first();return a.length>0?e(a):null},renderSuggestions:function(b,d){var e,h,i,j,k,l="tt-dataset-"+b.name,m='<div class="tt-suggestion">%body</div>',n=this.$menu.find("."+l);0===n.length&&(h=a(f.suggestionsList).css(g.suggestionsList),n=a("<div></div>").addClass(l).append(b.header).append(h).append(b.footer).appendTo(this.$menu)),d.length>0?(this.isEmpty=!1,this.isOpen&&this._show(),i=document.createElement("div"),j=document.createDocumentFragment(),c.each(d,function(c,d){d.dataset=b.name,e=b.template(d.datum),i.innerHTML=m.replace("%body",e),k=a(i.firstChild).css(g.suggestion).data("suggestion",d),k.children().each(function(){a(this).css(g.suggestionChild)}),j.appendChild(k[0])}),n.show().find(".tt-suggestions").html(j)):this.clearSuggestions(b.name),this.trigger("suggestionsRendered")},clearSuggestions:function(a){var b=a?this.$menu.find(".tt-dataset-"+a):this.$menu.find('[class^="tt-dataset-"]'),c=b.find(".tt-suggestions");b.hide(),c.empty(),0===this._getSuggestions().length&&(this.isEmpty=!0,this._hide())}}),b}(),l=function(){function b(a){var b,d,f;c.bindAll(this),this.$node=e(a.input),this.datasets=a.datasets,this.dir=null,this.eventBus=a.eventBus,b=this.$node.find(".tt-dropdown-menu"),d=this.$node.find(".tt-query"),f=this.$node.find(".tt-hint"),this.dropdownView=new k({menu:b}).on("suggestionSelected",this._handleSelection).on("cursorMoved",this._clearHint).on("cursorMoved",this._setInputValueToSuggestionUnderCursor).on("cursorRemoved",this._setInputValueToQuery).on("cursorRemoved",this._updateHint).on("suggestionsRendered",this._updateHint).on("opened",this._updateHint).on("closed",this._clearHint).on("opened closed",this._propagateEvent),this.inputView=new j({input:d,hint:f}).on("focused",this._openDropdown).on("blured",this._closeDropdown).on("blured",this._setInputValueToQuery).on("enterKeyed tabKeyed",this._handleSelection).on("queryChanged",this._clearHint).on("queryChanged",this._clearSuggestions).on("queryChanged",this._getSuggestions).on("whitespaceChanged",this._updateHint).on("queryChanged whitespaceChanged",this._openDropdown).on("queryChanged whitespaceChanged",this._setLanguageDirection).on("escKeyed",this._closeDropdown).on("escKeyed",this._setInputValueToQuery).on("tabKeyed upKeyed downKeyed",this._managePreventDefault).on("upKeyed downKeyed",this._moveDropdownCursor).on("upKeyed downKeyed",this._openDropdown).on("tabKeyed leftKeyed rightKeyed",this._autocomplete)}function e(b){var c=a(g.wrapper),d=a(g.dropdown),e=a(b),f=a(g.hint);c=c.css(h.wrapper),d=d.css(h.dropdown),f.css(h.hint).css({backgroundAttachment:e.css("background-attachment"),backgroundClip:e.css("background-clip"),backgroundColor:e.css("background-color"),backgroundImage:e.css("background-image"),backgroundOrigin:e.css("background-origin"),backgroundPosition:e.css("background-position"),backgroundRepeat:e.css("background-repeat"),backgroundSize:e.css("background-size")}),e.data("ttAttrs",{dir:e.attr("dir"),autocomplete:e.attr("autocomplete"),spellcheck:e.attr("spellcheck"),style:e.attr("style")}),e.addClass("tt-query").attr({autocomplete:"off",spellcheck:!1}).css(h.query);try{!e.attr("dir")&&e.attr("dir","auto")}catch(i){}return e.wrap(c).parent().prepend(f).append(d)}function f(a){var b=a.find(".tt-query");c.each(b.data("ttAttrs"),function(a,d){c.isUndefined(d)?b.removeAttr(a):b.attr(a,d)}),b.detach().removeData("ttAttrs").removeClass("tt-query").insertAfter(a),a.remove()}var g={wrapper:'<span class="twitter-typeahead"></span>',hint:'<input class="tt-hint" type="text" autocomplete="off" spellcheck="off" disabled>',dropdown:'<span class="tt-dropdown-menu"></span>'},h={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none"},query:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"}};return c.isMsie()&&c.mixin(h.query,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),c.isMsie()&&c.isMsie()<=7&&(c.mixin(h.wrapper,{display:"inline",zoom:"1"}),c.mixin(h.query,{marginTop:"-1px"})),c.mixin(b.prototype,d,{_managePreventDefault:function(a){var b,c,d=a.data,e=!1;switch(a.type){case"tabKeyed":b=this.inputView.getHintValue(),c=this.inputView.getInputValue(),e=b&&b!==c;break;case"upKeyed":case"downKeyed":e=!d.shiftKey&&!d.ctrlKey&&!d.metaKey}e&&d.preventDefault()},_setLanguageDirection:function(){var a=this.inputView.getLanguageDirection();a!==this.dir&&(this.dir=a,this.$node.css("direction",a),this.dropdownView.setLanguageDirection(a))},_updateHint:function(){var a,b,d,e,f,g=this.dropdownView.getFirstSuggestion(),h=g?g.value:null,i=this.dropdownView.isVisible(),j=this.inputView.isOverflow();h&&i&&!j&&(a=this.inputView.getInputValue(),b=a.replace(/\s{2,}/g," ").replace(/^\s+/g,""),d=c.escapeRegExChars(b),e=new RegExp("^(?:"+d+")(.*$)","i"),f=e.exec(h),this.inputView.setHintValue(a+(f?f[1]:"")))},_clearHint:function(){this.inputView.setHintValue("")},_clearSuggestions:function(){this.dropdownView.clearSuggestions()},_setInputValueToQuery:function(){this.inputView.setInputValue(this.inputView.getQuery())},_setInputValueToSuggestionUnderCursor:function(a){var b=a.data;this.inputView.setInputValue(b.value,!0)},_openDropdown:function(){this.dropdownView.open()},_closeDropdown:function(a){this.dropdownView["blured"===a.type?"closeUnlessMouseIsOverDropdown":"close"]()},_moveDropdownCursor:function(a){var b=a.data;b.shiftKey||b.ctrlKey||b.metaKey||this.dropdownView["upKeyed"===a.type?"moveCursorUp":"moveCursorDown"]()},_handleSelection:function(a){var b="suggestionSelected"===a.type,d=b?a.data:this.dropdownView.getSuggestionUnderCursor();d&&(this.inputView.setInputValue(d.value),b?this.inputView.focus():a.data.preventDefault(),b&&c.isMsie()?c.defer(this.dropdownView.close):this.dropdownView.close(),this.eventBus.trigger("selected",d.datum,d.dataset))},_getSuggestions:function(){var a=this,b=this.inputView.getQuery();c.isBlankString(b)||c.each(this.datasets,function(c,d){d.getSuggestions(b,function(c){b===a.inputView.getQuery()&&a.dropdownView.renderSuggestions(d,c)})})},_autocomplete:function(a){var b,c,d,e,f;("rightKeyed"!==a.type&&"leftKeyed"!==a.type||(b=this.inputView.isCursorAtEnd(),c="ltr"===this.inputView.getLanguageDirection()?"leftKeyed"===a.type:"rightKeyed"===a.type,b&&!c))&&(d=this.inputView.getQuery(),e=this.inputView.getHintValue(),""!==e&&d!==e&&(f=this.dropdownView.getFirstSuggestion(),this.inputView.setInputValue(f.value),this.eventBus.trigger("autocompleted",f.datum,f.dataset)))},_propagateEvent:function(a){this.eventBus.trigger(a.type)},destroy:function(){this.inputView.destroy(),this.dropdownView.destroy(),f(this.$node),this.$node=null},setQuery:function(a){this.inputView.setQuery(a),this.inputView.setInputValue(a),this._clearHint(),this._clearSuggestions(),this._getSuggestions()}}),b}();!function(){var b,d={},f="ttView";b={initialize:function(b){function g(){var b,d=a(this),g=new e({el:d});b=c.map(h,function(a){return a.initialize()}),d.data(f,new l({input:d,eventBus:g=new e({el:d}),datasets:h})),a.when.apply(a,b).always(function(){c.defer(function(){g.trigger("initialized")})})}var h;return b=c.isArray(b)?b:[b],0===b.length&&a.error("no datasets provided"),h=c.map(b,function(a){var b=d[a.name]?d[a.name]:new i(a);return a.name&&(d[a.name]=b),b}),this.each(g)},destroy:function(){function b(){var b=a(this),c=b.data(f);c&&(c.destroy(),b.removeData(f))}return this.each(b)},setQuery:function(b){function c(){var c=a(this).data(f);c&&c.setQuery(b)}return this.each(c)}},jQuery.fn.typeahead=function(a){return b[a]?b[a].apply(this,[].slice.call(arguments,1)):b.initialize.apply(this,arguments)}}()}(window.jQuery);
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function decode(s) {
		if (config.raw) {
			return s;
		}
		try {
			// If we can't decode the cookie, ignore it, it's unusable.
			return decodeURIComponent(s.replace(pluses, ' '));
		} catch(e) {}
	}

	function decodeAndParse(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		s = decode(s);

		try {
			// If we can't parse the cookie, ignore it, it's unusable.
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				result = decodeAndParse(cookie);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = decodeAndParse(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 38: "up", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},

		/*specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},*/
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

(function($) {
  $.couch = $.couch || {};

  function encodeDocId(docID) {
    var parts = docID.split("/");
    if (parts[0] == "_design") {
      parts.shift();
      return "_design/" + encodeURIComponent(parts.join('/'));
    }
    return encodeURIComponent(docID);
  };

  var uuidCache = [];

  $.extend($.couch, {
    urlPrefix: '',
    activeTasks: function(options) {
      ajax(
        {url: this.urlPrefix + "/_active_tasks"},
        options,
        "Active task status could not be retrieved"
      );
    },

    allDbs: function(options) {
      ajax(
        {url: this.urlPrefix + "/_all_dbs"},
        options,
        "An error occurred retrieving the list of all databases"
      );
    },

    config: function(options, section, option, value) {
      var req = {url: this.urlPrefix + "/_config/"};
      if (section) {
        req.url += encodeURIComponent(section) + "/";
        if (option) {
          req.url += encodeURIComponent(option);
        }
      }
      if (value === null) {
        req.type = "DELETE";        
      } else if (value !== undefined) {
        req.type = "PUT";
        req.data = toJSON(value);
        req.contentType = "application/json";
        req.processData = false
      }

      ajax(req, options,
        "An error occurred retrieving/updating the server configuration"
      );
    },
    
    session: function(options) {
      options = options || {};
      $.ajax({
        type: "GET", url: this.urlPrefix + "/_session",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        },
        complete: function(req) {
          var resp = httpData(req, "json");
          if (req.status == 200) {
            if (options.success) options.success(resp);
          } else if (options.error) {
            options.error(req.status, resp.error, resp.reason);
          } else {
            alert("An error occurred getting session info: " + resp.reason);
          }
        }
      });
    },

    userDb : function(callback) {
      $.couch.session({
        success : function(resp) {
          var userDb = $.couch.db(resp.info.authentication_db);
          callback(userDb);
        }
      });
    },

    signup: function(user_doc, password, options) {      
      options = options || {};
      // prepare user doc based on name and password
      user_doc = this.prepareUserDoc(user_doc, password);
      $.couch.userDb(function(db) {
        db.saveDoc(user_doc, options);
      });
    },

    prepareUserDoc: function(user_doc, new_password) {
      if (typeof hex_sha1 == "undefined") {
        alert("creating a user doc requires sha1.js to be loaded in the page");
        return;
      }
      var user_prefix = "org.couchdb.user:";
      user_doc._id = user_doc._id || user_prefix + user_doc.name;
      if (new_password) {
        // handle the password crypto
        user_doc.salt = $.couch.newUUID();
        user_doc.password_sha = hex_sha1(new_password + user_doc.salt);
      }
      user_doc.type = "user";
      if (!user_doc.roles) {
        user_doc.roles = [];
      }
      return user_doc;
    },

    login: function(options) {
      options = options || {};
      $.ajax({
        type: "POST", url: this.urlPrefix + "/_session", dataType: "json",
        data: {name: options.name, password: options.password},
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        },
        complete: function(req) {
          var resp = httpData(req, "json");
          if (req.status == 200) {
            if (options.success) options.success(resp);
          } else if (options.error) {
            options.error(req.status, resp.error, resp.reason);
          } else {
            alert("An error occurred logging in: " + resp.reason);
          }
        }
      });
    },
    logout: function(options) {
      options = options || {};
      $.ajax({
        type: "DELETE", url: this.urlPrefix + "/_session", dataType: "json",
        username : "_", password : "_",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        },
        complete: function(req) {
          var resp = httpData(req, "json");
          if (req.status == 200) {
            if (options.success) options.success(resp);
          } else if (options.error) {
            options.error(req.status, resp.error, resp.reason);
          } else {
            alert("An error occurred logging out: " + resp.reason);
          }
        }
      });
    },

    db: function(name, db_opts) {
      db_opts = db_opts || {};
      var rawDocs = {};
      function maybeApplyVersion(doc) {
        if (doc._id && doc._rev && rawDocs[doc._id] && rawDocs[doc._id].rev == doc._rev) {
          // todo: can we use commonjs require here?
          if (typeof Base64 == "undefined") {
            alert("please include /_utils/script/base64.js in the page for base64 support");
            return false;
          } else {
            doc._attachments = doc._attachments || {};
            doc._attachments["rev-"+doc._rev.split("-")[0]] = {
              content_type :"application/json",
              data : Base64.encode(rawDocs[doc._id].raw)
            };
            return true;
          }
        }
      };
      return {
        name: name,
        uri: this.urlPrefix + "/" + encodeURIComponent(name) + "/",

        compact: function(options) {
          $.extend(options, {successStatus: 202});
          ajax({
              type: "POST", url: this.uri + "_compact",
              data: "", processData: false
            },
            options,
            "The database could not be compacted"
          );
        },
        viewCleanup: function(options) {
          $.extend(options, {successStatus: 202});
          ajax({
              type: "POST", url: this.uri + "_view_cleanup",
              data: "", processData: false
            },
            options,
            "The views could not be cleaned up"
          );
        },
        compactView: function(groupname, options) {
          $.extend(options, {successStatus: 202});
          ajax({
              type: "POST", url: this.uri + "_compact/" + groupname,
              data: "", processData: false
            },
            options,
            "The view could not be compacted"
          );
        },
        create: function(options) {
          $.extend(options, {successStatus: 201});
          ajax({
              type: "PUT", url: this.uri, contentType: "application/json",
              data: "", processData: false
            },
            options,
            "The database could not be created"
          );
        },
        drop: function(options) {
          ajax(
            {type: "DELETE", url: this.uri},
            options,
            "The database could not be deleted"
          );
        },
        info: function(options) {
          ajax(
            {url: this.uri},
            options,
            "Database information could not be retrieved"
          );
        },
        changes: function(since, options) {
          options = options || {};
          // set up the promise object within a closure for this handler
          var timeout = 100, db = this, active = true,
            listeners = [],
            promise = {
            onChange : function(fun) {
              listeners.push(fun);
            },
            stop : function() {
              active = false;
            }
          };
          // call each listener when there is a change
          function triggerListeners(resp) {
            $.each(listeners, function() {
              this(resp);
            });
          };
          // when there is a change, call any listeners, then check for another change
          options.success = function(resp) {
            timeout = 100;
            if (active) {
              since = resp.last_seq;
              triggerListeners(resp);
              getChangesSince();
            };
          };
          options.error = function() {
            if (active) {
              setTimeout(getChangesSince, timeout);
              timeout = timeout * 2;
            }
          };
          // actually make the changes request
          function getChangesSince() {
            var opts = $.extend({heartbeat : 10 * 1000}, options, {
              feed : "longpoll",
              since : since
            });
            ajax(
              {url: db.uri + "_changes"+encodeOptions(opts)},
              options,
              "Error connecting to "+db.uri+"/_changes."
            );
          }
          // start the first request
          if (since) {
            getChangesSince();
          } else {
            db.info({
              success : function(info) {
                since = info.update_seq;
                getChangesSince();
              }
            });
          }
          return promise;
        },
        allDocs: function(options) {
          var type = "GET";
          var data = null;
          if (options["keys"]) {
            type = "POST";
            var keys = options["keys"];
            delete options["keys"];
            data = toJSON({ "keys": keys });
          }
          ajax({
              type: type,
              data: data,
              url: this.uri + "_all_docs" + encodeOptions(options)
            },
            options,
            "An error occurred retrieving a list of all documents"
          );
        },
        allDesignDocs: function(options) {
          this.allDocs($.extend({startkey:"_design", endkey:"_design0"}, options));
        },
        allApps: function(options) {
          options = options || {};
          var self = this;
          if (options.eachApp) {
            this.allDesignDocs({
              success: function(resp) {
                $.each(resp.rows, function() {
                  self.openDoc(this.id, {
                    success: function(ddoc) {
                      var index, appPath, appName = ddoc._id.split('/');
                      appName.shift();
                      appName = appName.join('/');
                      index = ddoc.couchapp && ddoc.couchapp.index;
                      if (index) {
                        appPath = ['', name, ddoc._id, index].join('/');
                      } else if (ddoc._attachments && ddoc._attachments["index.html"]) {
                        appPath = ['', name, ddoc._id, "index.html"].join('/');
                      }
                      if (appPath) options.eachApp(appName, appPath, ddoc);
                    }
                  });
                });
              }
            });
          } else {
            alert("Please provide an eachApp function for allApps()");
          }
        },
        openDoc: function(docId, options, ajaxOptions) {
          options = options || {};
          if (db_opts.attachPrevRev || options.attachPrevRev) {
            $.extend(options, {
              beforeSuccess : function(req, doc) {
                rawDocs[doc._id] = {
                  rev : doc._rev,
                  raw : req.responseText
                };
              }
            });
          } else {
            $.extend(options, {
              beforeSuccess : function(req, doc) {
                if (doc["jquery.couch.attachPrevRev"]) {
                  rawDocs[doc._id] = {
                    rev : doc._rev,
                    raw : req.responseText
                  };
                }
              }
            });
          }
          ajax({url: this.uri + encodeDocId(docId) + encodeOptions(options)},
            options,
            "The document could not be retrieved",
            ajaxOptions
          );
        },
        saveDoc: function(doc, options) {
          options = options || {};
          var db = this;
          var beforeSend = fullCommit(options);
          if (doc._id === undefined) {
            var method = "POST";
            var uri = this.uri;
          } else {
            var method = "PUT";
            var uri = this.uri + encodeDocId(doc._id);
          }
          var versioned = maybeApplyVersion(doc);
          $.ajax({
            type: method, url: uri + encodeOptions(options),
            contentType: "application/json",
            dataType: "json", data: toJSON(doc),
            beforeSend : beforeSend,
            complete: function(req) {
              var resp = httpData(req, "json");
              if (req.status == 200 || req.status == 201 || req.status == 202) {
                doc._id = resp.id;
                doc._rev = resp.rev;
                if (versioned) {
                  db.openDoc(doc._id, {
                    attachPrevRev : true,
                    success : function(d) {
                      doc._attachments = d._attachments;
                      if (options.success) options.success(resp);
                    }
                  });
                } else {
                  if (options.success) options.success(resp);
                }
              } else if (options.error) {
                options.error(req.status, resp.error, resp.reason);
              } else {
                alert("The document could not be saved: " + resp.reason);
              }
            }
          });
        },
        bulkSave: function(docs, options) {
          var beforeSend = fullCommit(options);
          $.extend(options, {successStatus: 201, beforeSend : beforeSend});
          ajax({
              type: "POST",
              url: this.uri + "_bulk_docs" + encodeOptions(options),
              contentType: "application/json", data: toJSON(docs)
            },
            options,
            "The documents could not be saved"
          );
        },
        removeDoc: function(doc, options) {
          ajax({
              type: "DELETE",
              url: this.uri +
                   encodeDocId(doc._id) +
                   encodeOptions({rev: doc._rev})
            },
            options,
            "The document could not be deleted"
          );
        },
        bulkRemove: function(docs, options){
          docs.docs = $.each(
            docs.docs, function(i, doc){
              doc._deleted = true;
            }
          );
          $.extend(options, {successStatus: 201});
          ajax({
              type: "POST",
              url: this.uri + "_bulk_docs" + encodeOptions(options),
              data: toJSON(docs)
            },
            options,
            "The documents could not be deleted"
          );
        },
        copyDoc: function(docId, options, ajaxOptions) {
          ajaxOptions = $.extend(ajaxOptions, {
            complete: function(req) {
              var resp = httpData(req, "json");
              if (req.status == 201) {
                if (options.success) options.success(resp);
              } else if (options.error) {
                options.error(req.status, resp.error, resp.reason);
              } else {
                alert("The document could not be copied: " + resp.reason);
              }
            }
          });
          ajax({
              type: "COPY",
              url: this.uri + encodeDocId(docId)
            },
            options,
            "The document could not be copied",
            ajaxOptions
          );
        },
        query: function(mapFun, reduceFun, language, options) {
          language = language || "javascript";
          if (typeof(mapFun) !== "string") {
            mapFun = mapFun.toSource ? mapFun.toSource() : "(" + mapFun.toString() + ")";
          }
          var body = {language: language, map: mapFun};
          if (reduceFun != null) {
            if (typeof(reduceFun) !== "string")
              reduceFun = reduceFun.toSource ? reduceFun.toSource() : "(" + reduceFun.toString() + ")";
            body.reduce = reduceFun;
          }
          ajax({
              type: "POST",
              url: this.uri + "_temp_view" + encodeOptions(options),
              contentType: "application/json", data: toJSON(body)
            },
            options,
            "An error occurred querying the database"
          );
        },
        list: function(list, view, options) {
          var list = list.split('/');
          var options = options || {};
          var type = 'GET';
          var data = null;
          if (options['keys']) {
            type = 'POST';
            var keys = options['keys'];
            delete options['keys'];
            data = toJSON({'keys': keys });
          }
          ajax({
              type: type,
              data: data,
              url: this.uri + '_design/' + list[0] +
                   '/_list/' + list[1] + '/' + view + encodeOptions(options)
              },
              options, 'An error occured accessing the list'
          );
        },
        view: function(name, options) {
          var name = name.split('/');
          var options = options || {};
          var type = "GET";
          var data= null;
          if (options["keys"]) {
            type = "POST";
            var keys = options["keys"];
            delete options["keys"];
            data = toJSON({ "keys": keys });
          }
          ajax({
              type: type,
              //contentType: "application/json; charset=utf-8",
              data: data,
              url: this.uri + "_design/" + name[0] +
                   "/_view/" + name[1] + encodeOptions(options)
            },
            options, "An error occurred accessing the view"
          );
        },
        getDbProperty: function(propName, options, ajaxOptions) {
          ajax({url: this.uri + propName + encodeOptions(options)},
            options,
            "The property could not be retrieved",
            ajaxOptions
          );
        },

        setDbProperty: function(propName, propValue, options, ajaxOptions) {
          ajax({
            type: "PUT", 
            url: this.uri + propName + encodeOptions(options),
            data : JSON.stringify(propValue)
          },
            options,
            "The property could not be updated",
            ajaxOptions
          );
        }
      };
    },

    encodeDocId: encodeDocId, 

    info: function(options) {
      ajax(
        {url: this.urlPrefix + "/"},
        options,
        "Server information could not be retrieved"
      );
    },

    replicate: function(source, target, ajaxOptions, repOpts) {
      repOpts = $.extend({source: source, target: target}, repOpts);
      if (repOpts.continuous && !repOpts.cancel) {
        ajaxOptions.successStatus = 202;
      }
      ajax({
          type: "POST", url: this.urlPrefix + "/_replicate",
          data: JSON.stringify(repOpts),
          contentType: "application/json"
        },
        ajaxOptions,
        "Replication failed"
      );
    },

    newUUID: function(cacheNum) {
      if (cacheNum === undefined) {
        cacheNum = 1;
      }
      if (!uuidCache.length) {
        ajax({url: this.urlPrefix + "/_uuids", data: {count: cacheNum}, async: false}, {
            success: function(resp) {
              uuidCache = resp.uuids;
            }
          },
          "Failed to retrieve UUID batch."
        );
      }
      return uuidCache.shift();
    }
  });

  var httpData = $.httpData || function( xhr, type, s ) { // lifted from jq1.4.4
    var ct = xhr.getResponseHeader("content-type") || "",
      xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
      data = xml ? xhr.responseXML : xhr.responseText;

    if ( xml && data.documentElement.nodeName === "parsererror" ) {
      $.error( "parsererror" );
    }
    if ( s && s.dataFilter ) {
      data = s.dataFilter( data, type );
    }
    if ( typeof data === "string" ) {
      if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
        data = $.parseJSON( data );
      } else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
        $.globalEval( data );
      }
    }
    return data;
  };

  function ajax(obj, options, errorMessage, ajaxOptions) {

    var defaultAjaxOpts = {
      contentType: "application/json",
      headers:{"Accept": "application/json"}
    };

    options = $.extend({successStatus: 200}, options);
    ajaxOptions = $.extend(defaultAjaxOpts, ajaxOptions);
    errorMessage = errorMessage || "Unknown error";
    $.ajax($.extend($.extend({
      // aus msie false gemacht, damit mit modernen jquery kompatibel
      type: "GET", dataType: "json", cache : false,
      //type: "GET", dataType: "json", cache : !$.browser.msie,
      beforeSend: function(xhr){
        if(ajaxOptions && ajaxOptions.headers){
          for (var header in ajaxOptions.headers){
            xhr.setRequestHeader(header, ajaxOptions.headers[header]);
          }
        }
      },
      complete: function(req) {
        try {
          var resp = httpData(req, "json");
        } catch(e) {
          if (options.error) {
            options.error(req.status, req, e);
          } else {
            alert(errorMessage + ": " + e);
          }
          return;
        }
        if (options.ajaxStart) {
          options.ajaxStart(resp);
        }
        if (req.status == options.successStatus) {
          if (options.beforeSuccess) options.beforeSuccess(req, resp);
          if (options.success) options.success(resp);
        } else if (options.error) {
          options.error(req.status, resp && resp.error || errorMessage, resp && resp.reason || "no response");
        } else {
          alert(errorMessage + ": " + resp.reason);
        }
      }
    }, obj), ajaxOptions));
  }

  function fullCommit(options) {
    var options = options || {};
    if (typeof options.ensure_full_commit !== "undefined") {
      var commit = options.ensure_full_commit;
      delete options.ensure_full_commit;
      return function(xhr) {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader("X-Couch-Full-Commit", commit.toString());
      };
    }
  };

  // Convert a options object to an url query string.
  // ex: {key:'value',key2:'value2'} becomes '?key="value"&key2="value2"'
  function encodeOptions(options) {
    var buf = [];
    if (typeof(options) === "object" && options !== null) {
      for (var name in options) {
        if ($.inArray(name, ["error", "success", "beforeSuccess", "ajaxStart"]) >= 0)
          continue;
        var value = options[name];
        if ($.inArray(name, ["key", "startkey", "endkey"]) >= 0) {
          value = toJSON(value);
        }
        buf.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
      }
    }
    return buf.length ? "?" + buf.join("&") : "";
  }

  function toJSON(obj) {
    return obj !== null ? JSON.stringify(obj) : null;
  }

})(jQuery);


RegExp.escape=function(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');};(function($){'use strict'
$.csv={defaults:{separator:',',delimiter:'"',headers:true},hooks:{castToScalar:function(value,state){var hasDot=/\./;if(isNaN(value)){return value;}else{if(hasDot.test(value)){return parseFloat(value);}else{var integer=parseInt(value);if(isNaN(integer)){return null;}else{return integer;}}}}},parsers:{parse:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
if(!options.state.colNum){options.state.colNum=1;}
var data=[];var entry=[];var state=0;var value=''
var exit=false;function endOfEntry(){state=0;value='';if(options.start&&options.state.rowNum<options.start){entry=[];options.state.rowNum++;options.state.colNum=1;return;}
if(options.onParseEntry===undefined){data.push(entry);}else{var hookVal=options.onParseEntry(entry,options.state);if(hookVal!==false){data.push(hookVal);}}
entry=[];if(options.end&&options.state.rowNum>=options.end){exit=true;}
options.state.rowNum++;options.state.colNum=1;}
function endOfValue(){if(options.onParseValue===undefined){entry.push(value);}else{var hook=options.onParseValue(value,options.state);if(hook!==false){entry.push(hook);}}
value='';state=0;options.state.colNum++;}
var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);match=RegExp(matchSrc,'gm');csv.replace(match,function(m0){if(exit){return;}
switch(state){case 0:if(m0===separator){value+='';endOfValue();break;}
if(m0===delimiter){state=1;break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
value+=m0;state=3;break;case 1:if(m0===delimiter){state=2;break;}
value+=m0;state=1;break;case 2:if(m0===delimiter){value+=m0;state=1;break;}
if(m0===separator){endOfValue();break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
throw new Error('CSVDataError: Illegal State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');case 3:if(m0===separator){endOfValue();break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal Quote [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}
throw new Error('CSVDataError: Illegal Data [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');default:throw new Error('CSVDataError: Unknown State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}});if(entry.length!==0){endOfValue();endOfEntry();}
return data;},splitLines:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
var entries=[];var state=0;var entry='';var exit=false;function endOfLine(){state=0;if(options.start&&options.state.rowNum<options.start){entry='';options.state.rowNum++;return;}
if(options.onParseEntry===undefined){entries.push(entry);}else{var hookVal=options.onParseEntry(entry,options.state);if(hookVal!==false){entries.push(hookVal);}}
entry='';if(options.end&&options.state.rowNum>=options.end){exit=true;}
options.state.rowNum++;}
var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);match=RegExp(matchSrc,'gm');csv.replace(match,function(m0){if(exit){return;}
switch(state){case 0:if(m0===separator){entry+=m0;state=0;break;}
if(m0===delimiter){entry+=m0;state=1;break;}
if(m0==='\n'){endOfLine();break;}
if(/^\r$/.test(m0)){break;}
entry+=m0;state=3;break;case 1:if(m0===delimiter){entry+=m0;state=2;break;}
entry+=m0;state=1;break;case 2:var prevChar=entry.substr(entry.length-1);if(m0===delimiter&&prevChar===delimiter){entry+=m0;state=1;break;}
if(m0===separator){entry+=m0;state=0;break;}
if(m0==='\n'){endOfLine();break;}
if(m0==='\r'){break;}
throw new Error('CSVDataError: Illegal state [Row:'+options.state.rowNum+']');case 3:if(m0===separator){entry+=m0;state=0;break;}
if(m0==='\n'){endOfLine();break;}
if(m0==='\r'){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal quote [Row:'+options.state.rowNum+']');}
throw new Error('CSVDataError: Illegal state [Row:'+options.state.rowNum+']');default:throw new Error('CSVDataError: Unknown state [Row:'+options.state.rowNum+']');}});if(entry!==''){endOfLine();}
return entries;},parseEntry:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
if(!options.state.colNum){options.state.colNum=1;}
var entry=[];var state=0;var value='';function endOfValue(){if(options.onParseValue===undefined){entry.push(value);}else{var hook=options.onParseValue(value,options.state);if(hook!==false){entry.push(hook);}}
value='';state=0;options.state.colNum++;}
if(!options.match){var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);options.match=RegExp(matchSrc,'gm');}
csv.replace(options.match,function(m0){switch(state){case 0:if(m0===separator){value+='';endOfValue();break;}
if(m0===delimiter){state=1;break;}
if(m0==='\n'||m0==='\r'){break;}
value+=m0;state=3;break;case 1:if(m0===delimiter){state=2;break;}
value+=m0;state=1;break;case 2:if(m0===delimiter){value+=m0;state=1;break;}
if(m0===separator){endOfValue();break;}
if(m0==='\n'||m0==='\r'){break;}
throw new Error('CSVDataError: Illegal State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');case 3:if(m0===separator){endOfValue();break;}
if(m0==='\n'||m0==='\r'){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal Quote [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}
throw new Error('CSVDataError: Illegal Data [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');default:throw new Error('CSVDataError: Unknown State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}});endOfValue();return entry;}},toArray:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;var state=(options.state!==undefined?options.state:{});var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,state:state}
var entry=$.csv.parsers.parseEntry(csv,options);if(!config.callback){return entry;}else{config.callback('',entry);}},toArrays:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;var data=[];var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,start:options.start,end:options.end,state:{rowNum:1,colNum:1}};data=$.csv.parsers.parse(csv,options);if(!config.callback){return data;}else{config.callback('',data);}},toObjects:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.headers='headers'in options?options.headers:$.csv.defaults.headers;options.start='start'in options?options.start:1;if(config.headers){options.start++;}
if(options.end&&config.headers){options.end++;}
var lines=[];var data=[];var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,start:options.start,end:options.end,state:{rowNum:1,colNum:1},match:false};var headerOptions={delimiter:config.delimiter,separator:config.separator,start:1,end:1,state:{rowNum:1,colNum:1}}
var headerLine=$.csv.parsers.splitLines(csv,headerOptions);var headers=$.csv.toArray(headerLine[0],options);var lines=$.csv.parsers.splitLines(csv,options);options.state.colNum=1;if(headers){options.state.rowNum=2;}else{options.state.rowNum=1;}
for(var i=0,len=lines.length;i<len;i++){var entry=$.csv.toArray(lines[i],options);var object={};for(var j in headers){object[headers[j]]=entry[j];}
data.push(object);options.state.rowNum++;}
if(!config.callback){return data;}else{config.callback('',data);}},fromArrays:function(arrays,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.escaper='escaper'in options?options.escaper:$.csv.defaults.escaper;config.experimental='experimental'in options?options.experimental:false;if(!config.experimental){throw new Error('not implemented');}
var output=[];for(i in arrays){output.push(arrays[i]);}
if(!config.callback){return output;}else{config.callback('',output);}},fromObjects2CSV:function(objects,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.experimental='experimental'in options?options.experimental:false;if(!config.experimental){throw new Error('not implemented');}
var output=[];for(i in objects){output.push(arrays[i]);}
if(!config.callback){return output;}else{config.callback('',output);}}};$.csvEntry2Array=$.csv.toArray;$.csv2Array=$.csv.toArrays;$.csv2Dictionary=$.csv.toObjects;})(jQuery);
/*! jsUri v1.1.1 | https://github.com/derek-watson/jsUri */
var Query=function(a){"use strict";var b=function(a){var b=[],c,d,e,f;if(typeof a=="undefined"||a===null||a==="")return b;a.indexOf("?")===0&&(a=a.substring(1)),d=a.toString().split(/[&;]/);for(c=0;c<d.length;c++)e=d[c],f=e.split("="),b.push([f[0],f[1]]);return b},c=b(a),d=function(){var a="",b,d;for(b=0;b<c.length;b++)d=c[b],a.length>0&&(a+="&"),a+=d.join("=");return a.length>0?"?"+a:a},e=function(a){a=decodeURIComponent(a),a=a.replace("+"," ");return a},f=function(a){var b,d;for(d=0;d<c.length;d++){b=c[d];if(e(a)===e(b[0]))return b[1]}},g=function(a){var b=[],d,f;for(d=0;d<c.length;d++)f=c[d],e(a)===e(f[0])&&b.push(f[1]);return b},h=function(a,b){var d=[],f,g,h,i;for(f=0;f<c.length;f++)g=c[f],h=e(g[0])===e(a),i=e(g[1])===e(b),(arguments.length===1&&!h||arguments.length===2&&!h&&!i)&&d.push(g);c=d;return this},i=function(a,b,d){arguments.length===3&&d!==-1?(d=Math.min(d,c.length),c.splice(d,0,[a,b])):arguments.length>0&&c.push([a,b]);return this},j=function(a,b,d){var f=-1,g,j;if(arguments.length===3){for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)&&decodeURIComponent(j[1])===e(d)){f=g;break}}h(a,d).addParam(a,b,f)}else{for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)){f=g;break}}h(a),i(a,b,f)}return this};return{getParamValue:f,getParamValues:g,deleteParam:h,addParam:i,replaceParam:j,toString:d}},Uri=function(a){"use strict";var b=!1,c=function(a){var c={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},d=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],e={name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},f=c[b?"strict":"loose"].exec(a),g={},h=14;while(h--)g[d[h]]=f[h]||"";g[e.name]={},g[d[12]].replace(e.parser,function(a,b,c){b&&(g[e.name][b]=c)});return g},d=c(a||""),e=new Query(d.query),f=function(a){typeof a!="undefined"&&(d.protocol=a);return d.protocol},g=null,h=function(a){typeof a!="undefined"&&(g=a);return g===null?d.source.indexOf("//")!==-1:g},i=function(a){typeof a!="undefined"&&(d.userInfo=a);return d.userInfo},j=function(a){typeof a!="undefined"&&(d.host=a);return d.host},k=function(a){typeof a!="undefined"&&(d.port=a);return d.port},l=function(a){typeof a!="undefined"&&(d.path=a);return d.path},m=function(a){typeof a!="undefined"&&(e=new Query(a));return e},n=function(a){typeof a!="undefined"&&(d.anchor=a);return d.anchor},o=function(a){f(a);return this},p=function(a){h(a);return this},q=function(a){i(a);return this},r=function(a){j(a);return this},s=function(a){k(a);return this},t=function(a){l(a);return this},u=function(a){m(a);return this},v=function(a){n(a);return this},w=function(a){return m().getParamValue(a)},x=function(a){return m().getParamValues(a)},y=function(a,b){arguments.length===2?m().deleteParam(a,b):m().deleteParam(a);return this},z=function(a,b,c){arguments.length===3?m().addParam(a,b,c):m().addParam(a,b);return this},A=function(a,b,c){arguments.length===3?m().replaceParam(a,b,c):m().replaceParam(a,b);return this},B=function(){var a="",b=function(a){return a!==null&&a!==""};b(f())?(a+=f(),f().indexOf(":")!==f().length-1&&(a+=":"),a+="//"):h()&&b(j())&&(a+="//"),b(i())&&b(j())&&(a+=i(),i().indexOf("@")!==i().length-1&&(a+="@")),b(j())&&(a+=j(),b(k())&&(a+=":"+k())),b(l())?a+=l():b(j())&&(b(m().toString())||b(n()))&&(a+="/"),b(m().toString())&&(m().toString().indexOf("?")!==0&&(a+="?"),a+=m().toString()),b(n())&&(n().indexOf("#")!==0&&(a+="#"),a+=n());return a},C=function(){return new Uri(B())};return{protocol:f,hasAuthorityPrefix:h,userInfo:i,host:j,port:k,path:l,query:m,anchor:n,setProtocol:o,setHasAuthorityPrefix:p,setUserInfo:q,setHost:r,setPort:s,setPath:t,setQuery:u,setAnchor:v,getQueryParamValue:w,getQueryParamValues:x,deleteQueryParam:y,addQueryParam:z,replaceQueryParam:A,toString:B,clone:C}},jsUri=Uri;
/*! FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-01-24
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" &&
	    /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, URL = view.URL || view.webkitURL || view
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = !view.externalHost && "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					URL.revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						window.open(object_url, "_blank");
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				// FF for Android has a nasty garbage collection mechanism
				// that turns all objects that are not pure javascript into 'deadObject'
				// this means `doc` and `save_link` are unusable and need to be recreated
				// `view` is usable though:
				doc = view.document;
				save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
				save_link.href = object_url;
				save_link.download = name;
				var event = doc.createEvent("MouseEvents");
				event.initMouseEvent(
					"click", true, false, view, 0, 0, 0, 0, 0
					, false, false, false, false, 0, null
				);
				save_link.dispatchEvent(event);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	view.addEventListener("unload", process_deletion_queue, false);
	saveAs.unload = function() {
		process_deletion_queue();
		view.removeEventListener("unload", process_deletion_queue, false);
	};
	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined") module.exports = saveAs;

if(typeof Object.create!=="function"){
Object.create=function(o){
function F(){
};
F.prototype=o;
return new F();
};
}
var ua={toString:function(){
return navigator.userAgent;
},test:function(s){
return this.toString().toLowerCase().indexOf(s.toLowerCase())>-1;
}};
ua.version=(ua.toString().toLowerCase().match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];
ua.webkit=ua.test("webkit");
ua.gecko=ua.test("gecko")&&!ua.webkit;
ua.opera=ua.test("opera");
ua.ie=ua.test("msie")&&!ua.opera;
ua.ie6=ua.ie&&document.compatMode&&typeof document.documentElement.style.maxHeight==="undefined";
ua.ie7=ua.ie&&document.documentElement&&typeof document.documentElement.style.maxHeight!=="undefined"&&typeof XDomainRequest==="undefined";
ua.ie8=ua.ie&&typeof XDomainRequest!=="undefined";
var domReady=function(){
var _1=[];
var _2=function(){
if(!arguments.callee.done){
arguments.callee.done=true;
for(var i=0;i<_1.length;i++){
_1[i]();
}
}
};
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",_2,false);
}
if(ua.ie){
(function(){
try{
document.documentElement.doScroll("left");
}
catch(e){
setTimeout(arguments.callee,50);
return;
}
_2();
})();
document.onreadystatechange=function(){
if(document.readyState==="complete"){
document.onreadystatechange=null;
_2();
}
};
}
if(ua.webkit&&document.readyState){
(function(){
if(document.readyState!=="loading"){
_2();
}else{
setTimeout(arguments.callee,10);
}
})();
}
window.onload=_2;
return function(fn){
if(typeof fn==="function"){
_1[_1.length]=fn;
}
return fn;
};
}();
var cssHelper=function(){
var _3={BLOCKS:/[^\s{][^{]*\{(?:[^{}]*\{[^{}]*\}[^{}]*|[^{}]*)*\}/g,BLOCKS_INSIDE:/[^\s{][^{]*\{[^{}]*\}/g,DECLARATIONS:/[a-zA-Z\-]+[^;]*:[^;]+;/g,RELATIVE_URLS:/url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g,REDUNDANT_COMPONENTS:/(?:\/\*([^*\\\\]|\*(?!\/))+\*\/|@import[^;]+;)/g,REDUNDANT_WHITESPACE:/\s*(,|:|;|\{|\})\s*/g,MORE_WHITESPACE:/\s{2,}/g,FINAL_SEMICOLONS:/;\}/g,NOT_WHITESPACE:/\S+/g};
var _4,_5=false;
var _6=[];
var _7=function(fn){
if(typeof fn==="function"){
_6[_6.length]=fn;
}
};
var _8=function(){
for(var i=0;i<_6.length;i++){
_6[i](_4);
}
};
var _9={};
var _a=function(n,v){
if(_9[n]){
var _b=_9[n].listeners;
if(_b){
for(var i=0;i<_b.length;i++){
_b[i](v);
}
}
}
};
var _c=function(_d,_e,_f){
if(ua.ie&&!window.XMLHttpRequest){
window.XMLHttpRequest=function(){
return new ActiveXObject("Microsoft.XMLHTTP");
};
}
if(!XMLHttpRequest){
return "";
}
var r=new XMLHttpRequest();
try{
r.open("get",_d,true);
r.setRequestHeader("X_REQUESTED_WITH","XMLHttpRequest");
}
catch(e){
_f();
return;
}
var _10=false;
setTimeout(function(){
_10=true;
},5000);
document.documentElement.style.cursor="progress";
r.onreadystatechange=function(){
if(r.readyState===4&&!_10){
if(!r.status&&location.protocol==="file:"||(r.status>=200&&r.status<300)||r.status===304||navigator.userAgent.indexOf("Safari")>-1&&typeof r.status==="undefined"){
_e(r.responseText);
}else{
_f();
}
document.documentElement.style.cursor="";
r=null;
}
};
r.send("");
};
var _11=function(_12){
_12=_12.replace(_3.REDUNDANT_COMPONENTS,"");
_12=_12.replace(_3.REDUNDANT_WHITESPACE,"$1");
_12=_12.replace(_3.MORE_WHITESPACE," ");
_12=_12.replace(_3.FINAL_SEMICOLONS,"}");
return _12;
};
var _13={mediaQueryList:function(s){
var o={};
var idx=s.indexOf("{");
var lt=s.substring(0,idx);
s=s.substring(idx+1,s.length-1);
var mqs=[],rs=[];
var qts=lt.toLowerCase().substring(7).split(",");
for(var i=0;i<qts.length;i++){
mqs[mqs.length]=_13.mediaQuery(qts[i],o);
}
var rts=s.match(_3.BLOCKS_INSIDE);
if(rts!==null){
for(i=0;i<rts.length;i++){
rs[rs.length]=_13.rule(rts[i],o);
}
}
o.getMediaQueries=function(){
return mqs;
};
o.getRules=function(){
return rs;
};
o.getListText=function(){
return lt;
};
o.getCssText=function(){
return s;
};
return o;
},mediaQuery:function(s,mql){
s=s||"";
var not=false,_14;
var exp=[];
var _15=true;
var _16=s.match(_3.NOT_WHITESPACE);
for(var i=0;i<_16.length;i++){
var _17=_16[i];
if(!_14&&(_17==="not"||_17==="only")){
if(_17==="not"){
not=true;
}
}else{
if(!_14){
_14=_17;
}else{
if(_17.charAt(0)==="("){
var _18=_17.substring(1,_17.length-1).split(":");
exp[exp.length]={mediaFeature:_18[0],value:_18[1]||null};
}
}
}
}
return {getList:function(){
return mql||null;
},getValid:function(){
return _15;
},getNot:function(){
return not;
},getMediaType:function(){
return _14;
},getExpressions:function(){
return exp;
}};
},rule:function(s,mql){
var o={};
var idx=s.indexOf("{");
var st=s.substring(0,idx);
var ss=st.split(",");
var ds=[];
var dts=s.substring(idx+1,s.length-1).split(";");
for(var i=0;i<dts.length;i++){
ds[ds.length]=_13.declaration(dts[i],o);
}
o.getMediaQueryList=function(){
return mql||null;
};
o.getSelectors=function(){
return ss;
};
o.getSelectorText=function(){
return st;
};
o.getDeclarations=function(){
return ds;
};
o.getPropertyValue=function(n){
for(var i=0;i<ds.length;i++){
if(ds[i].getProperty()===n){
return ds[i].getValue();
}
}
return null;
};
return o;
},declaration:function(s,r){
var idx=s.indexOf(":");
var p=s.substring(0,idx);
var v=s.substring(idx+1);
return {getRule:function(){
return r||null;
},getProperty:function(){
return p;
},getValue:function(){
return v;
}};
}};
var _19=function(el){
if(typeof el.cssHelperText!=="string"){
return;
}
var o={mediaQueryLists:[],rules:[],selectors:{},declarations:[],properties:{}};
var _1a=o.mediaQueryLists;
var ors=o.rules;
var _1b=el.cssHelperText.match(_3.BLOCKS);
if(_1b!==null){
for(var i=0;i<_1b.length;i++){
if(_1b[i].substring(0,7)==="@media "){
_1a[_1a.length]=_13.mediaQueryList(_1b[i]);
ors=o.rules=ors.concat(_1a[_1a.length-1].getRules());
}else{
ors[ors.length]=_13.rule(_1b[i]);
}
}
}
var oss=o.selectors;
var _1c=function(r){
var ss=r.getSelectors();
for(var i=0;i<ss.length;i++){
var n=ss[i];
if(!oss[n]){
oss[n]=[];
}
oss[n][oss[n].length]=r;
}
};
for(i=0;i<ors.length;i++){
_1c(ors[i]);
}
var ods=o.declarations;
for(i=0;i<ors.length;i++){
ods=o.declarations=ods.concat(ors[i].getDeclarations());
}
var ops=o.properties;
for(i=0;i<ods.length;i++){
var n=ods[i].getProperty();
if(!ops[n]){
ops[n]=[];
}
ops[n][ops[n].length]=ods[i];
}
el.cssHelperParsed=o;
_4[_4.length]=el;
return o;
};
var _1d=function(el,s){
el.cssHelperText=_11(s||el.innerHTML);
return _19(el);
};
var _1e=function(){
_5=true;
_4=[];
var _1f=[];
var _20=function(){
for(var i=0;i<_1f.length;i++){
_19(_1f[i]);
}
var _21=document.getElementsByTagName("style");
for(i=0;i<_21.length;i++){
_1d(_21[i]);
}
_5=false;
_8();
};
var _22=document.getElementsByTagName("link");
for(var i=0;i<_22.length;i++){
var _23=_22[i];
if(_23.getAttribute("rel").indexOf("style")>-1&&_23.href&&_23.href.length!==0&&!_23.disabled){
_1f[_1f.length]=_23;
}
}
if(_1f.length>0){
var c=0;
var _24=function(){
c++;
if(c===_1f.length){
_20();
}
};
var _25=function(_26){
var _27=_26.href;
_c(_27,function(_28){
_28=_11(_28).replace(_3.RELATIVE_URLS,"url("+_27.substring(0,_27.lastIndexOf("/"))+"/$1)");
_26.cssHelperText=_28;
_24();
},_24);
};
for(i=0;i<_1f.length;i++){
_25(_1f[i]);
}
}else{
_20();
}
};
var _29={mediaQueryLists:"array",rules:"array",selectors:"object",declarations:"array",properties:"object"};
var _2a={mediaQueryLists:null,rules:null,selectors:null,declarations:null,properties:null};
var _2b=function(_2c,v){
if(_2a[_2c]!==null){
if(_29[_2c]==="array"){
return (_2a[_2c]=_2a[_2c].concat(v));
}else{
var c=_2a[_2c];
for(var n in v){
if(v.hasOwnProperty(n)){
if(!c[n]){
c[n]=v[n];
}else{
c[n]=c[n].concat(v[n]);
}
}
}
return c;
}
}
};
var _2d=function(_2e){
_2a[_2e]=(_29[_2e]==="array")?[]:{};
for(var i=0;i<_4.length;i++){
_2b(_2e,_4[i].cssHelperParsed[_2e]);
}
return _2a[_2e];
};
domReady(function(){
var els=document.body.getElementsByTagName("*");
for(var i=0;i<els.length;i++){
els[i].checkedByCssHelper=true;
}
if(document.implementation.hasFeature("MutationEvents","2.0")||window.MutationEvent){
document.body.addEventListener("DOMNodeInserted",function(e){
var el=e.target;
if(el.nodeType===1){
_a("DOMElementInserted",el);
el.checkedByCssHelper=true;
}
},false);
}else{
setInterval(function(){
var els=document.body.getElementsByTagName("*");
for(var i=0;i<els.length;i++){
if(!els[i].checkedByCssHelper){
_a("DOMElementInserted",els[i]);
els[i].checkedByCssHelper=true;
}
}
},1000);
}
});
var _2f=function(d){
if(typeof window.innerWidth!="undefined"){
return window["inner"+d];
}else{
if(typeof document.documentElement!="undefined"&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!=0){
return document.documentElement["client"+d];
}
}
};
return {addStyle:function(s,_30){
var el=document.createElement("style");
el.setAttribute("type","text/css");
document.getElementsByTagName("head")[0].appendChild(el);
if(el.styleSheet){
el.styleSheet.cssText=s;
}else{
el.appendChild(document.createTextNode(s));
}
el.addedWithCssHelper=true;
if(typeof _30==="undefined"||_30===true){
cssHelper.parsed(function(_31){
var o=_1d(el,s);
for(var n in o){
if(o.hasOwnProperty(n)){
_2b(n,o[n]);
}
}
_a("newStyleParsed",el);
});
}else{
el.parsingDisallowed=true;
}
return el;
},removeStyle:function(el){
return el.parentNode.removeChild(el);
},parsed:function(fn){
if(_5){
_7(fn);
}else{
if(typeof _4!=="undefined"){
if(typeof fn==="function"){
fn(_4);
}
}else{
_7(fn);
_1e();
}
}
},mediaQueryLists:function(fn){
cssHelper.parsed(function(_32){
fn(_2a.mediaQueryLists||_2d("mediaQueryLists"));
});
},rules:function(fn){
cssHelper.parsed(function(_33){
fn(_2a.rules||_2d("rules"));
});
},selectors:function(fn){
cssHelper.parsed(function(_34){
fn(_2a.selectors||_2d("selectors"));
});
},declarations:function(fn){
cssHelper.parsed(function(_35){
fn(_2a.declarations||_2d("declarations"));
});
},properties:function(fn){
cssHelper.parsed(function(_36){
fn(_2a.properties||_2d("properties"));
});
},broadcast:_a,addListener:function(n,fn){
if(typeof fn==="function"){
if(!_9[n]){
_9[n]={listeners:[]};
}
_9[n].listeners[_9[n].listeners.length]=fn;
}
},removeListener:function(n,fn){
if(typeof fn==="function"&&_9[n]){
var ls=_9[n].listeners;
for(var i=0;i<ls.length;i++){
if(ls[i]===fn){
ls.splice(i,1);
i-=1;
}
}
}
},getViewportWidth:function(){
return _2f("Width");
},getViewportHeight:function(){
return _2f("Height");
}};
}();
domReady(function enableCssMediaQueries(){
var _37;
var _38={LENGTH_UNIT:/[0-9]+(em|ex|px|in|cm|mm|pt|pc)$/,RESOLUTION_UNIT:/[0-9]+(dpi|dpcm)$/,ASPECT_RATIO:/^[0-9]+\/[0-9]+$/,ABSOLUTE_VALUE:/^[0-9]*(\.[0-9]+)*$/};
var _39=[];
var _3a=function(){
var id="css3-mediaqueries-test";
var el=document.createElement("div");
el.id=id;
var _3b=cssHelper.addStyle("@media all and (width) { #"+id+" { width: 1px !important; } }",false);
document.body.appendChild(el);
var ret=el.offsetWidth===1;
_3b.parentNode.removeChild(_3b);
el.parentNode.removeChild(el);
_3a=function(){
return ret;
};
return ret;
};
var _3c=function(){
_37=document.createElement("div");
_37.style.cssText="position:absolute;top:-9999em;left:-9999em;"+"margin:0;border:none;padding:0;width:1em;font-size:1em;";
document.body.appendChild(_37);
if(_37.offsetWidth!==16){
_37.style.fontSize=16/_37.offsetWidth+"em";
}
_37.style.width="";
};
var _3d=function(_3e){
_37.style.width=_3e;
var _3f=_37.offsetWidth;
_37.style.width="";
return _3f;
};
var _40=function(_41,_42){
var l=_41.length;
var min=(_41.substring(0,4)==="min-");
var max=(!min&&_41.substring(0,4)==="max-");
if(_42!==null){
var _43;
var _44;
if(_38.LENGTH_UNIT.exec(_42)){
_43="length";
_44=_3d(_42);
}else{
if(_38.RESOLUTION_UNIT.exec(_42)){
_43="resolution";
_44=parseInt(_42,10);
var _45=_42.substring((_44+"").length);
}else{
if(_38.ASPECT_RATIO.exec(_42)){
_43="aspect-ratio";
_44=_42.split("/");
}else{
if(_38.ABSOLUTE_VALUE){
_43="absolute";
_44=_42;
}else{
_43="unknown";
}
}
}
}
}
var _46,_47;
if("device-width"===_41.substring(l-12,l)){
_46=screen.width;
if(_42!==null){
if(_43==="length"){
return ((min&&_46>=_44)||(max&&_46<_44)||(!min&&!max&&_46===_44));
}else{
return false;
}
}else{
return _46>0;
}
}else{
if("device-height"===_41.substring(l-13,l)){
_47=screen.height;
if(_42!==null){
if(_43==="length"){
return ((min&&_47>=_44)||(max&&_47<_44)||(!min&&!max&&_47===_44));
}else{
return false;
}
}else{
return _47>0;
}
}else{
if("width"===_41.substring(l-5,l)){
_46=document.documentElement.clientWidth||document.body.clientWidth;
if(_42!==null){
if(_43==="length"){
return ((min&&_46>=_44)||(max&&_46<_44)||(!min&&!max&&_46===_44));
}else{
return false;
}
}else{
return _46>0;
}
}else{
if("height"===_41.substring(l-6,l)){
_47=document.documentElement.clientHeight||document.body.clientHeight;
if(_42!==null){
if(_43==="length"){
return ((min&&_47>=_44)||(max&&_47<_44)||(!min&&!max&&_47===_44));
}else{
return false;
}
}else{
return _47>0;
}
}else{
if("device-aspect-ratio"===_41.substring(l-19,l)){
return _43==="aspect-ratio"&&screen.width*_44[1]===screen.height*_44[0];
}else{
if("color-index"===_41.substring(l-11,l)){
var _48=Math.pow(2,screen.colorDepth);
if(_42!==null){
if(_43==="absolute"){
return ((min&&_48>=_44)||(max&&_48<_44)||(!min&&!max&&_48===_44));
}else{
return false;
}
}else{
return _48>0;
}
}else{
if("color"===_41.substring(l-5,l)){
var _49=screen.colorDepth;
if(_42!==null){
if(_43==="absolute"){
return ((min&&_49>=_44)||(max&&_49<_44)||(!min&&!max&&_49===_44));
}else{
return false;
}
}else{
return _49>0;
}
}else{
if("resolution"===_41.substring(l-10,l)){
var res;
if(_45==="dpcm"){
res=_3d("1cm");
}else{
res=_3d("1in");
}
if(_42!==null){
if(_43==="resolution"){
return ((min&&res>=_44)||(max&&res<_44)||(!min&&!max&&res===_44));
}else{
return false;
}
}else{
return res>0;
}
}else{
return false;
}
}
}
}
}
}
}
}
};
var _4a=function(mq){
var _4b=mq.getValid();
var _4c=mq.getExpressions();
var l=_4c.length;
if(l>0){
for(var i=0;i<l&&_4b;i++){
_4b=_40(_4c[i].mediaFeature,_4c[i].value);
}
var not=mq.getNot();
return (_4b&&!not||not&&!_4b);
}
};
var _4d=function(mql){
var mqs=mql.getMediaQueries();
var t={};
for(var i=0;i<mqs.length;i++){
if(_4a(mqs[i])){
t[mqs[i].getMediaType()]=true;
}
}
var s=[],c=0;
for(var n in t){
if(t.hasOwnProperty(n)){
if(c>0){
s[c++]=",";
}
s[c++]=n;
}
}
if(s.length>0){
_39[_39.length]=cssHelper.addStyle("@media "+s.join("")+"{"+mql.getCssText()+"}",false);
}
};
var _4e=function(_4f){
for(var i=0;i<_4f.length;i++){
_4d(_4f[i]);
}
if(ua.ie){
document.documentElement.style.display="block";
setTimeout(function(){
document.documentElement.style.display="";
},0);
setTimeout(function(){
cssHelper.broadcast("cssMediaQueriesTested");
},100);
}else{
cssHelper.broadcast("cssMediaQueriesTested");
}
};
var _50=function(){
for(var i=0;i<_39.length;i++){
cssHelper.removeStyle(_39[i]);
}
_39=[];
cssHelper.mediaQueryLists(_4e);
};
var _51=0;
var _52=function(){
var _53=cssHelper.getViewportWidth();
var _54=cssHelper.getViewportHeight();
if(ua.ie){
var el=document.createElement("div");
el.style.position="absolute";
el.style.top="-9999em";
el.style.overflow="scroll";
document.body.appendChild(el);
_51=el.offsetWidth-el.clientWidth;
document.body.removeChild(el);
}
var _55;
var _56=function(){
var vpw=cssHelper.getViewportWidth();
var vph=cssHelper.getViewportHeight();
if(Math.abs(vpw-_53)>_51||Math.abs(vph-_54)>_51){
_53=vpw;
_54=vph;
clearTimeout(_55);
_55=setTimeout(function(){
if(!_3a()){
_50();
}else{
cssHelper.broadcast("cssMediaQueriesTested");
}
},500);
}
};
window.onresize=function(){
var x=window.onresize||function(){
};
return function(){
x();
_56();
};
}();
};
var _57=document.documentElement;
_57.style.marginLeft="-32767px";
setTimeout(function(){
_57.style.marginTop="";
},20000);
return function(){
if(!_3a()){
cssHelper.addListener("newStyleParsed",function(el){
_4e(el.cssHelperParsed.mediaQueryLists);
});
cssHelper.addListener("cssMediaQueriesTested",function(){
if(ua.ie){
_57.style.width="1px";
}
setTimeout(function(){
_57.style.width="";
_57.style.marginLeft="";
},0);
cssHelper.removeListener("cssMediaQueriesTested",arguments.callee);
});
_3c();
_50();
}else{
_57.style.marginLeft="";
}
_52();
};
}());
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}


/*
 * history API JavaScript Library v3.2.6
 *
 * Support: IE6+, FF3+, Opera 9+, Safari, Chrome, Firefox and other
 *
 * Copyright 2011-2013, Dmitrii Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Update: 26-04-2013
 */
(function(d,w,r,j,V){function C(a,b,h,e){var c=Q(),d=k().a,g=h&&k(h),h=g?g.a:d;e&&c[d]&&delete c[d];if((!m||$)&&I&&a)c[h]=a,Q(c),a=j;W&&X?e?X.call(n,a,b,h):W.call(n,a,b,h):g&&g.d!=k().d&&(R=1,e?f.replace("#"+g.e):f.hash=g.e)}function J(a,b,h){var e=2===a?d.onhashchange:d.onpopstate,c=2===a?"hashchange":"popstate",o=p.createEvent?p.createEvent("Events"):p.createEventObject(),a={},g=x[c],f;for(f in o)a[f]="function"===typeof o[f]?function(){}:o[f];a.target=a.currentTarget=a.srcElement=d;a.type=c;a.state=
n.state;a.oldURL=b;a.newURL=h;e&&e.call(d,a);b=0;for(h=g.length;b<h;b++)g[b].call(d,a)}function Q(a){return I?a?I.setItem("__hitoryapi__",K(a)):S(I.getItem("__hitoryapi__"))||{}:{}}function T(a,b,h){var e=a,c,f=r;if(D||E)for(c in b){if(F.call(b,c))if(E)b[c].get&&E.call(a,c,b[c].get),b[c].set&&aa.call(a,c,b[c].set);else if(D)try{D(a,c,b[c])}catch(g){if(h)return r;f=w;break}}else f=w;if(f&&y){h="StaticClass"+ba+y++;e=["Class "+h];"execVB"in d||execScript("Function execVB(c) ExecuteGlobal(c) End Function",
"VBScript");"VBCVal"in d||execScript("Function VBCVal(o,r) If IsObject(o) Then Set r=o Else r=o End If End Function","VBScript");for(c in a)e[e.length]="Public ["+c+"]";F.call(a,"toString")&&(a.propertyIsEnumerable("toString")||(e[e.length]="Public [toString]"),b["(toString)"]={get:function(){return this.toString.call(this)}});for(c in b)if(F.call(b,c)&&(b[c].get&&(a["get "+c]=b[c].get,e.push("Public [get "+c+"]","Public "+("(toString)"===c?"Default ":"")+"Property Get ["+c+"]","Call VBCVal(me.[get "+
c+"].call(me),["+c+"])","End Property")),b[c].set))a["set "+c]=b[c].set,e.push("Public [set "+c+"]","Public Property Let ["+c+"](v)","Call me.[set "+c+"].call(me,v)","End Property","Public Property Set ["+c+"](v)","Call me.[set "+c+"].call(me,v)","End Property");e.push("End Class","Function "+h+"Factory()","Set "+h+"Factory=New "+h,"End Function");d.execVB(e.join("\n"));e=d[h+"Factory"]();for(c in a)e[c]=a[c];F.call(a,"toString")&&(e.toString=a.toString)}return e}var p=d.document,L=p.documentElement,
s=d.history||{},f=d.location,m=!!s.pushState,$=m&&s.state===V,u=f.href,v=d.JSON||{},D=Object.defineProperty,E=Object.prototype.__defineGetter__,aa=Object.prototype.__defineSetter__,W=s.pushState,X=s.replaceState,I=d.sessionStorage,F=Object.prototype.hasOwnProperty,ca=Object.prototype.toString,M=+((d.eval&&eval("/*@cc_on 1;@*/")&&/msie (\d+)/i.exec(navigator.userAgent)||[])[1]||0),ba=(new Date).getTime(),y=(D||E)&&(!M||8<M)?0:1,i=8>M?p.createElement("iframe"):r,z,G,H,A="",B=(z="addEventListener",d[z])||
(z="attachEvent",A="on",d[z]),da=(G="removeEventListener",d[G])||(G="detachEvent",d[G]),ea=(H="dispatchEvent",d[H])||(H="fireEvent",d[H]),N=[],Y=[],R=0,x={onpopstate:N,popstate:N,onhashchange:Y,hashchange:Y},q=function(){var a,b,d,e={basepath:"/",redirect:0,type:"/"};d=p.getElementsByTagName("SCRIPT");for(a=0;d[a];a++)if(b=/(.*)\/(?:history|spike)(?:\.iegte8)?(?:-\d\.\d(?:\.\d)?\w?)?(?:\.min)?.js\?(.*)$/i.exec(d[a].src)||a===d.length-1&&2===(b=d[a].src.split("?")).length&&(b[2]=b[1])&&b){a=0;for(d=
b[2].split("&");d[a];)b=d[a++].split("="),e[b[0]]="true"==b[1]?w:"false"==b[1]?r:b[1]||"";e.basepath=e.basepath||"/";break}return e}(),k=function(a){var b,d,e,c,o,g,t;return function(l,fa){var ga=RegExp("^"+q.basepath,"i");if(l){if(!m||M)var O=k(),i=O.f,j=O.i,l=/^(?:[\w0-9]+\:)?\/\//.test(l)?0===l.indexOf("/")?j+l:l:j+"//"+O.h+(0===l.indexOf("/")?l:0===l.indexOf("?")?i+l:0===l.indexOf("#")?i+O.g+l:i.replace(/[^\/]+$/g,"")+l)}else if(l=f.href,!m||fa)l=f.protocol+"//"+f.host+q.basepath+(l.replace(/^[^#]*/,
"")||"#").replace(RegExp("^#[/]?(?:"+q.type+")?"),"");if(b!==l){a.href=b=l;g=a.port;o=a.host;t=a.pathname;if("http:"===a.protocol&&80==g||"https:"===a.protocol&&443==g)o=a.hostname,g="";t=0===t.indexOf("/")?t:"/"+t;d=t+a.search+a.hash;c=t.replace(ga,q.type)+a.search;e=c+a.hash}return{a:a.protocol+"//"+o+d,i:a.protocol,h:o,j:a.hostname||f.hostname,k:g||f.port,f:t,g:a.search,b:a.hash,d:d,c:c,e:e}}}(p.createElement("a")),n=!y?s:{back:s.back,forward:s.forward,go:s.go,pushState:j,replaceState:j,emulate:!m,
toString:function(){return"[object History]"}},P={state:{get:function(){return i&&i.storage||Q()[n.location.href]||j}},length:{get:function(){return s.length}},location:{set:function(a){d.location=a},get:function(){return m?f:U}}},U={assign:function(a){f.assign(m||0!==a.indexOf("#")?a:"#"+k().c+a)},reload:f.reload,replace:function(a){f.replace(m||0!==a.indexOf("#")?a:"#"+k().c+a)},toString:function(){return this.href}},ha={href:{set:function(a){f.href=a},get:function(){return k().a}},protocol:{set:function(a){f.protocol=
a},get:function(){return f.protocol}},host:{set:function(a){f.host=a},get:function(){return f.host}},hostname:{set:function(a){f.hostname=a},get:function(){return f.hostname}},port:{set:function(a){f.port=a},get:function(){return f.port}},pathname:{set:function(a){f.pathname=a},get:function(){return k().f}},search:{set:function(a){f.search=a},get:function(){return k().g}},hash:{set:function(a){var a=0===a.indexOf("#")?a:"#"+a,b=k();i?a!=b.b&&(n.pushState(j,j,b.c+a),Z({oldURL:b.a})):f.hash="#"+b.c+
a},get:function(){return k().b}}},K=v.stringify||function(a){function b(e){var c,f,g;c=(typeof e).charCodeAt(2);if(114===c)e=d(e);else if(109===c)e=isFinite(e)?""+e:"null";else if(111===c||108===c)e=""+e;else if(106===c)if(e){f=(c="[object Array]"===ca.apply(e))?"[":"{";if(c)for(g=0;g<e.length;g++)f+=(0==g?"":",")+b(e[g]);else for(g in e)F.call(e,g)&&e[g]!==a&&(f+=(1==f.length?"":",")+d(g)+":"+b(e[g]));e=f+(c?"]":"}")}else e="null";else e=a;return e}function d(a){var b=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
f={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};b.lastIndex=0;return b.test(a)?'"'+a.replace(b,function(a){var b=f[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}return b}(),S=function(){var a=v.parse;return function(b){return b?a?a(b):(new Function("return "+b))():j}}(),Z=function(){function a(a){var b=k();if(R)return i=b.a,R=0;var d=a.oldURL||i,a=i=a.newURL||b.a,b=d.replace(/^.*?(#|$)/,""),e=a.replace(/^.*?(#|$)/,
"");d!=a&&!c&&J();u=c=0;b!=e&&J(2,d,a)}function b(){if(u&&!(u=0)&&g.d!==q.basepath)clearInterval(o),setTimeout(J,10)}var h=d.onpopstate||j,e=d.onhashchange||j,c=0,o=j,g=k(),i=g.a;B(A+"hashchange",a,r);B(A+"popstate",function(){if(u===f.href)return u=0;u=0;J(c=1)},r);n.redirect=function(a,b){q.type=a==j?q.type:a;q.basepath=b=b==j?q.basepath:b;if(d.top==d.self){var c=k(j,w).d,e=f.search,g=f.pathname;m?(c!=b&&RegExp("^"+b+"$","i").test(g)&&(f.href=c),RegExp("^"+b+"$","i").test(g+"/"))?f.href=b:RegExp("^"+
b,"i").test(g)||(f.href=g.replace(/^\//,b)+e):g!=b&&(f.href=b+"#"+g.replace(RegExp("^"+b,"i"),q.type)+e+f.hash)}};n=T(n,y?P:s.state===V?{state:P.state,location:P.location}:{location:P.location});U=T(U,ha);d[z]=function(a,d,c){x[a]?(x[a].push(d),!m&&N===x[a]&&b()):3<arguments.length?B(a,d,c,arguments[3]):B(a,d,c)};d[G]=function(a,b,d){var c=x[a];if(c)for(a=c.length;--a;){if(c[a]===b){c.splice(a,1);break}}else da(a,b,d)};d[H]=function(a,b){var c=x[a],e=c===N?d.onpopstate:d.onhashchange;if(c){b=b||("string"==
typeof a?d.event:a);try{b&&(b.target=d)}catch(f){try{b.srcElement=d}catch(g){}}e&&e.call(d,b);for(var e=0,h=c.length;e<h;e++)c[e].call(d,b);return w}return ea(a,b)};y&&execScript("Public history, onhashchange","VBScript");if((!D&&!E||!T(d,{onhashchange:{get:function(){return e},set:function(a){e=a||j}},onpopstate:{get:function(){return h},set:function(a){(h=a||j)&&!m&&b()}}},1))&&!m)o=setInterval(function(){d.onpopstate&&b()},100);q.redirect&&n.redirect();if(m)B(A+"load",function(){setTimeout(function(){u=
0},0)},r);else p[z](A+"click",function(a){var b=a||d.event,c=b.target||b.srcElement,a="defaultPrevented"in b?b.defaultPrevented:b.returnValue===r;if(c&&"A"===c.nodeName&&!a&&(a=k(c.getAttribute("href",2),w),a.b&&"#"!==a.b&&a.b===a.a.replace(k().a.split("#").shift(),""))){history.location.hash=a.b;a=a.b.replace(/^#/,"");if((c=p.getElementById(a))&&c.id===a&&"A"===c.nodeName)c=c.getBoundingClientRect(),d.scrollTo(L.scrollLeft||0,c.top+(L.scrollTop||0)-(L.clientTop||0));b.preventDefault?b.preventDefault():
b.returnValue=!1}},r);return a}();n.replaceState=function(a,b,d){C(a,b,d,1)};y?(d.history=n,function(a,b){if(i){var h,e=function(){var a=k().a;b!=a&&Z({oldURL:b,newURL:b=a})};h=setInterval(e,100);i.src="javascript:true;";i=L.firstChild.appendChild(i).contentWindow;C=function(a,c,d,l,j){var m=i.document,n=["<script>","lfirst=1;",,"storage="+K(a)+";","<\/script>"];if(d=d&&k(d)){j||clearInterval(h);if(l)i.lfirst?(history.back(),C(a,c,d.a,0,1)):(i.storage=a,f.replace("#"+d.e));else if(d.a!=b||j)i.lfirst||
(i.lfirst=1,C(i.storage,c,b,0,1)),n[2]='parent.location.hash="'+d.e.replace(/"/g,'\\"')+'";',m.open(),m.write(n.join("")),m.close();j||(b=k().a,h=setInterval(e,100))}else i.storage=a};B(A+"unload",function(){if(i.storage){var a={};a[k().a]=i.storage;p.cookie="_historyAPI="+escape(K(a))}clearInterval(h)},r);if(1<a.length){a=unescape(a.pop().split(";").shift());try{i.storage=S(a)[k().a]}catch(c){}}!v.parse&&!v.stringify&&(v.parse=S,v.stringify=K,d.JSON=v)}}(p.cookie.split("_historyAPI="),k().a)):d.history.emulate=
!m;n.pushState=C})(window,!0,!1,null);

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "="; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
  return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
  return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./vendor/couchapp/_attachments/artendb.js":[function(require,module,exports){
window.adb = window.adb || {};

window.adb.erstelleTree = function() {
	'use strict';
	var level,
		gruppe,
		filter,
		id,
		jstree_erstellt = $.Deferred(),
		holeDatenUrlFürTreeOberstesLevel = require('./modules/holeDatenUrlFuerTreeOberstesLevel'),
		holeDatenUrlFürTreeUntereLevel = require('./modules/holeDatenUrlFuerTreeUntereLevel'),
		initiiereSuchfeld = require('./modules/initiiereSuchfeld');

	$("#tree" + window.adb.Gruppe).jstree({
		"json_data": {
			ajax: {
				type: 'GET',
				url: function(node) {
					if (node == -1) {
						return holeDatenUrlFürTreeOberstesLevel();
					} else {
						level = parseInt(node.attr('level'), 10) + 1;
						gruppe = node.attr('gruppe');
						if (node.attr('filter')) {
							filter = node.attr('filter').split(",");
							id = "";
						} else {
							filter = "";
							id = node.attr('id');
						}
						return holeDatenUrlFürTreeUntereLevel(level, filter, gruppe, id);
					}
				},
				success: function(data) {
					//console.log("erstelleTree meldet: ajax success");
					return data;
				},
				error: function(data) {
					//console.log("erstelleTree meldet: ajax failure");
				}
			}
		},
		"ui": {
			"select_limit": 1,	// nur ein Datensatz kann aufs mal gewählt werden
			"selected_parent_open": true,	// wenn Code einen node wählt, werden alle parents geöffnet
			"select_prev_on_delete": true
		},
		"core": {
			"open_parents": true,	// wird ein node programmatisch geöffnet, öffnen sich alle parents
			"strings": {
				"loading": "hole Daten..."
			}
		},
		"sort": function(a, b) {
			return this.get_text(a) > this.get_text(b) ? 1 : -1;
		},
		"themes": {
			"icons": false
		},
		"plugins" : ["ui", "themes", "json_data", "sort"]
	})
	.bind("select_node.jstree", function(e, data) {
        'use strict';
		var node = data.rslt.obj;
		$.jstree._reference(node).open_node(node);
		if (node.attr("id")) {
			// verhindern, dass bereits offene Seiten nochmals geöffnet werden
			if (!$("#art").is(':visible') || localStorage.art_id !== node.attr("id")) {
				localStorage.art_id = node.attr("id");
				// Anzeige im Formular initiieren. ID und Datensammlung übergeben
				window.adb.initiiere_art(node.attr("id"));
			}
		}
	})
	.bind("loaded.jstree", function() {
        'use strict';
		jstree_erstellt.resolve();
		$("#suchen"+window.adb.Gruppe).css("display", "table");
		$("#treeMitteilung").hide();
		$("#tree" + window.adb.Gruppe).show();
		$("#tree" + window.adb.Gruppe + "Beschriftung").show();
		window.adb.setzeTreehöhe();
		initiiereSuchfeld($);
	})
	.bind("after_open.jstree", function() {
		window.adb.setzeTreehöhe();
	})
	.bind("after_close.jstree", function() {
		window.adb.setzeTreehöhe();
	});
	return jstree_erstellt.promise();
};

window.adb.initiiereSuchfeld_2 = function() {
	'use strict';
	var such_objekte;
	if (window.adb.Gruppe && window.adb.Gruppe === "Lebensräume") {
		such_objekte = window.adb.filtere_lr.rows;
	} else if (window.adb.Gruppe) {
		such_objekte = window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()].rows;
	}
	such_objekte = _.map(such_objekte, function(objekt) {
		return objekt.value;
	});

	$('#suchfeld' + window.adb.Gruppe).typeahead({
		name: window.adb.Gruppe,
		valueKey: 'Name',
		local: such_objekte,
		limit: 20
	})
	.on('typeahead:selected', function(e, datum) {
		window.adb.öffneBaumZuId(datum.id);
	});
	$("#suchfeld"+window.adb.Gruppe).focus();
};

// baut die Auswahlliste auf, mit der ein Parent ausgewählt werden soll
// bekommt die id des LR, von dem aus ein neuer LR erstellt werden soll
// In der Auswahlliste sollen nur LR aus derselben Taxonomie gewählt werden können
// plus man soll auch einen neue Taxonomie beginnen können
window.adb.initiiereLrParentAuswahlliste = function(taxonomie_name) {
	'use strict';
	// lr holen
	var $db = $.couch.db("artendb");
	$db.view('artendb/lr?include_docs=true', {
		success: function(lr) {
			var taxonomie_objekte, 
				object,
				neue_taxonomie,
				object_html,
				html = "",
				i;
			// reduzieren auf die LR der Taxonomie
			taxonomie_objekte = _.filter(lr.rows, function(row) {
				return row.doc.Taxonomie.Name === taxonomie_name;
			});
			// einen Array von Objekten schaffen mit id und Name
			taxonomie_objekte = _.map(taxonomie_objekte, function(row) {
				object = {};
				object.id = row.doc._id;
				if (row.doc.Taxonomie.Eigenschaften && row.doc.Taxonomie.Eigenschaften.Einheit) {
					if (row.doc.Taxonomie.Eigenschaften.Label) {
						object.Name = row.doc.Taxonomie.Eigenschaften.Label + ": " + row.doc.Taxonomie.Eigenschaften.Einheit;
					} else {
						object.Name = row.doc.Taxonomie.Eigenschaften.Einheit;
					}
					if (row.doc.Taxonomie.Eigenschaften.Hierarchie && row.doc.Taxonomie.Eigenschaften.Hierarchie.length === 1) {
						// das ist das oberste Objekt, soll auch zuoberst einsortiert werden
						// oft hat es als einziges keinen label und würde daher zuunterst sortiert!
						object.Sortier = "0";
					} else {
						// mittels Array sortieren
						object.Sortier = object.Name;
					}
				}
				return object;
			});
			// jetzt nach Name sortieren
			taxonomie_objekte = _.sortBy(taxonomie_objekte, function(objekt) {
				return objekt.Sortier;
			});
			neue_taxonomie = {};
			neue_taxonomie.id = 0;
			neue_taxonomie.Name = "Neue Taxonomie beginnen";
			// neueTaxonomie als erstes Objekt in den Array einfügen
			taxonomie_objekte.unshift(neue_taxonomie);

			// jetzt die Optionenliste für $("#lr_parent_waehlen_optionen") aufbauen
			for (i=0; i<taxonomie_objekte.length; i++) {
				object_html = '';
				if (i === 1) {
					object_html += '<p>...oder den hierarchisch übergeordneten Lebensraum wählen:</p>';
				}
				object_html += '<div class="radio"><label>';
				object_html += '<input type="radio" name="parent_optionen" id="';
				object_html += taxonomie_objekte[i].id;
				object_html += '" value="';
				object_html += taxonomie_objekte[i].Name;
				object_html += '">';
				object_html += taxonomie_objekte[i].Name;
				object_html += '</label></div>';
				html += object_html;
			}
			$("#lr_parent_waehlen_optionen").html(html);
			// jetzt das modal aufrufen
			// höhe Anpassen funktioniert leider nicht über css mit calc
			$('#lr_parent_waehlen').modal();
			$('#lr_parent_waehlen_optionen').css('max-height', $(window).height()-100);
		}
	});
};

window.adb.öffneBaumZuId = function(id) {
	'use strict';
	// Hierarchie der id holen
	var $db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(objekt) {
            var $filter_klasse = $("[filter='" + objekt.Taxonomie.Eigenschaften.Klasse + "']"),
                $art_anmelden = $("#art_anmelden");
			switch (objekt.Gruppe) {
            case "Fauna":
                // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
                // oberste Ebene aufbauen nicht nötig, die gibt es schon
                $.jstree._reference("#treeFauna").open_node($filter_klasse, function() {
                    $.jstree._reference("#treeFauna").open_node($("[filter='" + objekt.Taxonomie.Eigenschaften.Klasse + "," + objekt.Taxonomie.Eigenschaften.Ordnung + "']"), function() {
                        $.jstree._reference("#treeFauna").open_node($("[filter='" + objekt.Taxonomie.Eigenschaften.Klasse + "," + objekt.Taxonomie.Eigenschaften.Ordnung + ","+objekt.Taxonomie.Eigenschaften.Familie+"']"), function() {
                            $.jstree._reference("#treeFauna").select_node($("#" + objekt._id), function() {}, false);
                        }, true);
                    }, true);
                }, true);
                // Anmeldung verstecken, wenn nicht Lebensräume
                $art_anmelden.hide();
                break;
            case "Flora":
                // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
                // oberste Ebene aufbauen nicht nötig, die gibt es schon
                $.jstree._reference("#treeFlora").open_node($("[filter='" + objekt.Taxonomie.Eigenschaften.Familie + "']"), function() {
                    $.jstree._reference("#treeFlora").open_node($("[filter='" + objekt.Taxonomie.Eigenschaften.Familie + "," + objekt.Taxonomie.Eigenschaften.Gattung + "']"), function() {
                        $.jstree._reference("#treeFlora").select_node($("#" + objekt._id), function() {}, false);
                    }, true);
                }, true);
                // Anmeldung verstecken, wenn nicht Lebensräume
                $art_anmelden.hide();
                break;
            case "Moose":
                // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
                // oberste Ebene aufbauen nicht nötig, die gibt es schon
                $.jstree._reference("#treeMoose").open_node($filter_klasse, function() {
                    $.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Eigenschaften.Klasse+","+objekt.Taxonomie.Eigenschaften.Familie+"']"), function() {
                        $.jstree._reference("#treeMoose").open_node($("[filter='"+objekt.Taxonomie.Eigenschaften.Klasse+","+objekt.Taxonomie.Eigenschaften.Familie+","+objekt.Taxonomie.Eigenschaften.Gattung+"']"), function() {
                            $.jstree._reference("#treeMoose").select_node($("#"+objekt._id), function() {}, false);
                        }, true);
                    }, true);
                }, true);
                // Anmeldung verstecken, wenn nicht Lebensräume
                $art_anmelden.hide();
                break;
            case "Macromycetes":
                // von oben nach unten die jeweils richtigen nodes öffnen, zuletzt selektieren
                // oberste Ebene aufbauen nicht nötig, die gibt es schon
                $.jstree._reference("#treeMacromycetes").open_node($("[filter='"+objekt.Taxonomie.Eigenschaften.Gattung+"']"), function() {
                    $.jstree._reference("#treeMacromycetes").select_node($("#"+objekt._id), function() {}, false);
                }, true);
                // Anmeldung verstecken, wenn nicht Lebensräume
                $art_anmelden.hide();
                break;
            case "Lebensräume":
                var id_array = [];
                for (var i=0; i<objekt.Taxonomie.Eigenschaften.Hierarchie.length; i++) {
                    id_array.push(objekt.Taxonomie.Eigenschaften.Hierarchie[i].GUID);
                }
                window.adb.oeffneNodeNachIdArray(id_array);
                break;
			}
		}
	});
};

// läuft von oben nach unten durch die Hierarchie der Lebensräume
// ruft sich selber wieder auf, wenn ein tieferer level existiert
// erwartet idArray: einen Array der GUID's aus der Hierarchie des Objekts
window.adb.oeffneNodeNachIdArray = function(idArray) {
	'use strict';
	if (idArray.length > 1) {
		$.jstree._reference("#tree" + window.adb.Gruppe).open_node($("#"+idArray[0]), function() {
			idArray.splice(0,1);
			window.adb.oeffneNodeNachIdArray(idArray);
		}, false);
	} else if (idArray.length === 1) {
		$.jstree._reference("#tree" + window.adb.Gruppe).select_node($("#"+idArray[0]),function() {}, true);
	}
};

window.adb.initiiere_art = function(id) {
	'use strict';
	var $db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(art) {
			var html_art,
				art_eigenschaftensammlungen = art.Eigenschaftensammlungen,
				art_beziehungssammlungen = [],
				taxonomische_beziehungssammlungen = [],
				len,
				guids_von_synonymen = [],
				eigenschaftensammlungen_von_synonymen = [],
				beziehungssammlungen_von_synonymen = [],
				a, f, h, i, k, x,
				ds_namen = [],
				bez_namen = [];
			// panel beginnen
			html_art = '<h4>Taxonomie:</h4>';
			// zuerst alle Datensammlungen auflisten, damit danach sortiert werden kann
			// gleichzeitig die Taxonomie suchen und gleich erstellen lassen
			html_art += window.adb.erstelleHtmlFürDatensammlung("Taxonomie", art, art.Taxonomie);
			// Datensammlungen muss nicht gepusht werden
			// aber Beziehungssammlungen aufteilen
			if (art.Beziehungssammlungen.length > 0) {
                _.each(art.Beziehungssammlungen, function(beziehungssammlung) {
                    if (typeof beziehungssammlung.Typ === "undefined") {
                        art_beziehungssammlungen.push(beziehungssammlung);
                        // bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
                        bez_namen.push(beziehungssammlung.Name);
                    } else if (beziehungssammlung.Typ === "taxonomisch") {
                        taxonomische_beziehungssammlungen.push(beziehungssammlung);
                        // bezNamen auflisten, um später zu vergleichen, ob diese DS schon dargestellt wird
                        bez_namen.push(beziehungssammlung.Name);
                    }
                });
			}
			// taxonomische Beziehungen in gewollter Reihenfolge hinzufügen
			if (taxonomische_beziehungssammlungen.length > 0) {
				// Titel hinzufügen, falls Datensammlungen existieren
				html_art += "<h4>Taxonomische Beziehungen:</h4>";
                _.each(taxonomische_beziehungssammlungen, function(beziehungssammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    html_art += window.adb.erstelleHtmlFürBeziehungssammlung(art, beziehungssammlung, "");
                    if (beziehungssammlung["Art der Beziehungen"] && beziehungssammlung["Art der Beziehungen"] === "synonym" && beziehungssammlung.Beziehungen) {
                        _.each(beziehungssammlung.Beziehungen, function(beziehung) {
                            if (beziehung.Beziehungspartner) {
                                _.each(beziehung.Beziehungspartner, function(beziehungspartner) {
                                    if (beziehungspartner.GUID) {
                                        guids_von_synonymen.push(beziehungspartner.GUID);
                                    }
                                });
                            }
                        });
                    }
                });
			}
			// Datensammlungen in gewollter Reihenfolge hinzufügen
			if (art_eigenschaftensammlungen.length > 0) {
				// Datensammlungen nach Name sortieren
				/*ausgeschaltet, um Tempo zu gewinnen, Daten sind eh sortiert
				Datensammlungen = window.adb.sortiereObjektarrayNachName(Datensammlungen);*/
				// Titel hinzufügen
				html_art += "<h4>Eigenschaften:</h4>";
                _.each(art_eigenschaftensammlungen, function(datensammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    html_art += window.adb.erstelleHtmlFürDatensammlung("Datensammlung", art, datensammlung);
                    // dsNamen auflisten, um später zu vergleichen, ob sie schon dargestellt wird
                    ds_namen.push(datensammlung.Name);
                });
			}
			// Beziehungen hinzufügen
			if (art_beziehungssammlungen.length > 0) {
				// Titel hinzufügen
				html_art += "<h4>Beziehungen:</h4>";
                _.each(art_beziehungssammlungen, function(beziehungssammlung) {
                    // HTML für Datensammlung erstellen lassen und hinzufügen
                    html_art += window.adb.erstelleHtmlFürBeziehungssammlung(art, beziehungssammlung, "");
                });
			}
			// Beziehungssammlungen von synonymen Arten
			if (guids_von_synonymen.length > 0) {
				$db = $.couch.db("artendb");
				$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guids_von_synonymen)) + '&include_docs=true', {
					success: function(data) {
						var synonyme_art;
                        _.each(data.rows, function(data_row) {
                            synonyme_art = data_row.doc;
                            if (synonyme_art.Eigenschaftensammlungen && synonyme_art.Eigenschaftensammlungen.length > 0) {
                                _.each(synonyme_art.Eigenschaftensammlungen, function(eigenschaftensammlungen) {
                                    if (ds_namen.indexOf(eigenschaftensammlungen.Name) === -1) {
                                        // diese Datensammlung wird noch nicht dargestellt
                                        eigenschaftensammlungen_von_synonymen.push(eigenschaftensammlungen);
                                        // auch in dsNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
                                        ds_namen.push(eigenschaftensammlungen.Name);
                                        // auch in Datensammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
                                        art_eigenschaftensammlungen.push(eigenschaftensammlungen);
                                    }
                                });
                            }
                            if (synonyme_art.Beziehungssammlungen && synonyme_art.Beziehungssammlungen.length > 0) {
                                _.each(synonyme_art.Beziehungssammlungen, function(beziehungssammlung) {
                                    if (bez_namen.indexOf(beziehungssammlung.Name) === -1 && beziehungssammlung["Art der Beziehungen"] !== "synonym" && beziehungssammlung.Typ !== "taxonomisch") {
                                        // diese Beziehungssammlung wird noch nicht dargestellt
                                        // und sie ist nicht taxonomisch
                                        beziehungssammlungen_von_synonymen.push(beziehungssammlung);
                                        // auch in bezNamen pushen, damit beim nächsten Vergleich mit berücksichtigt
                                        bez_namen.push(beziehungssammlung.Name);
                                        // auch in Beziehungssammlungen ergänzen, weil die Darstellung davon abhängt, ob eine DS existiert
                                        art_beziehungssammlungen.push(beziehungssammlung);
                                    } else if (beziehungssammlung["Art der Beziehungen"] !== "synonym" && beziehungssammlung.Typ !== "taxonomisch") {
                                        // diese Beziehungssammlung wird schon dargestellt
                                        // kann aber sein, dass beim Synonym Beziehungen existieren, welche noch nicht dargestellt werden
                                        var bs_der_synonymen_art = beziehungssammlung,
                                            bs_der_originalart = _.find(art.Beziehungssammlungen, function(beziehungssammlung) {
                                                return beziehungssammlung.Name === bs_der_synonymen_art.Name;
                                            });

                                        if (bs_der_synonymen_art.Beziehungen && bs_der_synonymen_art.Beziehungen.length > 0 && bs_der_originalart && bs_der_originalart.Beziehungen && bs_der_originalart.Beziehungen.length > 0) {
                                            // Beide Arten haben in derselben Beziehungssammlung Beziehungen
                                            // in der Originalart vorhandene Beziehungen aus dem Synonym entfernen
                                            bs_der_synonymen_art.Beziehungen = _.reject(bs_der_synonymen_art.Beziehungen, function(beziehung_des_synonyms) {
                                                // suche in Beziehungen der Originalart eine mit denselben Beziehungspartnern
                                                var beziehung_der_originalart = _.find(bs_der_originalart.Beziehungen, function(beziehung_origart) {
                                                    //return _.isEqual(beziehung_des_synonyms, beziehung_origart);  Wieso funktioniert das nicht?
                                                    if (beziehung_des_synonyms.Beziehungspartner.length > 0 && beziehung_origart.Beziehungspartner.length > 0) {
                                                        return beziehung_des_synonyms.Beziehungspartner[0].GUID === beziehung_origart.Beziehungspartner[0].GUID;
                                                    } else {
                                                        return false;
                                                    }
                                                });
                                                return !!beziehung_der_originalart;
                                            });
                                        }
                                        if (bs_der_synonymen_art.Beziehungen.length > 0) {
                                            // falls noch darzustellende Beziehungen verbleiben, die DS pushen
                                            beziehungssammlungen_von_synonymen.push(bs_der_synonymen_art);
                                        }
                                    }
                                });
                            }
                        });
						// BS von Synonymen darstellen
						if (eigenschaftensammlungen_von_synonymen.length > 0) {
							// DatensammlungenVonSynonymen nach Name sortieren
							eigenschaftensammlungen_von_synonymen = window.adb.sortiereObjektarrayNachName(eigenschaftensammlungen_von_synonymen);
							// Titel hinzufügen
							html_art += "<h4>Eigenschaften von Synonymen:</h4>";
                            _.each(eigenschaftensammlungen_von_synonymen, function(datesammlung) {
                                // HTML für Datensammlung erstellen lassen und hinzufügen
                                html_art += window.adb.erstelleHtmlFürDatensammlung("Datensammlung", art, datesammlung);
                            });
						}
						// bez von Synonymen darstellen
						if (beziehungssammlungen_von_synonymen.length > 0) {
							// BeziehungssammlungenVonSynonymen sortieren
							beziehungssammlungen_von_synonymen = window.adb.sortiereObjektarrayNachName(beziehungssammlungen_von_synonymen);
							// Titel hinzufügen
							html_art += "<h4>Beziehungen von Synonymen:</h4>";
                            _.each(beziehungssammlungen_von_synonymen, function(beziehungssammlung) {
                                // HTML für Beziehung erstellen lassen und hinzufügen. Dritten Parameter mitgeben, damit die DS in der UI nicht gleich heisst
                                html_art += window.adb.erstelleHtmlFürBeziehungssammlung(art, beziehungssammlung, "2");
                            });
						}
						window.adb.initiiere_art_2(html_art, art);
					}
				});
			} else {
				window.adb.initiiere_art_2(html_art, art);
			}
		},
		error: function() {
			//melde("Fehler: Art konnte nicht geöffnet werden");
		}
	});
};

window.adb.initiiere_art_2 = function(html_art, art) {
	'use strict';
	// panel beenden
	$("#art_inhalt").html(html_art);
	// richtiges Formular anzeigen
	window.adb.zeigeFormular("art");
	// Anmeldung soll nur kurzfristig sichtbar sein, wenn eine Anmeldung erfolgen soll
	$("#art_anmelden").hide();
	// Wenn nur eine Datensammlung (die Taxonomie) existiert, diese öffnen
	if (art.Eigenschaftensammlungen.length === 0 && art.Beziehungssammlungen.length === 0) {
		$('.panel-collapse.Taxonomie').each(function() {
			$(this).collapse('show');
		});
	}
	// jetzt die Links im Menu setzen
	// wird zwar in zeigeFormular schon gemacht
    // trotzdem nötig, weil dort erst mal leere links gesetzt werden
    // hier wird die url angefügt
	window.adb.setzteLinksZuBilderUndWikipedia(art);
	// und die URL anpassen
	history.pushState(null, null, "index.html?id=" + art._id);
};

// erstellt die HTML für eine Beziehung
// benötigt von der art bzw. den lr die entsprechende Beziehungssammlung
// altName ist für Beziehungssammlungen von Synonymen: Hier kann dieselbe DS zwei mal vorkommen und sollte nicht gleich heissen, sonst geht nur die erste auf
window.adb.erstelleHtmlFürBeziehungssammlung = function(art, beziehungssammlung, alt_name) {
	'use strict';
	var html,
		name,
		bs_name = window.adb.ersetzeUngültigeZeichenInIdNamen(beziehungssammlung.Name) + alt_name;

	// Accordion-Gruppe und -heading anfügen
	html = '<div class="panel panel-default"><div class="panel-heading panel-heading-gradient"><h4 class="panel-title">';
	// die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
	html += '<a class="Datensammlung accordion-toggle" data-toggle="collapse" data-parent="#panel_art" href="#collapse' + bs_name + '">';
	// Titel für die Datensammlung einfügen
	html += beziehungssammlung.Name + " (" + beziehungssammlung.Beziehungen.length + ")";
	// header abschliessen
	html += '</a></h4></div>';
	// body beginnen
	html += '<div id="collapse' + bs_name + '" class="panel-collapse collapse"><div class="panel-body">';

	// Datensammlung beschreiben
    html += window.adb.erstelleHtmlFürDatensammlungBeschreibung(beziehungssammlung);

	// die Beziehungen sortieren
	beziehungssammlung.Beziehungen = window.adb.sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);

	// jetzt für alle Beziehungen die Felder hinzufügen
    _.each(beziehungssammlung.Beziehungen, function(beziehung, index) {
        if (beziehung.Beziehungspartner && beziehung.Beziehungspartner.length > 0) {
            _.each(beziehung.Beziehungspartner, function(beziehungspartner) {
                if (beziehungspartner.Taxonomie) {
                    name = beziehungspartner.Gruppe + ": " + beziehungspartner.Taxonomie + " > " + beziehungspartner.Name;
                } else {
                    name = beziehungspartner.Gruppe + ": " + beziehungspartner.Name;
                }
                // Partner darstellen
                if (beziehungspartner.Rolle) {
                    // Feld soll mit der Rolle beschriftet werden
                    html += window.adb.generiereHtmlFürObjektlink(beziehungspartner.Rolle, name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + beziehungspartner.GUID);
                } else {
                    html += window.adb.generiereHtmlFürObjektlink("Beziehungspartner", name, $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + beziehungspartner.GUID);
                }
            });
        }
        // Die Felder anzeigen
        _.each(beziehung, function(feldwert, feldname) {
            if (feldname !== "Beziehungspartner") {
                html += window.adb.erstelleHtmlFürFeld(feldname, feldwert, "Beziehungssammlung", beziehungssammlung.Name.replace(/"/g, "'"));
            }
        });
        // Am Schluss eine Linie, nicht aber bei der letzten Beziehung
        if (index < (beziehungssammlung.Beziehungen.length-1)) {
            html += "<hr>";
        }
    });
	// body und Accordion-Gruppe abschliessen
	html += '</div></div></div>';
	return html;
};

// erstellt die HTML für eine Datensammlung
// benötigt von der art bzw. den lr die entsprechende Datensammlung
window.adb.erstelleHtmlFürDatensammlung = function(ds_typ, art, datensammlung) {
	'use strict';
	var html_datensammlung,
		hierarchie_string,
		array_string,
		ds_name;
	ds_name = window.adb.ersetzeUngültigeZeichenInIdNamen(datensammlung.Name);
	// Accordion-Gruppe und -heading anfügen
	html_datensammlung = '<div class="panel panel-default"><div class="panel-heading panel-heading-gradient">';
	// bei LR: Symbolleiste einfügen
	if (art.Gruppe === "Lebensräume" && ds_typ === "Taxonomie") {
		html_datensammlung += '<div class="btn-toolbar bearb_toolbar"><div class="btn-group btn-group-sm"><button type="button" class="btn btn-default lr_bearb lr_bearb_bearb" data-toggle="tooltip" title="bearbeiten"><i class="glyphicon glyphicon-pencil"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_schuetzen disabled" title="schützen"><i class="glyphicon glyphicon-ban-circle"></i></button><button type="button" class="btn btn-default lr_bearb lr_bearb_neu disabled" title="neuer Lebensraum"><i class="glyphicon glyphicon-plus"></i></button><button type="button" data-toggle="modal" data-target="#rueckfrage_lr_loeschen" class="btn btn-default lr_bearb lr_bearb_loeschen disabled" title="Lebensraum löschen"><i class="glyphicon glyphicon-trash"></i></button></div></div>';
	}
	// die id der Gruppe wird mit dem Namen der Datensammlung gebildet. Hier müssen aber leerzeichen entfernt werden
	html_datensammlung += '<h4 class="panel-title"><a class="Datensammlung accordion-toggle" data-toggle="collapse" data-parent="#panel_art" href="#collapse' + ds_name + '">';
	// Titel für die Datensammlung einfügen
	html_datensammlung += datensammlung.Name;
	// header abschliessen
	html_datensammlung += '</a></h4></div>';
	// body beginnen
	html_datensammlung += '<div id="collapse' + ds_name + '" class="panel-collapse collapse ' + art.Gruppe + ' ' + ds_typ + '"><div class="panel-body">';
	// Datensammlung beschreiben
    html_datensammlung += window.adb.erstelleHtmlFürDatensammlungBeschreibung(datensammlung);
	// Felder anzeigen
	// zuerst die GUID, aber nur bei der Taxonomie
	if (ds_typ === "Taxonomie") {
		html_datensammlung += window.adb.erstelleHtmlFürFeld("GUID", art._id, ds_typ, "Taxonomie");
	}
    _.each(datensammlung.Eigenschaften, function(feldwert, feldname) {
        if (feldname === "GUID") {
            // dieses Feld nicht anzeigen. Es wird _id verwendet
            // dieses Feld wird künftig nicht mehr importiert
        } else if (((feldname === "Offizielle Art" || feldname === "Eingeschlossen in" || feldname === "Synonym von") && art.Gruppe === "Flora") || (feldname === "Akzeptierte Referenz" && art.Gruppe === "Moose")) {
            // dann den Link aufbauen lassen
            html_datensammlung += window.adb.generiereHtmlFürLinkZuGleicherGruppe(feldname, art._id, feldwert.Name);
        } else if ((feldname === "Gültige Namen" || feldname === "Eingeschlossene Arten" || feldname === "Synonyme") && art.Gruppe === "Flora") {
            // das ist ein Array von Objekten
            html_datensammlung += window.adb.generiereHtmlFürLinksZuGleicherGruppe(feldname, feldwert);
        } else if ((feldname === "Artname" && art.Gruppe === "Flora") || (feldname === "Parent" && art.Gruppe === "Lebensräume")) {
            // dieses Feld nicht anzeigen
        } else if (feldname === "Hierarchie" && art.Gruppe === "Lebensräume" && _.isArray(feldwert)) {
            // Namen kommagetrennt anzeigen
            hierarchie_string = window.adb.erstelleHierarchieFürFeldAusHierarchieobjekteArray(feldwert);
            html_datensammlung += window.adb.generiereHtmlFürTextarea(feldname, hierarchie_string, ds_typ, datensammlung.Name.replace(/"/g, "'"));
        } else if (_.isArray(feldwert)) {
            // dieses Feld enthält einen Array von Werten
            array_string = feldwert.toString();
            html_datensammlung += window.adb.generiereHtmlFürTextarea(feldname, array_string, ds_typ, datensammlung.Name.replace(/"/g, "'"));
        } else {
            html_datensammlung += window.adb.erstelleHtmlFürFeld(feldname, feldwert, ds_typ, datensammlung.Name.replace(/"/g, "'"));
        }
    });
	// body und Accordion-Gruppe abschliessen
	html_datensammlung += '</div></div></div>';
	return html_datensammlung;
};

window.adb.erstelleHtmlFürDatensammlungBeschreibung = function(es_oder_bs) {
	'use strict';
    var html = '<div class="Datensammlung BeschreibungDatensammlung">',
    	Autolinker = require('autolinker');
    if (es_oder_bs.Beschreibung) {
        html += es_oder_bs.Beschreibung;
    }
    // wenn weitere Infos kommen: diese können wahlweise eingeblendet werden
    if (es_oder_bs.Datenstand || es_oder_bs.Link || (es_oder_bs.zusammenfassend && es_oder_bs.Ursprungsdatensammlung)) {
        // wenn keine Beschreibung existiert, andere Option einblenden
        if (es_oder_bs.Beschreibung) {
            html += ' <a href="#" class="show_next_hidden">...mehr</a>';
        } else {
            // wenn keine Beschreibung existiert, andere Option einblenden
            html += '<a href="#" class="show_next_hidden">Beschreibung der Datensammlung anzeigen</a>';
        }
        html += '<div class="adb-hidden">';
        if (es_oder_bs.Datenstand) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Stand: </div>';
            html += '<div>' + es_oder_bs.Datenstand + '</div>';
            html += '</div>';
        }
        if (es_oder_bs.Link) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Link: </div>';
            html += '<div>' + Autolinker.link(es_oder_bs.Link) + '</div>';
            html += '</div>';
        }
        if (es_oder_bs["importiert von"]) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Importiert von: </div>';
            html += '<div>' + Autolinker.link(es_oder_bs["importiert von"]) + '</div>';
            html += '</div>';
        }
        if (es_oder_bs.zusammenfassend && es_oder_bs.Ursprungsdatensammlung) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Zus.-fassend:</div>';
            html += '<div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen.<br>Die angezeigten Informationen stammen aus der Eigenschaftensammlung "' + es_oder_bs.Ursprungsdatensammlung + '"</div>';
            html += '</div>';
        } else if (es_oder_bs.zusammenfassend && !es_oder_bs.Ursprungsdatensammlung) {
            html += '<div class="ds_beschreibung_zeile">';
            html += '<div>Zus.-fassend:</div>';
            html += '<div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen.<br>Bei den angezeigten Informationen ist die Ursprungs-Eigenschaftensammlung leider nicht beschrieben</div>';
            html += '</div>';
        }
        // zusätzliche Infos abschliessen
        html += '</div>';
    }
    // Beschreibung der Datensammlung abschliessen
    html += '</div>';
    return html;
};

window.adb.erstelleHierarchieFürFeldAusHierarchieobjekteArray = function(hierarchie_array) {
	'use strict';
	if (!_.isArray(hierarchie_array)) {
		return "";
	}
	// Namen kommagetrennt anzeigen
	var hierarchie_string = "";
    _.each(hierarchie_array, function(hierarchie_objekt, index) {
        if (index > 0) {
            hierarchie_string += "\n";
        }
        hierarchie_string += hierarchie_objekt.Name;
    });
	return hierarchie_string;
};

// übernimmt Feldname und Feldwert
// generiert daraus und retourniert html für die Darstellung im passenden Feld
window.adb.erstelleHtmlFürFeld = function(feldname, feldwert, ds_typ, ds_name) {
	'use strict';
	var html_datensammlung = "";
	if ((typeof feldwert === "string" && feldwert.slice(0, 7) === "http://") || (typeof feldwert === "string" && feldwert.slice(0, 8) === "https://") || (typeof feldwert === "string" && feldwert.slice(0, 2) === "//")) {
		// www-Links als Link darstellen
		html_datensammlung += window.adb.generiereHtmlFürWwwLink(feldname, feldwert, ds_typ, ds_name);
	} else if (typeof feldwert === "string" && feldwert.length < 45) {
		html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "text", ds_typ, ds_name);
	} else if (typeof feldwert === "string" && feldwert.length >= 45) {
		html_datensammlung += window.adb.generiereHtmlFürTextarea(feldname, feldwert, ds_typ);
	} else if (typeof feldwert === "number") {
		html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "number", ds_typ, ds_name);
	} else if (typeof feldwert === "boolean") {
		html_datensammlung += window.adb.generiereHtmlFürBoolean(feldname, feldwert, ds_typ, ds_name);
	} else {
		html_datensammlung += window.adb.generiereHtmlFürTextinput(feldname, feldwert, "text", ds_typ, ds_name);
	}
	return html_datensammlung;
};

// managt die Links zu Google Bilder und Wikipedia
// erwartet das Objekt mit der Art
window.adb.setzteLinksZuBilderUndWikipedia = function(art) {
	'use strict';
	// jetzt die Links im Menu setzen
	if (art) {
		var google_bilder_link = "",
            wikipedia_link = "";
		switch (art.Gruppe) {
		case "Flora":
			google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Artname + '"';
			if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
				google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
			}
			if (art.Taxonomie.Eigenschaften['Name Französisch']) {
				google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Französisch'] + '"';
			}
			if (art.Taxonomie.Eigenschaften['Name Italienisch']) {
				google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Italienisch'] + '"';
			}
			if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
				wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften['Name Deutsch'];
			} else {
				wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Artname;
			}
			break;
		case "Fauna":
			google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Artname + '"';
			if (art.Taxonomie.Eigenschaften["Name Deutsch"]) {
				google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
			}
			if (art.Taxonomie.Eigenschaften['Name Französisch']) {
				google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Französisch'] + '"';
			}
			if (art.Taxonomie.Eigenschaften['Name Italienisch']) {
				google_bilder_link += '+OR"' + art.Taxonomie.Eigenschaften['Name Italienisch'] + '"';
			}
			wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Gattung + '_' + art.Taxonomie.Eigenschaften.Art;
			break;
		case 'Moose':
			google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Gattung + ' ' + art.Taxonomie.Eigenschaften.Art + '"';
			wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Gattung + '_' + art.Taxonomie.Eigenschaften.Art;
			break;
		case 'Macromycetes':
			google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Name + '"';
			if (art.Taxonomie.Eigenschaften['Name Deutsch']) {
				google_bilder_link += '+OR+"' + art.Taxonomie.Eigenschaften['Name Deutsch'] + '"';
			}
			wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Name;
			break;
		case 'Lebensräume':
			google_bilder_link = 'https://www.google.ch/search?num=10&hl=de&site=imghp&tbm=isch&source=hp&bih=824&q="' + art.Taxonomie.Eigenschaften.Einheit;
			wikipedia_link = '//de.wikipedia.org/wiki/' + art.Taxonomie.Eigenschaften.Einheit;
			break;
		}
		// mit replace Hochkommata ' ersetzen, sonst klappt url nicht
		$("#GoogleBilderLink").attr("href", encodeURI(google_bilder_link).replace("&#39;", "%20"));
		$("#GoogleBilderLink_li").removeClass("disabled");
		$("#WikipediaLink").attr("href", wikipedia_link);
		$("#WikipediaLink_li").removeClass("disabled");
	} else {
		$("#WikipediaLink").attr("href", "#");
		$("#WikipediaLink_li").addClass("disabled");
		$("#GoogleBilderLink").attr("href", "#");
		$("#GoogleBilderLink_li").addClass("disabled");
	}
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFürLinkZuGleicherGruppe = function(feld_name, id, artname) {
	'use strict';
	var html_container;
	html_container = '<div class="form-group"><label class="control-label">';
	html_container += feld_name;
	html_container += ':</label><p class="form-control-static controls feldtext"><a href="#" class="LinkZuArtGleicherGruppe" ArtId="';
	html_container += id;
	html_container += '">';
	html_container += artname;
	html_container += '</a></p></div>';
	return html_container;
};

// generiert den html-Inhalt für Serien von Links in Flora
window.adb.generiereHtmlFürLinksZuGleicherGruppe = function(feldname, objekt_liste) {
	'use strict';
	var html_container;
	html_container = '<div class="form-group"><label class="control-label">';
	html_container += feldname;
	html_container += ':</label><span class="feldtext controls">';
    _.each(objekt_liste, function(objekt, index) {
        if (index > 0) {
            html_container += ', ';
        }
        html_container += '<p class="form-control-static controls"><a href="#" class="LinkZuArtGleicherGruppe" ArtId="';
        html_container += objekt.GUID;
        html_container += '">';
        html_container += objekt.Name;
        html_container += '</a></p>';
    });
	html_container += '</span></div>';
	return html_container;
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFürWwwLink = function(feldname, feldwert, ds_typ, ds_name) {
	'use strict';
	var html_container;
	html_container = '<div class="form-group">\n\t<label class="control-label" for="';
	html_container += feldname;
	html_container += '">';
	html_container += feldname;
	html_container += ':</label>\n\t';
	// jetzt Link beginnen, damit das Feld klickbar wird
	html_container += '<p><a href="';
	html_container += feldwert;
	html_container += '"><input class="controls form-control input-sm" dsTyp="'+ds_typ+'" dsName="'+ds_name+'" id="';
	html_container += feldname;
	html_container += '" name="';
	html_container += feldname;
	html_container += '" type="text" value="';
	html_container += feldwert;
	html_container += '" readonly="readonly" style="cursor:pointer;">';
	// Link abschliessen
	html_container += '</a></p>';
	html_container += '\n</div>';
	return html_container;
};

// generiert den html-Inhalt für einzelne Links in Flora
window.adb.generiereHtmlFürObjektlink = function(feldname, feldwert, url) {
	'use strict';
	var html_container;
	html_container = '<div class="form-group"><label class="control-label">';
	html_container += feldname;
	html_container += ':';
	html_container += '</label>';
	html_container += '<p class="form-control-static feldtext controls"><a href="';
	html_container += url;
	html_container += '" target="_blank">';
	html_container += feldwert;
	html_container += '</a></p></div>';
	return html_container;
};

// generiert den html-Inhalt für Textinputs
window.adb.generiereHtmlFürTextinput = function(feldname, feldwert, input_typ, ds_typ, ds_name) {
	'use strict';
	var html_container;
	html_container = '<div class="form-group">\n\t<label class="control-label" for="';
	html_container += feldname;
	html_container += '">';
	html_container += feldname;
	html_container += ':</label>\n\t<input class="controls form-control input-sm" id="';
	html_container += feldname;
	html_container += '" name="';
	html_container += feldname;
	html_container += '" type="';
	html_container += input_typ;
	html_container += '" value="';
	html_container += feldwert;
	html_container += '" readonly="readonly" dsTyp="'+ds_typ+'" dsName="'+ds_name+'">\n</div>';
	return html_container;
};

// generiert den html-Inhalt für Textarea
window.adb.generiereHtmlFürTextarea = function(feldname, feldwert, ds_typ, ds_name) {
	'use strict';
	var html_container;
	html_container = '<div class="form-group"><label class="control-label" for="';
	html_container += feldname;
	html_container += '">';
	html_container += feldname;
	html_container += ':</label><textarea class="controls form-control" id="';
	html_container += feldname;
	html_container += '" name="';
	html_container += feldname;
	html_container += '" readonly="readonly" dsTyp="'+ds_typ+'" dsName="'+ds_name+'">';
	html_container += feldwert;
	html_container += '</textarea></div>';
	return html_container;
};

// generiert den html-Inhalt für ja/nein-Felder
window.adb.generiereHtmlFürBoolean = function(feldname, feldwert, ds_typ, ds_name) {
	'use strict';
	var html_container;
	html_container = '<div class="form-group"><label class="control-label" for="';
	html_container += feldname;
	html_container += '">';
	html_container += feldname;
	html_container += ':</label><input type="checkbox" id="';
	html_container += feldname;
	html_container += '" name="';
	html_container += feldname;
	html_container += '"';
	if (feldwert === true) {
		html_container += ' checked="true"';
	}
	html_container += '" readonly="readonly" disabled="disabled" dsTyp="'+ds_typ+'" dsName="'+ds_name+'"></div>';
	return html_container;
};

// begrenzt die maximale Höhe des Baums auf die Seitenhöhe, wenn nötig
window.adb.setzeTreehöhe = function() {
	'use strict';
	var window_height = $(window).height();
	if ($(window).width() > 1000 && !$("body").hasClass("force-mobile")) {
		$(".baum").css("max-height", window_height - 161);
	} else {
		// Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
		$(".baum").css("max-height", window_height - 252);
	}
};

// setzt die Höhe von textareas so, dass der Text genau rein passt
window.adb.fitTextareaToContent = function(id, max_height) {
	'use strict';
	var text = id && id.style ? id : document.getElementById(id);
	max_height = max_height || document.documentElement.clientHeight;
	if (!text) {
		return;
	}

	/* Accounts for rows being deleted, pixel value may need adjusting */
	if (text.clientHeight == text.scrollHeight) {
		text.style.height = "30px";
	}

	var adjustedHeight = text.clientHeight;
	if (!max_height || max_height > adjustedHeight) {
		adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
	}
	if (max_height) {
		adjustedHeight = Math.min(max_height, adjustedHeight);
	}
	if (adjustedHeight > text.clientHeight) {
		text.style.height = adjustedHeight + "px";
	}
};

// managed die Sichtbarkeit von Formularen
// wird von allen initiiere_-Funktionen verwendet
// wird ein Formularname übergeben, wird dieses Formular gezeigt
// und alle anderen ausgeblendet
// zusätzlich wird die Höhe von textinput-Feldern an den Textinhalt angepasst
window.adb.zeigeFormular = function(formularname) {
	'use strict';
	var formular_angezeigt = $.Deferred(),
        $form = $('form');
	// zuerst alle Formulare ausblenden
	$("#forms").hide();
    $form.each(function() {
		$(this).hide();
	});

	if (formularname) {
		if (formularname !== "art") {
			// Spuren des letzten Objekts entfernen
			// IE8 kann nicht deleten
			try {
				delete localStorage.art_id;
			}
			catch (e) {
				localStorage.art_id = undefined;
			}
			// URL anpassen, damit kein Objekt angezeigt wird
			// TODO: DIESER BEFEHL LÖST IN IE11 EINFÜGEN VON :/// AUS!!!!
			history.pushState(null, null, "index.html");
			// alle Bäume ausblenden, suchfeld, Baumtitel
			$(".suchen").hide();
			$(".baum").hide();
			$(".treeBeschriftung").hide();
			// Gruppe Schaltfläche deaktivieren
			$('#Gruppe').find('.active').removeClass('active');
		}
		$form.each(function() {
			var that = $(this);
			if (that.attr("id") === formularname) {
				$("#forms").show();
				that.show();
			}
		});
		$(window).scrollTop(0);
		// jetzt die Links im Menu (de)aktivieren
		window.adb.setzteLinksZuBilderUndWikipedia();
		formular_angezeigt.resolve();
	}
	return formular_angezeigt.promise();
};

// kontrollieren, ob die erforderlichen Felder etwas enthalten
// wenn ja wird true retourniert, sonst false
window.adb.validiereSignup = function(woher) {
	'use strict';
	var email,
        passwort,
        passwort2;
	// zunächst alle Hinweise ausblenden (falls einer von einer früheren Prüfung her noch eingeblendet wäre)
	$(".hinweis").hide();
	// erfasste Werte holen
	email = $("#Email_"+woher).val();
	passwort = $("#Passwort_"+woher).val();
	passwort2 = $("#Passwort2_"+woher).val();
	// prüfen
	if (!email) {
		$("#Emailhinweis_"+woher).show();
		setTimeout(function() {
			$("#Email_"+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (!passwort) {
		$("#Passworthinweis_"+woher).show();
		setTimeout(function() {
			$("#Passwort_"+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (!passwort2) {
		$("#Passwort2hinweis_"+woher).show();
		setTimeout(function() {
			$("#Passwort2_"+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		return false;
	} else if (passwort !== passwort2) {
		$("#Passwort2hinweisFalsch_"+woher).show();
		setTimeout(function() {
			$("#Passwort2_"+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		return false;
	}
	return true;
};

window.adb.erstelleKonto = function(woher) {
	'use strict';
	// User in _user eintragen
	$.couch.signup({
		name: $('#Email_'+woher).val()
	},
	$('#Passwort_'+woher).val(), {
		success : function() {
			localStorage.Email = $('#Email_'+woher).val();
			if (woher === "art") {
				window.adb.bearbeiteLrTaxonomie();
			}
			window.adb.passeUiFürAngemeldetenUserAn(woher);
			// Werte aus Feldern entfernen
			$("#Email_"+woher).val("");
			$("#Passwort_"+woher).val("");
			$("#Passwort2_"+woher).val("");
		},
		error : function() {
			var praefix = "importieren_";
			if (woher === "art") {
				praefix = "";
			}
			$("#"+praefix+woher+"_anmelden_fehler_text").html("Fehler: Das Konto wurde nicht erstellt");
			$("#"+praefix+woher+"_anmelden_fehler")
                .alert()
                .show();
		}
	});
};

window.adb.meldeUserAn = function(woher) {
	'use strict';
	var email = $('#Email_'+woher).val(),
		passwort = $('#Passwort_'+woher).val();
	if (window.adb.validiereUserAnmeldung(woher)) {
		$.couch.login({
			name : email,
			password : passwort,
			success : function(r) {
				localStorage.Email = $('#Email_'+woher).val();
				if (woher === "art") {
					window.adb.bearbeiteLrTaxonomie();
				}
				window.adb.passeUiFürAngemeldetenUserAn(woher);
				// Werte aus Feldern entfernen
				$("#Email_"+woher).val("");
				$("#Passwort_"+woher).val("");
				$("#art_anmelden").show();
				// admin-Funktionen
				if (r.roles.indexOf("_admin") !== -1) {
					// das ist ein admin
					console.log("hallo admin");
					localStorage.admin = true;
				} else {
					delete localStorage.admin;
				}
				window.adb.blendeMenus();
			},
			error: function() {
				var präfix = "importieren_";
				if (woher === "art") {
					präfix = "";
				}
				// zuerst allfällige bestehende Hinweise ausblenden
				$(".hinweis").hide();
				$("#"+präfix+woher+"_anmelden_fehler_text")
                    .html("Anmeldung gescheitert.<br>Sie müssen ev. ein Konto erstellen?")
                    .alert()
				    .show();
			}
		});
	}
};

window.adb.blendeMenus = function() {
	'use strict';
	if (localStorage.admin) {
		$("#menu_btn")
            .find(".admin")
            .show();
	} else {
		$("#menu_btn")
            .find(".admin")
            .hide();
	}
};

window.adb.meldeUserAb = function() {
	'use strict';
	// IE8 kann nicht deleten
	try {
		delete localStorage.Email;
	}
	catch (e) {
		localStorage.Email = undefined;
	}
	$(".art_anmelden_titel").text("Anmelden");
	$(".importieren_anmelden_titel").text("1. Anmelden");
	$(".alert").hide();
	$(".hinweis").hide();
	$(".well.anmelden").show();
	$(".Email").show();
	$(".Passwort").show();
	$(".anmelden_btn").show();
	$(".abmelden_btn").hide();
	// ausschalten, soll später bei Organisation möglich werden
	// $(".konto_erstellen_btn").show();
	$(".konto_speichern_btn").hide();
	$("#art_anmelden").hide();
	window.adb.schützeLrTaxonomie();
    // falls dieser User admin war: vergessen
    delete localStorage.admin;
    // für diesen Nutzer passende Menus anzeigen
    window.adb.blendeMenus();
};

window.adb.passeUiFürAngemeldetenUserAn = function(woher) {
	'use strict';
	var präfix = "importieren_";
	if (woher === "art") {
		präfix = "";
	}
	$("#art_anmelden_titel").text(localStorage.Email + " ist angemeldet");
	$(".importieren_anmelden_titel").text("1. " + localStorage.Email + " ist angemeldet");
	if (woher !== "art") {
		$("#" + präfix + woher + "_anmelden_collapse").collapse('hide');
		$("#importieren_" + woher + "_ds_beschreiben_collapse").collapse('show');
	}
	$(".alert").hide();
	$(".hinweis").hide();
	$(".well.anmelden").hide();
	$(".Email").hide();
	$(".Passwort").hide();
	$(".anmelden_btn").hide();
	$(".abmelden_btn").show();
	$(".konto_erstellen_btn").hide();
	$(".konto_speichern_btn").hide();
	// in LR soll Anmelde-Accordion nicht sichtbar sein
	$("#art_anmelden").hide();
};

// prüft, ob der Benutzer angemeldet ist
// ja: retourniert true
// nein: retourniert false und öffnet die Anmeldung
// welche anmeldung hängt ab, woher die Prüfung angefordert wurde
// darum erwartet die Funktion den parameter woher
window.adb.prüfeAnmeldung = function(woher) {
	'use strict';
	if (!localStorage.Email) {
		setTimeout(function() {
			window.adb.zurückZurAnmeldung(woher);
		}, 600);
		return false;
	}
	return true;
};

window.adb.zurückZurAnmeldung = function(woher) {
	'use strict';
	var präfix = "importieren_";

	// Bei LR muss der Anmeldungsabschnitt eingeblendet werden
	if (woher === "art") {
		präfix = "";
		$("#art_anmelden").show();
	}

	// Mitteilen, dass Anmeldung nötig ist
	$("#"+präfix+woher+"_anmelden_hinweis")
        .alert()
        .show();
	$("#"+präfix+woher+"_anmelden_hinweis_text").html("Um Daten zu bearbeiten, müssen Sie angemeldet sein");
	$("#"+präfix+woher+"_anmelden_collapse").collapse('show');
	$(".anmelden_btn").show();
	$(".abmelden_btn").hide();
	// ausschalten, soll später bei Organisationen möglich werden
	//$(".konto_erstellen_btn").show();
	$(".konto_speichern_btn").hide();
	$("#Email_"+woher).focus();
};

window.adb.validiereUserAnmeldung = function(woher) {
	'use strict';
	var email = $('#Email_'+woher).val(),
		passwort = $('#Passwort_'+woher).val();
	if (!email) {
		setTimeout(function() {
			$('#Email_'+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		$("#Emailhinweis_"+woher).show();
		return false;
	} else if (!passwort) {
		setTimeout(function() {
			$('#Passwort_'+woher).focus();
		}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
		$("#Passworthinweis_"+woher).show();
		return false;
	}
	return true;
};

// wenn BsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist
window.adb.handleBsNameChange = function() {
	'use strict';
	var that = this,
		bs_key = _.find(window.adb.ds_namen_eindeutig, function(key) {
			return key[0] === that.value && key[2] !== localStorage.Email && !key[1];
		});
	if (bs_key) {
		$("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
		$("#importieren_bs_ds_beschreiben_hinweis_text2").html('Es existiert schon eine gleich heissende und nicht zusammenfassende Beziehungssammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
		setTimeout(function() {
			$("#importieren_bs_ds_beschreiben_hinweis2")
                .alert()
                .hide();
		}, 30000);
		$("#BsName")
            .val("")
		    .focus();
	} else {
		$("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .hide();
	}
};

// Wenn DsImportiertVon geändert wird
// kontrollieren, dass es die email der angemeldeten Person ist
window.adb.handleDsImportiertVonChange = function() {
	'use strict';
    var $importieren_ds_ds_beschreiben_hinweis2 = $("#importieren_ds_ds_beschreiben_hinweis2");
	$("#DsImportiertVon").val(localStorage.Email);
	$importieren_ds_ds_beschreiben_hinweis2
        .alert()
        .show()
	    .html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
	setTimeout(function() {
		$importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .hide();
	}, 10000);
};

// Wenn BsImportiertVon geändert wird
// Kontrollieren, dass es die email der angemeldeten Person ist
window.adb.handleBsImportiertVonChange = function() {
	'use strict';
	$("#BsImportiertVon").val(localStorage.Email);
	$("#importieren_bs_ds_beschreiben_hinweis2")
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show();
	$("#importieren_bs_ds_beschreiben_hinweis_text2").html('"importiert von" ist immer die email-Adresse der angemeldeten Person');
	setTimeout(function() {
		$("#importieren_bs_ds_beschreiben_hinweis2")
            .alert()
            .hide();
	}, 10000);
};

// wenn BsZusammenfassend geändert wird
// BsUrsprungsBs_div zeigen oder verstecken
window.adb.handleBsZusammenfassendChange = function() {
	'use strict';
	if ($(this).prop('checked')) {
		$("#BsUrsprungsBs_div").show();
	} else {
		$("#BsUrsprungsBs_div").hide();
	}
};

// wenn DsZusammenfassend geändert wird
// DsUrsprungsDs zeigen oder verstecken
window.adb.handleDsZusammenfassendChange = function() {
	'use strict';
	if ($(this).prop('checked')) {
		$("#DsUrsprungsDs_div").show();
	} else {
		$("#DsUrsprungsDs_div").hide();
	}
};

// Wenn BsWählen geändert wird
window.adb.handleBsWählenChange = function() {
	'use strict';
	var bs_name = this.value,
		wählbar = false,
        $BsAnzDs = $("#BsAnzDs"),
        $BsAnzDs_label = $("#BsAnzDs_label"),
        $BsName = $("#BsName"),
        $importieren_bs_ds_beschreiben_hinweis2 = $("#importieren_bs_ds_beschreiben_hinweis2");
    // allfälligen Alert schliessen
    $importieren_bs_ds_beschreiben_hinweis2
        .alert()
        .hide();
    // wählbar setzen
    // wählen kann man nur, was man selber importiert hat - oder admin ist
    if ($("#"+this.id+" option:selected").attr("waehlbar") === "true") {
        wählbar = true;
    } else if (Boolean(localStorage.admin)) {
        wählbar = true;
    }
	if (wählbar) {
		// zuerst alle Felder leeren
		$('#importieren_bs_ds_beschreiben_collapse textarea, #importieren_bs_ds_beschreiben_collapse input').each(function() {
			$(this).val('');
		});
		$BsAnzDs.html("");
		$BsAnzDs_label.html("");
		if (bs_name) {
            _.each(window.adb.bs_von_objekten.rows, function(bs_row) {
                if (bs_row.key[1] === bs_name) {
                    $BsName.val(bs_name);
                    _.each(bs_row, function(feldwert, feldname) {
                        if (feldname === "Ursprungsdatensammlung") {
                            $("#BsUrsprungsBs").val(feldwert);
                        } else if (feldname !== "importiert von") {
                            $("#Bs" + feldname).val(feldwert);
                        }
                    });
                    if (bs_row.key[2] === true) {
                        $("#BsZusammenfassend").prop('checked', true);
                        $("#BsUrsprungsBs_div").show();
                    } else {
                        // sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere BS gewählt wird
                        $("#BsZusammenfassend").prop('checked', false);
                        $("#BsUrsprungsBs_div").hide();
                    }
                    // wenn die ds/bs kein "importiert von" hat ist der Wert null
                    // verhindern, dass null angezeigt wird
                    if (bs_row.key[3]) {
                        $("#BsImportiertVon").val(bs_row.key[3]);
                    } else {
                        $("#BsImportiertVon").val("");
                    }
                    $BsAnzDs_label.html("Anzahl Arten/Lebensräume");
                    $BsAnzDs.html(bs_row.value);
                    // dafür sorgen, dass textareas genug gross sind
                    $('#importieren_bs').find('textarea').each(function() {
                        window.adb.fitTextareaToContent(this, document.documentElement.clientHeight);
                    });
                    $BsName.focus();
                }
                // löschen-Schaltfläche einblenden
                $("#BsLoeschen").show();
            });
		} else {
			// löschen-Schaltfläche ausblenden
			$("#BsLoeschen").hide();
		}
	} else {
		// melden, dass diese BS nicht bearbeitet werden kann
        $("#importieren_bs_ds_beschreiben_hinweis2")
            .html("Sie können nur Beziehungssammlungen verändern, die Sie selber importiert haben.<br>Ausnahme: Zusammenfassende Beziehungssammlungen.");
        $importieren_bs_ds_beschreiben_hinweis2
            .alert()
            .removeClass("alert-success")
            .removeClass("alert-info")
            .addClass("alert-danger")
            .show();
        $('html, body').animate({
            scrollTop: $("#BsWaehlen").offset().top
        }, 2000);
	}
};

// wenn DsFile geändert wird
window.adb.handleDsFileChange = function() {
	'use strict';
	if (typeof event.target.files[0] === "undefined") {
		// vorhandene Datei wurde entfernt
		$("#DsTabelleEigenschaften").hide();
		$("#importieren_ds_ids_identifizieren_hinweis_text").hide();
		$("#DsImportieren").hide();
		$("#DsEntfernen").hide();
	} else {
        var file = event.target.files[0],
            reader = new FileReader();

        reader.onload = function(event) {
            window.adb.dsDatensätze = $.csv.toObjects(event.target.result);
            window.adb.erstelleTabelle(window.adb.dsDatensätze, "DsFelder_div", "DsTabelleEigenschaften");
        };
        reader.readAsText(file);
    }
};

// wenn BsFile geändert wird
window.adb.handleBsFileChange = function() {
	'use strict';
	if (typeof event.target.files[0] === "undefined") {
		// vorhandene Datei wurde entfernt
		$("#BsTabelleEigenschaften").hide();
		$("#importieren_bs_ids_identifizieren_hinweis_text").hide();
		$("#BsImportieren").hide();
		$("#BsEntfernen").hide();
	} else {
        var file = event.target.files[0],
            reader = new FileReader();
        reader.onload = function(event) {
            window.adb.bsDatensätze = $.csv.toObjects(event.target.result);
            window.adb.erstelleTabelle(window.adb.bsDatensätze, "BsFelder_div", "BsTabelleEigenschaften");
        };
        reader.readAsText(file);
    }
};

// wenn btn_resize geklickt wird
window.adb.handleBtnResizeClick = function() {
	'use strict';
	var windowHeight = $(window).height(),
        $body = $("body");
	$body.toggleClass("force-mobile");
	if ($body.hasClass("force-mobile")) {
		// Spalten sind untereinander. Baum 91px weniger hoch, damit Formulare zum raufschieben immer erreicht werden können
		$(".baum").css("max-height", windowHeight - 252);
		// button rechts ausrichten
		$("#btn_resize")
            .css("margin-right", "0px")
            .attr("data-original-title", "in zwei Spalten anzeigen");
	} else {
		$(".baum").css("max-height", windowHeight - 161);
		// button an anderen Schaltflächen ausrichten
		$("#btn_resize")
            .css("margin-right", "6px")
            .attr("data-original-title", "ganze Breite nutzen");
	}
};

// wenn menu_btn geklickt wird
// Menu: Links zu Google Bilder und Wikipedia nur aktiv setzen, wenn Art oder Lebensraum angezeigt wird
window.adb.handleMenuBtnClick = function() {
	'use strict';
	if (localStorage.art_id) {
		$("#GoogleBilderLink_li").removeClass("disabled");
		$("#WikipediaLink_li").removeClass("disabled");
	} else {
		$("#GoogleBilderLink_li").addClass("disabled");
		$("#WikipediaLink_li").addClass("disabled");
	}
};

// wenn ds_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
window.adb.handleDs_ImportierenClick = function() {
	'use strict';
	if(window.adb.isFileAPIAvailable()) {
		window.adb.zeigeFormular("importieren_ds");
		// Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
		if (window.adb.prüfeAnmeldung("ds")) {
			$("#importieren_ds_ds_beschreiben_collapse").collapse('show');
		}
	}
};

// wenn bs_importieren geklickt wird
// testen, ob der Browser das Importieren unterstützt
// wenn nein, Meldung bringen (macht die aufgerufene Funktion)
window.adb.handleBs_ImportierenClick = function() {
	'use strict';
	if(window.adb.isFileAPIAvailable()) {
		window.adb.zeigeFormular("importieren_bs");
		// Ist der User noch angemeldet? Wenn ja: Anmeldung überspringen
		if (window.adb.prüfeAnmeldung("bs")) {
			$("#importieren_bs_ds_beschreiben_collapse").collapse('show');
		}
	}
};

window.adb.handleMenuAdminClick = function() {
	'use strict';
	window.adb.zeigeFormular("admin");
};

window.adb.ergänzePilzeZhgis = function() {
	'use strict';
	$("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Daten werden analysiert...");
	var $db = $.couch.db("artendb");
	$db.view('artendb/macromycetes?include_docs=true', {
		success: function(data) {
			var ds_zhgis = {},
				ergänzt = 0,
				fehler = 0,
				zhgis_schon_da = 0;
			ds_zhgis.Name = "ZH GIS";
			ds_zhgis.Beschreibung = "GIS-Layer und Betrachtungsdistanzen für das Artenlistentool, Artengruppen für EvAB, im Kanton Zürich. Eigenschaften aller Arten";
			ds_zhgis.Datenstand = "dauernd nachgeführt";
			ds_zhgis.Link = "http://www.naturschutz.zh.ch";
            ds_zhgis["importiert von"] = "alex@gabriel-software.ch";
			ds_zhgis.Eigenschaften = {};
			ds_zhgis.Eigenschaften["GIS-Layer"] = "Pilze";
			_.each(data.rows, function(row) {
				var pilz = row.doc,
					zhgis_in_ds;
				if (!pilz.Eigenschaftensammlungen) {
					pilz.Eigenschaftensammlungen = [];
				}
				zhgis_in_ds = _.find(pilz.Eigenschaftensammlungen, function(ds) {
					return ds.Name === "ZH GIS";
				});
				// nur ergänzen, wenn ZH GIS noch nicht existiert
				if (!zhgis_in_ds) {
					pilz.Eigenschaftensammlungen.push(ds_zhgis);
					pilz.Eigenschaftensammlungen = _.sortBy(pilz.Eigenschaftensammlungen, function(ds) {
						return ds.Name;
					});
					$db.saveDoc(pilz, {
						success: function() {
							ergänzt ++;
							$("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
						},
						error: function() {
							fehler ++;
							$("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
						}
					});
				} else {
					zhgis_schon_da ++;
					$("#admin_pilze_zhgis_ergänzen_rückmeldung").html("Total: " + data.rows.length + ". Ergänzt: " + ergänzt + ", Fehler: " + fehler + ", 'ZH GIS' schon enthalten: " + zhgis_schon_da);
				}
			});
		}
	});
};

window.adb.korrigiereArtwertnameInFlora = function() {
	'use strict';
    $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Daten werden analysiert...");
    var $db = $.couch.db("artendb");
    $db.view('artendb/flora?include_docs=true', {
        success: function(data) {
            var korrigiert = 0,
                fehler = 0,
                save;
            _.each(data.rows, function(row) {
                var art = row.doc,
                    ds_artwert,
                    daten = {};
                if (art.Eigenschaftensammlungen) {
                    ds_artwert = _.find(art.Eigenschaftensammlungen, function(ds) {
                       return ds.Name === "ZH Artwert (1995)";
                    });
                    //if (ds_artwert && ds_artwert.Eigenschaften && ds_artwert.Eigenschaften["Artwert KT ZH"]) {
                    if (ds_artwert && ds_artwert.Eigenschaften) {
                        save = false;
                        // loopen und neu aufbauen, damit die Reihenfolge der keys erhalten bleibt (hoffentlich)
                        _.each(ds_artwert.Eigenschaften, function(value, key) {
                            if (key === "Artwert KT ZH") {
                                key = "Artwert";
                                save = true;
                            }
                            daten[key] = value;
                        });
                        if (save) {
                            ds_artwert.Eigenschaften = daten;
                            $db.saveDoc(art, {
                                success: function() {
                                    korrigiert ++;
                                    $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Total: " + data.rows.length + ". Korrigiert: " + korrigiert + ", Fehler: " + fehler);
                                },
                                error: function() {
                                    fehler ++;
                                    $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Total: " + data.rows.length + ". Korrigiert: " + korrigiert + ", Fehler: " + fehler);
                                }
                            });
                        }
                    }
                }
            });
            if (korrigiert === 0) {
                $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Es gibt offenbar keine Felder mehr mit Namen 'Artwert KT ZH'");
            }
        }
    });
};

window.adb.korrigiereDsNameFloraChRoteListe1991 = function() {
	'use strict';
    var $admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung = $("#admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung");
    $admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung.html("Daten werden analysiert...");
    var $db = $.couch.db("artendb");
    $db.view('artendb/flora?include_docs=true', {
        success: function(data) {
            var korrigiert = 0,
                fehler = 0,
                save;
            _.each(data.rows, function(row) {
                var art = row.doc,
                    ds;
                if (art.Eigenschaftensammlungen) {
                    ds = _.find(art.Eigenschaftensammlungen, function(ds) {
                        return ds.Name === "CH Rote Liste (1991)";
                    });
                    if (ds) {
                        ds.Name = "CH Rote Listen Flora (1991)";
                        $db.saveDoc(art, {
                            success: function() {
                                korrigiert ++;
                                $admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung.html("Floraarten: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                            },
                            error: function() {
                                fehler ++;
                                $admin_korrigiere_ds_name_ch_rote_liste_1991_rückmeldung.html("Floraarten: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                            }
                        });
                    }
                }
            });
            if (korrigiert === 0) {
                $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Es gibt offenbar keine Datensammlungen mehr mit Namen 'CH Rote Liste (1991)'");
            }
        }
    });
};

window.adb.nenneDsUm = function() {
	'use strict';
    var $admin_korrigiere_ds_name_ch_rückmeldung = $("#admin_korrigiere_ds_name_rückmeldung"),
        $admin_korrigiere_ds_name_name_vorher = $("#admin_korrigiere_ds_name_name_vorher"),
        $admin_korrigiere_ds_name_name_nachher = $("#admin_korrigiere_ds_name_name_nachher"),
        name_vorher = $admin_korrigiere_ds_name_name_vorher.val(),
        name_nachher = $admin_korrigiere_ds_name_name_nachher.val();
    if (!name_vorher) {
        $admin_korrigiere_ds_name_ch_rückmeldung.html("Bitte Name vorher erfassen");
        $admin_korrigiere_ds_name_name_vorher.focus();
        return;
    }
    if (!name_nachher) {
        $admin_korrigiere_ds_name_ch_rückmeldung.html("Bitte Name nachher erfassen");
        $admin_korrigiere_ds_name_name_nachher.focus();
        return;
    }
    $admin_korrigiere_ds_name_ch_rückmeldung.html("Daten werden analysiert...");
    var $db = $.couch.db("artendb");
    $db.view('artendb/ds_bs_guid?startkey=["' + name_vorher + '"]&endkey=["' + name_vorher + '",{}]&include_docs=true', {
        success: function(data) {
            var korrigiert = 0,
                fehler = 0,
                save;
            if (data.rows.length === 0) {
                $admin_korrigiere_ds_name_ch_rückmeldung.html("Es gibt keine Datensammlung namens " + name_vorher);
                return;
            }
            _.each(data.rows, function(row) {
                var art = row.doc,
                    ds,
                    bs,
                    save = false;
                // Datensammlung mit diesem Namen suchen
                if (art.Eigenschaftensammlungen && art.Eigenschaftensammlungen.length > 0) {
                    ds = _.find(art.Eigenschaftensammlungen, function(ds_) {
                        if (ds_.Name) {
                            return ds_.Name === name_vorher;
                        }
                    });
                    if (ds) {
                        ds.Name = name_nachher;
                        save = true;
                    }
                }
                // Beziehungssammlung mit diesem Namen suchen
                if (art.Beziehungssammlungen && art.Beziehungssammlungen.length > 0) {
                    bs = _.find(art.Beziehungssammlungen, function(ds_) {
                        if (ds_.Name) {
                            return ds_.Name === name_vorher;
                        }
                    });
                    if (bs) {
                        bs.Name = name_nachher;
                        save = true;
                    }
                }
                // Datensatz speichern, wenn nötig
                if (save) {
                    $db.saveDoc(art, {
                        success: function() {
                            korrigiert ++;
                            $admin_korrigiere_ds_name_ch_rückmeldung.html("Arten mit dieser Datensammlung: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        },
                        error: function() {
                            fehler ++;
                            $admin_korrigiere_ds_name_ch_rückmeldung.html("Arten mit dieser Datensammlung: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        }
                    });
                }
            });
            if (korrigiert === 0) {
                $("#admin_korrigiere_artwertname_in_flora_rückmeldung").html("Es gibt offenbar keine Datensammlungen mehr mit Namen '" + name_vorher + "'");
            }
        }
    });
};

window.adb.baueDsZuEigenschaftenUm = function() {
    'use strict';
    var $admin_baue_ds_zu_eigenschaften_um_rückmeldung = $("#admin_baue_ds_zu_eigenschaften_um_rückmeldung"),
        $db = $.couch.db("artendb");
    $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Daten werden analysiert...");
    $db.view('artendb/all_docs?include_docs=true', {
        success: function(data) {
            var korrigiert = 0,
                fehler = 0,
                save;
            if (data.rows.length === 0) {
                $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Keine Daten erhalten");
                return;
            }
            _.each(data.rows, function(row) {
                var art = row.doc,
                    datensammlungen,
                    beziehungssammlungen,
                    ds_daten,
                    tax_daten,
                    save = false;
                // Datensammlungen umbenennen
                // ds und bs entfernen, danach in der richtigen Reihenfolge hinzufügen
                // damit die Reihenfolge bewahrt bleibt
                if (art.Taxonomie && art.Taxonomie.Daten) {
                    tax_daten = art.Taxonomie.Daten;
                    delete art.Taxonomie.Daten;
                    art.Taxonomie.Eigenschaften = tax_daten;
                    save = true;
                }
                if (art.Datensammlungen) {
                    datensammlungen = art.Datensammlungen;
                    _.each(datensammlungen, function(ds) {
                        if (ds.Daten) {
                            ds_daten = ds.Daten;
                            delete ds.Daten;
                            ds.Eigenschaften = ds_daten;
                        }
                    });
                    delete art.Datensammlungen;
                    if (art.Beziehungssammlungen) {
                        beziehungssammlungen = art.Beziehungssammlungen;
                        delete art.Beziehungssammlungen;
                    } else {
                        beziehungssammlungen = {};
                    }
                    art.Eigenschaftensammlungen = datensammlungen;
                    art.Beziehungssammlungen = beziehungssammlungen;
                    save = true;
                }
                if (save) {
                    $db.saveDoc(art, {
                        success: function() {
                            korrigiert ++;
                            $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        },
                        error: function() {
                            fehler ++;
                            $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
                        }
                    });
                }

            });
            if (korrigiert === 0) {
                $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Es gibt offenbar keine Datensammlungen mehr, die umbenannt werden müssen");
            }
        }
    });
};

/*window.adb.baueDsZuEigenschaftenUm = function() {
 'use strict';
 var $admin_baue_ds_zu_eigenschaften_um_rückmeldung = $("#admin_baue_ds_zu_eigenschaften_um_rückmeldung"),
 $db = $.couch.db("artendb");
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Daten werden analysiert...");
 //$db.view('artendb/all_docs?include_docs=true', {
 $db.view('artendb/all_docs', {
 success: function(data) {
 var korrigiert = 0,
 fehler = 0,
 save;
 if (data.rows.length === 0) {
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Keine Daten erhalten");
 return;
 }
 _.each(data.rows, function(row) {
 $db.openDoc(row.key, {
 success: function(art) {
 var datensammlungen,
 beziehungssammlungen,
 ds_daten,
 tax_daten,
 save = false;
 // Datensammlungen umbenennen
 // ds und bs entfernen, danach in der richtigen Reihenfolge hinzufügen
 // damit die Reihenfolge bewahrt bleibt
 if (art.Taxonomie && art.Taxonomie.Daten) {
 tax_daten = art.Taxonomie.Daten;
 delete art.Taxonomie.Daten;
 art.Taxonomie.Eigenschaften = tax_daten;
 save = true;
 }
 if (art.Datensammlungen) {
 datensammlungen = art.Datensammlungen;
 _.each(datensammlungen, function(ds) {
 if (ds.Daten) {
 ds_daten = ds.Daten;
 delete ds.Daten;
 ds.Eigenschaften = ds_daten;
 }
 });
 delete art.Datensammlungen;
 if (art.Beziehungssammlungen) {
 beziehungssammlungen = art.Beziehungssammlungen;
 delete art.Beziehungssammlungen;
 } else {
 beziehungssammlungen = {};
 }
 art.Eigenschaftensammlungen = datensammlungen;
 art.Beziehungssammlungen = beziehungssammlungen;
 save = true;
 }
 if (save) {
 $db.saveDoc(art, {
 success: function() {
 korrigiert ++;
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
 },
 error: function() {
 fehler ++;
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
 }
 });
 }
 },
 error: function() {
 fehler ++;
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Anzahl Dokumente in DB: " + data.rows.length + ". Umbenannt: " + korrigiert + ", Fehler: " + fehler);
 }
 });

 });
 if (korrigiert === 0) {
 $admin_baue_ds_zu_eigenschaften_um_rückmeldung.html("Es gibt offenbar keine Datensammlungen mehr, die umbenannt werden müssen");
 }
 }
 });
 };*/

// wenn importieren_ds_ds_beschreiben_collapse geöffnet wird
window.adb.handleImportierenDsDsBeschreibenCollapseShown = function() {
	'use strict';
	// mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
	window.adb.bereiteImportieren_ds_beschreibenVor("ds");
	$("#DsImportiertVon").val(localStorage.Email);
};

// wenn importieren_bs_ds_beschreiben_collapse geöffnet wird
window.adb.handleImportierenBsDsBeschreibenCollapseShown = function() {
	'use strict';
	// mitgeben, woher die Anfrage kommt, weil ev. angemeldet werden muss
	window.adb.bereiteImportieren_bs_beschreibenVor("bs");
	$("#BsImportiertVon").val(localStorage.Email);
};

// wenn importieren_ds_daten_uploaden_collapse geöffnet wird
window.adb.handleImportierenDsDatenUploadenCollapseShown = function() {
	'use strict';
	if (!window.adb.prüfeAnmeldung("ds")) {
		$(this).collapse('hide');
	} else {
		$('#DsFile').fileupload();
	}
    $('html, body').animate({
        scrollTop: $("#importieren_ds_daten_uploaden_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_daten_uploaden_collapse geöffnet wird
window.adb.handleImportierenBsDatenUpladenCollapseShown = function() {
	'use strict';
	if (!window.adb.prüfeAnmeldung("bs")) {
		$(this).collapse('hide');
	} else {
		$('#BsFile').fileupload();
	}
    $('html, body').animate({
        scrollTop: $("#importieren_bs_daten_uploaden_collapse").offset().top
    }, 2000);
};

// wenn importieren_ds_ids_identifizieren_collapse geöffnet wird
window.adb.handleImportierenDsIdsIdentifizierenCollapseShown = function() {
	'use strict';
	if (!window.adb.prüfeAnmeldung("ds")) {
		$(this).collapse('hide');
	}
    $('html, body').animate({
        scrollTop: $("#importieren_ds_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_ids_identifizieren_collapse geöffnet wird
window.adb.handleImportierenBsIdsIdentifizierenCollapseShown = function() {
	'use strict';
	if (!window.adb.prüfeAnmeldung("bs")) {
		$(this).collapse('hide');
	}
    $('html, body').animate({
        scrollTop: $("#importieren_bs_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// wenn importieren_ds_import_ausfuehren_collapse geöffnet wird
window.adb.handleImportierenDsImportAusführenCollapseShown = function() {
	'use strict';
	if (!window.adb.prüfeAnmeldung("ds")) {
		$(this).collapse('hide');
	}
    $('html, body').animate({
        scrollTop: $("#importieren_ds_import_ausfuehren_collapse").offset().top
    }, 2000);
};

// wenn importieren_bs_import_ausfuehren_collapse geöffnet wird
window.adb.handleImportierenBsImportAusführenCollapseShown = function() {
	'use strict';
	if (!window.adb.prüfeAnmeldung("bs")) {
		$(this).collapse('hide');
	}
    $('html, body').animate({
        scrollTop: $("#importieren_bs_import_ausfuehren_collapse").offset().top
    }, 2000);
};

// wenn DsWählen geändert wird
window.adb.handleDsWählenChange = function() {
	'use strict';
	var ds_name = this.value,
		wählbar = false,
        $DsAnzDs = $("#DsAnzDs"),
        $DsAnzDs_label = $("#DsAnzDs_label"),
        $DsName = $("#DsName"),
        $importieren_ds_ds_beschreiben_error = $("#importieren_ds_ds_beschreiben_error");
    // allfälligen Alert schliessen
    $importieren_ds_ds_beschreiben_error
        .alert()
        .hide();
    // wählbar setzen
    // wählen kann man nur, was man selber importiert hat - oder admin ist
    if ($("#"+this.id+" option:selected").attr("waehlbar") === "true") {
        wählbar = true;
    } else if (Boolean(localStorage.admin)) {
        wählbar = true;
    }
	if (wählbar) {
		// zuerst alle Felder leeren
		$('#importieren_ds_ds_beschreiben_collapse textarea, #importieren_ds_ds_beschreiben_collapse input').each(function() {
			$(this).val('');
		});
		$DsAnzDs.html("");
		$DsAnzDs_label.html("");
		if (ds_name) {
            _.each(window.adb.ds_von_objekten.rows, function(ds_von_objekten_row) {
                if (ds_von_objekten_row.key[1] === ds_name) {
                    $DsName.val(ds_name);
                    _.each(ds_von_objekten_row.key[4], function(feldwert, feldname) {
                        if (feldname === "Ursprungsdatensammlung") {
                            $("#DsUrsprungsDs").val(feldwert);
                        } else if (feldname !== "importiert von") {
                            $("#Ds" + feldname).val(feldwert);
                        }
                    });
                    if (ds_von_objekten_row.key[2] === true) {
                        $("#DsZusammenfassend").prop('checked', true);
                        // Feld für Ursprungs-DS anzeigen
                        $("#DsUrsprungsDs_div").show();
                    } else {
                        // sicherstellen, dass der Haken im Feld entfernt wird, wenn nach der zusammenfassenden eine andere DS gewählt wird
                        $("#DsZusammenfassend").prop('checked', false);
                        // und Feld für Ursprungs-DS verstecken
                        $("#DsUrsprungsDs_div").hide();
                    }
                    // wenn die ds/bs kein "importiert von" hat ist der Wert null
                    // verhindern, dass null angezeigt wird
                    if (ds_von_objekten_row.key[3]) {
                        $("#DsImportiertVon").val(ds_von_objekten_row.key[3]);
                    } else {
                        $("#DsImportiertVon").val("");
                    }
                    $DsAnzDs_label.html("Anzahl Arten/Lebensräume");
                    $DsAnzDs.html(ds_von_objekten_row.value);
                    // dafür sorgen, dass textareas genug gross sind
                    $('#importieren_ds')
                        .find('textarea')
                        .each(function() {
                            window.adb.fitTextareaToContent(this, document.documentElement.clientHeight);
                        });
                    $DsName.focus();
                }
                // löschen-Schaltfläche einblenden
                $("#DsLoeschen").show();
            });
		} else {
			// löschen-Schaltfläche ausblenden
			$("#DsLoeschen").hide();
		}
	} else {
        // melden, dass diese BS nicht bearbeitet werden kann
        $("#importieren_ds_ds_beschreiben_error_text")
            .html("Sie können nur Datensammlungen verändern, die Sie selber importiert haben.<br>Ausnahme: Zusammenfassende Datensammlungen.");
        $importieren_ds_ds_beschreiben_error
            .alert()
            .show();
        $('html, body').animate({
            scrollTop: $("#DsWaehlen").offset().top
        }, 2000);
	}
};

// wenn DsName geändert wird
// suchen, ob schon eine Datensammlung mit diesem Namen existiert
// und sie von jemand anderem importiert wurde
// und sie nicht zusammenfassend ist
window.adb.handleDsNameChange = function() {
	'use strict';
	var that = this,
		ds_key = _.find(window.adb.ds_namen_eindeutig, function(key) {
			return key[0] === that.value && key[2] !== localStorage.Email && !key[1];
		}),
        $importieren_ds_ds_beschreiben_hinweis2 = $("#importieren_ds_ds_beschreiben_hinweis2");
	if (ds_key) {
		$importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .show()
		    .html('Es existiert schon eine gleich heissende und nicht zusammenfassende Datensammlung.<br>Sie wurde von jemand anderem importiert. Daher müssen Sie einen anderen Namen verwenden.');
		setTimeout(function() {
			$importieren_ds_ds_beschreiben_hinweis2
                .alert()
                .hide();
		}, 30000);
		$("#DsName")
            .val("")
		    .focus();
	} else {
		$importieren_ds_ds_beschreiben_hinweis2
            .alert()
            .hide();
	}
};

// wenn DsLöschen geklickt wird
window.adb.handleDsLöschenClick = function() {
	'use strict';
	// Rückmeldung anzeigen
    $("#importieren_ds_ds_beschreiben_hinweis")
        .alert()
        .show()
	    .html("Bitte warten: Die Datensammlung wird entfernt...");
    window.adb.entferneDatensammlungAusAllenObjekten($("#DsName").val());
};

// wenn BsLoeschen geklickt wird
window.adb.handleBsLöschenClick = function() {
	'use strict';
	// Rückmeldung anzeigen
	$("#importieren_bs_ds_beschreiben_hinweis")
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show();
    $("#importieren_bs_ds_beschreiben_hinweis_text").html("Bitte warten: Die Beziehungssammlung wird entfernt...");
    window.adb.entferneBeziehungssammlungAusAllenObjekten($("#BsName").val());
};

// wenn exportieren geklickt wird
window.adb.handleExportierenClick = function() {
	'use strict';
	window.adb.zeigeFormular("export");
	delete window.adb.exportieren_objekte;
};

// wenn exportieren_alt geklickt wird
window.adb.handleExportierenAltClick = function() {
	'use strict';
	window.open("_list/export_alt_mit_synonymen_standardfelder/all_docs_mit_synonymen_fuer_alt?include_docs=true");
};

// wenn .feld_waehlen geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung angezeigt wird
// und pro Beziehung eine Zeile ausgegeben wird. 
// Wenn ja: reklamieren und rückgängig machen
window.adb.handleFeldWählenChange = function() {
	'use strict';
	if ($("#export_bez_in_zeilen").prop('checked')) {
		var bez_ds_checked = [],
			that = this;
		$("#exportieren_felder_waehlen_felderliste")
            .find(".feld_waehlen")
            .each(function() {
                if ($(this).prop('checked') && $(this).attr('dstyp') === "Beziehung") {
                    bez_ds_checked.push($(this).attr('datensammlung'));
                }
            });
		// eindeutige Liste der dsTypen erstellen
		bez_ds_checked = _.union(bez_ds_checked);
		if (bez_ds_checked && bez_ds_checked.length > 1) {
			$('#meldung_zuviele_bs').modal();
			$(that).prop('checked', false);
		} else {
			window.adb.exportZurücksetzen();
		}
	}
};

// wenn .feld_waehlen_alle_von_ds geändert wird
// wenn checked: alle unchecken, sonst alle checken
window.adb.handleFeldWählenAlleVonDs = function() {
	'use strict';
	var ds = $(this).attr('datensammlung'),
		status = false;
	if ($(this).prop('checked')) {
		status = true;
	}
	$('[datensammlung="' + ds + '"]').each(function() {
		$(this).prop('checked', status);
	});
};

// wenn exportieren_ds_objekte_waehlen_gruppe geändert wird
window.adb.handleExportierenDsObjekteWählenGruppeChange = function() {
	'use strict';
	window.adb.erstelleListeFürFeldwahl();
};

// wenn export_feld_filtern geändert wird
// kontrollieren, ob mehr als eine Beziehungssammlung Filter enthält. Wenn ja: reklamieren und rückgängig machen
window.adb.handleExportFeldFilternChange = function() {
	'use strict';
    var $this = $(this);
    // die Checkboxen sollen drei Werte annehmen können:
    if (this.type === "checkbox") {
        if (this.readOnly) {
            // so ist es zu Beginn
            // dann soll er auf chedked wechseln
            this.readOnly = this.indeterminate = false;
            $this.prop('checked', true);
        } else if (!$this.prop('checked')) {
            this.readOnly = this.indeterminate = false;
            $this.prop('checked', false);
        } else {
            $this.prop('checked', false);
            this.indeterminate = this.readOnly = true;
        }
    }

	var bez_ds_filtered = [];
	$("#exportieren_objekte_waehlen_ds_collapse")
        .find(".export_feld_filtern")
        .each(function() {
            if ((this.value || this.value === 0) && $(this).attr('dstyp') === "Beziehung") {
                bez_ds_filtered.push($(this).attr('eigenschaft'));
            }
        });
	// eindeutige Liste der dsTypen erstellen
	bez_ds_filtered = _.union(bez_ds_filtered);
	if (bez_ds_filtered && bez_ds_filtered.length > 1) {
		$('#meldung_zuviele_bs').modal();
		$(this).val("");
	} else {
		window.adb.exportZurücksetzen();
	}
};

// wenn exportieren_exportieren angezeigt wird
// zur Schaltfläche Vorschau scrollen
window.adb.handleExportierenExportierenShow = function() {
	'use strict';
    // Fehlermeldung verstecken, falls sie noch offen war
    $("#exportieren_exportieren_error_text")
        .alert()
        .hide();
	$('html, body').animate({
		scrollTop: $("#exportieren_exportieren_tabelle_aufbauen").offset().top
	}, 2000);
};

// wenn .btn.lr_bearb_bearb geklickt wird
window.adb.handleBtnLrBearbBearbKlick = function() {
	'use strict';
	if (!$(this).hasClass('disabled')) {
		window.adb.bearbeiteLrTaxonomie();
	}
};

// wenn .btn.lr_bearb_schuetzen geklickt wird
window.adb.handleBtnLrBearbSchützenClick = function() {
	'use strict';
	if (!$(this).hasClass('disabled')) {
		window.adb.schützeLrTaxonomie();
		// Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
		delete localStorage.lr_bearb;
	}
};

// wenn .btn.lr_bearb_neu geklickt wird
window.adb.handleBtnLrBearbNeuClick = function() {
	'use strict';
	if (!$(this).hasClass('disabled')) {
		window.adb.initiiereLrParentAuswahlliste($("#Taxonomie").val());
	}
};

// wenn #lr_parent_waehlen_optionen [name="parent_optionen"] geändert wird
window.adb.handleLrParentOptionenChange = function() {
	'use strict';
	// prüfen, ob oberster Node gewählt wurde
	var parent_name = $(this).val(),
		parent_id = this.id,
		parent = {},
		object = {},
		erstelleBaum = require('./modules/erstelleBaum');
	// zuerst eine id holen
	object._id = $.couch.newUUID(1);
	object.Gruppe = "Lebensräume";
	object.Typ = "Objekt";
	object.Taxonomie = {};
	object.Taxonomie.Name = "neue Taxonomie";	// wenn nicht Wurzel, setzen. Passiert in aktualisiereHierarchieEinesNeuenLr
	object.Taxonomie.Eigenschaften = {};
	object.Taxonomie.Eigenschaften.Taxonomie = "neue Taxonomie";	// wenn nicht Wurzel, setzen. Passiert in aktualisiereHierarchieEinesNeuenLr
	// wenn keine Wurzel: Label anzeigen
	if (parent_id !== "0") {
		object.Taxonomie.Eigenschaften.Label = "";
	}
	object.Taxonomie.Eigenschaften.Einheit = "unbeschriebener Lebensraum";
	if (parent_id === "0") {
		object.Taxonomie.Eigenschaften.Einheit = "neue Taxonomie";
	}
	/*Einheit-Nr FNS wird nicht mehr benötigt, bzw. unabhängig führen
	object.Taxonomie.Eigenschaften["Einheit-Nr FNS"] = "";
	if (parent_id === "0") {
		object.Taxonomie.Eigenschaften["Einheit-Nrn FNS von"] = "";
		object.Taxonomie.Eigenschaften["Einheit-Nrn FNS bis"] = "";
	}*/
	object.Taxonomie.Eigenschaften.Beschreibung = "";
	object.Eigenschaftensammlungen = [];
	object.Beziehungssammlungen = [];
	// jetzt den parent erstellen
	// geht nicht vorher, weil die id bekannt sein muss
	if (parent_id === "0") {
		// das ist die Wurzel der Taxonomie
		parent.Name = "neue Taxonomie";
		parent.GUID = object._id;
		// bei der Wurzel ist Hierarchie gleich parent
		object.Taxonomie.Eigenschaften.Hierarchie = [];
		object.Taxonomie.Eigenschaften.Hierarchie.push(parent);
	} else {
		parent.Name = parent_name;
		parent.GUID = parent_id;
	}
	object.Taxonomie.Eigenschaften.Parent = parent;
	var $db = $.couch.db("artendb");
	$db.saveDoc(object, {
		success: function(object_saved) {
			object._rev = object_saved.rev;
			if (parent_id !== "0") {
				// die Hierarchie aufbauen und setzen
				// bei der Wurzel ist sie schon gesetzt
				window.adb.aktualisiereHierarchieEinesNeuenLr(null, object, true);
			} else {
				$.when(erstelleBaum($)).then(function() {
					window.adb.öffneBaumZuId(object._id);
					$('#lr_parent_waehlen').modal('hide');
				});
			}
		}
	});
};

// wenn rueckfrage_lr_loeschen_ja geklickt wird
window.adb.handleRückfrageLrLöschenJaClick = function() {
	'use strict';
	// zuerst die id des Objekts holen
	var uri = new Uri($(location).attr('href')),
		id = uri.getQueryParamValue('id'),
		hash = uri.anchor();
	// wenn browser history nicht unterstützt, erstellt history.js eine hash
	// dann muss die id durch die id in der hash ersetzt werden
	if (hash) {
		var uri2 = new Uri(hash);
		id = uri2.getQueryParamValue('id');
	}
	// Objekt selbst inkl. aller hierarchisch darunter liegende Objekte ermitteln und löschen
	var $db = $.couch.db("artendb");
	$db.view('artendb/hierarchie?key="' + id + '"&include_docs=true', {
		success: function(data) {
			// daraus einen Array von docs machen
			var doc_array = _.map(data.rows, function(row) {
				return row.doc;
			});
			// und diese Dokumente nun löschen
			window.adb.löscheMassenMitObjektArray(doc_array);
			// vorigen node ermitteln
			var voriger_node = $.jstree._reference("#" + id)._get_prev("#" + id);
			// node des gelöschten LR entfernen
			$.jstree._reference("#" + id).delete_node("#" + id);
			// vorigen node öffnen
			if (voriger_node) {
				$.jstree._reference(voriger_node).select_node(voriger_node);
			} else {
				window.adb.öffneGruppe("Lebensräume");
			}
		}
	});
};

// Wenn #art .Lebensräume.Taxonomie .controls geändert wird
window.adb.handleLrTaxonomieControlsChange = function() {
	'use strict';
	window.adb.speichern($(this).val(), this.id, $(this).attr('dsName'), $(this).attr('dsTyp'));
};

// wenn .Lebensräume.Taxonomie geöffnet wird
window.adb.handlePanelbodyLrTaxonomieShown = function() {
	'use strict';
	if (localStorage.lr_bearb == "true") {
		window.adb.bearbeiteLrTaxonomie();
	}
};

// wenn #exportieren_exportieren_collapse geöffnet wird
window.adb.handleExportierenExportierenCollapseShown = function() {
	'use strict';
    var that = this;
	// nur ausführen, wenn exportieren_exportieren_collapse offen ist
	// komischerweise wurde dieser Code immer ausgelöst, wenn bei Lebensräumen F5 gedrückt wurde!
	if ($("#exportieren_exportieren_collapse").is(":visible")) {
        if (window.adb.handleExportierenObjekteWählenCollapseShown(that)) {
            // Gruppe ist gewählt, weitermachen
            // Tabelle und Herunterladen-Schaltfläche ausblenden
            $("#exportieren_exportieren_tabelle").hide();
            $(".exportieren_exportieren_exportieren").hide();
            // filtert und baut danach die Vorschautabelle auf
            window.adb.filtereFürExport();
        }
	}
};

window.adb.handleExportierenObjekteWählenCollapseShown = function(that) {
	'use strict';
    var gruppen_gewählt = window.adb.fürExportGewählteGruppen();
    if (gruppen_gewählt.length === 0) {
        // keine Gruppe gewählt
        window.adb.erstelleListeFürFeldwahl();
        // und den panel schliessen
        $(that).collapse('hide');
        return false;
    } else {
        return true;
    }
};

// wenn #exportieren_objekte_Taxonomien_zusammenfassen geklickt wird
window.adb.handleExportierenObjekteTaxonomienZusammenfassenClick = function(that) {
	'use strict';
    var gruppe_ist_gewählt = false;
	if ($(that).hasClass("active")) {
		window.adb.fasseTaxonomienZusammen = false;
		$(that).html("Alle Taxonomien zusammenfassen");
	} else {
		window.adb.fasseTaxonomienZusammen = true;
		$(that).html("Taxonomien einzeln behandeln");
	}
	// Felder neu aufbauen, aber nur, wenn eine Gruppe gewählt ist
	$("#exportieren_objekte_waehlen_gruppen_collapse")
        .find(".exportieren_ds_objekte_waehlen_gruppe")
        .each(function() {
            if ($(that).prop('checked')) {
                gruppe_ist_gewählt = true;
            }
        });
	if (gruppe_ist_gewählt) {
		window.adb.erstelleListeFürFeldwahl();
	}
};

// wenn #exportieren_exportieren_exportieren geklickt wird
window.adb.handleExportierenExportierenExportierenClick = function() {
	'use strict';
	if (window.adb.isFileAPIAvailable()) {
		var exportstring = window.adb.erstelleExportString(window.adb.exportieren_objekte),
			blob = new Blob([exportstring], {type: "text/csv;charset=utf-8;"}),
			d = new Date(),
			month = d.getMonth()+1,
			day = d.getDate(),
			output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
		saveAs(blob, output + "_export.csv");
	}
};

// wenn .panel geöffnet wird
// Höhe der textareas an Textgrösse anpassen
window.adb.handlePanelShown = function() {
	'use strict';
	$(this).find('textarea').each(function() {
		window.adb.fitTextareaToContent(this.id);
	});
};

// wenn .LinkZuArtGleicherGruppe geklickt wird
window.adb.handleLinkZuArtGleicherGruppeClick = function(id) {
	'use strict';
    $(".suchen").val("");
	$("#tree" + window.adb.Gruppe)
        .jstree("clear_search")
	    .jstree("deselect_all")
	    .jstree("close_all", -1)
	    .jstree("select_node", "#" + id);
};

// wenn Fenstergrösse verändert wird
window.adb.handleResize = function() {
	'use strict';
	window.adb.setzeTreehöhe();
	// Höhe der Textareas korrigieren
	$('#forms').find('textarea').each(function() {
		window.adb.fitTextareaToContent(this.id);
	});
};

// wenn .anmelden_btn geklickt wird
window.adb.handleAnmeldenBtnClick = function(that) {
	'use strict';
	// es muss mitgegeben werden, woher die Anmeldung kam, damit die email aus dem richtigen Feld geholt werden kann
	var bs_ds = that.id.substring(that.id.length-2);
	if (bs_ds === "rt") {
		bs_ds = "art";
	}
	window.adb.meldeUserAn(bs_ds);
};

// wenn .Email keyup
window.adb.handleEmailKeyup = function() {
	'use strict';
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Emailhinweis").hide();
};

// wenn .Passwort keyup
window.adb.handlePasswortKeyup = function() {
	'use strict';
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Passworthinweis").hide();
};

// wenn .Passwort2 keyup
window.adb.handlePasswort2Keyup = function() {
	'use strict';
	//allfällig noch vorhandenen Hinweis ausblenden
	$(".Passworthinweis2").hide();
};

// wenn .konto_erstellen_btn geklickt wird
window.adb.handleKontoErstellenBtnClick = function(that) {
	'use strict';
	var bs_ds = that.id.substring(that.id.length-2);
	if (bs_ds === "rt") {
		bs_ds = "art";
	}
	$(".signup").show();
	$(".anmelden_btn").hide();
	$(".abmelden_btn").hide();
	$(".konto_erstellen_btn").hide();
	$(".konto_speichern_btn").show();
	$(".importieren_anmelden_fehler").hide();
	setTimeout(function() {
		$("#Email_" + bs_ds).focus();
	}, 50);  // need to use a timer so that .blur() can finish before you do .focus()
};

// wenn .konto_speichern_btn geklickt wird
window.adb.handleKontoSpeichernBtnClick = function(that) {
	'use strict';
	var bs_ds = that.id.substring(that.id.length-2);
	if (bs_ds === "rt") {
		bs_ds = "art";
	}
	if (window.adb.validiereSignup(bs_ds)) {
		window.adb.erstelleKonto(bs_ds);
		// Anmeldefenster zurücksetzen
		$(".signup").hide();
		$(".anmelden_btn").hide();
		$(".abmelden_btn").show();
		$(".konto_erstellen_btn").hide();
		$(".konto_speichern_btn").hide();
	}
};

// wenn .gruppe geklickt wird
window.adb.handleÖffneGruppeClick = function() {
	'use strict';
	window.adb.öffneGruppe($(this).attr("Gruppe"));
};

// wenn #DsFelder geändert wird
window.adb.handleDsFelderChange = function() {
	'use strict';
	window.adb.meldeErfolgVonIdIdentifikation("Ds");
};

// wenn #BsFelder geändert wird
window.adb.handleBsFelderChange = function() {
	'use strict';
	window.adb.meldeErfolgVonIdIdentifikation("Bs");
};

// wenn #DsId geändert wird
window.adb.handleDsIdChange = function() {
	'use strict';
	window.adb.meldeErfolgVonIdIdentifikation("Ds");
};

// wenn #BsId geändert wird
window.adb.handleBsIdChange = function() {
	'use strict';
	window.adb.meldeErfolgVonIdIdentifikation("Bs");
};

// wenn in textarea keyup oder focus
window.adb.handleTextareaKeyupFocus = function() {
	'use strict';
	window.adb.fitTextareaToContent(this.id);
};

// übernimmt eine Array mit Objekten
// und den div, in dem die Tabelle eingefügt werden soll
// plus einen div, in dem die Liste der Felder angzeigt wird (falls dieser div mitgeliefert wird)
// baut damit eine Tabelle auf und fügt sie in den übergebenen div ein
window.adb.erstelleTabelle = function(Datensätze, felder_div, tabellen_div) {
	'use strict';
	var html = "",
		Feldname = "",
		html_ds_felder_div = "",
        erste_10_ds,
        $tabellen_div = $("#"+tabellen_div);
	if (Datensätze.length > 10) {
		html += "Vorschau der ersten 10 von " + Datensätze.length + " Datensätzen:";
	} else if (Datensätze.length > 1) {
		html += "Vorschau der " + Datensätze.length + " Datensätze:";
	} else {
		html += "Vorschau des einzigen Datensatzes:";
	}
	// Tabelle initiieren
	html += '<div class="table-responsive"><table class="table table-bordered table-striped table-condensed table-hover">';
	// Titelzeile aufbauen
	// Zeile anlegen
	// gleichzeitig Feldliste für Formular anlegen
	if (felder_div) {
		if (felder_div === "DsFelder_div") {
			Feldname = "DsFelder";
		} else if (felder_div === "BsFelder_div") {
			Feldname = "BsFelder";
		}
	}
	html_ds_felder_div += '<label class="control-label" for="'+Feldname+'">Feld mit eindeutiger ID<br>in den Importdaten</label>';
	html_ds_felder_div += '<select multiple class="controls form-control input-sm" id="'+Feldname+'" style="height:' + ((Object.keys(Datensätze[0]).length*19)+9)  + 'px">';
	html += "<thead><tr>";

	// durch die Felder des ersten Datensatzes zirkeln
    _.each(Datensätze[0], function(feldwert, feldname) {
        // Spalte anlegen
        html += "<th>" + feldname + "</th>";
        // Option für Feldliste anfügen
        html_ds_felder_div += '<option value="' + feldname + '">' + feldname + '</option>';
    });
	// Titelzeile abschliessen
	html += "</tr></thead><tbody>";
	// Feldliste abschliessen
	html_ds_felder_div += '</select>';
	if (felder_div) {
		// nur, wenn ein felder_div übergeben wurde
		$("#"+felder_div).html(html_ds_felder_div);
	}

    // Tabellenzeilen aufbauen
	// nur die ersten 10 Datensätze anzeigen
    erste_10_ds = _.first(Datensätze, 10);

    _.each(erste_10_ds, function(datensatz) {
        // Zeile anlegen
        html += "<tr>";
        // durch die Felder zirkeln
        _.each(datensatz, function(feldwert, feldname) {
            // Spalte anlegen
            html += "<td>";
            if (feldwert === null) {
                // Null-Werte als leer anzeigen
                html += "";
            } else if (typeof feldwert === "object") {
                html += JSON.stringify(feldwert);
            } else if (feldwert || feldwert === 0) {
                html += feldwert;
            } else if (feldwert === false) {
                // dafür sogen, dass false auch angezeigt wird
                // ohne diese Zeile bleibt das Feld sonst leer
                html += feldwert;
            } else {
                // nullwerte als leerwerte (nicht) anzeigen
                html += "";
            }
            // Spalte abschliessen
            html += "</td>";
        });
        // Zeile abschliessen
        html += "</tr>";
    });

	// Tabelle abschliessen
	html += '</tbody></table></div>';
	// html in div einfügen
	$tabellen_div
        .html(html)
	    .css("margin-top", "20px")
        // sichtbar stellen
        .show();
    // fenster scrollen
    $('html, body').animate({
        scrollTop: $tabellen_div.offset().top
    }, 2000);
};

// erhält dbs = "Ds" oder "Bs"
window.adb.meldeErfolgVonIdIdentifikation = function(dbs) {
	'use strict';
    var $dbsFelderSelected = $("#"+dbs+"Felder option:selected"),
        $dbsIdSelected = $("#"+dbs+"Id option:selected"),
        ids_von_datensätzen = [],
        mehrfach_vorkommende_ids = [],
        ids_von_nicht_importierbaren_datensätzen = [];

	if ($dbsFelderSelected.length && $dbsIdSelected.length) {
		// beide ID's sind gewählt
		window.adb[dbs+"FelderId"] = $dbsFelderSelected.val();
		window.adb.DsId = $dbsIdSelected.val();
		window.adb[dbs+"Id"] = $dbsIdSelected.val();
		// das hier wird später noch für den Inmport gebraucht > globale Variable machen
		window.adb.ZuordbareDatensätze = [];
		$("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text")
            .alert()
            .html("Bitte warten, die Daten werden analysiert.<br>Das kann eine Weile dauern...")
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        $('html, body').animate({
            scrollTop: $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_collapse").offset().top
        }, 2000);

		// Dokumente aus der Gruppe der Datensätze holen
		// durch alle loopen. Dabei einen Array von Objekten bilden mit id und guid
		// kontrollieren, ob eine id mehr als einmal vorkommt
		var $db = $.couch.db("artendb");
		if (window.adb.DsId === "guid") {
			$db.view('artendb/all_docs', {
				success: function(data) {
                    var name_des_id_felds = window.adb[dbs+"FelderId"];
                    // durch die importierten Datensätze loopen
                    _.each(window.adb[dbs.toLowerCase()+"Datensätze"], function(import_datensatz) {
                        if (ids_von_datensätzen.indexOf(import_datensatz[name_des_id_felds]) === -1) {
                            // diese ID wurde noch nicht hinzugefügt > hinzufügen
                            ids_von_datensätzen.push(import_datensatz[name_des_id_felds]);
                            // prüfen, ob die ID zugeordnet werden kann
                            var zugehöriges_objekt = _.find(data.rows, function(objekt_row) {
                                return objekt_row.key === import_datensatz[name_des_id_felds];
                            });
                            if (zugehöriges_objekt) {
                                window.adb.ZuordbareDatensätze.push(import_datensatz[name_des_id_felds]);
                            } else {
                                // diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
                                ids_von_nicht_importierbaren_datensätzen.push(import_datensatz[name_des_id_felds]);
                            }
                        } else {
                            // diese ID wurden schon hinzugefügt > mehrfach!
                            mehrfach_vorkommende_ids.push(import_datensatz[name_des_id_felds]);
                        }
                    });
					window.adb.meldeErfolgVonIdIdentifikation_02(mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs);
				}
			});
		} else {
			$db.view('artendb/gruppe_id_taxonomieid?startkey=["' + window.adb.DsId + '"]&endkey=["' + window.adb.DsId + '",{},{}]', {
				success: function(data) {
                    var name_des_id_felds = window.adb[dbs+"FelderId"];
                    // durch die importierten Datensätze loopen
                    _.each(window.adb[dbs.toLowerCase()+"Datensätze"], function(import_datensatz) {
                        if (ids_von_datensätzen.indexOf(import_datensatz[name_des_id_felds]) === -1) {
                            // diese ID wurde noch nicht hinzugefügt > hinzufügen
                            ids_von_datensätzen.push(import_datensatz[name_des_id_felds]);
                            // prüfen, ob die ID zugeordnet werden kann
                            var zugehöriges_objekt = _.find(data.rows, function(objekt_row) {
                                return objekt_row.key[2] === import_datensatz[name_des_id_felds];
                            });
                            if (zugehöriges_objekt) {
                                var Objekt = {};
                                Objekt.Id = parseInt(import_datensatz[name_des_id_felds], 10);
                                Objekt.Guid = zugehöriges_objekt.key[1];
                                window.adb.ZuordbareDatensätze.push(Objekt);
                            } else {
                                // diese ID konnte nicht hinzugefügt werden. In die Liste der nicht hinzugefügten aufnehmen
                                ids_von_nicht_importierbaren_datensätzen.push(import_datensatz[name_des_id_felds]);
                            }
                        } else {
                            // diese ID wurden schon hinzugefügt > mehrfach!
                            mehrfach_vorkommende_ids.push(import_datensatz[name_des_id_felds]);
                        }
                    });
					window.adb.meldeErfolgVonIdIdentifikation_02(mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs);
				}
			});
		}
	}
};

window.adb.meldeErfolgVonIdIdentifikation_02 = function(mehrfach_vorkommende_ids, ids_von_datensätzen, ids_von_nicht_importierbaren_datensätzen, dbs) {
	'use strict';
    var $importieren_dbs_ids_identifizieren_hinweis_text = $("#importieren_"+dbs.toLowerCase()+"_ids_identifizieren_hinweis_text");
    $importieren_dbs_ids_identifizieren_hinweis_text.alert();
	// rückmelden: Falls mehrfache ID's, nur das rückmelden und abbrechen
	if (mehrfach_vorkommende_ids.length && dbs !== "Bs") {
		$importieren_dbs_ids_identifizieren_hinweis_text
            .html("Die folgenden ID's kommen mehrfach vor: " + mehrfach_vorkommende_ids + "<br>Bitte entfernen oder korrigieren Sie die entsprechenden Zeilen")
            .removeClass("alert-info")
            .removeClass("alert-success")
            .addClass("alert-danger");
	} else if (window.adb.ZuordbareDatensätze.length < ids_von_datensätzen.length) {
		// rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
        if (window.adb.ZuordbareDatensätze.length > 0) {
            // ein Teil der Datensätze kann importiert werden. Als Hinweis melden
            $importieren_dbs_ids_identifizieren_hinweis_text
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-info");
        } else {
            // keine Datensätze können importier werden. Als Misserfolg melden
            $importieren_dbs_ids_identifizieren_hinweis_text
                .removeClass("alert-info")
                .removeClass("alert-success")
                .addClass("alert-danger");
        }
		if (dbs === "Bs") {
			$importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + ids_von_datensätzen.length + " Arten:<br>Beziehungen von " + ids_von_datensätzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: Beziehungen von " + ids_von_nicht_importierbaren_datensätzen.length + " Arten mit den folgenden Werten im Feld \"" + window.adb[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + ids_von_nicht_importierbaren_datensätzen);
		} else {
			$importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + ids_von_datensätzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden<br>ACHTUNG: " + ids_von_nicht_importierbaren_datensätzen.length + " Datensätze mit den folgenden Werten im Feld \"" + window.adb[dbs+"FelderId"] + "\" können NICHT zugeordnet und importiert werden: " + ids_von_nicht_importierbaren_datensätzen);
		}
		$("#"+dbs+"Importieren").show();
		$("#"+dbs+"Entfernen").show();
	} else {
		// rückmelden: Total x Datensätze. y davon enthalten die gewählte ID. q davon können zugeordnet werden
		$importieren_dbs_ids_identifizieren_hinweis_text
            .removeClass("alert-info")
            .removeClass("alert-danger")
            .addClass("alert-success");
		if (dbs === "Bs") {
			$importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Beziehungen von " + ids_von_datensätzen.length + " Arten:<br>Beziehungen von " + ids_von_datensätzen.length + " Arten enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>Beziehungen von " + window.adb.ZuordbareDatensätze.length + " Arten können zugeordnet und importiert werden");
		} else {
			$importieren_dbs_ids_identifizieren_hinweis_text.html("Die Importtabelle enthält " + window.adb[dbs.toLowerCase()+"Datensätze"].length + " Datensätze:<br>" + ids_von_datensätzen.length + " enthalten einen Wert im Feld \"" + window.adb[dbs+"FelderId"] + "\"<br>" + window.adb.ZuordbareDatensätze.length + " können zugeordnet und importiert werden");
		}
		$("#"+dbs+"Importieren").show();
		$("#"+dbs+"Entfernen").show();
	}
    $importieren_dbs_ids_identifizieren_hinweis_text.show();
    $('html, body').animate({
        scrollTop: $("#importieren_" + dbs.toLowerCase() + "_ids_identifizieren_collapse").offset().top
    }, 2000);
};

// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung
window.adb.importiereDatensammlung = function() {
	'use strict';
	var datensammlung,
		anzahl_felder,
		anz_ds = window.adb.dsDatensätze.length,
        // Der Verlauf soll angezeigt werden, daher braucht es einen zähler
        anz_ds_importiert = 0,
		DsImportiert = $.Deferred(),
        $DsName = $("#DsName"),
        $DsBeschreibung = $("#DsBeschreibung"),
        nr,
        rückmeldung_intro,
        rückmeldung_links = "",
        rückmeldung,
        $DsDatenstand = $("#DsDatenstand"),
        $DsLink = $("#DsLink"),
        $DsUrsprungsDs = $("#DsUrsprungsDs"),
        $importieren_ds_import_ausfuehren_hinweis = $("#importieren_ds_import_ausfuehren_hinweis"),
        $importieren_ds_import_ausfuehren_hinweis_text = $("#importieren_ds_import_ausfuehren_hinweis_text"),
        erste_10_ids;
	// prüfen, ob ein DsName erfasst wurde. Wenn nicht: melden
	if (!$DsName.val()) {
		$("#meldung_individuell_label").html("Namen fehlt");
		$("#meldung_individuell_text").html("Bitte geben Sie der Datensammlung einen Namen");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		$DsName.focus();
		return false;
	}

    // changes feed einrichten
    // versucht, view als Filter zu verwenden, oder besser, den expliziten Filter dsimport mit dsname als Kriterium
    // Ergebnis: bei view kamen alle changes, auch design doc. Bei dsimport kam nichts.
    /*var changes_options = {};
    changes_options.dsname = $DsName.val();
    changes_options.filter = "artendb/dsimport";
    window.adb.queryChangesStartingNow();

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('longpoll-data', function(event, data) {
        anzDsImportiert = anzDsImportiert + data.results.length;
        var prozent = Math.round(anzDsImportiert/anzDs*100);
        $("#DsImportierenProgressbar").css('width', prozent +'%').attr('aria-valuenow', prozent);
        if (anzDsImportiert >= anzDs-1 && anzDsImportiert <= anzDs) {
            // Rückmeldung in Feld anzeigen:
            $importieren_ds_import_ausfuehren_hinweis.css('display', 'block');
        }
    });*/

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.ds_hinzugefügt', function() {
        anz_ds_importiert++;
        var prozent = Math.round(anz_ds_importiert/anz_ds*100),
            rückmeldung;
        $("#DsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#DsImportierenProgressbarText").html(prozent + "%");
        $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
        rückmeldung = "Die Daten wurden importiert.<br>Die Indexe werden aktualisiert...";
        $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
        }, 2000);
        if (anz_ds_importiert === anz_ds) {
            // die Indexe
            var $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass views aktualisiert wurden
                    $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-info").removeClass("alert-danger").addClass("alert-success");
                    rückmeldung = "Die Daten wurden importiert.<br>";
                    rückmeldung += "Die Indexe wurden aktualisiert.<br><br>";
                    rückmeldung += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                    $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung + rückmeldung_links);
                    // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                    window.adb.rückmeldung_links = rückmeldung_links;
                    $('html, body').animate({
                        scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
                    }, 2000);
                }
            });
        }
    });
    _.each(window.adb.dsDatensätze, function(ds_datensatz) {
        // Datensammlung als Objekt gründen
        datensammlung = {};
        datensammlung.Name = $DsName.val();
        if ($DsBeschreibung.val()) {
            datensammlung.Beschreibung = $DsBeschreibung.val();
        }
        if ($DsDatenstand.val()) {
            datensammlung.Datenstand = $DsDatenstand.val();
        }
        if ($DsLink.val()) {
            datensammlung.Link = $DsLink.val();
        }
        // falls die Datensammlung zusammenfassend ist
        if ($("#DsZusammenfassend").prop('checked')) {
            datensammlung.zusammenfassend = true;
        }
        if ($DsUrsprungsDs.val()) {
            datensammlung.Ursprungsdatensammlung = $DsUrsprungsDs.val();
        }
        datensammlung["importiert von"] = localStorage.Email;
        // Felder der Datensammlung als Objekt gründen
        datensammlung.Eigenschaften = {};
        // Felder anfügen, wenn sie Werte enthalten
        anzahl_felder = 0;
        _.each(ds_datensatz, function(feldwert, feldname) {
            // nicht importiert wird die ID und leere Felder
            // und keine Taxonomie ID, wenn sie nur wegen der Identifikation mitgeliefert wurde
            //if (feldname !== window.adb.DsFelderId && feldwert !== "" && feldwert !== null && (window.adb.DsId !== "guid" && feldname !== "Taxonomie ID")) {
            if (feldname !== window.adb.DsFelderId && feldwert !== "" && feldwert !== null) {
                if (feldwert === -1) {
                    // Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
                    datensammlung.Eigenschaften[feldname] = true;
                } else if (feldwert == "true") {
                    // true/false nicht als string importieren
                    datensammlung.Eigenschaften[feldname] = true;
                } else if (feldwert == "false") {
                    datensammlung.Eigenschaften[feldname] = false;
                } else if (feldwert == parseInt(feldwert, 10)) {
                    // Ganzzahlen als Zahlen importieren
                    datensammlung.Eigenschaften[feldname] = parseInt(feldwert, 10);
                } else if (feldwert == parseFloat(feldwert)) {
                    // Bruchzahlen als Zahlen importieren
                    datensammlung.Eigenschaften[feldname] = parseFloat(feldwert);
                } else {
                    // Normalfall
                    datensammlung.Eigenschaften[feldname] = feldwert;
                }
                anzahl_felder += 1;
            }
        });
        // entsprechenden Index öffnen
        // sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
        if (anzahl_felder > 0) {
            // Datenbankabfrage ist langsam. Extern aufrufen,
            // sonst überholt die for-Schlaufe und Datensammlung ist bis zur saveDoc-Ausführung eine andere!
            var guid;
            if (window.adb.DsId === "guid") {
                // die in der Tabelle mitgelieferte id ist die guid
                guid = ds_datensatz[window.adb.DsFelderId];
            } else {
                var ds_datensatz_mit_richtiger_id = _.find(window.adb.ZuordbareDatensätze, function(datensatz) {
                    return datensatz.Id == ds_datensatz[window.adb.DsFelderId];
                });
                guid = ds_datensatz_mit_richtiger_id.Guid;
            }
            // kann sein, dass der guid oben nicht zugeordnet werden konnte. Dann nicht anfügen
            if (guid) {
                console.log("füge ds zu objekt");
                window.adb.fügeDatensammlungZuObjekt(guid, datensammlung);
            }
        }
    });
    // Für 10 Kontrollbeispiele die Links aufbauen
    if (window.adb.DsId === "guid") {
        erste_10_ids = _.first(window.adb.ZuordbareDatensätze, 10);
    } else {
        erste_10_ids = _.pluck(_.first(window.adb.ZuordbareDatensätze, 10), "Guid");
    }
    _.each(erste_10_ids, function(id, index) {
        nr = index + 1;
        rückmeldung_links += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
    });

    // Rückmeldung in Feld anzeigen
    $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
    rückmeldung = "Die Daten werden importiert...";
	$importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
    $importieren_ds_import_ausfuehren_hinweis.css('display', 'block');
    $('html, body').animate({
        scrollTop: $importieren_ds_import_ausfuehren_hinweis.offset().top
    }, 2000);
	DsImportiert.resolve();
};

// wird momentan nicht benutzt
window.adb.queryChangesStartingNow = function(options) {
	'use strict';
    options = options || {};
    options.since = "now";
    if (options.filter) {
        // der Filter bremst die Abfrage - das ist schlecht, weil dann bereits DS aktualisiert wurden!
        // daher für die Erstabfrage entfernen
        var filter = options.filter;
        var dsname = options.dsname;
        delete options.view;
        delete options.dsname;
    }
    $.ajax({
        type: "get",
        url: "/artendb/_changes",
        dataType: "json",
        data: options
    })
    .done(function(data) {
        $(document).trigger('longpoll-data', data, data.last_seq);
        options.feed = "longpoll";
        options.since = data.last_seq;
        if (filter) {
            options.filter = filter;
            options.dsname = dsname;
        }
        $.ajax({
            type: "get",
            url: "/artendb/_changes",
            dataType: "json",
            data: options
        })
        .done(function(data2) {
            if (data2.results.length > 0 ) {
                $(document).trigger('longpoll-data2', data2);
            }
            options.since = data2.last_seq;
            // dafür sorgen, dass weiter beobachtet wird
            window.adb.queryChanges(options);
        });
    });
};

// wird momentan nicht benutzt
window.adb.queryChanges = function(options) {
	'use strict';
    options = options || {};
    options.since = options.since || "now";
    options.feed = options.feed || "longpoll";
    $.ajax({
        type: "get",
        url: "/artendb/_changes",
        dataType: "json",
        data: options
    })
    .done(function(data) {
        if (data.results.length > 0 ) {
            $(document).trigger('longpoll-data', data);
        }
        options.since = data.last_seq;
        window.adb.queryChanges(options);
    });
};

// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber die in den Feldern erfassten Infos der Datensammlung
window.adb.importiereBeziehungssammlung = function() {
	'use strict';
	var anzahl_felder,
		anzahl_beziehungssammlungen = window.adb.bsDatensätze.length,
        anz_bs_importiert = 0,
        erste_10_ids,
        nr,
        rückmeldung,
        rückmeldung_intro,
        rückmeldung_links = "",
		bs_importiert = $.Deferred(),
        $BsName = $("#BsName"),
        $BsBeschreibung = $("#BsBeschreibung"),
        $BsDatenstand = $("#BsDatenstand"),
        $BsLink = $("#BsLink"),
        $BsUrsprungsBs = $("#BsUrsprungsBs"),
        $importieren_bs_import_ausfuehren_hinweis = $("#importieren_bs_import_ausfuehren_hinweis"),
        $importieren_bs_import_ausfuehren_hinweis_text = $("#importieren_bs_import_ausfuehren_hinweis_text");
	// prüfen, ob ein BsName erfasst wurde. Wenn nicht: melden
	if (!$BsName.val()) {
		$("#meldung_individuell_label").html("Namen fehlt");
		$("#meldung_individuell_text").html("Bitte geben Sie der Beziehungssammlung einen Namen");
		$("#meldung_individuell_schliessen").html("schliessen");
		$('#meldung_individuell').modal();
		$BsName.focus();
		return false;
	}

	// Rückmeldung in Feld anzeigen:
    rückmeldung = "Die Daten werden importiert...";
    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
    $importieren_bs_import_ausfuehren_hinweis
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info");
    $importieren_bs_import_ausfuehren_hinweis.alert().show();
    $('html, body').animate({
        scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
    }, 2000);

    // listener einrichten, der meldet, wenn ein Datensatz aktualisiert wurde
    $(document).bind('adb.bs_hinzugefügt', function() {
        anz_bs_importiert++;
        var prozent = Math.round(anz_bs_importiert/anzahl_beziehungssammlungen*100);
        $("#BsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#BsImportierenProgressbarText").html(prozent + "%");
        $importieren_bs_import_ausfuehren_hinweis
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .show();
        rückmeldung = "Die Daten werden importiert...<br>Die Indexe werden aktualisiert...";
        $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
        }, 2000);
        if (anz_bs_importiert === anzahl_beziehungssammlungen) {
            // Indices aktualisieren
            var $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass Indexe aktualisiert wurden
                    $importieren_bs_import_ausfuehren_hinweis
                        .removeClass("alert-info")
                        .removeClass("alert-danger")
                        .addClass("alert-success")
                        .show();
                    rückmeldung = "Die Daten wurden importiert.<br>";
                    rückmeldung += "Die Indexe wurden neu aufgebaut.<br><br>";
                    rückmeldung += "Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung + rückmeldung_links);
                    // Rückmeldungs-links behalten, falls der Benutzer direkt anschliessend entfernt
                    window.adb.rückmeldung_links = rückmeldung_links;
                    $('html, body').animate({
                        scrollTop: $importieren_bs_import_ausfuehren_hinweis.offset().top
                    }, 2000);
                }
            });
        }
    });

	// zuerst: Veranlassen, dass die Beziehungspartner in window.adb.bsDatensätze in einen Array der richtigen Form umgewandelt werden
	$.when(window.adb.bereiteBeziehungspartnerFürImportVor())
		.then(function() {
			setTimeout(function() {
				anzahl_beziehungssammlungen = 0;
				var beziehungssammlung,
                    beziehungssammlung_vorlage = {};
				beziehungssammlung_vorlage.Name = $BsName.val();
				if ($BsBeschreibung.val()) {
					beziehungssammlung_vorlage.Beschreibung = $BsBeschreibung.val();
				}
				if ($BsDatenstand.val()) {
					beziehungssammlung_vorlage.Datenstand = $BsDatenstand.val();
				}
				if ($BsLink.val()) {
					beziehungssammlung_vorlage.Link = $BsLink.val();
				}
				// falls die Datensammlung zusammenfassend ist
				if ($("#BsZusammenfassend").prop('checked')) {
					beziehungssammlung_vorlage.zusammenfassend = true;
				}
				if ($BsUrsprungsBs.val()) {
					beziehungssammlung_vorlage.Ursprungsdatensammlung = $BsUrsprungsBs.val();
				}
				beziehungssammlung_vorlage["importiert von"] = localStorage.Email;
				beziehungssammlung_vorlage.Beziehungen = [];
				// zunächst den Array von Objekten in ein Objekt mit Eigenschaften = ObjektGuid und darin Array mit allen übrigen Daten verwandeln
				var bs_datensätze_objekt = _.groupBy(window.adb.bsDatensätze, function(objekt) {
					// id in guid umwandeln
					var guid;
					if (window.adb.BsId === "guid") {
						// die in der Tabelle mitgelieferte id ist die guid
						guid = objekt[window.adb.BsFelderId];
					} else {
						for (var q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
							// in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
							if (window.adb.ZuordbareDatensätze[q].Id == objekt[window.adb.BsFelderId]) {
								// und die guid auslesen
								guid = window.adb.ZuordbareDatensätze[q].Guid;
								break;
							}
						}
					}
					objekt.GUID = guid;
					return objekt.GUID;
				});
				// jetzt durch die GUID's loopen und die jeweiligen Beziehungen anhängen
				$.each(bs_datensätze_objekt, function(importdaten_objekt_id, importdaten_felder_array) {
					var beziehungen = [];
					anzahl_beziehungssammlungen += 1;
					// Beziehungssammlung als Objekt gründen, indem die Vorlage kopiert wird
					beziehungssammlung = jQuery.extend(true, {}, beziehungssammlung_vorlage);
                    _.each(importdaten_felder_array, function(importdaten_feld) {
                        // durch die Felder der Beziehungen loopen
                        anzahl_felder = 0;
                        // Felder der Beziehungssammlung als Objekt gründen
                        var beziehung = {};
                        _.each(importdaten_feld, function(feldwert, feldname) {
                            // durch die Felder der Beziehung loopen
                            // nicht importiert wird die GUID und leere Felder
                            if (feldname !== "GUID" && feldwert !== "" && feldwert !== null) {
                                if (feldwert === -1) {
                                    // Access macht in Abfragen mit Wenn-Klausel aus true -1 > korrigieren
                                    beziehung[feldname] = true;
                                } else if (feldwert == "true") {
                                    // true/false nicht als string importieren
                                    beziehung[feldname] = true;
                                } else if (feldwert == "false") {
                                    beziehung[feldname] = false;
                                } else if (feldwert == parseInt(feldwert, 10)) {
                                    // Ganzzahlen als Zahlen importieren
                                    beziehung[feldname] = parseInt(feldwert, 10);
                                } else if (feldwert == parseFloat(feldwert)) {
                                    // Bruchzahlen als Zahlen importieren
                                    beziehung[feldname] = parseFloat(feldwert);
                                } else if (feldname == "Beziehungspartner") {
                                    beziehung[feldname] = [];
                                    // durch Beziehungspartner loopen und GUIDS mit Objekten ersetzen
                                    _.each(feldwert, function(beziehungspartner_feld) {
                                        beziehung[feldname].push(window.adb.bezPartner_objekt[beziehungspartner_feld]);
                                    });
                                } else {
                                    // Normalfall
                                    beziehung[feldname] = feldwert;
                                }
                                anzahl_felder++;
                            }
                        });
                        if (anzahl_felder > 0) {
                            beziehungen.push(beziehung);
                        }
                    });
					// entsprechenden Index öffnen
					// sicherstellen, dass Daten vorkommen. Gibt sonst einen Fehler
					if (beziehungen.length > 0) {
						// Datenbankabfrage ist langsam. Extern aufrufen, 
						// sonst überholt die for-Schlaufe und Beziehungssammlung ist bis zur saveDoc-Ausführung eine andere!
						window.adb.fügeBeziehungenZuObjekt(importdaten_objekt_id, beziehungssammlung, beziehungen);
					}
				});

                // Für 10 Kontrollbeispiele die Links aufbauen
                if (window.adb.BsId === "guid") {
                    erste_10_ids = _.first(window.adb.ZuordbareDatensätze, 10);
                } else {
                    erste_10_ids = _.pluck(_.first(window.adb.ZuordbareDatensätze, 10), "Guid");
                }
                _.each(erste_10_ids, function(id, index) {
                    nr = index +1;
                    rückmeldung_links += '<a href="' + $(location).attr("protocol") + '//' + $(location).attr("host") + $(location).attr("pathname") + '?id=' + id + '"  target="_blank">Beispiel ' + nr + '</a><br>';
                });
				bs_importiert.resolve();
			}, 1000);
		});
	return bs_importiert.promise();
};

window.adb.bereiteBeziehungspartnerFürImportVor = function() {
	'use strict';
	var alle_bez_partner_array = [],
		bez_partner_array,
		beziehungspartner_vorbereitet = $.Deferred();
	window.adb.bezPartner_objekt = {};

    _.each(window.adb.bsDatensätze, function(bs_datensatz) {
        if (bs_datensatz.Beziehungspartner) {
            // bs_datensatz.Beziehungspartner ist eine kommagetrennte Liste von guids
            // diese Liste in Array verwandeln
            bez_partner_array = bs_datensatz.Beziehungspartner.split(", ");
            // und in window.adb.bsDatensätze nachführen
            bs_datensatz.Beziehungspartner = bez_partner_array;
            // und vollständige Liste aller Beziehungspartner nachführen
            alle_bez_partner_array = _.union(alle_bez_partner_array, bez_partner_array);
        }
    });
	// jetzt wollen wir ein Objekt bauen, das für alle Beziehungspartner das auszutauschende Objekt enthält
	// danach für jede guid Gruppe, Taxonomie (bei LR) und Name holen und ein Objekt draus machen
	var $db = $.couch.db("artendb");
	$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(alle_bez_partner_array)) + '&include_docs=true', {
		success: function(data) {
			var objekt;
			var bez_partner;
            _.each(data.rows, function(data_row) {
                objekt = data_row.doc;
                bez_partner = {};
                bez_partner.Gruppe = objekt.Gruppe;
                if (objekt.Gruppe === "Lebensräume") {
                    bez_partner.Taxonomie = objekt.Taxonomie.Eigenschaften.Taxonomie;
                    if (objekt.Taxonomie.Eigenschaften.Taxonomie.Label) {
                        bez_partner.Name = objekt.Taxonomie.Eigenschaften.Label + ": " + objekt.Taxonomie.Eigenschaften.Taxonomie.Einheit;
                    } else {
                        bez_partner.Name = objekt.Taxonomie.Eigenschaften.Einheit;
                    }
                } else {
                    bez_partner.Name = objekt.Taxonomie.Eigenschaften["Artname vollständig"];
                }
                bez_partner.GUID = objekt._id;
                window.adb.bezPartner_objekt[objekt._id] = bez_partner;
            });
		}
	});
	beziehungspartner_vorbereitet.resolve();
	return beziehungspartner_vorbereitet.promise();
};

// bekommt das Objekt mit den Datensätzen (window.adb.dsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Datensammlung
window.adb.entferneDatensammlung = function() {
	'use strict';
	var guid_array = [],
        guid_array_2 = [],
		guid,
		ds_entfernt = $.Deferred(),
		a,
		batch,
		batch_grösse,
        anz_vorkommen_von_ds = window.adb.ZuordbareDatensätze.length,
        anz_vorkommen_von_ds_entfernt = 0,
        rückmeldung,
        $importieren_ds_import_ausfuehren_hinweis_text = $("#importieren_ds_import_ausfuehren_hinweis_text"),
        $importieren_ds_import_ausfuehren_hinweis = $("#importieren_ds_import_ausfuehren_hinweis");

    // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
    $(document).bind('adb.ds_entfernt', function() {
        anz_vorkommen_von_ds_entfernt++;
        var prozent = Math.round((anz_vorkommen_von_ds-anz_vorkommen_von_ds_entfernt)/anz_vorkommen_von_ds*100);
        $("#DsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#DsImportierenProgressbarText").html(prozent + "%");
        $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-success").removeClass("alert-danger").addClass("alert-info");
        rückmeldung = "Eigenschaftensammlungen werden entfernt...<br>Die Indexe werden neu aufgebaut...";
        $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
        $('html, body').animate({
            scrollTop: $importieren_ds_import_ausfuehren_hinweis_text.offset().top
        }, 2000);
        if (anz_vorkommen_von_ds_entfernt === anz_vorkommen_von_ds) {
            // die Indexe aktualisieren
            var $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass Indexe aktualisiert wurden
                    $importieren_ds_import_ausfuehren_hinweis.removeClass("alert-info").removeClass("alert-danger").addClass("alert-success");
                    rückmeldung = "Die Eigenschaftensammlungen wurden entfernt.<br>";
                    rückmeldung += "Die Indexe wurden aktualisiert.";
                    if (window.adb.rückmeldung_links) {
                        rückmeldung += "<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                        rückmeldung += window.adb.rückmeldung_links;
                        delete window.adb.rückmeldung_links;
                    }
                    $importieren_ds_import_ausfuehren_hinweis_text.html(rückmeldung);
                    $('html, body').animate({
                        scrollTop: $importieren_ds_import_ausfuehren_hinweis_text.offset().top
                    }, 2000);
                }
            });
        }
    });

    _.each(window.adb.dsDatensätze, function(datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.DsId === "guid") {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = datensatz.GUID;
        } else {
            // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
            // und die guid auslesen
            guid = _.find(window.adb.ZuordbareDatensätze, function(datensatz) {
                return datensatz.Id == datensatz[window.adb.DsFelderId];
            }).Guid;
            /* TODO: löschen, wenn obiger Code getestet ist
            for (q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
                // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                if (window.adb.ZuordbareDatensätze[q].Id == datensatz[window.adb.DsFelderId]) {
                    // und die guid auslesen
                    guid = window.adb.ZuordbareDatensätze[q].Guid;
                    break;
                }
            }*/
        }
        // Einen Array der id's erstellen
        guid_array.push(guid);
    });
	// alle docs gleichzeitig holen
	// aber batchweise
	batch = 150;
	batch_grösse = 150;
	for (a=0; a<batch; a++) {
		if (a < guid_array.length) {
			guid_array_2.push(guid_array[a]);
			if (a === (batch-1)) {
				window.adb.entferneDatensammlung_2($("#DsName").val(), guid_array_2, (a-batch_grösse));
				guid_array_2 = [];
				batch += batch_grösse;
			}
		} else {
			window.adb.entferneDatensammlung_2($("#DsName").val(), guid_array_2, (a - batch_grösse));
			break;
		}
	}
	return ds_entfernt.promise();
};

window.adb.entferneDatensammlung_2 = function(ds_name, guid_array, verzögerungs_faktor) {
	'use strict';
	// alle docs holen
	setTimeout(function() {
		var $db = $.couch.db("artendb");
		$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guid_array)) + '&include_docs=true', {
			success: function(data) {
				var Objekt;
                _.each(data.rows, function(data_row) {
                    Objekt = data_row.doc;
                    window.adb.entferneDatensammlungAusObjekt(ds_name, Objekt);
                });
			}
		});
	}, verzögerungs_faktor*40);
};

window.adb.entferneDatensammlungAusObjekt = function(ds_name, objekt) {
	'use strict';
	if (objekt.Eigenschaftensammlungen && objekt.Eigenschaftensammlungen.length > 0) {
        /* hat nicht funktioniert
        var datensammlung = _.find(objekt.Eigenschaftensammlungen, function(datensammlung) {
            return datensammlung.Name === ds_name;
        });
        objekt.Eigenschaftensammlungen = _.without(Objekt.Eigenschaftensammlungen, datensammlung);
        $db = $.couch.db("artendb");
        $db.saveDoc(objekt);*/
		for (var i=0; i<objekt.Eigenschaftensammlungen.length; i++) {
			if (objekt.Eigenschaftensammlungen[i].Name === ds_name) {
				objekt.Eigenschaftensammlungen.splice(i,1);
				var $db = $.couch.db("artendb");
				$db.saveDoc(objekt);
                // mitteilen, dass eine ds entfernt wurde
                $(document).trigger('adb.ds_entfernt');
                // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
				break;
			}
		}
	}
};

// bekommt das Objekt mit den Datensätzen (window.adb.bsDatensätze) und die Liste der zu aktualisierenden Datensätze (window.adb.ZuordbareDatensätze)
// holt sich selber den in den Feldern erfassten Namen der Beziehungssammlung
window.adb.entferneBeziehungssammlung = function() {
	'use strict';
	var guid_array = [],
        guid_array_2 = [],
		guid,
		bs_name = $("#BsName").val(),
		bs_entfernt = $.Deferred(),
		q,
		a,
		batch = 150,
		batch_grösse = 150,
        anz_vorkommen_von_bs_entfernt = 0,
        anz_vorkommen_von_bs = window.adb.ZuordbareDatensätze.length,
        rückmeldung,
        $importieren_bs_import_ausfuehren_hinweis = $("#importieren_bs_import_ausfuehren_hinweis"),
        $importieren_bs_import_ausfuehren_hinweis_text = $("#importieren_bs_import_ausfuehren_hinweis_text");

    // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
    $(document).bind('adb.bs_entfernt', function() {
        anz_vorkommen_von_bs_entfernt++;
        var prozent = Math.round((anz_vorkommen_von_bs-anz_vorkommen_von_bs_entfernt)/anz_vorkommen_von_bs*100);
        $("#BsImportierenProgressbar")
            .css('width', prozent +'%')
            .attr('aria-valuenow', prozent);
        $("#BsImportierenProgressbarText").html(prozent + "%");

        if (anz_vorkommen_von_bs_entfernt === anz_vorkommen_von_bs) {
            // die Indexe aktualisieren
            var $db = $.couch.db("artendb");
            $db.view('artendb/lr', {
                success: function() {
                    // melden, dass Indexe aktualisiert wurden
                    $importieren_bs_import_ausfuehren_hinweis
                        .removeClass("alert-info")
                        .removeClass("alert-danger")
                        .addClass("alert-success");
                    rückmeldung = "Die Beziehungssammlungen wurden entfernt.<br>";
                    rückmeldung += "Die Indexe wurden aktualisiert.";
                    if (window.adb.rückmeldung_links) {
                        rückmeldung += "<br><br>Nachfolgend Links zu Objekten mit importierten Daten, damit Sie das Resultat überprüfen können:<br>";
                        rückmeldung += window.adb.rückmeldung_links;
                        delete window.adb.rückmeldung_links;
                    }
                    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
                    $('html, body').animate({
                        scrollTop: $importieren_bs_import_ausfuehren_hinweis_text.offset().top
                    }, 2000);
                }
            });
        }
    });

    // rückmelden, dass es passiert
    $importieren_bs_import_ausfuehren_hinweis
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info");
    rückmeldung = "Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...";
    $importieren_bs_import_ausfuehren_hinweis_text.html(rückmeldung);
    $('html, body').animate({
        scrollTop: $importieren_bs_import_ausfuehren_hinweis_text.offset().top
    }, 2000);

    _.each(window.adb.bsDatensätze, function(bs_datensatz) {
        // zuerst die id in guid übersetzen
        if (window.adb.BsId === "guid") {
            // die in der Tabelle mitgelieferte id ist die guid
            guid = bs_datensatz.GUID;
        } else {
            for (q = 0; q < window.adb.ZuordbareDatensätze.length; q++) {
                // in den zuordbaren Datensätzen nach dem Objekt mit der richtigen id suchen
                if (window.adb.ZuordbareDatensätze[q].Id == bs_datensatz[window.adb.BsFelderId]) {
                    // und die guid auslesen
                    guid = window.adb.ZuordbareDatensätze[q].Guid;
                    break;
                }
            }
        }
        // Einen Array der id's erstellen
        guid_array.push(guid);
    });

	// guid_array auf die eindeutigen guids reduzieren
	guid_array = _.union(guid_array);

	// alle docs gleichzeitig holen
	// aber batchweise
	for (a=0; a<batch; a++) {
		if (a < guid_array.length) {
			guid_array_2.push(guid_array[a]);
			if (a === (batch-1)) {
				window.adb.entferneBeziehungssammlung_2(bs_name, guid_array_2, (a-batch_grösse));
				guid_array_2 = [];
				batch += batch_grösse;
			}
		} else {
			window.adb.entferneBeziehungssammlung_2(bs_name, guid_array_2, (a-batch_grösse));
			bs_entfernt.resolve();
			break;
		}
		// RückmeldungsLinks in Feld anzeigen:
        $importieren_bs_import_ausfuehren_hinweis
            .removeClass("alert-success")
            .removeClass("alert-danger")
            .addClass("alert-info")
            .css('display', 'block');
        $importieren_bs_import_ausfuehren_hinweis_text.html("Die Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...");
	}
	return bs_entfernt.promise();
};

window.adb.entferneBeziehungssammlung_2 = function(bs_name, guid_array, verzögerungs_faktor) {
	'use strict';
	// alle docs holen
	setTimeout(function() {
		var $db = $.couch.db("artendb");
		$db.view('artendb/all_docs?keys=' + encodeURI(JSON.stringify(guid_array)) + '&include_docs=true', {
			success: function(data) {
				var objekt,
					f;
                _.each(data.rows, function(data_row) {
                    objekt = data_row.doc;
                    window.adb.entferneBeziehungssammlungAusObjekt(bs_name, objekt);
                });
			}
		});
	}, verzögerungs_faktor*40);
};

window.adb.entferneBeziehungssammlungAusObjekt = function(bs_name, objekt) {
	'use strict';
	if (objekt.Beziehungssammlungen && objekt.Beziehungssammlungen.length > 0) {
		for (var i=0; i<objekt.Beziehungssammlungen.length; i++) {
			if (objekt.Beziehungssammlungen[i].Name === bs_name) {
				objekt.Beziehungssammlungen.splice(i,1);
				var $db = $.couch.db("artendb");
				$db.saveDoc(objekt);
                // mitteilen, dass eine bs entfernt wurde
                $(document).trigger('adb.bs_entfernt');
				break;
			}
		}
	}
};

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
window.adb.fügeDatensammlungZuObjekt = function(guid, datensammlung) {
	'use strict';
	var $db = $.couch.db("artendb");
	$db.openDoc(guid, {
		success: function(doc) {
			// sicherstellen, dass Eigenschaftensammlung existiert
			if (!doc.Eigenschaftensammlungen) {
				doc.Eigenschaftensammlungen = [];
			}
			// falls dieselbe Datensammlung schon existierte: löschen
			// trifft z.B. zu bei zusammenfassenden
			doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function(es) {
				return es.Name === datensammlung.Name;
			});
			// Datensammlung anfügen
			doc.Eigenschaftensammlungen.push(datensammlung);
			// sortieren
			// Eigenschaftensammlungen nach Name sortieren
			doc.Eigenschaftensammlungen = window.adb.sortiereObjektarrayNachName(doc.Eigenschaftensammlungen);
			// in artendb speichern
			$db.saveDoc(doc);
            // mitteilen, dass ein ds importiert wurde
            $(document).trigger('adb.ds_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.ds_nicht_hinzugefügt)
		}
	});
};

// fügt der Art eine Datensammlung hinzu
// wenn dieselbe schon vorkommt, wird sie überschrieben
window.adb.fügeBeziehungenZuObjekt = function(guid, beziehungssammlung, beziehungen) {
	'use strict';
	var $db = $.couch.db("artendb");
	$db.openDoc(guid, {
		success: function(doc) {
			// prüfen, ob die Beziehung schon existiert
			if (doc.Beziehungssammlungen && doc.Beziehungssammlungen.length > 0) {
				var hinzugefügt = false,
					i,
					h;
				for (i in doc.Beziehungssammlungen) {
					if (doc.Beziehungssammlungen[i].Name === beziehungssammlung.Name) {
						for (h=0; h<beziehungen.length; h++) {
							if (!_.contains(doc.Beziehungssammlungen[i].Beziehungen, beziehungen[h])) {
								doc.Beziehungssammlungen[i].Beziehungen.push(beziehungen[h]);
							}
						}
						// Beziehungen nach Name sortieren
						doc.Beziehungssammlungen[i].Beziehungen = window.adb.sortiereBeziehungenNachName(doc.Beziehungssammlungen[i].Beziehungen);
						hinzugefügt = true;
						break;
					}
				}
				if (!hinzugefügt) {
					// die Beziehungssammlung existiert noch nicht
					beziehungssammlung.Beziehungen = [];
                    _.each(beziehungen, function(beziehung) {
                        beziehungssammlung.Beziehungen.push(beziehung);
                    });
					// Beziehungen nach Name sortieren
					beziehungssammlung.Beziehungen = window.adb.sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);
					doc.Beziehungssammlungen.push(beziehungssammlung);
				}
			} else {
				// Beziehungssammlung anfügen
				beziehungssammlung.Beziehungen = [];
                _.each(beziehungen, function(beziehung) {
                    beziehungssammlung.Beziehungen.push(beziehung);
                });
				// Beziehungen nach Name sortieren
				beziehungssammlung.Beziehungen = window.adb.sortiereBeziehungenNachName(beziehungssammlung.Beziehungen);
				doc.Beziehungssammlungen = [];
				doc.Beziehungssammlungen.push(beziehungssammlung);
			}
			// Beziehungssammlungen nach Name sortieren
			doc.Beziehungssammlungen = window.adb.sortiereObjektarrayNachName(doc.Beziehungssammlungen);
			// in artendb speichern
			$db.saveDoc(doc);
            // mitteilen, dass eine bs importiert wurde
            $(document).trigger('adb.bs_hinzugefügt');
            // TODO: Scheitern des Speicherns abfangen (trigger adb.bs_nicht_hinzugefügt)
		}
	});
};

// übernimmt den Namen einer Datensammlung
// öffnet alle Dokumente, die diese Datensammlung enthalten und löscht die Datensammlung
window.adb.entferneDatensammlungAusAllenObjekten = function(ds_name) {
	'use strict';
	var ds_entfernt = $.Deferred(),
        anz_vorkommen_von_ds,
        anz_vorkommen_von_ds_entfernt = 0,
        $importieren_ds_ds_beschreiben_hinweis = $("#importieren_ds_ds_beschreiben_hinweis"),
        $db = $.couch.db("artendb"),
        rückmeldung;
	$db.view('artendb/ds_guid?startkey=["' + ds_name + '"]&endkey=["' + ds_name + '",{}]', {
		success: function(data) {
            anz_vorkommen_von_ds = data.rows.length;

            // listener einrichten, der meldet, wenn ei Datensatz entfernt wurde
            $(document).bind('adb.ds_entfernt', function() {
                anz_vorkommen_von_ds_entfernt++;
                rückmeldung = "Eigenschaftensammlungen werden entfernt...<br>Die Indexe werden aktualisiert...";
                $importieren_ds_ds_beschreiben_hinweis
                    .removeClass("alert-success").removeClass("alert-danger").addClass("alert-info")
                    .html(rückmeldung);
                $('html, body').animate({
                    scrollTop: $importieren_ds_ds_beschreiben_hinweis.offset().top
                }, 2000);
                if (anz_vorkommen_von_ds_entfernt === anz_vorkommen_von_ds) {
                    // die Indexe aktualisieren
                    $db.view('artendb/lr', {
                        success: function() {
                            // melden, dass Indexe aktualisiert wurden
                            rückmeldung = "Die Eigenschaftensammlungen wurden entfernt.<br>";
                            rückmeldung += "Die Indexe wurden aktualisiert.";
                            $importieren_ds_ds_beschreiben_hinweis
                                .removeClass("alert-info").removeClass("alert-danger").addClass("alert-success")
                                .html(rückmeldung);
                            $('html, body').animate({
                                scrollTop: $importieren_ds_ds_beschreiben_hinweis.offset().top
                            }, 2000);
                        }
                    });
                }
            });

            // Eigenschaftensammlungen entfernen
            _.each(data.rows, function(data_row) {
                // guid und DsName übergeben
                window.adb.entferneDatensammlungAusDokument(data_row.key[1], ds_name);
            });
			ds_entfernt.resolve();
		}
	});
	return ds_entfernt.promise();
};

// übernimmt den Namen einer Beziehungssammlung
// öffnet alle Dokumente, die diese Beziehungssammlung enthalten und löscht die Beziehungssammlung
window.adb.entferneBeziehungssammlungAusAllenObjekten = function(bs_name) {
	'use strict';
	var bs_entfernt = $.Deferred(),
        anz_vorkommen_von_bs_entfernt = 0,
        anz_vorkommen_von_bs,
        $importieren_bs_ds_beschreiben_hinweis = $("#importieren_bs_ds_beschreiben_hinweis"),
        $importieren_bs_ds_beschreiben_hinweis_text = $("#importieren_bs_ds_beschreiben_hinweis_text"),
        $db = $.couch.db("artendb"),
        rückmeldung;
	$db.view('artendb/bs_guid?startkey=["' + bs_name + '"]&endkey=["' + bs_name + '",{}]', {
		success: function(data) {
            anz_vorkommen_von_bs = data.rows.length;
            // listener einrichten, der meldet, wenn ein Datensatz entfernt wurde
            $(document).bind('adb.bs_entfernt', function() {
                anz_vorkommen_von_bs_entfernt++;
                $importieren_bs_ds_beschreiben_hinweis
                    .removeClass("alert-success")
                    .removeClass("alert-danger")
                    .addClass("alert-info");
                rückmeldung = "Beziehungssammlungen werden entfernt...<br>Die Indexe werden aktualisiert...";
                $importieren_bs_ds_beschreiben_hinweis_text.html(rückmeldung);
                $('html, body').animate({
                    scrollTop: $importieren_bs_ds_beschreiben_hinweis_text.offset().top
                }, 2000);
                if (anz_vorkommen_von_bs_entfernt === anz_vorkommen_von_bs) {
                    // die Indexe aktualisieren
                    $db.view('artendb/lr', {
                        success: function() {
                            // melden, dass Indexe aktualisiert wurden
                            $importieren_bs_ds_beschreiben_hinweis
                                .removeClass("alert-info")
                                .removeClass("alert-danger")
                                .addClass("alert-success");
                            rückmeldung = "Die Beziehungssammlungen wurden entfernt.<br>";
                            rückmeldung += "Die Indexe wurden aktualisiert.";
                            $importieren_bs_ds_beschreiben_hinweis_text.html(rückmeldung);
                            $('html, body').animate({
                                scrollTop: $importieren_bs_ds_beschreiben_hinweis_text.offset().top
                            }, 2000);
                        }
                    });
                }
            });

            _.each(data.rows, function(data_row) {
                // guid und DsName übergeben
                window.adb.entferneBeziehungssammlungAusDokument(data_row.key[1], bs_name);
            });
			bs_entfernt.resolve();
		}
	});
	return bs_entfernt.promise();
};

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Datensammlung, die zu entfernen ist
// entfernt die Datensammlung
window.adb.entferneDatensammlungAusDokument = function(id, ds_name) {
	'use strict';
	var $db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(doc) {
			// Datensammlung entfernen
            doc.Eigenschaftensammlungen = _.reject(doc.Eigenschaftensammlungen, function(datensammlung) {
                return datensammlung.Name === ds_name
            });
			// in artendb speichern
			$db.saveDoc(doc);
            // mitteilen, dass eine ds entfernt wurde
            $(document).trigger('adb.ds_entfernt');
            // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
		}
	});
};

// übernimmt die id des zu verändernden Dokuments
// und den Namen der Beziehungssammlung, die zu entfernen ist
// entfernt die Beziehungssammlung
window.adb.entferneBeziehungssammlungAusDokument = function(id, bs_name) {
	'use strict';
	var $db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(doc) {
			// Beziehungssammlung entfernen
            doc.Beziehungssammlungen = _.reject(doc.Beziehungssammlungen, function(beziehungssammlung) {
                return beziehungssammlung.Name === bs_name
            });
			// in artendb speichern
			$db.saveDoc(doc);
            // mitteilen, dass eine ds entfernt wurde
            $(document).trigger('adb.bs_entfernt');
            // TODO: Scheitern abfangen (trigger adb.ds_nicht_entfernt)
		}
	});
};

// prüft die URL. wenn eine id übergeben wurde, wird das entprechende Objekt angezeigt
window.adb.öffneUri = function() {
	'use strict';
	// parameter der uri holen
	var uri = new Uri($(location).attr('href')),
		id = uri.getQueryParamValue('id'),
		// wenn browser history nicht unterstützt, erstellt history.js eine hash
		// dann muss die id durch die id in der hash ersetzt werden
		hash = uri.anchor(),
		uri2,
		erstelleBaum = require('./modules/erstelleBaum');
	if (hash) {
		uri2 = new Uri(hash);
		id = uri2.getQueryParamValue('id');
	}
	if (id) {
		// Gruppe ermitteln
		var $db = $.couch.db("artendb");
		$db.openDoc(id, {
			success: function(objekt) {
				// window.adb.Gruppe setzen. Nötig, um im Menu die richtigen Felder einzublenden
				window.adb.Gruppe = objekt.Gruppe;
				$(".baum.jstree").jstree("deselect_all");
				// den richtigen Button aktivieren
				$('[gruppe="'+objekt.Gruppe+'"]').button('toggle');
				$("#Gruppe_label").html("Gruppe:");
				// tree aufbauen, danach Datensatz initiieren
				$.when(erstelleBaum($)).then(function() {
					window.adb.öffneBaumZuId(id);
				});
			}
		});
	}
    // dafür sorgen, dass die passenden Menus angezeigt werden
    window.adb.blendeMenus();
};

// übernimmt anfangs drei arrays: taxonomien, datensammlungen und beziehungssammlungen
// verarbeitet immer den ersten array und ruft sich mit den übrigen selber wieder auf
window.adb.erstelleExportfelder = function(taxonomien, datensammlungen, beziehungssammlungen) {
	'use strict';
	var html_felder_wählen = '',
		html_filtern = '',
		ds_typ,
        x,
        dsbs_von_objekten = [],
        dsbs_von_objekt,
        ds_felder_objekt,
        html,
        Autolinker = require('autolinker');

    // Eigenschaftensammlungen vorbereiten
    // Struktur von window.adb.ds_bs_von_objekten ist jetzt: [ds_typ, ds.Name, ds.zusammenfassend, ds["importiert von"], Felder_array]
    // erst mal die nicht benötigten Werte entfernen
    _.each(window.adb.ds_bs_von_objekten.rows, function(object_with_array_in_key) {
        dsbs_von_objekten.push([object_with_array_in_key.key[1], object_with_array_in_key.key[4]]);
    });
    // Struktur von dsbs_von_objekten ist jetzt: [ds.Name, felder_objekt]
    // jetzt gibt es Mehrfacheinträge, diese entfernen
    dsbs_von_objekten = _.union(dsbs_von_objekten);

	if (taxonomien && datensammlungen && beziehungssammlungen) {
		ds_typ = "Taxonomie";
		html_felder_wählen += '<h3>Taxonomie</h3>';
		html_filtern += '<h3>Taxonomie</h3>';
	} else if (taxonomien && datensammlungen) {
		ds_typ = "Datensammlung";
		html_felder_wählen += '<h3>Eigenschaftensammlungen</h3>';
		html_filtern += '<h3>Eigenschaftensammlungen</h3>';
	} else {
		ds_typ = "Beziehung";
		// bei "felder wählen" soll man auch wählen können, ob pro Beziehung eine Zeile oder alle Beziehungen in ein Feld geschrieben werden sollen
		// das muss auch erklärt sein
		html_felder_wählen += '<h3>Beziehungssammlungen</h3><div class="export_zum_titel_gehoerig"><div class="well well-sm" style="margin-top:9px;"><b>Sie können aus zwei Varianten wählen</b> <a href="#" class="show_next_hidden">...mehr</a><ol class="adb-hidden"><li>Pro Beziehung eine Zeile (Standardeinstellung):<ul><li>Für jede Art oder Lebensraum wird pro Beziehung eine neue Zeile erzeugt</li><li>Anschliessende Auswertungen sind so meist einfacher auszuführen</li><li>Dafür können Sie aus maximal einer Beziehungssammlung Felder wählen (aber wie gewohnt mit beliebig vielen Feldern aus Taxonomie(n) und Eigenschaftensammlungen ergänzen)</li></ul></li><li>Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld:<ul><li>Von allen Beziehungen der Art oder des Lebensraums wird der Inhalt des Feldes kommagetrennt in das Feld der einzigen Zeile geschrieben</li><li>Sie können Felder aus beliebigen Beziehungssammlungen gleichzeitig exportieren</li></ul></li></ol></div><div class="radio"><label><input type="radio" id="export_bez_in_zeilen" checked="checked" name="export_bez_wie">Pro Beziehung eine Zeile</label></div><div class="radio"><label><input type="radio" id="export_bez_in_feldern" name="export_bez_wie">Pro Art/Lebensraum eine Zeile und alle Beziehungen kommagetrennt in einem Feld</label></div></div><hr>';
		html_filtern += '<h3>Beziehungssammlungen</h3>';
	}
    _.each(taxonomien, function(taxonomie, index) {
        if (index > 0) {
            html_felder_wählen += '<hr>';
            html_filtern += '<hr>';
        }

        html_felder_wählen += '<h5>' + taxonomie.Name;
        html_filtern += '<h5>' + taxonomie.Name;
        // informationen zur ds holen
        dsbs_von_objekt = _.find(dsbs_von_objekten, function(array) {
            return array[0] === taxonomie.Name;
        });
        if (dsbs_von_objekt && dsbs_von_objekt[1]) {
            html_felder_wählen += ' <a href="#" class="show_next_hidden_export">...mehr</a>';
            html_filtern += ' <a href="#" class="show_next_hidden_export">...mehr</a>';
            // ds-titel abschliessen
            html_felder_wählen += '</h5>';
            html_filtern += '</h5>';
            // Felder der ds darstellen
            html_felder_wählen += '<div class="adb-hidden">';
            html_filtern += '<div class="adb-hidden">';
            ds_felder_objekt = dsbs_von_objekt[1];
            _.each(ds_felder_objekt, function(feldwert, feldname) {
            	if (feldname === "zusammenfassend") {
            		// nicht sagen, woher die Infos stammen, weil das Objekt-abhängig ist
            		html = '<div class="ds_beschreibung_zeile"><div>Zus.-fassend:</div><div>Diese Datensammlung fasst die Daten mehrerer Eigenschaftensammlungen in einer zusammen</div></div>';
            		html_felder_wählen += html;
	                html_filtern += html;
	            } else if (feldname !== "Ursprungsdatensammlung") {
            		html = '<div class="ds_beschreibung_zeile"><div>' + feldname + ':</div><div>' + Autolinker.link(feldwert) + '</div></div>';
            		html_felder_wählen += html;
	                html_filtern += html;
            	}
            });
            html_felder_wählen += '</div>';
            html_filtern += '</div>';
        } else {
            // ds-titel abschliessen
            html_felder_wählen += '</h5>';
            html_filtern += '</h5>';
        }

        // jetzt die checkbox um alle auswählen zu können
        // aber nur, wenn mehr als 1 Feld existieren
        if ((taxonomie.Eigenschaften && _.size(taxonomie.Eigenschaften) > 1) || (taxonomie.Beziehungen && _.size(taxonomie.Beziehungen) > 1)) {
            html_felder_wählen += '<div class="checkbox"><label>';
            html_felder_wählen += '<input class="feld_waehlen_alle_von_ds" type="checkbox" DsTyp="'+ds_typ+'" Datensammlung="' + taxonomie.Name + '"><em>alle</em>';
            html_felder_wählen += '</div></label>';
        }
        html_felder_wählen += '<div class="felderspalte">';


        html_filtern += '<div class="felderspalte">';
        for (x in (taxonomie.Eigenschaften || taxonomie.Beziehungen)) {
            // felder wählen
            html_felder_wählen += '<div class="checkbox"><label>';
            html_felder_wählen += '<input class="feld_waehlen" type="checkbox" DsTyp="'+ds_typ+'" Datensammlung="' + taxonomie.Name + '" Feld="' + x + '">' + x;
            html_felder_wählen += '</div></label>';
            // filtern
            html_filtern += '<div class="form-group">';
            html_filtern += '<label class="control-label" for="exportieren_objekte_waehlen_ds_' + window.adb.ersetzeUngültigeZeichenInIdNamen(x) + '"';
            // Feldnamen, die mehr als eine Zeile belegen: Oben ausrichten
            if (x.length > 28) {
                html_filtern += ' style="padding-top:0px"';
            }
            html_filtern += '>' + x + '</label>';
            //if (taxonomie.Feldtyp === "boolean") {
            if ((taxonomie.Eigenschaften && (taxonomie.Eigenschaften[x] === "boolean")) || (taxonomie.Beziehungen && (taxonomie.Beziehungen[x] === "boolean"))) {
                // in einer checkbox darstellen
                // readonly markiert, dass kein Wert erfasst wurde
                html_filtern += '<input class="controls form-control export_feld_filtern form-control" type="checkbox" id="exportieren_objekte_waehlen_ds_' + window.adb.ersetzeUngültigeZeichenInIdNamen(x) + '" DsTyp="' + ds_typ + '" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '" readonly>';
            } else {
                // in einem input-feld darstellen
                html_filtern += '<input class="controls form-control export_feld_filtern form-control input-sm" type="text" id="exportieren_objekte_waehlen_ds_' + window.adb.ersetzeUngültigeZeichenInIdNamen(x) + '" DsTyp="' + ds_typ + '" Eigenschaft="' + taxonomie.Name + '" Feld="' + x + '">';
            }
            html_filtern += '</div>';
        }
        // Spalten abschliessen
        html_felder_wählen += '</div>';
        html_filtern += '</div>';
    });
	// linie voranstellen
	html_felder_wählen = '<hr>' + html_felder_wählen;
	html_filtern = '<hr>' + html_filtern;
	if (beziehungssammlungen) {
		$("#exportieren_felder_waehlen_felderliste").html(html_felder_wählen);
		$("#exportieren_objekte_waehlen_ds_felderliste").html(html_filtern);
		window.adb.erstelleExportfelder(datensammlungen, beziehungssammlungen);
	} else if (datensammlungen) {
		$("#exportieren_felder_waehlen_felderliste").append(html_felder_wählen);
		$("#exportieren_objekte_waehlen_ds_felderliste").append(html_filtern);
		window.adb.erstelleExportfelder(datensammlungen);
	} else {
		$("#exportieren_felder_waehlen_felderliste").append(html_felder_wählen);
		$("#exportieren_objekte_waehlen_ds_felderliste")
            .append(html_filtern)
            .find("input[type='checkbox']").each(function() {
               this.indeterminate = true;
            });
	}
};

window.adb.erstelleExportString = function(exportobjekte) {
	'use strict';
	var string_titelzeile = "",
		string_zeilen = "",
		string_zeile;
    _.each(exportobjekte, function(exportobjekt) {
        // aus unerklärlichem Grund blieb stringTitelzeile leer, wenn nur ein Datensatz gefiltert wurde
        // daher bei jedem Datensatz prüfen, ob eine Titelzeile erstellt wurde und wenn nötig ergänzen
        if (string_titelzeile === "" || string_titelzeile === ",") {
            string_titelzeile = "";
            // durch Spalten loopen
            _.each(exportobjekt, function(feld, index) {
                if (string_titelzeile !== "") {
                    string_titelzeile += ',';
                }
                string_titelzeile += '"' + index + '"';
            });
        }

        if (string_zeilen !== "") {
            string_zeilen += '\n';
        }
        string_zeile = "";
        // durch die Felder loopen
        _.each(exportobjekt, function(feld) {
            if (string_zeile !== "") {
                string_zeile += ',';
            }
            // null-Werte als leere Werte
            if (feld === null) {
                string_zeile += "";
            } else if (typeof feld === "number") {
                // Zahlen ohne Anführungs- und Schlusszeichen exportieren
                string_zeile += feld;
            } else if (typeof feld === "object") {
                // Anführungszeichen sind Feldtrenner und müssen daher ersetzt werden
                string_zeile += '"' + JSON.stringify(feld).replace(/"/g, "'") + '"';
            } else {
                string_zeile += '"' + feld + '"';
            }
        });
        string_zeilen += string_zeile;
    });
	return string_titelzeile + "\n" + string_zeilen;
};

// baut im Formular "export" die Liste aller Eigenschaften auf
// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
// bekommt den Namen der Gruppe
window.adb.erstelleListeFürFeldwahl = function() {
	'use strict';
	var export_gruppen = [],
		gruppen = [],
        $exportieren_objekte_waehlen_gruppen_hinweis_text = $("#exportieren_objekte_waehlen_gruppen_hinweis_text"),
        $exportieren_nur_objekte_mit_eigenschaften_checkbox = $("#exportieren_nur_objekte_mit_eigenschaften_checkbox"),
        $exportieren_nur_objekte_mit_eigenschaften = $("#exportieren_nur_objekte_mit_eigenschaften"),
        $exportieren_exportieren_collapse = $("#exportieren_exportieren_collapse"),
        $exportieren_felder_waehlen_collapse = $("#exportieren_felder_waehlen_collapse"),
        $exportieren_objekte_waehlen_ds_collapse = $("#exportieren_objekte_waehlen_ds_collapse");
    // falls noch offen: folgende Bereiche schliessen
    if ($exportieren_exportieren_collapse.is(':visible')) {
        $exportieren_exportieren_collapse.collapse('hide');
    }
    if ($exportieren_felder_waehlen_collapse.is(':visible')) {
        $exportieren_felder_waehlen_collapse.collapse('hide');
    }
    if ($exportieren_objekte_waehlen_ds_collapse.is(':visible')) {
        $exportieren_objekte_waehlen_ds_collapse.collapse('hide');
    }

	// Beschäftigung melden
	$exportieren_objekte_waehlen_gruppen_hinweis_text
        .alert()
        .removeClass("alert-success")
        .removeClass("alert-danger")
        .addClass("alert-info")
        .show()
	    .html("Eigenschaften werden ermittelt...");
	// scrollen, damit Hinweis sicher ganz sichtbar ist
	$('html, body').animate({
		scrollTop: $exportieren_objekte_waehlen_gruppen_hinweis_text.offset().top
	}, 2000);
	// gewählte Gruppen ermitteln
	// globale Variable enthält die Gruppen. Damit nach AJAX-Abfragen bestimmt werden kann, ob alle Daten vorliegen
	// globale Variable sammelt arrays mit den Listen der Felder pro Gruppe
	var export_felder_arrays = [];
	var $db = $.couch.db("artendb");
	$(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			export_gruppen.push($(this).val());
		}
	});
    /*if (export_gruppen.length > 1) {
        // wenn mehrere Gruppen gewählt werden
        // Option exportieren_nur_objekte_mit_eigenschaften ausblenden
        // und false setzen
        // sonst kommen nur die DS einer Gruppe
        $exportieren_nur_objekte_mit_eigenschaften_checkbox.addClass("adb-hidden");
        $exportieren_nur_objekte_mit_eigenschaften.prop('checked', false);
    } else {
        if ($exportieren_nur_objekte_mit_eigenschaften_checkbox.hasClass("adb-hidden")) {
            $exportieren_nur_objekte_mit_eigenschaften_checkbox.removeClass("adb-hidden")
            $exportieren_nur_objekte_mit_eigenschaften.prop('checked', true);
        }
    }*/
	if (export_gruppen.length > 0) {
        // gruppen einzeln abfragen
        gruppen = export_gruppen;
        _.each(gruppen, function(gruppe) {
            // Felder abfragen
            $db.view('artendb/felder?group_level=5&startkey=["'+gruppe+'"]&endkey=["'+gruppe+'",{},{},{},{}]', {
                success: function(data) {
                    export_felder_arrays = _.union(export_felder_arrays, data.rows);
                    //console.log("Die Gruppe " + gruppe + " hat soviele Felder = " + data.rows.length);
                    // eine Gruppe aus export_gruppen entfernen
                    export_gruppen.splice(0,1);
                    if (export_gruppen.length === 0) {
                        // alle Gruppen sind verarbeitet
                        window.adb.erstelleListeFürFeldwahl_2(export_felder_arrays);
                    }
                }
            });
        });
	} else {
		// letzte Rückmeldung anpassen
		$exportieren_objekte_waehlen_gruppen_hinweis_text.html("bitte eine Gruppe wählen")
            .removeClass("alert-info")
            .removeClass("alert-success")
            .addClass("alert-danger");
		// Felder entfernen
		$("#exportieren_felder_waehlen_felderliste").html("");
		$("#exportieren_objekte_waehlen_ds_felderliste").html("");
	}
    // Tabelle ausblenden, falls sie eingeblendet war
    $("#exportieren_exportieren_tabelle").hide();
};

window.adb.erstelleListeFürFeldwahl_2 = function(export_felder_arrays) {
	'use strict';
	var felder_objekt = {},
		hinweis_taxonomien,
        taxonomien,
        datensammlungen,
        beziehungssammlungen;

	// in export_felder_arrays ist eine Liste der Felder, die in dieser Gruppe enthalten sind
	// sie kann aber Mehrfacheinträge enthalten, die sich in der Gruppe unterscheiden
	// Muster: Gruppe, Typ der Datensammlung, Name der Datensammlung, Name des Felds
	// Mehrfacheinträge sollen entfernt werden

	// dazu muss zuerst die Gruppe entfernt werden
    _.each(export_felder_arrays, function(export_felder) {
        export_felder.key.splice(0,1);
    });

	// jetzt nur noch eineindeutige Array-Objekte (=Eigenschaftensammlungen) belassen
	export_felder_arrays = _.union(export_felder_arrays);
	// jetzt den Array von Objekten nach key sortieren
	export_felder_arrays = _.sortBy(export_felder_arrays, function(object) {
		return object.key;
	});

	// Im Objekt "FelderObjekt" werden die Felder aller gewählten Gruppen gesammelt
	felder_objekt = window.adb.ergänzeFelderObjekt(felder_objekt, export_felder_arrays);

	// bei allfälligen "Taxonomie(n)" Feldnamen sortieren
	if (felder_objekt["Taxonomie(n)"] && felder_objekt["Taxonomie(n)"].Eigenschaften) {
		felder_objekt["Taxonomie(n)"].Eigenschaften = window.adb.sortKeysOfObject(felder_objekt["Taxonomie(n)"].Eigenschaften);
	}

	// Taxonomien und Datensammlungen aus dem FelderObjekt extrahieren
	taxonomien = [];
	datensammlungen = [];
	beziehungssammlungen = [];

    _.each(felder_objekt, function(ds) {
        if (typeof ds === "object" && ds.Typ) {
            // das ist Datensammlung oder Taxonomie
            if (ds.Typ === "Datensammlung") {
                datensammlungen.push(ds);
            } else if (ds.Typ === "Taxonomie") {
                taxonomien.push(ds);
            } else if (ds.Typ === "Beziehung") {
                beziehungssammlungen.push(ds);
            }
        }
    });

    $.when(window.adb.holeDatensammlungenFürExportfelder()).done(function() {
        window.adb.erstelleExportfelder(taxonomien, datensammlungen, beziehungssammlungen);
    });

	// kontrollieren, ob Taxonomien zusammengefasst werden
	if ($("#exportieren_objekte_Taxonomien_zusammenfassen").hasClass("active")) {
		hinweis_taxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien sind zusammengefasst";
	} else {
		hinweis_taxonomien = "Die Eigenschaften wurden aufgebaut<br>Alle Taxonomien werden einzeln dargestellt";
	}
	// Ergebnis rückmelden
	$("#exportieren_objekte_waehlen_gruppen_hinweis_text")
        .alert()
        .removeClass("alert-info")
        .removeClass("alert-danger")
        .addClass("alert-success")
        .show()
        .html(hinweis_taxonomien);
};

// holt eine Liste aller Datensammlungen, wenn nötig
// speichert sie in einer globalen Variable, damit sie wiederverwendet werden kann
window.adb.holeDatensammlungenFürExportfelder = function() {
	'use strict';
    var exfe_geholt = $.Deferred();
    if (window.adb.ds_bs_von_objekten) {
        exfe_geholt.resolve();
    } else {
        var $db = $.couch.db("artendb");
        $db.view('artendb/ds_von_objekten?group_level=5', {
            success: function(data) {
                // Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
                window.adb.ds_bs_von_objekten = data;
                exfe_geholt.resolve();
            }
        });
    }
    return exfe_geholt.promise();
};

// Nimmt ein FelderObjekt entgegen. Das ist entweder leer (erste Gruppe) oder enthält schon Felder (ab der zweiten Gruppe)
// Nimmt ein Array mit Feldern entgegen
// mit der Struktur: {"key":["Flora","Datensammlung","Blaue Liste (1998)","Anwendungshäufigkeit zur Erhaltung"],"value":null}
// ergänzt das FelderObjekt um diese Felder
// retourniert das ergänzte FelderObjekt
// das FelderObjekt enthält alle gewünschten Felder. Darin sind nullwerte
window.adb.ergänzeFelderObjekt = function(felder_objekt, felder_array) {
	'use strict';
	var ds_typ,
		ds_name,
		feldname,
        feldtyp;
    _.each(felder_array, function(feld_objekt) {
        if (feld_objekt.key) {
            // Gruppe wurde entfernt, so sind alle keys um 1 kleiner als ursprünglich
            ds_typ = feld_objekt.key[0];
            ds_name = feld_objekt.key[1];
            feldname = feld_objekt.key[2];
            feldtyp = feld_objekt.key[3];
            if (ds_typ === "Objekt") {
                // das ist eine Eigenschaft des Objekts
                //FelderObjekt[FeldName] = null;	// NICHT HINZUFÜGEN, DIESE FELDER SIND SCHON IM FORMULAR FIX DRIN
            } else if (window.adb.fasseTaxonomienZusammen && ds_typ === "Taxonomie") {
                // Datensammlungen werden zusammengefasst. DsTyp muss "Taxonomie(n)" heissen und die Felder aller Taxonomien sammeln
                // Wenn Datensammlung noch nicht existiert, gründen
                if (!felder_objekt["Taxonomie(n)"]) {
                    felder_objekt["Taxonomie(n)"] = {};
                    felder_objekt["Taxonomie(n)"].Typ = ds_typ;
                    felder_objekt["Taxonomie(n)"].Name = "Taxonomie(n)";
                    felder_objekt["Taxonomie(n)"].Eigenschaften = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felder_objekt["Taxonomie(n)"].Eigenschaften[feldname] = feldtyp;
            } else if (ds_typ === "Datensammlung" || ds_typ === "Taxonomie") {
                // Wenn Datensammlung oder Taxonomie noch nicht existiert, gründen
                if (!felder_objekt[ds_name]) {
                    felder_objekt[ds_name] = {};
                    felder_objekt[ds_name].Typ = ds_typ;
                    felder_objekt[ds_name].Name = ds_name;
                    felder_objekt[ds_name].Eigenschaften = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felder_objekt[ds_name].Eigenschaften[feldname] = feldtyp;
            } else if (ds_typ === "Beziehung") {
                // Wenn Beziehungstyp noch nicht existiert, gründen
                if (!felder_objekt[ds_name]) {
                    felder_objekt[ds_name] = {};
                    felder_objekt[ds_name].Typ = ds_typ;
                    felder_objekt[ds_name].Name = ds_name;
                    felder_objekt[ds_name].Beziehungen = {};
                }
                // Feld ergänzen
                // als Feldwert den Feldtyp übergeben
                felder_objekt[ds_name].Beziehungen[feldname] = feldtyp;
            }
        }
    });
	return felder_objekt;
};

// wird aufgerufen durch eine der zwei Schaltflächen: "Vorschau anzeigen", "direkt exportieren"
// direkt: list-funktion aufrufen, welche die Daten direkt herunterlädt
window.adb.filtereFürExport = function(direkt) {
	'use strict';
	// Array von Filterobjekten bilden
	var filterkriterien = [],
		// Objekt bilden, in das die Filterkriterien integriert werden, da ein array schlecht über die url geliefert wird
		filterkriterien_objekt = {},
		filter_objekt,
		gruppen_array = [],
		gruppen = "",
		gewählte_felder = [],
        anz_gewählte_felder_aus_dsbs = 0,
		gewählte_felder_objekt = {},
		anz_ds_gewählt = 0,
        $exportieren_exportieren_hinweis_text = $("#exportieren_exportieren_hinweis_text"),
        html_filterkriterien;

	// kontrollieren, ob eine Gruppe gewählt wurde
	if (window.adb.fürExportGewählteGruppen().length === 0) {
		return;
	}

	// Beschäftigung melden
	if (!direkt) {
		$exportieren_exportieren_hinweis_text
            .alert()
            .show()
            .html("Die Daten werden vorbereitet...");
	}

	// zum Hinweistext scrollen
	$('html, body').animate({
		scrollTop: $exportieren_exportieren_hinweis_text.offset().top
	}, 2000);
	// gewählte Gruppen ermitteln
    $("#exportieren_exportieren_exportieren_fuer_alt").addClass("adb-hidden-strictly");
	$(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			gruppen_array.push($(this).attr('view'));
			if (gruppen) {
				gruppen += ",";
			}
			gruppen += $(this).val();
		}
	});
    var gruppenliste = gruppen.split(",");
    if (gruppenliste.indexOf("Flora") >= 0 && gruppenliste.indexOf("Fauna") >= 0) {
        // Wenn Flora und Fauna gewählt: Schaltfläche für den Export für das ALT anzeigen
        $("#exportieren_exportieren_exportieren_fuer_alt").removeClass("adb-hidden-strictly");
    }
	// durch alle Filterfelder loopen
	// wenn ein Feld einen Wert enthält, danach filtern
	$("#exportieren_objekte_waehlen_ds_collapse").find(".export_feld_filtern").each(function() {
        var that = this,
            $this = $(this);
        if (that.type === "checkbox") {
            if (!$this.prop('readonly')) {
                filter_objekt = {};
                filter_objekt.DsTyp = $this.attr('dstyp');
                filter_objekt.DsName = $this.attr('eigenschaft');
                filter_objekt.Feldname = $this.attr('feld');
                filter_objekt.Filterwert = $this.prop("checked");
                filter_objekt.Vergleichsoperator = "=";
                filterkriterien.push(filter_objekt);
            } else {
                // übrige checkboxen ignorieren
            }
        } else if (this.value || this.value === 0) {
			// Filterobjekt zurücksetzen
			filter_objekt = {};
			filter_objekt.DsTyp = $this.attr('dstyp');
			filter_objekt.DsName = $this.attr('eigenschaft');
			filter_objekt.Feldname = $this.attr('feld');
			// Filterwert in Kleinschrift verwandeln, damit Gross-/Kleinschrift nicht wesentlich ist (Vergleichswerte werden von filtereFürExport später auch in Kleinschrift verwandelt)
			filter_objekt.Filterwert = window.adb.ermittleVergleichsoperator(this.value)[1];
			filter_objekt.Vergleichsoperator = window.adb.ermittleVergleichsoperator(this.value)[0];
			filterkriterien.push(filter_objekt);
		}
	});

	// den array dem objekt zuweisen
	filterkriterien_objekt.filterkriterien = filterkriterien;
	// gewählte Felder ermitteln
	$(".exportieren_felder_waehlen_objekt_feld.feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			// feldObjekt erstellen
			var feldObjekt = {};
			feldObjekt.DsName = "Objekt";
			feldObjekt.Feldname = $(this).attr('feldname');
			gewählte_felder.push(feldObjekt);
		}
	});
	$("#exportieren_felder_waehlen_felderliste").find(".feld_waehlen").each(function() {
		if ($(this).prop('checked')) {
			// feldObjekt erstellen
			var feldObjekt = {};
			feldObjekt.DsTyp = $(this).attr('dstyp');
			if (feldObjekt.DsTyp !== "Taxonomie") {
				anz_ds_gewählt++;
			}
			feldObjekt.DsName = $(this).attr('datensammlung');
			feldObjekt.Feldname = $(this).attr('feld');
			gewählte_felder.push(feldObjekt);
            anz_gewählte_felder_aus_dsbs++;
		}
	});
	// den array dem objekt zuweisen
	gewählte_felder_objekt.felder = gewählte_felder;

	// Wenn keine Felder gewählt sind: Melden und aufhören
	if (gewählte_felder_objekt.felder.length === 0) {
		// Beschäftigungsmeldung verstecken
		$exportieren_exportieren_hinweis_text
            .alert()
            .hide();
        $("#exportieren_exportieren_error_text_text")
            .html("Keine Eigenschaften gewählt<br>Bitte wählen Sie Eigenschaften, die exportiert werden sollen");
		$("#exportieren_exportieren_error_text")
            .alert()
            .show();
		return;
	}

    // html für filterkriterien aufbauen
    html_filterkriterien = "Gewählte Filterkriterien:<ul>";
    if ($("#exportieren_synonym_infos").prop('checked')) {
        html_filterkriterien += "<li>inklusive Informationen von Synonymen</li>";
    } else {
        html_filterkriterien += "<li>Informationen von Synonymen ignorieren</li>";
    }
    if (filterkriterien.length > 0) {
        _.each(filterkriterien, function(filterkriterium) {
            html_filterkriterien += "<li>";
            html_filterkriterien += "Feld \"" + filterkriterium.Feldname + "\" ";
            if (filterkriterium.Vergleichsoperator !== "kein") {
                html_filterkriterien += filterkriterium.Vergleichsoperator + " \"";
            } else {
                html_filterkriterien += "enthält \"";
            }
            html_filterkriterien += filterkriterium.Filterwert;
            html_filterkriterien += "\"</li>";
        });
        html_filterkriterien += "</ul>";
    } else if (anz_gewählte_felder_aus_dsbs > 0) {
        // wenn Filterkriterien erfasst wurde, werden sowieso nur Datensätze angezeigt, in denen Daten vorkommen
        // daher ist die folgende Info nur interesssant, wenn kein Filter gesetzt wurde
        // und natürlich auch nur, wenn Felder aus DS/BS gewählt wurden
        if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked')) {
            html_filterkriterien += "<li>Nur Datensätze exportieren, die in den gewählten Eigenschaften- und Beziehungssammlungen Informationen enthalten</li>";
        } else {
            html_filterkriterien += "<li>Auch Datensätze exportieren, die in den gewählten Eigenschaften- und Beziehungssammlungen keine Informationen enthalten</li>";
        }
    }
    $("#exportieren_exportieren_filterkriterien")
        .html(html_filterkriterien)
        .show();

	// jetzt das filterObjekt übergeben
	if (direkt === "direkt") {
		window.adb.übergebeFilterFürDirektExport(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
	} if (direkt === "für_alt") {
        window.adb.übergebeFilterFürExportFürAlt(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
    }else {
		window.adb.übergebeFilterFürExportMitVorschau(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt);
	}
};

window.adb.übergebeFilterFürExportFürAlt = function(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt) {
	'use strict';
    // Alle Felder abfragen
    var fTz = "false",
        queryParam;
    // window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
    if (window.adb.fasseTaxonomienZusammen) {
        fTz = "true";
    }
    if ($("#exportieren_synonym_infos").prop('checked')) {
        queryParam = "export_alt_mit_synonymen_direkt/all_docs_mit_synonymen_fuer_alt?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
    } else {
        queryParam = "export_alt_direkt/all_docs_fuer_alt?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
    }
    if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewählt > 0) {
        // prüfen, ob mindestens ein Feld aus ds gewählt ist
        // wenn ja: true, sonst false
        queryParam += "&nur_objekte_mit_eigenschaften=true";
    } else {
        queryParam += "&nur_objekte_mit_eigenschaften=false";
    }
    if ($("#export_bez_in_zeilen").prop('checked')) {
        queryParam += "&bez_in_zeilen=true";
    } else {
        queryParam += "&bez_in_zeilen=false";
    }
    window.open('_list/' + queryParam);
};

window.adb.übergebeFilterFürDirektExport = function(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt) {
	'use strict';
	// Alle Felder abfragen
	var fTz = "false",
		queryParam,
        view_name,
        list_name,
        gruppenliste = gruppen.split(",");
	// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
	if (window.adb.fasseTaxonomienZusammen) {
		fTz = "true";
	}
	if ($("#exportieren_synonym_infos").prop('checked')) {
        list_name = "export_mit_synonymen_direkt";
        if (gruppenliste.length > 1) {
            view_name = "all_docs_mit_synonymen";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            if (gruppenliste[0] === "Lebensräume") {
                view_name = "lr_mit_synonymen";
            } else {
                view_name = gruppenliste[0].toLowerCase() + "_mit_synonymen";
            }
        }
	} else {
        list_name = "export_direkt";
        if (gruppenliste.length > 1) {
            view_name = "all_docs";
        } else {
            // den view der Gruppe nehmen, das ist viel schneller
            if (gruppenliste[0] === "Lebensräume") {
                view_name = "lr";
            } else {
                view_name = gruppenliste[0].toLowerCase();
            }

        }
	}

    queryParam = list_name + "/" + view_name + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;

	if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewählt > 0) {
		// prüfen, ob mindestens ein Feld aus ds gewählt ist
		// wenn ja: true, sonst false
		queryParam += "&nur_objekte_mit_eigenschaften=true";
	} else {
		queryParam += "&nur_objekte_mit_eigenschaften=false";
	}
	if ($("#export_bez_in_zeilen").prop('checked')) {
		queryParam += "&bez_in_zeilen=true";
	} else {
		queryParam += "&bez_in_zeilen=false";
	}
	window.open('_list/' + queryParam);
};

window.adb.übergebeFilterFürExportMitVorschau = function(gruppen, gruppen_array, anz_ds_gewählt, filterkriterien_objekt, gewählte_felder_objekt) {
	'use strict';
	// Alle Felder abfragen
	var fTz = "false",
		anz_gruppen_abgefragt = 0,
		dbParam,
		queryParam;
	// window.adb.fasseTaxonomienZusammen steuert, ob Taxonomien alle einzeln oder unter dem Titel Taxonomien zusammengefasst werden
	if (window.adb.fasseTaxonomienZusammen) {
		fTz = "true";
	}
	// globale Variable vorbereiten
	window.adb.exportieren_objekte = [];
	// in anz_gruppen_abgefragt wird gezählt, wieviele Gruppen schon abgefragt wurden
	// jede Abfrage kontrolliert nach Erhalt der Daten, ob schon alle Gruppen abgefragt wurden und macht weiter, wenn ja
    _.each(gruppen_array, function(gruppe) {
        if ($("#exportieren_synonym_infos").prop('checked')) {
            dbParam = "artendb/export_mit_synonymen";
            queryParam = gruppe + "_mit_synonymen?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
        } else {
            dbParam = "artendb/export";
            queryParam = gruppe + "?include_docs=true&filter=" + encodeURIComponent(JSON.stringify(filterkriterien_objekt)) + "&felder=" + encodeURIComponent(JSON.stringify(gewählte_felder_objekt)) + "&fasseTaxonomienZusammen=" + fTz + "&gruppen=" + gruppen;
        }
        if ($("#exportieren_nur_objekte_mit_eigenschaften").prop('checked') && anz_ds_gewählt > 0) {
            // prüfen, ob mindestens ein Feld aus ds gewählt ist
            // wenn ja: true, sonst false
            queryParam += "&nur_objekte_mit_eigenschaften=true";
        } else {
            queryParam += "&nur_objekte_mit_eigenschaften=false";
        }
        if ($("#export_bez_in_zeilen").prop('checked')) {
            queryParam += "&bez_in_zeilen=true";
        } else {
            queryParam += "&bez_in_zeilen=false";
        }
        var $db = $.couch.db("artendb");
        $db.list(dbParam, queryParam, {
            success: function(data) {
                // alle Objekte in data in window.adb.exportieren_objekte anfügen
                window.adb.exportieren_objekte = _.union(window.adb.exportieren_objekte, data);
                // speichern, dass eine Gruppe abgefragt wurde
                anz_gruppen_abgefragt++;
                if (anz_gruppen_abgefragt === gruppen_array.length) {
                    // alle Gruppen wurden abgefragt, jetzt kann es weitergehen
                    // Ergebnis rückmelden
                    $("#exportieren_exportieren_hinweis_text")
                        .alert()
                        .show()
                        .html(window.adb.exportieren_objekte.length + " Objekte sind gewählt");
                    window.adb.baueTabelleFürExportAuf();
                }
            },
            error: function() {
                console.log('error in $db.list');
            }
        });
    });
};

window.adb.baueTabelleFürExportAuf = function() {
	'use strict';
    var hinweis = "";
	if (window.adb.exportieren_objekte.length > 0) {
		window.adb.erstelleTabelle(window.adb.exportieren_objekte, "", "exportieren_exportieren_tabelle");
		$(".exportieren_exportieren_exportieren").show();
		// zur Tabelle scrollen
		$('html, body').animate({
			scrollTop: $("#exportieren_exportieren_exportieren").offset().top
		}, 2000);
	} else if (window.adb.exportieren_objekte && window.adb.exportieren_objekte.length === 0) {
        $("#exportieren_exportieren_error_text_text")
            .html("Keine Daten gefunden<br>Bitte passen Sie die Filterkriterien an");
        $("#exportieren_exportieren_error_text")
            .alert()
            .show();
        $('html, body').animate({
            scrollTop: $("#exportieren_exportieren_exportieren").offset().top
        }, 2000);

	}
	// Beschäftigungsmeldung verstecken
	$("#exportieren_exportieren_hinweis_text")
        .alert()
        .hide();
};

window.adb.fürExportGewählteGruppen = function() {
	'use strict';
	var gruppen = [];
	$(".exportieren_ds_objekte_waehlen_gruppe").each(function() {
		if ($(this).prop('checked')) {
			gruppen.push($(this).attr('feldname'));
		}
	});
	return gruppen;
};

// woher wird bloss benötigt, wenn angemeldet werden muss
window.adb.bereiteImportieren_ds_beschreibenVor = function(woher) {
	'use strict';
	if (!window.adb.prüfeAnmeldung("woher")) {
		$('#importieren_ds_ds_beschreiben_collapse').collapse('hide');
	} else {
		$("#DsName").focus();
		// Daten holen, wenn nötig
		if (window.adb.ds_von_objekten) {
			window.adb.bereiteImportieren_ds_beschreibenVor_02();
		} else {
			var $db = $.couch.db("artendb");
			$db.view('artendb/ds_von_objekten?startkey=["Datensammlung"]&endkey=["Datensammlung",{},{},{},{}]&group_level=5', {
				success: function(data) {
					// Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
					window.adb.ds_von_objekten = data;
					window.adb.bereiteImportieren_ds_beschreibenVor_02();
				}
			});
		}
	}
};

// DsNamen in Auswahlliste stellen
// veränderbare sind normal, übrige grau
window.adb.bereiteImportieren_ds_beschreibenVor_02 = function() {
	'use strict';
	var html,
        ds_namen = [];
	// in diesem Array werden alle keys gesammelt
	// diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
    window.adb.DsKeys = _.map(window.adb.ds_von_objekten.rows, function(row) {
        return row.key;
    });
    // brauche nur drei keys
    // email: leider gibt es Null-Werte
    window.adb.ds_namen_eindeutig = _.map(window.adb.DsKeys, function(ds_key) {
        return [ds_key[1], ds_key[2], ds_key[3] || "alex@gabriel-software.ch"];
    });
    // Objektarray reduzieren auf eindeutige Namen
    window.adb.ds_namen_eindeutig = _.reject(window.adb.ds_namen_eindeutig, function(objekt) {
        var position_in_ds_namen = _.indexOf(ds_namen, objekt[0]);
        if (position_in_ds_namen === -1) {
            ds_namen.push(objekt[0]);
            return false;
        } else {
            return true;
        }
    });
    // nach DsNamen sortieren
    window.adb.ds_namen_eindeutig = _.sortBy(window.adb.ds_namen_eindeutig, function(key) {
        return key[0];
    });
	// mit leerer Zeile beginnen
	html = "<option value='' waehlbar=true></option>";
	// Namen der Datensammlungen als Optionen anfügen
    _.each(window.adb.ds_namen_eindeutig, function(ds_name_eindeutig) {
        // veränderbar sind nur selbst importierte und zusammenfassende
        if (ds_name_eindeutig[2] === localStorage.Email || ds_name_eindeutig[1] || Boolean(localStorage.admin)) {
            // veränderbare sind normal = schwarz
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_gruen_fett' waehlbar=true>" + ds_name_eindeutig[0] + "</option>";
        } else {
            // nicht veränderbare sind grau
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_grau_normal' waehlbar=false>" + ds_name_eindeutig[0] + "</option>";
        }
    });
	$("#DsWaehlen").html(html);
	$("#DsUrsprungsDs").html(html);
};

// woher wird bloss benötigt, wenn angemeldet werden muss
window.adb.bereiteImportieren_bs_beschreibenVor = function(woher) {
	'use strict';
	if (!window.adb.prüfeAnmeldung("woher")) {
		$('#importieren_bs_ds_beschreiben_collapse').collapse('hide');
	} else {
		$("#BsName").focus();
		// anzeigen, dass Daten geladen werden. Nein: Blitzt bloss kurz auf
		//$("#BsWaehlen").html("<option value='null'>Bitte warte, die Liste wird aufgebaut...</option>");
		// Daten holen, wenn nötig
		if (window.adb.bs_von_objekten) {
            window.adb.bereiteImportieren_bs_beschreibenVor_02();
		} else {
			var $db = $.couch.db("artendb");
			$db.view('artendb/ds_von_objekten?startkey=["Beziehungssammlung"]&endkey=["Beziehungssammlung",{},{},{},{}]&group_level=5', {
				success: function(data) {
					// Daten in Objektvariable speichern > Wenn Ds ausgewählt, Angaben in die Felder kopieren
					window.adb.bs_von_objekten = data;
					window.adb.bereiteImportieren_bs_beschreibenVor_02();
				}
			});
		}
	}
};

window.adb.bereiteImportieren_bs_beschreibenVor_02 = function() {
	'use strict';
	var html,
		bs_namen = [];
	// in diesem Array werden alle keys gesammelt
	// diesen Array als globale Variable gestalten: Wir benutzt, wenn DsName verändert wird
	window.adb.BsKeys = _.map(window.adb.bs_von_objekten.rows, function(row) {
        return row.key;
    });

    // brauche nur drei keys
    window.adb.ds_namen_eindeutig = _.map(window.adb.BsKeys, function(bs_key) {
        return [bs_key[1], bs_key[2], bs_key[3]];
    });
    // Objektarray reduzieren auf eindeutige Namen
    window.adb.ds_namen_eindeutig = _.reject(window.adb.ds_namen_eindeutig, function(objekt) {
        var position_in_bs_namen = _.indexOf(bs_namen, objekt[0]);
        if (position_in_bs_namen === -1) {
            bs_namen.push(objekt[0]);
            return false;
        } else {
            return true;
        }
    });

	// nach DsNamen sortieren
	window.adb.ds_namen_eindeutig = _.sortBy(window.adb.ds_namen_eindeutig, function(key) {
		return key[0];
	});
	// mit leerer Zeile beginnen
	html = "<option value='' waehlbar=true></option>";
	// Namen der Datensammlungen als Optionen anfügen
    _.each(window.adb.ds_namen_eindeutig, function(ds_name_eindeutig) {
        // veränderbar sind nur selbst importierte und zusammenfassende
        if (ds_name_eindeutig[2] === localStorage.Email || ds_name_eindeutig[1] || Boolean(localStorage.admin)) {
            // veränderbare sind normal = schwarz
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_gruen_fett' waehlbar=true>" + ds_name_eindeutig[0] + "</option>";
        } else {
            // nicht veränderbare sind grau
            html += "<option value='" + ds_name_eindeutig[0] + "' class='adb_grau_normal' waehlbar=false>" + ds_name_eindeutig[0] + "</option>";
        }
    });
	$("#BsWaehlen").html(html);
	$("#BsUrsprungsBs").html(html);
};

window.adb.isFileAPIAvailable = function() {
	'use strict';
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		return true;
	} else {
		// source: File API availability - //caniuse.com/#feat=fileapi
		// source: <output> availability - //html5doctor.com/the-output-element/
		var html = "Für den Datenimport benötigen Sie mindestens einen der folgenden Browser:<br>";
		html += "(Stand März 2014)<br>";
		html += "- Google Chrome: 31 oder neuer<br>";
		html += "- Chrome auf Android: 33 oder neuer<br>";
		html += "- Mozilla Firefox: 28 oder neuer<br>";
		html += "- Firefox auf Android: 26 oder neuer<br>";
		html += "- Safari: 7.0 oder neuer<br>";
		html += "- iOs Safari: 6.0 oder neuer<br>";
		html += "- Opera: 20 oder neuer<br>";
		html += "- Internet Explorer: 10 oder neuer<br>";
		html += "- Internet Explorer mobile: bis Version 10 nicht<br>";
		html += "- Android Standardbrowser: Android 4.4 oder neuer<br>";
		$("#fileApiMeldungText").html(html);
		$('#fileApiMeldung').modal();
		return false;
	}
};

window.adb.sortiereObjektarrayNachName = function(objektarray) {
	'use strict';
	// Beziehungssammlungen bzw. Datensammlungen nach Name sortieren
	objektarray.sort(function(a, b) {
		var aName = a.Name,
			bName = b.Name;
		if (aName && bName) {
			return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
		} else {
			return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
		}
	});
	return objektarray;
};

// übernimmt einen Array mit den Beziehungen
// gibt diesen sortiert zurück
window.adb.sortiereBeziehungenNachName = function(beziehungen) {
	'use strict';
// Beziehungen nach Name sortieren
	beziehungen.sort(function(a, b) {
		var aName,
			bName;
        _.each(a.Beziehungspartner, function(beziehungspartner) {
            if (beziehungspartner.Gruppe === "Lebensräume") {
                // sortiert werden soll bei Lebensräumen zuerst nach Taxonomie, dann nach Name
                aName = beziehungspartner.Gruppe + beziehungspartner.Taxonomie + beziehungspartner.Name;
            } else {
                aName = beziehungspartner.Gruppe + beziehungspartner.Name;
            }
        });
        _.each(b.Beziehungspartner, function(beziehungspartner) {
            if (beziehungspartner.Gruppe === "Lebensräume") {
                bName = beziehungspartner.Gruppe + beziehungspartner.Taxonomie + beziehungspartner.Name;
            } else {
                bName = beziehungspartner.Gruppe + beziehungspartner.Name;
            }
        });
		if (aName && bName) {
			return (aName.toLowerCase() == bName.toLowerCase()) ? 0 : (aName.toLowerCase() > bName.toLowerCase()) ? 1 : -1;
		} else {
			return (aName == bName) ? 0 : (aName > bName) ? 1 : -1;
		}
	});
	return beziehungen;
};

// sortiert nach den keys des Objekts
// resultat nicht garantiert!
window.adb.sortKeysOfObject = function(o) {
	'use strict';
	var sorted = {},
		key,
		a = [];

	for (key in o) {
		if (o.hasOwnProperty(key)) {
			a.push(key);
		}
	}

	a.sort();

	for (key = 0; key < a.length; key++) {
		sorted[a[key]] = o[a[key]];
	}
	return sorted;
};

window.adb.exportZurücksetzen = function() {
	'use strict';
    var $exportieren_exportieren_collapse = $("#exportieren_exportieren_collapse");
	// Export ausblenden, falls sie eingeblendet war
	if ($exportieren_exportieren_collapse.css("display") !== "none") {
		$exportieren_exportieren_collapse.collapse('hide');
	}
	$("#exportieren_exportieren_tabelle").hide();
	$(".exportieren_exportieren_exportieren").hide();
	$("#exportieren_exportieren_error_text")
        .alert()
        .hide();
};

window.adb.öffneGruppe = function(Gruppe) {
	'use strict';
	var erstelleBaum = require('./modules/erstelleBaum');
	// Gruppe als globale Variable speichern, weil sie an vielen Orten benutzt wird
	window.adb.Gruppe = Gruppe;
	$(".suchfeld").val("");
	$("#Gruppe_label").html("Gruppe:");
	$(".suchen")
        .hide()
        .val("");
	$("#forms").hide();
	var treeMitteilung = "hole Daten...";
	if (window.adb.Gruppe === "Macromycetes") {
		treeMitteilung = "hole Daten (das dauert bei Pilzen länger...)";
	}
	$("#treeMitteilung")
        .html(treeMitteilung)
        .show();
	erstelleBaum($);
	// keine Art mehr aktiv
	delete localStorage.art_id;
};

// schreibt Änderungen in Feldern in die Datenbank
// wird vorläufig nur für LR Taxonomie verwendet
window.adb.speichern = function(feldwert, feldname, ds_name, ds_typ) {
	'use strict';
	// zuerst die id des Objekts holen
	var uri = new Uri($(location).attr('href')),
		id = uri.getQueryParamValue('id'),
		// wenn browser history nicht unterstützt, erstellt history.js eine hash
		// dann muss die id durch die id in der hash ersetzt werden
		hash = uri.anchor(),
		uri2;
	if (hash) {
		uri2 = new Uri(hash);
		id = uri2.getQueryParamValue('id');
	}
	// sicherstellen, dass boolean, float und integer nicht in Text verwandelt werden
	feldwert = window.adb.convertToCorrectType(feldwert);
	var $db = $.couch.db("artendb");
	$db.openDoc(id, {
		success: function(object) {
			// prüfen, ob Einheit eines LR verändert wurde. Wenn ja: Name der Taxonomie anpassen
			if (feldname === "Einheit" && object.Taxonomie.Eigenschaften.Einheit === object.Taxonomie.Eigenschaften.Taxonomie) {
				// das ist die Wurzel der Taxonomie
				// somit ändert auch der Taxonomiename
				// diesen mitgeben
				// Einheit ändert und Taxonomiename muss auch angepasst werden
				object.Taxonomie.Name = feldwert;
				object.Taxonomie.Eigenschaften.Taxonomie = feldwert;
				// TODO: prüfen, ob die Änderung zulässig ist (Taxonomiename eindeutig) --- VOR DEM SPEICHERN
				// TODO: allfällige Beziehungen anpassen
			}
			// den übergebenen Wert im übergebenen Feldnamen speichern
			object.Taxonomie.Eigenschaften[feldname] = feldwert;
			$db.saveDoc(object, {
				success: function(data) {
					object._rev = data.rev;
					// prüfen, ob Label oder Name eines LR verändert wurde. Wenn ja: Hierarchie aktualisieren
					if (feldname === "Label" || feldname === "Einheit") {
						if (feldname === "Einheit" && object.Taxonomie.Eigenschaften.Einheit === object.Taxonomie.Eigenschaften.Taxonomie) {
							// das ist die Wurzel der Taxonomie
							// somit ändert auch der Taxonomiename
							// diesen mitgeben
							// Einheit ändert und Taxonomiename muss auch angepasst werden
							window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, feldwert);
							// Feld Taxonomie und Beschriftung des Accordions aktualisiern
							// dazu neu initiieren, weil sonst das Accordion nicht verändert wird
							window.adb.initiiere_art(id);
							// Taxonomie anzeigen
							$('#' + window.adb.ersetzeUngültigeZeichenInIdNamen(feldwert)).collapse('show');
						} else {
							window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren(null, object, true, false);
						}
						// node umbenennen
						var neuer_nodetext;
						if (feldname === "Label") {
							// object hat noch den alten Wert für Label, neuen verwenden
							neuer_nodetext = window.adb.erstelleLrLabelName(feldwert, object.Taxonomie.Eigenschaften.Einheit);
						} else {
							// object hat noch den alten Wert für Einheit, neuen verwenden
							neuer_nodetext = window.adb.erstelleLrLabelName(object.Taxonomie.Eigenschaften.Label, feldwert);
						}
						$("#tree" + window.adb.Gruppe).jstree("rename_node", "#" + object._id, neuer_nodetext);
					}
				},
				error: function() {
					$("#meldung_individuell_label").html("Fehler");
					$("#meldung_individuell_text").html("Die letzte Änderung im Feld "+feldname+" wurde nicht gespeichert");
					$("#meldung_individuell_schliessen").html("schliessen");
					$('#meldung_individuell').modal();
				}
			});
		},
		error: function() {
			$("#meldung_individuell_label").html("Fehler");
			$("#meldung_individuell_text").html("Die letzte Änderung im Feld "+feldname+" wurde nicht gespeichert");
			$("#meldung_individuell_schliessen").html("schliessen");
			$('#meldung_individuell').modal();
		}
	});
};

window.adb.convertToCorrectType = function(feldwert) {
	'use strict';
	var type = window.adb.myTypeOf(feldwert);
	if (type === "boolean") {
		return Boolean(feldwert);
	} else if (type === "float") {
		return parseFloat(feldwert);
	} else if (type === "integer") {
		return parseInt(feldwert);
	} else {
		return feldwert;
	}
};

// Hilfsfunktion, die typeof ersetzt und ergänzt
// typeof gibt bei input-Feldern immer String zurück!
window.adb.myTypeOf = function(wert) {
	'use strict';
	if (typeof wert === "boolean") {
		return "boolean";
	} else if (parseInt(wert) && parseFloat(wert) && parseInt(wert) != parseFloat(wert) && parseInt(wert) == wert) {
		// es ist eine Float
		return "float";
	// verhindern, dass führende Nullen abgeschnitten werden
	} else if (parseInt(wert) == wert && wert.toString().length === Math.ceil(parseInt(wert)/10)) {
		// es ist eine Integer
		return "integer";
	} else {
		// als String behandeln
		return "string";
	}
};

window.adb.bearbeiteLrTaxonomie = function() {
	'use strict';
	// Benutzer muss anmelden
	if (!window.adb.prüfeAnmeldung("art")) {
		return false;
	}

	// Einstellung merken, damit auch nach Datensatzwechsel die Bearbeitbarkeit bleibt
	localStorage.lr_bearb = true;

	// Anmeldung: zeigen, aber geschlossen
	$("#art_anmelden_collapse").collapse('hide');
	$("#art_anmelden").show();

	// alle Felder schreibbar setzen
	$(".Lebensräume.Taxonomie").find(".controls").each(function() {
		// einige Felder nicht bearbeiten
		if ($(this).attr('id') !== "GUID" && $(this).attr('id') !== "Parent" && $(this).attr('id') !== "Taxonomie" && $(this).attr('id') !== "Hierarchie") {
            var parent = $(this).parent();
			$(this).attr('readonly', false);
			if (parent.attr('href')) {
				parent.attr('href', '#');
				// Standardverhalten beim Klicken von Links verhindern
				parent.attr('onclick', 'return false;');
				// Mauspointer nicht mehr als Finger
				this.style.cursor = '';
			}
		}
	});

	// Schreibbarkeit in den Symbolen anzeigen
	$('.lr_bearb').removeClass('disabled');
	$(".lr_bearb_bearb").addClass('disabled');
};

window.adb.schützeLrTaxonomie = function() {
	'use strict';
	// alle Felder schreibbar setzen
	$(".Lebensräume.Taxonomie .controls").each(function() {
        var parent = $(this).parent();
		$(this).attr('readonly', true);
		if (parent.attr('href')) {
			var feldWert = $(this).val();
			if (typeof feldWert === "string" && feldWert.slice(0, 7) === "//") {
				parent.attr('href', feldWert);
				// falls onclick besteht, entfernen
				parent.removeAttr("onclick");
				// Mauspointer nicht mehr als Finger
				this.style.cursor = 'pointer';
			}
		}
	});
	$('.lr_bearb').addClass('disabled');
	$(".lr_bearb_bearb").removeClass('disabled');
	$("#art_anmelden").hide();
};

// aktualisiert die Hierarchie eines Arrays von Objekten (in dieser Form: Lebensräumen, siehe wie der Name der parent-objekte erstellt wird)
// der Array kann das Resultat einer Abfrage aus der DB sein (object[i] = dara.rows[i].doc)
// oder aus dem Import einer Taxonomie stammen
// diese Funktion wird benötigt, wenn eine neue Taxonomie importiert wird
// Momentan nicht verwendet
window.adb.aktualisiereHierarchieEinerLrTaxonomie = function(object_array) {
	'use strict';
	var object,
		hierarchie,
		parent;
    _.each(object_array, function(object) {
        hierarchie = [];
        parent = object.Taxonomie.Eigenschaften.Parent;
        // als Start sich selben zur Hierarchie hinzufügen
        hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(object));
        if (parent) {
            object.Taxonomie.Eigenschaften.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(object_array, object._id, hierarchie);
            $db.saveDoc(object);
        }
    });
};

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// diese Funktion wird benötigt, wenn ein neuer LR erstellt wird
// LR kann mitgegeben werden, muss aber nicht
// wird mitgegeben, wenn an den betreffenden lr nichts ändert und nicht jedes mal die LR aus der DB neu abgerufen werden sollen
// manchmal ist es aber nötig, die LR neu zu holen, wenn dazwischen an LR geändert wird!
window.adb.aktualisiereHierarchieEinesNeuenLr = function(lr, object, aktualisiere_hierarchiefeld) {
	'use strict';
	if (lr) {
		window.adb.aktualisiereHierarchieEinesNeuenLr_2(lr, object, aktualisiere_hierarchiefeld);
	} else {
		var $db = $.couch.db("artendb");
		$db.view('artendb/lr?include_docs=true', {
			success: function(data) {
				window.adb.aktualisiereHierarchieEinesNeuenLr_2(data, object, aktualisiere_hierarchiefeld);
			}
		});
	}
};

window.adb.aktualisiereHierarchieEinesNeuenLr_2 = function(LR, object) {
	'use strict';
	var object_array,
		hierarchie = [],
		parent_object,
		erstelleBaum = require('./modules/erstelleBaum');
	object_array = _.map(LR.rows, function(row) {
		return row.doc;
	});
	if (!object.Taxonomie) {
		object.Taxonomie = {};
	}
	if (!object.Taxonomie.Eigenschaften) {
		object.Taxonomie.Eigenschaften = {};
	}
	parent_object = _.find(object_array, function(obj) {
		return obj._id === object.Taxonomie.Eigenschaften.Parent.GUID;
	});
	// object.Name setzen
	object.Taxonomie.Name = parent_object.Taxonomie.Name;
	// object.Taxonomie.Eigenschaften.Taxonomie setzen
	object.Taxonomie.Eigenschaften.Taxonomie = parent_object.Taxonomie.Eigenschaften.Taxonomie;
	// als Start sich selben zur Hierarchie hinzufügen
	hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(object));
	object.Taxonomie.Eigenschaften.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(object_array, object.Taxonomie.Eigenschaften.Parent.GUID, hierarchie);
	// save ohne open: _rev wurde zuvor übernommen
	$db.saveDoc(object, {
		success: function() {
			$.when(erstelleBaum($)).then(function() {
				window.adb.öffneBaumZuId(object._id);
				$('#lr_parent_waehlen').modal('hide');
			});
		},
		error: function() {
			$("#meldung_individuell_label").html("Fehler");
			$("#meldung_individuell_text").html("Die Hierarchie des Lebensraums konnte nicht erstellt werden");
			$("#meldung_individuell_schliessen").html("schliessen");
			$('#meldung_individuell').modal();
			window.adb.initiiere_art(object._id);
		}
	});
};

// aktualisiert die Hierarchie eines Objekts (in dieser Form: Lebensraum)
// und auch den parent
// prüft, ob dieses Objekt children hat
// wenn ja, wird deren Hierarchie auch aktualisiert
// ist aktualisiereHierarchiefeld true, wird das Feld in der UI aktualisiert
// wird das Ergebnis der DB-Abfrage mitgegeben, wird die Abfrage nicht wiederholt
// diese Funktion wird benötigt, wenn Namen oder Label eines bestehenden LR verändert wird
window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren = function(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
	'use strict';
	if (lr) {
		window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
	} else {
		var $db = $.couch.db("artendb");
		$db.view('artendb/lr?include_docs=true', {
			success: function(lr) {
				window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, object, aktualisiereHierarchiefeld, einheit_ist_taxonomiename);
			}
		});
	}
};

window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2 = function(lr, objekt, aktualisiereHierarchiefeld, einheit_ist_taxonomiename) {
	'use strict';
	var hierarchie = [],
		parent = objekt.Taxonomie.Eigenschaften.Parent,
		object_array = _.map(lr.rows, function(row) {
			return row.doc;
		});
	if (!objekt.Taxonomie) {
		objekt.Taxonomie = {};
	}
	if (!objekt.Taxonomie.Eigenschaften) {
		objekt.Taxonomie.Eigenschaften = {};
	}
	// als Start sich selber zur Hierarchie hinzufügen
	hierarchie.push(window.adb.erstelleHierarchieobjektAusObjekt(objekt));
	if (parent.GUID !== objekt._id) {
		objekt.Taxonomie.Eigenschaften.Hierarchie = window.adb.ergänzeParentZuLrHierarchie(object_array, objekt.Taxonomie.Eigenschaften.Parent.GUID, hierarchie);
	} else {
		// aha, das ist die Wurzel des Baums
		objekt.Taxonomie.Eigenschaften.Hierarchie = hierarchie;
	}
	if (aktualisiereHierarchiefeld) {
		$("#Hierarchie").val(window.adb.erstelleHierarchieFürFeldAusHierarchieobjekteArray(objekt.Taxonomie.Eigenschaften.Hierarchie));
	}
	// jetzt den parent aktualisieren
	if (objekt.Taxonomie.Eigenschaften.Hierarchie.length > 1) {
		// es gibt höhere Ebenen
		// das vorletzte Hierarchieobjekt wählen. das ist length -2, weil length bei 1 beginnt, die Objekte aber von 0 an nummeriert werden
		objekt.Taxonomie.Eigenschaften.Parent = objekt.Taxonomie.Eigenschaften.Hierarchie[objekt.Taxonomie.Eigenschaften.Hierarchie.length-2];
	} else if (objekt.Taxonomie.Eigenschaften.Hierarchie.length === 1) {
		// das ist die oberste Ebene
		objekt.Taxonomie.Eigenschaften.Parent = objekt.Taxonomie.Eigenschaften.Hierarchie[0];
	}
	if (einheit_ist_taxonomiename) {
		// Einheit ändert und Taxonomiename muss auch angepasst werden
		objekt.Taxonomie.Name = einheit_ist_taxonomiename;
		objekt.Taxonomie.Eigenschaften.Taxonomie = einheit_ist_taxonomiename;
	}
	$db.saveDoc(objekt, {
		success: function() {
			var doc;
			// kontrollieren, ob das Objekt children hat. Wenn ja, diese aktualisieren
            _.each(lr.rows, function(lr_row) {
                doc = lr_row.doc;
                if (doc.Taxonomie && doc.Taxonomie.Eigenschaften && doc.Taxonomie.Eigenschaften.Parent && doc.Taxonomie.Eigenschaften.Parent.GUID && doc.Taxonomie.Eigenschaften.Parent.GUID === objekt._id && doc._id !== objekt._id) {
                    // das ist ein child
                    // auch aktualisieren
                    // lr mitgeben, damit die Abfrage nicht wiederholt werden muss
                    window.adb.aktualisiereHierarchieEinesLrInklusiveSeinerChildren_2(lr, doc, false, einheit_ist_taxonomiename);
                }
            });
		}
	});
};

// Baut den Hierarchiepfad für einen Lebensraum auf
// das erste Element - der Lebensraum selbst - wird mit der Variable "Hierarchie" übergeben
// ruft sich selbst rekursiv auf, bis das oberste Hierarchieelement erreicht ist
window.adb.ergänzeParentZuLrHierarchie = function(objekt_array, parentGUID, Hierarchie) {
	'use strict';
	var parent_objekt,
		hierarchie_ergänzt;
    _.each(objekt_array, function(object) {
        if (object._id === parentGUID) {
            parent_objekt = window.adb.erstelleHierarchieobjektAusObjekt(object);
            Hierarchie.push(parent_objekt);
            if (object.Taxonomie.Eigenschaften.Parent.GUID !== object._id) {
                // die Hierarchie ist noch nicht zu Ende - weitermachen
                hierarchie_ergänzt = window.adb.ergänzeParentZuLrHierarchie(objekt_array, object.Taxonomie.Eigenschaften.Parent.GUID, Hierarchie);
                return Hierarchie;
            } else {
                // jetzt ist die Hierarchie vollständig
                // sie ist aber verkehrt - umkehren
                return Hierarchie.reverse();
            }
        }
    });
};

window.adb.erstelleHierarchieobjektAusObjekt = function(objekt) {
	'use strict';
	var hierarchieobjekt = {};
	hierarchieobjekt.Name = window.adb.erstelleLrLabelNameAusObjekt(objekt);
	hierarchieobjekt.GUID = objekt._id;
	return hierarchieobjekt;
};

window.adb.erstelleLrLabelNameAusObjekt = function(objekt) {
	'use strict';
	var label = objekt.Taxonomie.Eigenschaften.Label || "",
		einheit = objekt.Taxonomie.Eigenschaften.Einheit || "";
	return window.adb.erstelleLrLabelName(label, einheit);
};

window.adb.erstelleLrLabelName = function(label, einheit) {
	'use strict';
	if (label && einheit) {
		return label + ": " + einheit;
	} else if (einheit) {
		return einheit;
	} else {
		// aha, ein neues Objekt, noch ohne Label und Einheit
		return "unbenannte Einheit";
	}
};

// löscht Datensätze in Massen
// nimmt einen Array von Objekten entgegen
// baut daraus einen neuen array auf, in dem die Objekte nur noch die benötigten Informationen haben
// aktualisiert die Objekte mit einer einzigen Operation
window.adb.löscheMassenMitObjektArray = function(object_array) {
	'use strict';
	var objekte_mit_objekte,
		objekte = [],
		new_objekt;
    _.each(object_array, function(object) {
        new_objekt = {};
        new_objekt._id = object._id;
        new_objekt._rev = object._rev;
        new_objekt._deleted = true;
        objekte.push(new_objekt);
    });
	objekte_mit_objekte = {};
	objekte_mit_objekte.docs = objekte;
	$.ajax({
		type: "POST",
		url: "../../_bulk_docs",
		contentType: "application/json", 
		data: JSON.stringify(objekte_mit_objekte)
	});
};

// erhält einen filterwert
// dieser kann zuvorderst einen Vergleichsoperator enthalten oder auch nicht
// retourniert einen Array mit 0 Vergleichsoperator und 1 filterwert
window.adb.ermittleVergleichsoperator = function(filterwert) {
	'use strict';
	var vergleichsoperator;
	if (filterwert.indexOf(">=") === 0) {
		vergleichsoperator = ">=";
		if (filterwert.indexOf(" ") === 2) {
			filterwert = filterwert.slice(3);
		} else {
			filterwert = filterwert.slice(2);
		}
	} else if (filterwert.indexOf("<=") === 0) {
		vergleichsoperator = "<=";
		if (filterwert.indexOf(" ") === 2) {
			filterwert = filterwert.slice(3);
		} else {
			filterwert = filterwert.slice(2);
		}
	} else if (filterwert.indexOf(">") === 0) {
		vergleichsoperator = ">";
		if (filterwert.indexOf(" ") === 1) {
			filterwert = filterwert.slice(2);
		} else {
			filterwert = filterwert.slice(1);
		}
	} else if (filterwert.indexOf("<") === 0) {
		vergleichsoperator = "<";
		if (filterwert.indexOf(" ") === 1) {
			filterwert = filterwert.slice(2);
		} else {
			filterwert = filterwert.slice(1);
		}
	} else if (filterwert.indexOf("=") === 0) {
		// abfangen, falls jemand "=" eingibt
		vergleichsoperator = "=";
		if (filterwert.indexOf(" ") === 1) {
			filterwert = filterwert.slice(2);
		} else {
			filterwert = filterwert.slice(1);
		}
	} else {
		vergleichsoperator = "kein";
	}
	return [vergleichsoperator, filterwert];
};

window.adb.ersetzeUngültigeZeichenInIdNamen = function(idname) {
	'use strict';
	return idname.replace(/\s+/g, " ").replace(/ /g,'').replace(/,/g,'').replace(/\./g,'').replace(/:/g,'').replace(/-/g,'').replace(/\//g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\&/g,'');
};

// kontrolliert den verwendeten Browser
// Quelle: //stackoverflow.com/questions/13478303/correct-way-to-use-modernizr-to-detect-ie
window.adb.browserDetect = {
	init: function() {
		this.browser = this.searchString(this.dataBrowser) || "Other";
		this.version = this.searchVersion(navigator.userAgent) ||	   this.searchVersion(navigator.appVersion) || "Unknown";
	},

	searchString: function(data) {
		for (var i=0 ; i < data.length ; i++)   
		{
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;

			if (dataString.indexOf(data[i].subString) != -1)
			{
				return data[i].identity;
			}
		}
	},

	searchVersion: function(dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},

	dataBrowser: [
		{ string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
		{ string: navigator.userAgent, subString: "MSIE",	 identity: "Explorer" },
		{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
		{ string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
		{ string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

/*
* Bootstrap file uploader
* Quelle: //jasny.github.io/bootstrap/javascript.html#fileupload
*/
/**
* Bootstrap.js by @mdo and @fat, extended by @ArnoldDaniels.
* plugins: bootstrap-fileupload.js
* Copyright 2012 Twitter, Inc.
* //apache.org/licenses/LICENSE-2.0.txt
*/
!function(e){var t=function(t,n){this.$element=e(t),this.type=this.$element.data("uploadtype")||(this.$element.find(".thumbnail").length>0?"image":"file"),this.$input=this.$element.find(":file");if(this.$input.length===0)return;this.name=this.$input.attr("name")||n.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),this.$hidden.length===0&&(this.$hidden=e('<input type="hidden" />'),this.$element.prepend(this.$hidden)),this.$preview=this.$element.find(".fileupload-preview");var r=this.$preview.css("height");this.$preview.css("display")!="inline"&&r!="0px"&&r!="none"&&this.$preview.css("line-height",r),this.original={exists:this.$element.hasClass("fileupload-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.$remove=this.$element.find('[data-dismiss="fileupload"]'),this.$element.find('[data-trigger="fileupload"]').on("click.fileupload",e.proxy(this.trigger,this)),this.listen()};t.prototype={listen:function(){this.$input.on("change.fileupload",e.proxy(this.change,this)),e(this.$input[0].form).on("reset.fileupload",e.proxy(this.reset,this)),this.$remove&&this.$remove.on("click.fileupload",e.proxy(this.clear,this))},change:function(e,t){if(t==="clear")return;var n=e.target.files!==undefined?e.target.files[0]:e.target.value?{name:e.target.value.replace(/^.+\\/,"")}:null;if(!n){this.clear();return}this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);if(this.type==="image"&&this.$preview.length>0&&(typeof n.type!="undefined"?n.type.match("image.*"):n.name.match(/\.(gif|png|jpe?g)$/i))&&typeof FileReader!="undefined"){var r=new FileReader,i=this.$preview,s=this.$element;r.onload=function(e){i.html('<img src="'+e.target.result+'" '+(i.css("max-height")!="none"?'style="max-height: '+i.css("max-height")+';"':"")+" />"),s.addClass("fileupload-exists").removeClass("fileupload-new")},r.readAsDataURL(n)}else this.$preview.text(n.name),this.$element.addClass("fileupload-exists").removeClass("fileupload-new")},clear:function(e){this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name","");if(navigator.userAgent.match(/msie/i)){var t=this.$input.clone(!0);this.$input.after(t),this.$input.remove(),this.$input=t}else this.$input.val("");this.$preview.html(""),this.$element.addClass("fileupload-new").removeClass("fileupload-exists"),e&&(this.$input.trigger("change",["clear"]),e.preventDefault ? e.preventDefault() : e.returnValue = false)},reset:function(e){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.original.exists?this.$element.addClass("fileupload-exists").removeClass("fileupload-new"):this.$element.addClass("fileupload-new").removeClass("fileupload-exists")},trigger:function(e){this.$input.trigger("click"),e.preventDefault ? e.preventDefault() : e.returnValue = false}},e.fn.fileupload=function(n){return this.each(function(){var r=e(this),i=r.data("fileupload");i||r.data("fileupload",i=new t(this,n)),typeof n=="string"&&i[n]()})},e.fn.fileupload.Constructor=t,e(document).on("click.fileupload.data-api",'[data-provides="fileupload"]',function(t){var n=e(this);if(n.data("fileupload"))return;n.fileupload(n.data());var r=e(t.target).closest('[data-dismiss="fileupload"],[data-trigger="fileupload"]');r.length>0&&(r.trigger("click.fileupload"),t.preventDefault())})}(window.jQuery);
},{"./modules/erstelleBaum":"/Users/alex/artendb/vendor/couchapp/_attachments/modules/erstelleBaum.js","./modules/holeDatenUrlFuerTreeOberstesLevel":"/Users/alex/artendb/vendor/couchapp/_attachments/modules/holeDatenUrlFuerTreeOberstesLevel.js","./modules/holeDatenUrlFuerTreeUntereLevel":"/Users/alex/artendb/vendor/couchapp/_attachments/modules/holeDatenUrlFuerTreeUntereLevel.js","./modules/initiiereSuchfeld":"/Users/alex/artendb/vendor/couchapp/_attachments/modules/initiiereSuchfeld.js","autolinker":"/Users/alex/artendb/node_modules/autolinker/dist/Autolinker.js"}],"/Users/alex/artendb/node_modules/autolinker/dist/Autolinker.js":[function(require,module,exports){
/*!
 * Autolinker.js
 * 0.12.2
 *
 * Copyright(c) 2014 Gregory Jacobs <greg@greg-jacobs.com>
 * MIT Licensed. http://www.opensource.org/licenses/mit-license.php
 *
 * https://github.com/gregjacobs/Autolinker.js
 */
/*global define, module */
( function( root, factory ) {

	if( typeof define === 'function' && define.amd ) {
		define( factory );             // Define as AMD module if an AMD loader is present (ex: RequireJS).
	} else if( typeof exports !== 'undefined' ) {
		module.exports = factory();    // Define as CommonJS module for Node.js, if available.
	} else {
		root.Autolinker = factory();   // Finally, define as a browser global if no module loader.
	}
}( this, function() {

	/**
	 * @class Autolinker
	 * @extends Object
	 * 
	 * Utility class used to process a given string of text, and wrap the URLs, email addresses, and Twitter handles in 
	 * the appropriate anchor (&lt;a&gt;) tags to turn them into links.
	 * 
	 * Any of the configuration options may be provided in an Object (map) provided to the Autolinker constructor, which
	 * will configure how the {@link #link link()} method will process the links.
	 * 
	 * For example:
	 * 
	 *     var autolinker = new Autolinker( {
	 *         newWindow : false,
	 *         truncate  : 30
	 *     } );
	 *     
	 *     var html = autolinker.link( "Joe went to www.yahoo.com" );
	 *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
	 * 
	 * 
	 * The {@link #static-link static link()} method may also be used to inline options into a single call, which may
	 * be more convenient for one-off uses. For example:
	 * 
	 *     var html = Autolinker.link( "Joe went to www.yahoo.com", {
	 *         newWindow : false,
	 *         truncate  : 30
	 *     } );
	 *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
	 * 
	 * 
	 * ## Custom Replacements of Links
	 * 
	 * If the configuration options do not provide enough flexibility, a {@link #replaceFn} may be provided to fully customize
	 * the output of Autolinker. This function is called once for each URL/Email/Twitter handle match that is encountered.
	 * 
	 * For example:
	 * 
	 *     var input = "...";  // string with URLs, Email Addresses, and Twitter Handles
	 *     
	 *     var linkedText = Autolinker.link( input, {
	 *         replaceFn : function( autolinker, match ) {
	 *             console.log( "href = ", match.getAnchorHref() );
	 *             console.log( "text = ", match.getAnchorText() );
	 *         
	 *             switch( match.getType() ) {
	 *                 case 'url' : 
	 *                     console.log( "url: ", match.getUrl() );
	 *                     
	 *                     if( match.getUrl().indexOf( 'mysite.com' ) === -1 ) {
	 *                         var tag = autolinker.getTagBuilder().build( match );  // returns an `Autolinker.HtmlTag` instance, which provides mutator methods for easy changes
	 *                         tag.setAttr( 'rel', 'nofollow' );
	 *                         tag.addClass( 'external-link' );
	 *                         
	 *                         return tag;
	 *                         
	 *                     } else {
	 *                         return true;  // let Autolinker perform its normal anchor tag replacement
	 *                     }
	 *                     
	 *                 case 'email' :
	 *                     var email = match.getEmail();
	 *                     console.log( "email: ", email );
	 *                     
	 *                     if( email === "my@own.address" ) {
	 *                         return false;  // don't auto-link this particular email address; leave as-is
	 *                     } else {
	 *                         return;  // no return value will have Autolinker perform its normal anchor tag replacement (same as returning `true`)
	 *                     }
	 *                 
	 *                 case 'twitter' :
	 *                     var twitterHandle = match.getTwitterHandle();
	 *                     console.log( twitterHandle );
	 *                     
	 *                     return '<a href="http://newplace.to.link.twitter.handles.to/">' + twitterHandle + '</a>';
	 *             }
	 *         }
	 *     } );
	 * 
	 * 
	 * The function may return the following values:
	 * 
	 * - `true` (Boolean): Allow Autolinker to replace the match as it normally would.
	 * - `false` (Boolean): Do not replace the current match at all - leave as-is.
	 * - Any String: If a string is returned from the function, the string will be used directly as the replacement HTML for
	 *   the match.
	 * - An {@link Autolinker.HtmlTag} instance, which can be used to build/modify an HTML tag before writing out its HTML text.
	 * 
	 * @constructor
	 * @param {Object} [config] The configuration options for the Autolinker instance, specified in an Object (map).
	 */
	var Autolinker = function( cfg ) {
		Autolinker.Util.assign( this, cfg );  // assign the properties of `cfg` onto the Autolinker instance. Prototype properties will be used for missing configs.
	};
	
	
	Autolinker.prototype = {
		constructor : Autolinker,  // fix constructor property
		
		/**
		 * @cfg {Boolean} urls
		 * 
		 * `true` if miscellaneous URLs should be automatically linked, `false` if they should not be.
		 */
		urls : true,
		
		/**
		 * @cfg {Boolean} email
		 * 
		 * `true` if email addresses should be automatically linked, `false` if they should not be.
		 */
		email : true,
		
		/**
		 * @cfg {Boolean} twitter
		 * 
		 * `true` if Twitter handles ("@example") should be automatically linked, `false` if they should not be.
		 */
		twitter : true,
		
		/**
		 * @cfg {Boolean} newWindow
		 * 
		 * `true` if the links should open in a new window, `false` otherwise.
		 */
		newWindow : true,
		
		/**
		 * @cfg {Boolean} stripPrefix
		 * 
		 * `true` if 'http://' or 'https://' and/or the 'www.' should be stripped from the beginning of URL links' text, 
		 * `false` otherwise.
		 */
		stripPrefix : true,
		
		/**
		 * @cfg {Number} truncate
		 * 
		 * A number for how many characters long URLs/emails/twitter handles should be truncated to inside the text of 
		 * a link. If the URL/email/twitter is over this number of characters, it will be truncated to this length by 
		 * adding a two period ellipsis ('..') to the end of the string.
		 * 
		 * For example: A url like 'http://www.yahoo.com/some/long/path/to/a/file' truncated to 25 characters might look
		 * something like this: 'yahoo.com/some/long/pat..'
		 */
		
		/**
		 * @cfg {String} className
		 * 
		 * A CSS class name to add to the generated links. This class will be added to all links, as well as this class
		 * plus url/email/twitter suffixes for styling url/email/twitter links differently.
		 * 
		 * For example, if this config is provided as "myLink", then:
		 * 
		 * - URL links will have the CSS classes: "myLink myLink-url"
		 * - Email links will have the CSS classes: "myLink myLink-email", and
		 * - Twitter links will have the CSS classes: "myLink myLink-twitter"
		 */
		className : "",
			
		/**
		 * @cfg {Function} replaceFn
		 * 
		 * A function to individually process each URL/Email/Twitter match found in the input string.
		 * 
		 * See the class's description for usage.
		 * 
		 * This function is called with the following parameters:
		 * 
		 * @cfg {Autolinker} replaceFn.autolinker The Autolinker instance, which may be used to retrieve child objects from (such
		 *   as the instance's {@link #getTagBuilder tag builder}).
		 * @cfg {Autolinker.match.Match} replaceFn.match The Match instance which can be used to retrieve information about the
		 *   {@link Autolinker.match.Url URL}/{@link Autolinker.match.Email email}/{@link Autolinker.match.Twitter Twitter}
		 *   match that the `replaceFn` is currently processing.
		 */
		
		
		/**
		 * @private
		 * @property {RegExp} htmlCharacterEntitiesRegex
		 *
		 * The regular expression that matches common HTML character entities.
		 * 
		 * Ignoring &amp; as it could be part of a query string -- handling it separately.
		 */
		htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;)/gi,
		
		/**
		 * @private
		 * @property {RegExp} matcherRegex
		 * 
		 * The regular expression that matches URLs, email addresses, and Twitter handles.
		 * 
		 * This regular expression has the following capturing groups:
		 * 
		 * 1. Group that is used to determine if there is a Twitter handle match (i.e. \@someTwitterUser). Simply check for its 
		 *    existence to determine if there is a Twitter handle match. The next couple of capturing groups give information 
		 *    about the Twitter handle match.
		 * 2. The whitespace character before the \@sign in a Twitter handle. This is needed because there are no lookbehinds in
		 *    JS regular expressions, and can be used to reconstruct the original string in a replace().
		 * 3. The Twitter handle itself in a Twitter match. If the match is '@someTwitterUser', the handle is 'someTwitterUser'.
		 * 4. Group that matches an email address. Used to determine if the match is an email address, as well as holding the full 
		 *    address. Ex: 'me@my.com'
		 * 5. Group that matches a URL in the input text. Ex: 'http://google.com', 'www.google.com', or just 'google.com'.
		 *    This also includes a path, url parameters, or hash anchors. Ex: google.com/path/to/file?q1=1&q2=2#myAnchor
		 * 6. A protocol-relative ('//') match for the case of a 'www.' prefixed URL. Will be an empty string if it is not a 
		 *    protocol-relative match. We need to know the character before the '//' in order to determine if it is a valid match
		 *    or the // was in a string we don't want to auto-link.
		 * 7. A protocol-relative ('//') match for the case of a known TLD prefixed URL. Will be an empty string if it is not a 
		 *    protocol-relative match. See #6 for more info. 
		 */
		matcherRegex : (function() {
			var twitterRegex = /(^|[^\w])@(\w{1,15})/,              // For matching a twitter handle. Ex: @gregory_jacobs
			    
			    emailRegex = /(?:[\-;:&=\+\$,\w\.]+@)/,             // something@ for email addresses (a.k.a. local-part)
			    
			    protocolRegex = /(?:[A-Za-z]{3,9}:(?:\/\/)?)/,      // match protocol, allow in format http:// or mailto:
			    wwwRegex = /(?:www\.)/,                             // starting with 'www.'
			    domainNameRegex = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/,  // anything looking at all like a domain, non-unicode domains, not ending in a period
			    tldRegex = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/,   // match our known top level domains (TLDs)
			    
			    // Allow optional path, query string, and hash anchor, not ending in the following characters: "!:,.;"
			    // http://blog.codinghorror.com/the-problem-with-urls/
			    urlSuffixRegex = /(?:[\-A-Za-z0-9+&@#\/%?=~_()|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|])?/;  // note: optional part of the full regex
			
			return new RegExp( [
				'(',  // *** Capturing group $1, which can be used to check for a twitter handle match. Use group $3 for the actual twitter handle though. $2 may be used to reconstruct the original string in a replace() 
					// *** Capturing group $2, which matches the whitespace character before the '@' sign (needed because of no lookbehinds), and 
					// *** Capturing group $3, which matches the actual twitter handle
					twitterRegex.source,
				')',
				
				'|',
				
				'(',  // *** Capturing group $4, which is used to determine an email match
					emailRegex.source,
					domainNameRegex.source,
					tldRegex.source,
				')',
				
				'|',
				
				'(',  // *** Capturing group $5, which is used to match a URL
					'(?:', // parens to cover match for protocol (optional), and domain
						'(?:',  // non-capturing paren for a protocol-prefixed url (ex: http://google.com)
							protocolRegex.source,
							domainNameRegex.source,
						')',
						
						'|',
						
						'(?:',  // non-capturing paren for a 'www.' prefixed url (ex: www.google.com)
							'(.?//)?',  // *** Capturing group $6 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character
							wwwRegex.source,
							domainNameRegex.source,
						')',
						
						'|',
						
						'(?:',  // non-capturing paren for known a TLD url (ex: google.com)
							'(.?//)?',  // *** Capturing group $7 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character
							domainNameRegex.source,
							tldRegex.source,
						')',
					')',
					
					urlSuffixRegex.source,  // match for path, query string, and/or hash anchor
				')'
			].join( "" ), 'gi' );
		} )(),
		
		/**
		 * @private
		 * @property {RegExp} invalidProtocolRelMatchRegex
		 * 
		 * The regular expression used to check a potential protocol-relative URL match, coming from the {@link #matcherRegex}. 
		 * A protocol-relative URL is, for example, "//yahoo.com"
		 * 
		 * This regular expression is used in conjunction with the {@link #matcherRegex}, and checks to see if there is a word character
		 * before the '//' in order to determine if we should actually autolink a protocol-relative URL. This is needed because there
		 * is no negative look-behind in JavaScript regular expressions. 
		 * 
		 * For instance, we want to autolink something like "//google.com", but we don't want to autolink something 
		 * like "abc//google.com"
		 */
		invalidProtocolRelMatchRegex : /^[\w]\/\//,
		
		/**
		 * @private
		 * @property {RegExp} charBeforeProtocolRelMatchRegex
		 * 
		 * The regular expression used to retrieve the character before a protocol-relative URL match.
		 * 
		 * This is used in conjunction with the {@link #matcherRegex}, which needs to grab the character before a protocol-relative
		 * '//' due to the lack of a negative look-behind in JavaScript regular expressions. The character before the match is stripped
		 * from the URL.
		 */
		charBeforeProtocolRelMatchRegex : /^(.)?\/\//,
		
		/**
		 * @private
		 * @property {Autolinker.HtmlParser} htmlParser
		 * 
		 * The HtmlParser instance used to skip over HTML tags, while finding text nodes to process. This is lazily instantiated
		 * in the {@link #getHtmlParser} method.
		 */
		
		/**
		 * @private
		 * @property {Autolinker.AnchorTagBuilder} tagBuilder
		 * 
		 * The AnchorTagBuilder instance used to build the URL/email/Twitter replacement anchor tags. This is lazily instantiated
		 * in the {@link #getTagBuilder} method.
		 */
		
		
		/**
		 * Automatically links URLs, email addresses, and Twitter handles found in the given chunk of HTML. 
		 * Does not link URLs found within HTML tags.
		 * 
		 * For instance, if given the text: `You should go to http://www.yahoo.com`, then the result
		 * will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
		 * 
		 * This method finds the text around any HTML elements in the input `textOrHtml`, which will be the text that is processed.
		 * Any original HTML elements will be left as-is, as well as the text that is already wrapped in anchor (&lt;a&gt;) tags.
		 * 
		 * @param {String} textOrHtml The HTML or text to link URLs, email addresses, and Twitter handles within.
		 * @return {String} The HTML, with URLs/emails/Twitter handles automatically linked.
		 */
		link : function( textOrHtml ) {
			var me = this,  // for closure
			    htmlParser = this.getHtmlParser(),
			    htmlCharacterEntitiesRegex = this.htmlCharacterEntitiesRegex,
			    anchorTagStackCount = 0,  // used to only process text around anchor tags, and any inner text/html they may have
			    resultHtml = [];
			
			htmlParser.parse( textOrHtml, {
				// Process HTML nodes in the input `textOrHtml`
				processHtmlNode : function( tagText, tagName, isClosingTag ) {
					if( tagName === 'a' ) {
						if( !isClosingTag ) {  // it's the start <a> tag
							anchorTagStackCount++;
						} else {   // it's the end </a> tag
							anchorTagStackCount = Math.max( anchorTagStackCount - 1, 0 );  // attempt to handle extraneous </a> tags by making sure the stack count never goes below 0
						}
					}
					resultHtml.push( tagText );  // now add the text of the tag itself verbatim
				},
				
				// Process text nodes in the input `textOrHtml`
				processTextNode : function( text ) {
					if( anchorTagStackCount === 0 ) {
						// If we're not within an <a> tag, process the text node
						var unescapedText = Autolinker.Util.splitAndCapture( text, htmlCharacterEntitiesRegex );  // split at HTML entities, but include the HTML entities in the results array
						
						for ( var i = 0, len = unescapedText.length; i < len; i++ ) {
							var textToProcess = unescapedText[ i ],
							    processedTextNode = me.processTextNode( textToProcess );
							
							resultHtml.push( processedTextNode );
						}
						
					} else {
						// `text` is within an <a> tag, simply append the text - we do not want to autolink anything 
						// already within an <a>...</a> tag
						resultHtml.push( text );
					}
				}
			} );
			
			return resultHtml.join( "" );
		},
		
		
		/**
		 * Lazily instantiates and returns the {@link #htmlParser} instance for this Autolinker instance.
		 * 
		 * @protected
		 * @return {Autolinker.HtmlParser}
		 */
		getHtmlParser : function() {
			var htmlParser = this.htmlParser;
			
			if( !htmlParser ) {
				htmlParser = this.htmlParser = new Autolinker.HtmlParser();
			}
			
			return htmlParser;
		},
		
		
		/**
		 * Returns the {@link #tagBuilder} instance for this Autolinker instance, lazily instantiating it
		 * if it does not yet exist.
		 * 
		 * This method may be used in a {@link #replaceFn} to generate the {@link Autolinker.HtmlTag HtmlTag} instance that 
		 * Autolinker would normally generate, and then allow for modifications before returning it. For example:
		 * 
		 *     var html = Autolinker.link( "Test google.com", {
		 *         replaceFn : function( autolinker, match ) {
		 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
		 *             tag.setAttr( 'rel', 'nofollow' );
		 *             
		 *             return tag;
		 *         }
		 *     } );
		 *     
		 *     // generated html:
		 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
		 * 
		 * @return {Autolinker.AnchorTagBuilder}
		 */
		getTagBuilder : function() {
			var tagBuilder = this.tagBuilder;
			
			if( !tagBuilder ) {
				tagBuilder = this.tagBuilder = new Autolinker.AnchorTagBuilder( {
					newWindow   : this.newWindow,
					truncate    : this.truncate,
					className   : this.className
				} );
			}
			
			return tagBuilder;
		},
		
		
		/**
		 * Process the text that lies inbetween HTML tags. This method does the actual wrapping of URLs with
		 * anchor tags.
		 * 
		 * @private
		 * @param {String} text The text to auto-link.
		 * @return {String} The text with anchor tags auto-filled.
		 */
		processTextNode : function( text ) {
			var me = this,  // for closure
			    charBeforeProtocolRelMatchRegex = this.charBeforeProtocolRelMatchRegex;
			
			return text.replace( this.matcherRegex, function( matchStr, $1, $2, $3, $4, $5, $6, $7 ) {
				var twitterMatch = $1,
				    twitterHandlePrefixWhitespaceChar = $2,  // The whitespace char before the @ sign in a Twitter handle match. This is needed because of no lookbehinds in JS regexes.
				    twitterHandle = $3,      // The actual twitterUser (i.e the word after the @ sign in a Twitter handle match)
				    emailAddressMatch = $4,  // For both determining if it is an email address, and stores the actual email address
				    urlMatch = $5,           // The matched URL string
				    protocolRelativeMatch = $6 || $7,  // The '//' for a protocol-relative match, with the character that comes before the '//'
				    
				    prefixStr = "",       // A string to use to prefix the anchor tag that is created. This is needed for the Twitter handle match
				    suffixStr = "",       // A string to suffix the anchor tag that is created. This is used if there is a trailing parenthesis that should not be auto-linked.
				    
				    match;  // Will be an Autolinker.match.Match object
				
				
				// Return out with no changes for match types that are disabled (url, email, twitter), or for matches that are 
				// invalid (false positives from the matcherRegex, which can't use look-behinds since they are unavailable in JS).
				if( !me.isValidMatch( twitterMatch, emailAddressMatch, urlMatch, protocolRelativeMatch ) ) {
					return matchStr;
				}
				
				// Handle a closing parenthesis at the end of the match, and exclude it if there is not a matching open parenthesis
				// in the match itself. 
				if( me.matchHasUnbalancedClosingParen( matchStr ) ) {
					matchStr = matchStr.substr( 0, matchStr.length - 1 );  // remove the trailing ")"
					suffixStr = ")";  // this will be added after the generated <a> tag
				}
				
				
				if( emailAddressMatch ) {
					match = new Autolinker.match.Email( { matchedText: matchStr, email: emailAddressMatch } );
					
				} else if( twitterMatch ) {
					// fix up the `matchStr` if there was a preceding whitespace char, which was needed to determine the match 
					// itself (since there are no look-behinds in JS regexes)
					if( twitterHandlePrefixWhitespaceChar ) {
						prefixStr = twitterHandlePrefixWhitespaceChar;
						matchStr = matchStr.slice( 1 );  // remove the prefixed whitespace char from the match
					}
					match = new Autolinker.match.Twitter( { matchedText: matchStr, twitterHandle: twitterHandle } );
					
				} else {  // url match
					// If it's a protocol-relative '//' match, remove the character before the '//' (which the matcherRegex needed
					// to match due to the lack of a negative look-behind in JavaScript regular expressions)
					if( protocolRelativeMatch ) {
						var charBeforeMatch = protocolRelativeMatch.match( charBeforeProtocolRelMatchRegex )[ 1 ] || "";
						
						if( charBeforeMatch ) {  // fix up the `matchStr` if there was a preceding char before a protocol-relative match, which was needed to determine the match itself (since there are no look-behinds in JS regexes)
							prefixStr = charBeforeMatch;
							matchStr = matchStr.slice( 1 );  // remove the prefixed char from the match
						}
					}
					
					match = new Autolinker.match.Url( {
						matchedText : matchStr,
						url : matchStr,
						protocolRelativeMatch : protocolRelativeMatch,
						stripPrefix : me.stripPrefix
					} );
				}
	
				// Generate the replacement text for the match
				var matchReturnVal = me.createMatchReturnVal( match, matchStr );
				return prefixStr + matchReturnVal + suffixStr;
			} );
		},
		
		
		/**
		 * Determines if a given match found by {@link #processTextNode} is valid. Will return `false` for:
		 * 
		 * 1) Disabled link types (i.e. having a Twitter match, but {@link #twitter} matching is disabled)
		 * 2) URL matches which do not have at least have one period ('.') in the domain name (effectively skipping over 
		 *    matches like "abc:def")
		 * 3) A protocol-relative url match (a URL beginning with '//') whose previous character is a word character 
		 *    (effectively skipping over strings like "abc//google.com")
		 * 
		 * Otherwise, returns `true`.
		 * 
		 * @private
		 * @param {String} twitterMatch The matched Twitter handle, if there was one. Will be empty string if the match is not a 
		 *   Twitter match.
		 * @param {String} emailAddressMatch The matched Email address, if there was one. Will be empty string if the match is not 
		 *   an Email address match.
		 * @param {String} urlMatch The matched URL, if there was one. Will be an empty string if the match is not a URL match.
		 * @param {String} protocolRelativeMatch The protocol-relative string for a URL match (i.e. '//'), possibly with a preceding
		 *   character (ex, a space, such as: ' //', or a letter, such as: 'a//'). The match is invalid if there is a word character
		 *   preceding the '//'.
		 * @return {Boolean} `true` if the match given is valid and should be processed, or `false` if the match is invalid and/or 
		 *   should just not be processed (such as, if it's a Twitter match, but {@link #twitter} matching is disabled}.
		 */
		isValidMatch : function( twitterMatch, emailAddressMatch, urlMatch, protocolRelativeMatch ) {
			if( 
			    ( twitterMatch && !this.twitter ) || ( emailAddressMatch && !this.email ) || ( urlMatch && !this.urls ) ||
			    ( urlMatch && urlMatch.indexOf( '.' ) === -1 ) ||  // At least one period ('.') must exist in the URL match for us to consider it an actual URL
			    ( urlMatch && /^[A-Za-z]{3,9}:/.test( urlMatch ) && !/:.*?[A-Za-z]/.test( urlMatch ) ) ||     // At least one letter character must exist in the domain name after a protocol match. Ex: skip over something like "git:1.0"
			    ( protocolRelativeMatch && this.invalidProtocolRelMatchRegex.test( protocolRelativeMatch ) )  // a protocol-relative match which has a word character in front of it (so we can skip something like "abc//google.com")
			) {
				return false;
			}
			
			return true;
		},
		
		
		/**
		 * Determines if a match found has an unmatched closing parenthesis. If so, this parenthesis will be removed
		 * from the match itself, and appended after the generated anchor tag in {@link #processTextNode}.
		 * 
		 * A match may have an extra closing parenthesis at the end of the match because the regular expression must include parenthesis
		 * for URLs such as "wikipedia.com/something_(disambiguation)", which should be auto-linked. 
		 * 
		 * However, an extra parenthesis *will* be included when the URL itself is wrapped in parenthesis, such as in the case of
		 * "(wikipedia.com/something_(disambiguation))". In this case, the last closing parenthesis should *not* be part of the URL 
		 * itself, and this method will return `true`.
		 * 
		 * @private
		 * @param {String} matchStr The full match string from the {@link #matcherRegex}.
		 * @return {Boolean} `true` if there is an unbalanced closing parenthesis at the end of the `matchStr`, `false` otherwise.
		 */
		matchHasUnbalancedClosingParen : function( matchStr ) {
			var lastChar = matchStr.charAt( matchStr.length - 1 );
			
			if( lastChar === ')' ) {
				var openParensMatch = matchStr.match( /\(/g ),
				    closeParensMatch = matchStr.match( /\)/g ),
				    numOpenParens = ( openParensMatch && openParensMatch.length ) || 0,
				    numCloseParens = ( closeParensMatch && closeParensMatch.length ) || 0;
				
				if( numOpenParens < numCloseParens ) {
					return true;
				}
			}
			
			return false;
		},
		
		
		/**
		 * Creates the return string value for a given match in the input string, for the {@link #processTextNode} method.
		 * 
		 * This method handles the {@link #replaceFn}, if one was provided.
		 * 
		 * @private
		 * @param {Autolinker.match.Match} match The Match object that represents the match.
		 * @param {String} matchStr The original match string, after having been preprocessed to fix match edge cases (see
		 *   the `prefixStr` and `suffixStr` vars in {@link #processTextNode}.
		 * @return {String} The string that the `match` should be replaced with. This is usually the anchor tag string, but
		 *   may be the `matchStr` itself if the match is not to be replaced.
		 */
		createMatchReturnVal : function( match, matchStr ) {
			// Handle a custom `replaceFn` being provided
			var replaceFnResult;
			if( this.replaceFn ) {
				replaceFnResult = this.replaceFn.call( this, this, match );  // Autolinker instance is the context, and the first arg
			}
			
			if( typeof replaceFnResult === 'string' ) {
				return replaceFnResult;  // `replaceFn` returned a string, use that
				
			} else if( replaceFnResult === false ) {
				return matchStr;  // no replacement for the match
				
			} else if( replaceFnResult instanceof Autolinker.HtmlTag ) {
				return replaceFnResult.toString();
			
			} else {  // replaceFnResult === true, or no/unknown return value from function
				// Perform Autolinker's default anchor tag generation
				var tagBuilder = this.getTagBuilder(),
				    anchorTag = tagBuilder.build( match );  // returns an Autolinker.HtmlTag instance
				
				return anchorTag.toString();
			}
		}
	
	};
	
	
	/**
	 * Automatically links URLs, email addresses, and Twitter handles found in the given chunk of HTML. 
	 * Does not link URLs found within HTML tags.
	 * 
	 * For instance, if given the text: `You should go to http://www.yahoo.com`, then the result
	 * will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
	 * 
	 * Example:
	 * 
	 *     var linkedText = Autolinker.link( "Go to google.com", { newWindow: false } );
	 *     // Produces: "Go to <a href="http://google.com">google.com</a>"
	 * 
	 * @static
	 * @method link
	 * @param {String} html The HTML text to link URLs within.
	 * @param {Object} [options] Any of the configuration options for the Autolinker class, specified in an Object (map).
	 *   See the class description for an example call.
	 * @return {String} The HTML text, with URLs automatically linked
	 */
	Autolinker.link = function( text, options ) {
		var autolinker = new Autolinker( options );
		return autolinker.link( text );
	};
	
	
	// Namespace for `match` classes
	Autolinker.match = {};
	/*global Autolinker */
	/*jshint eqnull:true, boss:true */
	/**
	 * @class Autolinker.Util
	 * @singleton
	 * 
	 * A few utility methods for Autolinker.
	 */
	Autolinker.Util = {
		
		/**
		 * @property {Function} abstractMethod
		 * 
		 * A function object which represents an abstract method.
		 */
		abstractMethod : function() { throw "abstract"; },
		
		
		/**
		 * Assigns (shallow copies) the properties of `src` onto `dest`.
		 * 
		 * @param {Object} dest The destination object.
		 * @param {Object} src The source object.
		 * @return {Object} The destination object.
		 */
		assign : function( dest, src ) {
			for( var prop in src ) {
				if( src.hasOwnProperty( prop ) ) {
					dest[ prop ] = src[ prop ];
				}
			}
			
			return dest;
		},
		
		
		/**
		 * Extends `superclass` to create a new subclass, adding the `protoProps` to the new subclass's prototype.
		 * 
		 * @param {Function} superclass The constructor function for the superclass.
		 * @param {Object} protoProps The methods/properties to add to the subclass's prototype. This may contain the
		 *   special property `constructor`, which will be used as the new subclass's constructor function.
		 * @return {Function} The new subclass function.
		 */
		extend : function( superclass, protoProps ) {
			var superclassProto = superclass.prototype;
			
			var F = function() {};
			F.prototype = superclassProto;
			
			var subclass;
			if( protoProps.hasOwnProperty( 'constructor' ) ) {
				subclass = protoProps.constructor;
			} else {
				subclass = function() { superclassProto.constructor.apply( this, arguments ); };
			}
			
			var subclassProto = subclass.prototype = new F();  // set up prototype chain
			subclassProto.constructor = subclass;  // fix constructor property
			subclassProto.superclass = superclassProto;
			
			delete protoProps.constructor;  // don't re-assign constructor property to the prototype, since a new function may have been created (`subclass`), which is now already there
			Autolinker.Util.assign( subclassProto, protoProps );
			
			return subclass;
		},
		
		
		/**
		 * Truncates the `str` at `len - ellipsisChars.length`, and adds the `ellipsisChars` to the
		 * end of the string (by default, two periods: '..'). If the `str` length does not exceed 
		 * `len`, the string will be returned unchanged.
		 * 
		 * @param {String} str The string to truncate and add an ellipsis to.
		 * @param {Number} truncateLen The length to truncate the string at.
		 * @param {String} [ellipsisChars=..] The ellipsis character(s) to add to the end of `str`
		 *   when truncated. Defaults to '..'
		 */
		ellipsis : function( str, truncateLen, ellipsisChars ) {
			if( str.length > truncateLen ) {
				ellipsisChars = ( ellipsisChars == null ) ? '..' : ellipsisChars;
				str = str.substring( 0, truncateLen - ellipsisChars.length ) + ellipsisChars;
			}
			return str;
		},
		
		
		/**
		 * Supports `Array.prototype.indexOf()` functionality for old IE (IE8 and below).
		 * 
		 * @param {Array} arr The array to find an element of.
		 * @param {*} element The element to find in the array, and return the index of.
		 * @return {Number} The index of the `element`, or -1 if it was not found.
		 */
		indexOf : function( arr, element ) {
			if( Array.prototype.indexOf ) {
				return arr.indexOf( element );
				
			} else {
				for( var i = 0, len = arr.length; i < len; i++ ) {
					if( arr[ i ] === element ) return i;
				}
				return -1;
			}
		},
		
		
		
		/**
		 * Performs the functionality of what modern browsers do when `String.prototype.split()` is called
		 * with a regular expression that contains capturing parenthesis.
		 * 
		 * For example:
		 * 
		 *     // Modern browsers: 
		 *     "a,b,c".split( /(,)/ );  // --> [ 'a', ',', 'b', ',', 'c' ]
		 *     
		 *     // Old IE (including IE8):
		 *     "a,b,c".split( /(,)/ );  // --> [ 'a', 'b', 'c' ]
		 *     
		 * This method emulates the functionality of modern browsers for the old IE case.
		 * 
		 * @param {String} str The string to split.
		 * @param {RegExp} splitRegex The regular expression to split the input `str` on. The splitting
		 *   character(s) will be spliced into the array, as in the "modern browsers" example in the 
		 *   description of this method. 
		 *   Note #1: the supplied regular expression **must** have the 'g' flag specified.
		 *   Note #2: for simplicity's sake, the regular expression does not need 
		 *   to contain capturing parenthesis - it will be assumed that any match has them.
		 * @return {String[]} The split array of strings, with the splitting character(s) included.
		 */
		splitAndCapture : function( str, splitRegex ) {
			if( !splitRegex.global ) throw new Error( "`splitRegex` must have the 'g' flag set" );
			
			var result = [],
			    lastIdx = 0,
			    match;
			
			while( match = splitRegex.exec( str ) ) {
				result.push( str.substring( lastIdx, match.index ) );
				result.push( match[ 0 ] );  // push the splitting char(s)
				
				lastIdx = match.index + match[ 0 ].length;
			}
			result.push( str.substring( lastIdx ) );
			
			return result;
		}
		
	};
	/*global Autolinker */
	/**
	 * @private
	 * @class Autolinker.HtmlParser
	 * @extends Object
	 * 
	 * An HTML parser implementation which simply walks an HTML string and calls the provided visitor functions to process 
	 * HTML and text nodes.
	 * 
	 * Autolinker uses this to only link URLs/emails/Twitter handles within text nodes, basically ignoring HTML tags.
	 */
	Autolinker.HtmlParser = Autolinker.Util.extend( Object, {
		
		/**
		 * @private
		 * @property {RegExp} htmlRegex
		 * 
		 * The regular expression used to pull out HTML tags from a string. Handles namespaced HTML tags and
		 * attribute names, as specified by http://www.w3.org/TR/html-markup/syntax.html.
		 * 
		 * Capturing groups:
		 * 
		 * 1. If it is an end tag, this group will have the '/'.
		 * 2. The tag name.
		 */
		htmlRegex : (function() {
			var tagNameRegex = /[0-9a-zA-Z:]+/,
			    attrNameRegex = /[^\s\0"'>\/=\x01-\x1F\x7F]+/,   // the unicode range accounts for excluding control chars, and the delete char
			    attrValueRegex = /(?:".*?"|'.*?'|[^'"=<>`\s]+)/, // double quoted, single quoted, or unquoted attribute values
			    nameEqualsValueRegex = attrNameRegex.source + '(?:\\s*=\\s*' + attrValueRegex.source + ')?';  // optional '=[value]'
			
			return new RegExp( [
				'<(?:!|(/))?',  // Beginning of a tag. Either '<' for a start tag, '</' for an end tag, or <! for the <!DOCTYPE ...> tag. The slash or an empty string is Capturing Group 1.
				
					// The tag name (Capturing Group 2)
					'(' + tagNameRegex.source + ')',
					
					// Zero or more attributes following the tag name
					'(?:',
						'\\s+',  // one or more whitespace chars before an attribute
						
						// Either:
						// A. tag="value", or 
						// B. "value" alone (for <!DOCTYPE> tag. Ex: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">) 
						'(?:', nameEqualsValueRegex, '|', attrValueRegex.source + ')',
					')*',
					
					'\\s*/?',  // any trailing spaces and optional '/' before the closing '>'
				'>'
			].join( "" ), 'g' );
		} )(),
		
		
		/**
		 * Walks an HTML string, calling the `options.processHtmlNode` function for each HTML tag that is encountered, and calling
		 * the `options.processTextNode` function when each text around HTML tags is encountered.
		 * 
		 * @param {String} html The HTML to parse.
		 * @param {Object} [options] An Object (map) which may contain the following properties:
		 * 
		 * @param {Function} [options.processHtmlNode] A visitor function which allows processing of an encountered HTML node.
		 *   This function is called with the following arguments:
		 * @param {String} [options.processHtmlNode.tagText] The HTML tag text that was found.
		 * @param {String} [options.processHtmlNode.tagName] The tag name for the HTML tag that was found. Ex: 'a' for an anchor tag.
		 * @param {String} [options.processHtmlNode.isClosingTag] `true` if the tag is a closing tag (ex: &lt;/a&gt;), `false` otherwise.
		 *  
		 * @param {Function} [options.processTextNode] A visitor function which allows processing of an encountered text node.
		 *   This function is called with the following arguments:
		 * @param {String} [options.processTextNode.text] The text node that was matched.
		 */
		parse : function( html, options ) {
			options = options || {};
			
			var processHtmlNodeVisitor = options.processHtmlNode || function() {},
			    processTextNodeVisitor = options.processTextNode || function() {},
			    htmlRegex = this.htmlRegex,
			    currentResult,
			    lastIndex = 0;
			
			// Loop over the HTML string, ignoring HTML tags, and processing the text that lies between them,
			// wrapping the URLs in anchor tags
			while( ( currentResult = htmlRegex.exec( html ) ) !== null ) {
				var tagText = currentResult[ 0 ],
				    tagName = currentResult[ 2 ],
				    isClosingTag = !!currentResult[ 1 ],
				    inBetweenTagsText = html.substring( lastIndex, currentResult.index );
				
				if( inBetweenTagsText ) {
					processTextNodeVisitor( inBetweenTagsText );
				}
				
				processHtmlNodeVisitor( tagText, tagName, isClosingTag );
				
				lastIndex = currentResult.index + tagText.length;
			}
			
			// Process any remaining text after the last HTML element. Will process all of the text if there were no HTML elements.
			if( lastIndex < html.length ) {
				var text = html.substring( lastIndex );
				
				if( text ) {
					processTextNodeVisitor( text );
				}
			}
		}
		
	} );
	/*global Autolinker */
	/*jshint boss:true */
	/**
	 * @class Autolinker.HtmlTag
	 * @extends Object
	 * 
	 * Represents an HTML tag, which can be used to easily build/modify HTML tags programmatically.
	 * 
	 * Autolinker uses this abstraction to create HTML tags, and then write them out as strings. You may also use
	 * this class in your code, especially within a {@link Autolinker#replaceFn replaceFn}.
	 * 
	 * ## Examples
	 * 
	 * Example instantiation:
	 * 
	 *     var tag = new Autolinker.HtmlTag( {
	 *         tagName : 'a',
	 *         attrs   : { 'href': 'http://google.com', 'class': 'external-link' },
	 *         innerHtml : 'Google'
	 *     } );
	 *     
	 *     tag.toString();  // <a href="http://google.com" class="external-link">Google</a>
	 *     
	 *     // Individual accessor methods
	 *     tag.getTagName();                 // 'a'
	 *     tag.getAttr( 'href' );            // 'http://google.com'
	 *     tag.hasClass( 'external-link' );  // true
	 * 
	 * 
	 * Using mutator methods (which may be used in combination with instantiation config properties):
	 * 
	 *     var tag = new Autolinker.HtmlTag();
	 *     tag.setTagName( 'a' );
	 *     tag.setAttr( 'href', 'http://google.com' );
	 *     tag.addClass( 'external-link' );
	 *     tag.setInnerHtml( 'Google' );
	 *     
	 *     tag.getTagName();                 // 'a'
	 *     tag.getAttr( 'href' );            // 'http://google.com'
	 *     tag.hasClass( 'external-link' );  // true
	 *     
	 *     tag.toString();  // <a href="http://google.com" class="external-link">Google</a>
	 *     
	 * 
	 * ## Example use within a {@link Autolinker#replaceFn replaceFn}
	 * 
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance, configured with the Match's href and anchor text
	 *             tag.setAttr( 'rel', 'nofollow' );
	 *             
	 *             return tag;
	 *         }
	 *     } );
	 *     
	 *     // generated html:
	 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
	 *     
	 *     
	 * ## Example use with a new tag for the replacement
	 * 
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = new Autolinker.HtmlTag( {
	 *                 tagName : 'button',
	 *                 attrs   : { 'title': 'Load URL: ' + match.getAnchorHref() },
	 *                 innerHtml : 'Load URL: ' + match.getAnchorText()
	 *             } );
	 *             
	 *             return tag;
	 *         }
	 *     } );
	 *     
	 *     // generated html:
	 *     //   Test <button title="Load URL: http://google.com">Load URL: google.com</button>
	 */
	Autolinker.HtmlTag = Autolinker.Util.extend( Object, {
		
		/**
		 * @cfg {String} tagName
		 * 
		 * The tag name. Ex: 'a', 'button', etc.
		 * 
		 * Not required at instantiation time, but should be set using {@link #setTagName} before {@link #toString}
		 * is executed.
		 */
		
		/**
		 * @cfg {Object.<String, String>} attrs
		 * 
		 * An key/value Object (map) of attributes to create the tag with. The keys are the attribute names, and the
		 * values are the attribute values.
		 */
		
		/**
		 * @cfg {String} innerHtml
		 * 
		 * The inner HTML for the tag. 
		 * 
		 * Note the camel case name on `innerHtml`. Acronyms are camelCased in this utility (such as not to run into the acronym 
		 * naming inconsistency that the DOM developers created with `XMLHttpRequest`). You may alternatively use {@link #innerHTML}
		 * if you prefer, but this one is recommended.
		 */
		
		/**
		 * @cfg {String} innerHTML
		 * 
		 * Alias of {@link #innerHtml}, accepted for consistency with the browser DOM api, but prefer the camelCased version
		 * for acronym names.
		 */
		
		
		/**
		 * @protected
		 * @property {RegExp} whitespaceRegex
		 * 
		 * Regular expression used to match whitespace in a string of CSS classes.
		 */
		whitespaceRegex : /\s+/,
		
		
		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration properties for this class, in an Object (map)
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
			
			this.innerHtml = this.innerHtml || this.innerHTML;  // accept either the camelCased form or the fully capitalized acronym
		},
		
		
		/**
		 * Sets the tag name that will be used to generate the tag with.
		 * 
		 * @param {String} tagName
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setTagName : function( tagName ) {
			this.tagName = tagName;
			return this;
		},
		
		
		/**
		 * Retrieves the tag name.
		 * 
		 * @return {String}
		 */
		getTagName : function() {
			return this.tagName || "";
		},
		
		
		/**
		 * Sets an attribute on the HtmlTag.
		 * 
		 * @param {String} attrName The attribute name to set.
		 * @param {String} attrValue The attribute value to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setAttr : function( attrName, attrValue ) {
			var tagAttrs = this.getAttrs();
			tagAttrs[ attrName ] = attrValue;
			
			return this;
		},
		
		
		/**
		 * Retrieves an attribute from the HtmlTag. If the attribute does not exist, returns `undefined`.
		 * 
		 * @param {String} name The attribute name to retrieve.
		 * @return {String} The attribute's value, or `undefined` if it does not exist on the HtmlTag.
		 */
		getAttr : function( attrName ) {
			return this.getAttrs()[ attrName ];
		},
		
		
		/**
		 * Sets one or more attributes on the HtmlTag.
		 * 
		 * @param {Object.<String, String>} attrs A key/value Object (map) of the attributes to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setAttrs : function( attrs ) {
			var tagAttrs = this.getAttrs();
			Autolinker.Util.assign( tagAttrs, attrs );
			
			return this;
		},
		
		
		/**
		 * Retrieves the attributes Object (map) for the HtmlTag.
		 * 
		 * @return {Object.<String, String>} A key/value object of the attributes for the HtmlTag.
		 */
		getAttrs : function() {
			return this.attrs || ( this.attrs = {} );
		},
		
		
		/**
		 * Sets the provided `cssClass`, overwriting any current CSS classes on the HtmlTag.
		 * 
		 * @param {String} cssClass One or more space-separated CSS classes to set (overwrite).
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setClass : function( cssClass ) {
			return this.setAttr( 'class', cssClass );
		},
		
		
		/**
		 * Convenience method to add one or more CSS classes to the HtmlTag. Will not add duplicate CSS classes.
		 * 
		 * @param {String} cssClass One or more space-separated CSS classes to add.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		addClass : function( cssClass ) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,  // to support IE8 and below
			    classes = ( !classAttr ) ? [] : classAttr.split( whitespaceRegex ),
			    newClasses = cssClass.split( whitespaceRegex ),
			    newClass;
			
			while( newClass = newClasses.shift() ) {
				if( indexOf( classes, newClass ) === -1 ) {
					classes.push( newClass );
				}
			}
			
			this.getAttrs()[ 'class' ] = classes.join( " " );
			return this;
		},
		
		
		/**
		 * Convenience method to remove one or more CSS classes from the HtmlTag.
		 * 
		 * @param {String} cssClass One or more space-separated CSS classes to remove.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		removeClass : function( cssClass ) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,  // to support IE8 and below
			    classes = ( !classAttr ) ? [] : classAttr.split( whitespaceRegex ),
			    removeClasses = cssClass.split( whitespaceRegex ),
			    removeClass;
			
			while( classes.length && ( removeClass = removeClasses.shift() ) ) {
				var idx = indexOf( classes, removeClass );
				if( idx !== -1 ) {
					classes.splice( idx, 1 );
				}
			}
			
			this.getAttrs()[ 'class' ] = classes.join( " " );
			return this;
		},
		
		
		/**
		 * Convenience method to retrieve the CSS class(es) for the HtmlTag, which will each be separated by spaces when
		 * there are multiple.
		 * 
		 * @return {String}
		 */
		getClass : function() {
			return this.getAttrs()[ 'class' ] || "";
		},
		
		
		/**
		 * Convenience method to check if the tag has a CSS class or not.
		 * 
		 * @param {String} cssClass The CSS class to check for.
		 * @return {Boolean} `true` if the HtmlTag has the CSS class, `false` otherwise.
		 */
		hasClass : function( cssClass ) {
			return ( ' ' + this.getClass() + ' ' ).indexOf( ' ' + cssClass + ' ' ) !== -1;
		},
		
		
		/**
		 * Sets the inner HTML for the tag.
		 * 
		 * @param {String} html The inner HTML to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setInnerHtml : function( html ) {
			this.innerHtml = html;
			
			return this;
		},
		
		
		/**
		 * Retrieves the inner HTML for the tag.
		 * 
		 * @return {String}
		 */
		getInnerHtml : function() {
			return this.innerHtml || "";
		},
		
		
		/**
		 * Override of superclass method used to generate the HTML string for the tag.
		 * 
		 * @return {String}
		 */
		toString : function() {
			var tagName = this.getTagName(),
			    attrsStr = this.buildAttrsStr();
			
			attrsStr = ( attrsStr ) ? ' ' + attrsStr : '';  // prepend a space if there are actually attributes
			
			return [ '<', tagName, attrsStr, '>', this.getInnerHtml(), '</', tagName, '>' ].join( "" );
		},
		
		
		/**
		 * Support method for {@link #toString}, returns the string space-separated key="value" pairs, used to populate 
		 * the stringified HtmlTag.
		 * 
		 * @protected
		 * @return {String} Example return: `attr1="value1" attr2="value2"`
		 */
		buildAttrsStr : function() {
			if( !this.attrs ) return "";  // no `attrs` Object (map) has been set, return empty string
			
			var attrs = this.getAttrs(),
			    attrsArr = [];
			
			for( var prop in attrs ) {
				if( attrs.hasOwnProperty( prop ) ) {
					attrsArr.push( prop + '="' + attrs[ prop ] + '"' );
				}
			}
			return attrsArr.join( " " );
		}
		
	} );
	/*global Autolinker */
	/*jshint sub:true */
	/**
	 * @protected
	 * @class Autolinker.AnchorTagBuilder
	 * @extends Object
	 * 
	 * Builds anchor (&lt;a&gt;) tags for the Autolinker utility when a match is found.
	 * 
	 * Normally this class is instantiated, configured, and used internally by an {@link Autolinker} instance, but may 
	 * actually be retrieved in a {@link Autolinker#replaceFn replaceFn} to create {@link Autolinker.HtmlTag HtmlTag} instances
	 * which may be modified before returning from the {@link Autolinker#replaceFn replaceFn}. For example:
	 * 
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
	 *             tag.setAttr( 'rel', 'nofollow' );
	 *             
	 *             return tag;
	 *         }
	 *     } );
	 *     
	 *     // generated html:
	 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
	 */
	Autolinker.AnchorTagBuilder = Autolinker.Util.extend( Object, {
		
		/**
		 * @cfg {Boolean} newWindow
		 * @inheritdoc Autolinker#newWindow
		 */
		
		/**
		 * @cfg {Number} truncate
		 * @inheritdoc Autolinker#truncate
		 */
		
		/**
		 * @cfg {String} className
		 * @inheritdoc Autolinker#className
		 */
		
		
		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
		},
		
		
		/**
		 * Generates the actual anchor (&lt;a&gt;) tag to use in place of the matched URL/email/Twitter text,
		 * via its `match` object.
		 * 
		 * @param {Autolinker.match.Match} match The Match instance to generate an anchor tag from.
		 * @return {Autolinker.HtmlTag} The HtmlTag instance for the anchor tag.
		 */
		build : function( match ) {
			var tag = new Autolinker.HtmlTag( {
				tagName   : 'a',
				attrs     : this.createAttrs( match.getType(), match.getAnchorHref() ),
				innerHtml : this.processAnchorText( match.getAnchorText() )
			} );
			
			return tag;
		},
		
		
		/**
		 * Creates the Object (map) of the HTML attributes for the anchor (&lt;a&gt;) tag being generated.
		 * 
		 * @protected
		 * @param {"url"/"email"/"twitter"} matchType The type of match that an anchor tag is being generated for.
		 * @param {String} href The href for the anchor tag.
		 * @return {Object} A key/value Object (map) of the anchor tag's attributes. 
		 */
		createAttrs : function( matchType, anchorHref ) {
			var attrs = {
				'href' : anchorHref  // we'll always have the `href` attribute
			};
			
			var cssClass = this.createCssClass( matchType );
			if( cssClass ) {
				attrs[ 'class' ] = cssClass;
			}
			if( this.newWindow ) {
				attrs[ 'target' ] = "_blank";
			}
			
			return attrs;
		},
		
		
		/**
		 * Creates the CSS class that will be used for a given anchor tag, based on the `matchType` and the {@link #className}
		 * config.
		 * 
		 * @private
		 * @param {"url"/"email"/"twitter"} matchType The type of match that an anchor tag is being generated for.
		 * @return {String} The CSS class string for the link. Example return: "myLink myLink-url". If no {@link #className}
		 *   was configured, returns an empty string.
		 */
		createCssClass : function( matchType ) {
			var className = this.className;
			
			if( !className ) 
				return "";
			else
				return className + " " + className + "-" + matchType;  // ex: "myLink myLink-url", "myLink myLink-email", or "myLink myLink-twitter"
		},
		
		
		/**
		 * Processes the `anchorText` by truncating the text according to the {@link #truncate} config.
		 * 
		 * @private
		 * @param {String} anchorText The anchor tag's text (i.e. what will be displayed).
		 * @return {String} The processed `anchorText`.
		 */
		processAnchorText : function( anchorText ) {
			anchorText = this.doTruncate( anchorText );
			
			return anchorText;
		},
		
		
		/**
		 * Performs the truncation of the `anchorText`, if the `anchorText` is longer than the {@link #truncate} option.
		 * Truncates the text to 2 characters fewer than the {@link #truncate} option, and adds ".." to the end.
		 * 
		 * @private
		 * @param {String} text The anchor tag's text (i.e. what will be displayed).
		 * @return {String} The truncated anchor text.
		 */
		doTruncate : function( anchorText ) {
			return Autolinker.Util.ellipsis( anchorText, this.truncate || Number.POSITIVE_INFINITY );
		}
		
	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.match.Match
	 * 
	 * Represents a match found in an input string which should be Autolinked. A Match object is what is provided in a 
	 * {@link Autolinker#replaceFn replaceFn}, and may be used to query for details about the match.
	 * 
	 * For example:
	 * 
	 *     var input = "...";  // string with URLs, Email Addresses, and Twitter Handles
	 *     
	 *     var linkedText = Autolinker.link( input, {
	 *         replaceFn : function( autolinker, match ) {
	 *             console.log( "href = ", match.getAnchorHref() );
	 *             console.log( "text = ", match.getAnchorText() );
	 *         
	 *             switch( match.getType() ) {
	 *                 case 'url' : 
	 *                     console.log( "url: ", match.getUrl() );
	 *                     
	 *                 case 'email' :
	 *                     console.log( "email: ", match.getEmail() );
	 *                     
	 *                 case 'twitter' :
	 *                     console.log( "twitter: ", match.getTwitterHandle() );
	 *             }
	 *         }
	 *     } );
	 *     
	 * See the {@link Autolinker} class for more details on using the {@link Autolinker#replaceFn replaceFn}.
	 */
	Autolinker.match.Match = Autolinker.Util.extend( Object, {
		
		/**
		 * @cfg {String} matchedText (required)
		 * 
		 * The original text that was matched.
		 */
		
		
		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
		},
	
		
		/**
		 * Returns a string name for the type of match that this class represents.
		 * 
		 * @abstract
		 * @return {String}
		 */
		getType : Autolinker.Util.abstractMethod,
		
		
		/**
		 * Returns the original text that was matched.
		 * 
		 * @return {String}
		 */
		getMatchedText : function() {
			return this.matchedText;
		},
		
	
		/**
		 * Returns the anchor href that should be generated for the match.
		 * 
		 * @abstract
		 * @return {String}
		 */
		getAnchorHref : Autolinker.Util.abstractMethod,
		
		
		/**
		 * Returns the anchor text that should be generated for the match.
		 * 
		 * @abstract
		 * @return {String}
		 */
		getAnchorText : Autolinker.Util.abstractMethod
	
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Email
	 * @extends Autolinker.match.Match
	 * 
	 * Represents a Email match found in an input string which should be Autolinked.
	 * 
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Email = Autolinker.Util.extend( Autolinker.match.Match, {
		
		/**
		 * @cfg {String} email (required)
		 * 
		 * The email address that was matched.
		 */
		
	
		/**
		 * Returns a string name for the type of match that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'email';
		},
		
		
		/**
		 * Returns the email address that was matched.
		 * 
		 * @return {String}
		 */
		getEmail : function() {
			return this.email;
		},
		
	
		/**
		 * Returns the anchor href that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'mailto:' + this.email;
		},
		
		
		/**
		 * Returns the anchor text that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorText : function() {
			return this.email;
		}
		
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Twitter
	 * @extends Autolinker.match.Match
	 * 
	 * Represents a Twitter match found in an input string which should be Autolinked.
	 * 
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Twitter = Autolinker.Util.extend( Autolinker.match.Match, {
		
		/**
		 * @cfg {String} twitterHandle (required)
		 * 
		 * The Twitter handle that was matched.
		 */
		
	
		/**
		 * Returns the type of match that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'twitter';
		},
		
		
		/**
		 * Returns a string name for the type of match that this class represents.
		 * 
		 * @return {String}
		 */
		getTwitterHandle : function() {
			return this.twitterHandle;
		},
		
	
		/**
		 * Returns the anchor href that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'https://twitter.com/' + this.twitterHandle;
		},
		
		
		/**
		 * Returns the anchor text that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorText : function() {
			return '@' + this.twitterHandle;
		}
		
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Url
	 * @extends Autolinker.match.Match
	 * 
	 * Represents a Url match found in an input string which should be Autolinked.
	 * 
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Url = Autolinker.Util.extend( Autolinker.match.Match, {
		
		/**
		 * @cfg {String} url (required)
		 * 
		 * The url that was matched.
		 */
		
		/**
		 * @cfg {Boolean} protocolRelativeMatch (required)
		 * 
		 * `true` if the URL is a protocol-relative match. A protocol-relative match is a URL that starts with '//',
		 * and will be either http:// or https:// based on the protocol that the site is loaded under.
		 */
		
		/**
		 * @cfg {Boolean} stripPrefix (required)
		 * @inheritdoc {@link Autolinker#stripPrefix}
		 */
		
	
		/**
		 * @private
		 * @property {RegExp} urlPrefixRegex
		 * 
		 * A regular expression used to remove the 'http://' or 'https://' and/or the 'www.' from URLs.
		 */
		urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,
		
		/**
		 * @private
		 * @property {RegExp} protocolRelativeRegex
		 * 
		 * The regular expression used to remove the protocol-relative '//' from the {@link #url} string, for purposes
		 * of {@link #getAnchorText}. A protocol-relative URL is, for example, "//yahoo.com"
		 */
		protocolRelativeRegex : /^\/\//,
		
		/**
		 * @protected
		 * @property {RegExp} checkForProtocolRegex
		 * 
		 * A regular expression used to check if the {@link #url} is missing a protocol (in which case, 'http://'
		 * will be added).
		 */
		checkForProtocolRegex: /^[A-Za-z]{3,9}:/,
		
	
		/**
		 * Returns a string name for the type of match that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'url';
		},
		
		
		/**
		 * Returns the url that was matched, assuming the protocol to be 'http://' if the match
		 * was missing a protocol.
		 * 
		 * @return {String}
		 */
		getUrl : function() {
			var url = this.url;
			
			// if the url string doesn't begin with a protocol, assume http://
			if( !this.protocolRelativeMatch && !this.checkForProtocolRegex.test( url ) ) {
				url = this.url = 'http://' + url;
			}
			
			return url;
		},
		
	
		/**
		 * Returns the anchor href that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorHref : function() {
			var url = this.getUrl();
			
			return url.replace( /&amp;/g, '&' );  // any &amp;'s in the URL should be converted back to '&' if they were displayed as &amp; in the source html 
		},
		
		
		/**
		 * Returns the anchor text that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorText : function() {
			var anchorText = this.getUrl();
			
			if( this.protocolRelativeMatch ) {
				// Strip off any protocol-relative '//' from the anchor text
				anchorText = this.stripProtocolRelativePrefix( anchorText );
			}
			if( this.stripPrefix ) {
				anchorText = this.stripUrlPrefix( anchorText );
			}
			anchorText = this.removeTrailingSlash( anchorText );  // remove trailing slash, if there is one
			
			return anchorText;
		},
		
		
		// ---------------------------------------
		
		// Utility Functionality
		
		/**
		 * Strips the URL prefix (such as "http://" or "https://") from the given text.
		 * 
		 * @private
		 * @param {String} text The text of the anchor that is being generated, for which to strip off the
		 *   url prefix (such as stripping off "http://")
		 * @return {String} The `anchorText`, with the prefix stripped.
		 */
		stripUrlPrefix : function( text ) {
			return text.replace( this.urlPrefixRegex, '' );
		},
		
		
		/**
		 * Strips any protocol-relative '//' from the anchor text.
		 * 
		 * @private
		 * @param {String} text The text of the anchor that is being generated, for which to strip off the
		 *   protocol-relative prefix (such as stripping off "//")
		 * @return {String} The `anchorText`, with the protocol-relative prefix stripped.
		 */
		stripProtocolRelativePrefix : function( text ) {
			return text.replace( this.protocolRelativeRegex, '' );
		},
		
		
		/**
		 * Removes any trailing slash from the given `anchorText`, in preparation for the text to be displayed.
		 * 
		 * @private
		 * @param {String} anchorText The text of the anchor that is being generated, for which to remove any trailing
		 *   slash ('/') that may exist.
		 * @return {String} The `anchorText`, with the trailing slash removed.
		 */
		removeTrailingSlash : function( anchorText ) {
			if( anchorText.charAt( anchorText.length - 1 ) === '/' ) {
				anchorText = anchorText.slice( 0, -1 );
			}
			return anchorText;
		}
		
	} );

	return Autolinker;

} ) );
},{}],"/Users/alex/artendb/vendor/couchapp/_attachments/modules/erstelleBaum.js":[function(require,module,exports){
'use strict';

// erhält $, weil jquery.couch.js nicht nod-fähig ist
var returnFunction = function ($) {
	var gruppe,
		gruppenbezeichnung,
		baum_erstellt = $.Deferred();
	// alle Bäume ausblenden
	$(".baum").hide();
	// alle Beschriftungen ausblenden
	$(".treeBeschriftung").hide();
	// gewollte beschriften und sichtbar schalten
	switch (window.adb.Gruppe) {
    case "Fauna":
        gruppe = "fauna";
        gruppenbezeichnung = "Tiere";
        break;
    case "Flora":
        gruppe = "flora";
        gruppenbezeichnung = "Pflanzen";
        break;
    case "Moose":
        gruppe = "moose";
        gruppenbezeichnung = "Moose";
        break;
    case "Macromycetes":
        gruppe = "macromycetes";
        gruppenbezeichnung = "Pilze";
        break;
    case "Lebensräume":
        gruppe = "lr";
        gruppenbezeichnung = "Lebensräume";
        break;
	}
	var $db = $.couch.db("artendb");
	$db.view('artendb/' + gruppe + "_gruppiert", {
		success: function(data) {
			var anzahl_objekte = data.rows[0].value;
			$("#tree" + window.adb.Gruppe + "Beschriftung").html(anzahl_objekte + " " + gruppenbezeichnung);
			// eingeblendet wird die Beschriftung, wenn der Baum fertig ist im callback von function erstelleTree
		}
	});
	$.when(window.adb.erstelleTree()).then(function() {
		baum_erstellt.resolve();
	});
	return baum_erstellt.promise();
};

module.exports = returnFunction;
},{}],"/Users/alex/artendb/vendor/couchapp/_attachments/modules/holeDatenUrlFuerTreeOberstesLevel.js":[function(require,module,exports){
'use strict';

var returnFunction = function () {
	var gruppe,
        url;
	// wie sicherstellen, dass nicht dieselben nodes mehrmals angehängt werden?
	switch (window.adb.Gruppe) {
    case "Fauna":
        gruppe = "fauna";
        break;
    case "Flora":
        gruppe = "flora";
        break;
    case "Moose":
        gruppe = "moose";
        break;
    case "Macromycetes":
        gruppe = "macromycetes";
        break;
    case "Lebensräume":
        gruppe = "lr";
        break;
	}
	if (window.adb.Gruppe === "Lebensräume") {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_lr/baum_lr?startkey=[1]&endkey=[1,{},{},{},{},{}]&group_level=6";
	} else {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_"+gruppe+"/baum_"+gruppe+"?group_level=1";
	}
	return url;
};

module.exports = returnFunction;
},{}],"/Users/alex/artendb/vendor/couchapp/_attachments/modules/holeDatenUrlFuerTreeUntereLevel.js":[function(require,module,exports){
'use strict';

var returnFunction = function (level, filter, gruppe, id) {
	var startkey,
		// flag, um mitzuliefern, ob die id angezeigt werden soll
		id2 = false,
		endkey = [],
        a,
        url;

	if (filter) {
		// bei lr gibt es keinen filter und das erzeugt einen fehler
		startkey = filter.slice();
		endkey = filter.slice();
	}
	
	switch (gruppe) {
    case "fauna":
        if (level > 4) {
            return null;
        }
        for (a=5; a>=level; a--) {
            endkey.push({});
        }
        // im untersten level einen level mehr anzeigen, damit id vorhanden ist
        if (level === 4) {
            // das ist die Art-Ebene
            // hier soll die id angezeigt werden
            // dazu muss der nächste level abgerufen werden
            // damit die list den zu hohen level korrigieren kann, id mitgeben
            id2 = true;
            level++;
        }
        break;
    case "flora":
        if (level > 3) {
            return null;
        }
        for (a=4; a>=level; a--) {
            endkey.push({});
        }
        // im untersten level einen level mehr anzeigen, damit id vorhanden ist
        if (level === 3) {
            id2 = true;
            level++;
        }
        break;
    case "moose":
        if (level > 4) {
            return null;
        }
        for (a=5; a>=level; a--) {
            endkey.push({});
        }
        // im untersten level einen level mehr anzeigen, damit id vorhanden ist
        if (level === 4) {
            id2 = true;
            level++;
        }
        break;
    case "macromycetes":
        if (level > 2) {
            return null;
        }
        for (a=3; a>=level; a--) {
            endkey.push({});
        }
        // im untersten level einen level mehr anzeigen, damit id vorhanden ist
        if (level === 2) {
            id2 = true;
            level++;
        }
        break;
	}
	if (gruppe === "lr") {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + '/artendb/_design/artendb/_list/baum_lr/baum_lr?startkey=[' + level + ', "' + id + '"]&endkey=[' + level + ', "' + id + '",{},{},{},{}]&group_level=6';
	} else {
		url = $(location).attr("protocol") + '//' + $(location).attr("host") + "/artendb/_design/artendb/_list/baum_" + gruppe + "/baum_" + gruppe + "?startkey=" + JSON.stringify(startkey) + "&endkey=" + JSON.stringify(endkey) + "&group_level=" + level;
	}
	if (id2) {
		url = url + "&id=true";
	}
	return url;
};

module.exports = returnFunction;
},{}],"/Users/alex/artendb/vendor/couchapp/_attachments/modules/initiiereSuchfeld.js":[function(require,module,exports){
'use strict';

var returnFunction = function ($) {

	// zuerst mal die benötigten Daten holen
	var $db = $.couch.db("artendb");
	if (window.adb.Gruppe && window.adb.Gruppe === "Lebensräume") {
		if (window.adb.filtere_lr) {
			window.adb.initiiereSuchfeld_2();
		} else {
			var startkey = encodeURIComponent('["' + window.adb.Gruppe + '"]'),
				endkey = encodeURIComponent('["' + window.adb.Gruppe + '",{},{},{}]'),
				url = 'artendb/filtere_lr?startkey=' + startkey + '&endkey=' + endkey;
			$db.view(url, {
				success: function(data) {
					window.adb.filtere_lr = data;
					window.adb.initiiereSuchfeld_2();
				}
			});
		}
	} else if (window.adb.Gruppe) {
		if (window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()]) {
			window.adb.initiiereSuchfeld_2();
		} else {
			$db.view('artendb/filtere_art?startkey=["' + window.adb.Gruppe + '"]&endkey=["' + window.adb.Gruppe + '",{}]', {
				success: function(data) {
					window.adb["filtere_art_" + window.adb.Gruppe.toLowerCase()] = data;
					window.adb.initiiereSuchfeld_2();
				}
			});
		}
	}
};

module.exports = returnFunction;
},{}]},{},["./vendor/couchapp/_attachments/artendb.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ2ZW5kb3IvY291Y2hhcHAvX2F0dGFjaG1lbnRzL2FydGVuZGIuanMiLCJub2RlX21vZHVsZXMvYXV0b2xpbmtlci9kaXN0L0F1dG9saW5rZXIuanMiLCJ2ZW5kb3IvY291Y2hhcHAvX2F0dGFjaG1lbnRzL21vZHVsZXMvZXJzdGVsbGVCYXVtLmpzIiwidmVuZG9yL2NvdWNoYXBwL19hdHRhY2htZW50cy9tb2R1bGVzL2hvbGVEYXRlblVybEZ1ZXJUcmVlT2JlcnN0ZXNMZXZlbC5qcyIsInZlbmRvci9jb3VjaGFwcC9fYXR0YWNobWVudHMvbW9kdWxlcy9ob2xlRGF0ZW5VcmxGdWVyVHJlZVVudGVyZUxldmVsLmpzIiwidmVuZG9yL2NvdWNoYXBwL19hdHRhY2htZW50cy9tb2R1bGVzL2luaXRpaWVyZVN1Y2hmZWxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN3lLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3B2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwid2luZG93LmFkYiA9IHdpbmRvdy5hZGIgfHwge307XG5cbndpbmRvdy5hZGIuZXJzdGVsbGVUcmVlID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGxldmVsLFxuXHRcdGdydXBwZSxcblx0XHRmaWx0ZXIsXG5cdFx0aWQsXG5cdFx0anN0cmVlX2Vyc3RlbGx0ID0gJC5EZWZlcnJlZCgpLFxuXHRcdGhvbGVEYXRlblVybEbDvHJUcmVlT2JlcnN0ZXNMZXZlbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9ob2xlRGF0ZW5VcmxGdWVyVHJlZU9iZXJzdGVzTGV2ZWwnKSxcblx0XHRob2xlRGF0ZW5VcmxGw7xyVHJlZVVudGVyZUxldmVsID0gcmVxdWlyZSgnLi9tb2R1bGVzL2hvbGVEYXRlblVybEZ1ZXJUcmVlVW50ZXJlTGV2ZWwnKSxcblx0XHRpbml0aWllcmVTdWNoZmVsZCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pbml0aWllcmVTdWNoZmVsZCcpO1xuXG5cdCQoXCIjdHJlZVwiICsgd2luZG93LmFkYi5HcnVwcGUpLmpzdHJlZSh7XG5cdFx0XCJqc29uX2RhdGFcIjoge1xuXHRcdFx0YWpheDoge1xuXHRcdFx0XHR0eXBlOiAnR0VUJyxcblx0XHRcdFx0dXJsOiBmdW5jdGlvbihub2RlKSB7XG5cdFx0XHRcdFx0aWYgKG5vZGUgPT0gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiBob2xlRGF0ZW5VcmxGw7xyVHJlZU9iZXJzdGVzTGV2ZWwoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bGV2ZWwgPSBwYXJzZUludChub2RlLmF0dHIoJ2xldmVsJyksIDEwKSArIDE7XG5cdFx0XHRcdFx0XHRncnVwcGUgPSBub2RlLmF0dHIoJ2dydXBwZScpO1xuXHRcdFx0XHRcdFx0aWYgKG5vZGUuYXR0cignZmlsdGVyJykpIHtcblx0XHRcdFx0XHRcdFx0ZmlsdGVyID0gbm9kZS5hdHRyKCdmaWx0ZXInKS5zcGxpdChcIixcIik7XG5cdFx0XHRcdFx0XHRcdGlkID0gXCJcIjtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZpbHRlciA9IFwiXCI7XG5cdFx0XHRcdFx0XHRcdGlkID0gbm9kZS5hdHRyKCdpZCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGhvbGVEYXRlblVybEbDvHJUcmVlVW50ZXJlTGV2ZWwobGV2ZWwsIGZpbHRlciwgZ3J1cHBlLCBpZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImVyc3RlbGxlVHJlZSBtZWxkZXQ6IGFqYXggc3VjY2Vzc1wiKTtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiZXJzdGVsbGVUcmVlIG1lbGRldDogYWpheCBmYWlsdXJlXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInVpXCI6IHtcblx0XHRcdFwic2VsZWN0X2xpbWl0XCI6IDEsXHQvLyBudXIgZWluIERhdGVuc2F0eiBrYW5uIGF1ZnMgbWFsIGdld8OkaGx0IHdlcmRlblxuXHRcdFx0XCJzZWxlY3RlZF9wYXJlbnRfb3BlblwiOiB0cnVlLFx0Ly8gd2VubiBDb2RlIGVpbmVuIG5vZGUgd8OkaGx0LCB3ZXJkZW4gYWxsZSBwYXJlbnRzIGdlw7ZmZm5ldFxuXHRcdFx0XCJzZWxlY3RfcHJldl9vbl9kZWxldGVcIjogdHJ1ZVxuXHRcdH0sXG5cdFx0XCJjb3JlXCI6IHtcblx0XHRcdFwib3Blbl9wYXJlbnRzXCI6IHRydWUsXHQvLyB3aXJkIGVpbiBub2RlIHByb2dyYW1tYXRpc2NoIGdlw7ZmZm5ldCwgw7ZmZm5lbiBzaWNoIGFsbGUgcGFyZW50c1xuXHRcdFx0XCJzdHJpbmdzXCI6IHtcblx0XHRcdFx0XCJsb2FkaW5nXCI6IFwiaG9sZSBEYXRlbi4uLlwiXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInNvcnRcIjogZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0X3RleHQoYSkgPiB0aGlzLmdldF90ZXh0KGIpID8gMSA6IC0xO1xuXHRcdH0sXG5cdFx0XCJ0aGVtZXNcIjoge1xuXHRcdFx0XCJpY29uc1wiOiBmYWxzZVxuXHRcdH0sXG5cdFx0XCJwbHVnaW5zXCIgOiBbXCJ1aVwiLCBcInRoZW1lc1wiLCBcImpzb25fZGF0YVwiLCBcInNvcnRcIl1cblx0fSlcblx0LmJpbmQoXCJzZWxlY3Rfbm9kZS5qc3RyZWVcIiwgZnVuY3Rpb24oZSwgZGF0YSkge1xuICAgICAgICAndXNlIHN0cmljdCc7XG5cdFx0dmFyIG5vZGUgPSBkYXRhLnJzbHQub2JqO1xuXHRcdCQuanN0cmVlLl9yZWZlcmVuY2Uobm9kZSkub3Blbl9ub2RlKG5vZGUpO1xuXHRcdGlmIChub2RlLmF0dHIoXCJpZFwiKSkge1xuXHRcdFx0Ly8gdmVyaGluZGVybiwgZGFzcyBiZXJlaXRzIG9mZmVuZSBTZWl0ZW4gbm9jaG1hbHMgZ2XDtmZmbmV0IHdlcmRlblxuXHRcdFx0aWYgKCEkKFwiI2FydFwiKS5pcygnOnZpc2libGUnKSB8fCBsb2NhbFN0b3JhZ2UuYXJ0X2lkICE9PSBub2RlLmF0dHIoXCJpZFwiKSkge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2UuYXJ0X2lkID0gbm9kZS5hdHRyKFwiaWRcIik7XG5cdFx0XHRcdC8vIEFuemVpZ2UgaW0gRm9ybXVsYXIgaW5pdGlpZXJlbi4gSUQgdW5kIERhdGVuc2FtbWx1bmcgw7xiZXJnZWJlblxuXHRcdFx0XHR3aW5kb3cuYWRiLmluaXRpaWVyZV9hcnQobm9kZS5hdHRyKFwiaWRcIikpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSlcblx0LmJpbmQoXCJsb2FkZWQuanN0cmVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAndXNlIHN0cmljdCc7XG5cdFx0anN0cmVlX2Vyc3RlbGx0LnJlc29sdmUoKTtcblx0XHQkKFwiI3N1Y2hlblwiK3dpbmRvdy5hZGIuR3J1cHBlKS5jc3MoXCJkaXNwbGF5XCIsIFwidGFibGVcIik7XG5cdFx0JChcIiN0cmVlTWl0dGVpbHVuZ1wiKS5oaWRlKCk7XG5cdFx0JChcIiN0cmVlXCIgKyB3aW5kb3cuYWRiLkdydXBwZSkuc2hvdygpO1xuXHRcdCQoXCIjdHJlZVwiICsgd2luZG93LmFkYi5HcnVwcGUgKyBcIkJlc2NocmlmdHVuZ1wiKS5zaG93KCk7XG5cdFx0d2luZG93LmFkYi5zZXR6ZVRyZWVow7ZoZSgpO1xuXHRcdGluaXRpaWVyZVN1Y2hmZWxkKCQpO1xuXHR9KVxuXHQuYmluZChcImFmdGVyX29wZW4uanN0cmVlXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHdpbmRvdy5hZGIuc2V0emVUcmVlaMO2aGUoKTtcblx0fSlcblx0LmJpbmQoXCJhZnRlcl9jbG9zZS5qc3RyZWVcIiwgZnVuY3Rpb24oKSB7XG5cdFx0d2luZG93LmFkYi5zZXR6ZVRyZWVow7ZoZSgpO1xuXHR9KTtcblx0cmV0dXJuIGpzdHJlZV9lcnN0ZWxsdC5wcm9taXNlKCk7XG59O1xuXG53aW5kb3cuYWRiLmluaXRpaWVyZVN1Y2hmZWxkXzIgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgc3VjaF9vYmpla3RlO1xuXHRpZiAod2luZG93LmFkYi5HcnVwcGUgJiYgd2luZG93LmFkYi5HcnVwcGUgPT09IFwiTGViZW5zcsOkdW1lXCIpIHtcblx0XHRzdWNoX29iamVrdGUgPSB3aW5kb3cuYWRiLmZpbHRlcmVfbHIucm93cztcblx0fSBlbHNlIGlmICh3aW5kb3cuYWRiLkdydXBwZSkge1xuXHRcdHN1Y2hfb2JqZWt0ZSA9IHdpbmRvdy5hZGJbXCJmaWx0ZXJlX2FydF9cIiArIHdpbmRvdy5hZGIuR3J1cHBlLnRvTG93ZXJDYXNlKCldLnJvd3M7XG5cdH1cblx0c3VjaF9vYmpla3RlID0gXy5tYXAoc3VjaF9vYmpla3RlLCBmdW5jdGlvbihvYmpla3QpIHtcblx0XHRyZXR1cm4gb2JqZWt0LnZhbHVlO1xuXHR9KTtcblxuXHQkKCcjc3VjaGZlbGQnICsgd2luZG93LmFkYi5HcnVwcGUpLnR5cGVhaGVhZCh7XG5cdFx0bmFtZTogd2luZG93LmFkYi5HcnVwcGUsXG5cdFx0dmFsdWVLZXk6ICdOYW1lJyxcblx0XHRsb2NhbDogc3VjaF9vYmpla3RlLFxuXHRcdGxpbWl0OiAyMFxuXHR9KVxuXHQub24oJ3R5cGVhaGVhZDpzZWxlY3RlZCcsIGZ1bmN0aW9uKGUsIGRhdHVtKSB7XG5cdFx0d2luZG93LmFkYi7DtmZmbmVCYXVtWnVJZChkYXR1bS5pZCk7XG5cdH0pO1xuXHQkKFwiI3N1Y2hmZWxkXCIrd2luZG93LmFkYi5HcnVwcGUpLmZvY3VzKCk7XG59O1xuXG4vLyBiYXV0IGRpZSBBdXN3YWhsbGlzdGUgYXVmLCBtaXQgZGVyIGVpbiBQYXJlbnQgYXVzZ2V3w6RobHQgd2VyZGVuIHNvbGxcbi8vIGJla29tbXQgZGllIGlkIGRlcyBMUiwgdm9uIGRlbSBhdXMgZWluIG5ldWVyIExSIGVyc3RlbGx0IHdlcmRlbiBzb2xsXG4vLyBJbiBkZXIgQXVzd2FobGxpc3RlIHNvbGxlbiBudXIgTFIgYXVzIGRlcnNlbGJlbiBUYXhvbm9taWUgZ2V3w6RobHQgd2VyZGVuIGvDtm5uZW5cbi8vIHBsdXMgbWFuIHNvbGwgYXVjaCBlaW5lbiBuZXVlIFRheG9ub21pZSBiZWdpbm5lbiBrw7ZubmVuXG53aW5kb3cuYWRiLmluaXRpaWVyZUxyUGFyZW50QXVzd2FobGxpc3RlID0gZnVuY3Rpb24odGF4b25vbWllX25hbWUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBsciBob2xlblxuXHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdCRkYi52aWV3KCdhcnRlbmRiL2xyP2luY2x1ZGVfZG9jcz10cnVlJywge1xuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGxyKSB7XG5cdFx0XHR2YXIgdGF4b25vbWllX29iamVrdGUsIFxuXHRcdFx0XHRvYmplY3QsXG5cdFx0XHRcdG5ldWVfdGF4b25vbWllLFxuXHRcdFx0XHRvYmplY3RfaHRtbCxcblx0XHRcdFx0aHRtbCA9IFwiXCIsXG5cdFx0XHRcdGk7XG5cdFx0XHQvLyByZWR1emllcmVuIGF1ZiBkaWUgTFIgZGVyIFRheG9ub21pZVxuXHRcdFx0dGF4b25vbWllX29iamVrdGUgPSBfLmZpbHRlcihsci5yb3dzLCBmdW5jdGlvbihyb3cpIHtcblx0XHRcdFx0cmV0dXJuIHJvdy5kb2MuVGF4b25vbWllLk5hbWUgPT09IHRheG9ub21pZV9uYW1lO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyBlaW5lbiBBcnJheSB2b24gT2JqZWt0ZW4gc2NoYWZmZW4gbWl0IGlkIHVuZCBOYW1lXG5cdFx0XHR0YXhvbm9taWVfb2JqZWt0ZSA9IF8ubWFwKHRheG9ub21pZV9vYmpla3RlLCBmdW5jdGlvbihyb3cpIHtcblx0XHRcdFx0b2JqZWN0ID0ge307XG5cdFx0XHRcdG9iamVjdC5pZCA9IHJvdy5kb2MuX2lkO1xuXHRcdFx0XHRpZiAocm93LmRvYy5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbiAmJiByb3cuZG9jLlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkVpbmhlaXQpIHtcblx0XHRcdFx0XHRpZiAocm93LmRvYy5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5MYWJlbCkge1xuXHRcdFx0XHRcdFx0b2JqZWN0Lk5hbWUgPSByb3cuZG9jLlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkxhYmVsICsgXCI6IFwiICsgcm93LmRvYy5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5FaW5oZWl0O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRvYmplY3QuTmFtZSA9IHJvdy5kb2MuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uRWluaGVpdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHJvdy5kb2MuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uSGllcmFyY2hpZSAmJiByb3cuZG9jLlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkhpZXJhcmNoaWUubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHQvLyBkYXMgaXN0IGRhcyBvYmVyc3RlIE9iamVrdCwgc29sbCBhdWNoIHp1b2JlcnN0IGVpbnNvcnRpZXJ0IHdlcmRlblxuXHRcdFx0XHRcdFx0Ly8gb2Z0IGhhdCBlcyBhbHMgZWluemlnZXMga2VpbmVuIGxhYmVsIHVuZCB3w7xyZGUgZGFoZXIgenV1bnRlcnN0IHNvcnRpZXJ0IVxuXHRcdFx0XHRcdFx0b2JqZWN0LlNvcnRpZXIgPSBcIjBcIjtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gbWl0dGVscyBBcnJheSBzb3J0aWVyZW5cblx0XHRcdFx0XHRcdG9iamVjdC5Tb3J0aWVyID0gb2JqZWN0Lk5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0XHR9KTtcblx0XHRcdC8vIGpldHp0IG5hY2ggTmFtZSBzb3J0aWVyZW5cblx0XHRcdHRheG9ub21pZV9vYmpla3RlID0gXy5zb3J0QnkodGF4b25vbWllX29iamVrdGUsIGZ1bmN0aW9uKG9iamVrdCkge1xuXHRcdFx0XHRyZXR1cm4gb2JqZWt0LlNvcnRpZXI7XG5cdFx0XHR9KTtcblx0XHRcdG5ldWVfdGF4b25vbWllID0ge307XG5cdFx0XHRuZXVlX3RheG9ub21pZS5pZCA9IDA7XG5cdFx0XHRuZXVlX3RheG9ub21pZS5OYW1lID0gXCJOZXVlIFRheG9ub21pZSBiZWdpbm5lblwiO1xuXHRcdFx0Ly8gbmV1ZVRheG9ub21pZSBhbHMgZXJzdGVzIE9iamVrdCBpbiBkZW4gQXJyYXkgZWluZsO8Z2VuXG5cdFx0XHR0YXhvbm9taWVfb2JqZWt0ZS51bnNoaWZ0KG5ldWVfdGF4b25vbWllKTtcblxuXHRcdFx0Ly8gamV0enQgZGllIE9wdGlvbmVubGlzdGUgZsO8ciAkKFwiI2xyX3BhcmVudF93YWVobGVuX29wdGlvbmVuXCIpIGF1ZmJhdWVuXG5cdFx0XHRmb3IgKGk9MDsgaTx0YXhvbm9taWVfb2JqZWt0ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvYmplY3RfaHRtbCA9ICcnO1xuXHRcdFx0XHRpZiAoaSA9PT0gMSkge1xuXHRcdFx0XHRcdG9iamVjdF9odG1sICs9ICc8cD4uLi5vZGVyIGRlbiBoaWVyYXJjaGlzY2ggw7xiZXJnZW9yZG5ldGVuIExlYmVuc3JhdW0gd8OkaGxlbjo8L3A+Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRvYmplY3RfaHRtbCArPSAnPGRpdiBjbGFzcz1cInJhZGlvXCI+PGxhYmVsPic7XG5cdFx0XHRcdG9iamVjdF9odG1sICs9ICc8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cInBhcmVudF9vcHRpb25lblwiIGlkPVwiJztcblx0XHRcdFx0b2JqZWN0X2h0bWwgKz0gdGF4b25vbWllX29iamVrdGVbaV0uaWQ7XG5cdFx0XHRcdG9iamVjdF9odG1sICs9ICdcIiB2YWx1ZT1cIic7XG5cdFx0XHRcdG9iamVjdF9odG1sICs9IHRheG9ub21pZV9vYmpla3RlW2ldLk5hbWU7XG5cdFx0XHRcdG9iamVjdF9odG1sICs9ICdcIj4nO1xuXHRcdFx0XHRvYmplY3RfaHRtbCArPSB0YXhvbm9taWVfb2JqZWt0ZVtpXS5OYW1lO1xuXHRcdFx0XHRvYmplY3RfaHRtbCArPSAnPC9sYWJlbD48L2Rpdj4nO1xuXHRcdFx0XHRodG1sICs9IG9iamVjdF9odG1sO1xuXHRcdFx0fVxuXHRcdFx0JChcIiNscl9wYXJlbnRfd2FlaGxlbl9vcHRpb25lblwiKS5odG1sKGh0bWwpO1xuXHRcdFx0Ly8gamV0enQgZGFzIG1vZGFsIGF1ZnJ1ZmVuXG5cdFx0XHQvLyBow7ZoZSBBbnBhc3NlbiBmdW5rdGlvbmllcnQgbGVpZGVyIG5pY2h0IMO8YmVyIGNzcyBtaXQgY2FsY1xuXHRcdFx0JCgnI2xyX3BhcmVudF93YWVobGVuJykubW9kYWwoKTtcblx0XHRcdCQoJyNscl9wYXJlbnRfd2FlaGxlbl9vcHRpb25lbicpLmNzcygnbWF4LWhlaWdodCcsICQod2luZG93KS5oZWlnaHQoKS0xMDApO1xuXHRcdH1cblx0fSk7XG59O1xuXG53aW5kb3cuYWRiLsO2ZmZuZUJhdW1adUlkID0gZnVuY3Rpb24oaWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBIaWVyYXJjaGllIGRlciBpZCBob2xlblxuXHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdCRkYi5vcGVuRG9jKGlkLCB7XG5cdFx0c3VjY2VzczogZnVuY3Rpb24ob2JqZWt0KSB7XG4gICAgICAgICAgICB2YXIgJGZpbHRlcl9rbGFzc2UgPSAkKFwiW2ZpbHRlcj0nXCIgKyBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uS2xhc3NlICsgXCInXVwiKSxcbiAgICAgICAgICAgICAgICAkYXJ0X2FubWVsZGVuID0gJChcIiNhcnRfYW5tZWxkZW5cIik7XG5cdFx0XHRzd2l0Y2ggKG9iamVrdC5HcnVwcGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJGYXVuYVwiOlxuICAgICAgICAgICAgICAgIC8vIHZvbiBvYmVuIG5hY2ggdW50ZW4gZGllIGpld2VpbHMgcmljaHRpZ2VuIG5vZGVzIMO2ZmZuZW4sIHp1bGV0enQgc2VsZWt0aWVyZW5cbiAgICAgICAgICAgICAgICAvLyBvYmVyc3RlIEViZW5lIGF1ZmJhdWVuIG5pY2h0IG7DtnRpZywgZGllIGdpYnQgZXMgc2Nob25cbiAgICAgICAgICAgICAgICAkLmpzdHJlZS5fcmVmZXJlbmNlKFwiI3RyZWVGYXVuYVwiKS5vcGVuX25vZGUoJGZpbHRlcl9rbGFzc2UsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkLmpzdHJlZS5fcmVmZXJlbmNlKFwiI3RyZWVGYXVuYVwiKS5vcGVuX25vZGUoJChcIltmaWx0ZXI9J1wiICsgb2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLktsYXNzZSArIFwiLFwiICsgb2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLk9yZG51bmcgKyBcIiddXCIpLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuanN0cmVlLl9yZWZlcmVuY2UoXCIjdHJlZUZhdW5hXCIpLm9wZW5fbm9kZSgkKFwiW2ZpbHRlcj0nXCIgKyBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uS2xhc3NlICsgXCIsXCIgKyBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uT3JkbnVuZyArIFwiLFwiK29iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5GYW1pbGllK1wiJ11cIiksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuanN0cmVlLl9yZWZlcmVuY2UoXCIjdHJlZUZhdW5hXCIpLnNlbGVjdF9ub2RlKCQoXCIjXCIgKyBvYmpla3QuX2lkKSwgZnVuY3Rpb24oKSB7fSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIEFubWVsZHVuZyB2ZXJzdGVja2VuLCB3ZW5uIG5pY2h0IExlYmVuc3LDpHVtZVxuICAgICAgICAgICAgICAgICRhcnRfYW5tZWxkZW4uaGlkZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZsb3JhXCI6XG4gICAgICAgICAgICAgICAgLy8gdm9uIG9iZW4gbmFjaCB1bnRlbiBkaWUgamV3ZWlscyByaWNodGlnZW4gbm9kZXMgw7ZmZm5lbiwgenVsZXR6dCBzZWxla3RpZXJlblxuICAgICAgICAgICAgICAgIC8vIG9iZXJzdGUgRWJlbmUgYXVmYmF1ZW4gbmljaHQgbsO2dGlnLCBkaWUgZ2lidCBlcyBzY2hvblxuICAgICAgICAgICAgICAgICQuanN0cmVlLl9yZWZlcmVuY2UoXCIjdHJlZUZsb3JhXCIpLm9wZW5fbm9kZSgkKFwiW2ZpbHRlcj0nXCIgKyBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uRmFtaWxpZSArIFwiJ11cIiksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkLmpzdHJlZS5fcmVmZXJlbmNlKFwiI3RyZWVGbG9yYVwiKS5vcGVuX25vZGUoJChcIltmaWx0ZXI9J1wiICsgb2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkZhbWlsaWUgKyBcIixcIiArIG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5HYXR0dW5nICsgXCInXVwiKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmpzdHJlZS5fcmVmZXJlbmNlKFwiI3RyZWVGbG9yYVwiKS5zZWxlY3Rfbm9kZSgkKFwiI1wiICsgb2JqZWt0Ll9pZCksIGZ1bmN0aW9uKCkge30sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gQW5tZWxkdW5nIHZlcnN0ZWNrZW4sIHdlbm4gbmljaHQgTGViZW5zcsOkdW1lXG4gICAgICAgICAgICAgICAgJGFydF9hbm1lbGRlbi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTW9vc2VcIjpcbiAgICAgICAgICAgICAgICAvLyB2b24gb2JlbiBuYWNoIHVudGVuIGRpZSBqZXdlaWxzIHJpY2h0aWdlbiBub2RlcyDDtmZmbmVuLCB6dWxldHp0IHNlbGVrdGllcmVuXG4gICAgICAgICAgICAgICAgLy8gb2JlcnN0ZSBFYmVuZSBhdWZiYXVlbiBuaWNodCBuw7Z0aWcsIGRpZSBnaWJ0IGVzIHNjaG9uXG4gICAgICAgICAgICAgICAgJC5qc3RyZWUuX3JlZmVyZW5jZShcIiN0cmVlTW9vc2VcIikub3Blbl9ub2RlKCRmaWx0ZXJfa2xhc3NlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJC5qc3RyZWUuX3JlZmVyZW5jZShcIiN0cmVlTW9vc2VcIikub3Blbl9ub2RlKCQoXCJbZmlsdGVyPSdcIitvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uS2xhc3NlK1wiLFwiK29iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5GYW1pbGllK1wiJ11cIiksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5qc3RyZWUuX3JlZmVyZW5jZShcIiN0cmVlTW9vc2VcIikub3Blbl9ub2RlKCQoXCJbZmlsdGVyPSdcIitvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uS2xhc3NlK1wiLFwiK29iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5GYW1pbGllK1wiLFwiK29iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5HYXR0dW5nK1wiJ11cIiksIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuanN0cmVlLl9yZWZlcmVuY2UoXCIjdHJlZU1vb3NlXCIpLnNlbGVjdF9ub2RlKCQoXCIjXCIrb2JqZWt0Ll9pZCksIGZ1bmN0aW9uKCkge30sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyBBbm1lbGR1bmcgdmVyc3RlY2tlbiwgd2VubiBuaWNodCBMZWJlbnNyw6R1bWVcbiAgICAgICAgICAgICAgICAkYXJ0X2FubWVsZGVuLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJNYWNyb215Y2V0ZXNcIjpcbiAgICAgICAgICAgICAgICAvLyB2b24gb2JlbiBuYWNoIHVudGVuIGRpZSBqZXdlaWxzIHJpY2h0aWdlbiBub2RlcyDDtmZmbmVuLCB6dWxldHp0IHNlbGVrdGllcmVuXG4gICAgICAgICAgICAgICAgLy8gb2JlcnN0ZSBFYmVuZSBhdWZiYXVlbiBuaWNodCBuw7Z0aWcsIGRpZSBnaWJ0IGVzIHNjaG9uXG4gICAgICAgICAgICAgICAgJC5qc3RyZWUuX3JlZmVyZW5jZShcIiN0cmVlTWFjcm9teWNldGVzXCIpLm9wZW5fbm9kZSgkKFwiW2ZpbHRlcj0nXCIrb2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkdhdHR1bmcrXCInXVwiKSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQuanN0cmVlLl9yZWZlcmVuY2UoXCIjdHJlZU1hY3JvbXljZXRlc1wiKS5zZWxlY3Rfbm9kZSgkKFwiI1wiK29iamVrdC5faWQpLCBmdW5jdGlvbigpIHt9LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gQW5tZWxkdW5nIHZlcnN0ZWNrZW4sIHdlbm4gbmljaHQgTGViZW5zcsOkdW1lXG4gICAgICAgICAgICAgICAgJGFydF9hbm1lbGRlbi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiTGViZW5zcsOkdW1lXCI6XG4gICAgICAgICAgICAgICAgdmFyIGlkX2FycmF5ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5IaWVyYXJjaGllLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkX2FycmF5LnB1c2gob2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkhpZXJhcmNoaWVbaV0uR1VJRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGIub2VmZm5lTm9kZU5hY2hJZEFycmF5KGlkX2FycmF5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufTtcblxuLy8gbMOkdWZ0IHZvbiBvYmVuIG5hY2ggdW50ZW4gZHVyY2ggZGllIEhpZXJhcmNoaWUgZGVyIExlYmVuc3LDpHVtZVxuLy8gcnVmdCBzaWNoIHNlbGJlciB3aWVkZXIgYXVmLCB3ZW5uIGVpbiB0aWVmZXJlciBsZXZlbCBleGlzdGllcnRcbi8vIGVyd2FydGV0IGlkQXJyYXk6IGVpbmVuIEFycmF5IGRlciBHVUlEJ3MgYXVzIGRlciBIaWVyYXJjaGllIGRlcyBPYmpla3RzXG53aW5kb3cuYWRiLm9lZmZuZU5vZGVOYWNoSWRBcnJheSA9IGZ1bmN0aW9uKGlkQXJyYXkpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAoaWRBcnJheS5sZW5ndGggPiAxKSB7XG5cdFx0JC5qc3RyZWUuX3JlZmVyZW5jZShcIiN0cmVlXCIgKyB3aW5kb3cuYWRiLkdydXBwZSkub3Blbl9ub2RlKCQoXCIjXCIraWRBcnJheVswXSksIGZ1bmN0aW9uKCkge1xuXHRcdFx0aWRBcnJheS5zcGxpY2UoMCwxKTtcblx0XHRcdHdpbmRvdy5hZGIub2VmZm5lTm9kZU5hY2hJZEFycmF5KGlkQXJyYXkpO1xuXHRcdH0sIGZhbHNlKTtcblx0fSBlbHNlIGlmIChpZEFycmF5Lmxlbmd0aCA9PT0gMSkge1xuXHRcdCQuanN0cmVlLl9yZWZlcmVuY2UoXCIjdHJlZVwiICsgd2luZG93LmFkYi5HcnVwcGUpLnNlbGVjdF9ub2RlKCQoXCIjXCIraWRBcnJheVswXSksZnVuY3Rpb24oKSB7fSwgdHJ1ZSk7XG5cdH1cbn07XG5cbndpbmRvdy5hZGIuaW5pdGlpZXJlX2FydCA9IGZ1bmN0aW9uKGlkKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuXHQkZGIub3BlbkRvYyhpZCwge1xuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGFydCkge1xuXHRcdFx0dmFyIGh0bWxfYXJ0LFxuXHRcdFx0XHRhcnRfZWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4gPSBhcnQuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4sXG5cdFx0XHRcdGFydF9iZXppZWh1bmdzc2FtbWx1bmdlbiA9IFtdLFxuXHRcdFx0XHR0YXhvbm9taXNjaGVfYmV6aWVodW5nc3NhbW1sdW5nZW4gPSBbXSxcblx0XHRcdFx0bGVuLFxuXHRcdFx0XHRndWlkc192b25fc3lub255bWVuID0gW10sXG5cdFx0XHRcdGVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuX3Zvbl9zeW5vbnltZW4gPSBbXSxcblx0XHRcdFx0YmV6aWVodW5nc3NhbW1sdW5nZW5fdm9uX3N5bm9ueW1lbiA9IFtdLFxuXHRcdFx0XHRhLCBmLCBoLCBpLCBrLCB4LFxuXHRcdFx0XHRkc19uYW1lbiA9IFtdLFxuXHRcdFx0XHRiZXpfbmFtZW4gPSBbXTtcblx0XHRcdC8vIHBhbmVsIGJlZ2lubmVuXG5cdFx0XHRodG1sX2FydCA9ICc8aDQ+VGF4b25vbWllOjwvaDQ+Jztcblx0XHRcdC8vIHp1ZXJzdCBhbGxlIERhdGVuc2FtbWx1bmdlbiBhdWZsaXN0ZW4sIGRhbWl0IGRhbmFjaCBzb3J0aWVydCB3ZXJkZW4ga2FublxuXHRcdFx0Ly8gZ2xlaWNoemVpdGlnIGRpZSBUYXhvbm9taWUgc3VjaGVuIHVuZCBnbGVpY2ggZXJzdGVsbGVuIGxhc3NlblxuXHRcdFx0aHRtbF9hcnQgKz0gd2luZG93LmFkYi5lcnN0ZWxsZUh0bWxGw7xyRGF0ZW5zYW1tbHVuZyhcIlRheG9ub21pZVwiLCBhcnQsIGFydC5UYXhvbm9taWUpO1xuXHRcdFx0Ly8gRGF0ZW5zYW1tbHVuZ2VuIG11c3MgbmljaHQgZ2VwdXNodCB3ZXJkZW5cblx0XHRcdC8vIGFiZXIgQmV6aWVodW5nc3NhbW1sdW5nZW4gYXVmdGVpbGVuXG5cdFx0XHRpZiAoYXJ0LkJlemllaHVuZ3NzYW1tbHVuZ2VuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBfLmVhY2goYXJ0LkJlemllaHVuZ3NzYW1tbHVuZ2VuLCBmdW5jdGlvbihiZXppZWh1bmdzc2FtbWx1bmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBiZXppZWh1bmdzc2FtbWx1bmcuVHlwID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnRfYmV6aWVodW5nc3NhbW1sdW5nZW4ucHVzaChiZXppZWh1bmdzc2FtbWx1bmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmV6TmFtZW4gYXVmbGlzdGVuLCB1bSBzcMOkdGVyIHp1IHZlcmdsZWljaGVuLCBvYiBkaWVzZSBEUyBzY2hvbiBkYXJnZXN0ZWxsdCB3aXJkXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXpfbmFtZW4ucHVzaChiZXppZWh1bmdzc2FtbWx1bmcuTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYmV6aWVodW5nc3NhbW1sdW5nLlR5cCA9PT0gXCJ0YXhvbm9taXNjaFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXhvbm9taXNjaGVfYmV6aWVodW5nc3NhbW1sdW5nZW4ucHVzaChiZXppZWh1bmdzc2FtbWx1bmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmV6TmFtZW4gYXVmbGlzdGVuLCB1bSBzcMOkdGVyIHp1IHZlcmdsZWljaGVuLCBvYiBkaWVzZSBEUyBzY2hvbiBkYXJnZXN0ZWxsdCB3aXJkXG4gICAgICAgICAgICAgICAgICAgICAgICBiZXpfbmFtZW4ucHVzaChiZXppZWh1bmdzc2FtbWx1bmcuTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblx0XHRcdH1cblx0XHRcdC8vIHRheG9ub21pc2NoZSBCZXppZWh1bmdlbiBpbiBnZXdvbGx0ZXIgUmVpaGVuZm9sZ2UgaGluenVmw7xnZW5cblx0XHRcdGlmICh0YXhvbm9taXNjaGVfYmV6aWVodW5nc3NhbW1sdW5nZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHQvLyBUaXRlbCBoaW56dWbDvGdlbiwgZmFsbHMgRGF0ZW5zYW1tbHVuZ2VuIGV4aXN0aWVyZW5cblx0XHRcdFx0aHRtbF9hcnQgKz0gXCI8aDQ+VGF4b25vbWlzY2hlIEJlemllaHVuZ2VuOjwvaDQ+XCI7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRheG9ub21pc2NoZV9iZXppZWh1bmdzc2FtbWx1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nc3NhbW1sdW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhUTUwgZsO8ciBEYXRlbnNhbW1sdW5nIGVyc3RlbGxlbiBsYXNzZW4gdW5kIGhpbnp1ZsO8Z2VuXG4gICAgICAgICAgICAgICAgICAgIGh0bWxfYXJ0ICs9IHdpbmRvdy5hZGIuZXJzdGVsbGVIdG1sRsO8ckJlemllaHVuZ3NzYW1tbHVuZyhhcnQsIGJlemllaHVuZ3NzYW1tbHVuZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXppZWh1bmdzc2FtbWx1bmdbXCJBcnQgZGVyIEJlemllaHVuZ2VuXCJdICYmIGJlemllaHVuZ3NzYW1tbHVuZ1tcIkFydCBkZXIgQmV6aWVodW5nZW5cIl0gPT09IFwic3lub255bVwiICYmIGJlemllaHVuZ3NzYW1tbHVuZy5CZXppZWh1bmdlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGJlemllaHVuZ3NzYW1tbHVuZy5CZXppZWh1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJlemllaHVuZy5CZXppZWh1bmdzcGFydG5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2goYmV6aWVodW5nLkJlemllaHVuZ3NwYXJ0bmVyLCBmdW5jdGlvbihiZXppZWh1bmdzcGFydG5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJlemllaHVuZ3NwYXJ0bmVyLkdVSUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBndWlkc192b25fc3lub255bWVuLnB1c2goYmV6aWVodW5nc3BhcnRuZXIuR1VJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBEYXRlbnNhbW1sdW5nZW4gaW4gZ2V3b2xsdGVyIFJlaWhlbmZvbGdlIGhpbnp1ZsO8Z2VuXG5cdFx0XHRpZiAoYXJ0X2VpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Ly8gRGF0ZW5zYW1tbHVuZ2VuIG5hY2ggTmFtZSBzb3J0aWVyZW5cblx0XHRcdFx0LyphdXNnZXNjaGFsdGV0LCB1bSBUZW1wbyB6dSBnZXdpbm5lbiwgRGF0ZW4gc2luZCBlaCBzb3J0aWVydFxuXHRcdFx0XHREYXRlbnNhbW1sdW5nZW4gPSB3aW5kb3cuYWRiLnNvcnRpZXJlT2JqZWt0YXJyYXlOYWNoTmFtZShEYXRlbnNhbW1sdW5nZW4pOyovXG5cdFx0XHRcdC8vIFRpdGVsIGhpbnp1ZsO8Z2VuXG5cdFx0XHRcdGh0bWxfYXJ0ICs9IFwiPGg0PkVpZ2Vuc2NoYWZ0ZW46PC9oND5cIjtcbiAgICAgICAgICAgICAgICBfLmVhY2goYXJ0X2VpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuLCBmdW5jdGlvbihkYXRlbnNhbW1sdW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhUTUwgZsO8ciBEYXRlbnNhbW1sdW5nIGVyc3RlbGxlbiBsYXNzZW4gdW5kIGhpbnp1ZsO8Z2VuXG4gICAgICAgICAgICAgICAgICAgIGh0bWxfYXJ0ICs9IHdpbmRvdy5hZGIuZXJzdGVsbGVIdG1sRsO8ckRhdGVuc2FtbWx1bmcoXCJEYXRlbnNhbW1sdW5nXCIsIGFydCwgZGF0ZW5zYW1tbHVuZyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRzTmFtZW4gYXVmbGlzdGVuLCB1bSBzcMOkdGVyIHp1IHZlcmdsZWljaGVuLCBvYiBzaWUgc2Nob24gZGFyZ2VzdGVsbHQgd2lyZFxuICAgICAgICAgICAgICAgICAgICBkc19uYW1lbi5wdXNoKGRhdGVuc2FtbWx1bmcuTmFtZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBCZXppZWh1bmdlbiBoaW56dWbDvGdlblxuXHRcdFx0aWYgKGFydF9iZXppZWh1bmdzc2FtbWx1bmdlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdC8vIFRpdGVsIGhpbnp1ZsO8Z2VuXG5cdFx0XHRcdGh0bWxfYXJ0ICs9IFwiPGg0PkJlemllaHVuZ2VuOjwvaDQ+XCI7XG4gICAgICAgICAgICAgICAgXy5lYWNoKGFydF9iZXppZWh1bmdzc2FtbWx1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nc3NhbW1sdW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhUTUwgZsO8ciBEYXRlbnNhbW1sdW5nIGVyc3RlbGxlbiBsYXNzZW4gdW5kIGhpbnp1ZsO8Z2VuXG4gICAgICAgICAgICAgICAgICAgIGh0bWxfYXJ0ICs9IHdpbmRvdy5hZGIuZXJzdGVsbGVIdG1sRsO8ckJlemllaHVuZ3NzYW1tbHVuZyhhcnQsIGJlemllaHVuZ3NzYW1tbHVuZywgXCJcIik7XG4gICAgICAgICAgICAgICAgfSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBCZXppZWh1bmdzc2FtbWx1bmdlbiB2b24gc3lub255bWVuIEFydGVuXG5cdFx0XHRpZiAoZ3VpZHNfdm9uX3N5bm9ueW1lbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdCRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuXHRcdFx0XHQkZGIudmlldygnYXJ0ZW5kYi9hbGxfZG9jcz9rZXlzPScgKyBlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkoZ3VpZHNfdm9uX3N5bm9ueW1lbikpICsgJyZpbmNsdWRlX2RvY3M9dHJ1ZScsIHtcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3lub255bWVfYXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGRhdGEucm93cywgZnVuY3Rpb24oZGF0YV9yb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW5vbnltZV9hcnQgPSBkYXRhX3Jvdy5kb2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN5bm9ueW1lX2FydC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiAmJiBzeW5vbnltZV9hcnQuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2goc3lub255bWVfYXJ0LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuLCBmdW5jdGlvbihlaWdlbnNjaGFmdGVuc2FtbWx1bmdlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRzX25hbWVuLmluZGV4T2YoZWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4uTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGllc2UgRGF0ZW5zYW1tbHVuZyB3aXJkIG5vY2ggbmljaHQgZGFyZ2VzdGVsbHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlaWdlbnNjaGFmdGVuc2FtbWx1bmdlbl92b25fc3lub255bWVuLnB1c2goZWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF1Y2ggaW4gZHNOYW1lbiBwdXNoZW4sIGRhbWl0IGJlaW0gbsOkY2hzdGVuIFZlcmdsZWljaCBtaXQgYmVyw7xja3NpY2h0aWd0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHNfbmFtZW4ucHVzaChlaWdlbnNjaGFmdGVuc2FtbWx1bmdlbi5OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhdWNoIGluIERhdGVuc2FtbWx1bmdlbiBlcmfDpG56ZW4sIHdlaWwgZGllIERhcnN0ZWxsdW5nIGRhdm9uIGFiaMOkbmd0LCBvYiBlaW5lIERTIGV4aXN0aWVydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFydF9laWdlbnNjaGFmdGVuc2FtbWx1bmdlbi5wdXNoKGVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzeW5vbnltZV9hcnQuQmV6aWVodW5nc3NhbW1sdW5nZW4gJiYgc3lub255bWVfYXJ0LkJlemllaHVuZ3NzYW1tbHVuZ2VuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHN5bm9ueW1lX2FydC5CZXppZWh1bmdzc2FtbWx1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nc3NhbW1sdW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmV6X25hbWVuLmluZGV4T2YoYmV6aWVodW5nc3NhbW1sdW5nLk5hbWUpID09PSAtMSAmJiBiZXppZWh1bmdzc2FtbWx1bmdbXCJBcnQgZGVyIEJlemllaHVuZ2VuXCJdICE9PSBcInN5bm9ueW1cIiAmJiBiZXppZWh1bmdzc2FtbWx1bmcuVHlwICE9PSBcInRheG9ub21pc2NoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkaWVzZSBCZXppZWh1bmdzc2FtbWx1bmcgd2lyZCBub2NoIG5pY2h0IGRhcmdlc3RlbGx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW5kIHNpZSBpc3QgbmljaHQgdGF4b25vbWlzY2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXppZWh1bmdzc2FtbWx1bmdlbl92b25fc3lub255bWVuLnB1c2goYmV6aWVodW5nc3NhbW1sdW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhdWNoIGluIGJlek5hbWVuIHB1c2hlbiwgZGFtaXQgYmVpbSBuw6RjaHN0ZW4gVmVyZ2xlaWNoIG1pdCBiZXLDvGNrc2ljaHRpZ3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXpfbmFtZW4ucHVzaChiZXppZWh1bmdzc2FtbWx1bmcuTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXVjaCBpbiBCZXppZWh1bmdzc2FtbWx1bmdlbiBlcmfDpG56ZW4sIHdlaWwgZGllIERhcnN0ZWxsdW5nIGRhdm9uIGFiaMOkbmd0LCBvYiBlaW5lIERTIGV4aXN0aWVydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFydF9iZXppZWh1bmdzc2FtbWx1bmdlbi5wdXNoKGJlemllaHVuZ3NzYW1tbHVuZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJlemllaHVuZ3NzYW1tbHVuZ1tcIkFydCBkZXIgQmV6aWVodW5nZW5cIl0gIT09IFwic3lub255bVwiICYmIGJlemllaHVuZ3NzYW1tbHVuZy5UeXAgIT09IFwidGF4b25vbWlzY2hcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpZXNlIEJlemllaHVuZ3NzYW1tbHVuZyB3aXJkIHNjaG9uIGRhcmdlc3RlbGx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2FubiBhYmVyIHNlaW4sIGRhc3MgYmVpbSBTeW5vbnltIEJlemllaHVuZ2VuIGV4aXN0aWVyZW4sIHdlbGNoZSBub2NoIG5pY2h0IGRhcmdlc3RlbGx0IHdlcmRlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBic19kZXJfc3lub255bWVuX2FydCA9IGJlemllaHVuZ3NzYW1tbHVuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnNfZGVyX29yaWdpbmFsYXJ0ID0gXy5maW5kKGFydC5CZXppZWh1bmdzc2FtbWx1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nc3NhbW1sdW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmV6aWVodW5nc3NhbW1sdW5nLk5hbWUgPT09IGJzX2Rlcl9zeW5vbnltZW5fYXJ0Lk5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJzX2Rlcl9zeW5vbnltZW5fYXJ0LkJlemllaHVuZ2VuICYmIGJzX2Rlcl9zeW5vbnltZW5fYXJ0LkJlemllaHVuZ2VuLmxlbmd0aCA+IDAgJiYgYnNfZGVyX29yaWdpbmFsYXJ0ICYmIGJzX2Rlcl9vcmlnaW5hbGFydC5CZXppZWh1bmdlbiAmJiBic19kZXJfb3JpZ2luYWxhcnQuQmV6aWVodW5nZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCZWlkZSBBcnRlbiBoYWJlbiBpbiBkZXJzZWxiZW4gQmV6aWVodW5nc3NhbW1sdW5nIEJlemllaHVuZ2VuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIGRlciBPcmlnaW5hbGFydCB2b3JoYW5kZW5lIEJlemllaHVuZ2VuIGF1cyBkZW0gU3lub255bSBlbnRmZXJuZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnNfZGVyX3N5bm9ueW1lbl9hcnQuQmV6aWVodW5nZW4gPSBfLnJlamVjdChic19kZXJfc3lub255bWVuX2FydC5CZXppZWh1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nX2Rlc19zeW5vbnltcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VjaGUgaW4gQmV6aWVodW5nZW4gZGVyIE9yaWdpbmFsYXJ0IGVpbmUgbWl0IGRlbnNlbGJlbiBCZXppZWh1bmdzcGFydG5lcm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZXppZWh1bmdfZGVyX29yaWdpbmFsYXJ0ID0gXy5maW5kKGJzX2Rlcl9vcmlnaW5hbGFydC5CZXppZWh1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nX29yaWdhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBfLmlzRXF1YWwoYmV6aWVodW5nX2Rlc19zeW5vbnltcywgYmV6aWVodW5nX29yaWdhcnQpOyAgV2llc28gZnVua3Rpb25pZXJ0IGRhcyBuaWNodD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmV6aWVodW5nX2Rlc19zeW5vbnltcy5CZXppZWh1bmdzcGFydG5lci5sZW5ndGggPiAwICYmIGJlemllaHVuZ19vcmlnYXJ0LkJlemllaHVuZ3NwYXJ0bmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlemllaHVuZ19kZXNfc3lub255bXMuQmV6aWVodW5nc3BhcnRuZXJbMF0uR1VJRCA9PT0gYmV6aWVodW5nX29yaWdhcnQuQmV6aWVodW5nc3BhcnRuZXJbMF0uR1VJRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFiZXppZWh1bmdfZGVyX29yaWdpbmFsYXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJzX2Rlcl9zeW5vbnltZW5fYXJ0LkJlemllaHVuZ2VuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFsbHMgbm9jaCBkYXJ6dXN0ZWxsZW5kZSBCZXppZWh1bmdlbiB2ZXJibGVpYmVuLCBkaWUgRFMgcHVzaGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlemllaHVuZ3NzYW1tbHVuZ2VuX3Zvbl9zeW5vbnltZW4ucHVzaChic19kZXJfc3lub255bWVuX2FydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcdFx0XHRcdC8vIEJTIHZvbiBTeW5vbnltZW4gZGFyc3RlbGxlblxuXHRcdFx0XHRcdFx0aWYgKGVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuX3Zvbl9zeW5vbnltZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHQvLyBEYXRlbnNhbW1sdW5nZW5Wb25TeW5vbnltZW4gbmFjaCBOYW1lIHNvcnRpZXJlblxuXHRcdFx0XHRcdFx0XHRlaWdlbnNjaGFmdGVuc2FtbWx1bmdlbl92b25fc3lub255bWVuID0gd2luZG93LmFkYi5zb3J0aWVyZU9iamVrdGFycmF5TmFjaE5hbWUoZWlnZW5zY2hhZnRlbnNhbW1sdW5nZW5fdm9uX3N5bm9ueW1lbik7XG5cdFx0XHRcdFx0XHRcdC8vIFRpdGVsIGhpbnp1ZsO8Z2VuXG5cdFx0XHRcdFx0XHRcdGh0bWxfYXJ0ICs9IFwiPGg0PkVpZ2Vuc2NoYWZ0ZW4gdm9uIFN5bm9ueW1lbjo8L2g0PlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uZWFjaChlaWdlbnNjaGFmdGVuc2FtbWx1bmdlbl92b25fc3lub255bWVuLCBmdW5jdGlvbihkYXRlc2FtbWx1bmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSFRNTCBmw7xyIERhdGVuc2FtbWx1bmcgZXJzdGVsbGVuIGxhc3NlbiB1bmQgaGluenVmw7xnZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbF9hcnQgKz0gd2luZG93LmFkYi5lcnN0ZWxsZUh0bWxGw7xyRGF0ZW5zYW1tbHVuZyhcIkRhdGVuc2FtbWx1bmdcIiwgYXJ0LCBkYXRlc2FtbWx1bmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYmV6IHZvbiBTeW5vbnltZW4gZGFyc3RlbGxlblxuXHRcdFx0XHRcdFx0aWYgKGJlemllaHVuZ3NzYW1tbHVuZ2VuX3Zvbl9zeW5vbnltZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHQvLyBCZXppZWh1bmdzc2FtbWx1bmdlblZvblN5bm9ueW1lbiBzb3J0aWVyZW5cblx0XHRcdFx0XHRcdFx0YmV6aWVodW5nc3NhbW1sdW5nZW5fdm9uX3N5bm9ueW1lbiA9IHdpbmRvdy5hZGIuc29ydGllcmVPYmpla3RhcnJheU5hY2hOYW1lKGJlemllaHVuZ3NzYW1tbHVuZ2VuX3Zvbl9zeW5vbnltZW4pO1xuXHRcdFx0XHRcdFx0XHQvLyBUaXRlbCBoaW56dWbDvGdlblxuXHRcdFx0XHRcdFx0XHRodG1sX2FydCArPSBcIjxoND5CZXppZWh1bmdlbiB2b24gU3lub255bWVuOjwvaDQ+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGJlemllaHVuZ3NzYW1tbHVuZ2VuX3Zvbl9zeW5vbnltZW4sIGZ1bmN0aW9uKGJlemllaHVuZ3NzYW1tbHVuZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBIVE1MIGbDvHIgQmV6aWVodW5nIGVyc3RlbGxlbiBsYXNzZW4gdW5kIGhpbnp1ZsO8Z2VuLiBEcml0dGVuIFBhcmFtZXRlciBtaXRnZWJlbiwgZGFtaXQgZGllIERTIGluIGRlciBVSSBuaWNodCBnbGVpY2ggaGVpc3N0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxfYXJ0ICs9IHdpbmRvdy5hZGIuZXJzdGVsbGVIdG1sRsO8ckJlemllaHVuZ3NzYW1tbHVuZyhhcnQsIGJlemllaHVuZ3NzYW1tbHVuZywgXCIyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0d2luZG93LmFkYi5pbml0aWllcmVfYXJ0XzIoaHRtbF9hcnQsIGFydCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5hZGIuaW5pdGlpZXJlX2FydF8yKGh0bWxfYXJ0LCBhcnQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly9tZWxkZShcIkZlaGxlcjogQXJ0IGtvbm50ZSBuaWNodCBnZcO2ZmZuZXQgd2VyZGVuXCIpO1xuXHRcdH1cblx0fSk7XG59O1xuXG53aW5kb3cuYWRiLmluaXRpaWVyZV9hcnRfMiA9IGZ1bmN0aW9uKGh0bWxfYXJ0LCBhcnQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBwYW5lbCBiZWVuZGVuXG5cdCQoXCIjYXJ0X2luaGFsdFwiKS5odG1sKGh0bWxfYXJ0KTtcblx0Ly8gcmljaHRpZ2VzIEZvcm11bGFyIGFuemVpZ2VuXG5cdHdpbmRvdy5hZGIuemVpZ2VGb3JtdWxhcihcImFydFwiKTtcblx0Ly8gQW5tZWxkdW5nIHNvbGwgbnVyIGt1cnpmcmlzdGlnIHNpY2h0YmFyIHNlaW4sIHdlbm4gZWluZSBBbm1lbGR1bmcgZXJmb2xnZW4gc29sbFxuXHQkKFwiI2FydF9hbm1lbGRlblwiKS5oaWRlKCk7XG5cdC8vIFdlbm4gbnVyIGVpbmUgRGF0ZW5zYW1tbHVuZyAoZGllIFRheG9ub21pZSkgZXhpc3RpZXJ0LCBkaWVzZSDDtmZmbmVuXG5cdGlmIChhcnQuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4ubGVuZ3RoID09PSAwICYmIGFydC5CZXppZWh1bmdzc2FtbWx1bmdlbi5sZW5ndGggPT09IDApIHtcblx0XHQkKCcucGFuZWwtY29sbGFwc2UuVGF4b25vbWllJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykuY29sbGFwc2UoJ3Nob3cnKTtcblx0XHR9KTtcblx0fVxuXHQvLyBqZXR6dCBkaWUgTGlua3MgaW0gTWVudSBzZXR6ZW5cblx0Ly8gd2lyZCB6d2FyIGluIHplaWdlRm9ybXVsYXIgc2Nob24gZ2VtYWNodFxuICAgIC8vIHRyb3R6ZGVtIG7DtnRpZywgd2VpbCBkb3J0IGVyc3QgbWFsIGxlZXJlIGxpbmtzIGdlc2V0enQgd2VyZGVuXG4gICAgLy8gaGllciB3aXJkIGRpZSB1cmwgYW5nZWbDvGd0XG5cdHdpbmRvdy5hZGIuc2V0enRlTGlua3NadUJpbGRlclVuZFdpa2lwZWRpYShhcnQpO1xuXHQvLyB1bmQgZGllIFVSTCBhbnBhc3NlblxuXHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBcImluZGV4Lmh0bWw/aWQ9XCIgKyBhcnQuX2lkKTtcbn07XG5cbi8vIGVyc3RlbGx0IGRpZSBIVE1MIGbDvHIgZWluZSBCZXppZWh1bmdcbi8vIGJlbsO2dGlndCB2b24gZGVyIGFydCBiencuIGRlbiBsciBkaWUgZW50c3ByZWNoZW5kZSBCZXppZWh1bmdzc2FtbWx1bmdcbi8vIGFsdE5hbWUgaXN0IGbDvHIgQmV6aWVodW5nc3NhbW1sdW5nZW4gdm9uIFN5bm9ueW1lbjogSGllciBrYW5uIGRpZXNlbGJlIERTIHp3ZWkgbWFsIHZvcmtvbW1lbiB1bmQgc29sbHRlIG5pY2h0IGdsZWljaCBoZWlzc2VuLCBzb25zdCBnZWh0IG51ciBkaWUgZXJzdGUgYXVmXG53aW5kb3cuYWRiLmVyc3RlbGxlSHRtbEbDvHJCZXppZWh1bmdzc2FtbWx1bmcgPSBmdW5jdGlvbihhcnQsIGJlemllaHVuZ3NzYW1tbHVuZywgYWx0X25hbWUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaHRtbCxcblx0XHRuYW1lLFxuXHRcdGJzX25hbWUgPSB3aW5kb3cuYWRiLmVyc2V0emVVbmfDvGx0aWdlWmVpY2hlbkluSWROYW1lbihiZXppZWh1bmdzc2FtbWx1bmcuTmFtZSkgKyBhbHRfbmFtZTtcblxuXHQvLyBBY2NvcmRpb24tR3J1cHBlIHVuZCAtaGVhZGluZyBhbmbDvGdlblxuXHRodG1sID0gJzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+PGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmcgcGFuZWwtaGVhZGluZy1ncmFkaWVudFwiPjxoNCBjbGFzcz1cInBhbmVsLXRpdGxlXCI+Jztcblx0Ly8gZGllIGlkIGRlciBHcnVwcGUgd2lyZCBtaXQgZGVtIE5hbWVuIGRlciBEYXRlbnNhbW1sdW5nIGdlYmlsZGV0LiBIaWVyIG3DvHNzZW4gYWJlciBsZWVyemVpY2hlbiBlbnRmZXJudCB3ZXJkZW5cblx0aHRtbCArPSAnPGEgY2xhc3M9XCJEYXRlbnNhbW1sdW5nIGFjY29yZGlvbi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS1wYXJlbnQ9XCIjcGFuZWxfYXJ0XCIgaHJlZj1cIiNjb2xsYXBzZScgKyBic19uYW1lICsgJ1wiPic7XG5cdC8vIFRpdGVsIGbDvHIgZGllIERhdGVuc2FtbWx1bmcgZWluZsO8Z2VuXG5cdGh0bWwgKz0gYmV6aWVodW5nc3NhbW1sdW5nLk5hbWUgKyBcIiAoXCIgKyBiZXppZWh1bmdzc2FtbWx1bmcuQmV6aWVodW5nZW4ubGVuZ3RoICsgXCIpXCI7XG5cdC8vIGhlYWRlciBhYnNjaGxpZXNzZW5cblx0aHRtbCArPSAnPC9hPjwvaDQ+PC9kaXY+Jztcblx0Ly8gYm9keSBiZWdpbm5lblxuXHRodG1sICs9ICc8ZGl2IGlkPVwiY29sbGFwc2UnICsgYnNfbmFtZSArICdcIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlXCI+PGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj4nO1xuXG5cdC8vIERhdGVuc2FtbWx1bmcgYmVzY2hyZWliZW5cbiAgICBodG1sICs9IHdpbmRvdy5hZGIuZXJzdGVsbGVIdG1sRsO8ckRhdGVuc2FtbWx1bmdCZXNjaHJlaWJ1bmcoYmV6aWVodW5nc3NhbW1sdW5nKTtcblxuXHQvLyBkaWUgQmV6aWVodW5nZW4gc29ydGllcmVuXG5cdGJlemllaHVuZ3NzYW1tbHVuZy5CZXppZWh1bmdlbiA9IHdpbmRvdy5hZGIuc29ydGllcmVCZXppZWh1bmdlbk5hY2hOYW1lKGJlemllaHVuZ3NzYW1tbHVuZy5CZXppZWh1bmdlbik7XG5cblx0Ly8gamV0enQgZsO8ciBhbGxlIEJlemllaHVuZ2VuIGRpZSBGZWxkZXIgaGluenVmw7xnZW5cbiAgICBfLmVhY2goYmV6aWVodW5nc3NhbW1sdW5nLkJlemllaHVuZ2VuLCBmdW5jdGlvbihiZXppZWh1bmcsIGluZGV4KSB7XG4gICAgICAgIGlmIChiZXppZWh1bmcuQmV6aWVodW5nc3BhcnRuZXIgJiYgYmV6aWVodW5nLkJlemllaHVuZ3NwYXJ0bmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIF8uZWFjaChiZXppZWh1bmcuQmV6aWVodW5nc3BhcnRuZXIsIGZ1bmN0aW9uKGJlemllaHVuZ3NwYXJ0bmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJlemllaHVuZ3NwYXJ0bmVyLlRheG9ub21pZSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gYmV6aWVodW5nc3BhcnRuZXIuR3J1cHBlICsgXCI6IFwiICsgYmV6aWVodW5nc3BhcnRuZXIuVGF4b25vbWllICsgXCIgPiBcIiArIGJlemllaHVuZ3NwYXJ0bmVyLk5hbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGJlemllaHVuZ3NwYXJ0bmVyLkdydXBwZSArIFwiOiBcIiArIGJlemllaHVuZ3NwYXJ0bmVyLk5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFBhcnRuZXIgZGFyc3RlbGxlblxuICAgICAgICAgICAgICAgIGlmIChiZXppZWh1bmdzcGFydG5lci5Sb2xsZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBGZWxkIHNvbGwgbWl0IGRlciBSb2xsZSBiZXNjaHJpZnRldCB3ZXJkZW5cbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSB3aW5kb3cuYWRiLmdlbmVyaWVyZUh0bWxGw7xyT2JqZWt0bGluayhiZXppZWh1bmdzcGFydG5lci5Sb2xsZSwgbmFtZSwgJChsb2NhdGlvbikuYXR0cihcInByb3RvY29sXCIpICsgJy8vJyArICQobG9jYXRpb24pLmF0dHIoXCJob3N0XCIpICsgJChsb2NhdGlvbikuYXR0cihcInBhdGhuYW1lXCIpICsgJz9pZD0nICsgYmV6aWVodW5nc3BhcnRuZXIuR1VJRCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSB3aW5kb3cuYWRiLmdlbmVyaWVyZUh0bWxGw7xyT2JqZWt0bGluayhcIkJlemllaHVuZ3NwYXJ0bmVyXCIsIG5hbWUsICQobG9jYXRpb24pLmF0dHIoXCJwcm90b2NvbFwiKSArICcvLycgKyAkKGxvY2F0aW9uKS5hdHRyKFwiaG9zdFwiKSArICQobG9jYXRpb24pLmF0dHIoXCJwYXRobmFtZVwiKSArICc/aWQ9JyArIGJlemllaHVuZ3NwYXJ0bmVyLkdVSUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIERpZSBGZWxkZXIgYW56ZWlnZW5cbiAgICAgICAgXy5lYWNoKGJlemllaHVuZywgZnVuY3Rpb24oZmVsZHdlcnQsIGZlbGRuYW1lKSB7XG4gICAgICAgICAgICBpZiAoZmVsZG5hbWUgIT09IFwiQmV6aWVodW5nc3BhcnRuZXJcIikge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gd2luZG93LmFkYi5lcnN0ZWxsZUh0bWxGw7xyRmVsZChmZWxkbmFtZSwgZmVsZHdlcnQsIFwiQmV6aWVodW5nc3NhbW1sdW5nXCIsIGJlemllaHVuZ3NzYW1tbHVuZy5OYW1lLnJlcGxhY2UoL1wiL2csIFwiJ1wiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBbSBTY2hsdXNzIGVpbmUgTGluaWUsIG5pY2h0IGFiZXIgYmVpIGRlciBsZXR6dGVuIEJlemllaHVuZ1xuICAgICAgICBpZiAoaW5kZXggPCAoYmV6aWVodW5nc3NhbW1sdW5nLkJlemllaHVuZ2VuLmxlbmd0aC0xKSkge1xuICAgICAgICAgICAgaHRtbCArPSBcIjxocj5cIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXHQvLyBib2R5IHVuZCBBY2NvcmRpb24tR3J1cHBlIGFic2NobGllc3NlblxuXHRodG1sICs9ICc8L2Rpdj48L2Rpdj48L2Rpdj4nO1xuXHRyZXR1cm4gaHRtbDtcbn07XG5cbi8vIGVyc3RlbGx0IGRpZSBIVE1MIGbDvHIgZWluZSBEYXRlbnNhbW1sdW5nXG4vLyBiZW7DtnRpZ3Qgdm9uIGRlciBhcnQgYnp3LiBkZW4gbHIgZGllIGVudHNwcmVjaGVuZGUgRGF0ZW5zYW1tbHVuZ1xud2luZG93LmFkYi5lcnN0ZWxsZUh0bWxGw7xyRGF0ZW5zYW1tbHVuZyA9IGZ1bmN0aW9uKGRzX3R5cCwgYXJ0LCBkYXRlbnNhbW1sdW5nKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGh0bWxfZGF0ZW5zYW1tbHVuZyxcblx0XHRoaWVyYXJjaGllX3N0cmluZyxcblx0XHRhcnJheV9zdHJpbmcsXG5cdFx0ZHNfbmFtZTtcblx0ZHNfbmFtZSA9IHdpbmRvdy5hZGIuZXJzZXR6ZVVuZ8O8bHRpZ2VaZWljaGVuSW5JZE5hbWVuKGRhdGVuc2FtbWx1bmcuTmFtZSk7XG5cdC8vIEFjY29yZGlvbi1HcnVwcGUgdW5kIC1oZWFkaW5nIGFuZsO8Z2VuXG5cdGh0bWxfZGF0ZW5zYW1tbHVuZyA9ICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPjxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nIHBhbmVsLWhlYWRpbmctZ3JhZGllbnRcIj4nO1xuXHQvLyBiZWkgTFI6IFN5bWJvbGxlaXN0ZSBlaW5mw7xnZW5cblx0aWYgKGFydC5HcnVwcGUgPT09IFwiTGViZW5zcsOkdW1lXCIgJiYgZHNfdHlwID09PSBcIlRheG9ub21pZVwiKSB7XG5cdFx0aHRtbF9kYXRlbnNhbW1sdW5nICs9ICc8ZGl2IGNsYXNzPVwiYnRuLXRvb2xiYXIgYmVhcmJfdG9vbGJhclwiPjxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgYnRuLWdyb3VwLXNtXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgbHJfYmVhcmIgbHJfYmVhcmJfYmVhcmJcIiBkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIiB0aXRsZT1cImJlYXJiZWl0ZW5cIj48aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcGVuY2lsXCI+PC9pPjwvYnV0dG9uPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGxyX2JlYXJiIGxyX2JlYXJiX3NjaHVldHplbiBkaXNhYmxlZFwiIHRpdGxlPVwic2Now7x0emVuXCI+PGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWJhbi1jaXJjbGVcIj48L2k+PC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgbHJfYmVhcmIgbHJfYmVhcmJfbmV1IGRpc2FibGVkXCIgdGl0bGU9XCJuZXVlciBMZWJlbnNyYXVtXCI+PGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIj48L2k+PC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI3J1ZWNrZnJhZ2VfbHJfbG9lc2NoZW5cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBscl9iZWFyYiBscl9iZWFyYl9sb2VzY2hlbiBkaXNhYmxlZFwiIHRpdGxlPVwiTGViZW5zcmF1bSBsw7ZzY2hlblwiPjxpIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmFzaFwiPjwvaT48L2J1dHRvbj48L2Rpdj48L2Rpdj4nO1xuXHR9XG5cdC8vIGRpZSBpZCBkZXIgR3J1cHBlIHdpcmQgbWl0IGRlbSBOYW1lbiBkZXIgRGF0ZW5zYW1tbHVuZyBnZWJpbGRldC4gSGllciBtw7xzc2VuIGFiZXIgbGVlcnplaWNoZW4gZW50ZmVybnQgd2VyZGVuXG5cdGh0bWxfZGF0ZW5zYW1tbHVuZyArPSAnPGg0IGNsYXNzPVwicGFuZWwtdGl0bGVcIj48YSBjbGFzcz1cIkRhdGVuc2FtbWx1bmcgYWNjb3JkaW9uLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiNwYW5lbF9hcnRcIiBocmVmPVwiI2NvbGxhcHNlJyArIGRzX25hbWUgKyAnXCI+Jztcblx0Ly8gVGl0ZWwgZsO8ciBkaWUgRGF0ZW5zYW1tbHVuZyBlaW5mw7xnZW5cblx0aHRtbF9kYXRlbnNhbW1sdW5nICs9IGRhdGVuc2FtbWx1bmcuTmFtZTtcblx0Ly8gaGVhZGVyIGFic2NobGllc3NlblxuXHRodG1sX2RhdGVuc2FtbWx1bmcgKz0gJzwvYT48L2g0PjwvZGl2Pic7XG5cdC8vIGJvZHkgYmVnaW5uZW5cblx0aHRtbF9kYXRlbnNhbW1sdW5nICs9ICc8ZGl2IGlkPVwiY29sbGFwc2UnICsgZHNfbmFtZSArICdcIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlICcgKyBhcnQuR3J1cHBlICsgJyAnICsgZHNfdHlwICsgJ1wiPjxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+Jztcblx0Ly8gRGF0ZW5zYW1tbHVuZyBiZXNjaHJlaWJlblxuICAgIGh0bWxfZGF0ZW5zYW1tbHVuZyArPSB3aW5kb3cuYWRiLmVyc3RlbGxlSHRtbEbDvHJEYXRlbnNhbW1sdW5nQmVzY2hyZWlidW5nKGRhdGVuc2FtbWx1bmcpO1xuXHQvLyBGZWxkZXIgYW56ZWlnZW5cblx0Ly8genVlcnN0IGRpZSBHVUlELCBhYmVyIG51ciBiZWkgZGVyIFRheG9ub21pZVxuXHRpZiAoZHNfdHlwID09PSBcIlRheG9ub21pZVwiKSB7XG5cdFx0aHRtbF9kYXRlbnNhbW1sdW5nICs9IHdpbmRvdy5hZGIuZXJzdGVsbGVIdG1sRsO8ckZlbGQoXCJHVUlEXCIsIGFydC5faWQsIGRzX3R5cCwgXCJUYXhvbm9taWVcIik7XG5cdH1cbiAgICBfLmVhY2goZGF0ZW5zYW1tbHVuZy5FaWdlbnNjaGFmdGVuLCBmdW5jdGlvbihmZWxkd2VydCwgZmVsZG5hbWUpIHtcbiAgICAgICAgaWYgKGZlbGRuYW1lID09PSBcIkdVSURcIikge1xuICAgICAgICAgICAgLy8gZGllc2VzIEZlbGQgbmljaHQgYW56ZWlnZW4uIEVzIHdpcmQgX2lkIHZlcndlbmRldFxuICAgICAgICAgICAgLy8gZGllc2VzIEZlbGQgd2lyZCBrw7xuZnRpZyBuaWNodCBtZWhyIGltcG9ydGllcnRcbiAgICAgICAgfSBlbHNlIGlmICgoKGZlbGRuYW1lID09PSBcIk9mZml6aWVsbGUgQXJ0XCIgfHwgZmVsZG5hbWUgPT09IFwiRWluZ2VzY2hsb3NzZW4gaW5cIiB8fCBmZWxkbmFtZSA9PT0gXCJTeW5vbnltIHZvblwiKSAmJiBhcnQuR3J1cHBlID09PSBcIkZsb3JhXCIpIHx8IChmZWxkbmFtZSA9PT0gXCJBa3plcHRpZXJ0ZSBSZWZlcmVuelwiICYmIGFydC5HcnVwcGUgPT09IFwiTW9vc2VcIikpIHtcbiAgICAgICAgICAgIC8vIGRhbm4gZGVuIExpbmsgYXVmYmF1ZW4gbGFzc2VuXG4gICAgICAgICAgICBodG1sX2RhdGVuc2FtbWx1bmcgKz0gd2luZG93LmFkYi5nZW5lcmllcmVIdG1sRsO8ckxpbmtadUdsZWljaGVyR3J1cHBlKGZlbGRuYW1lLCBhcnQuX2lkLCBmZWxkd2VydC5OYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmICgoZmVsZG5hbWUgPT09IFwiR8O8bHRpZ2UgTmFtZW5cIiB8fCBmZWxkbmFtZSA9PT0gXCJFaW5nZXNjaGxvc3NlbmUgQXJ0ZW5cIiB8fCBmZWxkbmFtZSA9PT0gXCJTeW5vbnltZVwiKSAmJiBhcnQuR3J1cHBlID09PSBcIkZsb3JhXCIpIHtcbiAgICAgICAgICAgIC8vIGRhcyBpc3QgZWluIEFycmF5IHZvbiBPYmpla3RlblxuICAgICAgICAgICAgaHRtbF9kYXRlbnNhbW1sdW5nICs9IHdpbmRvdy5hZGIuZ2VuZXJpZXJlSHRtbEbDvHJMaW5rc1p1R2xlaWNoZXJHcnVwcGUoZmVsZG5hbWUsIGZlbGR3ZXJ0KTtcbiAgICAgICAgfSBlbHNlIGlmICgoZmVsZG5hbWUgPT09IFwiQXJ0bmFtZVwiICYmIGFydC5HcnVwcGUgPT09IFwiRmxvcmFcIikgfHwgKGZlbGRuYW1lID09PSBcIlBhcmVudFwiICYmIGFydC5HcnVwcGUgPT09IFwiTGViZW5zcsOkdW1lXCIpKSB7XG4gICAgICAgICAgICAvLyBkaWVzZXMgRmVsZCBuaWNodCBhbnplaWdlblxuICAgICAgICB9IGVsc2UgaWYgKGZlbGRuYW1lID09PSBcIkhpZXJhcmNoaWVcIiAmJiBhcnQuR3J1cHBlID09PSBcIkxlYmVuc3LDpHVtZVwiICYmIF8uaXNBcnJheShmZWxkd2VydCkpIHtcbiAgICAgICAgICAgIC8vIE5hbWVuIGtvbW1hZ2V0cmVubnQgYW56ZWlnZW5cbiAgICAgICAgICAgIGhpZXJhcmNoaWVfc3RyaW5nID0gd2luZG93LmFkYi5lcnN0ZWxsZUhpZXJhcmNoaWVGw7xyRmVsZEF1c0hpZXJhcmNoaWVvYmpla3RlQXJyYXkoZmVsZHdlcnQpO1xuICAgICAgICAgICAgaHRtbF9kYXRlbnNhbW1sdW5nICs9IHdpbmRvdy5hZGIuZ2VuZXJpZXJlSHRtbEbDvHJUZXh0YXJlYShmZWxkbmFtZSwgaGllcmFyY2hpZV9zdHJpbmcsIGRzX3R5cCwgZGF0ZW5zYW1tbHVuZy5OYW1lLnJlcGxhY2UoL1wiL2csIFwiJ1wiKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGZlbGR3ZXJ0KSkge1xuICAgICAgICAgICAgLy8gZGllc2VzIEZlbGQgZW50aMOkbHQgZWluZW4gQXJyYXkgdm9uIFdlcnRlblxuICAgICAgICAgICAgYXJyYXlfc3RyaW5nID0gZmVsZHdlcnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGh0bWxfZGF0ZW5zYW1tbHVuZyArPSB3aW5kb3cuYWRiLmdlbmVyaWVyZUh0bWxGw7xyVGV4dGFyZWEoZmVsZG5hbWUsIGFycmF5X3N0cmluZywgZHNfdHlwLCBkYXRlbnNhbW1sdW5nLk5hbWUucmVwbGFjZSgvXCIvZywgXCInXCIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGh0bWxfZGF0ZW5zYW1tbHVuZyArPSB3aW5kb3cuYWRiLmVyc3RlbGxlSHRtbEbDvHJGZWxkKGZlbGRuYW1lLCBmZWxkd2VydCwgZHNfdHlwLCBkYXRlbnNhbW1sdW5nLk5hbWUucmVwbGFjZSgvXCIvZywgXCInXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXHQvLyBib2R5IHVuZCBBY2NvcmRpb24tR3J1cHBlIGFic2NobGllc3NlblxuXHRodG1sX2RhdGVuc2FtbWx1bmcgKz0gJzwvZGl2PjwvZGl2PjwvZGl2Pic7XG5cdHJldHVybiBodG1sX2RhdGVuc2FtbWx1bmc7XG59O1xuXG53aW5kb3cuYWRiLmVyc3RlbGxlSHRtbEbDvHJEYXRlbnNhbW1sdW5nQmVzY2hyZWlidW5nID0gZnVuY3Rpb24oZXNfb2Rlcl9icykge1xuXHQndXNlIHN0cmljdCc7XG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cIkRhdGVuc2FtbWx1bmcgQmVzY2hyZWlidW5nRGF0ZW5zYW1tbHVuZ1wiPicsXG4gICAgXHRBdXRvbGlua2VyID0gcmVxdWlyZSgnYXV0b2xpbmtlcicpO1xuICAgIGlmIChlc19vZGVyX2JzLkJlc2NocmVpYnVuZykge1xuICAgICAgICBodG1sICs9IGVzX29kZXJfYnMuQmVzY2hyZWlidW5nO1xuICAgIH1cbiAgICAvLyB3ZW5uIHdlaXRlcmUgSW5mb3Mga29tbWVuOiBkaWVzZSBrw7ZubmVuIHdhaGx3ZWlzZSBlaW5nZWJsZW5kZXQgd2VyZGVuXG4gICAgaWYgKGVzX29kZXJfYnMuRGF0ZW5zdGFuZCB8fCBlc19vZGVyX2JzLkxpbmsgfHwgKGVzX29kZXJfYnMuenVzYW1tZW5mYXNzZW5kICYmIGVzX29kZXJfYnMuVXJzcHJ1bmdzZGF0ZW5zYW1tbHVuZykpIHtcbiAgICAgICAgLy8gd2VubiBrZWluZSBCZXNjaHJlaWJ1bmcgZXhpc3RpZXJ0LCBhbmRlcmUgT3B0aW9uIGVpbmJsZW5kZW5cbiAgICAgICAgaWYgKGVzX29kZXJfYnMuQmVzY2hyZWlidW5nKSB7XG4gICAgICAgICAgICBodG1sICs9ICcgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNob3dfbmV4dF9oaWRkZW5cIj4uLi5tZWhyPC9hPic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZW5uIGtlaW5lIEJlc2NocmVpYnVuZyBleGlzdGllcnQsIGFuZGVyZSBPcHRpb24gZWluYmxlbmRlblxuICAgICAgICAgICAgaHRtbCArPSAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNob3dfbmV4dF9oaWRkZW5cIj5CZXNjaHJlaWJ1bmcgZGVyIERhdGVuc2FtbWx1bmcgYW56ZWlnZW48L2E+JztcbiAgICAgICAgfVxuICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiYWRiLWhpZGRlblwiPic7XG4gICAgICAgIGlmIChlc19vZGVyX2JzLkRhdGVuc3RhbmQpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJkc19iZXNjaHJlaWJ1bmdfemVpbGVcIj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPGRpdj5TdGFuZDogPC9kaXY+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXY+JyArIGVzX29kZXJfYnMuRGF0ZW5zdGFuZCArICc8L2Rpdj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXNfb2Rlcl9icy5MaW5rKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiZHNfYmVzY2hyZWlidW5nX3plaWxlXCI+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXY+TGluazogPC9kaXY+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXY+JyArIEF1dG9saW5rZXIubGluayhlc19vZGVyX2JzLkxpbmspICsgJzwvZGl2Pic7XG4gICAgICAgICAgICBodG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlc19vZGVyX2JzW1wiaW1wb3J0aWVydCB2b25cIl0pIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJkc19iZXNjaHJlaWJ1bmdfemVpbGVcIj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPGRpdj5JbXBvcnRpZXJ0IHZvbjogPC9kaXY+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXY+JyArIEF1dG9saW5rZXIubGluayhlc19vZGVyX2JzW1wiaW1wb3J0aWVydCB2b25cIl0pICsgJzwvZGl2Pic7XG4gICAgICAgICAgICBodG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlc19vZGVyX2JzLnp1c2FtbWVuZmFzc2VuZCAmJiBlc19vZGVyX2JzLlVyc3BydW5nc2RhdGVuc2FtbWx1bmcpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJkc19iZXNjaHJlaWJ1bmdfemVpbGVcIj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPGRpdj5adXMuLWZhc3NlbmQ6PC9kaXY+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXY+RGllc2UgRGF0ZW5zYW1tbHVuZyBmYXNzdCBkaWUgRGF0ZW4gbWVocmVyZXIgRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4gaW4gZWluZXIgenVzYW1tZW4uPGJyPkRpZSBhbmdlemVpZ3RlbiBJbmZvcm1hdGlvbmVuIHN0YW1tZW4gYXVzIGRlciBFaWdlbnNjaGFmdGVuc2FtbWx1bmcgXCInICsgZXNfb2Rlcl9icy5VcnNwcnVuZ3NkYXRlbnNhbW1sdW5nICsgJ1wiPC9kaXY+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgIH0gZWxzZSBpZiAoZXNfb2Rlcl9icy56dXNhbW1lbmZhc3NlbmQgJiYgIWVzX29kZXJfYnMuVXJzcHJ1bmdzZGF0ZW5zYW1tbHVuZykge1xuICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cImRzX2Jlc2NocmVpYnVuZ196ZWlsZVwiPic7XG4gICAgICAgICAgICBodG1sICs9ICc8ZGl2Plp1cy4tZmFzc2VuZDo8L2Rpdj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPGRpdj5EaWVzZSBEYXRlbnNhbW1sdW5nIGZhc3N0IGRpZSBEYXRlbiBtZWhyZXJlciBFaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiBpbiBlaW5lciB6dXNhbW1lbi48YnI+QmVpIGRlbiBhbmdlemVpZ3RlbiBJbmZvcm1hdGlvbmVuIGlzdCBkaWUgVXJzcHJ1bmdzLUVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZyBsZWlkZXIgbmljaHQgYmVzY2hyaWViZW48L2Rpdj4nO1xuICAgICAgICAgICAgaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgfVxuICAgICAgICAvLyB6dXPDpHR6bGljaGUgSW5mb3MgYWJzY2hsaWVzc2VuXG4gICAgICAgIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgfVxuICAgIC8vIEJlc2NocmVpYnVuZyBkZXIgRGF0ZW5zYW1tbHVuZyBhYnNjaGxpZXNzZW5cbiAgICBodG1sICs9ICc8L2Rpdj4nO1xuICAgIHJldHVybiBodG1sO1xufTtcblxud2luZG93LmFkYi5lcnN0ZWxsZUhpZXJhcmNoaWVGw7xyRmVsZEF1c0hpZXJhcmNoaWVvYmpla3RlQXJyYXkgPSBmdW5jdGlvbihoaWVyYXJjaGllX2FycmF5KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKCFfLmlzQXJyYXkoaGllcmFyY2hpZV9hcnJheSkpIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fVxuXHQvLyBOYW1lbiBrb21tYWdldHJlbm50IGFuemVpZ2VuXG5cdHZhciBoaWVyYXJjaGllX3N0cmluZyA9IFwiXCI7XG4gICAgXy5lYWNoKGhpZXJhcmNoaWVfYXJyYXksIGZ1bmN0aW9uKGhpZXJhcmNoaWVfb2JqZWt0LCBpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBoaWVyYXJjaGllX3N0cmluZyArPSBcIlxcblwiO1xuICAgICAgICB9XG4gICAgICAgIGhpZXJhcmNoaWVfc3RyaW5nICs9IGhpZXJhcmNoaWVfb2JqZWt0Lk5hbWU7XG4gICAgfSk7XG5cdHJldHVybiBoaWVyYXJjaGllX3N0cmluZztcbn07XG5cbi8vIMO8YmVybmltbXQgRmVsZG5hbWUgdW5kIEZlbGR3ZXJ0XG4vLyBnZW5lcmllcnQgZGFyYXVzIHVuZCByZXRvdXJuaWVydCBodG1sIGbDvHIgZGllIERhcnN0ZWxsdW5nIGltIHBhc3NlbmRlbiBGZWxkXG53aW5kb3cuYWRiLmVyc3RlbGxlSHRtbEbDvHJGZWxkID0gZnVuY3Rpb24oZmVsZG5hbWUsIGZlbGR3ZXJ0LCBkc190eXAsIGRzX25hbWUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaHRtbF9kYXRlbnNhbW1sdW5nID0gXCJcIjtcblx0aWYgKCh0eXBlb2YgZmVsZHdlcnQgPT09IFwic3RyaW5nXCIgJiYgZmVsZHdlcnQuc2xpY2UoMCwgNykgPT09IFwiaHR0cDovL1wiKSB8fCAodHlwZW9mIGZlbGR3ZXJ0ID09PSBcInN0cmluZ1wiICYmIGZlbGR3ZXJ0LnNsaWNlKDAsIDgpID09PSBcImh0dHBzOi8vXCIpIHx8ICh0eXBlb2YgZmVsZHdlcnQgPT09IFwic3RyaW5nXCIgJiYgZmVsZHdlcnQuc2xpY2UoMCwgMikgPT09IFwiLy9cIikpIHtcblx0XHQvLyB3d3ctTGlua3MgYWxzIExpbmsgZGFyc3RlbGxlblxuXHRcdGh0bWxfZGF0ZW5zYW1tbHVuZyArPSB3aW5kb3cuYWRiLmdlbmVyaWVyZUh0bWxGw7xyV3d3TGluayhmZWxkbmFtZSwgZmVsZHdlcnQsIGRzX3R5cCwgZHNfbmFtZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGZlbGR3ZXJ0ID09PSBcInN0cmluZ1wiICYmIGZlbGR3ZXJ0Lmxlbmd0aCA8IDQ1KSB7XG5cdFx0aHRtbF9kYXRlbnNhbW1sdW5nICs9IHdpbmRvdy5hZGIuZ2VuZXJpZXJlSHRtbEbDvHJUZXh0aW5wdXQoZmVsZG5hbWUsIGZlbGR3ZXJ0LCBcInRleHRcIiwgZHNfdHlwLCBkc19uYW1lKTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZmVsZHdlcnQgPT09IFwic3RyaW5nXCIgJiYgZmVsZHdlcnQubGVuZ3RoID49IDQ1KSB7XG5cdFx0aHRtbF9kYXRlbnNhbW1sdW5nICs9IHdpbmRvdy5hZGIuZ2VuZXJpZXJlSHRtbEbDvHJUZXh0YXJlYShmZWxkbmFtZSwgZmVsZHdlcnQsIGRzX3R5cCk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGZlbGR3ZXJ0ID09PSBcIm51bWJlclwiKSB7XG5cdFx0aHRtbF9kYXRlbnNhbW1sdW5nICs9IHdpbmRvdy5hZGIuZ2VuZXJpZXJlSHRtbEbDvHJUZXh0aW5wdXQoZmVsZG5hbWUsIGZlbGR3ZXJ0LCBcIm51bWJlclwiLCBkc190eXAsIGRzX25hbWUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBmZWxkd2VydCA9PT0gXCJib29sZWFuXCIpIHtcblx0XHRodG1sX2RhdGVuc2FtbWx1bmcgKz0gd2luZG93LmFkYi5nZW5lcmllcmVIdG1sRsO8ckJvb2xlYW4oZmVsZG5hbWUsIGZlbGR3ZXJ0LCBkc190eXAsIGRzX25hbWUpO1xuXHR9IGVsc2Uge1xuXHRcdGh0bWxfZGF0ZW5zYW1tbHVuZyArPSB3aW5kb3cuYWRiLmdlbmVyaWVyZUh0bWxGw7xyVGV4dGlucHV0KGZlbGRuYW1lLCBmZWxkd2VydCwgXCJ0ZXh0XCIsIGRzX3R5cCwgZHNfbmFtZSk7XG5cdH1cblx0cmV0dXJuIGh0bWxfZGF0ZW5zYW1tbHVuZztcbn07XG5cbi8vIG1hbmFndCBkaWUgTGlua3MgenUgR29vZ2xlIEJpbGRlciB1bmQgV2lraXBlZGlhXG4vLyBlcndhcnRldCBkYXMgT2JqZWt0IG1pdCBkZXIgQXJ0XG53aW5kb3cuYWRiLnNldHp0ZUxpbmtzWnVCaWxkZXJVbmRXaWtpcGVkaWEgPSBmdW5jdGlvbihhcnQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBqZXR6dCBkaWUgTGlua3MgaW0gTWVudSBzZXR6ZW5cblx0aWYgKGFydCkge1xuXHRcdHZhciBnb29nbGVfYmlsZGVyX2xpbmsgPSBcIlwiLFxuICAgICAgICAgICAgd2lraXBlZGlhX2xpbmsgPSBcIlwiO1xuXHRcdHN3aXRjaCAoYXJ0LkdydXBwZSkge1xuXHRcdGNhc2UgXCJGbG9yYVwiOlxuXHRcdFx0Z29vZ2xlX2JpbGRlcl9saW5rID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jaC9zZWFyY2g/bnVtPTEwJmhsPWRlJnNpdGU9aW1naHAmdGJtPWlzY2gmc291cmNlPWhwJmJpaD04MjQmcT1cIicgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uQXJ0bmFtZSArICdcIic7XG5cdFx0XHRpZiAoYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuWydOYW1lIERldXRzY2gnXSkge1xuXHRcdFx0XHRnb29nbGVfYmlsZGVyX2xpbmsgKz0gJytPUitcIicgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5bJ05hbWUgRGV1dHNjaCddICsgJ1wiJztcblx0XHRcdH1cblx0XHRcdGlmIChhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5bJ05hbWUgRnJhbnrDtnNpc2NoJ10pIHtcblx0XHRcdFx0Z29vZ2xlX2JpbGRlcl9saW5rICs9ICcrT1IrXCInICsgYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuWydOYW1lIEZyYW56w7ZzaXNjaCddICsgJ1wiJztcblx0XHRcdH1cblx0XHRcdGlmIChhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5bJ05hbWUgSXRhbGllbmlzY2gnXSkge1xuXHRcdFx0XHRnb29nbGVfYmlsZGVyX2xpbmsgKz0gJytPUitcIicgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5bJ05hbWUgSXRhbGllbmlzY2gnXSArICdcIic7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuWydOYW1lIERldXRzY2gnXSkge1xuXHRcdFx0XHR3aWtpcGVkaWFfbGluayA9ICcvL2RlLndpa2lwZWRpYS5vcmcvd2lraS8nICsgYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuWydOYW1lIERldXRzY2gnXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpa2lwZWRpYV9saW5rID0gJy8vZGUud2lraXBlZGlhLm9yZy93aWtpLycgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uQXJ0bmFtZTtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJGYXVuYVwiOlxuXHRcdFx0Z29vZ2xlX2JpbGRlcl9saW5rID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jaC9zZWFyY2g/bnVtPTEwJmhsPWRlJnNpdGU9aW1naHAmdGJtPWlzY2gmc291cmNlPWhwJmJpaD04MjQmcT1cIicgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uQXJ0bmFtZSArICdcIic7XG5cdFx0XHRpZiAoYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuW1wiTmFtZSBEZXV0c2NoXCJdKSB7XG5cdFx0XHRcdGdvb2dsZV9iaWxkZXJfbGluayArPSAnK09SK1wiJyArIGFydC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlblsnTmFtZSBEZXV0c2NoJ10gKyAnXCInO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFydC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlblsnTmFtZSBGcmFuesO2c2lzY2gnXSkge1xuXHRcdFx0XHRnb29nbGVfYmlsZGVyX2xpbmsgKz0gJytPUitcIicgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5bJ05hbWUgRnJhbnrDtnNpc2NoJ10gKyAnXCInO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFydC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlblsnTmFtZSBJdGFsaWVuaXNjaCddKSB7XG5cdFx0XHRcdGdvb2dsZV9iaWxkZXJfbGluayArPSAnK09SXCInICsgYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuWydOYW1lIEl0YWxpZW5pc2NoJ10gKyAnXCInO1xuXHRcdFx0fVxuXHRcdFx0d2lraXBlZGlhX2xpbmsgPSAnLy9kZS53aWtpcGVkaWEub3JnL3dpa2kvJyArIGFydC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5HYXR0dW5nICsgJ18nICsgYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkFydDtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ01vb3NlJzpcblx0XHRcdGdvb2dsZV9iaWxkZXJfbGluayA9ICdodHRwczovL3d3dy5nb29nbGUuY2gvc2VhcmNoP251bT0xMCZobD1kZSZzaXRlPWltZ2hwJnRibT1pc2NoJnNvdXJjZT1ocCZiaWg9ODI0JnE9XCInICsgYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkdhdHR1bmcgKyAnICcgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uQXJ0ICsgJ1wiJztcblx0XHRcdHdpa2lwZWRpYV9saW5rID0gJy8vZGUud2lraXBlZGlhLm9yZy93aWtpLycgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uR2F0dHVuZyArICdfJyArIGFydC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5BcnQ7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdNYWNyb215Y2V0ZXMnOlxuXHRcdFx0Z29vZ2xlX2JpbGRlcl9saW5rID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jaC9zZWFyY2g/bnVtPTEwJmhsPWRlJnNpdGU9aW1naHAmdGJtPWlzY2gmc291cmNlPWhwJmJpaD04MjQmcT1cIicgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uTmFtZSArICdcIic7XG5cdFx0XHRpZiAoYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuWydOYW1lIERldXRzY2gnXSkge1xuXHRcdFx0XHRnb29nbGVfYmlsZGVyX2xpbmsgKz0gJytPUitcIicgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5bJ05hbWUgRGV1dHNjaCddICsgJ1wiJztcblx0XHRcdH1cblx0XHRcdHdpa2lwZWRpYV9saW5rID0gJy8vZGUud2lraXBlZGlhLm9yZy93aWtpLycgKyBhcnQuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uTmFtZTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ0xlYmVuc3LDpHVtZSc6XG5cdFx0XHRnb29nbGVfYmlsZGVyX2xpbmsgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNoL3NlYXJjaD9udW09MTAmaGw9ZGUmc2l0ZT1pbWdocCZ0Ym09aXNjaCZzb3VyY2U9aHAmYmloPTgyNCZxPVwiJyArIGFydC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5FaW5oZWl0O1xuXHRcdFx0d2lraXBlZGlhX2xpbmsgPSAnLy9kZS53aWtpcGVkaWEub3JnL3dpa2kvJyArIGFydC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5FaW5oZWl0O1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdC8vIG1pdCByZXBsYWNlIEhvY2hrb21tYXRhICcgZXJzZXR6ZW4sIHNvbnN0IGtsYXBwdCB1cmwgbmljaHRcblx0XHQkKFwiI0dvb2dsZUJpbGRlckxpbmtcIikuYXR0cihcImhyZWZcIiwgZW5jb2RlVVJJKGdvb2dsZV9iaWxkZXJfbGluaykucmVwbGFjZShcIiYjMzk7XCIsIFwiJTIwXCIpKTtcblx0XHQkKFwiI0dvb2dsZUJpbGRlckxpbmtfbGlcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblx0XHQkKFwiI1dpa2lwZWRpYUxpbmtcIikuYXR0cihcImhyZWZcIiwgd2lraXBlZGlhX2xpbmspO1xuXHRcdCQoXCIjV2lraXBlZGlhTGlua19saVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuXHR9IGVsc2Uge1xuXHRcdCQoXCIjV2lraXBlZGlhTGlua1wiKS5hdHRyKFwiaHJlZlwiLCBcIiNcIik7XG5cdFx0JChcIiNXaWtpcGVkaWFMaW5rX2xpXCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG5cdFx0JChcIiNHb29nbGVCaWxkZXJMaW5rXCIpLmF0dHIoXCJocmVmXCIsIFwiI1wiKTtcblx0XHQkKFwiI0dvb2dsZUJpbGRlckxpbmtfbGlcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblx0fVxufTtcblxuLy8gZ2VuZXJpZXJ0IGRlbiBodG1sLUluaGFsdCBmw7xyIGVpbnplbG5lIExpbmtzIGluIEZsb3JhXG53aW5kb3cuYWRiLmdlbmVyaWVyZUh0bWxGw7xyTGlua1p1R2xlaWNoZXJHcnVwcGUgPSBmdW5jdGlvbihmZWxkX25hbWUsIGlkLCBhcnRuYW1lKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGh0bWxfY29udGFpbmVyO1xuXHRodG1sX2NvbnRhaW5lciA9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPjxsYWJlbCBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj4nO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkX25hbWU7XG5cdGh0bWxfY29udGFpbmVyICs9ICc6PC9sYWJlbD48cCBjbGFzcz1cImZvcm0tY29udHJvbC1zdGF0aWMgY29udHJvbHMgZmVsZHRleHRcIj48YSBocmVmPVwiI1wiIGNsYXNzPVwiTGlua1p1QXJ0R2xlaWNoZXJHcnVwcGVcIiBBcnRJZD1cIic7XG5cdGh0bWxfY29udGFpbmVyICs9IGlkO1xuXHRodG1sX2NvbnRhaW5lciArPSAnXCI+Jztcblx0aHRtbF9jb250YWluZXIgKz0gYXJ0bmFtZTtcblx0aHRtbF9jb250YWluZXIgKz0gJzwvYT48L3A+PC9kaXY+Jztcblx0cmV0dXJuIGh0bWxfY29udGFpbmVyO1xufTtcblxuLy8gZ2VuZXJpZXJ0IGRlbiBodG1sLUluaGFsdCBmw7xyIFNlcmllbiB2b24gTGlua3MgaW4gRmxvcmFcbndpbmRvdy5hZGIuZ2VuZXJpZXJlSHRtbEbDvHJMaW5rc1p1R2xlaWNoZXJHcnVwcGUgPSBmdW5jdGlvbihmZWxkbmFtZSwgb2JqZWt0X2xpc3RlKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGh0bWxfY29udGFpbmVyO1xuXHRodG1sX2NvbnRhaW5lciA9ICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPjxsYWJlbCBjbGFzcz1cImNvbnRyb2wtbGFiZWxcIj4nO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkbmFtZTtcblx0aHRtbF9jb250YWluZXIgKz0gJzo8L2xhYmVsPjxzcGFuIGNsYXNzPVwiZmVsZHRleHQgY29udHJvbHNcIj4nO1xuICAgIF8uZWFjaChvYmpla3RfbGlzdGUsIGZ1bmN0aW9uKG9iamVrdCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgaHRtbF9jb250YWluZXIgKz0gJywgJztcbiAgICAgICAgfVxuICAgICAgICBodG1sX2NvbnRhaW5lciArPSAnPHAgY2xhc3M9XCJmb3JtLWNvbnRyb2wtc3RhdGljIGNvbnRyb2xzXCI+PGEgaHJlZj1cIiNcIiBjbGFzcz1cIkxpbmtadUFydEdsZWljaGVyR3J1cHBlXCIgQXJ0SWQ9XCInO1xuICAgICAgICBodG1sX2NvbnRhaW5lciArPSBvYmpla3QuR1VJRDtcbiAgICAgICAgaHRtbF9jb250YWluZXIgKz0gJ1wiPic7XG4gICAgICAgIGh0bWxfY29udGFpbmVyICs9IG9iamVrdC5OYW1lO1xuICAgICAgICBodG1sX2NvbnRhaW5lciArPSAnPC9hPjwvcD4nO1xuICAgIH0pO1xuXHRodG1sX2NvbnRhaW5lciArPSAnPC9zcGFuPjwvZGl2Pic7XG5cdHJldHVybiBodG1sX2NvbnRhaW5lcjtcbn07XG5cbi8vIGdlbmVyaWVydCBkZW4gaHRtbC1JbmhhbHQgZsO8ciBlaW56ZWxuZSBMaW5rcyBpbiBGbG9yYVxud2luZG93LmFkYi5nZW5lcmllcmVIdG1sRsO8cld3d0xpbmsgPSBmdW5jdGlvbihmZWxkbmFtZSwgZmVsZHdlcnQsIGRzX3R5cCwgZHNfbmFtZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBodG1sX2NvbnRhaW5lcjtcblx0aHRtbF9jb250YWluZXIgPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG5cXHQ8bGFiZWwgY2xhc3M9XCJjb250cm9sLWxhYmVsXCIgZm9yPVwiJztcblx0aHRtbF9jb250YWluZXIgKz0gZmVsZG5hbWU7XG5cdGh0bWxfY29udGFpbmVyICs9ICdcIj4nO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkbmFtZTtcblx0aHRtbF9jb250YWluZXIgKz0gJzo8L2xhYmVsPlxcblxcdCc7XG5cdC8vIGpldHp0IExpbmsgYmVnaW5uZW4sIGRhbWl0IGRhcyBGZWxkIGtsaWNrYmFyIHdpcmRcblx0aHRtbF9jb250YWluZXIgKz0gJzxwPjxhIGhyZWY9XCInO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkd2VydDtcblx0aHRtbF9jb250YWluZXIgKz0gJ1wiPjxpbnB1dCBjbGFzcz1cImNvbnRyb2xzIGZvcm0tY29udHJvbCBpbnB1dC1zbVwiIGRzVHlwPVwiJytkc190eXArJ1wiIGRzTmFtZT1cIicrZHNfbmFtZSsnXCIgaWQ9XCInO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkbmFtZTtcblx0aHRtbF9jb250YWluZXIgKz0gJ1wiIG5hbWU9XCInO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkbmFtZTtcblx0aHRtbF9jb250YWluZXIgKz0gJ1wiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCInO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkd2VydDtcblx0aHRtbF9jb250YWluZXIgKz0gJ1wiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiBzdHlsZT1cImN1cnNvcjpwb2ludGVyO1wiPic7XG5cdC8vIExpbmsgYWJzY2hsaWVzc2VuXG5cdGh0bWxfY29udGFpbmVyICs9ICc8L2E+PC9wPic7XG5cdGh0bWxfY29udGFpbmVyICs9ICdcXG48L2Rpdj4nO1xuXHRyZXR1cm4gaHRtbF9jb250YWluZXI7XG59O1xuXG4vLyBnZW5lcmllcnQgZGVuIGh0bWwtSW5oYWx0IGbDvHIgZWluemVsbmUgTGlua3MgaW4gRmxvcmFcbndpbmRvdy5hZGIuZ2VuZXJpZXJlSHRtbEbDvHJPYmpla3RsaW5rID0gZnVuY3Rpb24oZmVsZG5hbWUsIGZlbGR3ZXJ0LCB1cmwpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaHRtbF9jb250YWluZXI7XG5cdGh0bWxfY29udGFpbmVyID0gJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+PGxhYmVsIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPic7XG5cdGh0bWxfY29udGFpbmVyICs9IGZlbGRuYW1lO1xuXHRodG1sX2NvbnRhaW5lciArPSAnOic7XG5cdGh0bWxfY29udGFpbmVyICs9ICc8L2xhYmVsPic7XG5cdGh0bWxfY29udGFpbmVyICs9ICc8cCBjbGFzcz1cImZvcm0tY29udHJvbC1zdGF0aWMgZmVsZHRleHQgY29udHJvbHNcIj48YSBocmVmPVwiJztcblx0aHRtbF9jb250YWluZXIgKz0gdXJsO1xuXHRodG1sX2NvbnRhaW5lciArPSAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Jztcblx0aHRtbF9jb250YWluZXIgKz0gZmVsZHdlcnQ7XG5cdGh0bWxfY29udGFpbmVyICs9ICc8L2E+PC9wPjwvZGl2Pic7XG5cdHJldHVybiBodG1sX2NvbnRhaW5lcjtcbn07XG5cbi8vIGdlbmVyaWVydCBkZW4gaHRtbC1JbmhhbHQgZsO8ciBUZXh0aW5wdXRzXG53aW5kb3cuYWRiLmdlbmVyaWVyZUh0bWxGw7xyVGV4dGlucHV0ID0gZnVuY3Rpb24oZmVsZG5hbWUsIGZlbGR3ZXJ0LCBpbnB1dF90eXAsIGRzX3R5cCwgZHNfbmFtZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBodG1sX2NvbnRhaW5lcjtcblx0aHRtbF9jb250YWluZXIgPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cXG5cXHQ8bGFiZWwgY2xhc3M9XCJjb250cm9sLWxhYmVsXCIgZm9yPVwiJztcblx0aHRtbF9jb250YWluZXIgKz0gZmVsZG5hbWU7XG5cdGh0bWxfY29udGFpbmVyICs9ICdcIj4nO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkbmFtZTtcblx0aHRtbF9jb250YWluZXIgKz0gJzo8L2xhYmVsPlxcblxcdDxpbnB1dCBjbGFzcz1cImNvbnRyb2xzIGZvcm0tY29udHJvbCBpbnB1dC1zbVwiIGlkPVwiJztcblx0aHRtbF9jb250YWluZXIgKz0gZmVsZG5hbWU7XG5cdGh0bWxfY29udGFpbmVyICs9ICdcIiBuYW1lPVwiJztcblx0aHRtbF9jb250YWluZXIgKz0gZmVsZG5hbWU7XG5cdGh0bWxfY29udGFpbmVyICs9ICdcIiB0eXBlPVwiJztcblx0aHRtbF9jb250YWluZXIgKz0gaW5wdXRfdHlwO1xuXHRodG1sX2NvbnRhaW5lciArPSAnXCIgdmFsdWU9XCInO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkd2VydDtcblx0aHRtbF9jb250YWluZXIgKz0gJ1wiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiBkc1R5cD1cIicrZHNfdHlwKydcIiBkc05hbWU9XCInK2RzX25hbWUrJ1wiPlxcbjwvZGl2Pic7XG5cdHJldHVybiBodG1sX2NvbnRhaW5lcjtcbn07XG5cbi8vIGdlbmVyaWVydCBkZW4gaHRtbC1JbmhhbHQgZsO8ciBUZXh0YXJlYVxud2luZG93LmFkYi5nZW5lcmllcmVIdG1sRsO8clRleHRhcmVhID0gZnVuY3Rpb24oZmVsZG5hbWUsIGZlbGR3ZXJ0LCBkc190eXAsIGRzX25hbWUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaHRtbF9jb250YWluZXI7XG5cdGh0bWxfY29udGFpbmVyID0gJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+PGxhYmVsIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiIGZvcj1cIic7XG5cdGh0bWxfY29udGFpbmVyICs9IGZlbGRuYW1lO1xuXHRodG1sX2NvbnRhaW5lciArPSAnXCI+Jztcblx0aHRtbF9jb250YWluZXIgKz0gZmVsZG5hbWU7XG5cdGh0bWxfY29udGFpbmVyICs9ICc6PC9sYWJlbD48dGV4dGFyZWEgY2xhc3M9XCJjb250cm9scyBmb3JtLWNvbnRyb2xcIiBpZD1cIic7XG5cdGh0bWxfY29udGFpbmVyICs9IGZlbGRuYW1lO1xuXHRodG1sX2NvbnRhaW5lciArPSAnXCIgbmFtZT1cIic7XG5cdGh0bWxfY29udGFpbmVyICs9IGZlbGRuYW1lO1xuXHRodG1sX2NvbnRhaW5lciArPSAnXCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIGRzVHlwPVwiJytkc190eXArJ1wiIGRzTmFtZT1cIicrZHNfbmFtZSsnXCI+Jztcblx0aHRtbF9jb250YWluZXIgKz0gZmVsZHdlcnQ7XG5cdGh0bWxfY29udGFpbmVyICs9ICc8L3RleHRhcmVhPjwvZGl2Pic7XG5cdHJldHVybiBodG1sX2NvbnRhaW5lcjtcbn07XG5cbi8vIGdlbmVyaWVydCBkZW4gaHRtbC1JbmhhbHQgZsO8ciBqYS9uZWluLUZlbGRlclxud2luZG93LmFkYi5nZW5lcmllcmVIdG1sRsO8ckJvb2xlYW4gPSBmdW5jdGlvbihmZWxkbmFtZSwgZmVsZHdlcnQsIGRzX3R5cCwgZHNfbmFtZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBodG1sX2NvbnRhaW5lcjtcblx0aHRtbF9jb250YWluZXIgPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj48bGFiZWwgY2xhc3M9XCJjb250cm9sLWxhYmVsXCIgZm9yPVwiJztcblx0aHRtbF9jb250YWluZXIgKz0gZmVsZG5hbWU7XG5cdGh0bWxfY29udGFpbmVyICs9ICdcIj4nO1xuXHRodG1sX2NvbnRhaW5lciArPSBmZWxkbmFtZTtcblx0aHRtbF9jb250YWluZXIgKz0gJzo8L2xhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIic7XG5cdGh0bWxfY29udGFpbmVyICs9IGZlbGRuYW1lO1xuXHRodG1sX2NvbnRhaW5lciArPSAnXCIgbmFtZT1cIic7XG5cdGh0bWxfY29udGFpbmVyICs9IGZlbGRuYW1lO1xuXHRodG1sX2NvbnRhaW5lciArPSAnXCInO1xuXHRpZiAoZmVsZHdlcnQgPT09IHRydWUpIHtcblx0XHRodG1sX2NvbnRhaW5lciArPSAnIGNoZWNrZWQ9XCJ0cnVlXCInO1xuXHR9XG5cdGh0bWxfY29udGFpbmVyICs9ICdcIiByZWFkb25seT1cInJlYWRvbmx5XCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGRzVHlwPVwiJytkc190eXArJ1wiIGRzTmFtZT1cIicrZHNfbmFtZSsnXCI+PC9kaXY+Jztcblx0cmV0dXJuIGh0bWxfY29udGFpbmVyO1xufTtcblxuLy8gYmVncmVuenQgZGllIG1heGltYWxlIEjDtmhlIGRlcyBCYXVtcyBhdWYgZGllIFNlaXRlbmjDtmhlLCB3ZW5uIG7DtnRpZ1xud2luZG93LmFkYi5zZXR6ZVRyZWVow7ZoZSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciB3aW5kb3dfaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXHRpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiAxMDAwICYmICEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImZvcmNlLW1vYmlsZVwiKSkge1xuXHRcdCQoXCIuYmF1bVwiKS5jc3MoXCJtYXgtaGVpZ2h0XCIsIHdpbmRvd19oZWlnaHQgLSAxNjEpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFNwYWx0ZW4gc2luZCB1bnRlcmVpbmFuZGVyLiBCYXVtIDkxcHggd2VuaWdlciBob2NoLCBkYW1pdCBGb3JtdWxhcmUgenVtIHJhdWZzY2hpZWJlbiBpbW1lciBlcnJlaWNodCB3ZXJkZW4ga8O2bm5lblxuXHRcdCQoXCIuYmF1bVwiKS5jc3MoXCJtYXgtaGVpZ2h0XCIsIHdpbmRvd19oZWlnaHQgLSAyNTIpO1xuXHR9XG59O1xuXG4vLyBzZXR6dCBkaWUgSMO2aGUgdm9uIHRleHRhcmVhcyBzbywgZGFzcyBkZXIgVGV4dCBnZW5hdSByZWluIHBhc3N0XG53aW5kb3cuYWRiLmZpdFRleHRhcmVhVG9Db250ZW50ID0gZnVuY3Rpb24oaWQsIG1heF9oZWlnaHQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgdGV4dCA9IGlkICYmIGlkLnN0eWxlID8gaWQgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cdG1heF9oZWlnaHQgPSBtYXhfaGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cdGlmICghdGV4dCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8qIEFjY291bnRzIGZvciByb3dzIGJlaW5nIGRlbGV0ZWQsIHBpeGVsIHZhbHVlIG1heSBuZWVkIGFkanVzdGluZyAqL1xuXHRpZiAodGV4dC5jbGllbnRIZWlnaHQgPT0gdGV4dC5zY3JvbGxIZWlnaHQpIHtcblx0XHR0ZXh0LnN0eWxlLmhlaWdodCA9IFwiMzBweFwiO1xuXHR9XG5cblx0dmFyIGFkanVzdGVkSGVpZ2h0ID0gdGV4dC5jbGllbnRIZWlnaHQ7XG5cdGlmICghbWF4X2hlaWdodCB8fCBtYXhfaGVpZ2h0ID4gYWRqdXN0ZWRIZWlnaHQpIHtcblx0XHRhZGp1c3RlZEhlaWdodCA9IE1hdGgubWF4KHRleHQuc2Nyb2xsSGVpZ2h0LCBhZGp1c3RlZEhlaWdodCk7XG5cdH1cblx0aWYgKG1heF9oZWlnaHQpIHtcblx0XHRhZGp1c3RlZEhlaWdodCA9IE1hdGgubWluKG1heF9oZWlnaHQsIGFkanVzdGVkSGVpZ2h0KTtcblx0fVxuXHRpZiAoYWRqdXN0ZWRIZWlnaHQgPiB0ZXh0LmNsaWVudEhlaWdodCkge1xuXHRcdHRleHQuc3R5bGUuaGVpZ2h0ID0gYWRqdXN0ZWRIZWlnaHQgKyBcInB4XCI7XG5cdH1cbn07XG5cbi8vIG1hbmFnZWQgZGllIFNpY2h0YmFya2VpdCB2b24gRm9ybXVsYXJlblxuLy8gd2lyZCB2b24gYWxsZW4gaW5pdGlpZXJlXy1GdW5rdGlvbmVuIHZlcndlbmRldFxuLy8gd2lyZCBlaW4gRm9ybXVsYXJuYW1lIMO8YmVyZ2ViZW4sIHdpcmQgZGllc2VzIEZvcm11bGFyIGdlemVpZ3Rcbi8vIHVuZCBhbGxlIGFuZGVyZW4gYXVzZ2VibGVuZGV0XG4vLyB6dXPDpHR6bGljaCB3aXJkIGRpZSBIw7ZoZSB2b24gdGV4dGlucHV0LUZlbGRlcm4gYW4gZGVuIFRleHRpbmhhbHQgYW5nZXBhc3N0XG53aW5kb3cuYWRiLnplaWdlRm9ybXVsYXIgPSBmdW5jdGlvbihmb3JtdWxhcm5hbWUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgZm9ybXVsYXJfYW5nZXplaWd0ID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAkZm9ybSA9ICQoJ2Zvcm0nKTtcblx0Ly8genVlcnN0IGFsbGUgRm9ybXVsYXJlIGF1c2JsZW5kZW5cblx0JChcIiNmb3Jtc1wiKS5oaWRlKCk7XG4gICAgJGZvcm0uZWFjaChmdW5jdGlvbigpIHtcblx0XHQkKHRoaXMpLmhpZGUoKTtcblx0fSk7XG5cblx0aWYgKGZvcm11bGFybmFtZSkge1xuXHRcdGlmIChmb3JtdWxhcm5hbWUgIT09IFwiYXJ0XCIpIHtcblx0XHRcdC8vIFNwdXJlbiBkZXMgbGV0enRlbiBPYmpla3RzIGVudGZlcm5lblxuXHRcdFx0Ly8gSUU4IGthbm4gbmljaHQgZGVsZXRlblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGVsZXRlIGxvY2FsU3RvcmFnZS5hcnRfaWQ7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2UuYXJ0X2lkID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0Ly8gVVJMIGFucGFzc2VuLCBkYW1pdCBrZWluIE9iamVrdCBhbmdlemVpZ3Qgd2lyZFxuXHRcdFx0Ly8gVE9ETzogRElFU0VSIEJFRkVITCBMw5ZTVCBJTiBJRTExIEVJTkbDnEdFTiBWT04gOi8vLyBBVVMhISEhXG5cdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBcImluZGV4Lmh0bWxcIik7XG5cdFx0XHQvLyBhbGxlIELDpHVtZSBhdXNibGVuZGVuLCBzdWNoZmVsZCwgQmF1bXRpdGVsXG5cdFx0XHQkKFwiLnN1Y2hlblwiKS5oaWRlKCk7XG5cdFx0XHQkKFwiLmJhdW1cIikuaGlkZSgpO1xuXHRcdFx0JChcIi50cmVlQmVzY2hyaWZ0dW5nXCIpLmhpZGUoKTtcblx0XHRcdC8vIEdydXBwZSBTY2hhbHRmbMOkY2hlIGRlYWt0aXZpZXJlblxuXHRcdFx0JCgnI0dydXBwZScpLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fVxuXHRcdCRmb3JtLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGhhdCA9ICQodGhpcyk7XG5cdFx0XHRpZiAodGhhdC5hdHRyKFwiaWRcIikgPT09IGZvcm11bGFybmFtZSkge1xuXHRcdFx0XHQkKFwiI2Zvcm1zXCIpLnNob3coKTtcblx0XHRcdFx0dGhhdC5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0JCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcblx0XHQvLyBqZXR6dCBkaWUgTGlua3MgaW0gTWVudSAoZGUpYWt0aXZpZXJlblxuXHRcdHdpbmRvdy5hZGIuc2V0enRlTGlua3NadUJpbGRlclVuZFdpa2lwZWRpYSgpO1xuXHRcdGZvcm11bGFyX2FuZ2V6ZWlndC5yZXNvbHZlKCk7XG5cdH1cblx0cmV0dXJuIGZvcm11bGFyX2FuZ2V6ZWlndC5wcm9taXNlKCk7XG59O1xuXG4vLyBrb250cm9sbGllcmVuLCBvYiBkaWUgZXJmb3JkZXJsaWNoZW4gRmVsZGVyIGV0d2FzIGVudGhhbHRlblxuLy8gd2VubiBqYSB3aXJkIHRydWUgcmV0b3VybmllcnQsIHNvbnN0IGZhbHNlXG53aW5kb3cuYWRiLnZhbGlkaWVyZVNpZ251cCA9IGZ1bmN0aW9uKHdvaGVyKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGVtYWlsLFxuICAgICAgICBwYXNzd29ydCxcbiAgICAgICAgcGFzc3dvcnQyO1xuXHQvLyB6dW7DpGNoc3QgYWxsZSBIaW53ZWlzZSBhdXNibGVuZGVuIChmYWxscyBlaW5lciB2b24gZWluZXIgZnLDvGhlcmVuIFByw7xmdW5nIGhlciBub2NoIGVpbmdlYmxlbmRldCB3w6RyZSlcblx0JChcIi5oaW53ZWlzXCIpLmhpZGUoKTtcblx0Ly8gZXJmYXNzdGUgV2VydGUgaG9sZW5cblx0ZW1haWwgPSAkKFwiI0VtYWlsX1wiK3dvaGVyKS52YWwoKTtcblx0cGFzc3dvcnQgPSAkKFwiI1Bhc3N3b3J0X1wiK3dvaGVyKS52YWwoKTtcblx0cGFzc3dvcnQyID0gJChcIiNQYXNzd29ydDJfXCIrd29oZXIpLnZhbCgpO1xuXHQvLyBwcsO8ZmVuXG5cdGlmICghZW1haWwpIHtcblx0XHQkKFwiI0VtYWlsaGlud2Vpc19cIit3b2hlcikuc2hvdygpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI0VtYWlsX1wiK3dvaGVyKS5mb2N1cygpO1xuXHRcdH0sIDUwKTsgIC8vIG5lZWQgdG8gdXNlIGEgdGltZXIgc28gdGhhdCAuYmx1cigpIGNhbiBmaW5pc2ggYmVmb3JlIHlvdSBkbyAuZm9jdXMoKVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSBlbHNlIGlmICghcGFzc3dvcnQpIHtcblx0XHQkKFwiI1Bhc3N3b3J0aGlud2Vpc19cIit3b2hlcikuc2hvdygpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI1Bhc3N3b3J0X1wiK3dvaGVyKS5mb2N1cygpO1xuXHRcdH0sIDUwKTsgIC8vIG5lZWQgdG8gdXNlIGEgdGltZXIgc28gdGhhdCAuYmx1cigpIGNhbiBmaW5pc2ggYmVmb3JlIHlvdSBkbyAuZm9jdXMoKVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSBlbHNlIGlmICghcGFzc3dvcnQyKSB7XG5cdFx0JChcIiNQYXNzd29ydDJoaW53ZWlzX1wiK3dvaGVyKS5zaG93KCk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjUGFzc3dvcnQyX1wiK3dvaGVyKS5mb2N1cygpO1xuXHRcdH0sIDUwKTsgIC8vIG5lZWQgdG8gdXNlIGEgdGltZXIgc28gdGhhdCAuYmx1cigpIGNhbiBmaW5pc2ggYmVmb3JlIHlvdSBkbyAuZm9jdXMoKVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSBlbHNlIGlmIChwYXNzd29ydCAhPT0gcGFzc3dvcnQyKSB7XG5cdFx0JChcIiNQYXNzd29ydDJoaW53ZWlzRmFsc2NoX1wiK3dvaGVyKS5zaG93KCk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjUGFzc3dvcnQyX1wiK3dvaGVyKS5mb2N1cygpO1xuXHRcdH0sIDUwKTsgIC8vIG5lZWQgdG8gdXNlIGEgdGltZXIgc28gdGhhdCAuYmx1cigpIGNhbiBmaW5pc2ggYmVmb3JlIHlvdSBkbyAuZm9jdXMoKVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn07XG5cbndpbmRvdy5hZGIuZXJzdGVsbGVLb250byA9IGZ1bmN0aW9uKHdvaGVyKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8gVXNlciBpbiBfdXNlciBlaW50cmFnZW5cblx0JC5jb3VjaC5zaWdudXAoe1xuXHRcdG5hbWU6ICQoJyNFbWFpbF8nK3dvaGVyKS52YWwoKVxuXHR9LFxuXHQkKCcjUGFzc3dvcnRfJyt3b2hlcikudmFsKCksIHtcblx0XHRzdWNjZXNzIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRsb2NhbFN0b3JhZ2UuRW1haWwgPSAkKCcjRW1haWxfJyt3b2hlcikudmFsKCk7XG5cdFx0XHRpZiAod29oZXIgPT09IFwiYXJ0XCIpIHtcblx0XHRcdFx0d2luZG93LmFkYi5iZWFyYmVpdGVMclRheG9ub21pZSgpO1xuXHRcdFx0fVxuXHRcdFx0d2luZG93LmFkYi5wYXNzZVVpRsO8ckFuZ2VtZWxkZXRlblVzZXJBbih3b2hlcik7XG5cdFx0XHQvLyBXZXJ0ZSBhdXMgRmVsZGVybiBlbnRmZXJuZW5cblx0XHRcdCQoXCIjRW1haWxfXCIrd29oZXIpLnZhbChcIlwiKTtcblx0XHRcdCQoXCIjUGFzc3dvcnRfXCIrd29oZXIpLnZhbChcIlwiKTtcblx0XHRcdCQoXCIjUGFzc3dvcnQyX1wiK3dvaGVyKS52YWwoXCJcIik7XG5cdFx0fSxcblx0XHRlcnJvciA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHByYWVmaXggPSBcImltcG9ydGllcmVuX1wiO1xuXHRcdFx0aWYgKHdvaGVyID09PSBcImFydFwiKSB7XG5cdFx0XHRcdHByYWVmaXggPSBcIlwiO1xuXHRcdFx0fVxuXHRcdFx0JChcIiNcIitwcmFlZml4K3dvaGVyK1wiX2FubWVsZGVuX2ZlaGxlcl90ZXh0XCIpLmh0bWwoXCJGZWhsZXI6IERhcyBLb250byB3dXJkZSBuaWNodCBlcnN0ZWxsdFwiKTtcblx0XHRcdCQoXCIjXCIrcHJhZWZpeCt3b2hlcitcIl9hbm1lbGRlbl9mZWhsZXJcIilcbiAgICAgICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgICAgIC5zaG93KCk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbndpbmRvdy5hZGIubWVsZGVVc2VyQW4gPSBmdW5jdGlvbih3b2hlcikge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBlbWFpbCA9ICQoJyNFbWFpbF8nK3dvaGVyKS52YWwoKSxcblx0XHRwYXNzd29ydCA9ICQoJyNQYXNzd29ydF8nK3dvaGVyKS52YWwoKTtcblx0aWYgKHdpbmRvdy5hZGIudmFsaWRpZXJlVXNlckFubWVsZHVuZyh3b2hlcikpIHtcblx0XHQkLmNvdWNoLmxvZ2luKHtcblx0XHRcdG5hbWUgOiBlbWFpbCxcblx0XHRcdHBhc3N3b3JkIDogcGFzc3dvcnQsXG5cdFx0XHRzdWNjZXNzIDogZnVuY3Rpb24ocikge1xuXHRcdFx0XHRsb2NhbFN0b3JhZ2UuRW1haWwgPSAkKCcjRW1haWxfJyt3b2hlcikudmFsKCk7XG5cdFx0XHRcdGlmICh3b2hlciA9PT0gXCJhcnRcIikge1xuXHRcdFx0XHRcdHdpbmRvdy5hZGIuYmVhcmJlaXRlTHJUYXhvbm9taWUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR3aW5kb3cuYWRiLnBhc3NlVWlGw7xyQW5nZW1lbGRldGVuVXNlckFuKHdvaGVyKTtcblx0XHRcdFx0Ly8gV2VydGUgYXVzIEZlbGRlcm4gZW50ZmVybmVuXG5cdFx0XHRcdCQoXCIjRW1haWxfXCIrd29oZXIpLnZhbChcIlwiKTtcblx0XHRcdFx0JChcIiNQYXNzd29ydF9cIit3b2hlcikudmFsKFwiXCIpO1xuXHRcdFx0XHQkKFwiI2FydF9hbm1lbGRlblwiKS5zaG93KCk7XG5cdFx0XHRcdC8vIGFkbWluLUZ1bmt0aW9uZW5cblx0XHRcdFx0aWYgKHIucm9sZXMuaW5kZXhPZihcIl9hZG1pblwiKSAhPT0gLTEpIHtcblx0XHRcdFx0XHQvLyBkYXMgaXN0IGVpbiBhZG1pblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiaGFsbG8gYWRtaW5cIik7XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLmFkbWluID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkZWxldGUgbG9jYWxTdG9yYWdlLmFkbWluO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHdpbmRvdy5hZGIuYmxlbmRlTWVudXMoKTtcblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBwcsOkZml4ID0gXCJpbXBvcnRpZXJlbl9cIjtcblx0XHRcdFx0aWYgKHdvaGVyID09PSBcImFydFwiKSB7XG5cdFx0XHRcdFx0cHLDpGZpeCA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8genVlcnN0IGFsbGbDpGxsaWdlIGJlc3RlaGVuZGUgSGlud2Vpc2UgYXVzYmxlbmRlblxuXHRcdFx0XHQkKFwiLmhpbndlaXNcIikuaGlkZSgpO1xuXHRcdFx0XHQkKFwiI1wiK3Byw6RmaXgrd29oZXIrXCJfYW5tZWxkZW5fZmVobGVyX3RleHRcIilcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoXCJBbm1lbGR1bmcgZ2VzY2hlaXRlcnQuPGJyPlNpZSBtw7xzc2VuIGV2LiBlaW4gS29udG8gZXJzdGVsbGVuP1wiKVxuICAgICAgICAgICAgICAgICAgICAuYWxlcnQoKVxuXHRcdFx0XHQgICAgLnNob3coKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufTtcblxud2luZG93LmFkYi5ibGVuZGVNZW51cyA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmIChsb2NhbFN0b3JhZ2UuYWRtaW4pIHtcblx0XHQkKFwiI21lbnVfYnRuXCIpXG4gICAgICAgICAgICAuZmluZChcIi5hZG1pblwiKVxuICAgICAgICAgICAgLnNob3coKTtcblx0fSBlbHNlIHtcblx0XHQkKFwiI21lbnVfYnRuXCIpXG4gICAgICAgICAgICAuZmluZChcIi5hZG1pblwiKVxuICAgICAgICAgICAgLmhpZGUoKTtcblx0fVxufTtcblxud2luZG93LmFkYi5tZWxkZVVzZXJBYiA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdC8vIElFOCBrYW5uIG5pY2h0IGRlbGV0ZW5cblx0dHJ5IHtcblx0XHRkZWxldGUgbG9jYWxTdG9yYWdlLkVtYWlsO1xuXHR9XG5cdGNhdGNoIChlKSB7XG5cdFx0bG9jYWxTdG9yYWdlLkVtYWlsID0gdW5kZWZpbmVkO1xuXHR9XG5cdCQoXCIuYXJ0X2FubWVsZGVuX3RpdGVsXCIpLnRleHQoXCJBbm1lbGRlblwiKTtcblx0JChcIi5pbXBvcnRpZXJlbl9hbm1lbGRlbl90aXRlbFwiKS50ZXh0KFwiMS4gQW5tZWxkZW5cIik7XG5cdCQoXCIuYWxlcnRcIikuaGlkZSgpO1xuXHQkKFwiLmhpbndlaXNcIikuaGlkZSgpO1xuXHQkKFwiLndlbGwuYW5tZWxkZW5cIikuc2hvdygpO1xuXHQkKFwiLkVtYWlsXCIpLnNob3coKTtcblx0JChcIi5QYXNzd29ydFwiKS5zaG93KCk7XG5cdCQoXCIuYW5tZWxkZW5fYnRuXCIpLnNob3coKTtcblx0JChcIi5hYm1lbGRlbl9idG5cIikuaGlkZSgpO1xuXHQvLyBhdXNzY2hhbHRlbiwgc29sbCBzcMOkdGVyIGJlaSBPcmdhbmlzYXRpb24gbcO2Z2xpY2ggd2VyZGVuXG5cdC8vICQoXCIua29udG9fZXJzdGVsbGVuX2J0blwiKS5zaG93KCk7XG5cdCQoXCIua29udG9fc3BlaWNoZXJuX2J0blwiKS5oaWRlKCk7XG5cdCQoXCIjYXJ0X2FubWVsZGVuXCIpLmhpZGUoKTtcblx0d2luZG93LmFkYi5zY2jDvHR6ZUxyVGF4b25vbWllKCk7XG4gICAgLy8gZmFsbHMgZGllc2VyIFVzZXIgYWRtaW4gd2FyOiB2ZXJnZXNzZW5cbiAgICBkZWxldGUgbG9jYWxTdG9yYWdlLmFkbWluO1xuICAgIC8vIGbDvHIgZGllc2VuIE51dHplciBwYXNzZW5kZSBNZW51cyBhbnplaWdlblxuICAgIHdpbmRvdy5hZGIuYmxlbmRlTWVudXMoKTtcbn07XG5cbndpbmRvdy5hZGIucGFzc2VVaUbDvHJBbmdlbWVsZGV0ZW5Vc2VyQW4gPSBmdW5jdGlvbih3b2hlcikge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBwcsOkZml4ID0gXCJpbXBvcnRpZXJlbl9cIjtcblx0aWYgKHdvaGVyID09PSBcImFydFwiKSB7XG5cdFx0cHLDpGZpeCA9IFwiXCI7XG5cdH1cblx0JChcIiNhcnRfYW5tZWxkZW5fdGl0ZWxcIikudGV4dChsb2NhbFN0b3JhZ2UuRW1haWwgKyBcIiBpc3QgYW5nZW1lbGRldFwiKTtcblx0JChcIi5pbXBvcnRpZXJlbl9hbm1lbGRlbl90aXRlbFwiKS50ZXh0KFwiMS4gXCIgKyBsb2NhbFN0b3JhZ2UuRW1haWwgKyBcIiBpc3QgYW5nZW1lbGRldFwiKTtcblx0aWYgKHdvaGVyICE9PSBcImFydFwiKSB7XG5cdFx0JChcIiNcIiArIHByw6RmaXggKyB3b2hlciArIFwiX2FubWVsZGVuX2NvbGxhcHNlXCIpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdFx0JChcIiNpbXBvcnRpZXJlbl9cIiArIHdvaGVyICsgXCJfZHNfYmVzY2hyZWliZW5fY29sbGFwc2VcIikuY29sbGFwc2UoJ3Nob3cnKTtcblx0fVxuXHQkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcblx0JChcIi5oaW53ZWlzXCIpLmhpZGUoKTtcblx0JChcIi53ZWxsLmFubWVsZGVuXCIpLmhpZGUoKTtcblx0JChcIi5FbWFpbFwiKS5oaWRlKCk7XG5cdCQoXCIuUGFzc3dvcnRcIikuaGlkZSgpO1xuXHQkKFwiLmFubWVsZGVuX2J0blwiKS5oaWRlKCk7XG5cdCQoXCIuYWJtZWxkZW5fYnRuXCIpLnNob3coKTtcblx0JChcIi5rb250b19lcnN0ZWxsZW5fYnRuXCIpLmhpZGUoKTtcblx0JChcIi5rb250b19zcGVpY2hlcm5fYnRuXCIpLmhpZGUoKTtcblx0Ly8gaW4gTFIgc29sbCBBbm1lbGRlLUFjY29yZGlvbiBuaWNodCBzaWNodGJhciBzZWluXG5cdCQoXCIjYXJ0X2FubWVsZGVuXCIpLmhpZGUoKTtcbn07XG5cbi8vIHByw7xmdCwgb2IgZGVyIEJlbnV0emVyIGFuZ2VtZWxkZXQgaXN0XG4vLyBqYTogcmV0b3VybmllcnQgdHJ1ZVxuLy8gbmVpbjogcmV0b3VybmllcnQgZmFsc2UgdW5kIMO2ZmZuZXQgZGllIEFubWVsZHVuZ1xuLy8gd2VsY2hlIGFubWVsZHVuZyBow6RuZ3QgYWIsIHdvaGVyIGRpZSBQcsO8ZnVuZyBhbmdlZm9yZGVydCB3dXJkZVxuLy8gZGFydW0gZXJ3YXJ0ZXQgZGllIEZ1bmt0aW9uIGRlbiBwYXJhbWV0ZXIgd29oZXJcbndpbmRvdy5hZGIucHLDvGZlQW5tZWxkdW5nID0gZnVuY3Rpb24od29oZXIpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAoIWxvY2FsU3RvcmFnZS5FbWFpbCkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHR3aW5kb3cuYWRiLnp1csO8Y2tadXJBbm1lbGR1bmcod29oZXIpO1xuXHRcdH0sIDYwMCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiB0cnVlO1xufTtcblxud2luZG93LmFkYi56dXLDvGNrWnVyQW5tZWxkdW5nID0gZnVuY3Rpb24od29oZXIpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgcHLDpGZpeCA9IFwiaW1wb3J0aWVyZW5fXCI7XG5cblx0Ly8gQmVpIExSIG11c3MgZGVyIEFubWVsZHVuZ3NhYnNjaG5pdHQgZWluZ2VibGVuZGV0IHdlcmRlblxuXHRpZiAod29oZXIgPT09IFwiYXJ0XCIpIHtcblx0XHRwcsOkZml4ID0gXCJcIjtcblx0XHQkKFwiI2FydF9hbm1lbGRlblwiKS5zaG93KCk7XG5cdH1cblxuXHQvLyBNaXR0ZWlsZW4sIGRhc3MgQW5tZWxkdW5nIG7DtnRpZyBpc3Rcblx0JChcIiNcIitwcsOkZml4K3dvaGVyK1wiX2FubWVsZGVuX2hpbndlaXNcIilcbiAgICAgICAgLmFsZXJ0KClcbiAgICAgICAgLnNob3coKTtcblx0JChcIiNcIitwcsOkZml4K3dvaGVyK1wiX2FubWVsZGVuX2hpbndlaXNfdGV4dFwiKS5odG1sKFwiVW0gRGF0ZW4genUgYmVhcmJlaXRlbiwgbcO8c3NlbiBTaWUgYW5nZW1lbGRldCBzZWluXCIpO1xuXHQkKFwiI1wiK3Byw6RmaXgrd29oZXIrXCJfYW5tZWxkZW5fY29sbGFwc2VcIikuY29sbGFwc2UoJ3Nob3cnKTtcblx0JChcIi5hbm1lbGRlbl9idG5cIikuc2hvdygpO1xuXHQkKFwiLmFibWVsZGVuX2J0blwiKS5oaWRlKCk7XG5cdC8vIGF1c3NjaGFsdGVuLCBzb2xsIHNww6R0ZXIgYmVpIE9yZ2FuaXNhdGlvbmVuIG3DtmdsaWNoIHdlcmRlblxuXHQvLyQoXCIua29udG9fZXJzdGVsbGVuX2J0blwiKS5zaG93KCk7XG5cdCQoXCIua29udG9fc3BlaWNoZXJuX2J0blwiKS5oaWRlKCk7XG5cdCQoXCIjRW1haWxfXCIrd29oZXIpLmZvY3VzKCk7XG59O1xuXG53aW5kb3cuYWRiLnZhbGlkaWVyZVVzZXJBbm1lbGR1bmcgPSBmdW5jdGlvbih3b2hlcikge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBlbWFpbCA9ICQoJyNFbWFpbF8nK3dvaGVyKS52YWwoKSxcblx0XHRwYXNzd29ydCA9ICQoJyNQYXNzd29ydF8nK3dvaGVyKS52YWwoKTtcblx0aWYgKCFlbWFpbCkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKCcjRW1haWxfJyt3b2hlcikuZm9jdXMoKTtcblx0XHR9LCA1MCk7ICAvLyBuZWVkIHRvIHVzZSBhIHRpbWVyIHNvIHRoYXQgLmJsdXIoKSBjYW4gZmluaXNoIGJlZm9yZSB5b3UgZG8gLmZvY3VzKClcblx0XHQkKFwiI0VtYWlsaGlud2Vpc19cIit3b2hlcikuc2hvdygpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBlbHNlIGlmICghcGFzc3dvcnQpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnI1Bhc3N3b3J0Xycrd29oZXIpLmZvY3VzKCk7XG5cdFx0fSwgNTApOyAgLy8gbmVlZCB0byB1c2UgYSB0aW1lciBzbyB0aGF0IC5ibHVyKCkgY2FuIGZpbmlzaCBiZWZvcmUgeW91IGRvIC5mb2N1cygpXG5cdFx0JChcIiNQYXNzd29ydGhpbndlaXNfXCIrd29oZXIpLnNob3coKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRydWU7XG59O1xuXG4vLyB3ZW5uIEJzTmFtZSBnZcOkbmRlcnQgd2lyZFxuLy8gc3VjaGVuLCBvYiBzY2hvbiBlaW5lIERhdGVuc2FtbWx1bmcgbWl0IGRpZXNlbSBOYW1lbiBleGlzdGllcnRcbi8vIHVuZCBzaWUgdm9uIGplbWFuZCBhbmRlcmVtIGltcG9ydGllcnQgd3VyZGVcbi8vIHVuZCBzaWUgbmljaHQgenVzYW1tZW5mYXNzZW5kIGlzdFxud2luZG93LmFkYi5oYW5kbGVCc05hbWVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgdGhhdCA9IHRoaXMsXG5cdFx0YnNfa2V5ID0gXy5maW5kKHdpbmRvdy5hZGIuZHNfbmFtZW5fZWluZGV1dGlnLCBmdW5jdGlvbihrZXkpIHtcblx0XHRcdHJldHVybiBrZXlbMF0gPT09IHRoYXQudmFsdWUgJiYga2V5WzJdICE9PSBsb2NhbFN0b3JhZ2UuRW1haWwgJiYgIWtleVsxXTtcblx0XHR9KTtcblx0aWYgKGJzX2tleSkge1xuXHRcdCQoXCIjaW1wb3J0aWVyZW5fYnNfZHNfYmVzY2hyZWliZW5faGlud2VpczJcIilcbiAgICAgICAgICAgIC5hbGVydCgpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1zdWNjZXNzXCIpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIilcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImFsZXJ0LWluZm9cIilcbiAgICAgICAgICAgIC5zaG93KCk7XG5cdFx0JChcIiNpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzX3RleHQyXCIpLmh0bWwoJ0VzIGV4aXN0aWVydCBzY2hvbiBlaW5lIGdsZWljaCBoZWlzc2VuZGUgdW5kIG5pY2h0IHp1c2FtbWVuZmFzc2VuZGUgQmV6aWVodW5nc3NhbW1sdW5nLjxicj5TaWUgd3VyZGUgdm9uIGplbWFuZCBhbmRlcmVtIGltcG9ydGllcnQuIERhaGVyIG3DvHNzZW4gU2llIGVpbmVuIGFuZGVyZW4gTmFtZW4gdmVyd2VuZGVuLicpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkKFwiI2ltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyXCIpXG4gICAgICAgICAgICAgICAgLmFsZXJ0KClcbiAgICAgICAgICAgICAgICAuaGlkZSgpO1xuXHRcdH0sIDMwMDAwKTtcblx0XHQkKFwiI0JzTmFtZVwiKVxuICAgICAgICAgICAgLnZhbChcIlwiKVxuXHRcdCAgICAuZm9jdXMoKTtcblx0fSBlbHNlIHtcblx0XHQkKFwiI2ltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyXCIpXG4gICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgLmhpZGUoKTtcblx0fVxufTtcblxuLy8gV2VubiBEc0ltcG9ydGllcnRWb24gZ2XDpG5kZXJ0IHdpcmRcbi8vIGtvbnRyb2xsaWVyZW4sIGRhc3MgZXMgZGllIGVtYWlsIGRlciBhbmdlbWVsZGV0ZW4gUGVyc29uIGlzdFxud2luZG93LmFkYi5oYW5kbGVEc0ltcG9ydGllcnRWb25DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIHZhciAkaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5faGlud2VpczIgPSAkKFwiI2ltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyXCIpO1xuXHQkKFwiI0RzSW1wb3J0aWVydFZvblwiKS52YWwobG9jYWxTdG9yYWdlLkVtYWlsKTtcblx0JGltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyXG4gICAgICAgIC5hbGVydCgpXG4gICAgICAgIC5zaG93KClcblx0ICAgIC5odG1sKCdcImltcG9ydGllcnQgdm9uXCIgaXN0IGltbWVyIGRpZSBlbWFpbC1BZHJlc3NlIGRlciBhbmdlbWVsZGV0ZW4gUGVyc29uJyk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0JGltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyXG4gICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgLmhpZGUoKTtcblx0fSwgMTAwMDApO1xufTtcblxuLy8gV2VubiBCc0ltcG9ydGllcnRWb24gZ2XDpG5kZXJ0IHdpcmRcbi8vIEtvbnRyb2xsaWVyZW4sIGRhc3MgZXMgZGllIGVtYWlsIGRlciBhbmdlbWVsZGV0ZW4gUGVyc29uIGlzdFxud2luZG93LmFkYi5oYW5kbGVCc0ltcG9ydGllcnRWb25DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQkKFwiI0JzSW1wb3J0aWVydFZvblwiKS52YWwobG9jYWxTdG9yYWdlLkVtYWlsKTtcblx0JChcIiNpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzMlwiKVxuICAgICAgICAuYWxlcnQoKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1zdWNjZXNzXCIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKVxuICAgICAgICAuYWRkQ2xhc3MoXCJhbGVydC1pbmZvXCIpXG4gICAgICAgIC5zaG93KCk7XG5cdCQoXCIjaW1wb3J0aWVyZW5fYnNfZHNfYmVzY2hyZWliZW5faGlud2Vpc190ZXh0MlwiKS5odG1sKCdcImltcG9ydGllcnQgdm9uXCIgaXN0IGltbWVyIGRpZSBlbWFpbC1BZHJlc3NlIGRlciBhbmdlbWVsZGV0ZW4gUGVyc29uJyk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0JChcIiNpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzMlwiKVxuICAgICAgICAgICAgLmFsZXJ0KClcbiAgICAgICAgICAgIC5oaWRlKCk7XG5cdH0sIDEwMDAwKTtcbn07XG5cbi8vIHdlbm4gQnNadXNhbW1lbmZhc3NlbmQgZ2XDpG5kZXJ0IHdpcmRcbi8vIEJzVXJzcHJ1bmdzQnNfZGl2IHplaWdlbiBvZGVyIHZlcnN0ZWNrZW5cbndpbmRvdy5hZGIuaGFuZGxlQnNadXNhbW1lbmZhc3NlbmRDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHQkKFwiI0JzVXJzcHJ1bmdzQnNfZGl2XCIpLnNob3coKTtcblx0fSBlbHNlIHtcblx0XHQkKFwiI0JzVXJzcHJ1bmdzQnNfZGl2XCIpLmhpZGUoKTtcblx0fVxufTtcblxuLy8gd2VubiBEc1p1c2FtbWVuZmFzc2VuZCBnZcOkbmRlcnQgd2lyZFxuLy8gRHNVcnNwcnVuZ3NEcyB6ZWlnZW4gb2RlciB2ZXJzdGVja2VuXG53aW5kb3cuYWRiLmhhbmRsZURzWnVzYW1tZW5mYXNzZW5kQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0JChcIiNEc1Vyc3BydW5nc0RzX2RpdlwiKS5zaG93KCk7XG5cdH0gZWxzZSB7XG5cdFx0JChcIiNEc1Vyc3BydW5nc0RzX2RpdlwiKS5oaWRlKCk7XG5cdH1cbn07XG5cbi8vIFdlbm4gQnNXw6RobGVuIGdlw6RuZGVydCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZUJzV8OkaGxlbkNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBic19uYW1lID0gdGhpcy52YWx1ZSxcblx0XHR3w6RobGJhciA9IGZhbHNlLFxuICAgICAgICAkQnNBbnpEcyA9ICQoXCIjQnNBbnpEc1wiKSxcbiAgICAgICAgJEJzQW56RHNfbGFiZWwgPSAkKFwiI0JzQW56RHNfbGFiZWxcIiksXG4gICAgICAgICRCc05hbWUgPSAkKFwiI0JzTmFtZVwiKSxcbiAgICAgICAgJGltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyID0gJChcIiNpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzMlwiKTtcbiAgICAvLyBhbGxmw6RsbGlnZW4gQWxlcnQgc2NobGllc3NlblxuICAgICRpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzMlxuICAgICAgICAuYWxlcnQoKVxuICAgICAgICAuaGlkZSgpO1xuICAgIC8vIHfDpGhsYmFyIHNldHplblxuICAgIC8vIHfDpGhsZW4ga2FubiBtYW4gbnVyLCB3YXMgbWFuIHNlbGJlciBpbXBvcnRpZXJ0IGhhdCAtIG9kZXIgYWRtaW4gaXN0XG4gICAgaWYgKCQoXCIjXCIrdGhpcy5pZCtcIiBvcHRpb246c2VsZWN0ZWRcIikuYXR0cihcIndhZWhsYmFyXCIpID09PSBcInRydWVcIikge1xuICAgICAgICB3w6RobGJhciA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChCb29sZWFuKGxvY2FsU3RvcmFnZS5hZG1pbikpIHtcbiAgICAgICAgd8OkaGxiYXIgPSB0cnVlO1xuICAgIH1cblx0aWYgKHfDpGhsYmFyKSB7XG5cdFx0Ly8genVlcnN0IGFsbGUgRmVsZGVyIGxlZXJlblxuXHRcdCQoJyNpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9jb2xsYXBzZSB0ZXh0YXJlYSwgI2ltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2NvbGxhcHNlIGlucHV0JykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdCQodGhpcykudmFsKCcnKTtcblx0XHR9KTtcblx0XHQkQnNBbnpEcy5odG1sKFwiXCIpO1xuXHRcdCRCc0FuekRzX2xhYmVsLmh0bWwoXCJcIik7XG5cdFx0aWYgKGJzX25hbWUpIHtcbiAgICAgICAgICAgIF8uZWFjaCh3aW5kb3cuYWRiLmJzX3Zvbl9vYmpla3Rlbi5yb3dzLCBmdW5jdGlvbihic19yb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoYnNfcm93LmtleVsxXSA9PT0gYnNfbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAkQnNOYW1lLnZhbChic19uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGJzX3JvdywgZnVuY3Rpb24oZmVsZHdlcnQsIGZlbGRuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmVsZG5hbWUgPT09IFwiVXJzcHJ1bmdzZGF0ZW5zYW1tbHVuZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNCc1Vyc3BydW5nc0JzXCIpLnZhbChmZWxkd2VydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZlbGRuYW1lICE9PSBcImltcG9ydGllcnQgdm9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0JzXCIgKyBmZWxkbmFtZSkudmFsKGZlbGR3ZXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChic19yb3cua2V5WzJdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0JzWnVzYW1tZW5mYXNzZW5kXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjQnNVcnNwcnVuZ3NCc19kaXZcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2ljaGVyc3RlbGxlbiwgZGFzcyBkZXIgSGFrZW4gaW0gRmVsZCBlbnRmZXJudCB3aXJkLCB3ZW5uIG5hY2ggZGVyIHp1c2FtbWVuZmFzc2VuZGVuIGVpbmUgYW5kZXJlIEJTIGdld8OkaGx0IHdpcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjQnNadXNhbW1lbmZhc3NlbmRcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjQnNVcnNwcnVuZ3NCc19kaXZcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlbm4gZGllIGRzL2JzIGtlaW4gXCJpbXBvcnRpZXJ0IHZvblwiIGhhdCBpc3QgZGVyIFdlcnQgbnVsbFxuICAgICAgICAgICAgICAgICAgICAvLyB2ZXJoaW5kZXJuLCBkYXNzIG51bGwgYW5nZXplaWd0IHdpcmRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJzX3Jvdy5rZXlbM10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjQnNJbXBvcnRpZXJ0Vm9uXCIpLnZhbChic19yb3cua2V5WzNdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjQnNJbXBvcnRpZXJ0Vm9uXCIpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkQnNBbnpEc19sYWJlbC5odG1sKFwiQW56YWhsIEFydGVuL0xlYmVuc3LDpHVtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgJEJzQW56RHMuaHRtbChic19yb3cudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkYWbDvHIgc29yZ2VuLCBkYXNzIHRleHRhcmVhcyBnZW51ZyBncm9zcyBzaW5kXG4gICAgICAgICAgICAgICAgICAgICQoJyNpbXBvcnRpZXJlbl9icycpLmZpbmQoJ3RleHRhcmVhJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGIuZml0VGV4dGFyZWFUb0NvbnRlbnQodGhpcywgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkQnNOYW1lLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGzDtnNjaGVuLVNjaGFsdGZsw6RjaGUgZWluYmxlbmRlblxuICAgICAgICAgICAgICAgICQoXCIjQnNMb2VzY2hlblwiKS5zaG93KCk7XG4gICAgICAgICAgICB9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gbMO2c2NoZW4tU2NoYWx0ZmzDpGNoZSBhdXNibGVuZGVuXG5cdFx0XHQkKFwiI0JzTG9lc2NoZW5cIikuaGlkZSgpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBtZWxkZW4sIGRhc3MgZGllc2UgQlMgbmljaHQgYmVhcmJlaXRldCB3ZXJkZW4ga2FublxuICAgICAgICAkKFwiI2ltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyXCIpXG4gICAgICAgICAgICAuaHRtbChcIlNpZSBrw7ZubmVuIG51ciBCZXppZWh1bmdzc2FtbWx1bmdlbiB2ZXLDpG5kZXJuLCBkaWUgU2llIHNlbGJlciBpbXBvcnRpZXJ0IGhhYmVuLjxicj5BdXNuYWhtZTogWnVzYW1tZW5mYXNzZW5kZSBCZXppZWh1bmdzc2FtbWx1bmdlbi5cIik7XG4gICAgICAgICRpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzMlxuICAgICAgICAgICAgLmFsZXJ0KClcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWluZm9cIilcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImFsZXJ0LWRhbmdlclwiKVxuICAgICAgICAgICAgLnNob3coKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI0JzV2FlaGxlblwiKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG5cdH1cbn07XG5cbi8vIHdlbm4gRHNGaWxlIGdlw6RuZGVydCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZURzRmlsZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmICh0eXBlb2YgZXZlbnQudGFyZ2V0LmZpbGVzWzBdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0Ly8gdm9yaGFuZGVuZSBEYXRlaSB3dXJkZSBlbnRmZXJudFxuXHRcdCQoXCIjRHNUYWJlbGxlRWlnZW5zY2hhZnRlblwiKS5oaWRlKCk7XG5cdFx0JChcIiNpbXBvcnRpZXJlbl9kc19pZHNfaWRlbnRpZml6aWVyZW5faGlud2Vpc190ZXh0XCIpLmhpZGUoKTtcblx0XHQkKFwiI0RzSW1wb3J0aWVyZW5cIikuaGlkZSgpO1xuXHRcdCQoXCIjRHNFbnRmZXJuZW5cIikuaGlkZSgpO1xuXHR9IGVsc2Uge1xuICAgICAgICB2YXIgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlc1swXSxcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRiLmRzRGF0ZW5zw6R0emUgPSAkLmNzdi50b09iamVjdHMoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRiLmVyc3RlbGxlVGFiZWxsZSh3aW5kb3cuYWRiLmRzRGF0ZW5zw6R0emUsIFwiRHNGZWxkZXJfZGl2XCIsIFwiRHNUYWJlbGxlRWlnZW5zY2hhZnRlblwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgfVxufTtcblxuLy8gd2VubiBCc0ZpbGUgZ2XDpG5kZXJ0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlQnNGaWxlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKHR5cGVvZiBldmVudC50YXJnZXQuZmlsZXNbMF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHQvLyB2b3JoYW5kZW5lIERhdGVpIHd1cmRlIGVudGZlcm50XG5cdFx0JChcIiNCc1RhYmVsbGVFaWdlbnNjaGFmdGVuXCIpLmhpZGUoKTtcblx0XHQkKFwiI2ltcG9ydGllcmVuX2JzX2lkc19pZGVudGlmaXppZXJlbl9oaW53ZWlzX3RleHRcIikuaGlkZSgpO1xuXHRcdCQoXCIjQnNJbXBvcnRpZXJlblwiKS5oaWRlKCk7XG5cdFx0JChcIiNCc0VudGZlcm5lblwiKS5oaWRlKCk7XG5cdH0gZWxzZSB7XG4gICAgICAgIHZhciBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdLFxuICAgICAgICAgICAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRiLmJzRGF0ZW5zw6R0emUgPSAkLmNzdi50b09iamVjdHMoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRiLmVyc3RlbGxlVGFiZWxsZSh3aW5kb3cuYWRiLmJzRGF0ZW5zw6R0emUsIFwiQnNGZWxkZXJfZGl2XCIsIFwiQnNUYWJlbGxlRWlnZW5zY2hhZnRlblwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgfVxufTtcblxuLy8gd2VubiBidG5fcmVzaXplIGdla2xpY2t0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlQnRuUmVzaXplQ2xpY2sgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgICAkYm9keSA9ICQoXCJib2R5XCIpO1xuXHQkYm9keS50b2dnbGVDbGFzcyhcImZvcmNlLW1vYmlsZVwiKTtcblx0aWYgKCRib2R5Lmhhc0NsYXNzKFwiZm9yY2UtbW9iaWxlXCIpKSB7XG5cdFx0Ly8gU3BhbHRlbiBzaW5kIHVudGVyZWluYW5kZXIuIEJhdW0gOTFweCB3ZW5pZ2VyIGhvY2gsIGRhbWl0IEZvcm11bGFyZSB6dW0gcmF1ZnNjaGllYmVuIGltbWVyIGVycmVpY2h0IHdlcmRlbiBrw7ZubmVuXG5cdFx0JChcIi5iYXVtXCIpLmNzcyhcIm1heC1oZWlnaHRcIiwgd2luZG93SGVpZ2h0IC0gMjUyKTtcblx0XHQvLyBidXR0b24gcmVjaHRzIGF1c3JpY2h0ZW5cblx0XHQkKFwiI2J0bl9yZXNpemVcIilcbiAgICAgICAgICAgIC5jc3MoXCJtYXJnaW4tcmlnaHRcIiwgXCIwcHhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZGF0YS1vcmlnaW5hbC10aXRsZVwiLCBcImluIHp3ZWkgU3BhbHRlbiBhbnplaWdlblwiKTtcblx0fSBlbHNlIHtcblx0XHQkKFwiLmJhdW1cIikuY3NzKFwibWF4LWhlaWdodFwiLCB3aW5kb3dIZWlnaHQgLSAxNjEpO1xuXHRcdC8vIGJ1dHRvbiBhbiBhbmRlcmVuIFNjaGFsdGZsw6RjaGVuIGF1c3JpY2h0ZW5cblx0XHQkKFwiI2J0bl9yZXNpemVcIilcbiAgICAgICAgICAgIC5jc3MoXCJtYXJnaW4tcmlnaHRcIiwgXCI2cHhcIilcbiAgICAgICAgICAgIC5hdHRyKFwiZGF0YS1vcmlnaW5hbC10aXRsZVwiLCBcImdhbnplIEJyZWl0ZSBudXR6ZW5cIik7XG5cdH1cbn07XG5cbi8vIHdlbm4gbWVudV9idG4gZ2VrbGlja3Qgd2lyZFxuLy8gTWVudTogTGlua3MgenUgR29vZ2xlIEJpbGRlciB1bmQgV2lraXBlZGlhIG51ciBha3RpdiBzZXR6ZW4sIHdlbm4gQXJ0IG9kZXIgTGViZW5zcmF1bSBhbmdlemVpZ3Qgd2lyZFxud2luZG93LmFkYi5oYW5kbGVNZW51QnRuQ2xpY2sgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAobG9jYWxTdG9yYWdlLmFydF9pZCkge1xuXHRcdCQoXCIjR29vZ2xlQmlsZGVyTGlua19saVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuXHRcdCQoXCIjV2lraXBlZGlhTGlua19saVwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuXHR9IGVsc2Uge1xuXHRcdCQoXCIjR29vZ2xlQmlsZGVyTGlua19saVwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXHRcdCQoXCIjV2lraXBlZGlhTGlua19saVwiKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xuXHR9XG59O1xuXG4vLyB3ZW5uIGRzX2ltcG9ydGllcmVuIGdla2xpY2t0IHdpcmRcbi8vIHRlc3Rlbiwgb2IgZGVyIEJyb3dzZXIgZGFzIEltcG9ydGllcmVuIHVudGVyc3TDvHR6dFxuLy8gd2VubiBuZWluLCBNZWxkdW5nIGJyaW5nZW4gKG1hY2h0IGRpZSBhdWZnZXJ1ZmVuZSBGdW5rdGlvbilcbndpbmRvdy5hZGIuaGFuZGxlRHNfSW1wb3J0aWVyZW5DbGljayA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmKHdpbmRvdy5hZGIuaXNGaWxlQVBJQXZhaWxhYmxlKCkpIHtcblx0XHR3aW5kb3cuYWRiLnplaWdlRm9ybXVsYXIoXCJpbXBvcnRpZXJlbl9kc1wiKTtcblx0XHQvLyBJc3QgZGVyIFVzZXIgbm9jaCBhbmdlbWVsZGV0PyBXZW5uIGphOiBBbm1lbGR1bmcgw7xiZXJzcHJpbmdlblxuXHRcdGlmICh3aW5kb3cuYWRiLnByw7xmZUFubWVsZHVuZyhcImRzXCIpKSB7XG5cdFx0XHQkKFwiI2ltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2NvbGxhcHNlXCIpLmNvbGxhcHNlKCdzaG93Jyk7XG5cdFx0fVxuXHR9XG59O1xuXG4vLyB3ZW5uIGJzX2ltcG9ydGllcmVuIGdla2xpY2t0IHdpcmRcbi8vIHRlc3Rlbiwgb2IgZGVyIEJyb3dzZXIgZGFzIEltcG9ydGllcmVuIHVudGVyc3TDvHR6dFxuLy8gd2VubiBuZWluLCBNZWxkdW5nIGJyaW5nZW4gKG1hY2h0IGRpZSBhdWZnZXJ1ZmVuZSBGdW5rdGlvbilcbndpbmRvdy5hZGIuaGFuZGxlQnNfSW1wb3J0aWVyZW5DbGljayA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmKHdpbmRvdy5hZGIuaXNGaWxlQVBJQXZhaWxhYmxlKCkpIHtcblx0XHR3aW5kb3cuYWRiLnplaWdlRm9ybXVsYXIoXCJpbXBvcnRpZXJlbl9ic1wiKTtcblx0XHQvLyBJc3QgZGVyIFVzZXIgbm9jaCBhbmdlbWVsZGV0PyBXZW5uIGphOiBBbm1lbGR1bmcgw7xiZXJzcHJpbmdlblxuXHRcdGlmICh3aW5kb3cuYWRiLnByw7xmZUFubWVsZHVuZyhcImJzXCIpKSB7XG5cdFx0XHQkKFwiI2ltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2NvbGxhcHNlXCIpLmNvbGxhcHNlKCdzaG93Jyk7XG5cdFx0fVxuXHR9XG59O1xuXG53aW5kb3cuYWRiLmhhbmRsZU1lbnVBZG1pbkNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0d2luZG93LmFkYi56ZWlnZUZvcm11bGFyKFwiYWRtaW5cIik7XG59O1xuXG53aW5kb3cuYWRiLmVyZ8OkbnplUGlsemVaaGdpcyA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdCQoXCIjYWRtaW5fcGlsemVfemhnaXNfZXJnw6RuemVuX3LDvGNrbWVsZHVuZ1wiKS5odG1sKFwiRGF0ZW4gd2VyZGVuIGFuYWx5c2llcnQuLi5cIik7XG5cdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0JGRiLnZpZXcoJ2FydGVuZGIvbWFjcm9teWNldGVzP2luY2x1ZGVfZG9jcz10cnVlJywge1xuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdHZhciBkc196aGdpcyA9IHt9LFxuXHRcdFx0XHRlcmfDpG56dCA9IDAsXG5cdFx0XHRcdGZlaGxlciA9IDAsXG5cdFx0XHRcdHpoZ2lzX3NjaG9uX2RhID0gMDtcblx0XHRcdGRzX3poZ2lzLk5hbWUgPSBcIlpIIEdJU1wiO1xuXHRcdFx0ZHNfemhnaXMuQmVzY2hyZWlidW5nID0gXCJHSVMtTGF5ZXIgdW5kIEJldHJhY2h0dW5nc2Rpc3RhbnplbiBmw7xyIGRhcyBBcnRlbmxpc3RlbnRvb2wsIEFydGVuZ3J1cHBlbiBmw7xyIEV2QUIsIGltIEthbnRvbiBaw7xyaWNoLiBFaWdlbnNjaGFmdGVuIGFsbGVyIEFydGVuXCI7XG5cdFx0XHRkc196aGdpcy5EYXRlbnN0YW5kID0gXCJkYXVlcm5kIG5hY2hnZWbDvGhydFwiO1xuXHRcdFx0ZHNfemhnaXMuTGluayA9IFwiaHR0cDovL3d3dy5uYXR1cnNjaHV0ei56aC5jaFwiO1xuICAgICAgICAgICAgZHNfemhnaXNbXCJpbXBvcnRpZXJ0IHZvblwiXSA9IFwiYWxleEBnYWJyaWVsLXNvZnR3YXJlLmNoXCI7XG5cdFx0XHRkc196aGdpcy5FaWdlbnNjaGFmdGVuID0ge307XG5cdFx0XHRkc196aGdpcy5FaWdlbnNjaGFmdGVuW1wiR0lTLUxheWVyXCJdID0gXCJQaWx6ZVwiO1xuXHRcdFx0Xy5lYWNoKGRhdGEucm93cywgZnVuY3Rpb24ocm93KSB7XG5cdFx0XHRcdHZhciBwaWx6ID0gcm93LmRvYyxcblx0XHRcdFx0XHR6aGdpc19pbl9kcztcblx0XHRcdFx0aWYgKCFwaWx6LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuKSB7XG5cdFx0XHRcdFx0cGlsei5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHpoZ2lzX2luX2RzID0gXy5maW5kKHBpbHouRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4sIGZ1bmN0aW9uKGRzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRzLk5hbWUgPT09IFwiWkggR0lTXCI7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvLyBudXIgZXJnw6RuemVuLCB3ZW5uIFpIIEdJUyBub2NoIG5pY2h0IGV4aXN0aWVydFxuXHRcdFx0XHRpZiAoIXpoZ2lzX2luX2RzKSB7XG5cdFx0XHRcdFx0cGlsei5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbi5wdXNoKGRzX3poZ2lzKTtcblx0XHRcdFx0XHRwaWx6LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuID0gXy5zb3J0QnkocGlsei5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiwgZnVuY3Rpb24oZHMpIHtcblx0XHRcdFx0XHRcdHJldHVybiBkcy5OYW1lO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdCRkYi5zYXZlRG9jKHBpbHosIHtcblx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRlcmfDpG56dCArKztcblx0XHRcdFx0XHRcdFx0JChcIiNhZG1pbl9waWx6ZV96aGdpc19lcmfDpG56ZW5fcsO8Y2ttZWxkdW5nXCIpLmh0bWwoXCJUb3RhbDogXCIgKyBkYXRhLnJvd3MubGVuZ3RoICsgXCIuIEVyZ8Okbnp0OiBcIiArIGVyZ8Okbnp0ICsgXCIsIEZlaGxlcjogXCIgKyBmZWhsZXIgKyBcIiwgJ1pIIEdJUycgc2Nob24gZW50aGFsdGVuOiBcIiArIHpoZ2lzX3NjaG9uX2RhKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdGZlaGxlciArKztcblx0XHRcdFx0XHRcdFx0JChcIiNhZG1pbl9waWx6ZV96aGdpc19lcmfDpG56ZW5fcsO8Y2ttZWxkdW5nXCIpLmh0bWwoXCJUb3RhbDogXCIgKyBkYXRhLnJvd3MubGVuZ3RoICsgXCIuIEVyZ8Okbnp0OiBcIiArIGVyZ8Okbnp0ICsgXCIsIEZlaGxlcjogXCIgKyBmZWhsZXIgKyBcIiwgJ1pIIEdJUycgc2Nob24gZW50aGFsdGVuOiBcIiArIHpoZ2lzX3NjaG9uX2RhKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR6aGdpc19zY2hvbl9kYSArKztcblx0XHRcdFx0XHQkKFwiI2FkbWluX3BpbHplX3poZ2lzX2VyZ8Okbnplbl9yw7xja21lbGR1bmdcIikuaHRtbChcIlRvdGFsOiBcIiArIGRhdGEucm93cy5sZW5ndGggKyBcIi4gRXJnw6RuenQ6IFwiICsgZXJnw6RuenQgKyBcIiwgRmVobGVyOiBcIiArIGZlaGxlciArIFwiLCAnWkggR0lTJyBzY2hvbiBlbnRoYWx0ZW46IFwiICsgemhnaXNfc2Nob25fZGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufTtcblxud2luZG93LmFkYi5rb3JyaWdpZXJlQXJ0d2VydG5hbWVJbkZsb3JhID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0JztcbiAgICAkKFwiI2FkbWluX2tvcnJpZ2llcmVfYXJ0d2VydG5hbWVfaW5fZmxvcmFfcsO8Y2ttZWxkdW5nXCIpLmh0bWwoXCJEYXRlbiB3ZXJkZW4gYW5hbHlzaWVydC4uLlwiKTtcbiAgICB2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG4gICAgJGRiLnZpZXcoJ2FydGVuZGIvZmxvcmE/aW5jbHVkZV9kb2NzPXRydWUnLCB7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBrb3JyaWdpZXJ0ID0gMCxcbiAgICAgICAgICAgICAgICBmZWhsZXIgPSAwLFxuICAgICAgICAgICAgICAgIHNhdmU7XG4gICAgICAgICAgICBfLmVhY2goZGF0YS5yb3dzLCBmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJ0ID0gcm93LmRvYyxcbiAgICAgICAgICAgICAgICAgICAgZHNfYXJ0d2VydCxcbiAgICAgICAgICAgICAgICAgICAgZGF0ZW4gPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAoYXJ0LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGRzX2FydHdlcnQgPSBfLmZpbmQoYXJ0LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuLCBmdW5jdGlvbihkcykge1xuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHMuTmFtZSA9PT0gXCJaSCBBcnR3ZXJ0ICgxOTk1KVwiO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoZHNfYXJ0d2VydCAmJiBkc19hcnR3ZXJ0LkVpZ2Vuc2NoYWZ0ZW4gJiYgZHNfYXJ0d2VydC5FaWdlbnNjaGFmdGVuW1wiQXJ0d2VydCBLVCBaSFwiXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHNfYXJ0d2VydCAmJiBkc19hcnR3ZXJ0LkVpZ2Vuc2NoYWZ0ZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvb3BlbiB1bmQgbmV1IGF1ZmJhdWVuLCBkYW1pdCBkaWUgUmVpaGVuZm9sZ2UgZGVyIGtleXMgZXJoYWx0ZW4gYmxlaWJ0IChob2ZmZW50bGljaClcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZWFjaChkc19hcnR3ZXJ0LkVpZ2Vuc2NoYWZ0ZW4sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcIkFydHdlcnQgS1QgWkhcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSBcIkFydHdlcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVuW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNhdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc19hcnR3ZXJ0LkVpZ2Vuc2NoYWZ0ZW4gPSBkYXRlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZGIuc2F2ZURvYyhhcnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrb3JyaWdpZXJ0ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNhZG1pbl9rb3JyaWdpZXJlX2FydHdlcnRuYW1lX2luX2Zsb3JhX3LDvGNrbWVsZHVuZ1wiKS5odG1sKFwiVG90YWw6IFwiICsgZGF0YS5yb3dzLmxlbmd0aCArIFwiLiBLb3JyaWdpZXJ0OiBcIiArIGtvcnJpZ2llcnQgKyBcIiwgRmVobGVyOiBcIiArIGZlaGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlaGxlciArKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjYWRtaW5fa29ycmlnaWVyZV9hcnR3ZXJ0bmFtZV9pbl9mbG9yYV9yw7xja21lbGR1bmdcIikuaHRtbChcIlRvdGFsOiBcIiArIGRhdGEucm93cy5sZW5ndGggKyBcIi4gS29ycmlnaWVydDogXCIgKyBrb3JyaWdpZXJ0ICsgXCIsIEZlaGxlcjogXCIgKyBmZWhsZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChrb3JyaWdpZXJ0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJChcIiNhZG1pbl9rb3JyaWdpZXJlX2FydHdlcnRuYW1lX2luX2Zsb3JhX3LDvGNrbWVsZHVuZ1wiKS5odG1sKFwiRXMgZ2lidCBvZmZlbmJhciBrZWluZSBGZWxkZXIgbWVociBtaXQgTmFtZW4gJ0FydHdlcnQgS1QgWkgnXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG53aW5kb3cuYWRiLmtvcnJpZ2llcmVEc05hbWVGbG9yYUNoUm90ZUxpc3RlMTk5MSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG4gICAgdmFyICRhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfY2hfcm90ZV9saXN0ZV8xOTkxX3LDvGNrbWVsZHVuZyA9ICQoXCIjYWRtaW5fa29ycmlnaWVyZV9kc19uYW1lX2NoX3JvdGVfbGlzdGVfMTk5MV9yw7xja21lbGR1bmdcIik7XG4gICAgJGFkbWluX2tvcnJpZ2llcmVfZHNfbmFtZV9jaF9yb3RlX2xpc3RlXzE5OTFfcsO8Y2ttZWxkdW5nLmh0bWwoXCJEYXRlbiB3ZXJkZW4gYW5hbHlzaWVydC4uLlwiKTtcbiAgICB2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG4gICAgJGRiLnZpZXcoJ2FydGVuZGIvZmxvcmE/aW5jbHVkZV9kb2NzPXRydWUnLCB7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBrb3JyaWdpZXJ0ID0gMCxcbiAgICAgICAgICAgICAgICBmZWhsZXIgPSAwLFxuICAgICAgICAgICAgICAgIHNhdmU7XG4gICAgICAgICAgICBfLmVhY2goZGF0YS5yb3dzLCBmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJ0ID0gcm93LmRvYyxcbiAgICAgICAgICAgICAgICAgICAgZHM7XG4gICAgICAgICAgICAgICAgaWYgKGFydC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbikge1xuICAgICAgICAgICAgICAgICAgICBkcyA9IF8uZmluZChhcnQuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4sIGZ1bmN0aW9uKGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHMuTmFtZSA9PT0gXCJDSCBSb3RlIExpc3RlICgxOTkxKVwiO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcy5OYW1lID0gXCJDSCBSb3RlIExpc3RlbiBGbG9yYSAoMTk5MSlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICRkYi5zYXZlRG9jKGFydCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrb3JyaWdpZXJ0ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYWRtaW5fa29ycmlnaWVyZV9kc19uYW1lX2NoX3JvdGVfbGlzdGVfMTk5MV9yw7xja21lbGR1bmcuaHRtbChcIkZsb3JhYXJ0ZW46IFwiICsgZGF0YS5yb3dzLmxlbmd0aCArIFwiLiBVbWJlbmFubnQ6IFwiICsga29ycmlnaWVydCArIFwiLCBGZWhsZXI6IFwiICsgZmVobGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVobGVyICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYWRtaW5fa29ycmlnaWVyZV9kc19uYW1lX2NoX3JvdGVfbGlzdGVfMTk5MV9yw7xja21lbGR1bmcuaHRtbChcIkZsb3JhYXJ0ZW46IFwiICsgZGF0YS5yb3dzLmxlbmd0aCArIFwiLiBVbWJlbmFubnQ6IFwiICsga29ycmlnaWVydCArIFwiLCBGZWhsZXI6IFwiICsgZmVobGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGtvcnJpZ2llcnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKFwiI2FkbWluX2tvcnJpZ2llcmVfYXJ0d2VydG5hbWVfaW5fZmxvcmFfcsO8Y2ttZWxkdW5nXCIpLmh0bWwoXCJFcyBnaWJ0IG9mZmVuYmFyIGtlaW5lIERhdGVuc2FtbWx1bmdlbiBtZWhyIG1pdCBOYW1lbiAnQ0ggUm90ZSBMaXN0ZSAoMTk5MSknXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG53aW5kb3cuYWRiLm5lbm5lRHNVbSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG4gICAgdmFyICRhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfY2hfcsO8Y2ttZWxkdW5nID0gJChcIiNhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfcsO8Y2ttZWxkdW5nXCIpLFxuICAgICAgICAkYWRtaW5fa29ycmlnaWVyZV9kc19uYW1lX25hbWVfdm9yaGVyID0gJChcIiNhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfbmFtZV92b3JoZXJcIiksXG4gICAgICAgICRhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfbmFtZV9uYWNoaGVyID0gJChcIiNhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfbmFtZV9uYWNoaGVyXCIpLFxuICAgICAgICBuYW1lX3ZvcmhlciA9ICRhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfbmFtZV92b3JoZXIudmFsKCksXG4gICAgICAgIG5hbWVfbmFjaGhlciA9ICRhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfbmFtZV9uYWNoaGVyLnZhbCgpO1xuICAgIGlmICghbmFtZV92b3JoZXIpIHtcbiAgICAgICAgJGFkbWluX2tvcnJpZ2llcmVfZHNfbmFtZV9jaF9yw7xja21lbGR1bmcuaHRtbChcIkJpdHRlIE5hbWUgdm9yaGVyIGVyZmFzc2VuXCIpO1xuICAgICAgICAkYWRtaW5fa29ycmlnaWVyZV9kc19uYW1lX25hbWVfdm9yaGVyLmZvY3VzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFuYW1lX25hY2hoZXIpIHtcbiAgICAgICAgJGFkbWluX2tvcnJpZ2llcmVfZHNfbmFtZV9jaF9yw7xja21lbGR1bmcuaHRtbChcIkJpdHRlIE5hbWUgbmFjaGhlciBlcmZhc3NlblwiKTtcbiAgICAgICAgJGFkbWluX2tvcnJpZ2llcmVfZHNfbmFtZV9uYW1lX25hY2hoZXIuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkYWRtaW5fa29ycmlnaWVyZV9kc19uYW1lX2NoX3LDvGNrbWVsZHVuZy5odG1sKFwiRGF0ZW4gd2VyZGVuIGFuYWx5c2llcnQuLi5cIik7XG4gICAgdmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuICAgICRkYi52aWV3KCdhcnRlbmRiL2RzX2JzX2d1aWQ/c3RhcnRrZXk9W1wiJyArIG5hbWVfdm9yaGVyICsgJ1wiXSZlbmRrZXk9W1wiJyArIG5hbWVfdm9yaGVyICsgJ1wiLHt9XSZpbmNsdWRlX2RvY3M9dHJ1ZScsIHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIGtvcnJpZ2llcnQgPSAwLFxuICAgICAgICAgICAgICAgIGZlaGxlciA9IDAsXG4gICAgICAgICAgICAgICAgc2F2ZTtcbiAgICAgICAgICAgIGlmIChkYXRhLnJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJGFkbWluX2tvcnJpZ2llcmVfZHNfbmFtZV9jaF9yw7xja21lbGR1bmcuaHRtbChcIkVzIGdpYnQga2VpbmUgRGF0ZW5zYW1tbHVuZyBuYW1lbnMgXCIgKyBuYW1lX3Zvcmhlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXy5lYWNoKGRhdGEucm93cywgZnVuY3Rpb24ocm93KSB7XG4gICAgICAgICAgICAgICAgdmFyIGFydCA9IHJvdy5kb2MsXG4gICAgICAgICAgICAgICAgICAgIGRzLFxuICAgICAgICAgICAgICAgICAgICBicyxcbiAgICAgICAgICAgICAgICAgICAgc2F2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIERhdGVuc2FtbWx1bmcgbWl0IGRpZXNlbSBOYW1lbiBzdWNoZW5cbiAgICAgICAgICAgICAgICBpZiAoYXJ0LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuICYmIGFydC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRzID0gXy5maW5kKGFydC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiwgZnVuY3Rpb24oZHNfKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHNfLk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHNfLk5hbWUgPT09IG5hbWVfdm9yaGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcy5OYW1lID0gbmFtZV9uYWNoaGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQmV6aWVodW5nc3NhbW1sdW5nIG1pdCBkaWVzZW0gTmFtZW4gc3VjaGVuXG4gICAgICAgICAgICAgICAgaWYgKGFydC5CZXppZWh1bmdzc2FtbWx1bmdlbiAmJiBhcnQuQmV6aWVodW5nc3NhbW1sdW5nZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBicyA9IF8uZmluZChhcnQuQmV6aWVodW5nc3NhbW1sdW5nZW4sIGZ1bmN0aW9uKGRzXykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRzXy5OYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRzXy5OYW1lID09PSBuYW1lX3ZvcmhlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChicykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnMuTmFtZSA9IG5hbWVfbmFjaGhlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIERhdGVuc2F0eiBzcGVpY2hlcm4sIHdlbm4gbsO2dGlnXG4gICAgICAgICAgICAgICAgaWYgKHNhdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGRiLnNhdmVEb2MoYXJ0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrb3JyaWdpZXJ0ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfY2hfcsO8Y2ttZWxkdW5nLmh0bWwoXCJBcnRlbiBtaXQgZGllc2VyIERhdGVuc2FtbWx1bmc6IFwiICsgZGF0YS5yb3dzLmxlbmd0aCArIFwiLiBVbWJlbmFubnQ6IFwiICsga29ycmlnaWVydCArIFwiLCBGZWhsZXI6IFwiICsgZmVobGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVobGVyICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhZG1pbl9rb3JyaWdpZXJlX2RzX25hbWVfY2hfcsO8Y2ttZWxkdW5nLmh0bWwoXCJBcnRlbiBtaXQgZGllc2VyIERhdGVuc2FtbWx1bmc6IFwiICsgZGF0YS5yb3dzLmxlbmd0aCArIFwiLiBVbWJlbmFubnQ6IFwiICsga29ycmlnaWVydCArIFwiLCBGZWhsZXI6IFwiICsgZmVobGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoa29ycmlnaWVydCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICQoXCIjYWRtaW5fa29ycmlnaWVyZV9hcnR3ZXJ0bmFtZV9pbl9mbG9yYV9yw7xja21lbGR1bmdcIikuaHRtbChcIkVzIGdpYnQgb2ZmZW5iYXIga2VpbmUgRGF0ZW5zYW1tbHVuZ2VuIG1laHIgbWl0IE5hbWVuICdcIiArIG5hbWVfdm9yaGVyICsgXCInXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG53aW5kb3cuYWRiLmJhdWVEc1p1RWlnZW5zY2hhZnRlblVtID0gZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciAkYWRtaW5fYmF1ZV9kc196dV9laWdlbnNjaGFmdGVuX3VtX3LDvGNrbWVsZHVuZyA9ICQoXCIjYWRtaW5fYmF1ZV9kc196dV9laWdlbnNjaGFmdGVuX3VtX3LDvGNrbWVsZHVuZ1wiKSxcbiAgICAgICAgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG4gICAgJGFkbWluX2JhdWVfZHNfenVfZWlnZW5zY2hhZnRlbl91bV9yw7xja21lbGR1bmcuaHRtbChcIkRhdGVuIHdlcmRlbiBhbmFseXNpZXJ0Li4uXCIpO1xuICAgICRkYi52aWV3KCdhcnRlbmRiL2FsbF9kb2NzP2luY2x1ZGVfZG9jcz10cnVlJywge1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICB2YXIga29ycmlnaWVydCA9IDAsXG4gICAgICAgICAgICAgICAgZmVobGVyID0gMCxcbiAgICAgICAgICAgICAgICBzYXZlO1xuICAgICAgICAgICAgaWYgKGRhdGEucm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkYWRtaW5fYmF1ZV9kc196dV9laWdlbnNjaGFmdGVuX3VtX3LDvGNrbWVsZHVuZy5odG1sKFwiS2VpbmUgRGF0ZW4gZXJoYWx0ZW5cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXy5lYWNoKGRhdGEucm93cywgZnVuY3Rpb24ocm93KSB7XG4gICAgICAgICAgICAgICAgdmFyIGFydCA9IHJvdy5kb2MsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVuc2FtbWx1bmdlbixcbiAgICAgICAgICAgICAgICAgICAgYmV6aWVodW5nc3NhbW1sdW5nZW4sXG4gICAgICAgICAgICAgICAgICAgIGRzX2RhdGVuLFxuICAgICAgICAgICAgICAgICAgICB0YXhfZGF0ZW4sXG4gICAgICAgICAgICAgICAgICAgIHNhdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBEYXRlbnNhbW1sdW5nZW4gdW1iZW5lbm5lblxuICAgICAgICAgICAgICAgIC8vIGRzIHVuZCBicyBlbnRmZXJuZW4sIGRhbmFjaCBpbiBkZXIgcmljaHRpZ2VuIFJlaWhlbmZvbGdlIGhpbnp1ZsO8Z2VuXG4gICAgICAgICAgICAgICAgLy8gZGFtaXQgZGllIFJlaWhlbmZvbGdlIGJld2FocnQgYmxlaWJ0XG4gICAgICAgICAgICAgICAgaWYgKGFydC5UYXhvbm9taWUgJiYgYXJ0LlRheG9ub21pZS5EYXRlbikge1xuICAgICAgICAgICAgICAgICAgICB0YXhfZGF0ZW4gPSBhcnQuVGF4b25vbWllLkRhdGVuO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXJ0LlRheG9ub21pZS5EYXRlbjtcbiAgICAgICAgICAgICAgICAgICAgYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuID0gdGF4X2RhdGVuO1xuICAgICAgICAgICAgICAgICAgICBzYXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFydC5EYXRlbnNhbW1sdW5nZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZW5zYW1tbHVuZ2VuID0gYXJ0LkRhdGVuc2FtbWx1bmdlbjtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGRhdGVuc2FtbWx1bmdlbiwgZnVuY3Rpb24oZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcy5EYXRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRzX2RhdGVuID0gZHMuRGF0ZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRzLkRhdGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRzLkVpZ2Vuc2NoYWZ0ZW4gPSBkc19kYXRlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhcnQuRGF0ZW5zYW1tbHVuZ2VuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJ0LkJlemllaHVuZ3NzYW1tbHVuZ2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXppZWh1bmdzc2FtbWx1bmdlbiA9IGFydC5CZXppZWh1bmdzc2FtbWx1bmdlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhcnQuQmV6aWVodW5nc3NhbW1sdW5nZW47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXppZWh1bmdzc2FtbWx1bmdlbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFydC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiA9IGRhdGVuc2FtbWx1bmdlbjtcbiAgICAgICAgICAgICAgICAgICAgYXJ0LkJlemllaHVuZ3NzYW1tbHVuZ2VuID0gYmV6aWVodW5nc3NhbW1sdW5nZW47XG4gICAgICAgICAgICAgICAgICAgIHNhdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2F2ZSkge1xuICAgICAgICAgICAgICAgICAgICAkZGIuc2F2ZURvYyhhcnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvcnJpZ2llcnQgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGFkbWluX2JhdWVfZHNfenVfZWlnZW5zY2hhZnRlbl91bV9yw7xja21lbGR1bmcuaHRtbChcIkFuemFobCBEb2t1bWVudGUgaW4gREI6IFwiICsgZGF0YS5yb3dzLmxlbmd0aCArIFwiLiBVbWJlbmFubnQ6IFwiICsga29ycmlnaWVydCArIFwiLCBGZWhsZXI6IFwiICsgZmVobGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVobGVyICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhZG1pbl9iYXVlX2RzX3p1X2VpZ2Vuc2NoYWZ0ZW5fdW1fcsO8Y2ttZWxkdW5nLmh0bWwoXCJBbnphaGwgRG9rdW1lbnRlIGluIERCOiBcIiArIGRhdGEucm93cy5sZW5ndGggKyBcIi4gVW1iZW5hbm50OiBcIiArIGtvcnJpZ2llcnQgKyBcIiwgRmVobGVyOiBcIiArIGZlaGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoa29ycmlnaWVydCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRhZG1pbl9iYXVlX2RzX3p1X2VpZ2Vuc2NoYWZ0ZW5fdW1fcsO8Y2ttZWxkdW5nLmh0bWwoXCJFcyBnaWJ0IG9mZmVuYmFyIGtlaW5lIERhdGVuc2FtbWx1bmdlbiBtZWhyLCBkaWUgdW1iZW5hbm50IHdlcmRlbiBtw7xzc2VuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vKndpbmRvdy5hZGIuYmF1ZURzWnVFaWdlbnNjaGFmdGVuVW0gPSBmdW5jdGlvbigpIHtcbiAndXNlIHN0cmljdCc7XG4gdmFyICRhZG1pbl9iYXVlX2RzX3p1X2VpZ2Vuc2NoYWZ0ZW5fdW1fcsO8Y2ttZWxkdW5nID0gJChcIiNhZG1pbl9iYXVlX2RzX3p1X2VpZ2Vuc2NoYWZ0ZW5fdW1fcsO8Y2ttZWxkdW5nXCIpLFxuICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuICRhZG1pbl9iYXVlX2RzX3p1X2VpZ2Vuc2NoYWZ0ZW5fdW1fcsO8Y2ttZWxkdW5nLmh0bWwoXCJEYXRlbiB3ZXJkZW4gYW5hbHlzaWVydC4uLlwiKTtcbiAvLyRkYi52aWV3KCdhcnRlbmRiL2FsbF9kb2NzP2luY2x1ZGVfZG9jcz10cnVlJywge1xuICRkYi52aWV3KCdhcnRlbmRiL2FsbF9kb2NzJywge1xuIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiB2YXIga29ycmlnaWVydCA9IDAsXG4gZmVobGVyID0gMCxcbiBzYXZlO1xuIGlmIChkYXRhLnJvd3MubGVuZ3RoID09PSAwKSB7XG4gJGFkbWluX2JhdWVfZHNfenVfZWlnZW5zY2hhZnRlbl91bV9yw7xja21lbGR1bmcuaHRtbChcIktlaW5lIERhdGVuIGVyaGFsdGVuXCIpO1xuIHJldHVybjtcbiB9XG4gXy5lYWNoKGRhdGEucm93cywgZnVuY3Rpb24ocm93KSB7XG4gJGRiLm9wZW5Eb2Mocm93LmtleSwge1xuIHN1Y2Nlc3M6IGZ1bmN0aW9uKGFydCkge1xuIHZhciBkYXRlbnNhbW1sdW5nZW4sXG4gYmV6aWVodW5nc3NhbW1sdW5nZW4sXG4gZHNfZGF0ZW4sXG4gdGF4X2RhdGVuLFxuIHNhdmUgPSBmYWxzZTtcbiAvLyBEYXRlbnNhbW1sdW5nZW4gdW1iZW5lbm5lblxuIC8vIGRzIHVuZCBicyBlbnRmZXJuZW4sIGRhbmFjaCBpbiBkZXIgcmljaHRpZ2VuIFJlaWhlbmZvbGdlIGhpbnp1ZsO8Z2VuXG4gLy8gZGFtaXQgZGllIFJlaWhlbmZvbGdlIGJld2FocnQgYmxlaWJ0XG4gaWYgKGFydC5UYXhvbm9taWUgJiYgYXJ0LlRheG9ub21pZS5EYXRlbikge1xuIHRheF9kYXRlbiA9IGFydC5UYXhvbm9taWUuRGF0ZW47XG4gZGVsZXRlIGFydC5UYXhvbm9taWUuRGF0ZW47XG4gYXJ0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuID0gdGF4X2RhdGVuO1xuIHNhdmUgPSB0cnVlO1xuIH1cbiBpZiAoYXJ0LkRhdGVuc2FtbWx1bmdlbikge1xuIGRhdGVuc2FtbWx1bmdlbiA9IGFydC5EYXRlbnNhbW1sdW5nZW47XG4gXy5lYWNoKGRhdGVuc2FtbWx1bmdlbiwgZnVuY3Rpb24oZHMpIHtcbiBpZiAoZHMuRGF0ZW4pIHtcbiBkc19kYXRlbiA9IGRzLkRhdGVuO1xuIGRlbGV0ZSBkcy5EYXRlbjtcbiBkcy5FaWdlbnNjaGFmdGVuID0gZHNfZGF0ZW47XG4gfVxuIH0pO1xuIGRlbGV0ZSBhcnQuRGF0ZW5zYW1tbHVuZ2VuO1xuIGlmIChhcnQuQmV6aWVodW5nc3NhbW1sdW5nZW4pIHtcbiBiZXppZWh1bmdzc2FtbWx1bmdlbiA9IGFydC5CZXppZWh1bmdzc2FtbWx1bmdlbjtcbiBkZWxldGUgYXJ0LkJlemllaHVuZ3NzYW1tbHVuZ2VuO1xuIH0gZWxzZSB7XG4gYmV6aWVodW5nc3NhbW1sdW5nZW4gPSB7fTtcbiB9XG4gYXJ0LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuID0gZGF0ZW5zYW1tbHVuZ2VuO1xuIGFydC5CZXppZWh1bmdzc2FtbWx1bmdlbiA9IGJlemllaHVuZ3NzYW1tbHVuZ2VuO1xuIHNhdmUgPSB0cnVlO1xuIH1cbiBpZiAoc2F2ZSkge1xuICRkYi5zYXZlRG9jKGFydCwge1xuIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuIGtvcnJpZ2llcnQgKys7XG4gJGFkbWluX2JhdWVfZHNfenVfZWlnZW5zY2hhZnRlbl91bV9yw7xja21lbGR1bmcuaHRtbChcIkFuemFobCBEb2t1bWVudGUgaW4gREI6IFwiICsgZGF0YS5yb3dzLmxlbmd0aCArIFwiLiBVbWJlbmFubnQ6IFwiICsga29ycmlnaWVydCArIFwiLCBGZWhsZXI6IFwiICsgZmVobGVyKTtcbiB9LFxuIGVycm9yOiBmdW5jdGlvbigpIHtcbiBmZWhsZXIgKys7XG4gJGFkbWluX2JhdWVfZHNfenVfZWlnZW5zY2hhZnRlbl91bV9yw7xja21lbGR1bmcuaHRtbChcIkFuemFobCBEb2t1bWVudGUgaW4gREI6IFwiICsgZGF0YS5yb3dzLmxlbmd0aCArIFwiLiBVbWJlbmFubnQ6IFwiICsga29ycmlnaWVydCArIFwiLCBGZWhsZXI6IFwiICsgZmVobGVyKTtcbiB9XG4gfSk7XG4gfVxuIH0sXG4gZXJyb3I6IGZ1bmN0aW9uKCkge1xuIGZlaGxlciArKztcbiAkYWRtaW5fYmF1ZV9kc196dV9laWdlbnNjaGFmdGVuX3VtX3LDvGNrbWVsZHVuZy5odG1sKFwiQW56YWhsIERva3VtZW50ZSBpbiBEQjogXCIgKyBkYXRhLnJvd3MubGVuZ3RoICsgXCIuIFVtYmVuYW5udDogXCIgKyBrb3JyaWdpZXJ0ICsgXCIsIEZlaGxlcjogXCIgKyBmZWhsZXIpO1xuIH1cbiB9KTtcblxuIH0pO1xuIGlmIChrb3JyaWdpZXJ0ID09PSAwKSB7XG4gJGFkbWluX2JhdWVfZHNfenVfZWlnZW5zY2hhZnRlbl91bV9yw7xja21lbGR1bmcuaHRtbChcIkVzIGdpYnQgb2ZmZW5iYXIga2VpbmUgRGF0ZW5zYW1tbHVuZ2VuIG1laHIsIGRpZSB1bWJlbmFubnQgd2VyZGVuIG3DvHNzZW5cIik7XG4gfVxuIH1cbiB9KTtcbiB9OyovXG5cbi8vIHdlbm4gaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5fY29sbGFwc2UgZ2XDtmZmbmV0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlSW1wb3J0aWVyZW5Ec0RzQmVzY2hyZWliZW5Db2xsYXBzZVNob3duID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8gbWl0Z2ViZW4sIHdvaGVyIGRpZSBBbmZyYWdlIGtvbW10LCB3ZWlsIGV2LiBhbmdlbWVsZGV0IHdlcmRlbiBtdXNzXG5cdHdpbmRvdy5hZGIuYmVyZWl0ZUltcG9ydGllcmVuX2RzX2Jlc2NocmVpYmVuVm9yKFwiZHNcIik7XG5cdCQoXCIjRHNJbXBvcnRpZXJ0Vm9uXCIpLnZhbChsb2NhbFN0b3JhZ2UuRW1haWwpO1xufTtcblxuLy8gd2VubiBpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9jb2xsYXBzZSBnZcO2ZmZuZXQgd2lyZFxud2luZG93LmFkYi5oYW5kbGVJbXBvcnRpZXJlbkJzRHNCZXNjaHJlaWJlbkNvbGxhcHNlU2hvd24gPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBtaXRnZWJlbiwgd29oZXIgZGllIEFuZnJhZ2Uga29tbXQsIHdlaWwgZXYuIGFuZ2VtZWxkZXQgd2VyZGVuIG11c3Ncblx0d2luZG93LmFkYi5iZXJlaXRlSW1wb3J0aWVyZW5fYnNfYmVzY2hyZWliZW5Wb3IoXCJic1wiKTtcblx0JChcIiNCc0ltcG9ydGllcnRWb25cIikudmFsKGxvY2FsU3RvcmFnZS5FbWFpbCk7XG59O1xuXG4vLyB3ZW5uIGltcG9ydGllcmVuX2RzX2RhdGVuX3VwbG9hZGVuX2NvbGxhcHNlIGdlw7ZmZm5ldCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZUltcG9ydGllcmVuRHNEYXRlblVwbG9hZGVuQ29sbGFwc2VTaG93biA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmICghd2luZG93LmFkYi5wcsO8ZmVBbm1lbGR1bmcoXCJkc1wiKSkge1xuXHRcdCQodGhpcykuY29sbGFwc2UoJ2hpZGUnKTtcblx0fSBlbHNlIHtcblx0XHQkKCcjRHNGaWxlJykuZmlsZXVwbG9hZCgpO1xuXHR9XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICQoXCIjaW1wb3J0aWVyZW5fZHNfZGF0ZW5fdXBsb2FkZW5fY29sbGFwc2VcIikub2Zmc2V0KCkudG9wXG4gICAgfSwgMjAwMCk7XG59O1xuXG4vLyB3ZW5uIGltcG9ydGllcmVuX2JzX2RhdGVuX3VwbG9hZGVuX2NvbGxhcHNlIGdlw7ZmZm5ldCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZUltcG9ydGllcmVuQnNEYXRlblVwbGFkZW5Db2xsYXBzZVNob3duID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKCF3aW5kb3cuYWRiLnByw7xmZUFubWVsZHVuZyhcImJzXCIpKSB7XG5cdFx0JCh0aGlzKS5jb2xsYXBzZSgnaGlkZScpO1xuXHR9IGVsc2Uge1xuXHRcdCQoJyNCc0ZpbGUnKS5maWxldXBsb2FkKCk7XG5cdH1cbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJChcIiNpbXBvcnRpZXJlbl9ic19kYXRlbl91cGxvYWRlbl9jb2xsYXBzZVwiKS5vZmZzZXQoKS50b3BcbiAgICB9LCAyMDAwKTtcbn07XG5cbi8vIHdlbm4gaW1wb3J0aWVyZW5fZHNfaWRzX2lkZW50aWZpemllcmVuX2NvbGxhcHNlIGdlw7ZmZm5ldCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZUltcG9ydGllcmVuRHNJZHNJZGVudGlmaXppZXJlbkNvbGxhcHNlU2hvd24gPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAoIXdpbmRvdy5hZGIucHLDvGZlQW5tZWxkdW5nKFwiZHNcIikpIHtcblx0XHQkKHRoaXMpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdH1cbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJChcIiNpbXBvcnRpZXJlbl9kc19pZHNfaWRlbnRpZml6aWVyZW5fY29sbGFwc2VcIikub2Zmc2V0KCkudG9wXG4gICAgfSwgMjAwMCk7XG59O1xuXG4vLyB3ZW5uIGltcG9ydGllcmVuX2JzX2lkc19pZGVudGlmaXppZXJlbl9jb2xsYXBzZSBnZcO2ZmZuZXQgd2lyZFxud2luZG93LmFkYi5oYW5kbGVJbXBvcnRpZXJlbkJzSWRzSWRlbnRpZml6aWVyZW5Db2xsYXBzZVNob3duID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKCF3aW5kb3cuYWRiLnByw7xmZUFubWVsZHVuZyhcImJzXCIpKSB7XG5cdFx0JCh0aGlzKS5jb2xsYXBzZSgnaGlkZScpO1xuXHR9XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICQoXCIjaW1wb3J0aWVyZW5fYnNfaWRzX2lkZW50aWZpemllcmVuX2NvbGxhcHNlXCIpLm9mZnNldCgpLnRvcFxuICAgIH0sIDIwMDApO1xufTtcblxuLy8gd2VubiBpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9jb2xsYXBzZSBnZcO2ZmZuZXQgd2lyZFxud2luZG93LmFkYi5oYW5kbGVJbXBvcnRpZXJlbkRzSW1wb3J0QXVzZsO8aHJlbkNvbGxhcHNlU2hvd24gPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAoIXdpbmRvdy5hZGIucHLDvGZlQW5tZWxkdW5nKFwiZHNcIikpIHtcblx0XHQkKHRoaXMpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdH1cbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJChcIiNpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9jb2xsYXBzZVwiKS5vZmZzZXQoKS50b3BcbiAgICB9LCAyMDAwKTtcbn07XG5cbi8vIHdlbm4gaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5fY29sbGFwc2UgZ2XDtmZmbmV0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlSW1wb3J0aWVyZW5Cc0ltcG9ydEF1c2bDvGhyZW5Db2xsYXBzZVNob3duID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKCF3aW5kb3cuYWRiLnByw7xmZUFubWVsZHVuZyhcImJzXCIpKSB7XG5cdFx0JCh0aGlzKS5jb2xsYXBzZSgnaGlkZScpO1xuXHR9XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICQoXCIjaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5fY29sbGFwc2VcIikub2Zmc2V0KCkudG9wXG4gICAgfSwgMjAwMCk7XG59O1xuXG4vLyB3ZW5uIERzV8OkaGxlbiBnZcOkbmRlcnQgd2lyZFxud2luZG93LmFkYi5oYW5kbGVEc1fDpGhsZW5DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgZHNfbmFtZSA9IHRoaXMudmFsdWUsXG5cdFx0d8OkaGxiYXIgPSBmYWxzZSxcbiAgICAgICAgJERzQW56RHMgPSAkKFwiI0RzQW56RHNcIiksXG4gICAgICAgICREc0FuekRzX2xhYmVsID0gJChcIiNEc0FuekRzX2xhYmVsXCIpLFxuICAgICAgICAkRHNOYW1lID0gJChcIiNEc05hbWVcIiksXG4gICAgICAgICRpbXBvcnRpZXJlbl9kc19kc19iZXNjaHJlaWJlbl9lcnJvciA9ICQoXCIjaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5fZXJyb3JcIik7XG4gICAgLy8gYWxsZsOkbGxpZ2VuIEFsZXJ0IHNjaGxpZXNzZW5cbiAgICAkaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5fZXJyb3JcbiAgICAgICAgLmFsZXJ0KClcbiAgICAgICAgLmhpZGUoKTtcbiAgICAvLyB3w6RobGJhciBzZXR6ZW5cbiAgICAvLyB3w6RobGVuIGthbm4gbWFuIG51ciwgd2FzIG1hbiBzZWxiZXIgaW1wb3J0aWVydCBoYXQgLSBvZGVyIGFkbWluIGlzdFxuICAgIGlmICgkKFwiI1wiK3RoaXMuaWQrXCIgb3B0aW9uOnNlbGVjdGVkXCIpLmF0dHIoXCJ3YWVobGJhclwiKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgd8OkaGxiYXIgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoQm9vbGVhbihsb2NhbFN0b3JhZ2UuYWRtaW4pKSB7XG4gICAgICAgIHfDpGhsYmFyID0gdHJ1ZTtcbiAgICB9XG5cdGlmICh3w6RobGJhcikge1xuXHRcdC8vIHp1ZXJzdCBhbGxlIEZlbGRlciBsZWVyZW5cblx0XHQkKCcjaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5fY29sbGFwc2UgdGV4dGFyZWEsICNpbXBvcnRpZXJlbl9kc19kc19iZXNjaHJlaWJlbl9jb2xsYXBzZSBpbnB1dCcpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHQkKHRoaXMpLnZhbCgnJyk7XG5cdFx0fSk7XG5cdFx0JERzQW56RHMuaHRtbChcIlwiKTtcblx0XHQkRHNBbnpEc19sYWJlbC5odG1sKFwiXCIpO1xuXHRcdGlmIChkc19uYW1lKSB7XG4gICAgICAgICAgICBfLmVhY2god2luZG93LmFkYi5kc192b25fb2JqZWt0ZW4ucm93cywgZnVuY3Rpb24oZHNfdm9uX29iamVrdGVuX3Jvdykge1xuICAgICAgICAgICAgICAgIGlmIChkc192b25fb2JqZWt0ZW5fcm93LmtleVsxXSA9PT0gZHNfbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAkRHNOYW1lLnZhbChkc19uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGRzX3Zvbl9vYmpla3Rlbl9yb3cua2V5WzRdLCBmdW5jdGlvbihmZWxkd2VydCwgZmVsZG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZWxkbmFtZSA9PT0gXCJVcnNwcnVuZ3NkYXRlbnNhbW1sdW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0RzVXJzcHJ1bmdzRHNcIikudmFsKGZlbGR3ZXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmVsZG5hbWUgIT09IFwiaW1wb3J0aWVydCB2b25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRHNcIiArIGZlbGRuYW1lKS52YWwoZmVsZHdlcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRzX3Zvbl9vYmpla3Rlbl9yb3cua2V5WzJdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0RzWnVzYW1tZW5mYXNzZW5kXCIpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZlbGQgZsO8ciBVcnNwcnVuZ3MtRFMgYW56ZWlnZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRHNVcnNwcnVuZ3NEc19kaXZcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2ljaGVyc3RlbGxlbiwgZGFzcyBkZXIgSGFrZW4gaW0gRmVsZCBlbnRmZXJudCB3aXJkLCB3ZW5uIG5hY2ggZGVyIHp1c2FtbWVuZmFzc2VuZGVuIGVpbmUgYW5kZXJlIERTIGdld8OkaGx0IHdpcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRHNadXNhbW1lbmZhc3NlbmRcIikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVuZCBGZWxkIGbDvHIgVXJzcHJ1bmdzLURTIHZlcnN0ZWNrZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjRHNVcnNwcnVuZ3NEc19kaXZcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlbm4gZGllIGRzL2JzIGtlaW4gXCJpbXBvcnRpZXJ0IHZvblwiIGhhdCBpc3QgZGVyIFdlcnQgbnVsbFxuICAgICAgICAgICAgICAgICAgICAvLyB2ZXJoaW5kZXJuLCBkYXNzIG51bGwgYW5nZXplaWd0IHdpcmRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRzX3Zvbl9vYmpla3Rlbl9yb3cua2V5WzNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI0RzSW1wb3J0aWVydFZvblwiKS52YWwoZHNfdm9uX29iamVrdGVuX3Jvdy5rZXlbM10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNEc0ltcG9ydGllcnRWb25cIikudmFsKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICREc0FuekRzX2xhYmVsLmh0bWwoXCJBbnphaGwgQXJ0ZW4vTGViZW5zcsOkdW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICAkRHNBbnpEcy5odG1sKGRzX3Zvbl9vYmpla3Rlbl9yb3cudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkYWbDvHIgc29yZ2VuLCBkYXNzIHRleHRhcmVhcyBnZW51ZyBncm9zcyBzaW5kXG4gICAgICAgICAgICAgICAgICAgICQoJyNpbXBvcnRpZXJlbl9kcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluZCgndGV4dGFyZWEnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkYi5maXRUZXh0YXJlYVRvQ29udGVudCh0aGlzLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkRHNOYW1lLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGzDtnNjaGVuLVNjaGFsdGZsw6RjaGUgZWluYmxlbmRlblxuICAgICAgICAgICAgICAgICQoXCIjRHNMb2VzY2hlblwiKS5zaG93KCk7XG4gICAgICAgICAgICB9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gbMO2c2NoZW4tU2NoYWx0ZmzDpGNoZSBhdXNibGVuZGVuXG5cdFx0XHQkKFwiI0RzTG9lc2NoZW5cIikuaGlkZSgpO1xuXHRcdH1cblx0fSBlbHNlIHtcbiAgICAgICAgLy8gbWVsZGVuLCBkYXNzIGRpZXNlIEJTIG5pY2h0IGJlYXJiZWl0ZXQgd2VyZGVuIGthbm5cbiAgICAgICAgJChcIiNpbXBvcnRpZXJlbl9kc19kc19iZXNjaHJlaWJlbl9lcnJvcl90ZXh0XCIpXG4gICAgICAgICAgICAuaHRtbChcIlNpZSBrw7ZubmVuIG51ciBEYXRlbnNhbW1sdW5nZW4gdmVyw6RuZGVybiwgZGllIFNpZSBzZWxiZXIgaW1wb3J0aWVydCBoYWJlbi48YnI+QXVzbmFobWU6IFp1c2FtbWVuZmFzc2VuZGUgRGF0ZW5zYW1tbHVuZ2VuLlwiKTtcbiAgICAgICAgJGltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2Vycm9yXG4gICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgLnNob3coKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI0RzV2FlaGxlblwiKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG5cdH1cbn07XG5cbi8vIHdlbm4gRHNOYW1lIGdlw6RuZGVydCB3aXJkXG4vLyBzdWNoZW4sIG9iIHNjaG9uIGVpbmUgRGF0ZW5zYW1tbHVuZyBtaXQgZGllc2VtIE5hbWVuIGV4aXN0aWVydFxuLy8gdW5kIHNpZSB2b24gamVtYW5kIGFuZGVyZW0gaW1wb3J0aWVydCB3dXJkZVxuLy8gdW5kIHNpZSBuaWNodCB6dXNhbW1lbmZhc3NlbmQgaXN0XG53aW5kb3cuYWRiLmhhbmRsZURzTmFtZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciB0aGF0ID0gdGhpcyxcblx0XHRkc19rZXkgPSBfLmZpbmQod2luZG93LmFkYi5kc19uYW1lbl9laW5kZXV0aWcsIGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0cmV0dXJuIGtleVswXSA9PT0gdGhhdC52YWx1ZSAmJiBrZXlbMl0gIT09IGxvY2FsU3RvcmFnZS5FbWFpbCAmJiAha2V5WzFdO1xuXHRcdH0pLFxuICAgICAgICAkaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5faGlud2VpczIgPSAkKFwiI2ltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyXCIpO1xuXHRpZiAoZHNfa2V5KSB7XG5cdFx0JGltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMyXG4gICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgLnNob3coKVxuXHRcdCAgICAuaHRtbCgnRXMgZXhpc3RpZXJ0IHNjaG9uIGVpbmUgZ2xlaWNoIGhlaXNzZW5kZSB1bmQgbmljaHQgenVzYW1tZW5mYXNzZW5kZSBEYXRlbnNhbW1sdW5nLjxicj5TaWUgd3VyZGUgdm9uIGplbWFuZCBhbmRlcmVtIGltcG9ydGllcnQuIERhaGVyIG3DvHNzZW4gU2llIGVpbmVuIGFuZGVyZW4gTmFtZW4gdmVyd2VuZGVuLicpO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHQkaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5faGlud2VpczJcbiAgICAgICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgICAgIC5oaWRlKCk7XG5cdFx0fSwgMzAwMDApO1xuXHRcdCQoXCIjRHNOYW1lXCIpXG4gICAgICAgICAgICAudmFsKFwiXCIpXG5cdFx0ICAgIC5mb2N1cygpO1xuXHR9IGVsc2Uge1xuXHRcdCRpbXBvcnRpZXJlbl9kc19kc19iZXNjaHJlaWJlbl9oaW53ZWlzMlxuICAgICAgICAgICAgLmFsZXJ0KClcbiAgICAgICAgICAgIC5oaWRlKCk7XG5cdH1cbn07XG5cbi8vIHdlbm4gRHNMw7ZzY2hlbiBnZWtsaWNrdCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZURzTMO2c2NoZW5DbGljayA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdC8vIFLDvGNrbWVsZHVuZyBhbnplaWdlblxuICAgICQoXCIjaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5faGlud2Vpc1wiKVxuICAgICAgICAuYWxlcnQoKVxuICAgICAgICAuc2hvdygpXG5cdCAgICAuaHRtbChcIkJpdHRlIHdhcnRlbjogRGllIERhdGVuc2FtbWx1bmcgd2lyZCBlbnRmZXJudC4uLlwiKTtcbiAgICB3aW5kb3cuYWRiLmVudGZlcm5lRGF0ZW5zYW1tbHVuZ0F1c0FsbGVuT2JqZWt0ZW4oJChcIiNEc05hbWVcIikudmFsKCkpO1xufTtcblxuLy8gd2VubiBCc0xvZXNjaGVuIGdla2xpY2t0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlQnNMw7ZzY2hlbkNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8gUsO8Y2ttZWxkdW5nIGFuemVpZ2VuXG5cdCQoXCIjaW1wb3J0aWVyZW5fYnNfZHNfYmVzY2hyZWliZW5faGlud2Vpc1wiKVxuICAgICAgICAuYWxlcnQoKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1zdWNjZXNzXCIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKVxuICAgICAgICAuYWRkQ2xhc3MoXCJhbGVydC1pbmZvXCIpXG4gICAgICAgIC5zaG93KCk7XG4gICAgJChcIiNpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzX3RleHRcIikuaHRtbChcIkJpdHRlIHdhcnRlbjogRGllIEJlemllaHVuZ3NzYW1tbHVuZyB3aXJkIGVudGZlcm50Li4uXCIpO1xuICAgIHdpbmRvdy5hZGIuZW50ZmVybmVCZXppZWh1bmdzc2FtbWx1bmdBdXNBbGxlbk9iamVrdGVuKCQoXCIjQnNOYW1lXCIpLnZhbCgpKTtcbn07XG5cbi8vIHdlbm4gZXhwb3J0aWVyZW4gZ2VrbGlja3Qgd2lyZFxud2luZG93LmFkYi5oYW5kbGVFeHBvcnRpZXJlbkNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0d2luZG93LmFkYi56ZWlnZUZvcm11bGFyKFwiZXhwb3J0XCIpO1xuXHRkZWxldGUgd2luZG93LmFkYi5leHBvcnRpZXJlbl9vYmpla3RlO1xufTtcblxuLy8gd2VubiBleHBvcnRpZXJlbl9hbHQgZ2VrbGlja3Qgd2lyZFxud2luZG93LmFkYi5oYW5kbGVFeHBvcnRpZXJlbkFsdENsaWNrID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0d2luZG93Lm9wZW4oXCJfbGlzdC9leHBvcnRfYWx0X21pdF9zeW5vbnltZW5fc3RhbmRhcmRmZWxkZXIvYWxsX2RvY3NfbWl0X3N5bm9ueW1lbl9mdWVyX2FsdD9pbmNsdWRlX2RvY3M9dHJ1ZVwiKTtcbn07XG5cbi8vIHdlbm4gLmZlbGRfd2FlaGxlbiBnZcOkbmRlcnQgd2lyZFxuLy8ga29udHJvbGxpZXJlbiwgb2IgbWVociBhbHMgZWluZSBCZXppZWh1bmdzc2FtbWx1bmcgYW5nZXplaWd0IHdpcmRcbi8vIHVuZCBwcm8gQmV6aWVodW5nIGVpbmUgWmVpbGUgYXVzZ2VnZWJlbiB3aXJkLiBcbi8vIFdlbm4gamE6IHJla2xhbWllcmVuIHVuZCByw7xja2fDpG5naWcgbWFjaGVuXG53aW5kb3cuYWRiLmhhbmRsZUZlbGRXw6RobGVuQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKCQoXCIjZXhwb3J0X2Jlel9pbl96ZWlsZW5cIikucHJvcCgnY2hlY2tlZCcpKSB7XG5cdFx0dmFyIGJlel9kc19jaGVja2VkID0gW10sXG5cdFx0XHR0aGF0ID0gdGhpcztcblx0XHQkKFwiI2V4cG9ydGllcmVuX2ZlbGRlcl93YWVobGVuX2ZlbGRlcmxpc3RlXCIpXG4gICAgICAgICAgICAuZmluZChcIi5mZWxkX3dhZWhsZW5cIilcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSAmJiAkKHRoaXMpLmF0dHIoJ2RzdHlwJykgPT09IFwiQmV6aWVodW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYmV6X2RzX2NoZWNrZWQucHVzaCgkKHRoaXMpLmF0dHIoJ2RhdGVuc2FtbWx1bmcnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cdFx0Ly8gZWluZGV1dGlnZSBMaXN0ZSBkZXIgZHNUeXBlbiBlcnN0ZWxsZW5cblx0XHRiZXpfZHNfY2hlY2tlZCA9IF8udW5pb24oYmV6X2RzX2NoZWNrZWQpO1xuXHRcdGlmIChiZXpfZHNfY2hlY2tlZCAmJiBiZXpfZHNfY2hlY2tlZC5sZW5ndGggPiAxKSB7XG5cdFx0XHQkKCcjbWVsZHVuZ196dXZpZWxlX2JzJykubW9kYWwoKTtcblx0XHRcdCQodGhhdCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LmFkYi5leHBvcnRadXLDvGNrc2V0emVuKCk7XG5cdFx0fVxuXHR9XG59O1xuXG4vLyB3ZW5uIC5mZWxkX3dhZWhsZW5fYWxsZV92b25fZHMgZ2XDpG5kZXJ0IHdpcmRcbi8vIHdlbm4gY2hlY2tlZDogYWxsZSB1bmNoZWNrZW4sIHNvbnN0IGFsbGUgY2hlY2tlblxud2luZG93LmFkYi5oYW5kbGVGZWxkV8OkaGxlbkFsbGVWb25EcyA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBkcyA9ICQodGhpcykuYXR0cignZGF0ZW5zYW1tbHVuZycpLFxuXHRcdHN0YXR1cyA9IGZhbHNlO1xuXHRpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRzdGF0dXMgPSB0cnVlO1xuXHR9XG5cdCQoJ1tkYXRlbnNhbW1sdW5nPVwiJyArIGRzICsgJ1wiXScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGlzKS5wcm9wKCdjaGVja2VkJywgc3RhdHVzKTtcblx0fSk7XG59O1xuXG4vLyB3ZW5uIGV4cG9ydGllcmVuX2RzX29iamVrdGVfd2FlaGxlbl9ncnVwcGUgZ2XDpG5kZXJ0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlRXhwb3J0aWVyZW5Ec09iamVrdGVXw6RobGVuR3J1cHBlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0d2luZG93LmFkYi5lcnN0ZWxsZUxpc3RlRsO8ckZlbGR3YWhsKCk7XG59O1xuXG4vLyB3ZW5uIGV4cG9ydF9mZWxkX2ZpbHRlcm4gZ2XDpG5kZXJ0IHdpcmRcbi8vIGtvbnRyb2xsaWVyZW4sIG9iIG1laHIgYWxzIGVpbmUgQmV6aWVodW5nc3NhbW1sdW5nIEZpbHRlciBlbnRow6RsdC4gV2VubiBqYTogcmVrbGFtaWVyZW4gdW5kIHLDvGNrZ8OkbmdpZyBtYWNoZW5cbndpbmRvdy5hZGIuaGFuZGxlRXhwb3J0RmVsZEZpbHRlcm5DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgLy8gZGllIENoZWNrYm94ZW4gc29sbGVuIGRyZWkgV2VydGUgYW5uZWhtZW4ga8O2bm5lbjpcbiAgICBpZiAodGhpcy50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIC8vIHNvIGlzdCBlcyB6dSBCZWdpbm5cbiAgICAgICAgICAgIC8vIGRhbm4gc29sbCBlciBhdWYgY2hlZGtlZCB3ZWNoc2VsblxuICAgICAgICAgICAgdGhpcy5yZWFkT25seSA9IHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgJHRoaXMucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKCEkdGhpcy5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZE9ubHkgPSB0aGlzLmluZGV0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICR0aGlzLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGhpcy5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gdGhpcy5yZWFkT25seSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cblx0dmFyIGJlel9kc19maWx0ZXJlZCA9IFtdO1xuXHQkKFwiI2V4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9kc19jb2xsYXBzZVwiKVxuICAgICAgICAuZmluZChcIi5leHBvcnRfZmVsZF9maWx0ZXJuXCIpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCh0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUgPT09IDApICYmICQodGhpcykuYXR0cignZHN0eXAnKSA9PT0gXCJCZXppZWh1bmdcIikge1xuICAgICAgICAgICAgICAgIGJlel9kc19maWx0ZXJlZC5wdXNoKCQodGhpcykuYXR0cignZWlnZW5zY2hhZnQnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXHQvLyBlaW5kZXV0aWdlIExpc3RlIGRlciBkc1R5cGVuIGVyc3RlbGxlblxuXHRiZXpfZHNfZmlsdGVyZWQgPSBfLnVuaW9uKGJlel9kc19maWx0ZXJlZCk7XG5cdGlmIChiZXpfZHNfZmlsdGVyZWQgJiYgYmV6X2RzX2ZpbHRlcmVkLmxlbmd0aCA+IDEpIHtcblx0XHQkKCcjbWVsZHVuZ196dXZpZWxlX2JzJykubW9kYWwoKTtcblx0XHQkKHRoaXMpLnZhbChcIlwiKTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuYWRiLmV4cG9ydFp1csO8Y2tzZXR6ZW4oKTtcblx0fVxufTtcblxuLy8gd2VubiBleHBvcnRpZXJlbl9leHBvcnRpZXJlbiBhbmdlemVpZ3Qgd2lyZFxuLy8genVyIFNjaGFsdGZsw6RjaGUgVm9yc2NoYXUgc2Nyb2xsZW5cbndpbmRvdy5hZGIuaGFuZGxlRXhwb3J0aWVyZW5FeHBvcnRpZXJlblNob3cgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIC8vIEZlaGxlcm1lbGR1bmcgdmVyc3RlY2tlbiwgZmFsbHMgc2llIG5vY2ggb2ZmZW4gd2FyXG4gICAgJChcIiNleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9lcnJvcl90ZXh0XCIpXG4gICAgICAgIC5hbGVydCgpXG4gICAgICAgIC5oaWRlKCk7XG5cdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRzY3JvbGxUb3A6ICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fdGFiZWxsZV9hdWZiYXVlblwiKS5vZmZzZXQoKS50b3Bcblx0fSwgMjAwMCk7XG59O1xuXG4vLyB3ZW5uIC5idG4ubHJfYmVhcmJfYmVhcmIgZ2VrbGlja3Qgd2lyZFxud2luZG93LmFkYi5oYW5kbGVCdG5MckJlYXJiQmVhcmJLbGljayA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmICghJCh0aGlzKS5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xuXHRcdHdpbmRvdy5hZGIuYmVhcmJlaXRlTHJUYXhvbm9taWUoKTtcblx0fVxufTtcblxuLy8gd2VubiAuYnRuLmxyX2JlYXJiX3NjaHVldHplbiBnZWtsaWNrdCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZUJ0bkxyQmVhcmJTY2jDvHR6ZW5DbGljayA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmICghJCh0aGlzKS5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xuXHRcdHdpbmRvdy5hZGIuc2Now7x0emVMclRheG9ub21pZSgpO1xuXHRcdC8vIEVpbnN0ZWxsdW5nIG1lcmtlbiwgZGFtaXQgYXVjaCBuYWNoIERhdGVuc2F0endlY2hzZWwgZGllIEJlYXJiZWl0YmFya2VpdCBibGVpYnRcblx0XHRkZWxldGUgbG9jYWxTdG9yYWdlLmxyX2JlYXJiO1xuXHR9XG59O1xuXG4vLyB3ZW5uIC5idG4ubHJfYmVhcmJfbmV1IGdla2xpY2t0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlQnRuTHJCZWFyYk5ldUNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XG5cdFx0d2luZG93LmFkYi5pbml0aWllcmVMclBhcmVudEF1c3dhaGxsaXN0ZSgkKFwiI1RheG9ub21pZVwiKS52YWwoKSk7XG5cdH1cbn07XG5cbi8vIHdlbm4gI2xyX3BhcmVudF93YWVobGVuX29wdGlvbmVuIFtuYW1lPVwicGFyZW50X29wdGlvbmVuXCJdIGdlw6RuZGVydCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZUxyUGFyZW50T3B0aW9uZW5DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBwcsO8ZmVuLCBvYiBvYmVyc3RlciBOb2RlIGdld8OkaGx0IHd1cmRlXG5cdHZhciBwYXJlbnRfbmFtZSA9ICQodGhpcykudmFsKCksXG5cdFx0cGFyZW50X2lkID0gdGhpcy5pZCxcblx0XHRwYXJlbnQgPSB7fSxcblx0XHRvYmplY3QgPSB7fSxcblx0XHRlcnN0ZWxsZUJhdW0gPSByZXF1aXJlKCcuL21vZHVsZXMvZXJzdGVsbGVCYXVtJyk7XG5cdC8vIHp1ZXJzdCBlaW5lIGlkIGhvbGVuXG5cdG9iamVjdC5faWQgPSAkLmNvdWNoLm5ld1VVSUQoMSk7XG5cdG9iamVjdC5HcnVwcGUgPSBcIkxlYmVuc3LDpHVtZVwiO1xuXHRvYmplY3QuVHlwID0gXCJPYmpla3RcIjtcblx0b2JqZWN0LlRheG9ub21pZSA9IHt9O1xuXHRvYmplY3QuVGF4b25vbWllLk5hbWUgPSBcIm5ldWUgVGF4b25vbWllXCI7XHQvLyB3ZW5uIG5pY2h0IFd1cnplbCwgc2V0emVuLiBQYXNzaWVydCBpbiBha3R1YWxpc2llcmVIaWVyYXJjaGllRWluZXNOZXVlbkxyXG5cdG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbiA9IHt9O1xuXHRvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uVGF4b25vbWllID0gXCJuZXVlIFRheG9ub21pZVwiO1x0Ly8gd2VubiBuaWNodCBXdXJ6ZWwsIHNldHplbi4gUGFzc2llcnQgaW4gYWt0dWFsaXNpZXJlSGllcmFyY2hpZUVpbmVzTmV1ZW5MclxuXHQvLyB3ZW5uIGtlaW5lIFd1cnplbDogTGFiZWwgYW56ZWlnZW5cblx0aWYgKHBhcmVudF9pZCAhPT0gXCIwXCIpIHtcblx0XHRvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uTGFiZWwgPSBcIlwiO1xuXHR9XG5cdG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5FaW5oZWl0ID0gXCJ1bmJlc2NocmllYmVuZXIgTGViZW5zcmF1bVwiO1xuXHRpZiAocGFyZW50X2lkID09PSBcIjBcIikge1xuXHRcdG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5FaW5oZWl0ID0gXCJuZXVlIFRheG9ub21pZVwiO1xuXHR9XG5cdC8qRWluaGVpdC1OciBGTlMgd2lyZCBuaWNodCBtZWhyIGJlbsO2dGlndCwgYnp3LiB1bmFiaMOkbmdpZyBmw7xocmVuXG5cdG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbltcIkVpbmhlaXQtTnIgRk5TXCJdID0gXCJcIjtcblx0aWYgKHBhcmVudF9pZCA9PT0gXCIwXCIpIHtcblx0XHRvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5bXCJFaW5oZWl0LU5ybiBGTlMgdm9uXCJdID0gXCJcIjtcblx0XHRvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5bXCJFaW5oZWl0LU5ybiBGTlMgYmlzXCJdID0gXCJcIjtcblx0fSovXG5cdG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5CZXNjaHJlaWJ1bmcgPSBcIlwiO1xuXHRvYmplY3QuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4gPSBbXTtcblx0b2JqZWN0LkJlemllaHVuZ3NzYW1tbHVuZ2VuID0gW107XG5cdC8vIGpldHp0IGRlbiBwYXJlbnQgZXJzdGVsbGVuXG5cdC8vIGdlaHQgbmljaHQgdm9yaGVyLCB3ZWlsIGRpZSBpZCBiZWthbm50IHNlaW4gbXVzc1xuXHRpZiAocGFyZW50X2lkID09PSBcIjBcIikge1xuXHRcdC8vIGRhcyBpc3QgZGllIFd1cnplbCBkZXIgVGF4b25vbWllXG5cdFx0cGFyZW50Lk5hbWUgPSBcIm5ldWUgVGF4b25vbWllXCI7XG5cdFx0cGFyZW50LkdVSUQgPSBvYmplY3QuX2lkO1xuXHRcdC8vIGJlaSBkZXIgV3VyemVsIGlzdCBIaWVyYXJjaGllIGdsZWljaCBwYXJlbnRcblx0XHRvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uSGllcmFyY2hpZSA9IFtdO1xuXHRcdG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5IaWVyYXJjaGllLnB1c2gocGFyZW50KTtcblx0fSBlbHNlIHtcblx0XHRwYXJlbnQuTmFtZSA9IHBhcmVudF9uYW1lO1xuXHRcdHBhcmVudC5HVUlEID0gcGFyZW50X2lkO1xuXHR9XG5cdG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5QYXJlbnQgPSBwYXJlbnQ7XG5cdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0JGRiLnNhdmVEb2Mob2JqZWN0LCB7XG5cdFx0c3VjY2VzczogZnVuY3Rpb24ob2JqZWN0X3NhdmVkKSB7XG5cdFx0XHRvYmplY3QuX3JldiA9IG9iamVjdF9zYXZlZC5yZXY7XG5cdFx0XHRpZiAocGFyZW50X2lkICE9PSBcIjBcIikge1xuXHRcdFx0XHQvLyBkaWUgSGllcmFyY2hpZSBhdWZiYXVlbiB1bmQgc2V0emVuXG5cdFx0XHRcdC8vIGJlaSBkZXIgV3VyemVsIGlzdCBzaWUgc2Nob24gZ2VzZXR6dFxuXHRcdFx0XHR3aW5kb3cuYWRiLmFrdHVhbGlzaWVyZUhpZXJhcmNoaWVFaW5lc05ldWVuTHIobnVsbCwgb2JqZWN0LCB0cnVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQud2hlbihlcnN0ZWxsZUJhdW0oJCkpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0d2luZG93LmFkYi7DtmZmbmVCYXVtWnVJZChvYmplY3QuX2lkKTtcblx0XHRcdFx0XHQkKCcjbHJfcGFyZW50X3dhZWhsZW4nKS5tb2RhbCgnaGlkZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufTtcblxuLy8gd2VubiBydWVja2ZyYWdlX2xyX2xvZXNjaGVuX2phIGdla2xpY2t0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlUsO8Y2tmcmFnZUxyTMO2c2NoZW5KYUNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8genVlcnN0IGRpZSBpZCBkZXMgT2JqZWt0cyBob2xlblxuXHR2YXIgdXJpID0gbmV3IFVyaSgkKGxvY2F0aW9uKS5hdHRyKCdocmVmJykpLFxuXHRcdGlkID0gdXJpLmdldFF1ZXJ5UGFyYW1WYWx1ZSgnaWQnKSxcblx0XHRoYXNoID0gdXJpLmFuY2hvcigpO1xuXHQvLyB3ZW5uIGJyb3dzZXIgaGlzdG9yeSBuaWNodCB1bnRlcnN0w7x0enQsIGVyc3RlbGx0IGhpc3RvcnkuanMgZWluZSBoYXNoXG5cdC8vIGRhbm4gbXVzcyBkaWUgaWQgZHVyY2ggZGllIGlkIGluIGRlciBoYXNoIGVyc2V0enQgd2VyZGVuXG5cdGlmIChoYXNoKSB7XG5cdFx0dmFyIHVyaTIgPSBuZXcgVXJpKGhhc2gpO1xuXHRcdGlkID0gdXJpMi5nZXRRdWVyeVBhcmFtVmFsdWUoJ2lkJyk7XG5cdH1cblx0Ly8gT2JqZWt0IHNlbGJzdCBpbmtsLiBhbGxlciBoaWVyYXJjaGlzY2ggZGFydW50ZXIgbGllZ2VuZGUgT2JqZWt0ZSBlcm1pdHRlbG4gdW5kIGzDtnNjaGVuXG5cdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0JGRiLnZpZXcoJ2FydGVuZGIvaGllcmFyY2hpZT9rZXk9XCInICsgaWQgKyAnXCImaW5jbHVkZV9kb2NzPXRydWUnLCB7XG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0Ly8gZGFyYXVzIGVpbmVuIEFycmF5IHZvbiBkb2NzIG1hY2hlblxuXHRcdFx0dmFyIGRvY19hcnJheSA9IF8ubWFwKGRhdGEucm93cywgZnVuY3Rpb24ocm93KSB7XG5cdFx0XHRcdHJldHVybiByb3cuZG9jO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyB1bmQgZGllc2UgRG9rdW1lbnRlIG51biBsw7ZzY2hlblxuXHRcdFx0d2luZG93LmFkYi5sw7ZzY2hlTWFzc2VuTWl0T2JqZWt0QXJyYXkoZG9jX2FycmF5KTtcblx0XHRcdC8vIHZvcmlnZW4gbm9kZSBlcm1pdHRlbG5cblx0XHRcdHZhciB2b3JpZ2VyX25vZGUgPSAkLmpzdHJlZS5fcmVmZXJlbmNlKFwiI1wiICsgaWQpLl9nZXRfcHJldihcIiNcIiArIGlkKTtcblx0XHRcdC8vIG5vZGUgZGVzIGdlbMO2c2NodGVuIExSIGVudGZlcm5lblxuXHRcdFx0JC5qc3RyZWUuX3JlZmVyZW5jZShcIiNcIiArIGlkKS5kZWxldGVfbm9kZShcIiNcIiArIGlkKTtcblx0XHRcdC8vIHZvcmlnZW4gbm9kZSDDtmZmbmVuXG5cdFx0XHRpZiAodm9yaWdlcl9ub2RlKSB7XG5cdFx0XHRcdCQuanN0cmVlLl9yZWZlcmVuY2Uodm9yaWdlcl9ub2RlKS5zZWxlY3Rfbm9kZSh2b3JpZ2VyX25vZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93LmFkYi7DtmZmbmVHcnVwcGUoXCJMZWJlbnNyw6R1bWVcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn07XG5cbi8vIFdlbm4gI2FydCAuTGViZW5zcsOkdW1lLlRheG9ub21pZSAuY29udHJvbHMgZ2XDpG5kZXJ0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlTHJUYXhvbm9taWVDb250cm9sc0NoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHdpbmRvdy5hZGIuc3BlaWNoZXJuKCQodGhpcykudmFsKCksIHRoaXMuaWQsICQodGhpcykuYXR0cignZHNOYW1lJyksICQodGhpcykuYXR0cignZHNUeXAnKSk7XG59O1xuXG4vLyB3ZW5uIC5MZWJlbnNyw6R1bWUuVGF4b25vbWllIGdlw7ZmZm5ldCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZVBhbmVsYm9keUxyVGF4b25vbWllU2hvd24gPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAobG9jYWxTdG9yYWdlLmxyX2JlYXJiID09IFwidHJ1ZVwiKSB7XG5cdFx0d2luZG93LmFkYi5iZWFyYmVpdGVMclRheG9ub21pZSgpO1xuXHR9XG59O1xuXG4vLyB3ZW5uICNleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9jb2xsYXBzZSBnZcO2ZmZuZXQgd2lyZFxud2luZG93LmFkYi5oYW5kbGVFeHBvcnRpZXJlbkV4cG9ydGllcmVuQ29sbGFwc2VTaG93biA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuXHQvLyBudXIgYXVzZsO8aHJlbiwgd2VubiBleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9jb2xsYXBzZSBvZmZlbiBpc3Rcblx0Ly8ga29taXNjaGVyd2Vpc2Ugd3VyZGUgZGllc2VyIENvZGUgaW1tZXIgYXVzZ2Vsw7ZzdCwgd2VubiBiZWkgTGViZW5zcsOkdW1lbiBGNSBnZWRyw7xja3Qgd3VyZGUhXG5cdGlmICgkKFwiI2V4cG9ydGllcmVuX2V4cG9ydGllcmVuX2NvbGxhcHNlXCIpLmlzKFwiOnZpc2libGVcIikpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5hZGIuaGFuZGxlRXhwb3J0aWVyZW5PYmpla3RlV8OkaGxlbkNvbGxhcHNlU2hvd24odGhhdCkpIHtcbiAgICAgICAgICAgIC8vIEdydXBwZSBpc3QgZ2V3w6RobHQsIHdlaXRlcm1hY2hlblxuICAgICAgICAgICAgLy8gVGFiZWxsZSB1bmQgSGVydW50ZXJsYWRlbi1TY2hhbHRmbMOkY2hlIGF1c2JsZW5kZW5cbiAgICAgICAgICAgICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fdGFiZWxsZVwiKS5oaWRlKCk7XG4gICAgICAgICAgICAkKFwiLmV4cG9ydGllcmVuX2V4cG9ydGllcmVuX2V4cG9ydGllcmVuXCIpLmhpZGUoKTtcbiAgICAgICAgICAgIC8vIGZpbHRlcnQgdW5kIGJhdXQgZGFuYWNoIGRpZSBWb3JzY2hhdXRhYmVsbGUgYXVmXG4gICAgICAgICAgICB3aW5kb3cuYWRiLmZpbHRlcmVGw7xyRXhwb3J0KCk7XG4gICAgICAgIH1cblx0fVxufTtcblxud2luZG93LmFkYi5oYW5kbGVFeHBvcnRpZXJlbk9iamVrdGVXw6RobGVuQ29sbGFwc2VTaG93biA9IGZ1bmN0aW9uKHRoYXQpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIHZhciBncnVwcGVuX2dld8OkaGx0ID0gd2luZG93LmFkYi5mw7xyRXhwb3J0R2V3w6RobHRlR3J1cHBlbigpO1xuICAgIGlmIChncnVwcGVuX2dld8OkaGx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBrZWluZSBHcnVwcGUgZ2V3w6RobHRcbiAgICAgICAgd2luZG93LmFkYi5lcnN0ZWxsZUxpc3RlRsO8ckZlbGR3YWhsKCk7XG4gICAgICAgIC8vIHVuZCBkZW4gcGFuZWwgc2NobGllc3NlblxuICAgICAgICAkKHRoYXQpLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG4vLyB3ZW5uICNleHBvcnRpZXJlbl9vYmpla3RlX1RheG9ub21pZW5fenVzYW1tZW5mYXNzZW4gZ2VrbGlja3Qgd2lyZFxud2luZG93LmFkYi5oYW5kbGVFeHBvcnRpZXJlbk9iamVrdGVUYXhvbm9taWVuWnVzYW1tZW5mYXNzZW5DbGljayA9IGZ1bmN0aW9uKHRoYXQpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIHZhciBncnVwcGVfaXN0X2dld8OkaGx0ID0gZmFsc2U7XG5cdGlmICgkKHRoYXQpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XG5cdFx0d2luZG93LmFkYi5mYXNzZVRheG9ub21pZW5adXNhbW1lbiA9IGZhbHNlO1xuXHRcdCQodGhhdCkuaHRtbChcIkFsbGUgVGF4b25vbWllbiB6dXNhbW1lbmZhc3NlblwiKTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuYWRiLmZhc3NlVGF4b25vbWllblp1c2FtbWVuID0gdHJ1ZTtcblx0XHQkKHRoYXQpLmh0bWwoXCJUYXhvbm9taWVuIGVpbnplbG4gYmVoYW5kZWxuXCIpO1xuXHR9XG5cdC8vIEZlbGRlciBuZXUgYXVmYmF1ZW4sIGFiZXIgbnVyLCB3ZW5uIGVpbmUgR3J1cHBlIGdld8OkaGx0IGlzdFxuXHQkKFwiI2V4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9ncnVwcGVuX2NvbGxhcHNlXCIpXG4gICAgICAgIC5maW5kKFwiLmV4cG9ydGllcmVuX2RzX29iamVrdGVfd2FlaGxlbl9ncnVwcGVcIilcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGF0KS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBncnVwcGVfaXN0X2dld8OkaGx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cdGlmIChncnVwcGVfaXN0X2dld8OkaGx0KSB7XG5cdFx0d2luZG93LmFkYi5lcnN0ZWxsZUxpc3RlRsO8ckZlbGR3YWhsKCk7XG5cdH1cbn07XG5cbi8vIHdlbm4gI2V4cG9ydGllcmVuX2V4cG9ydGllcmVuX2V4cG9ydGllcmVuIGdla2xpY2t0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlRXhwb3J0aWVyZW5FeHBvcnRpZXJlbkV4cG9ydGllcmVuQ2xpY2sgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAod2luZG93LmFkYi5pc0ZpbGVBUElBdmFpbGFibGUoKSkge1xuXHRcdHZhciBleHBvcnRzdHJpbmcgPSB3aW5kb3cuYWRiLmVyc3RlbGxlRXhwb3J0U3RyaW5nKHdpbmRvdy5hZGIuZXhwb3J0aWVyZW5fb2JqZWt0ZSksXG5cdFx0XHRibG9iID0gbmV3IEJsb2IoW2V4cG9ydHN0cmluZ10sIHt0eXBlOiBcInRleHQvY3N2O2NoYXJzZXQ9dXRmLTg7XCJ9KSxcblx0XHRcdGQgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0bW9udGggPSBkLmdldE1vbnRoKCkrMSxcblx0XHRcdGRheSA9IGQuZ2V0RGF0ZSgpLFxuXHRcdFx0b3V0cHV0ID0gZC5nZXRGdWxsWWVhcigpICsgJy0nICsgKG1vbnRoPDEwID8gJzAnIDogJycpICsgbW9udGggKyAnLScgKyAoZGF5PDEwID8gJzAnIDogJycpICsgZGF5O1xuXHRcdHNhdmVBcyhibG9iLCBvdXRwdXQgKyBcIl9leHBvcnQuY3N2XCIpO1xuXHR9XG59O1xuXG4vLyB3ZW5uIC5wYW5lbCBnZcO2ZmZuZXQgd2lyZFxuLy8gSMO2aGUgZGVyIHRleHRhcmVhcyBhbiBUZXh0Z3LDtnNzZSBhbnBhc3Nlblxud2luZG93LmFkYi5oYW5kbGVQYW5lbFNob3duID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0JCh0aGlzKS5maW5kKCd0ZXh0YXJlYScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0d2luZG93LmFkYi5maXRUZXh0YXJlYVRvQ29udGVudCh0aGlzLmlkKTtcblx0fSk7XG59O1xuXG4vLyB3ZW5uIC5MaW5rWnVBcnRHbGVpY2hlckdydXBwZSBnZWtsaWNrdCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZUxpbmtadUFydEdsZWljaGVyR3J1cHBlQ2xpY2sgPSBmdW5jdGlvbihpZCkge1xuXHQndXNlIHN0cmljdCc7XG4gICAgJChcIi5zdWNoZW5cIikudmFsKFwiXCIpO1xuXHQkKFwiI3RyZWVcIiArIHdpbmRvdy5hZGIuR3J1cHBlKVxuICAgICAgICAuanN0cmVlKFwiY2xlYXJfc2VhcmNoXCIpXG5cdCAgICAuanN0cmVlKFwiZGVzZWxlY3RfYWxsXCIpXG5cdCAgICAuanN0cmVlKFwiY2xvc2VfYWxsXCIsIC0xKVxuXHQgICAgLmpzdHJlZShcInNlbGVjdF9ub2RlXCIsIFwiI1wiICsgaWQpO1xufTtcblxuLy8gd2VubiBGZW5zdGVyZ3LDtnNzZSB2ZXLDpG5kZXJ0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlUmVzaXplID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0d2luZG93LmFkYi5zZXR6ZVRyZWVow7ZoZSgpO1xuXHQvLyBIw7ZoZSBkZXIgVGV4dGFyZWFzIGtvcnJpZ2llcmVuXG5cdCQoJyNmb3JtcycpLmZpbmQoJ3RleHRhcmVhJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHR3aW5kb3cuYWRiLmZpdFRleHRhcmVhVG9Db250ZW50KHRoaXMuaWQpO1xuXHR9KTtcbn07XG5cbi8vIHdlbm4gLmFubWVsZGVuX2J0biBnZWtsaWNrdCB3aXJkXG53aW5kb3cuYWRiLmhhbmRsZUFubWVsZGVuQnRuQ2xpY2sgPSBmdW5jdGlvbih0aGF0KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8gZXMgbXVzcyBtaXRnZWdlYmVuIHdlcmRlbiwgd29oZXIgZGllIEFubWVsZHVuZyBrYW0sIGRhbWl0IGRpZSBlbWFpbCBhdXMgZGVtIHJpY2h0aWdlbiBGZWxkIGdlaG9sdCB3ZXJkZW4ga2FublxuXHR2YXIgYnNfZHMgPSB0aGF0LmlkLnN1YnN0cmluZyh0aGF0LmlkLmxlbmd0aC0yKTtcblx0aWYgKGJzX2RzID09PSBcInJ0XCIpIHtcblx0XHRic19kcyA9IFwiYXJ0XCI7XG5cdH1cblx0d2luZG93LmFkYi5tZWxkZVVzZXJBbihic19kcyk7XG59O1xuXG4vLyB3ZW5uIC5FbWFpbCBrZXl1cFxud2luZG93LmFkYi5oYW5kbGVFbWFpbEtleXVwID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly9hbGxmw6RsbGlnIG5vY2ggdm9yaGFuZGVuZW4gSGlud2VpcyBhdXNibGVuZGVuXG5cdCQoXCIuRW1haWxoaW53ZWlzXCIpLmhpZGUoKTtcbn07XG5cbi8vIHdlbm4gLlBhc3N3b3J0IGtleXVwXG53aW5kb3cuYWRiLmhhbmRsZVBhc3N3b3J0S2V5dXAgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvL2FsbGbDpGxsaWcgbm9jaCB2b3JoYW5kZW5lbiBIaW53ZWlzIGF1c2JsZW5kZW5cblx0JChcIi5QYXNzd29ydGhpbndlaXNcIikuaGlkZSgpO1xufTtcblxuLy8gd2VubiAuUGFzc3dvcnQyIGtleXVwXG53aW5kb3cuYWRiLmhhbmRsZVBhc3N3b3J0MktleXVwID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly9hbGxmw6RsbGlnIG5vY2ggdm9yaGFuZGVuZW4gSGlud2VpcyBhdXNibGVuZGVuXG5cdCQoXCIuUGFzc3dvcnRoaW53ZWlzMlwiKS5oaWRlKCk7XG59O1xuXG4vLyB3ZW5uIC5rb250b19lcnN0ZWxsZW5fYnRuIGdla2xpY2t0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlS29udG9FcnN0ZWxsZW5CdG5DbGljayA9IGZ1bmN0aW9uKHRoYXQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgYnNfZHMgPSB0aGF0LmlkLnN1YnN0cmluZyh0aGF0LmlkLmxlbmd0aC0yKTtcblx0aWYgKGJzX2RzID09PSBcInJ0XCIpIHtcblx0XHRic19kcyA9IFwiYXJ0XCI7XG5cdH1cblx0JChcIi5zaWdudXBcIikuc2hvdygpO1xuXHQkKFwiLmFubWVsZGVuX2J0blwiKS5oaWRlKCk7XG5cdCQoXCIuYWJtZWxkZW5fYnRuXCIpLmhpZGUoKTtcblx0JChcIi5rb250b19lcnN0ZWxsZW5fYnRuXCIpLmhpZGUoKTtcblx0JChcIi5rb250b19zcGVpY2hlcm5fYnRuXCIpLnNob3coKTtcblx0JChcIi5pbXBvcnRpZXJlbl9hbm1lbGRlbl9mZWhsZXJcIikuaGlkZSgpO1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdCQoXCIjRW1haWxfXCIgKyBic19kcykuZm9jdXMoKTtcblx0fSwgNTApOyAgLy8gbmVlZCB0byB1c2UgYSB0aW1lciBzbyB0aGF0IC5ibHVyKCkgY2FuIGZpbmlzaCBiZWZvcmUgeW91IGRvIC5mb2N1cygpXG59O1xuXG4vLyB3ZW5uIC5rb250b19zcGVpY2hlcm5fYnRuIGdla2xpY2t0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlS29udG9TcGVpY2hlcm5CdG5DbGljayA9IGZ1bmN0aW9uKHRoYXQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgYnNfZHMgPSB0aGF0LmlkLnN1YnN0cmluZyh0aGF0LmlkLmxlbmd0aC0yKTtcblx0aWYgKGJzX2RzID09PSBcInJ0XCIpIHtcblx0XHRic19kcyA9IFwiYXJ0XCI7XG5cdH1cblx0aWYgKHdpbmRvdy5hZGIudmFsaWRpZXJlU2lnbnVwKGJzX2RzKSkge1xuXHRcdHdpbmRvdy5hZGIuZXJzdGVsbGVLb250byhic19kcyk7XG5cdFx0Ly8gQW5tZWxkZWZlbnN0ZXIgenVyw7xja3NldHplblxuXHRcdCQoXCIuc2lnbnVwXCIpLmhpZGUoKTtcblx0XHQkKFwiLmFubWVsZGVuX2J0blwiKS5oaWRlKCk7XG5cdFx0JChcIi5hYm1lbGRlbl9idG5cIikuc2hvdygpO1xuXHRcdCQoXCIua29udG9fZXJzdGVsbGVuX2J0blwiKS5oaWRlKCk7XG5cdFx0JChcIi5rb250b19zcGVpY2hlcm5fYnRuXCIpLmhpZGUoKTtcblx0fVxufTtcblxuLy8gd2VubiAuZ3J1cHBlIGdla2xpY2t0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlw5ZmZm5lR3J1cHBlQ2xpY2sgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR3aW5kb3cuYWRiLsO2ZmZuZUdydXBwZSgkKHRoaXMpLmF0dHIoXCJHcnVwcGVcIikpO1xufTtcblxuLy8gd2VubiAjRHNGZWxkZXIgZ2XDpG5kZXJ0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlRHNGZWxkZXJDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR3aW5kb3cuYWRiLm1lbGRlRXJmb2xnVm9uSWRJZGVudGlmaWthdGlvbihcIkRzXCIpO1xufTtcblxuLy8gd2VubiAjQnNGZWxkZXIgZ2XDpG5kZXJ0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlQnNGZWxkZXJDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR3aW5kb3cuYWRiLm1lbGRlRXJmb2xnVm9uSWRJZGVudGlmaWthdGlvbihcIkJzXCIpO1xufTtcblxuLy8gd2VubiAjRHNJZCBnZcOkbmRlcnQgd2lyZFxud2luZG93LmFkYi5oYW5kbGVEc0lkQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0d2luZG93LmFkYi5tZWxkZUVyZm9sZ1ZvbklkSWRlbnRpZmlrYXRpb24oXCJEc1wiKTtcbn07XG5cbi8vIHdlbm4gI0JzSWQgZ2XDpG5kZXJ0IHdpcmRcbndpbmRvdy5hZGIuaGFuZGxlQnNJZENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHdpbmRvdy5hZGIubWVsZGVFcmZvbGdWb25JZElkZW50aWZpa2F0aW9uKFwiQnNcIik7XG59O1xuXG4vLyB3ZW5uIGluIHRleHRhcmVhIGtleXVwIG9kZXIgZm9jdXNcbndpbmRvdy5hZGIuaGFuZGxlVGV4dGFyZWFLZXl1cEZvY3VzID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0d2luZG93LmFkYi5maXRUZXh0YXJlYVRvQ29udGVudCh0aGlzLmlkKTtcbn07XG5cbi8vIMO8YmVybmltbXQgZWluZSBBcnJheSBtaXQgT2JqZWt0ZW5cbi8vIHVuZCBkZW4gZGl2LCBpbiBkZW0gZGllIFRhYmVsbGUgZWluZ2Vmw7xndCB3ZXJkZW4gc29sbFxuLy8gcGx1cyBlaW5lbiBkaXYsIGluIGRlbSBkaWUgTGlzdGUgZGVyIEZlbGRlciBhbmd6ZWlndCB3aXJkIChmYWxscyBkaWVzZXIgZGl2IG1pdGdlbGllZmVydCB3aXJkKVxuLy8gYmF1dCBkYW1pdCBlaW5lIFRhYmVsbGUgYXVmIHVuZCBmw7xndCBzaWUgaW4gZGVuIMO8YmVyZ2ViZW5lbiBkaXYgZWluXG53aW5kb3cuYWRiLmVyc3RlbGxlVGFiZWxsZSA9IGZ1bmN0aW9uKERhdGVuc8OkdHplLCBmZWxkZXJfZGl2LCB0YWJlbGxlbl9kaXYpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaHRtbCA9IFwiXCIsXG5cdFx0RmVsZG5hbWUgPSBcIlwiLFxuXHRcdGh0bWxfZHNfZmVsZGVyX2RpdiA9IFwiXCIsXG4gICAgICAgIGVyc3RlXzEwX2RzLFxuICAgICAgICAkdGFiZWxsZW5fZGl2ID0gJChcIiNcIit0YWJlbGxlbl9kaXYpO1xuXHRpZiAoRGF0ZW5zw6R0emUubGVuZ3RoID4gMTApIHtcblx0XHRodG1sICs9IFwiVm9yc2NoYXUgZGVyIGVyc3RlbiAxMCB2b24gXCIgKyBEYXRlbnPDpHR6ZS5sZW5ndGggKyBcIiBEYXRlbnPDpHR6ZW46XCI7XG5cdH0gZWxzZSBpZiAoRGF0ZW5zw6R0emUubGVuZ3RoID4gMSkge1xuXHRcdGh0bWwgKz0gXCJWb3JzY2hhdSBkZXIgXCIgKyBEYXRlbnPDpHR6ZS5sZW5ndGggKyBcIiBEYXRlbnPDpHR6ZTpcIjtcblx0fSBlbHNlIHtcblx0XHRodG1sICs9IFwiVm9yc2NoYXUgZGVzIGVpbnppZ2VuIERhdGVuc2F0emVzOlwiO1xuXHR9XG5cdC8vIFRhYmVsbGUgaW5pdGlpZXJlblxuXHRodG1sICs9ICc8ZGl2IGNsYXNzPVwidGFibGUtcmVzcG9uc2l2ZVwiPjx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLXN0cmlwZWQgdGFibGUtY29uZGVuc2VkIHRhYmxlLWhvdmVyXCI+Jztcblx0Ly8gVGl0ZWx6ZWlsZSBhdWZiYXVlblxuXHQvLyBaZWlsZSBhbmxlZ2VuXG5cdC8vIGdsZWljaHplaXRpZyBGZWxkbGlzdGUgZsO8ciBGb3JtdWxhciBhbmxlZ2VuXG5cdGlmIChmZWxkZXJfZGl2KSB7XG5cdFx0aWYgKGZlbGRlcl9kaXYgPT09IFwiRHNGZWxkZXJfZGl2XCIpIHtcblx0XHRcdEZlbGRuYW1lID0gXCJEc0ZlbGRlclwiO1xuXHRcdH0gZWxzZSBpZiAoZmVsZGVyX2RpdiA9PT0gXCJCc0ZlbGRlcl9kaXZcIikge1xuXHRcdFx0RmVsZG5hbWUgPSBcIkJzRmVsZGVyXCI7XG5cdFx0fVxuXHR9XG5cdGh0bWxfZHNfZmVsZGVyX2RpdiArPSAnPGxhYmVsIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiIGZvcj1cIicrRmVsZG5hbWUrJ1wiPkZlbGQgbWl0IGVpbmRldXRpZ2VyIElEPGJyPmluIGRlbiBJbXBvcnRkYXRlbjwvbGFiZWw+Jztcblx0aHRtbF9kc19mZWxkZXJfZGl2ICs9ICc8c2VsZWN0IG11bHRpcGxlIGNsYXNzPVwiY29udHJvbHMgZm9ybS1jb250cm9sIGlucHV0LXNtXCIgaWQ9XCInK0ZlbGRuYW1lKydcIiBzdHlsZT1cImhlaWdodDonICsgKChPYmplY3Qua2V5cyhEYXRlbnPDpHR6ZVswXSkubGVuZ3RoKjE5KSs5KSAgKyAncHhcIj4nO1xuXHRodG1sICs9IFwiPHRoZWFkPjx0cj5cIjtcblxuXHQvLyBkdXJjaCBkaWUgRmVsZGVyIGRlcyBlcnN0ZW4gRGF0ZW5zYXR6ZXMgemlya2VsblxuICAgIF8uZWFjaChEYXRlbnPDpHR6ZVswXSwgZnVuY3Rpb24oZmVsZHdlcnQsIGZlbGRuYW1lKSB7XG4gICAgICAgIC8vIFNwYWx0ZSBhbmxlZ2VuXG4gICAgICAgIGh0bWwgKz0gXCI8dGg+XCIgKyBmZWxkbmFtZSArIFwiPC90aD5cIjtcbiAgICAgICAgLy8gT3B0aW9uIGbDvHIgRmVsZGxpc3RlIGFuZsO8Z2VuXG4gICAgICAgIGh0bWxfZHNfZmVsZGVyX2RpdiArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyBmZWxkbmFtZSArICdcIj4nICsgZmVsZG5hbWUgKyAnPC9vcHRpb24+JztcbiAgICB9KTtcblx0Ly8gVGl0ZWx6ZWlsZSBhYnNjaGxpZXNzZW5cblx0aHRtbCArPSBcIjwvdHI+PC90aGVhZD48dGJvZHk+XCI7XG5cdC8vIEZlbGRsaXN0ZSBhYnNjaGxpZXNzZW5cblx0aHRtbF9kc19mZWxkZXJfZGl2ICs9ICc8L3NlbGVjdD4nO1xuXHRpZiAoZmVsZGVyX2Rpdikge1xuXHRcdC8vIG51ciwgd2VubiBlaW4gZmVsZGVyX2RpdiDDvGJlcmdlYmVuIHd1cmRlXG5cdFx0JChcIiNcIitmZWxkZXJfZGl2KS5odG1sKGh0bWxfZHNfZmVsZGVyX2Rpdik7XG5cdH1cblxuICAgIC8vIFRhYmVsbGVuemVpbGVuIGF1ZmJhdWVuXG5cdC8vIG51ciBkaWUgZXJzdGVuIDEwIERhdGVuc8OkdHplIGFuemVpZ2VuXG4gICAgZXJzdGVfMTBfZHMgPSBfLmZpcnN0KERhdGVuc8OkdHplLCAxMCk7XG5cbiAgICBfLmVhY2goZXJzdGVfMTBfZHMsIGZ1bmN0aW9uKGRhdGVuc2F0eikge1xuICAgICAgICAvLyBaZWlsZSBhbmxlZ2VuXG4gICAgICAgIGh0bWwgKz0gXCI8dHI+XCI7XG4gICAgICAgIC8vIGR1cmNoIGRpZSBGZWxkZXIgemlya2VsblxuICAgICAgICBfLmVhY2goZGF0ZW5zYXR6LCBmdW5jdGlvbihmZWxkd2VydCwgZmVsZG5hbWUpIHtcbiAgICAgICAgICAgIC8vIFNwYWx0ZSBhbmxlZ2VuXG4gICAgICAgICAgICBodG1sICs9IFwiPHRkPlwiO1xuICAgICAgICAgICAgaWYgKGZlbGR3ZXJ0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gTnVsbC1XZXJ0ZSBhbHMgbGVlciBhbnplaWdlblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZlbGR3ZXJ0ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBKU09OLnN0cmluZ2lmeShmZWxkd2VydCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZlbGR3ZXJ0IHx8IGZlbGR3ZXJ0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaHRtbCArPSBmZWxkd2VydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmVsZHdlcnQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgLy8gZGFmw7xyIHNvZ2VuLCBkYXNzIGZhbHNlIGF1Y2ggYW5nZXplaWd0IHdpcmRcbiAgICAgICAgICAgICAgICAvLyBvaG5lIGRpZXNlIFplaWxlIGJsZWlidCBkYXMgRmVsZCBzb25zdCBsZWVyXG4gICAgICAgICAgICAgICAgaHRtbCArPSBmZWxkd2VydDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbnVsbHdlcnRlIGFscyBsZWVyd2VydGUgKG5pY2h0KSBhbnplaWdlblxuICAgICAgICAgICAgICAgIGh0bWwgKz0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNwYWx0ZSBhYnNjaGxpZXNzZW5cbiAgICAgICAgICAgIGh0bWwgKz0gXCI8L3RkPlwiO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gWmVpbGUgYWJzY2hsaWVzc2VuXG4gICAgICAgIGh0bWwgKz0gXCI8L3RyPlwiO1xuICAgIH0pO1xuXG5cdC8vIFRhYmVsbGUgYWJzY2hsaWVzc2VuXG5cdGh0bWwgKz0gJzwvdGJvZHk+PC90YWJsZT48L2Rpdj4nO1xuXHQvLyBodG1sIGluIGRpdiBlaW5mw7xnZW5cblx0JHRhYmVsbGVuX2RpdlxuICAgICAgICAuaHRtbChodG1sKVxuXHQgICAgLmNzcyhcIm1hcmdpbi10b3BcIiwgXCIyMHB4XCIpXG4gICAgICAgIC8vIHNpY2h0YmFyIHN0ZWxsZW5cbiAgICAgICAgLnNob3coKTtcbiAgICAvLyBmZW5zdGVyIHNjcm9sbGVuXG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICR0YWJlbGxlbl9kaXYub2Zmc2V0KCkudG9wXG4gICAgfSwgMjAwMCk7XG59O1xuXG4vLyBlcmjDpGx0IGRicyA9IFwiRHNcIiBvZGVyIFwiQnNcIlxud2luZG93LmFkYi5tZWxkZUVyZm9sZ1ZvbklkSWRlbnRpZmlrYXRpb24gPSBmdW5jdGlvbihkYnMpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIHZhciAkZGJzRmVsZGVyU2VsZWN0ZWQgPSAkKFwiI1wiK2RicytcIkZlbGRlciBvcHRpb246c2VsZWN0ZWRcIiksXG4gICAgICAgICRkYnNJZFNlbGVjdGVkID0gJChcIiNcIitkYnMrXCJJZCBvcHRpb246c2VsZWN0ZWRcIiksXG4gICAgICAgIGlkc192b25fZGF0ZW5zw6R0emVuID0gW10sXG4gICAgICAgIG1laHJmYWNoX3ZvcmtvbW1lbmRlX2lkcyA9IFtdLFxuICAgICAgICBpZHNfdm9uX25pY2h0X2ltcG9ydGllcmJhcmVuX2RhdGVuc8OkdHplbiA9IFtdO1xuXG5cdGlmICgkZGJzRmVsZGVyU2VsZWN0ZWQubGVuZ3RoICYmICRkYnNJZFNlbGVjdGVkLmxlbmd0aCkge1xuXHRcdC8vIGJlaWRlIElEJ3Mgc2luZCBnZXfDpGhsdFxuXHRcdHdpbmRvdy5hZGJbZGJzK1wiRmVsZGVySWRcIl0gPSAkZGJzRmVsZGVyU2VsZWN0ZWQudmFsKCk7XG5cdFx0d2luZG93LmFkYi5Ec0lkID0gJGRic0lkU2VsZWN0ZWQudmFsKCk7XG5cdFx0d2luZG93LmFkYltkYnMrXCJJZFwiXSA9ICRkYnNJZFNlbGVjdGVkLnZhbCgpO1xuXHRcdC8vIGRhcyBoaWVyIHdpcmQgc3DDpHRlciBub2NoIGbDvHIgZGVuIElubXBvcnQgZ2VicmF1Y2h0ID4gZ2xvYmFsZSBWYXJpYWJsZSBtYWNoZW5cblx0XHR3aW5kb3cuYWRiLlp1b3JkYmFyZURhdGVuc8OkdHplID0gW107XG5cdFx0JChcIiNpbXBvcnRpZXJlbl9cIitkYnMudG9Mb3dlckNhc2UoKStcIl9pZHNfaWRlbnRpZml6aWVyZW5faGlud2Vpc190ZXh0XCIpXG4gICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgLmh0bWwoXCJCaXR0ZSB3YXJ0ZW4sIGRpZSBEYXRlbiB3ZXJkZW4gYW5hbHlzaWVydC48YnI+RGFzIGthbm4gZWluZSBXZWlsZSBkYXVlcm4uLi5cIilcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKVxuICAgICAgICAgICAgLmFkZENsYXNzKFwiYWxlcnQtaW5mb1wiKVxuICAgICAgICAgICAgLnNob3coKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI2ltcG9ydGllcmVuX1wiICsgZGJzLnRvTG93ZXJDYXNlKCkgKyBcIl9pZHNfaWRlbnRpZml6aWVyZW5fY29sbGFwc2VcIikub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDIwMDApO1xuXG5cdFx0Ly8gRG9rdW1lbnRlIGF1cyBkZXIgR3J1cHBlIGRlciBEYXRlbnPDpHR6ZSBob2xlblxuXHRcdC8vIGR1cmNoIGFsbGUgbG9vcGVuLiBEYWJlaSBlaW5lbiBBcnJheSB2b24gT2JqZWt0ZW4gYmlsZGVuIG1pdCBpZCB1bmQgZ3VpZFxuXHRcdC8vIGtvbnRyb2xsaWVyZW4sIG9iIGVpbmUgaWQgbWVociBhbHMgZWlubWFsIHZvcmtvbW10XG5cdFx0dmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuXHRcdGlmICh3aW5kb3cuYWRiLkRzSWQgPT09IFwiZ3VpZFwiKSB7XG5cdFx0XHQkZGIudmlldygnYXJ0ZW5kYi9hbGxfZG9jcycsIHtcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZV9kZXNfaWRfZmVsZHMgPSB3aW5kb3cuYWRiW2RicytcIkZlbGRlcklkXCJdO1xuICAgICAgICAgICAgICAgICAgICAvLyBkdXJjaCBkaWUgaW1wb3J0aWVydGVuIERhdGVuc8OkdHplIGxvb3BlblxuICAgICAgICAgICAgICAgICAgICBfLmVhY2god2luZG93LmFkYltkYnMudG9Mb3dlckNhc2UoKStcIkRhdGVuc8OkdHplXCJdLCBmdW5jdGlvbihpbXBvcnRfZGF0ZW5zYXR6KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWRzX3Zvbl9kYXRlbnPDpHR6ZW4uaW5kZXhPZihpbXBvcnRfZGF0ZW5zYXR6W25hbWVfZGVzX2lkX2ZlbGRzXSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGllc2UgSUQgd3VyZGUgbm9jaCBuaWNodCBoaW56dWdlZsO8Z3QgPiBoaW56dWbDvGdlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkc192b25fZGF0ZW5zw6R0emVuLnB1c2goaW1wb3J0X2RhdGVuc2F0eltuYW1lX2Rlc19pZF9mZWxkc10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByw7xmZW4sIG9iIGRpZSBJRCB6dWdlb3JkbmV0IHdlcmRlbiBrYW5uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHp1Z2Vow7ZyaWdlc19vYmpla3QgPSBfLmZpbmQoZGF0YS5yb3dzLCBmdW5jdGlvbihvYmpla3Rfcm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpla3Rfcm93LmtleSA9PT0gaW1wb3J0X2RhdGVuc2F0eltuYW1lX2Rlc19pZF9mZWxkc107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHp1Z2Vow7ZyaWdlc19vYmpla3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZS5wdXNoKGltcG9ydF9kYXRlbnNhdHpbbmFtZV9kZXNfaWRfZmVsZHNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkaWVzZSBJRCBrb25udGUgbmljaHQgaGluenVnZWbDvGd0IHdlcmRlbi4gSW4gZGllIExpc3RlIGRlciBuaWNodCBoaW56dWdlZsO8Z3RlbiBhdWZuZWhtZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRzX3Zvbl9uaWNodF9pbXBvcnRpZXJiYXJlbl9kYXRlbnPDpHR6ZW4ucHVzaChpbXBvcnRfZGF0ZW5zYXR6W25hbWVfZGVzX2lkX2ZlbGRzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkaWVzZSBJRCB3dXJkZW4gc2Nob24gaGluenVnZWbDvGd0ID4gbWVocmZhY2ghXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVocmZhY2hfdm9ya29tbWVuZGVfaWRzLnB1c2goaW1wb3J0X2RhdGVuc2F0eltuYW1lX2Rlc19pZF9mZWxkc10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcdFx0XHR3aW5kb3cuYWRiLm1lbGRlRXJmb2xnVm9uSWRJZGVudGlmaWthdGlvbl8wMihtZWhyZmFjaF92b3Jrb21tZW5kZV9pZHMsIGlkc192b25fZGF0ZW5zw6R0emVuLCBpZHNfdm9uX25pY2h0X2ltcG9ydGllcmJhcmVuX2RhdGVuc8OkdHplbiwgZGJzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRkYi52aWV3KCdhcnRlbmRiL2dydXBwZV9pZF90YXhvbm9taWVpZD9zdGFydGtleT1bXCInICsgd2luZG93LmFkYi5Ec0lkICsgJ1wiXSZlbmRrZXk9W1wiJyArIHdpbmRvdy5hZGIuRHNJZCArICdcIix7fSx7fV0nLCB7XG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVfZGVzX2lkX2ZlbGRzID0gd2luZG93LmFkYltkYnMrXCJGZWxkZXJJZFwiXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZHVyY2ggZGllIGltcG9ydGllcnRlbiBEYXRlbnPDpHR6ZSBsb29wZW5cbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHdpbmRvdy5hZGJbZGJzLnRvTG93ZXJDYXNlKCkrXCJEYXRlbnPDpHR6ZVwiXSwgZnVuY3Rpb24oaW1wb3J0X2RhdGVuc2F0eikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkc192b25fZGF0ZW5zw6R0emVuLmluZGV4T2YoaW1wb3J0X2RhdGVuc2F0eltuYW1lX2Rlc19pZF9mZWxkc10pID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpZXNlIElEIHd1cmRlIG5vY2ggbmljaHQgaGluenVnZWbDvGd0ID4gaGluenVmw7xnZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHNfdm9uX2RhdGVuc8OkdHplbi5wdXNoKGltcG9ydF9kYXRlbnNhdHpbbmFtZV9kZXNfaWRfZmVsZHNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcsO8ZmVuLCBvYiBkaWUgSUQgenVnZW9yZG5ldCB3ZXJkZW4ga2FublxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB6dWdlaMO2cmlnZXNfb2JqZWt0ID0gXy5maW5kKGRhdGEucm93cywgZnVuY3Rpb24ob2JqZWt0X3Jvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWt0X3Jvdy5rZXlbMl0gPT09IGltcG9ydF9kYXRlbnNhdHpbbmFtZV9kZXNfaWRfZmVsZHNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6dWdlaMO2cmlnZXNfb2JqZWt0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBPYmpla3QgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWt0LklkID0gcGFyc2VJbnQoaW1wb3J0X2RhdGVuc2F0eltuYW1lX2Rlc19pZF9mZWxkc10sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWt0Lkd1aWQgPSB6dWdlaMO2cmlnZXNfb2JqZWt0LmtleVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZS5wdXNoKE9iamVrdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGllc2UgSUQga29ubnRlIG5pY2h0IGhpbnp1Z2Vmw7xndCB3ZXJkZW4uIEluIGRpZSBMaXN0ZSBkZXIgbmljaHQgaGluenVnZWbDvGd0ZW4gYXVmbmVobWVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkc192b25fbmljaHRfaW1wb3J0aWVyYmFyZW5fZGF0ZW5zw6R0emVuLnB1c2goaW1wb3J0X2RhdGVuc2F0eltuYW1lX2Rlc19pZF9mZWxkc10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGllc2UgSUQgd3VyZGVuIHNjaG9uIGhpbnp1Z2Vmw7xndCA+IG1laHJmYWNoIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1laHJmYWNoX3ZvcmtvbW1lbmRlX2lkcy5wdXNoKGltcG9ydF9kYXRlbnNhdHpbbmFtZV9kZXNfaWRfZmVsZHNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XHRcdFx0d2luZG93LmFkYi5tZWxkZUVyZm9sZ1ZvbklkSWRlbnRpZmlrYXRpb25fMDIobWVocmZhY2hfdm9ya29tbWVuZGVfaWRzLCBpZHNfdm9uX2RhdGVuc8OkdHplbiwgaWRzX3Zvbl9uaWNodF9pbXBvcnRpZXJiYXJlbl9kYXRlbnPDpHR6ZW4sIGRicyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufTtcblxud2luZG93LmFkYi5tZWxkZUVyZm9sZ1ZvbklkSWRlbnRpZmlrYXRpb25fMDIgPSBmdW5jdGlvbihtZWhyZmFjaF92b3Jrb21tZW5kZV9pZHMsIGlkc192b25fZGF0ZW5zw6R0emVuLCBpZHNfdm9uX25pY2h0X2ltcG9ydGllcmJhcmVuX2RhdGVuc8OkdHplbiwgZGJzKSB7XG5cdCd1c2Ugc3RyaWN0JztcbiAgICB2YXIgJGltcG9ydGllcmVuX2Ric19pZHNfaWRlbnRpZml6aWVyZW5faGlud2Vpc190ZXh0ID0gJChcIiNpbXBvcnRpZXJlbl9cIitkYnMudG9Mb3dlckNhc2UoKStcIl9pZHNfaWRlbnRpZml6aWVyZW5faGlud2Vpc190ZXh0XCIpO1xuICAgICRpbXBvcnRpZXJlbl9kYnNfaWRzX2lkZW50aWZpemllcmVuX2hpbndlaXNfdGV4dC5hbGVydCgpO1xuXHQvLyByw7xja21lbGRlbjogRmFsbHMgbWVocmZhY2hlIElEJ3MsIG51ciBkYXMgcsO8Y2ttZWxkZW4gdW5kIGFiYnJlY2hlblxuXHRpZiAobWVocmZhY2hfdm9ya29tbWVuZGVfaWRzLmxlbmd0aCAmJiBkYnMgIT09IFwiQnNcIikge1xuXHRcdCRpbXBvcnRpZXJlbl9kYnNfaWRzX2lkZW50aWZpemllcmVuX2hpbndlaXNfdGV4dFxuICAgICAgICAgICAgLmh0bWwoXCJEaWUgZm9sZ2VuZGVuIElEJ3Mga29tbWVuIG1laHJmYWNoIHZvcjogXCIgKyBtZWhyZmFjaF92b3Jrb21tZW5kZV9pZHMgKyBcIjxicj5CaXR0ZSBlbnRmZXJuZW4gb2RlciBrb3JyaWdpZXJlbiBTaWUgZGllIGVudHNwcmVjaGVuZGVuIFplaWxlblwiKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5mb1wiKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKVxuICAgICAgICAgICAgLmFkZENsYXNzKFwiYWxlcnQtZGFuZ2VyXCIpO1xuXHR9IGVsc2UgaWYgKHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emUubGVuZ3RoIDwgaWRzX3Zvbl9kYXRlbnPDpHR6ZW4ubGVuZ3RoKSB7XG5cdFx0Ly8gcsO8Y2ttZWxkZW46IFRvdGFsIHggRGF0ZW5zw6R0emUuIHkgZGF2b24gZW50aGFsdGVuIGRpZSBnZXfDpGhsdGUgSUQuIHEgZGF2b24ga8O2bm5lbiB6dWdlb3JkbmV0IHdlcmRlblxuICAgICAgICBpZiAod2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBlaW4gVGVpbCBkZXIgRGF0ZW5zw6R0emUga2FubiBpbXBvcnRpZXJ0IHdlcmRlbi4gQWxzIEhpbndlaXMgbWVsZGVuXG4gICAgICAgICAgICAkaW1wb3J0aWVyZW5fZGJzX2lkc19pZGVudGlmaXppZXJlbl9oaW53ZWlzX3RleHRcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIilcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1zdWNjZXNzXCIpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiYWxlcnQtaW5mb1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGtlaW5lIERhdGVuc8OkdHplIGvDtm5uZW4gaW1wb3J0aWVyIHdlcmRlbi4gQWxzIE1pc3NlcmZvbGcgbWVsZGVuXG4gICAgICAgICAgICAkaW1wb3J0aWVyZW5fZGJzX2lkc19pZGVudGlmaXppZXJlbl9oaW53ZWlzX3RleHRcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1pbmZvXCIpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImFsZXJ0LWRhbmdlclwiKTtcbiAgICAgICAgfVxuXHRcdGlmIChkYnMgPT09IFwiQnNcIikge1xuXHRcdFx0JGltcG9ydGllcmVuX2Ric19pZHNfaWRlbnRpZml6aWVyZW5faGlud2Vpc190ZXh0Lmh0bWwoXCJEaWUgSW1wb3J0dGFiZWxsZSBlbnRow6RsdCBcIiArIHdpbmRvdy5hZGJbZGJzLnRvTG93ZXJDYXNlKCkrXCJEYXRlbnPDpHR6ZVwiXS5sZW5ndGggKyBcIiBCZXppZWh1bmdlbiB2b24gXCIgKyBpZHNfdm9uX2RhdGVuc8OkdHplbi5sZW5ndGggKyBcIiBBcnRlbjo8YnI+QmV6aWVodW5nZW4gdm9uIFwiICsgaWRzX3Zvbl9kYXRlbnPDpHR6ZW4ubGVuZ3RoICsgXCIgQXJ0ZW4gZW50aGFsdGVuIGVpbmVuIFdlcnQgaW0gRmVsZCBcXFwiXCIgKyB3aW5kb3cuYWRiW2RicytcIkZlbGRlcklkXCJdICsgXCJcXFwiPGJyPlwiICsgd2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZS5sZW5ndGggKyBcIiBrw7ZubmVuIHp1Z2VvcmRuZXQgdW5kIGltcG9ydGllcnQgd2VyZGVuPGJyPkFDSFRVTkc6IEJlemllaHVuZ2VuIHZvbiBcIiArIGlkc192b25fbmljaHRfaW1wb3J0aWVyYmFyZW5fZGF0ZW5zw6R0emVuLmxlbmd0aCArIFwiIEFydGVuIG1pdCBkZW4gZm9sZ2VuZGVuIFdlcnRlbiBpbSBGZWxkIFxcXCJcIiArIHdpbmRvdy5hZGJbZGJzK1wiRmVsZGVySWRcIl0gKyBcIlxcXCIga8O2bm5lbiBOSUNIVCB6dWdlb3JkbmV0IHVuZCBpbXBvcnRpZXJ0IHdlcmRlbjogXCIgKyBpZHNfdm9uX25pY2h0X2ltcG9ydGllcmJhcmVuX2RhdGVuc8OkdHplbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRpbXBvcnRpZXJlbl9kYnNfaWRzX2lkZW50aWZpemllcmVuX2hpbndlaXNfdGV4dC5odG1sKFwiRGllIEltcG9ydHRhYmVsbGUgZW50aMOkbHQgXCIgKyB3aW5kb3cuYWRiW2Ricy50b0xvd2VyQ2FzZSgpK1wiRGF0ZW5zw6R0emVcIl0ubGVuZ3RoICsgXCIgRGF0ZW5zw6R0emU6PGJyPlwiICsgaWRzX3Zvbl9kYXRlbnPDpHR6ZW4ubGVuZ3RoICsgXCIgZW50aGFsdGVuIGVpbmVuIFdlcnQgaW0gRmVsZCBcXFwiXCIgKyB3aW5kb3cuYWRiW2RicytcIkZlbGRlcklkXCJdICsgXCJcXFwiPGJyPlwiICsgd2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZS5sZW5ndGggKyBcIiBrw7ZubmVuIHp1Z2VvcmRuZXQgdW5kIGltcG9ydGllcnQgd2VyZGVuPGJyPkFDSFRVTkc6IFwiICsgaWRzX3Zvbl9uaWNodF9pbXBvcnRpZXJiYXJlbl9kYXRlbnPDpHR6ZW4ubGVuZ3RoICsgXCIgRGF0ZW5zw6R0emUgbWl0IGRlbiBmb2xnZW5kZW4gV2VydGVuIGltIEZlbGQgXFxcIlwiICsgd2luZG93LmFkYltkYnMrXCJGZWxkZXJJZFwiXSArIFwiXFxcIiBrw7ZubmVuIE5JQ0hUIHp1Z2VvcmRuZXQgdW5kIGltcG9ydGllcnQgd2VyZGVuOiBcIiArIGlkc192b25fbmljaHRfaW1wb3J0aWVyYmFyZW5fZGF0ZW5zw6R0emVuKTtcblx0XHR9XG5cdFx0JChcIiNcIitkYnMrXCJJbXBvcnRpZXJlblwiKS5zaG93KCk7XG5cdFx0JChcIiNcIitkYnMrXCJFbnRmZXJuZW5cIikuc2hvdygpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIHLDvGNrbWVsZGVuOiBUb3RhbCB4IERhdGVuc8OkdHplLiB5IGRhdm9uIGVudGhhbHRlbiBkaWUgZ2V3w6RobHRlIElELiBxIGRhdm9uIGvDtm5uZW4genVnZW9yZG5ldCB3ZXJkZW5cblx0XHQkaW1wb3J0aWVyZW5fZGJzX2lkc19pZGVudGlmaXppZXJlbl9oaW53ZWlzX3RleHRcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWluZm9cIilcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKVxuICAgICAgICAgICAgLmFkZENsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKTtcblx0XHRpZiAoZGJzID09PSBcIkJzXCIpIHtcblx0XHRcdCRpbXBvcnRpZXJlbl9kYnNfaWRzX2lkZW50aWZpemllcmVuX2hpbndlaXNfdGV4dC5odG1sKFwiRGllIEltcG9ydHRhYmVsbGUgZW50aMOkbHQgXCIgKyB3aW5kb3cuYWRiW2Ricy50b0xvd2VyQ2FzZSgpK1wiRGF0ZW5zw6R0emVcIl0ubGVuZ3RoICsgXCIgQmV6aWVodW5nZW4gdm9uIFwiICsgaWRzX3Zvbl9kYXRlbnPDpHR6ZW4ubGVuZ3RoICsgXCIgQXJ0ZW46PGJyPkJlemllaHVuZ2VuIHZvbiBcIiArIGlkc192b25fZGF0ZW5zw6R0emVuLmxlbmd0aCArIFwiIEFydGVuIGVudGhhbHRlbiBlaW5lbiBXZXJ0IGltIEZlbGQgXFxcIlwiICsgd2luZG93LmFkYltkYnMrXCJGZWxkZXJJZFwiXSArIFwiXFxcIjxicj5CZXppZWh1bmdlbiB2b24gXCIgKyB3aW5kb3cuYWRiLlp1b3JkYmFyZURhdGVuc8OkdHplLmxlbmd0aCArIFwiIEFydGVuIGvDtm5uZW4genVnZW9yZG5ldCB1bmQgaW1wb3J0aWVydCB3ZXJkZW5cIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRpbXBvcnRpZXJlbl9kYnNfaWRzX2lkZW50aWZpemllcmVuX2hpbndlaXNfdGV4dC5odG1sKFwiRGllIEltcG9ydHRhYmVsbGUgZW50aMOkbHQgXCIgKyB3aW5kb3cuYWRiW2Ricy50b0xvd2VyQ2FzZSgpK1wiRGF0ZW5zw6R0emVcIl0ubGVuZ3RoICsgXCIgRGF0ZW5zw6R0emU6PGJyPlwiICsgaWRzX3Zvbl9kYXRlbnPDpHR6ZW4ubGVuZ3RoICsgXCIgZW50aGFsdGVuIGVpbmVuIFdlcnQgaW0gRmVsZCBcXFwiXCIgKyB3aW5kb3cuYWRiW2RicytcIkZlbGRlcklkXCJdICsgXCJcXFwiPGJyPlwiICsgd2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZS5sZW5ndGggKyBcIiBrw7ZubmVuIHp1Z2VvcmRuZXQgdW5kIGltcG9ydGllcnQgd2VyZGVuXCIpO1xuXHRcdH1cblx0XHQkKFwiI1wiK2RicytcIkltcG9ydGllcmVuXCIpLnNob3coKTtcblx0XHQkKFwiI1wiK2RicytcIkVudGZlcm5lblwiKS5zaG93KCk7XG5cdH1cbiAgICAkaW1wb3J0aWVyZW5fZGJzX2lkc19pZGVudGlmaXppZXJlbl9oaW53ZWlzX3RleHQuc2hvdygpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI2ltcG9ydGllcmVuX1wiICsgZGJzLnRvTG93ZXJDYXNlKCkgKyBcIl9pZHNfaWRlbnRpZml6aWVyZW5fY29sbGFwc2VcIikub2Zmc2V0KCkudG9wXG4gICAgfSwgMjAwMCk7XG59O1xuXG4vLyBiZWtvbW10IGRhcyBPYmpla3QgbWl0IGRlbiBEYXRlbnPDpHR6ZW4gKHdpbmRvdy5hZGIuZHNEYXRlbnPDpHR6ZSkgdW5kIGRpZSBMaXN0ZSBkZXIgenUgYWt0dWFsaXNpZXJlbmRlbiBEYXRlbnPDpHR6ZSAod2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZSlcbi8vIGhvbHQgc2ljaCBzZWxiZXIgZGllIGluIGRlbiBGZWxkZXJuIGVyZmFzc3RlbiBJbmZvcyBkZXIgRGF0ZW5zYW1tbHVuZ1xud2luZG93LmFkYi5pbXBvcnRpZXJlRGF0ZW5zYW1tbHVuZyA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBkYXRlbnNhbW1sdW5nLFxuXHRcdGFuemFobF9mZWxkZXIsXG5cdFx0YW56X2RzID0gd2luZG93LmFkYi5kc0RhdGVuc8OkdHplLmxlbmd0aCxcbiAgICAgICAgLy8gRGVyIFZlcmxhdWYgc29sbCBhbmdlemVpZ3Qgd2VyZGVuLCBkYWhlciBicmF1Y2h0IGVzIGVpbmVuIHrDpGhsZXJcbiAgICAgICAgYW56X2RzX2ltcG9ydGllcnQgPSAwLFxuXHRcdERzSW1wb3J0aWVydCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgJERzTmFtZSA9ICQoXCIjRHNOYW1lXCIpLFxuICAgICAgICAkRHNCZXNjaHJlaWJ1bmcgPSAkKFwiI0RzQmVzY2hyZWlidW5nXCIpLFxuICAgICAgICBucixcbiAgICAgICAgcsO8Y2ttZWxkdW5nX2ludHJvLFxuICAgICAgICByw7xja21lbGR1bmdfbGlua3MgPSBcIlwiLFxuICAgICAgICByw7xja21lbGR1bmcsXG4gICAgICAgICREc0RhdGVuc3RhbmQgPSAkKFwiI0RzRGF0ZW5zdGFuZFwiKSxcbiAgICAgICAgJERzTGluayA9ICQoXCIjRHNMaW5rXCIpLFxuICAgICAgICAkRHNVcnNwcnVuZ3NEcyA9ICQoXCIjRHNVcnNwcnVuZ3NEc1wiKSxcbiAgICAgICAgJGltcG9ydGllcmVuX2RzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXMgPSAkKFwiI2ltcG9ydGllcmVuX2RzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNcIiksXG4gICAgICAgICRpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzX3RleHQgPSAkKFwiI2ltcG9ydGllcmVuX2RzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dFwiKSxcbiAgICAgICAgZXJzdGVfMTBfaWRzO1xuXHQvLyBwcsO8ZmVuLCBvYiBlaW4gRHNOYW1lIGVyZmFzc3Qgd3VyZGUuIFdlbm4gbmljaHQ6IG1lbGRlblxuXHRpZiAoISREc05hbWUudmFsKCkpIHtcblx0XHQkKFwiI21lbGR1bmdfaW5kaXZpZHVlbGxfbGFiZWxcIikuaHRtbChcIk5hbWVuIGZlaGx0XCIpO1xuXHRcdCQoXCIjbWVsZHVuZ19pbmRpdmlkdWVsbF90ZXh0XCIpLmh0bWwoXCJCaXR0ZSBnZWJlbiBTaWUgZGVyIERhdGVuc2FtbWx1bmcgZWluZW4gTmFtZW5cIik7XG5cdFx0JChcIiNtZWxkdW5nX2luZGl2aWR1ZWxsX3NjaGxpZXNzZW5cIikuaHRtbChcInNjaGxpZXNzZW5cIik7XG5cdFx0JCgnI21lbGR1bmdfaW5kaXZpZHVlbGwnKS5tb2RhbCgpO1xuXHRcdCREc05hbWUuZm9jdXMoKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuICAgIC8vIGNoYW5nZXMgZmVlZCBlaW5yaWNodGVuXG4gICAgLy8gdmVyc3VjaHQsIHZpZXcgYWxzIEZpbHRlciB6dSB2ZXJ3ZW5kZW4sIG9kZXIgYmVzc2VyLCBkZW4gZXhwbGl6aXRlbiBGaWx0ZXIgZHNpbXBvcnQgbWl0IGRzbmFtZSBhbHMgS3JpdGVyaXVtXG4gICAgLy8gRXJnZWJuaXM6IGJlaSB2aWV3IGthbWVuIGFsbGUgY2hhbmdlcywgYXVjaCBkZXNpZ24gZG9jLiBCZWkgZHNpbXBvcnQga2FtIG5pY2h0cy5cbiAgICAvKnZhciBjaGFuZ2VzX29wdGlvbnMgPSB7fTtcbiAgICBjaGFuZ2VzX29wdGlvbnMuZHNuYW1lID0gJERzTmFtZS52YWwoKTtcbiAgICBjaGFuZ2VzX29wdGlvbnMuZmlsdGVyID0gXCJhcnRlbmRiL2RzaW1wb3J0XCI7XG4gICAgd2luZG93LmFkYi5xdWVyeUNoYW5nZXNTdGFydGluZ05vdygpO1xuXG4gICAgLy8gbGlzdGVuZXIgZWlucmljaHRlbiwgZGVyIG1lbGRldCwgd2VubiBlaW4gRGF0ZW5zYXR6IGFrdHVhbGlzaWVydCB3dXJkZVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ2xvbmdwb2xsLWRhdGEnLCBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICBhbnpEc0ltcG9ydGllcnQgPSBhbnpEc0ltcG9ydGllcnQgKyBkYXRhLnJlc3VsdHMubGVuZ3RoO1xuICAgICAgICB2YXIgcHJvemVudCA9IE1hdGgucm91bmQoYW56RHNJbXBvcnRpZXJ0L2FuekRzKjEwMCk7XG4gICAgICAgICQoXCIjRHNJbXBvcnRpZXJlblByb2dyZXNzYmFyXCIpLmNzcygnd2lkdGgnLCBwcm96ZW50ICsnJScpLmF0dHIoJ2FyaWEtdmFsdWVub3cnLCBwcm96ZW50KTtcbiAgICAgICAgaWYgKGFuekRzSW1wb3J0aWVydCA+PSBhbnpEcy0xICYmIGFuekRzSW1wb3J0aWVydCA8PSBhbnpEcykge1xuICAgICAgICAgICAgLy8gUsO8Y2ttZWxkdW5nIGluIEZlbGQgYW56ZWlnZW46XG4gICAgICAgICAgICAkaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpcy5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgfVxuICAgIH0pOyovXG5cbiAgICAvLyBsaXN0ZW5lciBlaW5yaWNodGVuLCBkZXIgbWVsZGV0LCB3ZW5uIGVpbiBEYXRlbnNhdHogYWt0dWFsaXNpZXJ0IHd1cmRlXG4gICAgJChkb2N1bWVudCkuYmluZCgnYWRiLmRzX2hpbnp1Z2Vmw7xndCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhbnpfZHNfaW1wb3J0aWVydCsrO1xuICAgICAgICB2YXIgcHJvemVudCA9IE1hdGgucm91bmQoYW56X2RzX2ltcG9ydGllcnQvYW56X2RzKjEwMCksXG4gICAgICAgICAgICByw7xja21lbGR1bmc7XG4gICAgICAgICQoXCIjRHNJbXBvcnRpZXJlblByb2dyZXNzYmFyXCIpXG4gICAgICAgICAgICAuY3NzKCd3aWR0aCcsIHByb3plbnQgKyclJylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLXZhbHVlbm93JywgcHJvemVudCk7XG4gICAgICAgICQoXCIjRHNJbXBvcnRpZXJlblByb2dyZXNzYmFyVGV4dFwiKS5odG1sKHByb3plbnQgKyBcIiVcIik7XG4gICAgICAgICRpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKS5hZGRDbGFzcyhcImFsZXJ0LWluZm9cIik7XG4gICAgICAgIHLDvGNrbWVsZHVuZyA9IFwiRGllIERhdGVuIHd1cmRlbiBpbXBvcnRpZXJ0Ljxicj5EaWUgSW5kZXhlIHdlcmRlbiBha3R1YWxpc2llcnQuLi5cIjtcbiAgICAgICAgJGltcG9ydGllcmVuX2RzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dC5odG1sKHLDvGNrbWVsZHVuZyk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJGltcG9ydGllcmVuX2RzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXMub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgICBpZiAoYW56X2RzX2ltcG9ydGllcnQgPT09IGFuel9kcykge1xuICAgICAgICAgICAgLy8gZGllIEluZGV4ZVxuICAgICAgICAgICAgdmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuICAgICAgICAgICAgJGRiLnZpZXcoJ2FydGVuZGIvbHInLCB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1lbGRlbiwgZGFzcyB2aWV3cyBha3R1YWxpc2llcnQgd3VyZGVuXG4gICAgICAgICAgICAgICAgICAgICRpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzLnJlbW92ZUNsYXNzKFwiYWxlcnQtaW5mb1wiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKS5hZGRDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgIHLDvGNrbWVsZHVuZyA9IFwiRGllIERhdGVuIHd1cmRlbiBpbXBvcnRpZXJ0Ljxicj5cIjtcbiAgICAgICAgICAgICAgICAgICAgcsO8Y2ttZWxkdW5nICs9IFwiRGllIEluZGV4ZSB3dXJkZW4gYWt0dWFsaXNpZXJ0Ljxicj48YnI+XCI7XG4gICAgICAgICAgICAgICAgICAgIHLDvGNrbWVsZHVuZyArPSBcIk5hY2hmb2xnZW5kIExpbmtzIHp1IE9iamVrdGVuIG1pdCBpbXBvcnRpZXJ0ZW4gRGF0ZW4sIGRhbWl0IFNpZSBkYXMgUmVzdWx0YXQgw7xiZXJwcsO8ZmVuIGvDtm5uZW46PGJyPlwiO1xuICAgICAgICAgICAgICAgICAgICAkaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc190ZXh0Lmh0bWwocsO8Y2ttZWxkdW5nICsgcsO8Y2ttZWxkdW5nX2xpbmtzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUsO8Y2ttZWxkdW5ncy1saW5rcyBiZWhhbHRlbiwgZmFsbHMgZGVyIEJlbnV0emVyIGRpcmVrdCBhbnNjaGxpZXNzZW5kIGVudGZlcm50XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGIucsO8Y2ttZWxkdW5nX2xpbmtzID0gcsO8Y2ttZWxkdW5nX2xpbmtzO1xuICAgICAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICRpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIF8uZWFjaCh3aW5kb3cuYWRiLmRzRGF0ZW5zw6R0emUsIGZ1bmN0aW9uKGRzX2RhdGVuc2F0eikge1xuICAgICAgICAvLyBEYXRlbnNhbW1sdW5nIGFscyBPYmpla3QgZ3LDvG5kZW5cbiAgICAgICAgZGF0ZW5zYW1tbHVuZyA9IHt9O1xuICAgICAgICBkYXRlbnNhbW1sdW5nLk5hbWUgPSAkRHNOYW1lLnZhbCgpO1xuICAgICAgICBpZiAoJERzQmVzY2hyZWlidW5nLnZhbCgpKSB7XG4gICAgICAgICAgICBkYXRlbnNhbW1sdW5nLkJlc2NocmVpYnVuZyA9ICREc0Jlc2NocmVpYnVuZy52YWwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJERzRGF0ZW5zdGFuZC52YWwoKSkge1xuICAgICAgICAgICAgZGF0ZW5zYW1tbHVuZy5EYXRlbnN0YW5kID0gJERzRGF0ZW5zdGFuZC52YWwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJERzTGluay52YWwoKSkge1xuICAgICAgICAgICAgZGF0ZW5zYW1tbHVuZy5MaW5rID0gJERzTGluay52YWwoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmYWxscyBkaWUgRGF0ZW5zYW1tbHVuZyB6dXNhbW1lbmZhc3NlbmQgaXN0XG4gICAgICAgIGlmICgkKFwiI0RzWnVzYW1tZW5mYXNzZW5kXCIpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgZGF0ZW5zYW1tbHVuZy56dXNhbW1lbmZhc3NlbmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkRHNVcnNwcnVuZ3NEcy52YWwoKSkge1xuICAgICAgICAgICAgZGF0ZW5zYW1tbHVuZy5VcnNwcnVuZ3NkYXRlbnNhbW1sdW5nID0gJERzVXJzcHJ1bmdzRHMudmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0ZW5zYW1tbHVuZ1tcImltcG9ydGllcnQgdm9uXCJdID0gbG9jYWxTdG9yYWdlLkVtYWlsO1xuICAgICAgICAvLyBGZWxkZXIgZGVyIERhdGVuc2FtbWx1bmcgYWxzIE9iamVrdCBncsO8bmRlblxuICAgICAgICBkYXRlbnNhbW1sdW5nLkVpZ2Vuc2NoYWZ0ZW4gPSB7fTtcbiAgICAgICAgLy8gRmVsZGVyIGFuZsO8Z2VuLCB3ZW5uIHNpZSBXZXJ0ZSBlbnRoYWx0ZW5cbiAgICAgICAgYW56YWhsX2ZlbGRlciA9IDA7XG4gICAgICAgIF8uZWFjaChkc19kYXRlbnNhdHosIGZ1bmN0aW9uKGZlbGR3ZXJ0LCBmZWxkbmFtZSkge1xuICAgICAgICAgICAgLy8gbmljaHQgaW1wb3J0aWVydCB3aXJkIGRpZSBJRCB1bmQgbGVlcmUgRmVsZGVyXG4gICAgICAgICAgICAvLyB1bmQga2VpbmUgVGF4b25vbWllIElELCB3ZW5uIHNpZSBudXIgd2VnZW4gZGVyIElkZW50aWZpa2F0aW9uIG1pdGdlbGllZmVydCB3dXJkZVxuICAgICAgICAgICAgLy9pZiAoZmVsZG5hbWUgIT09IHdpbmRvdy5hZGIuRHNGZWxkZXJJZCAmJiBmZWxkd2VydCAhPT0gXCJcIiAmJiBmZWxkd2VydCAhPT0gbnVsbCAmJiAod2luZG93LmFkYi5Ec0lkICE9PSBcImd1aWRcIiAmJiBmZWxkbmFtZSAhPT0gXCJUYXhvbm9taWUgSURcIikpIHtcbiAgICAgICAgICAgIGlmIChmZWxkbmFtZSAhPT0gd2luZG93LmFkYi5Ec0ZlbGRlcklkICYmIGZlbGR3ZXJ0ICE9PSBcIlwiICYmIGZlbGR3ZXJ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZlbGR3ZXJ0ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBY2Nlc3MgbWFjaHQgaW4gQWJmcmFnZW4gbWl0IFdlbm4tS2xhdXNlbCBhdXMgdHJ1ZSAtMSA+IGtvcnJpZ2llcmVuXG4gICAgICAgICAgICAgICAgICAgIGRhdGVuc2FtbWx1bmcuRWlnZW5zY2hhZnRlbltmZWxkbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmVsZHdlcnQgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJ1ZS9mYWxzZSBuaWNodCBhbHMgc3RyaW5nIGltcG9ydGllcmVuXG4gICAgICAgICAgICAgICAgICAgIGRhdGVuc2FtbWx1bmcuRWlnZW5zY2hhZnRlbltmZWxkbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmVsZHdlcnQgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVuc2FtbWx1bmcuRWlnZW5zY2hhZnRlbltmZWxkbmFtZV0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZlbGR3ZXJ0ID09IHBhcnNlSW50KGZlbGR3ZXJ0LCAxMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2FuenphaGxlbiBhbHMgWmFobGVuIGltcG9ydGllcmVuXG4gICAgICAgICAgICAgICAgICAgIGRhdGVuc2FtbWx1bmcuRWlnZW5zY2hhZnRlbltmZWxkbmFtZV0gPSBwYXJzZUludChmZWxkd2VydCwgMTApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmVsZHdlcnQgPT0gcGFyc2VGbG9hdChmZWxkd2VydCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQnJ1Y2h6YWhsZW4gYWxzIFphaGxlbiBpbXBvcnRpZXJlblxuICAgICAgICAgICAgICAgICAgICBkYXRlbnNhbW1sdW5nLkVpZ2Vuc2NoYWZ0ZW5bZmVsZG5hbWVdID0gcGFyc2VGbG9hdChmZWxkd2VydCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm9ybWFsZmFsbFxuICAgICAgICAgICAgICAgICAgICBkYXRlbnNhbW1sdW5nLkVpZ2Vuc2NoYWZ0ZW5bZmVsZG5hbWVdID0gZmVsZHdlcnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFuemFobF9mZWxkZXIgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVudHNwcmVjaGVuZGVuIEluZGV4IMO2ZmZuZW5cbiAgICAgICAgLy8gc2ljaGVyc3RlbGxlbiwgZGFzcyBEYXRlbiB2b3Jrb21tZW4uIEdpYnQgc29uc3QgZWluZW4gRmVobGVyXG4gICAgICAgIGlmIChhbnphaGxfZmVsZGVyID4gMCkge1xuICAgICAgICAgICAgLy8gRGF0ZW5iYW5rYWJmcmFnZSBpc3QgbGFuZ3NhbS4gRXh0ZXJuIGF1ZnJ1ZmVuLFxuICAgICAgICAgICAgLy8gc29uc3Qgw7xiZXJob2x0IGRpZSBmb3ItU2NobGF1ZmUgdW5kIERhdGVuc2FtbWx1bmcgaXN0IGJpcyB6dXIgc2F2ZURvYy1BdXNmw7xocnVuZyBlaW5lIGFuZGVyZSFcbiAgICAgICAgICAgIHZhciBndWlkO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5hZGIuRHNJZCA9PT0gXCJndWlkXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBkaWUgaW4gZGVyIFRhYmVsbGUgbWl0Z2VsaWVmZXJ0ZSBpZCBpc3QgZGllIGd1aWRcbiAgICAgICAgICAgICAgICBndWlkID0gZHNfZGF0ZW5zYXR6W3dpbmRvdy5hZGIuRHNGZWxkZXJJZF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkc19kYXRlbnNhdHpfbWl0X3JpY2h0aWdlcl9pZCA9IF8uZmluZCh3aW5kb3cuYWRiLlp1b3JkYmFyZURhdGVuc8OkdHplLCBmdW5jdGlvbihkYXRlbnNhdHopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVuc2F0ei5JZCA9PSBkc19kYXRlbnNhdHpbd2luZG93LmFkYi5Ec0ZlbGRlcklkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBndWlkID0gZHNfZGF0ZW5zYXR6X21pdF9yaWNodGlnZXJfaWQuR3VpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGthbm4gc2VpbiwgZGFzcyBkZXIgZ3VpZCBvYmVuIG5pY2h0IHp1Z2VvcmRuZXQgd2VyZGVuIGtvbm50ZS4gRGFubiBuaWNodCBhbmbDvGdlblxuICAgICAgICAgICAgaWYgKGd1aWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImbDvGdlIGRzIHp1IG9iamVrdFwiKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRiLmbDvGdlRGF0ZW5zYW1tbHVuZ1p1T2JqZWt0KGd1aWQsIGRhdGVuc2FtbWx1bmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gRsO8ciAxMCBLb250cm9sbGJlaXNwaWVsZSBkaWUgTGlua3MgYXVmYmF1ZW5cbiAgICBpZiAod2luZG93LmFkYi5Ec0lkID09PSBcImd1aWRcIikge1xuICAgICAgICBlcnN0ZV8xMF9pZHMgPSBfLmZpcnN0KHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emUsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlcnN0ZV8xMF9pZHMgPSBfLnBsdWNrKF8uZmlyc3Qod2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZSwgMTApLCBcIkd1aWRcIik7XG4gICAgfVxuICAgIF8uZWFjaChlcnN0ZV8xMF9pZHMsIGZ1bmN0aW9uKGlkLCBpbmRleCkge1xuICAgICAgICBuciA9IGluZGV4ICsgMTtcbiAgICAgICAgcsO8Y2ttZWxkdW5nX2xpbmtzICs9ICc8YSBocmVmPVwiJyArICQobG9jYXRpb24pLmF0dHIoXCJwcm90b2NvbFwiKSArICcvLycgKyAkKGxvY2F0aW9uKS5hdHRyKFwiaG9zdFwiKSArICQobG9jYXRpb24pLmF0dHIoXCJwYXRobmFtZVwiKSArICc/aWQ9JyArIGlkICsgJ1wiICB0YXJnZXQ9XCJfYmxhbmtcIj5CZWlzcGllbCAnICsgbnIgKyAnPC9hPjxicj4nO1xuICAgIH0pO1xuXG4gICAgLy8gUsO8Y2ttZWxkdW5nIGluIEZlbGQgYW56ZWlnZW5cbiAgICAkaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpcy5yZW1vdmVDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIikucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIikuYWRkQ2xhc3MoXCJhbGVydC1pbmZvXCIpO1xuICAgIHLDvGNrbWVsZHVuZyA9IFwiRGllIERhdGVuIHdlcmRlbiBpbXBvcnRpZXJ0Li4uXCI7XG5cdCRpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzX3RleHQuaHRtbChyw7xja21lbGR1bmcpO1xuICAgICRpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiAkaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpcy5vZmZzZXQoKS50b3BcbiAgICB9LCAyMDAwKTtcblx0RHNJbXBvcnRpZXJ0LnJlc29sdmUoKTtcbn07XG5cbi8vIHdpcmQgbW9tZW50YW4gbmljaHQgYmVudXR6dFxud2luZG93LmFkYi5xdWVyeUNoYW5nZXNTdGFydGluZ05vdyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuc2luY2UgPSBcIm5vd1wiO1xuICAgIGlmIChvcHRpb25zLmZpbHRlcikge1xuICAgICAgICAvLyBkZXIgRmlsdGVyIGJyZW1zdCBkaWUgQWJmcmFnZSAtIGRhcyBpc3Qgc2NobGVjaHQsIHdlaWwgZGFubiBiZXJlaXRzIERTIGFrdHVhbGlzaWVydCB3dXJkZW4hXG4gICAgICAgIC8vIGRhaGVyIGbDvHIgZGllIEVyc3RhYmZyYWdlIGVudGZlcm5lblxuICAgICAgICB2YXIgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIHZhciBkc25hbWUgPSBvcHRpb25zLmRzbmFtZTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMudmlldztcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMuZHNuYW1lO1xuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcImdldFwiLFxuICAgICAgICB1cmw6IFwiL2FydGVuZGIvX2NoYW5nZXNcIixcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICBkYXRhOiBvcHRpb25zXG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xvbmdwb2xsLWRhdGEnLCBkYXRhLCBkYXRhLmxhc3Rfc2VxKTtcbiAgICAgICAgb3B0aW9ucy5mZWVkID0gXCJsb25ncG9sbFwiO1xuICAgICAgICBvcHRpb25zLnNpbmNlID0gZGF0YS5sYXN0X3NlcTtcbiAgICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgICAgICBvcHRpb25zLmRzbmFtZSA9IGRzbmFtZTtcbiAgICAgICAgfVxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJnZXRcIixcbiAgICAgICAgICAgIHVybDogXCIvYXJ0ZW5kYi9fY2hhbmdlc1wiLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgZGF0YTogb3B0aW9uc1xuICAgICAgICB9KVxuICAgICAgICAuZG9uZShmdW5jdGlvbihkYXRhMikge1xuICAgICAgICAgICAgaWYgKGRhdGEyLnJlc3VsdHMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdsb25ncG9sbC1kYXRhMicsIGRhdGEyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdGlvbnMuc2luY2UgPSBkYXRhMi5sYXN0X3NlcTtcbiAgICAgICAgICAgIC8vIGRhZsO8ciBzb3JnZW4sIGRhc3Mgd2VpdGVyIGJlb2JhY2h0ZXQgd2lyZFxuICAgICAgICAgICAgd2luZG93LmFkYi5xdWVyeUNoYW5nZXMob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLy8gd2lyZCBtb21lbnRhbiBuaWNodCBiZW51dHp0XG53aW5kb3cuYWRiLnF1ZXJ5Q2hhbmdlcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIG9wdGlvbnMuc2luY2UgPSBvcHRpb25zLnNpbmNlIHx8IFwibm93XCI7XG4gICAgb3B0aW9ucy5mZWVkID0gb3B0aW9ucy5mZWVkIHx8IFwibG9uZ3BvbGxcIjtcbiAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcImdldFwiLFxuICAgICAgICB1cmw6IFwiL2FydGVuZGIvX2NoYW5nZXNcIixcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICBkYXRhOiBvcHRpb25zXG4gICAgfSlcbiAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLnJlc3VsdHMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2xvbmdwb2xsLWRhdGEnLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnNpbmNlID0gZGF0YS5sYXN0X3NlcTtcbiAgICAgICAgd2luZG93LmFkYi5xdWVyeUNoYW5nZXMob3B0aW9ucyk7XG4gICAgfSk7XG59O1xuXG4vLyBiZWtvbW10IGRhcyBPYmpla3QgbWl0IGRlbiBEYXRlbnPDpHR6ZW4gKHdpbmRvdy5hZGIuYnNEYXRlbnPDpHR6ZSkgdW5kIGRpZSBMaXN0ZSBkZXIgenUgYWt0dWFsaXNpZXJlbmRlbiBEYXRlbnPDpHR6ZSAod2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZSlcbi8vIGhvbHQgc2ljaCBzZWxiZXIgZGllIGluIGRlbiBGZWxkZXJuIGVyZmFzc3RlbiBJbmZvcyBkZXIgRGF0ZW5zYW1tbHVuZ1xud2luZG93LmFkYi5pbXBvcnRpZXJlQmV6aWVodW5nc3NhbW1sdW5nID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGFuemFobF9mZWxkZXIsXG5cdFx0YW56YWhsX2JlemllaHVuZ3NzYW1tbHVuZ2VuID0gd2luZG93LmFkYi5ic0RhdGVuc8OkdHplLmxlbmd0aCxcbiAgICAgICAgYW56X2JzX2ltcG9ydGllcnQgPSAwLFxuICAgICAgICBlcnN0ZV8xMF9pZHMsXG4gICAgICAgIG5yLFxuICAgICAgICByw7xja21lbGR1bmcsXG4gICAgICAgIHLDvGNrbWVsZHVuZ19pbnRybyxcbiAgICAgICAgcsO8Y2ttZWxkdW5nX2xpbmtzID0gXCJcIixcblx0XHRic19pbXBvcnRpZXJ0ID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAkQnNOYW1lID0gJChcIiNCc05hbWVcIiksXG4gICAgICAgICRCc0Jlc2NocmVpYnVuZyA9ICQoXCIjQnNCZXNjaHJlaWJ1bmdcIiksXG4gICAgICAgICRCc0RhdGVuc3RhbmQgPSAkKFwiI0JzRGF0ZW5zdGFuZFwiKSxcbiAgICAgICAgJEJzTGluayA9ICQoXCIjQnNMaW5rXCIpLFxuICAgICAgICAkQnNVcnNwcnVuZ3NCcyA9ICQoXCIjQnNVcnNwcnVuZ3NCc1wiKSxcbiAgICAgICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXMgPSAkKFwiI2ltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNcIiksXG4gICAgICAgICRpbXBvcnRpZXJlbl9ic19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzX3RleHQgPSAkKFwiI2ltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dFwiKTtcblx0Ly8gcHLDvGZlbiwgb2IgZWluIEJzTmFtZSBlcmZhc3N0IHd1cmRlLiBXZW5uIG5pY2h0OiBtZWxkZW5cblx0aWYgKCEkQnNOYW1lLnZhbCgpKSB7XG5cdFx0JChcIiNtZWxkdW5nX2luZGl2aWR1ZWxsX2xhYmVsXCIpLmh0bWwoXCJOYW1lbiBmZWhsdFwiKTtcblx0XHQkKFwiI21lbGR1bmdfaW5kaXZpZHVlbGxfdGV4dFwiKS5odG1sKFwiQml0dGUgZ2ViZW4gU2llIGRlciBCZXppZWh1bmdzc2FtbWx1bmcgZWluZW4gTmFtZW5cIik7XG5cdFx0JChcIiNtZWxkdW5nX2luZGl2aWR1ZWxsX3NjaGxpZXNzZW5cIikuaHRtbChcInNjaGxpZXNzZW5cIik7XG5cdFx0JCgnI21lbGR1bmdfaW5kaXZpZHVlbGwnKS5tb2RhbCgpO1xuXHRcdCRCc05hbWUuZm9jdXMoKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBSw7xja21lbGR1bmcgaW4gRmVsZCBhbnplaWdlbjpcbiAgICByw7xja21lbGR1bmcgPSBcIkRpZSBEYXRlbiB3ZXJkZW4gaW1wb3J0aWVydC4uLlwiO1xuICAgICRpbXBvcnRpZXJlbl9ic19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzX3RleHQuaHRtbChyw7xja21lbGR1bmcpO1xuICAgICRpbXBvcnRpZXJlbl9ic19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIilcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtZGFuZ2VyXCIpXG4gICAgICAgIC5hZGRDbGFzcyhcImFsZXJ0LWluZm9cIik7XG4gICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXMuYWxlcnQoKS5zaG93KCk7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6ICRpbXBvcnRpZXJlbl9ic19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzLm9mZnNldCgpLnRvcFxuICAgIH0sIDIwMDApO1xuXG4gICAgLy8gbGlzdGVuZXIgZWlucmljaHRlbiwgZGVyIG1lbGRldCwgd2VubiBlaW4gRGF0ZW5zYXR6IGFrdHVhbGlzaWVydCB3dXJkZVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ2FkYi5ic19oaW56dWdlZsO8Z3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYW56X2JzX2ltcG9ydGllcnQrKztcbiAgICAgICAgdmFyIHByb3plbnQgPSBNYXRoLnJvdW5kKGFuel9ic19pbXBvcnRpZXJ0L2FuemFobF9iZXppZWh1bmdzc2FtbWx1bmdlbioxMDApO1xuICAgICAgICAkKFwiI0JzSW1wb3J0aWVyZW5Qcm9ncmVzc2JhclwiKVxuICAgICAgICAgICAgLmNzcygnd2lkdGgnLCBwcm96ZW50ICsnJScpXG4gICAgICAgICAgICAuYXR0cignYXJpYS12YWx1ZW5vdycsIHByb3plbnQpO1xuICAgICAgICAkKFwiI0JzSW1wb3J0aWVyZW5Qcm9ncmVzc2JhclRleHRcIikuaHRtbChwcm96ZW50ICsgXCIlXCIpO1xuICAgICAgICAkaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc1xuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtZGFuZ2VyXCIpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJhbGVydC1pbmZvXCIpXG4gICAgICAgICAgICAuc2hvdygpO1xuICAgICAgICByw7xja21lbGR1bmcgPSBcIkRpZSBEYXRlbiB3ZXJkZW4gaW1wb3J0aWVydC4uLjxicj5EaWUgSW5kZXhlIHdlcmRlbiBha3R1YWxpc2llcnQuLi5cIjtcbiAgICAgICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dC5odG1sKHLDvGNrbWVsZHVuZyk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXMub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgICBpZiAoYW56X2JzX2ltcG9ydGllcnQgPT09IGFuemFobF9iZXppZWh1bmdzc2FtbWx1bmdlbikge1xuICAgICAgICAgICAgLy8gSW5kaWNlcyBha3R1YWxpc2llcmVuXG4gICAgICAgICAgICB2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG4gICAgICAgICAgICAkZGIudmlldygnYXJ0ZW5kYi9scicsIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWVsZGVuLCBkYXNzIEluZGV4ZSBha3R1YWxpc2llcnQgd3VyZGVuXG4gICAgICAgICAgICAgICAgICAgICRpbXBvcnRpZXJlbl9ic19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1pbmZvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHLDvGNrbWVsZHVuZyA9IFwiRGllIERhdGVuIHd1cmRlbiBpbXBvcnRpZXJ0Ljxicj5cIjtcbiAgICAgICAgICAgICAgICAgICAgcsO8Y2ttZWxkdW5nICs9IFwiRGllIEluZGV4ZSB3dXJkZW4gbmV1IGF1ZmdlYmF1dC48YnI+PGJyPlwiO1xuICAgICAgICAgICAgICAgICAgICByw7xja21lbGR1bmcgKz0gXCJOYWNoZm9sZ2VuZCBMaW5rcyB6dSBPYmpla3RlbiBtaXQgaW1wb3J0aWVydGVuIERhdGVuLCBkYW1pdCBTaWUgZGFzIFJlc3VsdGF0IMO8YmVycHLDvGZlbiBrw7ZubmVuOjxicj5cIjtcbiAgICAgICAgICAgICAgICAgICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dC5odG1sKHLDvGNrbWVsZHVuZyArIHLDvGNrbWVsZHVuZ19saW5rcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFLDvGNrbWVsZHVuZ3MtbGlua3MgYmVoYWx0ZW4sIGZhbGxzIGRlciBCZW51dHplciBkaXJla3QgYW5zY2hsaWVzc2VuZCBlbnRmZXJudFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRiLnLDvGNrbWVsZHVuZ19saW5rcyA9IHLDvGNrbWVsZHVuZ19saW5rcztcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpcy5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXHQvLyB6dWVyc3Q6IFZlcmFubGFzc2VuLCBkYXNzIGRpZSBCZXppZWh1bmdzcGFydG5lciBpbiB3aW5kb3cuYWRiLmJzRGF0ZW5zw6R0emUgaW4gZWluZW4gQXJyYXkgZGVyIHJpY2h0aWdlbiBGb3JtIHVtZ2V3YW5kZWx0IHdlcmRlblxuXHQkLndoZW4od2luZG93LmFkYi5iZXJlaXRlQmV6aWVodW5nc3BhcnRuZXJGw7xySW1wb3J0Vm9yKCkpXG5cdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhbnphaGxfYmV6aWVodW5nc3NhbW1sdW5nZW4gPSAwO1xuXHRcdFx0XHR2YXIgYmV6aWVodW5nc3NhbW1sdW5nLFxuICAgICAgICAgICAgICAgICAgICBiZXppZWh1bmdzc2FtbWx1bmdfdm9ybGFnZSA9IHt9O1xuXHRcdFx0XHRiZXppZWh1bmdzc2FtbWx1bmdfdm9ybGFnZS5OYW1lID0gJEJzTmFtZS52YWwoKTtcblx0XHRcdFx0aWYgKCRCc0Jlc2NocmVpYnVuZy52YWwoKSkge1xuXHRcdFx0XHRcdGJlemllaHVuZ3NzYW1tbHVuZ192b3JsYWdlLkJlc2NocmVpYnVuZyA9ICRCc0Jlc2NocmVpYnVuZy52YWwoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoJEJzRGF0ZW5zdGFuZC52YWwoKSkge1xuXHRcdFx0XHRcdGJlemllaHVuZ3NzYW1tbHVuZ192b3JsYWdlLkRhdGVuc3RhbmQgPSAkQnNEYXRlbnN0YW5kLnZhbCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkQnNMaW5rLnZhbCgpKSB7XG5cdFx0XHRcdFx0YmV6aWVodW5nc3NhbW1sdW5nX3ZvcmxhZ2UuTGluayA9ICRCc0xpbmsudmFsKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmFsbHMgZGllIERhdGVuc2FtbWx1bmcgenVzYW1tZW5mYXNzZW5kIGlzdFxuXHRcdFx0XHRpZiAoJChcIiNCc1p1c2FtbWVuZmFzc2VuZFwiKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdFx0XHRiZXppZWh1bmdzc2FtbWx1bmdfdm9ybGFnZS56dXNhbW1lbmZhc3NlbmQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkQnNVcnNwcnVuZ3NCcy52YWwoKSkge1xuXHRcdFx0XHRcdGJlemllaHVuZ3NzYW1tbHVuZ192b3JsYWdlLlVyc3BydW5nc2RhdGVuc2FtbWx1bmcgPSAkQnNVcnNwcnVuZ3NCcy52YWwoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRiZXppZWh1bmdzc2FtbWx1bmdfdm9ybGFnZVtcImltcG9ydGllcnQgdm9uXCJdID0gbG9jYWxTdG9yYWdlLkVtYWlsO1xuXHRcdFx0XHRiZXppZWh1bmdzc2FtbWx1bmdfdm9ybGFnZS5CZXppZWh1bmdlbiA9IFtdO1xuXHRcdFx0XHQvLyB6dW7DpGNoc3QgZGVuIEFycmF5IHZvbiBPYmpla3RlbiBpbiBlaW4gT2JqZWt0IG1pdCBFaWdlbnNjaGFmdGVuID0gT2JqZWt0R3VpZCB1bmQgZGFyaW4gQXJyYXkgbWl0IGFsbGVuIMO8YnJpZ2VuIERhdGVuIHZlcndhbmRlbG5cblx0XHRcdFx0dmFyIGJzX2RhdGVuc8OkdHplX29iamVrdCA9IF8uZ3JvdXBCeSh3aW5kb3cuYWRiLmJzRGF0ZW5zw6R0emUsIGZ1bmN0aW9uKG9iamVrdCkge1xuXHRcdFx0XHRcdC8vIGlkIGluIGd1aWQgdW13YW5kZWxuXG5cdFx0XHRcdFx0dmFyIGd1aWQ7XG5cdFx0XHRcdFx0aWYgKHdpbmRvdy5hZGIuQnNJZCA9PT0gXCJndWlkXCIpIHtcblx0XHRcdFx0XHRcdC8vIGRpZSBpbiBkZXIgVGFiZWxsZSBtaXRnZWxpZWZlcnRlIGlkIGlzdCBkaWUgZ3VpZFxuXHRcdFx0XHRcdFx0Z3VpZCA9IG9iamVrdFt3aW5kb3cuYWRiLkJzRmVsZGVySWRdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBxID0gMDsgcSA8IHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emUubGVuZ3RoOyBxKyspIHtcblx0XHRcdFx0XHRcdFx0Ly8gaW4gZGVuIHp1b3JkYmFyZW4gRGF0ZW5zw6R0emVuIG5hY2ggZGVtIE9iamVrdCBtaXQgZGVyIHJpY2h0aWdlbiBpZCBzdWNoZW5cblx0XHRcdFx0XHRcdFx0aWYgKHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emVbcV0uSWQgPT0gb2JqZWt0W3dpbmRvdy5hZGIuQnNGZWxkZXJJZF0pIHtcblx0XHRcdFx0XHRcdFx0XHQvLyB1bmQgZGllIGd1aWQgYXVzbGVzZW5cblx0XHRcdFx0XHRcdFx0XHRndWlkID0gd2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZVtxXS5HdWlkO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG9iamVrdC5HVUlEID0gZ3VpZDtcblx0XHRcdFx0XHRyZXR1cm4gb2JqZWt0LkdVSUQ7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvLyBqZXR6dCBkdXJjaCBkaWUgR1VJRCdzIGxvb3BlbiB1bmQgZGllIGpld2VpbGlnZW4gQmV6aWVodW5nZW4gYW5ow6RuZ2VuXG5cdFx0XHRcdCQuZWFjaChic19kYXRlbnPDpHR6ZV9vYmpla3QsIGZ1bmN0aW9uKGltcG9ydGRhdGVuX29iamVrdF9pZCwgaW1wb3J0ZGF0ZW5fZmVsZGVyX2FycmF5KSB7XG5cdFx0XHRcdFx0dmFyIGJlemllaHVuZ2VuID0gW107XG5cdFx0XHRcdFx0YW56YWhsX2JlemllaHVuZ3NzYW1tbHVuZ2VuICs9IDE7XG5cdFx0XHRcdFx0Ly8gQmV6aWVodW5nc3NhbW1sdW5nIGFscyBPYmpla3QgZ3LDvG5kZW4sIGluZGVtIGRpZSBWb3JsYWdlIGtvcGllcnQgd2lyZFxuXHRcdFx0XHRcdGJlemllaHVuZ3NzYW1tbHVuZyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIGJlemllaHVuZ3NzYW1tbHVuZ192b3JsYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGltcG9ydGRhdGVuX2ZlbGRlcl9hcnJheSwgZnVuY3Rpb24oaW1wb3J0ZGF0ZW5fZmVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZHVyY2ggZGllIEZlbGRlciBkZXIgQmV6aWVodW5nZW4gbG9vcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICBhbnphaGxfZmVsZGVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZlbGRlciBkZXIgQmV6aWVodW5nc3NhbW1sdW5nIGFscyBPYmpla3QgZ3LDvG5kZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZXppZWh1bmcgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZWFjaChpbXBvcnRkYXRlbl9mZWxkLCBmdW5jdGlvbihmZWxkd2VydCwgZmVsZG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkdXJjaCBkaWUgRmVsZGVyIGRlciBCZXppZWh1bmcgbG9vcGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmljaHQgaW1wb3J0aWVydCB3aXJkIGRpZSBHVUlEIHVuZCBsZWVyZSBGZWxkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmVsZG5hbWUgIT09IFwiR1VJRFwiICYmIGZlbGR3ZXJ0ICE9PSBcIlwiICYmIGZlbGR3ZXJ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZWxkd2VydCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFjY2VzcyBtYWNodCBpbiBBYmZyYWdlbiBtaXQgV2Vubi1LbGF1c2VsIGF1cyB0cnVlIC0xID4ga29ycmlnaWVyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlemllaHVuZ1tmZWxkbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZlbGR3ZXJ0ID09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0cnVlL2ZhbHNlIG5pY2h0IGFscyBzdHJpbmcgaW1wb3J0aWVyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlemllaHVuZ1tmZWxkbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZlbGR3ZXJ0ID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmV6aWVodW5nW2ZlbGRuYW1lXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZlbGR3ZXJ0ID09IHBhcnNlSW50KGZlbGR3ZXJ0LCAxMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdhbnp6YWhsZW4gYWxzIFphaGxlbiBpbXBvcnRpZXJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmV6aWVodW5nW2ZlbGRuYW1lXSA9IHBhcnNlSW50KGZlbGR3ZXJ0LCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmVsZHdlcnQgPT0gcGFyc2VGbG9hdChmZWxkd2VydCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJydWNoemFobGVuIGFscyBaYWhsZW4gaW1wb3J0aWVyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlemllaHVuZ1tmZWxkbmFtZV0gPSBwYXJzZUZsb2F0KGZlbGR3ZXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmZWxkbmFtZSA9PSBcIkJlemllaHVuZ3NwYXJ0bmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlemllaHVuZ1tmZWxkbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGR1cmNoIEJlemllaHVuZ3NwYXJ0bmVyIGxvb3BlbiB1bmQgR1VJRFMgbWl0IE9iamVrdGVuIGVyc2V0emVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmVhY2goZmVsZHdlcnQsIGZ1bmN0aW9uKGJlemllaHVuZ3NwYXJ0bmVyX2ZlbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXppZWh1bmdbZmVsZG5hbWVdLnB1c2god2luZG93LmFkYi5iZXpQYXJ0bmVyX29iamVrdFtiZXppZWh1bmdzcGFydG5lcl9mZWxkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vcm1hbGZhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlemllaHVuZ1tmZWxkbmFtZV0gPSBmZWxkd2VydDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnphaGxfZmVsZGVyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW56YWhsX2ZlbGRlciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXppZWh1bmdlbi5wdXNoKGJlemllaHVuZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFx0XHRcdC8vIGVudHNwcmVjaGVuZGVuIEluZGV4IMO2ZmZuZW5cblx0XHRcdFx0XHQvLyBzaWNoZXJzdGVsbGVuLCBkYXNzIERhdGVuIHZvcmtvbW1lbi4gR2lidCBzb25zdCBlaW5lbiBGZWhsZXJcblx0XHRcdFx0XHRpZiAoYmV6aWVodW5nZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0Ly8gRGF0ZW5iYW5rYWJmcmFnZSBpc3QgbGFuZ3NhbS4gRXh0ZXJuIGF1ZnJ1ZmVuLCBcblx0XHRcdFx0XHRcdC8vIHNvbnN0IMO8YmVyaG9sdCBkaWUgZm9yLVNjaGxhdWZlIHVuZCBCZXppZWh1bmdzc2FtbWx1bmcgaXN0IGJpcyB6dXIgc2F2ZURvYy1BdXNmw7xocnVuZyBlaW5lIGFuZGVyZSFcblx0XHRcdFx0XHRcdHdpbmRvdy5hZGIuZsO8Z2VCZXppZWh1bmdlblp1T2JqZWt0KGltcG9ydGRhdGVuX29iamVrdF9pZCwgYmV6aWVodW5nc3NhbW1sdW5nLCBiZXppZWh1bmdlbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuICAgICAgICAgICAgICAgIC8vIEbDvHIgMTAgS29udHJvbGxiZWlzcGllbGUgZGllIExpbmtzIGF1ZmJhdWVuXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5hZGIuQnNJZCA9PT0gXCJndWlkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJzdGVfMTBfaWRzID0gXy5maXJzdCh3aW5kb3cuYWRiLlp1b3JkYmFyZURhdGVuc8OkdHplLCAxMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJzdGVfMTBfaWRzID0gXy5wbHVjayhfLmZpcnN0KHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emUsIDEwKSwgXCJHdWlkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfLmVhY2goZXJzdGVfMTBfaWRzLCBmdW5jdGlvbihpZCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbnIgPSBpbmRleCArMTtcbiAgICAgICAgICAgICAgICAgICAgcsO8Y2ttZWxkdW5nX2xpbmtzICs9ICc8YSBocmVmPVwiJyArICQobG9jYXRpb24pLmF0dHIoXCJwcm90b2NvbFwiKSArICcvLycgKyAkKGxvY2F0aW9uKS5hdHRyKFwiaG9zdFwiKSArICQobG9jYXRpb24pLmF0dHIoXCJwYXRobmFtZVwiKSArICc/aWQ9JyArIGlkICsgJ1wiICB0YXJnZXQ9XCJfYmxhbmtcIj5CZWlzcGllbCAnICsgbnIgKyAnPC9hPjxicj4nO1xuICAgICAgICAgICAgICAgIH0pO1xuXHRcdFx0XHRic19pbXBvcnRpZXJ0LnJlc29sdmUoKTtcblx0XHRcdH0sIDEwMDApO1xuXHRcdH0pO1xuXHRyZXR1cm4gYnNfaW1wb3J0aWVydC5wcm9taXNlKCk7XG59O1xuXG53aW5kb3cuYWRiLmJlcmVpdGVCZXppZWh1bmdzcGFydG5lckbDvHJJbXBvcnRWb3IgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgYWxsZV9iZXpfcGFydG5lcl9hcnJheSA9IFtdLFxuXHRcdGJlel9wYXJ0bmVyX2FycmF5LFxuXHRcdGJlemllaHVuZ3NwYXJ0bmVyX3ZvcmJlcmVpdGV0ID0gJC5EZWZlcnJlZCgpO1xuXHR3aW5kb3cuYWRiLmJlelBhcnRuZXJfb2JqZWt0ID0ge307XG5cbiAgICBfLmVhY2god2luZG93LmFkYi5ic0RhdGVuc8OkdHplLCBmdW5jdGlvbihic19kYXRlbnNhdHopIHtcbiAgICAgICAgaWYgKGJzX2RhdGVuc2F0ei5CZXppZWh1bmdzcGFydG5lcikge1xuICAgICAgICAgICAgLy8gYnNfZGF0ZW5zYXR6LkJlemllaHVuZ3NwYXJ0bmVyIGlzdCBlaW5lIGtvbW1hZ2V0cmVubnRlIExpc3RlIHZvbiBndWlkc1xuICAgICAgICAgICAgLy8gZGllc2UgTGlzdGUgaW4gQXJyYXkgdmVyd2FuZGVsblxuICAgICAgICAgICAgYmV6X3BhcnRuZXJfYXJyYXkgPSBic19kYXRlbnNhdHouQmV6aWVodW5nc3BhcnRuZXIuc3BsaXQoXCIsIFwiKTtcbiAgICAgICAgICAgIC8vIHVuZCBpbiB3aW5kb3cuYWRiLmJzRGF0ZW5zw6R0emUgbmFjaGbDvGhyZW5cbiAgICAgICAgICAgIGJzX2RhdGVuc2F0ei5CZXppZWh1bmdzcGFydG5lciA9IGJlel9wYXJ0bmVyX2FycmF5O1xuICAgICAgICAgICAgLy8gdW5kIHZvbGxzdMOkbmRpZ2UgTGlzdGUgYWxsZXIgQmV6aWVodW5nc3BhcnRuZXIgbmFjaGbDvGhyZW5cbiAgICAgICAgICAgIGFsbGVfYmV6X3BhcnRuZXJfYXJyYXkgPSBfLnVuaW9uKGFsbGVfYmV6X3BhcnRuZXJfYXJyYXksIGJlel9wYXJ0bmVyX2FycmF5KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXHQvLyBqZXR6dCB3b2xsZW4gd2lyIGVpbiBPYmpla3QgYmF1ZW4sIGRhcyBmw7xyIGFsbGUgQmV6aWVodW5nc3BhcnRuZXIgZGFzIGF1c3p1dGF1c2NoZW5kZSBPYmpla3QgZW50aMOkbHRcblx0Ly8gZGFuYWNoIGbDvHIgamVkZSBndWlkIEdydXBwZSwgVGF4b25vbWllIChiZWkgTFIpIHVuZCBOYW1lIGhvbGVuIHVuZCBlaW4gT2JqZWt0IGRyYXVzIG1hY2hlblxuXHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdCRkYi52aWV3KCdhcnRlbmRiL2FsbF9kb2NzP2tleXM9JyArIGVuY29kZVVSSShKU09OLnN0cmluZ2lmeShhbGxlX2Jlel9wYXJ0bmVyX2FycmF5KSkgKyAnJmluY2x1ZGVfZG9jcz10cnVlJywge1xuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdHZhciBvYmpla3Q7XG5cdFx0XHR2YXIgYmV6X3BhcnRuZXI7XG4gICAgICAgICAgICBfLmVhY2goZGF0YS5yb3dzLCBmdW5jdGlvbihkYXRhX3Jvdykge1xuICAgICAgICAgICAgICAgIG9iamVrdCA9IGRhdGFfcm93LmRvYztcbiAgICAgICAgICAgICAgICBiZXpfcGFydG5lciA9IHt9O1xuICAgICAgICAgICAgICAgIGJlel9wYXJ0bmVyLkdydXBwZSA9IG9iamVrdC5HcnVwcGU7XG4gICAgICAgICAgICAgICAgaWYgKG9iamVrdC5HcnVwcGUgPT09IFwiTGViZW5zcsOkdW1lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYmV6X3BhcnRuZXIuVGF4b25vbWllID0gb2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLlRheG9ub21pZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5UYXhvbm9taWUuTGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlel9wYXJ0bmVyLk5hbWUgPSBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uTGFiZWwgKyBcIjogXCIgKyBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uVGF4b25vbWllLkVpbmhlaXQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXpfcGFydG5lci5OYW1lID0gb2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkVpbmhlaXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBiZXpfcGFydG5lci5OYW1lID0gb2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuW1wiQXJ0bmFtZSB2b2xsc3TDpG5kaWdcIl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJlel9wYXJ0bmVyLkdVSUQgPSBvYmpla3QuX2lkO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGIuYmV6UGFydG5lcl9vYmpla3Rbb2JqZWt0Ll9pZF0gPSBiZXpfcGFydG5lcjtcbiAgICAgICAgICAgIH0pO1xuXHRcdH1cblx0fSk7XG5cdGJlemllaHVuZ3NwYXJ0bmVyX3ZvcmJlcmVpdGV0LnJlc29sdmUoKTtcblx0cmV0dXJuIGJlemllaHVuZ3NwYXJ0bmVyX3ZvcmJlcmVpdGV0LnByb21pc2UoKTtcbn07XG5cbi8vIGJla29tbXQgZGFzIE9iamVrdCBtaXQgZGVuIERhdGVuc8OkdHplbiAod2luZG93LmFkYi5kc0RhdGVuc8OkdHplKSB1bmQgZGllIExpc3RlIGRlciB6dSBha3R1YWxpc2llcmVuZGVuIERhdGVuc8OkdHplICh3aW5kb3cuYWRiLlp1b3JkYmFyZURhdGVuc8OkdHplKVxuLy8gaG9sdCBzaWNoIHNlbGJlciBkZW4gaW4gZGVuIEZlbGRlcm4gZXJmYXNzdGVuIE5hbWVuIGRlciBEYXRlbnNhbW1sdW5nXG53aW5kb3cuYWRiLmVudGZlcm5lRGF0ZW5zYW1tbHVuZyA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBndWlkX2FycmF5ID0gW10sXG4gICAgICAgIGd1aWRfYXJyYXlfMiA9IFtdLFxuXHRcdGd1aWQsXG5cdFx0ZHNfZW50ZmVybnQgPSAkLkRlZmVycmVkKCksXG5cdFx0YSxcblx0XHRiYXRjaCxcblx0XHRiYXRjaF9ncsO2c3NlLFxuICAgICAgICBhbnpfdm9ya29tbWVuX3Zvbl9kcyA9IHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emUubGVuZ3RoLFxuICAgICAgICBhbnpfdm9ya29tbWVuX3Zvbl9kc19lbnRmZXJudCA9IDAsXG4gICAgICAgIHLDvGNrbWVsZHVuZyxcbiAgICAgICAgJGltcG9ydGllcmVuX2RzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dCA9ICQoXCIjaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc190ZXh0XCIpLFxuICAgICAgICAkaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2VpcyA9ICQoXCIjaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc1wiKTtcblxuICAgIC8vIGxpc3RlbmVyIGVpbnJpY2h0ZW4sIGRlciBtZWxkZXQsIHdlbm4gZWkgRGF0ZW5zYXR6IGVudGZlcm50IHd1cmRlXG4gICAgJChkb2N1bWVudCkuYmluZCgnYWRiLmRzX2VudGZlcm50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFuel92b3Jrb21tZW5fdm9uX2RzX2VudGZlcm50Kys7XG4gICAgICAgIHZhciBwcm96ZW50ID0gTWF0aC5yb3VuZCgoYW56X3ZvcmtvbW1lbl92b25fZHMtYW56X3ZvcmtvbW1lbl92b25fZHNfZW50ZmVybnQpL2Fuel92b3Jrb21tZW5fdm9uX2RzKjEwMCk7XG4gICAgICAgICQoXCIjRHNJbXBvcnRpZXJlblByb2dyZXNzYmFyXCIpXG4gICAgICAgICAgICAuY3NzKCd3aWR0aCcsIHByb3plbnQgKyclJylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLXZhbHVlbm93JywgcHJvemVudCk7XG4gICAgICAgICQoXCIjRHNJbXBvcnRpZXJlblByb2dyZXNzYmFyVGV4dFwiKS5odG1sKHByb3plbnQgKyBcIiVcIik7XG4gICAgICAgICRpbXBvcnRpZXJlbl9kc19pbXBvcnRfYXVzZnVlaHJlbl9oaW53ZWlzLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKS5hZGRDbGFzcyhcImFsZXJ0LWluZm9cIik7XG4gICAgICAgIHLDvGNrbWVsZHVuZyA9IFwiRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4gd2VyZGVuIGVudGZlcm50Li4uPGJyPkRpZSBJbmRleGUgd2VyZGVuIG5ldSBhdWZnZWJhdXQuLi5cIjtcbiAgICAgICAgJGltcG9ydGllcmVuX2RzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dC5odG1sKHLDvGNrbWVsZHVuZyk7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJGltcG9ydGllcmVuX2RzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dC5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIGlmIChhbnpfdm9ya29tbWVuX3Zvbl9kc19lbnRmZXJudCA9PT0gYW56X3ZvcmtvbW1lbl92b25fZHMpIHtcbiAgICAgICAgICAgIC8vIGRpZSBJbmRleGUgYWt0dWFsaXNpZXJlblxuICAgICAgICAgICAgdmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuICAgICAgICAgICAgJGRiLnZpZXcoJ2FydGVuZGIvbHInLCB7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1lbGRlbiwgZGFzcyBJbmRleGUgYWt0dWFsaXNpZXJ0IHd1cmRlblxuICAgICAgICAgICAgICAgICAgICAkaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpcy5yZW1vdmVDbGFzcyhcImFsZXJ0LWluZm9cIikucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIikuYWRkQ2xhc3MoXCJhbGVydC1zdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICByw7xja21lbGR1bmcgPSBcIkRpZSBFaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiB3dXJkZW4gZW50ZmVybnQuPGJyPlwiO1xuICAgICAgICAgICAgICAgICAgICByw7xja21lbGR1bmcgKz0gXCJEaWUgSW5kZXhlIHd1cmRlbiBha3R1YWxpc2llcnQuXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYWRiLnLDvGNrbWVsZHVuZ19saW5rcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcsO8Y2ttZWxkdW5nICs9IFwiPGJyPjxicj5OYWNoZm9sZ2VuZCBMaW5rcyB6dSBPYmpla3RlbiBtaXQgaW1wb3J0aWVydGVuIERhdGVuLCBkYW1pdCBTaWUgZGFzIFJlc3VsdGF0IMO8YmVycHLDvGZlbiBrw7ZubmVuOjxicj5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHLDvGNrbWVsZHVuZyArPSB3aW5kb3cuYWRiLnLDvGNrbWVsZHVuZ19saW5rcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3cuYWRiLnLDvGNrbWVsZHVuZ19saW5rcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc190ZXh0Lmh0bWwocsO8Y2ttZWxkdW5nKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkaW1wb3J0aWVyZW5fZHNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc190ZXh0Lm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgXy5lYWNoKHdpbmRvdy5hZGIuZHNEYXRlbnPDpHR6ZSwgZnVuY3Rpb24oZGF0ZW5zYXR6KSB7XG4gICAgICAgIC8vIHp1ZXJzdCBkaWUgaWQgaW4gZ3VpZCDDvGJlcnNldHplblxuICAgICAgICBpZiAod2luZG93LmFkYi5Ec0lkID09PSBcImd1aWRcIikge1xuICAgICAgICAgICAgLy8gZGllIGluIGRlciBUYWJlbGxlIG1pdGdlbGllZmVydGUgaWQgaXN0IGRpZSBndWlkXG4gICAgICAgICAgICBndWlkID0gZGF0ZW5zYXR6LkdVSUQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbiBkZW4genVvcmRiYXJlbiBEYXRlbnPDpHR6ZW4gbmFjaCBkZW0gT2JqZWt0IG1pdCBkZXIgcmljaHRpZ2VuIGlkIHN1Y2hlblxuICAgICAgICAgICAgLy8gdW5kIGRpZSBndWlkIGF1c2xlc2VuXG4gICAgICAgICAgICBndWlkID0gXy5maW5kKHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emUsIGZ1bmN0aW9uKGRhdGVuc2F0eikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlbnNhdHouSWQgPT0gZGF0ZW5zYXR6W3dpbmRvdy5hZGIuRHNGZWxkZXJJZF07XG4gICAgICAgICAgICB9KS5HdWlkO1xuICAgICAgICAgICAgLyogVE9ETzogbMO2c2NoZW4sIHdlbm4gb2JpZ2VyIENvZGUgZ2V0ZXN0ZXQgaXN0XG4gICAgICAgICAgICBmb3IgKHEgPSAwOyBxIDwgd2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZS5sZW5ndGg7IHErKykge1xuICAgICAgICAgICAgICAgIC8vIGluIGRlbiB6dW9yZGJhcmVuIERhdGVuc8OkdHplbiBuYWNoIGRlbSBPYmpla3QgbWl0IGRlciByaWNodGlnZW4gaWQgc3VjaGVuXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emVbcV0uSWQgPT0gZGF0ZW5zYXR6W3dpbmRvdy5hZGIuRHNGZWxkZXJJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kIGRpZSBndWlkIGF1c2xlc2VuXG4gICAgICAgICAgICAgICAgICAgIGd1aWQgPSB3aW5kb3cuYWRiLlp1b3JkYmFyZURhdGVuc8OkdHplW3FdLkd1aWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuICAgICAgICB9XG4gICAgICAgIC8vIEVpbmVuIEFycmF5IGRlciBpZCdzIGVyc3RlbGxlblxuICAgICAgICBndWlkX2FycmF5LnB1c2goZ3VpZCk7XG4gICAgfSk7XG5cdC8vIGFsbGUgZG9jcyBnbGVpY2h6ZWl0aWcgaG9sZW5cblx0Ly8gYWJlciBiYXRjaHdlaXNlXG5cdGJhdGNoID0gMTUwO1xuXHRiYXRjaF9ncsO2c3NlID0gMTUwO1xuXHRmb3IgKGE9MDsgYTxiYXRjaDsgYSsrKSB7XG5cdFx0aWYgKGEgPCBndWlkX2FycmF5Lmxlbmd0aCkge1xuXHRcdFx0Z3VpZF9hcnJheV8yLnB1c2goZ3VpZF9hcnJheVthXSk7XG5cdFx0XHRpZiAoYSA9PT0gKGJhdGNoLTEpKSB7XG5cdFx0XHRcdHdpbmRvdy5hZGIuZW50ZmVybmVEYXRlbnNhbW1sdW5nXzIoJChcIiNEc05hbWVcIikudmFsKCksIGd1aWRfYXJyYXlfMiwgKGEtYmF0Y2hfZ3LDtnNzZSkpO1xuXHRcdFx0XHRndWlkX2FycmF5XzIgPSBbXTtcblx0XHRcdFx0YmF0Y2ggKz0gYmF0Y2hfZ3LDtnNzZTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LmFkYi5lbnRmZXJuZURhdGVuc2FtbWx1bmdfMigkKFwiI0RzTmFtZVwiKS52YWwoKSwgZ3VpZF9hcnJheV8yLCAoYSAtIGJhdGNoX2dyw7Zzc2UpKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZHNfZW50ZmVybnQucHJvbWlzZSgpO1xufTtcblxud2luZG93LmFkYi5lbnRmZXJuZURhdGVuc2FtbWx1bmdfMiA9IGZ1bmN0aW9uKGRzX25hbWUsIGd1aWRfYXJyYXksIHZlcnrDtmdlcnVuZ3NfZmFrdG9yKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8gYWxsZSBkb2NzIGhvbGVuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0dmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuXHRcdCRkYi52aWV3KCdhcnRlbmRiL2FsbF9kb2NzP2tleXM9JyArIGVuY29kZVVSSShKU09OLnN0cmluZ2lmeShndWlkX2FycmF5KSkgKyAnJmluY2x1ZGVfZG9jcz10cnVlJywge1xuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHR2YXIgT2JqZWt0O1xuICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhLnJvd3MsIGZ1bmN0aW9uKGRhdGFfcm93KSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVrdCA9IGRhdGFfcm93LmRvYztcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkYi5lbnRmZXJuZURhdGVuc2FtbWx1bmdBdXNPYmpla3QoZHNfbmFtZSwgT2JqZWt0KTtcbiAgICAgICAgICAgICAgICB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSwgdmVyesO2Z2VydW5nc19mYWt0b3IqNDApO1xufTtcblxud2luZG93LmFkYi5lbnRmZXJuZURhdGVuc2FtbWx1bmdBdXNPYmpla3QgPSBmdW5jdGlvbihkc19uYW1lLCBvYmpla3QpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHRpZiAob2JqZWt0LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuICYmIG9iamVrdC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8qIGhhdCBuaWNodCBmdW5rdGlvbmllcnRcbiAgICAgICAgdmFyIGRhdGVuc2FtbWx1bmcgPSBfLmZpbmQob2JqZWt0LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuLCBmdW5jdGlvbihkYXRlbnNhbW1sdW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZW5zYW1tbHVuZy5OYW1lID09PSBkc19uYW1lO1xuICAgICAgICB9KTtcbiAgICAgICAgb2JqZWt0LkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuID0gXy53aXRob3V0KE9iamVrdC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiwgZGF0ZW5zYW1tbHVuZyk7XG4gICAgICAgICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuICAgICAgICAkZGIuc2F2ZURvYyhvYmpla3QpOyovXG5cdFx0Zm9yICh2YXIgaT0wOyBpPG9iamVrdC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKG9iamVrdC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbltpXS5OYW1lID09PSBkc19uYW1lKSB7XG5cdFx0XHRcdG9iamVrdC5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbi5zcGxpY2UoaSwxKTtcblx0XHRcdFx0dmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuXHRcdFx0XHQkZGIuc2F2ZURvYyhvYmpla3QpO1xuICAgICAgICAgICAgICAgIC8vIG1pdHRlaWxlbiwgZGFzcyBlaW5lIGRzIGVudGZlcm50IHd1cmRlXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignYWRiLmRzX2VudGZlcm50Jyk7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogU2NoZWl0ZXJuIGFiZmFuZ2VuICh0cmlnZ2VyIGFkYi5kc19uaWNodF9lbnRmZXJudClcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG4vLyBiZWtvbW10IGRhcyBPYmpla3QgbWl0IGRlbiBEYXRlbnPDpHR6ZW4gKHdpbmRvdy5hZGIuYnNEYXRlbnPDpHR6ZSkgdW5kIGRpZSBMaXN0ZSBkZXIgenUgYWt0dWFsaXNpZXJlbmRlbiBEYXRlbnPDpHR6ZSAod2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZSlcbi8vIGhvbHQgc2ljaCBzZWxiZXIgZGVuIGluIGRlbiBGZWxkZXJuIGVyZmFzc3RlbiBOYW1lbiBkZXIgQmV6aWVodW5nc3NhbW1sdW5nXG53aW5kb3cuYWRiLmVudGZlcm5lQmV6aWVodW5nc3NhbW1sdW5nID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGd1aWRfYXJyYXkgPSBbXSxcbiAgICAgICAgZ3VpZF9hcnJheV8yID0gW10sXG5cdFx0Z3VpZCxcblx0XHRic19uYW1lID0gJChcIiNCc05hbWVcIikudmFsKCksXG5cdFx0YnNfZW50ZmVybnQgPSAkLkRlZmVycmVkKCksXG5cdFx0cSxcblx0XHRhLFxuXHRcdGJhdGNoID0gMTUwLFxuXHRcdGJhdGNoX2dyw7Zzc2UgPSAxNTAsXG4gICAgICAgIGFuel92b3Jrb21tZW5fdm9uX2JzX2VudGZlcm50ID0gMCxcbiAgICAgICAgYW56X3ZvcmtvbW1lbl92b25fYnMgPSB3aW5kb3cuYWRiLlp1b3JkYmFyZURhdGVuc8OkdHplLmxlbmd0aCxcbiAgICAgICAgcsO8Y2ttZWxkdW5nLFxuICAgICAgICAkaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2VpcyA9ICQoXCIjaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc1wiKSxcbiAgICAgICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dCA9ICQoXCIjaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc190ZXh0XCIpO1xuXG4gICAgLy8gbGlzdGVuZXIgZWlucmljaHRlbiwgZGVyIG1lbGRldCwgd2VubiBlaSBEYXRlbnNhdHogZW50ZmVybnQgd3VyZGVcbiAgICAkKGRvY3VtZW50KS5iaW5kKCdhZGIuYnNfZW50ZmVybnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYW56X3ZvcmtvbW1lbl92b25fYnNfZW50ZmVybnQrKztcbiAgICAgICAgdmFyIHByb3plbnQgPSBNYXRoLnJvdW5kKChhbnpfdm9ya29tbWVuX3Zvbl9icy1hbnpfdm9ya29tbWVuX3Zvbl9ic19lbnRmZXJudCkvYW56X3ZvcmtvbW1lbl92b25fYnMqMTAwKTtcbiAgICAgICAgJChcIiNCc0ltcG9ydGllcmVuUHJvZ3Jlc3NiYXJcIilcbiAgICAgICAgICAgIC5jc3MoJ3dpZHRoJywgcHJvemVudCArJyUnKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtdmFsdWVub3cnLCBwcm96ZW50KTtcbiAgICAgICAgJChcIiNCc0ltcG9ydGllcmVuUHJvZ3Jlc3NiYXJUZXh0XCIpLmh0bWwocHJvemVudCArIFwiJVwiKTtcblxuICAgICAgICBpZiAoYW56X3ZvcmtvbW1lbl92b25fYnNfZW50ZmVybnQgPT09IGFuel92b3Jrb21tZW5fdm9uX2JzKSB7XG4gICAgICAgICAgICAvLyBkaWUgSW5kZXhlIGFrdHVhbGlzaWVyZW5cbiAgICAgICAgICAgIHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcbiAgICAgICAgICAgICRkYi52aWV3KCdhcnRlbmRiL2xyJywge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtZWxkZW4sIGRhc3MgSW5kZXhlIGFrdHVhbGlzaWVydCB3dXJkZW5cbiAgICAgICAgICAgICAgICAgICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWluZm9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgcsO8Y2ttZWxkdW5nID0gXCJEaWUgQmV6aWVodW5nc3NhbW1sdW5nZW4gd3VyZGVuIGVudGZlcm50Ljxicj5cIjtcbiAgICAgICAgICAgICAgICAgICAgcsO8Y2ttZWxkdW5nICs9IFwiRGllIEluZGV4ZSB3dXJkZW4gYWt0dWFsaXNpZXJ0LlwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LmFkYi5yw7xja21lbGR1bmdfbGlua3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHLDvGNrbWVsZHVuZyArPSBcIjxicj48YnI+TmFjaGZvbGdlbmQgTGlua3MgenUgT2JqZWt0ZW4gbWl0IGltcG9ydGllcnRlbiBEYXRlbiwgZGFtaXQgU2llIGRhcyBSZXN1bHRhdCDDvGJlcnByw7xmZW4ga8O2bm5lbjo8YnI+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByw7xja21lbGR1bmcgKz0gd2luZG93LmFkYi5yw7xja21lbGR1bmdfbGlua3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgd2luZG93LmFkYi5yw7xja21lbGR1bmdfbGlua3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dC5odG1sKHLDvGNrbWVsZHVuZyk7XG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dC5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHLDvGNrbWVsZGVuLCBkYXNzIGVzIHBhc3NpZXJ0XG4gICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIilcbiAgICAgICAgLmFkZENsYXNzKFwiYWxlcnQtaW5mb1wiKTtcbiAgICByw7xja21lbGR1bmcgPSBcIkJlemllaHVuZ3NzYW1tbHVuZ2VuIHdlcmRlbiBlbnRmZXJudC4uLjxicj5EaWUgSW5kZXhlIHdlcmRlbiBha3R1YWxpc2llcnQuLi5cIjtcbiAgICAkaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc190ZXh0Lmh0bWwocsO8Y2ttZWxkdW5nKTtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNfdGV4dC5vZmZzZXQoKS50b3BcbiAgICB9LCAyMDAwKTtcblxuICAgIF8uZWFjaCh3aW5kb3cuYWRiLmJzRGF0ZW5zw6R0emUsIGZ1bmN0aW9uKGJzX2RhdGVuc2F0eikge1xuICAgICAgICAvLyB6dWVyc3QgZGllIGlkIGluIGd1aWQgw7xiZXJzZXR6ZW5cbiAgICAgICAgaWYgKHdpbmRvdy5hZGIuQnNJZCA9PT0gXCJndWlkXCIpIHtcbiAgICAgICAgICAgIC8vIGRpZSBpbiBkZXIgVGFiZWxsZSBtaXRnZWxpZWZlcnRlIGlkIGlzdCBkaWUgZ3VpZFxuICAgICAgICAgICAgZ3VpZCA9IGJzX2RhdGVuc2F0ei5HVUlEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChxID0gMDsgcSA8IHdpbmRvdy5hZGIuWnVvcmRiYXJlRGF0ZW5zw6R0emUubGVuZ3RoOyBxKyspIHtcbiAgICAgICAgICAgICAgICAvLyBpbiBkZW4genVvcmRiYXJlbiBEYXRlbnPDpHR6ZW4gbmFjaCBkZW0gT2JqZWt0IG1pdCBkZXIgcmljaHRpZ2VuIGlkIHN1Y2hlblxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuYWRiLlp1b3JkYmFyZURhdGVuc8OkdHplW3FdLklkID09IGJzX2RhdGVuc2F0elt3aW5kb3cuYWRiLkJzRmVsZGVySWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVuZCBkaWUgZ3VpZCBhdXNsZXNlblxuICAgICAgICAgICAgICAgICAgICBndWlkID0gd2luZG93LmFkYi5adW9yZGJhcmVEYXRlbnPDpHR6ZVtxXS5HdWlkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRWluZW4gQXJyYXkgZGVyIGlkJ3MgZXJzdGVsbGVuXG4gICAgICAgIGd1aWRfYXJyYXkucHVzaChndWlkKTtcbiAgICB9KTtcblxuXHQvLyBndWlkX2FycmF5IGF1ZiBkaWUgZWluZGV1dGlnZW4gZ3VpZHMgcmVkdXppZXJlblxuXHRndWlkX2FycmF5ID0gXy51bmlvbihndWlkX2FycmF5KTtcblxuXHQvLyBhbGxlIGRvY3MgZ2xlaWNoemVpdGlnIGhvbGVuXG5cdC8vIGFiZXIgYmF0Y2h3ZWlzZVxuXHRmb3IgKGE9MDsgYTxiYXRjaDsgYSsrKSB7XG5cdFx0aWYgKGEgPCBndWlkX2FycmF5Lmxlbmd0aCkge1xuXHRcdFx0Z3VpZF9hcnJheV8yLnB1c2goZ3VpZF9hcnJheVthXSk7XG5cdFx0XHRpZiAoYSA9PT0gKGJhdGNoLTEpKSB7XG5cdFx0XHRcdHdpbmRvdy5hZGIuZW50ZmVybmVCZXppZWh1bmdzc2FtbWx1bmdfMihic19uYW1lLCBndWlkX2FycmF5XzIsIChhLWJhdGNoX2dyw7Zzc2UpKTtcblx0XHRcdFx0Z3VpZF9hcnJheV8yID0gW107XG5cdFx0XHRcdGJhdGNoICs9IGJhdGNoX2dyw7Zzc2U7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHdpbmRvdy5hZGIuZW50ZmVybmVCZXppZWh1bmdzc2FtbWx1bmdfMihic19uYW1lLCBndWlkX2FycmF5XzIsIChhLWJhdGNoX2dyw7Zzc2UpKTtcblx0XHRcdGJzX2VudGZlcm50LnJlc29sdmUoKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHQvLyBSw7xja21lbGR1bmdzTGlua3MgaW4gRmVsZCBhbnplaWdlbjpcbiAgICAgICAgJGltcG9ydGllcmVuX2JzX2ltcG9ydF9hdXNmdWVocmVuX2hpbndlaXNcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKVxuICAgICAgICAgICAgLmFkZENsYXNzKFwiYWxlcnQtaW5mb1wiKVxuICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAkaW1wb3J0aWVyZW5fYnNfaW1wb3J0X2F1c2Z1ZWhyZW5faGlud2Vpc190ZXh0Lmh0bWwoXCJEaWUgQmV6aWVodW5nc3NhbW1sdW5nZW4gd2VyZGVuIGVudGZlcm50Li4uPGJyPkRpZSBJbmRleGUgd2VyZGVuIGFrdHVhbGlzaWVydC4uLlwiKTtcblx0fVxuXHRyZXR1cm4gYnNfZW50ZmVybnQucHJvbWlzZSgpO1xufTtcblxud2luZG93LmFkYi5lbnRmZXJuZUJlemllaHVuZ3NzYW1tbHVuZ18yID0gZnVuY3Rpb24oYnNfbmFtZSwgZ3VpZF9hcnJheSwgdmVyesO2Z2VydW5nc19mYWt0b3IpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBhbGxlIGRvY3MgaG9sZW5cblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdFx0JGRiLnZpZXcoJ2FydGVuZGIvYWxsX2RvY3M/a2V5cz0nICsgZW5jb2RlVVJJKEpTT04uc3RyaW5naWZ5KGd1aWRfYXJyYXkpKSArICcmaW5jbHVkZV9kb2NzPXRydWUnLCB7XG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdHZhciBvYmpla3QsXG5cdFx0XHRcdFx0ZjtcbiAgICAgICAgICAgICAgICBfLmVhY2goZGF0YS5yb3dzLCBmdW5jdGlvbihkYXRhX3Jvdykge1xuICAgICAgICAgICAgICAgICAgICBvYmpla3QgPSBkYXRhX3Jvdy5kb2M7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGIuZW50ZmVybmVCZXppZWh1bmdzc2FtbWx1bmdBdXNPYmpla3QoYnNfbmFtZSwgb2JqZWt0KTtcbiAgICAgICAgICAgICAgICB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSwgdmVyesO2Z2VydW5nc19mYWt0b3IqNDApO1xufTtcblxud2luZG93LmFkYi5lbnRmZXJuZUJlemllaHVuZ3NzYW1tbHVuZ0F1c09iamVrdCA9IGZ1bmN0aW9uKGJzX25hbWUsIG9iamVrdCkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmIChvYmpla3QuQmV6aWVodW5nc3NhbW1sdW5nZW4gJiYgb2JqZWt0LkJlemllaHVuZ3NzYW1tbHVuZ2VuLmxlbmd0aCA+IDApIHtcblx0XHRmb3IgKHZhciBpPTA7IGk8b2JqZWt0LkJlemllaHVuZ3NzYW1tbHVuZ2VuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAob2JqZWt0LkJlemllaHVuZ3NzYW1tbHVuZ2VuW2ldLk5hbWUgPT09IGJzX25hbWUpIHtcblx0XHRcdFx0b2JqZWt0LkJlemllaHVuZ3NzYW1tbHVuZ2VuLnNwbGljZShpLDEpO1xuXHRcdFx0XHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdFx0XHRcdCRkYi5zYXZlRG9jKG9iamVrdCk7XG4gICAgICAgICAgICAgICAgLy8gbWl0dGVpbGVuLCBkYXNzIGVpbmUgYnMgZW50ZmVybnQgd3VyZGVcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdhZGIuYnNfZW50ZmVybnQnKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG4vLyBmw7xndCBkZXIgQXJ0IGVpbmUgRGF0ZW5zYW1tbHVuZyBoaW56dVxuLy8gd2VubiBkaWVzZWxiZSBzY2hvbiB2b3Jrb21tdCwgd2lyZCBzaWUgw7xiZXJzY2hyaWViZW5cbndpbmRvdy5hZGIuZsO8Z2VEYXRlbnNhbW1sdW5nWnVPYmpla3QgPSBmdW5jdGlvbihndWlkLCBkYXRlbnNhbW1sdW5nKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuXHQkZGIub3BlbkRvYyhndWlkLCB7XG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZG9jKSB7XG5cdFx0XHQvLyBzaWNoZXJzdGVsbGVuLCBkYXNzIEVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZyBleGlzdGllcnRcblx0XHRcdGlmICghZG9jLkVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuKSB7XG5cdFx0XHRcdGRvYy5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0Ly8gZmFsbHMgZGllc2VsYmUgRGF0ZW5zYW1tbHVuZyBzY2hvbiBleGlzdGllcnRlOiBsw7ZzY2hlblxuXHRcdFx0Ly8gdHJpZmZ0IHouQi4genUgYmVpIHp1c2FtbWVuZmFzc2VuZGVuXG5cdFx0XHRkb2MuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4gPSBfLnJlamVjdChkb2MuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4sIGZ1bmN0aW9uKGVzKSB7XG5cdFx0XHRcdHJldHVybiBlcy5OYW1lID09PSBkYXRlbnNhbW1sdW5nLk5hbWU7XG5cdFx0XHR9KTtcblx0XHRcdC8vIERhdGVuc2FtbWx1bmcgYW5mw7xnZW5cblx0XHRcdGRvYy5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbi5wdXNoKGRhdGVuc2FtbWx1bmcpO1xuXHRcdFx0Ly8gc29ydGllcmVuXG5cdFx0XHQvLyBFaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiBuYWNoIE5hbWUgc29ydGllcmVuXG5cdFx0XHRkb2MuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4gPSB3aW5kb3cuYWRiLnNvcnRpZXJlT2JqZWt0YXJyYXlOYWNoTmFtZShkb2MuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4pO1xuXHRcdFx0Ly8gaW4gYXJ0ZW5kYiBzcGVpY2hlcm5cblx0XHRcdCRkYi5zYXZlRG9jKGRvYyk7XG4gICAgICAgICAgICAvLyBtaXR0ZWlsZW4sIGRhc3MgZWluIGRzIGltcG9ydGllcnQgd3VyZGVcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2FkYi5kc19oaW56dWdlZsO8Z3QnKTtcbiAgICAgICAgICAgIC8vIFRPRE86IFNjaGVpdGVybiBkZXMgU3BlaWNoZXJucyBhYmZhbmdlbiAodHJpZ2dlciBhZGIuZHNfbmljaHRfaGluenVnZWbDvGd0KVxuXHRcdH1cblx0fSk7XG59O1xuXG4vLyBmw7xndCBkZXIgQXJ0IGVpbmUgRGF0ZW5zYW1tbHVuZyBoaW56dVxuLy8gd2VubiBkaWVzZWxiZSBzY2hvbiB2b3Jrb21tdCwgd2lyZCBzaWUgw7xiZXJzY2hyaWViZW5cbndpbmRvdy5hZGIuZsO8Z2VCZXppZWh1bmdlblp1T2JqZWt0ID0gZnVuY3Rpb24oZ3VpZCwgYmV6aWVodW5nc3NhbW1sdW5nLCBiZXppZWh1bmdlbikge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0JGRiLm9wZW5Eb2MoZ3VpZCwge1xuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRvYykge1xuXHRcdFx0Ly8gcHLDvGZlbiwgb2IgZGllIEJlemllaHVuZyBzY2hvbiBleGlzdGllcnRcblx0XHRcdGlmIChkb2MuQmV6aWVodW5nc3NhbW1sdW5nZW4gJiYgZG9jLkJlemllaHVuZ3NzYW1tbHVuZ2VuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIGhpbnp1Z2Vmw7xndCA9IGZhbHNlLFxuXHRcdFx0XHRcdGksXG5cdFx0XHRcdFx0aDtcblx0XHRcdFx0Zm9yIChpIGluIGRvYy5CZXppZWh1bmdzc2FtbWx1bmdlbikge1xuXHRcdFx0XHRcdGlmIChkb2MuQmV6aWVodW5nc3NhbW1sdW5nZW5baV0uTmFtZSA9PT0gYmV6aWVodW5nc3NhbW1sdW5nLk5hbWUpIHtcblx0XHRcdFx0XHRcdGZvciAoaD0wOyBoPGJlemllaHVuZ2VuLmxlbmd0aDsgaCsrKSB7XG5cdFx0XHRcdFx0XHRcdGlmICghXy5jb250YWlucyhkb2MuQmV6aWVodW5nc3NhbW1sdW5nZW5baV0uQmV6aWVodW5nZW4sIGJlemllaHVuZ2VuW2hdKSkge1xuXHRcdFx0XHRcdFx0XHRcdGRvYy5CZXppZWh1bmdzc2FtbWx1bmdlbltpXS5CZXppZWh1bmdlbi5wdXNoKGJlemllaHVuZ2VuW2hdKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gQmV6aWVodW5nZW4gbmFjaCBOYW1lIHNvcnRpZXJlblxuXHRcdFx0XHRcdFx0ZG9jLkJlemllaHVuZ3NzYW1tbHVuZ2VuW2ldLkJlemllaHVuZ2VuID0gd2luZG93LmFkYi5zb3J0aWVyZUJlemllaHVuZ2VuTmFjaE5hbWUoZG9jLkJlemllaHVuZ3NzYW1tbHVuZ2VuW2ldLkJlemllaHVuZ2VuKTtcblx0XHRcdFx0XHRcdGhpbnp1Z2Vmw7xndCA9IHRydWU7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFoaW56dWdlZsO8Z3QpIHtcblx0XHRcdFx0XHQvLyBkaWUgQmV6aWVodW5nc3NhbW1sdW5nIGV4aXN0aWVydCBub2NoIG5pY2h0XG5cdFx0XHRcdFx0YmV6aWVodW5nc3NhbW1sdW5nLkJlemllaHVuZ2VuID0gW107XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChiZXppZWh1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiZXppZWh1bmdzc2FtbWx1bmcuQmV6aWVodW5nZW4ucHVzaChiZXppZWh1bmcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcdFx0XHQvLyBCZXppZWh1bmdlbiBuYWNoIE5hbWUgc29ydGllcmVuXG5cdFx0XHRcdFx0YmV6aWVodW5nc3NhbW1sdW5nLkJlemllaHVuZ2VuID0gd2luZG93LmFkYi5zb3J0aWVyZUJlemllaHVuZ2VuTmFjaE5hbWUoYmV6aWVodW5nc3NhbW1sdW5nLkJlemllaHVuZ2VuKTtcblx0XHRcdFx0XHRkb2MuQmV6aWVodW5nc3NhbW1sdW5nZW4ucHVzaChiZXppZWh1bmdzc2FtbWx1bmcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBCZXppZWh1bmdzc2FtbWx1bmcgYW5mw7xnZW5cblx0XHRcdFx0YmV6aWVodW5nc3NhbW1sdW5nLkJlemllaHVuZ2VuID0gW107XG4gICAgICAgICAgICAgICAgXy5lYWNoKGJlemllaHVuZ2VuLCBmdW5jdGlvbihiZXppZWh1bmcpIHtcbiAgICAgICAgICAgICAgICAgICAgYmV6aWVodW5nc3NhbW1sdW5nLkJlemllaHVuZ2VuLnB1c2goYmV6aWVodW5nKTtcbiAgICAgICAgICAgICAgICB9KTtcblx0XHRcdFx0Ly8gQmV6aWVodW5nZW4gbmFjaCBOYW1lIHNvcnRpZXJlblxuXHRcdFx0XHRiZXppZWh1bmdzc2FtbWx1bmcuQmV6aWVodW5nZW4gPSB3aW5kb3cuYWRiLnNvcnRpZXJlQmV6aWVodW5nZW5OYWNoTmFtZShiZXppZWh1bmdzc2FtbWx1bmcuQmV6aWVodW5nZW4pO1xuXHRcdFx0XHRkb2MuQmV6aWVodW5nc3NhbW1sdW5nZW4gPSBbXTtcblx0XHRcdFx0ZG9jLkJlemllaHVuZ3NzYW1tbHVuZ2VuLnB1c2goYmV6aWVodW5nc3NhbW1sdW5nKTtcblx0XHRcdH1cblx0XHRcdC8vIEJlemllaHVuZ3NzYW1tbHVuZ2VuIG5hY2ggTmFtZSBzb3J0aWVyZW5cblx0XHRcdGRvYy5CZXppZWh1bmdzc2FtbWx1bmdlbiA9IHdpbmRvdy5hZGIuc29ydGllcmVPYmpla3RhcnJheU5hY2hOYW1lKGRvYy5CZXppZWh1bmdzc2FtbWx1bmdlbik7XG5cdFx0XHQvLyBpbiBhcnRlbmRiIHNwZWljaGVyblxuXHRcdFx0JGRiLnNhdmVEb2MoZG9jKTtcbiAgICAgICAgICAgIC8vIG1pdHRlaWxlbiwgZGFzcyBlaW5lIGJzIGltcG9ydGllcnQgd3VyZGVcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2FkYi5ic19oaW56dWdlZsO8Z3QnKTtcbiAgICAgICAgICAgIC8vIFRPRE86IFNjaGVpdGVybiBkZXMgU3BlaWNoZXJucyBhYmZhbmdlbiAodHJpZ2dlciBhZGIuYnNfbmljaHRfaGluenVnZWbDvGd0KVxuXHRcdH1cblx0fSk7XG59O1xuXG4vLyDDvGJlcm5pbW10IGRlbiBOYW1lbiBlaW5lciBEYXRlbnNhbW1sdW5nXG4vLyDDtmZmbmV0IGFsbGUgRG9rdW1lbnRlLCBkaWUgZGllc2UgRGF0ZW5zYW1tbHVuZyBlbnRoYWx0ZW4gdW5kIGzDtnNjaHQgZGllIERhdGVuc2FtbWx1bmdcbndpbmRvdy5hZGIuZW50ZmVybmVEYXRlbnNhbW1sdW5nQXVzQWxsZW5PYmpla3RlbiA9IGZ1bmN0aW9uKGRzX25hbWUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgZHNfZW50ZmVybnQgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGFuel92b3Jrb21tZW5fdm9uX2RzLFxuICAgICAgICBhbnpfdm9ya29tbWVuX3Zvbl9kc19lbnRmZXJudCA9IDAsXG4gICAgICAgICRpbXBvcnRpZXJlbl9kc19kc19iZXNjaHJlaWJlbl9oaW53ZWlzID0gJChcIiNpbXBvcnRpZXJlbl9kc19kc19iZXNjaHJlaWJlbl9oaW53ZWlzXCIpLFxuICAgICAgICAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKSxcbiAgICAgICAgcsO8Y2ttZWxkdW5nO1xuXHQkZGIudmlldygnYXJ0ZW5kYi9kc19ndWlkP3N0YXJ0a2V5PVtcIicgKyBkc19uYW1lICsgJ1wiXSZlbmRrZXk9W1wiJyArIGRzX25hbWUgKyAnXCIse31dJywge1xuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGFuel92b3Jrb21tZW5fdm9uX2RzID0gZGF0YS5yb3dzLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gbGlzdGVuZXIgZWlucmljaHRlbiwgZGVyIG1lbGRldCwgd2VubiBlaSBEYXRlbnNhdHogZW50ZmVybnQgd3VyZGVcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLmJpbmQoJ2FkYi5kc19lbnRmZXJudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFuel92b3Jrb21tZW5fdm9uX2RzX2VudGZlcm50Kys7XG4gICAgICAgICAgICAgICAgcsO8Y2ttZWxkdW5nID0gXCJFaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiB3ZXJkZW4gZW50ZmVybnQuLi48YnI+RGllIEluZGV4ZSB3ZXJkZW4gYWt0dWFsaXNpZXJ0Li4uXCI7XG4gICAgICAgICAgICAgICAgJGltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXNcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKS5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKS5hZGRDbGFzcyhcImFsZXJ0LWluZm9cIilcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwocsO8Y2ttZWxkdW5nKTtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJGltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgaWYgKGFuel92b3Jrb21tZW5fdm9uX2RzX2VudGZlcm50ID09PSBhbnpfdm9ya29tbWVuX3Zvbl9kcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBkaWUgSW5kZXhlIGFrdHVhbGlzaWVyZW5cbiAgICAgICAgICAgICAgICAgICAgJGRiLnZpZXcoJ2FydGVuZGIvbHInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtZWxkZW4sIGRhc3MgSW5kZXhlIGFrdHVhbGlzaWVydCB3dXJkZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByw7xja21lbGR1bmcgPSBcIkRpZSBFaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiB3dXJkZW4gZW50ZmVybnQuPGJyPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHLDvGNrbWVsZHVuZyArPSBcIkRpZSBJbmRleGUgd3VyZGVuIGFrdHVhbGlzaWVydC5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5faGlud2Vpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1pbmZvXCIpLnJlbW92ZUNsYXNzKFwiYWxlcnQtZGFuZ2VyXCIpLmFkZENsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaHRtbChyw7xja21lbGR1bmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkaW1wb3J0aWVyZW5fZHNfZHNfYmVzY2hyZWliZW5faGlud2Vpcy5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuIGVudGZlcm5lblxuICAgICAgICAgICAgXy5lYWNoKGRhdGEucm93cywgZnVuY3Rpb24oZGF0YV9yb3cpIHtcbiAgICAgICAgICAgICAgICAvLyBndWlkIHVuZCBEc05hbWUgw7xiZXJnZWJlblxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGIuZW50ZmVybmVEYXRlbnNhbW1sdW5nQXVzRG9rdW1lbnQoZGF0YV9yb3cua2V5WzFdLCBkc19uYW1lKTtcbiAgICAgICAgICAgIH0pO1xuXHRcdFx0ZHNfZW50ZmVybnQucmVzb2x2ZSgpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBkc19lbnRmZXJudC5wcm9taXNlKCk7XG59O1xuXG4vLyDDvGJlcm5pbW10IGRlbiBOYW1lbiBlaW5lciBCZXppZWh1bmdzc2FtbWx1bmdcbi8vIMO2ZmZuZXQgYWxsZSBEb2t1bWVudGUsIGRpZSBkaWVzZSBCZXppZWh1bmdzc2FtbWx1bmcgZW50aGFsdGVuIHVuZCBsw7ZzY2h0IGRpZSBCZXppZWh1bmdzc2FtbWx1bmdcbndpbmRvdy5hZGIuZW50ZmVybmVCZXppZWh1bmdzc2FtbWx1bmdBdXNBbGxlbk9iamVrdGVuID0gZnVuY3Rpb24oYnNfbmFtZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBic19lbnRmZXJudCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgYW56X3ZvcmtvbW1lbl92b25fYnNfZW50ZmVybnQgPSAwLFxuICAgICAgICBhbnpfdm9ya29tbWVuX3Zvbl9icyxcbiAgICAgICAgJGltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXMgPSAkKFwiI2ltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXNcIiksXG4gICAgICAgICRpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzX3RleHQgPSAkKFwiI2ltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXNfdGV4dFwiKSxcbiAgICAgICAgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIiksXG4gICAgICAgIHLDvGNrbWVsZHVuZztcblx0JGRiLnZpZXcoJ2FydGVuZGIvYnNfZ3VpZD9zdGFydGtleT1bXCInICsgYnNfbmFtZSArICdcIl0mZW5ka2V5PVtcIicgKyBic19uYW1lICsgJ1wiLHt9XScsIHtcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBhbnpfdm9ya29tbWVuX3Zvbl9icyA9IGRhdGEucm93cy5sZW5ndGg7XG4gICAgICAgICAgICAvLyBsaXN0ZW5lciBlaW5yaWNodGVuLCBkZXIgbWVsZGV0LCB3ZW5uIGVpbiBEYXRlbnNhdHogZW50ZmVybnQgd3VyZGVcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLmJpbmQoJ2FkYi5ic19lbnRmZXJudCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFuel92b3Jrb21tZW5fdm9uX2JzX2VudGZlcm50Kys7XG4gICAgICAgICAgICAgICAgJGltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXNcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtc3VjY2Vzc1wiKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1kYW5nZXJcIilcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiYWxlcnQtaW5mb1wiKTtcbiAgICAgICAgICAgICAgICByw7xja21lbGR1bmcgPSBcIkJlemllaHVuZ3NzYW1tbHVuZ2VuIHdlcmRlbiBlbnRmZXJudC4uLjxicj5EaWUgSW5kZXhlIHdlcmRlbiBha3R1YWxpc2llcnQuLi5cIjtcbiAgICAgICAgICAgICAgICAkaW1wb3J0aWVyZW5fYnNfZHNfYmVzY2hyZWliZW5faGlud2Vpc190ZXh0Lmh0bWwocsO8Y2ttZWxkdW5nKTtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJGltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXNfdGV4dC5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICBpZiAoYW56X3ZvcmtvbW1lbl92b25fYnNfZW50ZmVybnQgPT09IGFuel92b3Jrb21tZW5fdm9uX2JzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRpZSBJbmRleGUgYWt0dWFsaXNpZXJlblxuICAgICAgICAgICAgICAgICAgICAkZGIudmlldygnYXJ0ZW5kYi9scicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1lbGRlbiwgZGFzcyBJbmRleGUgYWt0dWFsaXNpZXJ0IHd1cmRlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWluZm9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtZGFuZ2VyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcsO8Y2ttZWxkdW5nID0gXCJEaWUgQmV6aWVodW5nc3NhbW1sdW5nZW4gd3VyZGVuIGVudGZlcm50Ljxicj5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByw7xja21lbGR1bmcgKz0gXCJEaWUgSW5kZXhlIHd1cmRlbiBha3R1YWxpc2llcnQuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGltcG9ydGllcmVuX2JzX2RzX2Jlc2NocmVpYmVuX2hpbndlaXNfdGV4dC5odG1sKHLDvGNrbWVsZHVuZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICRpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9oaW53ZWlzX3RleHQub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfLmVhY2goZGF0YS5yb3dzLCBmdW5jdGlvbihkYXRhX3Jvdykge1xuICAgICAgICAgICAgICAgIC8vIGd1aWQgdW5kIERzTmFtZSDDvGJlcmdlYmVuXG4gICAgICAgICAgICAgICAgd2luZG93LmFkYi5lbnRmZXJuZUJlemllaHVuZ3NzYW1tbHVuZ0F1c0Rva3VtZW50KGRhdGFfcm93LmtleVsxXSwgYnNfbmFtZSk7XG4gICAgICAgICAgICB9KTtcblx0XHRcdGJzX2VudGZlcm50LnJlc29sdmUoKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gYnNfZW50ZmVybnQucHJvbWlzZSgpO1xufTtcblxuLy8gw7xiZXJuaW1tdCBkaWUgaWQgZGVzIHp1IHZlcsOkbmRlcm5kZW4gRG9rdW1lbnRzXG4vLyB1bmQgZGVuIE5hbWVuIGRlciBEYXRlbnNhbW1sdW5nLCBkaWUgenUgZW50ZmVybmVuIGlzdFxuLy8gZW50ZmVybnQgZGllIERhdGVuc2FtbWx1bmdcbndpbmRvdy5hZGIuZW50ZmVybmVEYXRlbnNhbW1sdW5nQXVzRG9rdW1lbnQgPSBmdW5jdGlvbihpZCwgZHNfbmFtZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0JGRiLm9wZW5Eb2MoaWQsIHtcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkb2MpIHtcblx0XHRcdC8vIERhdGVuc2FtbWx1bmcgZW50ZmVybmVuXG4gICAgICAgICAgICBkb2MuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4gPSBfLnJlamVjdChkb2MuRWlnZW5zY2hhZnRlbnNhbW1sdW5nZW4sIGZ1bmN0aW9uKGRhdGVuc2FtbWx1bmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZW5zYW1tbHVuZy5OYW1lID09PSBkc19uYW1lXG4gICAgICAgICAgICB9KTtcblx0XHRcdC8vIGluIGFydGVuZGIgc3BlaWNoZXJuXG5cdFx0XHQkZGIuc2F2ZURvYyhkb2MpO1xuICAgICAgICAgICAgLy8gbWl0dGVpbGVuLCBkYXNzIGVpbmUgZHMgZW50ZmVybnQgd3VyZGVcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2FkYi5kc19lbnRmZXJudCcpO1xuICAgICAgICAgICAgLy8gVE9ETzogU2NoZWl0ZXJuIGFiZmFuZ2VuICh0cmlnZ2VyIGFkYi5kc19uaWNodF9lbnRmZXJudClcblx0XHR9XG5cdH0pO1xufTtcblxuLy8gw7xiZXJuaW1tdCBkaWUgaWQgZGVzIHp1IHZlcsOkbmRlcm5kZW4gRG9rdW1lbnRzXG4vLyB1bmQgZGVuIE5hbWVuIGRlciBCZXppZWh1bmdzc2FtbWx1bmcsIGRpZSB6dSBlbnRmZXJuZW4gaXN0XG4vLyBlbnRmZXJudCBkaWUgQmV6aWVodW5nc3NhbW1sdW5nXG53aW5kb3cuYWRiLmVudGZlcm5lQmV6aWVodW5nc3NhbW1sdW5nQXVzRG9rdW1lbnQgPSBmdW5jdGlvbihpZCwgYnNfbmFtZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0JGRiLm9wZW5Eb2MoaWQsIHtcblx0XHRzdWNjZXNzOiBmdW5jdGlvbihkb2MpIHtcblx0XHRcdC8vIEJlemllaHVuZ3NzYW1tbHVuZyBlbnRmZXJuZW5cbiAgICAgICAgICAgIGRvYy5CZXppZWh1bmdzc2FtbWx1bmdlbiA9IF8ucmVqZWN0KGRvYy5CZXppZWh1bmdzc2FtbWx1bmdlbiwgZnVuY3Rpb24oYmV6aWVodW5nc3NhbW1sdW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJlemllaHVuZ3NzYW1tbHVuZy5OYW1lID09PSBic19uYW1lXG4gICAgICAgICAgICB9KTtcblx0XHRcdC8vIGluIGFydGVuZGIgc3BlaWNoZXJuXG5cdFx0XHQkZGIuc2F2ZURvYyhkb2MpO1xuICAgICAgICAgICAgLy8gbWl0dGVpbGVuLCBkYXNzIGVpbmUgZHMgZW50ZmVybnQgd3VyZGVcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ2FkYi5ic19lbnRmZXJudCcpO1xuICAgICAgICAgICAgLy8gVE9ETzogU2NoZWl0ZXJuIGFiZmFuZ2VuICh0cmlnZ2VyIGFkYi5kc19uaWNodF9lbnRmZXJudClcblx0XHR9XG5cdH0pO1xufTtcblxuLy8gcHLDvGZ0IGRpZSBVUkwuIHdlbm4gZWluZSBpZCDDvGJlcmdlYmVuIHd1cmRlLCB3aXJkIGRhcyBlbnRwcmVjaGVuZGUgT2JqZWt0IGFuZ2V6ZWlndFxud2luZG93LmFkYi7DtmZmbmVVcmkgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBwYXJhbWV0ZXIgZGVyIHVyaSBob2xlblxuXHR2YXIgdXJpID0gbmV3IFVyaSgkKGxvY2F0aW9uKS5hdHRyKCdocmVmJykpLFxuXHRcdGlkID0gdXJpLmdldFF1ZXJ5UGFyYW1WYWx1ZSgnaWQnKSxcblx0XHQvLyB3ZW5uIGJyb3dzZXIgaGlzdG9yeSBuaWNodCB1bnRlcnN0w7x0enQsIGVyc3RlbGx0IGhpc3RvcnkuanMgZWluZSBoYXNoXG5cdFx0Ly8gZGFubiBtdXNzIGRpZSBpZCBkdXJjaCBkaWUgaWQgaW4gZGVyIGhhc2ggZXJzZXR6dCB3ZXJkZW5cblx0XHRoYXNoID0gdXJpLmFuY2hvcigpLFxuXHRcdHVyaTIsXG5cdFx0ZXJzdGVsbGVCYXVtID0gcmVxdWlyZSgnLi9tb2R1bGVzL2Vyc3RlbGxlQmF1bScpO1xuXHRpZiAoaGFzaCkge1xuXHRcdHVyaTIgPSBuZXcgVXJpKGhhc2gpO1xuXHRcdGlkID0gdXJpMi5nZXRRdWVyeVBhcmFtVmFsdWUoJ2lkJyk7XG5cdH1cblx0aWYgKGlkKSB7XG5cdFx0Ly8gR3J1cHBlIGVybWl0dGVsblxuXHRcdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0XHQkZGIub3BlbkRvYyhpZCwge1xuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24ob2JqZWt0KSB7XG5cdFx0XHRcdC8vIHdpbmRvdy5hZGIuR3J1cHBlIHNldHplbi4gTsO2dGlnLCB1bSBpbSBNZW51IGRpZSByaWNodGlnZW4gRmVsZGVyIGVpbnp1YmxlbmRlblxuXHRcdFx0XHR3aW5kb3cuYWRiLkdydXBwZSA9IG9iamVrdC5HcnVwcGU7XG5cdFx0XHRcdCQoXCIuYmF1bS5qc3RyZWVcIikuanN0cmVlKFwiZGVzZWxlY3RfYWxsXCIpO1xuXHRcdFx0XHQvLyBkZW4gcmljaHRpZ2VuIEJ1dHRvbiBha3RpdmllcmVuXG5cdFx0XHRcdCQoJ1tncnVwcGU9XCInK29iamVrdC5HcnVwcGUrJ1wiXScpLmJ1dHRvbigndG9nZ2xlJyk7XG5cdFx0XHRcdCQoXCIjR3J1cHBlX2xhYmVsXCIpLmh0bWwoXCJHcnVwcGU6XCIpO1xuXHRcdFx0XHQvLyB0cmVlIGF1ZmJhdWVuLCBkYW5hY2ggRGF0ZW5zYXR6IGluaXRpaWVyZW5cblx0XHRcdFx0JC53aGVuKGVyc3RlbGxlQmF1bSgkKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR3aW5kb3cuYWRiLsO2ZmZuZUJhdW1adUlkKGlkKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbiAgICAvLyBkYWbDvHIgc29yZ2VuLCBkYXNzIGRpZSBwYXNzZW5kZW4gTWVudXMgYW5nZXplaWd0IHdlcmRlblxuICAgIHdpbmRvdy5hZGIuYmxlbmRlTWVudXMoKTtcbn07XG5cbi8vIMO8YmVybmltbXQgYW5mYW5ncyBkcmVpIGFycmF5czogdGF4b25vbWllbiwgZGF0ZW5zYW1tbHVuZ2VuIHVuZCBiZXppZWh1bmdzc2FtbWx1bmdlblxuLy8gdmVyYXJiZWl0ZXQgaW1tZXIgZGVuIGVyc3RlbiBhcnJheSB1bmQgcnVmdCBzaWNoIG1pdCBkZW4gw7xicmlnZW4gc2VsYmVyIHdpZWRlciBhdWZcbndpbmRvdy5hZGIuZXJzdGVsbGVFeHBvcnRmZWxkZXIgPSBmdW5jdGlvbih0YXhvbm9taWVuLCBkYXRlbnNhbW1sdW5nZW4sIGJlemllaHVuZ3NzYW1tbHVuZ2VuKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGh0bWxfZmVsZGVyX3fDpGhsZW4gPSAnJyxcblx0XHRodG1sX2ZpbHRlcm4gPSAnJyxcblx0XHRkc190eXAsXG4gICAgICAgIHgsXG4gICAgICAgIGRzYnNfdm9uX29iamVrdGVuID0gW10sXG4gICAgICAgIGRzYnNfdm9uX29iamVrdCxcbiAgICAgICAgZHNfZmVsZGVyX29iamVrdCxcbiAgICAgICAgaHRtbCxcbiAgICAgICAgQXV0b2xpbmtlciA9IHJlcXVpcmUoJ2F1dG9saW5rZXInKTtcblxuICAgIC8vIEVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuIHZvcmJlcmVpdGVuXG4gICAgLy8gU3RydWt0dXIgdm9uIHdpbmRvdy5hZGIuZHNfYnNfdm9uX29iamVrdGVuIGlzdCBqZXR6dDogW2RzX3R5cCwgZHMuTmFtZSwgZHMuenVzYW1tZW5mYXNzZW5kLCBkc1tcImltcG9ydGllcnQgdm9uXCJdLCBGZWxkZXJfYXJyYXldXG4gICAgLy8gZXJzdCBtYWwgZGllIG5pY2h0IGJlbsO2dGlndGVuIFdlcnRlIGVudGZlcm5lblxuICAgIF8uZWFjaCh3aW5kb3cuYWRiLmRzX2JzX3Zvbl9vYmpla3Rlbi5yb3dzLCBmdW5jdGlvbihvYmplY3Rfd2l0aF9hcnJheV9pbl9rZXkpIHtcbiAgICAgICAgZHNic192b25fb2JqZWt0ZW4ucHVzaChbb2JqZWN0X3dpdGhfYXJyYXlfaW5fa2V5LmtleVsxXSwgb2JqZWN0X3dpdGhfYXJyYXlfaW5fa2V5LmtleVs0XV0pO1xuICAgIH0pO1xuICAgIC8vIFN0cnVrdHVyIHZvbiBkc2JzX3Zvbl9vYmpla3RlbiBpc3QgamV0enQ6IFtkcy5OYW1lLCBmZWxkZXJfb2JqZWt0XVxuICAgIC8vIGpldHp0IGdpYnQgZXMgTWVocmZhY2hlaW50csOkZ2UsIGRpZXNlIGVudGZlcm5lblxuICAgIGRzYnNfdm9uX29iamVrdGVuID0gXy51bmlvbihkc2JzX3Zvbl9vYmpla3Rlbik7XG5cblx0aWYgKHRheG9ub21pZW4gJiYgZGF0ZW5zYW1tbHVuZ2VuICYmIGJlemllaHVuZ3NzYW1tbHVuZ2VuKSB7XG5cdFx0ZHNfdHlwID0gXCJUYXhvbm9taWVcIjtcblx0XHRodG1sX2ZlbGRlcl93w6RobGVuICs9ICc8aDM+VGF4b25vbWllPC9oMz4nO1xuXHRcdGh0bWxfZmlsdGVybiArPSAnPGgzPlRheG9ub21pZTwvaDM+Jztcblx0fSBlbHNlIGlmICh0YXhvbm9taWVuICYmIGRhdGVuc2FtbWx1bmdlbikge1xuXHRcdGRzX3R5cCA9IFwiRGF0ZW5zYW1tbHVuZ1wiO1xuXHRcdGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gJzxoMz5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbjwvaDM+Jztcblx0XHRodG1sX2ZpbHRlcm4gKz0gJzxoMz5FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbjwvaDM+Jztcblx0fSBlbHNlIHtcblx0XHRkc190eXAgPSBcIkJlemllaHVuZ1wiO1xuXHRcdC8vIGJlaSBcImZlbGRlciB3w6RobGVuXCIgc29sbCBtYW4gYXVjaCB3w6RobGVuIGvDtm5uZW4sIG9iIHBybyBCZXppZWh1bmcgZWluZSBaZWlsZSBvZGVyIGFsbGUgQmV6aWVodW5nZW4gaW4gZWluIEZlbGQgZ2VzY2hyaWViZW4gd2VyZGVuIHNvbGxlblxuXHRcdC8vIGRhcyBtdXNzIGF1Y2ggZXJrbMOkcnQgc2VpblxuXHRcdGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gJzxoMz5CZXppZWh1bmdzc2FtbWx1bmdlbjwvaDM+PGRpdiBjbGFzcz1cImV4cG9ydF96dW1fdGl0ZWxfZ2Vob2VyaWdcIj48ZGl2IGNsYXNzPVwid2VsbCB3ZWxsLXNtXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjlweDtcIj48Yj5TaWUga8O2bm5lbiBhdXMgendlaSBWYXJpYW50ZW4gd8OkaGxlbjwvYj4gPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNob3dfbmV4dF9oaWRkZW5cIj4uLi5tZWhyPC9hPjxvbCBjbGFzcz1cImFkYi1oaWRkZW5cIj48bGk+UHJvIEJlemllaHVuZyBlaW5lIFplaWxlIChTdGFuZGFyZGVpbnN0ZWxsdW5nKTo8dWw+PGxpPkbDvHIgamVkZSBBcnQgb2RlciBMZWJlbnNyYXVtIHdpcmQgcHJvIEJlemllaHVuZyBlaW5lIG5ldWUgWmVpbGUgZXJ6ZXVndDwvbGk+PGxpPkFuc2NobGllc3NlbmRlIEF1c3dlcnR1bmdlbiBzaW5kIHNvIG1laXN0IGVpbmZhY2hlciBhdXN6dWbDvGhyZW48L2xpPjxsaT5EYWbDvHIga8O2bm5lbiBTaWUgYXVzIG1heGltYWwgZWluZXIgQmV6aWVodW5nc3NhbW1sdW5nIEZlbGRlciB3w6RobGVuIChhYmVyIHdpZSBnZXdvaG50IG1pdCBiZWxpZWJpZyB2aWVsZW4gRmVsZGVybiBhdXMgVGF4b25vbWllKG4pIHVuZCBFaWdlbnNjaGFmdGVuc2FtbWx1bmdlbiBlcmfDpG56ZW4pPC9saT48L3VsPjwvbGk+PGxpPlBybyBBcnQvTGViZW5zcmF1bSBlaW5lIFplaWxlIHVuZCBhbGxlIEJlemllaHVuZ2VuIGtvbW1hZ2V0cmVubnQgaW4gZWluZW0gRmVsZDo8dWw+PGxpPlZvbiBhbGxlbiBCZXppZWh1bmdlbiBkZXIgQXJ0IG9kZXIgZGVzIExlYmVuc3JhdW1zIHdpcmQgZGVyIEluaGFsdCBkZXMgRmVsZGVzIGtvbW1hZ2V0cmVubnQgaW4gZGFzIEZlbGQgZGVyIGVpbnppZ2VuIFplaWxlIGdlc2NocmllYmVuPC9saT48bGk+U2llIGvDtm5uZW4gRmVsZGVyIGF1cyBiZWxpZWJpZ2VuIEJlemllaHVuZ3NzYW1tbHVuZ2VuIGdsZWljaHplaXRpZyBleHBvcnRpZXJlbjwvbGk+PC91bD48L2xpPjwvb2w+PC9kaXY+PGRpdiBjbGFzcz1cInJhZGlvXCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImV4cG9ydF9iZXpfaW5femVpbGVuXCIgY2hlY2tlZD1cImNoZWNrZWRcIiBuYW1lPVwiZXhwb3J0X2Jlel93aWVcIj5Qcm8gQmV6aWVodW5nIGVpbmUgWmVpbGU8L2xhYmVsPjwvZGl2PjxkaXYgY2xhc3M9XCJyYWRpb1wiPjxsYWJlbD48aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJleHBvcnRfYmV6X2luX2ZlbGRlcm5cIiBuYW1lPVwiZXhwb3J0X2Jlel93aWVcIj5Qcm8gQXJ0L0xlYmVuc3JhdW0gZWluZSBaZWlsZSB1bmQgYWxsZSBCZXppZWh1bmdlbiBrb21tYWdldHJlbm50IGluIGVpbmVtIEZlbGQ8L2xhYmVsPjwvZGl2PjwvZGl2Pjxocj4nO1xuXHRcdGh0bWxfZmlsdGVybiArPSAnPGgzPkJlemllaHVuZ3NzYW1tbHVuZ2VuPC9oMz4nO1xuXHR9XG4gICAgXy5lYWNoKHRheG9ub21pZW4sIGZ1bmN0aW9uKHRheG9ub21pZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgaHRtbF9mZWxkZXJfd8OkaGxlbiArPSAnPGhyPic7XG4gICAgICAgICAgICBodG1sX2ZpbHRlcm4gKz0gJzxocj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaHRtbF9mZWxkZXJfd8OkaGxlbiArPSAnPGg1PicgKyB0YXhvbm9taWUuTmFtZTtcbiAgICAgICAgaHRtbF9maWx0ZXJuICs9ICc8aDU+JyArIHRheG9ub21pZS5OYW1lO1xuICAgICAgICAvLyBpbmZvcm1hdGlvbmVuIHp1ciBkcyBob2xlblxuICAgICAgICBkc2JzX3Zvbl9vYmpla3QgPSBfLmZpbmQoZHNic192b25fb2JqZWt0ZW4sIGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbMF0gPT09IHRheG9ub21pZS5OYW1lO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRzYnNfdm9uX29iamVrdCAmJiBkc2JzX3Zvbl9vYmpla3RbMV0pIHtcbiAgICAgICAgICAgIGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gJyA8YSBocmVmPVwiI1wiIGNsYXNzPVwic2hvd19uZXh0X2hpZGRlbl9leHBvcnRcIj4uLi5tZWhyPC9hPic7XG4gICAgICAgICAgICBodG1sX2ZpbHRlcm4gKz0gJyA8YSBocmVmPVwiI1wiIGNsYXNzPVwic2hvd19uZXh0X2hpZGRlbl9leHBvcnRcIj4uLi5tZWhyPC9hPic7XG4gICAgICAgICAgICAvLyBkcy10aXRlbCBhYnNjaGxpZXNzZW5cbiAgICAgICAgICAgIGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gJzwvaDU+JztcbiAgICAgICAgICAgIGh0bWxfZmlsdGVybiArPSAnPC9oNT4nO1xuICAgICAgICAgICAgLy8gRmVsZGVyIGRlciBkcyBkYXJzdGVsbGVuXG4gICAgICAgICAgICBodG1sX2ZlbGRlcl93w6RobGVuICs9ICc8ZGl2IGNsYXNzPVwiYWRiLWhpZGRlblwiPic7XG4gICAgICAgICAgICBodG1sX2ZpbHRlcm4gKz0gJzxkaXYgY2xhc3M9XCJhZGItaGlkZGVuXCI+JztcbiAgICAgICAgICAgIGRzX2ZlbGRlcl9vYmpla3QgPSBkc2JzX3Zvbl9vYmpla3RbMV07XG4gICAgICAgICAgICBfLmVhY2goZHNfZmVsZGVyX29iamVrdCwgZnVuY3Rpb24oZmVsZHdlcnQsIGZlbGRuYW1lKSB7XG4gICAgICAgICAgICBcdGlmIChmZWxkbmFtZSA9PT0gXCJ6dXNhbW1lbmZhc3NlbmRcIikge1xuICAgICAgICAgICAgXHRcdC8vIG5pY2h0IHNhZ2VuLCB3b2hlciBkaWUgSW5mb3Mgc3RhbW1lbiwgd2VpbCBkYXMgT2JqZWt0LWFiaMOkbmdpZyBpc3RcbiAgICAgICAgICAgIFx0XHRodG1sID0gJzxkaXYgY2xhc3M9XCJkc19iZXNjaHJlaWJ1bmdfemVpbGVcIj48ZGl2Plp1cy4tZmFzc2VuZDo8L2Rpdj48ZGl2PkRpZXNlIERhdGVuc2FtbWx1bmcgZmFzc3QgZGllIERhdGVuIG1laHJlcmVyIEVpZ2Vuc2NoYWZ0ZW5zYW1tbHVuZ2VuIGluIGVpbmVyIHp1c2FtbWVuPC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgIFx0XHRodG1sX2ZlbGRlcl93w6RobGVuICs9IGh0bWw7XG5cdCAgICAgICAgICAgICAgICBodG1sX2ZpbHRlcm4gKz0gaHRtbDtcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChmZWxkbmFtZSAhPT0gXCJVcnNwcnVuZ3NkYXRlbnNhbW1sdW5nXCIpIHtcbiAgICAgICAgICAgIFx0XHRodG1sID0gJzxkaXYgY2xhc3M9XCJkc19iZXNjaHJlaWJ1bmdfemVpbGVcIj48ZGl2PicgKyBmZWxkbmFtZSArICc6PC9kaXY+PGRpdj4nICsgQXV0b2xpbmtlci5saW5rKGZlbGR3ZXJ0KSArICc8L2Rpdj48L2Rpdj4nO1xuICAgICAgICAgICAgXHRcdGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gaHRtbDtcblx0ICAgICAgICAgICAgICAgIGh0bWxfZmlsdGVybiArPSBodG1sO1xuICAgICAgICAgICAgXHR9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICBodG1sX2ZpbHRlcm4gKz0gJzwvZGl2Pic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkcy10aXRlbCBhYnNjaGxpZXNzZW5cbiAgICAgICAgICAgIGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gJzwvaDU+JztcbiAgICAgICAgICAgIGh0bWxfZmlsdGVybiArPSAnPC9oNT4nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gamV0enQgZGllIGNoZWNrYm94IHVtIGFsbGUgYXVzd8OkaGxlbiB6dSBrw7ZubmVuXG4gICAgICAgIC8vIGFiZXIgbnVyLCB3ZW5uIG1laHIgYWxzIDEgRmVsZCBleGlzdGllcmVuXG4gICAgICAgIGlmICgodGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4gJiYgXy5zaXplKHRheG9ub21pZS5FaWdlbnNjaGFmdGVuKSA+IDEpIHx8ICh0YXhvbm9taWUuQmV6aWVodW5nZW4gJiYgXy5zaXplKHRheG9ub21pZS5CZXppZWh1bmdlbikgPiAxKSkge1xuICAgICAgICAgICAgaHRtbF9mZWxkZXJfd8OkaGxlbiArPSAnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPic7XG4gICAgICAgICAgICBodG1sX2ZlbGRlcl93w6RobGVuICs9ICc8aW5wdXQgY2xhc3M9XCJmZWxkX3dhZWhsZW5fYWxsZV92b25fZHNcIiB0eXBlPVwiY2hlY2tib3hcIiBEc1R5cD1cIicrZHNfdHlwKydcIiBEYXRlbnNhbW1sdW5nPVwiJyArIHRheG9ub21pZS5OYW1lICsgJ1wiPjxlbT5hbGxlPC9lbT4nO1xuICAgICAgICAgICAgaHRtbF9mZWxkZXJfd8OkaGxlbiArPSAnPC9kaXY+PC9sYWJlbD4nO1xuICAgICAgICB9XG4gICAgICAgIGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gJzxkaXYgY2xhc3M9XCJmZWxkZXJzcGFsdGVcIj4nO1xuXG5cbiAgICAgICAgaHRtbF9maWx0ZXJuICs9ICc8ZGl2IGNsYXNzPVwiZmVsZGVyc3BhbHRlXCI+JztcbiAgICAgICAgZm9yICh4IGluICh0YXhvbm9taWUuRWlnZW5zY2hhZnRlbiB8fCB0YXhvbm9taWUuQmV6aWVodW5nZW4pKSB7XG4gICAgICAgICAgICAvLyBmZWxkZXIgd8OkaGxlblxuICAgICAgICAgICAgaHRtbF9mZWxkZXJfd8OkaGxlbiArPSAnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPic7XG4gICAgICAgICAgICBodG1sX2ZlbGRlcl93w6RobGVuICs9ICc8aW5wdXQgY2xhc3M9XCJmZWxkX3dhZWhsZW5cIiB0eXBlPVwiY2hlY2tib3hcIiBEc1R5cD1cIicrZHNfdHlwKydcIiBEYXRlbnNhbW1sdW5nPVwiJyArIHRheG9ub21pZS5OYW1lICsgJ1wiIEZlbGQ9XCInICsgeCArICdcIj4nICsgeDtcbiAgICAgICAgICAgIGh0bWxfZmVsZGVyX3fDpGhsZW4gKz0gJzwvZGl2PjwvbGFiZWw+JztcbiAgICAgICAgICAgIC8vIGZpbHRlcm5cbiAgICAgICAgICAgIGh0bWxfZmlsdGVybiArPSAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nO1xuICAgICAgICAgICAgaHRtbF9maWx0ZXJuICs9ICc8bGFiZWwgY2xhc3M9XCJjb250cm9sLWxhYmVsXCIgZm9yPVwiZXhwb3J0aWVyZW5fb2JqZWt0ZV93YWVobGVuX2RzXycgKyB3aW5kb3cuYWRiLmVyc2V0emVVbmfDvGx0aWdlWmVpY2hlbkluSWROYW1lbih4KSArICdcIic7XG4gICAgICAgICAgICAvLyBGZWxkbmFtZW4sIGRpZSBtZWhyIGFscyBlaW5lIFplaWxlIGJlbGVnZW46IE9iZW4gYXVzcmljaHRlblxuICAgICAgICAgICAgaWYgKHgubGVuZ3RoID4gMjgpIHtcbiAgICAgICAgICAgICAgICBodG1sX2ZpbHRlcm4gKz0gJyBzdHlsZT1cInBhZGRpbmctdG9wOjBweFwiJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWxfZmlsdGVybiArPSAnPicgKyB4ICsgJzwvbGFiZWw+JztcbiAgICAgICAgICAgIC8vaWYgKHRheG9ub21pZS5GZWxkdHlwID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgaWYgKCh0YXhvbm9taWUuRWlnZW5zY2hhZnRlbiAmJiAodGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW5beF0gPT09IFwiYm9vbGVhblwiKSkgfHwgKHRheG9ub21pZS5CZXppZWh1bmdlbiAmJiAodGF4b25vbWllLkJlemllaHVuZ2VuW3hdID09PSBcImJvb2xlYW5cIikpKSB7XG4gICAgICAgICAgICAgICAgLy8gaW4gZWluZXIgY2hlY2tib3ggZGFyc3RlbGxlblxuICAgICAgICAgICAgICAgIC8vIHJlYWRvbmx5IG1hcmtpZXJ0LCBkYXNzIGtlaW4gV2VydCBlcmZhc3N0IHd1cmRlXG4gICAgICAgICAgICAgICAgaHRtbF9maWx0ZXJuICs9ICc8aW5wdXQgY2xhc3M9XCJjb250cm9scyBmb3JtLWNvbnRyb2wgZXhwb3J0X2ZlbGRfZmlsdGVybiBmb3JtLWNvbnRyb2xcIiB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImV4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9kc18nICsgd2luZG93LmFkYi5lcnNldHplVW5nw7xsdGlnZVplaWNoZW5JbklkTmFtZW4oeCkgKyAnXCIgRHNUeXA9XCInICsgZHNfdHlwICsgJ1wiIEVpZ2Vuc2NoYWZ0PVwiJyArIHRheG9ub21pZS5OYW1lICsgJ1wiIEZlbGQ9XCInICsgeCArICdcIiByZWFkb25seT4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpbiBlaW5lbSBpbnB1dC1mZWxkIGRhcnN0ZWxsZW5cbiAgICAgICAgICAgICAgICBodG1sX2ZpbHRlcm4gKz0gJzxpbnB1dCBjbGFzcz1cImNvbnRyb2xzIGZvcm0tY29udHJvbCBleHBvcnRfZmVsZF9maWx0ZXJuIGZvcm0tY29udHJvbCBpbnB1dC1zbVwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJleHBvcnRpZXJlbl9vYmpla3RlX3dhZWhsZW5fZHNfJyArIHdpbmRvdy5hZGIuZXJzZXR6ZVVuZ8O8bHRpZ2VaZWljaGVuSW5JZE5hbWVuKHgpICsgJ1wiIERzVHlwPVwiJyArIGRzX3R5cCArICdcIiBFaWdlbnNjaGFmdD1cIicgKyB0YXhvbm9taWUuTmFtZSArICdcIiBGZWxkPVwiJyArIHggKyAnXCI+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWxfZmlsdGVybiArPSAnPC9kaXY+JztcbiAgICAgICAgfVxuICAgICAgICAvLyBTcGFsdGVuIGFic2NobGllc3NlblxuICAgICAgICBodG1sX2ZlbGRlcl93w6RobGVuICs9ICc8L2Rpdj4nO1xuICAgICAgICBodG1sX2ZpbHRlcm4gKz0gJzwvZGl2Pic7XG4gICAgfSk7XG5cdC8vIGxpbmllIHZvcmFuc3RlbGxlblxuXHRodG1sX2ZlbGRlcl93w6RobGVuID0gJzxocj4nICsgaHRtbF9mZWxkZXJfd8OkaGxlbjtcblx0aHRtbF9maWx0ZXJuID0gJzxocj4nICsgaHRtbF9maWx0ZXJuO1xuXHRpZiAoYmV6aWVodW5nc3NhbW1sdW5nZW4pIHtcblx0XHQkKFwiI2V4cG9ydGllcmVuX2ZlbGRlcl93YWVobGVuX2ZlbGRlcmxpc3RlXCIpLmh0bWwoaHRtbF9mZWxkZXJfd8OkaGxlbik7XG5cdFx0JChcIiNleHBvcnRpZXJlbl9vYmpla3RlX3dhZWhsZW5fZHNfZmVsZGVybGlzdGVcIikuaHRtbChodG1sX2ZpbHRlcm4pO1xuXHRcdHdpbmRvdy5hZGIuZXJzdGVsbGVFeHBvcnRmZWxkZXIoZGF0ZW5zYW1tbHVuZ2VuLCBiZXppZWh1bmdzc2FtbWx1bmdlbik7XG5cdH0gZWxzZSBpZiAoZGF0ZW5zYW1tbHVuZ2VuKSB7XG5cdFx0JChcIiNleHBvcnRpZXJlbl9mZWxkZXJfd2FlaGxlbl9mZWxkZXJsaXN0ZVwiKS5hcHBlbmQoaHRtbF9mZWxkZXJfd8OkaGxlbik7XG5cdFx0JChcIiNleHBvcnRpZXJlbl9vYmpla3RlX3dhZWhsZW5fZHNfZmVsZGVybGlzdGVcIikuYXBwZW5kKGh0bWxfZmlsdGVybik7XG5cdFx0d2luZG93LmFkYi5lcnN0ZWxsZUV4cG9ydGZlbGRlcihkYXRlbnNhbW1sdW5nZW4pO1xuXHR9IGVsc2Uge1xuXHRcdCQoXCIjZXhwb3J0aWVyZW5fZmVsZGVyX3dhZWhsZW5fZmVsZGVybGlzdGVcIikuYXBwZW5kKGh0bWxfZmVsZGVyX3fDpGhsZW4pO1xuXHRcdCQoXCIjZXhwb3J0aWVyZW5fb2JqZWt0ZV93YWVobGVuX2RzX2ZlbGRlcmxpc3RlXCIpXG4gICAgICAgICAgICAuYXBwZW5kKGh0bWxfZmlsdGVybilcbiAgICAgICAgICAgIC5maW5kKFwiaW5wdXRbdHlwZT0nY2hlY2tib3gnXVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgdGhpcy5pbmRldGVybWluYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXHR9XG59O1xuXG53aW5kb3cuYWRiLmVyc3RlbGxlRXhwb3J0U3RyaW5nID0gZnVuY3Rpb24oZXhwb3J0b2JqZWt0ZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBzdHJpbmdfdGl0ZWx6ZWlsZSA9IFwiXCIsXG5cdFx0c3RyaW5nX3plaWxlbiA9IFwiXCIsXG5cdFx0c3RyaW5nX3plaWxlO1xuICAgIF8uZWFjaChleHBvcnRvYmpla3RlLCBmdW5jdGlvbihleHBvcnRvYmpla3QpIHtcbiAgICAgICAgLy8gYXVzIHVuZXJrbMOkcmxpY2hlbSBHcnVuZCBibGllYiBzdHJpbmdUaXRlbHplaWxlIGxlZXIsIHdlbm4gbnVyIGVpbiBEYXRlbnNhdHogZ2VmaWx0ZXJ0IHd1cmRlXG4gICAgICAgIC8vIGRhaGVyIGJlaSBqZWRlbSBEYXRlbnNhdHogcHLDvGZlbiwgb2IgZWluZSBUaXRlbHplaWxlIGVyc3RlbGx0IHd1cmRlIHVuZCB3ZW5uIG7DtnRpZyBlcmfDpG56ZW5cbiAgICAgICAgaWYgKHN0cmluZ190aXRlbHplaWxlID09PSBcIlwiIHx8IHN0cmluZ190aXRlbHplaWxlID09PSBcIixcIikge1xuICAgICAgICAgICAgc3RyaW5nX3RpdGVsemVpbGUgPSBcIlwiO1xuICAgICAgICAgICAgLy8gZHVyY2ggU3BhbHRlbiBsb29wZW5cbiAgICAgICAgICAgIF8uZWFjaChleHBvcnRvYmpla3QsIGZ1bmN0aW9uKGZlbGQsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZ190aXRlbHplaWxlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ190aXRlbHplaWxlICs9ICcsJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyaW5nX3RpdGVsemVpbGUgKz0gJ1wiJyArIGluZGV4ICsgJ1wiJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0cmluZ196ZWlsZW4gIT09IFwiXCIpIHtcbiAgICAgICAgICAgIHN0cmluZ196ZWlsZW4gKz0gJ1xcbic7XG4gICAgICAgIH1cbiAgICAgICAgc3RyaW5nX3plaWxlID0gXCJcIjtcbiAgICAgICAgLy8gZHVyY2ggZGllIEZlbGRlciBsb29wZW5cbiAgICAgICAgXy5lYWNoKGV4cG9ydG9iamVrdCwgZnVuY3Rpb24oZmVsZCkge1xuICAgICAgICAgICAgaWYgKHN0cmluZ196ZWlsZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHN0cmluZ196ZWlsZSArPSAnLCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBudWxsLVdlcnRlIGFscyBsZWVyZSBXZXJ0ZVxuICAgICAgICAgICAgaWYgKGZlbGQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdHJpbmdfemVpbGUgKz0gXCJcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZlbGQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBaYWhsZW4gb2huZSBBbmbDvGhydW5ncy0gdW5kIFNjaGx1c3N6ZWljaGVuIGV4cG9ydGllcmVuXG4gICAgICAgICAgICAgICAgc3RyaW5nX3plaWxlICs9IGZlbGQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmZWxkID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gQW5mw7xocnVuZ3N6ZWljaGVuIHNpbmQgRmVsZHRyZW5uZXIgdW5kIG3DvHNzZW4gZGFoZXIgZXJzZXR6dCB3ZXJkZW5cbiAgICAgICAgICAgICAgICBzdHJpbmdfemVpbGUgKz0gJ1wiJyArIEpTT04uc3RyaW5naWZ5KGZlbGQpLnJlcGxhY2UoL1wiL2csIFwiJ1wiKSArICdcIic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0cmluZ196ZWlsZSArPSAnXCInICsgZmVsZCArICdcIic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzdHJpbmdfemVpbGVuICs9IHN0cmluZ196ZWlsZTtcbiAgICB9KTtcblx0cmV0dXJuIHN0cmluZ190aXRlbHplaWxlICsgXCJcXG5cIiArIHN0cmluZ196ZWlsZW47XG59O1xuXG4vLyBiYXV0IGltIEZvcm11bGFyIFwiZXhwb3J0XCIgZGllIExpc3RlIGFsbGVyIEVpZ2Vuc2NoYWZ0ZW4gYXVmXG4vLyB3aW5kb3cuYWRiLmZhc3NlVGF4b25vbWllblp1c2FtbWVuIHN0ZXVlcnQsIG9iIFRheG9ub21pZW4gYWxsZSBlaW56ZWxuIG9kZXIgdW50ZXIgZGVtIFRpdGVsIFRheG9ub21pZW4genVzYW1tZW5nZWZhc3N0IHdlcmRlblxuLy8gYmVrb21tdCBkZW4gTmFtZW4gZGVyIEdydXBwZVxud2luZG93LmFkYi5lcnN0ZWxsZUxpc3RlRsO8ckZlbGR3YWhsID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGV4cG9ydF9ncnVwcGVuID0gW10sXG5cdFx0Z3J1cHBlbiA9IFtdLFxuICAgICAgICAkZXhwb3J0aWVyZW5fb2JqZWt0ZV93YWVobGVuX2dydXBwZW5faGlud2Vpc190ZXh0ID0gJChcIiNleHBvcnRpZXJlbl9vYmpla3RlX3dhZWhsZW5fZ3J1cHBlbl9oaW53ZWlzX3RleHRcIiksXG4gICAgICAgICRleHBvcnRpZXJlbl9udXJfb2JqZWt0ZV9taXRfZWlnZW5zY2hhZnRlbl9jaGVja2JveCA9ICQoXCIjZXhwb3J0aWVyZW5fbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW5fY2hlY2tib3hcIiksXG4gICAgICAgICRleHBvcnRpZXJlbl9udXJfb2JqZWt0ZV9taXRfZWlnZW5zY2hhZnRlbiA9ICQoXCIjZXhwb3J0aWVyZW5fbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW5cIiksXG4gICAgICAgICRleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9jb2xsYXBzZSA9ICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fY29sbGFwc2VcIiksXG4gICAgICAgICRleHBvcnRpZXJlbl9mZWxkZXJfd2FlaGxlbl9jb2xsYXBzZSA9ICQoXCIjZXhwb3J0aWVyZW5fZmVsZGVyX3dhZWhsZW5fY29sbGFwc2VcIiksXG4gICAgICAgICRleHBvcnRpZXJlbl9vYmpla3RlX3dhZWhsZW5fZHNfY29sbGFwc2UgPSAkKFwiI2V4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9kc19jb2xsYXBzZVwiKTtcbiAgICAvLyBmYWxscyBub2NoIG9mZmVuOiBmb2xnZW5kZSBCZXJlaWNoZSBzY2hsaWVzc2VuXG4gICAgaWYgKCRleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9jb2xsYXBzZS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAkZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fY29sbGFwc2UuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICB9XG4gICAgaWYgKCRleHBvcnRpZXJlbl9mZWxkZXJfd2FlaGxlbl9jb2xsYXBzZS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAkZXhwb3J0aWVyZW5fZmVsZGVyX3dhZWhsZW5fY29sbGFwc2UuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICB9XG4gICAgaWYgKCRleHBvcnRpZXJlbl9vYmpla3RlX3dhZWhsZW5fZHNfY29sbGFwc2UuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgJGV4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9kc19jb2xsYXBzZS5jb2xsYXBzZSgnaGlkZScpO1xuICAgIH1cblxuXHQvLyBCZXNjaMOkZnRpZ3VuZyBtZWxkZW5cblx0JGV4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9ncnVwcGVuX2hpbndlaXNfdGV4dFxuICAgICAgICAuYWxlcnQoKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1zdWNjZXNzXCIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWRhbmdlclwiKVxuICAgICAgICAuYWRkQ2xhc3MoXCJhbGVydC1pbmZvXCIpXG4gICAgICAgIC5zaG93KClcblx0ICAgIC5odG1sKFwiRWlnZW5zY2hhZnRlbiB3ZXJkZW4gZXJtaXR0ZWx0Li4uXCIpO1xuXHQvLyBzY3JvbGxlbiwgZGFtaXQgSGlud2VpcyBzaWNoZXIgZ2FueiBzaWNodGJhciBpc3Rcblx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdHNjcm9sbFRvcDogJGV4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9ncnVwcGVuX2hpbndlaXNfdGV4dC5vZmZzZXQoKS50b3Bcblx0fSwgMjAwMCk7XG5cdC8vIGdld8OkaGx0ZSBHcnVwcGVuIGVybWl0dGVsblxuXHQvLyBnbG9iYWxlIFZhcmlhYmxlIGVudGjDpGx0IGRpZSBHcnVwcGVuLiBEYW1pdCBuYWNoIEFKQVgtQWJmcmFnZW4gYmVzdGltbXQgd2VyZGVuIGthbm4sIG9iIGFsbGUgRGF0ZW4gdm9ybGllZ2VuXG5cdC8vIGdsb2JhbGUgVmFyaWFibGUgc2FtbWVsdCBhcnJheXMgbWl0IGRlbiBMaXN0ZW4gZGVyIEZlbGRlciBwcm8gR3J1cHBlXG5cdHZhciBleHBvcnRfZmVsZGVyX2FycmF5cyA9IFtdO1xuXHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdCQoXCIuZXhwb3J0aWVyZW5fZHNfb2JqZWt0ZV93YWVobGVuX2dydXBwZVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0ZXhwb3J0X2dydXBwZW4ucHVzaCgkKHRoaXMpLnZhbCgpKTtcblx0XHR9XG5cdH0pO1xuICAgIC8qaWYgKGV4cG9ydF9ncnVwcGVuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gd2VubiBtZWhyZXJlIEdydXBwZW4gZ2V3w6RobHQgd2VyZGVuXG4gICAgICAgIC8vIE9wdGlvbiBleHBvcnRpZXJlbl9udXJfb2JqZWt0ZV9taXRfZWlnZW5zY2hhZnRlbiBhdXNibGVuZGVuXG4gICAgICAgIC8vIHVuZCBmYWxzZSBzZXR6ZW5cbiAgICAgICAgLy8gc29uc3Qga29tbWVuIG51ciBkaWUgRFMgZWluZXIgR3J1cHBlXG4gICAgICAgICRleHBvcnRpZXJlbl9udXJfb2JqZWt0ZV9taXRfZWlnZW5zY2hhZnRlbl9jaGVja2JveC5hZGRDbGFzcyhcImFkYi1oaWRkZW5cIik7XG4gICAgICAgICRleHBvcnRpZXJlbl9udXJfb2JqZWt0ZV9taXRfZWlnZW5zY2hhZnRlbi5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgkZXhwb3J0aWVyZW5fbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW5fY2hlY2tib3guaGFzQ2xhc3MoXCJhZGItaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICAkZXhwb3J0aWVyZW5fbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW5fY2hlY2tib3gucmVtb3ZlQ2xhc3MoXCJhZGItaGlkZGVuXCIpXG4gICAgICAgICAgICAkZXhwb3J0aWVyZW5fbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW4ucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSovXG5cdGlmIChleHBvcnRfZ3J1cHBlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGdydXBwZW4gZWluemVsbiBhYmZyYWdlblxuICAgICAgICBncnVwcGVuID0gZXhwb3J0X2dydXBwZW47XG4gICAgICAgIF8uZWFjaChncnVwcGVuLCBmdW5jdGlvbihncnVwcGUpIHtcbiAgICAgICAgICAgIC8vIEZlbGRlciBhYmZyYWdlblxuICAgICAgICAgICAgJGRiLnZpZXcoJ2FydGVuZGIvZmVsZGVyP2dyb3VwX2xldmVsPTUmc3RhcnRrZXk9W1wiJytncnVwcGUrJ1wiXSZlbmRrZXk9W1wiJytncnVwcGUrJ1wiLHt9LHt9LHt9LHt9XScsIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydF9mZWxkZXJfYXJyYXlzID0gXy51bmlvbihleHBvcnRfZmVsZGVyX2FycmF5cywgZGF0YS5yb3dzKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRpZSBHcnVwcGUgXCIgKyBncnVwcGUgKyBcIiBoYXQgc292aWVsZSBGZWxkZXIgPSBcIiArIGRhdGEucm93cy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBlaW5lIEdydXBwZSBhdXMgZXhwb3J0X2dydXBwZW4gZW50ZmVybmVuXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydF9ncnVwcGVuLnNwbGljZSgwLDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwb3J0X2dydXBwZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGxlIEdydXBwZW4gc2luZCB2ZXJhcmJlaXRldFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkYi5lcnN0ZWxsZUxpc3RlRsO8ckZlbGR3YWhsXzIoZXhwb3J0X2ZlbGRlcl9hcnJheXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGxldHp0ZSBSw7xja21lbGR1bmcgYW5wYXNzZW5cblx0XHQkZXhwb3J0aWVyZW5fb2JqZWt0ZV93YWVobGVuX2dydXBwZW5faGlud2Vpc190ZXh0Lmh0bWwoXCJiaXR0ZSBlaW5lIEdydXBwZSB3w6RobGVuXCIpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1pbmZvXCIpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJhbGVydC1zdWNjZXNzXCIpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJhbGVydC1kYW5nZXJcIik7XG5cdFx0Ly8gRmVsZGVyIGVudGZlcm5lblxuXHRcdCQoXCIjZXhwb3J0aWVyZW5fZmVsZGVyX3dhZWhsZW5fZmVsZGVybGlzdGVcIikuaHRtbChcIlwiKTtcblx0XHQkKFwiI2V4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9kc19mZWxkZXJsaXN0ZVwiKS5odG1sKFwiXCIpO1xuXHR9XG4gICAgLy8gVGFiZWxsZSBhdXNibGVuZGVuLCBmYWxscyBzaWUgZWluZ2VibGVuZGV0IHdhclxuICAgICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fdGFiZWxsZVwiKS5oaWRlKCk7XG59O1xuXG53aW5kb3cuYWRiLmVyc3RlbGxlTGlzdGVGw7xyRmVsZHdhaGxfMiA9IGZ1bmN0aW9uKGV4cG9ydF9mZWxkZXJfYXJyYXlzKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIGZlbGRlcl9vYmpla3QgPSB7fSxcblx0XHRoaW53ZWlzX3RheG9ub21pZW4sXG4gICAgICAgIHRheG9ub21pZW4sXG4gICAgICAgIGRhdGVuc2FtbWx1bmdlbixcbiAgICAgICAgYmV6aWVodW5nc3NhbW1sdW5nZW47XG5cblx0Ly8gaW4gZXhwb3J0X2ZlbGRlcl9hcnJheXMgaXN0IGVpbmUgTGlzdGUgZGVyIEZlbGRlciwgZGllIGluIGRpZXNlciBHcnVwcGUgZW50aGFsdGVuIHNpbmRcblx0Ly8gc2llIGthbm4gYWJlciBNZWhyZmFjaGVpbnRyw6RnZSBlbnRoYWx0ZW4sIGRpZSBzaWNoIGluIGRlciBHcnVwcGUgdW50ZXJzY2hlaWRlblxuXHQvLyBNdXN0ZXI6IEdydXBwZSwgVHlwIGRlciBEYXRlbnNhbW1sdW5nLCBOYW1lIGRlciBEYXRlbnNhbW1sdW5nLCBOYW1lIGRlcyBGZWxkc1xuXHQvLyBNZWhyZmFjaGVpbnRyw6RnZSBzb2xsZW4gZW50ZmVybnQgd2VyZGVuXG5cblx0Ly8gZGF6dSBtdXNzIHp1ZXJzdCBkaWUgR3J1cHBlIGVudGZlcm50IHdlcmRlblxuICAgIF8uZWFjaChleHBvcnRfZmVsZGVyX2FycmF5cywgZnVuY3Rpb24oZXhwb3J0X2ZlbGRlcikge1xuICAgICAgICBleHBvcnRfZmVsZGVyLmtleS5zcGxpY2UoMCwxKTtcbiAgICB9KTtcblxuXHQvLyBqZXR6dCBudXIgbm9jaCBlaW5laW5kZXV0aWdlIEFycmF5LU9iamVrdGUgKD1FaWdlbnNjaGFmdGVuc2FtbWx1bmdlbikgYmVsYXNzZW5cblx0ZXhwb3J0X2ZlbGRlcl9hcnJheXMgPSBfLnVuaW9uKGV4cG9ydF9mZWxkZXJfYXJyYXlzKTtcblx0Ly8gamV0enQgZGVuIEFycmF5IHZvbiBPYmpla3RlbiBuYWNoIGtleSBzb3J0aWVyZW5cblx0ZXhwb3J0X2ZlbGRlcl9hcnJheXMgPSBfLnNvcnRCeShleHBvcnRfZmVsZGVyX2FycmF5cywgZnVuY3Rpb24ob2JqZWN0KSB7XG5cdFx0cmV0dXJuIG9iamVjdC5rZXk7XG5cdH0pO1xuXG5cdC8vIEltIE9iamVrdCBcIkZlbGRlck9iamVrdFwiIHdlcmRlbiBkaWUgRmVsZGVyIGFsbGVyIGdld8OkaGx0ZW4gR3J1cHBlbiBnZXNhbW1lbHRcblx0ZmVsZGVyX29iamVrdCA9IHdpbmRvdy5hZGIuZXJnw6RuemVGZWxkZXJPYmpla3QoZmVsZGVyX29iamVrdCwgZXhwb3J0X2ZlbGRlcl9hcnJheXMpO1xuXG5cdC8vIGJlaSBhbGxmw6RsbGlnZW4gXCJUYXhvbm9taWUobilcIiBGZWxkbmFtZW4gc29ydGllcmVuXG5cdGlmIChmZWxkZXJfb2JqZWt0W1wiVGF4b25vbWllKG4pXCJdICYmIGZlbGRlcl9vYmpla3RbXCJUYXhvbm9taWUobilcIl0uRWlnZW5zY2hhZnRlbikge1xuXHRcdGZlbGRlcl9vYmpla3RbXCJUYXhvbm9taWUobilcIl0uRWlnZW5zY2hhZnRlbiA9IHdpbmRvdy5hZGIuc29ydEtleXNPZk9iamVjdChmZWxkZXJfb2JqZWt0W1wiVGF4b25vbWllKG4pXCJdLkVpZ2Vuc2NoYWZ0ZW4pO1xuXHR9XG5cblx0Ly8gVGF4b25vbWllbiB1bmQgRGF0ZW5zYW1tbHVuZ2VuIGF1cyBkZW0gRmVsZGVyT2JqZWt0IGV4dHJhaGllcmVuXG5cdHRheG9ub21pZW4gPSBbXTtcblx0ZGF0ZW5zYW1tbHVuZ2VuID0gW107XG5cdGJlemllaHVuZ3NzYW1tbHVuZ2VuID0gW107XG5cbiAgICBfLmVhY2goZmVsZGVyX29iamVrdCwgZnVuY3Rpb24oZHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkcyA9PT0gXCJvYmplY3RcIiAmJiBkcy5UeXApIHtcbiAgICAgICAgICAgIC8vIGRhcyBpc3QgRGF0ZW5zYW1tbHVuZyBvZGVyIFRheG9ub21pZVxuICAgICAgICAgICAgaWYgKGRzLlR5cCA9PT0gXCJEYXRlbnNhbW1sdW5nXCIpIHtcbiAgICAgICAgICAgICAgICBkYXRlbnNhbW1sdW5nZW4ucHVzaChkcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRzLlR5cCA9PT0gXCJUYXhvbm9taWVcIikge1xuICAgICAgICAgICAgICAgIHRheG9ub21pZW4ucHVzaChkcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRzLlR5cCA9PT0gXCJCZXppZWh1bmdcIikge1xuICAgICAgICAgICAgICAgIGJlemllaHVuZ3NzYW1tbHVuZ2VuLnB1c2goZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkLndoZW4od2luZG93LmFkYi5ob2xlRGF0ZW5zYW1tbHVuZ2VuRsO8ckV4cG9ydGZlbGRlcigpKS5kb25lKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuYWRiLmVyc3RlbGxlRXhwb3J0ZmVsZGVyKHRheG9ub21pZW4sIGRhdGVuc2FtbWx1bmdlbiwgYmV6aWVodW5nc3NhbW1sdW5nZW4pO1xuICAgIH0pO1xuXG5cdC8vIGtvbnRyb2xsaWVyZW4sIG9iIFRheG9ub21pZW4genVzYW1tZW5nZWZhc3N0IHdlcmRlblxuXHRpZiAoJChcIiNleHBvcnRpZXJlbl9vYmpla3RlX1RheG9ub21pZW5fenVzYW1tZW5mYXNzZW5cIikuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcblx0XHRoaW53ZWlzX3RheG9ub21pZW4gPSBcIkRpZSBFaWdlbnNjaGFmdGVuIHd1cmRlbiBhdWZnZWJhdXQ8YnI+QWxsZSBUYXhvbm9taWVuIHNpbmQgenVzYW1tZW5nZWZhc3N0XCI7XG5cdH0gZWxzZSB7XG5cdFx0aGlud2Vpc190YXhvbm9taWVuID0gXCJEaWUgRWlnZW5zY2hhZnRlbiB3dXJkZW4gYXVmZ2ViYXV0PGJyPkFsbGUgVGF4b25vbWllbiB3ZXJkZW4gZWluemVsbiBkYXJnZXN0ZWxsdFwiO1xuXHR9XG5cdC8vIEVyZ2VibmlzIHLDvGNrbWVsZGVuXG5cdCQoXCIjZXhwb3J0aWVyZW5fb2JqZWt0ZV93YWVobGVuX2dydXBwZW5faGlud2Vpc190ZXh0XCIpXG4gICAgICAgIC5hbGVydCgpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImFsZXJ0LWluZm9cIilcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiYWxlcnQtZGFuZ2VyXCIpXG4gICAgICAgIC5hZGRDbGFzcyhcImFsZXJ0LXN1Y2Nlc3NcIilcbiAgICAgICAgLnNob3coKVxuICAgICAgICAuaHRtbChoaW53ZWlzX3RheG9ub21pZW4pO1xufTtcblxuLy8gaG9sdCBlaW5lIExpc3RlIGFsbGVyIERhdGVuc2FtbWx1bmdlbiwgd2VubiBuw7Z0aWdcbi8vIHNwZWljaGVydCBzaWUgaW4gZWluZXIgZ2xvYmFsZW4gVmFyaWFibGUsIGRhbWl0IHNpZSB3aWVkZXJ2ZXJ3ZW5kZXQgd2VyZGVuIGthbm5cbndpbmRvdy5hZGIuaG9sZURhdGVuc2FtbWx1bmdlbkbDvHJFeHBvcnRmZWxkZXIgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuICAgIHZhciBleGZlX2dlaG9sdCA9ICQuRGVmZXJyZWQoKTtcbiAgICBpZiAod2luZG93LmFkYi5kc19ic192b25fb2JqZWt0ZW4pIHtcbiAgICAgICAgZXhmZV9nZWhvbHQucmVzb2x2ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcbiAgICAgICAgJGRiLnZpZXcoJ2FydGVuZGIvZHNfdm9uX29iamVrdGVuP2dyb3VwX2xldmVsPTUnLCB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gRGF0ZW4gaW4gT2JqZWt0dmFyaWFibGUgc3BlaWNoZXJuID4gV2VubiBEcyBhdXNnZXfDpGhsdCwgQW5nYWJlbiBpbiBkaWUgRmVsZGVyIGtvcGllcmVuXG4gICAgICAgICAgICAgICAgd2luZG93LmFkYi5kc19ic192b25fb2JqZWt0ZW4gPSBkYXRhO1xuICAgICAgICAgICAgICAgIGV4ZmVfZ2Vob2x0LnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBleGZlX2dlaG9sdC5wcm9taXNlKCk7XG59O1xuXG4vLyBOaW1tdCBlaW4gRmVsZGVyT2JqZWt0IGVudGdlZ2VuLiBEYXMgaXN0IGVudHdlZGVyIGxlZXIgKGVyc3RlIEdydXBwZSkgb2RlciBlbnRow6RsdCBzY2hvbiBGZWxkZXIgKGFiIGRlciB6d2VpdGVuIEdydXBwZSlcbi8vIE5pbW10IGVpbiBBcnJheSBtaXQgRmVsZGVybiBlbnRnZWdlblxuLy8gbWl0IGRlciBTdHJ1a3R1cjoge1wia2V5XCI6W1wiRmxvcmFcIixcIkRhdGVuc2FtbWx1bmdcIixcIkJsYXVlIExpc3RlICgxOTk4KVwiLFwiQW53ZW5kdW5nc2jDpHVmaWdrZWl0IHp1ciBFcmhhbHR1bmdcIl0sXCJ2YWx1ZVwiOm51bGx9XG4vLyBlcmfDpG56dCBkYXMgRmVsZGVyT2JqZWt0IHVtIGRpZXNlIEZlbGRlclxuLy8gcmV0b3VybmllcnQgZGFzIGVyZ8Okbnp0ZSBGZWxkZXJPYmpla3Rcbi8vIGRhcyBGZWxkZXJPYmpla3QgZW50aMOkbHQgYWxsZSBnZXfDvG5zY2h0ZW4gRmVsZGVyLiBEYXJpbiBzaW5kIG51bGx3ZXJ0ZVxud2luZG93LmFkYi5lcmfDpG56ZUZlbGRlck9iamVrdCA9IGZ1bmN0aW9uKGZlbGRlcl9vYmpla3QsIGZlbGRlcl9hcnJheSkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBkc190eXAsXG5cdFx0ZHNfbmFtZSxcblx0XHRmZWxkbmFtZSxcbiAgICAgICAgZmVsZHR5cDtcbiAgICBfLmVhY2goZmVsZGVyX2FycmF5LCBmdW5jdGlvbihmZWxkX29iamVrdCkge1xuICAgICAgICBpZiAoZmVsZF9vYmpla3Qua2V5KSB7XG4gICAgICAgICAgICAvLyBHcnVwcGUgd3VyZGUgZW50ZmVybnQsIHNvIHNpbmQgYWxsZSBrZXlzIHVtIDEga2xlaW5lciBhbHMgdXJzcHLDvG5nbGljaFxuICAgICAgICAgICAgZHNfdHlwID0gZmVsZF9vYmpla3Qua2V5WzBdO1xuICAgICAgICAgICAgZHNfbmFtZSA9IGZlbGRfb2JqZWt0LmtleVsxXTtcbiAgICAgICAgICAgIGZlbGRuYW1lID0gZmVsZF9vYmpla3Qua2V5WzJdO1xuICAgICAgICAgICAgZmVsZHR5cCA9IGZlbGRfb2JqZWt0LmtleVszXTtcbiAgICAgICAgICAgIGlmIChkc190eXAgPT09IFwiT2JqZWt0XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBkYXMgaXN0IGVpbmUgRWlnZW5zY2hhZnQgZGVzIE9iamVrdHNcbiAgICAgICAgICAgICAgICAvL0ZlbGRlck9iamVrdFtGZWxkTmFtZV0gPSBudWxsO1x0Ly8gTklDSFQgSElOWlVGw5xHRU4sIERJRVNFIEZFTERFUiBTSU5EIFNDSE9OIElNIEZPUk1VTEFSIEZJWCBEUklOXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5hZGIuZmFzc2VUYXhvbm9taWVuWnVzYW1tZW4gJiYgZHNfdHlwID09PSBcIlRheG9ub21pZVwiKSB7XG4gICAgICAgICAgICAgICAgLy8gRGF0ZW5zYW1tbHVuZ2VuIHdlcmRlbiB6dXNhbW1lbmdlZmFzc3QuIERzVHlwIG11c3MgXCJUYXhvbm9taWUobilcIiBoZWlzc2VuIHVuZCBkaWUgRmVsZGVyIGFsbGVyIFRheG9ub21pZW4gc2FtbWVsblxuICAgICAgICAgICAgICAgIC8vIFdlbm4gRGF0ZW5zYW1tbHVuZyBub2NoIG5pY2h0IGV4aXN0aWVydCwgZ3LDvG5kZW5cbiAgICAgICAgICAgICAgICBpZiAoIWZlbGRlcl9vYmpla3RbXCJUYXhvbm9taWUobilcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtcIlRheG9ub21pZShuKVwiXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBmZWxkZXJfb2JqZWt0W1wiVGF4b25vbWllKG4pXCJdLlR5cCA9IGRzX3R5cDtcbiAgICAgICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtcIlRheG9ub21pZShuKVwiXS5OYW1lID0gXCJUYXhvbm9taWUobilcIjtcbiAgICAgICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtcIlRheG9ub21pZShuKVwiXS5FaWdlbnNjaGFmdGVuID0ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEZlbGQgZXJnw6RuemVuXG4gICAgICAgICAgICAgICAgLy8gYWxzIEZlbGR3ZXJ0IGRlbiBGZWxkdHlwIMO8YmVyZ2ViZW5cbiAgICAgICAgICAgICAgICBmZWxkZXJfb2JqZWt0W1wiVGF4b25vbWllKG4pXCJdLkVpZ2Vuc2NoYWZ0ZW5bZmVsZG5hbWVdID0gZmVsZHR5cDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZHNfdHlwID09PSBcIkRhdGVuc2FtbWx1bmdcIiB8fCBkc190eXAgPT09IFwiVGF4b25vbWllXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZW5uIERhdGVuc2FtbWx1bmcgb2RlciBUYXhvbm9taWUgbm9jaCBuaWNodCBleGlzdGllcnQsIGdyw7xuZGVuXG4gICAgICAgICAgICAgICAgaWYgKCFmZWxkZXJfb2JqZWt0W2RzX25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGZlbGRlcl9vYmpla3RbZHNfbmFtZV0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtkc19uYW1lXS5UeXAgPSBkc190eXA7XG4gICAgICAgICAgICAgICAgICAgIGZlbGRlcl9vYmpla3RbZHNfbmFtZV0uTmFtZSA9IGRzX25hbWU7XG4gICAgICAgICAgICAgICAgICAgIGZlbGRlcl9vYmpla3RbZHNfbmFtZV0uRWlnZW5zY2hhZnRlbiA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBGZWxkIGVyZ8OkbnplblxuICAgICAgICAgICAgICAgIC8vIGFscyBGZWxkd2VydCBkZW4gRmVsZHR5cCDDvGJlcmdlYmVuXG4gICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtkc19uYW1lXS5FaWdlbnNjaGFmdGVuW2ZlbGRuYW1lXSA9IGZlbGR0eXA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRzX3R5cCA9PT0gXCJCZXppZWh1bmdcIikge1xuICAgICAgICAgICAgICAgIC8vIFdlbm4gQmV6aWVodW5nc3R5cCBub2NoIG5pY2h0IGV4aXN0aWVydCwgZ3LDvG5kZW5cbiAgICAgICAgICAgICAgICBpZiAoIWZlbGRlcl9vYmpla3RbZHNfbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtkc19uYW1lXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBmZWxkZXJfb2JqZWt0W2RzX25hbWVdLlR5cCA9IGRzX3R5cDtcbiAgICAgICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtkc19uYW1lXS5OYW1lID0gZHNfbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtkc19uYW1lXS5CZXppZWh1bmdlbiA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBGZWxkIGVyZ8OkbnplblxuICAgICAgICAgICAgICAgIC8vIGFscyBGZWxkd2VydCBkZW4gRmVsZHR5cCDDvGJlcmdlYmVuXG4gICAgICAgICAgICAgICAgZmVsZGVyX29iamVrdFtkc19uYW1lXS5CZXppZWh1bmdlbltmZWxkbmFtZV0gPSBmZWxkdHlwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cdHJldHVybiBmZWxkZXJfb2JqZWt0O1xufTtcblxuLy8gd2lyZCBhdWZnZXJ1ZmVuIGR1cmNoIGVpbmUgZGVyIHp3ZWkgU2NoYWx0ZmzDpGNoZW46IFwiVm9yc2NoYXUgYW56ZWlnZW5cIiwgXCJkaXJla3QgZXhwb3J0aWVyZW5cIlxuLy8gZGlyZWt0OiBsaXN0LWZ1bmt0aW9uIGF1ZnJ1ZmVuLCB3ZWxjaGUgZGllIERhdGVuIGRpcmVrdCBoZXJ1bnRlcmzDpGR0XG53aW5kb3cuYWRiLmZpbHRlcmVGw7xyRXhwb3J0ID0gZnVuY3Rpb24oZGlyZWt0KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8gQXJyYXkgdm9uIEZpbHRlcm9iamVrdGVuIGJpbGRlblxuXHR2YXIgZmlsdGVya3JpdGVyaWVuID0gW10sXG5cdFx0Ly8gT2JqZWt0IGJpbGRlbiwgaW4gZGFzIGRpZSBGaWx0ZXJrcml0ZXJpZW4gaW50ZWdyaWVydCB3ZXJkZW4sIGRhIGVpbiBhcnJheSBzY2hsZWNodCDDvGJlciBkaWUgdXJsIGdlbGllZmVydCB3aXJkXG5cdFx0ZmlsdGVya3JpdGVyaWVuX29iamVrdCA9IHt9LFxuXHRcdGZpbHRlcl9vYmpla3QsXG5cdFx0Z3J1cHBlbl9hcnJheSA9IFtdLFxuXHRcdGdydXBwZW4gPSBcIlwiLFxuXHRcdGdld8OkaGx0ZV9mZWxkZXIgPSBbXSxcbiAgICAgICAgYW56X2dld8OkaGx0ZV9mZWxkZXJfYXVzX2RzYnMgPSAwLFxuXHRcdGdld8OkaGx0ZV9mZWxkZXJfb2JqZWt0ID0ge30sXG5cdFx0YW56X2RzX2dld8OkaGx0ID0gMCxcbiAgICAgICAgJGV4cG9ydGllcmVuX2V4cG9ydGllcmVuX2hpbndlaXNfdGV4dCA9ICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5faGlud2Vpc190ZXh0XCIpLFxuICAgICAgICBodG1sX2ZpbHRlcmtyaXRlcmllbjtcblxuXHQvLyBrb250cm9sbGllcmVuLCBvYiBlaW5lIEdydXBwZSBnZXfDpGhsdCB3dXJkZVxuXHRpZiAod2luZG93LmFkYi5mw7xyRXhwb3J0R2V3w6RobHRlR3J1cHBlbigpLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIEJlc2Now6RmdGlndW5nIG1lbGRlblxuXHRpZiAoIWRpcmVrdCkge1xuXHRcdCRleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9oaW53ZWlzX3RleHRcbiAgICAgICAgICAgIC5hbGVydCgpXG4gICAgICAgICAgICAuc2hvdygpXG4gICAgICAgICAgICAuaHRtbChcIkRpZSBEYXRlbiB3ZXJkZW4gdm9yYmVyZWl0ZXQuLi5cIik7XG5cdH1cblxuXHQvLyB6dW0gSGlud2Vpc3RleHQgc2Nyb2xsZW5cblx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdHNjcm9sbFRvcDogJGV4cG9ydGllcmVuX2V4cG9ydGllcmVuX2hpbndlaXNfdGV4dC5vZmZzZXQoKS50b3Bcblx0fSwgMjAwMCk7XG5cdC8vIGdld8OkaGx0ZSBHcnVwcGVuIGVybWl0dGVsblxuICAgICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fZnVlcl9hbHRcIikuYWRkQ2xhc3MoXCJhZGItaGlkZGVuLXN0cmljdGx5XCIpO1xuXHQkKFwiLmV4cG9ydGllcmVuX2RzX29iamVrdGVfd2FlaGxlbl9ncnVwcGVcIikuZWFjaChmdW5jdGlvbigpIHtcblx0XHRpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdGdydXBwZW5fYXJyYXkucHVzaCgkKHRoaXMpLmF0dHIoJ3ZpZXcnKSk7XG5cdFx0XHRpZiAoZ3J1cHBlbikge1xuXHRcdFx0XHRncnVwcGVuICs9IFwiLFwiO1xuXHRcdFx0fVxuXHRcdFx0Z3J1cHBlbiArPSAkKHRoaXMpLnZhbCgpO1xuXHRcdH1cblx0fSk7XG4gICAgdmFyIGdydXBwZW5saXN0ZSA9IGdydXBwZW4uc3BsaXQoXCIsXCIpO1xuICAgIGlmIChncnVwcGVubGlzdGUuaW5kZXhPZihcIkZsb3JhXCIpID49IDAgJiYgZ3J1cHBlbmxpc3RlLmluZGV4T2YoXCJGYXVuYVwiKSA+PSAwKSB7XG4gICAgICAgIC8vIFdlbm4gRmxvcmEgdW5kIEZhdW5hIGdld8OkaGx0OiBTY2hhbHRmbMOkY2hlIGbDvHIgZGVuIEV4cG9ydCBmw7xyIGRhcyBBTFQgYW56ZWlnZW5cbiAgICAgICAgJChcIiNleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9leHBvcnRpZXJlbl9mdWVyX2FsdFwiKS5yZW1vdmVDbGFzcyhcImFkYi1oaWRkZW4tc3RyaWN0bHlcIik7XG4gICAgfVxuXHQvLyBkdXJjaCBhbGxlIEZpbHRlcmZlbGRlciBsb29wZW5cblx0Ly8gd2VubiBlaW4gRmVsZCBlaW5lbiBXZXJ0IGVudGjDpGx0LCBkYW5hY2ggZmlsdGVyblxuXHQkKFwiI2V4cG9ydGllcmVuX29iamVrdGVfd2FlaGxlbl9kc19jb2xsYXBzZVwiKS5maW5kKFwiLmV4cG9ydF9mZWxkX2ZpbHRlcm5cIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzLFxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBpZiAodGhhdC50eXBlID09PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIGlmICghJHRoaXMucHJvcCgncmVhZG9ubHknKSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcl9vYmpla3QgPSB7fTtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfb2JqZWt0LkRzVHlwID0gJHRoaXMuYXR0cignZHN0eXAnKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfb2JqZWt0LkRzTmFtZSA9ICR0aGlzLmF0dHIoJ2VpZ2Vuc2NoYWZ0Jyk7XG4gICAgICAgICAgICAgICAgZmlsdGVyX29iamVrdC5GZWxkbmFtZSA9ICR0aGlzLmF0dHIoJ2ZlbGQnKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfb2JqZWt0LkZpbHRlcndlcnQgPSAkdGhpcy5wcm9wKFwiY2hlY2tlZFwiKTtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfb2JqZWt0LlZlcmdsZWljaHNvcGVyYXRvciA9IFwiPVwiO1xuICAgICAgICAgICAgICAgIGZpbHRlcmtyaXRlcmllbi5wdXNoKGZpbHRlcl9vYmpla3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDDvGJyaWdlIGNoZWNrYm94ZW4gaWdub3JpZXJlblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZSA9PT0gMCkge1xuXHRcdFx0Ly8gRmlsdGVyb2JqZWt0IHp1csO8Y2tzZXR6ZW5cblx0XHRcdGZpbHRlcl9vYmpla3QgPSB7fTtcblx0XHRcdGZpbHRlcl9vYmpla3QuRHNUeXAgPSAkdGhpcy5hdHRyKCdkc3R5cCcpO1xuXHRcdFx0ZmlsdGVyX29iamVrdC5Ec05hbWUgPSAkdGhpcy5hdHRyKCdlaWdlbnNjaGFmdCcpO1xuXHRcdFx0ZmlsdGVyX29iamVrdC5GZWxkbmFtZSA9ICR0aGlzLmF0dHIoJ2ZlbGQnKTtcblx0XHRcdC8vIEZpbHRlcndlcnQgaW4gS2xlaW5zY2hyaWZ0IHZlcndhbmRlbG4sIGRhbWl0IEdyb3NzLS9LbGVpbnNjaHJpZnQgbmljaHQgd2VzZW50bGljaCBpc3QgKFZlcmdsZWljaHN3ZXJ0ZSB3ZXJkZW4gdm9uIGZpbHRlcmVGw7xyRXhwb3J0IHNww6R0ZXIgYXVjaCBpbiBLbGVpbnNjaHJpZnQgdmVyd2FuZGVsdClcblx0XHRcdGZpbHRlcl9vYmpla3QuRmlsdGVyd2VydCA9IHdpbmRvdy5hZGIuZXJtaXR0bGVWZXJnbGVpY2hzb3BlcmF0b3IodGhpcy52YWx1ZSlbMV07XG5cdFx0XHRmaWx0ZXJfb2JqZWt0LlZlcmdsZWljaHNvcGVyYXRvciA9IHdpbmRvdy5hZGIuZXJtaXR0bGVWZXJnbGVpY2hzb3BlcmF0b3IodGhpcy52YWx1ZSlbMF07XG5cdFx0XHRmaWx0ZXJrcml0ZXJpZW4ucHVzaChmaWx0ZXJfb2JqZWt0KTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIGRlbiBhcnJheSBkZW0gb2JqZWt0IHp1d2Vpc2VuXG5cdGZpbHRlcmtyaXRlcmllbl9vYmpla3QuZmlsdGVya3JpdGVyaWVuID0gZmlsdGVya3JpdGVyaWVuO1xuXHQvLyBnZXfDpGhsdGUgRmVsZGVyIGVybWl0dGVsblxuXHQkKFwiLmV4cG9ydGllcmVuX2ZlbGRlcl93YWVobGVuX29iamVrdF9mZWxkLmZlbGRfd2FlaGxlblwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0Ly8gZmVsZE9iamVrdCBlcnN0ZWxsZW5cblx0XHRcdHZhciBmZWxkT2JqZWt0ID0ge307XG5cdFx0XHRmZWxkT2JqZWt0LkRzTmFtZSA9IFwiT2JqZWt0XCI7XG5cdFx0XHRmZWxkT2JqZWt0LkZlbGRuYW1lID0gJCh0aGlzKS5hdHRyKCdmZWxkbmFtZScpO1xuXHRcdFx0Z2V3w6RobHRlX2ZlbGRlci5wdXNoKGZlbGRPYmpla3QpO1xuXHRcdH1cblx0fSk7XG5cdCQoXCIjZXhwb3J0aWVyZW5fZmVsZGVyX3dhZWhsZW5fZmVsZGVybGlzdGVcIikuZmluZChcIi5mZWxkX3dhZWhsZW5cIikuZWFjaChmdW5jdGlvbigpIHtcblx0XHRpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdC8vIGZlbGRPYmpla3QgZXJzdGVsbGVuXG5cdFx0XHR2YXIgZmVsZE9iamVrdCA9IHt9O1xuXHRcdFx0ZmVsZE9iamVrdC5Ec1R5cCA9ICQodGhpcykuYXR0cignZHN0eXAnKTtcblx0XHRcdGlmIChmZWxkT2JqZWt0LkRzVHlwICE9PSBcIlRheG9ub21pZVwiKSB7XG5cdFx0XHRcdGFuel9kc19nZXfDpGhsdCsrO1xuXHRcdFx0fVxuXHRcdFx0ZmVsZE9iamVrdC5Ec05hbWUgPSAkKHRoaXMpLmF0dHIoJ2RhdGVuc2FtbWx1bmcnKTtcblx0XHRcdGZlbGRPYmpla3QuRmVsZG5hbWUgPSAkKHRoaXMpLmF0dHIoJ2ZlbGQnKTtcblx0XHRcdGdld8OkaGx0ZV9mZWxkZXIucHVzaChmZWxkT2JqZWt0KTtcbiAgICAgICAgICAgIGFuel9nZXfDpGhsdGVfZmVsZGVyX2F1c19kc2JzKys7XG5cdFx0fVxuXHR9KTtcblx0Ly8gZGVuIGFycmF5IGRlbSBvYmpla3QgenV3ZWlzZW5cblx0Z2V3w6RobHRlX2ZlbGRlcl9vYmpla3QuZmVsZGVyID0gZ2V3w6RobHRlX2ZlbGRlcjtcblxuXHQvLyBXZW5uIGtlaW5lIEZlbGRlciBnZXfDpGhsdCBzaW5kOiBNZWxkZW4gdW5kIGF1ZmjDtnJlblxuXHRpZiAoZ2V3w6RobHRlX2ZlbGRlcl9vYmpla3QuZmVsZGVyLmxlbmd0aCA9PT0gMCkge1xuXHRcdC8vIEJlc2Now6RmdGlndW5nc21lbGR1bmcgdmVyc3RlY2tlblxuXHRcdCRleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9oaW53ZWlzX3RleHRcbiAgICAgICAgICAgIC5hbGVydCgpXG4gICAgICAgICAgICAuaGlkZSgpO1xuICAgICAgICAkKFwiI2V4cG9ydGllcmVuX2V4cG9ydGllcmVuX2Vycm9yX3RleHRfdGV4dFwiKVxuICAgICAgICAgICAgLmh0bWwoXCJLZWluZSBFaWdlbnNjaGFmdGVuIGdld8OkaGx0PGJyPkJpdHRlIHfDpGhsZW4gU2llIEVpZ2Vuc2NoYWZ0ZW4sIGRpZSBleHBvcnRpZXJ0IHdlcmRlbiBzb2xsZW5cIik7XG5cdFx0JChcIiNleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9lcnJvcl90ZXh0XCIpXG4gICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgLnNob3coKTtcblx0XHRyZXR1cm47XG5cdH1cblxuICAgIC8vIGh0bWwgZsO8ciBmaWx0ZXJrcml0ZXJpZW4gYXVmYmF1ZW5cbiAgICBodG1sX2ZpbHRlcmtyaXRlcmllbiA9IFwiR2V3w6RobHRlIEZpbHRlcmtyaXRlcmllbjo8dWw+XCI7XG4gICAgaWYgKCQoXCIjZXhwb3J0aWVyZW5fc3lub255bV9pbmZvc1wiKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgaHRtbF9maWx0ZXJrcml0ZXJpZW4gKz0gXCI8bGk+aW5rbHVzaXZlIEluZm9ybWF0aW9uZW4gdm9uIFN5bm9ueW1lbjwvbGk+XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaHRtbF9maWx0ZXJrcml0ZXJpZW4gKz0gXCI8bGk+SW5mb3JtYXRpb25lbiB2b24gU3lub255bWVuIGlnbm9yaWVyZW48L2xpPlwiO1xuICAgIH1cbiAgICBpZiAoZmlsdGVya3JpdGVyaWVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgXy5lYWNoKGZpbHRlcmtyaXRlcmllbiwgZnVuY3Rpb24oZmlsdGVya3JpdGVyaXVtKSB7XG4gICAgICAgICAgICBodG1sX2ZpbHRlcmtyaXRlcmllbiArPSBcIjxsaT5cIjtcbiAgICAgICAgICAgIGh0bWxfZmlsdGVya3JpdGVyaWVuICs9IFwiRmVsZCBcXFwiXCIgKyBmaWx0ZXJrcml0ZXJpdW0uRmVsZG5hbWUgKyBcIlxcXCIgXCI7XG4gICAgICAgICAgICBpZiAoZmlsdGVya3JpdGVyaXVtLlZlcmdsZWljaHNvcGVyYXRvciAhPT0gXCJrZWluXCIpIHtcbiAgICAgICAgICAgICAgICBodG1sX2ZpbHRlcmtyaXRlcmllbiArPSBmaWx0ZXJrcml0ZXJpdW0uVmVyZ2xlaWNoc29wZXJhdG9yICsgXCIgXFxcIlwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBodG1sX2ZpbHRlcmtyaXRlcmllbiArPSBcImVudGjDpGx0IFxcXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWxfZmlsdGVya3JpdGVyaWVuICs9IGZpbHRlcmtyaXRlcml1bS5GaWx0ZXJ3ZXJ0O1xuICAgICAgICAgICAgaHRtbF9maWx0ZXJrcml0ZXJpZW4gKz0gXCJcXFwiPC9saT5cIjtcbiAgICAgICAgfSk7XG4gICAgICAgIGh0bWxfZmlsdGVya3JpdGVyaWVuICs9IFwiPC91bD5cIjtcbiAgICB9IGVsc2UgaWYgKGFuel9nZXfDpGhsdGVfZmVsZGVyX2F1c19kc2JzID4gMCkge1xuICAgICAgICAvLyB3ZW5uIEZpbHRlcmtyaXRlcmllbiBlcmZhc3N0IHd1cmRlLCB3ZXJkZW4gc293aWVzbyBudXIgRGF0ZW5zw6R0emUgYW5nZXplaWd0LCBpbiBkZW5lbiBEYXRlbiB2b3Jrb21tZW5cbiAgICAgICAgLy8gZGFoZXIgaXN0IGRpZSBmb2xnZW5kZSBJbmZvIG51ciBpbnRlcmVzc3NhbnQsIHdlbm4ga2VpbiBGaWx0ZXIgZ2VzZXR6dCB3dXJkZVxuICAgICAgICAvLyB1bmQgbmF0w7xybGljaCBhdWNoIG51ciwgd2VubiBGZWxkZXIgYXVzIERTL0JTIGdld8OkaGx0IHd1cmRlblxuICAgICAgICBpZiAoJChcIiNleHBvcnRpZXJlbl9udXJfb2JqZWt0ZV9taXRfZWlnZW5zY2hhZnRlblwiKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIGh0bWxfZmlsdGVya3JpdGVyaWVuICs9IFwiPGxpPk51ciBEYXRlbnPDpHR6ZSBleHBvcnRpZXJlbiwgZGllIGluIGRlbiBnZXfDpGhsdGVuIEVpZ2Vuc2NoYWZ0ZW4tIHVuZCBCZXppZWh1bmdzc2FtbWx1bmdlbiBJbmZvcm1hdGlvbmVuIGVudGhhbHRlbjwvbGk+XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBodG1sX2ZpbHRlcmtyaXRlcmllbiArPSBcIjxsaT5BdWNoIERhdGVuc8OkdHplIGV4cG9ydGllcmVuLCBkaWUgaW4gZGVuIGdld8OkaGx0ZW4gRWlnZW5zY2hhZnRlbi0gdW5kIEJlemllaHVuZ3NzYW1tbHVuZ2VuIGtlaW5lIEluZm9ybWF0aW9uZW4gZW50aGFsdGVuPC9saT5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAkKFwiI2V4cG9ydGllcmVuX2V4cG9ydGllcmVuX2ZpbHRlcmtyaXRlcmllblwiKVxuICAgICAgICAuaHRtbChodG1sX2ZpbHRlcmtyaXRlcmllbilcbiAgICAgICAgLnNob3coKTtcblxuXHQvLyBqZXR6dCBkYXMgZmlsdGVyT2JqZWt0IMO8YmVyZ2ViZW5cblx0aWYgKGRpcmVrdCA9PT0gXCJkaXJla3RcIikge1xuXHRcdHdpbmRvdy5hZGIuw7xiZXJnZWJlRmlsdGVyRsO8ckRpcmVrdEV4cG9ydChncnVwcGVuLCBncnVwcGVuX2FycmF5LCBhbnpfZHNfZ2V3w6RobHQsIGZpbHRlcmtyaXRlcmllbl9vYmpla3QsIGdld8OkaGx0ZV9mZWxkZXJfb2JqZWt0KTtcblx0fSBpZiAoZGlyZWt0ID09PSBcImbDvHJfYWx0XCIpIHtcbiAgICAgICAgd2luZG93LmFkYi7DvGJlcmdlYmVGaWx0ZXJGw7xyRXhwb3J0RsO8ckFsdChncnVwcGVuLCBncnVwcGVuX2FycmF5LCBhbnpfZHNfZ2V3w6RobHQsIGZpbHRlcmtyaXRlcmllbl9vYmpla3QsIGdld8OkaGx0ZV9mZWxkZXJfb2JqZWt0KTtcbiAgICB9ZWxzZSB7XG5cdFx0d2luZG93LmFkYi7DvGJlcmdlYmVGaWx0ZXJGw7xyRXhwb3J0TWl0Vm9yc2NoYXUoZ3J1cHBlbiwgZ3J1cHBlbl9hcnJheSwgYW56X2RzX2dld8OkaGx0LCBmaWx0ZXJrcml0ZXJpZW5fb2JqZWt0LCBnZXfDpGhsdGVfZmVsZGVyX29iamVrdCk7XG5cdH1cbn07XG5cbndpbmRvdy5hZGIuw7xiZXJnZWJlRmlsdGVyRsO8ckV4cG9ydEbDvHJBbHQgPSBmdW5jdGlvbihncnVwcGVuLCBncnVwcGVuX2FycmF5LCBhbnpfZHNfZ2V3w6RobHQsIGZpbHRlcmtyaXRlcmllbl9vYmpla3QsIGdld8OkaGx0ZV9mZWxkZXJfb2JqZWt0KSB7XG5cdCd1c2Ugc3RyaWN0JztcbiAgICAvLyBBbGxlIEZlbGRlciBhYmZyYWdlblxuICAgIHZhciBmVHogPSBcImZhbHNlXCIsXG4gICAgICAgIHF1ZXJ5UGFyYW07XG4gICAgLy8gd2luZG93LmFkYi5mYXNzZVRheG9ub21pZW5adXNhbW1lbiBzdGV1ZXJ0LCBvYiBUYXhvbm9taWVuIGFsbGUgZWluemVsbiBvZGVyIHVudGVyIGRlbSBUaXRlbCBUYXhvbm9taWVuIHp1c2FtbWVuZ2VmYXNzdCB3ZXJkZW5cbiAgICBpZiAod2luZG93LmFkYi5mYXNzZVRheG9ub21pZW5adXNhbW1lbikge1xuICAgICAgICBmVHogPSBcInRydWVcIjtcbiAgICB9XG4gICAgaWYgKCQoXCIjZXhwb3J0aWVyZW5fc3lub255bV9pbmZvc1wiKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgcXVlcnlQYXJhbSA9IFwiZXhwb3J0X2FsdF9taXRfc3lub255bWVuX2RpcmVrdC9hbGxfZG9jc19taXRfc3lub255bWVuX2Z1ZXJfYWx0P2luY2x1ZGVfZG9jcz10cnVlJmZpbHRlcj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJrcml0ZXJpZW5fb2JqZWt0KSkgKyBcIiZmZWxkZXI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZ2V3w6RobHRlX2ZlbGRlcl9vYmpla3QpKSArIFwiJmZhc3NlVGF4b25vbWllblp1c2FtbWVuPVwiICsgZlR6ICsgXCImZ3J1cHBlbj1cIiArIGdydXBwZW47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlQYXJhbSA9IFwiZXhwb3J0X2FsdF9kaXJla3QvYWxsX2RvY3NfZnVlcl9hbHQ/aW5jbHVkZV9kb2NzPXRydWUmZmlsdGVyPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGZpbHRlcmtyaXRlcmllbl9vYmpla3QpKSArIFwiJmZlbGRlcj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShnZXfDpGhsdGVfZmVsZGVyX29iamVrdCkpICsgXCImZmFzc2VUYXhvbm9taWVuWnVzYW1tZW49XCIgKyBmVHogKyBcIiZncnVwcGVuPVwiICsgZ3J1cHBlbjtcbiAgICB9XG4gICAgaWYgKCQoXCIjZXhwb3J0aWVyZW5fbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW5cIikucHJvcCgnY2hlY2tlZCcpICYmIGFuel9kc19nZXfDpGhsdCA+IDApIHtcbiAgICAgICAgLy8gcHLDvGZlbiwgb2IgbWluZGVzdGVucyBlaW4gRmVsZCBhdXMgZHMgZ2V3w6RobHQgaXN0XG4gICAgICAgIC8vIHdlbm4gamE6IHRydWUsIHNvbnN0IGZhbHNlXG4gICAgICAgIHF1ZXJ5UGFyYW0gKz0gXCImbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW49dHJ1ZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5UGFyYW0gKz0gXCImbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW49ZmFsc2VcIjtcbiAgICB9XG4gICAgaWYgKCQoXCIjZXhwb3J0X2Jlel9pbl96ZWlsZW5cIikucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW0gKz0gXCImYmV6X2luX3plaWxlbj10cnVlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlQYXJhbSArPSBcIiZiZXpfaW5femVpbGVuPWZhbHNlXCI7XG4gICAgfVxuICAgIHdpbmRvdy5vcGVuKCdfbGlzdC8nICsgcXVlcnlQYXJhbSk7XG59O1xuXG53aW5kb3cuYWRiLsO8YmVyZ2ViZUZpbHRlckbDvHJEaXJla3RFeHBvcnQgPSBmdW5jdGlvbihncnVwcGVuLCBncnVwcGVuX2FycmF5LCBhbnpfZHNfZ2V3w6RobHQsIGZpbHRlcmtyaXRlcmllbl9vYmpla3QsIGdld8OkaGx0ZV9mZWxkZXJfb2JqZWt0KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8gQWxsZSBGZWxkZXIgYWJmcmFnZW5cblx0dmFyIGZUeiA9IFwiZmFsc2VcIixcblx0XHRxdWVyeVBhcmFtLFxuICAgICAgICB2aWV3X25hbWUsXG4gICAgICAgIGxpc3RfbmFtZSxcbiAgICAgICAgZ3J1cHBlbmxpc3RlID0gZ3J1cHBlbi5zcGxpdChcIixcIik7XG5cdC8vIHdpbmRvdy5hZGIuZmFzc2VUYXhvbm9taWVuWnVzYW1tZW4gc3RldWVydCwgb2IgVGF4b25vbWllbiBhbGxlIGVpbnplbG4gb2RlciB1bnRlciBkZW0gVGl0ZWwgVGF4b25vbWllbiB6dXNhbW1lbmdlZmFzc3Qgd2VyZGVuXG5cdGlmICh3aW5kb3cuYWRiLmZhc3NlVGF4b25vbWllblp1c2FtbWVuKSB7XG5cdFx0ZlR6ID0gXCJ0cnVlXCI7XG5cdH1cblx0aWYgKCQoXCIjZXhwb3J0aWVyZW5fc3lub255bV9pbmZvc1wiKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgbGlzdF9uYW1lID0gXCJleHBvcnRfbWl0X3N5bm9ueW1lbl9kaXJla3RcIjtcbiAgICAgICAgaWYgKGdydXBwZW5saXN0ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2aWV3X25hbWUgPSBcImFsbF9kb2NzX21pdF9zeW5vbnltZW5cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlbiB2aWV3IGRlciBHcnVwcGUgbmVobWVuLCBkYXMgaXN0IHZpZWwgc2NobmVsbGVyXG4gICAgICAgICAgICBpZiAoZ3J1cHBlbmxpc3RlWzBdID09PSBcIkxlYmVuc3LDpHVtZVwiKSB7XG4gICAgICAgICAgICAgICAgdmlld19uYW1lID0gXCJscl9taXRfc3lub255bWVuXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZpZXdfbmFtZSA9IGdydXBwZW5saXN0ZVswXS50b0xvd2VyQ2FzZSgpICsgXCJfbWl0X3N5bm9ueW1lblwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH0gZWxzZSB7XG4gICAgICAgIGxpc3RfbmFtZSA9IFwiZXhwb3J0X2RpcmVrdFwiO1xuICAgICAgICBpZiAoZ3J1cHBlbmxpc3RlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZpZXdfbmFtZSA9IFwiYWxsX2RvY3NcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRlbiB2aWV3IGRlciBHcnVwcGUgbmVobWVuLCBkYXMgaXN0IHZpZWwgc2NobmVsbGVyXG4gICAgICAgICAgICBpZiAoZ3J1cHBlbmxpc3RlWzBdID09PSBcIkxlYmVuc3LDpHVtZVwiKSB7XG4gICAgICAgICAgICAgICAgdmlld19uYW1lID0gXCJsclwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2aWV3X25hbWUgPSBncnVwcGVubGlzdGVbMF0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cdH1cblxuICAgIHF1ZXJ5UGFyYW0gPSBsaXN0X25hbWUgKyBcIi9cIiArIHZpZXdfbmFtZSArIFwiP2luY2x1ZGVfZG9jcz10cnVlJmZpbHRlcj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShmaWx0ZXJrcml0ZXJpZW5fb2JqZWt0KSkgKyBcIiZmZWxkZXI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZ2V3w6RobHRlX2ZlbGRlcl9vYmpla3QpKSArIFwiJmZhc3NlVGF4b25vbWllblp1c2FtbWVuPVwiICsgZlR6ICsgXCImZ3J1cHBlbj1cIiArIGdydXBwZW47XG5cblx0aWYgKCQoXCIjZXhwb3J0aWVyZW5fbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW5cIikucHJvcCgnY2hlY2tlZCcpICYmIGFuel9kc19nZXfDpGhsdCA+IDApIHtcblx0XHQvLyBwcsO8ZmVuLCBvYiBtaW5kZXN0ZW5zIGVpbiBGZWxkIGF1cyBkcyBnZXfDpGhsdCBpc3Rcblx0XHQvLyB3ZW5uIGphOiB0cnVlLCBzb25zdCBmYWxzZVxuXHRcdHF1ZXJ5UGFyYW0gKz0gXCImbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW49dHJ1ZVwiO1xuXHR9IGVsc2Uge1xuXHRcdHF1ZXJ5UGFyYW0gKz0gXCImbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW49ZmFsc2VcIjtcblx0fVxuXHRpZiAoJChcIiNleHBvcnRfYmV6X2luX3plaWxlblwiKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRxdWVyeVBhcmFtICs9IFwiJmJlel9pbl96ZWlsZW49dHJ1ZVwiO1xuXHR9IGVsc2Uge1xuXHRcdHF1ZXJ5UGFyYW0gKz0gXCImYmV6X2luX3plaWxlbj1mYWxzZVwiO1xuXHR9XG5cdHdpbmRvdy5vcGVuKCdfbGlzdC8nICsgcXVlcnlQYXJhbSk7XG59O1xuXG53aW5kb3cuYWRiLsO8YmVyZ2ViZUZpbHRlckbDvHJFeHBvcnRNaXRWb3JzY2hhdSA9IGZ1bmN0aW9uKGdydXBwZW4sIGdydXBwZW5fYXJyYXksIGFuel9kc19nZXfDpGhsdCwgZmlsdGVya3JpdGVyaWVuX29iamVrdCwgZ2V3w6RobHRlX2ZlbGRlcl9vYmpla3QpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyBBbGxlIEZlbGRlciBhYmZyYWdlblxuXHR2YXIgZlR6ID0gXCJmYWxzZVwiLFxuXHRcdGFuel9ncnVwcGVuX2FiZ2VmcmFndCA9IDAsXG5cdFx0ZGJQYXJhbSxcblx0XHRxdWVyeVBhcmFtO1xuXHQvLyB3aW5kb3cuYWRiLmZhc3NlVGF4b25vbWllblp1c2FtbWVuIHN0ZXVlcnQsIG9iIFRheG9ub21pZW4gYWxsZSBlaW56ZWxuIG9kZXIgdW50ZXIgZGVtIFRpdGVsIFRheG9ub21pZW4genVzYW1tZW5nZWZhc3N0IHdlcmRlblxuXHRpZiAod2luZG93LmFkYi5mYXNzZVRheG9ub21pZW5adXNhbW1lbikge1xuXHRcdGZUeiA9IFwidHJ1ZVwiO1xuXHR9XG5cdC8vIGdsb2JhbGUgVmFyaWFibGUgdm9yYmVyZWl0ZW5cblx0d2luZG93LmFkYi5leHBvcnRpZXJlbl9vYmpla3RlID0gW107XG5cdC8vIGluIGFuel9ncnVwcGVuX2FiZ2VmcmFndCB3aXJkIGdlesOkaGx0LCB3aWV2aWVsZSBHcnVwcGVuIHNjaG9uIGFiZ2VmcmFndCB3dXJkZW5cblx0Ly8gamVkZSBBYmZyYWdlIGtvbnRyb2xsaWVydCBuYWNoIEVyaGFsdCBkZXIgRGF0ZW4sIG9iIHNjaG9uIGFsbGUgR3J1cHBlbiBhYmdlZnJhZ3Qgd3VyZGVuIHVuZCBtYWNodCB3ZWl0ZXIsIHdlbm4gamFcbiAgICBfLmVhY2goZ3J1cHBlbl9hcnJheSwgZnVuY3Rpb24oZ3J1cHBlKSB7XG4gICAgICAgIGlmICgkKFwiI2V4cG9ydGllcmVuX3N5bm9ueW1faW5mb3NcIikucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICBkYlBhcmFtID0gXCJhcnRlbmRiL2V4cG9ydF9taXRfc3lub255bWVuXCI7XG4gICAgICAgICAgICBxdWVyeVBhcmFtID0gZ3J1cHBlICsgXCJfbWl0X3N5bm9ueW1lbj9pbmNsdWRlX2RvY3M9dHJ1ZSZmaWx0ZXI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZmlsdGVya3JpdGVyaWVuX29iamVrdCkpICsgXCImZmVsZGVyPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGdld8OkaGx0ZV9mZWxkZXJfb2JqZWt0KSkgKyBcIiZmYXNzZVRheG9ub21pZW5adXNhbW1lbj1cIiArIGZUeiArIFwiJmdydXBwZW49XCIgKyBncnVwcGVuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGJQYXJhbSA9IFwiYXJ0ZW5kYi9leHBvcnRcIjtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW0gPSBncnVwcGUgKyBcIj9pbmNsdWRlX2RvY3M9dHJ1ZSZmaWx0ZXI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZmlsdGVya3JpdGVyaWVuX29iamVrdCkpICsgXCImZmVsZGVyPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGdld8OkaGx0ZV9mZWxkZXJfb2JqZWt0KSkgKyBcIiZmYXNzZVRheG9ub21pZW5adXNhbW1lbj1cIiArIGZUeiArIFwiJmdydXBwZW49XCIgKyBncnVwcGVuO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkKFwiI2V4cG9ydGllcmVuX251cl9vYmpla3RlX21pdF9laWdlbnNjaGFmdGVuXCIpLnByb3AoJ2NoZWNrZWQnKSAmJiBhbnpfZHNfZ2V3w6RobHQgPiAwKSB7XG4gICAgICAgICAgICAvLyBwcsO8ZmVuLCBvYiBtaW5kZXN0ZW5zIGVpbiBGZWxkIGF1cyBkcyBnZXfDpGhsdCBpc3RcbiAgICAgICAgICAgIC8vIHdlbm4gamE6IHRydWUsIHNvbnN0IGZhbHNlXG4gICAgICAgICAgICBxdWVyeVBhcmFtICs9IFwiJm51cl9vYmpla3RlX21pdF9laWdlbnNjaGFmdGVuPXRydWVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW0gKz0gXCImbnVyX29iamVrdGVfbWl0X2VpZ2Vuc2NoYWZ0ZW49ZmFsc2VcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJChcIiNleHBvcnRfYmV6X2luX3plaWxlblwiKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW0gKz0gXCImYmV6X2luX3plaWxlbj10cnVlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtICs9IFwiJmJlel9pbl96ZWlsZW49ZmFsc2VcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG4gICAgICAgICRkYi5saXN0KGRiUGFyYW0sIHF1ZXJ5UGFyYW0sIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBhbGxlIE9iamVrdGUgaW4gZGF0YSBpbiB3aW5kb3cuYWRiLmV4cG9ydGllcmVuX29iamVrdGUgYW5mw7xnZW5cbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRiLmV4cG9ydGllcmVuX29iamVrdGUgPSBfLnVuaW9uKHdpbmRvdy5hZGIuZXhwb3J0aWVyZW5fb2JqZWt0ZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gc3BlaWNoZXJuLCBkYXNzIGVpbmUgR3J1cHBlIGFiZ2VmcmFndCB3dXJkZVxuICAgICAgICAgICAgICAgIGFuel9ncnVwcGVuX2FiZ2VmcmFndCsrO1xuICAgICAgICAgICAgICAgIGlmIChhbnpfZ3J1cHBlbl9hYmdlZnJhZ3QgPT09IGdydXBwZW5fYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbGUgR3J1cHBlbiB3dXJkZW4gYWJnZWZyYWd0LCBqZXR6dCBrYW5uIGVzIHdlaXRlcmdlaGVuXG4gICAgICAgICAgICAgICAgICAgIC8vIEVyZ2VibmlzIHLDvGNrbWVsZGVuXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5faGlud2Vpc190ZXh0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNob3coKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwod2luZG93LmFkYi5leHBvcnRpZXJlbl9vYmpla3RlLmxlbmd0aCArIFwiIE9iamVrdGUgc2luZCBnZXfDpGhsdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkYi5iYXVlVGFiZWxsZUbDvHJFeHBvcnRBdWYoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBpbiAkZGIubGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbndpbmRvdy5hZGIuYmF1ZVRhYmVsbGVGw7xyRXhwb3J0QXVmID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0JztcbiAgICB2YXIgaGlud2VpcyA9IFwiXCI7XG5cdGlmICh3aW5kb3cuYWRiLmV4cG9ydGllcmVuX29iamVrdGUubGVuZ3RoID4gMCkge1xuXHRcdHdpbmRvdy5hZGIuZXJzdGVsbGVUYWJlbGxlKHdpbmRvdy5hZGIuZXhwb3J0aWVyZW5fb2JqZWt0ZSwgXCJcIiwgXCJleHBvcnRpZXJlbl9leHBvcnRpZXJlbl90YWJlbGxlXCIpO1xuXHRcdCQoXCIuZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5cIikuc2hvdygpO1xuXHRcdC8vIHp1ciBUYWJlbGxlIHNjcm9sbGVuXG5cdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0c2Nyb2xsVG9wOiAkKFwiI2V4cG9ydGllcmVuX2V4cG9ydGllcmVuX2V4cG9ydGllcmVuXCIpLm9mZnNldCgpLnRvcFxuXHRcdH0sIDIwMDApO1xuXHR9IGVsc2UgaWYgKHdpbmRvdy5hZGIuZXhwb3J0aWVyZW5fb2JqZWt0ZSAmJiB3aW5kb3cuYWRiLmV4cG9ydGllcmVuX29iamVrdGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fZXJyb3JfdGV4dF90ZXh0XCIpXG4gICAgICAgICAgICAuaHRtbChcIktlaW5lIERhdGVuIGdlZnVuZGVuPGJyPkJpdHRlIHBhc3NlbiBTaWUgZGllIEZpbHRlcmtyaXRlcmllbiBhblwiKTtcbiAgICAgICAgJChcIiNleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9lcnJvcl90ZXh0XCIpXG4gICAgICAgICAgICAuYWxlcnQoKVxuICAgICAgICAgICAgLnNob3coKTtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI2V4cG9ydGllcmVuX2V4cG9ydGllcmVuX2V4cG9ydGllcmVuXCIpLm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAyMDAwKTtcblxuXHR9XG5cdC8vIEJlc2Now6RmdGlndW5nc21lbGR1bmcgdmVyc3RlY2tlblxuXHQkKFwiI2V4cG9ydGllcmVuX2V4cG9ydGllcmVuX2hpbndlaXNfdGV4dFwiKVxuICAgICAgICAuYWxlcnQoKVxuICAgICAgICAuaGlkZSgpO1xufTtcblxud2luZG93LmFkYi5mw7xyRXhwb3J0R2V3w6RobHRlR3J1cHBlbiA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBncnVwcGVuID0gW107XG5cdCQoXCIuZXhwb3J0aWVyZW5fZHNfb2JqZWt0ZV93YWVobGVuX2dydXBwZVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSkge1xuXHRcdFx0Z3J1cHBlbi5wdXNoKCQodGhpcykuYXR0cignZmVsZG5hbWUnKSk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGdydXBwZW47XG59O1xuXG4vLyB3b2hlciB3aXJkIGJsb3NzIGJlbsO2dGlndCwgd2VubiBhbmdlbWVsZGV0IHdlcmRlbiBtdXNzXG53aW5kb3cuYWRiLmJlcmVpdGVJbXBvcnRpZXJlbl9kc19iZXNjaHJlaWJlblZvciA9IGZ1bmN0aW9uKHdvaGVyKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKCF3aW5kb3cuYWRiLnByw7xmZUFubWVsZHVuZyhcIndvaGVyXCIpKSB7XG5cdFx0JCgnI2ltcG9ydGllcmVuX2RzX2RzX2Jlc2NocmVpYmVuX2NvbGxhcHNlJykuY29sbGFwc2UoJ2hpZGUnKTtcblx0fSBlbHNlIHtcblx0XHQkKFwiI0RzTmFtZVwiKS5mb2N1cygpO1xuXHRcdC8vIERhdGVuIGhvbGVuLCB3ZW5uIG7DtnRpZ1xuXHRcdGlmICh3aW5kb3cuYWRiLmRzX3Zvbl9vYmpla3Rlbikge1xuXHRcdFx0d2luZG93LmFkYi5iZXJlaXRlSW1wb3J0aWVyZW5fZHNfYmVzY2hyZWliZW5Wb3JfMDIoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuXHRcdFx0JGRiLnZpZXcoJ2FydGVuZGIvZHNfdm9uX29iamVrdGVuP3N0YXJ0a2V5PVtcIkRhdGVuc2FtbWx1bmdcIl0mZW5ka2V5PVtcIkRhdGVuc2FtbWx1bmdcIix7fSx7fSx7fSx7fV0mZ3JvdXBfbGV2ZWw9NScsIHtcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdC8vIERhdGVuIGluIE9iamVrdHZhcmlhYmxlIHNwZWljaGVybiA+IFdlbm4gRHMgYXVzZ2V3w6RobHQsIEFuZ2FiZW4gaW4gZGllIEZlbGRlciBrb3BpZXJlblxuXHRcdFx0XHRcdHdpbmRvdy5hZGIuZHNfdm9uX29iamVrdGVuID0gZGF0YTtcblx0XHRcdFx0XHR3aW5kb3cuYWRiLmJlcmVpdGVJbXBvcnRpZXJlbl9kc19iZXNjaHJlaWJlblZvcl8wMigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn07XG5cbi8vIERzTmFtZW4gaW4gQXVzd2FobGxpc3RlIHN0ZWxsZW5cbi8vIHZlcsOkbmRlcmJhcmUgc2luZCBub3JtYWwsIMO8YnJpZ2UgZ3JhdVxud2luZG93LmFkYi5iZXJlaXRlSW1wb3J0aWVyZW5fZHNfYmVzY2hyZWliZW5Wb3JfMDIgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaHRtbCxcbiAgICAgICAgZHNfbmFtZW4gPSBbXTtcblx0Ly8gaW4gZGllc2VtIEFycmF5IHdlcmRlbiBhbGxlIGtleXMgZ2VzYW1tZWx0XG5cdC8vIGRpZXNlbiBBcnJheSBhbHMgZ2xvYmFsZSBWYXJpYWJsZSBnZXN0YWx0ZW46IFdpciBiZW51dHp0LCB3ZW5uIERzTmFtZSB2ZXLDpG5kZXJ0IHdpcmRcbiAgICB3aW5kb3cuYWRiLkRzS2V5cyA9IF8ubWFwKHdpbmRvdy5hZGIuZHNfdm9uX29iamVrdGVuLnJvd3MsIGZ1bmN0aW9uKHJvdykge1xuICAgICAgICByZXR1cm4gcm93LmtleTtcbiAgICB9KTtcbiAgICAvLyBicmF1Y2hlIG51ciBkcmVpIGtleXNcbiAgICAvLyBlbWFpbDogbGVpZGVyIGdpYnQgZXMgTnVsbC1XZXJ0ZVxuICAgIHdpbmRvdy5hZGIuZHNfbmFtZW5fZWluZGV1dGlnID0gXy5tYXAod2luZG93LmFkYi5Ec0tleXMsIGZ1bmN0aW9uKGRzX2tleSkge1xuICAgICAgICByZXR1cm4gW2RzX2tleVsxXSwgZHNfa2V5WzJdLCBkc19rZXlbM10gfHwgXCJhbGV4QGdhYnJpZWwtc29mdHdhcmUuY2hcIl07XG4gICAgfSk7XG4gICAgLy8gT2JqZWt0YXJyYXkgcmVkdXppZXJlbiBhdWYgZWluZGV1dGlnZSBOYW1lblxuICAgIHdpbmRvdy5hZGIuZHNfbmFtZW5fZWluZGV1dGlnID0gXy5yZWplY3Qod2luZG93LmFkYi5kc19uYW1lbl9laW5kZXV0aWcsIGZ1bmN0aW9uKG9iamVrdCkge1xuICAgICAgICB2YXIgcG9zaXRpb25faW5fZHNfbmFtZW4gPSBfLmluZGV4T2YoZHNfbmFtZW4sIG9iamVrdFswXSk7XG4gICAgICAgIGlmIChwb3NpdGlvbl9pbl9kc19uYW1lbiA9PT0gLTEpIHtcbiAgICAgICAgICAgIGRzX25hbWVuLnB1c2gob2JqZWt0WzBdKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gbmFjaCBEc05hbWVuIHNvcnRpZXJlblxuICAgIHdpbmRvdy5hZGIuZHNfbmFtZW5fZWluZGV1dGlnID0gXy5zb3J0Qnkod2luZG93LmFkYi5kc19uYW1lbl9laW5kZXV0aWcsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5WzBdO1xuICAgIH0pO1xuXHQvLyBtaXQgbGVlcmVyIFplaWxlIGJlZ2lubmVuXG5cdGh0bWwgPSBcIjxvcHRpb24gdmFsdWU9Jycgd2FlaGxiYXI9dHJ1ZT48L29wdGlvbj5cIjtcblx0Ly8gTmFtZW4gZGVyIERhdGVuc2FtbWx1bmdlbiBhbHMgT3B0aW9uZW4gYW5mw7xnZW5cbiAgICBfLmVhY2god2luZG93LmFkYi5kc19uYW1lbl9laW5kZXV0aWcsIGZ1bmN0aW9uKGRzX25hbWVfZWluZGV1dGlnKSB7XG4gICAgICAgIC8vIHZlcsOkbmRlcmJhciBzaW5kIG51ciBzZWxic3QgaW1wb3J0aWVydGUgdW5kIHp1c2FtbWVuZmFzc2VuZGVcbiAgICAgICAgaWYgKGRzX25hbWVfZWluZGV1dGlnWzJdID09PSBsb2NhbFN0b3JhZ2UuRW1haWwgfHwgZHNfbmFtZV9laW5kZXV0aWdbMV0gfHwgQm9vbGVhbihsb2NhbFN0b3JhZ2UuYWRtaW4pKSB7XG4gICAgICAgICAgICAvLyB2ZXLDpG5kZXJiYXJlIHNpbmQgbm9ybWFsID0gc2Nod2FyelxuICAgICAgICAgICAgaHRtbCArPSBcIjxvcHRpb24gdmFsdWU9J1wiICsgZHNfbmFtZV9laW5kZXV0aWdbMF0gKyBcIicgY2xhc3M9J2FkYl9ncnVlbl9mZXR0JyB3YWVobGJhcj10cnVlPlwiICsgZHNfbmFtZV9laW5kZXV0aWdbMF0gKyBcIjwvb3B0aW9uPlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbmljaHQgdmVyw6RuZGVyYmFyZSBzaW5kIGdyYXVcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArIGRzX25hbWVfZWluZGV1dGlnWzBdICsgXCInIGNsYXNzPSdhZGJfZ3JhdV9ub3JtYWwnIHdhZWhsYmFyPWZhbHNlPlwiICsgZHNfbmFtZV9laW5kZXV0aWdbMF0gKyBcIjwvb3B0aW9uPlwiO1xuICAgICAgICB9XG4gICAgfSk7XG5cdCQoXCIjRHNXYWVobGVuXCIpLmh0bWwoaHRtbCk7XG5cdCQoXCIjRHNVcnNwcnVuZ3NEc1wiKS5odG1sKGh0bWwpO1xufTtcblxuLy8gd29oZXIgd2lyZCBibG9zcyBiZW7DtnRpZ3QsIHdlbm4gYW5nZW1lbGRldCB3ZXJkZW4gbXVzc1xud2luZG93LmFkYi5iZXJlaXRlSW1wb3J0aWVyZW5fYnNfYmVzY2hyZWliZW5Wb3IgPSBmdW5jdGlvbih3b2hlcikge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmICghd2luZG93LmFkYi5wcsO8ZmVBbm1lbGR1bmcoXCJ3b2hlclwiKSkge1xuXHRcdCQoJyNpbXBvcnRpZXJlbl9ic19kc19iZXNjaHJlaWJlbl9jb2xsYXBzZScpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdH0gZWxzZSB7XG5cdFx0JChcIiNCc05hbWVcIikuZm9jdXMoKTtcblx0XHQvLyBhbnplaWdlbiwgZGFzcyBEYXRlbiBnZWxhZGVuIHdlcmRlbi4gTmVpbjogQmxpdHp0IGJsb3NzIGt1cnogYXVmXG5cdFx0Ly8kKFwiI0JzV2FlaGxlblwiKS5odG1sKFwiPG9wdGlvbiB2YWx1ZT0nbnVsbCc+Qml0dGUgd2FydGUsIGRpZSBMaXN0ZSB3aXJkIGF1ZmdlYmF1dC4uLjwvb3B0aW9uPlwiKTtcblx0XHQvLyBEYXRlbiBob2xlbiwgd2VubiBuw7Z0aWdcblx0XHRpZiAod2luZG93LmFkYi5ic192b25fb2JqZWt0ZW4pIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGIuYmVyZWl0ZUltcG9ydGllcmVuX2JzX2Jlc2NocmVpYmVuVm9yXzAyKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0XHRcdCRkYi52aWV3KCdhcnRlbmRiL2RzX3Zvbl9vYmpla3Rlbj9zdGFydGtleT1bXCJCZXppZWh1bmdzc2FtbWx1bmdcIl0mZW5ka2V5PVtcIkJlemllaHVuZ3NzYW1tbHVuZ1wiLHt9LHt9LHt9LHt9XSZncm91cF9sZXZlbD01Jywge1xuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0Ly8gRGF0ZW4gaW4gT2JqZWt0dmFyaWFibGUgc3BlaWNoZXJuID4gV2VubiBEcyBhdXNnZXfDpGhsdCwgQW5nYWJlbiBpbiBkaWUgRmVsZGVyIGtvcGllcmVuXG5cdFx0XHRcdFx0d2luZG93LmFkYi5ic192b25fb2JqZWt0ZW4gPSBkYXRhO1xuXHRcdFx0XHRcdHdpbmRvdy5hZGIuYmVyZWl0ZUltcG9ydGllcmVuX2JzX2Jlc2NocmVpYmVuVm9yXzAyKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufTtcblxud2luZG93LmFkYi5iZXJlaXRlSW1wb3J0aWVyZW5fYnNfYmVzY2hyZWliZW5Wb3JfMDIgPSBmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaHRtbCxcblx0XHRic19uYW1lbiA9IFtdO1xuXHQvLyBpbiBkaWVzZW0gQXJyYXkgd2VyZGVuIGFsbGUga2V5cyBnZXNhbW1lbHRcblx0Ly8gZGllc2VuIEFycmF5IGFscyBnbG9iYWxlIFZhcmlhYmxlIGdlc3RhbHRlbjogV2lyIGJlbnV0enQsIHdlbm4gRHNOYW1lIHZlcsOkbmRlcnQgd2lyZFxuXHR3aW5kb3cuYWRiLkJzS2V5cyA9IF8ubWFwKHdpbmRvdy5hZGIuYnNfdm9uX29iamVrdGVuLnJvd3MsIGZ1bmN0aW9uKHJvdykge1xuICAgICAgICByZXR1cm4gcm93LmtleTtcbiAgICB9KTtcblxuICAgIC8vIGJyYXVjaGUgbnVyIGRyZWkga2V5c1xuICAgIHdpbmRvdy5hZGIuZHNfbmFtZW5fZWluZGV1dGlnID0gXy5tYXAod2luZG93LmFkYi5Cc0tleXMsIGZ1bmN0aW9uKGJzX2tleSkge1xuICAgICAgICByZXR1cm4gW2JzX2tleVsxXSwgYnNfa2V5WzJdLCBic19rZXlbM11dO1xuICAgIH0pO1xuICAgIC8vIE9iamVrdGFycmF5IHJlZHV6aWVyZW4gYXVmIGVpbmRldXRpZ2UgTmFtZW5cbiAgICB3aW5kb3cuYWRiLmRzX25hbWVuX2VpbmRldXRpZyA9IF8ucmVqZWN0KHdpbmRvdy5hZGIuZHNfbmFtZW5fZWluZGV1dGlnLCBmdW5jdGlvbihvYmpla3QpIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uX2luX2JzX25hbWVuID0gXy5pbmRleE9mKGJzX25hbWVuLCBvYmpla3RbMF0pO1xuICAgICAgICBpZiAocG9zaXRpb25faW5fYnNfbmFtZW4gPT09IC0xKSB7XG4gICAgICAgICAgICBic19uYW1lbi5wdXNoKG9iamVrdFswXSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cdC8vIG5hY2ggRHNOYW1lbiBzb3J0aWVyZW5cblx0d2luZG93LmFkYi5kc19uYW1lbl9laW5kZXV0aWcgPSBfLnNvcnRCeSh3aW5kb3cuYWRiLmRzX25hbWVuX2VpbmRldXRpZywgZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIGtleVswXTtcblx0fSk7XG5cdC8vIG1pdCBsZWVyZXIgWmVpbGUgYmVnaW5uZW5cblx0aHRtbCA9IFwiPG9wdGlvbiB2YWx1ZT0nJyB3YWVobGJhcj10cnVlPjwvb3B0aW9uPlwiO1xuXHQvLyBOYW1lbiBkZXIgRGF0ZW5zYW1tbHVuZ2VuIGFscyBPcHRpb25lbiBhbmbDvGdlblxuICAgIF8uZWFjaCh3aW5kb3cuYWRiLmRzX25hbWVuX2VpbmRldXRpZywgZnVuY3Rpb24oZHNfbmFtZV9laW5kZXV0aWcpIHtcbiAgICAgICAgLy8gdmVyw6RuZGVyYmFyIHNpbmQgbnVyIHNlbGJzdCBpbXBvcnRpZXJ0ZSB1bmQgenVzYW1tZW5mYXNzZW5kZVxuICAgICAgICBpZiAoZHNfbmFtZV9laW5kZXV0aWdbMl0gPT09IGxvY2FsU3RvcmFnZS5FbWFpbCB8fCBkc19uYW1lX2VpbmRldXRpZ1sxXSB8fCBCb29sZWFuKGxvY2FsU3RvcmFnZS5hZG1pbikpIHtcbiAgICAgICAgICAgIC8vIHZlcsOkbmRlcmJhcmUgc2luZCBub3JtYWwgPSBzY2h3YXJ6XG4gICAgICAgICAgICBodG1sICs9IFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyBkc19uYW1lX2VpbmRldXRpZ1swXSArIFwiJyBjbGFzcz0nYWRiX2dydWVuX2ZldHQnIHdhZWhsYmFyPXRydWU+XCIgKyBkc19uYW1lX2VpbmRldXRpZ1swXSArIFwiPC9vcHRpb24+XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBuaWNodCB2ZXLDpG5kZXJiYXJlIHNpbmQgZ3JhdVxuICAgICAgICAgICAgaHRtbCArPSBcIjxvcHRpb24gdmFsdWU9J1wiICsgZHNfbmFtZV9laW5kZXV0aWdbMF0gKyBcIicgY2xhc3M9J2FkYl9ncmF1X25vcm1hbCcgd2FlaGxiYXI9ZmFsc2U+XCIgKyBkc19uYW1lX2VpbmRldXRpZ1swXSArIFwiPC9vcHRpb24+XCI7XG4gICAgICAgIH1cbiAgICB9KTtcblx0JChcIiNCc1dhZWhsZW5cIikuaHRtbChodG1sKTtcblx0JChcIiNCc1Vyc3BydW5nc0JzXCIpLmh0bWwoaHRtbCk7XG59O1xuXG53aW5kb3cuYWRiLmlzRmlsZUFQSUF2YWlsYWJsZSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdC8vIENoZWNrIGZvciB0aGUgdmFyaW91cyBGaWxlIEFQSSBzdXBwb3J0LlxuXHRpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iKSB7XG5cdFx0Ly8gR3JlYXQgc3VjY2VzcyEgQWxsIHRoZSBGaWxlIEFQSXMgYXJlIHN1cHBvcnRlZC5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBlbHNlIHtcblx0XHQvLyBzb3VyY2U6IEZpbGUgQVBJIGF2YWlsYWJpbGl0eSAtIC8vY2FuaXVzZS5jb20vI2ZlYXQ9ZmlsZWFwaVxuXHRcdC8vIHNvdXJjZTogPG91dHB1dD4gYXZhaWxhYmlsaXR5IC0gLy9odG1sNWRvY3Rvci5jb20vdGhlLW91dHB1dC1lbGVtZW50L1xuXHRcdHZhciBodG1sID0gXCJGw7xyIGRlbiBEYXRlbmltcG9ydCBiZW7DtnRpZ2VuIFNpZSBtaW5kZXN0ZW5zIGVpbmVuIGRlciBmb2xnZW5kZW4gQnJvd3Nlcjo8YnI+XCI7XG5cdFx0aHRtbCArPSBcIihTdGFuZCBNw6RyeiAyMDE0KTxicj5cIjtcblx0XHRodG1sICs9IFwiLSBHb29nbGUgQ2hyb21lOiAzMSBvZGVyIG5ldWVyPGJyPlwiO1xuXHRcdGh0bWwgKz0gXCItIENocm9tZSBhdWYgQW5kcm9pZDogMzMgb2RlciBuZXVlcjxicj5cIjtcblx0XHRodG1sICs9IFwiLSBNb3ppbGxhIEZpcmVmb3g6IDI4IG9kZXIgbmV1ZXI8YnI+XCI7XG5cdFx0aHRtbCArPSBcIi0gRmlyZWZveCBhdWYgQW5kcm9pZDogMjYgb2RlciBuZXVlcjxicj5cIjtcblx0XHRodG1sICs9IFwiLSBTYWZhcmk6IDcuMCBvZGVyIG5ldWVyPGJyPlwiO1xuXHRcdGh0bWwgKz0gXCItIGlPcyBTYWZhcmk6IDYuMCBvZGVyIG5ldWVyPGJyPlwiO1xuXHRcdGh0bWwgKz0gXCItIE9wZXJhOiAyMCBvZGVyIG5ldWVyPGJyPlwiO1xuXHRcdGh0bWwgKz0gXCItIEludGVybmV0IEV4cGxvcmVyOiAxMCBvZGVyIG5ldWVyPGJyPlwiO1xuXHRcdGh0bWwgKz0gXCItIEludGVybmV0IEV4cGxvcmVyIG1vYmlsZTogYmlzIFZlcnNpb24gMTAgbmljaHQ8YnI+XCI7XG5cdFx0aHRtbCArPSBcIi0gQW5kcm9pZCBTdGFuZGFyZGJyb3dzZXI6IEFuZHJvaWQgNC40IG9kZXIgbmV1ZXI8YnI+XCI7XG5cdFx0JChcIiNmaWxlQXBpTWVsZHVuZ1RleHRcIikuaHRtbChodG1sKTtcblx0XHQkKCcjZmlsZUFwaU1lbGR1bmcnKS5tb2RhbCgpO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcblxud2luZG93LmFkYi5zb3J0aWVyZU9iamVrdGFycmF5TmFjaE5hbWUgPSBmdW5jdGlvbihvYmpla3RhcnJheSkge1xuXHQndXNlIHN0cmljdCc7XG5cdC8vIEJlemllaHVuZ3NzYW1tbHVuZ2VuIGJ6dy4gRGF0ZW5zYW1tbHVuZ2VuIG5hY2ggTmFtZSBzb3J0aWVyZW5cblx0b2JqZWt0YXJyYXkuc29ydChmdW5jdGlvbihhLCBiKSB7XG5cdFx0dmFyIGFOYW1lID0gYS5OYW1lLFxuXHRcdFx0Yk5hbWUgPSBiLk5hbWU7XG5cdFx0aWYgKGFOYW1lICYmIGJOYW1lKSB7XG5cdFx0XHRyZXR1cm4gKGFOYW1lLnRvTG93ZXJDYXNlKCkgPT0gYk5hbWUudG9Mb3dlckNhc2UoKSkgPyAwIDogKGFOYW1lLnRvTG93ZXJDYXNlKCkgPiBiTmFtZS50b0xvd2VyQ2FzZSgpKSA/IDEgOiAtMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIChhTmFtZSA9PSBiTmFtZSkgPyAwIDogKGFOYW1lID4gYk5hbWUpID8gMSA6IC0xO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBvYmpla3RhcnJheTtcbn07XG5cbi8vIMO8YmVybmltbXQgZWluZW4gQXJyYXkgbWl0IGRlbiBCZXppZWh1bmdlblxuLy8gZ2lidCBkaWVzZW4gc29ydGllcnQgenVyw7xja1xud2luZG93LmFkYi5zb3J0aWVyZUJlemllaHVuZ2VuTmFjaE5hbWUgPSBmdW5jdGlvbihiZXppZWh1bmdlbikge1xuXHQndXNlIHN0cmljdCc7XG4vLyBCZXppZWh1bmdlbiBuYWNoIE5hbWUgc29ydGllcmVuXG5cdGJlemllaHVuZ2VuLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuXHRcdHZhciBhTmFtZSxcblx0XHRcdGJOYW1lO1xuICAgICAgICBfLmVhY2goYS5CZXppZWh1bmdzcGFydG5lciwgZnVuY3Rpb24oYmV6aWVodW5nc3BhcnRuZXIpIHtcbiAgICAgICAgICAgIGlmIChiZXppZWh1bmdzcGFydG5lci5HcnVwcGUgPT09IFwiTGViZW5zcsOkdW1lXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBzb3J0aWVydCB3ZXJkZW4gc29sbCBiZWkgTGViZW5zcsOkdW1lbiB6dWVyc3QgbmFjaCBUYXhvbm9taWUsIGRhbm4gbmFjaCBOYW1lXG4gICAgICAgICAgICAgICAgYU5hbWUgPSBiZXppZWh1bmdzcGFydG5lci5HcnVwcGUgKyBiZXppZWh1bmdzcGFydG5lci5UYXhvbm9taWUgKyBiZXppZWh1bmdzcGFydG5lci5OYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhTmFtZSA9IGJlemllaHVuZ3NwYXJ0bmVyLkdydXBwZSArIGJlemllaHVuZ3NwYXJ0bmVyLk5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfLmVhY2goYi5CZXppZWh1bmdzcGFydG5lciwgZnVuY3Rpb24oYmV6aWVodW5nc3BhcnRuZXIpIHtcbiAgICAgICAgICAgIGlmIChiZXppZWh1bmdzcGFydG5lci5HcnVwcGUgPT09IFwiTGViZW5zcsOkdW1lXCIpIHtcbiAgICAgICAgICAgICAgICBiTmFtZSA9IGJlemllaHVuZ3NwYXJ0bmVyLkdydXBwZSArIGJlemllaHVuZ3NwYXJ0bmVyLlRheG9ub21pZSArIGJlemllaHVuZ3NwYXJ0bmVyLk5hbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJOYW1lID0gYmV6aWVodW5nc3BhcnRuZXIuR3J1cHBlICsgYmV6aWVodW5nc3BhcnRuZXIuTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cdFx0aWYgKGFOYW1lICYmIGJOYW1lKSB7XG5cdFx0XHRyZXR1cm4gKGFOYW1lLnRvTG93ZXJDYXNlKCkgPT0gYk5hbWUudG9Mb3dlckNhc2UoKSkgPyAwIDogKGFOYW1lLnRvTG93ZXJDYXNlKCkgPiBiTmFtZS50b0xvd2VyQ2FzZSgpKSA/IDEgOiAtMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIChhTmFtZSA9PSBiTmFtZSkgPyAwIDogKGFOYW1lID4gYk5hbWUpID8gMSA6IC0xO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBiZXppZWh1bmdlbjtcbn07XG5cbi8vIHNvcnRpZXJ0IG5hY2ggZGVuIGtleXMgZGVzIE9iamVrdHNcbi8vIHJlc3VsdGF0IG5pY2h0IGdhcmFudGllcnQhXG53aW5kb3cuYWRiLnNvcnRLZXlzT2ZPYmplY3QgPSBmdW5jdGlvbihvKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIHNvcnRlZCA9IHt9LFxuXHRcdGtleSxcblx0XHRhID0gW107XG5cblx0Zm9yIChrZXkgaW4gbykge1xuXHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdGEucHVzaChrZXkpO1xuXHRcdH1cblx0fVxuXG5cdGEuc29ydCgpO1xuXG5cdGZvciAoa2V5ID0gMDsga2V5IDwgYS5sZW5ndGg7IGtleSsrKSB7XG5cdFx0c29ydGVkW2Fba2V5XV0gPSBvW2Fba2V5XV07XG5cdH1cblx0cmV0dXJuIHNvcnRlZDtcbn07XG5cbndpbmRvdy5hZGIuZXhwb3J0WnVyw7xja3NldHplbiA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG4gICAgdmFyICRleHBvcnRpZXJlbl9leHBvcnRpZXJlbl9jb2xsYXBzZSA9ICQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fY29sbGFwc2VcIik7XG5cdC8vIEV4cG9ydCBhdXNibGVuZGVuLCBmYWxscyBzaWUgZWluZ2VibGVuZGV0IHdhclxuXHRpZiAoJGV4cG9ydGllcmVuX2V4cG9ydGllcmVuX2NvbGxhcHNlLmNzcyhcImRpc3BsYXlcIikgIT09IFwibm9uZVwiKSB7XG5cdFx0JGV4cG9ydGllcmVuX2V4cG9ydGllcmVuX2NvbGxhcHNlLmNvbGxhcHNlKCdoaWRlJyk7XG5cdH1cblx0JChcIiNleHBvcnRpZXJlbl9leHBvcnRpZXJlbl90YWJlbGxlXCIpLmhpZGUoKTtcblx0JChcIi5leHBvcnRpZXJlbl9leHBvcnRpZXJlbl9leHBvcnRpZXJlblwiKS5oaWRlKCk7XG5cdCQoXCIjZXhwb3J0aWVyZW5fZXhwb3J0aWVyZW5fZXJyb3JfdGV4dFwiKVxuICAgICAgICAuYWxlcnQoKVxuICAgICAgICAuaGlkZSgpO1xufTtcblxud2luZG93LmFkYi7DtmZmbmVHcnVwcGUgPSBmdW5jdGlvbihHcnVwcGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgZXJzdGVsbGVCYXVtID0gcmVxdWlyZSgnLi9tb2R1bGVzL2Vyc3RlbGxlQmF1bScpO1xuXHQvLyBHcnVwcGUgYWxzIGdsb2JhbGUgVmFyaWFibGUgc3BlaWNoZXJuLCB3ZWlsIHNpZSBhbiB2aWVsZW4gT3J0ZW4gYmVudXR6dCB3aXJkXG5cdHdpbmRvdy5hZGIuR3J1cHBlID0gR3J1cHBlO1xuXHQkKFwiLnN1Y2hmZWxkXCIpLnZhbChcIlwiKTtcblx0JChcIiNHcnVwcGVfbGFiZWxcIikuaHRtbChcIkdydXBwZTpcIik7XG5cdCQoXCIuc3VjaGVuXCIpXG4gICAgICAgIC5oaWRlKClcbiAgICAgICAgLnZhbChcIlwiKTtcblx0JChcIiNmb3Jtc1wiKS5oaWRlKCk7XG5cdHZhciB0cmVlTWl0dGVpbHVuZyA9IFwiaG9sZSBEYXRlbi4uLlwiO1xuXHRpZiAod2luZG93LmFkYi5HcnVwcGUgPT09IFwiTWFjcm9teWNldGVzXCIpIHtcblx0XHR0cmVlTWl0dGVpbHVuZyA9IFwiaG9sZSBEYXRlbiAoZGFzIGRhdWVydCBiZWkgUGlsemVuIGzDpG5nZXIuLi4pXCI7XG5cdH1cblx0JChcIiN0cmVlTWl0dGVpbHVuZ1wiKVxuICAgICAgICAuaHRtbCh0cmVlTWl0dGVpbHVuZylcbiAgICAgICAgLnNob3coKTtcblx0ZXJzdGVsbGVCYXVtKCQpO1xuXHQvLyBrZWluZSBBcnQgbWVociBha3RpdlxuXHRkZWxldGUgbG9jYWxTdG9yYWdlLmFydF9pZDtcbn07XG5cbi8vIHNjaHJlaWJ0IMOEbmRlcnVuZ2VuIGluIEZlbGRlcm4gaW4gZGllIERhdGVuYmFua1xuLy8gd2lyZCB2b3Jsw6R1ZmlnIG51ciBmw7xyIExSIFRheG9ub21pZSB2ZXJ3ZW5kZXRcbndpbmRvdy5hZGIuc3BlaWNoZXJuID0gZnVuY3Rpb24oZmVsZHdlcnQsIGZlbGRuYW1lLCBkc19uYW1lLCBkc190eXApIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQvLyB6dWVyc3QgZGllIGlkIGRlcyBPYmpla3RzIGhvbGVuXG5cdHZhciB1cmkgPSBuZXcgVXJpKCQobG9jYXRpb24pLmF0dHIoJ2hyZWYnKSksXG5cdFx0aWQgPSB1cmkuZ2V0UXVlcnlQYXJhbVZhbHVlKCdpZCcpLFxuXHRcdC8vIHdlbm4gYnJvd3NlciBoaXN0b3J5IG5pY2h0IHVudGVyc3TDvHR6dCwgZXJzdGVsbHQgaGlzdG9yeS5qcyBlaW5lIGhhc2hcblx0XHQvLyBkYW5uIG11c3MgZGllIGlkIGR1cmNoIGRpZSBpZCBpbiBkZXIgaGFzaCBlcnNldHp0IHdlcmRlblxuXHRcdGhhc2ggPSB1cmkuYW5jaG9yKCksXG5cdFx0dXJpMjtcblx0aWYgKGhhc2gpIHtcblx0XHR1cmkyID0gbmV3IFVyaShoYXNoKTtcblx0XHRpZCA9IHVyaTIuZ2V0UXVlcnlQYXJhbVZhbHVlKCdpZCcpO1xuXHR9XG5cdC8vIHNpY2hlcnN0ZWxsZW4sIGRhc3MgYm9vbGVhbiwgZmxvYXQgdW5kIGludGVnZXIgbmljaHQgaW4gVGV4dCB2ZXJ3YW5kZWx0IHdlcmRlblxuXHRmZWxkd2VydCA9IHdpbmRvdy5hZGIuY29udmVydFRvQ29ycmVjdFR5cGUoZmVsZHdlcnQpO1xuXHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdCRkYi5vcGVuRG9jKGlkLCB7XG5cdFx0c3VjY2VzczogZnVuY3Rpb24ob2JqZWN0KSB7XG5cdFx0XHQvLyBwcsO8ZmVuLCBvYiBFaW5oZWl0IGVpbmVzIExSIHZlcsOkbmRlcnQgd3VyZGUuIFdlbm4gamE6IE5hbWUgZGVyIFRheG9ub21pZSBhbnBhc3NlblxuXHRcdFx0aWYgKGZlbGRuYW1lID09PSBcIkVpbmhlaXRcIiAmJiBvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uRWluaGVpdCA9PT0gb2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLlRheG9ub21pZSkge1xuXHRcdFx0XHQvLyBkYXMgaXN0IGRpZSBXdXJ6ZWwgZGVyIFRheG9ub21pZVxuXHRcdFx0XHQvLyBzb21pdCDDpG5kZXJ0IGF1Y2ggZGVyIFRheG9ub21pZW5hbWVcblx0XHRcdFx0Ly8gZGllc2VuIG1pdGdlYmVuXG5cdFx0XHRcdC8vIEVpbmhlaXQgw6RuZGVydCB1bmQgVGF4b25vbWllbmFtZSBtdXNzIGF1Y2ggYW5nZXBhc3N0IHdlcmRlblxuXHRcdFx0XHRvYmplY3QuVGF4b25vbWllLk5hbWUgPSBmZWxkd2VydDtcblx0XHRcdFx0b2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLlRheG9ub21pZSA9IGZlbGR3ZXJ0O1xuXHRcdFx0XHQvLyBUT0RPOiBwcsO8ZmVuLCBvYiBkaWUgw4RuZGVydW5nIHp1bMOkc3NpZyBpc3QgKFRheG9ub21pZW5hbWUgZWluZGV1dGlnKSAtLS0gVk9SIERFTSBTUEVJQ0hFUk5cblx0XHRcdFx0Ly8gVE9ETzogYWxsZsOkbGxpZ2UgQmV6aWVodW5nZW4gYW5wYXNzZW5cblx0XHRcdH1cblx0XHRcdC8vIGRlbiDDvGJlcmdlYmVuZW4gV2VydCBpbSDDvGJlcmdlYmVuZW4gRmVsZG5hbWVuIHNwZWljaGVyblxuXHRcdFx0b2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuW2ZlbGRuYW1lXSA9IGZlbGR3ZXJ0O1xuXHRcdFx0JGRiLnNhdmVEb2Mob2JqZWN0LCB7XG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRvYmplY3QuX3JldiA9IGRhdGEucmV2O1xuXHRcdFx0XHRcdC8vIHByw7xmZW4sIG9iIExhYmVsIG9kZXIgTmFtZSBlaW5lcyBMUiB2ZXLDpG5kZXJ0IHd1cmRlLiBXZW5uIGphOiBIaWVyYXJjaGllIGFrdHVhbGlzaWVyZW5cblx0XHRcdFx0XHRpZiAoZmVsZG5hbWUgPT09IFwiTGFiZWxcIiB8fCBmZWxkbmFtZSA9PT0gXCJFaW5oZWl0XCIpIHtcblx0XHRcdFx0XHRcdGlmIChmZWxkbmFtZSA9PT0gXCJFaW5oZWl0XCIgJiYgb2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkVpbmhlaXQgPT09IG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5UYXhvbm9taWUpIHtcblx0XHRcdFx0XHRcdFx0Ly8gZGFzIGlzdCBkaWUgV3VyemVsIGRlciBUYXhvbm9taWVcblx0XHRcdFx0XHRcdFx0Ly8gc29taXQgw6RuZGVydCBhdWNoIGRlciBUYXhvbm9taWVuYW1lXG5cdFx0XHRcdFx0XHRcdC8vIGRpZXNlbiBtaXRnZWJlblxuXHRcdFx0XHRcdFx0XHQvLyBFaW5oZWl0IMOkbmRlcnQgdW5kIFRheG9ub21pZW5hbWUgbXVzcyBhdWNoIGFuZ2VwYXNzdCB3ZXJkZW5cblx0XHRcdFx0XHRcdFx0d2luZG93LmFkYi5ha3R1YWxpc2llcmVIaWVyYXJjaGllRWluZXNMcklua2x1c2l2ZVNlaW5lckNoaWxkcmVuKG51bGwsIG9iamVjdCwgdHJ1ZSwgZmVsZHdlcnQpO1xuXHRcdFx0XHRcdFx0XHQvLyBGZWxkIFRheG9ub21pZSB1bmQgQmVzY2hyaWZ0dW5nIGRlcyBBY2NvcmRpb25zIGFrdHVhbGlzaWVyblxuXHRcdFx0XHRcdFx0XHQvLyBkYXp1IG5ldSBpbml0aWllcmVuLCB3ZWlsIHNvbnN0IGRhcyBBY2NvcmRpb24gbmljaHQgdmVyw6RuZGVydCB3aXJkXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5hZGIuaW5pdGlpZXJlX2FydChpZCk7XG5cdFx0XHRcdFx0XHRcdC8vIFRheG9ub21pZSBhbnplaWdlblxuXHRcdFx0XHRcdFx0XHQkKCcjJyArIHdpbmRvdy5hZGIuZXJzZXR6ZVVuZ8O8bHRpZ2VaZWljaGVuSW5JZE5hbWVuKGZlbGR3ZXJ0KSkuY29sbGFwc2UoJ3Nob3cnKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5hZGIuYWt0dWFsaXNpZXJlSGllcmFyY2hpZUVpbmVzTHJJbmtsdXNpdmVTZWluZXJDaGlsZHJlbihudWxsLCBvYmplY3QsIHRydWUsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIG5vZGUgdW1iZW5lbm5lblxuXHRcdFx0XHRcdFx0dmFyIG5ldWVyX25vZGV0ZXh0O1xuXHRcdFx0XHRcdFx0aWYgKGZlbGRuYW1lID09PSBcIkxhYmVsXCIpIHtcblx0XHRcdFx0XHRcdFx0Ly8gb2JqZWN0IGhhdCBub2NoIGRlbiBhbHRlbiBXZXJ0IGbDvHIgTGFiZWwsIG5ldWVuIHZlcndlbmRlblxuXHRcdFx0XHRcdFx0XHRuZXVlcl9ub2RldGV4dCA9IHdpbmRvdy5hZGIuZXJzdGVsbGVMckxhYmVsTmFtZShmZWxkd2VydCwgb2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkVpbmhlaXQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gb2JqZWN0IGhhdCBub2NoIGRlbiBhbHRlbiBXZXJ0IGbDvHIgRWluaGVpdCwgbmV1ZW4gdmVyd2VuZGVuXG5cdFx0XHRcdFx0XHRcdG5ldWVyX25vZGV0ZXh0ID0gd2luZG93LmFkYi5lcnN0ZWxsZUxyTGFiZWxOYW1lKG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5MYWJlbCwgZmVsZHdlcnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0JChcIiN0cmVlXCIgKyB3aW5kb3cuYWRiLkdydXBwZSkuanN0cmVlKFwicmVuYW1lX25vZGVcIiwgXCIjXCIgKyBvYmplY3QuX2lkLCBuZXVlcl9ub2RldGV4dCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JChcIiNtZWxkdW5nX2luZGl2aWR1ZWxsX2xhYmVsXCIpLmh0bWwoXCJGZWhsZXJcIik7XG5cdFx0XHRcdFx0JChcIiNtZWxkdW5nX2luZGl2aWR1ZWxsX3RleHRcIikuaHRtbChcIkRpZSBsZXR6dGUgw4RuZGVydW5nIGltIEZlbGQgXCIrZmVsZG5hbWUrXCIgd3VyZGUgbmljaHQgZ2VzcGVpY2hlcnRcIik7XG5cdFx0XHRcdFx0JChcIiNtZWxkdW5nX2luZGl2aWR1ZWxsX3NjaGxpZXNzZW5cIikuaHRtbChcInNjaGxpZXNzZW5cIik7XG5cdFx0XHRcdFx0JCgnI21lbGR1bmdfaW5kaXZpZHVlbGwnKS5tb2RhbCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGVycm9yOiBmdW5jdGlvbigpIHtcblx0XHRcdCQoXCIjbWVsZHVuZ19pbmRpdmlkdWVsbF9sYWJlbFwiKS5odG1sKFwiRmVobGVyXCIpO1xuXHRcdFx0JChcIiNtZWxkdW5nX2luZGl2aWR1ZWxsX3RleHRcIikuaHRtbChcIkRpZSBsZXR6dGUgw4RuZGVydW5nIGltIEZlbGQgXCIrZmVsZG5hbWUrXCIgd3VyZGUgbmljaHQgZ2VzcGVpY2hlcnRcIik7XG5cdFx0XHQkKFwiI21lbGR1bmdfaW5kaXZpZHVlbGxfc2NobGllc3NlblwiKS5odG1sKFwic2NobGllc3NlblwiKTtcblx0XHRcdCQoJyNtZWxkdW5nX2luZGl2aWR1ZWxsJykubW9kYWwoKTtcblx0XHR9XG5cdH0pO1xufTtcblxud2luZG93LmFkYi5jb252ZXJ0VG9Db3JyZWN0VHlwZSA9IGZ1bmN0aW9uKGZlbGR3ZXJ0KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIHR5cGUgPSB3aW5kb3cuYWRiLm15VHlwZU9mKGZlbGR3ZXJ0KTtcblx0aWYgKHR5cGUgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0cmV0dXJuIEJvb2xlYW4oZmVsZHdlcnQpO1xuXHR9IGVsc2UgaWYgKHR5cGUgPT09IFwiZmxvYXRcIikge1xuXHRcdHJldHVybiBwYXJzZUZsb2F0KGZlbGR3ZXJ0KTtcblx0fSBlbHNlIGlmICh0eXBlID09PSBcImludGVnZXJcIikge1xuXHRcdHJldHVybiBwYXJzZUludChmZWxkd2VydCk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGZlbGR3ZXJ0O1xuXHR9XG59O1xuXG4vLyBIaWxmc2Z1bmt0aW9uLCBkaWUgdHlwZW9mIGVyc2V0enQgdW5kIGVyZ8Okbnp0XG4vLyB0eXBlb2YgZ2lidCBiZWkgaW5wdXQtRmVsZGVybiBpbW1lciBTdHJpbmcgenVyw7xjayFcbndpbmRvdy5hZGIubXlUeXBlT2YgPSBmdW5jdGlvbih3ZXJ0KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKHR5cGVvZiB3ZXJ0ID09PSBcImJvb2xlYW5cIikge1xuXHRcdHJldHVybiBcImJvb2xlYW5cIjtcblx0fSBlbHNlIGlmIChwYXJzZUludCh3ZXJ0KSAmJiBwYXJzZUZsb2F0KHdlcnQpICYmIHBhcnNlSW50KHdlcnQpICE9IHBhcnNlRmxvYXQod2VydCkgJiYgcGFyc2VJbnQod2VydCkgPT0gd2VydCkge1xuXHRcdC8vIGVzIGlzdCBlaW5lIEZsb2F0XG5cdFx0cmV0dXJuIFwiZmxvYXRcIjtcblx0Ly8gdmVyaGluZGVybiwgZGFzcyBmw7xocmVuZGUgTnVsbGVuIGFiZ2VzY2huaXR0ZW4gd2VyZGVuXG5cdH0gZWxzZSBpZiAocGFyc2VJbnQod2VydCkgPT0gd2VydCAmJiB3ZXJ0LnRvU3RyaW5nKCkubGVuZ3RoID09PSBNYXRoLmNlaWwocGFyc2VJbnQod2VydCkvMTApKSB7XG5cdFx0Ly8gZXMgaXN0IGVpbmUgSW50ZWdlclxuXHRcdHJldHVybiBcImludGVnZXJcIjtcblx0fSBlbHNlIHtcblx0XHQvLyBhbHMgU3RyaW5nIGJlaGFuZGVsblxuXHRcdHJldHVybiBcInN0cmluZ1wiO1xuXHR9XG59O1xuXG53aW5kb3cuYWRiLmJlYXJiZWl0ZUxyVGF4b25vbWllID0gZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Ly8gQmVudXR6ZXIgbXVzcyBhbm1lbGRlblxuXHRpZiAoIXdpbmRvdy5hZGIucHLDvGZlQW5tZWxkdW5nKFwiYXJ0XCIpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gRWluc3RlbGx1bmcgbWVya2VuLCBkYW1pdCBhdWNoIG5hY2ggRGF0ZW5zYXR6d2VjaHNlbCBkaWUgQmVhcmJlaXRiYXJrZWl0IGJsZWlidFxuXHRsb2NhbFN0b3JhZ2UubHJfYmVhcmIgPSB0cnVlO1xuXG5cdC8vIEFubWVsZHVuZzogemVpZ2VuLCBhYmVyIGdlc2NobG9zc2VuXG5cdCQoXCIjYXJ0X2FubWVsZGVuX2NvbGxhcHNlXCIpLmNvbGxhcHNlKCdoaWRlJyk7XG5cdCQoXCIjYXJ0X2FubWVsZGVuXCIpLnNob3coKTtcblxuXHQvLyBhbGxlIEZlbGRlciBzY2hyZWliYmFyIHNldHplblxuXHQkKFwiLkxlYmVuc3LDpHVtZS5UYXhvbm9taWVcIikuZmluZChcIi5jb250cm9sc1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdC8vIGVpbmlnZSBGZWxkZXIgbmljaHQgYmVhcmJlaXRlblxuXHRcdGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgIT09IFwiR1VJRFwiICYmICQodGhpcykuYXR0cignaWQnKSAhPT0gXCJQYXJlbnRcIiAmJiAkKHRoaXMpLmF0dHIoJ2lkJykgIT09IFwiVGF4b25vbWllXCIgJiYgJCh0aGlzKS5hdHRyKCdpZCcpICE9PSBcIkhpZXJhcmNoaWVcIikge1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XG5cdFx0XHQkKHRoaXMpLmF0dHIoJ3JlYWRvbmx5JywgZmFsc2UpO1xuXHRcdFx0aWYgKHBhcmVudC5hdHRyKCdocmVmJykpIHtcblx0XHRcdFx0cGFyZW50LmF0dHIoJ2hyZWYnLCAnIycpO1xuXHRcdFx0XHQvLyBTdGFuZGFyZHZlcmhhbHRlbiBiZWltIEtsaWNrZW4gdm9uIExpbmtzIHZlcmhpbmRlcm5cblx0XHRcdFx0cGFyZW50LmF0dHIoJ29uY2xpY2snLCAncmV0dXJuIGZhbHNlOycpO1xuXHRcdFx0XHQvLyBNYXVzcG9pbnRlciBuaWNodCBtZWhyIGFscyBGaW5nZXJcblx0XHRcdFx0dGhpcy5zdHlsZS5jdXJzb3IgPSAnJztcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdC8vIFNjaHJlaWJiYXJrZWl0IGluIGRlbiBTeW1ib2xlbiBhbnplaWdlblxuXHQkKCcubHJfYmVhcmInKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0JChcIi5scl9iZWFyYl9iZWFyYlwiKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbn07XG5cbndpbmRvdy5hZGIuc2Now7x0emVMclRheG9ub21pZSA9IGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cdC8vIGFsbGUgRmVsZGVyIHNjaHJlaWJiYXIgc2V0emVuXG5cdCQoXCIuTGViZW5zcsOkdW1lLlRheG9ub21pZSAuY29udHJvbHNcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XG5cdFx0JCh0aGlzKS5hdHRyKCdyZWFkb25seScsIHRydWUpO1xuXHRcdGlmIChwYXJlbnQuYXR0cignaHJlZicpKSB7XG5cdFx0XHR2YXIgZmVsZFdlcnQgPSAkKHRoaXMpLnZhbCgpO1xuXHRcdFx0aWYgKHR5cGVvZiBmZWxkV2VydCA9PT0gXCJzdHJpbmdcIiAmJiBmZWxkV2VydC5zbGljZSgwLCA3KSA9PT0gXCIvL1wiKSB7XG5cdFx0XHRcdHBhcmVudC5hdHRyKCdocmVmJywgZmVsZFdlcnQpO1xuXHRcdFx0XHQvLyBmYWxscyBvbmNsaWNrIGJlc3RlaHQsIGVudGZlcm5lblxuXHRcdFx0XHRwYXJlbnQucmVtb3ZlQXR0cihcIm9uY2xpY2tcIik7XG5cdFx0XHRcdC8vIE1hdXNwb2ludGVyIG5pY2h0IG1laHIgYWxzIEZpbmdlclxuXHRcdFx0XHR0aGlzLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHQkKCcubHJfYmVhcmInKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0JChcIi5scl9iZWFyYl9iZWFyYlwiKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0JChcIiNhcnRfYW5tZWxkZW5cIikuaGlkZSgpO1xufTtcblxuLy8gYWt0dWFsaXNpZXJ0IGRpZSBIaWVyYXJjaGllIGVpbmVzIEFycmF5cyB2b24gT2JqZWt0ZW4gKGluIGRpZXNlciBGb3JtOiBMZWJlbnNyw6R1bWVuLCBzaWVoZSB3aWUgZGVyIE5hbWUgZGVyIHBhcmVudC1vYmpla3RlIGVyc3RlbGx0IHdpcmQpXG4vLyBkZXIgQXJyYXkga2FubiBkYXMgUmVzdWx0YXQgZWluZXIgQWJmcmFnZSBhdXMgZGVyIERCIHNlaW4gKG9iamVjdFtpXSA9IGRhcmEucm93c1tpXS5kb2MpXG4vLyBvZGVyIGF1cyBkZW0gSW1wb3J0IGVpbmVyIFRheG9ub21pZSBzdGFtbWVuXG4vLyBkaWVzZSBGdW5rdGlvbiB3aXJkIGJlbsO2dGlndCwgd2VubiBlaW5lIG5ldWUgVGF4b25vbWllIGltcG9ydGllcnQgd2lyZFxuLy8gTW9tZW50YW4gbmljaHQgdmVyd2VuZGV0XG53aW5kb3cuYWRiLmFrdHVhbGlzaWVyZUhpZXJhcmNoaWVFaW5lckxyVGF4b25vbWllID0gZnVuY3Rpb24ob2JqZWN0X2FycmF5KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIG9iamVjdCxcblx0XHRoaWVyYXJjaGllLFxuXHRcdHBhcmVudDtcbiAgICBfLmVhY2gob2JqZWN0X2FycmF5LCBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgaGllcmFyY2hpZSA9IFtdO1xuICAgICAgICBwYXJlbnQgPSBvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uUGFyZW50O1xuICAgICAgICAvLyBhbHMgU3RhcnQgc2ljaCBzZWxiZW4genVyIEhpZXJhcmNoaWUgaGluenVmw7xnZW5cbiAgICAgICAgaGllcmFyY2hpZS5wdXNoKHdpbmRvdy5hZGIuZXJzdGVsbGVIaWVyYXJjaGllb2JqZWt0QXVzT2JqZWt0KG9iamVjdCkpO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uSGllcmFyY2hpZSA9IHdpbmRvdy5hZGIuZXJnw6RuemVQYXJlbnRadUxySGllcmFyY2hpZShvYmplY3RfYXJyYXksIG9iamVjdC5faWQsIGhpZXJhcmNoaWUpO1xuICAgICAgICAgICAgJGRiLnNhdmVEb2Mob2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLy8gYWt0dWFsaXNpZXJ0IGRpZSBIaWVyYXJjaGllIGVpbmVzIE9iamVrdHMgKGluIGRpZXNlciBGb3JtOiBMZWJlbnNyYXVtKVxuLy8gaXN0IGFrdHVhbGlzaWVyZUhpZXJhcmNoaWVmZWxkIHRydWUsIHdpcmQgZGFzIEZlbGQgaW4gZGVyIFVJIGFrdHVhbGlzaWVydFxuLy8gZGllc2UgRnVua3Rpb24gd2lyZCBiZW7DtnRpZ3QsIHdlbm4gZWluIG5ldWVyIExSIGVyc3RlbGx0IHdpcmRcbi8vIExSIGthbm4gbWl0Z2VnZWJlbiB3ZXJkZW4sIG11c3MgYWJlciBuaWNodFxuLy8gd2lyZCBtaXRnZWdlYmVuLCB3ZW5uIGFuIGRlbiBiZXRyZWZmZW5kZW4gbHIgbmljaHRzIMOkbmRlcnQgdW5kIG5pY2h0IGplZGVzIG1hbCBkaWUgTFIgYXVzIGRlciBEQiBuZXUgYWJnZXJ1ZmVuIHdlcmRlbiBzb2xsZW5cbi8vIG1hbmNobWFsIGlzdCBlcyBhYmVyIG7DtnRpZywgZGllIExSIG5ldSB6dSBob2xlbiwgd2VubiBkYXp3aXNjaGVuIGFuIExSIGdlw6RuZGVydCB3aXJkIVxud2luZG93LmFkYi5ha3R1YWxpc2llcmVIaWVyYXJjaGllRWluZXNOZXVlbkxyID0gZnVuY3Rpb24obHIsIG9iamVjdCwgYWt0dWFsaXNpZXJlX2hpZXJhcmNoaWVmZWxkKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKGxyKSB7XG5cdFx0d2luZG93LmFkYi5ha3R1YWxpc2llcmVIaWVyYXJjaGllRWluZXNOZXVlbkxyXzIobHIsIG9iamVjdCwgYWt0dWFsaXNpZXJlX2hpZXJhcmNoaWVmZWxkKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdFx0JGRiLnZpZXcoJ2FydGVuZGIvbHI/aW5jbHVkZV9kb2NzPXRydWUnLCB7XG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdHdpbmRvdy5hZGIuYWt0dWFsaXNpZXJlSGllcmFyY2hpZUVpbmVzTmV1ZW5Mcl8yKGRhdGEsIG9iamVjdCwgYWt0dWFsaXNpZXJlX2hpZXJhcmNoaWVmZWxkKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufTtcblxud2luZG93LmFkYi5ha3R1YWxpc2llcmVIaWVyYXJjaGllRWluZXNOZXVlbkxyXzIgPSBmdW5jdGlvbihMUiwgb2JqZWN0KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIG9iamVjdF9hcnJheSxcblx0XHRoaWVyYXJjaGllID0gW10sXG5cdFx0cGFyZW50X29iamVjdCxcblx0XHRlcnN0ZWxsZUJhdW0gPSByZXF1aXJlKCcuL21vZHVsZXMvZXJzdGVsbGVCYXVtJyk7XG5cdG9iamVjdF9hcnJheSA9IF8ubWFwKExSLnJvd3MsIGZ1bmN0aW9uKHJvdykge1xuXHRcdHJldHVybiByb3cuZG9jO1xuXHR9KTtcblx0aWYgKCFvYmplY3QuVGF4b25vbWllKSB7XG5cdFx0b2JqZWN0LlRheG9ub21pZSA9IHt9O1xuXHR9XG5cdGlmICghb2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuKSB7XG5cdFx0b2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuID0ge307XG5cdH1cblx0cGFyZW50X29iamVjdCA9IF8uZmluZChvYmplY3RfYXJyYXksIGZ1bmN0aW9uKG9iaikge1xuXHRcdHJldHVybiBvYmouX2lkID09PSBvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uUGFyZW50LkdVSUQ7XG5cdH0pO1xuXHQvLyBvYmplY3QuTmFtZSBzZXR6ZW5cblx0b2JqZWN0LlRheG9ub21pZS5OYW1lID0gcGFyZW50X29iamVjdC5UYXhvbm9taWUuTmFtZTtcblx0Ly8gb2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLlRheG9ub21pZSBzZXR6ZW5cblx0b2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLlRheG9ub21pZSA9IHBhcmVudF9vYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uVGF4b25vbWllO1xuXHQvLyBhbHMgU3RhcnQgc2ljaCBzZWxiZW4genVyIEhpZXJhcmNoaWUgaGluenVmw7xnZW5cblx0aGllcmFyY2hpZS5wdXNoKHdpbmRvdy5hZGIuZXJzdGVsbGVIaWVyYXJjaGllb2JqZWt0QXVzT2JqZWt0KG9iamVjdCkpO1xuXHRvYmplY3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uSGllcmFyY2hpZSA9IHdpbmRvdy5hZGIuZXJnw6RuemVQYXJlbnRadUxySGllcmFyY2hpZShvYmplY3RfYXJyYXksIG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5QYXJlbnQuR1VJRCwgaGllcmFyY2hpZSk7XG5cdC8vIHNhdmUgb2huZSBvcGVuOiBfcmV2IHd1cmRlIHp1dm9yIMO8YmVybm9tbWVuXG5cdCRkYi5zYXZlRG9jKG9iamVjdCwge1xuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xuXHRcdFx0JC53aGVuKGVyc3RlbGxlQmF1bSgkKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdFx0d2luZG93LmFkYi7DtmZmbmVCYXVtWnVJZChvYmplY3QuX2lkKTtcblx0XHRcdFx0JCgnI2xyX3BhcmVudF93YWVobGVuJykubW9kYWwoJ2hpZGUnKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNtZWxkdW5nX2luZGl2aWR1ZWxsX2xhYmVsXCIpLmh0bWwoXCJGZWhsZXJcIik7XG5cdFx0XHQkKFwiI21lbGR1bmdfaW5kaXZpZHVlbGxfdGV4dFwiKS5odG1sKFwiRGllIEhpZXJhcmNoaWUgZGVzIExlYmVuc3JhdW1zIGtvbm50ZSBuaWNodCBlcnN0ZWxsdCB3ZXJkZW5cIik7XG5cdFx0XHQkKFwiI21lbGR1bmdfaW5kaXZpZHVlbGxfc2NobGllc3NlblwiKS5odG1sKFwic2NobGllc3NlblwiKTtcblx0XHRcdCQoJyNtZWxkdW5nX2luZGl2aWR1ZWxsJykubW9kYWwoKTtcblx0XHRcdHdpbmRvdy5hZGIuaW5pdGlpZXJlX2FydChvYmplY3QuX2lkKTtcblx0XHR9XG5cdH0pO1xufTtcblxuLy8gYWt0dWFsaXNpZXJ0IGRpZSBIaWVyYXJjaGllIGVpbmVzIE9iamVrdHMgKGluIGRpZXNlciBGb3JtOiBMZWJlbnNyYXVtKVxuLy8gdW5kIGF1Y2ggZGVuIHBhcmVudFxuLy8gcHLDvGZ0LCBvYiBkaWVzZXMgT2JqZWt0IGNoaWxkcmVuIGhhdFxuLy8gd2VubiBqYSwgd2lyZCBkZXJlbiBIaWVyYXJjaGllIGF1Y2ggYWt0dWFsaXNpZXJ0XG4vLyBpc3QgYWt0dWFsaXNpZXJlSGllcmFyY2hpZWZlbGQgdHJ1ZSwgd2lyZCBkYXMgRmVsZCBpbiBkZXIgVUkgYWt0dWFsaXNpZXJ0XG4vLyB3aXJkIGRhcyBFcmdlYm5pcyBkZXIgREItQWJmcmFnZSBtaXRnZWdlYmVuLCB3aXJkIGRpZSBBYmZyYWdlIG5pY2h0IHdpZWRlcmhvbHRcbi8vIGRpZXNlIEZ1bmt0aW9uIHdpcmQgYmVuw7Z0aWd0LCB3ZW5uIE5hbWVuIG9kZXIgTGFiZWwgZWluZXMgYmVzdGVoZW5kZW4gTFIgdmVyw6RuZGVydCB3aXJkXG53aW5kb3cuYWRiLmFrdHVhbGlzaWVyZUhpZXJhcmNoaWVFaW5lc0xySW5rbHVzaXZlU2VpbmVyQ2hpbGRyZW4gPSBmdW5jdGlvbihsciwgb2JqZWN0LCBha3R1YWxpc2llcmVIaWVyYXJjaGllZmVsZCwgZWluaGVpdF9pc3RfdGF4b25vbWllbmFtZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdGlmIChscikge1xuXHRcdHdpbmRvdy5hZGIuYWt0dWFsaXNpZXJlSGllcmFyY2hpZUVpbmVzTHJJbmtsdXNpdmVTZWluZXJDaGlsZHJlbl8yKGxyLCBvYmplY3QsIGFrdHVhbGlzaWVyZUhpZXJhcmNoaWVmZWxkLCBlaW5oZWl0X2lzdF90YXhvbm9taWVuYW1lKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgJGRiID0gJC5jb3VjaC5kYihcImFydGVuZGJcIik7XG5cdFx0JGRiLnZpZXcoJ2FydGVuZGIvbHI/aW5jbHVkZV9kb2NzPXRydWUnLCB7XG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihscikge1xuXHRcdFx0XHR3aW5kb3cuYWRiLmFrdHVhbGlzaWVyZUhpZXJhcmNoaWVFaW5lc0xySW5rbHVzaXZlU2VpbmVyQ2hpbGRyZW5fMihsciwgb2JqZWN0LCBha3R1YWxpc2llcmVIaWVyYXJjaGllZmVsZCwgZWluaGVpdF9pc3RfdGF4b25vbWllbmFtZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn07XG5cbndpbmRvdy5hZGIuYWt0dWFsaXNpZXJlSGllcmFyY2hpZUVpbmVzTHJJbmtsdXNpdmVTZWluZXJDaGlsZHJlbl8yID0gZnVuY3Rpb24obHIsIG9iamVrdCwgYWt0dWFsaXNpZXJlSGllcmFyY2hpZWZlbGQsIGVpbmhlaXRfaXN0X3RheG9ub21pZW5hbWUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgaGllcmFyY2hpZSA9IFtdLFxuXHRcdHBhcmVudCA9IG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5QYXJlbnQsXG5cdFx0b2JqZWN0X2FycmF5ID0gXy5tYXAobHIucm93cywgZnVuY3Rpb24ocm93KSB7XG5cdFx0XHRyZXR1cm4gcm93LmRvYztcblx0XHR9KTtcblx0aWYgKCFvYmpla3QuVGF4b25vbWllKSB7XG5cdFx0b2JqZWt0LlRheG9ub21pZSA9IHt9O1xuXHR9XG5cdGlmICghb2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuKSB7XG5cdFx0b2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuID0ge307XG5cdH1cblx0Ly8gYWxzIFN0YXJ0IHNpY2ggc2VsYmVyIHp1ciBIaWVyYXJjaGllIGhpbnp1ZsO8Z2VuXG5cdGhpZXJhcmNoaWUucHVzaCh3aW5kb3cuYWRiLmVyc3RlbGxlSGllcmFyY2hpZW9iamVrdEF1c09iamVrdChvYmpla3QpKTtcblx0aWYgKHBhcmVudC5HVUlEICE9PSBvYmpla3QuX2lkKSB7XG5cdFx0b2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkhpZXJhcmNoaWUgPSB3aW5kb3cuYWRiLmVyZ8OkbnplUGFyZW50WnVMckhpZXJhcmNoaWUob2JqZWN0X2FycmF5LCBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uUGFyZW50LkdVSUQsIGhpZXJhcmNoaWUpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGFoYSwgZGFzIGlzdCBkaWUgV3VyemVsIGRlcyBCYXVtc1xuXHRcdG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5IaWVyYXJjaGllID0gaGllcmFyY2hpZTtcblx0fVxuXHRpZiAoYWt0dWFsaXNpZXJlSGllcmFyY2hpZWZlbGQpIHtcblx0XHQkKFwiI0hpZXJhcmNoaWVcIikudmFsKHdpbmRvdy5hZGIuZXJzdGVsbGVIaWVyYXJjaGllRsO8ckZlbGRBdXNIaWVyYXJjaGllb2JqZWt0ZUFycmF5KG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5IaWVyYXJjaGllKSk7XG5cdH1cblx0Ly8gamV0enQgZGVuIHBhcmVudCBha3R1YWxpc2llcmVuXG5cdGlmIChvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uSGllcmFyY2hpZS5sZW5ndGggPiAxKSB7XG5cdFx0Ly8gZXMgZ2lidCBow7ZoZXJlIEViZW5lblxuXHRcdC8vIGRhcyB2b3JsZXR6dGUgSGllcmFyY2hpZW9iamVrdCB3w6RobGVuLiBkYXMgaXN0IGxlbmd0aCAtMiwgd2VpbCBsZW5ndGggYmVpIDEgYmVnaW5udCwgZGllIE9iamVrdGUgYWJlciB2b24gMCBhbiBudW1tZXJpZXJ0IHdlcmRlblxuXHRcdG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5QYXJlbnQgPSBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uSGllcmFyY2hpZVtvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uSGllcmFyY2hpZS5sZW5ndGgtMl07XG5cdH0gZWxzZSBpZiAob2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLkhpZXJhcmNoaWUubGVuZ3RoID09PSAxKSB7XG5cdFx0Ly8gZGFzIGlzdCBkaWUgb2JlcnN0ZSBFYmVuZVxuXHRcdG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5QYXJlbnQgPSBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uSGllcmFyY2hpZVswXTtcblx0fVxuXHRpZiAoZWluaGVpdF9pc3RfdGF4b25vbWllbmFtZSkge1xuXHRcdC8vIEVpbmhlaXQgw6RuZGVydCB1bmQgVGF4b25vbWllbmFtZSBtdXNzIGF1Y2ggYW5nZXBhc3N0IHdlcmRlblxuXHRcdG9iamVrdC5UYXhvbm9taWUuTmFtZSA9IGVpbmhlaXRfaXN0X3RheG9ub21pZW5hbWU7XG5cdFx0b2JqZWt0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLlRheG9ub21pZSA9IGVpbmhlaXRfaXN0X3RheG9ub21pZW5hbWU7XG5cdH1cblx0JGRiLnNhdmVEb2Mob2JqZWt0LCB7XG5cdFx0c3VjY2VzczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZG9jO1xuXHRcdFx0Ly8ga29udHJvbGxpZXJlbiwgb2IgZGFzIE9iamVrdCBjaGlsZHJlbiBoYXQuIFdlbm4gamEsIGRpZXNlIGFrdHVhbGlzaWVyZW5cbiAgICAgICAgICAgIF8uZWFjaChsci5yb3dzLCBmdW5jdGlvbihscl9yb3cpIHtcbiAgICAgICAgICAgICAgICBkb2MgPSBscl9yb3cuZG9jO1xuICAgICAgICAgICAgICAgIGlmIChkb2MuVGF4b25vbWllICYmIGRvYy5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbiAmJiBkb2MuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uUGFyZW50ICYmIGRvYy5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5QYXJlbnQuR1VJRCAmJiBkb2MuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uUGFyZW50LkdVSUQgPT09IG9iamVrdC5faWQgJiYgZG9jLl9pZCAhPT0gb2JqZWt0Ll9pZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBkYXMgaXN0IGVpbiBjaGlsZFxuICAgICAgICAgICAgICAgICAgICAvLyBhdWNoIGFrdHVhbGlzaWVyZW5cbiAgICAgICAgICAgICAgICAgICAgLy8gbHIgbWl0Z2ViZW4sIGRhbWl0IGRpZSBBYmZyYWdlIG5pY2h0IHdpZWRlcmhvbHQgd2VyZGVuIG11c3NcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkYi5ha3R1YWxpc2llcmVIaWVyYXJjaGllRWluZXNMcklua2x1c2l2ZVNlaW5lckNoaWxkcmVuXzIobHIsIGRvYywgZmFsc2UsIGVpbmhlaXRfaXN0X3RheG9ub21pZW5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vLyBCYXV0IGRlbiBIaWVyYXJjaGllcGZhZCBmw7xyIGVpbmVuIExlYmVuc3JhdW0gYXVmXG4vLyBkYXMgZXJzdGUgRWxlbWVudCAtIGRlciBMZWJlbnNyYXVtIHNlbGJzdCAtIHdpcmQgbWl0IGRlciBWYXJpYWJsZSBcIkhpZXJhcmNoaWVcIiDDvGJlcmdlYmVuXG4vLyBydWZ0IHNpY2ggc2VsYnN0IHJla3Vyc2l2IGF1ZiwgYmlzIGRhcyBvYmVyc3RlIEhpZXJhcmNoaWVlbGVtZW50IGVycmVpY2h0IGlzdFxud2luZG93LmFkYi5lcmfDpG56ZVBhcmVudFp1THJIaWVyYXJjaGllID0gZnVuY3Rpb24ob2JqZWt0X2FycmF5LCBwYXJlbnRHVUlELCBIaWVyYXJjaGllKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIHBhcmVudF9vYmpla3QsXG5cdFx0aGllcmFyY2hpZV9lcmfDpG56dDtcbiAgICBfLmVhY2gob2JqZWt0X2FycmF5LCBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdC5faWQgPT09IHBhcmVudEdVSUQpIHtcbiAgICAgICAgICAgIHBhcmVudF9vYmpla3QgPSB3aW5kb3cuYWRiLmVyc3RlbGxlSGllcmFyY2hpZW9iamVrdEF1c09iamVrdChvYmplY3QpO1xuICAgICAgICAgICAgSGllcmFyY2hpZS5wdXNoKHBhcmVudF9vYmpla3QpO1xuICAgICAgICAgICAgaWYgKG9iamVjdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5QYXJlbnQuR1VJRCAhPT0gb2JqZWN0Ll9pZCkge1xuICAgICAgICAgICAgICAgIC8vIGRpZSBIaWVyYXJjaGllIGlzdCBub2NoIG5pY2h0IHp1IEVuZGUgLSB3ZWl0ZXJtYWNoZW5cbiAgICAgICAgICAgICAgICBoaWVyYXJjaGllX2VyZ8Okbnp0ID0gd2luZG93LmFkYi5lcmfDpG56ZVBhcmVudFp1THJIaWVyYXJjaGllKG9iamVrdF9hcnJheSwgb2JqZWN0LlRheG9ub21pZS5FaWdlbnNjaGFmdGVuLlBhcmVudC5HVUlELCBIaWVyYXJjaGllKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gSGllcmFyY2hpZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gamV0enQgaXN0IGRpZSBIaWVyYXJjaGllIHZvbGxzdMOkbmRpZ1xuICAgICAgICAgICAgICAgIC8vIHNpZSBpc3QgYWJlciB2ZXJrZWhydCAtIHVta2VocmVuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEhpZXJhcmNoaWUucmV2ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG53aW5kb3cuYWRiLmVyc3RlbGxlSGllcmFyY2hpZW9iamVrdEF1c09iamVrdCA9IGZ1bmN0aW9uKG9iamVrdCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBoaWVyYXJjaGllb2JqZWt0ID0ge307XG5cdGhpZXJhcmNoaWVvYmpla3QuTmFtZSA9IHdpbmRvdy5hZGIuZXJzdGVsbGVMckxhYmVsTmFtZUF1c09iamVrdChvYmpla3QpO1xuXHRoaWVyYXJjaGllb2JqZWt0LkdVSUQgPSBvYmpla3QuX2lkO1xuXHRyZXR1cm4gaGllcmFyY2hpZW9iamVrdDtcbn07XG5cbndpbmRvdy5hZGIuZXJzdGVsbGVMckxhYmVsTmFtZUF1c09iamVrdCA9IGZ1bmN0aW9uKG9iamVrdCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBsYWJlbCA9IG9iamVrdC5UYXhvbm9taWUuRWlnZW5zY2hhZnRlbi5MYWJlbCB8fCBcIlwiLFxuXHRcdGVpbmhlaXQgPSBvYmpla3QuVGF4b25vbWllLkVpZ2Vuc2NoYWZ0ZW4uRWluaGVpdCB8fCBcIlwiO1xuXHRyZXR1cm4gd2luZG93LmFkYi5lcnN0ZWxsZUxyTGFiZWxOYW1lKGxhYmVsLCBlaW5oZWl0KTtcbn07XG5cbndpbmRvdy5hZGIuZXJzdGVsbGVMckxhYmVsTmFtZSA9IGZ1bmN0aW9uKGxhYmVsLCBlaW5oZWl0KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0aWYgKGxhYmVsICYmIGVpbmhlaXQpIHtcblx0XHRyZXR1cm4gbGFiZWwgKyBcIjogXCIgKyBlaW5oZWl0O1xuXHR9IGVsc2UgaWYgKGVpbmhlaXQpIHtcblx0XHRyZXR1cm4gZWluaGVpdDtcblx0fSBlbHNlIHtcblx0XHQvLyBhaGEsIGVpbiBuZXVlcyBPYmpla3QsIG5vY2ggb2huZSBMYWJlbCB1bmQgRWluaGVpdFxuXHRcdHJldHVybiBcInVuYmVuYW5udGUgRWluaGVpdFwiO1xuXHR9XG59O1xuXG4vLyBsw7ZzY2h0IERhdGVuc8OkdHplIGluIE1hc3NlblxuLy8gbmltbXQgZWluZW4gQXJyYXkgdm9uIE9iamVrdGVuIGVudGdlZ2VuXG4vLyBiYXV0IGRhcmF1cyBlaW5lbiBuZXVlbiBhcnJheSBhdWYsIGluIGRlbSBkaWUgT2JqZWt0ZSBudXIgbm9jaCBkaWUgYmVuw7Z0aWd0ZW4gSW5mb3JtYXRpb25lbiBoYWJlblxuLy8gYWt0dWFsaXNpZXJ0IGRpZSBPYmpla3RlIG1pdCBlaW5lciBlaW56aWdlbiBPcGVyYXRpb25cbndpbmRvdy5hZGIubMO2c2NoZU1hc3Nlbk1pdE9iamVrdEFycmF5ID0gZnVuY3Rpb24ob2JqZWN0X2FycmF5KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIG9iamVrdGVfbWl0X29iamVrdGUsXG5cdFx0b2JqZWt0ZSA9IFtdLFxuXHRcdG5ld19vYmpla3Q7XG4gICAgXy5lYWNoKG9iamVjdF9hcnJheSwgZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIG5ld19vYmpla3QgPSB7fTtcbiAgICAgICAgbmV3X29iamVrdC5faWQgPSBvYmplY3QuX2lkO1xuICAgICAgICBuZXdfb2JqZWt0Ll9yZXYgPSBvYmplY3QuX3JldjtcbiAgICAgICAgbmV3X29iamVrdC5fZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIG9iamVrdGUucHVzaChuZXdfb2JqZWt0KTtcbiAgICB9KTtcblx0b2JqZWt0ZV9taXRfb2JqZWt0ZSA9IHt9O1xuXHRvYmpla3RlX21pdF9vYmpla3RlLmRvY3MgPSBvYmpla3RlO1xuXHQkLmFqYXgoe1xuXHRcdHR5cGU6IFwiUE9TVFwiLFxuXHRcdHVybDogXCIuLi8uLi9fYnVsa19kb2NzXCIsXG5cdFx0Y29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLCBcblx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShvYmpla3RlX21pdF9vYmpla3RlKVxuXHR9KTtcbn07XG5cbi8vIGVyaMOkbHQgZWluZW4gZmlsdGVyd2VydFxuLy8gZGllc2VyIGthbm4genV2b3JkZXJzdCBlaW5lbiBWZXJnbGVpY2hzb3BlcmF0b3IgZW50aGFsdGVuIG9kZXIgYXVjaCBuaWNodFxuLy8gcmV0b3VybmllcnQgZWluZW4gQXJyYXkgbWl0IDAgVmVyZ2xlaWNoc29wZXJhdG9yIHVuZCAxIGZpbHRlcndlcnRcbndpbmRvdy5hZGIuZXJtaXR0bGVWZXJnbGVpY2hzb3BlcmF0b3IgPSBmdW5jdGlvbihmaWx0ZXJ3ZXJ0KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIHZlcmdsZWljaHNvcGVyYXRvcjtcblx0aWYgKGZpbHRlcndlcnQuaW5kZXhPZihcIj49XCIpID09PSAwKSB7XG5cdFx0dmVyZ2xlaWNoc29wZXJhdG9yID0gXCI+PVwiO1xuXHRcdGlmIChmaWx0ZXJ3ZXJ0LmluZGV4T2YoXCIgXCIpID09PSAyKSB7XG5cdFx0XHRmaWx0ZXJ3ZXJ0ID0gZmlsdGVyd2VydC5zbGljZSgzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsdGVyd2VydCA9IGZpbHRlcndlcnQuc2xpY2UoMik7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGZpbHRlcndlcnQuaW5kZXhPZihcIjw9XCIpID09PSAwKSB7XG5cdFx0dmVyZ2xlaWNoc29wZXJhdG9yID0gXCI8PVwiO1xuXHRcdGlmIChmaWx0ZXJ3ZXJ0LmluZGV4T2YoXCIgXCIpID09PSAyKSB7XG5cdFx0XHRmaWx0ZXJ3ZXJ0ID0gZmlsdGVyd2VydC5zbGljZSgzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsdGVyd2VydCA9IGZpbHRlcndlcnQuc2xpY2UoMik7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGZpbHRlcndlcnQuaW5kZXhPZihcIj5cIikgPT09IDApIHtcblx0XHR2ZXJnbGVpY2hzb3BlcmF0b3IgPSBcIj5cIjtcblx0XHRpZiAoZmlsdGVyd2VydC5pbmRleE9mKFwiIFwiKSA9PT0gMSkge1xuXHRcdFx0ZmlsdGVyd2VydCA9IGZpbHRlcndlcnQuc2xpY2UoMik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZpbHRlcndlcnQgPSBmaWx0ZXJ3ZXJ0LnNsaWNlKDEpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChmaWx0ZXJ3ZXJ0LmluZGV4T2YoXCI8XCIpID09PSAwKSB7XG5cdFx0dmVyZ2xlaWNoc29wZXJhdG9yID0gXCI8XCI7XG5cdFx0aWYgKGZpbHRlcndlcnQuaW5kZXhPZihcIiBcIikgPT09IDEpIHtcblx0XHRcdGZpbHRlcndlcnQgPSBmaWx0ZXJ3ZXJ0LnNsaWNlKDIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmaWx0ZXJ3ZXJ0ID0gZmlsdGVyd2VydC5zbGljZSgxKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoZmlsdGVyd2VydC5pbmRleE9mKFwiPVwiKSA9PT0gMCkge1xuXHRcdC8vIGFiZmFuZ2VuLCBmYWxscyBqZW1hbmQgXCI9XCIgZWluZ2lidFxuXHRcdHZlcmdsZWljaHNvcGVyYXRvciA9IFwiPVwiO1xuXHRcdGlmIChmaWx0ZXJ3ZXJ0LmluZGV4T2YoXCIgXCIpID09PSAxKSB7XG5cdFx0XHRmaWx0ZXJ3ZXJ0ID0gZmlsdGVyd2VydC5zbGljZSgyKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsdGVyd2VydCA9IGZpbHRlcndlcnQuc2xpY2UoMSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHZlcmdsZWljaHNvcGVyYXRvciA9IFwia2VpblwiO1xuXHR9XG5cdHJldHVybiBbdmVyZ2xlaWNoc29wZXJhdG9yLCBmaWx0ZXJ3ZXJ0XTtcbn07XG5cbndpbmRvdy5hZGIuZXJzZXR6ZVVuZ8O8bHRpZ2VaZWljaGVuSW5JZE5hbWVuID0gZnVuY3Rpb24oaWRuYW1lKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0cmV0dXJuIGlkbmFtZS5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKS5yZXBsYWNlKC8gL2csJycpLnJlcGxhY2UoLywvZywnJykucmVwbGFjZSgvXFwuL2csJycpLnJlcGxhY2UoLzovZywnJykucmVwbGFjZSgvLS9nLCcnKS5yZXBsYWNlKC9cXC8vZywnJykucmVwbGFjZSgvXFwoL2csJycpLnJlcGxhY2UoL1xcKS9nLCcnKS5yZXBsYWNlKC9cXCYvZywnJyk7XG59O1xuXG4vLyBrb250cm9sbGllcnQgZGVuIHZlcndlbmRldGVuIEJyb3dzZXJcbi8vIFF1ZWxsZTogLy9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTM0NzgzMDMvY29ycmVjdC13YXktdG8tdXNlLW1vZGVybml6ci10by1kZXRlY3QtaWVcbndpbmRvdy5hZGIuYnJvd3NlckRldGVjdCA9IHtcblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5icm93c2VyID0gdGhpcy5zZWFyY2hTdHJpbmcodGhpcy5kYXRhQnJvd3NlcikgfHwgXCJPdGhlclwiO1xuXHRcdHRoaXMudmVyc2lvbiA9IHRoaXMuc2VhcmNoVmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50KSB8fFx0ICAgdGhpcy5zZWFyY2hWZXJzaW9uKG5hdmlnYXRvci5hcHBWZXJzaW9uKSB8fCBcIlVua25vd25cIjtcblx0fSxcblxuXHRzZWFyY2hTdHJpbmc6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRmb3IgKHZhciBpPTAgOyBpIDwgZGF0YS5sZW5ndGggOyBpKyspICAgXG5cdFx0e1xuXHRcdFx0dmFyIGRhdGFTdHJpbmcgPSBkYXRhW2ldLnN0cmluZztcblx0XHRcdHRoaXMudmVyc2lvblNlYXJjaFN0cmluZyA9IGRhdGFbaV0uc3ViU3RyaW5nO1xuXG5cdFx0XHRpZiAoZGF0YVN0cmluZy5pbmRleE9mKGRhdGFbaV0uc3ViU3RyaW5nKSAhPSAtMSlcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGRhdGFbaV0uaWRlbnRpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHNlYXJjaFZlcnNpb246IGZ1bmN0aW9uKGRhdGFTdHJpbmcpIHtcblx0XHR2YXIgaW5kZXggPSBkYXRhU3RyaW5nLmluZGV4T2YodGhpcy52ZXJzaW9uU2VhcmNoU3RyaW5nKTtcblx0XHRpZiAoaW5kZXggPT0gLTEpIHJldHVybjtcblx0XHRyZXR1cm4gcGFyc2VGbG9hdChkYXRhU3RyaW5nLnN1YnN0cmluZyhpbmRleCt0aGlzLnZlcnNpb25TZWFyY2hTdHJpbmcubGVuZ3RoKzEpKTtcblx0fSxcblxuXHRkYXRhQnJvd3NlcjogW1xuXHRcdHsgc3RyaW5nOiBuYXZpZ2F0b3IudXNlckFnZW50LCBzdWJTdHJpbmc6IFwiQ2hyb21lXCIsICBpZGVudGl0eTogXCJDaHJvbWVcIiB9LFxuXHRcdHsgc3RyaW5nOiBuYXZpZ2F0b3IudXNlckFnZW50LCBzdWJTdHJpbmc6IFwiTVNJRVwiLFx0IGlkZW50aXR5OiBcIkV4cGxvcmVyXCIgfSxcblx0XHR7IHN0cmluZzogbmF2aWdhdG9yLnVzZXJBZ2VudCwgc3ViU3RyaW5nOiBcIkZpcmVmb3hcIiwgaWRlbnRpdHk6IFwiRmlyZWZveFwiIH0sXG5cdFx0eyBzdHJpbmc6IG5hdmlnYXRvci51c2VyQWdlbnQsIHN1YlN0cmluZzogXCJTYWZhcmlcIiwgIGlkZW50aXR5OiBcIlNhZmFyaVwiIH0sXG5cdFx0eyBzdHJpbmc6IG5hdmlnYXRvci51c2VyQWdlbnQsIHN1YlN0cmluZzogXCJPcGVyYVwiLCAgIGlkZW50aXR5OiBcIk9wZXJhXCIgfVxuICAgIF1cblxufTtcblxuLypcbiogQm9vdHN0cmFwIGZpbGUgdXBsb2FkZXJcbiogUXVlbGxlOiAvL2phc255LmdpdGh1Yi5pby9ib290c3RyYXAvamF2YXNjcmlwdC5odG1sI2ZpbGV1cGxvYWRcbiovXG4vKipcbiogQm9vdHN0cmFwLmpzIGJ5IEBtZG8gYW5kIEBmYXQsIGV4dGVuZGVkIGJ5IEBBcm5vbGREYW5pZWxzLlxuKiBwbHVnaW5zOiBib290c3RyYXAtZmlsZXVwbG9hZC5qc1xuKiBDb3B5cmlnaHQgMjAxMiBUd2l0dGVyLCBJbmMuXG4qIC8vYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMC50eHRcbiovXG4hZnVuY3Rpb24oZSl7dmFyIHQ9ZnVuY3Rpb24odCxuKXt0aGlzLiRlbGVtZW50PWUodCksdGhpcy50eXBlPXRoaXMuJGVsZW1lbnQuZGF0YShcInVwbG9hZHR5cGVcIil8fCh0aGlzLiRlbGVtZW50LmZpbmQoXCIudGh1bWJuYWlsXCIpLmxlbmd0aD4wP1wiaW1hZ2VcIjpcImZpbGVcIiksdGhpcy4kaW5wdXQ9dGhpcy4kZWxlbWVudC5maW5kKFwiOmZpbGVcIik7aWYodGhpcy4kaW5wdXQubGVuZ3RoPT09MClyZXR1cm47dGhpcy5uYW1lPXRoaXMuJGlucHV0LmF0dHIoXCJuYW1lXCIpfHxuLm5hbWUsdGhpcy4kaGlkZGVuPXRoaXMuJGVsZW1lbnQuZmluZCgnaW5wdXRbdHlwZT1oaWRkZW5dW25hbWU9XCInK3RoaXMubmFtZSsnXCJdJyksdGhpcy4kaGlkZGVuLmxlbmd0aD09PTAmJih0aGlzLiRoaWRkZW49ZSgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiAvPicpLHRoaXMuJGVsZW1lbnQucHJlcGVuZCh0aGlzLiRoaWRkZW4pKSx0aGlzLiRwcmV2aWV3PXRoaXMuJGVsZW1lbnQuZmluZChcIi5maWxldXBsb2FkLXByZXZpZXdcIik7dmFyIHI9dGhpcy4kcHJldmlldy5jc3MoXCJoZWlnaHRcIik7dGhpcy4kcHJldmlldy5jc3MoXCJkaXNwbGF5XCIpIT1cImlubGluZVwiJiZyIT1cIjBweFwiJiZyIT1cIm5vbmVcIiYmdGhpcy4kcHJldmlldy5jc3MoXCJsaW5lLWhlaWdodFwiLHIpLHRoaXMub3JpZ2luYWw9e2V4aXN0czp0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwiZmlsZXVwbG9hZC1leGlzdHNcIikscHJldmlldzp0aGlzLiRwcmV2aWV3Lmh0bWwoKSxoaWRkZW5WYWw6dGhpcy4kaGlkZGVuLnZhbCgpfSx0aGlzLiRyZW1vdmU9dGhpcy4kZWxlbWVudC5maW5kKCdbZGF0YS1kaXNtaXNzPVwiZmlsZXVwbG9hZFwiXScpLHRoaXMuJGVsZW1lbnQuZmluZCgnW2RhdGEtdHJpZ2dlcj1cImZpbGV1cGxvYWRcIl0nKS5vbihcImNsaWNrLmZpbGV1cGxvYWRcIixlLnByb3h5KHRoaXMudHJpZ2dlcix0aGlzKSksdGhpcy5saXN0ZW4oKX07dC5wcm90b3R5cGU9e2xpc3RlbjpmdW5jdGlvbigpe3RoaXMuJGlucHV0Lm9uKFwiY2hhbmdlLmZpbGV1cGxvYWRcIixlLnByb3h5KHRoaXMuY2hhbmdlLHRoaXMpKSxlKHRoaXMuJGlucHV0WzBdLmZvcm0pLm9uKFwicmVzZXQuZmlsZXVwbG9hZFwiLGUucHJveHkodGhpcy5yZXNldCx0aGlzKSksdGhpcy4kcmVtb3ZlJiZ0aGlzLiRyZW1vdmUub24oXCJjbGljay5maWxldXBsb2FkXCIsZS5wcm94eSh0aGlzLmNsZWFyLHRoaXMpKX0sY2hhbmdlOmZ1bmN0aW9uKGUsdCl7aWYodD09PVwiY2xlYXJcIilyZXR1cm47dmFyIG49ZS50YXJnZXQuZmlsZXMhPT11bmRlZmluZWQ/ZS50YXJnZXQuZmlsZXNbMF06ZS50YXJnZXQudmFsdWU/e25hbWU6ZS50YXJnZXQudmFsdWUucmVwbGFjZSgvXi4rXFxcXC8sXCJcIil9Om51bGw7aWYoIW4pe3RoaXMuY2xlYXIoKTtyZXR1cm59dGhpcy4kaGlkZGVuLnZhbChcIlwiKSx0aGlzLiRoaWRkZW4uYXR0cihcIm5hbWVcIixcIlwiKSx0aGlzLiRpbnB1dC5hdHRyKFwibmFtZVwiLHRoaXMubmFtZSk7aWYodGhpcy50eXBlPT09XCJpbWFnZVwiJiZ0aGlzLiRwcmV2aWV3Lmxlbmd0aD4wJiYodHlwZW9mIG4udHlwZSE9XCJ1bmRlZmluZWRcIj9uLnR5cGUubWF0Y2goXCJpbWFnZS4qXCIpOm4ubmFtZS5tYXRjaCgvXFwuKGdpZnxwbmd8anBlP2cpJC9pKSkmJnR5cGVvZiBGaWxlUmVhZGVyIT1cInVuZGVmaW5lZFwiKXt2YXIgcj1uZXcgRmlsZVJlYWRlcixpPXRoaXMuJHByZXZpZXcscz10aGlzLiRlbGVtZW50O3Iub25sb2FkPWZ1bmN0aW9uKGUpe2kuaHRtbCgnPGltZyBzcmM9XCInK2UudGFyZ2V0LnJlc3VsdCsnXCIgJysoaS5jc3MoXCJtYXgtaGVpZ2h0XCIpIT1cIm5vbmVcIj8nc3R5bGU9XCJtYXgtaGVpZ2h0OiAnK2kuY3NzKFwibWF4LWhlaWdodFwiKSsnO1wiJzpcIlwiKStcIiAvPlwiKSxzLmFkZENsYXNzKFwiZmlsZXVwbG9hZC1leGlzdHNcIikucmVtb3ZlQ2xhc3MoXCJmaWxldXBsb2FkLW5ld1wiKX0sci5yZWFkQXNEYXRhVVJMKG4pfWVsc2UgdGhpcy4kcHJldmlldy50ZXh0KG4ubmFtZSksdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhcImZpbGV1cGxvYWQtZXhpc3RzXCIpLnJlbW92ZUNsYXNzKFwiZmlsZXVwbG9hZC1uZXdcIil9LGNsZWFyOmZ1bmN0aW9uKGUpe3RoaXMuJGhpZGRlbi52YWwoXCJcIiksdGhpcy4kaGlkZGVuLmF0dHIoXCJuYW1lXCIsdGhpcy5uYW1lKSx0aGlzLiRpbnB1dC5hdHRyKFwibmFtZVwiLFwiXCIpO2lmKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL21zaWUvaSkpe3ZhciB0PXRoaXMuJGlucHV0LmNsb25lKCEwKTt0aGlzLiRpbnB1dC5hZnRlcih0KSx0aGlzLiRpbnB1dC5yZW1vdmUoKSx0aGlzLiRpbnB1dD10fWVsc2UgdGhpcy4kaW5wdXQudmFsKFwiXCIpO3RoaXMuJHByZXZpZXcuaHRtbChcIlwiKSx0aGlzLiRlbGVtZW50LmFkZENsYXNzKFwiZmlsZXVwbG9hZC1uZXdcIikucmVtb3ZlQ2xhc3MoXCJmaWxldXBsb2FkLWV4aXN0c1wiKSxlJiYodGhpcy4kaW5wdXQudHJpZ2dlcihcImNoYW5nZVwiLFtcImNsZWFyXCJdKSxlLnByZXZlbnREZWZhdWx0ID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZS5yZXR1cm5WYWx1ZSA9IGZhbHNlKX0scmVzZXQ6ZnVuY3Rpb24oZSl7dGhpcy5jbGVhcigpLHRoaXMuJGhpZGRlbi52YWwodGhpcy5vcmlnaW5hbC5oaWRkZW5WYWwpLHRoaXMuJHByZXZpZXcuaHRtbCh0aGlzLm9yaWdpbmFsLnByZXZpZXcpLHRoaXMub3JpZ2luYWwuZXhpc3RzP3RoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoXCJmaWxldXBsb2FkLWV4aXN0c1wiKS5yZW1vdmVDbGFzcyhcImZpbGV1cGxvYWQtbmV3XCIpOnRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoXCJmaWxldXBsb2FkLW5ld1wiKS5yZW1vdmVDbGFzcyhcImZpbGV1cGxvYWQtZXhpc3RzXCIpfSx0cmlnZ2VyOmZ1bmN0aW9uKGUpe3RoaXMuJGlucHV0LnRyaWdnZXIoXCJjbGlja1wiKSxlLnByZXZlbnREZWZhdWx0ID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZS5yZXR1cm5WYWx1ZSA9IGZhbHNlfX0sZS5mbi5maWxldXBsb2FkPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgcj1lKHRoaXMpLGk9ci5kYXRhKFwiZmlsZXVwbG9hZFwiKTtpfHxyLmRhdGEoXCJmaWxldXBsb2FkXCIsaT1uZXcgdCh0aGlzLG4pKSx0eXBlb2Ygbj09XCJzdHJpbmdcIiYmaVtuXSgpfSl9LGUuZm4uZmlsZXVwbG9hZC5Db25zdHJ1Y3Rvcj10LGUoZG9jdW1lbnQpLm9uKFwiY2xpY2suZmlsZXVwbG9hZC5kYXRhLWFwaVwiLCdbZGF0YS1wcm92aWRlcz1cImZpbGV1cGxvYWRcIl0nLGZ1bmN0aW9uKHQpe3ZhciBuPWUodGhpcyk7aWYobi5kYXRhKFwiZmlsZXVwbG9hZFwiKSlyZXR1cm47bi5maWxldXBsb2FkKG4uZGF0YSgpKTt2YXIgcj1lKHQudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1kaXNtaXNzPVwiZmlsZXVwbG9hZFwiXSxbZGF0YS10cmlnZ2VyPVwiZmlsZXVwbG9hZFwiXScpO3IubGVuZ3RoPjAmJihyLnRyaWdnZXIoXCJjbGljay5maWxldXBsb2FkXCIpLHQucHJldmVudERlZmF1bHQoKSl9KX0od2luZG93LmpRdWVyeSk7IiwiLyohXHJcbiAqIEF1dG9saW5rZXIuanNcclxuICogMC4xMi4yXHJcbiAqXHJcbiAqIENvcHlyaWdodChjKSAyMDE0IEdyZWdvcnkgSmFjb2JzIDxncmVnQGdyZWctamFjb2JzLmNvbT5cclxuICogTUlUIExpY2Vuc2VkLiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG4gKlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ3JlZ2phY29icy9BdXRvbGlua2VyLmpzXHJcbiAqL1xyXG4vKmdsb2JhbCBkZWZpbmUsIG1vZHVsZSAqL1xyXG4oIGZ1bmN0aW9uKCByb290LCBmYWN0b3J5ICkge1xyXG5cclxuXHRpZiggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xyXG5cdFx0ZGVmaW5lKCBmYWN0b3J5ICk7ICAgICAgICAgICAgIC8vIERlZmluZSBhcyBBTUQgbW9kdWxlIGlmIGFuIEFNRCBsb2FkZXIgaXMgcHJlc2VudCAoZXg6IFJlcXVpcmVKUykuXHJcblx0fSBlbHNlIGlmKCB0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgKSB7XHJcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTsgICAgLy8gRGVmaW5lIGFzIENvbW1vbkpTIG1vZHVsZSBmb3IgTm9kZS5qcywgaWYgYXZhaWxhYmxlLlxyXG5cdH0gZWxzZSB7XHJcblx0XHRyb290LkF1dG9saW5rZXIgPSBmYWN0b3J5KCk7ICAgLy8gRmluYWxseSwgZGVmaW5lIGFzIGEgYnJvd3NlciBnbG9iYWwgaWYgbm8gbW9kdWxlIGxvYWRlci5cclxuXHR9XHJcbn0oIHRoaXMsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvKipcclxuXHQgKiBAY2xhc3MgQXV0b2xpbmtlclxyXG5cdCAqIEBleHRlbmRzIE9iamVjdFxyXG5cdCAqIFxyXG5cdCAqIFV0aWxpdHkgY2xhc3MgdXNlZCB0byBwcm9jZXNzIGEgZ2l2ZW4gc3RyaW5nIG9mIHRleHQsIGFuZCB3cmFwIHRoZSBVUkxzLCBlbWFpbCBhZGRyZXNzZXMsIGFuZCBUd2l0dGVyIGhhbmRsZXMgaW4gXHJcblx0ICogdGhlIGFwcHJvcHJpYXRlIGFuY2hvciAoJmx0O2EmZ3Q7KSB0YWdzIHRvIHR1cm4gdGhlbSBpbnRvIGxpbmtzLlxyXG5cdCAqIFxyXG5cdCAqIEFueSBvZiB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zIG1heSBiZSBwcm92aWRlZCBpbiBhbiBPYmplY3QgKG1hcCkgcHJvdmlkZWQgdG8gdGhlIEF1dG9saW5rZXIgY29uc3RydWN0b3IsIHdoaWNoXHJcblx0ICogd2lsbCBjb25maWd1cmUgaG93IHRoZSB7QGxpbmsgI2xpbmsgbGluaygpfSBtZXRob2Qgd2lsbCBwcm9jZXNzIHRoZSBsaW5rcy5cclxuXHQgKiBcclxuXHQgKiBGb3IgZXhhbXBsZTpcclxuXHQgKiBcclxuXHQgKiAgICAgdmFyIGF1dG9saW5rZXIgPSBuZXcgQXV0b2xpbmtlcigge1xyXG5cdCAqICAgICAgICAgbmV3V2luZG93IDogZmFsc2UsXHJcblx0ICogICAgICAgICB0cnVuY2F0ZSAgOiAzMFxyXG5cdCAqICAgICB9ICk7XHJcblx0ICogICAgIFxyXG5cdCAqICAgICB2YXIgaHRtbCA9IGF1dG9saW5rZXIubGluayggXCJKb2Ugd2VudCB0byB3d3cueWFob28uY29tXCIgKTtcclxuXHQgKiAgICAgLy8gcHJvZHVjZXM6ICdKb2Ugd2VudCB0byA8YSBocmVmPVwiaHR0cDovL3d3dy55YWhvby5jb21cIj55YWhvby5jb208L2E+J1xyXG5cdCAqIFxyXG5cdCAqIFxyXG5cdCAqIFRoZSB7QGxpbmsgI3N0YXRpYy1saW5rIHN0YXRpYyBsaW5rKCl9IG1ldGhvZCBtYXkgYWxzbyBiZSB1c2VkIHRvIGlubGluZSBvcHRpb25zIGludG8gYSBzaW5nbGUgY2FsbCwgd2hpY2ggbWF5XHJcblx0ICogYmUgbW9yZSBjb252ZW5pZW50IGZvciBvbmUtb2ZmIHVzZXMuIEZvciBleGFtcGxlOlxyXG5cdCAqIFxyXG5cdCAqICAgICB2YXIgaHRtbCA9IEF1dG9saW5rZXIubGluayggXCJKb2Ugd2VudCB0byB3d3cueWFob28uY29tXCIsIHtcclxuXHQgKiAgICAgICAgIG5ld1dpbmRvdyA6IGZhbHNlLFxyXG5cdCAqICAgICAgICAgdHJ1bmNhdGUgIDogMzBcclxuXHQgKiAgICAgfSApO1xyXG5cdCAqICAgICAvLyBwcm9kdWNlczogJ0pvZSB3ZW50IHRvIDxhIGhyZWY9XCJodHRwOi8vd3d3LnlhaG9vLmNvbVwiPnlhaG9vLmNvbTwvYT4nXHJcblx0ICogXHJcblx0ICogXHJcblx0ICogIyMgQ3VzdG9tIFJlcGxhY2VtZW50cyBvZiBMaW5rc1xyXG5cdCAqIFxyXG5cdCAqIElmIHRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgZG8gbm90IHByb3ZpZGUgZW5vdWdoIGZsZXhpYmlsaXR5LCBhIHtAbGluayAjcmVwbGFjZUZufSBtYXkgYmUgcHJvdmlkZWQgdG8gZnVsbHkgY3VzdG9taXplXHJcblx0ICogdGhlIG91dHB1dCBvZiBBdXRvbGlua2VyLiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbmNlIGZvciBlYWNoIFVSTC9FbWFpbC9Ud2l0dGVyIGhhbmRsZSBtYXRjaCB0aGF0IGlzIGVuY291bnRlcmVkLlxyXG5cdCAqIFxyXG5cdCAqIEZvciBleGFtcGxlOlxyXG5cdCAqIFxyXG5cdCAqICAgICB2YXIgaW5wdXQgPSBcIi4uLlwiOyAgLy8gc3RyaW5nIHdpdGggVVJMcywgRW1haWwgQWRkcmVzc2VzLCBhbmQgVHdpdHRlciBIYW5kbGVzXHJcblx0ICogICAgIFxyXG5cdCAqICAgICB2YXIgbGlua2VkVGV4dCA9IEF1dG9saW5rZXIubGluayggaW5wdXQsIHtcclxuXHQgKiAgICAgICAgIHJlcGxhY2VGbiA6IGZ1bmN0aW9uKCBhdXRvbGlua2VyLCBtYXRjaCApIHtcclxuXHQgKiAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJocmVmID0gXCIsIG1hdGNoLmdldEFuY2hvckhyZWYoKSApO1xyXG5cdCAqICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcInRleHQgPSBcIiwgbWF0Y2guZ2V0QW5jaG9yVGV4dCgpICk7XHJcblx0ICogICAgICAgICBcclxuXHQgKiAgICAgICAgICAgICBzd2l0Y2goIG1hdGNoLmdldFR5cGUoKSApIHtcclxuXHQgKiAgICAgICAgICAgICAgICAgY2FzZSAndXJsJyA6IFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwidXJsOiBcIiwgbWF0Y2guZ2V0VXJsKCkgKTtcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgaWYoIG1hdGNoLmdldFVybCgpLmluZGV4T2YoICdteXNpdGUuY29tJyApID09PSAtMSApIHtcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFnID0gYXV0b2xpbmtlci5nZXRUYWdCdWlsZGVyKCkuYnVpbGQoIG1hdGNoICk7ICAvLyByZXR1cm5zIGFuIGBBdXRvbGlua2VyLkh0bWxUYWdgIGluc3RhbmNlLCB3aGljaCBwcm92aWRlcyBtdXRhdG9yIG1ldGhvZHMgZm9yIGVhc3kgY2hhbmdlc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5zZXRBdHRyKCAncmVsJywgJ25vZm9sbG93JyApO1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5hZGRDbGFzcyggJ2V4dGVybmFsLWxpbmsnICk7XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhZztcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLyBsZXQgQXV0b2xpbmtlciBwZXJmb3JtIGl0cyBub3JtYWwgYW5jaG9yIHRhZyByZXBsYWNlbWVudFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgXHJcblx0ICogICAgICAgICAgICAgICAgIGNhc2UgJ2VtYWlsJyA6XHJcblx0ICogICAgICAgICAgICAgICAgICAgICB2YXIgZW1haWwgPSBtYXRjaC5nZXRFbWFpbCgpO1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiZW1haWw6IFwiLCBlbWFpbCApO1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgXHJcblx0ICogICAgICAgICAgICAgICAgICAgICBpZiggZW1haWwgPT09IFwibXlAb3duLmFkZHJlc3NcIiApIHtcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAvLyBkb24ndCBhdXRvLWxpbmsgdGhpcyBwYXJ0aWN1bGFyIGVtYWlsIGFkZHJlc3M7IGxlYXZlIGFzLWlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgIC8vIG5vIHJldHVybiB2YWx1ZSB3aWxsIGhhdmUgQXV0b2xpbmtlciBwZXJmb3JtIGl0cyBub3JtYWwgYW5jaG9yIHRhZyByZXBsYWNlbWVudCAoc2FtZSBhcyByZXR1cm5pbmcgYHRydWVgKVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdCAqICAgICAgICAgICAgICAgICBcclxuXHQgKiAgICAgICAgICAgICAgICAgY2FzZSAndHdpdHRlcicgOlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgdmFyIHR3aXR0ZXJIYW5kbGUgPSBtYXRjaC5nZXRUd2l0dGVySGFuZGxlKCk7XHJcblx0ICogICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggdHdpdHRlckhhbmRsZSApO1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgXHJcblx0ICogICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxhIGhyZWY9XCJodHRwOi8vbmV3cGxhY2UudG8ubGluay50d2l0dGVyLmhhbmRsZXMudG8vXCI+JyArIHR3aXR0ZXJIYW5kbGUgKyAnPC9hPic7XHJcblx0ICogICAgICAgICAgICAgfVxyXG5cdCAqICAgICAgICAgfVxyXG5cdCAqICAgICB9ICk7XHJcblx0ICogXHJcblx0ICogXHJcblx0ICogVGhlIGZ1bmN0aW9uIG1heSByZXR1cm4gdGhlIGZvbGxvd2luZyB2YWx1ZXM6XHJcblx0ICogXHJcblx0ICogLSBgdHJ1ZWAgKEJvb2xlYW4pOiBBbGxvdyBBdXRvbGlua2VyIHRvIHJlcGxhY2UgdGhlIG1hdGNoIGFzIGl0IG5vcm1hbGx5IHdvdWxkLlxyXG5cdCAqIC0gYGZhbHNlYCAoQm9vbGVhbik6IERvIG5vdCByZXBsYWNlIHRoZSBjdXJyZW50IG1hdGNoIGF0IGFsbCAtIGxlYXZlIGFzLWlzLlxyXG5cdCAqIC0gQW55IFN0cmluZzogSWYgYSBzdHJpbmcgaXMgcmV0dXJuZWQgZnJvbSB0aGUgZnVuY3Rpb24sIHRoZSBzdHJpbmcgd2lsbCBiZSB1c2VkIGRpcmVjdGx5IGFzIHRoZSByZXBsYWNlbWVudCBIVE1MIGZvclxyXG5cdCAqICAgdGhlIG1hdGNoLlxyXG5cdCAqIC0gQW4ge0BsaW5rIEF1dG9saW5rZXIuSHRtbFRhZ30gaW5zdGFuY2UsIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGJ1aWxkL21vZGlmeSBhbiBIVE1MIHRhZyBiZWZvcmUgd3JpdGluZyBvdXQgaXRzIEhUTUwgdGV4dC5cclxuXHQgKiBcclxuXHQgKiBAY29uc3RydWN0b3JcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIEF1dG9saW5rZXIgaW5zdGFuY2UsIHNwZWNpZmllZCBpbiBhbiBPYmplY3QgKG1hcCkuXHJcblx0ICovXHJcblx0dmFyIEF1dG9saW5rZXIgPSBmdW5jdGlvbiggY2ZnICkge1xyXG5cdFx0QXV0b2xpbmtlci5VdGlsLmFzc2lnbiggdGhpcywgY2ZnICk7ICAvLyBhc3NpZ24gdGhlIHByb3BlcnRpZXMgb2YgYGNmZ2Agb250byB0aGUgQXV0b2xpbmtlciBpbnN0YW5jZS4gUHJvdG90eXBlIHByb3BlcnRpZXMgd2lsbCBiZSB1c2VkIGZvciBtaXNzaW5nIGNvbmZpZ3MuXHJcblx0fTtcclxuXHRcclxuXHRcclxuXHRBdXRvbGlua2VyLnByb3RvdHlwZSA9IHtcclxuXHRcdGNvbnN0cnVjdG9yIDogQXV0b2xpbmtlciwgIC8vIGZpeCBjb25zdHJ1Y3RvciBwcm9wZXJ0eVxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBjZmcge0Jvb2xlYW59IHVybHNcclxuXHRcdCAqIFxyXG5cdFx0ICogYHRydWVgIGlmIG1pc2NlbGxhbmVvdXMgVVJMcyBzaG91bGQgYmUgYXV0b21hdGljYWxseSBsaW5rZWQsIGBmYWxzZWAgaWYgdGhleSBzaG91bGQgbm90IGJlLlxyXG5cdFx0ICovXHJcblx0XHR1cmxzIDogdHJ1ZSxcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtCb29sZWFufSBlbWFpbFxyXG5cdFx0ICogXHJcblx0XHQgKiBgdHJ1ZWAgaWYgZW1haWwgYWRkcmVzc2VzIHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IGxpbmtlZCwgYGZhbHNlYCBpZiB0aGV5IHNob3VsZCBub3QgYmUuXHJcblx0XHQgKi9cclxuXHRcdGVtYWlsIDogdHJ1ZSxcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtCb29sZWFufSB0d2l0dGVyXHJcblx0XHQgKiBcclxuXHRcdCAqIGB0cnVlYCBpZiBUd2l0dGVyIGhhbmRsZXMgKFwiQGV4YW1wbGVcIikgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgbGlua2VkLCBgZmFsc2VgIGlmIHRoZXkgc2hvdWxkIG5vdCBiZS5cclxuXHRcdCAqL1xyXG5cdFx0dHdpdHRlciA6IHRydWUsXHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQGNmZyB7Qm9vbGVhbn0gbmV3V2luZG93XHJcblx0XHQgKiBcclxuXHRcdCAqIGB0cnVlYCBpZiB0aGUgbGlua3Mgc2hvdWxkIG9wZW4gaW4gYSBuZXcgd2luZG93LCBgZmFsc2VgIG90aGVyd2lzZS5cclxuXHRcdCAqL1xyXG5cdFx0bmV3V2luZG93IDogdHJ1ZSxcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtCb29sZWFufSBzdHJpcFByZWZpeFxyXG5cdFx0ICogXHJcblx0XHQgKiBgdHJ1ZWAgaWYgJ2h0dHA6Ly8nIG9yICdodHRwczovLycgYW5kL29yIHRoZSAnd3d3Licgc2hvdWxkIGJlIHN0cmlwcGVkIGZyb20gdGhlIGJlZ2lubmluZyBvZiBVUkwgbGlua3MnIHRleHQsIFxyXG5cdFx0ICogYGZhbHNlYCBvdGhlcndpc2UuXHJcblx0XHQgKi9cclxuXHRcdHN0cmlwUHJlZml4IDogdHJ1ZSxcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtOdW1iZXJ9IHRydW5jYXRlXHJcblx0XHQgKiBcclxuXHRcdCAqIEEgbnVtYmVyIGZvciBob3cgbWFueSBjaGFyYWN0ZXJzIGxvbmcgVVJMcy9lbWFpbHMvdHdpdHRlciBoYW5kbGVzIHNob3VsZCBiZSB0cnVuY2F0ZWQgdG8gaW5zaWRlIHRoZSB0ZXh0IG9mIFxyXG5cdFx0ICogYSBsaW5rLiBJZiB0aGUgVVJML2VtYWlsL3R3aXR0ZXIgaXMgb3ZlciB0aGlzIG51bWJlciBvZiBjaGFyYWN0ZXJzLCBpdCB3aWxsIGJlIHRydW5jYXRlZCB0byB0aGlzIGxlbmd0aCBieSBcclxuXHRcdCAqIGFkZGluZyBhIHR3byBwZXJpb2QgZWxsaXBzaXMgKCcuLicpIHRvIHRoZSBlbmQgb2YgdGhlIHN0cmluZy5cclxuXHRcdCAqIFxyXG5cdFx0ICogRm9yIGV4YW1wbGU6IEEgdXJsIGxpa2UgJ2h0dHA6Ly93d3cueWFob28uY29tL3NvbWUvbG9uZy9wYXRoL3RvL2EvZmlsZScgdHJ1bmNhdGVkIHRvIDI1IGNoYXJhY3RlcnMgbWlnaHQgbG9va1xyXG5cdFx0ICogc29tZXRoaW5nIGxpa2UgdGhpczogJ3lhaG9vLmNvbS9zb21lL2xvbmcvcGF0Li4nXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtTdHJpbmd9IGNsYXNzTmFtZVxyXG5cdFx0ICogXHJcblx0XHQgKiBBIENTUyBjbGFzcyBuYW1lIHRvIGFkZCB0byB0aGUgZ2VuZXJhdGVkIGxpbmtzLiBUaGlzIGNsYXNzIHdpbGwgYmUgYWRkZWQgdG8gYWxsIGxpbmtzLCBhcyB3ZWxsIGFzIHRoaXMgY2xhc3NcclxuXHRcdCAqIHBsdXMgdXJsL2VtYWlsL3R3aXR0ZXIgc3VmZml4ZXMgZm9yIHN0eWxpbmcgdXJsL2VtYWlsL3R3aXR0ZXIgbGlua3MgZGlmZmVyZW50bHkuXHJcblx0XHQgKiBcclxuXHRcdCAqIEZvciBleGFtcGxlLCBpZiB0aGlzIGNvbmZpZyBpcyBwcm92aWRlZCBhcyBcIm15TGlua1wiLCB0aGVuOlxyXG5cdFx0ICogXHJcblx0XHQgKiAtIFVSTCBsaW5rcyB3aWxsIGhhdmUgdGhlIENTUyBjbGFzc2VzOiBcIm15TGluayBteUxpbmstdXJsXCJcclxuXHRcdCAqIC0gRW1haWwgbGlua3Mgd2lsbCBoYXZlIHRoZSBDU1MgY2xhc3NlczogXCJteUxpbmsgbXlMaW5rLWVtYWlsXCIsIGFuZFxyXG5cdFx0ICogLSBUd2l0dGVyIGxpbmtzIHdpbGwgaGF2ZSB0aGUgQ1NTIGNsYXNzZXM6IFwibXlMaW5rIG15TGluay10d2l0dGVyXCJcclxuXHRcdCAqL1xyXG5cdFx0Y2xhc3NOYW1lIDogXCJcIixcclxuXHRcdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBjZmcge0Z1bmN0aW9ufSByZXBsYWNlRm5cclxuXHRcdCAqIFxyXG5cdFx0ICogQSBmdW5jdGlvbiB0byBpbmRpdmlkdWFsbHkgcHJvY2VzcyBlYWNoIFVSTC9FbWFpbC9Ud2l0dGVyIG1hdGNoIGZvdW5kIGluIHRoZSBpbnB1dCBzdHJpbmcuXHJcblx0XHQgKiBcclxuXHRcdCAqIFNlZSB0aGUgY2xhc3MncyBkZXNjcmlwdGlvbiBmb3IgdXNhZ2UuXHJcblx0XHQgKiBcclxuXHRcdCAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOlxyXG5cdFx0ICogXHJcblx0XHQgKiBAY2ZnIHtBdXRvbGlua2VyfSByZXBsYWNlRm4uYXV0b2xpbmtlciBUaGUgQXV0b2xpbmtlciBpbnN0YW5jZSwgd2hpY2ggbWF5IGJlIHVzZWQgdG8gcmV0cmlldmUgY2hpbGQgb2JqZWN0cyBmcm9tIChzdWNoXHJcblx0XHQgKiAgIGFzIHRoZSBpbnN0YW5jZSdzIHtAbGluayAjZ2V0VGFnQnVpbGRlciB0YWcgYnVpbGRlcn0pLlxyXG5cdFx0ICogQGNmZyB7QXV0b2xpbmtlci5tYXRjaC5NYXRjaH0gcmVwbGFjZUZuLm1hdGNoIFRoZSBNYXRjaCBpbnN0YW5jZSB3aGljaCBjYW4gYmUgdXNlZCB0byByZXRyaWV2ZSBpbmZvcm1hdGlvbiBhYm91dCB0aGVcclxuXHRcdCAqICAge0BsaW5rIEF1dG9saW5rZXIubWF0Y2guVXJsIFVSTH0ve0BsaW5rIEF1dG9saW5rZXIubWF0Y2guRW1haWwgZW1haWx9L3tAbGluayBBdXRvbGlua2VyLm1hdGNoLlR3aXR0ZXIgVHdpdHRlcn1cclxuXHRcdCAqICAgbWF0Y2ggdGhhdCB0aGUgYHJlcGxhY2VGbmAgaXMgY3VycmVudGx5IHByb2Nlc3NpbmcuXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKiBAcHJvcGVydHkge1JlZ0V4cH0gaHRtbENoYXJhY3RlckVudGl0aWVzUmVnZXhcclxuXHRcdCAqXHJcblx0XHQgKiBUaGUgcmVndWxhciBleHByZXNzaW9uIHRoYXQgbWF0Y2hlcyBjb21tb24gSFRNTCBjaGFyYWN0ZXIgZW50aXRpZXMuXHJcblx0XHQgKiBcclxuXHRcdCAqIElnbm9yaW5nICZhbXA7IGFzIGl0IGNvdWxkIGJlIHBhcnQgb2YgYSBxdWVyeSBzdHJpbmcgLS0gaGFuZGxpbmcgaXQgc2VwYXJhdGVseS5cclxuXHRcdCAqL1xyXG5cdFx0aHRtbENoYXJhY3RlckVudGl0aWVzUmVnZXg6IC8oJm5ic3A7fCYjMTYwO3wmbHQ7fCYjNjA7fCZndDt8JiM2MjspL2dpLFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKiBAcHJvcGVydHkge1JlZ0V4cH0gbWF0Y2hlclJlZ2V4XHJcblx0XHQgKiBcclxuXHRcdCAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCBtYXRjaGVzIFVSTHMsIGVtYWlsIGFkZHJlc3NlcywgYW5kIFR3aXR0ZXIgaGFuZGxlcy5cclxuXHRcdCAqIFxyXG5cdFx0ICogVGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaGFzIHRoZSBmb2xsb3dpbmcgY2FwdHVyaW5nIGdyb3VwczpcclxuXHRcdCAqIFxyXG5cdFx0ICogMS4gR3JvdXAgdGhhdCBpcyB1c2VkIHRvIGRldGVybWluZSBpZiB0aGVyZSBpcyBhIFR3aXR0ZXIgaGFuZGxlIG1hdGNoIChpLmUuIFxcQHNvbWVUd2l0dGVyVXNlcikuIFNpbXBseSBjaGVjayBmb3IgaXRzIFxyXG5cdFx0ICogICAgZXhpc3RlbmNlIHRvIGRldGVybWluZSBpZiB0aGVyZSBpcyBhIFR3aXR0ZXIgaGFuZGxlIG1hdGNoLiBUaGUgbmV4dCBjb3VwbGUgb2YgY2FwdHVyaW5nIGdyb3VwcyBnaXZlIGluZm9ybWF0aW9uIFxyXG5cdFx0ICogICAgYWJvdXQgdGhlIFR3aXR0ZXIgaGFuZGxlIG1hdGNoLlxyXG5cdFx0ICogMi4gVGhlIHdoaXRlc3BhY2UgY2hhcmFjdGVyIGJlZm9yZSB0aGUgXFxAc2lnbiBpbiBhIFR3aXR0ZXIgaGFuZGxlLiBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIHRoZXJlIGFyZSBubyBsb29rYmVoaW5kcyBpblxyXG5cdFx0ICogICAgSlMgcmVndWxhciBleHByZXNzaW9ucywgYW5kIGNhbiBiZSB1c2VkIHRvIHJlY29uc3RydWN0IHRoZSBvcmlnaW5hbCBzdHJpbmcgaW4gYSByZXBsYWNlKCkuXHJcblx0XHQgKiAzLiBUaGUgVHdpdHRlciBoYW5kbGUgaXRzZWxmIGluIGEgVHdpdHRlciBtYXRjaC4gSWYgdGhlIG1hdGNoIGlzICdAc29tZVR3aXR0ZXJVc2VyJywgdGhlIGhhbmRsZSBpcyAnc29tZVR3aXR0ZXJVc2VyJy5cclxuXHRcdCAqIDQuIEdyb3VwIHRoYXQgbWF0Y2hlcyBhbiBlbWFpbCBhZGRyZXNzLiBVc2VkIHRvIGRldGVybWluZSBpZiB0aGUgbWF0Y2ggaXMgYW4gZW1haWwgYWRkcmVzcywgYXMgd2VsbCBhcyBob2xkaW5nIHRoZSBmdWxsIFxyXG5cdFx0ICogICAgYWRkcmVzcy4gRXg6ICdtZUBteS5jb20nXHJcblx0XHQgKiA1LiBHcm91cCB0aGF0IG1hdGNoZXMgYSBVUkwgaW4gdGhlIGlucHV0IHRleHQuIEV4OiAnaHR0cDovL2dvb2dsZS5jb20nLCAnd3d3Lmdvb2dsZS5jb20nLCBvciBqdXN0ICdnb29nbGUuY29tJy5cclxuXHRcdCAqICAgIFRoaXMgYWxzbyBpbmNsdWRlcyBhIHBhdGgsIHVybCBwYXJhbWV0ZXJzLCBvciBoYXNoIGFuY2hvcnMuIEV4OiBnb29nbGUuY29tL3BhdGgvdG8vZmlsZT9xMT0xJnEyPTIjbXlBbmNob3JcclxuXHRcdCAqIDYuIEEgcHJvdG9jb2wtcmVsYXRpdmUgKCcvLycpIG1hdGNoIGZvciB0aGUgY2FzZSBvZiBhICd3d3cuJyBwcmVmaXhlZCBVUkwuIFdpbGwgYmUgYW4gZW1wdHkgc3RyaW5nIGlmIGl0IGlzIG5vdCBhIFxyXG5cdFx0ICogICAgcHJvdG9jb2wtcmVsYXRpdmUgbWF0Y2guIFdlIG5lZWQgdG8ga25vdyB0aGUgY2hhcmFjdGVyIGJlZm9yZSB0aGUgJy8vJyBpbiBvcmRlciB0byBkZXRlcm1pbmUgaWYgaXQgaXMgYSB2YWxpZCBtYXRjaFxyXG5cdFx0ICogICAgb3IgdGhlIC8vIHdhcyBpbiBhIHN0cmluZyB3ZSBkb24ndCB3YW50IHRvIGF1dG8tbGluay5cclxuXHRcdCAqIDcuIEEgcHJvdG9jb2wtcmVsYXRpdmUgKCcvLycpIG1hdGNoIGZvciB0aGUgY2FzZSBvZiBhIGtub3duIFRMRCBwcmVmaXhlZCBVUkwuIFdpbGwgYmUgYW4gZW1wdHkgc3RyaW5nIGlmIGl0IGlzIG5vdCBhIFxyXG5cdFx0ICogICAgcHJvdG9jb2wtcmVsYXRpdmUgbWF0Y2guIFNlZSAjNiBmb3IgbW9yZSBpbmZvLiBcclxuXHRcdCAqL1xyXG5cdFx0bWF0Y2hlclJlZ2V4IDogKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdHdpdHRlclJlZ2V4ID0gLyhefFteXFx3XSlAKFxcd3sxLDE1fSkvLCAgICAgICAgICAgICAgLy8gRm9yIG1hdGNoaW5nIGEgdHdpdHRlciBoYW5kbGUuIEV4OiBAZ3JlZ29yeV9qYWNvYnNcclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgZW1haWxSZWdleCA9IC8oPzpbXFwtOzomPVxcK1xcJCxcXHdcXC5dK0ApLywgICAgICAgICAgICAgLy8gc29tZXRoaW5nQCBmb3IgZW1haWwgYWRkcmVzc2VzIChhLmsuYS4gbG9jYWwtcGFydClcclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgcHJvdG9jb2xSZWdleCA9IC8oPzpbQS1aYS16XXszLDl9Oig/OlxcL1xcLyk/KS8sICAgICAgLy8gbWF0Y2ggcHJvdG9jb2wsIGFsbG93IGluIGZvcm1hdCBodHRwOi8vIG9yIG1haWx0bzpcclxuXHRcdFx0ICAgIHd3d1JlZ2V4ID0gLyg/Ond3d1xcLikvLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnRpbmcgd2l0aCAnd3d3LidcclxuXHRcdFx0ICAgIGRvbWFpbk5hbWVSZWdleCA9IC9bQS1aYS16MC05XFwuXFwtXSpbQS1aYS16MC05XFwtXS8sICAvLyBhbnl0aGluZyBsb29raW5nIGF0IGFsbCBsaWtlIGEgZG9tYWluLCBub24tdW5pY29kZSBkb21haW5zLCBub3QgZW5kaW5nIGluIGEgcGVyaW9kXHJcblx0XHRcdCAgICB0bGRSZWdleCA9IC9cXC4oPzppbnRlcm5hdGlvbmFsfGNvbnN0cnVjdGlvbnxjb250cmFjdG9yc3xlbnRlcnByaXNlc3xwaG90b2dyYXBoeXxwcm9kdWN0aW9uc3xmb3VuZGF0aW9ufGltbW9iaWxpZW58aW5kdXN0cmllc3xtYW5hZ2VtZW50fHByb3BlcnRpZXN8dGVjaG5vbG9neXxjaHJpc3RtYXN8Y29tbXVuaXR5fGRpcmVjdG9yeXxlZHVjYXRpb258ZXF1aXBtZW50fGluc3RpdHV0ZXxtYXJrZXRpbmd8c29sdXRpb25zfHZhY2F0aW9uc3xiYXJnYWluc3xib3V0aXF1ZXxidWlsZGVyc3xjYXRlcmluZ3xjbGVhbmluZ3xjbG90aGluZ3xjb21wdXRlcnxkZW1vY3JhdHxkaWFtb25kc3xncmFwaGljc3xob2xkaW5nc3xsaWdodGluZ3xwYXJ0bmVyc3xwbHVtYmluZ3xzdXBwbGllc3x0cmFpbmluZ3x2ZW50dXJlc3xhY2FkZW15fGNhcmVlcnN8Y29tcGFueXxjcnVpc2VzfGRvbWFpbnN8ZXhwb3NlZHxmbGlnaHRzfGZsb3Jpc3R8Z2FsbGVyeXxndWl0YXJzfGhvbGlkYXl8a2l0Y2hlbnxuZXVzdGFyfG9raW5hd2F8cmVjaXBlc3xyZW50YWxzfHJldmlld3N8c2hpa3NoYXxzaW5nbGVzfHN1cHBvcnR8c3lzdGVtc3xhZ2VuY3l8YmVybGlufGNhbWVyYXxjZW50ZXJ8Y29mZmVlfGNvbmRvc3xkYXRpbmd8ZXN0YXRlfGV2ZW50c3xleHBlcnR8ZnV0Ym9sfGthdWZlbnxsdXh1cnl8bWFpc29ufG1vbmFzaHxtdXNldW18bmFnb3lhfHBob3Rvc3xyZXBhaXJ8cmVwb3J0fHNvY2lhbHxzdXBwbHl8dGF0dG9vfHRpZW5kYXx0cmF2ZWx8dmlhamVzfHZpbGxhc3x2aXNpb258dm90aW5nfHZveWFnZXxhY3RvcnxidWlsZHxjYXJkc3xjaGVhcHxjb2Rlc3xkYW5jZXxlbWFpbHxnbGFzc3xob3VzZXxtYW5nb3xuaW5qYXxwYXJ0c3xwaG90b3xzaG9lc3xzb2xhcnx0b2RheXx0b2t5b3x0b29sc3x3YXRjaHx3b3Jrc3xhZXJvfGFycGF8YXNpYXxiZXN0fGJpa2V8Ymx1ZXxidXp6fGNhbXB8Y2x1Ynxjb29sfGNvb3B8ZmFybXxmaXNofGdpZnR8Z3VydXxpbmZvfGpvYnN8a2l3aXxrcmVkfGxhbmR8bGltb3xsaW5rfG1lbnV8bW9iaXxtb2RhfG5hbWV8cGljc3xwaW5rfHBvc3R8cXBvbnxyaWNofHJ1aHJ8c2V4eXx0aXBzfHZvdGV8dm90b3x3YW5nfHdpZW58d2lraXx6b25lfGJhcnxiaWR8Yml6fGNhYnxjYXR8Y2VvfGNvbXxlZHV8Z292fGludHxraW18bWlsfG5ldHxvbmx8b3JnfHByb3xwdWJ8cmVkfHRlbHx1bm98d2VkfHh4eHx4eXp8YWN8YWR8YWV8YWZ8YWd8YWl8YWx8YW18YW58YW98YXF8YXJ8YXN8YXR8YXV8YXd8YXh8YXp8YmF8YmJ8YmR8YmV8YmZ8Ymd8Ymh8Yml8Ymp8Ym18Ym58Ym98YnJ8YnN8YnR8YnZ8Ynd8Ynl8Ynp8Y2F8Y2N8Y2R8Y2Z8Y2d8Y2h8Y2l8Y2t8Y2x8Y218Y258Y298Y3J8Y3V8Y3Z8Y3d8Y3h8Y3l8Y3p8ZGV8ZGp8ZGt8ZG18ZG98ZHp8ZWN8ZWV8ZWd8ZXJ8ZXN8ZXR8ZXV8Zml8Zmp8Zmt8Zm18Zm98ZnJ8Z2F8Z2J8Z2R8Z2V8Z2Z8Z2d8Z2h8Z2l8Z2x8Z218Z258Z3B8Z3F8Z3J8Z3N8Z3R8Z3V8Z3d8Z3l8aGt8aG18aG58aHJ8aHR8aHV8aWR8aWV8aWx8aW18aW58aW98aXF8aXJ8aXN8aXR8amV8am18am98anB8a2V8a2d8a2h8a2l8a218a258a3B8a3J8a3d8a3l8a3p8bGF8bGJ8bGN8bGl8bGt8bHJ8bHN8bHR8bHV8bHZ8bHl8bWF8bWN8bWR8bWV8bWd8bWh8bWt8bWx8bW18bW58bW98bXB8bXF8bXJ8bXN8bXR8bXV8bXZ8bXd8bXh8bXl8bXp8bmF8bmN8bmV8bmZ8bmd8bml8bmx8bm98bnB8bnJ8bnV8bnp8b218cGF8cGV8cGZ8cGd8cGh8cGt8cGx8cG18cG58cHJ8cHN8cHR8cHd8cHl8cWF8cmV8cm98cnN8cnV8cnd8c2F8c2J8c2N8c2R8c2V8c2d8c2h8c2l8c2p8c2t8c2x8c218c258c298c3J8c3R8c3V8c3Z8c3h8c3l8c3p8dGN8dGR8dGZ8dGd8dGh8dGp8dGt8dGx8dG18dG58dG98dHB8dHJ8dHR8dHZ8dHd8dHp8dWF8dWd8dWt8dXN8dXl8dXp8dmF8dmN8dmV8dmd8dml8dm58dnV8d2Z8d3N8eWV8eXR8emF8em18encpXFxiLywgICAvLyBtYXRjaCBvdXIga25vd24gdG9wIGxldmVsIGRvbWFpbnMgKFRMRHMpXHJcblx0XHRcdCAgICBcclxuXHRcdFx0ICAgIC8vIEFsbG93IG9wdGlvbmFsIHBhdGgsIHF1ZXJ5IHN0cmluZywgYW5kIGhhc2ggYW5jaG9yLCBub3QgZW5kaW5nIGluIHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVyczogXCIhOiwuO1wiXHJcblx0XHRcdCAgICAvLyBodHRwOi8vYmxvZy5jb2Rpbmdob3Jyb3IuY29tL3RoZS1wcm9ibGVtLXdpdGgtdXJscy9cclxuXHRcdFx0ICAgIHVybFN1ZmZpeFJlZ2V4ID0gLyg/OltcXC1BLVphLXowLTkrJkAjXFwvJT89fl8oKXwhOiwuO10qW1xcLUEtWmEtejAtOSsmQCNcXC8lPX5fKCl8XSk/LzsgIC8vIG5vdGU6IG9wdGlvbmFsIHBhcnQgb2YgdGhlIGZ1bGwgcmVnZXhcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBuZXcgUmVnRXhwKCBbXHJcblx0XHRcdFx0JygnLCAgLy8gKioqIENhcHR1cmluZyBncm91cCAkMSwgd2hpY2ggY2FuIGJlIHVzZWQgdG8gY2hlY2sgZm9yIGEgdHdpdHRlciBoYW5kbGUgbWF0Y2guIFVzZSBncm91cCAkMyBmb3IgdGhlIGFjdHVhbCB0d2l0dGVyIGhhbmRsZSB0aG91Z2guICQyIG1heSBiZSB1c2VkIHRvIHJlY29uc3RydWN0IHRoZSBvcmlnaW5hbCBzdHJpbmcgaW4gYSByZXBsYWNlKCkgXHJcblx0XHRcdFx0XHQvLyAqKiogQ2FwdHVyaW5nIGdyb3VwICQyLCB3aGljaCBtYXRjaGVzIHRoZSB3aGl0ZXNwYWNlIGNoYXJhY3RlciBiZWZvcmUgdGhlICdAJyBzaWduIChuZWVkZWQgYmVjYXVzZSBvZiBubyBsb29rYmVoaW5kcyksIGFuZCBcclxuXHRcdFx0XHRcdC8vICoqKiBDYXB0dXJpbmcgZ3JvdXAgJDMsIHdoaWNoIG1hdGNoZXMgdGhlIGFjdHVhbCB0d2l0dGVyIGhhbmRsZVxyXG5cdFx0XHRcdFx0dHdpdHRlclJlZ2V4LnNvdXJjZSxcclxuXHRcdFx0XHQnKScsXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0J3wnLFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdCcoJywgIC8vICoqKiBDYXB0dXJpbmcgZ3JvdXAgJDQsIHdoaWNoIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIGFuIGVtYWlsIG1hdGNoXHJcblx0XHRcdFx0XHRlbWFpbFJlZ2V4LnNvdXJjZSxcclxuXHRcdFx0XHRcdGRvbWFpbk5hbWVSZWdleC5zb3VyY2UsXHJcblx0XHRcdFx0XHR0bGRSZWdleC5zb3VyY2UsXHJcblx0XHRcdFx0JyknLFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdCd8JyxcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQnKCcsICAvLyAqKiogQ2FwdHVyaW5nIGdyb3VwICQ1LCB3aGljaCBpcyB1c2VkIHRvIG1hdGNoIGEgVVJMXHJcblx0XHRcdFx0XHQnKD86JywgLy8gcGFyZW5zIHRvIGNvdmVyIG1hdGNoIGZvciBwcm90b2NvbCAob3B0aW9uYWwpLCBhbmQgZG9tYWluXHJcblx0XHRcdFx0XHRcdCcoPzonLCAgLy8gbm9uLWNhcHR1cmluZyBwYXJlbiBmb3IgYSBwcm90b2NvbC1wcmVmaXhlZCB1cmwgKGV4OiBodHRwOi8vZ29vZ2xlLmNvbSlcclxuXHRcdFx0XHRcdFx0XHRwcm90b2NvbFJlZ2V4LnNvdXJjZSxcclxuXHRcdFx0XHRcdFx0XHRkb21haW5OYW1lUmVnZXguc291cmNlLFxyXG5cdFx0XHRcdFx0XHQnKScsXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQnfCcsXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQnKD86JywgIC8vIG5vbi1jYXB0dXJpbmcgcGFyZW4gZm9yIGEgJ3d3dy4nIHByZWZpeGVkIHVybCAoZXg6IHd3dy5nb29nbGUuY29tKVxyXG5cdFx0XHRcdFx0XHRcdCcoLj8vLyk/JywgIC8vICoqKiBDYXB0dXJpbmcgZ3JvdXAgJDYgZm9yIGFuIG9wdGlvbmFsIHByb3RvY29sLXJlbGF0aXZlIFVSTC4gTXVzdCBiZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmcgb3Igc3RhcnQgd2l0aCBhIG5vbi13b3JkIGNoYXJhY3RlclxyXG5cdFx0XHRcdFx0XHRcdHd3d1JlZ2V4LnNvdXJjZSxcclxuXHRcdFx0XHRcdFx0XHRkb21haW5OYW1lUmVnZXguc291cmNlLFxyXG5cdFx0XHRcdFx0XHQnKScsXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQnfCcsXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQnKD86JywgIC8vIG5vbi1jYXB0dXJpbmcgcGFyZW4gZm9yIGtub3duIGEgVExEIHVybCAoZXg6IGdvb2dsZS5jb20pXHJcblx0XHRcdFx0XHRcdFx0JyguPy8vKT8nLCAgLy8gKioqIENhcHR1cmluZyBncm91cCAkNyBmb3IgYW4gb3B0aW9uYWwgcHJvdG9jb2wtcmVsYXRpdmUgVVJMLiBNdXN0IGJlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZyBvciBzdGFydCB3aXRoIGEgbm9uLXdvcmQgY2hhcmFjdGVyXHJcblx0XHRcdFx0XHRcdFx0ZG9tYWluTmFtZVJlZ2V4LnNvdXJjZSxcclxuXHRcdFx0XHRcdFx0XHR0bGRSZWdleC5zb3VyY2UsXHJcblx0XHRcdFx0XHRcdCcpJyxcclxuXHRcdFx0XHRcdCcpJyxcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dXJsU3VmZml4UmVnZXguc291cmNlLCAgLy8gbWF0Y2ggZm9yIHBhdGgsIHF1ZXJ5IHN0cmluZywgYW5kL29yIGhhc2ggYW5jaG9yXHJcblx0XHRcdFx0JyknXHJcblx0XHRcdF0uam9pbiggXCJcIiApLCAnZ2knICk7XHJcblx0XHR9ICkoKSxcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHByb3BlcnR5IHtSZWdFeHB9IGludmFsaWRQcm90b2NvbFJlbE1hdGNoUmVnZXhcclxuXHRcdCAqIFxyXG5cdFx0ICogVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIGNoZWNrIGEgcG90ZW50aWFsIHByb3RvY29sLXJlbGF0aXZlIFVSTCBtYXRjaCwgY29taW5nIGZyb20gdGhlIHtAbGluayAjbWF0Y2hlclJlZ2V4fS4gXHJcblx0XHQgKiBBIHByb3RvY29sLXJlbGF0aXZlIFVSTCBpcywgZm9yIGV4YW1wbGUsIFwiLy95YWhvby5jb21cIlxyXG5cdFx0ICogXHJcblx0XHQgKiBUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIHtAbGluayAjbWF0Y2hlclJlZ2V4fSwgYW5kIGNoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSB3b3JkIGNoYXJhY3RlclxyXG5cdFx0ICogYmVmb3JlIHRoZSAnLy8nIGluIG9yZGVyIHRvIGRldGVybWluZSBpZiB3ZSBzaG91bGQgYWN0dWFsbHkgYXV0b2xpbmsgYSBwcm90b2NvbC1yZWxhdGl2ZSBVUkwuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlcmVcclxuXHRcdCAqIGlzIG5vIG5lZ2F0aXZlIGxvb2stYmVoaW5kIGluIEphdmFTY3JpcHQgcmVndWxhciBleHByZXNzaW9ucy4gXHJcblx0XHQgKiBcclxuXHRcdCAqIEZvciBpbnN0YW5jZSwgd2Ugd2FudCB0byBhdXRvbGluayBzb21ldGhpbmcgbGlrZSBcIi8vZ29vZ2xlLmNvbVwiLCBidXQgd2UgZG9uJ3Qgd2FudCB0byBhdXRvbGluayBzb21ldGhpbmcgXHJcblx0XHQgKiBsaWtlIFwiYWJjLy9nb29nbGUuY29tXCJcclxuXHRcdCAqL1xyXG5cdFx0aW52YWxpZFByb3RvY29sUmVsTWF0Y2hSZWdleCA6IC9eW1xcd11cXC9cXC8vLFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKiBAcHJvcGVydHkge1JlZ0V4cH0gY2hhckJlZm9yZVByb3RvY29sUmVsTWF0Y2hSZWdleFxyXG5cdFx0ICogXHJcblx0XHQgKiBUaGUgcmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gcmV0cmlldmUgdGhlIGNoYXJhY3RlciBiZWZvcmUgYSBwcm90b2NvbC1yZWxhdGl2ZSBVUkwgbWF0Y2guXHJcblx0XHQgKiBcclxuXHRcdCAqIFRoaXMgaXMgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSB7QGxpbmsgI21hdGNoZXJSZWdleH0sIHdoaWNoIG5lZWRzIHRvIGdyYWIgdGhlIGNoYXJhY3RlciBiZWZvcmUgYSBwcm90b2NvbC1yZWxhdGl2ZVxyXG5cdFx0ICogJy8vJyBkdWUgdG8gdGhlIGxhY2sgb2YgYSBuZWdhdGl2ZSBsb29rLWJlaGluZCBpbiBKYXZhU2NyaXB0IHJlZ3VsYXIgZXhwcmVzc2lvbnMuIFRoZSBjaGFyYWN0ZXIgYmVmb3JlIHRoZSBtYXRjaCBpcyBzdHJpcHBlZFxyXG5cdFx0ICogZnJvbSB0aGUgVVJMLlxyXG5cdFx0ICovXHJcblx0XHRjaGFyQmVmb3JlUHJvdG9jb2xSZWxNYXRjaFJlZ2V4IDogL14oLik/XFwvXFwvLyxcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHByb3BlcnR5IHtBdXRvbGlua2VyLkh0bWxQYXJzZXJ9IGh0bWxQYXJzZXJcclxuXHRcdCAqIFxyXG5cdFx0ICogVGhlIEh0bWxQYXJzZXIgaW5zdGFuY2UgdXNlZCB0byBza2lwIG92ZXIgSFRNTCB0YWdzLCB3aGlsZSBmaW5kaW5nIHRleHQgbm9kZXMgdG8gcHJvY2Vzcy4gVGhpcyBpcyBsYXppbHkgaW5zdGFudGlhdGVkXHJcblx0XHQgKiBpbiB0aGUge0BsaW5rICNnZXRIdG1sUGFyc2VyfSBtZXRob2QuXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHByb3BlcnR5IHtBdXRvbGlua2VyLkFuY2hvclRhZ0J1aWxkZXJ9IHRhZ0J1aWxkZXJcclxuXHRcdCAqIFxyXG5cdFx0ICogVGhlIEFuY2hvclRhZ0J1aWxkZXIgaW5zdGFuY2UgdXNlZCB0byBidWlsZCB0aGUgVVJML2VtYWlsL1R3aXR0ZXIgcmVwbGFjZW1lbnQgYW5jaG9yIHRhZ3MuIFRoaXMgaXMgbGF6aWx5IGluc3RhbnRpYXRlZFxyXG5cdFx0ICogaW4gdGhlIHtAbGluayAjZ2V0VGFnQnVpbGRlcn0gbWV0aG9kLlxyXG5cdFx0ICovXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBBdXRvbWF0aWNhbGx5IGxpbmtzIFVSTHMsIGVtYWlsIGFkZHJlc3NlcywgYW5kIFR3aXR0ZXIgaGFuZGxlcyBmb3VuZCBpbiB0aGUgZ2l2ZW4gY2h1bmsgb2YgSFRNTC4gXHJcblx0XHQgKiBEb2VzIG5vdCBsaW5rIFVSTHMgZm91bmQgd2l0aGluIEhUTUwgdGFncy5cclxuXHRcdCAqIFxyXG5cdFx0ICogRm9yIGluc3RhbmNlLCBpZiBnaXZlbiB0aGUgdGV4dDogYFlvdSBzaG91bGQgZ28gdG8gaHR0cDovL3d3dy55YWhvby5jb21gLCB0aGVuIHRoZSByZXN1bHRcclxuXHRcdCAqIHdpbGwgYmUgYFlvdSBzaG91bGQgZ28gdG8gJmx0O2EgaHJlZj1cImh0dHA6Ly93d3cueWFob28uY29tXCImZ3Q7aHR0cDovL3d3dy55YWhvby5jb20mbHQ7L2EmZ3Q7YFxyXG5cdFx0ICogXHJcblx0XHQgKiBUaGlzIG1ldGhvZCBmaW5kcyB0aGUgdGV4dCBhcm91bmQgYW55IEhUTUwgZWxlbWVudHMgaW4gdGhlIGlucHV0IGB0ZXh0T3JIdG1sYCwgd2hpY2ggd2lsbCBiZSB0aGUgdGV4dCB0aGF0IGlzIHByb2Nlc3NlZC5cclxuXHRcdCAqIEFueSBvcmlnaW5hbCBIVE1MIGVsZW1lbnRzIHdpbGwgYmUgbGVmdCBhcy1pcywgYXMgd2VsbCBhcyB0aGUgdGV4dCB0aGF0IGlzIGFscmVhZHkgd3JhcHBlZCBpbiBhbmNob3IgKCZsdDthJmd0OykgdGFncy5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IHRleHRPckh0bWwgVGhlIEhUTUwgb3IgdGV4dCB0byBsaW5rIFVSTHMsIGVtYWlsIGFkZHJlc3NlcywgYW5kIFR3aXR0ZXIgaGFuZGxlcyB3aXRoaW4uXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBIVE1MLCB3aXRoIFVSTHMvZW1haWxzL1R3aXR0ZXIgaGFuZGxlcyBhdXRvbWF0aWNhbGx5IGxpbmtlZC5cclxuXHRcdCAqL1xyXG5cdFx0bGluayA6IGZ1bmN0aW9uKCB0ZXh0T3JIdG1sICkge1xyXG5cdFx0XHR2YXIgbWUgPSB0aGlzLCAgLy8gZm9yIGNsb3N1cmVcclxuXHRcdFx0ICAgIGh0bWxQYXJzZXIgPSB0aGlzLmdldEh0bWxQYXJzZXIoKSxcclxuXHRcdFx0ICAgIGh0bWxDaGFyYWN0ZXJFbnRpdGllc1JlZ2V4ID0gdGhpcy5odG1sQ2hhcmFjdGVyRW50aXRpZXNSZWdleCxcclxuXHRcdFx0ICAgIGFuY2hvclRhZ1N0YWNrQ291bnQgPSAwLCAgLy8gdXNlZCB0byBvbmx5IHByb2Nlc3MgdGV4dCBhcm91bmQgYW5jaG9yIHRhZ3MsIGFuZCBhbnkgaW5uZXIgdGV4dC9odG1sIHRoZXkgbWF5IGhhdmVcclxuXHRcdFx0ICAgIHJlc3VsdEh0bWwgPSBbXTtcclxuXHRcdFx0XHJcblx0XHRcdGh0bWxQYXJzZXIucGFyc2UoIHRleHRPckh0bWwsIHtcclxuXHRcdFx0XHQvLyBQcm9jZXNzIEhUTUwgbm9kZXMgaW4gdGhlIGlucHV0IGB0ZXh0T3JIdG1sYFxyXG5cdFx0XHRcdHByb2Nlc3NIdG1sTm9kZSA6IGZ1bmN0aW9uKCB0YWdUZXh0LCB0YWdOYW1lLCBpc0Nsb3NpbmdUYWcgKSB7XHJcblx0XHRcdFx0XHRpZiggdGFnTmFtZSA9PT0gJ2EnICkge1xyXG5cdFx0XHRcdFx0XHRpZiggIWlzQ2xvc2luZ1RhZyApIHsgIC8vIGl0J3MgdGhlIHN0YXJ0IDxhPiB0YWdcclxuXHRcdFx0XHRcdFx0XHRhbmNob3JUYWdTdGFja0NvdW50Kys7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7ICAgLy8gaXQncyB0aGUgZW5kIDwvYT4gdGFnXHJcblx0XHRcdFx0XHRcdFx0YW5jaG9yVGFnU3RhY2tDb3VudCA9IE1hdGgubWF4KCBhbmNob3JUYWdTdGFja0NvdW50IC0gMSwgMCApOyAgLy8gYXR0ZW1wdCB0byBoYW5kbGUgZXh0cmFuZW91cyA8L2E+IHRhZ3MgYnkgbWFraW5nIHN1cmUgdGhlIHN0YWNrIGNvdW50IG5ldmVyIGdvZXMgYmVsb3cgMFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXN1bHRIdG1sLnB1c2goIHRhZ1RleHQgKTsgIC8vIG5vdyBhZGQgdGhlIHRleHQgb2YgdGhlIHRhZyBpdHNlbGYgdmVyYmF0aW1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIFByb2Nlc3MgdGV4dCBub2RlcyBpbiB0aGUgaW5wdXQgYHRleHRPckh0bWxgXHJcblx0XHRcdFx0cHJvY2Vzc1RleHROb2RlIDogZnVuY3Rpb24oIHRleHQgKSB7XHJcblx0XHRcdFx0XHRpZiggYW5jaG9yVGFnU3RhY2tDb3VudCA9PT0gMCApIHtcclxuXHRcdFx0XHRcdFx0Ly8gSWYgd2UncmUgbm90IHdpdGhpbiBhbiA8YT4gdGFnLCBwcm9jZXNzIHRoZSB0ZXh0IG5vZGVcclxuXHRcdFx0XHRcdFx0dmFyIHVuZXNjYXBlZFRleHQgPSBBdXRvbGlua2VyLlV0aWwuc3BsaXRBbmRDYXB0dXJlKCB0ZXh0LCBodG1sQ2hhcmFjdGVyRW50aXRpZXNSZWdleCApOyAgLy8gc3BsaXQgYXQgSFRNTCBlbnRpdGllcywgYnV0IGluY2x1ZGUgdGhlIEhUTUwgZW50aXRpZXMgaW4gdGhlIHJlc3VsdHMgYXJyYXlcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGZvciAoIHZhciBpID0gMCwgbGVuID0gdW5lc2NhcGVkVGV4dC5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgdGV4dFRvUHJvY2VzcyA9IHVuZXNjYXBlZFRleHRbIGkgXSxcclxuXHRcdFx0XHRcdFx0XHQgICAgcHJvY2Vzc2VkVGV4dE5vZGUgPSBtZS5wcm9jZXNzVGV4dE5vZGUoIHRleHRUb1Byb2Nlc3MgKTtcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHRyZXN1bHRIdG1sLnB1c2goIHByb2Nlc3NlZFRleHROb2RlICk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyBgdGV4dGAgaXMgd2l0aGluIGFuIDxhPiB0YWcsIHNpbXBseSBhcHBlbmQgdGhlIHRleHQgLSB3ZSBkbyBub3Qgd2FudCB0byBhdXRvbGluayBhbnl0aGluZyBcclxuXHRcdFx0XHRcdFx0Ly8gYWxyZWFkeSB3aXRoaW4gYW4gPGE+Li4uPC9hPiB0YWdcclxuXHRcdFx0XHRcdFx0cmVzdWx0SHRtbC5wdXNoKCB0ZXh0ICk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ICk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0SHRtbC5qb2luKCBcIlwiICk7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogTGF6aWx5IGluc3RhbnRpYXRlcyBhbmQgcmV0dXJucyB0aGUge0BsaW5rICNodG1sUGFyc2VyfSBpbnN0YW5jZSBmb3IgdGhpcyBBdXRvbGlua2VyIGluc3RhbmNlLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAcmV0dXJuIHtBdXRvbGlua2VyLkh0bWxQYXJzZXJ9XHJcblx0XHQgKi9cclxuXHRcdGdldEh0bWxQYXJzZXIgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGh0bWxQYXJzZXIgPSB0aGlzLmh0bWxQYXJzZXI7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiggIWh0bWxQYXJzZXIgKSB7XHJcblx0XHRcdFx0aHRtbFBhcnNlciA9IHRoaXMuaHRtbFBhcnNlciA9IG5ldyBBdXRvbGlua2VyLkh0bWxQYXJzZXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGh0bWxQYXJzZXI7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUge0BsaW5rICN0YWdCdWlsZGVyfSBpbnN0YW5jZSBmb3IgdGhpcyBBdXRvbGlua2VyIGluc3RhbmNlLCBsYXppbHkgaW5zdGFudGlhdGluZyBpdFxyXG5cdFx0ICogaWYgaXQgZG9lcyBub3QgeWV0IGV4aXN0LlxyXG5cdFx0ICogXHJcblx0XHQgKiBUaGlzIG1ldGhvZCBtYXkgYmUgdXNlZCBpbiBhIHtAbGluayAjcmVwbGFjZUZufSB0byBnZW5lcmF0ZSB0aGUge0BsaW5rIEF1dG9saW5rZXIuSHRtbFRhZyBIdG1sVGFnfSBpbnN0YW5jZSB0aGF0IFxyXG5cdFx0ICogQXV0b2xpbmtlciB3b3VsZCBub3JtYWxseSBnZW5lcmF0ZSwgYW5kIHRoZW4gYWxsb3cgZm9yIG1vZGlmaWNhdGlvbnMgYmVmb3JlIHJldHVybmluZyBpdC4gRm9yIGV4YW1wbGU6XHJcblx0XHQgKiBcclxuXHRcdCAqICAgICB2YXIgaHRtbCA9IEF1dG9saW5rZXIubGluayggXCJUZXN0IGdvb2dsZS5jb21cIiwge1xyXG5cdFx0ICogICAgICAgICByZXBsYWNlRm4gOiBmdW5jdGlvbiggYXV0b2xpbmtlciwgbWF0Y2ggKSB7XHJcblx0XHQgKiAgICAgICAgICAgICB2YXIgdGFnID0gYXV0b2xpbmtlci5nZXRUYWdCdWlsZGVyKCkuYnVpbGQoIG1hdGNoICk7ICAvLyByZXR1cm5zIGFuIHtAbGluayBBdXRvbGlua2VyLkh0bWxUYWd9IGluc3RhbmNlXHJcblx0XHQgKiAgICAgICAgICAgICB0YWcuc2V0QXR0ciggJ3JlbCcsICdub2ZvbGxvdycgKTtcclxuXHRcdCAqICAgICAgICAgICAgIFxyXG5cdFx0ICogICAgICAgICAgICAgcmV0dXJuIHRhZztcclxuXHRcdCAqICAgICAgICAgfVxyXG5cdFx0ICogICAgIH0gKTtcclxuXHRcdCAqICAgICBcclxuXHRcdCAqICAgICAvLyBnZW5lcmF0ZWQgaHRtbDpcclxuXHRcdCAqICAgICAvLyAgIFRlc3QgPGEgaHJlZj1cImh0dHA6Ly9nb29nbGUuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9mb2xsb3dcIj5nb29nbGUuY29tPC9hPlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHtBdXRvbGlua2VyLkFuY2hvclRhZ0J1aWxkZXJ9XHJcblx0XHQgKi9cclxuXHRcdGdldFRhZ0J1aWxkZXIgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRhZ0J1aWxkZXIgPSB0aGlzLnRhZ0J1aWxkZXI7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiggIXRhZ0J1aWxkZXIgKSB7XHJcblx0XHRcdFx0dGFnQnVpbGRlciA9IHRoaXMudGFnQnVpbGRlciA9IG5ldyBBdXRvbGlua2VyLkFuY2hvclRhZ0J1aWxkZXIoIHtcclxuXHRcdFx0XHRcdG5ld1dpbmRvdyAgIDogdGhpcy5uZXdXaW5kb3csXHJcblx0XHRcdFx0XHR0cnVuY2F0ZSAgICA6IHRoaXMudHJ1bmNhdGUsXHJcblx0XHRcdFx0XHRjbGFzc05hbWUgICA6IHRoaXMuY2xhc3NOYW1lXHJcblx0XHRcdFx0fSApO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGFnQnVpbGRlcjtcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBQcm9jZXNzIHRoZSB0ZXh0IHRoYXQgbGllcyBpbmJldHdlZW4gSFRNTCB0YWdzLiBUaGlzIG1ldGhvZCBkb2VzIHRoZSBhY3R1YWwgd3JhcHBpbmcgb2YgVVJMcyB3aXRoXHJcblx0XHQgKiBhbmNob3IgdGFncy5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGF1dG8tbGluay5cclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHRleHQgd2l0aCBhbmNob3IgdGFncyBhdXRvLWZpbGxlZC5cclxuXHRcdCAqL1xyXG5cdFx0cHJvY2Vzc1RleHROb2RlIDogZnVuY3Rpb24oIHRleHQgKSB7XHJcblx0XHRcdHZhciBtZSA9IHRoaXMsICAvLyBmb3IgY2xvc3VyZVxyXG5cdFx0XHQgICAgY2hhckJlZm9yZVByb3RvY29sUmVsTWF0Y2hSZWdleCA9IHRoaXMuY2hhckJlZm9yZVByb3RvY29sUmVsTWF0Y2hSZWdleDtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB0ZXh0LnJlcGxhY2UoIHRoaXMubWF0Y2hlclJlZ2V4LCBmdW5jdGlvbiggbWF0Y2hTdHIsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3ICkge1xyXG5cdFx0XHRcdHZhciB0d2l0dGVyTWF0Y2ggPSAkMSxcclxuXHRcdFx0XHQgICAgdHdpdHRlckhhbmRsZVByZWZpeFdoaXRlc3BhY2VDaGFyID0gJDIsICAvLyBUaGUgd2hpdGVzcGFjZSBjaGFyIGJlZm9yZSB0aGUgQCBzaWduIGluIGEgVHdpdHRlciBoYW5kbGUgbWF0Y2guIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2Ugb2Ygbm8gbG9va2JlaGluZHMgaW4gSlMgcmVnZXhlcy5cclxuXHRcdFx0XHQgICAgdHdpdHRlckhhbmRsZSA9ICQzLCAgICAgIC8vIFRoZSBhY3R1YWwgdHdpdHRlclVzZXIgKGkuZSB0aGUgd29yZCBhZnRlciB0aGUgQCBzaWduIGluIGEgVHdpdHRlciBoYW5kbGUgbWF0Y2gpXHJcblx0XHRcdFx0ICAgIGVtYWlsQWRkcmVzc01hdGNoID0gJDQsICAvLyBGb3IgYm90aCBkZXRlcm1pbmluZyBpZiBpdCBpcyBhbiBlbWFpbCBhZGRyZXNzLCBhbmQgc3RvcmVzIHRoZSBhY3R1YWwgZW1haWwgYWRkcmVzc1xyXG5cdFx0XHRcdCAgICB1cmxNYXRjaCA9ICQ1LCAgICAgICAgICAgLy8gVGhlIG1hdGNoZWQgVVJMIHN0cmluZ1xyXG5cdFx0XHRcdCAgICBwcm90b2NvbFJlbGF0aXZlTWF0Y2ggPSAkNiB8fCAkNywgIC8vIFRoZSAnLy8nIGZvciBhIHByb3RvY29sLXJlbGF0aXZlIG1hdGNoLCB3aXRoIHRoZSBjaGFyYWN0ZXIgdGhhdCBjb21lcyBiZWZvcmUgdGhlICcvLydcclxuXHRcdFx0XHQgICAgXHJcblx0XHRcdFx0ICAgIHByZWZpeFN0ciA9IFwiXCIsICAgICAgIC8vIEEgc3RyaW5nIHRvIHVzZSB0byBwcmVmaXggdGhlIGFuY2hvciB0YWcgdGhhdCBpcyBjcmVhdGVkLiBUaGlzIGlzIG5lZWRlZCBmb3IgdGhlIFR3aXR0ZXIgaGFuZGxlIG1hdGNoXHJcblx0XHRcdFx0ICAgIHN1ZmZpeFN0ciA9IFwiXCIsICAgICAgIC8vIEEgc3RyaW5nIHRvIHN1ZmZpeCB0aGUgYW5jaG9yIHRhZyB0aGF0IGlzIGNyZWF0ZWQuIFRoaXMgaXMgdXNlZCBpZiB0aGVyZSBpcyBhIHRyYWlsaW5nIHBhcmVudGhlc2lzIHRoYXQgc2hvdWxkIG5vdCBiZSBhdXRvLWxpbmtlZC5cclxuXHRcdFx0XHQgICAgXHJcblx0XHRcdFx0ICAgIG1hdGNoOyAgLy8gV2lsbCBiZSBhbiBBdXRvbGlua2VyLm1hdGNoLk1hdGNoIG9iamVjdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIFJldHVybiBvdXQgd2l0aCBubyBjaGFuZ2VzIGZvciBtYXRjaCB0eXBlcyB0aGF0IGFyZSBkaXNhYmxlZCAodXJsLCBlbWFpbCwgdHdpdHRlciksIG9yIGZvciBtYXRjaGVzIHRoYXQgYXJlIFxyXG5cdFx0XHRcdC8vIGludmFsaWQgKGZhbHNlIHBvc2l0aXZlcyBmcm9tIHRoZSBtYXRjaGVyUmVnZXgsIHdoaWNoIGNhbid0IHVzZSBsb29rLWJlaGluZHMgc2luY2UgdGhleSBhcmUgdW5hdmFpbGFibGUgaW4gSlMpLlxyXG5cdFx0XHRcdGlmKCAhbWUuaXNWYWxpZE1hdGNoKCB0d2l0dGVyTWF0Y2gsIGVtYWlsQWRkcmVzc01hdGNoLCB1cmxNYXRjaCwgcHJvdG9jb2xSZWxhdGl2ZU1hdGNoICkgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2hTdHI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIEhhbmRsZSBhIGNsb3NpbmcgcGFyZW50aGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgbWF0Y2gsIGFuZCBleGNsdWRlIGl0IGlmIHRoZXJlIGlzIG5vdCBhIG1hdGNoaW5nIG9wZW4gcGFyZW50aGVzaXNcclxuXHRcdFx0XHQvLyBpbiB0aGUgbWF0Y2ggaXRzZWxmLiBcclxuXHRcdFx0XHRpZiggbWUubWF0Y2hIYXNVbmJhbGFuY2VkQ2xvc2luZ1BhcmVuKCBtYXRjaFN0ciApICkge1xyXG5cdFx0XHRcdFx0bWF0Y2hTdHIgPSBtYXRjaFN0ci5zdWJzdHIoIDAsIG1hdGNoU3RyLmxlbmd0aCAtIDEgKTsgIC8vIHJlbW92ZSB0aGUgdHJhaWxpbmcgXCIpXCJcclxuXHRcdFx0XHRcdHN1ZmZpeFN0ciA9IFwiKVwiOyAgLy8gdGhpcyB3aWxsIGJlIGFkZGVkIGFmdGVyIHRoZSBnZW5lcmF0ZWQgPGE+IHRhZ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiggZW1haWxBZGRyZXNzTWF0Y2ggKSB7XHJcblx0XHRcdFx0XHRtYXRjaCA9IG5ldyBBdXRvbGlua2VyLm1hdGNoLkVtYWlsKCB7IG1hdGNoZWRUZXh0OiBtYXRjaFN0ciwgZW1haWw6IGVtYWlsQWRkcmVzc01hdGNoIH0gKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0gZWxzZSBpZiggdHdpdHRlck1hdGNoICkge1xyXG5cdFx0XHRcdFx0Ly8gZml4IHVwIHRoZSBgbWF0Y2hTdHJgIGlmIHRoZXJlIHdhcyBhIHByZWNlZGluZyB3aGl0ZXNwYWNlIGNoYXIsIHdoaWNoIHdhcyBuZWVkZWQgdG8gZGV0ZXJtaW5lIHRoZSBtYXRjaCBcclxuXHRcdFx0XHRcdC8vIGl0c2VsZiAoc2luY2UgdGhlcmUgYXJlIG5vIGxvb2stYmVoaW5kcyBpbiBKUyByZWdleGVzKVxyXG5cdFx0XHRcdFx0aWYoIHR3aXR0ZXJIYW5kbGVQcmVmaXhXaGl0ZXNwYWNlQ2hhciApIHtcclxuXHRcdFx0XHRcdFx0cHJlZml4U3RyID0gdHdpdHRlckhhbmRsZVByZWZpeFdoaXRlc3BhY2VDaGFyO1xyXG5cdFx0XHRcdFx0XHRtYXRjaFN0ciA9IG1hdGNoU3RyLnNsaWNlKCAxICk7ICAvLyByZW1vdmUgdGhlIHByZWZpeGVkIHdoaXRlc3BhY2UgY2hhciBmcm9tIHRoZSBtYXRjaFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bWF0Y2ggPSBuZXcgQXV0b2xpbmtlci5tYXRjaC5Ud2l0dGVyKCB7IG1hdGNoZWRUZXh0OiBtYXRjaFN0ciwgdHdpdHRlckhhbmRsZTogdHdpdHRlckhhbmRsZSB9ICk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9IGVsc2UgeyAgLy8gdXJsIG1hdGNoXHJcblx0XHRcdFx0XHQvLyBJZiBpdCdzIGEgcHJvdG9jb2wtcmVsYXRpdmUgJy8vJyBtYXRjaCwgcmVtb3ZlIHRoZSBjaGFyYWN0ZXIgYmVmb3JlIHRoZSAnLy8nICh3aGljaCB0aGUgbWF0Y2hlclJlZ2V4IG5lZWRlZFxyXG5cdFx0XHRcdFx0Ly8gdG8gbWF0Y2ggZHVlIHRvIHRoZSBsYWNrIG9mIGEgbmVnYXRpdmUgbG9vay1iZWhpbmQgaW4gSmF2YVNjcmlwdCByZWd1bGFyIGV4cHJlc3Npb25zKVxyXG5cdFx0XHRcdFx0aWYoIHByb3RvY29sUmVsYXRpdmVNYXRjaCApIHtcclxuXHRcdFx0XHRcdFx0dmFyIGNoYXJCZWZvcmVNYXRjaCA9IHByb3RvY29sUmVsYXRpdmVNYXRjaC5tYXRjaCggY2hhckJlZm9yZVByb3RvY29sUmVsTWF0Y2hSZWdleCApWyAxIF0gfHwgXCJcIjtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmKCBjaGFyQmVmb3JlTWF0Y2ggKSB7ICAvLyBmaXggdXAgdGhlIGBtYXRjaFN0cmAgaWYgdGhlcmUgd2FzIGEgcHJlY2VkaW5nIGNoYXIgYmVmb3JlIGEgcHJvdG9jb2wtcmVsYXRpdmUgbWF0Y2gsIHdoaWNoIHdhcyBuZWVkZWQgdG8gZGV0ZXJtaW5lIHRoZSBtYXRjaCBpdHNlbGYgKHNpbmNlIHRoZXJlIGFyZSBubyBsb29rLWJlaGluZHMgaW4gSlMgcmVnZXhlcylcclxuXHRcdFx0XHRcdFx0XHRwcmVmaXhTdHIgPSBjaGFyQmVmb3JlTWF0Y2g7XHJcblx0XHRcdFx0XHRcdFx0bWF0Y2hTdHIgPSBtYXRjaFN0ci5zbGljZSggMSApOyAgLy8gcmVtb3ZlIHRoZSBwcmVmaXhlZCBjaGFyIGZyb20gdGhlIG1hdGNoXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0bWF0Y2ggPSBuZXcgQXV0b2xpbmtlci5tYXRjaC5VcmwoIHtcclxuXHRcdFx0XHRcdFx0bWF0Y2hlZFRleHQgOiBtYXRjaFN0cixcclxuXHRcdFx0XHRcdFx0dXJsIDogbWF0Y2hTdHIsXHJcblx0XHRcdFx0XHRcdHByb3RvY29sUmVsYXRpdmVNYXRjaCA6IHByb3RvY29sUmVsYXRpdmVNYXRjaCxcclxuXHRcdFx0XHRcdFx0c3RyaXBQcmVmaXggOiBtZS5zdHJpcFByZWZpeFxyXG5cdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdH1cclxuXHRcclxuXHRcdFx0XHQvLyBHZW5lcmF0ZSB0aGUgcmVwbGFjZW1lbnQgdGV4dCBmb3IgdGhlIG1hdGNoXHJcblx0XHRcdFx0dmFyIG1hdGNoUmV0dXJuVmFsID0gbWUuY3JlYXRlTWF0Y2hSZXR1cm5WYWwoIG1hdGNoLCBtYXRjaFN0ciApO1xyXG5cdFx0XHRcdHJldHVybiBwcmVmaXhTdHIgKyBtYXRjaFJldHVyblZhbCArIHN1ZmZpeFN0cjtcclxuXHRcdFx0fSApO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIERldGVybWluZXMgaWYgYSBnaXZlbiBtYXRjaCBmb3VuZCBieSB7QGxpbmsgI3Byb2Nlc3NUZXh0Tm9kZX0gaXMgdmFsaWQuIFdpbGwgcmV0dXJuIGBmYWxzZWAgZm9yOlxyXG5cdFx0ICogXHJcblx0XHQgKiAxKSBEaXNhYmxlZCBsaW5rIHR5cGVzIChpLmUuIGhhdmluZyBhIFR3aXR0ZXIgbWF0Y2gsIGJ1dCB7QGxpbmsgI3R3aXR0ZXJ9IG1hdGNoaW5nIGlzIGRpc2FibGVkKVxyXG5cdFx0ICogMikgVVJMIG1hdGNoZXMgd2hpY2ggZG8gbm90IGhhdmUgYXQgbGVhc3QgaGF2ZSBvbmUgcGVyaW9kICgnLicpIGluIHRoZSBkb21haW4gbmFtZSAoZWZmZWN0aXZlbHkgc2tpcHBpbmcgb3ZlciBcclxuXHRcdCAqICAgIG1hdGNoZXMgbGlrZSBcImFiYzpkZWZcIilcclxuXHRcdCAqIDMpIEEgcHJvdG9jb2wtcmVsYXRpdmUgdXJsIG1hdGNoIChhIFVSTCBiZWdpbm5pbmcgd2l0aCAnLy8nKSB3aG9zZSBwcmV2aW91cyBjaGFyYWN0ZXIgaXMgYSB3b3JkIGNoYXJhY3RlciBcclxuXHRcdCAqICAgIChlZmZlY3RpdmVseSBza2lwcGluZyBvdmVyIHN0cmluZ3MgbGlrZSBcImFiYy8vZ29vZ2xlLmNvbVwiKVxyXG5cdFx0ICogXHJcblx0XHQgKiBPdGhlcndpc2UsIHJldHVybnMgYHRydWVgLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IHR3aXR0ZXJNYXRjaCBUaGUgbWF0Y2hlZCBUd2l0dGVyIGhhbmRsZSwgaWYgdGhlcmUgd2FzIG9uZS4gV2lsbCBiZSBlbXB0eSBzdHJpbmcgaWYgdGhlIG1hdGNoIGlzIG5vdCBhIFxyXG5cdFx0ICogICBUd2l0dGVyIG1hdGNoLlxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IGVtYWlsQWRkcmVzc01hdGNoIFRoZSBtYXRjaGVkIEVtYWlsIGFkZHJlc3MsIGlmIHRoZXJlIHdhcyBvbmUuIFdpbGwgYmUgZW1wdHkgc3RyaW5nIGlmIHRoZSBtYXRjaCBpcyBub3QgXHJcblx0XHQgKiAgIGFuIEVtYWlsIGFkZHJlc3MgbWF0Y2guXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gdXJsTWF0Y2ggVGhlIG1hdGNoZWQgVVJMLCBpZiB0aGVyZSB3YXMgb25lLiBXaWxsIGJlIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgbWF0Y2ggaXMgbm90IGEgVVJMIG1hdGNoLlxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IHByb3RvY29sUmVsYXRpdmVNYXRjaCBUaGUgcHJvdG9jb2wtcmVsYXRpdmUgc3RyaW5nIGZvciBhIFVSTCBtYXRjaCAoaS5lLiAnLy8nKSwgcG9zc2libHkgd2l0aCBhIHByZWNlZGluZ1xyXG5cdFx0ICogICBjaGFyYWN0ZXIgKGV4LCBhIHNwYWNlLCBzdWNoIGFzOiAnIC8vJywgb3IgYSBsZXR0ZXIsIHN1Y2ggYXM6ICdhLy8nKS4gVGhlIG1hdGNoIGlzIGludmFsaWQgaWYgdGhlcmUgaXMgYSB3b3JkIGNoYXJhY3RlclxyXG5cdFx0ICogICBwcmVjZWRpbmcgdGhlICcvLycuXHJcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIG1hdGNoIGdpdmVuIGlzIHZhbGlkIGFuZCBzaG91bGQgYmUgcHJvY2Vzc2VkLCBvciBgZmFsc2VgIGlmIHRoZSBtYXRjaCBpcyBpbnZhbGlkIGFuZC9vciBcclxuXHRcdCAqICAgc2hvdWxkIGp1c3Qgbm90IGJlIHByb2Nlc3NlZCAoc3VjaCBhcywgaWYgaXQncyBhIFR3aXR0ZXIgbWF0Y2gsIGJ1dCB7QGxpbmsgI3R3aXR0ZXJ9IG1hdGNoaW5nIGlzIGRpc2FibGVkfS5cclxuXHRcdCAqL1xyXG5cdFx0aXNWYWxpZE1hdGNoIDogZnVuY3Rpb24oIHR3aXR0ZXJNYXRjaCwgZW1haWxBZGRyZXNzTWF0Y2gsIHVybE1hdGNoLCBwcm90b2NvbFJlbGF0aXZlTWF0Y2ggKSB7XHJcblx0XHRcdGlmKCBcclxuXHRcdFx0ICAgICggdHdpdHRlck1hdGNoICYmICF0aGlzLnR3aXR0ZXIgKSB8fCAoIGVtYWlsQWRkcmVzc01hdGNoICYmICF0aGlzLmVtYWlsICkgfHwgKCB1cmxNYXRjaCAmJiAhdGhpcy51cmxzICkgfHxcclxuXHRcdFx0ICAgICggdXJsTWF0Y2ggJiYgdXJsTWF0Y2guaW5kZXhPZiggJy4nICkgPT09IC0xICkgfHwgIC8vIEF0IGxlYXN0IG9uZSBwZXJpb2QgKCcuJykgbXVzdCBleGlzdCBpbiB0aGUgVVJMIG1hdGNoIGZvciB1cyB0byBjb25zaWRlciBpdCBhbiBhY3R1YWwgVVJMXHJcblx0XHRcdCAgICAoIHVybE1hdGNoICYmIC9eW0EtWmEtel17Myw5fTovLnRlc3QoIHVybE1hdGNoICkgJiYgIS86Lio/W0EtWmEtel0vLnRlc3QoIHVybE1hdGNoICkgKSB8fCAgICAgLy8gQXQgbGVhc3Qgb25lIGxldHRlciBjaGFyYWN0ZXIgbXVzdCBleGlzdCBpbiB0aGUgZG9tYWluIG5hbWUgYWZ0ZXIgYSBwcm90b2NvbCBtYXRjaC4gRXg6IHNraXAgb3ZlciBzb21ldGhpbmcgbGlrZSBcImdpdDoxLjBcIlxyXG5cdFx0XHQgICAgKCBwcm90b2NvbFJlbGF0aXZlTWF0Y2ggJiYgdGhpcy5pbnZhbGlkUHJvdG9jb2xSZWxNYXRjaFJlZ2V4LnRlc3QoIHByb3RvY29sUmVsYXRpdmVNYXRjaCApICkgIC8vIGEgcHJvdG9jb2wtcmVsYXRpdmUgbWF0Y2ggd2hpY2ggaGFzIGEgd29yZCBjaGFyYWN0ZXIgaW4gZnJvbnQgb2YgaXQgKHNvIHdlIGNhbiBza2lwIHNvbWV0aGluZyBsaWtlIFwiYWJjLy9nb29nbGUuY29tXCIpXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogRGV0ZXJtaW5lcyBpZiBhIG1hdGNoIGZvdW5kIGhhcyBhbiB1bm1hdGNoZWQgY2xvc2luZyBwYXJlbnRoZXNpcy4gSWYgc28sIHRoaXMgcGFyZW50aGVzaXMgd2lsbCBiZSByZW1vdmVkXHJcblx0XHQgKiBmcm9tIHRoZSBtYXRjaCBpdHNlbGYsIGFuZCBhcHBlbmRlZCBhZnRlciB0aGUgZ2VuZXJhdGVkIGFuY2hvciB0YWcgaW4ge0BsaW5rICNwcm9jZXNzVGV4dE5vZGV9LlxyXG5cdFx0ICogXHJcblx0XHQgKiBBIG1hdGNoIG1heSBoYXZlIGFuIGV4dHJhIGNsb3NpbmcgcGFyZW50aGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgbWF0Y2ggYmVjYXVzZSB0aGUgcmVndWxhciBleHByZXNzaW9uIG11c3QgaW5jbHVkZSBwYXJlbnRoZXNpc1xyXG5cdFx0ICogZm9yIFVSTHMgc3VjaCBhcyBcIndpa2lwZWRpYS5jb20vc29tZXRoaW5nXyhkaXNhbWJpZ3VhdGlvbilcIiwgd2hpY2ggc2hvdWxkIGJlIGF1dG8tbGlua2VkLiBcclxuXHRcdCAqIFxyXG5cdFx0ICogSG93ZXZlciwgYW4gZXh0cmEgcGFyZW50aGVzaXMgKndpbGwqIGJlIGluY2x1ZGVkIHdoZW4gdGhlIFVSTCBpdHNlbGYgaXMgd3JhcHBlZCBpbiBwYXJlbnRoZXNpcywgc3VjaCBhcyBpbiB0aGUgY2FzZSBvZlxyXG5cdFx0ICogXCIod2lraXBlZGlhLmNvbS9zb21ldGhpbmdfKGRpc2FtYmlndWF0aW9uKSlcIi4gSW4gdGhpcyBjYXNlLCB0aGUgbGFzdCBjbG9zaW5nIHBhcmVudGhlc2lzIHNob3VsZCAqbm90KiBiZSBwYXJ0IG9mIHRoZSBVUkwgXHJcblx0XHQgKiBpdHNlbGYsIGFuZCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBgdHJ1ZWAuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gbWF0Y2hTdHIgVGhlIGZ1bGwgbWF0Y2ggc3RyaW5nIGZyb20gdGhlIHtAbGluayAjbWF0Y2hlclJlZ2V4fS5cclxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGVyZSBpcyBhbiB1bmJhbGFuY2VkIGNsb3NpbmcgcGFyZW50aGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgYG1hdGNoU3RyYCwgYGZhbHNlYCBvdGhlcndpc2UuXHJcblx0XHQgKi9cclxuXHRcdG1hdGNoSGFzVW5iYWxhbmNlZENsb3NpbmdQYXJlbiA6IGZ1bmN0aW9uKCBtYXRjaFN0ciApIHtcclxuXHRcdFx0dmFyIGxhc3RDaGFyID0gbWF0Y2hTdHIuY2hhckF0KCBtYXRjaFN0ci5sZW5ndGggLSAxICk7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiggbGFzdENoYXIgPT09ICcpJyApIHtcclxuXHRcdFx0XHR2YXIgb3BlblBhcmVuc01hdGNoID0gbWF0Y2hTdHIubWF0Y2goIC9cXCgvZyApLFxyXG5cdFx0XHRcdCAgICBjbG9zZVBhcmVuc01hdGNoID0gbWF0Y2hTdHIubWF0Y2goIC9cXCkvZyApLFxyXG5cdFx0XHRcdCAgICBudW1PcGVuUGFyZW5zID0gKCBvcGVuUGFyZW5zTWF0Y2ggJiYgb3BlblBhcmVuc01hdGNoLmxlbmd0aCApIHx8IDAsXHJcblx0XHRcdFx0ICAgIG51bUNsb3NlUGFyZW5zID0gKCBjbG9zZVBhcmVuc01hdGNoICYmIGNsb3NlUGFyZW5zTWF0Y2gubGVuZ3RoICkgfHwgMDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZiggbnVtT3BlblBhcmVucyA8IG51bUNsb3NlUGFyZW5zICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQ3JlYXRlcyB0aGUgcmV0dXJuIHN0cmluZyB2YWx1ZSBmb3IgYSBnaXZlbiBtYXRjaCBpbiB0aGUgaW5wdXQgc3RyaW5nLCBmb3IgdGhlIHtAbGluayAjcHJvY2Vzc1RleHROb2RlfSBtZXRob2QuXHJcblx0XHQgKiBcclxuXHRcdCAqIFRoaXMgbWV0aG9kIGhhbmRsZXMgdGhlIHtAbGluayAjcmVwbGFjZUZufSwgaWYgb25lIHdhcyBwcm92aWRlZC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqIEBwYXJhbSB7QXV0b2xpbmtlci5tYXRjaC5NYXRjaH0gbWF0Y2ggVGhlIE1hdGNoIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIG1hdGNoLlxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IG1hdGNoU3RyIFRoZSBvcmlnaW5hbCBtYXRjaCBzdHJpbmcsIGFmdGVyIGhhdmluZyBiZWVuIHByZXByb2Nlc3NlZCB0byBmaXggbWF0Y2ggZWRnZSBjYXNlcyAoc2VlXHJcblx0XHQgKiAgIHRoZSBgcHJlZml4U3RyYCBhbmQgYHN1ZmZpeFN0cmAgdmFycyBpbiB7QGxpbmsgI3Byb2Nlc3NUZXh0Tm9kZX0uXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBzdHJpbmcgdGhhdCB0aGUgYG1hdGNoYCBzaG91bGQgYmUgcmVwbGFjZWQgd2l0aC4gVGhpcyBpcyB1c3VhbGx5IHRoZSBhbmNob3IgdGFnIHN0cmluZywgYnV0XHJcblx0XHQgKiAgIG1heSBiZSB0aGUgYG1hdGNoU3RyYCBpdHNlbGYgaWYgdGhlIG1hdGNoIGlzIG5vdCB0byBiZSByZXBsYWNlZC5cclxuXHRcdCAqL1xyXG5cdFx0Y3JlYXRlTWF0Y2hSZXR1cm5WYWwgOiBmdW5jdGlvbiggbWF0Y2gsIG1hdGNoU3RyICkge1xyXG5cdFx0XHQvLyBIYW5kbGUgYSBjdXN0b20gYHJlcGxhY2VGbmAgYmVpbmcgcHJvdmlkZWRcclxuXHRcdFx0dmFyIHJlcGxhY2VGblJlc3VsdDtcclxuXHRcdFx0aWYoIHRoaXMucmVwbGFjZUZuICkge1xyXG5cdFx0XHRcdHJlcGxhY2VGblJlc3VsdCA9IHRoaXMucmVwbGFjZUZuLmNhbGwoIHRoaXMsIHRoaXMsIG1hdGNoICk7ICAvLyBBdXRvbGlua2VyIGluc3RhbmNlIGlzIHRoZSBjb250ZXh0LCBhbmQgdGhlIGZpcnN0IGFyZ1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZiggdHlwZW9mIHJlcGxhY2VGblJlc3VsdCA9PT0gJ3N0cmluZycgKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlcGxhY2VGblJlc3VsdDsgIC8vIGByZXBsYWNlRm5gIHJldHVybmVkIGEgc3RyaW5nLCB1c2UgdGhhdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9IGVsc2UgaWYoIHJlcGxhY2VGblJlc3VsdCA9PT0gZmFsc2UgKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1hdGNoU3RyOyAgLy8gbm8gcmVwbGFjZW1lbnQgZm9yIHRoZSBtYXRjaFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9IGVsc2UgaWYoIHJlcGxhY2VGblJlc3VsdCBpbnN0YW5jZW9mIEF1dG9saW5rZXIuSHRtbFRhZyApIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVwbGFjZUZuUmVzdWx0LnRvU3RyaW5nKCk7XHJcblx0XHRcdFxyXG5cdFx0XHR9IGVsc2UgeyAgLy8gcmVwbGFjZUZuUmVzdWx0ID09PSB0cnVlLCBvciBuby91bmtub3duIHJldHVybiB2YWx1ZSBmcm9tIGZ1bmN0aW9uXHJcblx0XHRcdFx0Ly8gUGVyZm9ybSBBdXRvbGlua2VyJ3MgZGVmYXVsdCBhbmNob3IgdGFnIGdlbmVyYXRpb25cclxuXHRcdFx0XHR2YXIgdGFnQnVpbGRlciA9IHRoaXMuZ2V0VGFnQnVpbGRlcigpLFxyXG5cdFx0XHRcdCAgICBhbmNob3JUYWcgPSB0YWdCdWlsZGVyLmJ1aWxkKCBtYXRjaCApOyAgLy8gcmV0dXJucyBhbiBBdXRvbGlua2VyLkh0bWxUYWcgaW5zdGFuY2VcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gYW5jaG9yVGFnLnRvU3RyaW5nKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHR9O1xyXG5cdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEF1dG9tYXRpY2FsbHkgbGlua3MgVVJMcywgZW1haWwgYWRkcmVzc2VzLCBhbmQgVHdpdHRlciBoYW5kbGVzIGZvdW5kIGluIHRoZSBnaXZlbiBjaHVuayBvZiBIVE1MLiBcclxuXHQgKiBEb2VzIG5vdCBsaW5rIFVSTHMgZm91bmQgd2l0aGluIEhUTUwgdGFncy5cclxuXHQgKiBcclxuXHQgKiBGb3IgaW5zdGFuY2UsIGlmIGdpdmVuIHRoZSB0ZXh0OiBgWW91IHNob3VsZCBnbyB0byBodHRwOi8vd3d3LnlhaG9vLmNvbWAsIHRoZW4gdGhlIHJlc3VsdFxyXG5cdCAqIHdpbGwgYmUgYFlvdSBzaG91bGQgZ28gdG8gJmx0O2EgaHJlZj1cImh0dHA6Ly93d3cueWFob28uY29tXCImZ3Q7aHR0cDovL3d3dy55YWhvby5jb20mbHQ7L2EmZ3Q7YFxyXG5cdCAqIFxyXG5cdCAqIEV4YW1wbGU6XHJcblx0ICogXHJcblx0ICogICAgIHZhciBsaW5rZWRUZXh0ID0gQXV0b2xpbmtlci5saW5rKCBcIkdvIHRvIGdvb2dsZS5jb21cIiwgeyBuZXdXaW5kb3c6IGZhbHNlIH0gKTtcclxuXHQgKiAgICAgLy8gUHJvZHVjZXM6IFwiR28gdG8gPGEgaHJlZj1cImh0dHA6Ly9nb29nbGUuY29tXCI+Z29vZ2xlLmNvbTwvYT5cIlxyXG5cdCAqIFxyXG5cdCAqIEBzdGF0aWNcclxuXHQgKiBAbWV0aG9kIGxpbmtcclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaHRtbCBUaGUgSFRNTCB0ZXh0IHRvIGxpbmsgVVJMcyB3aXRoaW4uXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBBbnkgb2YgdGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIEF1dG9saW5rZXIgY2xhc3MsIHNwZWNpZmllZCBpbiBhbiBPYmplY3QgKG1hcCkuXHJcblx0ICogICBTZWUgdGhlIGNsYXNzIGRlc2NyaXB0aW9uIGZvciBhbiBleGFtcGxlIGNhbGwuXHJcblx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgSFRNTCB0ZXh0LCB3aXRoIFVSTHMgYXV0b21hdGljYWxseSBsaW5rZWRcclxuXHQgKi9cclxuXHRBdXRvbGlua2VyLmxpbmsgPSBmdW5jdGlvbiggdGV4dCwgb3B0aW9ucyApIHtcclxuXHRcdHZhciBhdXRvbGlua2VyID0gbmV3IEF1dG9saW5rZXIoIG9wdGlvbnMgKTtcclxuXHRcdHJldHVybiBhdXRvbGlua2VyLmxpbmsoIHRleHQgKTtcclxuXHR9O1xyXG5cdFxyXG5cdFxyXG5cdC8vIE5hbWVzcGFjZSBmb3IgYG1hdGNoYCBjbGFzc2VzXHJcblx0QXV0b2xpbmtlci5tYXRjaCA9IHt9O1xyXG5cdC8qZ2xvYmFsIEF1dG9saW5rZXIgKi9cclxuXHQvKmpzaGludCBlcW51bGw6dHJ1ZSwgYm9zczp0cnVlICovXHJcblx0LyoqXHJcblx0ICogQGNsYXNzIEF1dG9saW5rZXIuVXRpbFxyXG5cdCAqIEBzaW5nbGV0b25cclxuXHQgKiBcclxuXHQgKiBBIGZldyB1dGlsaXR5IG1ldGhvZHMgZm9yIEF1dG9saW5rZXIuXHJcblx0ICovXHJcblx0QXV0b2xpbmtlci5VdGlsID0ge1xyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGFic3RyYWN0TWV0aG9kXHJcblx0XHQgKiBcclxuXHRcdCAqIEEgZnVuY3Rpb24gb2JqZWN0IHdoaWNoIHJlcHJlc2VudHMgYW4gYWJzdHJhY3QgbWV0aG9kLlxyXG5cdFx0ICovXHJcblx0XHRhYnN0cmFjdE1ldGhvZCA6IGZ1bmN0aW9uKCkgeyB0aHJvdyBcImFic3RyYWN0XCI7IH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBBc3NpZ25zIChzaGFsbG93IGNvcGllcykgdGhlIHByb3BlcnRpZXMgb2YgYHNyY2Agb250byBgZGVzdGAuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXHJcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gc3JjIFRoZSBzb3VyY2Ugb2JqZWN0LlxyXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxyXG5cdFx0ICovXHJcblx0XHRhc3NpZ24gOiBmdW5jdGlvbiggZGVzdCwgc3JjICkge1xyXG5cdFx0XHRmb3IoIHZhciBwcm9wIGluIHNyYyApIHtcclxuXHRcdFx0XHRpZiggc3JjLmhhc093blByb3BlcnR5KCBwcm9wICkgKSB7XHJcblx0XHRcdFx0XHRkZXN0WyBwcm9wIF0gPSBzcmNbIHByb3AgXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBkZXN0O1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEV4dGVuZHMgYHN1cGVyY2xhc3NgIHRvIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgYWRkaW5nIHRoZSBgcHJvdG9Qcm9wc2AgdG8gdGhlIG5ldyBzdWJjbGFzcydzIHByb3RvdHlwZS5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHtGdW5jdGlvbn0gc3VwZXJjbGFzcyBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIHRoZSBzdXBlcmNsYXNzLlxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHByb3RvUHJvcHMgVGhlIG1ldGhvZHMvcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIHN1YmNsYXNzJ3MgcHJvdG90eXBlLiBUaGlzIG1heSBjb250YWluIHRoZVxyXG5cdFx0ICogICBzcGVjaWFsIHByb3BlcnR5IGBjb25zdHJ1Y3RvcmAsIHdoaWNoIHdpbGwgYmUgdXNlZCBhcyB0aGUgbmV3IHN1YmNsYXNzJ3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXHJcblx0XHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIG5ldyBzdWJjbGFzcyBmdW5jdGlvbi5cclxuXHRcdCAqL1xyXG5cdFx0ZXh0ZW5kIDogZnVuY3Rpb24oIHN1cGVyY2xhc3MsIHByb3RvUHJvcHMgKSB7XHJcblx0XHRcdHZhciBzdXBlcmNsYXNzUHJvdG8gPSBzdXBlcmNsYXNzLnByb3RvdHlwZTtcclxuXHRcdFx0XHJcblx0XHRcdHZhciBGID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdFx0Ri5wcm90b3R5cGUgPSBzdXBlcmNsYXNzUHJvdG87XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgc3ViY2xhc3M7XHJcblx0XHRcdGlmKCBwcm90b1Byb3BzLmhhc093blByb3BlcnR5KCAnY29uc3RydWN0b3InICkgKSB7XHJcblx0XHRcdFx0c3ViY2xhc3MgPSBwcm90b1Byb3BzLmNvbnN0cnVjdG9yO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHN1YmNsYXNzID0gZnVuY3Rpb24oKSB7IHN1cGVyY2xhc3NQcm90by5jb25zdHJ1Y3Rvci5hcHBseSggdGhpcywgYXJndW1lbnRzICk7IH07XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHZhciBzdWJjbGFzc1Byb3RvID0gc3ViY2xhc3MucHJvdG90eXBlID0gbmV3IEYoKTsgIC8vIHNldCB1cCBwcm90b3R5cGUgY2hhaW5cclxuXHRcdFx0c3ViY2xhc3NQcm90by5jb25zdHJ1Y3RvciA9IHN1YmNsYXNzOyAgLy8gZml4IGNvbnN0cnVjdG9yIHByb3BlcnR5XHJcblx0XHRcdHN1YmNsYXNzUHJvdG8uc3VwZXJjbGFzcyA9IHN1cGVyY2xhc3NQcm90bztcclxuXHRcdFx0XHJcblx0XHRcdGRlbGV0ZSBwcm90b1Byb3BzLmNvbnN0cnVjdG9yOyAgLy8gZG9uJ3QgcmUtYXNzaWduIGNvbnN0cnVjdG9yIHByb3BlcnR5IHRvIHRoZSBwcm90b3R5cGUsIHNpbmNlIGEgbmV3IGZ1bmN0aW9uIG1heSBoYXZlIGJlZW4gY3JlYXRlZCAoYHN1YmNsYXNzYCksIHdoaWNoIGlzIG5vdyBhbHJlYWR5IHRoZXJlXHJcblx0XHRcdEF1dG9saW5rZXIuVXRpbC5hc3NpZ24oIHN1YmNsYXNzUHJvdG8sIHByb3RvUHJvcHMgKTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBzdWJjbGFzcztcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBUcnVuY2F0ZXMgdGhlIGBzdHJgIGF0IGBsZW4gLSBlbGxpcHNpc0NoYXJzLmxlbmd0aGAsIGFuZCBhZGRzIHRoZSBgZWxsaXBzaXNDaGFyc2AgdG8gdGhlXHJcblx0XHQgKiBlbmQgb2YgdGhlIHN0cmluZyAoYnkgZGVmYXVsdCwgdHdvIHBlcmlvZHM6ICcuLicpLiBJZiB0aGUgYHN0cmAgbGVuZ3RoIGRvZXMgbm90IGV4Y2VlZCBcclxuXHRcdCAqIGBsZW5gLCB0aGUgc3RyaW5nIHdpbGwgYmUgcmV0dXJuZWQgdW5jaGFuZ2VkLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gdHJ1bmNhdGUgYW5kIGFkZCBhbiBlbGxpcHNpcyB0by5cclxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSB0cnVuY2F0ZUxlbiBUaGUgbGVuZ3RoIHRvIHRydW5jYXRlIHRoZSBzdHJpbmcgYXQuXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gW2VsbGlwc2lzQ2hhcnM9Li5dIFRoZSBlbGxpcHNpcyBjaGFyYWN0ZXIocykgdG8gYWRkIHRvIHRoZSBlbmQgb2YgYHN0cmBcclxuXHRcdCAqICAgd2hlbiB0cnVuY2F0ZWQuIERlZmF1bHRzIHRvICcuLidcclxuXHRcdCAqL1xyXG5cdFx0ZWxsaXBzaXMgOiBmdW5jdGlvbiggc3RyLCB0cnVuY2F0ZUxlbiwgZWxsaXBzaXNDaGFycyApIHtcclxuXHRcdFx0aWYoIHN0ci5sZW5ndGggPiB0cnVuY2F0ZUxlbiApIHtcclxuXHRcdFx0XHRlbGxpcHNpc0NoYXJzID0gKCBlbGxpcHNpc0NoYXJzID09IG51bGwgKSA/ICcuLicgOiBlbGxpcHNpc0NoYXJzO1xyXG5cdFx0XHRcdHN0ciA9IHN0ci5zdWJzdHJpbmcoIDAsIHRydW5jYXRlTGVuIC0gZWxsaXBzaXNDaGFycy5sZW5ndGggKSArIGVsbGlwc2lzQ2hhcnM7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0cjtcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdXBwb3J0cyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2YoKWAgZnVuY3Rpb25hbGl0eSBmb3Igb2xkIElFIChJRTggYW5kIGJlbG93KS5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBmaW5kIGFuIGVsZW1lbnQgb2YuXHJcblx0XHQgKiBAcGFyYW0geyp9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gZmluZCBpbiB0aGUgYXJyYXksIGFuZCByZXR1cm4gdGhlIGluZGV4IG9mLlxyXG5cdFx0ICogQHJldHVybiB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGBlbGVtZW50YCwgb3IgLTEgaWYgaXQgd2FzIG5vdCBmb3VuZC5cclxuXHRcdCAqL1xyXG5cdFx0aW5kZXhPZiA6IGZ1bmN0aW9uKCBhcnIsIGVsZW1lbnQgKSB7XHJcblx0XHRcdGlmKCBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiApIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmluZGV4T2YoIGVsZW1lbnQgKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRmb3IoIHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xyXG5cdFx0XHRcdFx0aWYoIGFyclsgaSBdID09PSBlbGVtZW50ICkgcmV0dXJuIGk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiAtMTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUGVyZm9ybXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2Ygd2hhdCBtb2Rlcm4gYnJvd3NlcnMgZG8gd2hlbiBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdCgpYCBpcyBjYWxsZWRcclxuXHRcdCAqIHdpdGggYSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCBjb250YWlucyBjYXB0dXJpbmcgcGFyZW50aGVzaXMuXHJcblx0XHQgKiBcclxuXHRcdCAqIEZvciBleGFtcGxlOlxyXG5cdFx0ICogXHJcblx0XHQgKiAgICAgLy8gTW9kZXJuIGJyb3dzZXJzOiBcclxuXHRcdCAqICAgICBcImEsYixjXCIuc3BsaXQoIC8oLCkvICk7ICAvLyAtLT4gWyAnYScsICcsJywgJ2InLCAnLCcsICdjJyBdXHJcblx0XHQgKiAgICAgXHJcblx0XHQgKiAgICAgLy8gT2xkIElFIChpbmNsdWRpbmcgSUU4KTpcclxuXHRcdCAqICAgICBcImEsYixjXCIuc3BsaXQoIC8oLCkvICk7ICAvLyAtLT4gWyAnYScsICdiJywgJ2MnIF1cclxuXHRcdCAqICAgICBcclxuXHRcdCAqIFRoaXMgbWV0aG9kIGVtdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIG1vZGVybiBicm93c2VycyBmb3IgdGhlIG9sZCBJRSBjYXNlLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gc3BsaXQuXHJcblx0XHQgKiBAcGFyYW0ge1JlZ0V4cH0gc3BsaXRSZWdleCBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIHNwbGl0IHRoZSBpbnB1dCBgc3RyYCBvbi4gVGhlIHNwbGl0dGluZ1xyXG5cdFx0ICogICBjaGFyYWN0ZXIocykgd2lsbCBiZSBzcGxpY2VkIGludG8gdGhlIGFycmF5LCBhcyBpbiB0aGUgXCJtb2Rlcm4gYnJvd3NlcnNcIiBleGFtcGxlIGluIHRoZSBcclxuXHRcdCAqICAgZGVzY3JpcHRpb24gb2YgdGhpcyBtZXRob2QuIFxyXG5cdFx0ICogICBOb3RlICMxOiB0aGUgc3VwcGxpZWQgcmVndWxhciBleHByZXNzaW9uICoqbXVzdCoqIGhhdmUgdGhlICdnJyBmbGFnIHNwZWNpZmllZC5cclxuXHRcdCAqICAgTm90ZSAjMjogZm9yIHNpbXBsaWNpdHkncyBzYWtlLCB0aGUgcmVndWxhciBleHByZXNzaW9uIGRvZXMgbm90IG5lZWQgXHJcblx0XHQgKiAgIHRvIGNvbnRhaW4gY2FwdHVyaW5nIHBhcmVudGhlc2lzIC0gaXQgd2lsbCBiZSBhc3N1bWVkIHRoYXQgYW55IG1hdGNoIGhhcyB0aGVtLlxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nW119IFRoZSBzcGxpdCBhcnJheSBvZiBzdHJpbmdzLCB3aXRoIHRoZSBzcGxpdHRpbmcgY2hhcmFjdGVyKHMpIGluY2x1ZGVkLlxyXG5cdFx0ICovXHJcblx0XHRzcGxpdEFuZENhcHR1cmUgOiBmdW5jdGlvbiggc3RyLCBzcGxpdFJlZ2V4ICkge1xyXG5cdFx0XHRpZiggIXNwbGl0UmVnZXguZ2xvYmFsICkgdGhyb3cgbmV3IEVycm9yKCBcImBzcGxpdFJlZ2V4YCBtdXN0IGhhdmUgdGhlICdnJyBmbGFnIHNldFwiICk7XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgcmVzdWx0ID0gW10sXHJcblx0XHRcdCAgICBsYXN0SWR4ID0gMCxcclxuXHRcdFx0ICAgIG1hdGNoO1xyXG5cdFx0XHRcclxuXHRcdFx0d2hpbGUoIG1hdGNoID0gc3BsaXRSZWdleC5leGVjKCBzdHIgKSApIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaCggc3RyLnN1YnN0cmluZyggbGFzdElkeCwgbWF0Y2guaW5kZXggKSApO1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKCBtYXRjaFsgMCBdICk7ICAvLyBwdXNoIHRoZSBzcGxpdHRpbmcgY2hhcihzKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxhc3RJZHggPSBtYXRjaC5pbmRleCArIG1hdGNoWyAwIF0ubGVuZ3RoO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJlc3VsdC5wdXNoKCBzdHIuc3Vic3RyaW5nKCBsYXN0SWR4ICkgKTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9O1xyXG5cdC8qZ2xvYmFsIEF1dG9saW5rZXIgKi9cclxuXHQvKipcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEBjbGFzcyBBdXRvbGlua2VyLkh0bWxQYXJzZXJcclxuXHQgKiBAZXh0ZW5kcyBPYmplY3RcclxuXHQgKiBcclxuXHQgKiBBbiBIVE1MIHBhcnNlciBpbXBsZW1lbnRhdGlvbiB3aGljaCBzaW1wbHkgd2Fsa3MgYW4gSFRNTCBzdHJpbmcgYW5kIGNhbGxzIHRoZSBwcm92aWRlZCB2aXNpdG9yIGZ1bmN0aW9ucyB0byBwcm9jZXNzIFxyXG5cdCAqIEhUTUwgYW5kIHRleHQgbm9kZXMuXHJcblx0ICogXHJcblx0ICogQXV0b2xpbmtlciB1c2VzIHRoaXMgdG8gb25seSBsaW5rIFVSTHMvZW1haWxzL1R3aXR0ZXIgaGFuZGxlcyB3aXRoaW4gdGV4dCBub2RlcywgYmFzaWNhbGx5IGlnbm9yaW5nIEhUTUwgdGFncy5cclxuXHQgKi9cclxuXHRBdXRvbGlua2VyLkh0bWxQYXJzZXIgPSBBdXRvbGlua2VyLlV0aWwuZXh0ZW5kKCBPYmplY3QsIHtcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHByb3BlcnR5IHtSZWdFeHB9IGh0bWxSZWdleFxyXG5cdFx0ICogXHJcblx0XHQgKiBUaGUgcmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gcHVsbCBvdXQgSFRNTCB0YWdzIGZyb20gYSBzdHJpbmcuIEhhbmRsZXMgbmFtZXNwYWNlZCBIVE1MIHRhZ3MgYW5kXHJcblx0XHQgKiBhdHRyaWJ1dGUgbmFtZXMsIGFzIHNwZWNpZmllZCBieSBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sLW1hcmt1cC9zeW50YXguaHRtbC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQ2FwdHVyaW5nIGdyb3VwczpcclxuXHRcdCAqIFxyXG5cdFx0ICogMS4gSWYgaXQgaXMgYW4gZW5kIHRhZywgdGhpcyBncm91cCB3aWxsIGhhdmUgdGhlICcvJy5cclxuXHRcdCAqIDIuIFRoZSB0YWcgbmFtZS5cclxuXHRcdCAqL1xyXG5cdFx0aHRtbFJlZ2V4IDogKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdGFnTmFtZVJlZ2V4ID0gL1swLTlhLXpBLVo6XSsvLFxyXG5cdFx0XHQgICAgYXR0ck5hbWVSZWdleCA9IC9bXlxcc1xcMFwiJz5cXC89XFx4MDEtXFx4MUZcXHg3Rl0rLywgICAvLyB0aGUgdW5pY29kZSByYW5nZSBhY2NvdW50cyBmb3IgZXhjbHVkaW5nIGNvbnRyb2wgY2hhcnMsIGFuZCB0aGUgZGVsZXRlIGNoYXJcclxuXHRcdFx0ICAgIGF0dHJWYWx1ZVJlZ2V4ID0gLyg/OlwiLio/XCJ8Jy4qPyd8W14nXCI9PD5gXFxzXSspLywgLy8gZG91YmxlIHF1b3RlZCwgc2luZ2xlIHF1b3RlZCwgb3IgdW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlc1xyXG5cdFx0XHQgICAgbmFtZUVxdWFsc1ZhbHVlUmVnZXggPSBhdHRyTmFtZVJlZ2V4LnNvdXJjZSArICcoPzpcXFxccyo9XFxcXHMqJyArIGF0dHJWYWx1ZVJlZ2V4LnNvdXJjZSArICcpPyc7ICAvLyBvcHRpb25hbCAnPVt2YWx1ZV0nXHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gbmV3IFJlZ0V4cCggW1xyXG5cdFx0XHRcdCc8KD86IXwoLykpPycsICAvLyBCZWdpbm5pbmcgb2YgYSB0YWcuIEVpdGhlciAnPCcgZm9yIGEgc3RhcnQgdGFnLCAnPC8nIGZvciBhbiBlbmQgdGFnLCBvciA8ISBmb3IgdGhlIDwhRE9DVFlQRSAuLi4+IHRhZy4gVGhlIHNsYXNoIG9yIGFuIGVtcHR5IHN0cmluZyBpcyBDYXB0dXJpbmcgR3JvdXAgMS5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vIFRoZSB0YWcgbmFtZSAoQ2FwdHVyaW5nIEdyb3VwIDIpXHJcblx0XHRcdFx0XHQnKCcgKyB0YWdOYW1lUmVnZXguc291cmNlICsgJyknLFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBaZXJvIG9yIG1vcmUgYXR0cmlidXRlcyBmb2xsb3dpbmcgdGhlIHRhZyBuYW1lXHJcblx0XHRcdFx0XHQnKD86JyxcclxuXHRcdFx0XHRcdFx0J1xcXFxzKycsICAvLyBvbmUgb3IgbW9yZSB3aGl0ZXNwYWNlIGNoYXJzIGJlZm9yZSBhbiBhdHRyaWJ1dGVcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdC8vIEVpdGhlcjpcclxuXHRcdFx0XHRcdFx0Ly8gQS4gdGFnPVwidmFsdWVcIiwgb3IgXHJcblx0XHRcdFx0XHRcdC8vIEIuIFwidmFsdWVcIiBhbG9uZSAoZm9yIDwhRE9DVFlQRT4gdGFnLiBFeDogPCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFN0cmljdC8vRU5cIiBcImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXN0cmljdC5kdGRcIj4pIFxyXG5cdFx0XHRcdFx0XHQnKD86JywgbmFtZUVxdWFsc1ZhbHVlUmVnZXgsICd8JywgYXR0clZhbHVlUmVnZXguc291cmNlICsgJyknLFxyXG5cdFx0XHRcdFx0JykqJyxcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0J1xcXFxzKi8/JywgIC8vIGFueSB0cmFpbGluZyBzcGFjZXMgYW5kIG9wdGlvbmFsICcvJyBiZWZvcmUgdGhlIGNsb3NpbmcgJz4nXHJcblx0XHRcdFx0Jz4nXHJcblx0XHRcdF0uam9pbiggXCJcIiApLCAnZycgKTtcclxuXHRcdH0gKSgpLFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogV2Fsa3MgYW4gSFRNTCBzdHJpbmcsIGNhbGxpbmcgdGhlIGBvcHRpb25zLnByb2Nlc3NIdG1sTm9kZWAgZnVuY3Rpb24gZm9yIGVhY2ggSFRNTCB0YWcgdGhhdCBpcyBlbmNvdW50ZXJlZCwgYW5kIGNhbGxpbmdcclxuXHRcdCAqIHRoZSBgb3B0aW9ucy5wcm9jZXNzVGV4dE5vZGVgIGZ1bmN0aW9uIHdoZW4gZWFjaCB0ZXh0IGFyb3VuZCBIVE1MIHRhZ3MgaXMgZW5jb3VudGVyZWQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBodG1sIFRoZSBIVE1MIHRvIHBhcnNlLlxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBBbiBPYmplY3QgKG1hcCkgd2hpY2ggbWF5IGNvbnRhaW4gdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5wcm9jZXNzSHRtbE5vZGVdIEEgdmlzaXRvciBmdW5jdGlvbiB3aGljaCBhbGxvd3MgcHJvY2Vzc2luZyBvZiBhbiBlbmNvdW50ZXJlZCBIVE1MIG5vZGUuXHJcblx0XHQgKiAgIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggdGhlIGZvbGxvd2luZyBhcmd1bWVudHM6XHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucHJvY2Vzc0h0bWxOb2RlLnRhZ1RleHRdIFRoZSBIVE1MIHRhZyB0ZXh0IHRoYXQgd2FzIGZvdW5kLlxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnByb2Nlc3NIdG1sTm9kZS50YWdOYW1lXSBUaGUgdGFnIG5hbWUgZm9yIHRoZSBIVE1MIHRhZyB0aGF0IHdhcyBmb3VuZC4gRXg6ICdhJyBmb3IgYW4gYW5jaG9yIHRhZy5cclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5wcm9jZXNzSHRtbE5vZGUuaXNDbG9zaW5nVGFnXSBgdHJ1ZWAgaWYgdGhlIHRhZyBpcyBhIGNsb3NpbmcgdGFnIChleDogJmx0Oy9hJmd0OyksIGBmYWxzZWAgb3RoZXJ3aXNlLlxyXG5cdFx0ICogIFxyXG5cdFx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucHJvY2Vzc1RleHROb2RlXSBBIHZpc2l0b3IgZnVuY3Rpb24gd2hpY2ggYWxsb3dzIHByb2Nlc3Npbmcgb2YgYW4gZW5jb3VudGVyZWQgdGV4dCBub2RlLlxyXG5cdFx0ICogICBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIHRoZSBmb2xsb3dpbmcgYXJndW1lbnRzOlxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnByb2Nlc3NUZXh0Tm9kZS50ZXh0XSBUaGUgdGV4dCBub2RlIHRoYXQgd2FzIG1hdGNoZWQuXHJcblx0XHQgKi9cclxuXHRcdHBhcnNlIDogZnVuY3Rpb24oIGh0bWwsIG9wdGlvbnMgKSB7XHJcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIHByb2Nlc3NIdG1sTm9kZVZpc2l0b3IgPSBvcHRpb25zLnByb2Nlc3NIdG1sTm9kZSB8fCBmdW5jdGlvbigpIHt9LFxyXG5cdFx0XHQgICAgcHJvY2Vzc1RleHROb2RlVmlzaXRvciA9IG9wdGlvbnMucHJvY2Vzc1RleHROb2RlIHx8IGZ1bmN0aW9uKCkge30sXHJcblx0XHRcdCAgICBodG1sUmVnZXggPSB0aGlzLmh0bWxSZWdleCxcclxuXHRcdFx0ICAgIGN1cnJlbnRSZXN1bHQsXHJcblx0XHRcdCAgICBsYXN0SW5kZXggPSAwO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gTG9vcCBvdmVyIHRoZSBIVE1MIHN0cmluZywgaWdub3JpbmcgSFRNTCB0YWdzLCBhbmQgcHJvY2Vzc2luZyB0aGUgdGV4dCB0aGF0IGxpZXMgYmV0d2VlbiB0aGVtLFxyXG5cdFx0XHQvLyB3cmFwcGluZyB0aGUgVVJMcyBpbiBhbmNob3IgdGFnc1xyXG5cdFx0XHR3aGlsZSggKCBjdXJyZW50UmVzdWx0ID0gaHRtbFJlZ2V4LmV4ZWMoIGh0bWwgKSApICE9PSBudWxsICkge1xyXG5cdFx0XHRcdHZhciB0YWdUZXh0ID0gY3VycmVudFJlc3VsdFsgMCBdLFxyXG5cdFx0XHRcdCAgICB0YWdOYW1lID0gY3VycmVudFJlc3VsdFsgMiBdLFxyXG5cdFx0XHRcdCAgICBpc0Nsb3NpbmdUYWcgPSAhIWN1cnJlbnRSZXN1bHRbIDEgXSxcclxuXHRcdFx0XHQgICAgaW5CZXR3ZWVuVGFnc1RleHQgPSBodG1sLnN1YnN0cmluZyggbGFzdEluZGV4LCBjdXJyZW50UmVzdWx0LmluZGV4ICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoIGluQmV0d2VlblRhZ3NUZXh0ICkge1xyXG5cdFx0XHRcdFx0cHJvY2Vzc1RleHROb2RlVmlzaXRvciggaW5CZXR3ZWVuVGFnc1RleHQgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0cHJvY2Vzc0h0bWxOb2RlVmlzaXRvciggdGFnVGV4dCwgdGFnTmFtZSwgaXNDbG9zaW5nVGFnICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGFzdEluZGV4ID0gY3VycmVudFJlc3VsdC5pbmRleCArIHRhZ1RleHQubGVuZ3RoO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHQvLyBQcm9jZXNzIGFueSByZW1haW5pbmcgdGV4dCBhZnRlciB0aGUgbGFzdCBIVE1MIGVsZW1lbnQuIFdpbGwgcHJvY2VzcyBhbGwgb2YgdGhlIHRleHQgaWYgdGhlcmUgd2VyZSBubyBIVE1MIGVsZW1lbnRzLlxyXG5cdFx0XHRpZiggbGFzdEluZGV4IDwgaHRtbC5sZW5ndGggKSB7XHJcblx0XHRcdFx0dmFyIHRleHQgPSBodG1sLnN1YnN0cmluZyggbGFzdEluZGV4ICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYoIHRleHQgKSB7XHJcblx0XHRcdFx0XHRwcm9jZXNzVGV4dE5vZGVWaXNpdG9yKCB0ZXh0ICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHR9ICk7XHJcblx0LypnbG9iYWwgQXV0b2xpbmtlciAqL1xyXG5cdC8qanNoaW50IGJvc3M6dHJ1ZSAqL1xyXG5cdC8qKlxyXG5cdCAqIEBjbGFzcyBBdXRvbGlua2VyLkh0bWxUYWdcclxuXHQgKiBAZXh0ZW5kcyBPYmplY3RcclxuXHQgKiBcclxuXHQgKiBSZXByZXNlbnRzIGFuIEhUTUwgdGFnLCB3aGljaCBjYW4gYmUgdXNlZCB0byBlYXNpbHkgYnVpbGQvbW9kaWZ5IEhUTUwgdGFncyBwcm9ncmFtbWF0aWNhbGx5LlxyXG5cdCAqIFxyXG5cdCAqIEF1dG9saW5rZXIgdXNlcyB0aGlzIGFic3RyYWN0aW9uIHRvIGNyZWF0ZSBIVE1MIHRhZ3MsIGFuZCB0aGVuIHdyaXRlIHRoZW0gb3V0IGFzIHN0cmluZ3MuIFlvdSBtYXkgYWxzbyB1c2VcclxuXHQgKiB0aGlzIGNsYXNzIGluIHlvdXIgY29kZSwgZXNwZWNpYWxseSB3aXRoaW4gYSB7QGxpbmsgQXV0b2xpbmtlciNyZXBsYWNlRm4gcmVwbGFjZUZufS5cclxuXHQgKiBcclxuXHQgKiAjIyBFeGFtcGxlc1xyXG5cdCAqIFxyXG5cdCAqIEV4YW1wbGUgaW5zdGFudGlhdGlvbjpcclxuXHQgKiBcclxuXHQgKiAgICAgdmFyIHRhZyA9IG5ldyBBdXRvbGlua2VyLkh0bWxUYWcoIHtcclxuXHQgKiAgICAgICAgIHRhZ05hbWUgOiAnYScsXHJcblx0ICogICAgICAgICBhdHRycyAgIDogeyAnaHJlZic6ICdodHRwOi8vZ29vZ2xlLmNvbScsICdjbGFzcyc6ICdleHRlcm5hbC1saW5rJyB9LFxyXG5cdCAqICAgICAgICAgaW5uZXJIdG1sIDogJ0dvb2dsZSdcclxuXHQgKiAgICAgfSApO1xyXG5cdCAqICAgICBcclxuXHQgKiAgICAgdGFnLnRvU3RyaW5nKCk7ICAvLyA8YSBocmVmPVwiaHR0cDovL2dvb2dsZS5jb21cIiBjbGFzcz1cImV4dGVybmFsLWxpbmtcIj5Hb29nbGU8L2E+XHJcblx0ICogICAgIFxyXG5cdCAqICAgICAvLyBJbmRpdmlkdWFsIGFjY2Vzc29yIG1ldGhvZHNcclxuXHQgKiAgICAgdGFnLmdldFRhZ05hbWUoKTsgICAgICAgICAgICAgICAgIC8vICdhJ1xyXG5cdCAqICAgICB0YWcuZ2V0QXR0ciggJ2hyZWYnICk7ICAgICAgICAgICAgLy8gJ2h0dHA6Ly9nb29nbGUuY29tJ1xyXG5cdCAqICAgICB0YWcuaGFzQ2xhc3MoICdleHRlcm5hbC1saW5rJyApOyAgLy8gdHJ1ZVxyXG5cdCAqIFxyXG5cdCAqIFxyXG5cdCAqIFVzaW5nIG11dGF0b3IgbWV0aG9kcyAod2hpY2ggbWF5IGJlIHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBpbnN0YW50aWF0aW9uIGNvbmZpZyBwcm9wZXJ0aWVzKTpcclxuXHQgKiBcclxuXHQgKiAgICAgdmFyIHRhZyA9IG5ldyBBdXRvbGlua2VyLkh0bWxUYWcoKTtcclxuXHQgKiAgICAgdGFnLnNldFRhZ05hbWUoICdhJyApO1xyXG5cdCAqICAgICB0YWcuc2V0QXR0ciggJ2hyZWYnLCAnaHR0cDovL2dvb2dsZS5jb20nICk7XHJcblx0ICogICAgIHRhZy5hZGRDbGFzcyggJ2V4dGVybmFsLWxpbmsnICk7XHJcblx0ICogICAgIHRhZy5zZXRJbm5lckh0bWwoICdHb29nbGUnICk7XHJcblx0ICogICAgIFxyXG5cdCAqICAgICB0YWcuZ2V0VGFnTmFtZSgpOyAgICAgICAgICAgICAgICAgLy8gJ2EnXHJcblx0ICogICAgIHRhZy5nZXRBdHRyKCAnaHJlZicgKTsgICAgICAgICAgICAvLyAnaHR0cDovL2dvb2dsZS5jb20nXHJcblx0ICogICAgIHRhZy5oYXNDbGFzcyggJ2V4dGVybmFsLWxpbmsnICk7ICAvLyB0cnVlXHJcblx0ICogICAgIFxyXG5cdCAqICAgICB0YWcudG9TdHJpbmcoKTsgIC8vIDxhIGhyZWY9XCJodHRwOi8vZ29vZ2xlLmNvbVwiIGNsYXNzPVwiZXh0ZXJuYWwtbGlua1wiPkdvb2dsZTwvYT5cclxuXHQgKiAgICAgXHJcblx0ICogXHJcblx0ICogIyMgRXhhbXBsZSB1c2Ugd2l0aGluIGEge0BsaW5rIEF1dG9saW5rZXIjcmVwbGFjZUZuIHJlcGxhY2VGbn1cclxuXHQgKiBcclxuXHQgKiAgICAgdmFyIGh0bWwgPSBBdXRvbGlua2VyLmxpbmsoIFwiVGVzdCBnb29nbGUuY29tXCIsIHtcclxuXHQgKiAgICAgICAgIHJlcGxhY2VGbiA6IGZ1bmN0aW9uKCBhdXRvbGlua2VyLCBtYXRjaCApIHtcclxuXHQgKiAgICAgICAgICAgICB2YXIgdGFnID0gYXV0b2xpbmtlci5nZXRUYWdCdWlsZGVyKCkuYnVpbGQoIG1hdGNoICk7ICAvLyByZXR1cm5zIGFuIHtAbGluayBBdXRvbGlua2VyLkh0bWxUYWd9IGluc3RhbmNlLCBjb25maWd1cmVkIHdpdGggdGhlIE1hdGNoJ3MgaHJlZiBhbmQgYW5jaG9yIHRleHRcclxuXHQgKiAgICAgICAgICAgICB0YWcuc2V0QXR0ciggJ3JlbCcsICdub2ZvbGxvdycgKTtcclxuXHQgKiAgICAgICAgICAgICBcclxuXHQgKiAgICAgICAgICAgICByZXR1cm4gdGFnO1xyXG5cdCAqICAgICAgICAgfVxyXG5cdCAqICAgICB9ICk7XHJcblx0ICogICAgIFxyXG5cdCAqICAgICAvLyBnZW5lcmF0ZWQgaHRtbDpcclxuXHQgKiAgICAgLy8gICBUZXN0IDxhIGhyZWY9XCJodHRwOi8vZ29vZ2xlLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vZm9sbG93XCI+Z29vZ2xlLmNvbTwvYT5cclxuXHQgKiAgICAgXHJcblx0ICogICAgIFxyXG5cdCAqICMjIEV4YW1wbGUgdXNlIHdpdGggYSBuZXcgdGFnIGZvciB0aGUgcmVwbGFjZW1lbnRcclxuXHQgKiBcclxuXHQgKiAgICAgdmFyIGh0bWwgPSBBdXRvbGlua2VyLmxpbmsoIFwiVGVzdCBnb29nbGUuY29tXCIsIHtcclxuXHQgKiAgICAgICAgIHJlcGxhY2VGbiA6IGZ1bmN0aW9uKCBhdXRvbGlua2VyLCBtYXRjaCApIHtcclxuXHQgKiAgICAgICAgICAgICB2YXIgdGFnID0gbmV3IEF1dG9saW5rZXIuSHRtbFRhZygge1xyXG5cdCAqICAgICAgICAgICAgICAgICB0YWdOYW1lIDogJ2J1dHRvbicsXHJcblx0ICogICAgICAgICAgICAgICAgIGF0dHJzICAgOiB7ICd0aXRsZSc6ICdMb2FkIFVSTDogJyArIG1hdGNoLmdldEFuY2hvckhyZWYoKSB9LFxyXG5cdCAqICAgICAgICAgICAgICAgICBpbm5lckh0bWwgOiAnTG9hZCBVUkw6ICcgKyBtYXRjaC5nZXRBbmNob3JUZXh0KClcclxuXHQgKiAgICAgICAgICAgICB9ICk7XHJcblx0ICogICAgICAgICAgICAgXHJcblx0ICogICAgICAgICAgICAgcmV0dXJuIHRhZztcclxuXHQgKiAgICAgICAgIH1cclxuXHQgKiAgICAgfSApO1xyXG5cdCAqICAgICBcclxuXHQgKiAgICAgLy8gZ2VuZXJhdGVkIGh0bWw6XHJcblx0ICogICAgIC8vICAgVGVzdCA8YnV0dG9uIHRpdGxlPVwiTG9hZCBVUkw6IGh0dHA6Ly9nb29nbGUuY29tXCI+TG9hZCBVUkw6IGdvb2dsZS5jb208L2J1dHRvbj5cclxuXHQgKi9cclxuXHRBdXRvbGlua2VyLkh0bWxUYWcgPSBBdXRvbGlua2VyLlV0aWwuZXh0ZW5kKCBPYmplY3QsIHtcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtTdHJpbmd9IHRhZ05hbWVcclxuXHRcdCAqIFxyXG5cdFx0ICogVGhlIHRhZyBuYW1lLiBFeDogJ2EnLCAnYnV0dG9uJywgZXRjLlxyXG5cdFx0ICogXHJcblx0XHQgKiBOb3QgcmVxdWlyZWQgYXQgaW5zdGFudGlhdGlvbiB0aW1lLCBidXQgc2hvdWxkIGJlIHNldCB1c2luZyB7QGxpbmsgI3NldFRhZ05hbWV9IGJlZm9yZSB7QGxpbmsgI3RvU3RyaW5nfVxyXG5cdFx0ICogaXMgZXhlY3V0ZWQuXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtPYmplY3QuPFN0cmluZywgU3RyaW5nPn0gYXR0cnNcclxuXHRcdCAqIFxyXG5cdFx0ICogQW4ga2V5L3ZhbHVlIE9iamVjdCAobWFwKSBvZiBhdHRyaWJ1dGVzIHRvIGNyZWF0ZSB0aGUgdGFnIHdpdGguIFRoZSBrZXlzIGFyZSB0aGUgYXR0cmlidXRlIG5hbWVzLCBhbmQgdGhlXHJcblx0XHQgKiB2YWx1ZXMgYXJlIHRoZSBhdHRyaWJ1dGUgdmFsdWVzLlxyXG5cdFx0ICovXHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQGNmZyB7U3RyaW5nfSBpbm5lckh0bWxcclxuXHRcdCAqIFxyXG5cdFx0ICogVGhlIGlubmVyIEhUTUwgZm9yIHRoZSB0YWcuIFxyXG5cdFx0ICogXHJcblx0XHQgKiBOb3RlIHRoZSBjYW1lbCBjYXNlIG5hbWUgb24gYGlubmVySHRtbGAuIEFjcm9ueW1zIGFyZSBjYW1lbENhc2VkIGluIHRoaXMgdXRpbGl0eSAoc3VjaCBhcyBub3QgdG8gcnVuIGludG8gdGhlIGFjcm9ueW0gXHJcblx0XHQgKiBuYW1pbmcgaW5jb25zaXN0ZW5jeSB0aGF0IHRoZSBET00gZGV2ZWxvcGVycyBjcmVhdGVkIHdpdGggYFhNTEh0dHBSZXF1ZXN0YCkuIFlvdSBtYXkgYWx0ZXJuYXRpdmVseSB1c2Uge0BsaW5rICNpbm5lckhUTUx9XHJcblx0XHQgKiBpZiB5b3UgcHJlZmVyLCBidXQgdGhpcyBvbmUgaXMgcmVjb21tZW5kZWQuXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtTdHJpbmd9IGlubmVySFRNTFxyXG5cdFx0ICogXHJcblx0XHQgKiBBbGlhcyBvZiB7QGxpbmsgI2lubmVySHRtbH0sIGFjY2VwdGVkIGZvciBjb25zaXN0ZW5jeSB3aXRoIHRoZSBicm93c2VyIERPTSBhcGksIGJ1dCBwcmVmZXIgdGhlIGNhbWVsQ2FzZWQgdmVyc2lvblxyXG5cdFx0ICogZm9yIGFjcm9ueW0gbmFtZXMuXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBwcm9wZXJ0eSB7UmVnRXhwfSB3aGl0ZXNwYWNlUmVnZXhcclxuXHRcdCAqIFxyXG5cdFx0ICogUmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gbWF0Y2ggd2hpdGVzcGFjZSBpbiBhIHN0cmluZyBvZiBDU1MgY2xhc3Nlcy5cclxuXHRcdCAqL1xyXG5cdFx0d2hpdGVzcGFjZVJlZ2V4IDogL1xccysvLFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQGNvbnN0cnVjdG9yXHJcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gW2NmZ10gVGhlIGNvbmZpZ3VyYXRpb24gcHJvcGVydGllcyBmb3IgdGhpcyBjbGFzcywgaW4gYW4gT2JqZWN0IChtYXApXHJcblx0XHQgKi9cclxuXHRcdGNvbnN0cnVjdG9yIDogZnVuY3Rpb24oIGNmZyApIHtcclxuXHRcdFx0QXV0b2xpbmtlci5VdGlsLmFzc2lnbiggdGhpcywgY2ZnICk7XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLmlubmVySHRtbCA9IHRoaXMuaW5uZXJIdG1sIHx8IHRoaXMuaW5uZXJIVE1MOyAgLy8gYWNjZXB0IGVpdGhlciB0aGUgY2FtZWxDYXNlZCBmb3JtIG9yIHRoZSBmdWxseSBjYXBpdGFsaXplZCBhY3JvbnltXHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyB0aGUgdGFnIG5hbWUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHRhZyB3aXRoLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gdGFnTmFtZVxyXG5cdFx0ICogQHJldHVybiB7QXV0b2xpbmtlci5IdG1sVGFnfSBUaGlzIEh0bWxUYWcgaW5zdGFuY2UsIHNvIHRoYXQgbWV0aG9kIGNhbGxzIG1heSBiZSBjaGFpbmVkLlxyXG5cdFx0ICovXHJcblx0XHRzZXRUYWdOYW1lIDogZnVuY3Rpb24oIHRhZ05hbWUgKSB7XHJcblx0XHRcdHRoaXMudGFnTmFtZSA9IHRhZ05hbWU7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIFJldHJpZXZlcyB0aGUgdGFnIG5hbWUuXHJcblx0XHQgKiBcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0VGFnTmFtZSA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50YWdOYW1lIHx8IFwiXCI7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyBhbiBhdHRyaWJ1dGUgb24gdGhlIEh0bWxUYWcuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyTmFtZSBUaGUgYXR0cmlidXRlIG5hbWUgdG8gc2V0LlxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IGF0dHJWYWx1ZSBUaGUgYXR0cmlidXRlIHZhbHVlIHRvIHNldC5cclxuXHRcdCAqIEByZXR1cm4ge0F1dG9saW5rZXIuSHRtbFRhZ30gVGhpcyBIdG1sVGFnIGluc3RhbmNlLCBzbyB0aGF0IG1ldGhvZCBjYWxscyBtYXkgYmUgY2hhaW5lZC5cclxuXHRcdCAqL1xyXG5cdFx0c2V0QXR0ciA6IGZ1bmN0aW9uKCBhdHRyTmFtZSwgYXR0clZhbHVlICkge1xyXG5cdFx0XHR2YXIgdGFnQXR0cnMgPSB0aGlzLmdldEF0dHJzKCk7XHJcblx0XHRcdHRhZ0F0dHJzWyBhdHRyTmFtZSBdID0gYXR0clZhbHVlO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0cmlldmVzIGFuIGF0dHJpYnV0ZSBmcm9tIHRoZSBIdG1sVGFnLiBJZiB0aGUgYXR0cmlidXRlIGRvZXMgbm90IGV4aXN0LCByZXR1cm5zIGB1bmRlZmluZWRgLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgYXR0cmlidXRlIG5hbWUgdG8gcmV0cmlldmUuXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBhdHRyaWJ1dGUncyB2YWx1ZSwgb3IgYHVuZGVmaW5lZGAgaWYgaXQgZG9lcyBub3QgZXhpc3Qgb24gdGhlIEh0bWxUYWcuXHJcblx0XHQgKi9cclxuXHRcdGdldEF0dHIgOiBmdW5jdGlvbiggYXR0ck5hbWUgKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJzKClbIGF0dHJOYW1lIF07XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyBvbmUgb3IgbW9yZSBhdHRyaWJ1dGVzIG9uIHRoZSBIdG1sVGFnLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge09iamVjdC48U3RyaW5nLCBTdHJpbmc+fSBhdHRycyBBIGtleS92YWx1ZSBPYmplY3QgKG1hcCkgb2YgdGhlIGF0dHJpYnV0ZXMgdG8gc2V0LlxyXG5cdFx0ICogQHJldHVybiB7QXV0b2xpbmtlci5IdG1sVGFnfSBUaGlzIEh0bWxUYWcgaW5zdGFuY2UsIHNvIHRoYXQgbWV0aG9kIGNhbGxzIG1heSBiZSBjaGFpbmVkLlxyXG5cdFx0ICovXHJcblx0XHRzZXRBdHRycyA6IGZ1bmN0aW9uKCBhdHRycyApIHtcclxuXHRcdFx0dmFyIHRhZ0F0dHJzID0gdGhpcy5nZXRBdHRycygpO1xyXG5cdFx0XHRBdXRvbGlua2VyLlV0aWwuYXNzaWduKCB0YWdBdHRycywgYXR0cnMgKTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIFJldHJpZXZlcyB0aGUgYXR0cmlidXRlcyBPYmplY3QgKG1hcCkgZm9yIHRoZSBIdG1sVGFnLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHtPYmplY3QuPFN0cmluZywgU3RyaW5nPn0gQSBrZXkvdmFsdWUgb2JqZWN0IG9mIHRoZSBhdHRyaWJ1dGVzIGZvciB0aGUgSHRtbFRhZy5cclxuXHRcdCAqL1xyXG5cdFx0Z2V0QXR0cnMgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYXR0cnMgfHwgKCB0aGlzLmF0dHJzID0ge30gKTtcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSBwcm92aWRlZCBgY3NzQ2xhc3NgLCBvdmVyd3JpdGluZyBhbnkgY3VycmVudCBDU1MgY2xhc3NlcyBvbiB0aGUgSHRtbFRhZy5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IGNzc0NsYXNzIE9uZSBvciBtb3JlIHNwYWNlLXNlcGFyYXRlZCBDU1MgY2xhc3NlcyB0byBzZXQgKG92ZXJ3cml0ZSkuXHJcblx0XHQgKiBAcmV0dXJuIHtBdXRvbGlua2VyLkh0bWxUYWd9IFRoaXMgSHRtbFRhZyBpbnN0YW5jZSwgc28gdGhhdCBtZXRob2QgY2FsbHMgbWF5IGJlIGNoYWluZWQuXHJcblx0XHQgKi9cclxuXHRcdHNldENsYXNzIDogZnVuY3Rpb24oIGNzc0NsYXNzICkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRBdHRyKCAnY2xhc3MnLCBjc3NDbGFzcyApO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIENvbnZlbmllbmNlIG1ldGhvZCB0byBhZGQgb25lIG9yIG1vcmUgQ1NTIGNsYXNzZXMgdG8gdGhlIEh0bWxUYWcuIFdpbGwgbm90IGFkZCBkdXBsaWNhdGUgQ1NTIGNsYXNzZXMuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBjc3NDbGFzcyBPbmUgb3IgbW9yZSBzcGFjZS1zZXBhcmF0ZWQgQ1NTIGNsYXNzZXMgdG8gYWRkLlxyXG5cdFx0ICogQHJldHVybiB7QXV0b2xpbmtlci5IdG1sVGFnfSBUaGlzIEh0bWxUYWcgaW5zdGFuY2UsIHNvIHRoYXQgbWV0aG9kIGNhbGxzIG1heSBiZSBjaGFpbmVkLlxyXG5cdFx0ICovXHJcblx0XHRhZGRDbGFzcyA6IGZ1bmN0aW9uKCBjc3NDbGFzcyApIHtcclxuXHRcdFx0dmFyIGNsYXNzQXR0ciA9IHRoaXMuZ2V0Q2xhc3MoKSxcclxuXHRcdFx0ICAgIHdoaXRlc3BhY2VSZWdleCA9IHRoaXMud2hpdGVzcGFjZVJlZ2V4LFxyXG5cdFx0XHQgICAgaW5kZXhPZiA9IEF1dG9saW5rZXIuVXRpbC5pbmRleE9mLCAgLy8gdG8gc3VwcG9ydCBJRTggYW5kIGJlbG93XHJcblx0XHRcdCAgICBjbGFzc2VzID0gKCAhY2xhc3NBdHRyICkgPyBbXSA6IGNsYXNzQXR0ci5zcGxpdCggd2hpdGVzcGFjZVJlZ2V4ICksXHJcblx0XHRcdCAgICBuZXdDbGFzc2VzID0gY3NzQ2xhc3Muc3BsaXQoIHdoaXRlc3BhY2VSZWdleCApLFxyXG5cdFx0XHQgICAgbmV3Q2xhc3M7XHJcblx0XHRcdFxyXG5cdFx0XHR3aGlsZSggbmV3Q2xhc3MgPSBuZXdDbGFzc2VzLnNoaWZ0KCkgKSB7XHJcblx0XHRcdFx0aWYoIGluZGV4T2YoIGNsYXNzZXMsIG5ld0NsYXNzICkgPT09IC0xICkge1xyXG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCBuZXdDbGFzcyApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5nZXRBdHRycygpWyAnY2xhc3MnIF0gPSBjbGFzc2VzLmpvaW4oIFwiIFwiICk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIENvbnZlbmllbmNlIG1ldGhvZCB0byByZW1vdmUgb25lIG9yIG1vcmUgQ1NTIGNsYXNzZXMgZnJvbSB0aGUgSHRtbFRhZy5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IGNzc0NsYXNzIE9uZSBvciBtb3JlIHNwYWNlLXNlcGFyYXRlZCBDU1MgY2xhc3NlcyB0byByZW1vdmUuXHJcblx0XHQgKiBAcmV0dXJuIHtBdXRvbGlua2VyLkh0bWxUYWd9IFRoaXMgSHRtbFRhZyBpbnN0YW5jZSwgc28gdGhhdCBtZXRob2QgY2FsbHMgbWF5IGJlIGNoYWluZWQuXHJcblx0XHQgKi9cclxuXHRcdHJlbW92ZUNsYXNzIDogZnVuY3Rpb24oIGNzc0NsYXNzICkge1xyXG5cdFx0XHR2YXIgY2xhc3NBdHRyID0gdGhpcy5nZXRDbGFzcygpLFxyXG5cdFx0XHQgICAgd2hpdGVzcGFjZVJlZ2V4ID0gdGhpcy53aGl0ZXNwYWNlUmVnZXgsXHJcblx0XHRcdCAgICBpbmRleE9mID0gQXV0b2xpbmtlci5VdGlsLmluZGV4T2YsICAvLyB0byBzdXBwb3J0IElFOCBhbmQgYmVsb3dcclxuXHRcdFx0ICAgIGNsYXNzZXMgPSAoICFjbGFzc0F0dHIgKSA/IFtdIDogY2xhc3NBdHRyLnNwbGl0KCB3aGl0ZXNwYWNlUmVnZXggKSxcclxuXHRcdFx0ICAgIHJlbW92ZUNsYXNzZXMgPSBjc3NDbGFzcy5zcGxpdCggd2hpdGVzcGFjZVJlZ2V4ICksXHJcblx0XHRcdCAgICByZW1vdmVDbGFzcztcclxuXHRcdFx0XHJcblx0XHRcdHdoaWxlKCBjbGFzc2VzLmxlbmd0aCAmJiAoIHJlbW92ZUNsYXNzID0gcmVtb3ZlQ2xhc3Nlcy5zaGlmdCgpICkgKSB7XHJcblx0XHRcdFx0dmFyIGlkeCA9IGluZGV4T2YoIGNsYXNzZXMsIHJlbW92ZUNsYXNzICk7XHJcblx0XHRcdFx0aWYoIGlkeCAhPT0gLTEgKSB7XHJcblx0XHRcdFx0XHRjbGFzc2VzLnNwbGljZSggaWR4LCAxICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLmdldEF0dHJzKClbICdjbGFzcycgXSA9IGNsYXNzZXMuam9pbiggXCIgXCIgKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHJldHJpZXZlIHRoZSBDU1MgY2xhc3MoZXMpIGZvciB0aGUgSHRtbFRhZywgd2hpY2ggd2lsbCBlYWNoIGJlIHNlcGFyYXRlZCBieSBzcGFjZXMgd2hlblxyXG5cdFx0ICogdGhlcmUgYXJlIG11bHRpcGxlLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGdldENsYXNzIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJzKClbICdjbGFzcycgXSB8fCBcIlwiO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIENvbnZlbmllbmNlIG1ldGhvZCB0byBjaGVjayBpZiB0aGUgdGFnIGhhcyBhIENTUyBjbGFzcyBvciBub3QuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBjc3NDbGFzcyBUaGUgQ1NTIGNsYXNzIHRvIGNoZWNrIGZvci5cclxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgSHRtbFRhZyBoYXMgdGhlIENTUyBjbGFzcywgYGZhbHNlYCBvdGhlcndpc2UuXHJcblx0XHQgKi9cclxuXHRcdGhhc0NsYXNzIDogZnVuY3Rpb24oIGNzc0NsYXNzICkge1xyXG5cdFx0XHRyZXR1cm4gKCAnICcgKyB0aGlzLmdldENsYXNzKCkgKyAnICcgKS5pbmRleE9mKCAnICcgKyBjc3NDbGFzcyArICcgJyApICE9PSAtMTtcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSBpbm5lciBIVE1MIGZvciB0aGUgdGFnLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gaHRtbCBUaGUgaW5uZXIgSFRNTCB0byBzZXQuXHJcblx0XHQgKiBAcmV0dXJuIHtBdXRvbGlua2VyLkh0bWxUYWd9IFRoaXMgSHRtbFRhZyBpbnN0YW5jZSwgc28gdGhhdCBtZXRob2QgY2FsbHMgbWF5IGJlIGNoYWluZWQuXHJcblx0XHQgKi9cclxuXHRcdHNldElubmVySHRtbCA6IGZ1bmN0aW9uKCBodG1sICkge1xyXG5cdFx0XHR0aGlzLmlubmVySHRtbCA9IGh0bWw7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXRyaWV2ZXMgdGhlIGlubmVyIEhUTUwgZm9yIHRoZSB0YWcuXHJcblx0XHQgKiBcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0SW5uZXJIdG1sIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmlubmVySHRtbCB8fCBcIlwiO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIE92ZXJyaWRlIG9mIHN1cGVyY2xhc3MgbWV0aG9kIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIEhUTUwgc3RyaW5nIGZvciB0aGUgdGFnLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdHRvU3RyaW5nIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB0YWdOYW1lID0gdGhpcy5nZXRUYWdOYW1lKCksXHJcblx0XHRcdCAgICBhdHRyc1N0ciA9IHRoaXMuYnVpbGRBdHRyc1N0cigpO1xyXG5cdFx0XHRcclxuXHRcdFx0YXR0cnNTdHIgPSAoIGF0dHJzU3RyICkgPyAnICcgKyBhdHRyc1N0ciA6ICcnOyAgLy8gcHJlcGVuZCBhIHNwYWNlIGlmIHRoZXJlIGFyZSBhY3R1YWxseSBhdHRyaWJ1dGVzXHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gWyAnPCcsIHRhZ05hbWUsIGF0dHJzU3RyLCAnPicsIHRoaXMuZ2V0SW5uZXJIdG1sKCksICc8LycsIHRhZ05hbWUsICc+JyBdLmpvaW4oIFwiXCIgKTtcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdXBwb3J0IG1ldGhvZCBmb3Ige0BsaW5rICN0b1N0cmluZ30sIHJldHVybnMgdGhlIHN0cmluZyBzcGFjZS1zZXBhcmF0ZWQga2V5PVwidmFsdWVcIiBwYWlycywgdXNlZCB0byBwb3B1bGF0ZSBcclxuXHRcdCAqIHRoZSBzdHJpbmdpZmllZCBIdG1sVGFnLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IEV4YW1wbGUgcmV0dXJuOiBgYXR0cjE9XCJ2YWx1ZTFcIiBhdHRyMj1cInZhbHVlMlwiYFxyXG5cdFx0ICovXHJcblx0XHRidWlsZEF0dHJzU3RyIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmKCAhdGhpcy5hdHRycyApIHJldHVybiBcIlwiOyAgLy8gbm8gYGF0dHJzYCBPYmplY3QgKG1hcCkgaGFzIGJlZW4gc2V0LCByZXR1cm4gZW1wdHkgc3RyaW5nXHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgYXR0cnMgPSB0aGlzLmdldEF0dHJzKCksXHJcblx0XHRcdCAgICBhdHRyc0FyciA9IFtdO1xyXG5cdFx0XHRcclxuXHRcdFx0Zm9yKCB2YXIgcHJvcCBpbiBhdHRycyApIHtcclxuXHRcdFx0XHRpZiggYXR0cnMuaGFzT3duUHJvcGVydHkoIHByb3AgKSApIHtcclxuXHRcdFx0XHRcdGF0dHJzQXJyLnB1c2goIHByb3AgKyAnPVwiJyArIGF0dHJzWyBwcm9wIF0gKyAnXCInICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBhdHRyc0Fyci5qb2luKCBcIiBcIiApO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSApO1xyXG5cdC8qZ2xvYmFsIEF1dG9saW5rZXIgKi9cclxuXHQvKmpzaGludCBzdWI6dHJ1ZSAqL1xyXG5cdC8qKlxyXG5cdCAqIEBwcm90ZWN0ZWRcclxuXHQgKiBAY2xhc3MgQXV0b2xpbmtlci5BbmNob3JUYWdCdWlsZGVyXHJcblx0ICogQGV4dGVuZHMgT2JqZWN0XHJcblx0ICogXHJcblx0ICogQnVpbGRzIGFuY2hvciAoJmx0O2EmZ3Q7KSB0YWdzIGZvciB0aGUgQXV0b2xpbmtlciB1dGlsaXR5IHdoZW4gYSBtYXRjaCBpcyBmb3VuZC5cclxuXHQgKiBcclxuXHQgKiBOb3JtYWxseSB0aGlzIGNsYXNzIGlzIGluc3RhbnRpYXRlZCwgY29uZmlndXJlZCwgYW5kIHVzZWQgaW50ZXJuYWxseSBieSBhbiB7QGxpbmsgQXV0b2xpbmtlcn0gaW5zdGFuY2UsIGJ1dCBtYXkgXHJcblx0ICogYWN0dWFsbHkgYmUgcmV0cmlldmVkIGluIGEge0BsaW5rIEF1dG9saW5rZXIjcmVwbGFjZUZuIHJlcGxhY2VGbn0gdG8gY3JlYXRlIHtAbGluayBBdXRvbGlua2VyLkh0bWxUYWcgSHRtbFRhZ30gaW5zdGFuY2VzXHJcblx0ICogd2hpY2ggbWF5IGJlIG1vZGlmaWVkIGJlZm9yZSByZXR1cm5pbmcgZnJvbSB0aGUge0BsaW5rIEF1dG9saW5rZXIjcmVwbGFjZUZuIHJlcGxhY2VGbn0uIEZvciBleGFtcGxlOlxyXG5cdCAqIFxyXG5cdCAqICAgICB2YXIgaHRtbCA9IEF1dG9saW5rZXIubGluayggXCJUZXN0IGdvb2dsZS5jb21cIiwge1xyXG5cdCAqICAgICAgICAgcmVwbGFjZUZuIDogZnVuY3Rpb24oIGF1dG9saW5rZXIsIG1hdGNoICkge1xyXG5cdCAqICAgICAgICAgICAgIHZhciB0YWcgPSBhdXRvbGlua2VyLmdldFRhZ0J1aWxkZXIoKS5idWlsZCggbWF0Y2ggKTsgIC8vIHJldHVybnMgYW4ge0BsaW5rIEF1dG9saW5rZXIuSHRtbFRhZ30gaW5zdGFuY2VcclxuXHQgKiAgICAgICAgICAgICB0YWcuc2V0QXR0ciggJ3JlbCcsICdub2ZvbGxvdycgKTtcclxuXHQgKiAgICAgICAgICAgICBcclxuXHQgKiAgICAgICAgICAgICByZXR1cm4gdGFnO1xyXG5cdCAqICAgICAgICAgfVxyXG5cdCAqICAgICB9ICk7XHJcblx0ICogICAgIFxyXG5cdCAqICAgICAvLyBnZW5lcmF0ZWQgaHRtbDpcclxuXHQgKiAgICAgLy8gICBUZXN0IDxhIGhyZWY9XCJodHRwOi8vZ29vZ2xlLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vZm9sbG93XCI+Z29vZ2xlLmNvbTwvYT5cclxuXHQgKi9cclxuXHRBdXRvbGlua2VyLkFuY2hvclRhZ0J1aWxkZXIgPSBBdXRvbGlua2VyLlV0aWwuZXh0ZW5kKCBPYmplY3QsIHtcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtCb29sZWFufSBuZXdXaW5kb3dcclxuXHRcdCAqIEBpbmhlcml0ZG9jIEF1dG9saW5rZXIjbmV3V2luZG93XHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtOdW1iZXJ9IHRydW5jYXRlXHJcblx0XHQgKiBAaW5oZXJpdGRvYyBBdXRvbGlua2VyI3RydW5jYXRlXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtTdHJpbmd9IGNsYXNzTmFtZVxyXG5cdFx0ICogQGluaGVyaXRkb2MgQXV0b2xpbmtlciNjbGFzc05hbWVcclxuXHRcdCAqL1xyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQGNvbnN0cnVjdG9yXHJcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gW2NmZ10gVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIEFuY2hvclRhZ0J1aWxkZXIgaW5zdGFuY2UsIHNwZWNpZmllZCBpbiBhbiBPYmplY3QgKG1hcCkuXHJcblx0XHQgKi9cclxuXHRcdGNvbnN0cnVjdG9yIDogZnVuY3Rpb24oIGNmZyApIHtcclxuXHRcdFx0QXV0b2xpbmtlci5VdGlsLmFzc2lnbiggdGhpcywgY2ZnICk7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogR2VuZXJhdGVzIHRoZSBhY3R1YWwgYW5jaG9yICgmbHQ7YSZndDspIHRhZyB0byB1c2UgaW4gcGxhY2Ugb2YgdGhlIG1hdGNoZWQgVVJML2VtYWlsL1R3aXR0ZXIgdGV4dCxcclxuXHRcdCAqIHZpYSBpdHMgYG1hdGNoYCBvYmplY3QuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwYXJhbSB7QXV0b2xpbmtlci5tYXRjaC5NYXRjaH0gbWF0Y2ggVGhlIE1hdGNoIGluc3RhbmNlIHRvIGdlbmVyYXRlIGFuIGFuY2hvciB0YWcgZnJvbS5cclxuXHRcdCAqIEByZXR1cm4ge0F1dG9saW5rZXIuSHRtbFRhZ30gVGhlIEh0bWxUYWcgaW5zdGFuY2UgZm9yIHRoZSBhbmNob3IgdGFnLlxyXG5cdFx0ICovXHJcblx0XHRidWlsZCA6IGZ1bmN0aW9uKCBtYXRjaCApIHtcclxuXHRcdFx0dmFyIHRhZyA9IG5ldyBBdXRvbGlua2VyLkh0bWxUYWcoIHtcclxuXHRcdFx0XHR0YWdOYW1lICAgOiAnYScsXHJcblx0XHRcdFx0YXR0cnMgICAgIDogdGhpcy5jcmVhdGVBdHRycyggbWF0Y2guZ2V0VHlwZSgpLCBtYXRjaC5nZXRBbmNob3JIcmVmKCkgKSxcclxuXHRcdFx0XHRpbm5lckh0bWwgOiB0aGlzLnByb2Nlc3NBbmNob3JUZXh0KCBtYXRjaC5nZXRBbmNob3JUZXh0KCkgKVxyXG5cdFx0XHR9ICk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGFnO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgdGhlIE9iamVjdCAobWFwKSBvZiB0aGUgSFRNTCBhdHRyaWJ1dGVzIGZvciB0aGUgYW5jaG9yICgmbHQ7YSZndDspIHRhZyBiZWluZyBnZW5lcmF0ZWQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBwcm90ZWN0ZWRcclxuXHRcdCAqIEBwYXJhbSB7XCJ1cmxcIi9cImVtYWlsXCIvXCJ0d2l0dGVyXCJ9IG1hdGNoVHlwZSBUaGUgdHlwZSBvZiBtYXRjaCB0aGF0IGFuIGFuY2hvciB0YWcgaXMgYmVpbmcgZ2VuZXJhdGVkIGZvci5cclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBocmVmIFRoZSBocmVmIGZvciB0aGUgYW5jaG9yIHRhZy5cclxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gQSBrZXkvdmFsdWUgT2JqZWN0IChtYXApIG9mIHRoZSBhbmNob3IgdGFnJ3MgYXR0cmlidXRlcy4gXHJcblx0XHQgKi9cclxuXHRcdGNyZWF0ZUF0dHJzIDogZnVuY3Rpb24oIG1hdGNoVHlwZSwgYW5jaG9ySHJlZiApIHtcclxuXHRcdFx0dmFyIGF0dHJzID0ge1xyXG5cdFx0XHRcdCdocmVmJyA6IGFuY2hvckhyZWYgIC8vIHdlJ2xsIGFsd2F5cyBoYXZlIHRoZSBgaHJlZmAgYXR0cmlidXRlXHJcblx0XHRcdH07XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgY3NzQ2xhc3MgPSB0aGlzLmNyZWF0ZUNzc0NsYXNzKCBtYXRjaFR5cGUgKTtcclxuXHRcdFx0aWYoIGNzc0NsYXNzICkge1xyXG5cdFx0XHRcdGF0dHJzWyAnY2xhc3MnIF0gPSBjc3NDbGFzcztcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiggdGhpcy5uZXdXaW5kb3cgKSB7XHJcblx0XHRcdFx0YXR0cnNbICd0YXJnZXQnIF0gPSBcIl9ibGFua1wiO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gYXR0cnM7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQ3JlYXRlcyB0aGUgQ1NTIGNsYXNzIHRoYXQgd2lsbCBiZSB1c2VkIGZvciBhIGdpdmVuIGFuY2hvciB0YWcsIGJhc2VkIG9uIHRoZSBgbWF0Y2hUeXBlYCBhbmQgdGhlIHtAbGluayAjY2xhc3NOYW1lfVxyXG5cdFx0ICogY29uZmlnLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHBhcmFtIHtcInVybFwiL1wiZW1haWxcIi9cInR3aXR0ZXJcIn0gbWF0Y2hUeXBlIFRoZSB0eXBlIG9mIG1hdGNoIHRoYXQgYW4gYW5jaG9yIHRhZyBpcyBiZWluZyBnZW5lcmF0ZWQgZm9yLlxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgQ1NTIGNsYXNzIHN0cmluZyBmb3IgdGhlIGxpbmsuIEV4YW1wbGUgcmV0dXJuOiBcIm15TGluayBteUxpbmstdXJsXCIuIElmIG5vIHtAbGluayAjY2xhc3NOYW1lfVxyXG5cdFx0ICogICB3YXMgY29uZmlndXJlZCwgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcuXHJcblx0XHQgKi9cclxuXHRcdGNyZWF0ZUNzc0NsYXNzIDogZnVuY3Rpb24oIG1hdGNoVHlwZSApIHtcclxuXHRcdFx0dmFyIGNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoICFjbGFzc05hbWUgKSBcclxuXHRcdFx0XHRyZXR1cm4gXCJcIjtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiBjbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZSArIFwiLVwiICsgbWF0Y2hUeXBlOyAgLy8gZXg6IFwibXlMaW5rIG15TGluay11cmxcIiwgXCJteUxpbmsgbXlMaW5rLWVtYWlsXCIsIG9yIFwibXlMaW5rIG15TGluay10d2l0dGVyXCJcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBQcm9jZXNzZXMgdGhlIGBhbmNob3JUZXh0YCBieSB0cnVuY2F0aW5nIHRoZSB0ZXh0IGFjY29yZGluZyB0byB0aGUge0BsaW5rICN0cnVuY2F0ZX0gY29uZmlnLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IGFuY2hvclRleHQgVGhlIGFuY2hvciB0YWcncyB0ZXh0IChpLmUuIHdoYXQgd2lsbCBiZSBkaXNwbGF5ZWQpLlxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgcHJvY2Vzc2VkIGBhbmNob3JUZXh0YC5cclxuXHRcdCAqL1xyXG5cdFx0cHJvY2Vzc0FuY2hvclRleHQgOiBmdW5jdGlvbiggYW5jaG9yVGV4dCApIHtcclxuXHRcdFx0YW5jaG9yVGV4dCA9IHRoaXMuZG9UcnVuY2F0ZSggYW5jaG9yVGV4dCApO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGFuY2hvclRleHQ7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUGVyZm9ybXMgdGhlIHRydW5jYXRpb24gb2YgdGhlIGBhbmNob3JUZXh0YCwgaWYgdGhlIGBhbmNob3JUZXh0YCBpcyBsb25nZXIgdGhhbiB0aGUge0BsaW5rICN0cnVuY2F0ZX0gb3B0aW9uLlxyXG5cdFx0ICogVHJ1bmNhdGVzIHRoZSB0ZXh0IHRvIDIgY2hhcmFjdGVycyBmZXdlciB0aGFuIHRoZSB7QGxpbmsgI3RydW5jYXRlfSBvcHRpb24sIGFuZCBhZGRzIFwiLi5cIiB0byB0aGUgZW5kLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIGFuY2hvciB0YWcncyB0ZXh0IChpLmUuIHdoYXQgd2lsbCBiZSBkaXNwbGF5ZWQpLlxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSBUaGUgdHJ1bmNhdGVkIGFuY2hvciB0ZXh0LlxyXG5cdFx0ICovXHJcblx0XHRkb1RydW5jYXRlIDogZnVuY3Rpb24oIGFuY2hvclRleHQgKSB7XHJcblx0XHRcdHJldHVybiBBdXRvbGlua2VyLlV0aWwuZWxsaXBzaXMoIGFuY2hvclRleHQsIHRoaXMudHJ1bmNhdGUgfHwgTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZICk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9ICk7XHJcblx0LypnbG9iYWwgQXV0b2xpbmtlciAqL1xyXG5cdC8qKlxyXG5cdCAqIEBhYnN0cmFjdFxyXG5cdCAqIEBjbGFzcyBBdXRvbGlua2VyLm1hdGNoLk1hdGNoXHJcblx0ICogXHJcblx0ICogUmVwcmVzZW50cyBhIG1hdGNoIGZvdW5kIGluIGFuIGlucHV0IHN0cmluZyB3aGljaCBzaG91bGQgYmUgQXV0b2xpbmtlZC4gQSBNYXRjaCBvYmplY3QgaXMgd2hhdCBpcyBwcm92aWRlZCBpbiBhIFxyXG5cdCAqIHtAbGluayBBdXRvbGlua2VyI3JlcGxhY2VGbiByZXBsYWNlRm59LCBhbmQgbWF5IGJlIHVzZWQgdG8gcXVlcnkgZm9yIGRldGFpbHMgYWJvdXQgdGhlIG1hdGNoLlxyXG5cdCAqIFxyXG5cdCAqIEZvciBleGFtcGxlOlxyXG5cdCAqIFxyXG5cdCAqICAgICB2YXIgaW5wdXQgPSBcIi4uLlwiOyAgLy8gc3RyaW5nIHdpdGggVVJMcywgRW1haWwgQWRkcmVzc2VzLCBhbmQgVHdpdHRlciBIYW5kbGVzXHJcblx0ICogICAgIFxyXG5cdCAqICAgICB2YXIgbGlua2VkVGV4dCA9IEF1dG9saW5rZXIubGluayggaW5wdXQsIHtcclxuXHQgKiAgICAgICAgIHJlcGxhY2VGbiA6IGZ1bmN0aW9uKCBhdXRvbGlua2VyLCBtYXRjaCApIHtcclxuXHQgKiAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJocmVmID0gXCIsIG1hdGNoLmdldEFuY2hvckhyZWYoKSApO1xyXG5cdCAqICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcInRleHQgPSBcIiwgbWF0Y2guZ2V0QW5jaG9yVGV4dCgpICk7XHJcblx0ICogICAgICAgICBcclxuXHQgKiAgICAgICAgICAgICBzd2l0Y2goIG1hdGNoLmdldFR5cGUoKSApIHtcclxuXHQgKiAgICAgICAgICAgICAgICAgY2FzZSAndXJsJyA6IFxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwidXJsOiBcIiwgbWF0Y2guZ2V0VXJsKCkgKTtcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgIFxyXG5cdCAqICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCcgOlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwiZW1haWw6IFwiLCBtYXRjaC5nZXRFbWFpbCgpICk7XHJcblx0ICogICAgICAgICAgICAgICAgICAgICBcclxuXHQgKiAgICAgICAgICAgICAgICAgY2FzZSAndHdpdHRlcicgOlxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwidHdpdHRlcjogXCIsIG1hdGNoLmdldFR3aXR0ZXJIYW5kbGUoKSApO1xyXG5cdCAqICAgICAgICAgICAgIH1cclxuXHQgKiAgICAgICAgIH1cclxuXHQgKiAgICAgfSApO1xyXG5cdCAqICAgICBcclxuXHQgKiBTZWUgdGhlIHtAbGluayBBdXRvbGlua2VyfSBjbGFzcyBmb3IgbW9yZSBkZXRhaWxzIG9uIHVzaW5nIHRoZSB7QGxpbmsgQXV0b2xpbmtlciNyZXBsYWNlRm4gcmVwbGFjZUZufS5cclxuXHQgKi9cclxuXHRBdXRvbGlua2VyLm1hdGNoLk1hdGNoID0gQXV0b2xpbmtlci5VdGlsLmV4dGVuZCggT2JqZWN0LCB7XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQGNmZyB7U3RyaW5nfSBtYXRjaGVkVGV4dCAocmVxdWlyZWQpXHJcblx0XHQgKiBcclxuXHRcdCAqIFRoZSBvcmlnaW5hbCB0ZXh0IHRoYXQgd2FzIG1hdGNoZWQuXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBjb25zdHJ1Y3RvclxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGNmZyBUaGUgY29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIGZvciB0aGUgTWF0Y2ggaW5zdGFuY2UsIHNwZWNpZmllZCBpbiBhbiBPYmplY3QgKG1hcCkuXHJcblx0XHQgKi9cclxuXHRcdGNvbnN0cnVjdG9yIDogZnVuY3Rpb24oIGNmZyApIHtcclxuXHRcdFx0QXV0b2xpbmtlci5VdGlsLmFzc2lnbiggdGhpcywgY2ZnICk7XHJcblx0XHR9LFxyXG5cdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgYSBzdHJpbmcgbmFtZSBmb3IgdGhlIHR5cGUgb2YgbWF0Y2ggdGhhdCB0aGlzIGNsYXNzIHJlcHJlc2VudHMuXHJcblx0XHQgKiBcclxuXHRcdCAqIEBhYnN0cmFjdFxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxyXG5cdFx0ICovXHJcblx0XHRnZXRUeXBlIDogQXV0b2xpbmtlci5VdGlsLmFic3RyYWN0TWV0aG9kLFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUgb3JpZ2luYWwgdGV4dCB0aGF0IHdhcyBtYXRjaGVkLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGdldE1hdGNoZWRUZXh0IDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1hdGNoZWRUZXh0O1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIHRoZSBhbmNob3IgaHJlZiB0aGF0IHNob3VsZCBiZSBnZW5lcmF0ZWQgZm9yIHRoZSBtYXRjaC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQGFic3RyYWN0XHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGdldEFuY2hvckhyZWYgOiBBdXRvbGlua2VyLlV0aWwuYWJzdHJhY3RNZXRob2QsXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIHRoZSBhbmNob3IgdGV4dCB0aGF0IHNob3VsZCBiZSBnZW5lcmF0ZWQgZm9yIHRoZSBtYXRjaC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQGFic3RyYWN0XHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGdldEFuY2hvclRleHQgOiBBdXRvbGlua2VyLlV0aWwuYWJzdHJhY3RNZXRob2RcclxuXHRcclxuXHR9ICk7XHJcblx0LypnbG9iYWwgQXV0b2xpbmtlciAqL1xyXG5cdC8qKlxyXG5cdCAqIEBjbGFzcyBBdXRvbGlua2VyLm1hdGNoLkVtYWlsXHJcblx0ICogQGV4dGVuZHMgQXV0b2xpbmtlci5tYXRjaC5NYXRjaFxyXG5cdCAqIFxyXG5cdCAqIFJlcHJlc2VudHMgYSBFbWFpbCBtYXRjaCBmb3VuZCBpbiBhbiBpbnB1dCBzdHJpbmcgd2hpY2ggc2hvdWxkIGJlIEF1dG9saW5rZWQuXHJcblx0ICogXHJcblx0ICogU2VlIHRoaXMgY2xhc3MncyBzdXBlcmNsYXNzICh7QGxpbmsgQXV0b2xpbmtlci5tYXRjaC5NYXRjaH0pIGZvciBtb3JlIGRldGFpbHMuXHJcblx0ICovXHJcblx0QXV0b2xpbmtlci5tYXRjaC5FbWFpbCA9IEF1dG9saW5rZXIuVXRpbC5leHRlbmQoIEF1dG9saW5rZXIubWF0Y2guTWF0Y2gsIHtcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtTdHJpbmd9IGVtYWlsIChyZXF1aXJlZClcclxuXHRcdCAqIFxyXG5cdFx0ICogVGhlIGVtYWlsIGFkZHJlc3MgdGhhdCB3YXMgbWF0Y2hlZC5cclxuXHRcdCAqL1xyXG5cdFx0XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgYSBzdHJpbmcgbmFtZSBmb3IgdGhlIHR5cGUgb2YgbWF0Y2ggdGhhdCB0aGlzIGNsYXNzIHJlcHJlc2VudHMuXHJcblx0XHQgKiBcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0VHlwZSA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gJ2VtYWlsJztcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIHRoZSBlbWFpbCBhZGRyZXNzIHRoYXQgd2FzIG1hdGNoZWQuXHJcblx0XHQgKiBcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0RW1haWwgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZW1haWw7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgdGhlIGFuY2hvciBocmVmIHRoYXQgc2hvdWxkIGJlIGdlbmVyYXRlZCBmb3IgdGhlIG1hdGNoLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGdldEFuY2hvckhyZWYgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuICdtYWlsdG86JyArIHRoaXMuZW1haWw7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUgYW5jaG9yIHRleHQgdGhhdCBzaG91bGQgYmUgZ2VuZXJhdGVkIGZvciB0aGUgbWF0Y2guXHJcblx0XHQgKiBcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0QW5jaG9yVGV4dCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5lbWFpbDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH0gKTtcclxuXHQvKmdsb2JhbCBBdXRvbGlua2VyICovXHJcblx0LyoqXHJcblx0ICogQGNsYXNzIEF1dG9saW5rZXIubWF0Y2guVHdpdHRlclxyXG5cdCAqIEBleHRlbmRzIEF1dG9saW5rZXIubWF0Y2guTWF0Y2hcclxuXHQgKiBcclxuXHQgKiBSZXByZXNlbnRzIGEgVHdpdHRlciBtYXRjaCBmb3VuZCBpbiBhbiBpbnB1dCBzdHJpbmcgd2hpY2ggc2hvdWxkIGJlIEF1dG9saW5rZWQuXHJcblx0ICogXHJcblx0ICogU2VlIHRoaXMgY2xhc3MncyBzdXBlcmNsYXNzICh7QGxpbmsgQXV0b2xpbmtlci5tYXRjaC5NYXRjaH0pIGZvciBtb3JlIGRldGFpbHMuXHJcblx0ICovXHJcblx0QXV0b2xpbmtlci5tYXRjaC5Ud2l0dGVyID0gQXV0b2xpbmtlci5VdGlsLmV4dGVuZCggQXV0b2xpbmtlci5tYXRjaC5NYXRjaCwge1xyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBjZmcge1N0cmluZ30gdHdpdHRlckhhbmRsZSAocmVxdWlyZWQpXHJcblx0XHQgKiBcclxuXHRcdCAqIFRoZSBUd2l0dGVyIGhhbmRsZSB0aGF0IHdhcyBtYXRjaGVkLlxyXG5cdFx0ICovXHJcblx0XHRcclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUgdHlwZSBvZiBtYXRjaCB0aGF0IHRoaXMgY2xhc3MgcmVwcmVzZW50cy5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxyXG5cdFx0ICovXHJcblx0XHRnZXRUeXBlIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiAndHdpdHRlcic7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyBhIHN0cmluZyBuYW1lIGZvciB0aGUgdHlwZSBvZiBtYXRjaCB0aGF0IHRoaXMgY2xhc3MgcmVwcmVzZW50cy5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxyXG5cdFx0ICovXHJcblx0XHRnZXRUd2l0dGVySGFuZGxlIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnR3aXR0ZXJIYW5kbGU7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgdGhlIGFuY2hvciBocmVmIHRoYXQgc2hvdWxkIGJlIGdlbmVyYXRlZCBmb3IgdGhlIG1hdGNoLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGdldEFuY2hvckhyZWYgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuICdodHRwczovL3R3aXR0ZXIuY29tLycgKyB0aGlzLnR3aXR0ZXJIYW5kbGU7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUgYW5jaG9yIHRleHQgdGhhdCBzaG91bGQgYmUgZ2VuZXJhdGVkIGZvciB0aGUgbWF0Y2guXHJcblx0XHQgKiBcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0QW5jaG9yVGV4dCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gJ0AnICsgdGhpcy50d2l0dGVySGFuZGxlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSApO1xyXG5cdC8qZ2xvYmFsIEF1dG9saW5rZXIgKi9cclxuXHQvKipcclxuXHQgKiBAY2xhc3MgQXV0b2xpbmtlci5tYXRjaC5VcmxcclxuXHQgKiBAZXh0ZW5kcyBBdXRvbGlua2VyLm1hdGNoLk1hdGNoXHJcblx0ICogXHJcblx0ICogUmVwcmVzZW50cyBhIFVybCBtYXRjaCBmb3VuZCBpbiBhbiBpbnB1dCBzdHJpbmcgd2hpY2ggc2hvdWxkIGJlIEF1dG9saW5rZWQuXHJcblx0ICogXHJcblx0ICogU2VlIHRoaXMgY2xhc3MncyBzdXBlcmNsYXNzICh7QGxpbmsgQXV0b2xpbmtlci5tYXRjaC5NYXRjaH0pIGZvciBtb3JlIGRldGFpbHMuXHJcblx0ICovXHJcblx0QXV0b2xpbmtlci5tYXRjaC5VcmwgPSBBdXRvbGlua2VyLlV0aWwuZXh0ZW5kKCBBdXRvbGlua2VyLm1hdGNoLk1hdGNoLCB7XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQGNmZyB7U3RyaW5nfSB1cmwgKHJlcXVpcmVkKVxyXG5cdFx0ICogXHJcblx0XHQgKiBUaGUgdXJsIHRoYXQgd2FzIG1hdGNoZWQuXHJcblx0XHQgKi9cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAY2ZnIHtCb29sZWFufSBwcm90b2NvbFJlbGF0aXZlTWF0Y2ggKHJlcXVpcmVkKVxyXG5cdFx0ICogXHJcblx0XHQgKiBgdHJ1ZWAgaWYgdGhlIFVSTCBpcyBhIHByb3RvY29sLXJlbGF0aXZlIG1hdGNoLiBBIHByb3RvY29sLXJlbGF0aXZlIG1hdGNoIGlzIGEgVVJMIHRoYXQgc3RhcnRzIHdpdGggJy8vJyxcclxuXHRcdCAqIGFuZCB3aWxsIGJlIGVpdGhlciBodHRwOi8vIG9yIGh0dHBzOi8vIGJhc2VkIG9uIHRoZSBwcm90b2NvbCB0aGF0IHRoZSBzaXRlIGlzIGxvYWRlZCB1bmRlci5cclxuXHRcdCAqL1xyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIEBjZmcge0Jvb2xlYW59IHN0cmlwUHJlZml4IChyZXF1aXJlZClcclxuXHRcdCAqIEBpbmhlcml0ZG9jIHtAbGluayBBdXRvbGlua2VyI3N0cmlwUHJlZml4fVxyXG5cdFx0ICovXHJcblx0XHRcclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqIEBwcm9wZXJ0eSB7UmVnRXhwfSB1cmxQcmVmaXhSZWdleFxyXG5cdFx0ICogXHJcblx0XHQgKiBBIHJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHJlbW92ZSB0aGUgJ2h0dHA6Ly8nIG9yICdodHRwczovLycgYW5kL29yIHRoZSAnd3d3LicgZnJvbSBVUkxzLlxyXG5cdFx0ICovXHJcblx0XHR1cmxQcmVmaXhSZWdleDogL14oaHR0cHM/OlxcL1xcLyk/KHd3d1xcLik/L2ksXHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqIEBwcm9wZXJ0eSB7UmVnRXhwfSBwcm90b2NvbFJlbGF0aXZlUmVnZXhcclxuXHRcdCAqIFxyXG5cdFx0ICogVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIHJlbW92ZSB0aGUgcHJvdG9jb2wtcmVsYXRpdmUgJy8vJyBmcm9tIHRoZSB7QGxpbmsgI3VybH0gc3RyaW5nLCBmb3IgcHVycG9zZXNcclxuXHRcdCAqIG9mIHtAbGluayAjZ2V0QW5jaG9yVGV4dH0uIEEgcHJvdG9jb2wtcmVsYXRpdmUgVVJMIGlzLCBmb3IgZXhhbXBsZSwgXCIvL3lhaG9vLmNvbVwiXHJcblx0XHQgKi9cclxuXHRcdHByb3RvY29sUmVsYXRpdmVSZWdleCA6IC9eXFwvXFwvLyxcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBAcHJvdGVjdGVkXHJcblx0XHQgKiBAcHJvcGVydHkge1JlZ0V4cH0gY2hlY2tGb3JQcm90b2NvbFJlZ2V4XHJcblx0XHQgKiBcclxuXHRcdCAqIEEgcmVndWxhciBleHByZXNzaW9uIHVzZWQgdG8gY2hlY2sgaWYgdGhlIHtAbGluayAjdXJsfSBpcyBtaXNzaW5nIGEgcHJvdG9jb2wgKGluIHdoaWNoIGNhc2UsICdodHRwOi8vJ1xyXG5cdFx0ICogd2lsbCBiZSBhZGRlZCkuXHJcblx0XHQgKi9cclxuXHRcdGNoZWNrRm9yUHJvdG9jb2xSZWdleDogL15bQS1aYS16XXszLDl9Oi8sXHJcblx0XHRcclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyBhIHN0cmluZyBuYW1lIGZvciB0aGUgdHlwZSBvZiBtYXRjaCB0aGF0IHRoaXMgY2xhc3MgcmVwcmVzZW50cy5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxyXG5cdFx0ICovXHJcblx0XHRnZXRUeXBlIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiAndXJsJztcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIHRoZSB1cmwgdGhhdCB3YXMgbWF0Y2hlZCwgYXNzdW1pbmcgdGhlIHByb3RvY29sIHRvIGJlICdodHRwOi8vJyBpZiB0aGUgbWF0Y2hcclxuXHRcdCAqIHdhcyBtaXNzaW5nIGEgcHJvdG9jb2wuXHJcblx0XHQgKiBcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0VXJsIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciB1cmwgPSB0aGlzLnVybDtcclxuXHRcdFx0XHJcblx0XHRcdC8vIGlmIHRoZSB1cmwgc3RyaW5nIGRvZXNuJ3QgYmVnaW4gd2l0aCBhIHByb3RvY29sLCBhc3N1bWUgaHR0cDovL1xyXG5cdFx0XHRpZiggIXRoaXMucHJvdG9jb2xSZWxhdGl2ZU1hdGNoICYmICF0aGlzLmNoZWNrRm9yUHJvdG9jb2xSZWdleC50ZXN0KCB1cmwgKSApIHtcclxuXHRcdFx0XHR1cmwgPSB0aGlzLnVybCA9ICdodHRwOi8vJyArIHVybDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHVybDtcclxuXHRcdH0sXHJcblx0XHRcclxuXHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUgYW5jaG9yIGhyZWYgdGhhdCBzaG91bGQgYmUgZ2VuZXJhdGVkIGZvciB0aGUgbWF0Y2guXHJcblx0XHQgKiBcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0QW5jaG9ySHJlZiA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdXJsID0gdGhpcy5nZXRVcmwoKTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB1cmwucmVwbGFjZSggLyZhbXA7L2csICcmJyApOyAgLy8gYW55ICZhbXA7J3MgaW4gdGhlIFVSTCBzaG91bGQgYmUgY29udmVydGVkIGJhY2sgdG8gJyYnIGlmIHRoZXkgd2VyZSBkaXNwbGF5ZWQgYXMgJmFtcDsgaW4gdGhlIHNvdXJjZSBodG1sIFxyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgdGhlIGFuY2hvciB0ZXh0IHRoYXQgc2hvdWxkIGJlIGdlbmVyYXRlZCBmb3IgdGhlIG1hdGNoLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdGdldEFuY2hvclRleHQgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGFuY2hvclRleHQgPSB0aGlzLmdldFVybCgpO1xyXG5cdFx0XHRcclxuXHRcdFx0aWYoIHRoaXMucHJvdG9jb2xSZWxhdGl2ZU1hdGNoICkge1xyXG5cdFx0XHRcdC8vIFN0cmlwIG9mZiBhbnkgcHJvdG9jb2wtcmVsYXRpdmUgJy8vJyBmcm9tIHRoZSBhbmNob3IgdGV4dFxyXG5cdFx0XHRcdGFuY2hvclRleHQgPSB0aGlzLnN0cmlwUHJvdG9jb2xSZWxhdGl2ZVByZWZpeCggYW5jaG9yVGV4dCApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmKCB0aGlzLnN0cmlwUHJlZml4ICkge1xyXG5cdFx0XHRcdGFuY2hvclRleHQgPSB0aGlzLnN0cmlwVXJsUHJlZml4KCBhbmNob3JUZXh0ICk7XHJcblx0XHRcdH1cclxuXHRcdFx0YW5jaG9yVGV4dCA9IHRoaXMucmVtb3ZlVHJhaWxpbmdTbGFzaCggYW5jaG9yVGV4dCApOyAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoLCBpZiB0aGVyZSBpcyBvbmVcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBhbmNob3JUZXh0O1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFxyXG5cdFx0Ly8gVXRpbGl0eSBGdW5jdGlvbmFsaXR5XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogU3RyaXBzIHRoZSBVUkwgcHJlZml4IChzdWNoIGFzIFwiaHR0cDovL1wiIG9yIFwiaHR0cHM6Ly9cIikgZnJvbSB0aGUgZ2l2ZW4gdGV4dC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IG9mIHRoZSBhbmNob3IgdGhhdCBpcyBiZWluZyBnZW5lcmF0ZWQsIGZvciB3aGljaCB0byBzdHJpcCBvZmYgdGhlXHJcblx0XHQgKiAgIHVybCBwcmVmaXggKHN1Y2ggYXMgc3RyaXBwaW5nIG9mZiBcImh0dHA6Ly9cIilcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGBhbmNob3JUZXh0YCwgd2l0aCB0aGUgcHJlZml4IHN0cmlwcGVkLlxyXG5cdFx0ICovXHJcblx0XHRzdHJpcFVybFByZWZpeCA6IGZ1bmN0aW9uKCB0ZXh0ICkge1xyXG5cdFx0XHRyZXR1cm4gdGV4dC5yZXBsYWNlKCB0aGlzLnVybFByZWZpeFJlZ2V4LCAnJyApO1xyXG5cdFx0fSxcclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqIFN0cmlwcyBhbnkgcHJvdG9jb2wtcmVsYXRpdmUgJy8vJyBmcm9tIHRoZSBhbmNob3IgdGV4dC5cclxuXHRcdCAqIFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IG9mIHRoZSBhbmNob3IgdGhhdCBpcyBiZWluZyBnZW5lcmF0ZWQsIGZvciB3aGljaCB0byBzdHJpcCBvZmYgdGhlXHJcblx0XHQgKiAgIHByb3RvY29sLXJlbGF0aXZlIHByZWZpeCAoc3VjaCBhcyBzdHJpcHBpbmcgb2ZmIFwiLy9cIilcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGBhbmNob3JUZXh0YCwgd2l0aCB0aGUgcHJvdG9jb2wtcmVsYXRpdmUgcHJlZml4IHN0cmlwcGVkLlxyXG5cdFx0ICovXHJcblx0XHRzdHJpcFByb3RvY29sUmVsYXRpdmVQcmVmaXggOiBmdW5jdGlvbiggdGV4dCApIHtcclxuXHRcdFx0cmV0dXJuIHRleHQucmVwbGFjZSggdGhpcy5wcm90b2NvbFJlbGF0aXZlUmVnZXgsICcnICk7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogUmVtb3ZlcyBhbnkgdHJhaWxpbmcgc2xhc2ggZnJvbSB0aGUgZ2l2ZW4gYGFuY2hvclRleHRgLCBpbiBwcmVwYXJhdGlvbiBmb3IgdGhlIHRleHQgdG8gYmUgZGlzcGxheWVkLlxyXG5cdFx0ICogXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IGFuY2hvclRleHQgVGhlIHRleHQgb2YgdGhlIGFuY2hvciB0aGF0IGlzIGJlaW5nIGdlbmVyYXRlZCwgZm9yIHdoaWNoIHRvIHJlbW92ZSBhbnkgdHJhaWxpbmdcclxuXHRcdCAqICAgc2xhc2ggKCcvJykgdGhhdCBtYXkgZXhpc3QuXHJcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBgYW5jaG9yVGV4dGAsIHdpdGggdGhlIHRyYWlsaW5nIHNsYXNoIHJlbW92ZWQuXHJcblx0XHQgKi9cclxuXHRcdHJlbW92ZVRyYWlsaW5nU2xhc2ggOiBmdW5jdGlvbiggYW5jaG9yVGV4dCApIHtcclxuXHRcdFx0aWYoIGFuY2hvclRleHQuY2hhckF0KCBhbmNob3JUZXh0Lmxlbmd0aCAtIDEgKSA9PT0gJy8nICkge1xyXG5cdFx0XHRcdGFuY2hvclRleHQgPSBhbmNob3JUZXh0LnNsaWNlKCAwLCAtMSApO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBhbmNob3JUZXh0O1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSApO1xyXG5cclxuXHRyZXR1cm4gQXV0b2xpbmtlcjtcclxuXHJcbn0gKSApOyIsIid1c2Ugc3RyaWN0JztcblxuLy8gZXJow6RsdCAkLCB3ZWlsIGpxdWVyeS5jb3VjaC5qcyBuaWNodCBub2QtZsOkaGlnIGlzdFxudmFyIHJldHVybkZ1bmN0aW9uID0gZnVuY3Rpb24gKCQpIHtcblx0dmFyIGdydXBwZSxcblx0XHRncnVwcGVuYmV6ZWljaG51bmcsXG5cdFx0YmF1bV9lcnN0ZWxsdCA9ICQuRGVmZXJyZWQoKTtcblx0Ly8gYWxsZSBCw6R1bWUgYXVzYmxlbmRlblxuXHQkKFwiLmJhdW1cIikuaGlkZSgpO1xuXHQvLyBhbGxlIEJlc2NocmlmdHVuZ2VuIGF1c2JsZW5kZW5cblx0JChcIi50cmVlQmVzY2hyaWZ0dW5nXCIpLmhpZGUoKTtcblx0Ly8gZ2V3b2xsdGUgYmVzY2hyaWZ0ZW4gdW5kIHNpY2h0YmFyIHNjaGFsdGVuXG5cdHN3aXRjaCAod2luZG93LmFkYi5HcnVwcGUpIHtcbiAgICBjYXNlIFwiRmF1bmFcIjpcbiAgICAgICAgZ3J1cHBlID0gXCJmYXVuYVwiO1xuICAgICAgICBncnVwcGVuYmV6ZWljaG51bmcgPSBcIlRpZXJlXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJGbG9yYVwiOlxuICAgICAgICBncnVwcGUgPSBcImZsb3JhXCI7XG4gICAgICAgIGdydXBwZW5iZXplaWNobnVuZyA9IFwiUGZsYW56ZW5cIjtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIk1vb3NlXCI6XG4gICAgICAgIGdydXBwZSA9IFwibW9vc2VcIjtcbiAgICAgICAgZ3J1cHBlbmJlemVpY2hudW5nID0gXCJNb29zZVwiO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiTWFjcm9teWNldGVzXCI6XG4gICAgICAgIGdydXBwZSA9IFwibWFjcm9teWNldGVzXCI7XG4gICAgICAgIGdydXBwZW5iZXplaWNobnVuZyA9IFwiUGlsemVcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkxlYmVuc3LDpHVtZVwiOlxuICAgICAgICBncnVwcGUgPSBcImxyXCI7XG4gICAgICAgIGdydXBwZW5iZXplaWNobnVuZyA9IFwiTGViZW5zcsOkdW1lXCI7XG4gICAgICAgIGJyZWFrO1xuXHR9XG5cdHZhciAkZGIgPSAkLmNvdWNoLmRiKFwiYXJ0ZW5kYlwiKTtcblx0JGRiLnZpZXcoJ2FydGVuZGIvJyArIGdydXBwZSArIFwiX2dydXBwaWVydFwiLCB7XG5cdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0dmFyIGFuemFobF9vYmpla3RlID0gZGF0YS5yb3dzWzBdLnZhbHVlO1xuXHRcdFx0JChcIiN0cmVlXCIgKyB3aW5kb3cuYWRiLkdydXBwZSArIFwiQmVzY2hyaWZ0dW5nXCIpLmh0bWwoYW56YWhsX29iamVrdGUgKyBcIiBcIiArIGdydXBwZW5iZXplaWNobnVuZyk7XG5cdFx0XHQvLyBlaW5nZWJsZW5kZXQgd2lyZCBkaWUgQmVzY2hyaWZ0dW5nLCB3ZW5uIGRlciBCYXVtIGZlcnRpZyBpc3QgaW0gY2FsbGJhY2sgdm9uIGZ1bmN0aW9uIGVyc3RlbGxlVHJlZVxuXHRcdH1cblx0fSk7XG5cdCQud2hlbih3aW5kb3cuYWRiLmVyc3RlbGxlVHJlZSgpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdGJhdW1fZXJzdGVsbHQucmVzb2x2ZSgpO1xuXHR9KTtcblx0cmV0dXJuIGJhdW1fZXJzdGVsbHQucHJvbWlzZSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXR1cm5GdW5jdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXR1cm5GdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGdydXBwZSxcbiAgICAgICAgdXJsO1xuXHQvLyB3aWUgc2ljaGVyc3RlbGxlbiwgZGFzcyBuaWNodCBkaWVzZWxiZW4gbm9kZXMgbWVocm1hbHMgYW5nZWjDpG5ndCB3ZXJkZW4/XG5cdHN3aXRjaCAod2luZG93LmFkYi5HcnVwcGUpIHtcbiAgICBjYXNlIFwiRmF1bmFcIjpcbiAgICAgICAgZ3J1cHBlID0gXCJmYXVuYVwiO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiRmxvcmFcIjpcbiAgICAgICAgZ3J1cHBlID0gXCJmbG9yYVwiO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiTW9vc2VcIjpcbiAgICAgICAgZ3J1cHBlID0gXCJtb29zZVwiO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiTWFjcm9teWNldGVzXCI6XG4gICAgICAgIGdydXBwZSA9IFwibWFjcm9teWNldGVzXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJMZWJlbnNyw6R1bWVcIjpcbiAgICAgICAgZ3J1cHBlID0gXCJsclwiO1xuICAgICAgICBicmVhaztcblx0fVxuXHRpZiAod2luZG93LmFkYi5HcnVwcGUgPT09IFwiTGViZW5zcsOkdW1lXCIpIHtcblx0XHR1cmwgPSAkKGxvY2F0aW9uKS5hdHRyKFwicHJvdG9jb2xcIikgKyAnLy8nICsgJChsb2NhdGlvbikuYXR0cihcImhvc3RcIikgKyBcIi9hcnRlbmRiL19kZXNpZ24vYXJ0ZW5kYi9fbGlzdC9iYXVtX2xyL2JhdW1fbHI/c3RhcnRrZXk9WzFdJmVuZGtleT1bMSx7fSx7fSx7fSx7fSx7fV0mZ3JvdXBfbGV2ZWw9NlwiO1xuXHR9IGVsc2Uge1xuXHRcdHVybCA9ICQobG9jYXRpb24pLmF0dHIoXCJwcm90b2NvbFwiKSArICcvLycgKyAkKGxvY2F0aW9uKS5hdHRyKFwiaG9zdFwiKSArIFwiL2FydGVuZGIvX2Rlc2lnbi9hcnRlbmRiL19saXN0L2JhdW1fXCIrZ3J1cHBlK1wiL2JhdW1fXCIrZ3J1cHBlK1wiP2dyb3VwX2xldmVsPTFcIjtcblx0fVxuXHRyZXR1cm4gdXJsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXR1cm5GdW5jdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXR1cm5GdW5jdGlvbiA9IGZ1bmN0aW9uIChsZXZlbCwgZmlsdGVyLCBncnVwcGUsIGlkKSB7XG5cdHZhciBzdGFydGtleSxcblx0XHQvLyBmbGFnLCB1bSBtaXR6dWxpZWZlcm4sIG9iIGRpZSBpZCBhbmdlemVpZ3Qgd2VyZGVuIHNvbGxcblx0XHRpZDIgPSBmYWxzZSxcblx0XHRlbmRrZXkgPSBbXSxcbiAgICAgICAgYSxcbiAgICAgICAgdXJsO1xuXG5cdGlmIChmaWx0ZXIpIHtcblx0XHQvLyBiZWkgbHIgZ2lidCBlcyBrZWluZW4gZmlsdGVyIHVuZCBkYXMgZXJ6ZXVndCBlaW5lbiBmZWhsZXJcblx0XHRzdGFydGtleSA9IGZpbHRlci5zbGljZSgpO1xuXHRcdGVuZGtleSA9IGZpbHRlci5zbGljZSgpO1xuXHR9XG5cdFxuXHRzd2l0Y2ggKGdydXBwZSkge1xuICAgIGNhc2UgXCJmYXVuYVwiOlxuICAgICAgICBpZiAobGV2ZWwgPiA0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGE9NTsgYT49bGV2ZWw7IGEtLSkge1xuICAgICAgICAgICAgZW5ka2V5LnB1c2goe30pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGltIHVudGVyc3RlbiBsZXZlbCBlaW5lbiBsZXZlbCBtZWhyIGFuemVpZ2VuLCBkYW1pdCBpZCB2b3JoYW5kZW4gaXN0XG4gICAgICAgIGlmIChsZXZlbCA9PT0gNCkge1xuICAgICAgICAgICAgLy8gZGFzIGlzdCBkaWUgQXJ0LUViZW5lXG4gICAgICAgICAgICAvLyBoaWVyIHNvbGwgZGllIGlkIGFuZ2V6ZWlndCB3ZXJkZW5cbiAgICAgICAgICAgIC8vIGRhenUgbXVzcyBkZXIgbsOkY2hzdGUgbGV2ZWwgYWJnZXJ1ZmVuIHdlcmRlblxuICAgICAgICAgICAgLy8gZGFtaXQgZGllIGxpc3QgZGVuIHp1IGhvaGVuIGxldmVsIGtvcnJpZ2llcmVuIGthbm4sIGlkIG1pdGdlYmVuXG4gICAgICAgICAgICBpZDIgPSB0cnVlO1xuICAgICAgICAgICAgbGV2ZWwrKztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiZmxvcmFcIjpcbiAgICAgICAgaWYgKGxldmVsID4gMykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChhPTQ7IGE+PWxldmVsOyBhLS0pIHtcbiAgICAgICAgICAgIGVuZGtleS5wdXNoKHt9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbSB1bnRlcnN0ZW4gbGV2ZWwgZWluZW4gbGV2ZWwgbWVociBhbnplaWdlbiwgZGFtaXQgaWQgdm9yaGFuZGVuIGlzdFxuICAgICAgICBpZiAobGV2ZWwgPT09IDMpIHtcbiAgICAgICAgICAgIGlkMiA9IHRydWU7XG4gICAgICAgICAgICBsZXZlbCsrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJtb29zZVwiOlxuICAgICAgICBpZiAobGV2ZWwgPiA0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGE9NTsgYT49bGV2ZWw7IGEtLSkge1xuICAgICAgICAgICAgZW5ka2V5LnB1c2goe30pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGltIHVudGVyc3RlbiBsZXZlbCBlaW5lbiBsZXZlbCBtZWhyIGFuemVpZ2VuLCBkYW1pdCBpZCB2b3JoYW5kZW4gaXN0XG4gICAgICAgIGlmIChsZXZlbCA9PT0gNCkge1xuICAgICAgICAgICAgaWQyID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldmVsKys7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm1hY3JvbXljZXRlc1wiOlxuICAgICAgICBpZiAobGV2ZWwgPiAyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGE9MzsgYT49bGV2ZWw7IGEtLSkge1xuICAgICAgICAgICAgZW5ka2V5LnB1c2goe30pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGltIHVudGVyc3RlbiBsZXZlbCBlaW5lbiBsZXZlbCBtZWhyIGFuemVpZ2VuLCBkYW1pdCBpZCB2b3JoYW5kZW4gaXN0XG4gICAgICAgIGlmIChsZXZlbCA9PT0gMikge1xuICAgICAgICAgICAgaWQyID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldmVsKys7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cdH1cblx0aWYgKGdydXBwZSA9PT0gXCJsclwiKSB7XG5cdFx0dXJsID0gJChsb2NhdGlvbikuYXR0cihcInByb3RvY29sXCIpICsgJy8vJyArICQobG9jYXRpb24pLmF0dHIoXCJob3N0XCIpICsgJy9hcnRlbmRiL19kZXNpZ24vYXJ0ZW5kYi9fbGlzdC9iYXVtX2xyL2JhdW1fbHI/c3RhcnRrZXk9WycgKyBsZXZlbCArICcsIFwiJyArIGlkICsgJ1wiXSZlbmRrZXk9WycgKyBsZXZlbCArICcsIFwiJyArIGlkICsgJ1wiLHt9LHt9LHt9LHt9XSZncm91cF9sZXZlbD02Jztcblx0fSBlbHNlIHtcblx0XHR1cmwgPSAkKGxvY2F0aW9uKS5hdHRyKFwicHJvdG9jb2xcIikgKyAnLy8nICsgJChsb2NhdGlvbikuYXR0cihcImhvc3RcIikgKyBcIi9hcnRlbmRiL19kZXNpZ24vYXJ0ZW5kYi9fbGlzdC9iYXVtX1wiICsgZ3J1cHBlICsgXCIvYmF1bV9cIiArIGdydXBwZSArIFwiP3N0YXJ0a2V5PVwiICsgSlNPTi5zdHJpbmdpZnkoc3RhcnRrZXkpICsgXCImZW5ka2V5PVwiICsgSlNPTi5zdHJpbmdpZnkoZW5ka2V5KSArIFwiJmdyb3VwX2xldmVsPVwiICsgbGV2ZWw7XG5cdH1cblx0aWYgKGlkMikge1xuXHRcdHVybCA9IHVybCArIFwiJmlkPXRydWVcIjtcblx0fVxuXHRyZXR1cm4gdXJsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXR1cm5GdW5jdGlvbjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXR1cm5GdW5jdGlvbiA9IGZ1bmN0aW9uICgkKSB7XG5cblx0Ly8genVlcnN0IG1hbCBkaWUgYmVuw7Z0aWd0ZW4gRGF0ZW4gaG9sZW5cblx0dmFyICRkYiA9ICQuY291Y2guZGIoXCJhcnRlbmRiXCIpO1xuXHRpZiAod2luZG93LmFkYi5HcnVwcGUgJiYgd2luZG93LmFkYi5HcnVwcGUgPT09IFwiTGViZW5zcsOkdW1lXCIpIHtcblx0XHRpZiAod2luZG93LmFkYi5maWx0ZXJlX2xyKSB7XG5cdFx0XHR3aW5kb3cuYWRiLmluaXRpaWVyZVN1Y2hmZWxkXzIoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHN0YXJ0a2V5ID0gZW5jb2RlVVJJQ29tcG9uZW50KCdbXCInICsgd2luZG93LmFkYi5HcnVwcGUgKyAnXCJdJyksXG5cdFx0XHRcdGVuZGtleSA9IGVuY29kZVVSSUNvbXBvbmVudCgnW1wiJyArIHdpbmRvdy5hZGIuR3J1cHBlICsgJ1wiLHt9LHt9LHt9XScpLFxuXHRcdFx0XHR1cmwgPSAnYXJ0ZW5kYi9maWx0ZXJlX2xyP3N0YXJ0a2V5PScgKyBzdGFydGtleSArICcmZW5ka2V5PScgKyBlbmRrZXk7XG5cdFx0XHQkZGIudmlldyh1cmwsIHtcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdHdpbmRvdy5hZGIuZmlsdGVyZV9sciA9IGRhdGE7XG5cdFx0XHRcdFx0d2luZG93LmFkYi5pbml0aWllcmVTdWNoZmVsZF8yKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fSBlbHNlIGlmICh3aW5kb3cuYWRiLkdydXBwZSkge1xuXHRcdGlmICh3aW5kb3cuYWRiW1wiZmlsdGVyZV9hcnRfXCIgKyB3aW5kb3cuYWRiLkdydXBwZS50b0xvd2VyQ2FzZSgpXSkge1xuXHRcdFx0d2luZG93LmFkYi5pbml0aWllcmVTdWNoZmVsZF8yKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRkYi52aWV3KCdhcnRlbmRiL2ZpbHRlcmVfYXJ0P3N0YXJ0a2V5PVtcIicgKyB3aW5kb3cuYWRiLkdydXBwZSArICdcIl0mZW5ka2V5PVtcIicgKyB3aW5kb3cuYWRiLkdydXBwZSArICdcIix7fV0nLCB7XG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHR3aW5kb3cuYWRiW1wiZmlsdGVyZV9hcnRfXCIgKyB3aW5kb3cuYWRiLkdydXBwZS50b0xvd2VyQ2FzZSgpXSA9IGRhdGE7XG5cdFx0XHRcdFx0d2luZG93LmFkYi5pbml0aWllcmVTdWNoZmVsZF8yKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXR1cm5GdW5jdGlvbjsiXX0=
