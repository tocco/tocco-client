import styled from 'styled-components'

import {StyledButton} from '../Button'
import {scale} from '../utilStyles'

export const StyledView = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${scale.space(-2)};
`

export const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  ${StyledButton} {
    margin: 0;
    border-radius: 50%;
    padding: ${scale.space(-2)};

    a:hover {
      color: unset;
    }
  }
`
