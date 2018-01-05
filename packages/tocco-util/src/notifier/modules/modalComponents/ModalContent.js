import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue} from 'tocco-ui'

const ModalContent = props => {
  return (
    <div className="notifier-background">
      <div className="notifier-box">
        <div>
          <h1>{props.title}</h1>
        </div>
        <div>
          <FormattedValue type="html" value={props.message}/>
        </div>
        <div className="notifier-content">
          <props.component close={() => props.close(props.id)}/>
        </div>
      </div>
    </div>
  )
}

ModalContent.propTypes = {
  id: PropTypes.any.isRequired,
  component: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]).isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string
}

export default ModalContent
