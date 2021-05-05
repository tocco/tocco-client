import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown, faAngleRight, faAngleLeft, faAngleUp, faStar as faStarFilled, faExclamation,
  faFolder, faPhone, faSquare,
  faPaperclip as LegacyPaperclip, faAsterisk as LegacyAsterisk, faChartBar as LegacyChartBar,
  faExclamationCircle as LegacyExclamationCircle, faTimesCircle as LegacyTimesCircle, faPencil as LecacyPencil,
  faChevronCircleRight
} from '@fortawesome/pro-solid-svg-icons'
import {
  faChevronDoubleLeft, faChevronDoubleRight, faChevronRight, faChevronLeft, faChevronUp, faChevronDown, faGlobe, faPlus,
  faFolders, faStar, faTimes, faArrowRight, faArrowLeft, faListUl, faFileAlt, faFileCode, faFileCsv,
  faFileExcel, faFileExport, faFileImport, faFilePdf, faFileSpreadsheet, faIdBadge, faCheck, faMapMarked, faSearch,
  faCog, faBars, faInfo, faCompress, faBook, faSortDown, faSortUp, faQuestionCircle, faEllipsisV, faBell
} from '@fortawesome/pro-regular-svg-icons'
import {
  faTimes as faTimesLight, faCircle, faHorizontalRule, faSync, faMinus, faTimesCircle, faInfoCircle,
  faCheckCircle, faExclamationCircle, faTrash, faDownload, faUpload,
  faExternalLink, faFile
} from '@fortawesome/pro-light-svg-icons'
import {faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple}
  from '@fortawesome/free-brands-svg-icons'
(() => {
  library.add(
    faAngleDown, faAngleRight, faAngleLeft, faAngleUp, faChevronDoubleLeft, faChevronDoubleRight, faChevronRight,
    faChevronLeft, faChevronUp, faChevronDown, faGlobe, faPlus, faFolder, faFolders, faStarFilled, faStar, faTimes,
    faArrowRight, faArrowLeft, faListUl, faFile, faFileAlt, faFileCode, faFileCsv, faFileExcel, faFileExport,
    faFileImport, faFilePdf, faFileSpreadsheet, faIdBadge, faCheck, faExclamation, faTimesLight, faCircle,
    faCheckCircle, faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple, faBars, faExternalLink,
    faPhone, faMapMarked, faSearch, faCog, faDownload, faUpload, faInfo, faHorizontalRule, faSync, faSquare,
    faCompress, faBook, faSortUp, faSortDown, faQuestionCircle, faEllipsisV, faMinus, faTimesCircle, faInfoCircle,
    faExclamationCircle, faTrash, faBell)

  library.add(
    LegacyPaperclip, LegacyAsterisk, LegacyChartBar, LegacyExclamationCircle, LegacyTimesCircle,
    LecacyPencil, faChevronCircleRight)
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
