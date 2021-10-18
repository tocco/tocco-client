import styled from 'styled-components'
import {colorizeBorder, scale, theme} from 'tocco-ui'

export const StyledInfoBoxWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid ${colorizeBorder.shade1};
  height: ${({height}) => `${height}px`};
  padding: ${scale.space(-0.5)};
  background: ${theme.color('paper')};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  /**
   * Workaround:
   * so that ghost-image on drag and drop is taken correctly
   * when having an absolute position element inside the InfoBox (e.g. entity-list)
   */
  position: relative;
  z-index: 1;
`

export const StyledDroppedPreview = styled.div`
  border: 2px dashed ${theme.color('primary')};
  box-sizing: border-box;
  height: ${({height}) => `${height}px`};
  width: 100%;
  padding: ${scale.space(-0.5)};
  margin: ${scale.space(-0.5)};
  background: ${theme.color('paper')};
`
