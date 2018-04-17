import React from 'react'
import FullCalendar from './FullCalendar'
import {intlEnzyme} from 'tocco-test-util'

describe('scheduler', () => {
  describe('components', () => {
    describe('Fullcalendar', () => {
      it('should render wrapping div with id and calendar div', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar/>)
        expect(wrapper.find('div')).to.have.length(2)
      })

      const mockEvents = [
        {
          resourceId: '0Dummy_entity',
          title: 'Lecture IT 2',
          start: new Date().getTime(),
          end: new Date().getTime()
        }
      ]

      const mockResources = [
        {title: 'Dummy_entity 0', id: '0Dummy_entity', entityKey: '0', calendarType: 'dummy'}
      ]

      it('should show resources', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar/>)
        expect(wrapper.html()).to.not.have.string(mockResources[0].title)
        wrapper.setProps({resources: mockResources})
        expect(wrapper.html()).to.have.string(mockResources[0].title)
      })

      it('should show events', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar locale="de" resources={mockResources} />)
        wrapper.setProps({events: mockEvents})
        // its not possible to check for updated events
      })

      it('should set locale on fullcalendar', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar locale="de"/>)
        expect(wrapper.html()).to.have.string('Heute')
        wrapper.setProps({locale: 'en'})
        expect(wrapper.html()).to.have.string('today')
      })

      it('should set locale on fullcalendar', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar onCalendarRemove={() => {}} resources={mockResources} />)
        expect(wrapper.html()).to.have.string('remove-resource-btn')
      })
    })
  })
})
