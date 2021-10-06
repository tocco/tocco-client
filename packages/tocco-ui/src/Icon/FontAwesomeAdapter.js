import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSquare as faSquareSolid, faSquareFull, faStar as faStarSolid} from '@fortawesome/pro-solid-svg-icons'
import {
  faArrowLeft,
  faArrowRight,
  faArrowToBottom,
  faArrowToTop,
  faBars,
  faBell,
  faBook,
  faBox,
  faBoxOpen,
  faCheck,
  faCheckCircle,
  faChevronDoubleLeft,
  faChevronDoubleRight,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faCog,
  faComment,
  faCompress,
  faEllipsisV,
  faExclamation,
  faExclamationCircle,
  faExternalLink,
  faFile,
  faFileAlt,
  faFileCode,
  faFileCsv,
  faFileExcel,
  faFileExport,
  faFileImport,
  faFilePdf,
  faFileSpreadsheet,
  faFolder,
  faFolders,
  faGlobe,
  faHorizontalRule,
  faIdBadge,
  faInfo,
  faInfoCircle,
  faList,
  faMapMarked,
  faMinus,
  faNewspaper,
  faPen,
  faPhone,
  faPlus,
  faQuestionCircle,
  faSave,
  faSearch,
  faSortDown,
  faSortUp,
  faSquare,
  faStar,
  faSync,
  faTimes,
  faTimesCircle,
  faTrash
} from '@fortawesome/pro-light-svg-icons'
import {
  faApple,
  faDropbox,
  faFacebook,
  faFacebookF,
  faGoogle,
  faJira,
  faMicrosoft
} from '@fortawesome/free-brands-svg-icons'

(() => {
  library.add(
    faChevronDoubleLeft, faChevronDoubleRight, faChevronRight,
    faChevronLeft, faChevronUp, faChevronDown, faGlobe, faPlus, faFolder, faFolders, faStar, faStarSolid,
    faTimes, faArrowRight, faArrowLeft, faFile, faFileAlt, faFileCode, faFileCsv, faFileExcel, faFileExport,
    faFileImport, faFilePdf, faFileSpreadsheet, faIdBadge, faCheck, faExclamation, faCircle,
    faCheckCircle, faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple, faBars, faExternalLink,
    faPhone, faMapMarked, faSearch, faCog, faInfo, faHorizontalRule, faSync, faSquareFull,
    faCompress, faBook, faSortUp, faSortDown, faQuestionCircle, faEllipsisV, faMinus, faTimesCircle, faInfoCircle,
    faExclamationCircle, faTrash, faList, faSquare, faBell, faArrowToBottom, faArrowToTop, faSquareSolid, faBox,
    faBoxOpen, faNewspaper, faComment, faSave, faPen)
})()

/**
 * The following icons are solely used to support custom display expressions and should not be removed: faSquareSolid
 */

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
