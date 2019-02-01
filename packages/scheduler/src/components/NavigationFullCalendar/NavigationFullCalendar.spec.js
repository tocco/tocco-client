import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
import {Button, Typography} from 'tocco-ui'

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
          const refresh = sinon.spy()
          const mockProps = {
            changeRange: changeRange,
            changeView: changeView,
            chooseNext: chooseNext,
            choosePrev: choosePrev,
            chooseToday: chooseToday,
            isLoading: false,
            refresh: refresh,
            title: 'title text',
            type: 'timelineWeek'
          }

          const wrapper = intlEnzyme.mountWithIntl(<NavigationFullCalendar {...mockProps} />)
          expect(wrapper.find(Typography.H3).text()).to.equal('title text')
          expect(wrapper.find(Button)).to.have.length(7)
          wrapper.find('button').map(button => button.simulate('click'))
          expect(changeRange).to.have.property('callCount', 3)
          expect(changeView).to.have.property('callCount', 3)
          expect(chooseNext).to.have.property('callCount', 1)
          expect(choosePrev).to.have.property('callCount', 1)
          expect(chooseToday).to.have.property('callCount', 1)
          expect(refresh).to.have.property('callCount', 1)
        })

        test('should signal states', () => {
          const mockProps = {
            changeRange: () => {},
            changeView: () => {},
            chooseNext: () => {},
            choosePrev: () => {},
            chooseToday: () => {},
            refresh: () => {},
            title: ''
          }

          let wrapper = intlEnzyme.mountWithIntl(
            <NavigationFullCalendar {...mockProps} isLoading={false} type="timelineWeek" />)
          let buttons = wrapper.find(Button)
          expect(buttons.at(3).prop('icon')).to.equal('sync')
          expect(buttons.at(3).prop('pending')).to.be.false
          expect(buttons.at(5).prop('ink')).to.equal('primary')
          expect(buttons.at(6).prop('ink')).to.be.undefined

          wrapper = intlEnzyme.mountWithIntl(
            <NavigationFullCalendar {...mockProps} isLoading={true} type="timelineMonth" />)
          buttons = wrapper.find(Button)
          expect(buttons.at(3).prop('icon')).to.equal('')
          expect(buttons.at(3).prop('pending')).to.be.true
          expect(buttons.at(5).prop('ink')).to.be.undefined
          expect(buttons.at(6).prop('ink')).to.equal('primary')
        })
      })
    })
  })
})
