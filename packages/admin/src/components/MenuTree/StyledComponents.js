import styled from 'styled-components'
import {declareFont, scale, theme} from 'tocco-ui'

export const StyledMenuEntry = styled.div`
  ${declareFont()}
  position: relative;

  && {
    padding-left: calc(${({level}) => level} * ${scale.space(0.75)});
    line-height: ${theme.lineHeight('light')};
  }
  ${({childrenCount}) => childrenCount === 0 && 'margin-bottom: 0 !important'}
`

export const StyledMenuEntryWrapper = styled.div`
  margin-bottom: ${scale.space(0.6)};
  margin-top: ${scale.space(0.6)};

  > div {
    margin-bottom: ${scale.space(0.5)};
  }
`
