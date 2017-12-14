
import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'

const SingleAction = ({definition, onClick}) => {
  return (
    <Button
      onClick={e => {
        onClick(definition)
        e.stopPropagation()
      }}
      icon={definition.icon}
      {...definition.label && definition.useLabel === 'NO' ? {title: definition.label} : {label: definition.label}}
      {...definition.readOnly === true && {disabled: true}}
    />
  )
}

SingleAction.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default SingleAction
