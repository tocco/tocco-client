1.0.111
- fix escape handling in tql fulltext search

1.0.110
- improve save button look on error

1.0.109
- time input component
- fix scroll on select

1.0.108
- fix reload button shifting when interacting with fullcalendar navigation
- add mobile collapse feature on list view
- change HTTP method of `rest.fetchEntity` to POST
- add widget config key to env
- add custom create endpoint to validation
- add custom create endpoint
- add copy action to entity-browser
- remove removeCreate form modifier
- add addCreate form modifier
- load defalut values on action forms

1.0.107
- do not refresh list multiple times
- show correct search form in subgrid

1.0.106
- add pen-field icon
- increase menu item padding on touch devices for better usability

1.0.105
- transform QUERY to ID selection for actions (if custom endpoint)

1.0.104
- fix mobile pane bug in detail view on small screens when right pane is open

1.0.103
- let entity list handle changed props properly
- ignore any text and textarea fields of a datepicker when autofocusing

1.0.102
- fix date picker icon

1.0.101
- fix null pointer when starting in standalone mode
- added action callbacks to navigate back
- remove locale from documentation url

1.0.100
- enable fullscreen menu on mobile devices
- fix datepicker year dropdown closing on scroll
- add mobile collapse feature to detail view
- fix null pointer in login box
- fix whitespace in notification

1.0.99
- close datepicker on scroll
- add calendar icon
- add icon to date picker

1.0.98
- add model name to notification

1.0.97
- add home icon to header and breadcrumbs
- fix navigating back handler for fullscreen actions
- add 'cancel' custom action to go back

1.0.96
- implement sticky buttons for simple-form modal
- reset select dropdown to older state and implement close on scroll feature
- fix select dropdown dimension calculations

1.0.95
- adjust sizing of datepicker on mobile screens
- make constriction, search filters, tql and keys passed through input props work again

1.0.94
- add redirect that happens after successful login, destination defined by widget config

1.0.93
- generate reports without dialog in widgets

1.0.92
- collapse buttons when wrapper is too small
- use responsiveness buttons on action bar
- use responsiveness buttons for actions

1.0.91
- add ballot-check icon
- use more generic error message when no Calendar_export_conf could be found

1.0.90
- quick fix that onChange is not infinite often triggered
- make username input prop optional else use current user

1.0.89
- HTML editor: fix saving the form in source editing mode

1.0.88
- enable fullscreen modals for mobile/touch devices

1.0.87
- show collapse/expand icon on touch devices in panel header/footer
- harmonize modal spacing of modal message

1.0.86
- remove date picker arrow as the positioning seems to be off when fields are too long
- fix overflowing text in fullcalender entries
- prevent relation box count label from being cut on overflow

1.0.85
- fix position of reports in form modifier
- fix datetime range with single default value
- do not clear date input on blur

1.0.84
- improve datepicker styling and fix bugs in widgets
- force hover styles of upload button when hovering upload field
- remove advanced search text in modal title
- fix input label being cut in widgets

1.0.83
- remount entity-detail app after navigation
- change signal box background colors for more consistency

1.0.82
- fix change date on range date picker
- fix datetime search field with default value
- load correct store for relations view
- keep ckeditor as similar as legacy editor

1.0.81
- check form definition if form is markable

1.0.80
- add new list action icons
- use actions as fallback content for empty columns and align column content at same height
- use ckeditor
- only cache displays as long as tab is open

1.0.79
- accept fulltext search term for advanced search

1.0.78
- use constrictions from form in remotefield as well
- set current time as default time value in datepicker

1.0.77
- fix navigation to subfolder inside search results

1.0.76
- save prompt w/o explicit cancel button

1.0.75
- fix breakwords for email and phone formatter

1.0.74
- remotefields now sort the same way in select box and advanced search (form sorting first, then last updated)
- fix view persistor in sub grid

1.0.73
- entity docs can now be sorted
- add list-check and percent icons
- allow date inputs without punctuation
- allow two digits year formats
- use save aborted key as textresource instead of message directly

1.0.72
- style new date picker like the old one
- fulltext search fields are now prioritized to be autofocused

1.0.71
- fix datetime in searchforms after using date-fns
- enhance breadcrumbs
- export action now handles additional paths from templates again
- column labels in ColumnPicker no longer display escaped html elements

1.0.70
- add envelope icon
- add icon to email field to mail client
- add link to email and phone formatter
- fix loading form definition for dms

1.0.69
- today button in datepicker now behaves as expected

1.0.68
- fix header text-overflow in firefox
- reports added through formModifier are now placed directly into the action bar, instead of the output group
- report definitions now contain an icon as defined by the backend
- action to subscribe to calendar now displays all personal calendar exports

1.0.67
- remote fields now honor the constrictions defined on forms with remotefield scope
- entity list now uses a form definition passed as input without reloading it
- advanced search now uses form with remotefield scope if it exists
- remotefields now use sorting of their forms or entity models instead of only their timestamp

1.0.66
- optimize toggle behaviour of column picker to only select currently visible items
- do not import react components in widget-utils

1.0.65
- show prompt before action for unsaved changes

1.0.64
- fix remote error handler
- remove momentjs in favor of date-fns
- support simple search flag for fulltext search field
- create removeBoxes to help adjust forms
- allow modification of form in subgrid
- listen to input param changes
- fix error logging app extension
- add error boundary
- add error boundary
- add error boundary
- add error boundary
- add error boundary

1.0.63
- convert phoneEdit to functional component
- convert layout to functional component
- convert statedvalue.stories to functional component
- convert typography to functional component
- convert loginbox to functional component
- prepare for customer actions
- prepare for customer actions

1.0.62
- show today button in datepicker

1.0.61
- fix datepicker max-, mind-date value for ranges

1.0.60
- replace flatpickr with react-datepicker

1.0.59
- add condition to remote and select field
- simple actions add conditions

1.0.58
- add css classes for display expressions styling

1.0.57
- reverse title order to first display entity name and then default display
- make menu buttons inside header responsive, so that oveflowing text gets ellipsis on smaller screens

1.0.56
- enhance column picker ux by adding numbering, mass selection and sorting features

1.0.55
- Length and size validators no longer trigger if the max or min is not defined

1.0.54
- show from and to placeholders on number ranges
- pass sorting objects to entity list app
- Add sorting field to entity-list sagas
- update of the values and field widths in duration edit fixed

1.0.53
- remove static overview page and redirect to dashboard instead

1.0.52
- add form properties to prepare request

1.0.51
- render html escape characters in breadcrumbs

1.0.50
- emit actions to parent
- fix state handling for report settings
- fix form mapping for search componentConfig
- use boolean search component for marking

1.0.49
- fix searchfilters url with query params
- add bundle packages
- create multipel entry files
- fix integer input when min value is set

1.0.48
- don't break table on collapsed sidepanel
- add legacy-widget embedType
- show input on top only for remote multi selects
- fix broken disable styles on empty selects

1.0.47
- support browser plugins for phone numbers
- fix too many field callbacks being called

1.0.46
- fixate menu on multiremote select fields at bottom to improve ux

1.0.45
- support selectors in forms
- show empty fields that are children of selectors

1.0.44
- dependency updates

1.0.43
- remove floating labels in favour of fixed labels

1.0.42
- change rank icon position and refactor table components
- convert HtmlEdit class component to functional component

1.0.41
- debouncer accepts value changes from outside

1.0.40
- allow duration values to be negative
- keep all values on blur

1.0.39
- add modifyFormDefinition input property
- add modifyFormDefinition input property
- add form modifier helper methods
- add report helper actions

1.0.38
- use preformatted error message for tql
- harmonize multi value select
- exclude selected values in suggestion

1.0.37
- query selections now get resolved in the resource-scheduler action
- remove vertical center alignment for marking column

1.0.36
- open panel according to calendar type
- possible to overwrite readonly form
- set focus on input on save filter
- use distinguishable icons for ranges

1.0.35
- invalidate cache on page refresh properly
- correct dimension calculation of select menu since in some situations it does not seem to calculate the correct width/height

1.0.34
- fixed navigating to entity document

1.0.33
- new prop `searchListFormName` to use separate list form for search mode
- define different list form for search mode
- updated fontawesome and added merge icon
- merge action now handles resolved entities instead of selection directly

1.0.32
- filter out null values on nested paths
- handle nested 'to many' relations on list forms

1.0.31
- make notification message at the end of notification center italic
- fix double scrollbar on textarea

1.0.30
- fix popper arrow positioning

1.0.29
- hide meta data on widgets

1.0.28
- use correct files name for upload
- do not reuse same tab for different reports
- update fullcalendar sizes on sidepanel toggle
- attach tether to target to prevent coverage of input fields

1.0.27
- style entity-report action dialog
- harmonize extended search result styling

1.0.26
- add hasFixedWidth prop to harmonize spacing if necessary
- show from and to placeholders on ranges
- add collapse feature to resource-scheduler
- add collapse feature to tql view in entity-list
- add calendar plus and minus icons
- add specific range icons for datetime
- fix date picker modal position

1.0.25
- fix ignored first input click
- update range values properly
- constrain tether to parent element to prevent z-index problems inside modal
- replace old legacy export with new action
- use bolt-lightning as bolt icon
- tql autocompletion now displays localized labels in suggestions

1.0.24
- update react-tether dependency and change Menu.js to new method
- remove react-split-pane dependency as we already have a library called react-split with almost the same features and us it instead
- convert entity-detail class compomeents to functional components
- refactor dispatch actions
- update react-burger-menu and fix input focus
- fix entity-list re-init handling on store updates
- fix docs browser back navigation for search view
- improve data handling on search query changes
- update react-dropzone dependancy
- harmonize error list spacing within forms
- add trigger action event
- add entity-report action

1.0.23
- ace editor works again in create forms
- fix table flicker on firefox

1.0.22
- fields in simple search are shown according to model flag

1.0.21
- menu now closes when navigating to the dashboard
- improve menu search result handling
- onBlur of date component is called with value from onChange again
- legacy actions ignore some exceptions
- fix jumping layout on firefox

1.0.20
- boolean search fields are now displayed as a single select box with fixed values to allow for ternary state and searching for explicit false values
- headers of right aligned table columns are right aligned now
- cleaned up search form types
- introduce input prop `searchFormType`
- routerless docs-browser

1.0.19
- fix activating two factor without session

1.0.18
- searchfilter show description as mouseover

1.0.17
- introduce input prop `constriction`
- Fixed searching in select boxes. Removed default searchOptions from Select.
- Fixed searching in select boxes. Removed default searchOptions from Select.
- onChange is now debounced for CodeEdit
- added new button to clear the current query to QueryView

1.0.16
- The model field in the QueryView is now a display.
- Navigating to detail pages through links in multi-select fields is now possible.
- ResourceScheduler now always open the root entities route when clicking on events.
- Tiny millisecond values (1 - 3) are now displayed correctly.
- fix virtual form field handling
- fix copy Address
- implement theme type logic to enable loading of the widget theme

1.0.15
- show loading mask while fetching info-boxes
- fix cache clearance to keep notifications session
- align choose document button to the right

1.0.14
- Use app locale automatically for all (REST) requests
- render modal action component with right locale
- render subgrids with correct locale
- Using the advanced search in multi-remote fields no longer ignores the current selection.
- Code editors used to write TQL can now be configured in the backend to assume some entity model as the given base, allowing only writing the 'where'- and 'order by'-parts of a query.
- The TQL editor in the query view now uses an implicit base model, which allows auto-complete to work.
- increase table style specificities to prevent them from being overwritten inside widgets
- support `locale` input

1.0.13
- display overflowing hours in durations
- auto focus basic search form
- fix onError of customAction
- change toaster type of aborted action handler
- add connect-principal action
- Add second tab to search form that allows executing custom queries. Add additional actions to open search as query and save query as a new filter.
- change toaster to fixed positioning to guarantee visibility on scroll

1.0.12


1.0.11
- add widget config edit action

1.0.10
- add widget code copy action

1.0.9
- show seconds/milliseconds only for small duration

1.0.8
- use throttle for select instead of debounce to prevent flickering of dropdown
- null pointer fixed in document field formatter (resp. merge action)
- add tql mapping for type text
- improve searching for text based types
- initialize widget with widget config
- harmonize DurationEdit spacing and refactor class based component to functional component
- show seconds, milliseconds for small read-only duration
- allow whitelisted inline css for nice tooltips

1.0.7


1.0.6
- adjust viewport height calculation to correctly render when entering fullscreen mode on android chrome
- clickability fixed of expand/collapse all in module menu
- add admin package version info to about modal

1.0.5
- choose between different scroll behaviours
- show 5 rows per default

1.0.4
- register more icons
- add scrollbar to dashboard panel and refactor dashboard components
- open downloadable file in new tab to avoid errors
- fix docs-browser height inside modal
- remove framer-motion dependency for burger button and create pure css version instead
- fix sticky popover on table
- correct link to user manual
- fix UploadInput.js button titles and refactor components
- add dynamic backend-url as input parameter
- Add notification support for anonymous users
- remove empty menus

1.0.3
- dependency updrade

1.0.2
- add useDidUpdate helper hook
- reuse existing usePrevious hook
- add useApp helper hook

1.0.1
- harmonize popover background color and spacing
- register icons
- replace settings menu icon
- add panel collapse feature to input edit
- register more icons
- change notification title and refactor NotificationCenter
- create env utils
- add generic nice2 fetch wrapper
- use generic request for non-rest requests
- add dynamic backend-url as input parameter

1.0.0
- change toaster behavior to stay on hover and refactor ToasterDisplay
- the first search field in admin search forms now gets automatically focused on opening
- remove X-Enable-Notifications header

0.5.39
- harmonize menu entry padding for cleaner left alignment
- harmonize navigation tab spacing and sizing
- adjust min width of location edit postcode and refactor component
- refactor largeSelectionHandler
- handle-non-existent relation entity gracefully
- enable select dropdown indicators to be aligned at bottom of multiselect fields
- fix html in toaster message
- tql builder support login type
- add no permission message for uploading document
- add title to custom action response
- show no permission error if entity is created
- add no permission message for moving document
- fix menu navigation with arrow keys when some groups were collapsed
- throttle autosize to fix performance issues
- reload breadcrumbs after entity update

0.5.38
- adjust z-index of modal to prevent legacy actions falling behind it
- fix duplicated search entries
- add auto completion for TQL in code fields.
- prevent default behaviour on shortcuts
- set focus to search input on menu change

0.5.37
- fix jumping datepicker on Safari
- show create form for remote fields again in the folder creation form
- debounce autosize on textarea
- fix chevron icon position in relationsview
- move RelationBox to a separate file for cleaner RelationsView
- position collapse buttons in absolute fashion to prevent jumps when scrollbar appears
- harmonize fontawesome icon spacing within table data cell
- register more icons
- restructure menu
- improve dropdown performance for selects on Safari
- fix performance bottleneck on linked sleect values
- save active menu tab on shortcut navigation

0.5.36
- add tooltip for remote fields
- relation counts and current visible relation entities refreshes together with its detail form
- Add Ace editor to code fields.
- add usePrevious helper hook
- cleanup flatpickr components
- propagate onSelectChange
- add option to choose document from dms
- fix dnd in input edit
- fix dashboard searchfilter

0.5.35
- show button hover title and pointer cursor
- use correct button component for icon button
- harmonize detail footer spacing
- fix placing of chevron icon in placeholder panel of admin search form
- keep focus in search input on switching menu tabs
- reset pagination on reload first page
- user agent detection
- improve performance on Safari
- fix missing popover in single values and overflowing in firefox

0.5.34
- show textarea bigger for better distinction
- table can be refreshed
- make menu collapsible
- collapse all and expand all menu entries
- only reload on explicit store updates
- register more icons
- show menu item icons
- increase z-index of popper menu to prevent it slipping behind modal

0.5.33
- Harmonize main menu spacing and add new tab icon
- add breadcrumbs to dashboard
- fix drag and drop
- create link button
- use link button for dashboard link
- Add responsivity to all buttons so that the label disappears on smaller screens and only the icon is displayed
- small dashboard adjustments
- show minimum 5 rows
- cleanup menu shortcuts
- use 3-key-shortcuts everywhere
- Fix datepickr disappearing behind modal

0.5.32
- performance improvements

0.5.31
- add open in new tab to document compact
- only load huge global styles once per app
- Added actions to DMS lists
- Added a preview image on hovering over download icons.
- create dashboard package
- prevent position from switching between after/before
- generic resize util
- use scope for preferences
- add dashboard
- add ListOrDetailLink to navigation strategy
- refactor notification

0.5.30
- add scope as input
- Style detail footer for better UX
- Add minimum box width property to Layout Container to better control column width
- add optional path to save preferences

0.5.29
- Reset legacy overwrite of link color inside toasters
- Fix popper menu disappearing behind bm-menu elements
- Harmonize paragraph spacing whithin fields
- Lighten scrollbar color
- Fix column position change
- Fix popper menu closing immediately when clicking an action

0.5.28
- fix confirm handler
- calculate drop position before or after element
- provide sanitize function for html
- render sanitized html only
- don't resize column after mouse release
- Remote fields and select boxes now only load active relation values.
- add keyField to model transformer
- use dynamic key field

0.5.27
- add footer with meta info
- Don't show 'or with Tocco login' text if no SSO provider
- refactor initial notification

0.5.26
- Improve text input UX within input edit table
- Reduce notification center title size
- fix state propagation in resize hook
- persist columns widths
- Dms edit and create messages clean up
- clean up documentation and fix dispatched actions
- fix websocket reconnection

0.5.25
- fix entity docs url
- Improve table hover colors for better readability
- Change popover text color of paragraphs to white

0.5.24
- fix password update app
- rename username to usernameOrPk for passwordUpdate

0.5.23
- Change icon size within docs-browser
- Harmonize link styling to be consistent
- Increase min-height of filter panel in search form
- fix about tocco
- change dms icons

0.5.22
- Change table hover colors to a more generic grey tone

0.5.21
- Fix opening task execution of notification
- Add button to remote fields that opens a popup containing a create form
- Split session saga
- Fix socket connection handling
- Fix suqare icon display expressions
- Swap out donwload and upload icons to harmonize look
- Change date picker month button color for better visibility
- Harmonize notification center styling

0.5.20
- Update select
- Dms edit and create messages clean up
- Fix calendar entity-list text resources
- Add "open output job" to notification
- Fix disabled delete button if nothing to delete
- Add background color to unread notifications

0.5.19
- Support disablePreferencesMenu in table
- Money post point digits fallback

0.5.18
- Handle 404 of path parts better

0.5.17
- Harmonize collapsible panel styling for better contrast
- Prevent early line breaks in popover menu
- Remove initial underline in notification detail link

0.5.16
- Better breadcrumb error handling

0.5.15
- Open Url in list in new window
- Fix simple-search extend button in remote search
- Improve browser tab title

0.5.14
- Refresh list on navigation back to list
- Harmonize html formatter spacing inside stated value
- Harmonize icon spacing and hover behaviour in notifications
- Add the feature to close modals via escape key
- Add underline to links

0.5.13
- Prevent preview image collapsing to 1px if preview cannot be generated

0.5.12
- Better entity error handling
- Harmonize marked icon inside table
- Harmonize marked icon inside detail view
- Increase z-index of modal holder to properly display as widget
- Show outdated error in detail
- Increase toaster z-index to properly display as widget

0.5.11


0.5.10
- Add collapse user preferences support

0.5.9
- Style location edit dropdown to match other dropdowns
- Remove download icon inside button of report settings
- Adjust notification dot position
- Fix calender search bug
- Fix search-form remote bug

0.5.8
- Added support for "markable" feature
- Added support for "markable" feature
- Prevent dropdown menu being clipped in viewport
- fix notifications
- Fix business unit change in edit action
- Support empty html edit field
- Has value for checkboxes change
- Improve pagination UX by moving it to the left and changing button behavior
- Fix search filter menu hover
- Add preview for documents

0.5.7
- Fix merge error summary
- Add hover effect to column picker list

0.5.6


0.5.5
- Adjust height and width of input edit table
- Fix notifications for already deleted outputjobs

0.5.4
- Adjust height and width of input edit table
- Fix datetime search
- Fix Menu

0.5.3
- Add hover effect to nav switch button
- Align modal globally at same position
- Fix modal overflow
- Style merge errors
- Harmonize toaster styling
- Fix blocking info being covered by header

0.5.2
- Refactor column picker
- Move useDnD
- Add search form customization
- Make select dropdown menu style more uniform for a more consistent UI
- Harmonize select box size und colors
- Change collpase icon for detail and list view

0.5.1
- Fix popper menu on safari browsers
- Fix notification socket url

0.5.0
- New notifications with notification center
- Fix date-time search
- Add panel collapse feature in detail view
- Align nav switch button horizontally
- Fix overlay of modal in widget mode

0.4.53
- Improve input field UX by better highlighting fields and labels
- Adapt input font-sizes for better readability
- Fix selection controller button font color
- Add collapse feature to search panel in list view
- Harmonize menu tree spacing and switch icon size
- Fix legacy actions popup in DMS (was hidden before)
- Disable sorting in "move" action in DMS

0.4.52
- disable client questions for merge action

0.4.50
- Forward input props to move action
- Style nav switch button to better fit into UI
- Disable client questions for merge action
- Fix various dms problems (navigation and search)

0.4.48
- Fix merge close function with query selection
- Add confirm keyboard support

0.4.47
- New menus for system options and all possible options
- Last opened menu is now saved in user preferences
-  Add action selection count confirm

0.4.46
- Adjust spacing and alignment of button inside modal

0.4.45
- Fix report settings

0.4.44

0.4.43
- Edit action only one message
- Entity-Docs open resource in full view

0.4.41
- Change cursor to pointer on panel header/footer hover
- Added options to create a search filter from the current search, edit or delete an existing filter
- Enable body scrolling on login screen for smaller screens
- Use explicit selection style
- datetime search fields now use a date field until the full range is expanded
- Fix hover delay and hover color of search filter buttons

0.4.40
- DMS fixes

0.4.39
- Introduce new prop to determine if layout containers should occupy remaining height on screen
- Adjust left padding of Breadcrumbs in list view
- Location field focus problem fix
- Displayexpression call adjustment

0.4.38
- EntityDocs not sortable
- Dms fixes

0.4.37
- refactor extracting displays
- Fix select menu disappearing behind modal
- Fix fulltext search form

0.4.36
- Fix doc-browsers client questions
- New input prop `businessUnit` to filter by business unit
- Prevent range input overflow
- Adapt table colors to better differentiate from background
- Remove obsolete left padding in table
- Ignore field if path is null in copy action

0.4.35
- Fix doc-browsers client questions

0.4.34
- Prevent stacking of modal overlays
- render description field in form
- Fix popper menu positioning
- Prevent layout container overlap in detail view
- Show not deletable entities with 0
- Fix html edit initial change
- Fix icon and document view in doc browser
- Fix dms reload
- Refactoring list initialization
- Fix tether dropdown z-index to prevent overlay on scroll
- Set background color of breadcrumbs inside doc browser to white

0.4.33
- Clear button in date fields only show up when data has been entered, tab and enter can now be used to navigate in the calendar popup and between date fields
- fix resetting search mode
- Embedd dms in entity view
- Text as html

0.4.32
- Handle client question cancellation
- Keep scroll position on multi select selection
- Fix menu in action
- Move validation helper method to tocco-util
- Add move action

0.4.31
- Introduce onResize external event
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- New input param `domainTypes` to filter domains
- hide list navigation arrow if row is not clickable
- fix long term caching
- Adjust label margin in input fields
- support sorting by search filters and preferences
- reload sources after deployment
- clear selection if parent is set
- dispatch actions if store already exists
- support selection of type query
- Fix fulltext search form
- Restrict max width of popover to 400px
- Reference text ressources for aria-labels for improved localization
- Increase contrast of theme colors to ensure WCAG 2.0 standards
- Change spacing/hover colors inside table and adjust scrollbar width
- Change notifier style to a solid variant to increase contrast/visibility
- Change popover style to solid for increased contrast
- Adjust text shade colors to a lighter variant
- New input parameter `keys`
- New input param `rootNodes` to define root items
- clear selection fire onSelectChange
- Fix fulltext search
- fix load data if parent is changed
- support createuser & updateuser in tql builder

0.4.30
- Introduce onResize external event
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- New input param `domainTypes` to filter domains
- Hide list navigation arrow if row is not clickable
- Fix long term caching
- Adjust label margin in input fields
- Support sorting by search filters and preferences
- Reload sources after deployment
- Clear selection if parent is set
- Dispatch actions if store already exists
- Support selection of type query
- Fix fulltext search form
- Restrict max width of popover to 400px
- Reference text ressources for aria-labels for improved localization
- Increase contrast of theme colors to ensure WCAG 2.0 standards
- Change spacing/hover colors inside table and adjust scrollbar width
- Change notifier style to a solid variant to increase contrast/visibility
- Change popover style to solid for increased contrast
- Adjust text shade colors to a lighter variant

0.4.29
- Introduce onResize external event
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- New input param `domainTypes` to filter domains
- Hide list navigation arrow if row is not clickable
- Fix long term caching

0.4.28
- Introduce onResize external event
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear

0.4.28


0.4.27
- Dms upload directory (TOCDEV-3042)
- Restrict max height of basic search form only in modal
- Prevent action buttons disappearing on scroll

0.4.26
-

0.4.25
- Change header color
- DMS delete

0.4.24
- Style upload and switch to light icons

0.4.23
- Fix icon and qr code spacing inside two factor connector
- Merge: Remove workaround for opening an entity list in the old client

0.4.22
- Fix spacing of notifiers without title
- Add dms edit action
- Add Domain create action

0.4.21
- Move buttons inside modals to the right to improve UX
- Fix hidden extender and force border rendering of ranges in chrome
- Fix empty report settings (TOCDEV-3218)

0.4.20
- Fix caching of business unit
- Vertically center spinner icon in delete progress
- Style merge table header contents for better UX
- Style notifier popups to better harmonize with the existing styling
- Make panel header clickable so it can also expand the panel
- Fix logo not displaying in login screen on iOS
- Fix height and action button styling of detail form in old client

0.4.19
- Fix empty create forms because of missing field information

0.4.17
- Fix merge table and harmonize spacing/text
- Harmonize text spacing in two factor connector
- Fix checkbox and menu background hover inside table heading
- support fullscreen action callbacks
- Set origin id for each session (TOCDEV-2980)
- Writable mutlipath fix (TOCDEV-3012)
- Writable mutlipath fix (TOCDEV-3012)
- Load two-factor-connector in login when two-factor activation is forced
- Fix autofocus if first field is a textarea

0.4.16
- Support deletion of documents in docs route
- Fix relation selection bug (TOCDEV-3037)
- Fix default value serach filter bug

0.4.15
- Harmonize icon size and text spacing
- Fix blank screen after navigating away from the calendar
- Style datepicker so that it fits better into the rest of admin
- Add a popover variant that is placed on the right of element
- Prevent flickering effect for tooltips
- New input prop `contextParams` to extend context
- New action in the docs route to create a folder
- Support shrinkToContent column attribute
- Fix search form endless loading with empty filter field
- Fix path dirty bug
- Fix missing default values bug

0.4.13
- Support uploading documents in DMS
- Merge V2!

0.4.12
- Text autosize new component (Fixes Safari performance problems)

0.4.11
- Adjust left pane grid on for android tablets to prevent overflow
- Two Factor Connector process optimizations
- Upload component: Show file names only in upload process
- Style two-factor-connector app
- Login: fix leading zeros bug in two-factor code

0.4.10
- Async validation on blur

0.4.9
- Prevent content ghosting in safari when opening/closing collapsibles
- Add password-update and two-factor-connector to menu
- Update dependencies
- Update FullCalendar

0.4.8
- Introduce navigationStrategy
- Remove favicons inside react project, as they will loaded via the static index.html
- Remove obsolete right margin inside menu item
- Display integer and counter data unformatted
- Add copy action

0.4.7
- Refactor Layout components to use CSS Grid instead of JS for nested elements
- Fix positioning and z-index of ActionsWrapper
- Improve render of multi column layouts
- Change the text format if there are only fieldErrors
- Persist selected relation tab on detail
- Focus on first input field

0.4.6
- Use same width for all Fontawesome icons
- Introduce custom cell renderers
- New type icons in DMS list
- Disable pointer event on Desktop as text cant be copied otherwise in Firefox

0.4.5
- Fix top padding of modal
- Fix padding of immutable stated values

0.4.4
- Fix column picker styling
- Use column label as titles when hovering over headers
- Prevent mobile keyboard from pushing the modal up
- Fix bug on list and detail

0.4.3
- Fix table reset

0.4.2
- Fix the label of richtext fields to the top
- Reset load mask height to 100%
- Modal refactoring
- Remove hover background color on active filter buttons
- Add height to label to prevent vertical clip
- Hide overflow of single value element
- Default search filter is disabled when opening the relations view of an entity as its own list
- Prevent click on disabled date input field

0.4.1
- Prevent null pointer when opening DMS (no action bar in form model)

0.4.0
- Add initial version of DMS
- Hide burger menu button behind legacy modal window mask

0.3.36
- Fix reports without custom settings
- Add minimal padding to search filter to avoid scrollbar on fewer entries
- Style button inside table
- Add title tooltip to button
- Make whole row clickable in list

0.3.35
- Fix advanced search menu bug
- Change typography link color to secondary (blue)
- Do not display relation to parent entity in column picker if opened in a relation tab
- Display id instead of label if the label is empty in column

0.3.34
- Fix modal being push out of view when keyboard pops up on iOS
- Prevent label overflow inside input field
- Prevent popper menu disappearing behind main menu overlay

0.3.33
- Adjust tile width of modal to match modal width
- Adjust top margin of modal content
- Set height and width attribute to allow the browser to calculate/reserve sufficient space and minimize layout shifts
- Remove hover of relation boxes on mobile devices
- Add caption to preview
- Improve caching (long-term cache)

0.3.32
- Style popover to better align with overall design and have better contrast
- Add margin to error items inside popper
- Adjust entity list height inside detail view to scale on smaller screens
- Change link colors to secondary color

0.3.31
- Adjust relations view height for smaller screens
- Increase min-width of table column for more usability on smaller screens
- Disable touch on mobile and adjust margin
- Autocomplete support
- Fix select for mobile
- Fix display bug

0.3.30
- Adjust filter pane height when expanded
- Change chevron icon in multi select input when dropdown is opened
- Change form field colors. Dirty: blue, Mandatory: organge
- Fix create reverse relation
- Open remote fields on second click
- Improve form error notification
- Set max width in layout box to prevent overflowing elements
- Hide horizontal scrollbar to prevent it appearing on while loading

0.3.29
- Remove stated value error animation, as it caused a wobble effect
- Extend actiom handling (precheck and initial forms with data)
- Optimize input edit initialization
- Fix relation columns edit bug


0.3.28
- Change sort icon order and adjust table header styles to show marker on long columns when dragging
- Reset date/time indicators on input fields
- Fix search filter sorting

0.3.27
- List performance optimizations
- Update style components

0.3.26
- Reset css overwrites of Upload and refactor Preview
- Restrict urls in table to one line
- Fix error field focus bug
- Fix breadcrumbs action bug
- Add create breadcrumbs
- Adjust search filter height
- Set min and max width for modal

0.3.25
- Initialize container size for correct display in modal
- Add min width to modal
- Center QR Code

0.3.24
- Searchform bug fix

0.3.23
- Narrow left panel width of input edit
- Improve UX of list and search view within modal
- Build fields without model (refactoring)
- Hide readonly fields without value
- Style column picker dialog inside modal
- Fix overflow of column picker in case of long texts and change ok button look
- Remove all usages of old display endpoints (refactoring)

0.3.22
- Change div to flex item for proper display in old client
- Change flex properties for proper display in old client
- Adjust search filter area height to have minimal padding at bottom when expanded
- Set box sizing on td to prevent overwrite in external context
- Change error view background and icon size
- Admin loadCurrentViewInfo refactoring

0.3.21
- Remove about tocco modal title
- Form builder refactoring
- Fix action query selection bug

0.3.20
- Display search filter button only on hover - else hide
- Change help menu icon
- Hide action in advanced search
- Fix remote field

0.3.19
- Handle strings in search with "like" and add boolean handler
- Expand search filter list button area for better UX

0.3.18
- Use recaptcha v2
- Add tabindex for password update dialog
- Entity list: Add support for `clickable` attribute
- Menu entry to edit columns and reset

0.3.17
- Adjust gutter height in admin search form
- Style error view

0.3.16
- Change header ball menu icon to info symbol
- Style draggable gutter for more usability and design consistency
- Revert resource-scheduler tooltip border

0.3.15
- Add admin help menu
- Fix width of table cells so that there is no overlap at the last column on smaller screens
- Align bm button menu with content
- Add bottom padding to search box to prevent see through of underlying text
- Style input edit table to ensure consistend UI. Remove obsolete split pane feature
- Invert header color for TEST/Prod

0.3.14
- Style header logo depending on runEnv
- Use KEYS instead of IN in tql
- Style draggable table headers and kabob menu
- Show relation create button depending of permissions
- Handle notifications depending on parent
- Fix iOS relations boxes on iOS Tablets and restrict width of left pane in detail view to 40%
- Remove obsolete default searchfield styling and height in nested layout containers
- Change Stated and Editablevalue colors for more contrast/readability
- Fix admin resource scheduler bug

0.3.13
- Allow calendars to be preselected by passing them to the preselectedCalendars input
- Table component
- Added button to reset all preferences
- Implement responsive height fixes for tablets
- Make all children of readonly layouts readonly
- Style input fields according to material design

0.3.12


0.3.11
- Improve handling of empty values in number fields

0.3.10
- Center search filter icon vertically
- Finish styling of input edit table
- Center input field of select
- Fix sizing of ball

0.3.9
- Place button groups on same level
- Prevent action menu appearing underneath fixed menu bar
- Enable wrapping of buttons in detail view with narrower screen width
- Harmonize button spacing and sizing in list view
- Harmonize button sizing and spacing of button groups
- Adapt navigation bar width to match the width of list view sidebars
- Style entity view screens
- NumberFormatter can now handle options for setting the minimum fraction digits
- InputEditTable now displays all readonly fields a FormattedValues
- Allow multiple selected Inputs to be handled in input-edit, if they are compatible.
- Add vertical scrolling to input edit table
- Adjust minimum height of table content to 300px
- Style kabob menu inside table header

0.3.8
- Style InputEdit Table
- Harmonize relations view spacing
- Enable 100% height of layout container in old client
- Menu makeover
- Style new dropdown menu
- Harmonize menu icon spacing
- Reposition notifier close icon
- sort list by preferences and save new preferences when changing the sorting
- Add button to reset sorting to entity-list
- Fix icon positioning within buttons
- Fix relation count

0.3.7
- Table column positioning
- Style Two-Step Login
- Fix Range delete value bug

0.3.6
- Fix delete bug

0.3.5
- Support time fields in search form
- Fix split action button
- Display notifications correctly in InputEdit

0.3.4
- Fix shy in table header
- Delete sso cookie on logout
- Adjust HTML Edit
- Optimize admin view loading
- Add actions to input-edit
- Enable notifications in input-edit
- Add information box to input-edit
- Fix readonly fields shown as editable
- Improve date time rendering
- Adjust table cell width of last column

0.3.3
- Mitigate unwanted legacy action loading effects
- Harmonize notification spacing
- Enable full height scaling of detail view
- Add legacy icons
- Adjust list limits
- Adjust advanced-search list limit
- Enable table height in resource calender to full height
- Enable hover effect on first two table header elements
- Delete Action
- Harmonize question icon size/spacing in detail view
- Adjust fulltext search to work the same way as in old client

0.3.2
- Support description fields

0.3.1
- Adjust table padding and hover table heading hover
- Slim down left panel width in entity list view
- Remove additional clear icon in safari
- Fix fuzzy rendering of bold fonts in firefox

0.3.0
- Table v2
- Fix display expressions
- Add custom app action handler

0.2.9
- Support new two-factor authentication
- Adjust two factor handling

0.2.8
- Fix two-factor authentication bug
- Hide actions in preview list
- Use new search filter endpoint
- Harmonize icon spacing in preview box
- Harmonize modal box spacing
- Disable caching for DEV
- Make welcome screen responsive
- Support multi-path select and remote fields

0.2.7
- Fix admin width problem

0.2.6
- Style range component
- Small date component improvements
- Fix fallback sorting bug
- Fix label null bug
- Add captcha to login
- Fix bug where old pw was displayed as invalid

0.2.5
- Component type fix
- Fix burger button
- Adapt success color for better readability

0.2.4
- Panel animation refactoring
- Animate burger icon
- Fix &shy; in label
- Improve modal ux

0.2.3
- Backend: Send searchform values with tql
- Minimize login form dimensions
- Menu arrow navigation
- Harmonize stated value box padding
- SSO integration

0.2.2
- Button hover styling
- Style display-expressions
- Adjust search-filter size automatically
- Crop search filter text
- Make login responsive
- Button adjustment for mobile
- Style button dropdown list
- Constriction bug fix

0.2.1
- Adjust responsive behavior of layout box in detail view
- Fix reports
- Animate validate error list

0.2.0
- Fix display-expression not shown in list view
- Basic display-expression bootstrap class support
- Fix display-expression sorting in list view
- Create multi relation create fix
- Optimize async validation in create
- Persist search-filters
- Fix prompt when changing relations preview
- Use relation-count client endpoint

0.1.26
- Fix principal service usage

0.1.25
- Fallback sorting (Last_updated) in lists
- Support of code and ipaddress datatypes fields

0.1.24
- Increase list limit
- Style fixing

0.1.23
- Fix list scrollbar

0.1.22
- Change fontSize and spacing
- Style List View
- Remove scrollbar of table
- Button styling
- Fix small icon bug

0.1.21
- Style filter buttons
- Welcome screen
- Detail view styling

0.1.20
- Style list view
- Style breadcrumbs
- Fetch form with scope (update/create)
- Rearrange search form buttons
- Load language from browser
- Translate breadcrumbs entity name
- Add User and Businessunit menu
- Disable word-break in table

0.1.19
- Fix upload

0.1.18
- Save button in action bar
- Style relations view

0.1.17
- Fix images

0.1.16
- New Icon set
- Styled search-box
- Styled top bar and menu
- Styled login text
- Styled breadcrumbs
- New selection controller

0.1.15
- Fix location field
- Fix sso-login

0.1.14
- Further style login view
- Use rest 2.0

0.1.13
- Fix bug where images were not loaded correctly

0.1.12
- Add relation preview open link on detail view
- Style login and sso-login
- Fix parent Search field bug
- Fix url view bug

0.1.11
- Fix navigation bug where the same url loaded different views
- View caching

0.1.10
- Restrict global icon dom watch
- Add search-filters to admin search form

0.1.9
- Menu endpoint url fix
- Size and padding

0.1.8
- Search Form Prototype

0.1.7
- Settings Menu
- Menu Shortcut fix
- Local caching
- Show current beta version on Dashboard

0.1.6
- General performance optimizations

0.1.5
- Detail performance improvement
- Relation view in detail

0.1.3
- menu and navigation improvements
- detail dashboard

0.1.2
- improved navigation and detail view

0.1.1
- Basic routing and prototype
- Login prototype

