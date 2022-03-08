import PropTypes from 'prop-types'
import QRCodeC from 'qrcode.react'
import React from 'react'

/**
 * Use to display a string as QR-Code Image.
 */
const QRCode = ({value}) => <QRCodeC value={value} renderAs="svg" />

QRCode.propTypes = {
  /**
   * Value that will be shown as qr-code. e.g. an Url.
   */
  value: PropTypes.string
}

export default QRCode
