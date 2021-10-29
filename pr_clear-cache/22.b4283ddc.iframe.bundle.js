(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{4993:function(module,__webpack_exports__,__webpack_require__){"use strict";var defineProperty=__webpack_require__(8),defineProperty_default=__webpack_require__.n(defineProperty),get=(__webpack_require__(11),__webpack_require__(80),__webpack_require__(56),__webpack_require__(21)),get_default=__webpack_require__.n(get),persistedViews={};__webpack_exports__.a={persistViewInfo:function persistViewInfo(location,info){var level=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;persistedViews=Object.assign({},persistedViews,defineProperty_default()({},location,{level:level,info:Object.assign({},get_default()(persistedViews,[location,"info"],{}),info)}))},viewInfoSelector:function viewInfoSelector(location){return get_default()(persistedViews,[location,"info"],{})},clearPersistedViews:function clearPersistedViews(){var level=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;persistedViews=Object.assign({},Object.keys(persistedViews).reduce((function(acc,key){var persistedView=persistedViews[key];return Object.assign({},acc,persistedView.level<level&&defineProperty_default()({},key,persistedView))}),{}))}}},4997:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(35);var query_string=__webpack_require__(4995),query_string_default=__webpack_require__.n(query_string),isObject=__webpack_require__(142),isObject_default=__webpack_require__.n(isObject),mapValues=__webpack_require__(104),mapValues_default=__webpack_require__.n(mapValues),hasJsonStructure=function hasJsonStructure(str){if("string"!=typeof str)return!1;try{var parsed=JSON.parse(str);return"[object Object]"===Object.prototype.toString.call(parsed)}catch(err){return!1}};__webpack_exports__.a={fromQueryString:function fromQueryString(queryString){var obj=query_string_default.a.parse(queryString);return mapValues_default()(obj,(function(value){return hasJsonStructure(value)?JSON.parse(value):value}))},toQueryString:function toQueryString(obj){var stringifiedValues=mapValues_default()(obj,(function(value){return isObject_default()(value)?JSON.stringify(value):value}));return query_string_default.a.stringify(stringifiedValues)}}},4998:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(94),__webpack_require__(35),__webpack_require__(98),__webpack_require__(65),__webpack_require__(69),__webpack_require__(11);var react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(1),react_redux__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(25),tocco_app_extensions_src_actionEmitter__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__(6),__webpack_require__(77)),tocco_ui__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(2280),tocco_util_src_consoleLogger__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(73),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(0),actions={"input-edit":Object(react__WEBPACK_IMPORTED_MODULE_6__.lazy)((function(){return Promise.all([__webpack_require__.e(3),__webpack_require__.e(7)]).then(__webpack_require__.bind(null,5023))})),delete:Object(react__WEBPACK_IMPORTED_MODULE_6__.lazy)((function(){return Promise.all([__webpack_require__.e(3),__webpack_require__.e(7)]).then(__webpack_require__.bind(null,5024))}))},_ref=Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(tocco_ui__WEBPACK_IMPORTED_MODULE_10__.a,{}),renderLoader=function renderLoader(){return _ref};renderLoader.displayName="renderLoader";var LazyAction=function LazyAction(props){var appId=props.appId,LazyAction=actions[appId];if(!LazyAction)return tocco_util_src_consoleLogger__WEBPACK_IMPORTED_MODULE_11__.a.logError("no action found with id: ".concat(appId)),null;var ActionComponent=Object(react_redux__WEBPACK_IMPORTED_MODULE_7__.connect)(null,{emitAction:function emitAction(action){return tocco_app_extensions_src_actionEmitter__WEBPACK_IMPORTED_MODULE_9__.a.dispatchEmittedAction(action)}})(LazyAction);return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react__WEBPACK_IMPORTED_MODULE_6__.Suspense,{fallback:renderLoader(),children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(ActionComponent,Object.assign({},props))})};LazyAction.displayName="LazyAction",LazyAction.__docgenInfo={description:"",methods:[],displayName:"LazyAction",props:{appId:{type:{name:"string"},required:!0,description:""}}},__webpack_exports__.a=LazyAction,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/components/LazyAction/LazyAction.js"]={name:"LazyAction",docgenInfo:LazyAction.__docgenInfo,path:"packages/entity-browser/src/components/LazyAction/LazyAction.js"})},5021:function(module,__webpack_exports__,__webpack_require__){"use strict";var _LazyAction__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4998);__webpack_require__.d(__webpack_exports__,"a",(function(){return _LazyAction__WEBPACK_IMPORTED_MODULE_0__.a}))},5190:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9),_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5),react_router_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4992),lodash_get__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(37),lodash_get__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__),_utilStyles__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(82),_utilStyles__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(36),_utilStyles__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(171);function _templateObject(){var data=_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ","\n  text-decoration: none;\n  color: ",";\n\n  * {\n    color: ",";\n    text-decoration: none;\n  }\n\n  &:hover,\n  &:hover *,\n  &:focus,\n  &:focus * {\n    color: ",";\n    text-decoration: ",";\n  }\n\n  &:active,\n  &:active * {\n    color: ",";\n    text-decoration: ",";\n  }\n"]);return _templateObject=function _templateObject(){return data},data}__webpack_exports__.a=Object(styled_components__WEBPACK_IMPORTED_MODULE_1__.default)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.a)(_templateObject(),Object(_utilStyles__WEBPACK_IMPORTED_MODULE_4__.a)(),_utilStyles__WEBPACK_IMPORTED_MODULE_5__.a.color("secondary"),_utilStyles__WEBPACK_IMPORTED_MODULE_5__.a.color("text"),_utilStyles__WEBPACK_IMPORTED_MODULE_5__.a.color("secondaryLight"),(function(_ref){return _ref.neutral?"none":"underline"}),(function(_ref2){var neutral=_ref2.neutral,theme=_ref2.theme;return neutral?Object(_utilStyles__WEBPACK_IMPORTED_MODULE_6__.f)(lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(theme,"colors.text"),2):Object(_utilStyles__WEBPACK_IMPORTED_MODULE_6__.f)(lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(theme,"colors.secondary"),2)}),(function(_ref3){return _ref3.neutral?"none":"underline"}))},5226:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(30);var es=__webpack_require__(25),actionEmitter=__webpack_require__(77),objectWithoutProperties=__webpack_require__(1391),objectWithoutProperties_default=__webpack_require__.n(objectWithoutProperties),queryString=(__webpack_require__(483),__webpack_require__(76),__webpack_require__(11),__webpack_require__(1),__webpack_require__(6),__webpack_require__(4997)),viewPersistor=__webpack_require__(4993),RouterLink=__webpack_require__(5190),main=__webpack_require__(1381),LazyAction=__webpack_require__(5021),jsx_runtime=__webpack_require__(0),ListView_DetailLinkRelative=function DetailLinkRelative(_ref){var entityKey=_ref.entityKey,children=_ref.children,relation=_ref.relation;return Object(jsx_runtime.jsx)(RouterLink.a,{to:"".concat(relation?relation+"/":"","detail/").concat(entityKey),children:children})};ListView_DetailLinkRelative.displayName="DetailLinkRelative";var ListView_ListView=function ListView(_ref2){var storeId=_ref2.storeId,router=_ref2.router,props=objectWithoutProperties_default()(_ref2,["storeId","router"]);return Object(jsx_runtime.jsx)(main.a,Object.assign({},props,{onRowClick:function handleRowClick(e){router.history.push("/detail/".concat(e.id))},showLink:!0,navigationStrategy:{DetailLinkRelative:ListView_DetailLinkRelative,navigateToActionRelative:function navigateToActionRelative(definition,selection){return function navigateToAction(history,definition,selection){var search=queryString.a.toQueryString({selection:selection,actionProperties:definition.properties});history.push({pathname:"/action/"+definition.appId,state:{definition:definition,selection:selection},search:search})}(router.history,definition,selection)},navigateToCreateRelative:function navigateToCreateRelative(relationName){return function navigateToCreate(_ref3){var history=_ref3.history,match=_ref3.match,relationName=_ref3.relationName;relationName?history.push("".concat(match,"/").concat(relationName,"/")):history.push("/detail")}({relationName:relationName,history:router.history,match:router.match})}},searchFormPosition:"top",actionAppComponent:LazyAction.a,store:viewPersistor.a.viewInfoSelector(storeId).store,onStoreCreate:function onStoreCreate(store){viewPersistor.a.persistViewInfo(storeId,{store:store},0)}}))};ListView_ListView.displayName="ListView",ListView_ListView.__docgenInfo={description:"",methods:[],displayName:"ListView",props:{id:{type:{name:"string"},required:!0,description:""},storeId:{type:{name:"string"},required:!0,description:""},local:{type:{name:"string"},required:!0,description:""},entityName:{type:{name:"string"},required:!0,description:""},formName:{type:{name:"string"},required:!0,description:""},searchFormType:{type:{name:"string"},required:!0,description:""},limit:{type:{name:"number"},required:!1,description:""},searchFitlers:{type:{name:"array"},required:!1,description:""},preselectedSearchFields:{type:{name:"array"},required:!1,description:""},disableSimpleSearch:{type:{name:"bool"},required:!1,description:""},simpleSearchFields:{type:{name:"string"},required:!1,description:""},router:{type:{name:"object"},required:!0,description:""}}};var components_ListView=ListView_ListView;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/list/components/ListView.js"]={name:"ListView",docgenInfo:ListView_ListView.__docgenInfo,path:"packages/entity-browser/src/routes/list/components/ListView.js"});var ListViewContainer=Object(es.connect)((function mapStateToProps(state,props){var id="".concat(state.entityBrowser.appId,"_entity-browser-list");return{id:id,storeId:"".concat(id,"_").concat(props.router.history.location.pathname),locale:state.input.locale,entityName:state.entityBrowser.entityName,formName:state.entityBrowser.formBase,searchFormType:state.input.showSearchForm?"basic":"none",limit:state.input.limit,searchFilters:state.input.searchFilters,preselectedSearchFields:state.input.preselectedSearchFields,disableSimpleSearch:state.input.disableSimpleSearch,simpleSearchFields:state.input.simpleSearchFields}}),(function mapDispatchToProps(dispatch){return{emitAction:function emitAction(action){dispatch(actionEmitter.a.dispatchEmittedAction(action))}}}))(components_ListView);__webpack_exports__.default={container:ListViewContainer,reducers:{},sagas:[],inputDispatches:[]}}}]);