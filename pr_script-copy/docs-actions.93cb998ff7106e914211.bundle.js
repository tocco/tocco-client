(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{3679:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a=function(context,entityName){return context.detailFormNames&&context.detailFormNames[entityName]?context.detailFormNames[entityName]:"Dms".concat(entityName)}},3741:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(11),__webpack_require__(3664)),react_intl__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(12),_utils_getNode__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(3673),_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(3679),CreateFolder=function(_ref){var context=_ref.context,onSuccess=_ref.onSuccess,intl=_ref.intl,emitAction=_ref.emitAction,parent=Object(_utils_getNode__WEBPACK_IMPORTED_MODULE_4__.a)(context.history.location.pathname),defaultValues=parent?[{id:"rel".concat(parent.model),value:parent.key}]:[],formName=Object(_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_5__.a)(context,"Folder");return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__.a,{entityName:"Folder",formName:formName,mode:"create",defaultValues:defaultValues,onEntityCreated:function handleEntityCreated(_ref2){var id=_ref2.id,remoteEvents=[{type:"entity-create-event",payload:{entities:[{entityName:"Docs_list_item",key:"Folder/".concat(id)}]}}];onSuccess({message:intl.formatMessage({id:"client.docs-browser.createFolderSuccessful"}),remoteEvents:remoteEvents})},emitAction:emitAction})};CreateFolder.displayName="CreateFolder",CreateFolder.__docgenInfo={description:"",methods:[],displayName:"CreateFolder",props:{context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_3__.injectIntl)(CreateFolder),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/CreateFolder.js"]={name:"CreateFolder",docgenInfo:CreateFolder.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/CreateFolder.js"})},3742:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(11),__webpack_require__(3664)),react_intl__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(12),_utils_getNode__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(3673),_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(3679),CreateDomain=function(_ref){var context=_ref.context,onSuccess=_ref.onSuccess,intl=_ref.intl,emitAction=_ref.emitAction,parent=Object(_utils_getNode__WEBPACK_IMPORTED_MODULE_4__.a)(context.history.location.pathname),defaultValues=parent?[{id:"rel".concat(parent.model),value:parent.key}]:[],formName=Object(_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_5__.a)(context,"Domain");return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__.a,{entityName:"Domain",formName:formName,mode:"create",defaultValues:defaultValues,onEntityCreated:function handleEntityCreated(_ref2){var id=_ref2.id,remoteEvents=[{type:"entity-create-event",payload:{entities:[{entityName:"Docs_list_item",key:"Domain/".concat(id)}]}}];onSuccess({message:intl.formatMessage({id:"client.docs-browser.createDomainSuccessful"}),remoteEvents:remoteEvents})},emitAction:emitAction})};CreateDomain.displayName="CreateDomain",CreateDomain.__docgenInfo={description:"",methods:[],displayName:"CreateDomain",props:{context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_3__.injectIntl)(CreateDomain),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/CreateDomain.js"]={name:"CreateDomain",docgenInfo:CreateDomain.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/CreateDomain.js"})},3743:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(49),__webpack_require__(130);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(48),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__),react_intl__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(11),__webpack_require__(12)),tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(3664),_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_8__=(__webpack_require__(634),__webpack_require__(3679)),EditAction=function(_ref){var selection=_ref.selection,onSuccess=_ref.onSuccess,onCancel=_ref.onCancel,intl=_ref.intl,context=_ref.context,emitAction=_ref.emitAction,_selection$ids$0$spli=selection.ids[0].split("/"),_selection$ids$0$spli2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_selection$ids$0$spli,2),entityName=_selection$ids$0$spli2[0],entityKey=_selection$ids$0$spli2[1];"Resource"===entityName&&(context.history.push("/docs/doc/".concat(entityKey,"/detail")),onCancel());var formName=Object(_utils_getDetailFormName__WEBPACK_IMPORTED_MODULE_8__.a)(context,entityName);return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_6__.a,{entityName:entityName,formName:formName,entityId:entityKey,mode:"update",onEntityUpdated:function handleEntityUpdated(){var remoteEvents=[{type:"entity-update-event",payload:{entities:[{entityName:"Docs_list_item",key:selection.ids[0]}]}}];onSuccess({message:intl.formatMessage({id:"client.docs-browser.editSuccessful"}),remoteEvents:remoteEvents})},emitAction:emitAction})};EditAction.displayName="EditAction",EditAction.__docgenInfo={description:"",methods:[],displayName:"EditAction",props:{selection:{type:{name:"custom",raw:"selection.propType"},required:!1,description:""},context:{type:{name:"shape",value:{history:{name:"shape",value:{push:{name:"func",required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},onCancel:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_5__.injectIntl)(EditAction),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/Edit.js"]={name:"EditAction",docgenInfo:EditAction.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/Edit.js"})},3744:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(28),_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(3674);__webpack_exports__.default=function(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_2__.a,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({},props,{customDeleteEndpoint:"documents/delete"}))}},3762:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),es=__webpack_require__(25),index_es=__webpack_require__(12),actions=__webpack_require__(3678),slicedToArray=(__webpack_require__(21),__webpack_require__(49),__webpack_require__(130),__webpack_require__(48)),slicedToArray_default=__webpack_require__.n(slicedToArray),taggedTemplateLiteral=__webpack_require__(17),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),src=(__webpack_require__(11),__webpack_require__(634),__webpack_require__(6)),styled_components_browser_esm=__webpack_require__(7),isEqual=__webpack_require__(198),isEqual_default=__webpack_require__.n(isEqual),main=__webpack_require__(3680),getNode=__webpack_require__(3673);function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  display: flex;\n  justify-content: flex-end;\n\n  "," {\n    margin-right: 0;\n  }\n"]);return _templateObject=function(){return data},data}var StyledButtonsWrapper=styled_components_browser_esm.default.div(_templateObject(),src.E),_ref2=react_default.a.createElement(index_es.FormattedMessage,{id:"client.actions.dms-move.button"}),MoveAction=function(_ref){var selection=_ref.selection,onSuccess=_ref.onSuccess,onError=_ref.onError,context=_ref.context,initialize=_ref.initialize,moveElements=_ref.moveElements,isWaiting=_ref.isWaiting,domainTypes=_ref.domainTypes,rootNodes=_ref.rootNodes,businessUnit=_ref.businessUnit,emitAction=_ref.emitAction,initialNode=Object(getNode.a)(context.history.location.pathname),initialParent={model:"Docs_list_item",key:"".concat(initialNode.model,"/").concat(initialNode.key)},_useState=Object(react.useState)(initialParent),_useState2=slicedToArray_default()(_useState,2),parent=_useState2[0],setParent=_useState2[1];Object(react.useEffect)((function(){initialize(selection,onSuccess,onError)}),[]);var getCustomLocation=function(model,key){switch(model){case"Domain":return"/docs/domain/".concat(key,"/list");case"Folder":return"/docs/folder/".concat(key,"/list");case"Resource":return;default:throw new Error("Unexpected model: ".concat(model))}};return react_default.a.createElement(src.o,{required:[!isWaiting]},react_default.a.createElement(main.a,{memoryHistory:!0,initialLocation:function getInitialLocation(){if(null===parent)return null;var _parent$key$split=parent.key.split("/"),_parent$key$split2=slicedToArray_default()(_parent$key$split,2),model=_parent$key$split2[0],key=_parent$key$split2[1];return getCustomLocation(model,key)}(),listLimit:10,selectionStyle:"none",searchFormType:"none",disableViewPersistor:!0,getListFormName:function getListFormName(parent){return null===parent?"Move_root_docs_list_item":"Move_docs_list_item"},onListParentChange:function onListParentChange(parent){return setParent(parent)},getCustomLocation:getCustomLocation,navigationStrategy:{},embedded:!0,emitAction:emitAction,noLeftPadding:!0,domainTypes:domainTypes,rootNodes:rootNodes,businessUnit:businessUnit}),react_default.a.createElement(StyledButtonsWrapper,null,react_default.a.createElement(src.f,{onClick:function onClick(){return moveElements(parent.key,selection.ids)},look:"raised",ink:"primary",disabled:null===parent||isEqual_default()(parent,initialParent)},_ref2)))};MoveAction.displayName="MoveAction",MoveAction.__docgenInfo={description:"",methods:[],displayName:"MoveAction",props:{selection:{type:{name:"custom",raw:"selection.propType"},required:!1,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},onError:{type:{name:"func"},required:!0,description:""},context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},initialize:{type:{name:"func"},required:!0,description:""},moveElements:{type:{name:"func"},required:!0,description:""},isWaiting:{type:{name:"bool"},required:!0,description:""},domainTypes:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""},rootNodes:{type:{name:"arrayOf",value:{name:"shape",value:{entityName:{name:"string",required:!1},key:{name:"string",required:!1}}}},required:!1,description:""},businessUnit:{type:{name:"string"},required:!1,description:""},emitAction:{type:{name:"func"},required:!0,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/Move.js"]={name:"MoveAction",docgenInfo:MoveAction.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/Move.js"});var mapActionCreators={initialize:actions.f,moveElements:actions.g},MoveContainer=Object(es.connect)((function(state){return{isWaiting:state.docs.move.isWaiting,domainTypes:state.input.domainTypes,rootNodes:state.input.rootNodes,businessUnit:state.input.businessUnit}}),mapActionCreators)(MoveAction);__webpack_exports__.default=Object(index_es.injectIntl)((function(props){return react_default.a.createElement(MoveContainer,props)}))}}]);
//# sourceMappingURL=docs-actions.93cb998ff7106e914211.bundle.js.map