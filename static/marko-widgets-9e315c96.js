$_mod.main("/marko-widgets$6.6.0","lib/index");
$_mod.remap("/marko-widgets$6.6.0/lib/index","/marko-widgets$6.6.0/lib/index-browser");
$_mod.remap("/marko-widgets$6.6.0/lib/init-widgets","/marko-widgets$6.6.0/lib/init-widgets-browser");
$_mod.def("/marko-widgets$6.6.0/lib/addEventListener",function(e,t,n,o,r){function i(e,t,n){this._info=[e,t,n]}function a(e,t,n){this._info=[e,t,n]}function u(){var e=window.event;return e.target=e.target||e.srcElement,e.preventDefault=e.preventDefault||function(){e.returnValue=!1},e.stopPropagation=e.stopPropagation||function(){e.cancelBubble=!0},e.key=(e.which+1||e.keyCode+1)-1||0,e}var c=document.body||document.createElement("div");i.prototype={remove:function(){var e=this._info,t=e[0],n=e[1],o=e[2];t.detachEvent(n,o)}},a.prototype={remove:function(){var e=this._info,t=e[0],n=e[1],o=e[2];t.removeEventListener(n,o)}},c.addEventListener?n.exports=function(e,t,n){return e.addEventListener(t,n,!1),new a(e,t,n)}:n.exports=function(e,t,n){function o(){n(u())}return t="on"+t,e.attachEvent(t,o),new i(e,t,o)}});
$_mod.remap("/marko-widgets$6.6.0/lib/defineWidget","/marko-widgets$6.6.0/lib/defineWidget-browser");
$_mod.main("/marko-widgets$6.6.0/lib","");
$_mod.def("/marko-widgets$6.6.0/lib/update-manager",function(e,u,n,t,a){function l(){if(y.length)try{d(y)}finally{s=!1}}function i(){s||(s=!0,p.nextTick(l))}function r(e){i(),h||(h=new c),h.done(e)}function d(e){for(var u=0;u<e.length;u++){var n=e[u];n.__updateQueued=!1,n.update()}e.length=0}function f(e){var u=0===g.length,n={queue:null};g.push(n);try{e()}finally{try{n.queue&&d(n.queue)}finally{g.length--,u&&h&&(h.resolve(),h=null)}}}function o(e){if(!e.__updateQueued){e.__updateQueued=!0;var u=g.length;if(u){var n=g[u-1];n.queue?n.queue.push(e):n.queue=[e]}else i(),y.push(e)}}var p=e("process"),c=e("/raptor-async$1.1.3/AsyncValue"),h=null,h=null,s=!1,g=[],y=[];u.queueWidgetUpdate=o,u.batchUpdate=f,u.onAfterUpdate=r});
$_mod.def("/marko-widgets$6.6.0/lib/repeated-id",function(e,t,n,o,d){function i(){this.nextIdLookup={}}i.prototype={nextId:function(e,t){var n=e+"-"+t,o=this.nextIdLookup[n];return o=null==o?this.nextIdLookup[n]=0:++this.nextIdLookup[n],n.slice(0,-2)+"["+o+"]"}},t.nextId=function(e,t,n){var o=e.global.__repeatedId;return null==o&&(o=e.global.__repeatedId=new i),o.nextId(t,n)}});
$_mod.def("/marko-widgets$6.6.0/lib/WidgetDef",function(t,s,i,e,n){function d(t,s,i){this.type=t.type,this.id=t.id,this.config=t.config,this.state=t.state,this.scope=t.scope,this.domEvents=null,this.customEvents=t.customEvents,this.bodyElId=t.bodyElId,this.children=[],this.end=s,this.extend=t.extend,this.out=i,this.hasDomEvents=t.hasDomEvents,this._nextId=0}t("/raptor-polyfill$1.0.2/string/endsWith");var h=t("/marko-widgets$6.6.0/lib/repeated-id");d.prototype={addChild:function(t){this.children.push(t)},elId:function(t){return null==t?this.id:"string"==typeof t&&t.endsWith("[]")?h.nextId(this.out,this.id,t):this.id+"-"+t},addDomEvent:function(t,s,i){s&&(this.domEvents||(this.domEvents=[]),this.domEvents.push(t),this.domEvents.push(s),this.domEvents.push(i))},getDomEventsAttr:function(){if(this.domEvents)return this.domEvents.join(",")},nextId:function(){return this.id+"-w"+this._nextId++}},i.exports=d});
$_mod.remap("/marko-widgets$6.6.0/lib/uniqueId","/marko-widgets$6.6.0/lib/uniqueId-browser");
$_mod.def("/marko-widgets$6.6.0/lib/uniqueId-browser",function(i,n,o,r,w){var I=window.MARKO_WIDGETS_UNIQUE_ID;if(!I){var _=0;window.MARKO_WIDGETS_UNIQUE_ID=I=function(){return"wc"+_++}}o.exports=I});
$_mod.def("/marko-widgets$6.6.0/lib/WidgetsContext",function(t,e,i,n,s){function d(t){h.call(this),this.out=t,this.widgets=[],this.widgetStack=[],this.preserved=null,this.reusableWidgets=null,this.reusableWidgetsById=null,this.widgetsById={}}var r=t("/marko-widgets$6.6.0/lib/WidgetDef"),g=t("/marko-widgets$6.6.0/lib/uniqueId-browser"),u=t("/marko-widgets$6.6.0/lib/init-widgets-browser"),h=t("/events$1.1.1/events").EventEmitter,o=t("/raptor-util$2.0.0/inherit");d.prototype={getWidgets:function(){return this.widgets},getWidgetStack:function(){return this.widgetStack},getCurrentWidget:function(){return this.widgetStack.length?this.widgetStack[this.widgetStack.length-1]:void 0},beginWidget:function(t,e){function i(){s.length=d}var n=this,s=n.widgetStack,d=s.length,g=d?s[d-1]:null;t.id||(t.id=n._nextWidgetId()),t.parent=g;var u=new r(t,i,this.out);return this.widgetsById[t.id]=u,g?g.addChild(u):n.widgets.push(u),s.push(u),this.emit("beginWidget",u),u},getWidget:function(t){return this.widgetsById[t]},hasWidgets:function(){return 0!==this.widgets.length},clearWidgets:function(){this.widgets=[],this.widgetStack=[]},_nextWidgetId:function(){return g(this.out)},initWidgets:function(t){var e=this.widgets;u.initClientRendered(e,t),this.clearWidgets()},onBeginWidget:function(t){this.on("beginWidget",t)},isPreservedEl:function(t){var e=this.preserved;return e&&1&e[t]},isPreservedBodyEl:function(t){var e=this.preserved;return e&&2&e[t]},hasUnpreservedBody:function(t){var e=this.preserved;return e&&4&e[t]},addPreservedDOMNode:function(t,e,i){var n=this.preserved||(this.preserved={}),s=e?2:1;i&&(s|=4),n[t.id]=s}},o(d,h),d.getWidgetsContext=function(t){var e=t.global;return t.data.widgets||e.widgets||(e.widgets=new d(t))},i.exports=d});
$_mod.def("/marko-widgets$6.6.0/lib/deprecate",function(n,r,t,e,i){function o(n){if(!a)return 0;var r;if(l[n]=l[n]||0,l[n]<20){l[n]++;try{r=(new Error).stack.split("\n").slice(4).join("\n")}catch(n){}a.warn(c("WARNING!!")+"\n"+n+"\n"+f(r||""))}return 20-l[n]}function u(n,r,t){return r=d?"["+r+"m":"",t=d?"["+t+"m":"",r+n+t}function c(n){return u(n,31,39)}function f(n){return u(n,90,39)}var s=n("process"),a="undefined"!=typeof console&&console.warn&&console,l={};t.exports=function(n,r,t){if(a){var e=n[r];n[r]=function(){return o(t)||(n[r]=e),e.apply(this,arguments)}}},t.exports.warn=o;var d=function(){try{if(s.stdout&&!s.stdout.isTTY)return!1;if("win32"===s.platform)return!0;if("COLORTERM"in s.env)return!0;if("dumb"===s.env.TERM)return!1;if(/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(s.env.TERM))return!0}catch(n){}return!1}()});
$_mod.def("/marko-widgets$6.6.0/lib/defineRenderer",function(e,r,t,n,d){var i=e("/marko$3.14.2/runtime/marko-runtime"),a=e("/raptor-renderer$1.4.6/lib/raptor-renderer"),o=e("/raptor-util$2.0.0/extend");t.exports=function(r){var t,n=r.template,d=r.getInitialProps,g=r.getTemplateData,l=r.getInitialState,f=r.getWidgetConfig,s=r.getInitialBody,u=r.extendWidget,_=r.renderer;return _||(_=function(e,r){var a=r.global,_=e;_||(_={}),t||(t=n.render?n:i.load(n));var p;if(l&&a.__rerenderWidget&&a.__rerenderState){if(!!a.__firstWidgetFound||u)for(var c in a.__rerenderState)a.__rerenderState.hasOwnProperty(c)&&!e.hasOwnProperty(c)&&(_[c]=a.__rerenderState[c]);else p=e,_=null}p||(d&&(_=d(_,r)||{}),l&&(p=l(_,r))),a.__firstWidgetFound=!0;var m=g?g(p,_,r):p||_;m=m?o({},m):{},p&&(m.widgetState=p),_&&(m.widgetProps=_,m.widgetBody=s?s(_,r):_.renderBody,f&&(m.widgetConfig=f(_,r))),t.render(m,r)}),_.render=function(r,t){if(!t)return e("/marko-widgets$6.6.0/lib/deprecate").warn("Calling `render` synchronously is deprecated. Use `renderSync` instead."),a.render(_,r);a.render(_,r,t)},_.renderSync=function(e){return a.render(_,e)},_}});
$_mod.def("/marko-widgets$6.6.0/lib/defineComponent",function(e,r,t,i,n){var d,o;t.exports=function(e){if(e._isWidget)return e;var r;if(!e.template&&!e.renderer)throw new Error('Expected "template" or "renderer"');return r=d(e),o(e,r)},d=e("/marko-widgets$6.6.0/lib/defineRenderer"),o=e("/marko-widgets$6.6.0/lib/defineWidget-browser")});
$_mod.def("/marko-widgets$6.6.0/lib/Widget",function(t,e,r,i,n){function o(t){t.remove()}function s(t){v.forEachChildEl(t,function(t){var e=t.__widget;e&&a(e,!1,!1),s(t)})}function l(t,e,r){var i=t[W[e]];i&&i.call(t,r),t.emit(e,r)}function d(t){var e=t.__evHandles;e&&(e.forEach(o),t.__evHandles=null)}function a(t,e,r){if(!t.isDestroyed()){var i=t.getEl();l(t,"beforeDestroy"),t.__lifecycleState="destroyed",i&&(r&&s(i),e&&i.parentNode&&i.parentNode.removeChild(i),i.__widget=null),d(t),t.__subscriptions&&(t.__subscriptions.removeAllListeners(),t.__subscriptions=null),l(t,"destroy")}}function u(t,e,r,i,n){if("function"!=typeof r){if(null===r&&(r=void 0),i){(t.__dirtyState||(t.__dirtyState={}))[e]=!0}else if(t.state[e]===r)return;var o=!t.__dirty;if(o){var s=t.state;t.__dirty=!0,t.__oldState=s,t.state=I({},s),t.__stateChanges={}}t.__stateChanges[e]=r,null==r?delete t.state[e]:t.state[e]=r,o&&n!==!0&&U.queueWidgetUpdate(t)}}function f(t,e,r){var i;for(i in t.state)t.state.hasOwnProperty(i)&&!e.hasOwnProperty(i)&&u(t,i,void 0,!1,r);for(i in e)e.hasOwnProperty(i)&&u(t,i,e[i],!1,r)}function h(t){t.__oldState=null,t.__dirty=!1,t.__stateChanges=null,t.__newProps=null,t.__dirtyState=null}function _(t,e){var r=e.id,i=t.getWidget(r);return!!i&&e.__type===i.type}function c(t,e){E.call(this),this.id=t,this.el=null,this.bodyEl=null,this.state=null,this.__subscriptions=null,this.__evHandles=null,this.__lifecycleState=null,this.__customEvents=null,this.__scope=null,this.__dirty=!1,this.__oldState=null,this.__stateChanges=null,this.__updateQueued=!1,this.__dirtyState=null,this.__document=e}var p,y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g=t("/raptor-util$2.0.0/inherit"),v=t("/raptor-dom$1.1.1/raptor-dom-client"),b=t("/marko-widgets$6.6.0/lib/index-browser"),m=t("/raptor-renderer$1.4.6/lib/raptor-renderer"),E=t("/events$1.1.1/events").EventEmitter,w=t("/listener-tracker$1.2.0/lib/listener-tracker"),S=t("/raptor-util$2.0.0/arrayFromArguments"),I=t("/raptor-util$2.0.0/extend"),U=t("/marko-widgets$6.6.0/lib/update-manager"),B=t("/morphdom$1.4.6/lib/index"),P={addDestroyListener:!1},$=E.prototype.emit,D=/^\#(\S+)( .*)?/,W={beforeDestroy:"onBeforeDestroy",destroy:"onDestroy",beforeUpdate:"onBeforeUpdate",update:"onUpdate",render:"onRender",beforeInit:"onBeforeInit",afterInit:"onAfterInit"};c.prototype=p={_isWidget:!0,subscribeTo:function(t){if(!t)throw new Error("target is required");var e=this.__subscriptions;e||(this.__subscriptions=e=w.createTracker());var r=t._isWidget?null:P;return e.subscribeTo(t,r)},emit:function(t){var e,r,i=this.__customEvents;if(i&&(e=i[t])){r=r||S(arguments,1),r.push(this);var n=b.getWidgetForEl(this.__scope),o=n[e];if(!o)throw new Error("Method not found for widget "+n.id+": "+e);o.apply(n,r)}return $.apply(this,arguments)},getElId:function(t,e){var r=null!=t?this.id+"-"+t:this.id;return null!=e&&(r+="["+e+"]"),r},getEl:function(t,e){return null!=t?this.__document.getElementById(this.getElId(t,e)):this.el||this.__document.getElementById(this.getElId())},getEls:function(t){for(var e=[],r=0;;){var i=this.getEl(t,r);if(!i)break;e.push(i),r++}return e},getWidget:function(t,e){var r=this.getElId(t,e);return b.getWidgetForEl(r,this.__document)},getWidgets:function(t){for(var e=[],r=0;;){var i=this.getWidget(t,r);if(!i)break;e.push(i),r++}return e},destroy:function(t){t=t||{},a(this,t.removeNode!==!1,t.recursive!==!1)},isDestroyed:function(){return"destroyed"===this.__lifecycleState},getBodyEl:function(){return this.bodyEl},setState:function(t,e){if("object"!==(void 0===t?"undefined":y(t)))u(this,t,e);else{var r=t;for(var i in r)r.hasOwnProperty(i)&&u(this,i,r[i])}},setStateDirty:function(t,e){1===arguments.length&&(e=this.state[t]),u(this,t,e,!0)},_replaceState:function(t){f(this,t,!0)},_removeDOMEventListeners:function(){d(this)},replaceState:function(t){f(this,t)},setProps:function(t){if(this.getInitialState){this.getInitialProps&&(t=this.getInitialProps(t)||{});var e=this.getInitialState(t);return void this.replaceState(e)}this.__newProps||U.queueWidgetUpdate(this),this.__newProps=t},update:function(){if(!this.isDestroyed()){var t=this.__newProps;return this.shouldUpdate(t,this.state)===!1?void h(this):t?(h(this),void this.rerender(t)):void(this.__dirty&&(this._processUpdateHandlers()||this.doUpdate(this.__stateChanges,this.__oldState),h(this)))}},isDirty:function(){return this.__dirty},_reset:function(){h(this)},_processUpdateHandlers:function(){var t,e,r,i=this.__stateChanges,n=this.__oldState,o=[];for(var s in i)if(i.hasOwnProperty(s)){if(e=i[s],r=n[s],r===e){var d=this.__dirtyState;if(null==d||!d.hasOwnProperty(s))continue}var a="update_"+s;if(t=this[a],!t)return!1;o.push([s,t])}if(!o.length)return!0;l(this,"beforeUpdate");for(var u=0,f=o.length;u<f;u++){var _=o[u],c=_[0];t=_[1],e=i[c],r=n[c],t.call(this,e,r)}return l(this,"update"),h(this),!0},shouldUpdate:function(t,e){return!0},doUpdate:function(t,e){this.rerender()},_emitLifecycleEvent:function(t,e){l(this,t,e)},rerender:function(t){var e=this;if(!e.renderer)throw new Error('Widget does not have a "renderer" property');var r=this.__document.getElementById(e.id),i=e.renderer||e;e.__lifecycleState="rerender";var n=I({},t||e.state),o=n.$global={};o.__rerenderWidget=e,o.__rerenderEl=e.el,o.__rerender=!0,t||(o.__rerenderState=t?null:e.state),U.batchUpdate(function(){function o(t){var e=t.__widget;e&&a(e,!1,!1)}function s(t,e){var r,i=t.id,n=e.getAttribute("data-w-preserve-attrs");if(n){n=n.split(/\s*[,]\s*/);for(var d=0;d<n.length;d++){var u=n[d],f=t.getAttribute(u);null==f?e.removeAttribute(u):e.setAttribute(u,f)}}if(c&&i){if(c.isPreservedEl(i))return c.hasUnpreservedBody(i)&&(r=t.__widget,B(r.bodyEl,e,{childrenOnly:!0,onNodeDiscarded:o,onBeforeElUpdated:s,onBeforeElChildrenUpdated:l})),!1;r=t.__widget,r&&!_(c,r)&&a(r,!1,!1)}}function l(t){if(c&&t.id&&c.isPreservedBodyEl(t.id))return!1}var d=m.render(i,n),u=d.getNode(e.__document),f=d.out,c=f.global.widgets;B(r,u,{onNodeDiscarded:o,onBeforeElUpdated:s,onBeforeElChildrenUpdated:l}),d.afterInsert(e.__document),e.__lifecycleState=null,t||h(e)})},detach:function(){v.detach(this.el)},appendTo:function(t){v.appendTo(this.el,t)},replace:function(t){v.replace(this.el,t)},replaceChildrenOf:function(t){v.replaceChildrenOf(this.el,t)},insertBefore:function(t){v.insertBefore(this.el,t)},insertAfter:function(t){v.insertAfter(this.el,t)},prependTo:function(t){v.prependTo(this.el,t)},ready:function(t){b.ready(t,this)},$:function(t){var e=b.$,r=arguments;if(1===r.length){if("function"==typeof t){var i=this;return i.ready(function(){t.call(i)})}if("string"==typeof t){var n=D.exec(t);if(null!=n){var o=n[1];return e(null==n[2]?this.getEl(o):"#"+this.getElId(o)+n[2])}var s=this.getEl();if(!s)throw new Error("Root element is not defined for widget");if(s)return e(t,s)}}else{if(2===r.length&&"string"==typeof r[1])return e(t,this.getEl(r[1]));if(0===r.length)return e(this.el)}return e.apply(window,arguments)}},p.elId=p.getElId,g(c,E),r.exports=c});
$_mod.def("/marko-widgets$6.6.0/lib/defineWidget-browser",function(e,r,t,n,o){var i,d,u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.exports=function(e,r){function t(e,r){i.call(this,e,r)}if(e._isWidget)return e;var n=e.extendWidget;if(n)return{renderer:r,render:r.render,renderSync:r.renderSync,extendWidget:function(e){n(e),e.renderer=r}};var o,f;if("function"==typeof e){if(o=e,f=o.prototype,f.render&&2===f.render.length)throw new Error('"render(input, out)" is no longer supported. Use "renderer(input, out)" instead.')}else{if("object"!==(void 0===e?"undefined":u(e)))throw new Error("Invalid widget");o=e.init||function(){},f=o.prototype=e}return f._isWidget||d(o,i),f=t.prototype=o.prototype,f.initWidget=o,f.constructor=e.constructor=t,t._isWidget=!0,r&&(t.renderer=f.renderer=r,t.render=r.render,t.renderSync=r.renderSync),t},i=e("/marko-widgets$6.6.0/lib/Widget"),d=e("/raptor-util$2.0.0/inherit")});
$_mod.def("/marko-widgets$6.6.0/lib/registry",function(e,r,t,n,i){function d(r){var t=u[r];if(void 0===t&&(t=l[r],t||(t=e(r)),u[r]=t||null),null==t)throw new Error("Unable to load: "+r);return t}function o(e){var r=g[e];if(r)return r;r=d(e);var t;return r.Widget&&(r=r.Widget),r.renderer&&(t=f(r)),r=a(r,t),r.prototype.__type=e,g[e]=r,r}var a,f,l={},u={},g={};r.register=function(e,r){if(1===arguments.length){var t=arguments[0];e=t.name,r=t.def()}l[e]=r,delete u[e],delete g[e]},r.load=d,r.createWidget=function(e,r,t){var n,i=o(e);return"function"==typeof i?n=new i(r,t):i.initWidget&&(n=i,n.__document=t),n},a=e("/marko-widgets$6.6.0/lib/defineWidget-browser"),f=e("/marko-widgets$6.6.0/lib/defineRenderer")});
$_mod.def("/marko-widgets$6.6.0/lib/bubble",function(e,d,s,o,r){s.exports=["click","dblclick","mousedown","mouseup","dragstart","drag","drop","dragend","keydown","keypress","keyup","select","change","submit","reset"]});
$_mod.def("/marko-widgets$6.6.0/lib/event-delegation",function(t,n,e,i,o){var r=t("/marko-widgets$6.6.0/lib/addEventListener"),a=t("/marko-widgets$6.6.0/lib/update-manager"),d=function(){var n=document.body;t("/marko-widgets$6.6.0/lib/bubble").forEach(function(t){r(n,t,function(n){var e=!1,i=n.stopPropagation;n.stopPropagation=function(){i.call(n),e=!0},a.batchUpdate(function(){var i=n.target;if(i){var o,r,a="data-w-on"+t;do if(o=i.getAttribute(a)){var d=o.lastIndexOf("|"),u=o.substring(d+1),f=document.getElementById(u);if(!f)continue;if(r=f.__widget,!r)throw new Error("Widget not found: "+u);o=o.substring(0,d);var g=r[o];if(!g)throw new Error("Method not found on widget "+r.id+": "+o);if(r[o](n,i),e)break}while((i=i.parentNode)&&i.getAttribute)}})})})};n.init=function(){d&&(d(),d=null)}});
$_mod.def("/marko-widgets$6.6.0/lib/init-widgets-browser",function(e,t,i,n,r){function o(e,t,i){var n=e[t];if(!n)throw new Error("Widget "+e.id+' does not have method named "'+t+'"');n.apply(e,i)}function d(e,t,i,n,r){function d(t){var d=v(t,i,function(i){o(e,n,[i,t])});r.push(d)}Array.isArray(t)?t.forEach(d):d(t)}function a(e,t,i){if(null==t)return null;if(""===t)return e.getEl();if("string"==typeof t){if("#"===t.charAt(0))return i.getElementById(t.substring(1));if("[]"===t.slice(-2))return e.getEls(t.slice(0,-2))}return e.getEl(t)}function l(e,t,i,n,r,o,l,f,g,u,m,v){var w,b,p,E,_;if(m||(m=v.getElementById(t)),u||(u=m.__widget),u&&u.__type!==e&&(u=null),u?(u._removeDOMEventListeners(),u._reset(),_=u):_=y.createWidget(e,t,v),n)for(var h in n)if(n.hasOwnProperty(h)){var A=n[h];"function"!=typeof A&&null!=A||delete n[h]}if(_.state=n||{},s.isDebugEnabled()&&s.debug("Creating widget: "+e+" ("+t+")"),i||(i={}),m.__widget=_,_._isWidget){if(_.el=m,_.bodyEl=a(_,g,v),o){var W=[];for(w=0,b=o.length;w<b;w+=3){p=o[w],E=o[w+1];d(_,a(_,o[w+2],v),p,E,W)}W.length&&(_.__evHandles=W)}if(l)for(_.__customEvents={},_.__scope=r,w=0,b=l.length;w<b;w+=2)p=l[w],E=l[w+1],_.__customEvents[p]=E;if(f)for(w=0,b=f.length;w<b;w++){var $=f[w];if(!u){var I=y.load($),k=I.extendWidget||I.extend;if("function"!=typeof k)throw new Error("extendWidget(widget, cfg) method missing: "+$);k(_)}}}else i.elId=t,i.el=m;if(u)_._emitLifecycleEvent("update"),_._emitLifecycleEvent("render",{});else{var x={widget:_,config:i};c.emit("marko-widgets/initWidget",x),_._emitLifecycleEvent("beforeInit",x),_.initWidget(i),_._emitLifecycleEvent("afterInit",x),_._emitLifecycleEvent("render",{firstRender:!0})}return _}function f(e,t,i){if(null==e.__widget){var n,r=e.ownerDocument,o=e.id,d=e.getAttribute("data-widget");e.removeAttribute("data-widget");var a;if(e.getAttribute("data-w-on")){var f=r.getElementById(o+"-$on");f&&(f.parentNode.removeChild(f),a=(f.getAttribute("data-on")||"").split(",")),e.removeAttribute("data-w-on")}var g=e.getAttribute("data-w-events");g&&(g=g.split(","),n=g[0],g=g.slice(1),e.removeAttribute("data-w-events"));var u=e.getAttribute("data-w-extend");u&&(u=u.split(","),e.removeAttribute("data-w-extend"));l(d,o,i,t,n,a,g,u,e.getAttribute("data-w-body"),null,e,r)}}function g(e,t){b.init(),t=t||window.document;for(var i=0,n=e.length;i<n;i++){var r=e[i];r.children.length&&g(r.children,t);var o=l(r.type,r.id,r.config,r.state,r.scope,r.domEvents,r.customEvents,r.extend,r.bodyElId,r.existingWidget,null,t);r.widget=o}}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e("/raptor-polyfill$1.0.2/array/forEach"),e("/raptor-polyfill$1.0.2/string/endsWith");var s=e("/raptor-logging$1.1.2/lib/index").logger(i),c=e("/raptor-pubsub$1.0.5/lib/index"),m=e("/raptor-dom$1.1.1/raptor-dom-client").ready,v=e("/marko-widgets$6.6.0/lib/addEventListener"),y=e("/marko-widgets$6.6.0/lib/registry"),w=e("/warp10$1.3.3/finalize"),b=e("/marko-widgets$6.6.0/lib/event-delegation");t.initClientRendered=g,t.initServerRendered=function(e){function t(){if(b.init(),"string"!=typeof e){var t=document.getElementById("markoWidgets");if(!t)return;if(document.markoWidgetsInitialized===!0)return;document.markoWidgetsInitialized=!0,e=t?t.getAttribute("data-ids"):null}if(e){i=i||window.$markoWidgetsState,n=n||window.$markoWidgetsConfig;for(var r,o,d=e.split(","),a=d.length,l=0;l<a;l++){var g=d[l],u=document.getElementById(g);if(!u)throw new Error('DOM node for widget with ID "'+g+'" not found');i?(r=i[g],delete i[g]):r=void 0,n?(o=n[g],delete n[g]):o=void 0,f(u,r,o)}}}var i,n;"object"===(void 0===e?"undefined":u(e))&&(i=e.state?w(e.state):null,n=e.config?w(e.config):null,e=e.ids),"string"==typeof e?t():m(t)}});
$_mod.def("/marko-widgets$6.6.0/lib/client-init",function(i,e,t,d,n){i("/marko-widgets$6.6.0/lib/init-widgets-browser").initServerRendered()});
$_mod.def("/marko-widgets$6.6.0/lib/index-browser",function(e,t,r,i,d){function n(e,t){if(e){var r="string"==typeof e?(t||window.document).getElementById(e):e;return r&&r.__widget||void 0}}var o=e("/raptor-pubsub$1.0.5/lib/index"),a=e("/raptor-dom$1.1.1/raptor-dom-client").ready,g={},s=e("/marko-widgets$6.6.0/lib/Widget"),l=e("/marko-widgets$6.6.0/lib/init-widgets-browser"),m=e("/raptor-renderer$1.4.6/lib/raptor-renderer"),w=e("/marko-widgets$6.6.0/lib/update-manager"),b=t.WidgetsContext=e("/marko-widgets$6.6.0/lib/WidgetsContext");t.getWidgetsContext=b.getWidgetsContext,t.Widget=s,t.ready=a,t.onInitWidget=function(e){o.on("marko-widgets/initWidget",e)},t.attrs=function(){return g},t.writeDomEventsEl=function(){},t.get=t.getWidgetForEl=n,t.initAllWidgets=function(){l.initServerRendered(!0)},o.on("dom/beforeRemove",function(e){var t=e.el,r=t.id?n(t):null;r&&r.destroy({removeNode:!1,recursive:!0})}).on("raptor-renderer/renderedToDOM",function(e){var t=e.out||e.context,r=t.global.widgets;r&&r.initWidgets(e.document)}),t.initWidgets=window.$markoWidgets=function(e){l.initServerRendered(e)};var f=window.$;if(!f)try{f=e("jquery")}catch(e){}t.$=f,t.registerWidget=e("/marko-widgets$6.6.0/lib/registry").register,t.makeRenderable=t.renderable=m.renderable,t.render=m.render,t.defineComponent=e("/marko-widgets$6.6.0/lib/defineComponent"),t.defineWidget=e("/marko-widgets$6.6.0/lib/defineWidget-browser"),t.defineRenderer=e("/marko-widgets$6.6.0/lib/defineRenderer"),t.batchUpdate=w.batchUpdate,t.onAfterUpdate=w.onAfterUpdate,window.$MARKO_WIDGETS=t});