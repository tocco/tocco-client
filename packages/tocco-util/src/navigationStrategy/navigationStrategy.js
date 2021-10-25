import PropTypes from 'prop-types'

/**
 * navigationStrategy is an object that consists of react elements and functions to help navigate in an app. It can be
 * used to be passed down from a root app componenet, that has knowledge of the routing (e.g. admin or entity-browser).
 * For example a remote field (tocco-ui) does not know how to compose a link to open a detail view. But it should
 * be able to create a link for a value. The root app, in this case tocco-admin, can create a navigationStrategy object
 * with a DetailLink attribute. The navigation strategy can be set on the entity-detail oder entity-list app where its
 * passed down to the select component. React element attributes (e.g DetailLink) help to render visual links and
 * functions are for programmatically navigations.
*/

export const propTypes = PropTypes.shape({
  /**
   * Displays a link to a detail view.
   * Required properties:
   *  entityName {string}
   *  entityKey {string}
   *  children {element}
   */
  DetailLink: PropTypes.elementType,
  /**
   * Displays a link to a list.
   * Required properties:
   *  entityName {string}
   *  children {element}
   * Optional properties:
   *  entityKeys {[string]} to filter the list
   */
  ListLink: PropTypes.elementType,
  /**
   * Displays a link to a list or a detail view if exact one entity is passed.
   * Required properties:
   *  entityName {string}
   *  entityKey {string}
   *  entityKeys {[string]}
   */
  ListOrDetailLink: PropTypes.elementType,
  /**
   * Displays a link to a detail relative to the current path. e.g. to open a detail in a list view
   * Properties:
   *  entityKey {string}
   *  children {element}
   * Optional properties:
   *  relationName {string} to link a related entity
   */
  DetailLinkRelative: PropTypes.elementType,
  /**
   * Navigates to the corresponding create view.
   * Params:
   *  relationName {string} can be undefined. For navigating to a related entities create page
   *  state {object} any state that will be passed to the create view (e.g. for default values)
   */
  navigateToCreateRelative: PropTypes.func,
  /**
   * Navigates to a fullscreen action.
   * Params:
   *  actionDefinition {object}
   *  selection {object}
   */
  navigateToActionRelative: PropTypes.func,

  /**
   * Opens the detail of an entity in a new tab
   * Params:
   *  entityName {string} the model of the entity to open
   *  key {string} the key of the entity to open
   */
  openDetail: PropTypes.func
})
