import styled from 'styled-components'
import {StyledSpan} from 'tocco-ui'

export const StyledPreviewBox = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`

export const StyledRelationBox = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 4px;
 
  display: grid;
  grid-template-columns: repeat(auto-fit, 140px);
  grid-row-gap: 1px;
  grid-column-gap: 10px;
  justify-content: center;
`

export const RelationLinks = styled.div`
    display: none;
    padding-left: 2px;
  
`

export const RelationBox = styled.div`
 height: 40px;
  border-radius: 10px;   

 ${({selected}) => selected && `
    background-color: #edf1f5;
    
    ${RelationLinks} {
      display: block;
  }
  `}

  text-align: center;
    
  &:hover ${RelationLinks} {
       display: block;
  }
  
    :hover{
    background-color: #DEE6ED;
    cursor: pointer;
  }
`

export const RelationLabel = styled(StyledSpan)`
  &&& {
  max-width: 110px;
  vertical-align: middle;
  }
`
