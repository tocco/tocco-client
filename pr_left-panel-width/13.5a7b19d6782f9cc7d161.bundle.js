(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{2375:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(84),__webpack_require__(30);var helpers_extends=__webpack_require__(42),extends_default=__webpack_require__.n(helpers_extends),classCallCheck=__webpack_require__(50),classCallCheck_default=__webpack_require__.n(classCallCheck),createClass=__webpack_require__(55),createClass_default=__webpack_require__.n(createClass),possibleConstructorReturn=__webpack_require__(51),possibleConstructorReturn_default=__webpack_require__.n(possibleConstructorReturn),getPrototypeOf=__webpack_require__(52),getPrototypeOf_default=__webpack_require__.n(getPrototypeOf),inherits=__webpack_require__(53),inherits_default=__webpack_require__.n(inherits),react=(__webpack_require__(10),__webpack_require__(0)),react_default=__webpack_require__.n(react),notifier=__webpack_require__(54),RouteWithSubRoutes=__webpack_require__(957),taggedTemplateLiteral=__webpack_require__(29),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_components_browser_esm=__webpack_require__(7),src=__webpack_require__(6);function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  && {\n    background-color: ",";\n    height: 100%;\n    padding: ",";\n  }\n"]);return _templateObject=function(){return data},data}var EntityBrowser_StyledEntityBrowser=styled_components_browser_esm.default.div(_templateObject(),src.I.color("paper"),src.G.space(0)),_ref=react_default.a.createElement(notifier.a.Notifier,null),EntityBrowser_EntityBrowser=function(_React$Component){function EntityBrowser(){return classCallCheck_default()(this,EntityBrowser),possibleConstructorReturn_default()(this,getPrototypeOf_default()(EntityBrowser).apply(this,arguments))}return inherits_default()(EntityBrowser,_React$Component),createClass_default()(EntityBrowser,[{key:"render",value:function render(){return react_default.a.createElement(EntityBrowser_StyledEntityBrowser,null,_ref,this.props.routes.map((function(route,i){return react_default.a.createElement(RouteWithSubRoutes.a,extends_default()({key:i},route))})))}}]),EntityBrowser}(react_default.a.Component);EntityBrowser_EntityBrowser.displayName="EntityBrowser",EntityBrowser_EntityBrowser.__docgenInfo={description:"",methods:[],displayName:"EntityBrowser",props:{routes:{type:{name:"array"},required:!0,description:""}}};var components_EntityBrowser_EntityBrowser=EntityBrowser_EntityBrowser;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/entity-browser/components/EntityBrowser/EntityBrowser.js"]={name:"EntityBrowser",docgenInfo:EntityBrowser_EntityBrowser.__docgenInfo,path:"packages/entity-browser/src/routes/entity-browser/components/EntityBrowser/EntityBrowser.js"});var _ACTION_HANDLERS,components_EntityBrowser=components_EntityBrowser_EntityBrowser,defineProperty=(__webpack_require__(18),__webpack_require__(32),__webpack_require__(21),__webpack_require__(31),__webpack_require__(26),__webpack_require__(33),__webpack_require__(34),__webpack_require__(17),__webpack_require__(22),__webpack_require__(4)),defineProperty_default=__webpack_require__.n(defineProperty),reducer=__webpack_require__(28),setFormBase=function(formBase){return{type:"SET_FORM_BASE",payload:{formBase:formBase}}};function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(source,!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}var ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"SET_ENTITY_NAME",reducer.a.singleTransferReducer("entityName")),defineProperty_default()(_ACTION_HANDLERS,"SET_FORM_BASE",(function(state,_ref){var formBase=_ref.payload.formBase;return formBase?_objectSpread({},state,{formBase:formBase}):_objectSpread({},state)})),defineProperty_default()(_ACTION_HANDLERS,"root/SET_APP_ID",reducer.a.singleTransferReducer("appId")),_ACTION_HANDLERS),initialState={entityName:"",formBase:"",appId:""};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/entity-browser/modules/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/entity-browser/src/routes/entity-browser/modules/reducer.js"});var modules=reducer_reducer,inputDispatches=[{key:"entityName",actionCreator:function(entityName){return{type:"SET_ENTITY_NAME",payload:{entityName:entityName}}},mandatory:!0},{key:"entityName",actionCreator:setFormBase},{key:"formBase",actionCreator:setFormBase},{key:"id",defaultValue:(new Date).valueOf(),actionCreator:function(appId){return{type:"root/SET_APP_ID",payload:{appId:appId}}}}];__webpack_exports__.default={container:components_EntityBrowser,reducers:{entityBrowser:modules},inputDispatches:inputDispatches}}}]);
//# sourceMappingURL=13.5a7b19d6782f9cc7d161.bundle.js.map