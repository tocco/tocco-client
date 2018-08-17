import React from 'react'
import SearchPanel from './SearchPanel'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('resource-scheduler', () => {
  describe('components', () => {
    describe('SearchPanel', () => {
      it('should render', () => {
        const wrapper = shallow(
          <SearchPanel
            addCalendarsOfType={EMPTY_FUNC}
            updateRequestedCalendars={EMPTY_FUNC}
            calendarTypes={[]}
          />
        )
        expect(wrapper.find('div')).to.have.length(1)
      })

      // Can not test asynchonously added icons (wrapper.find(Icon) reveals <i/> instead of <Icon />).
      //
      // it('should show colored icon if color is defined', () => {
      //   const color = '#f44242'
      //   const calendarTypes = [
      //     {
      //       name: 'lecturer',
      //       targetEntity: 'User',
      //       formBase: 'UserCalendar',
      //       label: 'Dozent',
      //       color
      //     },
      //     {
      //       name: 'noColor',
      //       targetEntity: 'User',
      //       formBase: 'UserCalendar',
      //       label: 'No Color'
      //     }
      //   ]

      //   const wrapper = render(
      //     <SearchPanel
      //       addCalendarsOfType={EMPTY_FUNC}
      //       updateRequestedCalendars={EMPTY_FUNC}
      //       calendarTypes={calendarTypes}
      //     />
      //   )

      //   expect(wrapper.find('.color-icon')).to.have.length(2)
      //   expect(wrapper.find('.color-icon')).to.have.style('color', color)
      //   expect(wrapper.find('.color-icon').last()).to.not.have.property('style')
      // })
    })
  })
})
