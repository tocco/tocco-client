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
      fontSize = scale.font(props.theme, 5)
      break
    case 'H2':
      fontSize = scale.font(props.theme, 4)
      break
    case 'H3':
      fontSize = scale.font(props.theme, 3)
      break
    case 'H4':
      fontSize = scale.font(props.theme, 2)
      break
    case 'H5':
      fontSize = scale.font(props.theme, 1)
      break
    default:
      fontSize = scale.font(props.theme, 0)
  }
  return declareFont(props, {fontWeight: 700, fontSize})
}

const declareSpace = props => css`
    margin-top: ${scale.space(props.theme, 0)};
    margin-bottom: ${scale.space(props.theme, -1)};

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
