import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faApple,
  faDropbox,
  faFacebook,
  faFacebookF,
  faGoogle,
  faJira,
  faMicrosoft
} from '@fortawesome/free-brands-svg-icons'
import {
  faAbacus,
  faAddressCard,
  faArrowLeft,
  faArrowRight,
  faArrowToBottom,
  faArrowToTop,
  faBarcodeAlt,
  faBars,
  faBell,
  faBolt,
  faBoltLightning,
  faBook,
  faBox,
  faBoxOpen,
  faCalendarCheck,
  faCalendarMinus,
  faCalendarPlus,
  faChalkboardTeacher,
  faChartNetwork,
  faCheck,
  faCheckCircle,
  faChevronDoubleDown,
  faChevronDoubleLeft,
  faChevronDoubleRight,
  faChevronDoubleUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faCode,
  faCog,
  faComment,
  faCompress,
  faCube,
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
  faFilter,
  faFolder,
  faFolders,
  faGlobe,
  faHorizontalRule,
  faIdBadge,
  faInfo,
  faInfoCircle,
  faLaptopCode,
  faList,
  faLock,
  faMailBulk,
  faMapMarked,
  faMinus,
  faNewspaper,
  faPen,
  faPhone,
  faPhoneLaptop,
  faPlus,
  faQuestionCircle,
  faSave,
  faSearch,
  faSitemap,
  faSortDown,
  faSortUp,
  faSquare,
  faStar,
  faSync,
  faTasks,
  faTimes,
  faTimesCircle,
  faTrash,
  faUpload,
  faUsers
} from '@fortawesome/pro-light-svg-icons'
import {
  faPaperclip,
  faSquare as faSquareSolid,
  faSquareFull,
  faStar as faStarSolid
} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'

import {StyledFontAwesomeAdapterWrapper} from './StyledComponents'
;(() => {
  library.add(
    faChevronDoubleLeft,
    faChevronDoubleRight,
    faChevronRight,
    faChevronLeft,
    faChevronUp,
    faChevronDown,
    faGlobe,
    faPlus,
    faFolder,
    faFolders,
    faStar,
    faStarSolid,
    faTimes,
    faArrowRight,
    faArrowLeft,
    faFile,
    faFileAlt,
    faFileCode,
    faFileCsv,
    faFileExcel,
    faFileExport,
    faFileImport,
    faFilePdf,
    faFileSpreadsheet,
    faIdBadge,
    faCheck,
    faExclamation,
    faCircle,
    faCheckCircle,
    faGoogle,
    faFacebook,
    faFacebookF,
    faDropbox,
    faMicrosoft,
    faJira,
    faApple,
    faBars,
    faExternalLink,
    faPhone,
    faMapMarked,
    faSearch,
    faCog,
    faInfo,
    faHorizontalRule,
    faSync,
    faSquareFull,
    faCompress,
    faBook,
    faSortUp,
    faSortDown,
    faQuestionCircle,
    faEllipsisV,
    faMinus,
    faTimesCircle,
    faInfoCircle,
    faExclamationCircle,
    faTrash,
    faList,
    faSquare,
    faBell,
    faArrowToBottom,
    faArrowToTop,
    faSquareSolid,
    faBox,
    faBoxOpen,
    faNewspaper,
    faComment,
    faSave,
    faPen,
    faPaperclip,
    faAddressCard,
    faMailBulk,
    faSitemap,
    faBarcodeAlt,
    faAbacus,
    faCalendarCheck,
    faCalendarMinus,
    faCalendarPlus,
    faPhoneLaptop,
    faTasks,
    faChalkboardTeacher,
    faUsers,
    faChevronDoubleDown,
    faChevronDoubleUp,
    faCube,
    faChartNetwork,
    faBolt,
    faBoltLightning,
    faLaptopCode,
    faUpload,
    faLock,
    faCode,
    faFilter
  )
})()

/**
 * The following icons are solely used to support custom display expressions and should not be removed: faSquareSolid
 */

const FontAwesomeAdapter = ({icon, style, hasFixedWidth}) => (
  <StyledFontAwesomeAdapterWrapper>
    <FontAwesomeIcon
      icon={icon.includes(',') ? icon.replace(/\s+/, '').split(',') : icon}
      style={style}
      {...(_get(style, 'color') && {color: style.color})}
      fixedWidth={hasFixedWidth}
    />
  </StyledFontAwesomeAdapterWrapper>
)

FontAwesomeAdapter.defaultProps = {
  hasFixedWidth: true
}

FontAwesomeAdapter.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
  hasFixedWidth: PropTypes.bool
}

export default FontAwesomeAdapter
