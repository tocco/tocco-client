import styled, {css} from 'styled-components'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText,
  scale
} from '../utilStyles'

const declareHeaderFont = props => {
  let fontSize

  switch (props.styledLike) {
    case 'H1':
      fontSize = scale.font(5)(props)
      break
    case 'H2':
      fontSize = scale.font(4)(props)
      break
    case 'H3':
      fontSize = scale.font(3)(props)
      break
    case 'H4':
      fontSize = scale.font(2)(props)
      break
    case 'H5':
      fontSize = scale.font(1)(props)
      break
    default:
      fontSize = scale.font(0)(props)
  }
  return declareFont({fontWeight: 700, fontSize})
}

const declareSpace = props => css`
    margin-top: ${scale.space(0)};
    margin-bottom: ${scale.space(-1)};

    h1 + &,
    h2 + &,
    h3 + &,
    h4 + &,
    h5 + &,
    h6 + & {
      margin-top: 0;
    }

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  `

const StyledH1 = styled.h1`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledH2 = styled.h2`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledH3 = styled.h3`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledH4 = styled.h4`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledH5 = styled.h5`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

const StyledH6 = styled.h6`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
    ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}
  }
`

export {
  StyledH1,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledH5,
  StyledH6
}
