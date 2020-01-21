import React from 'react'
import {TestThemeProvider, enzymeUtil} from 'tocco-test-util'
import ReactFullCalendar from '@fullcalendar/react'

import FullCalendar from './FullCalendar'

describe('scheduler', () => {
  describe('components', () => {
    describe('Fullcalendar', () => {
      const baseProps = {onRefresh: () => {}, events: [], resources: [], onEventClick: () => {}}

      test('should render calendar', () => {
        const wrapper = enzymeUtil.mountEmbedded(<FullCalendar {...baseProps}/>)
        expect(wrapper.find(ReactFullCalendar)).to.have.length(1)
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
        const wrapper = enzymeUtil.mountEmbedded(
          <TestThemeProvider>
            <FullCalendar {...baseProps}/>
          </TestThemeProvider>
        )
        expect(wrapper.html()).to.not.have.string(mockResources[0].title)
      })

      test('should show mocked resources', () => {
        const wrapper = enzymeUtil.mountEmbedded(
          <TestThemeProvider>
            <FullCalendar {...baseProps} resources={mockResources}/>
          </TestThemeProvider>
        )
        expect(wrapper.html()).to.have.string(mockResources[0].title)
      })

      test('should show events', () => {
        const wrapper = enzymeUtil.mountEmbedded(
          <FullCalendar locale="de" {...baseProps} resources={mockResources} />
        )
        wrapper.setProps({events: mockEvents})
        // its not possible to check for updated events
      })
    })
  })
})
