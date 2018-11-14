import {mount, shallow} from 'enzyme'
import React from 'react'

import SomeOfButton from './SomeOfButton'
import Button from '../Button'

describe('tocco-ui', () => {
  describe('SomeOfButton', () => {
    test('should show label', () => {
      const wrapper = mount(<SomeOfButton some={123} of={1234}/>)
      expect(wrapper.find('button').text()).to.equal('123 / 1k')
    })

    test('should have one defaultProps', () => {
      expect(SomeOfButton.defaultProps.some).to.equal(0)
    })

    test('should pass seven props', () => {
      const wrapper = shallow(
        <SomeOfButton
          dense
          disabled
          ink="primary"
          look="raised"
          onClick={Function}
          title="title"
          of={1}
        />)

      const {dense, disabled, ink, label, look, onClick, title} = wrapper.find(Button).props()
      expect(dense).to.be.true
      expect(disabled).to.be.true
      expect(ink).to.equal('primary')
      expect(look).to.equal('raised')
      expect(onClick).to.be.instanceOf(Function)
      expect(title).to.equal('title')
      expect(label).to.be.not.undefined
    })
  })
})
