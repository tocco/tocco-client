import React from 'react'
import classNames from 'classnames'

const HorizontalBox = props => {
  if (props.label) {
    return (
      <div className={classNames(classes.HorizontalBox, 'panel', 'panel-default')}>
        <div className="panel-heading">{props.label}</div>
        <div className="panel-body">{props.children}</div>
      </div>
    )
  }

  return <div className={classes.HorizontalBox}>{props.children}</div>
}

HorizontalBox.propTypes = {
  label: React.PropTypes.string,
  children: React.PropTypes.node
}

export default HorizontalBox
