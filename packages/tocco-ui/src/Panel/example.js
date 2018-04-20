/* eslint no-console: 0 */
import React from 'react'
import Panel, {PanelFooter, PanelHeader, PanelBody} from './'
// real-import:import {Panel} from 'tocco-ui'

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
          <span>Body</span>
        </PanelBody>
      </Panel>

      <hr/>

      <Panel isOpen={true}>
        <PanelBody>
          <span>Body</span>
        </PanelBody>
        <PanelFooter/>
      </Panel>
      {/* end example */}
    </div>
  )
}
