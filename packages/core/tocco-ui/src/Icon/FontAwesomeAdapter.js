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
  faArrowUpLong,
  faBallotCheck,
  faBarcodeAlt,
  faBars,
  faBell,
  faBolt,
  faBoltLightning,
  faBook,
  faBox,
  faBoxOpen,
  faCalendar,
  faCalendarArrowDown,
  faCalendarCircleUser,
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
  faCircleNotch,
  faCode,
  faCog,
  faComment,
  faCompress,
  faCube,
  faEllipsisV,
  faEnvelope,
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
  faLink,
  faList,
  faListCheck,
  faLock,
  faMailBulk,
  faMapMarked,
  faMerge,
  faMinus,
  faNewspaper,
  faPen,
  faPenField,
  faPercent,
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
  faSquarePlus,
  faSquareMinus,
  faStar,
  faSync,
  faTasks,
  faTimes,
  faTimesCircle,
  faTrash,
  faUpload,
  faUsers,
  faLightbulbExclamation,
  faHouseBlank,
  faFloppyDiskCircleXmark
} from '@fortawesome/pro-light-svg-icons'
import {
  faCircleNotch as faCircleNotchSolid,
  faPaperclip,
  faSquare as faSquareSolid,
  faSquareFull,
  faStar as faStarSolid
} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import _get from 'lodash/get'
import PropTypes from 'prop-types'

import {StyledFontAwesomeAdapterWrapper} from './StyledComponents'
;(() => {
  library.add(
    faCircleNotchSolid,
    faCircleNotch,
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
    faArrowUpLong,
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
    faEnvelope,
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
    faListCheck,
    faSquare,
    faSquarePlus,
    faSquareMinus,
    faBell,
    faArrowToBottom,
    faArrowToTop,
    faBallotCheck,
    faSquareSolid,
    faBox,
    faBoxOpen,
    faNewspaper,
    faComment,
    faSave,
    faPen,
    faPenField,
    faPaperclip,
    faAddressCard,
    faMailBulk,
    faSitemap,
    faBarcodeAlt,
    faAbacus,
    faCalendar,
    faCalendarArrowDown,
    faCalendarCircleUser,
    faCalendarCheck,
    faCalendarMinus,
    faCalendarPlus,
    faPercent,
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
    faFilter,
    faLightbulbExclamation,
    faMerge,
    faLink,
    faHouseBlank,
    faFloppyDiskCircleXmark
  )
})()

/**
 * The following icons are solely used to support custom display expressions and should not be removed: faSquareSolid
 */

const FontAwesomeAdapter = ({icon, style, hasFixedWidth, ...otherProps}) => {
  const iconProp = icon.includes(',') ? icon.replace(/\s+/, '').split(',') : icon
  const iconColorProps = {...(_get(style, 'color') && {color: style.color})}

  const actualIcon = Array.isArray(iconProp) ? iconProp[1] : iconProp

  return (
    <StyledFontAwesomeAdapterWrapper>
      <FontAwesomeIcon
        icon={iconProp}
        style={style}
        {...iconColorProps}
        fixedWidth={hasFixedWidth}
        {...otherProps}
        data-testid={`icon-${actualIcon}`}
      />
    </StyledFontAwesomeAdapterWrapper>
  )
}

FontAwesomeAdapter.defaultProps = {
  hasFixedWidth: true
}

FontAwesomeAdapter.propTypes = {
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
  hasFixedWidth: PropTypes.bool
}

export default FontAwesomeAdapter
