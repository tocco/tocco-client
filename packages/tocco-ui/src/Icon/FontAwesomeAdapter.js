import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple}
  from '@fortawesome/free-brands-svg-icons'

(() => {
  library.add(faGoogle, faFacebook, faFacebookF, faDropbox, faMicrosoft, faJira, faApple)
  library.add(far)
  library.add(fas)
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
