import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
import {ThemeProvider} from 'styled-components'

import DateRangeEdit from './DateRangeEdit'
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
      describe('DateRangeEdit ', () => {
        test('should render an instance of DateAbstract', () => {
          const wrapper = intlEnzyme.mountWithIntl(
            <ThemeProvider theme={theme}>
              <DateRangeEdit onChange={EMPTY_FUNC}/>
            </ThemeProvider>
          )

          const dateAbstract = wrapper.find(DateAbstract)
          expect(dateAbstract).to.have.length(1)
        })
      })
    })
  })
})
