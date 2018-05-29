import styled from 'styled-components'

const StyledItem = styled.li`
  position: relative;

  > ul {
    display: ${props => props.isOpen ? 'block' : 'none'}
  }
`

export default StyledItem
