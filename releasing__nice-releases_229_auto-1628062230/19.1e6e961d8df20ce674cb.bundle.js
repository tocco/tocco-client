(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{3739:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ListLink",(function(){return ListLink}));__webpack_require__(22),__webpack_require__(49),__webpack_require__(269);var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(28),_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__),react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__),tocco_docs_browser_src_main__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__(1102),__webpack_require__(3680)),tocco_ui__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(6),query_string__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(3662),query_string__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_8__),_entities_utils_navigationStrategy__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(3671),ListLink=function(_ref){var entityName=_ref.entityName,entityKeys=_ref.entityKeys,children=_ref.children,rootNodes=entityKeys.map((function(key){return{entityName:entityName,key:key}}));return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(tocco_ui__WEBPACK_IMPORTED_MODULE_7__.a,{to:"/docs?rootNodes=".concat(JSON.stringify(rootNodes)),target:"_blank"},children)};ListLink.displayName="ListLink";var DocsBrowserApp=function(props){var queryParams=query_string__WEBPACK_IMPORTED_MODULE_8___default.a.parse(props.history.location.search);return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(tocco_docs_browser_src_main__WEBPACK_IMPORTED_MODULE_6__.a,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3___default()({},props,{navigationStrategy:{ListLink:ListLink,DetailLink:_entities_utils_navigationStrategy__WEBPACK_IMPORTED_MODULE_9__.a}},queryParams.rootNodes&&{rootNodes:JSON.parse(queryParams.rootNodes)}))};DocsBrowserApp.displayName="DocsBrowserApp",__webpack_exports__.default={container:DocsBrowserApp},ListLink.__docgenInfo={description:"",methods:[],displayName:"ListLink",props:{entityName:{type:{name:"string"},required:!0,description:""},children:{type:{name:"any"},required:!0,description:""},entityKeys:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/route.js"]={name:"ListLink",docgenInfo:ListLink.__docgenInfo,path:"packages/admin/src/routes/docs/route.js"})}}]);
//# sourceMappingURL=19.1e6e961d8df20ce674cb.bundle.js.map