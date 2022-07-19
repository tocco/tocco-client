import ace from 'ace-builds/src-min-noconflict/ace'
import fetchMock from 'fetch-mock'
import 'ace-builds/src-min-noconflict/ext-language_tools'

import TqlAutoCompleter from './TqlAutoCompleter'
import {functions, placeholders, types} from './TqlConstants'
import TqlMode from './TqlMode'

describe('tocco-ui', () => {
  describe('CodeEditor', () => {
    describe('TqlAutoCompleter', () => {
      let aceSession

      const runTest = async (
        expectedCompletions,
        positionToCompleteFrom,
        completionCallbacksToSkip = 0,
        implicitModel = null
      ) => {
        const completions = await new Promise(resolve =>
          TqlAutoCompleter(implicitModel).getCompletions(
            null,
            aceSession,
            positionToCompleteFrom,
            '',
            (errors, result) => {
              if (completionCallbacksToSkip <= 0) {
                resolve(result)
              }
              completionCallbacksToSkip--
            }
          )
        )
        expect(completions).to.deep.equals(expectedCompletions)
      }

      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()

        fetchMock.get('/nice2/rest/entities', {
          entities: {
            First: {
              metaData: {
                modelName: 'First',
                label: 'First Label'
              }
            },
            Second: {
              metaData: {
                modelName: 'Second',
                label: 'Second Label'
              }
            }
          }
        })
        fetchMock.get('/nice2/rest/entities/First/model', {
          fields: [
            {
              fieldName: 'field',
              type: 'string',
              label: 'Field Label'
            }
          ],
          relations: [
            {
              relationName: 'relRelation',
              targetEntity: 'Relation',
              label: 'Relation Label'
            }
          ]
        })
        fetchMock.get('/nice2/rest/entities/Implicit/model', {
          fields: [
            {
              fieldName: 'implicit',
              type: 'string',
              label: 'Implicit Field Label'
            }
          ],
          relations: [
            {
              relationName: 'relImplicit',
              targetEntity: 'Implicit',
              label: 'Implicit Relation Label'
            }
          ]
        })
        fetchMock.get('/nice2/rest/entities/First/model/resolve?path=relRelation', {
          fields: [
            {
              fieldName: 'some_field',
              type: 'int',
              label: 'Some Field Label'
            }
          ],
          relations: [
            {
              relationName: 'relAnother_model',
              targetEntity: 'Another_model',
              label: 'Another Model Label'
            },
            {
              relationName: 'relAnother_relation',
              targetEntity: 'Another_model',
              label: 'Another Relation Label'
            }
          ]
        })

        const testQuery = 'find First where relRelation.some_field == 10 order by field'
        aceSession = ace.createEditSession(testQuery, new TqlMode({implicitModel: ''}))
      })

      afterEach(() => {
        aceSession.destroy()
      })

      test('should load available models', async () => {
        const expectedCompletions = [
          {caption: 'First (First Label)', value: 'First', score: 1000},
          {caption: 'Second (Second Label)', value: 'Second', score: 1000}
        ]

        await runTest(expectedCompletions, {row: 0, column: 5})
      })

      test('should load available functions', async () => {
        const expectedCompletions = functions.map(f => ({
          caption: f.toUpperCase(),
          value: f.toUpperCase() + '()',
          meta: 'function',
          score: 970
        }))

        await runTest(expectedCompletions, {row: 0, column: 17})
      })

      test('should load available model paths', async () => {
        const expectedCompletions = [
          {caption: 'field (Field Label)', value: 'field', meta: 'string', score: 1000},
          {caption: 'relRelation (Relation Label)', value: 'relRelation', meta: 'Relation', score: 1000}
        ]

        await runTest(expectedCompletions, {row: 0, column: 17}, 1)
      })

      test('should load available model paths from implicit model', async () => {
        const expectedCompletions = [
          {caption: 'implicit (Implicit Field Label)', value: 'implicit', meta: 'string', score: 1000},
          {caption: 'relImplicit (Implicit Relation Label)', value: 'relImplicit', meta: 'Implicit', score: 1000}
        ]

        aceSession.setValue('')
        await runTest(expectedCompletions, {row: 0, column: 0}, 1, 'Implicit')
      })

      test('should load available model paths in order by', async () => {
        const expectedCompletions = [
          {caption: 'field (Field Label)', value: 'field', meta: 'string', score: 1000},
          {caption: 'relRelation (Relation Label)', value: 'relRelation', meta: 'Relation', score: 1000}
        ]

        await runTest(expectedCompletions, {row: 0, column: 55})
      })

      test('should load available relation paths', async () => {
        const expectedCompletions = [
          {caption: 'some_field (Some Field Label)', value: 'some_field', meta: 'int', score: 1000},
          {
            caption: 'relAnother_model (Another Model Label)',
            value: 'relAnother_model',
            meta: 'Another_model',
            score: 1000
          },
          {
            caption: 'relAnother_relation (Another Relation Label)',
            value: 'relAnother_relation',
            meta: 'Another_model',
            score: 1000
          }
        ]

        await runTest(expectedCompletions, {row: 0, column: 29})
      })

      test('should load available types', async () => {
        const expectedCompletions = types.map(t => ({
          caption: t,
          value: t + ':',
          meta: 'type',
          score: 980
        }))

        await runTest(expectedCompletions, {row: 0, column: 43})
      })

      test('should load available placeholders', async () => {
        const expectedCompletions = placeholders.map(p => ({
          caption: p,
          value: ':' + p,
          meta: 'placeholder',
          score: 990
        }))

        await runTest(expectedCompletions, {row: 0, column: 43}, 1)
      })
    })
  })
})
