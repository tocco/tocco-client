import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
import {ThemeProvider} from 'styled-components'

import DateTimeEdit from './DateTimeEdit'
import DateAbstract from './DateAbstract'

const theme = {
  colors: {
    text: '#212121'
  }
}

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateTimeEdit ', () => {
        test('should render an instance of DateAbstract', () => {
          const wrapper = intlEnzyme.mountWithIntl(
            <ThemeProvider theme={theme}>
              <DateTimeEdit onChange={EMPTY_FUNC}/>
            </ThemeProvider>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
        })
      })
    })
  })
})
