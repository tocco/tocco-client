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

