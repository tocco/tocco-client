import styled from 'styled-components'
import {StyledSpan, theme, scale, StyledScrollbar} from 'tocco-ui'

import {StyledLink} from '../../../../components/StyledLink'

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
  flex: auto;

  ${StyledLink} {
    padding-left: ${scale.space(-0.5)};

    &:nth-child(2) {
      padding-left: ${scale.space(-1.1)};
    }
  }
`

export const StyledRelationBox = styled.div`
  background-color: ${theme.color('paper')};
  padding: ${scale.space(-1)};
  display: grid;
  grid-template-columns: repeat(auto-fit, 170px);
  grid-gap: ${scale.space(-2)};
  justify-content: space-between;
  overflow-y: auto;
  ${StyledScrollbar}
`

export const RelationLinks = styled.div`
  display: none;
  margin-left: auto;

  * {
    color: ${theme.color('text')};
    padding-left: ${scale.space(-2)};
  }
`

export const RelationBox = styled.div`
  border-radius: ${theme.radii('large')};
  padding: ${scale.space(-2.7)} ${scale.space(-1)};
  display: flex;
  background-color: ${({selected}) => selected && theme.color('secondary')};

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
`

export const RelationLabel = styled(StyledSpan)`
  && {
    max-width: 110px;
  }
`
