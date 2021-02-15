import React from 'react'
import {shallow} from 'enzyme'

import ButtonMenu from './ButtonMenu'
import MenuItem from './MenuItem'
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Icon from '../Icon'

describe('tocco-ui', () => {
  describe('Menu', () => {
    describe('ButtonMenu', () => {
      test('should render a Button and not render Menu when its closed', () => {
        const wrapper = shallow(
          <ButtonMenu buttonProps={{icon: 'facebook'}}>
            <MenuItem>Test</MenuItem>
          </ButtonMenu>
        )

        expect(wrapper.find(Button)).to.have.length(1)
        expect(wrapper.find(MenuItem)).to.have.length(0)
      })

      test('should render a Buttongroup with default click handler', () => {
        const onClick = sinon.spy()
        const wrapper = shallow(
          <ButtonMenu onClick={onClick} buttonProps={{icon: 'facebook'}}>
            <MenuItem>Test</MenuItem>
          </ButtonMenu>
        )

        expect(wrapper.find(Button)).to.have.length(1)
        expect(wrapper.find(ButtonGroup)).to.have.length(1)
        expect(wrapper.find(MenuItem)).to.have.length(0)

        wrapper.find(Button).first().simulate('click')
        expect(onClick).to.be.calledOnce
      })

      test('should set menu open on click and call onOpen only once', () => {
        const onOpen = sinon.spy()
        const wrapper = shallow(
          <ButtonMenu buttonProps={{icon: 'facebook'}} onOpen={onOpen}>
            <MenuItem>Test</MenuItem>
          </ButtonMenu>
        )

        expect(wrapper.find(Icon)).to.have.prop('icon', 'angle-down')
        wrapper.find(Button).simulate('click')
        wrapper.update()
        expect(wrapper.find(Icon)).to.have.prop('icon', 'angle-up')
        expect(onOpen).to.be.calledOnce

        wrapper.find(Button).simulate('click')
        wrapper.update()
        expect(wrapper.find(MenuItem)).to.have.length(0)
        expect(onOpen).to.be.calledOnce
      })
    })
  })
})
