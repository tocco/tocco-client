1.0.99
- fix object cache

1.0.98
- add object cache
- use global object cache

1.0.97
- allow padding of Button to be removed like when used as icon
- allow Action to be rendered as text without button visual
- export action types to use same names everywhere
- confirm modals now use whichever default action the backend declares, which means switching the styling and keyboard shortcut

1.0.96
- order range values on top instead of side by side to improve ux
- create ENTITY_DOCS selection for legacy actions
- move submit button to parent
- add sync validation to template form

1.0.95
- support identifier type in tql builder
- enforce css selectors

1.0.94
- link for max 100 created entities
- add docs-tree search
- add conditional selection for tables
- only select entities for docs tree search

1.0.93
- allow target attribute in html

1.0.92
- do not use default display for tooltips again

1.0.91
- send selection to adjusted POST endpoint when loading report settings
- use a new custom display when displaying entities in select boxes

1.0.90
- harmonize spacing of ranged dates by increasing search panel width

1.0.89
- reintroduce min-width for Ball component, since normal width caused rendering issues in the main menu
- replace useWindowWidth hook with universal useWindowSize hook

1.0.88
- do not collapse sidepanel on top

1.0.87
- show time in 24h format for all locales

1.0.86
- move toasters on mobile to bottom for better ux as most of the interaction elements (e.g actions) are on top and should not be covered

1.0.85
- do not reload fullscreen action on single action

1.0.84
- add collapsible sidepanel component
- introduce legacy-admin embed type

1.0.83
- use Icon component in LoadingSpinner

1.0.82
- move component specific event handlers

1.0.81
- fix null values in field name transformation
- support nested paths in location field
- provide entityField for create field config
- use long as datetime value

1.0.80
- allow componentConfigs to adjust value used
- use correct decimal digits and % suffix for percentage fields
- use FormattedNumber in percent mode in PercentFormatter
- increase top padding of input label to prevent cut off

1.0.79
- disable removing outputjob toasters in widgets
- fix performance of fulltext search

1.0.78
- prevent body scroll when modal is opened

1.0.77
- improve responsiveness of table component
- datepicker keyboard handling
- do not lazy load datepicker
- autofocus datepickers

1.0.76
- add helpers to remove fields from forms

1.0.75
- fix escape handling in tql fulltext search

1.0.74
- time input component
- fix scroll on select

1.0.73
- add widget config key to env
- add custom create endpoint to validation
- remove removeCreate form modifier
- add addCreate form modifier

1.0.72
- add pen-field icon
- increase menu item padding on touch devices for better usability

1.0.71
- ignore any text and textarea fields of a datepicker when autofocusing

1.0.70
- fix date picker icon

1.0.69
- fix datepicker year dropdown closing on scroll
- fix whitespace in notification

1.0.68
- close datepicker on scroll
- add calendar icon
- add icon to date picker

1.0.67
- add model name to notification

1.0.66
- reset select dropdown to older state and implement close on scroll feature
- fix select dropdown dimension calculations

1.0.65
- adjust sizing of datepicker on mobile screens

1.0.64
- generate reports without dialog in widgets

1.0.63
- collapse buttons when wrapper is too small
- use responsiveness buttons on action bar

1.0.62
- add ballot-check icon

1.0.61
- quick fix that onChange is not infinite often triggered

1.0.60
- HTML editor: fix saving the form in source editing mode

1.0.59
- enable fullscreen modals for mobile/touch devices

1.0.58
- show collapse/expand icon on touch devices in panel header/footer
- harmonize modal spacing of modal message

1.0.57
- remove date picker arrow as the positioning seems to be off when fields are too long

1.0.56
- fix position of reports in form modifier
- fix datetime range with single default value
- do not clear date input on blur

1.0.55
- improve datepicker styling and fix bugs in widgets
- force hover styles of upload button when hovering upload field
- remove advanced search text in modal title
- fix input label being cut in widgets

1.0.54
- change signal box background colors for more consistency

1.0.53
- fix change date on range date picker
- fix datetime search field with default value
- keep ckeditor as similar as legacy editor

1.0.52
- add new list action icons
- use ckeditor
- only cache displays as long as tab is open

1.0.51
- accept fulltext search term for advanced search

1.0.50
- use constrictions from form in remotefield as well
- set current time as default time value in datepicker

1.0.49
- fix breakwords for email and phone formatter

1.0.48
- remotefields now sort the same way in select box and advanced search (form sorting first, then last updated)

1.0.47
- add list-check and percent icons
- allow date inputs without punctuation
- allow two digits year formats
- use save aborted key as textresource instead of message directly

1.0.46
- style new date picker like the old one
- fulltext search fields are now prioritized to be autofocused

1.0.45
- fix datetime in searchforms after using date-fns
- enhance breadcrumbs
- column labels in ColumnPicker no longer display escaped html elements

1.0.44
- add envelope icon
- add icon to email field to mail client
- add link to email and phone formatter

1.0.43
- today button in datepicker now behaves as expected

1.0.42
- reports added through formModifier are now placed directly into the action bar, instead of the output group
- report definitions now contain an icon as defined by the backend

1.0.41
- remote fields now honor the constrictions defined on forms with remotefield scope
- advanced search now uses form with remotefield scope if it exists
- remotefields now use sorting of their forms or entity models instead of only their timestamp

1.0.40
- optimize toggle behaviour of column picker to only select currently visible items
- do not import react components in widget-utils

1.0.39
- fix remote error handler
- remove momentjs in favor of date-fns
- create removeBoxes to help adjust forms
- fix error logging app extension

1.0.38
- convert phoneEdit to functional component
- convert layout to functional component
- convert statedvalue.stories to functional component
- convert typography to functional component

1.0.37
- show today button in datepicker

1.0.36
- fix datepicker max-, mind-date value for ranges

1.0.35
- replace flatpickr with react-datepicker

1.0.34
- add condition to remote and select field
- simple actions add conditions

1.0.33
- add css classes for display expressions styling

1.0.32
- reverse title order to first display entity name and then default display

1.0.31
- enhance column picker ux by adding numbering, mass selection and sorting features

1.0.30
- Length and size validators no longer trigger if the max or min is not defined

1.0.29
- show from and to placeholders on number ranges
- update of the values and field widths in duration edit fixed

1.0.28
- add form properties to prepare request

1.0.27
- render html escape characters in breadcrumbs

1.0.26
- fix state handling for report settings
- fix form mapping for search componentConfig
- use boolean search component for marking

1.0.25
- fix searchfilters url with query params
- add bundle packages
- fix integer input when min value is set

1.0.24
- add legacy-widget embedType
- show input on top only for remote multi selects
- fix broken disable styles on empty selects

1.0.23
- support browser plugins for phone numbers
- fix too many field callbacks being called

1.0.22
- fixate menu on multiremote select fields at bottom to improve ux

1.0.21
- support selectors in forms
- show empty fields that are children of selectors

1.0.20
- remove floating labels in favour of fixed labels

1.0.19
- change rank icon position and refactor table components
- convert HtmlEdit class component to functional component

1.0.18
- debouncer accepts value changes from outside

1.0.17
- allow duration values to be negative
- keep all values on blur

1.0.16
- add form modifier helper methods
- add report helper actions

1.0.15
- harmonize multi value select
- exclude selected values in suggestion

1.0.14
- possible to overwrite readonly form
- use distinguishable icons for ranges

1.0.13
- invalidate cache on page refresh properly
- correct dimension calculation of select menu since in some situations it does not seem to calculate the correct width/height

1.0.12
- updated fontawesome and added merge icon

1.0.11
- filter out null values on nested paths
- handle nested 'to many' relations on list forms

1.0.10
- make notification message at the end of notification center italic
- fix double scrollbar on textarea

1.0.9
- fix popper arrow positioning

1.0.8
- do not reuse same tab for different reports
- attach tether to target to prevent coverage of input fields

1.0.7
- update react-tether dependency and change Menu.js to new method
- update react-dropzone dependancy
- harmonize error list spacing within forms
- fix ignored first input click
- update range values properly
- constrain tether to parent element to prevent z-index problems inside modal
- use bolt-lightning as bolt icon
- tql autocompletion now displays localized labels in suggestions
- add hasFixedWidth prop to harmonize spacing if necessary
- show from and to placeholders on ranges
- add calendar plus and minus icons
- add specific range icons for datetime
- fix date picker modal position

1.0.6
- ace editor works again in create forms

1.0.5
- boolean search fields are now displayed as a single select box with fixed values to allow for ternary state and searching for explicit false values
- headers of right aligned table columns are right aligned now
- onBlur of date component is called with value from onChange again
- legacy actions ignore some exceptions
- fix jumping layout on firefox

1.0.4
- fix cache clearance to keep notifications session
- Navigating to detail pages through links in multi-select fields is now possible.
- Tiny millisecond values (1 - 3) are now displayed correctly.
- fix virtual form field handling
- implement theme type logic to enable loading of the widget theme
- Fixed searching in select boxes. Removed default searchOptions from Select.
- Fixed searching in select boxes. Removed default searchOptions from Select.
- onChange is now debounced for CodeEdit

1.0.3
- do not execute injected JS in html field
- no styles allowed in rendered HTML
- fix flicker in Firefox on panel hovers
- validation errors fixed for location fields
- do not load display of null entity
- use throttle for select instead of debounce to prevent flickering of dropdown
- null pointer fixed in document field formatter (resp. merge action)
- add tql mapping for type text
- improve searching for text based types
- harmonize DurationEdit spacing and refactor class based component to functional component
- show seconds, milliseconds for small read-only duration
- allow whitelisted inline css for nice tooltips
- show seconds/milliseconds only for small duration
- Display overflowing hours in durations
- fix onError of customAction
- change toaster type of aborted action handler
- change toaster to fixed positioning to guarantee visibility on scroll
- Use app locale automatically for all (REST) requests
- render modal action component with right locale
- Using the advanced search in multi-remote fields no longer ignores the current selection.
- Code editors used to write TQL can now be configured in the backend to assume some entity model as the given base, allowing only writing the 'where'- and 'order by'-parts of a query.
- increase table style specificities to prevent them from being overwritten inside widgets

1.0.2
- register more icons
- open downloadable file in new tab to avoid errors
- remove framer-motion dependency for burger button and create pure css version instead
- fix sticky popover on table
- fix UploadInput.js button titles and refactor components
- add notification support for anonymous users

1.0.1
- harmonize popover background color and spacing
- register icons
- register more icons
- change notification title and refactor NotificationCenter
- create env utils
- add generic nice2 fetch wrapper
- add useDidUpdate helper hook
- add useApp helper hook

1.0.0
- fix websocket reconnection
- refactor initial notification
- fix confirm handler
- calculate drop position before or after element
- provide sanitize function for html
- render sanitized html only
- don't resize column after mouse release
- Remote fields and select boxes now only load active relation values.
- add keyField to model transformer
- Reset legacy overwrite of link color inside toasters
- Fix popper menu disappearing behind bm-menu elements
- Lighten scrollbar color
- Fix popper menu closing immediately when clicking an action
- Add minimum box width property to Layout Container to better control column width
- add open in new tab to document compact
- only load huge global styles once per app
- Added a preview image on hovering over download icons.
- prevent position from switching between after/before
- generic resize util
- refactor notification
- performance improvements
- fix drag and drop
- create link button
- create link button
- Add responsivity to all buttons so that the label disappears on smaller screens and only the icon is displayed
- Fix datepickr disappearing behind modal
- show textarea bigger for better distinction
- table can be refreshed
- register more icons
- increase z-index of popper menu to prevent it slipping behind modal
- show button hover title and pointer cursor
- user agent detection
- improve performance on Safari
- fix missing popover in single values and overflowing in firefox
- add tooltip for remote fields
- Add Ace editor to code fields.
- add usePrevious helper hook
- cleanup flatpickr components
- fix jumping datepicker on Safari
- debounce autosize on textarea
- harmonize fontawesome icon spacing within table data cell
- register more icons
- improve dropdown performance for selects on Safari
- fix performance bottleneck on linked sleect values
- adjust z-index of modal to prevent legacy actions falling behind it
- add auto completion for TQL in code fields.
- prevent default behaviour on shortcuts
- adjust min width of location edit postcode and refactor component
- refactor largeSelectionHandler
- enable select dropdown indicators to be aligned at bottom of multiselect fields
- tql builder support login type
- add title to custom action response
- throttle autosize to fix performance issues
- change toaster behavior to stay on hover and refactor ToasterDisplay
- remove X-Enable-Notifications header

0.4.0
- Added language upgrade form (in DB refactoring view)

0.3.1
- Fixed generating SQL and changesets in prod env

0.3.0
- Added simple log view
- Added simple model validation view
- Added simple SQL log view
- Prevent complete reload when changing page

0.2.0
- New input param `baseRoute`

0.1.0
- Initial release of Developer Console (DevCon) with simple DB refactoring
