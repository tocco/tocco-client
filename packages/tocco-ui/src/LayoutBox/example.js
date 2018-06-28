/* eslint no-console: 0 */
import React from 'react'

import LayoutContainer, {LayoutBox} from './'
import Panel, {PanelBody, PanelFooter, PanelHeader} from '../Panel'
import Typography from '../Typography'
// real-import:import {LayoutBox} from 'tocco-ui'

const ExampleCell = () => {
  return (
    <div style={{backgroundColor: '#ddd'}}>Cell</div>
  )
}

const ExamplePanel1 = () => {
  return (
    <Panel>
      <PanelHeader>
        <Typography.H4>Header</Typography.H4>
      </PanelHeader>
      <PanelBody>
        <Typography.P>Body</Typography.P>
        <Typography.P>Body</Typography.P>
      </PanelBody>
    </Panel>
  )
}

const ExamplePanel2 = () => {
  return (
    <Panel>
      <PanelBody>
        <Typography.Span>Body</Typography.Span>
      </PanelBody>
      <PanelFooter>
        <Typography.H5>Footer</Typography.H5>
      </PanelFooter>
    </Panel>
  )
}

const ExamplePanel3 = () => {
  return (
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
  )
}

// real-import:import {LayoutBox, LayoutContainer} from 'tocco-ui'
export default () => {
  return (
    <div>
      {/* start example */}
      <LayoutContainer maxCellsPerRow={{sm: 3, md: 4, lg: 4, xl: 6}}>
        <LayoutBox><ExampleCell/></LayoutBox>
        <LayoutBox><ExampleCell/></LayoutBox>
        <LayoutBox><ExampleCell/></LayoutBox>
        <LayoutBox><ExampleCell/></LayoutBox>
        <LayoutBox><ExampleCell/></LayoutBox>
        <LayoutBox><ExampleCell/></LayoutBox>
        <LayoutBox><ExampleCell/></LayoutBox>
        <LayoutBox><ExampleCell/></LayoutBox>
        <LayoutBox><ExampleCell/></LayoutBox>
      </LayoutContainer>

      <LayoutContainer maxCellsPerRow={{sm: 2, md: 3, lg: 3, xl: 3}}>
        <LayoutBox><ExamplePanel1/></LayoutBox>
        <LayoutBox><ExamplePanel2/></LayoutBox>
        <LayoutBox><ExamplePanel3/></LayoutBox>
      </LayoutContainer>
      {/* end example */}
    </div>
  )
}
