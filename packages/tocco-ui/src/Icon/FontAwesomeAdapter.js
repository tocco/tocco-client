import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faSquareFull
} from '@fortawesome/pro-solid-svg-icons'
import {
  faTimes, faCircle, faHorizontalRule, faSync, faMinus, faTimesCircle, faInfoCircle,
  faCheckCircle, faExclamationCircle, faTrash, faDownload, faUpload, faList, faPhone, faSearch, faFolder,
  faExternalLink, faChevronDoubleRight, faChevronDoubleLeft, faChevronRight, faChevronLeft, faChevronUp, faChevronDown,
  faPlus, faGlobe, faFileExcel, faFilePdf, faFile, faSortDown, faSortUp, faArrowRight, faArrowLeft, faQuestionCircle,
  faCog, faFolders, faStar, faFileAlt, faFileCode, faFileCsv, faFileExport, faFileImport, faFileSpreadsheet, faIdBadge,
  faCheck, faMapMarked, faBars, faInfo, faCompress, faBook, faEllipsisV, faSquare, faExclamation
} from '@fortawesome/pro-light-svg-icons'
import {faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple}
  from '@fortawesome/free-brands-svg-icons'
(() => {
  library.add(
    faChevronDoubleLeft, faChevronDoubleRight, faChevronRight,
    faChevronLeft, faChevronUp, faChevronDown, faGlobe, faPlus, faFolder, faFolders, faStar, faTimes,
    faArrowRight, faArrowLeft, faFile, faFileAlt, faFileCode, faFileCsv, faFileExcel, faFileExport,
    faFileImport, faFilePdf, faFileSpreadsheet, faIdBadge, faCheck, faExclamation, faCircle,
    faCheckCircle, faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple, faBars, faExternalLink,
    faPhone, faMapMarked, faSearch, faCog, faDownload, faUpload, faInfo, faHorizontalRule, faSync, faSquareFull,
    faCompress, faBook, faSortUp, faSortDown, faQuestionCircle, faEllipsisV, faMinus, faTimesCircle, faInfoCircle,
    faExclamationCircle, faTrash, faList, faSquare)
})()

const FontAwesomeAdapter = ({icon, style}) =>
  <FontAwesomeIcon
    icon={icon.includes(',') ? icon.replace(/\s+/, '').split(',') : icon}
    style={style}
    {..._get(style, 'color') && {color: style.color}}
    fixedWidth
  />

FontAwesomeAdapter.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default FontAwesomeAdapter
