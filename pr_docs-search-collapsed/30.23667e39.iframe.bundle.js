(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{5222:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(65),__webpack_require__(27),__webpack_require__(11),__webpack_require__(6),__webpack_require__(1);var notification=__webpack_require__(26),src_route=__webpack_require__(327),taggedTemplateLiteral=__webpack_require__(13),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_components_browser_esm=__webpack_require__(5),resolveThemePath=__webpack_require__(36),modularScale=__webpack_require__(28);function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  && {\n    background-color: ",";\n    padding: ",";\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n  }\n"]);return _templateObject=function _templateObject(){return data},data}var EntityBrowser_StyledEntityBrowser=styled_components_browser_esm.default.div(_templateObject(),resolveThemePath.a.color("paper"),modularScale.a.space(0)),jsx_runtime=__webpack_require__(0),_ref2=Object(jsx_runtime.jsx)(notification.a.Notifications,{}),EntityBrowser_EntityBrowser=function EntityBrowser(_ref){var routes=_ref.routes;return Object(jsx_runtime.jsxs)(EntityBrowser_StyledEntityBrowser,{children:[_ref2,routes.map((function(route,i){return Object(jsx_runtime.jsx)(src_route.a.RouteWithSubRoutes,Object.assign({},route),i)}))]})};EntityBrowser_EntityBrowser.displayName="EntityBrowser",EntityBrowser_EntityBrowser.__docgenInfo={description:"",methods:[],displayName:"EntityBrowser",props:{routes:{type:{name:"array"},required:!0,description:""}}};var components_EntityBrowser_EntityBrowser=EntityBrowser_EntityBrowser;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/entity-browser/components/EntityBrowser/EntityBrowser.js"]={name:"EntityBrowser",docgenInfo:EntityBrowser_EntityBrowser.__docgenInfo,path:"packages/entity-browser/src/routes/entity-browser/components/EntityBrowser/EntityBrowser.js"});var _ACTION_HANDLERS,components_EntityBrowser=components_EntityBrowser_EntityBrowser,defineProperty=__webpack_require__(8),defineProperty_default=__webpack_require__.n(defineProperty),reducer=__webpack_require__(18),setFormBase=function setFormBase(formBase){return{type:"SET_FORM_BASE",payload:{formBase:formBase}}},ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"SET_ENTITY_NAME",reducer.a.singleTransferReducer("entityName")),defineProperty_default()(_ACTION_HANDLERS,"SET_FORM_BASE",(function setFormBase(state,_ref){var formBase=_ref.payload.formBase;return formBase?Object.assign({},state,{formBase:formBase}):Object.assign({},state)})),defineProperty_default()(_ACTION_HANDLERS,"root/SET_APP_ID",reducer.a.singleTransferReducer("appId")),_ACTION_HANDLERS),initialState={entityName:"",formBase:"",appId:""};function reducer_reducer(){var state=arguments.length>0&&void 0!==arguments[0]?arguments[0]:initialState,action=arguments.length>1?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/entity-browser/modules/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/entity-browser/src/routes/entity-browser/modules/reducer.js"});var modules=reducer_reducer,inputDispatches=[{key:"entityName",actionCreator:function setEntityName(entityName){return{type:"SET_ENTITY_NAME",payload:{entityName:entityName}}},mandatory:!0},{key:"entityName",actionCreator:setFormBase},{key:"formBase",actionCreator:setFormBase},{key:"id",defaultValue:(new Date).valueOf(),actionCreator:function setAppId(appId){return{type:"root/SET_APP_ID",payload:{appId:appId}}}}];__webpack_exports__.default={container:components_EntityBrowser,reducers:{entityBrowser:modules},inputDispatches:inputDispatches}}}]);