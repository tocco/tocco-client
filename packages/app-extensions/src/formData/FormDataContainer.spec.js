import React from 'react'
import {intlEnzyme} from 'tocco-test-util'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import FormDataContainer from './FormDataContainer'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('FormDataContainer', () => {
      const store = createStore(() => ({
        formData: {
          relationEntities: {
            data: {
              relUser: [{key: 1}, {key: 3}],
              relUser2: [{key: 33}]
            }
          },
          tooltips: {data: {}}

        },
        form: {
          detailForm: {
            values: {
              canton_c: 'ZH',
              city_c: 'Zurich',
              zip: '8000'
            }
          }
        }
      }))

      const Content = () => <span/>

      test('should set intl', () => {
        const wrapper = intlEnzyme.mountWithIntl(<Provider store={store}>
          <FormDataContainer>
            <Content/>
          </FormDataContainer></Provider>)

        expect(wrapper.find(Content).props()).to.have.property('formData')
        expect(wrapper.find(Content).props().formData).to.have.property('intl')
      })

      test('should form values', () => {
        const wrapper = intlEnzyme.mountWithIntl(<Provider store={store}>
          <FormDataContainer formValues={{formName: 'detailForm', fields: ['canton_c', 'city_c']}}>
            <Content/>
          </FormDataContainer></Provider>)

        expect(wrapper.find(Content).props().formData.formValues).to.eql({canton_c: 'ZH', city_c: 'Zurich'})
      })

      test('should relation entities', () => {
        const wrapper = intlEnzyme.mountWithIntl(<Provider store={store}>
          <FormDataContainer relationEntities="relUser2">
            <Content/>
          </FormDataContainer></Provider>)

        expect(wrapper.find(Content).props().formData.relationEntities).to.eql({relUser2: [{key: 33}]})
      })
    })
  })
})
