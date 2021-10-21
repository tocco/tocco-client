/*! For license information please see 5.3aabd84d.iframe.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{5002:function(module,exports,__webpack_require__){"use strict";var getOwnPropertySymbols=Object.getOwnPropertySymbols,hasOwnProperty=Object.prototype.hasOwnProperty,propIsEnumerable=Object.prototype.propertyIsEnumerable;function toObject(val){if(null==val)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(val)}module.exports=function shouldUseNative(){try{if(!Object.assign)return!1;var test1=new String("abc");if(test1[5]="de","5"===Object.getOwnPropertyNames(test1)[0])return!1;for(var test2={},i=0;i<10;i++)test2["_"+String.fromCharCode(i)]=i;if("0123456789"!==Object.getOwnPropertyNames(test2).map((function(n){return test2[n]})).join(""))return!1;var test3={};return"abcdefghijklmnopqrst".split("").forEach((function(letter){test3[letter]=letter})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},test3)).join("")}catch(err){return!1}}()?Object.assign:function(target,source){for(var from,symbols,to=toObject(target),s=1;s<arguments.length;s++){for(var key in from=Object(arguments[s]))hasOwnProperty.call(from,key)&&(to[key]=from[key]);if(getOwnPropertySymbols){symbols=getOwnPropertySymbols(from);for(var i=0;i<symbols.length;i++)propIsEnumerable.call(from,symbols[i])&&(to[symbols[i]]=from[symbols[i]])}}return to}},5035:function(module,exports,__webpack_require__){"use strict";var $=__webpack_require__(42),isArray=__webpack_require__(484),nativeReverse=[].reverse,test=[1,2];$({target:"Array",proto:!0,forced:String(test)===String(test.reverse())},{reverse:function reverse(){return isArray(this)&&(this.length=this.length),nativeReverse.call(this)}})},5036:function(module,exports){exports.__esModule=!0;exports.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"};var TAG_NAMES=exports.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},REACT_TAG_MAP=(exports.VALID_TAG_NAMES=Object.keys(TAG_NAMES).map((function(name){return TAG_NAMES[name]})),exports.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},exports.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});exports.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},exports.HTML_TAG_MAP=Object.keys(REACT_TAG_MAP).reduce((function(obj,key){return obj[REACT_TAG_MAP[key]]=key,obj}),{}),exports.SELF_CLOSING_TAGS=[TAG_NAMES.NOSCRIPT,TAG_NAMES.SCRIPT,TAG_NAMES.STYLE],exports.HELMET_ATTRIBUTE="data-react-helmet"},5149:function(module,exports,__webpack_require__){exports.__esModule=!0,exports.Helmet=void 0;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_react2=_interopRequireDefault(__webpack_require__(1)),_propTypes2=_interopRequireDefault(__webpack_require__(10)),_reactSideEffect2=_interopRequireDefault(__webpack_require__(5150)),_reactFastCompare2=_interopRequireDefault(__webpack_require__(5152)),_HelmetUtils=__webpack_require__(5153),_HelmetConstants=__webpack_require__(5036);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj)keys.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(obj,i)&&(target[i]=obj[i]);return target}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}var HelmetExport=function Helmet(Component){var _class,_temp;return _temp=_class=function(_React$Component){function HelmetWrapper(){return _classCallCheck(this,HelmetWrapper),_possibleConstructorReturn(this,_React$Component.apply(this,arguments))}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}(HelmetWrapper,_React$Component),HelmetWrapper.prototype.shouldComponentUpdate=function shouldComponentUpdate(nextProps){return!(0,_reactFastCompare2.default)(this.props,nextProps)},HelmetWrapper.prototype.mapNestedChildrenToProps=function mapNestedChildrenToProps(child,nestedChildren){if(!nestedChildren)return null;switch(child.type){case _HelmetConstants.TAG_NAMES.SCRIPT:case _HelmetConstants.TAG_NAMES.NOSCRIPT:return{innerHTML:nestedChildren};case _HelmetConstants.TAG_NAMES.STYLE:return{cssText:nestedChildren}}throw new Error("<"+child.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},HelmetWrapper.prototype.flattenArrayTypeChildren=function flattenArrayTypeChildren(_ref){var _extends2,child=_ref.child,arrayTypeChildren=_ref.arrayTypeChildren,newChildProps=_ref.newChildProps,nestedChildren=_ref.nestedChildren;return _extends({},arrayTypeChildren,((_extends2={})[child.type]=[].concat(arrayTypeChildren[child.type]||[],[_extends({},newChildProps,this.mapNestedChildrenToProps(child,nestedChildren))]),_extends2))},HelmetWrapper.prototype.mapObjectTypeChildren=function mapObjectTypeChildren(_ref2){var _extends3,_extends4,child=_ref2.child,newProps=_ref2.newProps,newChildProps=_ref2.newChildProps,nestedChildren=_ref2.nestedChildren;switch(child.type){case _HelmetConstants.TAG_NAMES.TITLE:return _extends({},newProps,((_extends3={})[child.type]=nestedChildren,_extends3.titleAttributes=_extends({},newChildProps),_extends3));case _HelmetConstants.TAG_NAMES.BODY:return _extends({},newProps,{bodyAttributes:_extends({},newChildProps)});case _HelmetConstants.TAG_NAMES.HTML:return _extends({},newProps,{htmlAttributes:_extends({},newChildProps)})}return _extends({},newProps,((_extends4={})[child.type]=_extends({},newChildProps),_extends4))},HelmetWrapper.prototype.mapArrayTypeChildrenToProps=function mapArrayTypeChildrenToProps(arrayTypeChildren,newProps){var newFlattenedProps=_extends({},newProps);return Object.keys(arrayTypeChildren).forEach((function(arrayChildName){var _extends5;newFlattenedProps=_extends({},newFlattenedProps,((_extends5={})[arrayChildName]=arrayTypeChildren[arrayChildName],_extends5))})),newFlattenedProps},HelmetWrapper.prototype.warnOnInvalidChildren=function warnOnInvalidChildren(child,nestedChildren){return!0},HelmetWrapper.prototype.mapChildrenToProps=function mapChildrenToProps(children,newProps){var _this2=this,arrayTypeChildren={};return _react2.default.Children.forEach(children,(function(child){if(child&&child.props){var _child$props=child.props,nestedChildren=_child$props.children,childProps=_objectWithoutProperties(_child$props,["children"]),newChildProps=(0,_HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);switch(_this2.warnOnInvalidChildren(child,nestedChildren),child.type){case _HelmetConstants.TAG_NAMES.LINK:case _HelmetConstants.TAG_NAMES.META:case _HelmetConstants.TAG_NAMES.NOSCRIPT:case _HelmetConstants.TAG_NAMES.SCRIPT:case _HelmetConstants.TAG_NAMES.STYLE:arrayTypeChildren=_this2.flattenArrayTypeChildren({child:child,arrayTypeChildren:arrayTypeChildren,newChildProps:newChildProps,nestedChildren:nestedChildren});break;default:newProps=_this2.mapObjectTypeChildren({child:child,newProps:newProps,newChildProps:newChildProps,nestedChildren:nestedChildren})}}})),newProps=this.mapArrayTypeChildrenToProps(arrayTypeChildren,newProps)},HelmetWrapper.prototype.render=function render(){var _props=this.props,children=_props.children,props=_objectWithoutProperties(_props,["children"]),newProps=_extends({},props);return children&&(newProps=this.mapChildrenToProps(children,newProps)),_react2.default.createElement(Component,newProps)},_createClass(HelmetWrapper,null,[{key:"canUseDOM",set:function set(canUseDOM){Component.canUseDOM=canUseDOM}}]),HelmetWrapper}(_react2.default.Component),_class.propTypes={base:_propTypes2.default.object,bodyAttributes:_propTypes2.default.object,children:_propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node),_propTypes2.default.node]),defaultTitle:_propTypes2.default.string,defer:_propTypes2.default.bool,encodeSpecialCharacters:_propTypes2.default.bool,htmlAttributes:_propTypes2.default.object,link:_propTypes2.default.arrayOf(_propTypes2.default.object),meta:_propTypes2.default.arrayOf(_propTypes2.default.object),noscript:_propTypes2.default.arrayOf(_propTypes2.default.object),onChangeClientState:_propTypes2.default.func,script:_propTypes2.default.arrayOf(_propTypes2.default.object),style:_propTypes2.default.arrayOf(_propTypes2.default.object),title:_propTypes2.default.string,titleAttributes:_propTypes2.default.object,titleTemplate:_propTypes2.default.string},_class.defaultProps={defer:!0,encodeSpecialCharacters:!0},_class.peek=Component.peek,_class.rewind=function(){var mappedState=Component.rewind();return mappedState||(mappedState=(0,_HelmetUtils.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),mappedState},_temp}((0,_reactSideEffect2.default)(_HelmetUtils.reducePropsToState,_HelmetUtils.handleClientStateChange,_HelmetUtils.mapStateOnServer)((function NullComponent(){return null})));HelmetExport.renderStatic=HelmetExport.rewind,exports.Helmet=HelmetExport,exports.default=HelmetExport},5150:function(module,exports,__webpack_require__){"use strict";function _interopDefault(ex){return ex&&"object"==typeof ex&&"default"in ex?ex.default:ex}var React=__webpack_require__(1),React__default=_interopDefault(React),shallowEqual=_interopDefault(__webpack_require__(5151));function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var canUseDOM=!("undefined"==typeof window||!window.document||!window.document.createElement);module.exports=function withSideEffect(reducePropsToState,handleStateChangeOnClient,mapStateOnServer){if("function"!=typeof reducePropsToState)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof handleStateChangeOnClient)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==mapStateOnServer&&"function"!=typeof mapStateOnServer)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function wrap(WrappedComponent){if("function"!=typeof WrappedComponent)throw new Error("Expected WrappedComponent to be a React component.");var state,mountedInstances=[];function emitChange(){state=reducePropsToState(mountedInstances.map((function(instance){return instance.props}))),SideEffect.canUseDOM?handleStateChangeOnClient(state):mapStateOnServer&&(state=mapStateOnServer(state))}var SideEffect=function(_Component){function SideEffect(){return _Component.apply(this,arguments)||this}!function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype),subClass.prototype.constructor=subClass,subClass.__proto__=superClass}(SideEffect,_Component),SideEffect.peek=function peek(){return state},SideEffect.rewind=function rewind(){if(SideEffect.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var recordedState=state;return state=void 0,mountedInstances=[],recordedState};var _proto=SideEffect.prototype;return _proto.shouldComponentUpdate=function shouldComponentUpdate(nextProps){return!shallowEqual(nextProps,this.props)},_proto.componentWillMount=function componentWillMount(){mountedInstances.push(this),emitChange()},_proto.componentDidUpdate=function componentDidUpdate(){emitChange()},_proto.componentWillUnmount=function componentWillUnmount(){var index=mountedInstances.indexOf(this);mountedInstances.splice(index,1),emitChange()},_proto.render=function render(){return React__default.createElement(WrappedComponent,this.props)},SideEffect}(React.Component);return _defineProperty(SideEffect,"displayName","SideEffect("+function getDisplayName(WrappedComponent){return WrappedComponent.displayName||WrappedComponent.name||"Component"}(WrappedComponent)+")"),_defineProperty(SideEffect,"canUseDOM",canUseDOM),SideEffect}}},5151:function(module,exports){module.exports=function shallowEqual(objA,objB,compare,compareContext){var ret=compare?compare.call(compareContext,objA,objB):void 0;if(void 0!==ret)return!!ret;if(objA===objB)return!0;if("object"!=typeof objA||!objA||"object"!=typeof objB||!objB)return!1;var keysA=Object.keys(objA),keysB=Object.keys(objB);if(keysA.length!==keysB.length)return!1;for(var bHasOwnProperty=Object.prototype.hasOwnProperty.bind(objB),idx=0;idx<keysA.length;idx++){var key=keysA[idx];if(!bHasOwnProperty(key))return!1;var valueA=objA[key],valueB=objB[key];if(!1===(ret=compare?compare.call(compareContext,valueA,valueB,key):void 0)||void 0===ret&&valueA!==valueB)return!1}return!0}},5152:function(module,exports,__webpack_require__){"use strict";var isArray=Array.isArray,keyList=Object.keys,hasProp=Object.prototype.hasOwnProperty,hasElementType="undefined"!=typeof Element;module.exports=function exportedEqual(a,b){try{return function equal(a,b){if(a===b)return!0;if(a&&b&&"object"==typeof a&&"object"==typeof b){var i,length,key,arrA=isArray(a),arrB=isArray(b);if(arrA&&arrB){if((length=a.length)!=b.length)return!1;for(i=length;0!=i--;)if(!equal(a[i],b[i]))return!1;return!0}if(arrA!=arrB)return!1;var dateA=a instanceof Date,dateB=b instanceof Date;if(dateA!=dateB)return!1;if(dateA&&dateB)return a.getTime()==b.getTime();var regexpA=a instanceof RegExp,regexpB=b instanceof RegExp;if(regexpA!=regexpB)return!1;if(regexpA&&regexpB)return a.toString()==b.toString();var keys=keyList(a);if((length=keys.length)!==keyList(b).length)return!1;for(i=length;0!=i--;)if(!hasProp.call(b,keys[i]))return!1;if(hasElementType&&a instanceof Element&&b instanceof Element)return a===b;for(i=length;0!=i--;)if(!("_owner"===(key=keys[i])&&a.$$typeof||equal(a[key],b[key])))return!1;return!0}return a!=a&&b!=b}(a,b)}catch(error){if(error.message&&error.message.match(/stack|recursion/i)||-2146828260===error.number)return console.warn("Warning: react-fast-compare does not handle circular references.",error.name,error.message),!1;throw error}}},5153:function(module,exports,__webpack_require__){(function(global){exports.__esModule=!0,exports.warn=exports.requestAnimationFrame=exports.reducePropsToState=exports.mapStateOnServer=exports.handleClientStateChange=exports.convertReactPropstoHtmlAttributes=void 0;var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_react2=_interopRequireDefault(__webpack_require__(1)),_objectAssign2=_interopRequireDefault(__webpack_require__(5002)),_HelmetConstants=__webpack_require__(5036);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var clock,encodeSpecialCharacters=function encodeSpecialCharacters(str){var encode=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===encode?String(str):String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},getTitleFromPropsList=function getTitleFromPropsList(propsList){var innermostTitle=getInnermostProperty(propsList,_HelmetConstants.TAG_NAMES.TITLE),innermostTemplate=getInnermostProperty(propsList,_HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);if(innermostTemplate&&innermostTitle)return innermostTemplate.replace(/%s/g,(function(){return innermostTitle}));var innermostDefaultTitle=getInnermostProperty(propsList,_HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);return innermostTitle||innermostDefaultTitle||void 0},getOnChangeClientState=function getOnChangeClientState(propsList){return getInnermostProperty(propsList,_HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},getAttributesFromPropsList=function getAttributesFromPropsList(tagType,propsList){return propsList.filter((function(props){return void 0!==props[tagType]})).map((function(props){return props[tagType]})).reduce((function(tagAttrs,current){return _extends({},tagAttrs,current)}),{})},getBaseTagFromPropsList=function getBaseTagFromPropsList(primaryAttributes,propsList){return propsList.filter((function(props){return void 0!==props[_HelmetConstants.TAG_NAMES.BASE]})).map((function(props){return props[_HelmetConstants.TAG_NAMES.BASE]})).reverse().reduce((function(innermostBaseTag,tag){if(!innermostBaseTag.length)for(var keys=Object.keys(tag),i=0;i<keys.length;i++){var lowerCaseAttributeKey=keys[i].toLowerCase();if(-1!==primaryAttributes.indexOf(lowerCaseAttributeKey)&&tag[lowerCaseAttributeKey])return innermostBaseTag.concat(tag)}return innermostBaseTag}),[])},getTagsFromPropsList=function getTagsFromPropsList(tagName,primaryAttributes,propsList){var approvedSeenTags={};return propsList.filter((function(props){return!!Array.isArray(props[tagName])||(void 0!==props[tagName]&&warn("Helmet: "+tagName+' should be of type "Array". Instead found type "'+_typeof(props[tagName])+'"'),!1)})).map((function(props){return props[tagName]})).reverse().reduce((function(approvedTags,instanceTags){var instanceSeenTags={};instanceTags.filter((function(tag){for(var primaryAttributeKey=void 0,keys=Object.keys(tag),i=0;i<keys.length;i++){var attributeKey=keys[i],lowerCaseAttributeKey=attributeKey.toLowerCase();-1===primaryAttributes.indexOf(lowerCaseAttributeKey)||primaryAttributeKey===_HelmetConstants.TAG_PROPERTIES.REL&&"canonical"===tag[primaryAttributeKey].toLowerCase()||lowerCaseAttributeKey===_HelmetConstants.TAG_PROPERTIES.REL&&"stylesheet"===tag[lowerCaseAttributeKey].toLowerCase()||(primaryAttributeKey=lowerCaseAttributeKey),-1===primaryAttributes.indexOf(attributeKey)||attributeKey!==_HelmetConstants.TAG_PROPERTIES.INNER_HTML&&attributeKey!==_HelmetConstants.TAG_PROPERTIES.CSS_TEXT&&attributeKey!==_HelmetConstants.TAG_PROPERTIES.ITEM_PROP||(primaryAttributeKey=attributeKey)}if(!primaryAttributeKey||!tag[primaryAttributeKey])return!1;var value=tag[primaryAttributeKey].toLowerCase();return approvedSeenTags[primaryAttributeKey]||(approvedSeenTags[primaryAttributeKey]={}),instanceSeenTags[primaryAttributeKey]||(instanceSeenTags[primaryAttributeKey]={}),!approvedSeenTags[primaryAttributeKey][value]&&(instanceSeenTags[primaryAttributeKey][value]=!0,!0)})).reverse().forEach((function(tag){return approvedTags.push(tag)}));for(var keys=Object.keys(instanceSeenTags),i=0;i<keys.length;i++){var attributeKey=keys[i],tagUnion=(0,_objectAssign2.default)({},approvedSeenTags[attributeKey],instanceSeenTags[attributeKey]);approvedSeenTags[attributeKey]=tagUnion}return approvedTags}),[]).reverse()},getInnermostProperty=function getInnermostProperty(propsList,property){for(var i=propsList.length-1;i>=0;i--){var props=propsList[i];if(props.hasOwnProperty(property))return props[property]}return null},rafPolyfill=(clock=Date.now(),function(callback){var currentTime=Date.now();currentTime-clock>16?(clock=currentTime,callback(currentTime)):setTimeout((function(){rafPolyfill(callback)}),0)}),cafPolyfill=function cafPolyfill(id){return clearTimeout(id)},requestAnimationFrame="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||rafPolyfill:global.requestAnimationFrame||rafPolyfill,cancelAnimationFrame="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||cafPolyfill:global.cancelAnimationFrame||cafPolyfill,warn=function warn(msg){return console&&"function"==typeof console.warn&&console.warn(msg)},_helmetCallback=null,commitTagChanges=function commitTagChanges(newState,cb){var baseTag=newState.baseTag,bodyAttributes=newState.bodyAttributes,htmlAttributes=newState.htmlAttributes,linkTags=newState.linkTags,metaTags=newState.metaTags,noscriptTags=newState.noscriptTags,onChangeClientState=newState.onChangeClientState,scriptTags=newState.scriptTags,styleTags=newState.styleTags,title=newState.title,titleAttributes=newState.titleAttributes;updateAttributes(_HelmetConstants.TAG_NAMES.BODY,bodyAttributes),updateAttributes(_HelmetConstants.TAG_NAMES.HTML,htmlAttributes),updateTitle(title,titleAttributes);var tagUpdates={baseTag:updateTags(_HelmetConstants.TAG_NAMES.BASE,baseTag),linkTags:updateTags(_HelmetConstants.TAG_NAMES.LINK,linkTags),metaTags:updateTags(_HelmetConstants.TAG_NAMES.META,metaTags),noscriptTags:updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT,noscriptTags),scriptTags:updateTags(_HelmetConstants.TAG_NAMES.SCRIPT,scriptTags),styleTags:updateTags(_HelmetConstants.TAG_NAMES.STYLE,styleTags)},addedTags={},removedTags={};Object.keys(tagUpdates).forEach((function(tagType){var _tagUpdates$tagType=tagUpdates[tagType],newTags=_tagUpdates$tagType.newTags,oldTags=_tagUpdates$tagType.oldTags;newTags.length&&(addedTags[tagType]=newTags),oldTags.length&&(removedTags[tagType]=tagUpdates[tagType].oldTags)})),cb&&cb(),onChangeClientState(newState,addedTags,removedTags)},flattenArray=function flattenArray(possibleArray){return Array.isArray(possibleArray)?possibleArray.join(""):possibleArray},updateTitle=function updateTitle(title,attributes){void 0!==title&&document.title!==title&&(document.title=flattenArray(title)),updateAttributes(_HelmetConstants.TAG_NAMES.TITLE,attributes)},updateAttributes=function updateAttributes(tagName,attributes){var elementTag=document.getElementsByTagName(tagName)[0];if(elementTag){for(var helmetAttributeString=elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE),helmetAttributes=helmetAttributeString?helmetAttributeString.split(","):[],attributesToRemove=[].concat(helmetAttributes),attributeKeys=Object.keys(attributes),i=0;i<attributeKeys.length;i++){var attribute=attributeKeys[i],value=attributes[attribute]||"";elementTag.getAttribute(attribute)!==value&&elementTag.setAttribute(attribute,value),-1===helmetAttributes.indexOf(attribute)&&helmetAttributes.push(attribute);var indexToSave=attributesToRemove.indexOf(attribute);-1!==indexToSave&&attributesToRemove.splice(indexToSave,1)}for(var _i=attributesToRemove.length-1;_i>=0;_i--)elementTag.removeAttribute(attributesToRemove[_i]);helmetAttributes.length===attributesToRemove.length?elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE):elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE)!==attributeKeys.join(",")&&elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE,attributeKeys.join(","))}},updateTags=function updateTags(type,tags){var headElement=document.head||document.querySelector(_HelmetConstants.TAG_NAMES.HEAD),tagNodes=headElement.querySelectorAll(type+"["+_HelmetConstants.HELMET_ATTRIBUTE+"]"),oldTags=Array.prototype.slice.call(tagNodes),newTags=[],indexToDelete=void 0;return tags&&tags.length&&tags.forEach((function(tag){var newElement=document.createElement(type);for(var attribute in tag)if(tag.hasOwnProperty(attribute))if(attribute===_HelmetConstants.TAG_PROPERTIES.INNER_HTML)newElement.innerHTML=tag.innerHTML;else if(attribute===_HelmetConstants.TAG_PROPERTIES.CSS_TEXT)newElement.styleSheet?newElement.styleSheet.cssText=tag.cssText:newElement.appendChild(document.createTextNode(tag.cssText));else{var value=void 0===tag[attribute]?"":tag[attribute];newElement.setAttribute(attribute,value)}newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE,"true"),oldTags.some((function(existingTag,index){return indexToDelete=index,newElement.isEqualNode(existingTag)}))?oldTags.splice(indexToDelete,1):newTags.push(newElement)})),oldTags.forEach((function(tag){return tag.parentNode.removeChild(tag)})),newTags.forEach((function(tag){return headElement.appendChild(tag)})),{oldTags:oldTags,newTags:newTags}},generateElementAttributesAsString=function generateElementAttributesAsString(attributes){return Object.keys(attributes).reduce((function(str,key){var attr=void 0!==attributes[key]?key+'="'+attributes[key]+'"':""+key;return str?str+" "+attr:attr}),"")},convertElementAttributestoReactProps=function convertElementAttributestoReactProps(attributes){var initProps=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(attributes).reduce((function(obj,key){return obj[_HelmetConstants.REACT_TAG_MAP[key]||key]=attributes[key],obj}),initProps)},getMethodsForTag=function getMethodsForTag(type,tags,encode){switch(type){case _HelmetConstants.TAG_NAMES.TITLE:return{toComponent:function toComponent(){return function generateTitleAsReactComponent(type,title,attributes){var _initProps,initProps=((_initProps={key:title})[_HelmetConstants.HELMET_ATTRIBUTE]=!0,_initProps),props=convertElementAttributestoReactProps(attributes,initProps);return[_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE,props,title)]}(0,tags.title,tags.titleAttributes)},toString:function toString(){return function generateTitleAsString(type,title,attributes,encode){var attributeString=generateElementAttributesAsString(attributes),flattenedTitle=flattenArray(title);return attributeString?"<"+type+" "+_HelmetConstants.HELMET_ATTRIBUTE+'="true" '+attributeString+">"+encodeSpecialCharacters(flattenedTitle,encode)+"</"+type+">":"<"+type+" "+_HelmetConstants.HELMET_ATTRIBUTE+'="true">'+encodeSpecialCharacters(flattenedTitle,encode)+"</"+type+">"}(type,tags.title,tags.titleAttributes,encode)}};case _HelmetConstants.ATTRIBUTE_NAMES.BODY:case _HelmetConstants.ATTRIBUTE_NAMES.HTML:return{toComponent:function toComponent(){return convertElementAttributestoReactProps(tags)},toString:function toString(){return generateElementAttributesAsString(tags)}};default:return{toComponent:function toComponent(){return function generateTagsAsReactComponent(type,tags){return tags.map((function(tag,i){var _mappedTag,mappedTag=((_mappedTag={key:i})[_HelmetConstants.HELMET_ATTRIBUTE]=!0,_mappedTag);return Object.keys(tag).forEach((function(attribute){var mappedAttribute=_HelmetConstants.REACT_TAG_MAP[attribute]||attribute;if(mappedAttribute===_HelmetConstants.TAG_PROPERTIES.INNER_HTML||mappedAttribute===_HelmetConstants.TAG_PROPERTIES.CSS_TEXT){var content=tag.innerHTML||tag.cssText;mappedTag.dangerouslySetInnerHTML={__html:content}}else mappedTag[mappedAttribute]=tag[attribute]})),_react2.default.createElement(type,mappedTag)}))}(type,tags)},toString:function toString(){return function generateTagsAsString(type,tags,encode){return tags.reduce((function(str,tag){var attributeHtml=Object.keys(tag).filter((function(attribute){return!(attribute===_HelmetConstants.TAG_PROPERTIES.INNER_HTML||attribute===_HelmetConstants.TAG_PROPERTIES.CSS_TEXT)})).reduce((function(string,attribute){var attr=void 0===tag[attribute]?attribute:attribute+'="'+encodeSpecialCharacters(tag[attribute],encode)+'"';return string?string+" "+attr:attr}),""),tagContent=tag.innerHTML||tag.cssText||"",isSelfClosing=-1===_HelmetConstants.SELF_CLOSING_TAGS.indexOf(type);return str+"<"+type+" "+_HelmetConstants.HELMET_ATTRIBUTE+'="true" '+attributeHtml+(isSelfClosing?"/>":">"+tagContent+"</"+type+">")}),"")}(type,tags,encode)}}}};exports.convertReactPropstoHtmlAttributes=function convertReactPropstoHtmlAttributes(props){var initAttributes=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(props).reduce((function(obj,key){return obj[_HelmetConstants.HTML_TAG_MAP[key]||key]=props[key],obj}),initAttributes)},exports.handleClientStateChange=function handleClientStateChange(newState){_helmetCallback&&cancelAnimationFrame(_helmetCallback),newState.defer?_helmetCallback=requestAnimationFrame((function(){commitTagChanges(newState,(function(){_helmetCallback=null}))})):(commitTagChanges(newState),_helmetCallback=null)},exports.mapStateOnServer=function mapStateOnServer(_ref){var baseTag=_ref.baseTag,bodyAttributes=_ref.bodyAttributes,encode=_ref.encode,htmlAttributes=_ref.htmlAttributes,linkTags=_ref.linkTags,metaTags=_ref.metaTags,noscriptTags=_ref.noscriptTags,scriptTags=_ref.scriptTags,styleTags=_ref.styleTags,_ref$title=_ref.title,title=void 0===_ref$title?"":_ref$title,titleAttributes=_ref.titleAttributes;return{base:getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE,baseTag,encode),bodyAttributes:getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY,bodyAttributes,encode),htmlAttributes:getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML,htmlAttributes,encode),link:getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK,linkTags,encode),meta:getMethodsForTag(_HelmetConstants.TAG_NAMES.META,metaTags,encode),noscript:getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT,noscriptTags,encode),script:getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT,scriptTags,encode),style:getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE,styleTags,encode),title:getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE,{title:title,titleAttributes:titleAttributes},encode)}},exports.reducePropsToState=function reducePropsToState(propsList){return{baseTag:getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF],propsList),bodyAttributes:getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY,propsList),defer:getInnermostProperty(propsList,_HelmetConstants.HELMET_PROPS.DEFER),encode:getInnermostProperty(propsList,_HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML,propsList),linkTags:getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK,[_HelmetConstants.TAG_PROPERTIES.REL,_HelmetConstants.TAG_PROPERTIES.HREF],propsList),metaTags:getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META,[_HelmetConstants.TAG_PROPERTIES.NAME,_HelmetConstants.TAG_PROPERTIES.CHARSET,_HelmetConstants.TAG_PROPERTIES.HTTPEQUIV,_HelmetConstants.TAG_PROPERTIES.PROPERTY,_HelmetConstants.TAG_PROPERTIES.ITEM_PROP],propsList),noscriptTags:getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT,[_HelmetConstants.TAG_PROPERTIES.INNER_HTML],propsList),onChangeClientState:getOnChangeClientState(propsList),scriptTags:getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT,[_HelmetConstants.TAG_PROPERTIES.SRC,_HelmetConstants.TAG_PROPERTIES.INNER_HTML],propsList),styleTags:getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE,[_HelmetConstants.TAG_PROPERTIES.CSS_TEXT],propsList),title:getTitleFromPropsList(propsList),titleAttributes:getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE,propsList)}},exports.requestAnimationFrame=requestAnimationFrame,exports.warn=warn}).call(this,__webpack_require__(61))}}]);
//# sourceMappingURL=5.3aabd84d.iframe.bundle.js.map