import PropTypes from 'prop-types'
import {rest, form} from 'tocco-app-extensions'
import EntityBrowserApp from 'tocco-entity-browser/src/main'
import {searchFormTypePropTypes} from 'tocco-entity-list/src/main'
import {appContext as appContextPropType, api} from 'tocco-util'

export function* modifyDetailForm(formDefinition, inputDataKey) {
  const inputData = yield rest.fetchEntity(
    'Input_data',
    inputDataKey,
    {
      paths: [
        'dispense',
        'relInput.relInput_visibility_status.unique_id',
        'relInput.relInput_node.relInput_type.unique_id'
      ]
    },
    {},
    api.getFlattenEntity
  )
  const inputType = inputData['relInput.relInput_node.relInput_type.unique_id']
  const detailsVisible = inputData['relInput.relInput_visibility_status.unique_id'] === 'visible_detail'
  const dispense = inputData.dispense
  const modifiedForm = handleRatingBox(formDefinition, detailsVisible, dispense, inputType)
  return removeDetailFields(modifiedForm, inputType, dispense)
}

const handleRatingBox = (formDefinition, detailsVisible, dispense, inputType) => {
  if (dispense || ['presence', 'free_text', 'choice_rating'].includes(inputType)) {
    return form.removeBoxes(formDefinition, ['ratings', 'no_ratings'])
  } else if (detailsVisible) {
    return form.removeBoxes(formDefinition, ['no_ratings'])
  } else {
    return form.removeBoxes(formDefinition, ['ratings'])
  }
}

const removeDetailFields = (formDefinition, inputType, dispense) => {
  if (dispense) {
    return form.removeFieldsByPredicate(
      formDefinition,
      (item, container) => container.id === 'result' && item.id !== 'dispense'
    )
  }

  switch (inputType) {
    case 'grades':
    case 'grades_drop':
    case 'grades_mandatory':
    case 'grades_max':
      return form.removeFields(formDefinition, [
        'value',
        'percentage_reached',
        'relInput.relInput_node.points_max',
        'relChoice_rating_value.label',
        'text',
        'calculated_presence'
      ])
    case 'points':
      return form.removeFields(formDefinition, [
        'definate_grade',
        'pre_grade',
        'relChoice_rating_value.label',
        'text',
        'calculated_presence'
      ])
    case 'points_threshold':
      return form.removeFields(formDefinition, [
        'pre_grade',
        'relChoice_rating_value.label',
        'text',
        'calculated_presence'
      ])
    case 'presence':
      return form.removeFields(formDefinition, [
        'relInput.num_ratings',
        'definate_grade',
        'pre_grade',
        'value',
        'percentage_reached',
        'relInput.relInput_node.points_max',
        'relChoice_rating_value.label',
        'text'
      ])
    case 'choice_rating':
      return form.removeFields(formDefinition, [
        'relInput.num_ratings',
        'definate_grade',
        'pre_grade',
        'value',
        'percentage_reached',
        'relInput.relInput_node.points_max',
        'text',
        'calculated_presence'
      ])
    case 'free_text':
      return form.removeFields(formDefinition, [
        'relInput.num_ratings',
        'definate_grade',
        'pre_grade',
        'value',
        'percentage_reached',
        'relInput.relInput_node.points_max',
        'relChoice_rating_value.label',
        'calculated_presence'
      ])
    default:
      return formDefinition
  }
}

export function* modifyRatingListForm(formDefinition, inputDataKey) {
  const inputData = yield rest.fetchEntity(
    'Input_data',
    inputDataKey,
    {
      paths: ['relInput.relInput_node.relInput_type.unique_id']
    },
    {},
    api.getFlattenEntity
  )
  const inputType = inputData['relInput.relInput_node.relInput_type.unique_id']
  return removeListFields(formDefinition, inputType)
}

const removeListFields = (formDefinition, inputType) => {
  switch (inputType) {
    case 'grades':
    case 'grades_drop':
    case 'grades_mandatory':
    case 'grades_max':
      return form.removeFields(formDefinition, ['points', 'relExam.max_points'])
    case 'points':
    case 'points_threshold':
      return form.removeFields(formDefinition, ['grade', 'relExam.weight'])
    default:
      return formDefinition
  }
}

export function* modifyFormDefinition(formDefinition, {parent, entityId}) {
  if (formDefinition.id === 'User_grades_detail') {
    return yield modifyDetailForm(formDefinition, entityId)
  } else if (formDefinition.id === 'User_grades_detail_relRating_list') {
    return yield modifyRatingListForm(formDefinition, parent.key)
  } else {
    return formDefinition
  }
}

const UserGrades = ({reportIds, searchFilters, limit, backendUrl, businessUnit, appContext, intl, searchFormType}) => {
  return (
    <EntityBrowserApp
      entityName="Input_data"
      formBase="User_grades"
      searchFilters={searchFilters}
      limit={limit}
      modifyFormDefinition={modifyFormDefinition}
      backendUrl={backendUrl}
      businessUnit={businessUnit}
      appContext={appContext}
      reportIds={reportIds}
      searchFormType={searchFormType}
    />
  )
}

UserGrades.propTypes = {
  reportIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchFilters: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  intl: PropTypes.object.isRequired,
  backendUrl: PropTypes.string,
  businessUnit: PropTypes.string,
  appContext: appContextPropType.propTypes.isRequired,
  searchFormType: searchFormTypePropTypes
}

export default UserGrades
