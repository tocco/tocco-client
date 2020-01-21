import styled from 'styled-components'
import {StyledSpan, theme, scale} from 'tocco-ui'

export const StyledPreviewBox = styled.div`
  background-color: ${theme.color('paper')};
  padding: ${scale.space(-1)};
  margin-top: ${scale.space(-1)};
`

export const StyledRelationBox = styled.div`
  background-color: ${theme.color('paper')};
  padding: ${scale.space(-1)};
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-row-gap: ${scale.space(-3.5)};
  grid-column-gap: ${scale.space(-2)};
  justify-content: space-between;
`

export const RelationLinks = styled.div`
  display: none;
  margin-left: auto;;
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
    * {color: ${({selected}) => selected && theme.color('paper')}};};
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
      * {color: ${theme.color('paper')}}
      cursor: pointer;
    }
  }
`

export const RelationLabel = styled(StyledSpan)`
  &&& {
    max-width: 110px;
  }
`
