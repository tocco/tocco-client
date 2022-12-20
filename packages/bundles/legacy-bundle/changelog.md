0.1.20
- enhance external events
- add states (list, detail, fullscreen-action)
- add onStateChange event

0.1.19
- fix object cache

0.1.18
- re-load data on login
- add object cache
- use global object cache

0.1.17
- allow padding of Button to be removed like when used as icon
- allow Action to be rendered as text without button visual
- export action types to use same names everywhere
- confirm modals now use whichever default action the backend declares, which means switching the styling and keyboard shortcut

0.1.16
- prevent action buttons within table of being missaligned in widgets

0.1.15
- order range values on top instead of side by side to improve ux
- remove the split pane feature as it doesn not improve UX and wrap scheduler in generic sidepanel component
- create ENTITY_DOCS selection for legacy actions
- move submit button to parent
- add sync validation to template form
- disable submit button for invalid form

0.1.14
- support identifier type in tql builder
- enforce css selectors
- enforce css selectors
- fix null as end date

0.1.13
- fix save button being clipped and change hover on error
- fix react-select dropdown being clipped inside input-edit table
- link for max 100 created entities
- add docs-tree search
- add conditional selection for tables
- only select entities for docs tree search

0.1.12
- allow target attribute in html
- harmonize spacing of input edit action wrapper

0.1.11
- do not use default display for tooltips again

0.1.10
- remove div wrapper of entity-browser as it was preventing it from filling the full available height when embedded in the old client
- send selection to adjusted POST endpoint when loading report settings
- use a new custom display when displaying entities in select boxes

0.1.9
- harmonize spacing of ranged dates by increasing search panel width
- simplify widget code

0.1.8
- reintroduce min-width for Ball component, since normal width caused rendering issues in the main menu
- replace useWindowWidth hook with universal useWindowSize hook
- possible to define custom render for actions
- define back button through custom render

0.1.7
- do not collapse sidepanel on top

0.1.6
- show time in 24h format for all locales
- show time in 24h format for all locales

0.1.5
- move toasters on mobile to bottom for better ux as most of the interaction elements (e.g actions) are on top and should not be covered

0.1.4
- input edit info action for showing meta info
- add input-edit-info action
- do not reload fullscreen action on single action
- be able to click on row in action cell

0.1.3
- add collapsible sidepanel component
- possible to pass beforeRenderField func
- introduce legacy-admin embed type
- same sidepanel behaviour as in admin
- use reusable sidepanel component
- use simple_advanced search form
- autofocus form fields
- prepare sso-login widget for widget embedType

0.1.2
- remove tocco subdomain

0.1.1
- use Icon component in LoadingSpinner
- replace values of readonly input fields with loading spinner while the update request is processing

0.1.0
- Initial release
