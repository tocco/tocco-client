import ActionContainer from '../../containers/ActionContainer'
import SelectionControllerContainer from '../../containers/SelectionControllerContainer'
import {getActionBar} from '../../util/api/forms'

export const getActionBarContent = ({
  dataLoadingInProgress,
  formDefinition,
  parent,
  showSelectionController,
  showActions
}) => {
  if (formDefinition) {
    const selectionController = showSelectionController
      ? [<SelectionControllerContainer key="selectionController" />]
      : []

    const actionBar = getActionBar(formDefinition)
    const actions =
      showActions !== false && actionBar
        ? [
            <ActionContainer
              key={`listAction-${actionBar.id}`}
              definition={actionBar}
              parent={parent}
              disabled={dataLoadingInProgress}
            />
          ]
        : []

    const content = [...selectionController, ...actions]

    return {content, actionBar}
  }

  return null
}
