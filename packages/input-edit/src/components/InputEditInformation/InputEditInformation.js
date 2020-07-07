import React from 'react'
import PropTypes from 'prop-types'
import {field} from 'tocco-app-extensions'
import {StatedValue} from 'tocco-ui'

import {StyledInputEditInformation} from './StyledInputEditInformation'

const InputEditInformation = ({information}) => (
  <StyledInputEditInformation>
    {information.map(info => {
      const Field = field.factory('readOnly', info.type)
      return <StatedValue key={info.id} label={info.label} immutable={true} hasValue={true}>
        <Field
          formField={{
            dataType: info.type
          }}
          value={info.value}
        />
      </StatedValue>
    })}
  </StyledInputEditInformation>
)

InputEditInformation.propTypes = {
  information: PropTypes.array.isRequired
}

export default InputEditInformation
