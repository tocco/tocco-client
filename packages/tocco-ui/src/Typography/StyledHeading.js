import styled from 'styled-components'
import {theme} from 'styled-system'

import {declareFont} from '../utilStyles'

const declareHeaderFont = props => {
  let fontSize

  switch (props.styledLike) {
    case 'H1':
      fontSize = theme('fontSizes.7')(props)
      break
    case 'H2':
      fontSize = theme('fontSizes.6')(props)
      break
    case 'H3':
      fontSize = theme('fontSizes.5')(props)
      break
    case 'H4':
      fontSize = theme('fontSizes.4')(props)
      break
    case 'H5':
      fontSize = theme('fontSizes.3')(props)
      break
    default:
      fontSize = theme('fontSizes.2')(props)
  }

  return declareFont(props, {fontWeight: 700, fontSize: fontSize})
}

const declareSpace = props => {
  return `
    margin-top: ${theme('space.6')(props)};
    margin-bottom: ${theme('space.5')(props)};

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
}

const StyledH1 = styled.h1`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH2 = styled.h2`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH3 = styled.h3`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH4 = styled.h4`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH5 = styled.h5`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
  }
`

const StyledH6 = styled.h6`
  && {
    ${props => declareHeaderFont(props)}
    ${props => declareSpace(props)}
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
