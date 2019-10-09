import React from 'react'
import {intlEnzyme, TestThemeProvider} from 'tocco-test-util'
import {Button, Menu, Typography} from 'tocco-ui'

import FullCalendar from './FullCalendar'

describe('scheduler', () => {
  describe('components', () => {
    describe('Fullcalendar', () => {
      const baseProps = {onRefresh: () => {}}

      test('should render wrapping div with id and calendar div', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <FullCalendar {...baseProps}/>
          </TestThemeProvider>
        )
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
        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <FullCalendar {...baseProps}/>
          </TestThemeProvider>
        )
        expect(wrapper.html()).to.not.have.string(mockResources[0].title)
      })

      test('should show mocked resources', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <FullCalendar {...baseProps} resources={mockResources}/>
          </TestThemeProvider>
        )
        expect(wrapper.html()).to.have.string(mockResources[0].title)
      })

      test('should show events', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <FullCalendar locale="de" {...baseProps} resources={mockResources} />
          </TestThemeProvider>
        )
        wrapper.setProps({events: mockEvents})
        // its not possible to check for updated events
      })

      const getMonth = locale => new Date().toLocaleString(locale, {month: 'long'})

      test('should set locale de on fullcalendar', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <FullCalendar {...baseProps} locale="de"/>
          </TestThemeProvider>
        )
        expect(wrapper.html()).to.have.string(getMonth('de'))
      })

      test('should set locale fr on fullcalendar', () => {
        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <FullCalendar {...baseProps} locale="fr"/>
          </TestThemeProvider>
        )
        expect(wrapper.html()).to.have.string(getMonth('fr'))
      })
    })
  })
})
