import React from 'react'

import Panel from './index'
import Preview from '../Preview'
import Typography from '../Typography'

export default {
  title: 'Tocco-UI/Layout/Panel',
  component: Panel,
  argTypes: {
    isOpenInitial: {type: 'boolean', defaultValue: true},
    isFramed: {type: 'boolean', defaultValue: true},
    isToggleable: {type: 'boolean', defaultValue: true}
  }
}

export const PanelGroup = args => (
  <Panel.Group openPanelIndex={2}>
    {
      ['Group 1', 'Group 2', 'Group 3'].map((item, i) =>
        <Panel.Wrapper key={i} {...args}>
          <Panel.Header>
            <Typography.H4>{item}</Typography.H4>
          </Panel.Header>
          <Panel.Body>
            <Typography.Span>Body {item}</Typography.Span>
          </Panel.Body>
        </Panel.Wrapper>
      )
    }
  </Panel.Group>
)

export const PanelWithHeader = args => <Panel.Wrapper {...args}>
  <Panel.Header>
    <Typography.H4>Header</Typography.H4>
  </Panel.Header>
  <Panel.Body>
    <Typography.Span>Body</Typography.Span>
  </Panel.Body>
</Panel.Wrapper>

export const PanelWithFooter = args => <Panel.Wrapper {...args}>
  <Panel.Body>
    <Preview
      alt="modern building captured from frog view"
      srcUrl="https://picsum.photos/500/500?image=1081"
      thumbnailUrl="https://picsum.photos/150/150?image=1081"
      maxDimensionY="130px"
      maxDimensionX="120px"
      caption="Consectetur adipisicing elit."
    />
  </Panel.Body>
  <Panel.Footer>
    <Typography.H4>Footer</Typography.H4>
  </Panel.Footer>
</Panel.Wrapper>
