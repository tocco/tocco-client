(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{5227:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var es=__webpack_require__(25),injectIntl=__webpack_require__(376),get=__webpack_require__(21),get_default=__webpack_require__.n(get),main=(__webpack_require__(28),__webpack_require__(972),__webpack_require__(75),__webpack_require__(11),__webpack_require__(1),__webpack_require__(2284),__webpack_require__(5028)),StyledLink=__webpack_require__(5229),query_string=__webpack_require__(4995),query_string_default=__webpack_require__.n(query_string),navigationStrategy=__webpack_require__(4997),jsx_runtime=__webpack_require__(0),DocsBrowserApp_ListLink=function ListLink(_ref){var entityName=_ref.entityName,entityKeys=_ref.entityKeys,children=_ref.children,rootNodes=entityKeys.map((function(key){return{entityName:entityName,key:key}}));return Object(jsx_runtime.jsx)(StyledLink.a,{to:"/docs?rootNodes=".concat(JSON.stringify(rootNodes)),target:"_blank",children:children})};DocsBrowserApp_ListLink.displayName="ListLink";var DocsBrowserApp_DocsBrowserApp=function DocsBrowserApp(props){var queryParams=query_string_default.a.parse(props.history.location.search);return Object(jsx_runtime.jsx)(main.a,Object.assign({},props,{navigationStrategy:{ListLink:DocsBrowserApp_ListLink,DetailLink:navigationStrategy.a}},queryParams.rootNodes&&{rootNodes:JSON.parse(queryParams.rootNodes)},{searchFormCollapsed:props.searchFormCollapsed,onSearchFormCollapsedChange:function onSearchFormCollapsedChange(_ref2){var collapsed=_ref2.collapsed;props.saveUserPreferences("admin.list.searchFormCollapsed",collapsed)}}))};DocsBrowserApp_DocsBrowserApp.displayName="DocsBrowserApp",DocsBrowserApp_DocsBrowserApp.__docgenInfo={description:"",methods:[],displayName:"DocsBrowserApp",props:{history:{type:{name:"object"},required:!0,description:""},searchFormCollapsed:{type:{name:"bool"},required:!1,description:""},saveUserPreferences:{type:{name:"func"},required:!1,description:""}}};var components_DocsBrowserApp_DocsBrowserApp=DocsBrowserApp_DocsBrowserApp;DocsBrowserApp_ListLink.__docgenInfo={description:"",methods:[],displayName:"ListLink",props:{entityName:{type:{name:"string"},required:!0,description:""},children:{type:{name:"any"},required:!0,description:""},entityKeys:{type:{name:"arrayOf",value:{name:"string"}},required:!1,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/components/DocsBrowserApp/DocsBrowserApp.js"]={name:"ListLink",docgenInfo:DocsBrowserApp_ListLink.__docgenInfo,path:"packages/admin/src/routes/docs/components/DocsBrowserApp/DocsBrowserApp.js"}),"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/admin/src/routes/docs/components/DocsBrowserApp/DocsBrowserApp.js"]={name:"DocsBrowserApp",docgenInfo:DocsBrowserApp_DocsBrowserApp.__docgenInfo,path:"packages/admin/src/routes/docs/components/DocsBrowserApp/DocsBrowserApp.js"});var mapActionCreators={saveUserPreferences:__webpack_require__(274).f},components_DocsBrowserApp=Object(es.connect)((function mapStateToProps(state,props){return{searchFormCollapsed:get_default()(state.preferences.userPreferences,"admin.list.searchFormCollapsed",null)}}),mapActionCreators)(Object(injectIntl.c)(components_DocsBrowserApp_DocsBrowserApp));__webpack_exports__.default={container:components_DocsBrowserApp}}}]);