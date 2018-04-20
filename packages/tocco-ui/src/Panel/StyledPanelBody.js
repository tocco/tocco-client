import styled from 'styled-components'

/**
 * Using property max-height for slide-out animation is not perfect due two circumstances.
 * Firstly the collapse animation is slightly delayed and secondly the value for expanded
 * panels is never exact. Declaration "overflow-y: scroll;" ensure accessibility of
 * overflowing content Value "fit-content" would be a promising choice but not yet
 * supported well. The max-height solution still exceed any solution with properties like
 * height and transform and keyframes because of simplicity.
 */
const StyledPanelBody = styled.div`
  max-height: ${props => props.isOpen ? '2000px' : '0'};
  overflow-y: scroll;
  transition: max-height 300ms ease-in-out;
`
export default StyledPanelBody
