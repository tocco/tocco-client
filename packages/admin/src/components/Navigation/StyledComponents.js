import styled, {css} from 'styled-components'
import {theme, StyledScrollbar, scale, StyledSearchBox, Ball, declareFont} from 'tocco-ui'

const secondary = theme.color('secondary')
const secondaryLight = theme.color('secondaryLight')

export const StyledNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;

  ${StyledSearchBox} {
    margin: ${scale.space(0.2)} ${scale.space(1.25)} ${scale.space(0.5)} ${scale.space(0.5)};
  }
`

export const StyledMenuEntry = styled.span`
  display: inline-block;
  color: ${theme.color('text')};
  font-weight: ${theme.fontWeight('bold')};
  margin-bottom: ${scale.space(-1.2)};
  margin-top: ${scale.space(-1.2)};
`

export const StyledTabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${scale.space(-0.37)};
  padding: 0 ${scale.space(0.6)};
  border-bottom: 3px solid ${theme.color('backgroundBody')};

  &:focus {
    background-color: transparent;
  }
`

export const StyledActiveTabLabel = styled.div`
  ${declareFont({
    fontSize: scale.font(2.9),
    fontWeight: theme.fontWeight('bold'),
    color: theme.color('secondary')
  })}
  flex-grow: 1;
`

export const StyledNavIconButton = styled(Ball)`
  overflow: hidden;
  flex: ${({narrow}) => narrow ? 0.2 : 1};
  justify-content: center;
  border-radius: 0;
  margin: ${scale.space(-0.7)};
  border-top: 5px solid ${({active}) => active ? secondary : 'transparent'};
  font-weight: ${theme.fontWeight('bold')};
  font-size: ${scale.font(3)};
  padding-top: ${scale.space(-1.1)};
  padding-bottom: cal(${scale.space(-1.1)} - 5px); /* subtract border-top width of 5px */
  ${({active}) => active
    && css`color: ${secondary};`
  };

  &:hover {
    border-color: ${({active}) => active ? secondary : secondaryLight};
    background-color: transparent;
    color: ${({active}) => active ? secondary : secondaryLight};
  }

  &:focus {
    background-color: transparent;
  }

  & > * {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const StyledSearchBoxWrapper = styled.div`
  height: 50px;
  padding-bottom: ${scale.space(-0.5)};
`

export const StyledMenuWrapper = styled.div`
  height: 100%;
  overflow: auto;
  padding: ${scale.space(0.6)} ${scale.space(0.6)} 0 ${scale.space(0.6)};
  ${StyledScrollbar}
`

export const StyledMenuButtonsWrapper = styled.div`
  position: absolute;
  right: ${scale.space(0.6)};
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding: 0;
`

export const StyledMenuButton = styled(Ball)`
  font-size: ${scale.font(0)};
  justify-content: center;
  border-radius: 0;
  padding: 0;

  &:hover,
  &:focus {
    background-color: transparent;
    color: ${secondaryLight};
  }
`
