import styled from 'styled-components'
import {AdminLink as StyledLink, StyledSpan, theme, scale, StyledScrollbar} from 'tocco-ui'

export const StyledRelationsViewWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const StyledPreviewBox = styled.div`
  background-color: ${theme.color('paper')};
  padding: ${scale.space(-1)};
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const StyledRelationBox = styled.div`
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

export const RelationLinks = styled.div`
  display: none;
  margin-left: auto;

  * {
    color: ${theme.color('text')};
    padding-left: ${scale.space(-4.5)};
  }
`

export const RelationBox = styled.div`
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
  ${({selected}) => selected && `
    ${RelationLinks} {
      display: flex;
    }
    `
  };

  // allow hover styles only on non-touch devices
  @media (hover: hover) and (pointer: fine) {
    &:hover ${RelationLinks} {
      display: flex;
    }

    && {
      :hover{
        background-color: ${theme.color('secondaryLight')};

        * {
          color: ${theme.color('paper')};
        }
        cursor: pointer;
      }
    }

    ${/* sc-selector */StyledLink}:hover * {
      color: ${theme.color('secondary')};
    }
  }
`

export const RelationLabel = styled(StyledSpan)`
  && {
    max-width: 110px;
  }
`
