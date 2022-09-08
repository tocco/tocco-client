import styled from 'styled-components'
import {
  AdminLink as StyledLink,
  StyledSpan,
  theme,
  scale,
  StyledScrollbar,
  Button,
  declareFont,
  nonTouchDeviceOnlyStyles
} from 'tocco-ui'

export const StyledRelationsViewWrapper = styled.div`
  display: ${({isRightPaneCollapsed}) => (isRightPaneCollapsed ? 'none' : 'flex')};
  height: 100%;
  flex-direction: column;
`

export const StyledPlaceHolder = styled.div`
  display: ${({isRightPaneCollapsed}) => (isRightPaneCollapsed ? 'flex' : 'none')};
  flex: 1;
  height: 100%;
  width: 25px;
  background: ${theme.color('paper')};
  padding-top: ${scale.space(-1.5)};
  padding-left: ${scale.space(-2.5)};
  align-items: flex-start;

  &:hover {
    cursor: pointer;
  }
`

export const StyledToggleCollapse = styled.div`
  display: flex;
  background-color: ${theme.color('paper')};
  padding-top: ${scale.space(-1.5)};
  padding-bottom: ${scale.space(-1.5)};
`

export const StyledToggleCollapseButton = styled(Button)`
  font-size: ${scale.font(0)};
  padding: 0;
  margin-left: auto;

  &:hover,
  ${/* sc-selector */ StyledPlaceHolder}:hover & {
    background-color: transparent;
    color: ${theme.color('secondaryLight')};
  }
`

export const StyledPreviewBox = styled.div`
  background-color: ${theme.color('paper')};
  padding: ${scale.space(-1)};
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const StyledRelationBoxes = styled.div`
  background-color: ${theme.color('paper')};
  padding: ${scale.space(-1)};
  display: grid;
  grid-template-columns: repeat(auto-fit, 170px);
  grid-gap: ${scale.space(-2)};
  justify-content: space-between;
  overflow-y: auto;
  align-content: flex-start;
  height: fit-content;
  min-height: 150px;
  max-height: 20%;
  ${StyledScrollbar}
`

export const StyledPreviewLink = styled(StyledLink)`
  padding-left: ${scale.space(-0.5)};

  &:nth-child(2) {
    padding-left: 0;
  }
`

export const StyledRelationLinks = styled.div`
  display: none;
  margin-left: auto;

  * {
    color: ${theme.color('text')};
    padding-left: ${scale.space(-4.5)};
  }
`

export const StyledRelationBox = styled.div`
  border-radius: ${theme.radii('large')};
  padding: ${scale.space(-2.7)} ${scale.space(-1)};
  display: flex;
  background-color: ${({selected}) => selected && theme.color('secondary')};
  height: fit-content;

  &&& {
    * {
      color: ${({selected}) => selected && theme.color('paper')};
      box-sizing: initial;
    }
  }
  ${({selected}) =>
    selected &&
    `
    ${StyledRelationLinks} {
      display: flex;
    }
    `};

  /* allow hover styles only on non-touch devices */
  ${nonTouchDeviceOnlyStyles(`
    &:hover ${StyledRelationLinks} {
      display: flex;
    }

    && {
      :hover {
        background-color: ${theme.color('secondaryLight')};

        * {
          color: ${theme.color('paper')};
        }
        cursor: pointer;
      }
    }

    ${/* sc-selector */ StyledLink}:hover * {
      color: ${theme.color('secondary')};
    }
  `)}
`

export const StyledRelationLabel = styled(StyledSpan)`
  && {
    max-width: 110px;
  }
`

export const StyledCountLabel = styled.span`
  ${declareFont()}
`
