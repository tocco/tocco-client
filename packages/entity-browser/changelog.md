1.0.5-hotfix31.38
- add scrollbehaviour prop to input edit table to prevent table collapse in widget context

1.0.5-hotfix31.37
- support identifier type in tql builder

1.0.5-hotfix31.36
- fix performance of fulltext search

1.0.5-hotfix31.35
- fix whitespace in notification

1.0.5-hotfix31.34
- implement sticky buttons for simple-form modal
- add model name to notification

1.0.5-hotfix31.33
- check form definition if form is markable

1.0.5-hotfix31.32
- fix breakwords for email and phone formatter

1.0.5-hotfix31.31
- remotefields now sort the same way in select box and advanced search (form sorting first, then last updated)

1.0.5-hotfix31.30
- add envelope icon
- add link to email and phone formatter
- add link to email and phone formatter
- fix loading form definition for dms

1.0.5-hotfix31.29
- remote fields now honor the constrictions defined on forms with remotefield scope
- entity list now uses a form definition passed as input without reloading it
- advanced search now uses form with remotefield scope if it exists
- remotefields now use sorting of their forms or entity models instead of only their timestamp

1.0.5-hotfix31.28
- add css classes for display expressions styling

1.0.5-hotfix31.27
- reverse title order to first display entity name and then default display

1.0.5-hotfix31.26
- Length and size validators no longer trigger if the max or min is not defined

1.0.5-hotfix31.25
- show from and to placeholders on number ranges
- Add sorting field to entity-list sagas

1.0.5-hotfix31.24
- render html escape characters in breadcrumbs

1.0.5-hotfix31.23
- show from and to placeholders on ranges
- add calendar plus and minus icons
- add specific range icons for datetime
- use distinguishable icons for ranges

1.0.5-hotfix31.22
- fix integer input when min value is set
- fix state handling for report settings

1.0.5-hotfix31.21
- fix searchfilters url with query params

1.0.5-hotfix31.20
- fix too many field callbacks being called

1.0.5-hotfix31.19
- update of the values and field widths in duration edit fixed

1.0.5-hotfix31.18
- debouncer accepts value changes from outside

1.0.5-hotfix31.17
- keep all values on blur

1.0.5-hotfix31.16
- allow duration values to be negative

1.0.5-hotfix31.15
- use preformatted error message for tql

1.0.5-hotfix31.14
- invalidate cache on page refresh properly

1.0.5-hotfix31.13
- filter out null values on nested paths
- handle nested 'to many' relations on list forms

1.0.5-hotfix31.12
- fix double scrollbar on textarea

1.0.5-hotfix31.11
- do not reuse same tab for different reports

1.0.5-hotfix31.10
- update range values properly
- harmonize error list spacing within forms
- improve data handling on search query changes

1.0.5-hotfix31.9
- fix entity-list re-init handling on store updates

1.0.5-hotfix31.8
- ace editor works again in create forms
- fix table flicker on firefox

1.0.5-hotfix31.7
- fix jumping layout on firefox

1.0.5-hotfix31.6
- onBlur of date component is called with value from onChange again
- legacy actions ignore some exceptions

1.0.5-hotfix31.5
- searchfilter show description as mouseover

1.0.5-hotfix31.4
- onChange is now debounced for CodeEdit
- added new button to clear the current query to QueryView

1.0.5-hotfix31.3
- introduce input prop `constriction`
- Fixed searching in select boxes. Removed default searchOptions from Select.
- Fixed searching in select boxes. Removed default searchOptions from Select.

1.0.5-hotfix31.2
- Tiny millisecond values (1 - 3) are now displayed correctly.

1.0.5-hotfix31.1
- The model field in the QueryView is now a display.

1.0.5
- Display overflowing hours in durations
- auto focus basic search form
- fix onError of customAction
- change toaster type of aborted action handler
- Add second tab to search form that allows executing custom queries. Add additional actions to open search as query and save query as a new filter.
- change toaster to fixed positioning to guarantee visibility on scroll
- Use app locale automatically for all (REST) requests
- render modal action component with right locale
- render subgrids with correct locale
- render fullscreen actions with correct locale
- render detail with correct locale
- render list with correct locale
- Using the advanced search in multi-remote fields no longer ignores the current selection.
- Code editors used to write TQL can now be configured in the backend to assume some entity model as the given base, allowing only writing the 'where'- and 'order by'-parts of a query.
- The TQL editor in the query view now uses an implicit base model, which allows auto-complete to work.
- increase table style specificities to prevent them from being overwritten inside widgets

1.0.4
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

1.0.3
- register more icons
- open downloadable file in new tab to avoid errors
- remove framer-motion dependency for burger button and create pure css version instead
- fix sticky popover on table
- fix UploadInput.js button titles and refactor components
- Add notification support for anonymous users
- choose between different scroll behaviours

1.0.2
- add useDidUpdate helper hook
- add useApp helper hook

1.0.1
- harmonize popover background color and spacing
- register icons
- add panel collapse feature to input edit
- register more icons
- change notification title and refactor NotificationCenter
- create env utils
- add generic nice2 fetch wrapper
- add dynamic backend-url as input parameter

1.0.0
- add auto completion for TQL in code fields.
- prevent default behaviour on shortcuts
- adjust min width of location edit postcode and refactor component
- refactor largeSelectionHandler
- enable select dropdown indicators to be aligned at bottom of multiselect fields
- fix html in toaster message
- tql builder support login type
- add title to custom action response
- show no permission error if entity is created
- throttle autosize to fix performance issues
- change toaster behavior to stay on hover and refactor ToasterDisplay
- the first search field in admin search forms now gets automatically focused on opening
- remove X-Enable-Notifications header

0.10.36
- show button hover title and pointer cursor
- harmonize detail footer spacing
- fix placing of chevron icon in placeholder panel of admin search form
- reset pagination on reload first page
- user agent detection
- improve performance on Safari
- fix missing popover in single values and overflowing in firefox
- add tooltip for remote fields
- Add Ace editor to code fields.
- add usePrevious helper hook
- cleanup flatpickr components
- add option to choose document from dms
- fix dnd in input edit
- fix jumping datepicker on Safari
- Show create form for remote fields again in the folder creation form
- debounce autosize on textarea
- harmonize fontawesome icon spacing within table data cell
- register more icons
- improve dropdown performance for selects on Safari
- fix performance bottleneck on linked sleect values
- adjust z-index of modal to prevent legacy actions falling behind it

0.10.35
- prevent position from switching between after/before
- generic resize util
- use scope for preferences
- refactor notification
- performance improvements
- fix drag and drop
- create link button
- add responsivity to all buttons so that the label disappears on smaller screens and only the icon is displayed
- show minimum 5 rows
- fix datepickr disappearing behind modal
- show textarea bigger for better distinction
- table can be refreshed
- only reload on explicit store updates
- register more icons
- increase z-index of popper menu to prevent it slipping behind modal

0.10.34
- only load huge global styles once per app
- Added a preview image on hovering over download icons.
- fix opening entity-browser the second time

0.10.33
- add open in new tab to document compact

0.10.32
- Harmonize link styling to be consistent
- Increase min-height of filter panel in search form
- change dms icons
- Improve table hover colors for better readability
- Change popover text color of paragraphs to white
- Improve text input UX within input edit table
- Reduce notification center title size
- fix state propagation in resize hook
- persist columns widths
- Dms edit and create messages clean up
- clean up documentation and fix dispatched actions
- fix websocket reconnection
- add footer with meta info
- refactor initial notification
- fix confirm handler
- calculate drop position before or after element
- provide sanitize function for html
- render sanitized html only
- don't resize column after mouse release
- Remote fields and select boxes now only load active relation values.
- add keyField to model transformer
- use dynamic key field
- Reset legacy overwrite of link color inside toasters
- Fix popper menu disappearing behind bm-menu elements
- Harmonize paragraph spacing whithin fields
- Lighten scrollbar color
- fix column position change
- Fix popper menu closing immediately when clicking an action
- add scope as input
- Style detail footer for better UX
- Add minimum box width property to Layout Container to better control column width

0.10.31
- Prevent preview image collapsing to 1px if preview cannot be generated
- Refresh list on navigation back to list
- Harmonize html formatter spacing inside stated value
- Harmonize icon spacing and hover behaviour in notifications
- Add the feature to close modals via escape key
- Add underline to links
- Open Url in list in new window
- Fix simple-search extend button in remote search
- Improve browser tab title
- Harmonize collapsible panel styling for better contrast
- Prevent early line breaks in popover menu
- Remove initial underline in notification detail link
- support disablePreferencesMenu in table
- Money post point digits fallback
- Update select
- Dms edit and create messages clean up
- Fix calendar entity-list text resources
- add "open output job" to notification
- Fix disabled delete button if nothing to delete
- Add background color to unread notifications
- fix opening task execution of notification
- Add button to remote fields that opens a popup containing a create form
- split session saga
- fix socket connection handling
- Fix suqare icon display expressions
- Swap out donwload and upload icons to harmonize look
- Change date picker month button color for better visibility
- Harmonize notification center styling
- Added new cancel button to toasters and notification center when task execution can be cancelled
- Change table hover colors to a more generic grey tone

0.10.30
- Fix notifications for already deleted outputjobs
- Add hover effect to column picker list
- Added support for "markable" feature
- Added support for "markable" feature
- Prevent dropdown menu being clipped in viewport
- Fix business unit change in edit action
- Support empty html edit field
- Has value for checkboxes change
- Improve pagination UX by moving it to the left and changing button behavior
- Fix search filter menu hover
- Add preview for documents
- Style location edit dropdown to match other dropdowns
- Remove download icon inside button of report settings
- Fix calender search bug
- Harmonize marked icon inside table
- Harmonize marked icon inside detail view
- Increase z-index of modal holder to properly display as widget
- Show outdated error in detail
- Increase toaster z-index to properly display as widget

0.10.29
- Align modal globally at same position
- Fix modal overflow
- Harmonize toaster styling
- Fix blocking info being covered by header
- Adjust height and width of input edit table

0.10.28
- Style new notification boxes
- Style notification center
- Change cursor to pointer on panel header/footer hover
- Added options to create a search filter from the current search, edit or delete an existing filter
- datetime search fields now use a date field until the full range is expanded
- Fix hover delay and hover color of search filter buttons
- Adjust spacing and alignment of button inside modal
-  Add action selection count confirm
- Improve input field UX by better highlighting fields and labels
- Adapt input font-sizes for better readability
- Fix selection controller button font color
- Add collapse feature to search panel in list view
- Fix broken modal layout
- Fix date-time search
- Fix overlay of modal in widget mode
- Fix multi-tab problem
- Fix popper menu on safari browsers
- Fix notification socket url
- refactor column picker
- move useDnD
- add search form customization
- Make select dropdown menu style more uniform for a more consistent UI
- Harmonize select box size und colors
- Change collpase icon for detail and list view

0.10.27
- Introduce new prop to determine if layout containers should occupy remaining height on screen
- Location field focus problem fix
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
