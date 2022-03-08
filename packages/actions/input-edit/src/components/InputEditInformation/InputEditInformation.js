import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {field} from 'tocco-app-extensions'
import {StatedValue} from 'tocco-ui'

import {StyledInputEditInformation} from './StyledInputEditInformation'

const StyledStatedValueWrapper = styled.div`
  & > div > div > span {
    display: inline-block;
    margin-top: 5px;
    padding-bottom: 3px;
  }
`

const InputEditInformation = ({information}) => (
  <StyledInputEditInformation>
    {information.map(info => {
      const Field = field.factory('readOnly', info.type)
      return (
        <StyledStatedValueWrapper key={info.id}>
          <StatedValue key={info.id} label={info.label} immutable={true} hasValue={true}>
            <Field
              formField={{
                dataType: info.type
              }}
              value={info.value}
            />
          </StatedValue>
        </StyledStatedValueWrapper>
      )
    })}
  </StyledInputEditInformation>
)

InputEditInformation.propTypes = {
  information: PropTypes.array.isRequired
}

export default InputEditInformation
