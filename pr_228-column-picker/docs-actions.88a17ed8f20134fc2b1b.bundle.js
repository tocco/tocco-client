(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{3628:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(67);var _ACTION_HANDLERS,defineProperty=__webpack_require__(4),defineProperty_default=__webpack_require__.n(defineProperty),react=__webpack_require__(0),react_default=__webpack_require__.n(react),reducer=__webpack_require__(19),src_selection=__webpack_require__(615),appFactory=__webpack_require__(62),externalEvents=__webpack_require__(58),root=__webpack_require__(89),actions_doDelete=function(){return{type:"delete/DO_DELETE"}},ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"delete/SET_DELETE_DIALOG_INFO",reducer.a.singleTransferReducer("dialogInfo")),defineProperty_default()(_ACTION_HANDLERS,"delete/SET_DELETING_IN_PROGRESS",reducer.a.singleTransferReducer("deletingInProgress")),_ACTION_HANDLERS),initialState={dialogInfo:null,deletingInProgress:!1};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/modules/delete/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/delete/src/modules/delete/reducer.js"});__webpack_require__(21),__webpack_require__(53),__webpack_require__(22),__webpack_require__(29),__webpack_require__(32),__webpack_require__(56);var toConsumableArray=__webpack_require__(26),toConsumableArray_default=__webpack_require__.n(toConsumableArray),slicedToArray=__webpack_require__(49),slicedToArray_default=__webpack_require__.n(slicedToArray),regenerator=__webpack_require__(3),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=(__webpack_require__(35),__webpack_require__(1)),rest=__webpack_require__(24),get=(__webpack_require__(162),__webpack_require__(187),__webpack_require__(617),__webpack_require__(87),__webpack_require__(23)),get_default=__webpack_require__.n(get),prop_types=__webpack_require__(11),prop_types_default=__webpack_require__.n(prop_types);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}var deleteStatus_DELETABLE="DELETABLE",deleteRequestParser=function(response,currentBuId){var entitiesToDelete=response.entitiesToDelete;return entitiesToDelete.reduce((function(acc,entityToDelete){var _objectSpread2,deletable=function(entityToDelete){return entityToDelete.rootEntity.deleteStatus===deleteStatus_DELETABLE&&!entityToDelete.affectedEntities.find((function(affectedEntity){return affectedEntity.deleteStatus!==deleteStatus_DELETABLE}))}(entityToDelete),keyAttr=deletable?"keysDeletable":"keysNotDeletable",relatedAttr=deletable?"relatedDeletable":"relatedNotDeletable";return _objectSpread(_objectSpread({},acc),{},(_objectSpread2={},defineProperty_default()(_objectSpread2,keyAttr,[].concat(toConsumableArray_default()(acc[keyAttr]),[entityToDelete.rootEntity.key])),defineProperty_default()(_objectSpread2,relatedAttr,function(relatedEntities,entityToDelete,deletable,currentBuId){return _objectSpread({},entityToDelete.affectedEntities.reduce((function(acc,affectedEntity){return _objectSpread(_objectSpread({},acc),deletable||affectedEntity.deleteStatus!==deleteStatus_DELETABLE?defineProperty_default()({},affectedEntity.entityName,_objectSpread(_objectSpread({},get_default()(acc,affectedEntity.entityName,{keys:[],keysOtherBu:[],entityLabel:affectedEntity.entityLabel})),null===affectedEntity.businessUnitId||affectedEntity.businessUnitId===currentBuId?{keys:Array.from(new Set([].concat(toConsumableArray_default()(get_default()(acc,[affectedEntity.entityName,"keys"],[])),[affectedEntity.key])))}:{keysOtherBu:Array.from(new Set([].concat(toConsumableArray_default()(get_default()(acc,[affectedEntity.entityName,"keysOtherBu"],[])),[affectedEntity.key])))})):{})}),_objectSpread({},relatedEntities)))}(acc[relatedAttr],entityToDelete,deletable,currentBuId)),_objectSpread2))}),{entityName:get_default()(entitiesToDelete,"[0].rootEntity.entityName"),entityLabel:get_default()(entitiesToDelete,"[0].rootEntity.entityLabel"),keysDeletable:[],keysNotDeletable:[],relatedDeletable:{},relatedNotDeletable:{},hasUnreadableEntities:!!entitiesToDelete.find((function(e){return e.unreadableEntities}))})},relatedPropType=prop_types_default.a.shape({entityLabel:prop_types_default.a.string,keys:prop_types_default.a.arrayOf(prop_types_default.a.string),keysOtherBu:prop_types_default.a.arrayOf(prop_types_default.a.string)}),_marked=(prop_types_default.a.shape({entityName:prop_types_default.a.string.isRequired,entityLabel:prop_types_default.a.string.isRequired,keysDeletable:prop_types_default.a.arrayOf(prop_types_default.a.string).isRequired,keysNotDeletable:prop_types_default.a.arrayOf(prop_types_default.a.string).isRequired,relatedDeletable:prop_types_default.a.objectOf(relatedPropType).isRequired,relatedNotDeletable:prop_types_default.a.objectOf(relatedPropType).isRequired,hasUnreadableEntities:prop_types_default.a.bool}),regenerator_default.a.mark(getDeleteBodyFromSelection)),_marked2=regenerator_default.a.mark(sagas_loadDialogInfo),_marked3=regenerator_default.a.mark(sagas_doDelete),_marked4=regenerator_default.a.mark(sagas_onCancel),_marked5=regenerator_default.a.mark(mainSagas),inputSelector=function(state){return state.input},textResourceSelector=function(state){return state.intl.messages},dialogInfoSelector=function(state){return state.del.dialogInfo};function getDeleteBodyFromSelection(){var _yield$select,selection,entities;return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(inputSelector);case 2:return _yield$select=_context.sent,selection=_yield$select.selection,_context.next=6,Object(redux_saga_effects_npm_proxy_esm.b)(src_selection.a.getEntities,selection,rest.a.fetchEntities);case 6:return entities=_context.sent,_context.abrupt("return",{entityModel:entities.entityName,keys:entities.keys});case 8:case"end":return _context.stop()}}),_marked)}function sagas_loadDialogInfo(){var body,_yield$all,_yield$all2,deleteResponse,principal,res;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(redux_saga_effects_npm_proxy_esm.b)(getDeleteBodyFromSelection);case 2:return body=_context2.sent,_context2.next=5,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,"client/delete/dialog",{method:"POST",body:body}),Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.fetchPrincipal)]);case 5:return _yield$all=_context2.sent,_yield$all2=slicedToArray_default()(_yield$all,2),deleteResponse=_yield$all2[0],principal=_yield$all2[1],res=deleteRequestParser(deleteResponse.body,principal.currentBusinessUnit.id),_context2.next=12,Object(redux_saga_effects_npm_proxy_esm.e)({type:"delete/SET_DELETE_DIALOG_INFO",payload:{dialogInfo:res}});case 12:case"end":return _context2.stop()}}),_marked2)}function sagas_doDelete(){var _yield$select2,keysDeletable,entityName,body,response,textResources,_body,entities,remoteEvents;return regenerator_default.a.wrap((function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return _context3.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(dialogInfoSelector);case 2:return _yield$select2=_context3.sent,keysDeletable=_yield$select2.keysDeletable,entityName=_yield$select2.entityName,_context3.next=7,Object(redux_saga_effects_npm_proxy_esm.e)({type:"delete/SET_DELETING_IN_PROGRESS",payload:{deletingInProgress:!0}});case 7:return body={entityModel:entityName,keys:keysDeletable},_context3.next=10,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,"client/delete",{method:"POST",body:body});case 10:return response=_context3.sent,_context3.next=13,Object(redux_saga_effects_npm_proxy_esm.f)(textResourceSelector);case 13:if(textResources=_context3.sent,!response.ok){_context3.next=22;break}return _body=response.body,entities=Object.keys(_body.deletedEntities).reduce((function(acc,entityName){return[].concat(toConsumableArray_default()(acc),toConsumableArray_default()(_body.deletedEntities[entityName].map((function(key){return{entityName:entityName,key:key}}))))}),[]),remoteEvents=[{type:"entity-delete-event",payload:{entities:entities}}],_context3.next=20,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onSuccess",{message:textResources["client.delete.successfullyMessage"],remoteEvents:remoteEvents}));case 20:_context3.next=24;break;case 22:return _context3.next=24,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onError",{message:textResources["client.delete.errorMessage"]}));case 24:case"end":return _context3.stop()}}),_marked3)}function sagas_onCancel(){return regenerator_default.a.wrap((function(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return _context4.next=2,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onCancel"));case 2:case"end":return _context4.stop()}}),_marked4)}function mainSagas(){return regenerator_default.a.wrap((function(_context5){for(;;)switch(_context5.prev=_context5.next){case 0:return _context5.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.j)("root/LOAD_DIALOG_INFO",sagas_loadDialogInfo),Object(redux_saga_effects_npm_proxy_esm.j)("delete/DO_DELETE",sagas_doDelete),Object(redux_saga_effects_npm_proxy_esm.j)("delete/ON_CANCEL",sagas_onCancel)]);case 2:case"end":return _context5.stop()}}),_marked5)}var reducers={del:reducer_reducer},sagas=[mainSagas],es=__webpack_require__(25),index_es=__webpack_require__(13),src=__webpack_require__(6),taggedTemplateLiteral=(__webpack_require__(1069),__webpack_require__(128),__webpack_require__(17)),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_components_browser_esm=__webpack_require__(7),_ref2=react_default.a.createElement(src.L.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.tooManyRecords"})),LinkPopOver=function(_ref){var relatedEntity=_ref.relatedEntity,children=_ref.children,maxCountLink=_ref.maxCountLink;if(relatedEntity.keys.length<maxCountLink&&0===relatedEntity.keysOtherBu.length)return children;var content=react_default.a.createElement(react_default.a.Fragment,null,relatedEntity.keys.length>maxCountLink&&_ref2,0<relatedEntity.keysOtherBu.length&&react_default.a.createElement(src.L.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.recordInOtherBU",values:{count:relatedEntity.keysOtherBu.length}})));return react_default.a.createElement(src.t,{content:content,placement:"top",spacer:10},children)};LinkPopOver.displayName="LinkPopOver",LinkPopOver.__docgenInfo={description:"",methods:[],displayName:"LinkPopOver",props:{relatedEntity:{type:{name:"custom",raw:"relatedPropType.isRequired"},required:!1,description:""},maxCountLink:{type:{name:"number"},required:!0,description:""},children:{type:{name:"element"},required:!1,description:""}}};var InfoPart_LinkPopOver=LinkPopOver;function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  white-space: nowrap;\n"]);return _templateObject=function(){return data},data}"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/InfoPart/LinkPopOver.js"]={name:"LinkPopOver",docgenInfo:LinkPopOver.__docgenInfo,path:"packages/delete/src/components/InfoPart/LinkPopOver.js"});var NonBreakingText=styled_components_browser_esm.default.span(_templateObject()),InfoPart_ref2=react_default.a.createElement("span",null," / "),InfoPart=function(_ref){var entityName=_ref.entityName,entityLabel=_ref.entityLabel,keys=_ref.keys,relatedEntities=_ref.relatedEntities,maxCountLink=_ref.maxCountLink,navigationStrategy=_ref.navigationStrategy;return react_default.a.createElement(src.L.Span,null,react_default.a.createElement(src.L.B,null,entityLabel," (",0<keys.length&&navigationStrategy.ListLink?react_default.a.createElement(navigationStrategy.ListLink,{entityName:entityName,entityKeys:keys},keys.length):react_default.a.createElement(src.L.Span,null,keys.length),")"),0<Object.keys(relatedEntities).length&&react_default.a.createElement(react_default.a.Fragment,null,InfoPart_ref2,Object.keys(relatedEntities).map((function(entityName){var relatedEntity=relatedEntities[entityName],linkText=[].concat(toConsumableArray_default()(relatedEntity.keys),toConsumableArray_default()(relatedEntity.keysOtherBu)).length,Count=0<relatedEntity.keys.length&&navigationStrategy.ListLink?react_default.a.createElement(navigationStrategy.ListLink,{entityName:entityName,keys:relatedEntity.keys.slice(0,maxCountLink)},linkText):react_default.a.createElement(src.L.Span,null,linkText),Content=react_default.a.createElement(InfoPart_LinkPopOver,{relatedEntity:relatedEntity,maxCountLink:maxCountLink},Count);return react_default.a.createElement(react_default.a.Fragment,{key:"entity-info-"+entityName},react_default.a.createElement(NonBreakingText,null,relatedEntity.entityLabel," (",Content,")"))})).reduce((function(prev,curr){return[prev,", ",curr]}))))};InfoPart.displayName="InfoPart",InfoPart.__docgenInfo={description:"",methods:[],displayName:"InfoPart",props:{entityName:{type:{name:"string"},required:!0,description:""},entityLabel:{type:{name:"string"},required:!0,description:""},keys:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},relatedEntities:{type:{name:"objectOf",value:{name:"custom",raw:"relatedPropType"}},required:!0,description:""},maxCountLink:{type:{name:"number"},required:!1,description:""},navigationStrategy:{type:{name:"custom",raw:"navigationStrategy.propTypes"},required:!1,description:""}}};var InfoPart_InfoPart=InfoPart;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/InfoPart/InfoPart.js"]={name:"InfoPart",docgenInfo:InfoPart.__docgenInfo,path:"packages/delete/src/components/InfoPart/InfoPart.js"});var Dialog_ref2=react_default.a.createElement(src.L.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.confirmText"})),_ref3=react_default.a.createElement(src.L.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.textNotDeletable"})),_ref4=react_default.a.createElement(src.y,{condition:"warning"},react_default.a.createElement(src.L.Span,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.unreadableEntities"}))),_ref5=react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.deleteButton"}),_ref6=react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.cancelButton"}),Dialog=function(_ref){var dialogInfo=_ref.dialogInfo,doDelete=_ref.doDelete,onCancel=_ref.onCancel,navigationStrategy=_ref.navigationStrategy;return react_default.a.createElement(react_default.a.Fragment,null,Dialog_ref2,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-deletable",entityName:dialogInfo.entityName,entityLabel:dialogInfo.entityLabel,keys:dialogInfo.keysDeletable,relatedEntities:dialogInfo.relatedDeletable,maxCountLink:100,navigationStrategy:navigationStrategy}),0<dialogInfo.keysNotDeletable.length&&react_default.a.createElement("div",{style:{paddingTop:"20px"}},_ref3,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-notdeletable",entityName:dialogInfo.entityName,entityLabel:dialogInfo.entityLabel,keys:dialogInfo.keysNotDeletable,relatedEntities:dialogInfo.relatedNotDeletable,maxCountLink:100,navigationStrategy:navigationStrategy})),dialogInfo.hasUnreadableEntities&&react_default.a.createElement("div",{style:{paddingTop:"20px"}},_ref4),react_default.a.createElement("div",{style:{paddingTop:"20px"}},react_default.a.createElement(src.d,{onClick:doDelete,disabled:0===dialogInfo.keysDeletable.length},_ref5),react_default.a.createElement(src.d,{ink:"primary",onClick:onCancel},_ref6)))};Dialog.__docgenInfo={description:"",methods:[],displayName:"Dialog",props:{onCancel:{type:{name:"func"},required:!0,description:""},doDelete:{type:{name:"func"},required:!0,description:""},dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType.isRequired"},required:!1,description:""},navigationStrategy:{type:{name:"custom",raw:"navigationStrategy.propTypes"},required:!1,description:""}}};var Dialog_Dialog=Dialog;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/Dialog/Dialog.js"]={name:"Dialog",docgenInfo:Dialog.__docgenInfo,path:"packages/delete/src/components/Dialog/Dialog.js"});var mapActionCreators={doDelete:actions_doDelete,onCancel:function(){return{type:"delete/ON_CANCEL"}}},DialogContainer=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo,navigationStrategy:state.input.navigationStrategy}}),mapActionCreators)(Object(index_es.injectIntl)(Dialog_Dialog)),DeleteProgress_ref2=react_default.a.createElement(src.n,{size:"30px"}),DeleteProgress_ref3=react_default.a.createElement(src.L.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.deleteInProgress"})),DeleteProgress=function(_ref){var dialogInfo=_ref.dialogInfo,navigationStrategy=_ref.navigationStrategy;return react_default.a.createElement(react_default.a.Fragment,null,DeleteProgress_ref2,DeleteProgress_ref3,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-deletable",entityName:dialogInfo.entityName,entityLabel:dialogInfo.entityLabel,keys:dialogInfo.keysDeletable,relatedEntities:dialogInfo.relatedDeletable,maxCountLink:100,navigationStrategy:navigationStrategy}))};DeleteProgress.__docgenInfo={description:"",methods:[],displayName:"DeleteProgress",props:{dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType.isRequired"},required:!1,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""},navigationStrategy:{type:{name:"custom",raw:"navigationStrategy.propTypes"},required:!1,description:""}}};var DeleteProgress_DeleteProgress=DeleteProgress;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/DeleteProgress/DeleteProgress.js"]={name:"DeleteProgress",docgenInfo:DeleteProgress.__docgenInfo,path:"packages/delete/src/components/DeleteProgress/DeleteProgress.js"});var DeleteProgressContainer_mapActionCreators={doDelete:actions_doDelete},components_DeleteProgress=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo,navigationStrategy:state.input.navigationStrategy}}),DeleteProgressContainer_mapActionCreators)(Object(index_es.injectIntl)(DeleteProgress_DeleteProgress)),Delete_ref2=react_default.a.createElement(components_DeleteProgress,null),Delete_ref3=react_default.a.createElement(DialogContainer,null),Delete=function(_ref){var loadDialogInfo=_ref.loadDialogInfo,dialogInfo=_ref.dialogInfo,deletingInProgress=_ref.deletingInProgress,intl=_ref.intl;return Object(react.useEffect)((function(){loadDialogInfo()}),[]),deletingInProgress?Delete_ref2:react_default.a.createElement(src.m,{required:[dialogInfo],loadingText:function msg(id){return intl.formatMessage({id:id})}("client.delete.loadingText")},dialogInfo&&Delete_ref3)};Delete.displayName="Delete",Delete.__docgenInfo={description:"",methods:[],displayName:"Delete",props:{loadDialogInfo:{type:{name:"func"},required:!0,description:""},dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType"},required:!1,description:""},deletingInProgress:{type:{name:"bool"},required:!1,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""}}};var Delete_Delete=Delete;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/Delete/Delete.js"]={name:"Delete",docgenInfo:Delete.__docgenInfo,path:"packages/delete/src/components/Delete/Delete.js"});var DeleteContainer_mapActionCreators={loadDialogInfo:function(){return{type:"root/LOAD_DIALOG_INFO"}}},components_Delete=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo,deletingInProgress:state.del.deletingInProgress}}),DeleteContainer_mapActionCreators)(Object(index_es.injectIntl)(Delete_Delete));function main_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function main_objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?main_ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):main_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}var EXTERNAL_EVENTS=["onSuccess","onCancel","onError"],main_ref=react_default.a.createElement(components_Delete,null),initApp=function(id,input,events,publicPath){var store=appFactory.a.createStore(reducers,sagas,input,"delete");return externalEvents.a.addToStore(store,events),appFactory.a.createApp("delete",main_ref,store,{input:input,events:events,actions:[],publicPath:publicPath,textResourceModules:["component","common","delete"]})};appFactory.a.registerAppInRegistry("delete",initApp);var DeleteApp=function(props){var events=EXTERNAL_EVENTS.reduce((function(acc,event){return main_objectSpread(main_objectSpread({},acc),props[event]?defineProperty_default()({},event,props[event]):{})}),{});return initApp(0,props,events).component};DeleteApp.propTypes={selection:src_selection.a.propType.isRequired};__webpack_exports__.a=Object(root.hot)(DeleteApp)},3701:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(1068),__webpack_require__(3633)),react_intl__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(13),_utils_getNode__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(3638),CreateFolder=function(_ref){var context=_ref.context,onSuccess=_ref.onSuccess,intl=_ref.intl,parent=Object(_utils_getNode__WEBPACK_IMPORTED_MODULE_4__.a)(context.history.location.pathname),defaultValues=parent?[{id:"rel".concat(parent.model),value:parent.key}]:[];return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__.a,{entityName:"Folder",formName:"Folder",mode:"create",defaultValues:defaultValues,onEntityCreated:function handleEntityCreated(_ref2){var id=_ref2.id,remoteEvents=[{type:"entity-create-event",payload:{entities:[{entityName:"Docs_list_item",key:"Folder/".concat(id)}]}}];onSuccess({message:intl.formatMessage({id:"client.admin.docs.createFolderSuccessful"}),remoteEvents:remoteEvents})}})};CreateFolder.displayName="CreateFolder",CreateFolder.__docgenInfo={description:"",methods:[],displayName:"CreateFolder",props:{context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_3__.injectIntl)(CreateFolder),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/components/Action/actions/CreateFolder.js"]={name:"CreateFolder",docgenInfo:CreateFolder.__docgenInfo,path:"packages/admin/src/routes/docs/components/Action/actions/CreateFolder.js"})},3702:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3628);__webpack_require__.d(__webpack_exports__,"default",(function(){return tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_0__.a}))}}]);
//# sourceMappingURL=docs-actions.88a17ed8f20134fc2b1b.bundle.js.map