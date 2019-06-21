import styled from 'styled-components'
import {scale} from 'tocco-ui'

export const StyledMergeStrategyAnswer = styled.div`
  && {
    max-width: 400px;

    input[type="checkbox"],
    input[type="radio"] {
      margin-right: ${scale.space(-2)};
    }
  }
`
