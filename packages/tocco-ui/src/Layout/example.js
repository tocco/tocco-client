/* eslint no-console: 0 */
import React from 'react'

import Panel from '../Panel'
import Typography from '../Typography'
import Layout from './'
// real-import:import {Layout} from 'tocco-ui'

const ExampleCell = () => <div style={{backgroundColor: '#ddd'}}>Cell</div>

const ExamplePanel1 = () => {
  return (
    <Panel.Wrapper>
      <Panel.Header>
        <Typography.H4>Header</Typography.H4>
      </Panel.Header>
      <Panel.Body>
        <Typography.P>Body</Typography.P>
        <Typography.P>Body</Typography.P>
      </Panel.Body>
    </Panel.Wrapper>
  )
}

const ExamplePanel2 = () => {
  return (
    <Panel.Wrapper>
      <Panel.Body>
        <Typography.Span>Body</Typography.Span>
      </Panel.Body>
      <Panel.Footer>
        <Typography.H5>Footer</Typography.H5>
      </Panel.Footer>
    </Panel.Wrapper>
  )
}

const ExamplePanel3 = () => {
  return (
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
  )
}

export default () => {
  return (
    <div>
      {/* start example */}
      <Layout.Container maxCellsPerRow={{sm: 2, md: 3, lg: 4, xl: 5}}>
        <Layout.Box><ExampleCell/></Layout.Box>
        <Layout.Box><ExampleCell/></Layout.Box>
        <Layout.Box><ExampleCell/></Layout.Box>
        <Layout.Box><ExampleCell/></Layout.Box>
        <Layout.Box><ExampleCell/></Layout.Box>
        <Layout.Box><ExampleCell/></Layout.Box>
        <Layout.Box><ExampleCell/></Layout.Box>
        <Layout.Box><ExampleCell/></Layout.Box>
        <Layout.Box><ExampleCell/></Layout.Box>
      </Layout.Container>

      <Layout.Container>
        <Layout.Box><ExamplePanel1/></Layout.Box>
        <Layout.Box><ExamplePanel2/></Layout.Box>
        <Layout.Box><ExamplePanel3/></Layout.Box>
      </Layout.Container>
      {/* end example */}
    </div>
  )
}
