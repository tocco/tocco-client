import React from 'react'
import {shallow} from 'enzyme'

import ButtonMenu from './ButtonMenu'
import Menu from './Menu'
import MenuItem from './MenuItem'
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Icon from '../Icon'

describe('tocco-ui', () => {
  describe('Menu', () => {
    describe('ButtonMenu', () => {
      test('should render a Button', () => {
        const wrapper = shallow(
          <ButtonMenu buttonProps={{icon: 'facebook'}}>
            <MenuItem>Test</MenuItem>
          </ButtonMenu>
        )

        expect(wrapper.find(Button)).to.have.length(1)
        expect(wrapper.find(MenuItem)).to.have.length(1)
      })

      test('should render a Buttongroup with default click handler', () => {
        const onClick = sinon.spy()
        const wrapper = shallow(
          <ButtonMenu onClick={onClick} buttonProps={{icon: 'facebook'}}>
            <MenuItem>Test</MenuItem>
          </ButtonMenu>
        )

        expect(wrapper.find(Button)).to.have.length(2)
        expect(wrapper.find(ButtonGroup)).to.have.length(1)
        expect(wrapper.find(MenuItem)).to.have.length(1)

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
        expect(wrapper.find(Menu)).to.have.prop('open', false)
        expect(wrapper.find(Icon)).to.have.prop('icon', 'angle-down')
        wrapper.find(Button).simulate('click')
        wrapper.update()
        expect(wrapper.find(Menu)).to.have.prop('open', true)
        expect(wrapper.find(Icon)).to.have.prop('icon', 'angle-up')
        expect(onOpen).to.be.calledOnce

        wrapper.find(Button).simulate('click')
        wrapper.update()
        expect(wrapper.find(Menu)).to.have.prop('open', false)
        expect(onOpen).to.be.calledOnce
      })
    })
  })
})
