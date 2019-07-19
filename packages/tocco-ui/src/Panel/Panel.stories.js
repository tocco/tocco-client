import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean} from '@storybook/addon-knobs'

import Panel from './index'
import Preview from '../Preview'
import Typography from '../Typography'

storiesOf('Tocco-UI | Layout / Panel', module)
  .addDecorator(withKnobs)
  .add(
    'PanelGroup',
    () => (
      <Panel.Group openPanelIndex={2}>
        {
          ['Group 1', 'Group 2', 'Group 3'].map((item, i) =>
            <Panel.Wrapper key={i}>
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
  )
  .add(
    'Panel with header',
    () => {
      const wrapperKnobs = {
        isFramed: boolean('isFramed', true),
        isToggleable: boolean('isToggleable', true)
      }
      return (
        <Panel.Wrapper isOpenInitial={true} {...wrapperKnobs}>
          <Panel.Header>
            <Typography.H4>Header</Typography.H4>
          </Panel.Header>
          <Panel.Body>
            <Typography.Span>Body</Typography.Span>
          </Panel.Body>
        </Panel.Wrapper>
      )
    }
  )
  .add(
    'Panel with footer',
    () => {
      const wrapperKnobs = {
        isFramed: boolean('isFramed', true),
        isToggleable: boolean('isToggleable', true)
      }
      return (
        <Panel.Wrapper isOpenInitial={false} {...wrapperKnobs}>
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
      )
    }
  )
