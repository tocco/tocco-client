import styled from 'styled-components'

import {scale} from '../'
import Button from '../Button'

export const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: ${scale.space(-1)};
  margin-left: 5px;

  span {
    padding-right: 6px;
  }
`

export const StyledPaginationButton = styled(Button)`
  padding: ${scale.space(-2)} ${scale.space(-0.8)};
`
