(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{3399:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var reducer=__webpack_require__(425),es=__webpack_require__(39),index_es=__webpack_require__(13),actionEmitter=__webpack_require__(121),classCallCheck=(__webpack_require__(24),__webpack_require__(1034),__webpack_require__(65),__webpack_require__(170),__webpack_require__(140),__webpack_require__(45)),classCallCheck_default=__webpack_require__.n(classCallCheck),createClass=__webpack_require__(49),createClass_default=__webpack_require__.n(createClass),possibleConstructorReturn=__webpack_require__(46),possibleConstructorReturn_default=__webpack_require__.n(possibleConstructorReturn),getPrototypeOf=__webpack_require__(47),getPrototypeOf_default=__webpack_require__.n(getPrototypeOf),assertThisInitialized=__webpack_require__(44),assertThisInitialized_default=__webpack_require__.n(assertThisInitialized),inherits=__webpack_require__(48),inherits_default=__webpack_require__.n(inherits),defineProperty=__webpack_require__(4),defineProperty_default=__webpack_require__.n(defineProperty),react=(__webpack_require__(11),__webpack_require__(0)),react_default=__webpack_require__.n(react),react_router=__webpack_require__(179),src=__webpack_require__(5),main=__webpack_require__(3330),queryString=__webpack_require__(3323),taggedTemplateLiteral=__webpack_require__(28),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral);function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  margin-bottom: ",";\n"]);return _templateObject=function(){return data},data}var StyledEntityDetailBackButton=__webpack_require__(7).default.div(_templateObject(),src.M.space(-1)),EntityDetail_EntityDetail=function(_React$Component){function EntityDetail(props){var _this;return classCallCheck_default()(this,EntityDetail),_this=possibleConstructorReturn_default()(this,getPrototypeOf_default()(EntityDetail).call(this,props)),defineProperty_default()(assertThisInitialized_default()(_this),"handleSubGridRowClick",(function(_ref){var id=_ref.id,relationName=(_ref.gridName,_ref.relationName);_this.props.router.history.push("".concat(_this.props.router.match.url,"/").concat(relationName,"/").concat(id))})),defineProperty_default()(assertThisInitialized_default()(_this),"handleNavigateToCreate",(function(relationName){if(relationName)_this.props.router.history.push("".concat(_this.props.router.match.url,"/").concat(relationName,"/"));else{var url=_this.props.router.match.url.replace(/\/$/,""),a=url.substring(0,url.lastIndexOf("/")+1);_this.props.router.history.push(a)}})),defineProperty_default()(assertThisInitialized_default()(_this),"handleEntityCreated",(function(_ref2){var id=_ref2.id;_this.props.setFormTouched(!1);var url=_this.props.router.match.url;url="/"!==url.substr(-1)?url+="/":url,_this.props.router.history.push("".concat(url).concat(id))})),defineProperty_default()(assertThisInitialized_default()(_this),"handleNavigateToAction",(function(_ref3){var definition=_ref3.definition,selection=_ref3.selection,search=queryString.a.toQueryString({selection:selection,actionProperties:definition.properties});_this.props.router.history.push({pathname:"/action/"+definition.appId,state:{definition:definition,selection:selection},search:search})})),defineProperty_default()(assertThisInitialized_default()(_this),"handleTouchedChange",(function(_ref4){var touched=_ref4.touched;_this.props.setFormTouched(touched)})),defineProperty_default()(assertThisInitialized_default()(_this),"handleGoBack",(function(){_this.props.router.history.push(_this.props.detailParams.parentUrl)})),defineProperty_default()(assertThisInitialized_default()(_this),"getApp",(function(_ref5){var entityName=_ref5.entityName,entityId=_ref5.entityId,formName=_ref5.formName,mode=_ref5.mode;return react_default.a.createElement(main.a,{id:"".concat(_this.props.appId,"_detail_").concat(formName,"_").concat(entityId),entityName:entityName,entityId:entityId,formName:formName,mode:mode,onSubGridRowClick:_this.handleSubGridRowClick,onNavigateToCreate:_this.handleNavigateToCreate,onEntityCreated:_this.handleEntityCreated,onEntityDeleted:_this.handleGoBack,onTouchedChange:_this.handleTouchedChange,onNavigateToAction:_this.handleNavigateToAction,emitAction:function emitAction(action){_this.props.dispatchEmittedAction(action)},theme:{}})})),defineProperty_default()(assertThisInitialized_default()(_this),"msg",(function(id){return _this.props.intl.formatMessage({id:id})})),defineProperty_default()(assertThisInitialized_default()(_this),"render",(function(){return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(react_router.a,{when:_this.props.formTouched,message:_this.msg("client.entity-browser.detail.confirmTouchedFormLeave")}),_this.props.detailParams&&react_default.a.createElement(react_default.a.Fragment,null,_this.props.detailParams.showBackButton&&react_default.a.createElement(StyledEntityDetailBackButton,null,react_default.a.createElement(src.d,{"data-cy":"entity-detail_back-button",icon:"chevron-left",label:_this.msg("client.entity-browser.back"),look:"raised",onClick:_this.handleGoBack})),_this.getApp(_this.props.detailParams)))})),_this.props.loadDetailParams(_this.props.router.match.url),_this.props.setFormTouched(!1),_this}return inherits_default()(EntityDetail,_React$Component),createClass_default()(EntityDetail,[{key:"componentWillUnmount",value:function componentWillUnmount(){this.props.clearDetailParams()}}]),EntityDetail}(react_default.a.Component);EntityDetail_EntityDetail.__docgenInfo={description:"",methods:[{name:"handleSubGridRowClick",docblock:null,modifiers:[],params:[{name:"{id, gridName, relationName}",type:null}],returns:null},{name:"handleNavigateToCreate",docblock:null,modifiers:[],params:[{name:"relationName",type:null}],returns:null},{name:"handleEntityCreated",docblock:null,modifiers:[],params:[{name:"{id}",type:null}],returns:null},{name:"handleNavigateToAction",docblock:null,modifiers:[],params:[{name:"{definition, selection}",type:null}],returns:null},{name:"handleTouchedChange",docblock:null,modifiers:[],params:[{name:"{touched}",type:null}],returns:null},{name:"handleGoBack",docblock:null,modifiers:[],params:[],returns:null},{name:"getApp",docblock:null,modifiers:[],params:[{name:"{entityName, entityId, formName, mode}",type:null}],returns:null},{name:"msg",docblock:null,modifiers:[],params:[{name:"id",type:null}],returns:null},{name:"render",docblock:null,modifiers:[],params:[],returns:null}],displayName:"EntityDetail",props:{intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""},dispatchEmittedAction:{type:{name:"func"},required:!0,description:""},loadDetailParams:{type:{name:"func"},required:!0,description:""},clearDetailParams:{type:{name:"func"},required:!0,description:""},setFormTouched:{type:{name:"func"},required:!0,description:""},router:{type:{name:"object"},required:!0,description:""},detailParams:{type:{name:"object"},required:!1,description:""},formTouched:{type:{name:"bool"},required:!1,description:""},showSubGridsCreateButton:{type:{name:"bool"},required:!1,description:""},appId:{type:{name:"string"},required:!1,description:""}}};var components_EntityDetail_EntityDetail=EntityDetail_EntityDetail;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/detail/components/EntityDetail/EntityDetail.js"]={name:"EntityDetail",docgenInfo:EntityDetail_EntityDetail.__docgenInfo,path:"packages/entity-browser/src/routes/detail/components/EntityDetail/EntityDetail.js"});var components_EntityDetail=components_EntityDetail_EntityDetail,setDetailParams=function(detailParams){return{type:"root/SET_DETAIL_PARAMS",payload:{detailParams:detailParams}}},mapActionCreators={loadDetailParams:function(url){return{type:"root/LOAD_DETAIL_PARAMS",payload:{url:url}}},clearDetailParams:function(){return{type:"root/CLEAR_DETAIL_PARAMS"}},setFormTouched:function(formTouched){return{type:"detailView/SET_FORM_TOUCHED",payload:{formTouched:formTouched}}},dispatchEmittedAction:actionEmitter.a.dispatchEmittedAction},EntityDetailContainer=Object(es.connect)((function(state){return{appId:state.entityBrowser.appId,detailParams:state.detail.detailParams,formTouched:state.detail.formTouched,locale:state.input.locale}}),mapActionCreators)(Object(index_es.injectIntl)(components_EntityDetail)),regenerator=__webpack_require__(2),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=(__webpack_require__(42),__webpack_require__(1)),rest=(__webpack_require__(16),__webpack_require__(25),__webpack_require__(19),__webpack_require__(26),__webpack_require__(22),__webpack_require__(29),__webpack_require__(30),__webpack_require__(15),__webpack_require__(20),__webpack_require__(33)),_marked=regenerator_default.a.mark(fetchModel);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(source,!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}var defaultModelTransformer=function(json){var model={};return json.fields.forEach((function(field){model[field.fieldName]=_objectSpread({},field)})),json.relations.forEach((function(relation){model[relation.relationName]=_objectSpread({type:"relation"},relation)})),model};function fetchModel(entityName){var transformer,resp,_args=arguments;return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return transformer=1<_args.length&&void 0!==_args[1]?_args[1]:defaultModelTransformer,_context.next=3,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,"entities/".concat(entityName,"/model"));case 3:return resp=_context.sent,_context.next=6,Object(redux_saga_effects_npm_proxy_esm.b)(transformer,resp.body);case 6:return _context.abrupt("return",_context.sent);case 7:case"end":return _context.stop()}}),_marked)}__webpack_require__(115),__webpack_require__(122),__webpack_require__(131);var util_parseUrl=function(url){var parts=url.split("/").filter((function(part){return!!part})),lastPart=parts[parts.length-1],modelPaths=parts.filter((function(el,idx){return 1<idx&&0==idx%2}));return isNaN(lastPart)?{modelPaths:modelPaths,entityId:void 0,parentUrl:"/"+parts.slice(0,-1).join("/")}:{modelPaths:modelPaths,entityId:parts[parts.length-1],parentUrl:"/"+parts.slice(0,-2).join("/")}},util_showBackButton=function(initialKey,modelPaths){return 0!==modelPaths.length||(!initialKey||isNaN(initialKey))},modes={CREATE:"create",UPDATE:"update"},detail_getMode=function(entityId){return void 0===entityId?modes.CREATE:modes.UPDATE},sagas_marked=regenerator_default.a.mark(sagas),_marked2=regenerator_default.a.mark(sagas_clearDetailParams),_marked3=regenerator_default.a.mark(loadEntityDetail),_marked4=regenerator_default.a.mark(getTargetEntity),entityBrowserSelector=function(state){return state.entityBrowser},inputSelector=function(state){return state.input};function sagas(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.j)("root/LOAD_DETAIL_PARAMS",loadEntityDetail),Object(redux_saga_effects_npm_proxy_esm.j)("root/CLEAR_DETAIL_PARAMS",sagas_clearDetailParams)]);case 2:case"end":return _context.stop()}}),sagas_marked)}function sagas_clearDetailParams(){return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(redux_saga_effects_npm_proxy_esm.e)(setDetailParams(void 0));case 2:case"end":return _context2.stop()}}),_marked2)}function loadEntityDetail(_ref){var payload,_ref2,modelPaths,entityId,parentUrl,_ref3,entityName,formBase,mode,targetEntityName,formName,_ref4,initialKey,showBackButton,detailParams;return regenerator_default.a.wrap((function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return payload=_ref.payload,_context3.next=3,Object(redux_saga_effects_npm_proxy_esm.b)(util_parseUrl,payload.url);case 3:return _ref2=_context3.sent,modelPaths=_ref2.modelPaths,entityId=_ref2.entityId,parentUrl=_ref2.parentUrl,_context3.next=9,Object(redux_saga_effects_npm_proxy_esm.f)(entityBrowserSelector);case 9:return _ref3=_context3.sent,entityName=_ref3.entityName,formBase=_ref3.formBase,_context3.next=14,Object(redux_saga_effects_npm_proxy_esm.b)(detail_getMode,entityId);case 14:if(mode=_context3.sent,targetEntityName=entityName,formName=formBase,!(modelPaths&&0<modelPaths.length)){_context3.next=22;break}return _context3.next=20,Object(redux_saga_effects_npm_proxy_esm.b)(getTargetEntity,entityName,modelPaths);case 20:targetEntityName=_context3.sent,formName="".concat(formBase,"_").concat(targetEntityName);case 22:return _context3.next=24,Object(redux_saga_effects_npm_proxy_esm.f)(inputSelector);case 24:return _ref4=_context3.sent,initialKey=_ref4.initialKey,_context3.next=28,Object(redux_saga_effects_npm_proxy_esm.b)(util_showBackButton,initialKey,modelPaths);case 28:return showBackButton=_context3.sent,detailParams={mode:mode,entityId:entityId,entityName:targetEntityName,formName:formName,parentUrl:parentUrl,showBackButton:showBackButton},_context3.next=32,Object(redux_saga_effects_npm_proxy_esm.e)(setDetailParams(detailParams));case 32:case"end":return _context3.stop()}}),_marked3)}function getTargetEntity(entityName,modelPaths){var targetEntityName,model,i,path,relation;return regenerator_default.a.wrap((function(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return targetEntityName=entityName,_context4.next=3,Object(redux_saga_effects_npm_proxy_esm.b)(fetchModel,targetEntityName);case 3:model=_context4.sent,i=0;case 5:if(!(i<modelPaths.length)){_context4.next=18;break}if(path=modelPaths[i],relation=model[path]){_context4.next=10;break}throw new Error("No such path '".concat(path,"' found on entity model '").concat(targetEntityName,"'"));case 10:if(targetEntityName=relation.targetEntity,!(i+1<modelPaths.length)){_context4.next=15;break}return _context4.next=14,Object(redux_saga_effects_npm_proxy_esm.b)(fetchModel,targetEntityName);case 14:model=_context4.sent;case 15:i++,_context4.next=5;break;case 18:return _context4.abrupt("return",targetEntityName);case 19:case"end":return _context4.stop()}}),_marked4)}var _ACTION_HANDLERS,src_reducer=__webpack_require__(23),ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"detailView/SET_FORM_TOUCHED",src_reducer.a.singleTransferReducer("formTouched")),defineProperty_default()(_ACTION_HANDLERS,"root/SET_DETAIL_PARAMS",src_reducer.a.singleTransferReducer("detailParams")),_ACTION_HANDLERS),initialState={detailParams:void 0,formTouched:!1};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/detail/modules/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/entity-browser/src/routes/detail/modules/reducer.js"});var modules=reducer_reducer;__webpack_exports__.default={container:EntityDetailContainer,reducers:{detail:modules,form:reducer.a},sagas:[sagas]}}}]);
//# sourceMappingURL=14.9c0f14fab9c5f6d46874.bundle.js.map