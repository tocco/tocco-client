import styled from 'styled-components'
import {
  declareFont,
  scale
} from 'tocco-ui'

export const StyledMergeStrategyAnswer = styled.div`
  && {
    max-width: 400px;

    input[type="checkbox"],
    input[type="radio"] {
      margin-right: ${scale.space(-2)};
    }
  }
`

export const StyledMergeStrategyLabel = styled.label`
  && {
    ${declareFont()}
    margin: 0 0 ${scale.space(-2)};
  }
`
