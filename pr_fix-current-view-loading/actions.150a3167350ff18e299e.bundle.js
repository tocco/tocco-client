(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{2346:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var tocco_input_edit_src_main__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(595);__webpack_require__.d(__webpack_exports__,"default",(function(){return tocco_input_edit_src_main__WEBPACK_IMPORTED_MODULE_0__.a}))},2347:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(24),__webpack_require__(66),__webpack_require__(184);var react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__),tocco_resource_scheduler_src_main__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(948),_utils_routing__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__(1029),__webpack_require__(2281)),ResourceScheduler=function(_ref){var match=_ref.match,entityBaseUrl=Object(_utils_routing__WEBPACK_IMPORTED_MODULE_6__.a)(match.url,2);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(tocco_resource_scheduler_src_main__WEBPACK_IMPORTED_MODULE_4__.b,{onEventClick:function onEventClick(_ref2){var model=_ref2.model,key=_ref2.key;window.open("".concat(entityBaseUrl,"/").concat(model,"/").concat(key),"_blank")}})};ResourceScheduler.displayName="ResourceScheduler",ResourceScheduler.__docgenInfo={description:"",methods:[],displayName:"ResourceScheduler",props:{match:{type:{name:"shape",value:{url:{name:"string",required:!1}}},required:!0,description:""}}},__webpack_exports__.default=ResourceScheduler,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/entities/components/Action/actions/ResourceScheduler.js"]={name:"ResourceScheduler",docgenInfo:ResourceScheduler.__docgenInfo,path:"packages/admin/src/routes/entities/components/Action/actions/ResourceScheduler.js"})},2348:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(66),__webpack_require__(184);var react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__),react_router_dom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(358),_utils_routing__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(1029),__webpack_require__(2281)),CashManagement=function(props){var entityBaseUrl=Object(_utils_routing__WEBPACK_IMPORTED_MODULE_5__.a)(props.match.url,2);return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.b,{to:entityBaseUrl+"/Cash_management_import/list?formName=Cash_management_import_action"})};CashManagement.displayName="CashManagement",CashManagement.__docgenInfo={description:"",methods:[],displayName:"CashManagement",props:{match:{type:{name:"shape",value:{url:{name:"string",required:!1}}},required:!0,description:""}}},__webpack_exports__.default=CashManagement,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/entities/components/Action/actions/CashManagementImport.js"]={name:"CashManagement",docgenInfo:CashManagement.__docgenInfo,path:"packages/admin/src/routes/entities/components/Action/actions/CashManagementImport.js"})},2349:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(164);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(96),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__),react_router_dom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(358),ShowOutputJobsAction=(__webpack_require__(1029),function(props){var _useState=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!1),_useState2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState,2),doRedirect=_useState2[0],setDoRedirect=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((function(){setTimeout((function(){return setDoRedirect(!0)}),0)}),[]),doRedirect?react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.b,{to:{pathname:"/e/Output_job/list",search:"tql=".concat(encodeURIComponent('entity=="'.concat(props.selection.entityName,'"')))}}):null});ShowOutputJobsAction.__docgenInfo={description:"",methods:[],displayName:"ShowOutputJobsAction",props:{selection:{type:{name:"shape",value:{entityName:{name:"string",required:!0}}},required:!0,description:""}}},__webpack_exports__.default=ShowOutputJobsAction,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/entities/components/Action/actions/ShowOutputJobsAction.js"]={name:"ShowOutputJobsAction",docgenInfo:ShowOutputJobsAction.__docgenInfo,path:"packages/admin/src/routes/entities/components/Action/actions/ShowOutputJobsAction.js"})},2355:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),reducer=__webpack_require__(29),appFactory=__webpack_require__(73),prop_types=__webpack_require__(9),prop_types_default=__webpack_require__.n(prop_types),root=__webpack_require__(101),setData=function(data){return{type:"qrCode/SET_DATA",payload:{data:data}}},defineProperty=__webpack_require__(4),ACTION_HANDLERS=__webpack_require__.n(defineProperty)()({},"qrCode/SET_DATA",reducer.a.singleTransferReducer("data")),initialState={data:void 0};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/user-qr-action/src/modules/qrCode/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/user-qr-action/src/modules/qrCode/reducer.js"});__webpack_require__(21),__webpack_require__(163),__webpack_require__(22);var slicedToArray=__webpack_require__(96),slicedToArray_default=__webpack_require__.n(slicedToArray),regenerator=__webpack_require__(2),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=(__webpack_require__(49),__webpack_require__(1)),rest=__webpack_require__(40),consoleLogger=__webpack_require__(88),_marked=regenerator_default.a.mark(sagas),_marked2=regenerator_default.a.mark(sagas_fetchData),inputSelector=function(state){return state.input};function sagas(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.i)("qrCode/FETCH_DATA",sagas_fetchData)]);case 2:case"end":return _context.stop()}}),_marked)}function sagas_fetchData(){var _ref,selection,userKey,query,entity,data;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(inputSelector);case 2:return _ref=_context2.sent,selection=_ref.selection,userKey=getSingleKey(selection),query={paths:["firstname","lastname","c_address","phone_mobile","phone_company","phone_private","email","email_alternative","birthdate"]},_context2.prev=6,_context2.next=9,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.fetchEntity,"User",userKey,query);case 9:return entity=_context2.sent,data=null,entity&&(data={},Object.entries(entity.paths).forEach((function(_ref2){var _ref3=slicedToArray_default()(_ref2,2),path=_ref3[0],bean=_ref3[1];bean&&bean.value&&(data[path]=bean.value)}))),_context2.next=14,Object(redux_saga_effects_npm_proxy_esm.e)(setData(data));case 14:_context2.next=21;break;case 16:return _context2.prev=16,_context2.t0=_context2.catch(6),consoleLogger.a.logError("Failed to fetch data",_context2.t0),_context2.next=21,Object(redux_saga_effects_npm_proxy_esm.e)(setData(null));case 21:case"end":return _context2.stop()}}),_marked2,null,[[6,16]])}var getSingleKey=function(selection){if("User"!==selection.entityName)throw new Error("Only selection of User supported");if("ID"!==selection.type)throw new Error("Only ID selection type supported");if(!selection.ids||1!==selection.ids.length)throw new Error("Exactly one user must be selected");return selection.ids[0]},reducers={qrCode:reducer_reducer},reducers_sagas=[sagas],es=__webpack_require__(39),taggedTemplateLiteral=__webpack_require__(26),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),src=__webpack_require__(5),styled_components_browser_esm=__webpack_require__(7),index_es=__webpack_require__(14),appendField=(__webpack_require__(24),__webpack_require__(66),__webpack_require__(131),function(data,fieldName,outputPrefix,output){var handler=4<arguments.length&&void 0!==arguments[4]?arguments[4]:function(fieldData){return fieldData};return data[fieldName]&&0<data[fieldName].length&&(output+="".concat(outputPrefix,":").concat(handler(data[fieldName]),";")),output});function _templateObject2(){var data=taggedTemplateLiteral_default()(["\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"]);return _templateObject2=function(){return data},data}function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  width: 148px;\n  height: 148px;\n  position: relative;\n"]);return _templateObject=function(){return data},data}var StyledContainer=styled_components_browser_esm.default.div(_templateObject()),StyledContent=styled_components_browser_esm.default.div(_templateObject2()),UserQrCode_ref2=react_default.a.createElement(src.l,null),UserQrCode_ref3=react_default.a.createElement(src.C.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.user-qr-action.fetchFailed"})),UserQrCode=function(_ref){var content,data=_ref.data,fetchData=_ref.fetchData;if(Object(react.useEffect)((function(){fetchData()}),[]),void 0===data)content=UserQrCode_ref2;else if(null===data)content=UserQrCode_ref3;else{var string=function(data){var string="MECARD:N:".concat(data.lastname,",").concat(data.firstname,";");return string=appendField(data,"c_address","ADR",string,(function(address){return address.replace(/\s*<br\s?\/?>\s*/gi,",")})),string=appendField(data,"phone_mobile","TEL",string),string=appendField(data,"phone_company","TEL",string),string=appendField(data,"phone_private","TEL",string),string=appendField(data,"email","EMAIL",string),string=appendField(data,"email_alternative","EMAIL",string),string=appendField(data,"birthdate","BDAY",string,(function(date){return date.replace(/-/gi,"")}))}(data);content=react_default.a.createElement(src.q,{value:string})}return react_default.a.createElement(StyledContainer,null,react_default.a.createElement(StyledContent,null,content))};UserQrCode.displayName="UserQrCode",UserQrCode.__docgenInfo={description:"",methods:[],displayName:"UserQrCode",props:{data:{type:{name:"shape",value:{firstname:{name:"string",required:!0},lastname:{name:"string",required:!0},c_address:{name:"string",required:!1},phone_mobile:{name:"string",required:!1},phone_company:{name:"string",required:!1},phone_private:{name:"string",required:!1},email:{name:"string",required:!1},email_alternative:{name:"string",required:!1},birthdate:{name:"string",required:!1}}},required:!1,description:""},fetchData:{type:{name:"func"},required:!0,description:""}}};var UserQrCode_UserQrCode=UserQrCode;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/user-qr-action/src/components/UserQrCode/UserQrCode.js"]={name:"UserQrCode",docgenInfo:UserQrCode.__docgenInfo,path:"packages/user-qr-action/src/components/UserQrCode/UserQrCode.js"});var components_UserQrCode=UserQrCode_UserQrCode,mapActionCreators={fetchData:function(){return{type:"qrCode/FETCH_DATA"}}},UserQrCodeContainer=Object(root.hot)(Object(es.connect)((function(state){return{data:state.qrCode.data}}),mapActionCreators)(components_UserQrCode)),initApp=function(id,input,events,publicPath){var content=react_default.a.createElement(UserQrCodeContainer,{selection:input.selection}),store=appFactory.a.createStore(reducers,reducers_sagas,input,"user-qr-action");return appFactory.a.createApp("user-qr-action",content,store,{input:input,events:events,actions:[],publicPath:publicPath,textResourceModules:["component","common","user-qr-action"]})};appFactory.a.registerAppInRegistry("user-qr-action",initApp);var UserQrActionApp=function(props){return initApp(0,props).component};UserQrActionApp.propTypes={selection:prop_types_default.a.object};var main=Object(root.hot)(UserQrActionApp);__webpack_require__.d(__webpack_exports__,"default",(function(){return main}))}}]);
//# sourceMappingURL=actions.150a3167350ff18e299e.bundle.js.map