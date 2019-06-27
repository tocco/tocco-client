import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
import {Button, Menu, Typography} from 'tocco-ui'

import FullCalendar from './FullCalendar'

describe('scheduler', () => {
  describe('components', () => {
    describe('Fullcalendar', () => {
      const baseProps = {onRefresh: () => {}}

      test('should render wrapping div with id and calendar div', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar {...baseProps}/>)
        const menu = wrapper.find(Menu.Button)
        expect(menu).to.have.length(1)
        expect(menu.find(Button)).to.have.length(7)
        expect(menu.find(Typography.H3)).to.have.length(1)
        expect(wrapper.find('div')).to.have.length(4)
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

      test('should show resources', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar {...baseProps}/>)
        expect(wrapper.html()).to.not.have.string(mockResources[0].title)
        wrapper.setProps({resources: mockResources})
        expect(wrapper.html()).to.have.string(mockResources[0].title)
      })

      test('should show events', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar locale="de" {...baseProps} resources={mockResources} />)
        wrapper.setProps({events: mockEvents})
        // its not possible to check for updated events
      })

      const getMonth = locale => new Date().toLocaleString(locale, {month: 'long'})

      test('should set locale on fullcalendar', () => {
        const wrapper = intlEnzyme.mountWithIntl(<FullCalendar {...baseProps} locale="de"/>)
        expect(wrapper.html()).to.have.string(getMonth('de'))
        wrapper.setProps({locale: 'fr'})
        expect(wrapper.props().locale).to.eql('fr')
      })

      test('should render resources', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <FullCalendar onCalendarRemove={() => {}} {...baseProps} resources={mockResources} />
        )
        expect(wrapper.first().html()).to.have.string('remove-resource-btn')
      })
    })
  })
})
