import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue} from 'tocco-ui'

const ModalContent = props => {
  return (
    <div className="rrt-confirm-holder tocco-notifier__wrapper">
      <div className="rrt-confirm tocco-notifier__content--large">
        {(props.title || props.message)
        && <div style={{marginBottom: '10px'}}>
          {props.title
        && <header className="tocco-notifier__title">
            {props.title}
          </header>}
          {props.message
        && <div className="tocco-notifier__message">
            <FormattedValue type="html" value={props.message}/>
          </div>}
        </div>
        }
        <props.component close={() => props.close(props.id)}/>
      </div>
      <div className="shadow tocco-notifier__shadow"/>
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
