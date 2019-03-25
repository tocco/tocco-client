import styled from 'styled-components'
import {theme} from 'styled-system'

export const StyledLocationEdit = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  .dropdown-icon {
    width: 34px;
    padding: 10px 5px 5px 10px;
  }
  
  .load-icon-zip {
    width: 15px;
    height: auto;
    padding: 0;
    margin: 0;
    
    position: absolute;
    top: 13px;
    right: 20px;
    z-index: 10;
  }
  
  .load-icon-city {
    width: 15px;
    height: auto;
    padding: 0;
    margin: 0;
    
    position: absolute;
    top: 13px;
    right: 20px;
    z-index: 10;
  }
  
  .react-autosuggest__container {
    flex-grow: 1;
    display: flex;
    flex-flow: row nowrap;
  }
  
  .react-autosuggest__input {
    flex-grow: 1;
    width: 50%;
    min-height: 2.6rem;
    padding: 9px 10px;
    margin-right: 10px;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    font-size: 1.4rem;
    border-radius: 4px;
    color: black;
    line-height: 1.4;
    
    border: 1px solid #ccc;
    transition: border-color ease-in-out 100ms, box-shadow ease-in-out 100ms;
    will-change: border-color, box-shadow;
  }
  
  .react-autosuggest__input--focused {
    outline: 0;
    border-color: #0b95d5;
    box-shadow: 0 0 1px .5px #0b95d5;
    border-radius: 4px;
  }
  
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .react-autosuggest__suggestions-container {
    display: none;
  }
  
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 40px;
    left:0;
    right: calc(1rem * ${theme('fontSize.base')} * ${theme('lineHeights.regular')} + 10px );
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 400;
    font-size: 1.4rem;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }
  
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px;
  }
  
  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`

export const StyledZipInput = styled.span`
  width: 40%;
`
