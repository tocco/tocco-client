/* global classes:true */

import React from 'react'
import classNames from 'classnames'

const VerticalBox = props => {
  if (props.label) {
    return (
      <div className={classNames(classes.VerticalBox, 'panel', 'panel-default')}>
        <div className="panel-heading">{props.label}</div>
        <div className="panel-body">{props.children}</div>
      </div>
    )
  }

  return <div className={classes.VerticalBox}>{props.children}</div>
}

VerticalBox.propTypes = {
  label: React.PropTypes.string,
  children: React.PropTypes.node
}

export default VerticalBox
