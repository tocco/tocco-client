import Wrapper from './Panel'
import Group from './PanelGroup'
import Body from './PanelBody'
import HeaderFooter from './PanelHeaderFooter'
import StyledPanel from './StyledPanel'
import StyledPanelBody from './StyledPanelBody'
import StyledPanelHeaderFooter from './StyledPanelHeaderFooter'

export {
  StyledPanel,
  StyledPanelBody,
  StyledPanelHeaderFooter
}

export default {
  Body,
  Footer: HeaderFooter,
  Group,
  Header: HeaderFooter,
  Wrapper
}
