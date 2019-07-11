import React from 'react'
import {storiesOf} from '@storybook/react'

import Panel from './index'
import Preview from '../Preview'
import Typography from '../Typography'
import {Typography as RawTypography} from '../Typography/Typography'

storiesOf('Tocco-UI | Layout / Panel', module)
  .add(
    'Panel',
    () =>
      <div>
        <Panel.Group>
          <Panel.Wrapper>
            <Panel.Header>
              <Typography.H4>Group 1 - Panel 1</Typography.H4>
            </Panel.Header>
            <Panel.Body>
              <Typography.Span>Panel 1 Body</Typography.Span>
            </Panel.Body>
          </Panel.Wrapper>

          <Panel.Wrapper>
            <Panel.Header>
              <Typography.H4>Group 1 - Panel 2</Typography.H4>
            </Panel.Header>
            <Panel.Body>
              <Typography.Span>Group 1 Body</Typography.Span>
            </Panel.Body>
          </Panel.Wrapper>
        </Panel.Group>

        <Panel.Group openPanelId={1}>
          <Panel.Wrapper>
            <Panel.Header>
              <Typography.H4>Group 2 - Panel 1</Typography.H4>
            </Panel.Header>
            <Panel.Body>
              <Typography.Span>Panel 1 Body</Typography.Span>
            </Panel.Body>
          </Panel.Wrapper>

          <Panel.Wrapper>
            <Panel.Header>
              <Typography.H4>Group 2 - Panel 2</Typography.H4>
            </Panel.Header>
            <Panel.Body>
              <Typography.Span>Group 2 Body</Typography.Span>
            </Panel.Body>
          </Panel.Wrapper>
        </Panel.Group>

        <hr/>

        <Panel.Wrapper isFramed={false}>
          <Panel.Header>
            <Typography.H4>Header</Typography.H4>
          </Panel.Header>
          <Panel.Body>
            <Typography.Span>Body</Typography.Span>
          </Panel.Body>
          <Panel.Footer showToggler={false}>
            <Typography.H5>Footer</Typography.H5>
          </Panel.Footer>
        </Panel.Wrapper>

        <hr/>

        <Panel.Wrapper isFramed={false} isOpen={true} isToggleable={false}>
          <Panel.Header>
            <Typography.Span>Header</Typography.Span>
          </Panel.Header>
          <Panel.Body>
            <Typography.Span>Body</Typography.Span><br/>
            <Typography.Span>Body</Typography.Span>
          </Panel.Body>
        </Panel.Wrapper>

        <hr/>

        <Panel.Wrapper isFramed={false} isOpen={true}>
          <Panel.Body>
            <Typography.P>Lorem ipsum dolor sit amet.</Typography.P>
            <Preview
              alt="modern building captured from frog view"
              srcUrl="https://picsum.photos/500/500?image=1081"
              thumbnailUrl="https://picsum.photos/150/150?image=1081"
              maxDimensionY="130px"
              maxDimensionX="120px"
              caption="Consectetur adipisicing elit."
            />
          </Panel.Body>
          <Panel.Footer/>
        </Panel.Wrapper>

        <hr/>
        <hr/>

        <Panel.Wrapper>
          <Panel.Header>
            <Typography.H4>Header</Typography.H4>
          </Panel.Header>
          <Panel.Body>
            <Typography.Span>Body</Typography.Span>
          </Panel.Body>
          <Panel.Footer showToggler={false}>
            <Typography.H5>Footer</Typography.H5>
          </Panel.Footer>
        </Panel.Wrapper>

        <hr/>

        <Panel.Wrapper isOpen={true} isToggleable={false}>
          <Panel.Header>
            <Typography.Span>Header</Typography.Span>
          </Panel.Header>
          <Panel.Body>
            <Typography.Span>Body</Typography.Span><br/>
            <Typography.Span>Body</Typography.Span>
          </Panel.Body>
        </Panel.Wrapper>

        <hr/>

        <Panel.Wrapper isOpen={true}>
          <Panel.Body>
            <Typography.P>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Accusamus odit dolorum laboriosam, sunt vel ad facilis blanditiis dignissimos
          suscipit possimus ipsam quis. Illum pariatur, sit voluptatibus, obcaecati
          temporibus iusto vero.</Typography.P>
          </Panel.Body>
          <Panel.Footer/>
        </Panel.Wrapper>
      </div>, {info: {propTablesExclude:
        [Preview, RawTypography, Typography.H4, Typography.H5, Typography.P, Typography.Span]}}
  )
