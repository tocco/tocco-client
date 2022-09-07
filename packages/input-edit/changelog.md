1.1.3-hotfix31.29
- implement sticky buttons for simple-form modal
- add model name to notification

1.1.3-hotfix31.28
- fix breakwords for email and phone formatter

1.1.3-hotfix31.27
- remotefields now sort the same way in select box and advanced search (form sorting first, then last updated)

1.1.3-hotfix31.26
- add envelope icon
- add link to email and phone formatter
- add link to email and phone formatter

1.1.3-hotfix31.25
- remote fields now honor the constrictions defined on forms with remotefield scope
- advanced search now uses form with remotefield scope if it exists
- remotefields now use sorting of their forms or entity models instead of only their timestamp

1.1.3-hotfix31.24
- add css classes for display expressions styling

1.1.3-hotfix31.23
- reverse title order to first display entity name and then default display

1.1.3-hotfix31.22
- Length and size validators no longer trigger if the max or min is not defined

1.1.3-hotfix31.21
- show from and to placeholders on number ranges

1.1.3-hotfix31.20
- render html escape characters in breadcrumbs

1.1.3-hotfix31.19
- show from and to placeholders on ranges
- add calendar plus and minus icons
- add specific range icons for datetime
- use distinguishable icons for ranges

1.1.3-hotfix31.18
- fix integer input when min value is set
- fix state handling for report settings

1.1.3-hotfix31.17
- fix searchfilters url with query params

1.1.3-hotfix31.16
- fix too many field callbacks being called

1.1.3-hotfix31.15
- update of the values and field widths in duration edit fixed

1.1.3-hotfix31.14
- debouncer accepts value changes from outside

1.1.3-hotfix31.13
- keep all values on blur

1.1.3-hotfix31.12
- allow duration values to be negative

1.1.3-hotfix31.11
- invalidate cache on page refresh properly

1.1.3-hotfix31.10
- filter out null values on nested paths
- handle nested 'to many' relations on list forms

1.1.3-hotfix31.9
- fix double scrollbar on textarea

1.1.3-hotfix31.8
- do not reuse same tab for different reports

1.1.3-hotfix31.7
- update range values properly
- harmonize error list spacing within forms

1.1.3-hotfix31.6
- ace editor works again in create forms

1.1.3-hotfix31.5
- fix jumping layout on firefox

1.1.3-hotfix31.4
- onBlur of date component is called with value from onChange again
- legacy actions ignore some exceptions

1.1.3-hotfix31.3
- onChange is now debounced for CodeEdit

1.1.3-hotfix31.2
- Fixed searching in select boxes. Removed default searchOptions from Select.
- Fixed searching in select boxes. Removed default searchOptions from Select.

1.1.3-hotfix31.1
- Navigating to detail pages through links in multi-select fields is now possible.

1.1.3
- Display overflowing hours in durations
- fix onError of customAction
- change toaster type of aborted action handler
- change toaster to fixed positioning to guarantee visibility on scroll
- Use app locale automatically for all (REST) requests
- render modal action component with right locale
- Using the advanced search in multi-remote fields no longer ignores the current selection.
- Code editors used to write TQL can now be configured in the backend to assume some entity model as the given base, allowing only writing the 'where'- and 'order by'-parts of a query.
- increase table style specificities to prevent them from being overwritten inside widgets

1.1.2
- use throttle for select instead of debounce to prevent flickering of dropdown
- null pointer fixed in document field formatter (resp. merge action)
- add tql mapping for type text
- improve searching for text based types
- harmonize DurationEdit spacing and refactor class based component to functional component
- show seconds, milliseconds for small read-only duration
- allow whitelisted inline css for nice tooltips
- show seconds/milliseconds only for small duration

1.1.1


1.1.0


1.0.1
- harmonize popover background color and spacing
- register icons
- add panel collapse feature to input edit
- register more icons
- change notification title and refactor NotificationCenter
- create env utils
- add generic nice2 fetch wrapper
- add useDidUpdate helper hook
- add useApp helper hook

1.0.0
- Harmonize link styling to be consistent
- change dms icons
- Improve table hover colors for better readability
- Change popover text color of paragraphs to white
- Improve text input UX within input edit table
- Reduce notification center title size
- fix state propagation in resize hook
- fix state propagation in resize hook
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
- fix dnd in input edit
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

0.3.17
- Fix text choice grades

0.3.16
- Adjust height and width of input edit table

0.3.15
- Align modal globally at same position
- Fix modal overflow
- Harmonize toaster styling
- Fix blocking info being covered by header

0.3.14
- Style new notification boxes
- Style notification center
- Introduce new prop to determine if layout containers should occupy remaining height on screen
- Displayexpression call adjustment
- Change cursor to pointer on panel header/footer hover
- datetime search fields now use a date field until the full range is expanded
- Add action selection count confirm
- Improve input field UX by better highlighting fields and labels
- Adapt input font-sizes for better readability
- Fix broken modal layout
- Fix date-time search
- Fix overlay of modal in widget mode
- Fix popper menu on safari browsers
- Fix notification socket url
- move useDnD
- Make select dropdown menu style more uniform for a more consistent UI
- Harmonize select box size und colors

0.3.13
- Wait for update to finish before loading data in input-edit

0.3.12
- Adjust label margin in input fields
- reload sources after deployment
- Restrict max width of popover to 400px
- Reference text ressources for aria-labels for improved localization
- Increase contrast of theme colors to ensure WCAG 2.0 standards
- Change spacing/hover colors inside table and adjust scrollbar width
- Change notifier style to a solid variant to increase contrast/visibility
- Change popover style to solid for increased contrast
- Adjust text shade colors to a lighter variant
- Fix fulltext search
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
- Prevent range input overflow
- Adapt table colors to better differentiate from background
- Fix select menu disappearing behind modal

0.3.11
- Style notifier popups to better harmonize with the existing styling
- Make panel header clickable so it can also expand the panel
- Move buttons inside modals to the right to improve UX
- Fix hidden extender and force border rendering of ranges in chrome
- Fix empty report settings (TOCDEV-3218)
- Fix spacing of notifiers without title
- Change button position to right side inside modal
- Style upload and switch to light icons
- Prevent action buttons disappearing on scroll
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- fix long term caching

0.3.10
- Introduce navigationStrategy
- Remove obsolete right margin inside menu item
- Display integer and counter data unformatted
- Prevent content ghosting in safari when opening/closing collapsibles
- Adjust left pane grid on for android tablets to prevent overflow
- Upload component: Show file names only in upload process
- Text autosize new component (Fixes Safari performance problems)
- Support multipart/form-data requests in `rest` extension
- Handle answer from custom actions
- Style datepicker so that it fits better into the rest of admin
- Add a popover variant that is placed on the right of element
- Prevent flickering effect for tooltips
- Support shrinkToContent column attribute
- Fix path dirty bug
- Fix missing default values bug
- Fix default value serach filter bug
- Fix checkbox and menu background hover inside table heading
- Set origin id for each session (TOCDEV-2980)
- Writable mutlipath fix (TOCDEV-3012)

0.3.9
- Increase min-width of table column for more usability on smaller screens
- Disable touch on mobile and adjust margin
- Fix select for mobile
- Style popover to better align with overall design and have better contrast
- Change link colors to secondary color
- Adjust ttile width of modal to match modal width
- Adjust top margin of modal content
- Add caption to preview
- Fix modal being push out of view when keyboard pops up on iOS
- Prevent label overflow inside input field
- Prevent popper menu disappearing behind main menu overlay
- Fix advanced search menu bug
- Change typography link color to secondary (blue)
- Fix reports without custom settings
- Style button inside table
- Add title tooltip to button
- Fix the label of richtext fields to the top
- Reset load mask height to 100%
- Add height to label to prevent vertical clip
- Hide overflow of single value element
- Prevent click on disabled date input field
- Use column label as titles when hovering over headers
- Prevent mobile keyboard from pushing the modal up
- Fix top padding of modal
- Fix padding of immutable stated values
- Use same width for all Fontawesome icons
- Disable pointer event on Desktop as text cant be copied otherwise in Firefox
- Refactor Layout components to use CSS Grid instead of JS for nested elements
- Fix positioning and z-index of ActionsWrapper
- Improve render of multi column layouts
- add mode to simple form

0.3.8
- Change chevron icon in multi select input when dropdown is opened
- Change form field colors. Dirty: blue, Mandatory: organge
- Open remote fields on second click
- Set max width in layout box to prevent overflowing elements

0.3.7
- Reset css overwrites of Upload.js and refactor Preview.js
- Restrict urls in table to one line
- Set min and max width for modal
- Change sort icon order and adjust table header styles to show marker on long columns when dragging
- Reset date/time indicators on input fields
- Remove stated value error animation, as it caused a wobble effect
- Optimize initialization
- Remove selection check

0.3.6
- Create new StyledLabel that fits with other elements
- Handle strings in search with "like" and add boolean handler
- Hide action in advanced search
- Change div to flex item for proper display in old client
- Change flex properties for proper display in old client
- Set box sizing on td to prevent overwrite in external context
- Narrow left panel width of input edit
- Build fields without model (refactoring)
- Hide readonly fields without value
- Remove all usages of old display endpoints and use 'entities/2.0/displays'
- Add min width to modal

0.3.5
- Table component
- Style input fields according to material design
- Handle notifications depending on parent
- Remove obsolete default searchfield styling and height in nested layout containers
- Change Stated and Editablevalu colors for more contrast/readability
- Fix width of table cells so that there is no overlap at the last column on smaller screens
- Style input edit table to ensure consistend UI. Remove obsolete split pane feature

0.3.4


0.3.3


0.3.2
- Finish styling of input edit table
- Center input field of select

0.3.1
- Add vertical scrolling to input edit table

0.3.0
- Display notifications correctly in InputEdit
- Style InputEdit Table
- Enable 100% height of layout container in old client
- NumberFormatter can now handle options for setting the minimum fraction digits
- InputEditTable now displays all readonly fields as FormattedValues
- Allow multiple selected Inputs to be handled in input-edit, if they are compatible.

0.2.0
- Add legacy icons
- Adjust fulltext search to work the same way as in old client
- Add actions to input-edit
- Enable notifications in input-edit
- Add information box to input-edit

0.1.1
- initial release

