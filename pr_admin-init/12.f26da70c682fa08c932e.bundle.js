(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{2735:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _ListViewContainer2=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(__webpack_require__(2772));exports.default={container:_ListViewContainer2.default,reducers:{},sagas:[],inputDispatches:[]}},2772:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__(25),_main2=_interopRequireDefault(__webpack_require__(1197)),_actionEmitter2=_interopRequireDefault(__webpack_require__(130)),_objectHash2=_interopRequireDefault(__webpack_require__(2773));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var mapActionCreators={emitAction:function emitAction(action){return _actionEmitter2.default.dispatchEmittedAction(action)}},handleNavigateToCreate=function handleNavigateToCreate(props){return function(relationName){relationName?props.router.history.push(props.router.match.url+"/"+relationName+"/"):props.router.history.push("/detail")}};exports.default=(0,_reactRedux.connect)(function mapStateToProps(state,props){var hash=(0,_objectHash2.default)(state.input);return{id:state.entityBrowser.appId+"_entity-browser-list-"+hash,keepStore:!0,locale:state.input.locale,entityName:state.entityBrowser.entityName,formBase:state.entityBrowser.formBase,showSearchForm:state.input.showSearchForm,limit:state.input.limit,searchFilters:state.input.searchFilters,preselectedSearchFields:state.input.preselectedSearchFields,disableSimpleSearch:state.input.disableSimpleSearch,simpleSearchFields:state.input.simpleSearchFields,onRowClick:function onRowClick(e){props.router.history.push("/detail/"+e.id)},onNavigateToCreate:handleNavigateToCreate(props)}},mapActionCreators)(_main2.default)}}]);
//# sourceMappingURL=12.f26da70c682fa08c932e.bundle.js.map