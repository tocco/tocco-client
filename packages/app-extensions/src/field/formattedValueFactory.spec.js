import React from 'react'
import {FormattedValue} from 'tocco-ui'
import {mount} from 'enzyme'
import {TestThemeProvider} from 'tocco-test-util'

import formattedValueFactory from './formattedValueFactory'

describe('app-extensions', () => {
  describe('fomField', () => {
    describe('formattedValueFactory', () => {
      test('should return simple formattedValue', () => {
        const Field = formattedValueFactory('string')
        const formField = {dataType: 'string'}

        const value = 'test'

        const wrapper = mount(<Field value={value} formField={formField}/>)

        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(FormattedValue)).to.have.prop('value', value)
      })
    })

    test('should set value if type overwrites it', () => {
      const Field = formattedValueFactory('description')
      const text = 'Test'
      const formField = {
        componentType: 'description',
        mode: 'tooltip',
        title: 'Title',
        text
      }

      const wrapper = mount(<TestThemeProvider>
        <Field value={null} formField={formField}/>
      </TestThemeProvider>
      )

      expect(wrapper.find(FormattedValue)).to.have.prop('value', text)
    })

    test('should set options if type overwrites it', () => {
      const Field = formattedValueFactory('description')
      const title = 'Test'
      const mode = 'text'
      const formField = {
        componentType: 'description',
        mode,
        title
      }

      const wrapper = mount(<TestThemeProvider>
        <Field value={null} formField={formField}/>
      </TestThemeProvider>
      )

      expect(wrapper.find(FormattedValue)).to.have.prop('options').deep.equal({mode, title})
    })
  })
})
