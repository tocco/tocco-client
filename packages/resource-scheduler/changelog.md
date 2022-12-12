0.4.6-hotfix229.10
- Use app locale automatically for all (REST) requests

0.4.6-hotfix229.9
- add locale to text resource caching key

0.4.6-hotfix229.8
- increase z-index for selects in modals

0.4.6-hotfix229.7
- fix z-index for entity-browser in old client

0.4.6-hotfix229.6
- add title to custom action response

0.4.6-hotfix229.5
- Fix datepickr disappearing behind modal

0.4.6-hotfix229.4
- Add preview for documents
- Increase z-index of modal holder to properly display as widget
- Prevent preview image collapsing to 1px if preview cannot be generated
- Refresh list on navigation back to list
- Fix calendar entity-list text resources

0.4.6-hotfix229.3
- Add preview for documents
- Increase z-index of modal holder to properly display as widget
- Fix build

0.4.6-hotfix229.2
- Introduce new prop to determine if layout containers should occupy remaining height on screen
- Fix overlay of modal in widget mode
- Fix popper menu on safari browsers
- Align modal globally at same position
- Fix calender search bug
- Fix search-form remote bug

0.4.6-hotfix229.1
- Displayexpression call adjustment

0.4.6
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
- Keep scroll position on multi select selection
- fix menu in action
- move validation helper method to tocco-util
- Clear button in date fields only show up when data has been entered, tab and enter can now be used to navigate in the calendar popup and between date fields
- Prevent stacking of modal overlays
- render description field in form
- Fix popper menu positioning
- Prevent layout container overlap in detail view
- Fix html edit initial change
- Refactoring list initialization
- Prevent range input overflow
- Adapt table colors to better differentiate from background
- Fix select menu disappearing behind modal
- Fix fulltext search form

0.4.5
- Move buttons inside modals to the right to improve UX
- Fix hidden extender and force border rendering of ranges in chrome
- Fix empty report settings (TOCDEV-3218)
- Fix spacing of notifiers without title
- Style upload and switch to light icons
- Restrict max height of basic search form only in modal
- Prevent action buttons disappearing on scroll
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- fix long term caching
- hide list navigation arrow if row is not clickable

0.4.4
- Style notifier popups to better harmonize with the existing styling
- Make panel header clickable so it can also expand the panel
- Fix height and action button styling of detail form in old client

0.4.3
- Fix default value serach filter bug
- Fix checkbox and menu background hover inside table heading
- Harmonize text styles inside calendar entries
- Set origin id for each session (TOCDEV-2980)
- Writable mutlipath fix (TOCDEV-3012)
- Allow display of horizontal overflow when printing

0.4.2
- Optimize print view for calendar
- Fix blank screen after navigating away from the calendar
- Style datepicker so that it fits better into the rest of admin
- Add a popover variant that is placed on the right of element
- Prevent flickering effect for tooltips
- New input prop `contextParams` to extend context
- Support shrinkToContent column attribute
- Fix search form endless loading with empty filter field
- Fix path dirty bug
- Fix missing default values bug

0.4.1
- Reset font sizes inside updated fullcalendar

0.4.0
- Update Calendar component
- Style fullcalendar after update
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
- Introduce navigationStrategy
- Introduce navigationStrategy
- Remove obsolete right margin inside menu item
- Display integer and counter data unformatted
- Prevent content ghosting in safari when opening/closing collapsibles

0.3.11
- Fix deselect all bug
- Increase min-width of table column for more usability on smaller screens
- Disable touch on mobile and adjust margin
- Fix select for mobile
- Style popover to better align with overall design and have better contrast
- Add margin to error items inside popper
- Adjust entity list height inside detail view to scale on smaller screens
- Change link colors to secondary color
- Adjust title width of modal to match modal width
- Adjust top margin of modal content
- Add caption to preview
- Fix modal being push out of view when keyboard pops up on iOS
- Prevent label overflow inside input field
- Prevent popper menu disappearing behind main menu overlay
- Fix advanced search menu bug
- Change typography link color to secondary (blue)

0.3.10
- Adjust filter pane height when expanded
- Change chevron icon in multi select input when dropdown is opened
- Change form field colors. Dirty: blue, Mandatory: organge
- Open remote fields on second click
- Set max width in layout box to prevent overflowing elements

0.3.9
- Reset css overwrites of Upload.js and refactor Preview.js
- Restrict urls in table to one line
- Adjust search filter height
- Set min and max width for modal
- List performance optimizations
- Change sort icon order and adjust table header styles to show marker on long columns when dragging
- Reset date/time indicators on input fields
- Remove stated value error animation, as it caused a wobble effect

0.3.8
- Build fields without model (refactoring)
- Hide readonly fields without value
- Style column picker dialog inside modal
- Fix overflow of column picker in case of long texts and change ok button look
- Remove all usages of old display endpoints and use 'entities/2.0/displays'
- Initialize container size for correct display in modal
- Add min width to modal

0.3.7
- Change div to flex item for proper display in old client
- Change flex properties for proper display in old client
- Set box sizing on td to prevent overwrite in external context

0.3.6
- Entity list: Add support for `clickable` attribute
- Handle strings in search with "like" and add boolean handler

0.3.5
- Remove obsolete default searchfield styling and height in nested layout containers
- Change Stated and Editablevalue colors for more contrast/readability
- Fix admin resource scheduler bug
- Fix tooltip outside calendar
- Fix width of table cells so that there is no overlap at the last column on smaller screens

0.3.4
- Allow calendars to be preselected by passing them to the preselectedCalendars input
- Table component
- Added button to reset all preferences
- Make all children of readonly layouts readonly
- Style input fields according to material design

0.3.3
- Fix shy in table header
- Adjust HTML Edit
- Support time fields in search form
- Table column positioning
- Enable 100% height of layout container in old client
- Menu makeover
- Style new dropdown menu
- Harmonize menu icon spacing
- Reposition notifier close icon
- sort list by preferences and save new preferences when changing the sorting
- Add button to reset sorting to entity-list
- Fix icon positioning within buttons
- Place button groups on same level
- Prevent action menu appearing underneath fixed menu bar
- Harmonize button spacing and sizing in list view
- Harmonize button sizing and spacing of button groups
- NumberFormatter can now handle options for setting the minimum fraction digits
- Adjust minimum height of table content to 300px
- Style kabob menu inside table header
- Center search filter icon vertically
- Center input field of select
- Fix sizing of ball

0.3.2
- Mitigate unwanted legacy action loading effects
- Harmonize notification spacing
- Add legacy icons
- Adjust advanced-search list limit
- Adjust list limit
- Enable table height in resource calender to full height
- Enable hover effect on first two table header elements
- Harmonize question icon size/spacing in detail view
- Adjust fulltext search to work the same way as in old client

0.3.1
- Adjust table padding and hover table heading hover
- Slim down left panel width in entity list view
- Remove additional clear icon in safari
- Fix fuzzy rendering of bold fonts in firefox
- Support description fields

0.3.0
- Table v2
- Fix display expressions
- Fix license

0.2.28
- Use new search filter endpoint
- Harmonize modal box spacing
- Disable caching for DEV
- Support multi-path select and remote fields

0.2.27
- Small date component improvements
- Fix fallback sorting bug
- Add white background to mitigate dark theme conflict in nice2
- Add simplified week view

0.2.26
- Constriction handling
- Searchform with tql
- Panel animation refactoring
- Fix &shy; in label
- Component type fix

0.2.25
- Fix display-expression not shown in list view
- View height fix (double scrollbar)

0.2.24
- Various styling adjustments

0.2.23
- Make scheduler smaller (Date formatting, time slot, styling)
- Fix resource resizing

0.2.22
- Checkbox margin fix for nice
- Only show remove all checkbox if resources loaded

0.2.21
- Improve responsiveness of select field in scheduler

0.2.20
- Fix tooltip styling collision with nice
- Fix event click handler
- Adjust button styling

0.2.19
- Add deselect all button
- Add date picker
- Adjust padding and fontsize
- Update fullcalendar
- Restrict global icon dom watch

0.2.18
- Cache forms and models
- Icon mapping list
- Increase record limit to 25
- Fix filter bug

0.2.17
- Add fullcalendar license

0.2.16
- Fix search-filter fields and loading bug
- use _remotefield form for remotefields

0.2.15
- Floating Labels
- Panel control (only one open)

0.2.14
- Format HTML event descriptions
- Remote advanced search list row selection bug fix

0.2.13
- Update React and React-Dom PeerDependency to 16.8.4
- Remove dependency inside tocco-theme

0.2.12
