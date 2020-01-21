import styled from 'styled-components'
import {
  scale
} from 'tocco-ui'

const StyledNavigationFullCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${scale.space(-2)};
  
  > div {
    display: flex;
    align-items: center;
    > * {
      margin-left: ${scale.space(-2)};
    }
  }
`

export default StyledNavigationFullCalendar
