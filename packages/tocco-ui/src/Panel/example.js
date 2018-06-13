/* eslint no-console: 0 */
import React from 'react'
import Panel, {PanelBody, PanelFooter, PanelHeader} from './'
// real-import:import Panel, {PanelBody, PanelFooter, PanelHeader} from 'tocco-ui'

export default () => {
  return (
    <div>
      {/* start example */}
      <Panel>
        <PanelHeader>
          <span>Header</span>
        </PanelHeader>
        <PanelBody>
          <span>Body</span>
        </PanelBody>
        <PanelFooter showToggler={false}>
          <span>Footer</span>
        </PanelFooter>
      </Panel>

      <hr/>

      <Panel isOpen={true} isToggleable={false}>
        <PanelHeader>
          <span>Header</span>
        </PanelHeader>
        <PanelBody>
          <span>Body</span><br/>
          <span>Body</span>
        </PanelBody>
      </Panel>

      <hr/>

      <Panel isOpen={true}>
        <PanelBody>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus odit dolorum laboriosam, sunt vel
          ad facilis blanditiis dignissimos suscipit possimus ipsam quis. Illum pariatur, sit voluptatibus, obcaecati
          temporibus iusto vero.</p>
        </PanelBody>
        <PanelFooter/>
      </Panel>
      {/* end example */}
    </div>
  )
}
