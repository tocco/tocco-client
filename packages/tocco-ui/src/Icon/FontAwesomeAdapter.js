import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown, faAngleRight, faAngleLeft, faAngleUp, faStar as faStarFilled, faExclamation, faCheckCircle,
  faExternalLink, faPhone, faSquare,
  faPaperclip as LegacyPaperclip, faAsterisk as LegacyAsterisk, faChartBar as LegacyChartBar,
  faExclamationCircle as LegacyExclamationCircle, faTimesCircle as LegacyTimesCircle, faPencil as LecacyPencil,
  faChevronCircleRight
} from '@fortawesome/pro-solid-svg-icons'
import {
  faChevronDoubleLeft, faChevronDoubleRight, faChevronRight, faChevronLeft, faChevronUp, faChevronDown, faPlus,
  faFolders, faStar, faTimes, faArrowRight, faArrowLeft, faListUl, faFile, faFileAlt, faFileCode, faFileCsv,
  faFileExcel, faFileExport, faFileImport, faFilePdf, faFileSpreadsheet, faIdBadge, faCheck, faMapMarked, faSearch,
  faCog, faBars, faDownload, faUpload, faInfo, faCompress, faBook, faSortDown, faSortUp, faQuestionCircle, faEllipsisV
} from '@fortawesome/pro-regular-svg-icons'
import {faTimes as faTimesLight, faCircle, faHorizontalRule, faSync, faMinus} from '@fortawesome/pro-light-svg-icons'
import {faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple}
  from '@fortawesome/free-brands-svg-icons'
(() => {
  library.add(
    faAngleDown, faAngleRight, faAngleLeft, faAngleUp, faChevronDoubleLeft, faChevronDoubleRight, faChevronRight,
    faChevronLeft, faChevronUp, faChevronDown, faPlus, faFolders, faStarFilled, faStar, faTimes, faArrowRight,
    faArrowLeft, faListUl, faFile, faFileAlt, faFileCode, faFileCsv, faFileExcel, faFileExport, faFileImport, faFilePdf,
    faFileSpreadsheet, faIdBadge, faCheck, faExclamation, faTimesLight, faCircle, faCheckCircle, faGoogle, faFacebook,
    faFacebookF, faDropbox, faMicrosoft, faJira, faApple, faBars, faExternalLink, faPhone, faMapMarked, faSearch, faCog,
    faDownload, faUpload, faInfo, faHorizontalRule, faSync, faSquare, faCompress, faBook, faSortUp, faSortDown,
    faQuestionCircle, faEllipsisV, faMinus)

  library.add(
    LegacyPaperclip, LegacyAsterisk, LegacyChartBar, LegacyExclamationCircle, LegacyTimesCircle,
    LecacyPencil, faChevronCircleRight)
})()

const FontAwesomeAdapter = ({icon, style}) =>
  <FontAwesomeIcon
    icon={icon.includes(',') ? icon.replace(/\s+/, '').split(',') : icon}
    style={style}
    {..._get(style, 'color') && {color: style.color}}
  />

FontAwesomeAdapter.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default FontAwesomeAdapter
