(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{4975:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"DatePicker",(function(){return DatePicker_DatePicker}));var react=__webpack_require__(1),injectIntl=(__webpack_require__(10),__webpack_require__(376)),styled_components_browser_esm=__webpack_require__(5),resolveThemePath=__webpack_require__(37),slicedToArray=__webpack_require__(40),slicedToArray_default=__webpack_require__.n(slicedToArray),flatpickr=(__webpack_require__(1409),__webpack_require__(11),__webpack_require__(5121),__webpack_require__(5123)),flatpickr_default=__webpack_require__.n(flatpickr),de=__webpack_require__(5124),fr=__webpack_require__(5125),it=__webpack_require__(5126),localeMap={"de-CH":de.German,de:de.German,fr:fr.French,it:it.Italian},handleOnChange=function handleOnChange(onChange){return function(selectedDates){selectedDates&&selectedDates.length>0?onChange(selectedDates[0].toISOString()):onChange(null)}},useDatePickr_useDatePickr=function useDatePickr(element,config){var _useState=Object(react.useState)(null),_useState2=slicedToArray_default()(_useState,2),flatpickrInstance=_useState2[0],setflatpickrInstance=_useState2[1];Object(react.useEffect)((function(){return element&&setflatpickrInstance(function initializeFlatPickr(element,_ref){var onChange=_ref.onChange,value=_ref.value,fontFamily=_ref.fontFamily,locale=_ref.locale,flatpickrOptions=_ref.flatpickrOptions,calendarLocale=localeMap[locale],options=Object.assign({},calendarLocale?{locale:calendarLocale}:{},{wrap:!0,onChange:handleOnChange(onChange),altInput:!1,enableTime:!1,defaultDate:value,appendTo:element.current},localeMap[locale]&&{locale:localeMap[locale]},flatpickrOptions),flatpickrInstance=flatpickr_default()(element.current,options);return fontFamily&&(flatpickrInstance.calendarContainer.style.fontFamily=fontFamily),flatpickrInstance}(element,config)),function(){flatpickrInstance&&flatpickrInstance.destroy()}}),[element,config.locale,config.value])},taggedTemplateLiteral=__webpack_require__(9),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),modularScale=__webpack_require__(27);function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  cursor: pointer;\n\n  .flatpickr-calendar.open  {\n    margin-top: ",";\n  }\n\n  .flatpickr-calendar.arrowTop:before,\n  .flatpickr-calendar.arrowTop:after {\n    left: 83%;\n  }\n"]);return _templateObject=function _templateObject(){return data},data}var StyledWrapper=styled_components_browser_esm.default.div(_templateObject(),modularScale.a.space(1.2)),jsx_runtime=__webpack_require__(0),DatePicker_DatePicker=function DatePicker(props){var value=props.value,children=props.children,intl=props.intl,onChange=props.onChange,wrapperElement=Object(react.useRef)(null),locale=intl.locale,fontFamily=resolveThemePath.a.fontFamily("regular")(props);return useDatePickr_useDatePickr(wrapperElement,{value:value,onChange:onChange,fontFamily:fontFamily,locale:locale}),Object(jsx_runtime.jsx)(jsx_runtime.Fragment,{children:Object(jsx_runtime.jsx)(StyledWrapper,{"data-wrap":!0,ref:wrapperElement,children:Object(jsx_runtime.jsxs)("div",{"data-toggle":!0,children:[Object(jsx_runtime.jsx)("input",{style:{display:"none"},type:"text","data-input":!0,"aria-label":function msg(id){return intl.formatMessage({id:id})}("client.component.datePicker.label")}),children]})})})};DatePicker_DatePicker.__docgenInfo={description:"",methods:[],displayName:"DatePicker",props:{children:{type:{name:"node"},required:!0,description:"Any content to wrap a onclick around to open a calendar"},onChange:{type:{name:"func"},required:!0,description:"Function triggered on every date selection. First parameter is the picked date as iso string."},value:{type:{name:"any"},required:!1,description:"To set the selected date from outside the component."},intl:{type:{name:"object"},required:!0,description:""}}};__webpack_exports__.default=Object(styled_components_browser_esm.withTheme)(Object(injectIntl.c)(DatePicker_DatePicker));"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/tocco-ui/src/DatePicker/DatePicker.js"]={name:"DatePicker",docgenInfo:DatePicker_DatePicker.__docgenInfo,path:"packages/tocco-ui/src/DatePicker/DatePicker.js"})}}]);