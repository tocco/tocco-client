import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
import {Button, Menu, Typography} from 'tocco-ui'

import FullCalendar from './FullCalendar'

describe('scheduler', () => {
  describe('components', () => {
    describe('Fullcalendar', () => {
      it('should render wrapping div with id and calendar div', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar/>)
        const menu = wrapper.find(Menu.Button)
        expect(menu).to.have.length(1)
        expect(menu.find(Button)).to.have.length(7)
        expect(menu.find(Typography.H3)).to.have.length(1)
        expect(wrapper.find('div')).to.have.length(3)
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

      const getMonth = locale => new Date().toLocaleString(locale, {month: 'long'})

      it('should set locale on fullcalendar', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar locale="de"/>)
        expect(wrapper.html()).to.have.string(getMonth('de'))
        wrapper.setProps({locale: 'fr'})
        expect(wrapper.html()).to.have.string(getMonth('fr'))
      })

      it('should render resources', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar onCalendarRemove={() => {}} resources={mockResources} />)
        expect(wrapper.html()).to.have.string('remove-resource-btn')
      })
    })
  })
})
