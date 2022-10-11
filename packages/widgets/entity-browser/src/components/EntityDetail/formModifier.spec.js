import {call} from 'redux-saga/effects'
import {IntlStub} from 'tocco-test-util'

import {modifyFormDefinition} from './formModifier'

const expectsBackButton = modifiedFormDefinition => {
  const mainActionBar = modifiedFormDefinition.children[0]
  expect(mainActionBar.children.length).to.eql(2)
  expect(mainActionBar.children[0].id).to.eql('back')
}

const expectsNoBackButton = modifiedFormDefinition => {
  const mainActionBar = modifiedFormDefinition.children[0]
  expect(mainActionBar.children.length).to.eql(1)
  expect(mainActionBar.children[0].id).to.eql('actions')
}

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityDetail', () => {
      describe('formModifier', () => {
        describe('modifyFormDefinition', () => {
          const formDefinition = {
            componentType: 'form',
            children: [
              {
                id: 'main-action-bar',
                componentType: 'action-bar',
                children: [{id: 'actions', componentType: 'action-group'}]
              }
            ]
          }
          const entityName = 'User'
          const entityId = '123'

          test('should add back button on detail form definition', () => {
            const context = {entityName, entityId}
            const props = {detailParams: {entityName, entityId, showBackButton: true}, intl: IntlStub}

            const modifiedFormDefinition = modifyFormDefinition(formDefinition, context, props).next().value

            expectsBackButton(modifiedFormDefinition)
          })

          test('should not add back button on subtable form definition', () => {
            const context = {parent: {}}
            const props = {detailParams: {entityName, entityId, showBackButton: true}, intl: IntlStub}

            const modifiedFormDefinition = modifyFormDefinition(formDefinition, context, props).next().value

            expectsNoBackButton(modifiedFormDefinition)
          })

          test('should not add back button on detail form definition when its disabled', () => {
            const context = {entityName, entityId}
            const props = {detailParams: {entityName, entityId, showBackButton: false}, intl: IntlStub}

            const modifiedFormDefinition = modifyFormDefinition(formDefinition, context, props).next().value

            expectsNoBackButton(modifiedFormDefinition)
          })

          test('should call modifyFormDefintion from props first', () => {
            const context = {entityName, entityId}
            const props = {
              detailParams: {entityName, entityId, showBackButton: true},
              intl: IntlStub,
              modifyFormDefinition: sinon.spy()
            }

            const generator = modifyFormDefinition(formDefinition, context, props)
            const callEffect = generator.next().value
            expect(callEffect).to.deep.equal(call(props.modifyFormDefinition, formDefinition, context))

            const mockedFormDefinitionResult = {
              componentType: 'form',
              children: [
                {
                  id: 'main-action-bar',
                  componentType: 'action-bar',
                  children: []
                }
              ]
            }
            const modifiedFormDefinition = generator.next(mockedFormDefinitionResult).value
            const mainActionBar = modifiedFormDefinition.children[0]
            expect(mainActionBar.children.length).to.eql(1)
            expect(mainActionBar.children[0].id).to.eql('back')
          })
        })
      })
    })
  })
})
