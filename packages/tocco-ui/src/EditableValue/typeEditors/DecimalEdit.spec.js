import React from 'react'
import {mount} from 'enzyme'

import DecimalEdit from './DecimalEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DecimalEdit ', () => {
        it('should render DecimalEdit', () => {
          const number = 1234567.89
          const optionsObject = {intl: {locale: 'de-CH'}}
          const wrapper = mount(
            <DecimalEdit value={number} options={optionsObject} />
          )
          expect(wrapper.find('NumberFormat')).to.have.length(1)
        })
        it('should return number string in de-CH', () => {
          const number = 1234567.89
          const result = '1’234’567.89'
          const optionsObject = {intl: {locale: 'de-CH'}}
          const wrapper = mount(
            <DecimalEdit value={number} options={optionsObject} />
          )
          expect(wrapper.html()).to.contains(result)
        })
        it('should return number string in en', () => {
          const number = 1234567.89
          const result = '1,234,567.89'
          const optionsObject = {intl: {locale: 'en'}}
          const wrapper = mount(
            <DecimalEdit value={number} options={optionsObject} />
          )
          expect(wrapper.html()).to.contains(result)
        })
        it('should return number string in fr', () => {
          const number = 1234567.89
          const result = '1&nbsp;234&nbsp;567,89'
          const optionsObject = {intl: {locale: 'fr'}}
          const wrapper = mount(
            <DecimalEdit value={number} options={optionsObject} />
          )
          expect(wrapper.html()).to.contains(result)
        })
      })
    })
  })
})
