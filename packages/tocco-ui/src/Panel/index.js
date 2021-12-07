import Wrapper from './Panel'
import Body from './PanelBody'
import Group from './PanelGroup'
import HeaderFooter from './PanelHeaderFooter'
import StyledPanel from './StyledPanel'
import StyledPanelBody from './StyledPanelBody'
import StyledPanelHeaderFooter from './StyledPanelHeaderFooter'

export {StyledPanel, StyledPanelBody, StyledPanelHeaderFooter}

export default {
  Body,
  Footer: HeaderFooter,
  Group,
  Header: HeaderFooter,
  Wrapper
}
