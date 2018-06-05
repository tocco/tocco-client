import styled from 'styled-components'
import {theme} from 'styled-system'

import {declareFont} from '../utilStyles'

const StyledDd = styled.dd`
  && {
    ${props => declareFont(props)}
    margin: 0;
  }
`

const StyledDl = styled.dl`
  && {
    margin: 0 0 ${props => theme('space.5')};
  }
`

const StyledDt = styled.dt`
  && {
    ${props => declareFont(props, {fontWeight: 700})}
    margin: 0;
  }
`

const StyledLi = styled.li`
  && {
    ${props => declareFont(props)}
  }
`

const StyledList = styled.ol`
  && {
    display: block;
    list-style-position: outside;
    margin: 0 0 ${props => theme('space.5')} 1.25rem;
    padding: 0;

    & & {
      margin-bottom: 0;
    }
  }
`

const StyledOl = StyledList.extend`
  list-style-type: decimal;
`

const StyledUl = StyledList.withComponent('ul').extend`
  && {
    list-style-type: disc;
  }
`

export {
  StyledDd,
  StyledDl,
  StyledDt,
  StyledLi,
  StyledOl,
  StyledUl
}
