import styled from 'styled-components'
import {
  spaceScale,
  StyledMenuButton,
  StyledItem
} from 'tocco-ui'

const StyledNavigationFullCalendar = styled.div`
  && {
    margin-bottom: ${props => spaceScale(props, -2)};

    > ${StyledMenuButton} {
      display: flex;

      > ${StyledItem}:nth-child(3) {
        flex-grow: 1;

        > h3 {
          text-align: center;
          width: 100%;
        }
      }
    }
  }
`

export default StyledNavigationFullCalendar
