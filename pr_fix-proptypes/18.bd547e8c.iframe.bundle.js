(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{4995:function(module,exports,__webpack_require__){"use strict";const strictUriEncode=__webpack_require__(5e3),decodeComponent=__webpack_require__(5001),splitOnFirst=__webpack_require__(5002);function validateArrayFormatSeparator(value){if("string"!=typeof value||1!==value.length)throw new TypeError("arrayFormatSeparator must be single character string")}function encode(value,options){return options.encode?options.strict?strictUriEncode(value):encodeURIComponent(value):value}function decode(value,options){return options.decode?decodeComponent(value):value}function removeHash(input){const hashStart=input.indexOf("#");return-1!==hashStart&&(input=input.slice(0,hashStart)),input}function extract(input){const queryStart=(input=removeHash(input)).indexOf("?");return-1===queryStart?"":input.slice(queryStart+1)}function parseValue(value,options){return options.parseNumbers&&!Number.isNaN(Number(value))&&"string"==typeof value&&""!==value.trim()?value=Number(value):!options.parseBooleans||null===value||"true"!==value.toLowerCase()&&"false"!==value.toLowerCase()||(value="true"===value.toLowerCase()),value}function parse(query,options){validateArrayFormatSeparator((options=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},options)).arrayFormatSeparator);const formatter=function parserForArrayFormat(options){let result;switch(options.arrayFormat){case"index":return(key,value,accumulator)=>{result=/\[(\d*)\]$/.exec(key),key=key.replace(/\[\d*\]$/,""),result?(void 0===accumulator[key]&&(accumulator[key]={}),accumulator[key][result[1]]=value):accumulator[key]=value};case"bracket":return(key,value,accumulator)=>{result=/(\[\])$/.exec(key),key=key.replace(/\[\]$/,""),result?void 0!==accumulator[key]?accumulator[key]=[].concat(accumulator[key],value):accumulator[key]=[value]:accumulator[key]=value};case"comma":case"separator":return(key,value,accumulator)=>{const isArray="string"==typeof value&&value.includes(options.arrayFormatSeparator),isEncodedArray="string"==typeof value&&!isArray&&decode(value,options).includes(options.arrayFormatSeparator);value=isEncodedArray?decode(value,options):value;const newValue=isArray||isEncodedArray?value.split(options.arrayFormatSeparator).map(item=>decode(item,options)):null===value?value:decode(value,options);accumulator[key]=newValue};default:return(key,value,accumulator)=>{void 0!==accumulator[key]?accumulator[key]=[].concat(accumulator[key],value):accumulator[key]=value}}}(options),ret=Object.create(null);if("string"!=typeof query)return ret;if(!(query=query.trim().replace(/^[?#&]/,"")))return ret;for(const param of query.split("&")){let[key,value]=splitOnFirst(options.decode?param.replace(/\+/g," "):param,"=");value=void 0===value?null:["comma","separator"].includes(options.arrayFormat)?value:decode(value,options),formatter(decode(key,options),value,ret)}for(const key of Object.keys(ret)){const value=ret[key];if("object"==typeof value&&null!==value)for(const k of Object.keys(value))value[k]=parseValue(value[k],options);else ret[key]=parseValue(value,options)}return!1===options.sort?ret:(!0===options.sort?Object.keys(ret).sort():Object.keys(ret).sort(options.sort)).reduce((result,key)=>{const value=ret[key];return Boolean(value)&&"object"==typeof value&&!Array.isArray(value)?result[key]=function keysSorter(input){return Array.isArray(input)?input.sort():"object"==typeof input?keysSorter(Object.keys(input)).sort((a,b)=>Number(a)-Number(b)).map(key=>input[key]):input}(value):result[key]=value,result},Object.create(null))}exports.extract=extract,exports.parse=parse,exports.stringify=(object,options)=>{if(!object)return"";validateArrayFormatSeparator((options=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},options)).arrayFormatSeparator);const shouldFilter=key=>options.skipNull&&null==object[key]||options.skipEmptyString&&""===object[key],formatter=function encoderForArrayFormat(options){switch(options.arrayFormat){case"index":return key=>(result,value)=>{const index=result.length;return void 0===value||options.skipNull&&null===value||options.skipEmptyString&&""===value?result:null===value?[...result,[encode(key,options),"[",index,"]"].join("")]:[...result,[encode(key,options),"[",encode(index,options),"]=",encode(value,options)].join("")]};case"bracket":return key=>(result,value)=>void 0===value||options.skipNull&&null===value||options.skipEmptyString&&""===value?result:null===value?[...result,[encode(key,options),"[]"].join("")]:[...result,[encode(key,options),"[]=",encode(value,options)].join("")];case"comma":case"separator":return key=>(result,value)=>null==value||0===value.length?result:0===result.length?[[encode(key,options),"=",encode(value,options)].join("")]:[[result,encode(value,options)].join(options.arrayFormatSeparator)];default:return key=>(result,value)=>void 0===value||options.skipNull&&null===value||options.skipEmptyString&&""===value?result:null===value?[...result,encode(key,options)]:[...result,[encode(key,options),"=",encode(value,options)].join("")]}}(options),objectCopy={};for(const key of Object.keys(object))shouldFilter(key)||(objectCopy[key]=object[key]);const keys=Object.keys(objectCopy);return!1!==options.sort&&keys.sort(options.sort),keys.map(key=>{const value=object[key];return void 0===value?"":null===value?encode(key,options):Array.isArray(value)?value.reduce(formatter(key),[]).join("&"):encode(key,options)+"="+encode(value,options)}).filter(x=>x.length>0).join("&")},exports.parseUrl=(url,options)=>{options=Object.assign({decode:!0},options);const[url_,hash]=splitOnFirst(url,"#");return Object.assign({url:url_.split("?")[0]||"",query:parse(extract(url),options)},options&&options.parseFragmentIdentifier&&hash?{fragmentIdentifier:decode(hash,options)}:{})},exports.stringifyUrl=(object,options)=>{options=Object.assign({encode:!0,strict:!0},options);const url=removeHash(object.url).split("?")[0]||"",queryFromUrl=exports.extract(object.url),parsedQueryFromUrl=exports.parse(queryFromUrl,{sort:!1}),query=Object.assign(parsedQueryFromUrl,object.query);let queryString=exports.stringify(query,options);queryString&&(queryString="?"+queryString);let hash=function getHash(url){let hash="";const hashStart=url.indexOf("#");return-1!==hashStart&&(hash=url.slice(hashStart)),hash}(object.url);return object.fragmentIdentifier&&(hash="#"+encode(object.fragmentIdentifier,options)),`${url}${queryString}${hash}`}},4996:function(module,__webpack_exports__,__webpack_require__){"use strict";var defineProperty=__webpack_require__(8),defineProperty_default=__webpack_require__.n(defineProperty),get=(__webpack_require__(11),__webpack_require__(79),__webpack_require__(56),__webpack_require__(21)),get_default=__webpack_require__.n(get),persistedViews={};__webpack_exports__.a={persistViewInfo:function persistViewInfo(location,info){var level=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;persistedViews=Object.assign({},persistedViews,defineProperty_default()({},location,{level:level,info:Object.assign({},get_default()(persistedViews,[location,"info"],{}),info)}))},viewInfoSelector:function viewInfoSelector(location){return get_default()(persistedViews,[location,"info"],{})},clearPersistedViews:function clearPersistedViews(){var level=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;persistedViews=Object.assign({},Object.keys(persistedViews).reduce((function(acc,key){var persistedView=persistedViews[key];return Object.assign({},acc,persistedView.level<level&&defineProperty_default()({},key,persistedView))}),{}))}}},4999:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(35);var query_string=__webpack_require__(4995),query_string_default=__webpack_require__.n(query_string),isObject=__webpack_require__(143),isObject_default=__webpack_require__.n(isObject),mapValues=__webpack_require__(105),mapValues_default=__webpack_require__.n(mapValues),hasJsonStructure=function hasJsonStructure(str){if("string"!=typeof str)return!1;try{var parsed=JSON.parse(str);return"[object Object]"===Object.prototype.toString.call(parsed)}catch(err){return!1}};__webpack_exports__.a={fromQueryString:function fromQueryString(queryString){var obj=query_string_default.a.parse(queryString);return mapValues_default()(obj,(function(value){return hasJsonStructure(value)?JSON.parse(value):value}))},toQueryString:function toQueryString(obj){var stringifiedValues=mapValues_default()(obj,(function(value){return isObject_default()(value)?JSON.stringify(value):value}));return query_string_default.a.stringify(stringifiedValues)}}},5e3:function(module,exports,__webpack_require__){"use strict";module.exports=str=>encodeURIComponent(str).replace(/[!'()*]/g,x=>"%"+x.charCodeAt(0).toString(16).toUpperCase())},5001:function(module,exports,__webpack_require__){"use strict";var singleMatcher=new RegExp("%[a-f0-9]{2}","gi"),multiMatcher=new RegExp("(%[a-f0-9]{2})+","gi");function decodeComponents(components,split){try{return decodeURIComponent(components.join(""))}catch(err){}if(1===components.length)return components;split=split||1;var left=components.slice(0,split),right=components.slice(split);return Array.prototype.concat.call([],decodeComponents(left),decodeComponents(right))}function decode(input){try{return decodeURIComponent(input)}catch(err){for(var tokens=input.match(singleMatcher),i=1;i<tokens.length;i++)tokens=(input=decodeComponents(tokens,i).join("")).match(singleMatcher);return input}}module.exports=function(encodedURI){if("string"!=typeof encodedURI)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof encodedURI+"`");try{return encodedURI=encodedURI.replace(/\+/g," "),decodeURIComponent(encodedURI)}catch(err){return function customDecodeURIComponent(input){for(var replaceMap={"%FE%FF":"��","%FF%FE":"��"},match=multiMatcher.exec(input);match;){try{replaceMap[match[0]]=decodeURIComponent(match[0])}catch(err){var result=decode(match[0]);result!==match[0]&&(replaceMap[match[0]]=result)}match=multiMatcher.exec(input)}replaceMap["%C2"]="�";for(var entries=Object.keys(replaceMap),i=0;i<entries.length;i++){var key=entries[i];input=input.replace(new RegExp(key,"g"),replaceMap[key])}return input}(encodedURI)}}},5002:function(module,exports,__webpack_require__){"use strict";module.exports=(string,separator)=>{if("string"!=typeof string||"string"!=typeof separator)throw new TypeError("Expected the arguments to be of type `string`");if(""===separator)return[string];const separatorIndex=string.indexOf(separator);return-1===separatorIndex?[string]:[string.slice(0,separatorIndex),string.slice(separatorIndex+separator.length)]}},5003:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(94),__webpack_require__(35),__webpack_require__(98),__webpack_require__(64),__webpack_require__(68),__webpack_require__(11);var react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(1),react_redux__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(25),tocco_app_extensions_src_actionEmitter__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__(6),__webpack_require__(76)),tocco_ui__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(2283),tocco_util_src_consoleLogger__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(72),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(0),actions={"input-edit":Object(react__WEBPACK_IMPORTED_MODULE_6__.lazy)((function(){return Promise.all([__webpack_require__.e(2),__webpack_require__.e(6)]).then(__webpack_require__.bind(null,5025))})),delete:Object(react__WEBPACK_IMPORTED_MODULE_6__.lazy)((function(){return Promise.all([__webpack_require__.e(2),__webpack_require__.e(6)]).then(__webpack_require__.bind(null,5026))}))},_ref=Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(tocco_ui__WEBPACK_IMPORTED_MODULE_10__.a,{}),renderLoader=function renderLoader(){return _ref};renderLoader.displayName="renderLoader";var LazyAction=function LazyAction(props){var appId=props.appId,LazyAction=actions[appId];if(!LazyAction)return tocco_util_src_consoleLogger__WEBPACK_IMPORTED_MODULE_11__.a.logError("no action found with id: ".concat(appId)),null;var ActionComponent=Object(react_redux__WEBPACK_IMPORTED_MODULE_7__.connect)(null,{emitAction:function emitAction(action){return tocco_app_extensions_src_actionEmitter__WEBPACK_IMPORTED_MODULE_9__.a.dispatchEmittedAction(action)}})(LazyAction);return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react__WEBPACK_IMPORTED_MODULE_6__.Suspense,{fallback:renderLoader(),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(ActionComponent,Object.assign({},props))})};LazyAction.displayName="LazyAction",LazyAction.__docgenInfo={description:"",methods:[],displayName:"LazyAction",props:{appId:{type:{name:"string"},required:!0,description:""}}},__webpack_exports__.a=LazyAction,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/components/LazyAction/LazyAction.js"]={name:"LazyAction",docgenInfo:LazyAction.__docgenInfo,path:"packages/entity-browser/src/components/LazyAction/LazyAction.js"})},5007:function(module,exports,__webpack_require__){var $=__webpack_require__(45),lastIndexOf=__webpack_require__(5008);$({target:"Array",proto:!0,forced:lastIndexOf!==[].lastIndexOf},{lastIndexOf:lastIndexOf})},5008:function(module,exports,__webpack_require__){"use strict";var toIndexedObject=__webpack_require__(281),toInteger=__webpack_require__(425),toLength=__webpack_require__(186),arrayMethodIsStrict=__webpack_require__(426),min=Math.min,$lastIndexOf=[].lastIndexOf,NEGATIVE_ZERO=!!$lastIndexOf&&1/[1].lastIndexOf(1,-0)<0,STRICT_METHOD=arrayMethodIsStrict("lastIndexOf"),FORCED=NEGATIVE_ZERO||!STRICT_METHOD;module.exports=FORCED?function lastIndexOf(searchElement){if(NEGATIVE_ZERO)return $lastIndexOf.apply(this,arguments)||0;var O=toIndexedObject(this),length=toLength(O.length),index=length-1;for(arguments.length>1&&(index=min(index,toInteger(arguments[1]))),index<0&&(index=length+index);index>=0;index--)if(index in O&&O[index]===searchElement)return index||0;return-1}:$lastIndexOf},5192:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9),_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5),react_router_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(1383),lodash_get__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(37),lodash_get__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__),_utilStyles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(81),_utilStyles__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(36),_utilStyles__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(172);function _templateObject(){var data=_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ","\n  text-decoration: none;\n  color: ",";\n\n  * {\n    color: ",";\n    text-decoration: none;\n  }\n\n  &:hover,\n  &:hover *,\n  &:focus,\n  &:focus * {\n    color: ",";\n    text-decoration: ",";\n  }\n\n  &:active,\n  &:active * {\n    color: ",";\n    text-decoration: ",";\n  }\n"]);return _templateObject=function _templateObject(){return data},data}__webpack_exports__.a=Object(styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.a)(_templateObject(),Object(_utilStyles__WEBPACK_IMPORTED_MODULE_4__.a)(),_utilStyles__WEBPACK_IMPORTED_MODULE_5__.a.color("secondary"),_utilStyles__WEBPACK_IMPORTED_MODULE_5__.a.color("text"),_utilStyles__WEBPACK_IMPORTED_MODULE_5__.a.color("secondaryLight"),(function(_ref){return _ref.neutral?"none":"underline"}),(function(_ref2){var neutral=_ref2.neutral,theme=_ref2.theme;return neutral?Object(_utilStyles__WEBPACK_IMPORTED_MODULE_6__.f)(lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(theme,"colors.text"),2):Object(_utilStyles__WEBPACK_IMPORTED_MODULE_6__.f)(lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(theme,"colors.secondary"),2)}),(function(_ref3){return _ref3.neutral?"none":"underline"}))},5223:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var reducer=__webpack_require__(919),es=__webpack_require__(25),injectIntl=__webpack_require__(376),actionEmitter=__webpack_require__(76),classCallCheck=(__webpack_require__(136),__webpack_require__(35),__webpack_require__(65),__webpack_require__(117)),classCallCheck_default=__webpack_require__.n(classCallCheck),createClass=__webpack_require__(118),createClass_default=__webpack_require__.n(createClass),inherits=__webpack_require__(119),inherits_default=__webpack_require__.n(inherits),possibleConstructorReturn=__webpack_require__(120),possibleConstructorReturn_default=__webpack_require__.n(possibleConstructorReturn),getPrototypeOf=__webpack_require__(73),getPrototypeOf_default=__webpack_require__.n(getPrototypeOf),react=(__webpack_require__(30),__webpack_require__(484),__webpack_require__(75),__webpack_require__(199),__webpack_require__(5007),__webpack_require__(11),__webpack_require__(6),__webpack_require__(1)),react_default=__webpack_require__.n(react),react_router=__webpack_require__(101),RouterLink=__webpack_require__(5192),Button=__webpack_require__(71),main=__webpack_require__(4998),queryString=__webpack_require__(4999),taggedTemplateLiteral=__webpack_require__(13),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_components_browser_esm=__webpack_require__(5),modularScale=__webpack_require__(27);function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  margin-bottom: ",";\n"]);return _templateObject=function _templateObject(){return data},data}var StyledEntityDetailBackButton=styled_components_browser_esm.default.div(_templateObject(),modularScale.a.space(-1)),jsx_runtime=__webpack_require__(0);function _createSuper(Derived){var hasNativeReflectConstruct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var result,Super=getPrototypeOf_default()(Derived);if(hasNativeReflectConstruct){var NewTarget=getPrototypeOf_default()(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return possibleConstructorReturn_default()(this,result)}}var _DetailLinkRelative=function DetailLinkRelative(_ref){var currentKey=_ref.currentKey,entityKey=_ref.entityKey,children=_ref.children,relation=_ref.relation;return Object(jsx_runtime.jsx)(RouterLink.a,{to:"".concat(currentKey,"/").concat(relation,"/").concat(entityKey),children:children})};_DetailLinkRelative.displayName="DetailLinkRelative";var EntityDetail_EntityDetail=function(_React$Component){inherits_default()(EntityDetail,_React$Component);var _super=_createSuper(EntityDetail);function EntityDetail(_props){var _this;return classCallCheck_default()(this,EntityDetail),(_this=_super.call(this,_props)).handleSubGridRowClick=function(_ref2){var id=_ref2.id,relationName=(_ref2.gridName,_ref2.relationName);_this.props.router.history.push("".concat(_this.props.router.match.url,"/").concat(relationName,"/").concat(id))},_this.navigateToCreate=function(relationName){if(relationName)_this.props.router.history.push("".concat(_this.props.router.match.url,"/").concat(relationName,"/"));else{var url=_this.props.router.match.url.replace(/\/$/,""),a=url.substring(0,url.lastIndexOf("/")+1);_this.props.router.history.push(a)}},_this.handleEntityCreated=function(_ref3){var id=_ref3.id;_this.props.setFormTouched(!1);var url=_this.props.router.match.url;url="/"!==url.substr(-1)?url+="/":url,_this.props.router.history.push("".concat(url).concat(id))},_this.navigateToAction=function(definition,selection){var search=queryString.a.toQueryString({selection:selection,actionProperties:definition.properties});_this.props.router.history.push({pathname:"/action/"+definition.appId,state:{definition:definition,selection:selection},search:search})},_this.handleTouchedChange=function(_ref4){var touched=_ref4.touched;_this.props.setFormTouched(touched)},_this.handleGoBack=function(){_this.props.router.history.push(_this.props.detailParams.parentUrl)},_this.getApp=function(_ref5){var entityName=_ref5.entityName,entityId=_ref5.entityId,formName=_ref5.formName,mode=_ref5.mode;return Object(jsx_runtime.jsx)(main.a,{id:"".concat(_this.props.appId,"_detail_").concat(formName,"_").concat(entityId),entityName:entityName,entityId:entityId,formName:formName,mode:mode,navigationStrategy:{DetailLinkRelative:function DetailLinkRelative(props){return Object(jsx_runtime.jsx)(_DetailLinkRelative,Object.assign({},props,{currentKey:entityId}))},navigateToCreateRelative:_this.navigateToCreate,navigateToActionRelative:_this.navigateToAction},onSubGridRowClick:_this.handleSubGridRowClick,onEntityCreated:_this.handleEntityCreated,onEntityDeleted:_this.handleGoBack,onTouchedChange:_this.handleTouchedChange,emitAction:function emitAction(action){_this.props.dispatchEmittedAction(action)},theme:{}})},_this.msg=function(id){return _this.props.intl.formatMessage({id:id})},_this.render=function(){return Object(jsx_runtime.jsxs)(react_default.a.Fragment,{children:[Object(jsx_runtime.jsx)(react_router.b,{when:_this.props.formTouched,message:_this.msg("client.entity-browser.detail.confirmTouchedFormLeave")}),_this.props.detailParams&&Object(jsx_runtime.jsxs)(react_default.a.Fragment,{children:[_this.props.detailParams.showBackButton&&Object(jsx_runtime.jsx)(StyledEntityDetailBackButton,{children:Object(jsx_runtime.jsx)(Button.a,{"data-cy":"entity-detail_back-button",icon:"chevron-left",label:_this.msg("client.entity-browser.back"),look:"raised",onClick:_this.handleGoBack})}),_this.getApp(_this.props.detailParams)]})]})},_this.props.loadDetailParams(_this.props.router.match.url),_this.props.setFormTouched(!1),_this}return createClass_default()(EntityDetail,[{key:"componentWillUnmount",value:function componentWillUnmount(){this.props.clearDetailParams()}}]),EntityDetail}(react_default.a.Component);EntityDetail_EntityDetail.__docgenInfo={description:"",methods:[{name:"handleSubGridRowClick",docblock:null,modifiers:[],params:[{name:"{id, gridName, relationName}",type:null}],returns:null},{name:"navigateToCreate",docblock:null,modifiers:[],params:[{name:"relationName",type:null}],returns:null},{name:"handleEntityCreated",docblock:null,modifiers:[],params:[{name:"{id}",type:null}],returns:null},{name:"navigateToAction",docblock:null,modifiers:[],params:[{name:"definition",type:null},{name:"selection",type:null}],returns:null},{name:"handleTouchedChange",docblock:null,modifiers:[],params:[{name:"{touched}",type:null}],returns:null},{name:"handleGoBack",docblock:null,modifiers:[],params:[],returns:null},{name:"getApp",docblock:null,modifiers:[],params:[{name:"{entityName, entityId, formName, mode}",type:null}],returns:null},{name:"msg",docblock:null,modifiers:[],params:[{name:"id",type:null}],returns:null},{name:"render",docblock:null,modifiers:[],params:[],returns:null}],displayName:"EntityDetail",props:{intl:{type:{name:"object"},required:!0,description:""},dispatchEmittedAction:{type:{name:"func"},required:!0,description:""},loadDetailParams:{type:{name:"func"},required:!0,description:""},clearDetailParams:{type:{name:"func"},required:!0,description:""},setFormTouched:{type:{name:"func"},required:!0,description:""},router:{type:{name:"object"},required:!0,description:""},detailParams:{type:{name:"object"},required:!1,description:""},formTouched:{type:{name:"bool"},required:!1,description:""},showSubGridsCreateButton:{type:{name:"bool"},required:!1,description:""},appId:{type:{name:"string"},required:!1,description:""}}};var components_EntityDetail_EntityDetail=EntityDetail_EntityDetail;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/detail/components/EntityDetail/EntityDetail.js"]={name:"EntityDetail",docgenInfo:EntityDetail_EntityDetail.__docgenInfo,path:"packages/entity-browser/src/routes/detail/components/EntityDetail/EntityDetail.js"});var components_EntityDetail=components_EntityDetail_EntityDetail,setDetailParams=function setDetailParams(detailParams){return{type:"root/SET_DETAIL_PARAMS",payload:{detailParams:detailParams}}},LazyAction=__webpack_require__(5003),mapActionCreators={loadDetailParams:function loadDetailParams(url){return{type:"root/LOAD_DETAIL_PARAMS",payload:{url:url}}},clearDetailParams:function clearDetailParams(){return{type:"root/CLEAR_DETAIL_PARAMS"}},setFormTouched:function setFormTouched(formTouched){return{type:"detailView/SET_FORM_TOUCHED",payload:{formTouched:formTouched}}},dispatchEmittedAction:actionEmitter.a.dispatchEmittedAction},EntityDetailContainer=Object(es.connect)((function mapStateToProps(state,props){return{appId:state.entityBrowser.appId,detailParams:state.detail.detailParams,formTouched:state.detail.formTouched,locale:state.input.locale,actionAppComponent:LazyAction.a}}),mapActionCreators)(Object(injectIntl.c)(components_EntityDetail)),regenerator=__webpack_require__(3),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=__webpack_require__(2),rest=(__webpack_require__(154),__webpack_require__(155),__webpack_require__(19)),_marked=regenerator_default.a.mark(fetchModel),defaultModelTransformer=function defaultModelTransformer(json){var model={};return json.fields.forEach((function(field){model[field.fieldName]=Object.assign({},field)})),json.relations.forEach((function(relation){model[relation.relationName]=Object.assign({type:"relation"},relation)})),model};function fetchModel(entityName){var transformer,resp,_args=arguments;return regenerator_default.a.wrap((function fetchModel$(_context){for(;;)switch(_context.prev=_context.next){case 0:return transformer=_args.length>1&&void 0!==_args[1]?_args[1]:defaultModelTransformer,_context.next=3,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,"entities/".concat(entityName,"/model"));case 3:return resp=_context.sent,_context.next=6,Object(redux_saga_effects_npm_proxy_esm.b)(transformer,resp.body);case 6:return _context.abrupt("return",_context.sent);case 7:case"end":return _context.stop()}}),_marked)}__webpack_require__(82),__webpack_require__(240),__webpack_require__(153),__webpack_require__(256);var util_parseUrl=function parseUrl(url){var parts=url.split("/").filter((function(part){return!!part})),lastPart=parts[parts.length-1],modelPaths=parts.filter((function(el,idx){return idx>1&&idx%2==0}));if(function isId(part){return!isNaN(part)}(lastPart))return{modelPaths:modelPaths,entityId:parts[parts.length-1],parentUrl:"/"+parts.slice(0,-2).join("/")};return{modelPaths:modelPaths,entityId:void 0,parentUrl:"/"+parts.slice(0,-1).join("/")}},util_showBackButton=function showBackButton(initialKey,modelPaths){return 0!==modelPaths.length||(!initialKey||isNaN(initialKey))},modes={CREATE:"create",UPDATE:"update"},detail_getMode=function getMode(entityId){return void 0===entityId?modes.CREATE:modes.UPDATE},sagas_marked=regenerator_default.a.mark(sagas),_marked2=regenerator_default.a.mark(sagas_clearDetailParams),_marked3=regenerator_default.a.mark(loadEntityDetail),_marked4=regenerator_default.a.mark(getTargetEntity),entityBrowserSelector=function entityBrowserSelector(state){return state.entityBrowser},inputSelector=function inputSelector(state){return state.input};function sagas(){return regenerator_default.a.wrap((function sagas$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.j)("root/LOAD_DETAIL_PARAMS",loadEntityDetail),Object(redux_saga_effects_npm_proxy_esm.j)("root/CLEAR_DETAIL_PARAMS",sagas_clearDetailParams)]);case 2:case"end":return _context.stop()}}),sagas_marked)}function sagas_clearDetailParams(){return regenerator_default.a.wrap((function clearDetailParams$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(redux_saga_effects_npm_proxy_esm.e)(setDetailParams(void 0));case 2:case"end":return _context2.stop()}}),_marked2)}function loadEntityDetail(_ref){var payload,_yield$call,modelPaths,entityId,parentUrl,_yield$select,entityName,formBase,mode,targetEntityName,formName,_yield$select2,initialKey,showBackButton,detailParams;return regenerator_default.a.wrap((function loadEntityDetail$(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return payload=_ref.payload,_context3.next=3,Object(redux_saga_effects_npm_proxy_esm.b)(util_parseUrl,payload.url);case 3:return _yield$call=_context3.sent,modelPaths=_yield$call.modelPaths,entityId=_yield$call.entityId,parentUrl=_yield$call.parentUrl,_context3.next=9,Object(redux_saga_effects_npm_proxy_esm.f)(entityBrowserSelector);case 9:return _yield$select=_context3.sent,entityName=_yield$select.entityName,formBase=_yield$select.formBase,_context3.next=14,Object(redux_saga_effects_npm_proxy_esm.b)(detail_getMode,entityId);case 14:if(mode=_context3.sent,targetEntityName=entityName,formName=formBase,!(modelPaths&&modelPaths.length>0)){_context3.next=22;break}return _context3.next=20,Object(redux_saga_effects_npm_proxy_esm.b)(getTargetEntity,entityName,modelPaths);case 20:targetEntityName=_context3.sent,formName="".concat(formBase,"_").concat(targetEntityName);case 22:return _context3.next=24,Object(redux_saga_effects_npm_proxy_esm.f)(inputSelector);case 24:return _yield$select2=_context3.sent,initialKey=_yield$select2.initialKey,_context3.next=28,Object(redux_saga_effects_npm_proxy_esm.b)(util_showBackButton,initialKey,modelPaths);case 28:return showBackButton=_context3.sent,detailParams={mode:mode,entityId:entityId,entityName:targetEntityName,formName:formName,parentUrl:parentUrl,showBackButton:showBackButton},_context3.next=32,Object(redux_saga_effects_npm_proxy_esm.e)(setDetailParams(detailParams));case 32:case"end":return _context3.stop()}}),_marked3)}function getTargetEntity(entityName,modelPaths){var targetEntityName,model,i,path,relation;return regenerator_default.a.wrap((function getTargetEntity$(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return targetEntityName=entityName,_context4.next=3,Object(redux_saga_effects_npm_proxy_esm.b)(fetchModel,targetEntityName);case 3:model=_context4.sent,i=0;case 5:if(!(i<modelPaths.length)){_context4.next=18;break}if(path=modelPaths[i],relation=model[path]){_context4.next=10;break}throw new Error("No such path '".concat(path,"' found on entity model '").concat(targetEntityName,"'"));case 10:if(targetEntityName=relation.targetEntity,!(i+1<modelPaths.length)){_context4.next=15;break}return _context4.next=14,Object(redux_saga_effects_npm_proxy_esm.b)(fetchModel,targetEntityName);case 14:model=_context4.sent;case 15:i++,_context4.next=5;break;case 18:return _context4.abrupt("return",targetEntityName);case 19:case"end":return _context4.stop()}}),_marked4)}var _ACTION_HANDLERS,defineProperty=__webpack_require__(8),defineProperty_default=__webpack_require__.n(defineProperty),src_reducer=__webpack_require__(18),ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"detailView/SET_FORM_TOUCHED",src_reducer.a.singleTransferReducer("formTouched")),defineProperty_default()(_ACTION_HANDLERS,"root/SET_DETAIL_PARAMS",src_reducer.a.singleTransferReducer("detailParams")),_ACTION_HANDLERS),initialState={detailParams:void 0,formTouched:!1};function reducer_reducer(){var state=arguments.length>0&&void 0!==arguments[0]?arguments[0]:initialState,action=arguments.length>1?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/detail/modules/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/entity-browser/src/routes/detail/modules/reducer.js"});var modules=reducer_reducer;__webpack_exports__.default={container:EntityDetailContainer,reducers:{detail:modules,form:reducer.a},sagas:[sagas]}}}]);