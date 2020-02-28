import styled from 'styled-components'

const StyledItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  > ul {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`

export default StyledItem
