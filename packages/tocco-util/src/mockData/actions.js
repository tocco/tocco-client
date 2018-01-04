import _map from 'lodash/map'
import consoleLogger from '../consoleLogger'
import {sleep} from './mockData'

export const setupActions = (fetchMock, entityStore, timeout = 2000) => {
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/yesNoClientQuestion*?'),
    yesNoClientQuestion(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/formClientQuestion*?'),
    formClientQuestion(timeout)
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleAction*?'),
    simpleAction(timeout)
  )
}

const simpleAction = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)

      return {
        status: 200,
        body: {
          successful: true,
          message: 'Action completed!'
        }
      }
    })
  }

const yesNoClientQuestion = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)
      const body = JSON.parse(opts.body)
      if (!body.clientAnswers) {
        return yesNoClientQuestionResponse
      } else {
        if (!body.clientAnswers.myYesNoQuestion) {
          return {
            successful: false,
            message: 'Action failed, this is on you!'
          }
        } else {
          return {successful: true}
        }
      }
    })
  }

const formClientQuestion = timeout =>
  (url, opts) => {
    return sleep(timeout).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)
      const body = JSON.parse(opts.body)
      if (!body.clientAnswers) {
        return formClientQuestionResponse
      } else {
        return {
          successful: true,
          message: _map(body.clientAnswers.myFormQuestion, v => v).join(', ')
        }
      }
    })
  }

const yesNoClientQuestionResponse = {
  clientQuestion: {
    id: 'myYesNoQuestion',
    handler: 'YesNoQuestionHandler',
    header: 'Fail?',
    message: 'Should this action fail?<br/>Choose wisely',
    yesText: 'NO!',
    noText: 'Yes, let it fail',
    cancelText: 'Cancel'
  }
}

const formClientQuestionResponse = {
  clientQuestion: {
    id: 'myFormQuestion',
    handler: 'FormQuestionHandler',
    header: 'Some questions',
    message: 'Please fill out the form',
    sendText: 'ok',
    cancelText: 'cancel',
    form: {
      name: 'Acceptor_detail',
      type: 'ch.tocco.nice2.model.form.components.Form',
      displayType: 'EDITABLE',
      scopes: [],
      children: [
        {
          name: 'box1',
          type: 'ch.tocco.nice2.model.form.components.layout.HorizontalBox',
          displayType: 'EDITABLE',
          scopes: [],
          children: [
            {
              name: 'box1',
              type: 'ch.tocco.nice2.model.form.components.layout.VerticalBox',
              displayType: 'EDITABLE',
              scopes: [],
              children: [
                {
                  name: 'textQuestion',
                  type: 'ch.tocco.nice2.model.form.components.simple.TextField',
                  displayType: 'EDITABLE',
                  scopes: [],
                  children: [],
                  label: 'Text',
                  useLabel: 'YES',
                  dataType: 'string',
                  reverseRelationName: null,
                  defaultValue: 'Test'
                },
                {
                  name: 'numberQuestion',
                  type: 'ch.tocco.nice2.model.form.components.simple.NumberField',
                  displayType: 'EDITABLE',
                  scopes: [],
                  children: [],
                  label: 'Number',
                  useLabel: 'YES',
                  dataType: 'integer',
                  reverseRelationName: null,
                  defaultValue: 99
                },
                {
                  name: 'booleanQuestion',
                  type: 'ch.tocco.nice2.model.form.components.simple.Checkbox',
                  displayType: 'EDITABLE',
                  scopes: [],
                  children: [],
                  label: 'Bool',
                  useLabel: 'YES',
                  dataType: 'boolean',
                  reverseRelationName: null,
                  defaultValue: true
                },
                {
                  name: 'relMulti_entity',
                  type: 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox',
                  displayType: 'EDITABLE',
                  children: [],
                  label: 'Dummy entity',
                  useLabel: 'YES'
                }
              ]
            }
          ]
        }
      ],
      label: null,
      useLabel: 'NO'
    },
    model: {
      fields: [
        {
          fieldName: 'textQuestion',
          validation: {
            mandatory: true,
            minLength: 3
          }
        }
      ],
      relations: [
        {
          relationName: 'relMulti_entity',
          targetEntity: 'Dummy_entity',
          reverseRelationName: 'relUser',
          multi: true,
          validation: {
            mandatory: true
          }
        }
      ]
    }
  }
}
