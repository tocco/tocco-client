(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{3738:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(12),__webpack_require__(3665)),react_intl__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(11),_utils_getNode__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(3670),CreateFolder=function(_ref){var context=_ref.context,onSuccess=_ref.onSuccess,intl=_ref.intl,parent=Object(_utils_getNode__WEBPACK_IMPORTED_MODULE_4__.a)(context.history.location.pathname),defaultValues=parent?[{id:"rel".concat(parent.model),value:parent.key}]:[];return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__.a,{entityName:"Folder",formName:"Folder",mode:"create",defaultValues:defaultValues,onEntityCreated:function handleEntityCreated(_ref2){var id=_ref2.id,remoteEvents=[{type:"entity-create-event",payload:{entities:[{entityName:"Docs_list_item",key:"Folder/".concat(id)}]}}];onSuccess({message:intl.formatMessage({id:"client.docs-browser.createFolderSuccessful"}),remoteEvents:remoteEvents})}})};CreateFolder.displayName="CreateFolder",CreateFolder.__docgenInfo={description:"",methods:[],displayName:"CreateFolder",props:{context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_3__.injectIntl)(CreateFolder),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/CreateFolder.js"]={name:"CreateFolder",docgenInfo:CreateFolder.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/CreateFolder.js"})},3739:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(12),__webpack_require__(3665)),react_intl__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(11),_utils_getNode__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(3670),CreateDomain=function(_ref){var context=_ref.context,onSuccess=_ref.onSuccess,intl=_ref.intl,parent=Object(_utils_getNode__WEBPACK_IMPORTED_MODULE_4__.a)(context.history.location.pathname),defaultValues=parent?[{id:"rel".concat(parent.model),value:parent.key}]:[];return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_2__.a,{entityName:"Domain",formName:"Domain",mode:"create",defaultValues:defaultValues,onEntityCreated:function handleEntityCreated(_ref2){var id=_ref2.id,remoteEvents=[{type:"entity-create-event",payload:{entities:[{entityName:"Docs_list_item",key:"Domain/".concat(id)}]}}];onSuccess({message:intl.formatMessage({id:"client.docs-browser.createDomainSuccessful"}),remoteEvents:remoteEvents})}})};CreateDomain.displayName="CreateDomain",CreateDomain.__docgenInfo={description:"",methods:[],displayName:"CreateDomain",props:{context:{type:{name:"shape",value:{history:{name:"shape",value:{location:{name:"shape",value:{pathname:{name:"string",required:!0}},required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_3__.injectIntl)(CreateDomain),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/CreateDomain.js"]={name:"CreateDomain",docgenInfo:CreateDomain.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/CreateDomain.js"})},3740:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(49),__webpack_require__(130);var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(48),_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__),react_intl__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__(12),__webpack_require__(11)),tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(3665),EditAction=(__webpack_require__(633),function(_ref){var selection=_ref.selection,onSuccess=_ref.onSuccess,onCancel=_ref.onCancel,intl=_ref.intl,context=_ref.context,_selection$ids$0$spli=selection.ids[0].split("/"),_selection$ids$0$spli2=_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_selection$ids$0$spli,2),entityName=_selection$ids$0$spli2[0],entityKey=_selection$ids$0$spli2[1];return"Resource"===entityName&&(context.history.push("/docs/doc/".concat(entityKey,"/detail")),onCancel()),react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(tocco_entity_detail_src_main__WEBPACK_IMPORTED_MODULE_6__.a,{entityName:entityName,formName:"Dms".concat(entityName),entityId:entityKey,mode:"update",onEntityUpdated:function handleEntityUpdated(){var remoteEvents=[{type:"entity-update-event",payload:{entities:[{entityName:"Docs_list_item",key:selection.ids[0]}]}}];onSuccess({message:intl.formatMessage({id:"client.docs-browser.editSuccessful"}),remoteEvents:remoteEvents})}})});EditAction.displayName="EditAction",EditAction.__docgenInfo={description:"",methods:[],displayName:"EditAction",props:{selection:{type:{name:"custom",raw:"selection.propType"},required:!1,description:""},context:{type:{name:"shape",value:{history:{name:"shape",value:{push:{name:"func",required:!0}},required:!0}}},required:!0,description:""},onSuccess:{type:{name:"func"},required:!0,description:""},onCancel:{type:{name:"func"},required:!0,description:""},intl:{type:{name:"custom",raw:"intlShape.isRequired"},required:!1,description:""}}},__webpack_exports__.default=Object(react_intl__WEBPACK_IMPORTED_MODULE_5__.injectIntl)(EditAction),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs-browser/src/components/Action/actions/Edit.js"]={name:"EditAction",docgenInfo:EditAction.__docgenInfo,path:"packages/docs-browser/src/components/Action/actions/Edit.js"})},3741:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(28),_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(3669);__webpack_exports__.default=function(props){return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(tocco_delete_src_main__WEBPACK_IMPORTED_MODULE_2__.a,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({},props,{customDeleteEndpoint:"documents/delete"}))}}}]);
//# sourceMappingURL=docs-actions.3c30d374c9cbd2952e1e.bundle.js.map