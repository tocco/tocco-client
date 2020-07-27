import React from 'react'
import {shallow, mount} from 'enzyme'

import MenuItem from './MenuItem'

describe('tocco-ui', () => {
  describe('Menu', () => {
    describe('MenuItem', () => {
      test('should render a recursive three', () => {
        const wrapper = shallow(
          <MenuItem>
             Group 1
            <MenuItem>Group 1 - 1</MenuItem>
            <MenuItem>Group 1 - 2</MenuItem>
            <MenuItem>
              <span id={'g-1-3'}>Group 1 - 3</span>
              <MenuItem>Group 1-3 - 1</MenuItem>
              <MenuItem>Group 1-3 - 2</MenuItem>
              <MenuItem id="g-1-3-3">Group 1-3 - 3</MenuItem>
            </MenuItem>
          </MenuItem>
        )

        expect(wrapper.find('#g-1-3')).to.have.length('1')
        expect(wrapper.find('#g-1-3-3')).to.have.length('1')
      })

      test('should handle clicks', () => {
        const onClick1 = sinon.spy()
        const onClick12 = sinon.spy()

        const wrapper = mount(
          <MenuItem onClick={onClick1}>
            Group 1
            <MenuItem>Group 1 - 1</MenuItem>
            <MenuItem onClick={onClick12} id="g-1-2">Group 1 - 2</MenuItem>
          </MenuItem>
        )

        wrapper.find('#g-1-2').simulate('click')
        expect(onClick12).to.be.calledOnce
        expect(onClick1).to.not.be.calledOnce
      })

      test('should close on click', () => {
        const onClose = sinon.spy()

        const onClick1 = sinon.spy()

        const wrapper = mount(
          <MenuItem onClose={onClose} onClick={() => {}}>
            Group 1
            <MenuItem>Group 1 - 1</MenuItem>
            <MenuItem onClick={onClick1} id="g-1-2">Group 1 - 2</MenuItem>
          </MenuItem>
        )

        wrapper.find('#g-1-2').simulate('click')
        expect(onClose).to.be.calledOnce
      })

      test('should not close on click if set to false', () => {
        const onClose = sinon.spy()

        const onClick1 = sinon.spy()

        const wrapper = mount(
          <MenuItem closeOnClick={false} onClose={onClose} onClick={() => {}}>
            Group 1
            <MenuItem>Group 1 - 1</MenuItem>
            <MenuItem onClick={onClick1} id="g-1-2">Group 1 - 2</MenuItem>
          </MenuItem>
        )

        wrapper.find('#g-1-2').simulate('click')
        expect(onClose).to.not.be.calledOnce
      })
    })
  })
})
