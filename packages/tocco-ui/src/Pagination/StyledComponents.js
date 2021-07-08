import styled from 'styled-components'

import Button from '../Button'
import {scale} from '../'

export const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 5px;

  span {
    padding-right: 6px;
  }
`

export const StyledPaginationButton = styled(Button)`
  padding: ${scale.space(-2)} ${scale.space(-0.8)};
`
