(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{5244:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ListLink",(function(){return ListLink}));__webpack_require__(28),__webpack_require__(976),__webpack_require__(76),__webpack_require__(11),__webpack_require__(1),__webpack_require__(2303);var tocco_docs_browser_src_main__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(5067),tocco_ui__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(5268),query_string__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(5034),query_string__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_8__),_entities_utils_navigationStrategy__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(5036),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(0),ListLink=function ListLink(_ref){var entityName=_ref.entityName,entityKeys=_ref.entityKeys,children=_ref.children,rootNodes=entityKeys.map((function(key){return{entityName:entityName,key:key}}));return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(tocco_ui__WEBPACK_IMPORTED_MODULE_7__.a,{to:"/docs?rootNodes=".concat(JSON.stringify(rootNodes)),target:"_blank",children:children})};ListLink.displayName="ListLink";var DocsBrowserApp=function DocsBrowserApp(props){var queryParams=query_string__WEBPACK_IMPORTED_MODULE_8___default.a.parse(props.history.location.search);return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(tocco_docs_browser_src_main__WEBPACK_IMPORTED_MODULE_6__.a,Object.assign({},props,{navigationStrategy:{ListLink:ListLink,DetailLink:_entities_utils_navigationStrategy__WEBPACK_IMPORTED_MODULE_9__.a}},queryParams.rootNodes&&{rootNodes:JSON.parse(queryParams.rootNodes)}))};DocsBrowserApp.displayName="DocsBrowserApp",__webpack_exports__.default={container:DocsBrowserApp},ListLink.__docgenInfo={description:"",methods:[],displayName:"ListLink",props:{entityName:{type:{name:"string"},required:!0,description:""},children:{type:{name:"any"},required:!0,description:""},entityKeys:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/route.js"]={name:"ListLink",docgenInfo:ListLink.__docgenInfo,path:"packages/admin/src/routes/docs/route.js"})}}]);