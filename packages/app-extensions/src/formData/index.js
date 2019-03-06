import {addToStore, relationEntitiesSelector, tooltipSelector, formDataPropType} from './formData'
import {loadRelationEntities} from './relationEntities/actions'
import {loadTooltip} from './tooltips/actions'
import {openAdvancedSearch} from './advancedSearch/actions'
import {changeFieldValue} from './values/actions'
import {uploadDocument} from './upload/actions'

export default {
  addToStore,
  loadRelationEntities,
  loadTooltip,
  relationEntitiesSelector,
  tooltipSelector,
  openAdvancedSearch,
  formDataPropType,
  changeFieldValue,
  uploadDocument
}
