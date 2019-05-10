import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
import {ThemeProvider} from 'styled-components'

import DateAbstract from './DateAbstract'

const theme = {
  colors: {
    text: '#212121'
  }
}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DateAbstract', () => {
        test('should call initialized', done => {
          const initSpy = () => { done() }

          const wrapper = intlEnzyme.mountWithIntl(
            <ThemeProvider theme={theme}>
              <DateAbstract options={{}} initialized={initSpy}/>
            </ThemeProvider>
          )

          expect(wrapper.find('input')).to.have.length(2)
        })
      })
    })
  })
})
