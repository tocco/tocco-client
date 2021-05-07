
import React from 'react'

import Panel from '../Panel'
import Typography from '../Typography'
import Layout from './index'

export default {
  title: 'Tocco-UI/Layout',
  component: Layout.Box,
  subcomponents: {Container: Layout.Container}
}

export const Basic = () => (
  <div>
    <Layout.Container>
      <Layout.Box><ExampleCell /></Layout.Box>
      <Layout.Box><ExampleCell /></Layout.Box>
      <Layout.Box><ExampleCell /></Layout.Box>
      <Layout.Box><ExampleCell /></Layout.Box>
      <Layout.Box><ExampleCell /></Layout.Box>
      <Layout.Box><ExampleCell /></Layout.Box>
      <Layout.Box><ExampleCell /></Layout.Box>
      <Layout.Box><ExampleCell /></Layout.Box>
      <Layout.Box><ExampleCell /></Layout.Box>
    </Layout.Container>

    <Layout.Container>
      <Layout.Box><ExamplePanel1 /></Layout.Box>
      <Layout.Box><ExamplePanel2 /></Layout.Box>
      <Layout.Box><ExamplePanel3 /></Layout.Box>
    </Layout.Container>
  </div>
)

const ExampleCell = () => <div style={{backgroundColor: '#ddd'}}>Cell</div>

const ExamplePanel1 = () =>
  <Panel.Wrapper>
    <Panel.Header>
      <Typography.H4>Header</Typography.H4>
    </Panel.Header>
    <Panel.Body>
      <Typography.P>Body</Typography.P>
      <Typography.P>Body</Typography.P>
    </Panel.Body>
  </Panel.Wrapper>

const ExamplePanel2 = () =>
  <Panel.Wrapper>
    <Panel.Body>
      <Typography.Span>Body</Typography.Span>
    </Panel.Body>
    <Panel.Footer>
      <Typography.H5>Footer</Typography.H5>
    </Panel.Footer>
  </Panel.Wrapper>

const ExamplePanel3 = () =>
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
