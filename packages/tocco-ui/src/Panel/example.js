/* eslint no-console: 0 */
import React from 'react'

import Panel, {PanelBody, PanelFooter, PanelHeader} from './'
import Typography from '../Typography'
// real-import:import {Panel, PanelBody, PanelFooter, PanelHeader} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Panel isFramed={false}>
        <PanelHeader>
          <Typography.H4>Header</Typography.H4>
        </PanelHeader>
        <PanelBody>
          <Typography.Span>Body</Typography.Span>
        </PanelBody>
        <PanelFooter showToggler={false}>
          <Typography.H5>Footer</Typography.H5>
        </PanelFooter>
      </Panel>

      <hr/>

      <Panel isFramed={false} isOpen={true} isToggleable={false}>
        <PanelHeader>
          <Typography.Span>Header</Typography.Span>
        </PanelHeader>
        <PanelBody>
          <Typography.Span>Body</Typography.Span><br/>
          <Typography.Span>Body</Typography.Span>
        </PanelBody>
      </Panel>

      <hr/>

      <Panel isFramed={false} isOpen={true}>
        <PanelBody>
          <Typography.P>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Accusamus odit dolorum laboriosam, sunt vel ad facilis blanditiis dignissimos
          suscipit possimus ipsam quis. Illum pariatur, sit voluptatibus, obcaecati
          temporibus iusto vero.</Typography.P>
        </PanelBody>
        <PanelFooter/>
      </Panel>

      <hr/>
      <hr/>

      <Panel>
        <PanelHeader>
          <Typography.H4>Header</Typography.H4>
        </PanelHeader>
        <PanelBody>
          <Typography.Span>Body</Typography.Span>
        </PanelBody>
        <PanelFooter showToggler={false}>
          <Typography.H5>Footer</Typography.H5>
        </PanelFooter>
      </Panel>

      <hr/>

      <Panel isOpen={true} isToggleable={false}>
        <PanelHeader>
          <Typography.Span>Header</Typography.Span>
        </PanelHeader>
        <PanelBody>
          <Typography.Span>Body</Typography.Span><br/>
          <Typography.Span>Body</Typography.Span>
        </PanelBody>
      </Panel>

      <hr/>

      <Panel isOpen={true}>
        <PanelBody>
          <Typography.P>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Accusamus odit dolorum laboriosam, sunt vel ad facilis blanditiis dignissimos
          suscipit possimus ipsam quis. Illum pariatur, sit voluptatibus, obcaecati
          temporibus iusto vero.</Typography.P>
        </PanelBody>
        <PanelFooter/>
      </Panel>
      {/* end example */}
    </div>
  )
}
