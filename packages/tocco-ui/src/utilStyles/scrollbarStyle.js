import {css} from 'styled-components'

export default css`
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #878787;
    border-radius: 10px;
  }
  
  scrollbar-color: #878787 #253653; // Firefox workaround
  scrollbar-width: thin;
`
