(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{3336:function(module,__webpack_exports__,__webpack_require__){"use strict";var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(22),_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__),react_router_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(601),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6),_linkStyle__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(3338);function _templateObject(){var data=_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ","\n"]);return _templateObject=function(){return data},data}__webpack_exports__.a=Object(styled_components__WEBPACK_IMPORTED_MODULE_2__.default)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.a)(_templateObject(),_linkStyle__WEBPACK_IMPORTED_MODULE_3__.a)},3337:function(module,__webpack_exports__,__webpack_require__){"use strict";var taggedTemplateLiteral=__webpack_require__(22),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),react_router_dom=__webpack_require__(601),styled_components_browser_esm=__webpack_require__(6),linkStyle=__webpack_require__(3338);function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  ",";\n"]);return _templateObject=function(){return data},data}Object(styled_components_browser_esm.default)(react_router_dom.b)(_templateObject(),linkStyle.a);var StyledLink=__webpack_require__(3336);__webpack_require__.d(__webpack_exports__,"a",(function(){return StyledLink.a}))},3338:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return linkStyle}));var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(22),_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__),tocco_ui__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5),styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6),lodash_get__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(29),lodash_get__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_3__);function _templateObject(){var data=_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()(["\n  ","\n  text-decoration: none;\n  color: ",";\n\n  * {\n    color: ",";\n    text-decoration: none;\n  }\n\n  &:hover,\n  &:hover *,\n  &:focus,\n  &:focus * {\n    color: ",";\n    text-decoration: ",";\n  }\n\n  &:active,\n  &:active * {\n    color: ",";\n    text-decoration: ",";\n  }\n"]);return _templateObject=function(){return data},data}var linkStyle=Object(styled_components__WEBPACK_IMPORTED_MODULE_2__.css)(_templateObject(),Object(tocco_ui__WEBPACK_IMPORTED_MODULE_1__.M)(),tocco_ui__WEBPACK_IMPORTED_MODULE_1__.Q.color("text"),tocco_ui__WEBPACK_IMPORTED_MODULE_1__.Q.color("text"),tocco_ui__WEBPACK_IMPORTED_MODULE_1__.Q.color("secondaryLight"),(function(props){return props.neutral?"none":"underline"}),(function(props){return props.neutral?Object(tocco_ui__WEBPACK_IMPORTED_MODULE_1__.P)(lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(props.theme,"colors.text"),2):Object(tocco_ui__WEBPACK_IMPORTED_MODULE_1__.P)(lodash_get__WEBPACK_IMPORTED_MODULE_3___default()(props.theme,"colors.primary"),2)}),(function(props){return props.neutral?"none":"underline"}))},3346:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(25),__webpack_require__(117),__webpack_require__(28),__webpack_require__(70),__webpack_require__(127);var helpers_extends=__webpack_require__(83),extends_default=__webpack_require__.n(helpers_extends),toConsumableArray=__webpack_require__(30),toConsumableArray_default=__webpack_require__.n(toConsumableArray),react=__webpack_require__(0),react_default=__webpack_require__.n(react),src=(__webpack_require__(1041),__webpack_require__(5)),Helmet=__webpack_require__(3343),taggedTemplateLiteral=__webpack_require__(22),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_components_browser_esm=__webpack_require__(6),StyledLink=__webpack_require__(3337);function _templateObject3(){var data=taggedTemplateLiteral_default()(["\n  font-weight: ",";\n  text-decoration: none;\n  color: ",";\n\n  & * {\n    font-weight: ",";\n    text-decoration: none;\n    color: ",";\n    margin-right: .5rem;\n  }\n\n  &:active * {\n    color: ",";\n  }\n"]);return _templateObject3=function(){return data},data}function _templateObject2(){var data=taggedTemplateLiteral_default()(["\n  font-weight: ",";\n  text-decoration: none;\n  color: ",";\n\n  & * {\n    font-weight: ",";\n    text-decoration: none;\n    color: ",";\n    margin-right: .5rem;\n  }\n\n  &:hover,\n  &:hover *  {\n    color: ",";\n  }\n\n  &:focus,\n  &:active,\n  &:focus *,\n  &:active * {\n    color: ",";\n  }\n"]);return _templateObject2=function(){return data},data}function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  background-color: ",";\n  width: 100%;\n  padding: .8rem 1.7rem;\n\n  span:nth-child(even) {\n    margin-left: .9rem;\n    margin-right: .9rem;\n  }\n"]);return _templateObject=function(){return data},data}var StyledBreadcrumbs=styled_components_browser_esm.default.div(_templateObject(),src.Q.color("backgroundBreadcrumbs")),StyledBreadcrumbsLink=Object(styled_components_browser_esm.default)(StyledLink.a)(_templateObject2(),src.Q.fontWeight("bold"),(function(_ref){return _ref.active&&src.Q.color("primary")}),src.Q.fontWeight("bold"),(function(_ref2){return _ref2.active&&src.Q.color("primary")}),src.Q.color("secondaryLight"),src.Q.color("primary")),StyledBreadcrumbsTitle=styled_components_browser_esm.default.span(_templateObject3(),src.Q.fontWeight("bold"),(function(_ref3){return _ref3.active&&src.Q.color("primary")}),src.Q.fontWeight("bold"),(function(_ref4){return _ref4.active&&src.Q.color("primary")}),src.Q.color("primary")),Breadcrumbs_ref2=react_default.a.createElement(src.j,{icon:"list-ul"}),Breadcrumbs_ref3=react_default.a.createElement(src.j,{icon:"angle-right"}),Breadcrumbs=function(_ref){var pathPrefix=_ref.pathPrefix,breadcrumbsInfo=_ref.breadcrumbsInfo,currentViewTitle=_ref.currentViewTitle,breadcrumbs=[].concat(toConsumableArray_default()(breadcrumbsInfo||[]),toConsumableArray_default()(currentViewTitle?[{display:currentViewTitle}]:[]));return 0===breadcrumbs.length?null:react_default.a.createElement(StyledBreadcrumbs,null,react_default.a.createElement(Helmet.Helmet,{defer:!1},react_default.a.createElement("title",null,function(breadcrumbsInfo){return breadcrumbsInfo.slice(breadcrumbsInfo.length-2).map((function(breadcrumb){return breadcrumb.display})).reverse().join(" - ")}(breadcrumbsInfo))),react_default.a.createElement("div",null,"  ",breadcrumbs.map((function(b,idx){var display=b.display||"",Comp=idx===breadcrumbs.length-1?StyledBreadcrumbsTitle:StyledBreadcrumbsLink;return react_default.a.createElement(src.K.Span,{key:"breadcrumbItem-".concat(idx)},react_default.a.createElement(Comp,extends_default()({neutral:"true"},idx===breadcrumbs.length-1&&{active:"true"},{to:"".concat(pathPrefix,"/").concat(b.path)}),"list"===b.type&&Breadcrumbs_ref2,"  ",display))})).reduce((function(prev,curr,idx){return[prev,react_default.a.createElement(src.K.Span,{key:"icon"+idx}," ",Breadcrumbs_ref3," "),curr]}))))};Breadcrumbs.displayName="Breadcrumbs",Breadcrumbs.defaultProps={pathPrefix:""},Breadcrumbs.__docgenInfo={description:"",methods:[],displayName:"Breadcrumbs",props:{pathPrefix:{defaultValue:{value:"''",computed:!1},type:{name:"string"},required:!1,description:""},match:{type:{name:"object"},required:!1,description:""},breadcrumbsInfo:{type:{name:"arrayOf",value:{name:"shape",value:{display:{name:"string",required:!1},path:{name:"string",required:!1},type:{name:"string",required:!1}}}},required:!1,description:""},currentViewTitle:{type:{name:"string"},required:!1,description:""}}};var Breadcrumbs_Breadcrumbs=Breadcrumbs;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/components/Breadcrumbs/Breadcrumbs.js"]={name:"Breadcrumbs",docgenInfo:Breadcrumbs.__docgenInfo,path:"packages/admin/src/components/Breadcrumbs/Breadcrumbs.js"}),__webpack_require__.d(__webpack_exports__,"a",(function(){return Breadcrumbs_Breadcrumbs}))},3421:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var redux=__webpack_require__(103),es=__webpack_require__(36),index_es=__webpack_require__(13),root=__webpack_require__(100),slicedToArray=(__webpack_require__(54),__webpack_require__(163),__webpack_require__(62)),slicedToArray_default=__webpack_require__.n(slicedToArray),taggedTemplateLiteral=__webpack_require__(22),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),react=__webpack_require__(0),react_default=__webpack_require__.n(react),react_router=(__webpack_require__(1041),__webpack_require__(181)),styled_components_browser_esm=__webpack_require__(6),src=__webpack_require__(5),main=(__webpack_require__(25),__webpack_require__(127),__webpack_require__(128),__webpack_require__(602)),viewPersistor=__webpack_require__(3331),ICONS={Domain:"globe",Folder:"folder",Resource:"file"},DocsView=function(props){var storeKey=props.storeKey,history=props.history,match=props.match,onSearchChange=props.onSearchChange,parent=function(match){if(match.params&&match.params.model){var model=match.params.model.charAt(0).toUpperCase()+match.params.model.slice(1),key=match.params.key;return{model:"Docs_list_item",key:"".concat(model,"/").concat(key)}}return null}(match);return react_default.a.createElement(main.a,{id:"documents",entityName:"Docs_list_item",formName:"Docs_list_item",onRowClick:function handleRowClick(_ref){var newLocation,_id$split=_ref.id.split("/"),_id$split2=slicedToArray_default()(_id$split,2),model=_id$split2[0],key=_id$split2[1];switch(model){case"Domain":newLocation="/docs/domain/".concat(key,"/list");break;case"Folder":newLocation="/docs/folder/".concat(key,"/list");break;case"Resource":newLocation="/docs/doc/".concat(key,"/detail");break;default:throw new Error("Unexpected model: ".concat(model))}history.push(newLocation)},searchFormPosition:"left",searchFormType:"admin",parent:parent,onSearchChange:onSearchChange,store:viewPersistor.a.viewInfoSelector(storeKey).store,onStoreCreate:function onStoreCreate(store){viewPersistor.a.persistViewInfo(storeKey,{store:store})},cellRenderers:{"dms-label-with-icon":function dmsLabelWithIcon(rowData,column,cellRenderer){return react_default.a.createElement("div",null,react_default.a.createElement(src.j,{icon:ICONS[rowData.type],style:{marginRight:"0.5rem",verticalAlign:"middle"}}),react_default.a.createElement("span",{style:{verticalAlign:"middle"}},cellRenderer(column.children[0])))}}})};DocsView.displayName="DocsView",DocsView.__docgenInfo={description:"",methods:[],displayName:"DocsView",props:{storeKey:{type:{name:"string"},required:!0,description:""},match:{type:{name:"object"},required:!0,description:""},history:{type:{name:"object"},required:!0,description:""},onSearchChange:{type:{name:"func"},required:!0,description:""}}};var DocsView_DocsView=DocsView;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/components/DocsView/DocsView.js"]={name:"DocsView",docgenInfo:DocsView.__docgenInfo,path:"packages/admin/src/routes/docs/components/DocsView/DocsView.js"});var src_main=__webpack_require__(3340),DocumentView=function(props){return react_default.a.createElement(src_main.a,{entityName:"Resource",entityId:props.match.params.key,formName:"Resource",mode:"update"})};DocumentView.displayName="DocumentView",DocumentView.__docgenInfo={description:"",methods:[],displayName:"DocumentView",props:{match:{type:{name:"object"},required:!0,description:""},history:{type:{name:"object"},required:!1,description:""}}};var DocumentView_DocumentView=DocumentView;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/components/DocumentView/DocumentView.js"]={name:"DocumentView",docgenInfo:DocumentView.__docgenInfo,path:"packages/admin/src/routes/docs/components/DocumentView/DocumentView.js"});var Breadcrumbs=__webpack_require__(3346),BreadcrumbsContainer=Object(es.connect)((function(state){return{pathPrefix:"/docs",breadcrumbsInfo:state.docs.path.breadcrumbs}}),{})(Object(index_es.injectIntl)(Breadcrumbs.a));function _templateObject3(){var data=taggedTemplateLiteral_default()(["\n  grid-area: breadcrumbs;\n"]);return _templateObject3=function(){return data},data}function _templateObject2(){var data=taggedTemplateLiteral_default()(["\n  grid-area: content;\n  overflow-x: hidden;\n  padding-right: ",";\n  ","\n"]);return _templateObject2=function(){return data},data}function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  display: grid;\n  grid-template-rows: auto  1fr;\n  grid-template-areas:\n    'breadcrumbs'\n    'content';\n  height: 100%;\n  width: 100%;\n"]);return _templateObject=function(){return data},data}var StyledWrapper=styled_components_browser_esm.default.div(_templateObject()),StyledContent=styled_components_browser_esm.default.div(_templateObject2(),src.O.space(-1),src.H),StyledBreadcrumbs=styled_components_browser_esm.default.div(_templateObject3()),_ref2=react_default.a.createElement(StyledBreadcrumbs,null,react_default.a.createElement(BreadcrumbsContainer,null)),_ref3=react_default.a.createElement(react_router.c,{exact:!0,path:"/docs/doc/:key/detail",component:DocumentView_DocumentView}),DocsRoute=function(_ref){var history=_ref.history,searchMode=_ref.searchMode,setSearchMode=_ref.setSearchMode,loadBreadcrumbs=_ref.loadBreadcrumbs,_useReducer=Object(react.useReducer)((function(x){return x+1}),0),_useReducer2=slicedToArray_default()(_useReducer,2),docsViewNumber=_useReducer2[0],forceDocsViewUpdate=_useReducer2[1];Object(react.useEffect)((function(){!0===searchMode&&"/docs/"===history.location.pathname&&(setSearchMode(!1),forceDocsViewUpdate()),loadBreadcrumbs(history.location.pathname)}));var handleSearchChange=function(e){var hasUserChanges=e.query&&e.query.hasUserChanges;"/docs/search"!==history.location.pathname&&hasUserChanges?history.push("/docs/search"):"/docs/search"!==history.location.pathname||hasUserChanges||history.push("/docs"),setSearchMode(hasUserChanges)},key="docs-view-".concat(docsViewNumber);return react_default.a.createElement(StyledWrapper,null,_ref2,react_default.a.createElement(StyledContent,null,react_default.a.createElement(react_router.e,null,_ref3,react_default.a.createElement(react_router.c,{exact:!0,path:["/docs/:model/:key/list","/docs","/docs/search"],render:function render(_ref4){var match=_ref4.match;return react_default.a.createElement(DocsView_DocsView,{key:key,storeKey:key,history:history,match:match,onSearchChange:handleSearchChange})}}))))};DocsRoute.displayName="DocsRoute",DocsRoute.__docgenInfo={description:"",methods:[],displayName:"DocsRoute",props:{loadBreadcrumbs:{type:{name:"func"},required:!0,description:""},setSearchMode:{type:{name:"func"},required:!0,description:""},history:{type:{name:"object"},required:!0,description:""},searchMode:{type:{name:"bool"},required:!0,description:""}}};var DocsRoute_DocsRoute=DocsRoute;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/components/DocsRoute/DocsRoute.js"]={name:"DocsRoute",docgenInfo:DocsRoute.__docgenInfo,path:"packages/admin/src/routes/docs/components/DocsRoute/DocsRoute.js"});var setBreadcrumbs=function(breadcrumbs){return{type:"docs/path/SET_BREADCRUMBS",payload:{breadcrumbs:breadcrumbs}}},DocsRouteContainer_mapActionCreators={loadBreadcrumbs:function(location){return{type:"docs/path/LOAD_BREADCRUMBS",payload:{location:location}}},setSearchMode:function(searchMode){return{type:"docs/path/SET_SEARCH_MODE",payload:{searchMode:searchMode}}}},DocsRouteContainer=Object(root.hot)(Object(es.connect)((function(state){return{searchMode:state.docs.path.searchMode}}),DocsRouteContainer_mapActionCreators)(Object(index_es.injectIntl)(DocsRoute_DocsRoute))),regenerator=__webpack_require__(2),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=(__webpack_require__(39),__webpack_require__(1)),rest=__webpack_require__(31),_marked=regenerator_default.a.mark(getSearchBreadcrumbs),_marked2=regenerator_default.a.mark(sagas_loadBreadcrumbs),_marked3=regenerator_default.a.mark(mainSagas),textResourceSelector=function(state,key){return state.intl.messages[key]||key},docsPathSelector=function(state){return state.docs.path},DOC_PATH_REGEX=/^\/docs\/doc\/(\d+)\/detail$/,PARENT_PATH_REGEX=/^\/docs\/(domain|folder)\/(\d+)\/list$/,getNode=function(pathname){var node=function(pathname){var docMatches=DOC_PATH_REGEX.exec(pathname);return docMatches&&2<=docMatches.length?{model:"Resource",key:docMatches[1]}:null}(pathname);return node||(node=function(pathname){var parentMatches=PARENT_PATH_REGEX.exec(pathname);return parentMatches&&3<=parentMatches.length?{model:parentMatches[1].charAt(0).toUpperCase()+parentMatches[1].slice(1),key:parentMatches[2]}:null}(pathname)),node};function getSearchBreadcrumbs(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(textResourceSelector,"client.admin.docs.breadcrumbs.start");case 2:return _context.t0=_context.sent,_context.t1={display:_context.t0,path:"",type:"list"},_context.next=6,Object(redux_saga_effects_npm_proxy_esm.f)(textResourceSelector,"client.admin.breadcrumbs.searchResults");case 6:return _context.t2=_context.sent,_context.t3={display:_context.t2,path:"",type:"list"},_context.abrupt("return",[_context.t1,_context.t3]);case 9:case"end":return _context.stop()}}),_marked)}function sagas_loadBreadcrumbs(_ref){var location,node,breadcrumbs,url,result;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return location=_ref.payload.location,node=getNode(location),_context2.next=4,Object(redux_saga_effects_npm_proxy_esm.f)(docsPathSelector);case 4:if(!_context2.sent.searchMode||node&&"Resource"===node.model){_context2.next=11;break}return _context2.next=8,Object(redux_saga_effects_npm_proxy_esm.b)(getSearchBreadcrumbs);case 8:breadcrumbs=_context2.sent,_context2.next=16;break;case 11:return url=node?"documents/".concat(node.model,"/").concat(node.key,"/breadcrumbs"):"documents/breadcrumbs",_context2.next=14,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,url);case 14:result=_context2.sent,breadcrumbs=result.body.breadcrumbs;case 16:return _context2.next=18,Object(redux_saga_effects_npm_proxy_esm.e)(setBreadcrumbs(breadcrumbs));case 18:case"end":return _context2.stop()}}),_marked2)}function mainSagas(){return regenerator_default.a.wrap((function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return _context3.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.j)("docs/path/LOAD_BREADCRUMBS",sagas_loadBreadcrumbs)]);case 2:case"end":return _context3.stop()}}),_marked3)}var _ACTION_HANDLERS,defineProperty=__webpack_require__(4),defineProperty_default=__webpack_require__.n(defineProperty),reducer=__webpack_require__(24),ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"docs/path/SET_BREADCRUMBS",reducer.a.singleTransferReducer("breadcrumbs")),defineProperty_default()(_ACTION_HANDLERS,"docs/path/SET_SEARCH_MODE",reducer.a.singleTransferReducer("searchMode")),_ACTION_HANDLERS),initialState={breadcrumbs:[],searchMode:!1};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/modules/path/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/admin/src/routes/docs/modules/path/reducer.js"});var path=reducer_reducer;__webpack_exports__.default={container:DocsRouteContainer,reducers:{docs:Object(redux.combineReducers)({path:path})},sagas:[mainSagas]}}}]);
//# sourceMappingURL=15.b71d659335c70972d77b.bundle.js.map