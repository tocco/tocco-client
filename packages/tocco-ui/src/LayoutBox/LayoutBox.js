import PropTypes from 'prop-types'
import React from 'react'

/**
 * Box with optional label to do layouting stuff
 */
const LayoutBox = props => {
  const classes = `layout-box ${props.alignment}`
  if (props.label) {
    return (
      <div className={classes + ' panel panel-default'}>
        <div className="panel-heading">{props.label}</div>
        <div className="panel-body">{props.children}</div>
      </div>
    )
  }

  return <div className={classes}>{props.children}</div>
}

LayoutBox.defaultProps = {alignment: 'vertical'}

LayoutBox.propTypes = {
  /**
   * Optional label/title of the box
   */
  label: PropTypes.string,
  /**
   * vertical or horizontal alignment of box
   */
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Content of box
   */
  children: PropTypes.node
}

export default LayoutBox
