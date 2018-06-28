/* eslint no-console: 0 */
import React from 'react'
import LayoutContainer, {LayoutBox} from './'

import Panel, {PanelBody, PanelFooter, PanelHeader} from '../Panel'
import {H4, H5, P, Span} from '../Typography'

const ExampleCell = () => {
  return (
    <div style={{backgroundColor: '#ddd'}}>Cell</div>
  )
}

const ExamplePanel1 = () => {
  return (
    <Panel>
      <PanelHeader>
        <H4>Header</H4>
      </PanelHeader>
      <PanelBody>
        <P>Body</P>
        <P>Body</P>
      </PanelBody>
    </Panel>
  )
}

const ExamplePanel2 = () => {
  return (
    <Panel>
      <PanelBody>
        <Span>Body</Span>
      </PanelBody>
      <PanelFooter>
        <H5>Footer</H5>
      </PanelFooter>
    </Panel>
  )
}

const ExamplePanel3 = () => {
  return (
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
