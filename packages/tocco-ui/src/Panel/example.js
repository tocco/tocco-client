/* eslint no-console: 0 */
import React from 'react'

import Typography from '../Typography'
import Preview from '../Preview'
import Panel from './'
// real-import:import {Panel} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
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
            alt="orange jellyfish floating in the deep blue sea"
            srcUrl="https://picsum.photos/500/500?image=1069"
            thumbnailUrl="https://picsum.photos/150/150?image=1069"
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
      {/* end example */}
    </div>
  )
}
