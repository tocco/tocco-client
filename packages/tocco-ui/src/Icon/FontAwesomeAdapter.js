import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown, faAngleRight, faAngleLeft, faAngleUp, faStar as faStarFilled, faExclamation, faCheckCircle,
  faExternalLink, faPhone
} from '@fortawesome/pro-solid-svg-icons'
import {
  faChevronDoubleLeft, faChevronDoubleRight, faChevronRight, faChevronLeft, faChevronUp, faChevronDown, faPlus,
  faFolders, faStar, faTimes, faArrowRight, faArrowLeft, faListUl, faFile, faFileAlt, faFileExcel, faFilePdf,
  faIdBadge, faCheck, faMapMarked, faSearch, faCog, faBars, faDownload, faUpload, faInfo
} from '@fortawesome/pro-regular-svg-icons'
import {faTimes as faTimesLight, faCircle, faHorizontalRule, faSync} from '@fortawesome/pro-light-svg-icons'
import {faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple}
  from '@fortawesome/free-brands-svg-icons'
(() => {
  library.add(
    faAngleDown, faAngleRight, faAngleLeft, faAngleUp, faChevronDoubleLeft, faChevronDoubleRight, faChevronRight,
    faChevronLeft, faChevronUp, faChevronDown, faPlus, faFolders, faStarFilled, faStar, faTimes, faArrowRight,
    faArrowLeft, faListUl, faFile, faFileAlt, faFileExcel, faFilePdf, faIdBadge, faCheck, faExclamation, faTimesLight,
    faCircle, faCheckCircle, faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple, faBars,
    faExternalLink, faPhone, faMapMarked, faSearch, faCog, faDownload, faUpload, faInfo, faHorizontalRule, faSync)
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
