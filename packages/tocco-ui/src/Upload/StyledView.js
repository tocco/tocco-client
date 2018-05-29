import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledView = styled.div`
    display: inline-block;
    position: relative;

    > div {
      position: absolute;
      top: ${theme('space.4')};
      right: ${theme('space.4')};
      left: ${theme('space.4')};
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      align-content: space-between;
      opacity: 0;
      transition: opacity 300ms;
    }

    &:hover > div {
      opacity: 1;
    }
`

export default StyledView
