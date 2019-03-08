(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{2786:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _EntityBrowser2=_interopRequireDefault(__webpack_require__(2866)),_modules2=_interopRequireDefault(__webpack_require__(2869)),_actions=__webpack_require__(2821);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var inputDispatches=[{key:"entityName",actionCreator:_actions.setEntityName,mandatory:!0},{key:"entityName",actionCreator:_actions.setFormBase},{key:"formBase",actionCreator:_actions.setFormBase},{key:"id",defaultValue:(new Date).valueOf(),actionCreator:_actions.setAppId}];exports.default={container:_EntityBrowser2.default,reducers:{entityBrowser:_modules2.default},inputDispatches:inputDispatches}},2821:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var SET_ENTITY_NAME=exports.SET_ENTITY_NAME="SET_ENTITY_NAME",SET_FORM_BASE=exports.SET_FORM_BASE="SET_FORM_BASE",SET_APP_ID=exports.SET_APP_ID="root/SET_APP_ID";exports.setEntityName=function(entityName){return{type:SET_ENTITY_NAME,payload:{entityName:entityName}}},exports.setFormBase=function(formBase){return{type:SET_FORM_BASE,payload:{formBase:formBase}}},exports.setAppId=function(appId){return{type:SET_APP_ID,payload:{appId:appId}}}},2866:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var obj,_EntityBrowser=__webpack_require__(2867),_EntityBrowser2=(obj=_EntityBrowser)&&obj.__esModule?obj:{default:obj};exports.default=_EntityBrowser2.default},2867:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_propTypes2=_interopRequireDefault(__webpack_require__(7)),_react2=_interopRequireDefault(__webpack_require__(0)),_notifier2=_interopRequireDefault(__webpack_require__(75)),_RouteWithSubRoutes2=_interopRequireDefault(__webpack_require__(1230)),_StyledEntityBrowser2=_interopRequireDefault(__webpack_require__(2868));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var EntityBrowser=function(_React$Component){function EntityBrowser(){return function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,EntityBrowser),function(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}(this,(EntityBrowser.__proto__||Object.getPrototypeOf(EntityBrowser)).apply(this,arguments))}return function(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}(EntityBrowser,_react2.default.Component),_createClass(EntityBrowser,[{key:"render",value:function(){return _react2.default.createElement(_StyledEntityBrowser2.default,null,_react2.default.createElement(_notifier2.default.Notifier,null),this.props.routes.map(function(route,i){return _react2.default.createElement(_RouteWithSubRoutes2.default,_extends({key:i},route))}))}}]),EntityBrowser}();EntityBrowser.propTypes={routes:_propTypes2.default.array.isRequired},exports.default=EntityBrowser,EntityBrowser.__docgenInfo={description:"",methods:[],displayName:"EntityBrowser",props:{routes:{type:{name:"array"},required:!0,description:""}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/entity-browser/src/routes/entity-browser/components/EntityBrowser/EntityBrowser.js"]={name:"EntityBrowser",docgenInfo:EntityBrowser.__docgenInfo,path:"packages/entity-browser/src/routes/entity-browser/components/EntityBrowser/EntityBrowser.js"})},2868:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var strings,raw,obj,_templateObject=(strings=["\n  && {\n    padding-left: 15px;\n    padding-right: 15px;\n  }\n"],raw=["\n  && {\n    padding-left: 15px;\n    padding-right: 15px;\n  }\n"],Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))),_styledComponents=__webpack_require__(8);var StyledEntityBrowser=((obj=_styledComponents)&&obj.__esModule?obj:{default:obj}).default.div(_templateObject);exports.default=StyledEntityBrowser},2869:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var obj,_reducer=__webpack_require__(2870),_reducer2=(obj=_reducer)&&obj.__esModule?obj:{default:obj};exports.default=_reducer2.default},2870:function(module,exports,__webpack_require__){"use strict";var _ACTION_HANDLERS;Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target};exports.default=function(){var state=arguments.length>0&&void 0!==arguments[0]?arguments[0]:initialState,action=arguments[1],handler=ACTION_HANDLERS[action.type];return handler?handler(state,action):state};var obj,_reducer=__webpack_require__(45),_reducer2=(obj=_reducer)&&obj.__esModule?obj:{default:obj},actions=function(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}(__webpack_require__(2821));function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var ACTION_HANDLERS=(_defineProperty(_ACTION_HANDLERS={},actions.SET_ENTITY_NAME,_reducer2.default.singleTransferReducer("entityName")),_defineProperty(_ACTION_HANDLERS,actions.SET_FORM_BASE,function(state,_ref){var formBase=_ref.payload.formBase;return formBase?_extends({},state,{formBase:formBase}):_extends({},state)}),_defineProperty(_ACTION_HANDLERS,actions.SET_APP_ID,_reducer2.default.singleTransferReducer("appId")),_ACTION_HANDLERS),initialState={entityName:"",formBase:"",appId:""}}}]);
//# sourceMappingURL=11.e01bbdba0fd0e596bfdb.bundle.js.map