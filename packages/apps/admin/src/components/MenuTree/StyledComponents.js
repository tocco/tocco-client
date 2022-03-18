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

export const StyledExtendedSearchWrapper = styled.div`
  margin-top: -${scale.space(0.6)};
`

export const StyledTitle = styled.div`
  && {
    ${declareFont()}
    font-weight: ${theme.fontWeight('bold')};
  }
`

export const StyledMenuItemsWrapper = styled.div`
  position: relative;
  left: calc(1 * ${scale.space(0.75)}); // level one of indentation
`

export const StyledNoSearchResultsTxt = styled.div`
  ${declareFont()}
  font-style: italic;
`

export const StyledIconTitleWrapper = styled.div`
  position: relative;
  margin-bottom: ${scale.space(-1.2)};
  margin-top: ${scale.space(0.8)};
  margin-left: ${scale.space(0.8)};
`

export const StyledIconWrapper = styled.div`
  position: absolute;
  font-size: ${scale.font(2)};
  left: -${scale.space(1)};
`
