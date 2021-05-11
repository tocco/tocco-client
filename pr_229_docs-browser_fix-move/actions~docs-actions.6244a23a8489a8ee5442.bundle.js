(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{3674:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(66);var _ACTION_HANDLERS,defineProperty=__webpack_require__(5),defineProperty_default=__webpack_require__.n(defineProperty),react=__webpack_require__(0),react_default=__webpack_require__.n(react),prop_types=__webpack_require__(11),prop_types_default=__webpack_require__.n(prop_types),reducer=__webpack_require__(18),src_selection=__webpack_require__(634),appFactory=__webpack_require__(59),externalEvents=__webpack_require__(58),setDeleteDialogInfo=function(dialogInfo){return{type:"delete/SET_DELETE_DIALOG_INFO",payload:{dialogInfo:dialogInfo}}},actions_doDelete=function(){return{type:"delete/DO_DELETE"}},setEntitiesToDelete=function(entitiesToDelete){return{type:"delete/SET_ENTITIES_TO_DELETE",payload:{entitiesToDelete:entitiesToDelete}}},ACTION_HANDLERS=(_ACTION_HANDLERS={},defineProperty_default()(_ACTION_HANDLERS,"delete/SET_DELETE_DIALOG_INFO",reducer.a.singleTransferReducer("dialogInfo")),defineProperty_default()(_ACTION_HANDLERS,"delete/SET_ENTITIES_TO_DELETE",reducer.a.singleTransferReducer("entitiesToDelete")),defineProperty_default()(_ACTION_HANDLERS,"delete/SET_DELETING_IN_PROGRESS",reducer.a.singleTransferReducer("deletingInProgress")),_ACTION_HANDLERS),initialState={dialogInfo:null,entitiesToDelete:null,deletingInProgress:!1};function reducer_reducer(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:initialState,action=1<arguments.length?arguments[1]:void 0,handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state}reducer_reducer.__docgenInfo={description:"",methods:[],displayName:"reducer"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/modules/delete/reducer.js"]={name:"reducer",docgenInfo:reducer_reducer.__docgenInfo,path:"packages/delete/src/modules/delete/reducer.js"});__webpack_require__(21),__webpack_require__(50),__webpack_require__(22),__webpack_require__(29),__webpack_require__(30),__webpack_require__(55);var toConsumableArray=__webpack_require__(26),toConsumableArray_default=__webpack_require__.n(toConsumableArray),slicedToArray=__webpack_require__(48),slicedToArray_default=__webpack_require__.n(slicedToArray),regenerator=__webpack_require__(3),regenerator_default=__webpack_require__.n(regenerator),redux_saga_effects_npm_proxy_esm=(__webpack_require__(36),__webpack_require__(1)),rest=__webpack_require__(23),get=(__webpack_require__(157),__webpack_require__(181),__webpack_require__(93),__webpack_require__(49),__webpack_require__(638),__webpack_require__(113),__webpack_require__(81),__webpack_require__(130),__webpack_require__(24)),get_default=__webpack_require__.n(get);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}var deleteStatus_DELETABLE="DELETABLE",transformRootEntity=function(rootEntities,entity){var applyKeys=!(2<arguments.length&&void 0!==arguments[2])||arguments[2],_entity$rootEntity=entity.rootEntity,entityName=_entity$rootEntity.entityName,entityLabel=_entity$rootEntity.entityLabel,key=_entity$rootEntity.key;if(key.includes("/")){var _key$split=key.split("/"),_key$split2=slicedToArray_default()(_key$split,2),entityNameReal=_key$split2[0],keyReal=_key$split2[1];return _objectSpread(_objectSpread({},rootEntities),{},defineProperty_default()({},entityNameReal,{entityLabel:entityLabel,keys:[].concat(toConsumableArray_default()(get_default()(rootEntities,[entityNameReal,"keys"],[])),toConsumableArray_default()(applyKeys?[keyReal]:[]))}))}return _objectSpread(_objectSpread({},rootEntities),{},defineProperty_default()({},entityName,{entityLabel:entityLabel,keys:[].concat(toConsumableArray_default()(get_default()(rootEntities,[entityName,"keys"],[])),toConsumableArray_default()(applyKeys?[key]:[]))}))},isEntityDeletable=function(entityToDelete){return entityToDelete.rootEntity.deleteStatus===deleteStatus_DELETABLE&&!entityToDelete.affectedEntities.find((function(affectedEntity){return affectedEntity.deleteStatus!==deleteStatus_DELETABLE}))},getDialogInfo=function(response,currentBuId){var entitiesToDelete=response.entitiesToDelete;return entitiesToDelete.reduce((function(acc,entityToDelete){var deletable=isEntityDeletable(entityToDelete),relatedAttr=deletable?"relatedDeletable":"relatedNotDeletable";return _objectSpread(_objectSpread(_objectSpread({},acc),{},{rootEntitiesDeletable:transformRootEntity(acc.rootEntitiesDeletable,entityToDelete,deletable)},!deletable&&{rootEntitiesNotDeletable:transformRootEntity(acc.rootEntitiesNotDeletable,entityToDelete)}),{},defineProperty_default()({},relatedAttr,function(relatedEntities,entityToDelete,deletable,currentBuId){return _objectSpread({},entityToDelete.affectedEntities.reduce((function(acc,affectedEntity){return _objectSpread(_objectSpread({},acc),deletable||affectedEntity.deleteStatus!==deleteStatus_DELETABLE?defineProperty_default()({},affectedEntity.entityName,_objectSpread(_objectSpread({},get_default()(acc,affectedEntity.entityName,{keys:[],keysOtherBu:[],entityLabel:affectedEntity.entityLabel})),null===affectedEntity.businessUnitId||affectedEntity.businessUnitId===currentBuId?{keys:Array.from(new Set([].concat(toConsumableArray_default()(get_default()(acc,[affectedEntity.entityName,"keys"],[])),[affectedEntity.key])))}:{keysOtherBu:Array.from(new Set([].concat(toConsumableArray_default()(get_default()(acc,[affectedEntity.entityName,"keysOtherBu"],[])),[affectedEntity.key])))})):{})}),_objectSpread({},relatedEntities)))}(acc[relatedAttr],entityToDelete,deletable,currentBuId)))}),{rootEntitiesDeletable:{},rootEntitiesNotDeletable:{},relatedDeletable:{},relatedNotDeletable:{},hasUnreadableEntities:!!entitiesToDelete.find((function(e){return e.unreadableEntities}))})},getEntitiesToDelete=function(_ref2){var entitiesToDelete=_ref2.entitiesToDelete;return{entityName:get_default()(entitiesToDelete,"[0].rootEntity.entityName"),keys:entitiesToDelete.reduce((function(acc,entityToDelete){return[].concat(toConsumableArray_default()(acc),toConsumableArray_default()(isEntityDeletable(entityToDelete)?[entityToDelete.rootEntity.key]:[]))}),[])}},deleteEntityPropType=prop_types_default.a.shape({entityLabel:prop_types_default.a.string,keys:prop_types_default.a.arrayOf(prop_types_default.a.string),keysOtherBu:prop_types_default.a.arrayOf(prop_types_default.a.string)}),_marked=(prop_types_default.a.shape({rootEntitiesDeletable:prop_types_default.a.objectOf(deleteEntityPropType).isRequired,rootEntitiesNotDeletable:prop_types_default.a.objectOf(deleteEntityPropType).isRequired,relatedDeletable:prop_types_default.a.objectOf(deleteEntityPropType).isRequired,relatedNotDeletable:prop_types_default.a.objectOf(deleteEntityPropType).isRequired,hasUnreadableEntities:prop_types_default.a.bool}),regenerator_default.a.mark(getDeleteBodyFromSelection)),_marked2=regenerator_default.a.mark(getDeleteEndpoint),_marked3=regenerator_default.a.mark(sagas_loadDialogInfo),_marked4=regenerator_default.a.mark(sagas_doDelete),_marked5=regenerator_default.a.mark(sagas_onCancel),_marked6=regenerator_default.a.mark(mainSagas),inputSelector=function(state){return state.input},textResourceSelector=function(state){return state.intl.messages},entitiesToDeleteSelector=function(state){return state.del.entitiesToDelete};function getDeleteBodyFromSelection(){var _yield$select,selection,entities;return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(inputSelector);case 2:return _yield$select=_context.sent,selection=_yield$select.selection,_context.next=6,Object(redux_saga_effects_npm_proxy_esm.b)(src_selection.a.getEntities,selection,rest.a.fetchEntities);case 6:return entities=_context.sent,_context.abrupt("return",{entityModel:entities.entityName,keys:entities.keys});case 8:case"end":return _context.stop()}}),_marked)}function getDeleteEndpoint(){var _yield$select2,customDeleteEndpoint;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(inputSelector);case 2:return _yield$select2=_context2.sent,customDeleteEndpoint=_yield$select2.customDeleteEndpoint,_context2.abrupt("return",customDeleteEndpoint||"client/delete");case 5:case"end":return _context2.stop()}}),_marked2)}function sagas_loadDialogInfo(){var body,deleteEndpoint,_yield$all,_yield$all2,deleteResponse,principal,dialogInfo,entitiesToDelete;return regenerator_default.a.wrap((function(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:return _context3.next=2,Object(redux_saga_effects_npm_proxy_esm.b)(getDeleteBodyFromSelection);case 2:return body=_context3.sent,_context3.next=5,Object(redux_saga_effects_npm_proxy_esm.b)(getDeleteEndpoint);case 5:return deleteEndpoint=_context3.sent,_context3.next=8,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,"".concat(deleteEndpoint,"/dialog"),{method:"POST",body:body}),Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.fetchPrincipal)]);case 8:return _yield$all=_context3.sent,_yield$all2=slicedToArray_default()(_yield$all,2),deleteResponse=_yield$all2[0],principal=_yield$all2[1],_context3.next=14,Object(redux_saga_effects_npm_proxy_esm.b)(getDialogInfo,deleteResponse.body,principal.currentBusinessUnit.id);case 14:return dialogInfo=_context3.sent,_context3.next=17,Object(redux_saga_effects_npm_proxy_esm.e)(setDeleteDialogInfo(dialogInfo));case 17:return _context3.next=19,Object(redux_saga_effects_npm_proxy_esm.b)(getEntitiesToDelete,deleteResponse.body);case 19:return entitiesToDelete=_context3.sent,_context3.next=22,Object(redux_saga_effects_npm_proxy_esm.e)(setEntitiesToDelete(entitiesToDelete));case 22:case"end":return _context3.stop()}}),_marked3)}function sagas_doDelete(){var entitiesToDelete,body,deleteEndpoint,response,textResources,_body,entities,remoteEvents;return regenerator_default.a.wrap((function(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:return _context4.next=2,Object(redux_saga_effects_npm_proxy_esm.f)(entitiesToDeleteSelector);case 2:return entitiesToDelete=_context4.sent,_context4.next=5,Object(redux_saga_effects_npm_proxy_esm.e)({type:"delete/SET_DELETING_IN_PROGRESS",payload:{deletingInProgress:!0}});case 5:return body={entityModel:entitiesToDelete.entityName,keys:entitiesToDelete.keys},_context4.next=8,Object(redux_saga_effects_npm_proxy_esm.b)(getDeleteEndpoint);case 8:return deleteEndpoint=_context4.sent,_context4.next=11,Object(redux_saga_effects_npm_proxy_esm.b)(rest.a.requestSaga,deleteEndpoint,{method:"POST",body:body,acceptedStatusCodes:[409]});case 11:return response=_context4.sent,_context4.next=14,Object(redux_saga_effects_npm_proxy_esm.f)(textResourceSelector);case 14:if(textResources=_context4.sent,!response.ok){_context4.next=23;break}return _body=response.body,entities=Object.keys(_body.deletedEntities).reduce((function(acc,entityName){return[].concat(toConsumableArray_default()(acc),toConsumableArray_default()(_body.deletedEntities[entityName].map((function(key){return{entityName:entityName,key:key}}))))}),[]),remoteEvents=[{type:"entity-delete-event",payload:{entities:entities}}],_context4.next=21,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onSuccess",{message:textResources["client.delete.successfullyMessage"],remoteEvents:remoteEvents}));case 21:_context4.next=30;break;case 23:if(409!==response.status||!response.body.information){_context4.next=28;break}return _context4.next=26,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onError",{message:response.body.information}));case 26:_context4.next=30;break;case 28:return _context4.next=30,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onError",{message:textResources["client.delete.errorMessage"]}));case 30:case"end":return _context4.stop()}}),_marked4)}function sagas_onCancel(){return regenerator_default.a.wrap((function(_context5){for(;;)switch(_context5.prev=_context5.next){case 0:return _context5.next=2,Object(redux_saga_effects_npm_proxy_esm.e)(externalEvents.a.fireExternalEvent("onCancel"));case 2:case"end":return _context5.stop()}}),_marked5)}function mainSagas(){return regenerator_default.a.wrap((function(_context6){for(;;)switch(_context6.prev=_context6.next){case 0:return _context6.next=2,Object(redux_saga_effects_npm_proxy_esm.a)([Object(redux_saga_effects_npm_proxy_esm.j)("root/LOAD_DIALOG_INFO",sagas_loadDialogInfo),Object(redux_saga_effects_npm_proxy_esm.j)("delete/DO_DELETE",sagas_doDelete),Object(redux_saga_effects_npm_proxy_esm.j)("delete/ON_CANCEL",sagas_onCancel)]);case 2:case"end":return _context6.stop()}}),_marked6)}var reducers={del:reducer_reducer},sagas=[mainSagas],es=__webpack_require__(25),index_es=__webpack_require__(12),src=__webpack_require__(6),taggedTemplateLiteral=(__webpack_require__(1103),__webpack_require__(126),__webpack_require__(158),__webpack_require__(17)),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_components_browser_esm=__webpack_require__(7),LinkPopOver_ref2=react_default.a.createElement(src.N.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.tooManyRecords"})),LinkPopOver=function(_ref){var relatedEntity=_ref.relatedEntity,children=_ref.children,maxCountLink=_ref.maxCountLink;if(relatedEntity.keys.length<maxCountLink&&0===relatedEntity.keysOtherBu.length)return children;var content=react_default.a.createElement(react_default.a.Fragment,null,relatedEntity.keys.length>maxCountLink&&LinkPopOver_ref2,0<relatedEntity.keysOtherBu.length&&react_default.a.createElement(src.N.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.recordInOtherBU",values:{count:relatedEntity.keysOtherBu.length}})));return react_default.a.createElement(src.v,{content:content,placement:"top"},children)};LinkPopOver.displayName="LinkPopOver",LinkPopOver.__docgenInfo={description:"",methods:[],displayName:"LinkPopOver",props:{relatedEntity:{type:{name:"custom",raw:"deleteEntityPropType.isRequired"},required:!1,description:""},maxCountLink:{type:{name:"number"},required:!0,description:""},children:{type:{name:"element"},required:!1,description:""}}};var InfoPart_LinkPopOver=LinkPopOver;function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  white-space: nowrap;\n"]);return _templateObject=function(){return data},data}"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/InfoPart/LinkPopOver.js"]={name:"LinkPopOver",docgenInfo:LinkPopOver.__docgenInfo,path:"packages/delete/src/components/InfoPart/LinkPopOver.js"});var NonBreakingText=styled_components_browser_esm.default.span(_templateObject()),_ref4=react_default.a.createElement("span",null," / "),InfoPart=function(_ref){var rootEntities=_ref.rootEntities,relatedEntities=_ref.relatedEntities,maxCountLink=_ref.maxCountLink,navigationStrategy=_ref.navigationStrategy;return react_default.a.createElement(src.N.Span,null,react_default.a.createElement(src.N.B,null,Object.entries(rootEntities).map((function(_ref2){var _ref3=slicedToArray_default()(_ref2,2),rootEntityName=_ref3[0],rootEntity=_ref3[1];return react_default.a.createElement("span",{key:"root-entity-".concat(rootEntityName)},rootEntity.entityLabel," (",0<rootEntity.keys.length&&navigationStrategy.ListLink?react_default.a.createElement(navigationStrategy.ListLink,{entityName:rootEntityName,entityKeys:rootEntity.keys},rootEntity.keys.length):react_default.a.createElement(src.N.Span,null,rootEntity.keys.length),")")})).reduce((function(prev,curr){return[prev,", ",curr]}))),0<Object.keys(relatedEntities).length&&react_default.a.createElement(react_default.a.Fragment,null,_ref4,Object.keys(relatedEntities).map((function(entityName){var relatedEntity=relatedEntities[entityName],linkText=[].concat(toConsumableArray_default()(relatedEntity.keys),toConsumableArray_default()(relatedEntity.keysOtherBu)).length,Count=0<relatedEntity.keys.length&&navigationStrategy.ListLink?react_default.a.createElement(navigationStrategy.ListLink,{entityName:entityName,entityKeys:relatedEntity.keys.slice(0,maxCountLink)},linkText):react_default.a.createElement(src.N.Span,null,linkText),Content=react_default.a.createElement(InfoPart_LinkPopOver,{relatedEntity:relatedEntity,maxCountLink:maxCountLink},Count);return react_default.a.createElement(react_default.a.Fragment,{key:"entity-info-"+entityName},react_default.a.createElement(NonBreakingText,null,relatedEntity.entityLabel," (",Content,")"))})).reduce((function(prev,curr){return[prev,", ",curr]}))))};InfoPart.displayName="InfoPart",InfoPart.__docgenInfo={description:"",methods:[],displayName:"InfoPart",props:{rootEntities:{type:{name:"objectOf",value:{name:"shape",value:{entityLabel:{name:"string",required:!0},keys:{name:"arrayOf",value:{name:"string"},required:!0}}}},required:!0,description:""},relatedEntities:{type:{name:"objectOf",value:{name:"custom",raw:"deleteEntityPropType"}},required:!0,description:""},maxCountLink:{type:{name:"number"},required:!1,description:""},navigationStrategy:{type:{name:"custom",raw:"navigationStrategy.propTypes"},required:!1,description:""}}};var InfoPart_InfoPart=InfoPart;function _templateObject2(){var data=taggedTemplateLiteral_default()(["\n  display: flex;\n  justify-content: flex-end;\n\n  "," {\n    margin-right: 0;\n  }\n"]);return _templateObject2=function(){return data},data}function StyledComponents_templateObject(){var data=taggedTemplateLiteral_default()(["\n  padding-top: ",";\n"]);return StyledComponents_templateObject=function(){return data},data}"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/InfoPart/InfoPart.js"]={name:"InfoPart",docgenInfo:InfoPart.__docgenInfo,path:"packages/delete/src/components/InfoPart/InfoPart.js"});var StyledSectionWrapper=styled_components_browser_esm.default.div(StyledComponents_templateObject(),src.Q.space(.6)),StyledButtonsWrapper=styled_components_browser_esm.default.div(_templateObject2(),src.E),Dialog_ref2=react_default.a.createElement(src.N.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.confirmText"})),Dialog_ref3=react_default.a.createElement(src.N.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.textNotDeletable"})),Dialog_ref4=react_default.a.createElement(StyledSectionWrapper,null,react_default.a.createElement(src.A,{condition:"warning"},react_default.a.createElement(src.N.Span,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.unreadableEntities"})))),_ref5=react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.deleteButton"}),_ref6=react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.cancelButton"}),Dialog=function(_ref){var _ref$dialogInfo=_ref.dialogInfo,rootEntitiesDeletable=_ref$dialogInfo.rootEntitiesDeletable,rootEntitiesNotDeletable=_ref$dialogInfo.rootEntitiesNotDeletable,relatedDeletable=_ref$dialogInfo.relatedDeletable,relatedNotDeletable=_ref$dialogInfo.relatedNotDeletable,hasUnreadableEntities=_ref$dialogInfo.hasUnreadableEntities,doDelete=_ref.doDelete,onCancel=_ref.onCancel,navigationStrategy=_ref.navigationStrategy;return react_default.a.createElement(react_default.a.Fragment,null,Dialog_ref2,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-deletable",rootEntities:rootEntitiesDeletable,relatedEntities:relatedDeletable,maxCountLink:100,navigationStrategy:navigationStrategy}),0<Object.keys(rootEntitiesNotDeletable).length&&react_default.a.createElement(StyledSectionWrapper,null,Dialog_ref3,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-notdeletable",rootEntities:rootEntitiesNotDeletable,relatedEntities:relatedNotDeletable,maxCountLink:100,navigationStrategy:navigationStrategy})),hasUnreadableEntities&&Dialog_ref4,react_default.a.createElement(StyledSectionWrapper,null,react_default.a.createElement(StyledButtonsWrapper,null,react_default.a.createElement(src.f,{onClick:doDelete,disabled:0===Object.keys(rootEntitiesDeletable).length},_ref5),react_default.a.createElement(src.f,{ink:"primary",onClick:onCancel},_ref6))))};Dialog.__docgenInfo={description:"",methods:[],displayName:"Dialog",props:{onCancel:{type:{name:"func"},required:!0,description:""},doDelete:{type:{name:"func"},required:!0,description:""},dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType.isRequired"},required:!1,description:""},navigationStrategy:{type:{name:"custom",raw:"navigationStrategy.propTypes"},required:!1,description:""}}};var Dialog_Dialog=Dialog;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/Dialog/Dialog.js"]={name:"Dialog",docgenInfo:Dialog.__docgenInfo,path:"packages/delete/src/components/Dialog/Dialog.js"});var mapActionCreators={doDelete:actions_doDelete,onCancel:function(){return{type:"delete/ON_CANCEL"}}},DialogContainer=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo,navigationStrategy:state.input.navigationStrategy}}),mapActionCreators)(Object(index_es.injectIntl)(Dialog_Dialog));function DeleteProgress_StyledComponents_templateObject(){var data=taggedTemplateLiteral_default()(["\n  margin-bottom: ",";\n"]);return DeleteProgress_StyledComponents_templateObject=function(){return data},data}var StyledIconWrapper=styled_components_browser_esm.default.div(DeleteProgress_StyledComponents_templateObject(),src.Q.space(.2)),DeleteProgress_ref2=react_default.a.createElement(StyledIconWrapper,null,react_default.a.createElement(src.p,{size:"30px"})),DeleteProgress_ref3=react_default.a.createElement(src.N.P,null,react_default.a.createElement(index_es.FormattedMessage,{id:"client.delete.deleteInProgress"})),DeleteProgress=function(_ref){var dialogInfo=_ref.dialogInfo,navigationStrategy=_ref.navigationStrategy;return react_default.a.createElement(react_default.a.Fragment,null,DeleteProgress_ref2,DeleteProgress_ref3,react_default.a.createElement(InfoPart_InfoPart,{key:"infopart-deletable",rootEntities:dialogInfo.rootEntitiesDeletable,relatedEntities:dialogInfo.relatedDeletable,maxCountLink:100,navigationStrategy:navigationStrategy}))};DeleteProgress.__docgenInfo={description:"",methods:[],displayName:"DeleteProgress",props:{dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType.isRequired"},required:!1,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""},navigationStrategy:{type:{name:"custom",raw:"navigationStrategy.propTypes"},required:!1,description:""}}};var DeleteProgress_DeleteProgress=DeleteProgress;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/DeleteProgress/DeleteProgress.js"]={name:"DeleteProgress",docgenInfo:DeleteProgress.__docgenInfo,path:"packages/delete/src/components/DeleteProgress/DeleteProgress.js"});var DeleteProgressContainer_mapActionCreators={doDelete:actions_doDelete},components_DeleteProgress=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo,navigationStrategy:state.input.navigationStrategy}}),DeleteProgressContainer_mapActionCreators)(Object(index_es.injectIntl)(DeleteProgress_DeleteProgress)),Delete_ref2=react_default.a.createElement(components_DeleteProgress,null),Delete_ref3=react_default.a.createElement(DialogContainer,null),Delete=function(_ref){var loadDialogInfo=_ref.loadDialogInfo,dialogInfo=_ref.dialogInfo,deletingInProgress=_ref.deletingInProgress,intl=_ref.intl;return Object(react.useEffect)((function(){loadDialogInfo()}),[]),deletingInProgress?Delete_ref2:react_default.a.createElement(src.o,{required:[dialogInfo],loadingText:function msg(id){return intl.formatMessage({id:id})}("client.delete.loadingText")},dialogInfo&&Delete_ref3)};Delete.displayName="Delete",Delete.__docgenInfo={description:"",methods:[],displayName:"Delete",props:{loadDialogInfo:{type:{name:"func"},required:!0,description:""},dialogInfo:{type:{name:"custom",raw:"deleteInfoPropType"},required:!1,description:""},deletingInProgress:{type:{name:"bool"},required:!1,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""}}};var Delete_Delete=Delete;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/delete/src/components/Delete/Delete.js"]={name:"Delete",docgenInfo:Delete.__docgenInfo,path:"packages/delete/src/components/Delete/Delete.js"});var DeleteContainer_mapActionCreators={loadDialogInfo:function(){return{type:"root/LOAD_DIALOG_INFO"}}},components_Delete=Object(es.connect)((function(state){return{dialogInfo:state.del.dialogInfo,deletingInProgress:state.del.deletingInProgress}}),DeleteContainer_mapActionCreators)(Object(index_es.injectIntl)(Delete_Delete));function main_ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function main_objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?main_ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):main_ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}var EXTERNAL_EVENTS=["onSuccess","onCancel","onError"],main_ref=react_default.a.createElement(components_Delete,null),initApp=function(id,input,events,publicPath){var store=appFactory.a.createStore(reducers,sagas,input,"delete");return externalEvents.a.addToStore(store,events),appFactory.a.createApp("delete",main_ref,store,{input:input,events:events,actions:[],publicPath:publicPath,textResourceModules:["component","common","delete"]})};appFactory.a.registerAppInRegistry("delete",initApp);var DeleteApp=function(props){var events=EXTERNAL_EVENTS.reduce((function(acc,event){return main_objectSpread(main_objectSpread({},acc),props[event]?defineProperty_default()({},event,props[event]):{})}),{});return initApp(0,props,events).component};DeleteApp.propTypes={selection:src_selection.a.propType.isRequired,customDeleteEndpoint:prop_types_default.a.string};__webpack_exports__.a=DeleteApp}}]);
//# sourceMappingURL=actions~docs-actions.6244a23a8489a8ee5442.bundle.js.map