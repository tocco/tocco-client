import _get from 'lodash/get'
import {IntlStub} from 'tocco-test-util'

import {getGroupedValues, getFormDataDefaults, getModel, getFormDefinition} from './report'
describe('tocco-util', () => {
  describe('actions', () => {
    describe('utils', () => {
      describe('report', () => {
        describe('getGroupedValues', () => {
          it('should return values by group name', () => {
            const settingsDefinition = {generalSettings: [{id: 'a'}, {id: 'c'}], customSettings: [{id: 'b'}]}
            const values = {a: 1, b: 2, c: 3}

            const result = getGroupedValues(settingsDefinition, values)
            expect(result).to.eql({generalSettings: {a: 1, c: 3}, recipientSettings: {}})
          })

          it('should handle a empty group', () => {
            const settingsDefinition = {generalSettings: null}
            const values = {a: 1}

            const result = getGroupedValues(settingsDefinition, values)
            expect(result).to.eql({generalSettings: {}, recipientSettings: {}})
          })
        })

        describe('getFormDataDefaults', () => {
          it('should return an object with relatinEntites', () => {
            const options1 = [{key: 1, display: 'a'}, {key: 2, display: 'b'}]
            const options2 = [{key: 3, display: 'c'}, {key: 4, display: 'd'}]

            const settingsDefinition = {
              generalSettings: null,
              recipientSettings: [{id: 'a', options: options1}, {id: 'b', options: options2}]
            }

            const result = getFormDataDefaults(settingsDefinition)
            expect(result).to.eql({
              relationEntities: {
                a: options1,
                b: options2
              }
            })
          })
        })

        describe('getModel', () => {
          it('should return a model', () => {
            const settingsDefinition = {
              generalSettings: [
                {id: 'relSomething', type: 'multi-selext-box', targetEntity: 'User', validation: {mandatory: false}},
                {id: 'shouldDo', type: 'boolean', validation: {mandatory: true}}
              ],
              recipientSettings: null
            }

            const expectedResult = {
              relSomething: {
                targetEntity: 'User',
                validation: {mandatory: false}
              },
              shouldDo: {
                validation: {mandatory: true}
              }
            }

            expect(getModel(settingsDefinition)).to.eql(expectedResult)
          })
        })

        describe('getFormDefinition', () => {
          it('should return a form definition with the fields wrapped by a vertical box', () => {
            const settingsDefinition = {
              generalSettings: [
                {id: 'someString', type: 'string', label: 'Some String'}
              ],
              recipientSettings: [
                {id: 'someInt', type: 'integer', label: 'Some Int'}
              ]
            }

            const formDefinition = getFormDefinition(settingsDefinition, IntlStub)

            expect(formDefinition).to.have.property('componentType', 'form')
            expect(_get(formDefinition, 'children[0].layoutType')).to.eql('vertical-box')
            expect(_get(formDefinition, 'children[0].children[0].label')).to.eql('Some String')
            expect(_get(formDefinition, 'children[1].children[0].label')).to.eql('Some Int')
          })
        })
      })
    })
  })
})
