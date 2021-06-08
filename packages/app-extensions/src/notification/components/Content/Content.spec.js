import React from 'react'
import {mount} from 'enzyme'
import {FormattedMessage} from 'react-intl'
import {intlEnzyme} from 'tocco-test-util'
import {FormattedValue} from 'tocco-ui'

import Content from './Content'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('Components', () => {
      describe('Content', () => {
        test('should render string content', () => {
          const wrapper = mount(
            <Content>Test</Content>
          )
          expect(wrapper.text()).to.be.equal('Test')
          expect(wrapper.find(FormattedValue)).to.have.length(0)
        })

        test('should render html content', () => {
          const wrapper = mount(
            <Content>{'<b>Test</b>'}</Content>
          )
          expect(wrapper.text()).to.be.equal('Test')
          expect(wrapper.find(FormattedValue)).to.have.length(1)
        })

        test('should render text resources', () => {
          const wrapper = intlEnzyme.mountWithIntl(
            <Content>{'client.example.title'}</Content>
          )
          expect(wrapper.find(FormattedMessage)).to.have.length(1)
        })

        test('should render component content', () => {
          const Compo = () => <span>TEST</span>
          const wrapper = mount(
            <Content><Compo/></Content>
          )
          expect(wrapper.find(Compo)).to.have.length(1)
        })
      })
    })
  })
})
