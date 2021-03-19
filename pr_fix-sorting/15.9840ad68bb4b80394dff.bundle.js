(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{3627:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return goBack}));__webpack_require__(1072),__webpack_require__(49),__webpack_require__(143);var goBack=function(url){for(var amount=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,normalizedUrl=url.replace(/\/$/,""),i=0;i<amount;i++)normalizedUrl=normalizedUrl.substring(0,normalizedUrl.lastIndexOf("/"));return normalizedUrl}},3630:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return DetailLink})),__webpack_require__.d(__webpack_exports__,"b",(function(){return ListLink}));__webpack_require__(21),__webpack_require__(106);var react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__),tocco_util_src_queryString__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__(1070),__webpack_require__(3628)),tocco_ui__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(6),_utils_routing__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(3627),DetailLinkRelative=function(_ref){var entityKey=_ref.entityKey,children=_ref.children,relation=_ref.relation;return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(tocco_ui__WEBPACK_IMPORTED_MODULE_5__.a,{"aria-label":"go to detail",to:"".concat(relation?relation+"/":"").concat(entityKey)},children)};DetailLinkRelative.displayName="DetailLinkRelative";var DetailLink=function(_ref2){var entityName=_ref2.entityName,entityKey=_ref2.entityKey,children=_ref2.children;return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(tocco_ui__WEBPACK_IMPORTED_MODULE_5__.a,{to:"/e/".concat(entityName,"/").concat(entityKey),target:"_blank"},children)};DetailLink.displayName="DetailLink";var ListLink=function(_ref3){var entityName=_ref3.entityName,entityKeys=_ref3.entityKeys,children=_ref3.children,queryString=entityKeys&&0<entityKeys.length&&"tql=KEYS("+entityKeys.join(",")+")";return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(tocco_ui__WEBPACK_IMPORTED_MODULE_5__.a,{to:{pathname:"/e/".concat(entityName,"/list"),search:"?".concat(queryString)},target:"_blank"},children)};ListLink.displayName="ListLink",__webpack_exports__.c=function(history,match){return{DetailLink:DetailLink,ListLink:ListLink,DetailLinkRelative:DetailLinkRelative,navigateToCreateRelative:function navigateToCreateRelative(relationName,state){if(relationName)history.push({pathname:"".concat(match.url,"/").concat(relationName,"/create"),state:state});else{var entityBaseUrl=Object(_utils_routing__WEBPACK_IMPORTED_MODULE_6__.a)(match.url);history.push({pathname:entityBaseUrl+"/create",state:state})}},navigateToActionRelative:function navigateToActionRelative(definition,selection){var entityBaseUrl=Object(_utils_routing__WEBPACK_IMPORTED_MODULE_6__.a)(match.url),search=tocco_util_src_queryString__WEBPACK_IMPORTED_MODULE_4__.a.toQueryString({selection:selection,actionProperties:definition.properties});history.push({pathname:entityBaseUrl+"/action/"+definition.appId,state:{definition:definition,selection:selection},search:search})}}},DetailLink.__docgenInfo={description:"",methods:[],displayName:"DetailLink",props:{entityName:{type:{name:"string"},required:!0,description:""},entityKey:{type:{name:"string"},required:!0,description:""},children:{type:{name:"any"},required:!0,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/entities/utils/navigationStrategy.js"]={name:"DetailLink",docgenInfo:DetailLink.__docgenInfo,path:"packages/admin/src/routes/entities/utils/navigationStrategy.js"}),ListLink.__docgenInfo={description:"",methods:[],displayName:"ListLink",props:{entityName:{type:{name:"string"},required:!0,description:""},children:{type:{name:"any"},required:!0,description:""},entityKeys:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/entities/utils/navigationStrategy.js"]={name:"ListLink",docgenInfo:ListLink.__docgenInfo,path:"packages/admin/src/routes/entities/utils/navigationStrategy.js"})},3636:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(125),__webpack_require__(49);var DOC_PATH_REGEX=/^\/docs\/doc\/(\d+)\/detail$/,PARENT_PATH_REGEX=/^\/docs\/(domain|folder)\/(\d+)\/list$/;__webpack_exports__.a=function(pathname){return function(pathname){var docMatches=DOC_PATH_REGEX.exec(pathname);return docMatches&&2<=docMatches.length?{model:"Resource",key:docMatches[1]}:null}(pathname)||function(pathname){var parentMatches=PARENT_PATH_REGEX.exec(pathname);return parentMatches&&3<=parentMatches.length?{model:parentMatches[1].charAt(0).toUpperCase()+parentMatches[1].slice(1),key:parentMatches[2]}:null}(pathname)}},3708:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var helpers_extends=__webpack_require__(28),extends_default=__webpack_require__.n(helpers_extends),react=__webpack_require__(0),react_default=__webpack_require__.n(react),classCallCheck=__webpack_require__(60),classCallCheck_default=__webpack_require__.n(classCallCheck),createClass=__webpack_require__(64),createClass_default=__webpack_require__.n(createClass),inherits=__webpack_require__(62),inherits_default=__webpack_require__.n(inherits),possibleConstructorReturn=__webpack_require__(61),possibleConstructorReturn_default=__webpack_require__.n(possibleConstructorReturn),getPrototypeOf=__webpack_require__(37),getPrototypeOf_default=__webpack_require__.n(getPrototypeOf),reducer=(__webpack_require__(11),__webpack_require__(18)),appFactory=__webpack_require__(63),actionEmitter=__webpack_require__(120),errorLogging=__webpack_require__(109),externalEvents=__webpack_require__(59),notifier=__webpack_require__(33),createHashHistory=__webpack_require__(992),createHashHistory_default=__webpack_require__.n(createHashHistory),react_router=__webpack_require__(112),redux=__webpack_require__(96),regenerator=__webpack_require__(3),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=(__webpack_require__(36),__webpack_require__(1)),rest=(__webpack_require__(21),__webpack_require__(23)),getNode=__webpack_require__(3636),setBreadcrumbs=function(breadcrumbs){return{type:"docs/path/SET_BREADCRUMBS",payload:{breadcrumbs:breadcrumbs}}},_marked=regenerator_default.a.mark(getSearchBreadcrumbs),_marked2=regenerator_default.a.mark(sagas_loadBreadcrumbs),_marked3=regenerator_default.a.mark(mainSagas),textResourceSelector=function(state,key){return state.intl.messages[key]||key},docsPathSelector=function(state){return state.docs.path};function getSearchBreadcrumbs(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(textResourceSelector,"client.docs-browser.breadcrumbs.start");case 2:return _context.t0=_context.sent,_context.t1={display:_context.t0,path:"",type:"list"},_context.next=6,Object(redux_saga_effects_npm_proxy_esm.f)(textResourceSelector,"client.docs-browser.breadcrumbs.searchResults");case 6:return _context.t2=_context.sent,_context.t3={display:_context.t2,path:"",type:"list"},_context.abrupt("return",[_context.t1,_context.t3]);case 9:case"end":return _context.stop()}}),_marked)}function sagas_loadBreadcrumbs(_ref){var location,node,breadcrumbs,url,result;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return location=_ref.payload.location,node=Object(getNode.a)(location),_context2.next=4,Object(redux_saga_effects_npm_proxy_esm.f)(docsPathSelector);case 4:if(!_context2.sent.searchMode||node&&"Resource"===node.model){_context2.next=11;break}return _context2.next=8,Object(redux_saga_effects_npm_proxy_esm.b)(getSearchBreadcrumbs);case 8:breadcrumbs=_context2.sent,_context2.next=16;break;case 11:return url=node?"documents/".concat(node.model,"/").concat(node.key,"/breadcrumbs"):"documents/breadcrumbs",_context2.next=14,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,url);case 14:result=_context2.sent,breadcrumbs=result.body.breadcrumbs;case 16:return _context2.next=18,Object(redux_saga_effects_npm_proxy_esm.e)(setBreadcrumbs(breadcrumbs));case 18:case"end":return _context2.stop()}}),_marked2)}function mainSagas(){return regenerator_default.a.wrap((function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return _context3.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.j)("docs/path/LOAD_BREADCRUMBS",sagas_loadBreadcrumbs)]);case 2:case"end":return _context3.stop()}}),_marked3)}var _ACTION_HANDLERS,defineProperty=__webpack_require__(5),defineProperty_default=__webpack_require__.n(defineProperty),ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"docs/path/SET_BREADCRUMBS",reducer.a.singleTransferReducer("breadcrumbs")),defineProperty_default()(_ACTION_HANDLERS,"docs/path/SET_SEARCH_MODE",reducer.a.singleTransferReducer("searchMode")),_ACTION_HANDLERS),initialState={breadcrumbs:[],searchMode:!1};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/modules/path/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/docs-browser/src/modules/path/reducer.js"});var path_marked=regenerator_default.a.mark(sagas);function sagas(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.d)(mainSagas)]);case 2:case"end":return _context.stop()}}),path_marked)}var path=reducer_reducer,consoleLogger=(__webpack_require__(80),__webpack_require__(22),__webpack_require__(90)),v4=__webpack_require__(3623);function _createForOfIteratorHelper(o,allowArrayLike){var it;if("undefined"==typeof Symbol||null==o[Symbol.iterator]){if(Array.isArray(o)||(it=function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function(){};return{s:F,n:function n(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function s(){it=o[Symbol.iterator]()},n:function n(){var step=it.next();return normalCompletion=step.done,step},e:function e(_e2){didErr=!0,err=_e2},f:function f(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var sagas_marked=regenerator_default.a.mark(handleFilesSelected),sagas_marked2=regenerator_default.a.mark(createDocuments),sagas_marked3=regenerator_default.a.mark(sagas_mainSagas),dialogSelector=function(state){return state.docs.create.dialog},sagas_textResourceSelector=function(state,key){return state.intl.messages[key]};function handleFilesSelected(_ref){var _ref$payload,files,isDirectory,blockingInfoId,_yield$select,location,onSuccess,onError,response,remoteEvents,msgId;return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _ref$payload=_ref.payload,files=_ref$payload.files,isDirectory=_ref$payload.isDirectory,_context.next=3,Object(redux_saga_effects_npm_proxy_esm.b)(v4.a);case 3:return blockingInfoId=_context.sent,_context.next=6,Object(redux_saga_effects_npm_proxy_esm.e)(notifier.a.blockingInfo(blockingInfoId,isDirectory?"client.docs-browser.uploadInProgressDirectory":1<files.length?"client.docs-browser.uploadInProgressMultiple":"client.docs-browser.uploadInProgress",null));case 6:return _context.next=8,Object(redux_saga_effects_npm_proxy_esm.f)(dialogSelector);case 8:return _yield$select=_context.sent,location=_yield$select.location,onSuccess=_yield$select.onSuccess,onError=_yield$select.onError,_context.prev=12,_context.next=15,Object(redux_saga_effects_npm_proxy_esm.b)(createDocuments,location,files);case 15:return response=_context.sent,remoteEvents=[{type:"entity-create-event",payload:{entities:response.body.items.filter((function(item){return 201===item.status})).map((function(item){return{entityName:item.bean.model,key:item.bean.key}}))}}],_context.next=19,Object(redux_saga_effects_npm_proxy_esm.e)(notifier.a.removeBlockingInfo(blockingInfoId));case 19:return msgId=isDirectory?"client.docs-browser.uploadSuccessfulDirectory":"client.docs-browser.uploadSuccessful",_context.t0=onSuccess,_context.next=23,Object(redux_saga_effects_npm_proxy_esm.f)(sagas_textResourceSelector,msgId);case 23:_context.t1=_context.sent,_context.t2=remoteEvents,_context.t3={message:_context.t1,remoteEvents:_context.t2},(0,_context.t0)(_context.t3),_context.next=40;break;case 29:return _context.prev=29,_context.t4=_context.catch(12),consoleLogger.a.logError("Failed to upload files",_context.t4),_context.next=34,Object(redux_saga_effects_npm_proxy_esm.e)(notifier.a.removeBlockingInfo(blockingInfoId));case 34:return _context.t5=onError,_context.next=37,Object(redux_saga_effects_npm_proxy_esm.f)(sagas_textResourceSelector,"client.docs-browser.uploadFailed");case 37:_context.t6=_context.sent,_context.t7={message:_context.t6},(0,_context.t5)(_context.t7);case 40:case"end":return _context.stop()}}),sagas_marked,null,[[12,29]])}function createDocuments(location,files){var node,formData,_iterator,_step,file,resource,options;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:if(node=Object(getNode.a)(location)){_context2.next=3;break}return _context2.abrupt("return");case 3:formData=new FormData,_iterator=_createForOfIteratorHelper(files);try{for(_iterator.s();!(_step=_iterator.n()).done;)file=_step.value,formData.append("files",file)}catch(err){_iterator.e(err)}finally{_iterator.f()}return resource="documents/".concat(node.model,"/").concat(node.key),options={method:"POST",body:formData},_context2.next=10,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,resource,options);case 10:return _context2.abrupt("return",_context2.sent);case 11:case"end":return _context2.stop()}}),sagas_marked2)}function sagas_mainSagas(){return regenerator_default.a.wrap((function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return _context3.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.i)("docs/create/FILES_SELECTED",handleFilesSelected)]);case 2:case"end":return _context3.stop()}}),sagas_marked3)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}var reducer_ACTION_HANDLERS=defineProperty_default()({},"docs/create/OPEN_DIALOG",(function(state,_ref){var _ref$payload=_ref.payload,location=_ref$payload.location,directory=_ref$payload.directory,onSuccess=_ref$payload.onSuccess,onError=_ref$payload.onError;return _objectSpread(_objectSpread({},state),{},{dialog:{instanceCount:state.dialog.instanceCount+1,directory:directory,location:location,onSuccess:onSuccess,onError:onError}})})),reducer_initialState={dialog:{instanceCount:0,directory:!1,location:null,onSuccess:null,onError:null}};function create_reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:reducer_initialState,action=1<arguments.length?arguments[1]:void 0,handler=reducer_ACTION_HANDLERS[action.type];return handler?handler(state,action):state}create_reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/modules/create/reducer.js"]={name:"reducer",docgenInfo:create_reducer_reducer.__docgenInfo,path:"packages/docs-browser/src/modules/create/reducer.js"});var create_marked=regenerator_default.a.mark(create_sagas);function create_sagas(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.d)(sagas_mainSagas)]);case 2:case"end":return _context.stop()}}),create_marked)}var create=create_reducer_reducer,reducers={docs:Object(redux.combineReducers)({path:path,create:create})},reducers_sagas=[sagas,create_sagas],es=__webpack_require__(25),index_es=__webpack_require__(13),slicedToArray=(__webpack_require__(49),__webpack_require__(164),__webpack_require__(48)),slicedToArray_default=__webpack_require__.n(slicedToArray),taggedTemplateLiteral=__webpack_require__(17),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_components_browser_esm=__webpack_require__(7),src=__webpack_require__(6),main=(__webpack_require__(70),__webpack_require__(106),__webpack_require__(125),__webpack_require__(129),__webpack_require__(617)),viewPersistor=__webpack_require__(3625),actions=(__webpack_require__(32),__webpack_require__(87),{"dms-create-folder":Object(react.lazy)((function(){return Promise.all([__webpack_require__.e(1),__webpack_require__.e(3)]).then(__webpack_require__.bind(null,3701))})),"dms-create-domain":Object(react.lazy)((function(){return Promise.all([__webpack_require__.e(1),__webpack_require__.e(3)]).then(__webpack_require__.bind(null,3702))})),"dms-edit":Object(react.lazy)((function(){return Promise.all([__webpack_require__.e(1),__webpack_require__.e(3)]).then(__webpack_require__.bind(null,3703))})),delete:Object(react.lazy)((function(){return Promise.all([__webpack_require__.e(1),__webpack_require__.e(3)]).then(__webpack_require__.bind(null,3704))}))}),LazyAction_ref=react_default.a.createElement(src.o,null),renderLoader=function(){return LazyAction_ref};renderLoader.displayName="renderLoader";var LazyAction_LazyAction=function(props){var appId=props.appId,LazyAction=actions[appId];if(!LazyAction)return consoleLogger.a.logError("no action found with id: ".concat(appId)),null;var ActionComponent=Object(es.connect)(null,{emitAction:function emitAction(action){return actionEmitter.a.dispatchEmittedAction(action)}})(LazyAction);return react_default.a.createElement(react.Suspense,{fallback:renderLoader()},react_default.a.createElement(ActionComponent,props))};LazyAction_LazyAction.displayName="LazyAction",LazyAction_LazyAction.__docgenInfo={description:"",methods:[],displayName:"LazyAction",props:{appId:{type:{name:"string"},required:!0,description:""}}};var Action_LazyAction=LazyAction_LazyAction;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/LazyAction.js"]={name:"LazyAction",docgenInfo:LazyAction_LazyAction.__docgenInfo,path:"packages/docs-browser/src/components/Action/LazyAction.js"});var FileInput=function(_ref){var value,ref,instanceCount=_ref.instanceCount,directory=_ref.directory,onChange=_ref.onChange,fileInput=Object(react.useRef)(),prevInstanceCount=(value=instanceCount,ref=Object(react.useRef)(),Object(react.useEffect)((function(){ref.current=value})),ref.current);return Object(react.useEffect)((function(){fileInput.current&&instanceCount>prevInstanceCount&&fileInput.current.click()})),react_default.a.createElement("input",extends_default()({type:"file",ref:fileInput,style:{display:"none"},onChange:function handleChange(e){var files=e.target.files;files&&0<files.length&&onChange&&onChange(files,directory),e.target.value=null},multiple:!0},directory?{webkitdirectory:"true",directory:"true"}:{}))};FileInput.displayName="FileInput",FileInput.__docgenInfo={description:"",methods:[],displayName:"FileInput",props:{instanceCount:{type:{name:"number"},required:!0,description:""},directory:{type:{name:"bool"},required:!1,description:""},onChange:{type:{name:"func"},required:!1,description:""}}};var FileInput_FileInput=FileInput;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/FileInput/FileInput.js"]={name:"FileInput",docgenInfo:FileInput.__docgenInfo,path:"packages/docs-browser/src/components/FileInput/FileInput.js"});var mapActionCreators={onChange:function(files,isDirectory){return{type:"docs/create/FILES_SELECTED",payload:{files:files,isDirectory:isDirectory}}}},FileInputContainer=Object(es.connect)((function(state){return{instanceCount:state.docs.create.dialog.instanceCount,directory:state.docs.create.dialog.directory}}),mapActionCreators)(FileInput_FileInput),ICONS={Domain:"globe",Folder:"folder",Resource:"file"},_ref2=react_default.a.createElement(FileInputContainer,null),DocsView=function(props){var storeKey=props.storeKey,history=props.history,match=props.match,domainTypes=props.domainTypes,navigationStrategy=props.navigationStrategy,onSearchChange=props.onSearchChange,emitAction=props.emitAction,openFileDialog=props.openFileDialog,parent=function(match){if(match.params&&match.params.model){var model=match.params.model.charAt(0).toUpperCase()+match.params.model.slice(1),key=match.params.key;return{model:"Docs_list_item",key:"".concat(model,"/").concat(key)}}return null}(match),tql=function(parent,domainTypes){return!parent&&Array.isArray(domainTypes)&&0<domainTypes.length?"exists(relDomain_type where IN(unique_id, ".concat(domainTypes.map((function(type){return'"'.concat(type,'"')})).join(","),"))"):null}(parent,domainTypes),handleUploadDocument=regenerator_default.a.mark((function(definition,selection,parent,params,config,onSuccess,onError){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:!1,openFileDialog(history.location.pathname,!1,onSuccess,onError);case 2:case"end":return _context.stop()}}),handleUploadDocument)})),handleUploadDirectory=regenerator_default.a.mark((function(definition,selection,parent,params,config,onSuccess,onError){return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:!0,openFileDialog(history.location.pathname,!0,onSuccess,onError);case 2:case"end":return _context2.stop()}}),handleUploadDirectory)}));return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(main.a,{id:"documents",entityName:"Docs_list_item",formName:parent?parent.model:"Root_docs_list_item",limit:25,onRowClick:function handleRowClick(_ref){var newLocation,_id$split=_ref.id.split("/"),_id$split2=slicedToArray_default()(_id$split,2),model=_id$split2[0],key=_id$split2[1];switch(model){case"Domain":newLocation="/docs/domain/".concat(key,"/list");break;case"Folder":newLocation="/docs/folder/".concat(key,"/list");break;case"Resource":newLocation="/docs/doc/".concat(key,"/detail");break;default:throw new Error("Unexpected model: ".concat(model))}history.push(newLocation)},searchFormPosition:"left",searchFormType:"admin",parent:parent,onSearchChange:onSearchChange,store:viewPersistor.a.viewInfoSelector(storeKey).store,onStoreCreate:function onStoreCreate(store){viewPersistor.a.persistViewInfo(storeKey,{store:store})},cellRenderers:{"dms-label-with-icon":function dmsLabelWithIcon(rowData,column,cellRenderer){return react_default.a.createElement("div",null,react_default.a.createElement(src.l,{icon:ICONS[rowData.type],style:{marginRight:"0.5rem",verticalAlign:"middle"}}),react_default.a.createElement("span",{style:{verticalAlign:"middle"}},cellRenderer(column.children[0])))}},emitAction:emitAction,actionAppComponent:Action_LazyAction,contextParams:{history:history},customActions:{"upload-document":handleUploadDocument,"upload-directory":handleUploadDirectory},navigationStrategy:navigationStrategy,tql:tql}),_ref2)};DocsView.__docgenInfo={description:"",methods:[],displayName:"DocsView",props:{storeKey:{type:{name:"string"},required:!0,description:""},match:{type:{name:"object"},required:!0,description:""},history:{type:{name:"object"},required:!0,description:""},navigationStrategy:{type:{name:"object"},required:!1,description:""},domainTypes:{type:{name:"objectOf",value:{name:"string"}},required:!1,description:""},onSearchChange:{type:{name:"func"},required:!0,description:""},emitAction:{type:{name:"func"},required:!0,description:""},openFileDialog:{type:{name:"func"},required:!0,description:""}}};var DocsView_DocsView=DocsView;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/DocsView/DocsView.js"]={name:"DocsView",docgenInfo:DocsView.__docgenInfo,path:"packages/docs-browser/src/components/DocsView/DocsView.js"});var DocsViewContainer=Object(es.connect)((function(state){return{domainTypes:state.input.domainTypes}}),{})(Object(index_es.injectIntl)(DocsView_DocsView)),src_main=(__webpack_require__(161),__webpack_require__(620),__webpack_require__(3631)),DocumentView=function(_ref){var match=_ref.match,history=_ref.history,breadcrumbs=_ref.breadcrumbs,navigationStrategy=_ref.navigationStrategy,emitAction=_ref.emitAction;return react_default.a.createElement(src_main.a,{entityName:"Resource",entityId:match.params.key,formName:"DmsResource",mode:"update",actionAppComponent:Action_LazyAction,navigationStrategy:navigationStrategy,emitAction:emitAction,onEntityDeleted:function handleEntityDeleted(){var lastList=breadcrumbs.slice().reverse().find((function(breadcrumb){return"list"===breadcrumb.type})),lastListUrl="/docs/".concat(lastList.path);history.push(lastListUrl)}})};DocumentView.displayName="DocumentView",DocumentView.__docgenInfo={description:"",methods:[],displayName:"DocumentView",props:{match:{type:{name:"shape",value:{params:{name:"shape",value:{key:{name:"string",required:!0}},required:!0}}},required:!0,description:""},history:{type:{name:"shape",value:{push:{name:"func",required:!0}}},required:!0,description:""},breadcrumbs:{type:{name:"arrayOf",value:{name:"shape",value:{path:{name:"string",required:!0},type:{name:"string",required:!0}}}},required:!0,description:""},navigationStrategy:{type:{name:"object"},required:!1,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}};var DocumentView_DocumentView=DocumentView;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/DocumentView/DocumentView.js"]={name:"DocumentView",docgenInfo:DocumentView.__docgenInfo,path:"packages/docs-browser/src/components/DocumentView/DocumentView.js"});var DocumentViewContainer_mapActionCreators={emitAction:function emitAction(action){return actionEmitter.a.dispatchEmittedAction(action)}},DocumentViewContainer=Object(es.connect)((function(state){return{breadcrumbs:state.docs.path.breadcrumbs}}),DocumentViewContainer_mapActionCreators)(Object(index_es.injectIntl)(DocumentView_DocumentView)),BreadcrumbsContainer=Object(es.connect)((function(state){return{pathPrefix:"/docs",breadcrumbsInfo:state.docs.path.breadcrumbs}}),{})(Object(index_es.injectIntl)(src.d));function _templateObject3(){var data=taggedTemplateLiteral_default()(["\n  grid-area: breadcrumbs;\n"]);return _templateObject3=function(){return data},data}function _templateObject2(){var data=taggedTemplateLiteral_default()(["\n  grid-area: content;\n  overflow-x: hidden;\n  padding-right: ",";\n  ","\n"]);return _templateObject2=function(){return data},data}function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  display: grid;\n  grid-template-rows: auto  1fr;\n  grid-template-areas:\n    'breadcrumbs'\n    'content';\n  height: 100%;\n  width: 100%;\n"]);return _templateObject=function(){return data},data}var StyledWrapper=styled_components_browser_esm.default.div(_templateObject()),StyledContent=styled_components_browser_esm.default.div(_templateObject2(),src.P.space(-1),src.J),StyledBreadcrumbs=styled_components_browser_esm.default.div(_templateObject3()),DocsBrowser_ref2=react_default.a.createElement(StyledBreadcrumbs,null,react_default.a.createElement(BreadcrumbsContainer,null)),DocsBrowser=function(_ref){var history=_ref.history,searchMode=_ref.searchMode,navigationStrategy=_ref.navigationStrategy,setSearchMode=_ref.setSearchMode,loadBreadcrumbs=_ref.loadBreadcrumbs,emitAction=_ref.emitAction,openFileDialog=_ref.openFileDialog,_useReducer=Object(react.useReducer)((function(x){return x+1}),0),_useReducer2=slicedToArray_default()(_useReducer,2),docsViewNumber=_useReducer2[0],forceDocsViewUpdate=_useReducer2[1],location=Object(react_router.h)();Object(react.useEffect)((function(){!0===searchMode&&"/docs/"===location.pathname&&(setSearchMode(!1),forceDocsViewUpdate()),loadBreadcrumbs(location.pathname)}));var handleSearchChange=function(e){var hasUserChanges=e.query&&e.query.hasUserChanges;"/docs/search"!==history.location.pathname&&hasUserChanges?history.push("/docs/search"):"/docs/search"!==history.location.pathname||hasUserChanges||history.push("/docs"),setSearchMode(hasUserChanges)},key="docs-view-".concat(docsViewNumber);return react_default.a.createElement(StyledWrapper,null,DocsBrowser_ref2,react_default.a.createElement(StyledContent,null,react_default.a.createElement(react_router.e,null,react_default.a.createElement(react_router.c,{exact:!0,path:"/docs/doc/:key/detail",render:function render(_ref3){var match=_ref3.match;return react_default.a.createElement(DocumentViewContainer,{match:match,history:history,navigationStrategy:navigationStrategy})}}),react_default.a.createElement(react_router.c,{exact:!0,path:["/docs/:model/:key/list","/docs","/docs/search"],render:function render(_ref4){var match=_ref4.match;return react_default.a.createElement(DocsViewContainer,{key:key,storeKey:key,history:history,match:match,navigationStrategy:navigationStrategy,onSearchChange:handleSearchChange,emitAction:emitAction,openFileDialog:openFileDialog})}}))))};DocsBrowser.displayName="DocsBrowser",DocsBrowser.__docgenInfo={description:"",methods:[],displayName:"DocsBrowser",props:{loadBreadcrumbs:{type:{name:"func"},required:!0,description:""},setSearchMode:{type:{name:"func"},required:!0,description:""},emitAction:{type:{name:"func"},required:!0,description:""},openFileDialog:{type:{name:"func"},required:!0,description:""},history:{type:{name:"object"},required:!0,description:""},searchMode:{type:{name:"bool"},required:!0,description:""},navigationStrategy:{type:{name:"object"},required:!1,description:""}}};var DocsBrowser_DocsBrowser=DocsBrowser;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/DocsBrowser/DocsBrowser.js"]={name:"DocsBrowser",docgenInfo:DocsBrowser.__docgenInfo,path:"packages/docs-browser/src/components/DocsBrowser/DocsBrowser.js"});var DocsBrowserContainer_mapActionCreators={loadBreadcrumbs:function(location){return{type:"docs/path/LOAD_BREADCRUMBS",payload:{location:location}}},setSearchMode:function(searchMode){return{type:"docs/path/SET_SEARCH_MODE",payload:{searchMode:searchMode}}},emitAction:function emitAction(action){return actionEmitter.a.dispatchEmittedAction(action)},openFileDialog:function(location,directory,onSuccess,onError){return{type:"docs/create/OPEN_DIALOG",payload:{location:location,directory:directory,onSuccess:onSuccess,onError:onError}}}},DocsBrowserContainer=Object(es.connect)((function(state){return{searchMode:state.docs.path.searchMode,navigationStrategy:state.input.navigationStrategy}}),DocsBrowserContainer_mapActionCreators)(Object(index_es.injectIntl)(DocsBrowser_DocsBrowser));function _createSuper(Derived){var hasNativeReflectConstruct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var result,Super=getPrototypeOf_default()(Derived);if(hasNativeReflectConstruct){var NewTarget=getPrototypeOf_default()(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return possibleConstructorReturn_default()(this,result)}}var main_textResourceSelector=function(state,key){return state.intl.messages[key]||key},main_ref=react_default.a.createElement(notifier.a.Notifier,null),main_ref2=react_default.a.createElement(react_router.c,{exact:!0,path:"/"},react_default.a.createElement(react_router.b,{to:"/docs"})),initApp=function(id,input,events,publicPath){var store=appFactory.a.createStore(reducers,reducers_sagas,input,"docs-browser");externalEvents.a.addToStore(store,events),actionEmitter.a.addToStore(store),errorLogging.a.addToStore(store,!0,["console","remote","notifier"]),notifier.a.addToStore(store,!0);var history=input.history||function(store){return createHashHistory_default()({getUserConfirmation:function getUserConfirmation(message,confirmCallback){var state=store.getState(),okText=main_textResourceSelector(state,"client.common.ok"),cancelText=main_textResourceSelector(state,"client.common.cancel"),action=notifier.a.confirm("",message,okText,cancelText,(function(){return confirmCallback(!0)}),(function(){return confirmCallback(!1)}));store.dispatch(action)}})}(store),content=react_default.a.createElement(react_router.d,{history:history},main_ref,react_default.a.createElement(DocsBrowserContainer,{history:history}),main_ref2);return appFactory.a.createApp("docs-browser",content,store,{input:input,events:events,actions:[],publicPath:publicPath,textResourceModules:["component","common","actions","entity-list","entity-detail","docs-browser"]})},main_DocsBrowserApp=function(_React$Component){inherits_default()(DocsBrowserApp,_React$Component);var _super=_createSuper(DocsBrowserApp);function DocsBrowserApp(props){var _this;return classCallCheck_default()(this,DocsBrowserApp),(_this=_super.call(this,props)).app=initApp(0,props),_this}return createClass_default()(DocsBrowserApp,[{key:"render",value:function render(){return this.app.component}}]),DocsBrowserApp}(react_default.a.Component);main_DocsBrowserApp.displayName="DocsBrowserApp",main_DocsBrowserApp.__docgenInfo={description:"",methods:[],displayName:"DocsBrowserApp",props:{history:{type:{name:"object"},required:!1,description:""},navigationStrategy:{type:{name:"object"},required:!1,description:""},domainTypes:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""}}};var docs_browser_src_main=main_DocsBrowserApp;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/main.js"]={name:"DocsBrowserApp",docgenInfo:main_DocsBrowserApp.__docgenInfo,path:"packages/docs-browser/src/main.js"});var utils_navigationStrategy=__webpack_require__(3630),route_DocsBrowserApp=function(props){return react_default.a.createElement(docs_browser_src_main,extends_default()({},props,{navigationStrategy:{ListLink:utils_navigationStrategy.b,DetailLink:utils_navigationStrategy.a}}))};route_DocsBrowserApp.displayName="DocsBrowserApp";__webpack_exports__.default={container:route_DocsBrowserApp}}}]);
//# sourceMappingURL=15.9840ad68bb4b80394dff.bundle.js.map