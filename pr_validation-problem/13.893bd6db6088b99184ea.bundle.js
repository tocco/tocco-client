(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1998:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(29),__webpack_require__(69),__webpack_require__(167);var es=__webpack_require__(38),main=__webpack_require__(607),actionEmitter=__webpack_require__(134),viewPersistor=__webpack_require__(376),handleNavigateToCreate=function(props){return function(relationName){relationName?props.router.history.push("".concat(props.router.match.url,"/").concat(relationName,"/")):props.router.history.push("/detail")}},ListViewContainer=Object(es.connect)(function(state,props){return{id:"".concat(state.entityBrowser.appId,"_entity-browser-list"),store:viewPersistor.a.viewInfoSelector(state,props.router.history.location.pathname).store,locale:state.input.locale,entityName:state.entityBrowser.entityName,formName:state.entityBrowser.formBase,searchFormType:state.input.showSearchForm?"basic":"none",limit:state.input.limit,searchFilters:state.input.searchFilters,preselectedSearchFields:state.input.preselectedSearchFields,disableSimpleSearch:state.input.disableSimpleSearch,simpleSearchFields:state.input.simpleSearchFields,onRowClick:function onRowClick(e){props.router.history.push("/detail/".concat(e.id))},onNavigateToCreate:handleNavigateToCreate(props),searchFormPosition:"top"}},function(dispatch,props){return{emitAction:function emitAction(action){dispatch(actionEmitter.a.dispatchEmittedAction(action))},onStoreCreate:function onStoreCreate(store){dispatch(viewPersistor.a.persistViewInfo(props.router.history.location.pathname,0,{store:store}))}}})(main.a);__webpack_exports__.default={container:ListViewContainer,reducers:{},sagas:[],inputDispatches:[]}}}]);
//# sourceMappingURL=13.893bd6db6088b99184ea.bundle.js.map