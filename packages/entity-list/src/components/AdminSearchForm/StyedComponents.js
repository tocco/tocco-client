import styled, {css} from 'styled-components'
import {scrollbarStyle, theme} from 'tocco-ui'

const BoxStyle = css`
  background-color: white;
  overflow-y: auto;
  padding: 4px;
  border: 1px solid grey;
  border-radius: ${theme.radii('regular')}
  ${scrollbarStyle}
`

export const AdminSearchGrid = styled.div`
  padding-left: 8px;
  display: grid;
  grid-row-gap: 10px;
  height: 100%;
  grid-template-rows: ${props => props.searchFilterExpanded ? 'auto' : 'fit-content(25%)'} 1fr;
  grid-template-areas:
    "searchFilter"
    "searchForm";
  overflow: hidden;
`

export const SearchFiterBox = styled.div`
  grid-area: searchFilter;  
  ${BoxStyle}
`
export const SearchFormBox = styled.div`
  grid-area: searchForm;  
  ${BoxStyle}
`
