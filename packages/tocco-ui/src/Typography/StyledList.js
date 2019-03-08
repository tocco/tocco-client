import styled from 'styled-components'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText,
  scale
} from '../utilStyles'

const StyledDd = styled.dd`
  && {
    ${props => declareFont(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin: 0;
  }
`

const StyledDl = styled.dl`
  && {
    margin: 0 0 ${props => scale.space(props, -1)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledDt = styled.dt`
  && {
    ${props => declareFont(props, {fontWeight: 700})}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
    margin: 0;
  }
`

const StyledLi = styled.li`
  && {
    ${props => declareFont(props)}
    ${declareWrappingText()}
  }
`

const StyledList = styled.ol`
  && {
    display: block;
    list-style-position: outside;
    margin: 0 0 ${props => scale.space(props, -1)} 1.6rem;
    padding: 0;

    & &,
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledOl = styled(StyledList)`
  list-style-type: decimal;
`

const StyledUl = styled(StyledList)`
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
