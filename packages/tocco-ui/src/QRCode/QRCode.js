import PropTypes from 'prop-types'
import React from 'react'
import QRCodeC from 'qrcode.react'

/**
 * Use to display a string as QR-Code Image.
 */
const QRCode = ({value}) => <QRCodeC value={value} renderAs="svg"/>

QRCode.propTypes = {
  /**
   * Value that will be shown as qr-code. e.g. an Url.
   */
  value: PropTypes.string
}

export default QRCode
