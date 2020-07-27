import React from 'react'
import {shallow} from 'enzyme'

import BallMenu from './BallMenu'
import Menu from './Menu'
import MenuItem from './MenuItem'
import Ball from '../Ball'

describe('tocco-ui', () => {
  describe('Menu', () => {
    describe('BallMenu', () => {
      test('should render a Ball', () => {
        const wrapper = shallow(
          <BallMenu buttonProps={{icon: 'facebook'}}>
            <MenuItem>Test</MenuItem>
          </BallMenu>
        )

        expect(wrapper.find(Ball)).to.have.length(1)
        expect(wrapper.find(MenuItem)).to.have.length(1)
      })

      test('should set menu open on click and call onOpen only once', () => {
        const onOpen = sinon.spy()
        const wrapper = shallow(
          <BallMenu buttonProps={{icon: 'facebook'}} onOpen={onOpen}>
            <MenuItem>Test</MenuItem>
          </BallMenu>
        )

        expect(wrapper.find(Menu)).to.have.prop('open', false)
        wrapper.find(Ball).simulate('click')
        wrapper.update()
        expect(wrapper.find(Menu)).to.have.prop('open', true)
        expect(onOpen).to.be.calledOnce

        wrapper.find(Ball).simulate('click')
        wrapper.update()
        expect(wrapper.find(Menu)).to.have.prop('open', false)
        expect(onOpen).to.be.calledOnce
      })
    })
  })
})
