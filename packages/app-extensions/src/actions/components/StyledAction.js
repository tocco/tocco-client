import styled from 'styled-components'
import {scale} from 'tocco-ui'

export const StyledAction = styled.span`
  && {
    :not(:last-child) {
      margin: 0 ${scale.space(-1)} ${scale.space(-1)} 0;
      display: inline-block;
    }
  }
`
