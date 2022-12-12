0.10.26-hotfix229.17
- Use app locale automatically for all (REST) requests

0.10.26-hotfix229.16
- add locale to text resource caching key

0.10.26-hotfix229.15
- increase z-index for selects in modals

0.10.26-hotfix229.14
- fix z-index for entity-browser in old client

0.10.26-hotfix229.13


0.10.26-hotfix229.12
- show no permission error if entity is created
- add title to custom action response

0.10.26-hotfix229.11
- default values that are defined in search forms are taken into account again

0.10.26-hotfix229.10
- Fix calendar entity-list text resources
- Fix datepickr disappearing behind modal

0.10.26-hotfix229.9
- Refresh list on navigation back to list
- Dms edit and create messages clean up
- Allow entity-browser to run with specific bu

0.10.26-hotfix229.8
- Prevent preview image collapsing to 1px if preview cannot be generated

0.10.26-hotfix229.7
- Fix calender search bug
- Add preview for documents
- Increase z-index of modal holder to properly display as widget

0.10.26-hotfix229.6
- Adjust height and width of input edit table
- Align modal globally at same position

0.10.26-hotfix229.5
- Fix popper menu on safari browsers

0.10.26-hotfix229.4
- Fix overlay of modal in widget mode
- Fix multi-tab problem

0.10.26-hotfix229.3
- Introduce new prop to determine if layout containers should occupy remaining height on screen

0.10.26-hotfix229.1
- Displayexpression call adjustment

0.10.26
- render description field in form
- Fix popper menu positioning
- Prevent layout container overlap in detail view
- Show not deletable entities with 0
- Fix html edit initial change
- Refactoring list initialization
- Prevent range input overflow
- Adapt table colors to better differentiate from background
- Fix select menu disappearing behind modal
- Fix fulltext search form

0.10.25
- support createuser & updateuser in tql builder
- Handle client question cancellation
- Keep scroll position on multi select selection
- fix menu in action
- move validation helper method to tocco-util
- Clear button in date fields only show up when data has been entered, tab and enter can now be used to navigate in the calendar popup and between date fields
- Prevent stacking of modal overlays

0.10.23
- Style upload and switch to light icons
- Restrict max height of basic search form only in modal
- Prevent action buttons disappearing on scroll
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- hide list navigation arrow if row is not clickable
- Adjust label margin in input fields
- support sorting by search filters and preferences
- reload sources after deployment
- clear selection if parent is set
- dispatch actions if store already exists
- Fix fulltext search form
- Restrict max width of popover to 400px
- Reference text ressources for aria-labels for improved localization
- Increase contrast of theme colors to ensure WCAG 2.0 standards
- Change spacing/hover colors inside table and adjust scrollbar width
- Change notifier style to a solid variant to increase contrast/visibility
- Change popover style to solid for increased contrast
- Adjust text shade colors to a lighter variant
- New input parameter `keys`
- clear selection fire onSelectChange
- Fix fulltext search
- fix load data if parent is changed
- support createuser & updateuser in tql builder

0.10.22
- Style upload and switch to light icons
- Restrict max height of basic search form only in modal
- Prevent action buttons disappearing on scroll
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- fix long term caching
- hide list navigation arrow if row is not clickable

0.10.21
- Move buttons inside modals to the right to improve UX
- Fix hidden extender and force border rendering of ranges in chrome
- Fix empty report settings (TOCDEV-3218)
- Fix spacing of notifiers without title

0.10.20
- Vertically center spinner icon in delete progress
- Style notifier popups to better harmonize with the existing styling
- Make panel header clickable so it can also expand the panel
- Fix height and action button styling of detail form in old client

0.10.19
- Async validation on blur
- Adjust left pane grid on for android tablets to prevent overflow
- Upload component: Show file names only in upload process
- Text autosize new component (Fixes Safari performance problems)
- New input parameter `customActions`
- Support multipart/form-data requests in `rest` extension
- Handle answer from custom actions
- Merge V2!
- Style datepicker so that it fits better into the rest of admin
- Add a popover variant that is placed on the right of element
- Prevent flickering effect for tooltips
- New input prop `contextParams` to extend context
- Support shrinkToContent column attribute
- Fix search form endless loading with empty filter field
- Fix path dirty bug
- Fix missing default values bug
- Fix default value serach filter bug
- Fix checkbox and menu background hover inside table heading
- Set origin id for each session (TOCDEV-2980)
- Writable mutlipath fix (TOCDEV-3012)
- Writable mutlipath fix (TOCDEV-3012)
- Fix autofocus if first field is a textarea

0.10
- Async validation on blur
- Adjust left pane grid on for android tablets to prevent overflow
- Upload component: Show file names only in upload process
- Text autosize new component (Fixes Safari performance problems)
- New input parameter `customActions`
- Support multipart/form-data requests in `rest` extension
- Handle answer from custom actions
- Merge V2!
- Style datepicker so that it fits better into the rest of admin
- Add a popover variant that is placed on the right of element
- Prevent flickering effect for tooltips
- New input prop `contextParams` to extend context
- Support shrinkToContent column attribute
- Fix search form endless loading with empty filter field
- Fix path dirty bug
- Fix missing default values bug
- Fix default value serach filter bug
- Fix checkbox and menu background hover inside table heading
- Set origin id for each session (TOCDEV-2980)
- Writable mutlipath fix (TOCDEV-3012)
- Writable mutlipath fix (TOCDEV-3012)
- Fix autofocus if first field is a textarea

0.10.18
- Increase min-width of table column for more usability on smaller screens
- Disable touch on mobile and adjust margin
- Autocomplete support
- Fix select for mobile
- Style popover to better align with overall design and have better contrast
- Add margin to error items inside popper
- Adjust entity list height inside detail view to scale on smaller screens
- Change link colors to secondary color
- Adjust ttile width of modal to match modal width
- Adjust top margin of modal content
- Add caption to preview
- Fix modal being push out of view when keyboard pops up on iOS
- Prevent label overflow inside input field
- Prevent popper menu disappearing behind main menu overlay
- Fix advanced search menu bug
- Change typography link color to secondary (blue)
- Do not display relation to parent entity in column picker if
- Display id instead of label if the label is empty in column
- Fix reports without custom settings
- Add minimal padding to search filter to avoid scrollbar on fewer entries
- Style button inside table
- Add title tooltip to button
- Make whole row clickable in list
- Prevent null pointer if no action bar in form model
- Fix the label of richtext fields to the top
- Reset load mask height to 100%
- Remove hover background color on active filter buttons
- Add height to label to prevent vertical clip
- Hide overflow of single value element
- Default search filter is disabled when opening the relations view of an entity as its own list
- Prevent click on disabled date input field
- Fix table reset
- Fix column picker styling
- Use column label as titles when hovering over headers
- Prevent mobile keyboard from pushing the modal up
- Fix top padding of modal
- Fix padding of immutable stated values
- Use same width for all Fontawesome icons
- Introduce custom cell renderers
- Disable pointer event on Desktop as text cant be copied otherwise in Firefox
- Refactor Layout components to use CSS Grid instead of JS for nested elements
- Fix positioning and z-index of ActionsWrapper
- Improve render of multi column layouts
- Change the text format if there are only fieldErrors
- focus on first input field
- Introduce navigationStrategy
- Introduce navigationStrategy
- Remove obsolete right margin inside menu item
- Display integer and counter data unformatted
- Prevent content ghosting in safari when opening/closing collapsibles

0.10.17
- Adjust filter pane height when expanded
- Change chevron icon in multi select input when dropdown is opened
- Change form field colors. Dirty: blue, Mandatory: organge
- Open remote fields on second click
- Improve form error notification
- Set max width in layout box to prevent overflowing elements

0.10.16
- Reset css overwrites of Upload.js and refactor Preview.js
- Restrict urls in table to one line
- Fix error field focus bug
- Adjust search filter height
- Set min and max width for modal
- List performance optimizations
- Change sort icon order and adjust table header styles to show marker on long columns when dragging
- Reset date/time indicators on input fields
- Remove stated value error animation, as it caused a wobble effect
- Add delete and qr action

0.10.15
- Narrow left panel width of input edit
- Improve UX of list and search view within modal
- Build fields without model (refactoring)
- Hide readonly fields without value
- Style column picker dialog inside modal
- Fix overflow of column picker in case of long texts and change ok button look
- Remove all usages of old display endpoints and use 'entities/2.0/displays'
- Initialize container size for correct display in modal
- Add min width to modal

0.10.14
- Change div to flex item for proper display in old client
- Change flex properties for proper display in old client
- Change div to flex item for proper display in old client
- Set box sizing on td to prevent overwrite in external context

0.10.13
- Entity list: Add support for `clickable` attribute
- Columns edit menu
- Handle strings in search with "like" and add boolean handler
- Hide action in advanced search
- Fix action selection bug
- Refactor form builder

0.10.11
- Table component
- Added button to reset all preferences
- Make all children of readonly layouts readonly
- Style input fields according to material design
- Use KEYS instead of IN in tql
- Style draggable table headers and kabob menu
- Handle notifications depending on parent
- Remove obsolete default searchfield styling and height in nested layout containers
- Change Stated and Editablevalue colors for more contrast/readability
- Fix width of table cells so that there is no overlap at the last column on smaller screens
- Style input edit table to ensure consistend UI. Remove obsolete split pane feature

0.10.10


0.10.9


0.10.8
- Center search filter icon vertically
- Center input field of select
- Fix sizing of ball

0.10.7
- Adjust minimum height of table content to 300px
- Style kabob menu inside table header

0.10.6
- Place button groups on same level
- Prevent action menu appearing underneath fixed menu bar
- Harmonize button spacing and sizing in list view
- Harmonize button sizing and spacing of button groups
- NumberFormatter can now handle options for setting the minimum fraction digits

0.10.5
- Fix icon positioning within buttons

0.10.4
- Support time fields in search form
- Display notifications correctly in InputEdit
- Table column positioning
- Style InputEdit Table
- Enable 100% height of layout container in old client
- Menu makeover
- Style new dropdown menu
- Harmonize menu icon spacing
- Reposition notifier close icon
- sort list by preferences and save new preferences when changing the sorting
- Add button to reset sorting to entity-list

0.10.3
- Fix shy in table header
- Enable opening of other apps in entity-browser
- Adjust HTML Edit

0.10.2
- Mitigate unwanted legacy action loading effects
- Harmonize notification spacing
- Add legacy icons
- Adjust advanced-search list limit
- Enable table height in resource calender to full height
- Enable hover effect on first two table header elements
- Harmonize question icon size/spacing in detail view
- Adjust fulltext search to work the same way as in old client

0.10.1
- Adjust table styling
- Remove additional clear icon in safari
- Fix fuzzy rendering of bold fonts in firefox
- Support description fields

0.10.0
- Table v2
- Fix display expressions

0.9.13
-

0.9.12
- Use new search filter endpoint
- Harmonize modal box spacing
- Disable caching for DEV
- Support multi-path select and remote fields

0.9.11
- Small date component improvements
- Fix fallback sorting bug
- Fix label null bug
- Add white background to mitigate dark theme conflict in nice2
- Improve range style

0.9.10
- Searchform with tql
- Harmonize stateted value box padding
- Panel animation refactoring
- Fix &shy; in label
- Component type fix
- adapt success color for better readability
- Range component

0.9.9
- Reset nice css leak

0.9.7
- Adjust responsive behavior of layout box in detail view
- Style display expressions
- Constriction bug fix

0.9.6
- Support of code and ipaddress datatypes fields
- Fix display-expression not shown in list view
- Basic display-expression bootstrap class support
- Fix display-expression sorting in list view
- Optimize async validation in create
- Persist search-filters

0.9.5
- Fallback sorting (last_updated)

0.9.4
- Various styling adjustments

0.9.3
- use _remotefield form for remotefields
- Cache forms and models
- Icon mapping list
- center icon of button
- format upload message
- Fix filter bug
- Adjust padding and fontsize
- Restrict global icon dom watch
- Add search-filters to admin search form
- Fix FormBuilder model bug

0.9.2
- Floating labels
- Location field support
- Various bug fixes

0.9.1
- Add location field support
- Fix confirm on leave bug when form was not dirty
- Various usability fixes in detail view
- Detail form performance improvements
- Various styling optimizations

0.9.0
- Multi page selection concept
- Update React and React-Dom PeerDependency to 16.8.4

0.8.16
- Fix readonly bug where fields where not shown in readonly mode

0.8.15
- Performance optimization in form
- Custom Signallist (used for Field errors)

0.8.14
- Auto Hide successful actiom message
