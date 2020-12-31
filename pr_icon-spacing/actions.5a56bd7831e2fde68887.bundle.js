(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{3339:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return goBack}));__webpack_require__(1042),__webpack_require__(54),__webpack_require__(146);var goBack=function(url){for(var amount=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1,normalizedUrl=url.replace(/\/$/,""),i=0;i<amount;i++)normalizedUrl=normalizedUrl.substring(0,normalizedUrl.lastIndexOf("/"));return normalizedUrl}},3341:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(16),__webpack_require__(27),__webpack_require__(18),__webpack_require__(70),__webpack_require__(28),__webpack_require__(23),__webpack_require__(32),__webpack_require__(33),__webpack_require__(15),__webpack_require__(19);var _ACTION_HANDLERS,defineProperty=__webpack_require__(4),defineProperty_default=__webpack_require__.n(defineProperty),react=__webpack_require__(0),react_default=__webpack_require__.n(react),reducer=__webpack_require__(24),src_selection=__webpack_require__(604),appFactory=__webpack_require__(72),externalEvents=__webpack_require__(64),root=__webpack_require__(100),actions_doDelete=function(){return{type:"delete/DO_DELETE"}},ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"delete/SET_DELETE_DIALOG_INFO",reducer.a.singleTransferReducer("dialogInfo")),defineProperty_default()(_ACTION_HANDLERS,"delete/SET_DELETING_IN_PROGRESS",reducer.a.singleTransferReducer("deletingInProgress")),_ACTION_HANDLERS),initialState={dialogInfo:null,deletingInProgress:!1};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/modules/delete/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/delete/src/modules/delete/reducer.js"});__webpack_require__(25),__webpack_require__(47),__webpack_require__(26),__webpack_require__(38),__webpack_require__(51);var toConsumableArray=__webpack_require__(30),toConsumableArray_default=__webpack_require__.n(toConsumableArray),slicedToArray=__webpack_require__(61),slicedToArray_default=__webpack_require__.n(slicedToArray),regenerator=__webpack_require__(2),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=(__webpack_require__(40),__webpack_require__(1)),rest=__webpack_require__(31),get=(__webpack_require__(159),__webpack_require__(183),__webpack_require__(605),__webpack_require__(76),__webpack_require__(29)),get_default=__webpack_require__.n(get),prop_types=__webpack_require__(11),prop_types_default=__webpack_require__.n(prop_types);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(source,!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}var deleteStatus_DELETABLE="DELETABLE",deleteRequestParser=function(response,currentBuId){var entitiesToDelete=response.entitiesToDelete;return entitiesToDelete.reduce((function(acc,entityToDelete){var _objectSpread2,deletable=function(entityToDelete){return entityToDelete.rootEntity.deleteStatus===deleteStatus_DELETABLE&&!entityToDelete.affectedEntities.find((function(affectedEntity){return affectedEntity.deleteStatus!==deleteStatus_DELETABLE}))}(entityToDelete),keyAttr=deletable?"keysDeletable":"keysNotDeletable",relatedAttr=deletable?"relatedDeletable":"relatedNotDeletable";return _objectSpread({},acc,(_objectSpread2={},defineProperty_default()(_objectSpread2,keyAttr,[].concat(toConsumableArray_default()(acc[keyAttr]),[entityToDelete.rootEntity.key])),defineProperty_default()(_objectSpread2,relatedAttr,function(relatedEntities,entityToDelete,deletable,currentBuId){return _objectSpread({},entityToDelete.affectedEntities.reduce((function(acc,affectedEntity){return _objectSpread({},acc,{},deletable||affectedEntity.deleteStatus!==deleteStatus_DELETABLE?defineProperty_default()({},affectedEntity.entityName,_objectSpread({},get_default()(acc,affectedEntity.entityName,{keys:[],keysOtherBu:[],entityLabel:affectedEntity.entityLabel}),{},null===affectedEntity.businessUnitId||affectedEntity.businessUnitId===currentBuId?{keys:Array.from(new Set([].concat(toConsumableArray_default()(get_default()(acc,[affectedEntity.entityName,"keys"],[])),[affectedEntity.key])))}:{keysOtherBu:Array.from(new Set([].concat(toConsumableArray_default()(get_default()(acc,[affectedEntity.entityName,"keysOtherBu"],[])),[affectedEntity.key])))})):{})}),_objectSpread({},relatedEntities)))}(acc[relatedAttr],entityToDelete,deletable,currentBuId)),_objectSpread2))}),{entityName:get_default()(entitiesToDelete,"[0].rootEntity.entityName"),entityLabel:get_default()(entitiesToDelete,"[0].rootEntity.entityLabel"),keysDeletable:[],keysNotDeletable:[],relatedDeletable:{},relatedNotDeletable:{},hasUnreadableEntities:!!entitiesToDelete.find((function(e){return e.unreadableEntities}))})},relatedPropType=prop_types_default.a.shape({entityLabel:prop_types_default.a.string,keys:prop_types_default.a.arrayOf(prop_types_default.a.string),keysOtherBu:prop_types_default.a.arrayOf(prop_types_default.a.string)}),_marked=(prop_types_default.a.shape({entityName:prop_types_default.a.string.isRequired,entityLabel:prop_types_default.a.string.isRequired,keysDeletable:prop_types_default.a.arrayOf(prop_types_default.a.string).isRequired,keysNotDeletable:prop_types_default.a.arrayOf(prop_types_default.a.string).isRequired,relatedDeletable:prop_types_default.a.objectOf(relatedPropType).isRequired,relatedNotDeletable:prop_types_default.a.objectOf(relatedPropType).isRequired,hasUnreadableEntities:prop_types_default.a.bool}),regenerator_default.a.mark(getDeleteBodyFromSelection)),_marked2=regenerator_default.a.mark(sagas_loadDialogInfo),_marked3=regenerator_default.a.mark(sagas_doDelete),_marked4=regenerator_default.a.mark(sagas_onCancel),_marked5=regenerator_default.a.mark(mainSagas),inputSelector=function(state){return state.input},textResourceSelector=function(state){return state.intl.messages},dialogInfoSelector=function(state){return state.del.dialogInfo};function getDeleteBodyFromSelection(){var _ref,selection,entities;return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(inputSelector);case 2:return _ref=_context.sent,selection=_ref.selection,_context.next=6,Object(redux_saga_effects_npm_proxy_esm.b)(src_selection.a.getEntities,selection,rest.a.fetchEntities);case 6:return entities=_context.sent,_context.abrupt("return",{entityModel:entities.entityName,keys:entities.keys});case 8:case"end":return _context.stop()}}),_marked)}function sagas_loadDialogInfo(){var body,_ref2,_ref3,deleteResponse,principal,res;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(redux_saga_effects_npm_proxy_esm.b)(getDeleteBodyFromSelection);case 2:return body=_context2.sent,_context2.next=5,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,"client/delete/dialog",{method:"POST",body:body}),Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.fetchPrincipal)]);case 5:return _ref2=_context2.sent,_ref3=slicedToArray_default()(_ref2,2),deleteResponse=_ref3[0],principal=_ref3[1],res=deleteRequestParser(deleteResponse.body,principal.currentBusinessUnit.id),_context2.next=12,Object(redux_saga_effects_npm_proxy_esm.e)({type:"delete/SET_DELETE_DIALOG_INFO",payload:{dialogInfo:res}});case 12:case"end":return _context2.stop()}}),_marked2)}function sagas_doDelete(){var _ref4,keysDeletable,entityName,body,response,textResources,_body,entities,remoteEvents;return regenerator_default.a.wrap((function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return _context3.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(dialogInfoSelector);case 2:return _ref4=_context3.sent,keysDeletable=_ref4.keysDeletable,entityName=_ref4.entityName,_context3.next=7,Object(redux_saga_effects_npm_proxy_esm.e)({type:"delete/SET_DELETING_IN_PROGRESS",payload:{deletingInProgress:!0}});case 7:return body={entityModel:entityName,keys:keysDeletable},_context3.next=10,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,"client/delete",{method:"POST",body:body});case 10:return response=_context3.sent,_context3.next=13,Object(redux_saga_effects_npm_proxy_esm.f)(textResourceSelector);case 13:if(textResources=_context3.sent,!response.ok){_context3.next=22;break}return _body=response.body,entities=Object.keys(_body.deletedEntities).reduce((function(acc,entityName){return[].concat(toConsumableArray_default()(acc),toConsumableArray_default()(_body.deletedEntities[entityName].map((function(key){return{entityName:entityName,key:key}}))))}),[]),remoteEvents=[{type:"entity-delete-event",payload:{entities:entities}}],_context3.next=20,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onSuccess",{message:textResources["client.delete.successfullyMessage"],remoteEvents:remoteEvents}));case 20:_context3.next=24;break;case 22:return _context3.next=24,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onError",{message:textResources["client.delete.errorMessage"]}));case 24:case"end":return _context3.stop()}}),_marked3)}function sagas_onCancel(){return regenerator_default.a.wrap((function(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return _context4.next=2,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onCancel"));case 2:case"end":return _context4.stop()}}),_marked4)}function mainSagas(){return regenerator_default.a.wrap((function(_context5){for(;;)switch(_context5.prev=_context5.next){case 0:return _context5.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.j)("root/LOAD_DIALOG_INFO",sagas_loadDialogInfo),Object(redux_saga_effects_npm_proxy_esm.j)("delete/DO_DELETE",sagas_doDelete),Object(redux_saga_effects_npm_proxy_esm.j)("delete/ON_CANCEL",sagas_onCancel)]);case 2:case"end":return _context5.stop()}}),_marked5)}var reducers={del:reducer_reducer},sagas=[mainSagas],es=__webpack_require__(36),index_es=__webpack_require__(13),src=__webpack_require__(5),taggedTemplateLiteral=(__webpack_require__(117),__webpack_require__(127),__webpack_require__(22)),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_components_browser_esm=__webpack_require__(6),LinkPopOver_ref2=react_default.a.createElement(src.K.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.tooManyRecords"})),LinkPopOver=function(_ref){var relatedEntity=_ref.relatedEntity,children=_ref.children,maxCountLink=_ref.maxCountLink;if(relatedEntity.keys.length<maxCountLink&&0===relatedEntity.keysOtherBu.length)return children;var content=react_default.a.createElement(react_default.a.Fragment,null,relatedEntity.keys.length>maxCountLink&&LinkPopOver_ref2,0<relatedEntity.keysOtherBu.length&&react_default.a.createElement(src.K.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.recordInOtherBU",values:{count:relatedEntity.keysOtherBu.length}})));return react_default.a.createElement(src.t,{content:content,placement:"top",spacer:10},children)};LinkPopOver.displayName="LinkPopOver",LinkPopOver.__docgenInfo={description:"",methods:[],displayName:"LinkPopOver",props:{relatedEntity:{type:{name:"custom",raw:"relatedPropType.isRequired"},required:!1,description:""},maxCountLink:{type:{name:"number"},required:!0,description:""},children:{type:{name:"element"},required:!1,description:""}}};var InfoPart_LinkPopOver=LinkPopOver;function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  white-space: nowrap;\n"]);return _templateObject=function(){return data},data}"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/InfoPart/LinkPopOver.js"]={name:"LinkPopOver",docgenInfo:LinkPopOver.__docgenInfo,path:"packages/delete/src/components/InfoPart/LinkPopOver.js"});var NonBreakingText=styled_components_browser_esm.default.span(_templateObject()),InfoPart_ref2=react_default.a.createElement("span",null," / "),InfoPart=function(_ref){var entityName=_ref.entityName,entityLabel=_ref.entityLabel,keys=_ref.keys,relatedEntities=_ref.relatedEntities,maxCountLink=_ref.maxCountLink,primaryTql="KEYS("+keys.join(",")+")";return react_default.a.createElement(src.K.Span,null,react_default.a.createElement(src.K.B,null,entityLabel," (",0<keys.length?react_default.a.createElement(src.w,{to:"/e/".concat(entityName,"/list?tql=").concat(primaryTql),target:"_blank"},keys.length):react_default.a.createElement(src.K.Span,null,keys.length),")"),0<Object.keys(relatedEntities).length&&react_default.a.createElement(react_default.a.Fragment,null,InfoPart_ref2,Object.keys(relatedEntities).map((function(entityName){var relatedEntity=relatedEntities[entityName],tql="KEYS("+relatedEntity.keys.slice(0,maxCountLink).join(",")+")",linkText=[].concat(toConsumableArray_default()(relatedEntity.keys),toConsumableArray_default()(relatedEntity.keysOtherBu)).length,Count=0<relatedEntity.keys.length?react_default.a.createElement(src.w,{to:"/e/".concat(entityName,"/list?tql=").concat(tql),target:"_blank"},linkText):react_default.a.createElement(src.K.Span,null,linkText),Content=react_default.a.createElement(InfoPart_LinkPopOver,{relatedEntity:relatedEntity,maxCountLink:maxCountLink},Count);return react_default.a.createElement(react_default.a.Fragment,{key:"entity-info-"+entityName},react_default.a.createElement(NonBreakingText,null,relatedEntity.entityLabel," (",Content,")"))})).reduce((function(prev,curr){return[prev,", ",curr]}))))};InfoPart.displayName="InfoPart",InfoPart.__docgenInfo={description:"",methods:[],displayName:"InfoPart",props:{entityName:{type:{name:"string"},required:!0,description:""},entityLabel:{type:{name:"string"},required:!0,description:""},keys:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},relatedEntities:{type:{name:"objectOf",value:{name:"custom",raw:"relatedPropType"}},required:!0,description:""},maxCountLink:{type:{name:"number"},required:!1,description:""}}};var InfoPart_InfoPart=InfoPart;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/InfoPart/InfoPart.js"]={name:"InfoPart",docgenInfo:InfoPart.__docgenInfo,path:"packages/delete/src/components/InfoPart/InfoPart.js"});var Dialog_ref2=react_default.a.createElement(src.K.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.confirmText"})),Dialog_ref3=react_default.a.createElement(src.K.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.textNotDeletable"})),Dialog_ref4=react_default.a.createElement(src.y,{condition:"warning"},react_default.a.createElement(src.K.Span,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.unreadableEntities"}))),_ref5=react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.deleteButton"}),_ref6=react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.cancelButton"}),Dialog=function(_ref){var dialogInfo=_ref.dialogInfo,doDelete=_ref.doDelete,onCancel=_ref.onCancel;return react_default.a.createElement(react_default.a.Fragment,null,Dialog_ref2,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-deletable",entityName:dialogInfo.entityName,entityLabel:dialogInfo.entityLabel,keys:dialogInfo.keysDeletable,relatedEntities:dialogInfo.relatedDeletable,maxCountLink:100}),0<dialogInfo.keysNotDeletable.length&&react_default.a.createElement("div",{style:{paddingTop:"20px"}},Dialog_ref3,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-notdeletable",entityName:dialogInfo.entityName,entityLabel:dialogInfo.entityLabel,keys:dialogInfo.keysNotDeletable,relatedEntities:dialogInfo.relatedNotDeletable,maxCountLink:100})),dialogInfo.hasUnreadableEntities&&react_default.a.createElement("div",{style:{paddingTop:"20px"}},Dialog_ref4),react_default.a.createElement("div",{style:{paddingTop:"20px"}},react_default.a.createElement(src.d,{onClick:doDelete,disabled:0===dialogInfo.keysDeletable.length},_ref5),react_default.a.createElement(src.d,{ink:"primary",onClick:onCancel},_ref6)))};Dialog.__docgenInfo={description:"",methods:[],displayName:"Dialog",props:{onCancel:{type:{name:"func"},required:!0,description:""},doDelete:{type:{name:"func"},required:!0,description:""},dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType.isRequired"},required:!1,description:""}}};var Dialog_Dialog=Dialog;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/Dialog/Dialog.js"]={name:"Dialog",docgenInfo:Dialog.__docgenInfo,path:"packages/delete/src/components/Dialog/Dialog.js"});var mapActionCreators={doDelete:actions_doDelete,onCancel:function(){return{type:"delete/ON_CANCEL"}}},DialogContainer=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo}}),mapActionCreators)(Object(index_es.injectIntl)(Dialog_Dialog)),DeleteProgress_ref2=react_default.a.createElement(src.n,{size:"30px"}),DeleteProgress_ref3=react_default.a.createElement(src.K.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.deleteInProgress"})),DeleteProgress=function(_ref){var dialogInfo=_ref.dialogInfo;_ref.intl;return react_default.a.createElement(react_default.a.Fragment,null,DeleteProgress_ref2,DeleteProgress_ref3,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-deletable",entityName:dialogInfo.entityName,entityLabel:dialogInfo.entityLabel,keys:dialogInfo.keysDeletable,relatedEntities:dialogInfo.relatedDeletable,maxCountLink:100}))};DeleteProgress.__docgenInfo={description:"",methods:[],displayName:"DeleteProgress",props:{dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType.isRequired"},required:!1,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""}}};var DeleteProgress_DeleteProgress=DeleteProgress;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/DeleteProgress/DeleteProgress.js"]={name:"DeleteProgress",docgenInfo:DeleteProgress.__docgenInfo,path:"packages/delete/src/components/DeleteProgress/DeleteProgress.js"});var DeleteProgressContainer_mapActionCreators={doDelete:actions_doDelete},components_DeleteProgress=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo}}),DeleteProgressContainer_mapActionCreators)(Object(index_es.injectIntl)(DeleteProgress_DeleteProgress)),Delete_ref2=react_default.a.createElement(components_DeleteProgress,null),Delete_ref3=react_default.a.createElement(DialogContainer,null),Delete=function(_ref){var loadDialogInfo=_ref.loadDialogInfo,dialogInfo=_ref.dialogInfo,deletingInProgress=_ref.deletingInProgress,intl=_ref.intl;return Object(react.useEffect)((function(){loadDialogInfo()}),[]),deletingInProgress?Delete_ref2:react_default.a.createElement(src.m,{required:[dialogInfo],loadingText:function msg(id){return intl.formatMessage({id:id})}("client.delete.loadingText")},dialogInfo&&Delete_ref3)};Delete.displayName="Delete",Delete.__docgenInfo={description:"",methods:[],displayName:"Delete",props:{loadDialogInfo:{type:{name:"func"},required:!0,description:""},dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType"},required:!1,description:""},deletingInProgress:{type:{name:"bool"},required:!1,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""}}};var Delete_Delete=Delete;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/Delete/Delete.js"]={name:"Delete",docgenInfo:Delete.__docgenInfo,path:"packages/delete/src/components/Delete/Delete.js"});var DeleteContainer_mapActionCreators={loadDialogInfo:function(){return{type:"root/LOAD_DIALOG_INFO"}}},components_Delete=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo,deletingInProgress:state.del.deletingInProgress}}),DeleteContainer_mapActionCreators)(Object(index_es.injectIntl)(Delete_Delete));function main_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}var EXTERNAL_EVENTS=["onSuccess","onCancel","onError"],main_ref=react_default.a.createElement(components_Delete,null),initApp=function(id,input,events,publicPath){var store=appFactory.a.createStore(reducers,sagas,input,"delete");return externalEvents.a.addToStore(store,events),appFactory.a.createApp("delete",main_ref,store,{input:input,events:events,actions:[],publicPath:publicPath,textResourceModules:["component","common","delete"]})};appFactory.a.registerAppInRegistry("delete",initApp);var DeleteApp=function(props){var events=EXTERNAL_EVENTS.reduce((function(acc,event){return function main_objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?main_ownKeys(source,!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):main_ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}({},acc,{},props[event]?defineProperty_default()({},event,props[event]):{})}),{});return initApp(0,props,events).component};DeleteApp.propTypes={selection:src_selection.a.propType.isRequired};__webpack_exports__.a=Object(root.hot)(DeleteApp)},3344:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var tocco_input_edit_src_main__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(603);__webpack_require__.d(__webpack_exports__,"default",(function(){return tocco_input_edit_src_main__WEBPACK_IMPORTED_MODULE_0__.a}))},3345:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3341);__webpack_require__.d(__webpack_exports__,"default",(function(){return tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_0__.a}))},3411:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var tocco_input_edit_src_main__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(603);__webpack_require__.d(__webpack_exports__,"default",(function(){return tocco_input_edit_src_main__WEBPACK_IMPORTED_MODULE_0__.a}))},3412:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(25),__webpack_require__(54),__webpack_require__(163);var react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__),tocco_resource_scheduler_src_main__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(964),_utils_routing__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__(1041),__webpack_require__(604),__webpack_require__(3339)),ResourceScheduler=function(_ref){var match=_ref.match,selection=_ref.selection,actionProperties=_ref.actionProperties,history=_ref.history,entityBaseUrl=Object(_utils_routing__WEBPACK_IMPORTED_MODULE_7__.a)(match.url,2);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(tocco_resource_scheduler_src_main__WEBPACK_IMPORTED_MODULE_4__.b,{onEventClick:function onEventClick(_ref2){var model=_ref2.model,key=_ref2.key,url=history.createHref({pathname:"".concat(entityBaseUrl,"/").concat(model,"/").concat(key)});window.open(url,"_blank")},selection:selection,actionProperties:actionProperties})};ResourceScheduler.displayName="ResourceScheduler",ResourceScheduler.__docgenInfo={description:"",methods:[],displayName:"ResourceScheduler",props:{match:{type:{name:"shape",value:{url:{name:"string",required:!1}}},required:!0,description:""},selection:{type:{name:"custom",raw:"selectionPropType.propType"},required:!1,description:""},actionProperties:{type:{name:"shape",value:{calendarType:{name:"string",required:!1}}},required:!1,description:""},history:{type:{name:"shape",value:{createHref:{name:"func",required:!0}}},required:!0,description:""}}},__webpack_exports__.default=ResourceScheduler,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/entities/components/Action/actions/ResourceScheduler.js"]={name:"ResourceScheduler",docgenInfo:ResourceScheduler.__docgenInfo,path:"packages/admin/src/routes/entities/components/Action/actions/ResourceScheduler.js"})},3413:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),react_router_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(181),ShowOutputJobsAction=(__webpack_require__(1041),function(props){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.b,{to:{pathname:"/e/Output_job/list",search:"tql=".concat(encodeURIComponent('entity=="'.concat(props.selection.entityName,'"')))}})});ShowOutputJobsAction.displayName="ShowOutputJobsAction",ShowOutputJobsAction.__docgenInfo={description:"",methods:[],displayName:"ShowOutputJobsAction",props:{selection:{type:{name:"shape",value:{entityName:{name:"string",required:!0}}},required:!0,description:""}}},__webpack_exports__.default=ShowOutputJobsAction,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/entities/components/Action/actions/ShowOutputJobsAction.js"]={name:"ShowOutputJobsAction",docgenInfo:ShowOutputJobsAction.__docgenInfo,path:"packages/admin/src/routes/entities/components/Action/actions/ShowOutputJobsAction.js"})},3414:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3341);__webpack_require__.d(__webpack_exports__,"default",(function(){return tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_0__.a}))},3415:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),react_router_dom__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(181),Documents=function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.b,{to:{pathname:"/docs"}})};Documents.displayName="Documents",Documents.__docgenInfo={description:"",methods:[],displayName:"Documents"},__webpack_exports__.default=Documents,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/entities/components/Action/actions/Documents.js"]={name:"Documents",docgenInfo:Documents.__docgenInfo,path:"packages/admin/src/routes/entities/components/Action/actions/Documents.js"})},3422:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),reducer=__webpack_require__(24),appFactory=__webpack_require__(72),prop_types=__webpack_require__(11),prop_types_default=__webpack_require__.n(prop_types),root=__webpack_require__(100),setData=function(data){return{type:"qrCode/SET_DATA",payload:{data:data}}},defineProperty=__webpack_require__(4),ACTION_HANDLERS=__webpack_require__.n(defineProperty)()({},"qrCode/SET_DATA",reducer.a.singleTransferReducer("data")),initialState={data:void 0};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/user-qr-action/src/modules/qrCode/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/user-qr-action/src/modules/qrCode/reducer.js"});__webpack_require__(18),__webpack_require__(154),__webpack_require__(19);var slicedToArray=__webpack_require__(61),slicedToArray_default=__webpack_require__.n(slicedToArray),regenerator=__webpack_require__(2),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=(__webpack_require__(40),__webpack_require__(1)),rest=__webpack_require__(31),consoleLogger=__webpack_require__(101),_marked=regenerator_default.a.mark(sagas),_marked2=regenerator_default.a.mark(sagas_fetchData),inputSelector=function(state){return state.input};function sagas(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.i)("qrCode/FETCH_DATA",sagas_fetchData)]);case 2:case"end":return _context.stop()}}),_marked)}function sagas_fetchData(){var _ref,selection,userKey,query,entity,data;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(inputSelector);case 2:return _ref=_context2.sent,selection=_ref.selection,userKey=getSingleKey(selection),query={paths:["firstname","lastname","c_address","phone_mobile","phone_company","phone_private","email","email_alternative","birthdate"]},_context2.prev=6,_context2.next=9,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.fetchEntity,"User",userKey,query);case 9:return entity=_context2.sent,data=null,entity&&(data={},Object.entries(entity.paths).forEach((function(_ref2){var _ref3=slicedToArray_default()(_ref2,2),path=_ref3[0],bean=_ref3[1];bean&&bean.value&&(data[path]=bean.value)}))),_context2.next=14,Object(redux_saga_effects_npm_proxy_esm.e)(setData(data));case 14:_context2.next=21;break;case 16:return _context2.prev=16,_context2.t0=_context2.catch(6),consoleLogger.a.logError("Failed to fetch data",_context2.t0),_context2.next=21,Object(redux_saga_effects_npm_proxy_esm.e)(setData(null));case 21:case"end":return _context2.stop()}}),_marked2,null,[[6,16]])}var getSingleKey=function(selection){if("User"!==selection.entityName)throw new Error("Only selection of User supported");if("ID"!==selection.type)throw new Error("Only ID selection type supported");if(!selection.ids||1!==selection.ids.length)throw new Error("Exactly one user must be selected");return selection.ids[0]},reducers={qrCode:reducer_reducer},reducers_sagas=[sagas],es=__webpack_require__(36),taggedTemplateLiteral=__webpack_require__(22),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),src=__webpack_require__(5),styled_components_browser_esm=__webpack_require__(6),index_es=__webpack_require__(13),appendField=(__webpack_require__(25),__webpack_require__(54),__webpack_require__(146),function(data,fieldName,outputPrefix,output){var handler=4<arguments.length&&void 0!==arguments[4]?arguments[4]:function(fieldData){return fieldData};return data[fieldName]&&0<data[fieldName].length&&(output+="".concat(outputPrefix,":").concat(handler(data[fieldName]),";")),output});function _templateObject2(){var data=taggedTemplateLiteral_default()(["\n  margin: 0;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"]);return _templateObject2=function(){return data},data}function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  width: 148px;\n  height: 148px;\n  position: relative;\n  align-self: center;\n"]);return _templateObject=function(){return data},data}var StyledContainer=styled_components_browser_esm.default.div(_templateObject()),StyledContent=styled_components_browser_esm.default.div(_templateObject2()),UserQrCode_ref2=react_default.a.createElement(src.n,null),UserQrCode_ref3=react_default.a.createElement(src.K.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.user-qr-action.fetchFailed"})),UserQrCode=function(_ref){var content,data=_ref.data,fetchData=_ref.fetchData;if(Object(react.useEffect)((function(){fetchData()}),[]),void 0===data)content=UserQrCode_ref2;else if(null===data)content=UserQrCode_ref3;else{var string=function(data){var string="MECARD:N:".concat(data.lastname,",").concat(data.firstname,";");return string=appendField(data,"c_address","ADR",string,(function(address){return address.replace(/\s*<br\s?\/?>\s*/gi,",")})),string=appendField(data,"phone_mobile","TEL",string),string=appendField(data,"phone_company","TEL",string),string=appendField(data,"phone_private","TEL",string),string=appendField(data,"email","EMAIL",string),string=appendField(data,"email_alternative","EMAIL",string),string=appendField(data,"birthdate","BDAY",string,(function(date){return date.replace(/-/gi,"")}))}(data);content=react_default.a.createElement(src.u,{value:string})}return react_default.a.createElement(StyledContainer,null,react_default.a.createElement(StyledContent,null,content))};UserQrCode.displayName="UserQrCode",UserQrCode.__docgenInfo={description:"",methods:[],displayName:"UserQrCode",props:{data:{type:{name:"shape",value:{firstname:{name:"string",required:!0},lastname:{name:"string",required:!0},c_address:{name:"string",required:!1},phone_mobile:{name:"string",required:!1},phone_company:{name:"string",required:!1},phone_private:{name:"string",required:!1},email:{name:"string",required:!1},email_alternative:{name:"string",required:!1},birthdate:{name:"string",required:!1}}},required:!1,description:""},fetchData:{type:{name:"func"},required:!0,description:""}}};var UserQrCode_UserQrCode=UserQrCode;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/user-qr-action/src/components/UserQrCode/UserQrCode.js"]={name:"UserQrCode",docgenInfo:UserQrCode.__docgenInfo,path:"packages/user-qr-action/src/components/UserQrCode/UserQrCode.js"});var components_UserQrCode=UserQrCode_UserQrCode,mapActionCreators={fetchData:function(){return{type:"qrCode/FETCH_DATA"}}},UserQrCodeContainer=Object(root.hot)(Object(es.connect)((function(state){return{data:state.qrCode.data}}),mapActionCreators)(components_UserQrCode)),initApp=function(id,input,events,publicPath){var content=react_default.a.createElement(UserQrCodeContainer,{selection:input.selection}),store=appFactory.a.createStore(reducers,reducers_sagas,input,"user-qr-action");return appFactory.a.createApp("user-qr-action",content,store,{input:input,events:events,actions:[],publicPath:publicPath,textResourceModules:["component","common","user-qr-action"]})};appFactory.a.registerAppInRegistry("user-qr-action",initApp);var UserQrActionApp=function(props){return initApp(0,props).component};UserQrActionApp.propTypes={selection:prop_types_default.a.object};var main=Object(root.hot)(UserQrActionApp);__webpack_require__.d(__webpack_exports__,"default",(function(){return main}))}}]);
//# sourceMappingURL=actions.5a56bd7831e2fde68887.bundle.js.map