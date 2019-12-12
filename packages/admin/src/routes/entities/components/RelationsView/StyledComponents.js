import styled from 'styled-components'
import {StyledSpan, theme} from 'tocco-ui'

export const StyledPreviewBox = styled.div`
  background-color: white;
  padding: 1rem;
  margin-top: 1rem;
`

export const StyledRelationBox = styled.div`
  background-color: white;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  justify-content: space-between;
`

export const RelationLinks = styled.div`
  display: none;
  margin-left: auto;;
  * {
    color: ${theme.color('text')};
    padding-left: .5rem;
  }
`

export const RelationBox = styled.div`
  border-radius: ${theme.radii('large')};
  padding: .3rem 1rem;
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
