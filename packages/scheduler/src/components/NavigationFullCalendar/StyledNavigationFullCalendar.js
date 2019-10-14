import styled from 'styled-components'
import {
  scale,
  StyledMenuButton,
  StyledItem
} from 'tocco-ui'

const StyledNavigationFullCalendar = styled.div`
  && {
   margin-top: 4px;
    margin-bottom: ${scale.space(-2)};

    > ${StyledMenuButton} {
      display: flex;

      > ${StyledItem}:nth-child(3) {
        flex-grow: 1;
      }
    }
  }
`

export default StyledNavigationFullCalendar
