import React from 'react'
import {shallow} from 'enzyme'

import BallMenu from './BallMenu'
import MenuItem from './MenuItem'
import Ball from '../Ball'

describe('tocco-ui', () => {
  describe('Menu', () => {
    describe('BallMenu', () => {
      test('should render a Ball and not render Menu when its closed', () => {
        const wrapper = shallow(
          <BallMenu buttonProps={{icon: 'facebook'}}>
            <MenuItem>Test</MenuItem>
          </BallMenu>
        )

        expect(wrapper.find(Ball)).to.have.length(1)
        expect(wrapper.find(MenuItem)).to.have.length(0)
      })

      test('should set menu open on click and call onOpen only once', () => {
        const onOpen = sinon.spy()
        const stopPropagationSpy = sinon.spy()
        const wrapper = shallow(
          <BallMenu buttonProps={{icon: 'facebook'}} onOpen={onOpen}>
            <MenuItem>Test</MenuItem>
          </BallMenu>
        )

        wrapper.find(Ball).simulate('click', {stopPropagation: stopPropagationSpy})
        wrapper.update()
        expect(onOpen).to.be.calledOnce

        expect(stopPropagationSpy).to.be.calledOnce
        wrapper.find(Ball).simulate('click', {stopPropagation: stopPropagationSpy})
        wrapper.update()
        expect(onOpen).to.be.calledOnce
        expect(stopPropagationSpy).to.be.calledTwice
      })
    })
  })
})
