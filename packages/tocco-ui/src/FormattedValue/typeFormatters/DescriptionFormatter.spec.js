import {mount} from 'enzyme'
import React from 'react'
import {TestThemeProvider} from 'tocco-test-util'

import Icon from '../../Icon'
import DescriptionFormatter from './DescriptionFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('DescriptionFormatter ', () => {
        test('should show question mark in tooltip mode', () => {
          const wrapper = mount(
            <TestThemeProvider>
              <DescriptionFormatter
                value="<p>TEST TEST</p>"
                options={{
                  mode: 'tooltip',
                  title: 'Test'
                }}
              />
            </TestThemeProvider>
          )
          expect(wrapper.find(Icon)).to.have.length(1)
        })

        test('should format value', () => {
          const wrapper = mount(
            <TestThemeProvider>
              <DescriptionFormatter
                value="<p>TEST TEST</p>"
                options={{
                  mode: 'text',
                  title: 'Title!'
                }}
              />
            </TestThemeProvider>
          )
          expect(wrapper.find(Icon)).to.have.length(0)
          expect(wrapper.text()).to.equal('Title!TEST TEST')
        })
      })
    })
  })
})
