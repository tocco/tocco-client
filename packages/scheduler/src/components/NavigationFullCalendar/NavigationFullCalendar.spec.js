import React from 'react'
import {enzymeUtil} from 'tocco-test-util'
import {Button} from 'tocco-ui'

import NavigationFullCalendar, {getButtonInkProps} from './NavigationFullCalendar'

describe('scheduler', () => {
  describe('components', () => {
    describe('FullCalendar', () => {
      describe('NavigationFullCalendar', () => {
        test('should get button ink prop', () => {
          expect(getButtonInkProps('a', 'a')).to.deep.equal({ink: 'primary'})
          expect(getButtonInkProps('a', 'b')).to.deep.equal({})
        })

        test('should render title and buttons', () => {
          const changeRange = sinon.spy()
          const changeView = sinon.spy()
          const chooseNext = sinon.spy()
          const choosePrev = sinon.spy()
          const chooseToday = sinon.spy()
          const goToDate = sinon.spy()
          const refresh = sinon.spy()
          const mockProps = {
            changeRange,
            changeView,
            chooseNext,
            choosePrev,
            chooseToday,
            goToDate,
            isLoading: false,
            refresh,
            title: 'title text',
            type: 'timelineWeek'
          }

          const wrapper = enzymeUtil.mountEmbedded(<NavigationFullCalendar {...mockProps} />)
          expect(wrapper.find(Button)).to.have.length(7)
          wrapper.find('button').map(button => button.simulate('click'))
          expect(changeRange).to.have.property('callCount', 3)
          expect(changeView).to.have.property('callCount', 3)
          expect(chooseNext).to.have.property('callCount', 1)
          expect(choosePrev).to.have.property('callCount', 1)
          expect(chooseToday).to.have.property('callCount', 1)
          expect(refresh).to.have.property('callCount', 1)
        })
      })
    })
  })
})
