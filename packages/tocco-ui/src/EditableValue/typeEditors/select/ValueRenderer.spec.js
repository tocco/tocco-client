import React from 'react'
import {mount} from 'enzyme'

import ValueRenderer from './ValueRenderer'
import Popover from '../../../Popover'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('select', () => {
        describe('ValueRenderer', () => {
          it('should show display of option', () => {
            const option = {key: '99', display: 'User 99'}
            const wrapper = mount(<ValueRenderer option={option} loadTooltip={EMPTY_FUNC} tooltips={{}}/>)
            expect(wrapper.html()).to.contains(option.display)
            expect(wrapper.find(Popover)).to.have.length(1)
          })

          it('should call loadToolTip with key on mouseover', () => {
            const option = {key: '99', display: 'User 99'}
            const loadToolTipSpy = sinon.spy()
            const wrapper = mount(<ValueRenderer option={option} loadTooltip={loadToolTipSpy} tooltips={{}}/>)
            wrapper.simulate('mouseover')
            expect(loadToolTipSpy).to.be.calledWith(option.key)
          })

          it('should call onValueClick callback', () => {
            const option = {key: '99', display: 'User 99'}
            const clickSpy = sinon.spy()
            const wrapper = mount(
              <ValueRenderer option={option} loadTooltip={EMPTY_FUNC} tooltips={{}} onValueClick={clickSpy}/>
            )

            wrapper.find('[id="value"]').simulate('click')
            expect(clickSpy).to.be.calledWith(option)
          })
        })
      })
    })
  })
})
