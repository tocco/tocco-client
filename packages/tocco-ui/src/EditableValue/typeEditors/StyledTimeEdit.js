import styled from 'styled-components'

const StyledTimeEdit = styled.div`
  && {
     display: flex;
     flex-flow: row nowrap;
     
    > input {
      flex-grow: 1;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      
      &::-ms-clear {
        display: none;
      }  
      &::-webkit-clear-button {
        display: none;
      }        
    }
          
    > button {
      border: #CCCCCC 1px solid;
      border-left: 0;
      padding: 9px 14px;
      background-color: #EEEEEE;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    
  }
`

export default StyledTimeEdit
