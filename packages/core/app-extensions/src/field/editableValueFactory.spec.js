import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {intlEnzyme} from 'tocco-test-util'
import {EditableValue, Range} from 'tocco-ui'

import editableValueFactory from './editableValueFactory'

describe('app-extensions', () => {
  describe('formField', () => {
    describe('editableValueFactory', () => {
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
              postcode: '8000'
            }
          }
        }
      }))

      test('should return simple editableValue', () => {
        const Field = editableValueFactory('string')

        const formField = {}
        const modelField = {}
        const formName = 'detailForm'
        const value = 'test'
        const info = {mandatory: false, readOnly: false}
        const onChangeSpy = sinon.spy()
        const events = {onChange: onChangeSpy}

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <Field
              formField={formField}
              modelField={modelField}
              formName={formName}
              value={value}
              info={info}
              events={events}
            />
          </Provider>
        )

        expect(wrapper.find(EditableValue)).to.have.length(1)
        expect(wrapper.find(EditableValue).props()).to.have.property('value', 'test')
      })

      test('should return range component if requested', () => {
        const Field = editableValueFactory('date')

        const formField = {
          expanded: true
        }
        const modelField = {}
        const formName = 'searchForm'
        const value = '2022-04-26'
        const info = {mandatory: false, readOnly: false}
        const onChangeSpy = sinon.spy()
        const events = {onChange: onChangeSpy}
        const formData = {
          intl: {
            formatMessage: obj => obj.id
          }
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <Field
              formField={formField}
              modelField={modelField}
              formName={formName}
              value={value}
              info={info}
              events={events}
              formData={formData}
              range
            />
          </Provider>
        )

        const rangeCmp = wrapper.find(Range)

        expect(rangeCmp).to.have.length(1)

        const rangeProps = rangeCmp.props()

        expect(rangeProps).to.have.property('expanded', true)
        expect(rangeProps).to.have.property('value', '2022-04-26')
        expect(rangeProps).to.have.property('fromText', 'client.component.range.from')
        expect(rangeProps).to.have.property('toText', 'client.component.range.to')
      })
    })
  })
})
