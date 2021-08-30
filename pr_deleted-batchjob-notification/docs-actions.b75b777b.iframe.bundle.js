(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{5007:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a=function getDetailFormName(context,entityName){return context.detailFormNames&&context.detailFormNames[entityName]?context.detailFormNames[entityName]:"Dms".concat(entityName)}},5157:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(1),__webpack_require__(6);var tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4984),react_intl__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(369),_utils_getNode__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(4992),_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(5007),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(0),CreateFolder=function CreateFolder(_ref){var context=_ref.context,onSuccess=_ref.onSuccess,intl=_ref.intl,emitAction=_ref.emitAction,parent=Object(_utils_getNode__WEBPACK_IMPORTED_MODULE_4__.a)(context.history.location.pathname),defaultValues=parent?[{id:"rel".concat(parent.model),value:parent.key}]:[],formName=Object(_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_5__.a)(context,"Folder");return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__.a,{entityName:"Folder",formName:formName,mode:"create",defaultValues:defaultValues,onEntityCreated:function handleEntityCreated(_ref2){var id=_ref2.id,remoteEvents=[{type:"entity-create-event",payload:{entities:[{entityName:"Docs_list_item",key:"Folder/".concat(id)}]}}];onSuccess({message:intl.formatMessage({id:"client.docs-browser.createFolderSuccessful"}),remoteEvents:remoteEvents})},emitAction:function emitActionBarrier(action){action.payload&&"client.entity-detail.createSuccessfulTitle"!==action.payload.title&&emitAction(action)}})};CreateFolder.displayName="CreateFolder",CreateFolder.__docgenInfo={description:"",methods:[],displayName:"CreateFolder",props:{context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"object"},required:!0,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_3__.c)(CreateFolder),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/CreateFolder.js"]={name:"CreateFolder",docgenInfo:CreateFolder.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/CreateFolder.js"})},5158:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(1),__webpack_require__(6);var tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4984),react_intl__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(369),_utils_getNode__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(4992),_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(5007),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(0),CreateDomain=function CreateDomain(_ref){var context=_ref.context,onSuccess=_ref.onSuccess,intl=_ref.intl,emitAction=_ref.emitAction,parent=Object(_utils_getNode__WEBPACK_IMPORTED_MODULE_4__.a)(context.history.location.pathname),defaultValues=parent?[{id:"rel".concat(parent.model),value:parent.key}]:[],formName=Object(_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_5__.a)(context,"Domain");return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__.a,{entityName:"Domain",formName:formName,mode:"create",defaultValues:defaultValues,onEntityCreated:function handleEntityCreated(_ref2){var id=_ref2.id,remoteEvents=[{type:"entity-create-event",payload:{entities:[{entityName:"Docs_list_item",key:"Domain/".concat(id)}]}}];onSuccess({message:intl.formatMessage({id:"client.docs-browser.createDomainSuccessful"}),remoteEvents:remoteEvents})},emitAction:function emitActionBarrier(action){action.payload&&"client.entity-detail.createSuccessfulTitle"!==action.payload.title&&emitAction(action)}})};CreateDomain.displayName="CreateDomain",CreateDomain.__docgenInfo={description:"",methods:[],displayName:"CreateDomain",props:{context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"object"},required:!0,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_3__.c)(CreateDomain),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/CreateDomain.js"]={name:"CreateDomain",docgenInfo:CreateDomain.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/CreateDomain.js"})},5159:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(36),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__),react_intl__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(234),__webpack_require__(76),__webpack_require__(1),__webpack_require__(6),__webpack_require__(369)),tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(4984),_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_8__=(__webpack_require__(1377),__webpack_require__(5007)),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(0),EditAction=function EditAction(_ref){var selection=_ref.selection,onSuccess=_ref.onSuccess,onCancel=_ref.onCancel,context=(_ref.intl,_ref.context),emitAction=_ref.emitAction,_selection$ids$0$spli=selection.ids[0].split("/"),_selection$ids$0$spli2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_selection$ids$0$spli,2),entityName=_selection$ids$0$spli2[0],entityKey=_selection$ids$0$spli2[1];"Resource"===entityName&&(context.history.push("/docs/doc/".concat(entityKey,"/detail")),onCancel());var formName=Object(_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_8__.a)(context,entityName);return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_6__.a,{entityName:entityName,formName:formName,entityId:entityKey,mode:"update",onEntityUpdated:function handleEntityUpdated(){var remoteEvents=[{type:"entity-update-event",payload:{entities:[{entityName:"Docs_list_item",key:selection.ids[0]}]}}];onSuccess({message:null,remoteEvents:remoteEvents})},onEntityDeleted:function handleEntityDeleted(){var remoteEvents=[{type:"entity-delete-event",payload:{entities:[{entityName:"Docs_list_item",key:selection.ids[0]}]}}];onSuccess({message:null,remoteEvents:remoteEvents})},emitAction:function emitActionBarrier(action){action.payload&&"client.entity-detail.saveSuccessfulTitle"!==action.payload.title&&emitAction(action)}})};EditAction.displayName="EditAction",EditAction.__docgenInfo={description:"",methods:[],displayName:"EditAction",props:{selection:{type:{name:"custom",raw:"selection.propType"},required:!1,description:""},context:{type:{name:"shape",value:{history:{name:"shape",value:{push:{name:"func",required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},onCancel:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"object"},required:!0,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_5__.c)(EditAction),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/Edit.js"]={name:"EditAction",docgenInfo:EditAction.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/Edit.js"})},5160:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(11),__webpack_require__(1);var tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4993),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0);__webpack_exports__.default=function(props){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_2__.a,Object.assign({},props,{customDeleteEndpoint:"documents/delete"}))}},5180:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(11);var react=__webpack_require__(1),es=__webpack_require__(24),injectIntl=__webpack_require__(369),actions=__webpack_require__(5004),slicedToArray=__webpack_require__(36),slicedToArray_default=__webpack_require__.n(slicedToArray),taggedTemplateLiteral=__webpack_require__(13),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),message=(__webpack_require__(33),__webpack_require__(234),__webpack_require__(76),__webpack_require__(6),__webpack_require__(1969)),StyledButton=(__webpack_require__(1377),__webpack_require__(1362)),LoadMask=__webpack_require__(2273),Button=__webpack_require__(72),styled_components_browser_esm=__webpack_require__(5),isEqual=__webpack_require__(324),isEqual_default=__webpack_require__.n(isEqual),main=__webpack_require__(5008),getNode=__webpack_require__(4992),jsx_runtime=__webpack_require__(0);function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  display: flex;\n  justify-content: flex-end;\n\n  "," {\n    margin-right: 0;\n  }\n"]);return _templateObject=function _templateObject(){return data},data}var StyledButtonsWrapper=styled_components_browser_esm.default.div(_templateObject(),StyledButton.a),_ref2=Object(jsx_runtime.jsx)(message.a,{id:"client.actions.dms-move.button"}),Move_MoveAction=function MoveAction(_ref){var selection=_ref.selection,onSuccess=_ref.onSuccess,onError=_ref.onError,context=_ref.context,initialize=_ref.initialize,moveElements=_ref.moveElements,isWaiting=_ref.isWaiting,domainTypes=_ref.domainTypes,rootNodes=_ref.rootNodes,businessUnit=_ref.businessUnit,emitAction=_ref.emitAction,initialNode=Object(getNode.a)(context.history.location.pathname),initialParent={model:"Docs_list_item",key:"".concat(initialNode.model,"/").concat(initialNode.key)},_useState=Object(react.useState)(initialParent),_useState2=slicedToArray_default()(_useState,2),parent=_useState2[0],setParent=_useState2[1];Object(react.useEffect)((function(){initialize(selection,onSuccess,onError)}),[]);var getCustomLocation=function getCustomLocation(model,key){switch(model){case"Domain":return"/docs/domain/".concat(key,"/list");case"Folder":return"/docs/folder/".concat(key,"/list");case"Resource":return;default:throw new Error("Unexpected model: ".concat(model))}};return Object(jsx_runtime.jsxs)(LoadMask.a,{required:[!isWaiting],children:[Object(jsx_runtime.jsx)(main.a,{memoryHistory:!0,initialLocation:function getInitialLocation(){if(null===parent)return null;var _parent$key$split=parent.key.split("/"),_parent$key$split2=slicedToArray_default()(_parent$key$split,2),model=_parent$key$split2[0],key=_parent$key$split2[1];return getCustomLocation(model,key)}(),listLimit:10,selectionStyle:"none",searchFormType:"none",disableViewPersistor:!0,getListFormName:function getListFormName(parent){return null===parent?"Move_root_docs_list_item":"Move_docs_list_item"},onListParentChange:function onListParentChange(parent){return setParent(parent)},getCustomLocation:getCustomLocation,navigationStrategy:{},embedded:!0,emitAction:emitAction,noLeftPadding:!0,domainTypes:domainTypes,rootNodes:rootNodes,businessUnit:businessUnit,sortable:!1}),Object(jsx_runtime.jsx)(StyledButtonsWrapper,{children:Object(jsx_runtime.jsx)(Button.a,{onClick:function onClick(){return moveElements(parent.key,selection.ids)},look:"raised",ink:"primary",disabled:null===parent||isEqual_default()(parent,initialParent),children:_ref2})})]})};Move_MoveAction.displayName="MoveAction",Move_MoveAction.__docgenInfo={description:"",methods:[],displayName:"MoveAction",props:{selection:{type:{name:"custom",raw:"selection.propType"},required:!1,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},onError:{type:{name:"func"},required:!0,description:""},context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},initialize:{type:{name:"func"},required:!0,description:""},moveElements:{type:{name:"func"},required:!0,description:""},isWaiting:{type:{name:"bool"},required:!0,description:""},domainTypes:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},rootNodes:{type:{name:"arrayOf",value:{name:"shape",value:{entityName:{name:"string",required:!1},key:{name:"string",required:!1}}}},required:!1,description:""},businessUnit:{type:{name:"string"},required:!1,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/Move.js"]={name:"MoveAction",docgenInfo:Move_MoveAction.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/Move.js"});var mapActionCreators={initialize:actions.f,moveElements:actions.g},MoveContainer=Object(es.connect)((function mapStateToProps(state){return{isWaiting:state.docs.move.isWaiting,domainTypes:state.input.domainTypes,rootNodes:state.input.rootNodes,businessUnit:state.input.businessUnit}}),mapActionCreators)(Move_MoveAction);__webpack_exports__.default=Object(injectIntl.c)((function(props){return Object(jsx_runtime.jsx)(MoveContainer,Object.assign({},props))}))}}]);