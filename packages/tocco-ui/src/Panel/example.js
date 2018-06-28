/* eslint no-console: 0 */
import React from 'react'
import Panel, {PanelBody, PanelFooter, PanelHeader} from './'
import {H4, H5, P, Span} from '../Typography'
// real-import:import {Panel, PanelBody, PanelFooter, PanelHeader} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Panel isFramed={false}>
        <PanelHeader>
          <H4>Header</H4>
        </PanelHeader>
        <PanelBody>
          <Span>Body</Span>
        </PanelBody>
        <PanelFooter showToggler={false}>
          <H5>Footer</H5>
        </PanelFooter>
      </Panel>

      <hr/>

      <Panel isFramed={false} isOpen={true} isToggleable={false}>
        <PanelHeader>
          <Span>Header</Span>
        </PanelHeader>
        <PanelBody>
          <Span>Body</Span><br/>
          <Span>Body</Span>
        </PanelBody>
      </Panel>

      <hr/>

      <Panel isFramed={false} isOpen={true}>
        <PanelBody>
          <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus odit dolorum laboriosam, sunt vel
          ad facilis blanditiis dignissimos suscipit possimus ipsam quis. Illum pariatur, sit voluptatibus, obcaecati
          temporibus iusto vero.</P>
        </PanelBody>
        <PanelFooter/>
      </Panel>

      <hr/>
      <hr/>

      <Panel>
        <PanelHeader>
          <H4>Header</H4>
        </PanelHeader>
        <PanelBody>
          <Span>Body</Span>
        </PanelBody>
        <PanelFooter showToggler={false}>
          <H5>Footer</H5>
        </PanelFooter>
      </Panel>

      <hr/>

      <Panel isOpen={true} isToggleable={false}>
        <PanelHeader>
          <Span>Header</Span>
        </PanelHeader>
        <PanelBody>
          <Span>Body</Span><br/>
          <Span>Body</Span>
        </PanelBody>
      </Panel>

      <hr/>

      <Panel isOpen={true}>
        <PanelBody>
          <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus odit dolorum laboriosam, sunt vel
          ad facilis blanditiis dignissimos suscipit possimus ipsam quis. Illum pariatur, sit voluptatibus, obcaecati
          temporibus iusto vero.</P>
        </PanelBody>
        <PanelFooter/>
      </Panel>
      {/* end example */}
    </div>
  )
}
