import _get from 'lodash/get'
import styled, {css} from 'styled-components'
import {scale, StyledScrollbar, shadeColor, themeSelector} from 'tocco-ui'

const mobileStyles = styles => css`
  @media only screen and (max-width: 800px) {
    ${styles}
  }
`

export const StyledDashboardWrapper = styled.div`
  width: 100%;
  height: calc(100% - 75px); // ~75px the height of header and breadcrumbs
  background: ${themeSelector.color('paper')};
  padding: ${scale.space(-0.5)} ${scale.space(-2)} ${scale.space(-0.5)} ${scale.space(-0.5)};
  overflow-y: scroll;
  box-sizing: border-box;
  position: absolute;
  ${StyledScrollbar}
`

export const StyledColumnWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  ${mobileStyles(`
    display: block;
    flex-wrap: unset;
  `)}
`

export const StyledColumn = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  ${mobileStyles(`
    width: unset;
    display: block;
    flex-wrap: unset;
    align-content: unset;
  `)}
`

export const StyledInfoBoxWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: ${scale.space(-0.5)};
  ${mobileStyles(`width: auto;`)}
`

export const StyledResizeHandle = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 3)};
  opacity: ${({isReszing}) => (isReszing ? 1 : 0)};
  height: 3px;
  cursor: row-resize;
`
