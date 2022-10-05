import _get from 'lodash/get'
import {rest} from 'tocco-app-extensions'

import {listForm, detailForm} from '../../dev/testForm'
import {modifyFormDefinition} from './UserGrades'

describe('widgets', () => {
  describe('user-grades', () => {
    describe('UserGrades', () => {
      function* getModifiedFormDefinition(formDefinition) {
        return yield modifyFormDefinition(formDefinition, {parent: {key: '1'}, entityId: '1'})
      }

      const buildInputDataResponse = ({dispense = false, inputType = 'grades', visibility = 'visible_detail'}) => ({
        dispense,
        'relInput.relInput_node.relInput_type.unique_id': inputType,
        'relInput.relInput_visibility_status.unique_id': visibility
      })

      describe('modifyDetailForm', () => {
        const getBoxIds = formDefinition =>
          _get(formDefinition, ['children', '0', 'children', '0', 'children']).map(child => child.id)
        const getResultFields = formDefinition =>
          _get(formDefinition, ['children', '0', 'children', '0', 'children', '1', 'children']).map(child => child.id)

        test('should remove rating table and message on dispense', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({dispense: true}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getBoxIds(formDefinition)).to.have.members(['master_data', 'result'])
        })
        test('should remove rating table and message on type without ratings', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({inputType: 'presence'}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getBoxIds(formDefinition)).to.have.members(['master_data', 'result'])
        })
        test('should remove rating table on details hidden', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({visibility: 'visible'}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getBoxIds(formDefinition)).to.have.members(['master_data', 'result', 'no_ratings'])
        })
        test('should remove message when ratings visible', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getBoxIds(formDefinition)).to.have.members(['master_data', 'result', 'ratings'])
        })

        test('should remove all fields on dispense', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({dispense: true}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getResultFields(formDefinition)).to.have.members(['dispense'])
        })
        test('should display grades fields', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({inputType: 'grades'}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getResultFields(formDefinition)).to.have.members(['definate_grade', 'pre_grade', 'dispense'])
        })
        test('should display points fields', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({inputType: 'points'}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getResultFields(formDefinition)).to.have.members([
            'value',
            'percentage_reached',
            'relInput.relInput_node.points_max',
            'dispense'
          ])
        })
        test('should display points threshold fields', function* () {
          jest
            .spyOn(rest, 'fetchEntity')
            .mockImplementationOnce(() => buildInputDataResponse({inputType: 'points_threshold'}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getResultFields(formDefinition)).to.have.members([
            'definate_grade',
            'value',
            'percentage_reached',
            'relInput.relInput_node.points_max',
            'dispense'
          ])
        })
        test('should display presence fields', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({inputType: 'presence'}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getResultFields(formDefinition)).to.have.members(['calculated_presence', 'dispense'])
        })
        test('should display text fields', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({inputType: 'free_text'}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getResultFields(formDefinition)).to.have.members(['text', 'dispense'])
        })
        test('should display choice fields', function* () {
          jest
            .spyOn(rest, 'fetchEntity')
            .mockImplementationOnce(() => buildInputDataResponse({inputType: 'choice_rating'}))
          const formDefinition = yield getModifiedFormDefinition(detailForm)
          expect(getResultFields(formDefinition)).to.have.members(['relChoice_rating_value.label', 'dispense'])
        })
      })
      describe('modifyRatingListForm', () => {
        const getColumns = formDefinition => _get(formDefinition, ['children', '0', 'children']).map(child => child.id)
        test('should display grades fields', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({inputType: 'grades'}))
          const formDefinition = yield getModifiedFormDefinition(listForm)
          expect(getColumns(formDefinition)).to.have.members(['id_name', 'relExam.date', 'relExam.weight', 'grade'])
        })
        test('should display points fields', function* () {
          jest.spyOn(rest, 'fetchEntity').mockImplementationOnce(() => buildInputDataResponse({inputType: 'points'}))
          const formDefinition = yield getModifiedFormDefinition(listForm)
          expect(getColumns(formDefinition)).to.have.members([
            'id_name',
            'relExam.date',
            'relExam.max_points',
            'points'
          ])
        })
      })
    })
  })
})
