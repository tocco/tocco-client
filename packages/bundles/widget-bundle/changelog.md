0.1.77
- user now gets new widget forms for personal-dms

0.1.76
- add back button
- use core back button
- use core back button for cancel

0.1.75
- enhance external events
- add states (list, detail, fullscreen-action)
- add onStateChange event

0.1.74
- fix object cache

0.1.73
- re-load data on login
- add object cache
- use global object cache

0.1.72
- allow padding of Button to be removed like when used as icon
- allow Action to be rendered as text without button visual
- export action types to use same names everywhere
- confirm modals now use whichever default action the backend declares, which means switching the styling and keyboard shortcut

0.1.71
- prevent action buttons within table of being missaligned in widgets

0.1.70
- order range values on top instead of side by side to improve ux
- create ENTITY_DOCS selection for legacy actions
- move submit button to parent
- add sync validation to template form
- disable submit button for invalid form

0.1.69
- support identifier type in tql builder
- enforce css selectors
- enforce css selectors

0.1.68
- fixed width for user-menu

0.1.67
- fix save button being clipped and change hover on error
- fix react-select dropdown being clipped inside input-edit table
- link for max 100 created entities
- add docs-tree search
- add conditional selection for tables
- only select entities for docs tree search
- set folders as root folders

0.1.66
- allow target attribute in html
- harmonize spacing of input edit action wrapper

0.1.65
- do not use default display for tooltips again

0.1.64
- remove div wrapper of entity-browser as it was preventing it from filling the full available height when embedded in the old client
- send selection to adjusted POST endpoint when loading report settings
- use a new custom display when displaying entities in select boxes

0.1.63
- harmonize spacing of ranged dates by increasing search panel width
- add public dms widget
- add public-dms widget to bundle
- simplify widget code

0.1.62
- reintroduce min-width for Ball component, since normal width caused rendering issues in the main menu
- replace useWindowWidth hook with universal useWindowSize hook
- possible to define custom render for actions
- define back button through custom render

0.1.61
- do not collapse sidepanel on top

0.1.60
- show time in 24h format for all locales

0.1.59
- move toasters on mobile to bottom for better ux as most of the interaction elements (e.g actions) are on top and should not be covered
- setup envs for entity-dms
- setup envs for personal-dms

0.1.58
- input edit info action for showing meta info
- add input-edit-info action
- do not reload fullscreen action on single action
- be able to click on row in action cell

0.1.57
- add widget entity-dms
- add collapsible sidepanel component
- possible to pass beforeRenderField func
- introduce legacy-admin embed type
- same sidepanel behaviour as in admin
- use reusable sidepanel component
- use simple_advanced search form
- autofocus form fields
- prepare sso-login widget for widget embedType

0.1.56
- remove tocco subdomain

0.1.55
- do not use unnecessary generator function
- use Icon component in LoadingSpinner
- replace values of readonly input fields with loading spinner while the update request is processing

0.1.54
- add missing setInputEnvs

0.1.53
- move component specific event handlers
- pass redirectUri for sso logins in widgets
- add user menu widget
- add sso-login and login package to widget bundle

0.1.52
- fix null values in field name transformation
- support nested paths in location field
- provide entityField for create field config
- use long as datetime value

0.1.51
- allow componentConfigs to adjust value used
- use correct decimal digits and % suffix for percentage fields
- use FormattedNumber in percent mode in PercentFormatter
- always show search filter button icons on touch devices because of missing hover function
- increase top padding of input label to prevent cut off

0.1.50
- add personal dms widget

0.1.49
- disable removing outputjob toasters in widgets
- fix performance of fulltext search

0.1.48
- add export action to entity-browser
- prevent body scroll when modal is opened

0.1.47
- use back button in main action bar

0.1.46
- improve responsiveness of table component
- datepicker keyboard handling
- do not lazy load datepicker
- autofocus datepickers

0.1.45
- add helpers to remove fields from forms
- create user-grades widget

0.1.44
- fix escape handling in tql fulltext search

0.1.43
- improve save button look on error

0.1.42
- time input component
- fix scroll on select

0.1.41
- add mobile collapse feature on list view
- add widget config key to env
- use widget config key from env
- add custom create endpoint to validation
- add custom create endpoint
- add copy action to entity-browser
- remove removeCreate form modifier
- add addCreate form modifier
- use addCreate form modifier
- use addCreate form modifier
- load defalut values on action forms

0.1.40
- do not refresh list multiple times
- show correct search form in subgrid

0.1.39
- add user availability widget
- add pen-field icon
- increase menu item padding on touch devices for better usability

0.1.38
- transform QUERY to ID selection for actions (if custom endpoint)

0.1.37
- let entity list handle changed props properly
- ignore any text and textarea fields of a datepicker when autofocusing

0.1.36
- fix date picker icon

0.1.35
- fix null pointer when starting in standalone mode
- added action callbacks to navigate back

0.1.34
- fix datepicker year dropdown closing on scroll
- fix whitespace in notification

0.1.33
- close datepicker on scroll
- add calendar icon
- add icon to date picker

0.1.32
- add model name to notification

0.1.31
- add 'cancel' custom action to go back

0.1.30
- implement sticky buttons for simple-form modal
- reset select dropdown to older state and implement close on scroll feature
- fix select dropdown dimension calculations

0.1.29
- adjust sizing of datepicker on mobile screens
- make constriction, search filters, tql and keys passed through input props work again

0.1.28
- generate reports without dialog in widgets

0.1.27
- collapse buttons when wrapper is too small
- use responsiveness buttons on action bar
- use responsiveness buttons for actions

0.1.26
- add ballot-check icon
- use more generic error message when no Calendar_export_conf could be found

0.1.25
- quick fix that onChange is not infinite often triggered

0.1.24
- HTML editor: fix saving the form in source editing mode

0.1.23
- apply global styles to fix datepicker
- enable fullscreen modals for mobile/touch devices

0.1.22
- show collapse/expand icon on touch devices in panel header/footer
- harmonize modal spacing of modal message

0.1.21
- remove date picker arrow as the positioning seems to be off when fields are too long

0.1.20
- add business unit to input props
- fix position of reports in form modifier
- fix datetime range with single default value
- do not clear date input on blur

0.1.19
- improve datepicker styling and fix bugs in widgets
- force hover styles of upload button when hovering upload field
- remove advanced search text in modal title
- fix input label being cut in widgets

0.1.18
- remount entity-detail app after navigation
- change signal box background colors for more consistency

0.1.17
- add stint auction widget
- fix change date on range date picker
- fix datetime search field with default value
- keep ckeditor as similar as legacy editor

0.1.16
- check form definition if form is markable

0.1.15
- only cache displays as long as tab is open

0.1.14
- use constrictions from form in remotefield as well

0.1.13
- fix navigation to subfolder inside search results

0.1.12
- remotefields now sort the same way in select box and advanced search (form sorting first, then last updated)

0.1.11
- use save aborted key as textresource instead of message directly

0.1.10
- reports added through formModifier are now placed directly into the action bar, instead of the output group
- report definitions now contain an icon as defined by the backend

0.1.9
- entity-browser can now display reports passed as ids in input
- remote fields now honor the constrictions defined on forms with remotefield scope
- advanced search now uses form with remotefield scope if it exists
- remotefields now use sorting of their forms or entity models instead of only their timestamp

0.1.8
- fix remote error handler
- create removeBoxes to help adjust forms
- create mailing-list widget
- use reports from widget config to user list
- create mailing-list-mail-action for mailing-list flow
- fix error logging app extension
- add error boundary

0.1.7
- prepare for customer actions
- prepare for customer actions

0.1.6
- add condition to remote and select field
- simple actions add conditions

0.1.5
- add css classes for display expressions styling

0.1.4
- Length and size validators no longer trigger if the max or min is not defined

0.1.3
- refactor business unit input properties

0.1.2
- add disableDetailView property
- add reservation-lecturer-booking-view widget
- add subscribe-calendar action to entity-browser
- add reservation-lecturer-booking-view widget
- add form properties to prepare request

0.1.1
- fix state handling for report settings
- fix form mapping for search componentConfig
- use boolean search component for marking

0.1.0
- Initial release
