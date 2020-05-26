import PropTypes from 'prop-types'
import React from 'react'
import QRCodeC from 'qrcode.react'

/**
 * Use
 */
const QRCode = ({value}) => <QRCodeC value={value} renderAs="svg"/>

QRCode.propTypes = {
  /**
   * If
   */
  value: PropTypes.string
}

export default QRCode
