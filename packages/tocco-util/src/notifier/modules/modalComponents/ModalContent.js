import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'

import {Content} from '../../components/TitleMessage'
import {StyledModelContent} from './StyledModelContent'

const ModalContent = props => {
  return (
    <div className="rrt-confirm-holder">
      <StyledModelContent>
        {props.title && <Content content={props.title} isTitle={true} />}
        {props.message && <Content content={props.message} />}
        {props.closable && <Button onClick={() => props.close(props.id)} look="raised" dense icon="times"/> }
        <props.component close={() => props.close(props.id)}/>
      </StyledModelContent>
      <div className="shadow" onClick={() => { if (props.closable === true) { props.close(props.id) } }}/>
    </div>
  )
}

ModalContent.propTypes = {
  id: PropTypes.any.isRequired,
  component: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]).isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  closable: PropTypes.bool
}

export default ModalContent
