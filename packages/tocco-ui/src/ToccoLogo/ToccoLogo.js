import React from 'react'
import './ToccoLogo.scss'
import classNames from 'classnames'

/**
 * Shows the red circle (tocco logo) with a link to the homepage. More of an example but feel free to use.
 */
const ToccoLogo = props => {
  const logo = require('./tocco.png')
  return (
    <a
      className={classNames('tocco-logo ', props.className)}
      href="http://www.tocco.ch"
      target="_blank"
      title="Tocco AG"
    >
      <img src={logo}/>
    </a>
  )
}

ToccoLogo.propTypes = {
  /**
   * Extend the logo with any css classes separated by a space
   */
  className: React.PropTypes.string
}

export default ToccoLogo
