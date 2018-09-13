import styled from 'styled-components'
import {theme} from 'styled-system'
import {StyledMenuButton, StyledItem} from 'tocco-ui'

const StyledFullCalendar = styled.div`
  && {
    margin-bottom: ${props => theme('space.3')};

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

export default StyledFullCalendar
