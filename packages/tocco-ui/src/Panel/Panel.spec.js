import React from 'react'
import {mount} from 'enzyme'

import Panel from './'
import Typography from '../Typography'
import Icon from '../Icon'
import Ball from '../Ball'

const panelIsOpen = wrapper => wrapper.find(Icon).props().icon === 'chevron-up'

describe('tocco-ui', () => {
  describe('Panel', () => {
    describe('Panel', () => {
      test('should render a open panel by default', () => {
        const wrapper = mount(
          <Panel.Wrapper>
            <Panel.Header>
              <Typography.H4>Title</Typography.H4>
            </Panel.Header>
            <div>body</div>
          </Panel.Wrapper>)

        expect(panelIsOpen(wrapper)).to.be.true
      })

      test('should regard isOpenInitial prop for state', () => {
        const wrapper = mount(
          <Panel.Wrapper isOpenInitial={false}>
            <Panel.Header>
              <Typography.H4>Title</Typography.H4>
            </Panel.Header>
            <div>body</div>
          </Panel.Wrapper>)

        expect(panelIsOpen(wrapper)).to.be.false
      })

      test('should open and close on click', () => {
        const wrapper = mount(
          <Panel.Wrapper>
            <Panel.Header>
              <Typography.H4>Title</Typography.H4>
            </Panel.Header>
            <div>body</div>
          </Panel.Wrapper>)

        expect(panelIsOpen(wrapper)).to.be.true
        wrapper.find(Ball).simulate('click')
        expect(panelIsOpen(wrapper)).to.be.false
        wrapper.find(Ball).simulate('click')
        expect(panelIsOpen(wrapper)).to.be.true
      })

      test('should open and close on click', () => {
        const onToggleSpy = sinon.spy()
        const wrapper = mount(

          <Panel.Wrapper controlledIsOpen={false} onToggle={onToggleSpy}>
            <Panel.Header>
              <Typography.H4>Title</Typography.H4>
            </Panel.Header>
            <div>body</div>
          </Panel.Wrapper>)

        expect(panelIsOpen(wrapper)).to.be.false
        wrapper.find(Ball).simulate('click')
        expect(onToggleSpy).to.have.been.calledWith(true)
      })
    })
  })
})
